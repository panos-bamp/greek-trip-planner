#!/usr/bin/env node
/**
 * ============================================================================
 * INSIGHT ARTICLE → SANITY CMS IMPORTER
 * ============================================================================
 * 
 * Parses a markdown article (in the Greek Trip Planner insights format) and
 * pushes ALL content to the correct Sanity fields via the Mutations API.
 * 
 * USAGE:
 *   node import-insight.mjs <markdown-file> [--dry-run] [--slug=custom-slug]
 * 
 * EXAMPLES:
 *   node import-insight.mjs greece-tourism-source-markets.md --dry-run
 *   node import-insight.mjs greece-tourism-source-markets.md
 *   node import-insight.mjs article.md --slug=my-custom-slug
 * 
 * SETUP:
 *   1. Set environment variables (or edit the config below):
 *      SANITY_PROJECT_ID=puhk8qa7
 *      SANITY_DATASET=production
 *      SANITY_TOKEN=skjgjIHxvPYVKQD4I5EUiBBoRassU7bOJFgUiE7dj2UAF1Md3drX3qY2Tn9RSvVPvPyRHR4COK2xa6UzhxtA0mtDogDBtgeuF0KfzHoBNXnYUNziBvWirOEbcOE84ehDk9z9UdEz5GN6dmw5aGNKeSohWlrprcekg8DmcT5X85s3fUzXj07U
 *   
 *   2. Get a write token from: https://www.sanity.io/manage
 *      → Project → API → Tokens → Add API token (Editor role)
 * 
 * WHAT IT DOES:
 *   Tab 1 (Content):     title, slug, subtitle, excerpt, insightType, topics,
 *                         author, authorBio, publishedAt, updatedAt, readingTime,
 *                         keyMetrics, body (Portable Text), keyTakeaways
 *   Tab 2 (Data):        dataTimePeriod, dataSources, methodology, dataDisclaimer
 *   Tab 3 (SEO):         metaTitle, metaDescription, focusKeyword, secondaryKeywords
 *   Tab 4 (Schema):      schemaArticleType, enableFaqSchema, faqItems,
 *                         enableDatasetSchema, enableBreadcrumbSchema, ctaType
 *   Tab 5 (Related):     externalReferences, ctaCustomText
 *   
 *   NOTE: relatedBlogPosts and relatedInsights require Sanity document _id
 *   references that can't be resolved from slugs alone. The script outputs
 *   the slugs so you can link them manually in Sanity Studio.
 * ============================================================================
 */

import { readFileSync } from 'fs';
import { randomUUID } from 'crypto';

// ============================================================================
// CONFIG — Edit these or set as environment variables
// ============================================================================
const CONFIG = {
  projectId: process.env.SANITY_PROJECT_ID || 'puhk8qa7',
  dataset: process.env.SANITY_DATASET || 'production',
  token: process.env.SANITY_TOKEN || 'skjgjIHxvPYVKQD4I5EUiBBoRassU7bOJFgUiE7dj2UAF1Md3drX3qY2Tn9RSvVPvPyRHR4COK2xa6UzhxtA0mtDogDBtgeuF0KfzHoBNXnYUNziBvWirOEbcOE84ehDk9z9UdEz5GN6dmw5aGNKeSohWlrprcekg8DmcT5X85s3fUzXj07U',
  apiVersion: '2024-01-01',
};

// ============================================================================
// CLI ARGUMENT PARSING
// ============================================================================
const args = process.argv.slice(2);
const flags = {};
const positional = [];

for (const arg of args) {
  if (arg.startsWith('--')) {
    const [key, val] = arg.slice(2).split('=');
    flags[key] = val ?? true;
  } else {
    positional.push(arg);
  }
}

const filePath = positional[0];
const dryRun = flags['dry-run'] === true;
const customSlug = flags['slug'] || null;

if (!filePath) {
  console.error('Usage: node import-insight.mjs <markdown-file> [--dry-run] [--slug=custom-slug]');
  process.exit(1);
}

// ============================================================================
// MARKDOWN PARSER — Extracts all structured fields from the article
// ============================================================================

function parseArticle(markdown) {
  const doc = {};

  // --- Title (first H1) ---
  const titleMatch = markdown.match(/^# (.+)$/m);
  doc.title = titleMatch ? titleMatch[1].trim() : 'Untitled';

  // --- Subtitle ---
  const subtitleMatch = markdown.match(/\*\*Subtitle(?:\/Deck)?:\*\*\s*(.+?)(?:\n\n|\n\*\*)/s);
  doc.subtitle = subtitleMatch ? subtitleMatch[1].trim() : '';

  // --- Excerpt ---
  const excerptMatch = markdown.match(/\*\*Excerpt:\*\*\s*(.+?)(?:\n\n|\n\*\*)/s);
  doc.excerpt = excerptMatch ? excerptMatch[1].trim() : '';

  // --- Author (top-level) ---
  const authorTopMatch = markdown.match(/\*\*Author:\*\*\s*(.+)/i);
  if (authorTopMatch) doc.author = authorTopMatch[1].trim();
  
  // --- Category (top-level, maps to insightType) ---
  const categoryMatch = markdown.match(/\*\*Category:\*\*\s*(.+)/i);
  if (categoryMatch) {
    const catMap = {
      'statistics & data': 'statistics',
      'statistics': 'statistics',
      'market report': 'market-report',
      'trend analysis': 'trend-analysis',
      'destination performance': 'destination-performance',
      'source market': 'source-market',
      'hotel & accommodation': 'accommodation',
      'cruise industry': 'cruise',
      'policy & regulation': 'policy-regulation',
      'sustainability': 'sustainability',
      'opinion': 'opinion',
    };
    const cat = categoryMatch[1].trim().toLowerCase();
    doc._insightTypeFromCategory = catMap[cat] || 'statistics';
  }
  
  // --- Data Period (top-level) ---
  const dataPeriodMatch = markdown.match(/\*\*Data (?:P|p)eriod:\*\*\s*(.+)/i);
  if (dataPeriodMatch) doc._dataTimePeriodLabel = dataPeriodMatch[1].trim();

  // --- Reading time ---
  const readingMatch = markdown.match(/\*\*(?:Reading time|Estimated reading time):\*\*\s*(\d+)/i);
  doc.readingTime = readingMatch ? parseInt(readingMatch[1]) : null;

  // --- Focus keyword ---
  const focusMatch = markdown.match(/\*\*Focus keyword:\*\*\s*(.+)/i);
  doc.focusKeyword = focusMatch ? focusMatch[1].trim() : '';

  // --- Secondary keywords ---
  const secMatch = markdown.match(/\*\*Secondary keywords:\*\*\s*(.+)/i);
  doc.secondaryKeywords = secMatch
    ? secMatch[1].split(',').map(k => k.trim()).filter(Boolean)
    : [];

  // --- Key Metrics ---
  doc.keyMetrics = parseKeyMetrics(markdown);

  // --- Key Takeaways ---
  doc.keyTakeaways = parseKeyTakeaways(markdown);

  // --- Article Body (between "## ARTICLE BODY" and "## Methodology" or "## Sanity CMS") ---
  doc.body = parseBody(markdown);

  // --- Methodology ---
  // Format A: Section before Sanity CMS fields
  let methSection = extractSection(markdown, 'Methodology and data sources', ['Sanity CMS Field Reference', '---', '## Key Takeaways', '## Data Sources']);
  if (methSection) {
    doc.methodology = methSection.trim();
  }

  // --- Data Sources (alternative format — standalone section) ---
  const dsSectionAlt = extractSection(markdown, 'Data Sources', ['---', '## Frequently Asked', '## Key Takeaways']);
  if (dsSectionAlt && !doc.dataSources?.length) {
    doc.dataSources = [];
    // Parse "Data period:" line
    const periodMatch = dsSectionAlt.match(/Data period:\s*(.+)/i);
    if (periodMatch) {
      doc._dataTimePeriodLabel = periodMatch[1].trim();
    }
    // Parse numbered list
    const dsLines = dsSectionAlt.split('\n').filter(l => l.match(/^\d+\./));
    for (const line of dsLines) {
      const name = line.replace(/^\d+\.\s*/, '').trim();
      doc.dataSources.push({
        _key: randomKey(),
        _type: 'dataSource',
        name: name.split(':')[0]?.trim() || name,
        description: name.includes(':') ? name.split(':').slice(1).join(':').trim() : '',
        accessDate: new Date().toISOString().split('T')[0],
      });
    }
  }
  
  // --- FAQ (alternative format — "## Frequently Asked Questions") ---
  const faqSectionAlt = extractSection(markdown, 'Frequently Asked Questions', ['---', '## Sanity']);
  if (faqSectionAlt && !doc.faqItems?.length) {
    doc.faqItems = [];
    // Format: **Question?**\nAnswer text\n\n**Next question?**\nAnswer...
    const faqBlocks = faqSectionAlt.split(/\n\n(?=\*\*)/);
    for (const block of faqBlocks) {
      const qMatch = block.match(/\*\*(.+?)\*\*\s*\n([\s\S]+)/);
      if (qMatch) {
        doc.faqItems.push({
          _key: randomKey(),
          _type: 'faqItem',
          question: qMatch[1].trim(),
          answer: qMatch[2].trim().replace(/\n/g, ' '),
        });
      }
    }
  }

  // --- Sanity CMS Field Reference (articles 1, 4 format) ---
  const sanitySection = extractSection(markdown, 'Sanity CMS Field Reference', []);
  if (sanitySection) {
    parseSanityFields(sanitySection, doc);
  }

  return doc;
}

// --- Parse Key Metrics ---
function parseKeyMetrics(md) {
  // Format A: "## Key Metrics" with bullet points
  let section = extractSection(md, 'Key Metrics', ['---', '## ']);
  if (section) {
    const metrics = [];
    const lines = section.split('\n').filter(l => l.trim().startsWith('- **'));
    for (const line of lines) {
      const match = line.match(/- \*\*(.+?)\*\*\s*\|\s*(.+?)\s*\|\s*trend:\s*(\w+)\s*\|\s*context:\s*(.+)/);
      if (match) {
        metrics.push({
          _key: randomKey(),
          _type: 'metric',
          value: match[1].trim(),
          label: match[2].trim(),
          trend: match[3].trim(),
          context: match[4].trim(),
        });
      }
    }
    if (metrics.length > 0) return metrics;
  }
  
  // Format B: "## Key Figures at a Glance" or "## Key Metrics at a Glance" with markdown table
  if (!section || !section.includes('|')) {
    section = extractSection(md, 'Key Metrics at a Glance', ['---', '## ']);
  }
  if (!section || !section.includes('|')) {
    section = extractSection(md, 'Key Figures at a Glance', ['---', '## ']);
  }
  if (section) {
    const metrics = [];
    const lines = section.split('\n').filter(l => l.includes('|') && !l.includes('---') && !l.includes('Metric'));
    for (const line of lines) {
      const cols = line.split('|').map(c => c.trim()).filter(Boolean);
      if (cols.length >= 3) {
        // Detect trend from arrows/symbols
        const contextStr = cols[2] || '';
        let trend = 'up';
        if (contextStr.includes('↓') || contextStr.toLowerCase().includes('down')) trend = 'down';
        else if (contextStr.includes('→') || contextStr.toLowerCase().includes('flat')) trend = 'flat';
        
        metrics.push({
          _key: randomKey(),
          _type: 'metric',
          label: cols[0],
          value: cols[1],
          context: contextStr.replace(/[↑↓→]/g, '').trim(),
          trend,
        });
      }
    }
    if (metrics.length > 0) return metrics;
  }
  
  return [];
}

// --- Parse Key Takeaways ---
function parseKeyTakeaways(md) {
  // Try top-of-article format first (before "## ARTICLE BODY")
  let section = extractSection(md, 'Key Takeaways', ['---', '## ARTICLE BODY']);
  
  // If not found or empty, try bottom-of-article format (after Methodology/Data Sources)
  if (!section || section.trim().length < 10) {
    // Find "## Key Takeaways" that appears after "## Methodology" or "## Data Sources"
    const methIdx = md.search(/## Methodology/i);
    const dsIdx = md.search(/## Data Sources/i);
    const boundary = Math.max(methIdx, dsIdx);
    
    if (boundary > 0) {
      const bottomSection = md.slice(boundary);
      const ktMatch = bottomSection.match(/## Key Takeaways\n([\s\S]+?)(?:\n---|\n## |$)/);
      if (ktMatch) section = ktMatch[1];
    }
  }
  
  if (!section) return [];

  // Handle both numbering formats: "1. text" and "- 01. text"
  const items = [];
  const lines = section.split('\n');
  let current = '';
  
  for (const line of lines) {
    const numbered = line.match(/^(?:- )?0?\d+\.\s+(.+)/);
    if (numbered) {
      if (current) items.push(current.trim());
      current = numbered[1];
    } else if (line.trim() && current) {
      current += ' ' + line.trim();
    }
  }
  if (current) items.push(current.trim());
  
  return items;
}

// --- Parse Body to Portable Text ---
function parseBody(md) {
  let bodyMd = '';
  
  const bodyStart = md.indexOf('## ARTICLE BODY');
  if (bodyStart !== -1) {
    // Format A: explicit "## ARTICLE BODY" marker (articles 1, 4)
    const afterBody = md.slice(bodyStart + '## ARTICLE BODY'.length);
    const methIdx = afterBody.indexOf('\n## Methodology and data sources');
    const sanityIdx = afterBody.indexOf('\n## Sanity CMS Field Reference');
    let endIdx = afterBody.length;
    if (methIdx !== -1) endIdx = Math.min(endIdx, methIdx);
    if (sanityIdx !== -1) endIdx = Math.min(endIdx, sanityIdx);
    bodyMd = afterBody.slice(0, endIdx).trim();
  } else {
    // Format B: no explicit marker (articles 2, 3)
    // Body starts after the front matter block (after last "---" before first content H2)
    // Front matter = title, subtitle, excerpt, reading time, keywords, key figures, TOC
    
    const lines = md.split('\n');
    let bodyStartLine = 0;
    let lastFrontMatterSep = -1;
    let inFrontMatter = true;
    
    // Find the end of front matter by locating the section after Key Figures/TOC
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Track "---" separators
      if (line === '---') {
        lastFrontMatterSep = i;
      }
      
      // First content H2 that isn't a metadata section
      if (line.startsWith('## ') && 
          !line.includes('Key Metrics') && !line.includes('Key Figures') &&
          !line.includes('Key Takeaways') && !line.includes('Table of Contents') &&
          !line.includes('ARTICLE BODY')) {
        // This is the first real content heading
        bodyStartLine = i;
        break;
      }
    }
    
    if (bodyStartLine > 0) {
      const bodyLines = lines.slice(bodyStartLine);
      // Find end boundary (Methodology, Key Takeaways at bottom, Data Sources, FAQ)
      let endLine = bodyLines.length;
      for (let i = 0; i < bodyLines.length; i++) {
        const line = bodyLines[i].trim();
        if (line.match(/^## Methodology/i) ||
            line.match(/^## Key Takeaways$/i) ||
            line.match(/^## Data Sources$/i) ||
            line.match(/^## Frequently Asked/i) ||
            line.match(/^## Sanity CMS/i)) {
          endLine = i;
          break;
        }
      }
      bodyMd = bodyLines.slice(0, endLine).join('\n').trim();
    }
  }
  
  return bodyMd ? markdownToPortableText(bodyMd) : [];
}

// --- Markdown → Portable Text Converter ---
function markdownToPortableText(md) {
  const blocks = [];
  const lines = md.split('\n');
  let i = 0;
  let currentParagraph = [];

  function flushParagraph() {
    if (currentParagraph.length === 0) return;
    const text = currentParagraph.join('\n').trim();
    if (!text) { currentParagraph = []; return; }
    
    // Skip visual placeholders
    if (text.startsWith('[VISUAL')) {
      currentParagraph = [];
      return;
    }
    
    blocks.push(createTextBlock(text, 'normal'));
    currentParagraph = [];
  }

  while (i < lines.length) {
    const line = lines[i];
    
    // --- Headings ---
    const h2Match = line.match(/^## (.+)/);
    const h3Match = line.match(/^### (.+)/);
    const h4Match = line.match(/^#### (.+)/);
    
    if (h2Match) {
      flushParagraph();
      blocks.push(createTextBlock(h2Match[1].trim(), 'h2'));
      i++;
      continue;
    }
    if (h3Match) {
      flushParagraph();
      blocks.push(createTextBlock(h3Match[1].trim(), 'h3'));
      i++;
      continue;
    }
    if (h4Match) {
      flushParagraph();
      blocks.push(createTextBlock(h4Match[1].trim(), 'h4'));
      i++;
      continue;
    }
    
    // --- Visual placeholder lines (skip entire block) ---
    if (line.trim().startsWith('[VISUAL')) {
      flushParagraph();
      // Skip until the closing ]
      let visualBlock = line;
      while (!visualBlock.includes(']') && i < lines.length - 1) {
        i++;
        visualBlock += '\n' + lines[i];
      }
      i++;
      continue;
    }
    
    // --- Empty line = paragraph break ---
    if (line.trim() === '') {
      flushParagraph();
      i++;
      continue;
    }
    
    // --- Horizontal rule ---
    if (line.trim() === '---') {
      flushParagraph();
      i++;
      continue;
    }
    
    // --- Accumulate paragraph text ---
    currentParagraph.push(line);
    i++;
  }
  
  flushParagraph();
  return blocks;
}

// --- Create a Portable Text block with inline marks (bold, italic, links) ---
function createTextBlock(text, style = 'normal') {
  const block = {
    _key: randomKey(),
    _type: 'block',
    style,
    children: [],
    markDefs: [],
  };

  // Parse inline markdown: **bold**, *italic*, [links](url)
  const spans = parseInlineMarks(text);
  
  for (const span of spans) {
    const child = {
      _key: randomKey(),
      _type: 'span',
      text: span.text,
      marks: [],
    };
    
    if (span.bold) child.marks.push('strong');
    if (span.italic) child.marks.push('em');
    
    if (span.href) {
      const markKey = randomKey();
      block.markDefs.push({
        _key: markKey,
        _type: 'link',
        href: span.href,
        blank: span.href.startsWith('http') && !span.href.includes('greektriplanner.me'),
      });
      child.marks.push(markKey);
    }
    
    block.children.push(child);
  }
  
  if (block.children.length === 0) {
    block.children.push({
      _key: randomKey(),
      _type: 'span',
      text: text,
      marks: [],
    });
  }
  
  return block;
}

// --- Parse inline markdown (bold, italic, links) into spans ---
function parseInlineMarks(text) {
  const spans = [];
  // Regex to match: [text](url), **bold**, *italic*
  // Process in order of appearance
  const regex = /(\[([^\]]+?)\]\(([^)]+?)\)|\*\*(.+?)\*\*|\*([^*]+?)\*)/g;
  
  let lastIndex = 0;
  let match;
  
  while ((match = regex.exec(text)) !== null) {
    // Add any plain text before this match
    if (match.index > lastIndex) {
      const plainText = text.slice(lastIndex, match.index);
      if (plainText) spans.push({ text: plainText });
    }
    
    if (match[2] && match[3]) {
      // Link: [text](url)
      // Check if the link text itself has bold markers
      let linkText = match[2];
      let bold = false;
      if (linkText.startsWith('**') && linkText.endsWith('**')) {
        linkText = linkText.slice(2, -2);
        bold = true;
      }
      spans.push({ text: linkText, href: match[3], bold });
    } else if (match[4]) {
      // Bold: **text**
      spans.push({ text: match[4], bold: true });
    } else if (match[5]) {
      // Italic: *text*
      spans.push({ text: match[5], italic: true });
    }
    
    lastIndex = match.index + match[0].length;
  }
  
  // Add remaining text
  if (lastIndex < text.length) {
    spans.push({ text: text.slice(lastIndex) });
  }
  
  return spans.length > 0 ? spans : [{ text }];
}

// --- Parse Sanity CMS Field Reference section ---
function parseSanityFields(section, doc) {
  // insightType
  const typeMatch = section.match(/\*\*insightType:\*\*\s*(.+)/i);
  if (typeMatch) doc.insightType = typeMatch[1].trim();

  // topics
  const topicsMatch = section.match(/\*\*topics:\*\*\s*(.+)/i);
  if (topicsMatch) {
    doc.topics = topicsMatch[1].split(',').map(t => t.trim()).filter(Boolean);
  }

  // author
  const authorMatch = section.match(/\*\*author:\*\*\s*(.+)/i);
  if (authorMatch) doc.author = authorMatch[1].trim();

  // authorBio
  const bioMatch = section.match(/\*\*authorBio:\*\*\s*(.+?)(?:\n\*\*|\n\n)/s);
  if (bioMatch) doc.authorBio = bioMatch[1].trim();

  // dataTimePeriod
  const dtpMatch = section.match(/\*\*dataTimePeriod:\*\*\s*\{(.+?)\}/s);
  if (dtpMatch) {
    const raw = dtpMatch[1];
    const sdMatch = raw.match(/startDate:\s*(\S+)/);
    const edMatch = raw.match(/endDate:\s*(\S+)/);
    const lblMatch = raw.match(/label:\s*"(.+?)"/);
    doc.dataTimePeriod = {
      startDate: sdMatch ? sdMatch[1].replace(/,/g, '') : undefined,
      endDate: edMatch ? edMatch[1].replace(/,/g, '') : undefined,
      label: lblMatch ? lblMatch[1] : undefined,
    };
  }

  // dataSources (numbered list)
  const dsSection = extractBetween(section, '**dataSources:**', '\n**');
  if (dsSection) {
    doc.dataSources = [];
    const dsLines = dsSection.split('\n').filter(l => l.match(/^\d+\./));
    for (const line of dsLines) {
      // Format: 1. Bank of Greece — Travel Services Balance of Payments | https://... | Monthly border survey...
      const parts = line.replace(/^\d+\.\s*/, '').split('|').map(p => p.trim());
      if (parts.length >= 2) {
        const nameDesc = parts[0].split(' — ');
        doc.dataSources.push({
          _key: randomKey(),
          _type: 'dataSource',
          name: nameDesc[0]?.trim() || parts[0],
          description: parts[2]?.trim() || nameDesc[1]?.trim() || '',
          url: parts[1]?.startsWith('http') ? parts[1] : undefined,
          accessDate: new Date().toISOString().split('T')[0],
        });
      }
    }
  }

  // methodology
  const methMatch = section.match(/\*\*methodology:\*\*\s*(.+?)(?:\n\n\*\*|\n\*\*dataDisclaimer)/s);
  if (methMatch && !doc.methodology) {
    doc.methodology = methMatch[1].trim();
  }

  // dataDisclaimer
  const disclaimerMatch = section.match(/\*\*dataDisclaimer:\*\*\s*(.+?)(?:\n\n\*\*|\n\*\*schema)/s);
  if (disclaimerMatch) doc.dataDisclaimer = disclaimerMatch[1].trim();

  // schemaArticleType
  const satMatch = section.match(/\*\*schemaArticleType:\*\*\s*(.+)/i);
  if (satMatch) doc.schemaArticleType = satMatch[1].trim();

  // enableFaqSchema
  const faqEnabled = section.match(/\*\*enableFaqSchema:\*\*\s*(\w+)/i);
  if (faqEnabled) doc.enableFaqSchema = faqEnabled[1].trim() === 'true';

  // enableDatasetSchema
  const dsEnabled = section.match(/\*\*enableDatasetSchema:\*\*\s*(\w+)/i);
  if (dsEnabled) doc.enableDatasetSchema = dsEnabled[1].trim() === 'true';

  // enableBreadcrumbSchema
  const bcEnabled = section.match(/\*\*enableBreadcrumbSchema:\*\*\s*(\w+)/i);
  if (bcEnabled) doc.enableBreadcrumbSchema = bcEnabled[1].trim() === 'true';

  // ctaType
  const ctaMatch = section.match(/\*\*ctaType:\*\*\s*(.+)/i);
  if (ctaMatch) doc.ctaType = ctaMatch[1].trim();

  // ctaCustomText
  const ctaTextMatch = section.match(/\*\*ctaCustomText:\*\*\s*(.+)/i);
  if (ctaTextMatch) doc.ctaCustomText = ctaTextMatch[1].trim();

  // FAQ items
  const faqSection = extractBetween(section, '**faqItems:**', '\n**related');
  if (faqSection) {
    doc.faqItems = [];
    const faqLines = faqSection.split('\n- Q: ').filter(Boolean);
    for (const faq of faqLines) {
      const qaMatch = faq.match(/(.+?)\s*A:\s*(.+)/s);
      if (qaMatch) {
        doc.faqItems.push({
          _key: randomKey(),
          _type: 'faqItem',
          question: qaMatch[1].replace(/^Q:\s*/i, '').trim(),
          answer: qaMatch[2].trim(),
        });
      }
    }
  }

  // relatedInsights (slugs — for manual linking reference)
  const riSection = extractBetween(section, '**relatedInsights (slugs):**', '\n**related');
  if (riSection) {
    doc._relatedInsightSlugs = riSection.split('\n')
      .filter(l => l.trim().startsWith('- '))
      .map(l => l.replace(/^- /, '').trim());
  }

  // relatedBlogPosts (slugs — for manual linking reference)
  const rbSection = extractBetween(section, '**relatedBlogPosts (slugs):**', '\n**external');
  if (rbSection) {
    doc._relatedBlogSlugs = rbSection.split('\n')
      .filter(l => l.trim().startsWith('- '))
      .map(l => l.replace(/^- /, '').trim());
  }

  // externalReferences
  const erSection = extractBetween(section, '**externalReferences:**', null);
  if (erSection) {
    doc.externalReferences = [];
    const erLines = erSection.split('\n- ').filter(Boolean);
    for (const line of erLines) {
      // Format: Bank of Greece: Travel Services Balance 2024 | https://... | Bank of Greece
      const parts = line.split('|').map(p => p.trim());
      if (parts.length >= 2) {
        doc.externalReferences.push({
          _key: randomKey(),
          _type: 'externalRef',
          title: parts[0].replace(/^- /, ''),
          url: parts[1]?.startsWith('http') ? parts[1] : '',
          source: parts[2] || '',
        });
      }
    }
  }
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function randomKey() {
  return randomUUID().replace(/-/g, '').slice(0, 12);
}

function extractSection(md, heading, endMarkers) {
  const headingRegex = new RegExp(`^##\\s+${escapeRegex(heading)}`, 'mi');
  const match = md.match(headingRegex);
  if (!match) return null;
  
  const startIdx = match.index + match[0].length;
  let endIdx = md.length;
  
  if (endMarkers && endMarkers.length > 0) {
    for (const marker of endMarkers) {
      if (marker === '---') {
        // Only match standalone --- on its own line (not inside tables)
        const sepRegex = /\n---\s*\n/g;
        sepRegex.lastIndex = startIdx;
        const sepMatch = sepRegex.exec(md);
        if (sepMatch && sepMatch.index < endIdx) {
          endIdx = sepMatch.index;
        }
      } else if (marker === '## ') {
        // Next H2 heading
        const nextH2Regex = /\n## /g;
        nextH2Regex.lastIndex = startIdx + 1;
        const h2Match = nextH2Regex.exec(md);
        if (h2Match && h2Match.index < endIdx) {
          endIdx = h2Match.index;
        }
      } else {
        const idx = md.indexOf(marker, startIdx + 1);
        if (idx !== -1 && idx < endIdx) {
          endIdx = idx;
        }
      }
    }
  }
  
  return md.slice(startIdx, endIdx);
}

function extractBetween(text, startMarker, endMarker) {
  const startIdx = text.indexOf(startMarker);
  if (startIdx === -1) return null;
  
  const contentStart = startIdx + startMarker.length;
  let endIdx = text.length;
  
  if (endMarker) {
    const idx = text.indexOf(endMarker, contentStart);
    if (idx !== -1) endIdx = idx;
  }
  
  return text.slice(contentStart, endIdx);
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[–—]/g, '-')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 96);
}

// ============================================================================
// BUILD SANITY DOCUMENT
// ============================================================================

function buildSanityDocument(parsed, slug) {
  const now = new Date().toISOString();
  
  const doc = {
    _type: 'insight',
    
    // --- Tab 1: Content ---
    title: parsed.title,
    slug: { _type: 'slug', current: slug },
    subtitle: parsed.subtitle || undefined,
    excerpt: parsed.excerpt || undefined,
    insightType: parsed.insightType || parsed._insightTypeFromCategory || 'statistics',
    topics: parsed.topics || [],
    author: parsed.author || 'Greek Trip Planner Research',
    authorBio: parsed.authorBio || 'The Greek Trip Planner research team analyzes tourism data, government statistics, and industry reports to provide actionable insights for travelers and travel professionals.',
    publishedAt: now,
    readingTime: parsed.readingTime || undefined,
    showTableOfContents: true,
    
    keyMetrics: parsed.keyMetrics || [],
    body: parsed.body || [],
    keyTakeaways: parsed.keyTakeaways || [],
    
    // --- Tab 2: Data & Sources ---
    dataTimePeriod: parsed.dataTimePeriod || (parsed._dataTimePeriodLabel ? { label: parsed._dataTimePeriodLabel } : undefined),
    dataSources: parsed.dataSources || [],
    methodology: parsed.methodology || undefined,
    dataDisclaimer: parsed.dataDisclaimer || undefined,
    
    // --- Tab 3: SEO & Meta ---
    metaTitle: parsed.title.length <= 60 ? parsed.title : parsed.title.slice(0, 57) + '...',
    metaDescription: (parsed.excerpt || '').slice(0, 160),
    focusKeyword: parsed.focusKeyword || undefined,
    secondaryKeywords: parsed.secondaryKeywords || [],
    
    // --- Tab 4: Schema Markup ---
    schemaArticleType: parsed.schemaArticleType || 'Article',
    enableFaqSchema: parsed.enableFaqSchema ?? (parsed.faqItems?.length > 0),
    faqItems: parsed.faqItems || [],
    enableDatasetSchema: parsed.enableDatasetSchema ?? true,
    enableBreadcrumbSchema: parsed.enableBreadcrumbSchema ?? true,
    
    // --- Tab 5: Related Content ---
    ctaType: parsed.ctaType || 'plan-trip',
    ctaCustomText: parsed.ctaCustomText || undefined,
    externalReferences: parsed.externalReferences || [],
  };
  
  // Remove undefined values
  return JSON.parse(JSON.stringify(doc));
}

// ============================================================================
// SANITY API — Push document
// ============================================================================

async function pushToSanity(doc) {
  const url = `https://${CONFIG.projectId}.api.sanity.io/v${CONFIG.apiVersion}/data/mutate/${CONFIG.dataset}`;
  
  const mutation = {
    mutations: [
      {
        createOrReplace: {
          ...doc,
          _id: `insight-${doc.slug.current}`,
        },
      },
    ],
  };
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${CONFIG.token}`,
    },
    body: JSON.stringify(mutation),
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Sanity API error (${response.status}): ${error}`);
  }
  
  return response.json();
}

// ============================================================================
// RESOLVE REFERENCES — Look up _ids for related slugs
// ============================================================================

async function resolveReferences(doc, parsed) {
  if (!CONFIG.token) return doc;
  
  const resolvedDoc = { ...doc };
  
  // Resolve related insights
  if (parsed._relatedInsightSlugs?.length) {
    const slugList = parsed._relatedInsightSlugs.map(s => `"${s}"`).join(',');
    const query = `*[_type == "insight" && slug.current in [${slugList}]]{ _id, slug }`;
    const refs = await querySanity(query);
    
    if (refs.length > 0) {
      resolvedDoc.relatedInsights = refs.map(r => ({
        _key: randomKey(),
        _type: 'reference',
        _ref: r._id,
      }));
      console.log(`  ✓ Resolved ${refs.length}/${parsed._relatedInsightSlugs.length} related insights`);
    }
    
    const missing = parsed._relatedInsightSlugs.filter(
      s => !refs.find(r => r.slug?.current === s)
    );
    if (missing.length) {
      console.log(`  ⚠ Could not find insight documents for: ${missing.join(', ')}`);
    }
  }
  
  // Resolve related blog posts
  if (parsed._relatedBlogSlugs?.length) {
    const slugList = parsed._relatedBlogSlugs.map(s => `"${s}"`).join(',');
    const query = `*[_type == "post" && slug.current in [${slugList}]]{ _id, slug }`;
    const refs = await querySanity(query);
    
    if (refs.length > 0) {
      resolvedDoc.relatedBlogPosts = refs.map(r => ({
        _key: randomKey(),
        _type: 'reference',
        _ref: r._id,
      }));
      console.log(`  ✓ Resolved ${refs.length}/${parsed._relatedBlogSlugs.length} related blog posts`);
    }
    
    const missing = parsed._relatedBlogSlugs.filter(
      s => !refs.find(r => r.slug?.current === s)
    );
    if (missing.length) {
      console.log(`  ⚠ Could not find blog posts for: ${missing.join(', ')}`);
    }
  }
  
  return resolvedDoc;
}

async function querySanity(query) {
  const url = `https://${CONFIG.projectId}.api.sanity.io/v${CONFIG.apiVersion}/data/query/${CONFIG.dataset}?query=${encodeURIComponent(query)}`;
  
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${CONFIG.token}` },
  });
  
  if (!response.ok) return [];
  const data = await response.json();
  return data.result || [];
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

async function main() {
  console.log('\n📄 INSIGHT ARTICLE → SANITY IMPORTER\n');
  
  // 1. Read file
  let markdown;
  try {
    markdown = readFileSync(filePath, 'utf-8');
  } catch (err) {
    console.error(`❌ Cannot read file: ${filePath}`);
    process.exit(1);
  }
  console.log(`  Reading: ${filePath} (${(markdown.length / 1024).toFixed(1)} KB)`);
  
  // 2. Parse
  console.log('  Parsing article structure...');
  const parsed = parseArticle(markdown);
  
  // 3. Determine slug
  const slug = customSlug || slugify(parsed.title);
  console.log(`  Slug: ${slug}`);
  
  // 4. Build Sanity document
  let doc = buildSanityDocument(parsed, slug);
  
  // 5. Print summary
  console.log('\n📊 PARSED CONTENT SUMMARY:');
  console.log('  ─────────────────────────────────────');
  console.log(`  Title:           ${doc.title}`);
  console.log(`  Subtitle:        ${(doc.subtitle || '').slice(0, 60)}...`);
  console.log(`  Excerpt:         ${(doc.excerpt || '').slice(0, 60)}...`);
  console.log(`  Type:            ${doc.insightType}`);
  console.log(`  Topics:          ${(doc.topics || []).length} tags`);
  console.log(`  Reading Time:    ${doc.readingTime} min`);
  console.log(`  Key Metrics:     ${(doc.keyMetrics || []).length} items`);
  console.log(`  Key Takeaways:   ${(doc.keyTakeaways || []).length} items`);
  console.log(`  Body Blocks:     ${(doc.body || []).length} Portable Text blocks`);
  console.log(`  Data Sources:    ${(doc.dataSources || []).length} sources`);
  console.log(`  FAQ Items:       ${(doc.faqItems || []).length} questions`);
  console.log(`  Ext References:  ${(doc.externalReferences || []).length} links`);
  console.log(`  Focus Keyword:   ${doc.focusKeyword || '(none)'}`);
  console.log(`  Secondary KWs:   ${(doc.secondaryKeywords || []).length}`);
  console.log(`  Schema Type:     ${doc.schemaArticleType}`);
  console.log(`  FAQ Schema:      ${doc.enableFaqSchema}`);
  console.log(`  Dataset Schema:  ${doc.enableDatasetSchema}`);
  console.log(`  CTA:             ${doc.ctaType} — "${doc.ctaCustomText || '(default)'}"`);
  
  if (parsed._relatedInsightSlugs?.length) {
    console.log(`  Related Insights: ${parsed._relatedInsightSlugs.join(', ')}`);
  }
  if (parsed._relatedBlogSlugs?.length) {
    console.log(`  Related Blog:    ${parsed._relatedBlogSlugs.join(', ')}`);
  }
  
  console.log('  ─────────────────────────────────────');
  
  // 6. Dry run or push
  if (dryRun) {
    console.log('\n🔍 DRY RUN — Writing JSON to: import-preview.json');
    const { writeFileSync } = await import('fs');
    writeFileSync('import-preview.json', JSON.stringify(doc, null, 2));
    console.log(`  File size: ${(JSON.stringify(doc).length / 1024).toFixed(1)} KB`);
    console.log('  Review the file, then run without --dry-run to push to Sanity.\n');
    return;
  }
  
  // Check for token
  if (!CONFIG.token) {
    console.error('\n❌ No SANITY_TOKEN set. Either:');
    console.error('   1. Set SANITY_TOKEN environment variable');
    console.error('   2. Edit CONFIG.token in this script');
    console.error('   3. Use --dry-run to generate JSON for manual import\n');
    
    // Still output JSON for manual use
    const { writeFileSync } = await import('fs');
    writeFileSync('import-preview.json', JSON.stringify(doc, null, 2));
    console.log('  📁 Wrote import-preview.json for manual import.\n');
    process.exit(1);
  }
  
  // 7. Resolve references
  console.log('\n🔗 Resolving document references...');
  doc = await resolveReferences(doc, parsed);
  
  // 8. Push to Sanity
  console.log('\n🚀 Pushing to Sanity...');
  console.log(`   Project: ${CONFIG.projectId}`);
  console.log(`   Dataset: ${CONFIG.dataset}`);
  console.log(`   Doc ID:  insight-${slug}`);
  
  try {
    const result = await pushToSanity(doc);
    console.log('\n✅ SUCCESS! Document created/updated in Sanity.');
    console.log(`   View in Studio: https://${CONFIG.projectId}.sanity.studio/structure/insight;insight-${slug}`);
    console.log(`   Live URL: https://greektriplanner.me/insights/${slug}\n`);
  } catch (err) {
    console.error(`\n❌ Push failed: ${err.message}`);
    
    // Save JSON as fallback
    const { writeFileSync } = await import('fs');
    writeFileSync('import-failed.json', JSON.stringify(doc, null, 2));
    console.error('   Saved document to import-failed.json for debugging.\n');
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
