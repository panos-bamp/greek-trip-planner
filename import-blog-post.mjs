#!/usr/bin/env node
/**
 * ============================================================================
 * BLOG POST → SANITY CMS IMPORTER (v3 — real format)
 * ============================================================================
 * 
 * Parses the actual Greek Trip Planner blog markdown format and pushes to Sanity.
 * 
 * ARTICLE FORMAT SUPPORTED:
 *   TAB-structured reference block at top with:
 *     TITLE:\n value
 *     SLUG:\n value
 *     FAQ 1:\n  Question: ...\n  Answer: ...
 *     Hotel 1:\n  Name: ...\n  Location: ...\n  Link: ...
 *     Tip 1: text
 *   Body after "ARTICLE BODY STARTS BELOW" marker
 * 
 * Also supports the older **Field:** value format as fallback.
 * 
 * USAGE:
 *   node import-blog-post.mjs <markdown-file> [--dry-run] [--slug=custom-slug]
 * ============================================================================
 */

import { readFileSync } from 'fs';
import { randomUUID } from 'crypto';

const CONFIG = {
  projectId: process.env.SANITY_PROJECT_ID || 'puhk8qa7',
  dataset: process.env.SANITY_DATASET || 'production',
  token: process.env.SANITY_TOKEN || '',
  apiVersion: '2024-01-01',
};

// CLI
const args = process.argv.slice(2);
const flags = {};
const positional = [];
for (const arg of args) {
  if (arg.startsWith('--')) { const [key, val] = arg.slice(2).split('='); flags[key] = val ?? true; }
  else positional.push(arg);
}
const filePath = positional[0];
const dryRun = flags['dry-run'] === true;
const customSlug = flags['slug'] || null;
if (!filePath) { console.error('Usage: node import-blog-post.mjs <markdown-file> [--dry-run] [--slug=custom-slug]'); process.exit(1); }

// ============================================================================
// FORMAT DETECTION
// ============================================================================

function detectFormat(markdown) {
  // Format A: "Sanity CMS Field Reference" with ═══ TAB sections
  if (markdown.includes('═══') || markdown.match(/^TITLE:\s*$/m) || markdown.includes('TAB 1: CONTENT')) {
    return 'field-reference';
  }
  // Format B: Traditional markdown with **field:** value patterns
  return 'markdown';
}

// ============================================================================
// MAIN PARSER — dispatches to format-specific parser
// ============================================================================

function parseArticle(markdown) {
  const format = detectFormat(markdown);
  console.log(`  Format:  ${format === 'field-reference' ? '📋 Sanity CMS Field Reference' : '📝 Traditional Markdown'}`);
  return format === 'field-reference' ? parseFormatA(markdown) : parseFormatB(markdown);
}

// ============================================================================
// FORMAT A PARSER — TAB-structured "Sanity CMS Field Reference"
// ============================================================================

function parseFormatA(markdown) {
  const doc = {};

  // Split into reference section and body
  const bodyMarkerIdx = markdown.indexOf('ARTICLE BODY STARTS BELOW');
  const refSection = bodyMarkerIdx !== -1 ? markdown.slice(0, bodyMarkerIdx) : markdown;
  const bodySection = bodyMarkerIdx !== -1 ? markdown.slice(bodyMarkerIdx) : '';

  // ─── TAB 1: CONTENT ──────────────────────────
  doc.title = grabField(refSection, 'TITLE') || grabFirstH1(bodySection) || 'Untitled';
  doc.slug = grabField(refSection, 'SLUG');
  doc.author = grabField(refSection, 'AUTHOR') || 'Greek Trip Planner';
  doc.categories = grabBulletList(refSection, 'CATEGORIES');
  doc.publishedAt = parseDate(grabField(refSection, 'PUBLISHED DATE'));
  doc.readingTime = parseInt(grabField(refSection, 'READING TIME')) || null;
  doc.excerpt = grabMultiLineField(refSection, 'EXCERPT');
  doc.mainImageAlt = grabField(refSection, 'MAIN IMAGE ALT TEXT');

  // ─── TAB 2: SEO & META ──────────────────────
  doc.metaTitle = grabFieldWithParens(refSection, 'META TITLE');
  doc.metaDescription = grabFieldWithParens(refSection, 'META DESCRIPTION');
  doc.focusKeyword = grabField(refSection, 'FOCUS KEYWORD');
  doc.secondaryKeywords = grabField(refSection, 'SECONDARY KEYWORDS')
    ?.split(',').map(k => k.trim()).filter(Boolean) || [];
  doc.canonicalUrl = grabField(refSection, 'CANONICAL URL');

  // Open Graph (indented under "OPEN GRAPH:")
  const ogBlock = grabIndentedBlock(refSection, 'OPEN GRAPH');
  if (ogBlock) {
    doc.ogTitle = grabIndentedField(ogBlock, 'OG Title');
    doc.ogDescription = grabIndentedField(ogBlock, 'OG Description');
    doc.ogImageAlt = grabIndentedField(ogBlock, 'OG Image Alt');
  }

  // Twitter Card (indented under "TWITTER CARD:")
  const twBlock = grabIndentedBlock(refSection, 'TWITTER CARD');
  if (twBlock) {
    doc.twitterCard = grabIndentedField(twBlock, 'Card Type');
    doc.twitterTitle = grabIndentedField(twBlock, 'Twitter Title');
    doc.twitterDescription = grabIndentedField(twBlock, 'Twitter Description');
  }

  // ─── TAB 3: SCHEMA MARKUP ──────────────────
  // Article Schema
  doc._articleEnabled = refSection.includes('ARTICLE SCHEMA: ✅ ENABLED') || refSection.includes('ARTICLE SCHEMA: ✅');
  const articleBlock = grabSchemaBlock(refSection, 'ARTICLE SCHEMA');
  if (articleBlock) {
    doc._articleHeadline = grabIndentedField(articleBlock, 'Headline');
    doc._articleDescription = grabIndentedField(articleBlock, 'Description');
    doc._articleWordCount = parseInt(grabIndentedField(articleBlock, 'Word Count')) || null;
    doc._articleSection = grabIndentedField(articleBlock, 'Article Section');
    doc._articleKeywords = grabIndentedField(articleBlock, 'Keywords');
  }

  // FAQ Schema
  doc._faqEnabled = refSection.includes('FAQ SCHEMA: ✅ ENABLED') || refSection.includes('FAQ SCHEMA: ✅');
  doc.faqItems = parseNumberedFaqs(refSection);

  // How-To Schema
  doc._howtoEnabled = refSection.includes('HOW-TO SCHEMA: ✅ ENABLED') || refSection.includes('HOW-TO SCHEMA: ✅');

  // Review Schema
  doc._reviewEnabled = refSection.includes('REVIEW SCHEMA: ✅ ENABLED') || refSection.includes('REVIEW SCHEMA: ✅');

  // Event Schema
  doc._eventEnabled = refSection.includes('EVENT SCHEMA: ✅ ENABLED') || refSection.includes('EVENT SCHEMA: ✅');

  // Place Schema
  doc._placeEnabled = refSection.includes('PLACE SCHEMA: ✅ ENABLED') || refSection.includes('PLACE SCHEMA: ✅');
  const placeBlock = grabSchemaBlock(refSection, 'PLACE SCHEMA');
  if (placeBlock) {
    doc._places = [];
    const place = {};
    const pn = grabIndentedField(placeBlock, 'Place Name'); if (pn) place.name = pn;
    const pd = grabIndentedField(placeBlock, 'Description'); if (pd) place.description = pd;
    const plat = grabIndentedField(placeBlock, 'Latitude'); if (plat) place.latitude = parseFloat(plat);
    const plng = grabIndentedField(placeBlock, 'Longitude'); if (plng) place.longitude = parseFloat(plng);
    const paddr = grabIndentedField(placeBlock, 'Address'); if (paddr) place.address = paddr;
    const pimg = grabIndentedField(placeBlock, 'Image'); if (pimg) place.image = pimg;
    if (place.name) { place._key = randomKey(); doc._places.push(place); }
  }

  // Video Schema
  doc._videoEnabled = refSection.includes('VIDEO SCHEMA: ✅ ENABLED') || refSection.includes('VIDEO SCHEMA: ✅');

  // Recipe Schema
  doc._recipeEnabled = refSection.includes('RECIPE SCHEMA: ✅ ENABLED') || refSection.includes('RECIPE SCHEMA: ✅');

  // Product Schema
  doc._productEnabled = refSection.includes('PRODUCT SCHEMA: ✅ ENABLED') || refSection.includes('PRODUCT SCHEMA: ✅');

  // Breadcrumb Schema
  doc._breadcrumbEnabled = refSection.includes('BREADCRUMB SCHEMA: ✅ ENABLED') || refSection.includes('BREADCRUMB SCHEMA: ✅');
  const bcBlock = grabSchemaBlock(refSection, 'BREADCRUMB SCHEMA');
  if (bcBlock) {
    doc._customBreadcrumbs = [];
    const bcLines = bcBlock.split('\n').filter(l => l.trim().startsWith('Level'));
    for (const line of bcLines) {
      const m = line.match(/Level\s*\d+:\s*(.+?)\s*→\s*(https?:\/\/\S+)/i);
      if (m) doc._customBreadcrumbs.push({ _key: randomKey(), name: m[1].trim(), url: m[2].trim() });
    }
  }

  // ─── TAB 4: AFFILIATE & MONETIZATION ─────────
  doc.urgencyMessage = grabSectionField(refSection, 'URGENCY ALERT MESSAGE');
  if (doc.urgencyMessage?.includes('leave empty') || doc.urgencyMessage?.includes('not applicable')) doc.urgencyMessage = null;

  doc.affiliateHotels = parseNumberedHotels(refSection);
  doc.affiliateTours = parseNumberedTours(refSection);

  const insuranceVal = grabSectionField(refSection, 'INSURANCE AFFILIATE LINK');
  doc.insuranceLink = (insuranceVal && insuranceVal.startsWith('http')) ? insuranceVal : null;

  doc.costBreakdown = parseCostBreakdownStructured(refSection);
  doc.proTips = parseNumberedTips(refSection);

  const ctaBooking = grabSectionField(refSection, 'FINAL CTA BOOKING LINK');
  doc.finalCtaBookingLink = (ctaBooking && ctaBooking.startsWith('http')) ? ctaBooking : null;

  const ctaTours = grabSectionField(refSection, 'FINAL CTA TOURS LINK');
  doc.finalCtaToursLink = (ctaTours && ctaTours.startsWith('http')) ? ctaTours : null;

  // ─── BODY ────────────────────────────────────
  doc.body = parseBody(bodySection);
  doc.wordCount = doc._articleWordCount || countWords(bodySection);

  return doc;
}

// ============================================================================
// FORMAT B PARSER — Traditional Markdown with **field:** value patterns
// ============================================================================

function parseFormatB(markdown) {
  const doc = {};

  // ─── Helper: grab **label:** value ───
  const grab = (label) => {
    const regex = new RegExp(`\\*\\*${escapeRegex(label)}:\\*\\*\\s*(.+?)(?:\\n\\n|\\n\\*\\*|$)`, 'is');
    const m = markdown.match(regex);
    return m ? m[1].trim() : null;
  };

  // ─── Title: H1 ───
  const h1 = markdown.match(/^# (.+)$/m);
  doc.title = h1 ? h1[1].trim() : 'Untitled';

  // ─── Front-matter-style fields ───
  doc.excerpt = grab('Excerpt');
  doc.author = grab('author') || grab('Author') || 'Greek Trip Planner';
  doc.focusKeyword = grab('Focus keyword') || grab('Focus Keyword');
  doc.secondaryKeywords = (grab('Secondary keywords') || grab('Secondary Keywords') || '')
    .split(',').map(k => k.trim()).filter(Boolean);

  const readingTime = grab('Reading time') || grab('Reading Time');
  if (readingTime) doc.readingTime = parseInt(readingTime);

  const pubDate = grab('Published') || grab('Published date') || grab('publishedAt');
  doc.publishedAt = pubDate ? parseDate(pubDate) : null;

  // Categories (try multiple patterns)
  const catMatch = markdown.match(/\*\*Categor(?:y|ies):\*\*\s*(.+?)(?:\n\n|\n\*\*)/is);
  if (catMatch) {
    doc.categories = catMatch[1].split(',').map(c => c.trim()).filter(Boolean);
  } else {
    doc.categories = [];
  }

  // ─── SEO & Meta (auto-generate from title/excerpt if not explicit) ───
  doc.metaTitle = grab('Meta title') || grab('metaTitle');
  doc.metaDescription = grab('Meta description') || grab('metaDescription');
  doc.canonicalUrl = grab('Canonical URL') || grab('canonicalUrl');
  doc.ogTitle = grab('ogTitle') || grab('OG Title');
  doc.ogDescription = grab('ogDescription') || grab('OG Description');
  doc.ogImage = grab('ogImage') || grab('OG Image');
  doc.twitterCard = grab('twitterCard') || grab('Twitter Card') || 'summary_large_image';
  doc.twitterTitle = grab('twitterTitle') || grab('Twitter Title');
  doc.twitterDescription = grab('twitterDescription') || grab('Twitter Description');

  // ─── Schema flags (bottom of file) ───
  const schemaType = grab('schemaArticleType');
  doc._articleEnabled = true; // always enabled for blog posts
  doc._articleType = schemaType || 'BlogPosting';

  const faqFlag = grab('enableFaqSchema');
  doc._faqEnabled = faqFlag === 'true' || undefined;

  const bcFlag = grab('enableBreadcrumbSchema');
  doc._breadcrumbEnabled = bcFlag === 'true' || bcFlag !== 'false';

  // ─── FAQ items: "- Q: question A: answer" format ───
  doc.faqItems = [];
  const faqSection = markdown.match(/\*\*faqItems:\*\*\s*\n([\s\S]*?)(?=\n\*\*\w|$)/i);
  if (faqSection) {
    const faqLines = faqSection[1].split('\n').filter(l => l.trim().startsWith('- Q:'));
    for (const line of faqLines) {
      const m = line.match(/^[\s]*-\s*Q:\s*(.+?)\s*A:\s*(.+)/i);
      if (m) {
        doc.faqItems.push({
          _key: randomKey(),
          question: m[1].trim(),
          answer: m[2].trim(),
        });
      }
    }
  }
  // Also try inline FAQ format: **Question?**\nAnswer in body
  if (!doc.faqItems.length) {
    const faqBodySection = markdown.match(/## FAQs?\b[\s\S]*?(?=\n## |\n---\s*\n\*\*|$)/i);
    if (faqBodySection) {
      const faqBlocks = faqBodySection[0].split(/\n\n(?=\*\*)/);
      for (const block of faqBlocks) {
        const qm = block.match(/\*\*(.+?\?)\*\*\s*\n([\s\S]+)/);
        if (qm) {
          doc.faqItems.push({
            _key: randomKey(),
            question: qm[1].trim(),
            answer: qm[2].trim().replace(/\n/g, ' '),
          });
        }
      }
    }
  }

  // ─── Body: content after "## ARTICLE BODY" ───
  const bodyMarker = markdown.indexOf('## ARTICLE BODY');
  if (bodyMarker !== -1) {
    let bodyMd = markdown.slice(bodyMarker + '## ARTICLE BODY'.length).trim();
    // Find where body ends (before bottom metadata or FAQs section used for schema)
    const endMarkers = [
      '\n---\n\n**author:',
      '\n**author:',
      '\n**schemaArticleType:',
      '\n**enableFaqSchema:',
      '\n**faqItems:',
      '\n**relatedBlogPosts',
      '\n**externalReferences',
    ];
    let endIdx = bodyMd.length;
    for (const marker of endMarkers) {
      const idx = bodyMd.indexOf(marker);
      if (idx !== -1 && idx < endIdx) endIdx = idx;
    }
    bodyMd = bodyMd.slice(0, endIdx).trim();
    doc.body = markdownToPortableText(bodyMd);
  } else {
    // No explicit marker — try to find first content H2
    const lines = markdown.split('\n');
    let start = -1;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].match(/^## /) && !lines[i].match(/^## Key (Metrics|Takeaways)/i)) {
        start = i;
        break;
      }
    }
    if (start >= 0) {
      let bodyMd = lines.slice(start).join('\n');
      // Trim bottom metadata
      const endMarkers = ['\n---\n\n**author:', '\n**author:', '\n**schemaArticleType:', '\n**faqItems:', '\n**relatedBlogPosts'];
      let endIdx = bodyMd.length;
      for (const marker of endMarkers) {
        const idx = bodyMd.indexOf(marker);
        if (idx !== -1 && idx < endIdx) endIdx = idx;
      }
      bodyMd = bodyMd.slice(0, endIdx).trim();
      doc.body = markdownToPortableText(bodyMd);
    } else {
      doc.body = [];
    }
  }

  doc.wordCount = countWords(doc.body ? doc.body.map(b => (b.children || []).map(c => c.text || '').join(' ')).join(' ') : '');

  // ─── Affiliate fields (this format typically has none, but check) ───
  doc.affiliateHotels = [];
  doc.affiliateTours = [];
  doc.costBreakdown = [];
  doc.proTips = [];

  return doc;
}

/** Grab "LABEL:\nvalue" where value is on the next non-empty line */
// ============================================================================
// FIELD EXTRACTION HELPERS (for TAB-structured format A)
// ============================================================================

/** Grab "LABEL:\nvalue" where value is on the next non-empty line */
function grabField(text, label) {
  const regex = new RegExp(`^${escapeRegex(label)}:\\s*$`, 'mi');
  const match = text.match(regex);
  if (!match) {
    // Fallback: try "LABEL: value" on same line
    const inline = text.match(new RegExp(`^${escapeRegex(label)}:\\s*(.+)$`, 'mi'));
    return inline ? inline[1].trim() : null;
  }
  // Get next non-empty line
  const afterIdx = match.index + match[0].length;
  const rest = text.slice(afterIdx);
  const nextLine = rest.split('\n').find(l => l.trim() !== '');
  return nextLine ? nextLine.trim() : null;
}

/** Grab "LABEL (optional parens):\nvalue" */
function grabFieldWithParens(text, label) {
  const regex = new RegExp(`^${escapeRegex(label)}(?:\\s*\\([^)]*\\))?:\\s*$`, 'mi');
  const match = text.match(regex);
  if (!match) {
    const inline = text.match(new RegExp(`^${escapeRegex(label)}(?:\\s*\\([^)]*\\))?:\\s*(.+)$`, 'mi'));
    return inline ? inline[1].trim() : null;
  }
  const afterIdx = match.index + match[0].length;
  const rest = text.slice(afterIdx);
  const nextLine = rest.split('\n').find(l => l.trim() !== '');
  return nextLine ? nextLine.trim() : null;
}

/** Grab multi-line field value (stops at next header or blank section) */
function grabMultiLineField(text, label) {
  const regex = new RegExp(`^${escapeRegex(label)}:\\s*$`, 'mi');
  const match = text.match(regex);
  if (!match) return grabField(text, label);
  const afterIdx = match.index + match[0].length;
  const rest = text.slice(afterIdx);
  const lines = [];
  for (const line of rest.split('\n')) {
    if (line.trim() === '') { if (lines.length > 0) break; continue; }
    if (/^[A-Z\s]+:/.test(line.trim()) && !line.startsWith(' ')) break;
    if (line.startsWith('═══')) break;
    lines.push(line.trim());
  }
  return lines.join(' ').trim() || null;
}

/** Grab bullet list under a label: "LABEL:\n- item1\n- item2" */
function grabBulletList(text, label) {
  const regex = new RegExp(`^${escapeRegex(label)}:\\s*$`, 'mi');
  const match = text.match(regex);
  if (!match) {
    // Fallback: comma-separated on same line
    const inline = text.match(new RegExp(`^${escapeRegex(label)}:\\s*(.+)$`, 'mi'));
    if (inline) return inline[1].split(',').map(s => s.trim()).filter(Boolean);
    return [];
  }
  const afterIdx = match.index + match[0].length;
  const rest = text.slice(afterIdx);
  const items = [];
  for (const line of rest.split('\n')) {
    if (line.trim().startsWith('- ')) items.push(line.trim().replace(/^- /, ''));
    else if (line.trim() === '' && items.length > 0) break;
    else if (items.length > 0) break;
  }
  return items;
}

/** Grab an indented block under "LABEL:" */
function grabIndentedBlock(text, label) {
  const regex = new RegExp(`^${escapeRegex(label)}:\\s*$`, 'mi');
  const match = text.match(regex);
  if (!match) return null;
  const afterIdx = match.index + match[0].length;
  const rest = text.slice(afterIdx);
  const lines = [];
  for (const line of rest.split('\n')) {
    if (line.startsWith('  ') || line.startsWith('\t')) lines.push(line);
    else if (line.trim() === '' && lines.length === 0) continue;
    else if (lines.length > 0) break;
  }
  return lines.join('\n');
}

/** Grab "  Label: value" from an indented block */
function grabIndentedField(block, label) {
  const regex = new RegExp(`${escapeRegex(label)}:\\s*(.+)`, 'i');
  const match = block.match(regex);
  return match ? match[1].trim() : null;
}

/** Grab schema block (between ──── LABEL ──── and next ──── or ═══) */
function grabSchemaBlock(text, label) {
  const regex = new RegExp(`${escapeRegex(label)}[^\\n]*\\n`, 'i');
  const match = text.match(regex);
  if (!match) return null;
  const afterIdx = match.index + match[0].length;
  const rest = text.slice(afterIdx);
  const lines = [];
  let skippedHeaderBorder = false;
  for (const line of rest.split('\n')) {
    // Skip the first ──── line (bottom border of the header box)
    if (!skippedHeaderBorder && line.startsWith('──────')) { skippedHeaderBorder = true; continue; }
    // Stop at the next ──── or ═══ section
    if (skippedHeaderBorder && (line.startsWith('──────') || line.startsWith('═══'))) break;
    lines.push(line);
  }
  return lines.join('\n');
}

/** Grab value from a section with decorative headers:
 *  ──────────────────────────────────
 *  LABEL:
 *  ──────────────────────────────────
 *  value
 */
function grabSectionField(text, label) {
  const regex = new RegExp(`^${escapeRegex(label)}:\\s*$`, 'mi');
  const match = text.match(regex);
  if (!match) return null;
  const afterIdx = match.index + match[0].length;
  const rest = text.slice(afterIdx);
  const lines = [];
  for (const line of rest.split('\n')) {
    if (line.startsWith('──────')) { if (lines.length > 0) break; continue; }
    if (line.startsWith('═══')) break;
    if (line.trim() !== '') lines.push(line.trim());
    if (lines.length > 0 && line.trim() === '') break;
  }
  return lines.join(' ').trim() || null;
}

// ============================================================================
// PARSE NUMBERED ITEMS
// ============================================================================

/** Parse FAQ 1:\n  Question: ...\n  Answer: ... */
function parseNumberedFaqs(text) {
  const items = [];
  const faqRegex = /FAQ\s*\d+:\s*\n([\s\S]*?)(?=FAQ\s*\d+:|──────|═══|$)/gi;
  let match;
  while ((match = faqRegex.exec(text)) !== null) {
    const block = match[1];
    const question = grabIndentedField(block, 'Question');
    const answer = grabIndentedField(block, 'Answer');
    if (question && answer) {
      items.push({ _key: randomKey(), question, answer });
    }
  }
  return items;
}

/** Parse Hotel 1:\n  Name: ...\n  Location: ...\n  Rating: ...\n  Price: ...\n  Link: ...\n  Features: ... */
function parseNumberedHotels(text) {
  const items = [];
  const regex = /Hotel\s*\d+:\s*\n([\s\S]*?)(?=Hotel\s*\d+:|──────|═══|AFFILIATE TOURS:|$)/gi;
  let match;
  while ((match = regex.exec(text)) !== null) {
    const block = match[1];
    const name = grabIndentedField(block, 'Name');
    if (!name) continue;
    const item = { _key: randomKey(), name };
    const loc = grabIndentedField(block, 'Location'); if (loc) item.location = loc;
    const rat = grabIndentedField(block, 'Rating');
    if (rat && !rat.includes('leave empty')) item.rating = parseFloat(rat) || undefined;
    const pri = grabIndentedField(block, 'Price'); if (pri) item.price = pri;
    const img = grabIndentedField(block, 'Image');
    if (img && img.startsWith('http')) item.image = img;
    const lnk = grabIndentedField(block, 'Link');
    if (lnk && lnk.startsWith('http')) item.affiliateLink = lnk;
    const feat = grabIndentedField(block, 'Features');
    if (feat) item.features = feat.split(',').map(f => f.trim()).filter(Boolean);
    items.push(item);
  }
  return items;
}

/** Parse Tour 1:\n  Title: ...\n  Description: ...\n  Duration: ...\n  Price: ...\n  Link: ...\n  Highlights: ... */
function parseNumberedTours(text) {
  const items = [];
  const regex = /Tour\s*\d+:\s*\n([\s\S]*?)(?=Tour\s*\d+:|──────|═══|INSURANCE|$)/gi;
  let match;
  while ((match = regex.exec(text)) !== null) {
    const block = match[1];
    const title = grabIndentedField(block, 'Title');
    if (!title) continue;
    const item = { _key: randomKey(), title };
    const desc = grabIndentedField(block, 'Description'); if (desc) item.description = desc;
    const dur = grabIndentedField(block, 'Duration'); if (dur) item.duration = dur;
    const pri = grabIndentedField(block, 'Price'); if (pri) item.price = pri;
    const img = grabIndentedField(block, 'Image');
    if (img && img.startsWith('http')) item.image = img;
    const lnk = grabIndentedField(block, 'Link');
    if (lnk && lnk.startsWith('http')) item.affiliateLink = lnk;
    const hl = grabIndentedField(block, 'Highlights');
    if (hl) item.highlights = hl.split(',').map(h => h.trim()).filter(Boolean);
    items.push(item);
  }
  return items;
}

/** Parse Tip 1: text\n\nTip 2: text */
function parseNumberedTips(text) {
  const items = [];
  const regex = /Tip\s*\d+:\s*(.+?)(?=\nTip\s*\d+:|\n──────|\n═══|$)/gis;
  let match;
  while ((match = regex.exec(text)) !== null) {
    const tip = match[1].trim();
    if (tip) items.push(tip);
  }
  return items;
}

/** Parse structured cost breakdown (Budget/Mid-Range/Luxury blocks, not tables) */
function parseCostBreakdownStructured(text) {
  const items = [];
  // Find COST BREAKDOWN section
  const cbIdx = text.indexOf('COST BREAKDOWN:');
  if (cbIdx === -1) return items;
  const afterCb = text.slice(cbIdx);
  
  // Extract the section content: skip past the header border ──────, 
  // then collect everything until the next ──────
  const lines = afterCb.split('\n');
  const contentLines = [];
  let skippedHeader = false;
  let skippedBorder = false;
  for (const line of lines) {
    if (!skippedHeader) { skippedHeader = true; continue; } // skip "COST BREAKDOWN:" line
    if (!skippedBorder && line.startsWith('──────')) { skippedBorder = true; continue; } // skip header border
    if (skippedBorder && (line.startsWith('──────') || line.startsWith('═══'))) break; // stop at next section
    contentLines.push(line);
  }
  const cbSection = contentLines.join('\n');

  // Parse each budget tier
  const tiers = [];
  const tierRegex = /^\s*(Budget|Mid-Range|Mid Range|Luxury)\s*(?:\([^)]*\))?:\s*$/gmi;
  let tierMatch;
  const tierPositions = [];
  while ((tierMatch = tierRegex.exec(cbSection)) !== null) {
    tierPositions.push({ name: tierMatch[1].trim(), startOfMatch: tierMatch.index, endOfMatch: tierMatch.index + tierMatch[0].length });
  }

  for (let i = 0; i < tierPositions.length; i++) {
    const tier = tierPositions[i];
    // Tier content runs from end of this tier's header to the START of the next tier's header
    const contentStart = tier.endOfMatch;
    const contentEnd = i + 1 < tierPositions.length ? tierPositions[i + 1].startOfMatch : cbSection.length;
    const tierBlock = cbSection.slice(contentStart, contentEnd);
    const tierData = {};

    const lines = tierBlock.split('\n').filter(l => l.trim().startsWith('    ') || l.trim().match(/^\w/));
    for (const line of lines) {
      const kv = line.trim().match(/^(.+?):\s*(.+)/);
      if (kv) tierData[kv[1].trim()] = kv[2].trim();
    }
    tiers.push({ name: tier.name, data: tierData });
  }

  // Convert to category-based rows
  if (tiers.length > 0) {
    const allCategories = new Set();
    for (const t of tiers) {
      for (const key of Object.keys(t.data)) {
        if (!key.toLowerCase().includes('total')) allCategories.add(key);
      }
    }

    // Add total row
    allCategories.add(Object.keys(tiers[0]?.data || {}).find(k => k.toLowerCase().includes('total')) || 'Total 7 days');

    for (const cat of allCategories) {
      items.push({
        _key: randomKey(),
        category: cat,
        budget: tiers.find(t => t.name === 'Budget')?.data[cat] || '',
        mid: tiers.find(t => t.name.includes('Mid'))?.data[cat] || '',
        luxury: tiers.find(t => t.name === 'Luxury')?.data[cat] || '',
      });
    }
  }

  return items;
}

// ============================================================================
// PARSE BODY
// ============================================================================

function parseBody(bodySection) {
  if (!bodySection) return [];

  // Find actual content start (after marker line, skip decoration)
  let bodyMd = bodySection;
  const markerIdx = bodyMd.indexOf('ARTICLE BODY STARTS BELOW');
  if (markerIdx !== -1) {
    bodyMd = bodyMd.slice(markerIdx + 'ARTICLE BODY STARTS BELOW'.length);
  }
  // Skip decoration lines (=== lines)
  bodyMd = bodyMd.replace(/^={3,}[^\n]*\n/gm, '').trim();

  // Remove the H1 title (it's the same as doc.title)
  bodyMd = bodyMd.replace(/^# .+\n+/, '');

  return bodyMd ? markdownToPortableText(bodyMd) : [];
}

function countWords(text) {
  return text.replace(/[#*\[\]()>|=-]/g, ' ').split(/\s+/).filter(w => w.length > 1).length;
}

// ============================================================================
// MARKDOWN → PORTABLE TEXT
// ============================================================================

function markdownToPortableText(md) {
  const blocks = [];
  const lines = md.split('\n');
  let i = 0;
  let currentParagraph = [];
  let inList = false;
  let listItems = [];
  let listType = 'bullet';

  function flushParagraph() {
    if (currentParagraph.length === 0) return;
    const text = currentParagraph.join('\n').trim();
    if (!text) { currentParagraph = []; return; }
    if (text.startsWith('[VISUAL') || text.startsWith('[IMAGE')) { currentParagraph = []; return; }
    blocks.push(createTextBlock(text, 'normal'));
    currentParagraph = [];
  }

  function flushList() {
    if (listItems.length === 0) return;
    for (const item of listItems) {
      const block = createTextBlock(item, 'normal');
      block.listItem = listType;
      block.level = 1;
      blocks.push(block);
    }
    listItems = [];
    inList = false;
  }

  while (i < lines.length) {
    const line = lines[i];
    const h2 = line.match(/^## (.+)/); const h3 = line.match(/^### (.+)/); const h4 = line.match(/^#### (.+)/);
    if (h2) { flushParagraph(); flushList(); blocks.push(createTextBlock(h2[1].trim(), 'h2')); i++; continue; }
    if (h3) { flushParagraph(); flushList(); blocks.push(createTextBlock(h3[1].trim(), 'h3')); i++; continue; }
    if (h4) { flushParagraph(); flushList(); blocks.push(createTextBlock(h4[1].trim(), 'h4')); i++; continue; }
    if (line.trim().startsWith('> ')) {
      flushParagraph(); flushList();
      blocks.push(createTextBlock(line.trim().replace(/^>\s*/, ''), 'blockquote'));
      i++; continue;
    }
    const bullet = line.match(/^[\s]*[-*]\s+(.+)/);
    if (bullet) {
      flushParagraph();
      if (!inList || listType !== 'bullet') { flushList(); inList = true; listType = 'bullet'; }
      listItems.push(bullet[1].trim()); i++; continue;
    }
    const num = line.match(/^[\s]*\d+\.\s+(.+)/);
    if (num) {
      flushParagraph();
      if (!inList || listType !== 'number') { flushList(); inList = true; listType = 'number'; }
      listItems.push(num[1].trim()); i++; continue;
    }
    // Table: convert to a paragraph (Sanity blockContent doesn't have native table)
    if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      flushParagraph(); flushList();
      // Skip table separator lines
      if (!line.includes('---')) {
        const cells = line.split('|').map(c => c.trim()).filter(Boolean);
        blocks.push(createTextBlock(cells.join(' | '), 'normal'));
      }
      i++; continue;
    }
    if (line.trim() === '') { flushParagraph(); flushList(); i++; continue; }
    if (line.trim() === '---') { flushParagraph(); flushList(); i++; continue; }
    currentParagraph.push(line);
    i++;
  }
  flushParagraph(); flushList();
  return blocks;
}

function createTextBlock(text, style = 'normal') {
  const block = { _key: randomKey(), _type: 'block', style, children: [], markDefs: [] };
  const spans = parseInlineMarks(text);
  for (const span of spans) {
    const child = { _key: randomKey(), _type: 'span', text: span.text, marks: [] };
    if (span.bold) child.marks.push('strong');
    if (span.italic) child.marks.push('em');
    if (span.href) {
      const mk = randomKey();
      block.markDefs.push({ _key: mk, _type: 'link', href: span.href, blank: span.href.startsWith('http') && !span.href.includes('greektriplanner.me') });
      child.marks.push(mk);
    }
    block.children.push(child);
  }
  if (block.children.length === 0) block.children.push({ _key: randomKey(), _type: 'span', text, marks: [] });
  return block;
}

function parseInlineMarks(text) {
  const spans = [];
  const regex = /(\[([^\]]+?)\]\(([^)]+?)\)|\*\*(.+?)\*\*|\*([^*]+?)\*)/g;
  let lastIndex = 0; let match;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) { const p = text.slice(lastIndex, match.index); if (p) spans.push({ text: p }); }
    if (match[2] && match[3]) {
      let lt = match[2]; let bold = false;
      if (lt.startsWith('**') && lt.endsWith('**')) { lt = lt.slice(2, -2); bold = true; }
      spans.push({ text: lt, href: match[3], bold });
    } else if (match[4]) { spans.push({ text: match[4], bold: true }); }
    else if (match[5]) { spans.push({ text: match[5], italic: true }); }
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) spans.push({ text: text.slice(lastIndex) });
  return spans.length > 0 ? spans : [{ text }];
}

// ============================================================================
// HELPERS
// ============================================================================
function randomKey() { return randomUUID().replace(/-/g, '').slice(0, 12); }
function escapeRegex(str) { return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
function slugify(text) { return text.toLowerCase().replace(/[–—]/g, '-').replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').slice(0, 96); }
function parseDate(str) { if (!str) return null; const d = new Date(str); return isNaN(d.getTime()) ? null : d.toISOString(); }
function grabFirstH1(text) { const m = text.match(/^# (.+)$/m); return m ? m[1].trim() : null; }

// ============================================================================
// BUILD SANITY DOCUMENT — matches post.ts schema EXACTLY
// ============================================================================

function buildSanityDocument(parsed, slug) {
  const now = new Date().toISOString();

  const doc = {
    _type: 'post',

    // ═══ GROUP 1: Content ═══
    title: parsed.title,
    slug: { _type: 'slug', current: slug },
    author: parsed.author || 'Greek Trip Planner',
    categories: parsed.categories || [],
    publishedAt: parsed.publishedAt || now,
    body: parsed.body || [],
    excerpt: parsed.excerpt || undefined,

    // ═══ GROUP 2: SEO & Meta ═══
    metaTitle: parsed.metaTitle || (parsed.title.length <= 60 ? parsed.title : parsed.title.slice(0, 57) + '...'),
    metaDescription: parsed.metaDescription || (parsed.excerpt || '').slice(0, 160) || undefined,
    focusKeyword: parsed.focusKeyword || undefined,
    canonicalUrl: parsed.canonicalUrl || undefined,
    ogTitle: parsed.ogTitle || undefined,
    ogDescription: parsed.ogDescription || undefined,
    ogImage: parsed.ogImage || undefined,
    twitterCard: parsed.twitterCard || 'summary_large_image',
    twitterTitle: parsed.twitterTitle || undefined,
    twitterDescription: parsed.twitterDescription || undefined,

    // ═══ GROUP 3: Schema Markup (nested objects) ═══
    articleSchema: {
      enabled: parsed._articleEnabled ?? true,
      articleType: parsed._articleType || 'BlogPosting',
      authorName: parsed.author || 'Greek Trip Planner',
      authorUrl: 'https://greektriplanner.me',
      publisherName: 'Greek Trip Planner',
      publisherLogo: 'https://greektriplanner.me/logo.png',
      wordCount: parsed.wordCount || undefined,
    },
    faqSchema: {
      enabled: parsed._faqEnabled ?? (parsed.faqItems?.length > 0),
      faqs: (parsed.faqItems || []).map(f => ({ _key: f._key || randomKey(), question: f.question, answer: f.answer })),
    },
    howToSchema: { enabled: parsed._howtoEnabled ?? false },
    reviewSchema: { enabled: parsed._reviewEnabled ?? false },
    eventSchema: { enabled: parsed._eventEnabled ?? false },
    placeSchema: {
      enabled: parsed._placeEnabled ?? (parsed._places?.length > 0),
      places: (parsed._places || []).map(p => ({ _key: p._key || randomKey(), name: p.name, description: p.description || undefined, address: p.address || undefined, latitude: p.latitude || undefined, longitude: p.longitude || undefined, image: p.image || undefined, telephone: p.telephone || undefined, url: p.url || undefined })),
    },
    videoSchema: { enabled: parsed._videoEnabled ?? false },
    recipeSchema: { enabled: parsed._recipeEnabled ?? false },
    productSchema: { enabled: parsed._productEnabled ?? false },
    breadcrumbSchema: {
      enabled: parsed._breadcrumbEnabled ?? true,
      ...(parsed._customBreadcrumbs?.length && { customBreadcrumbs: parsed._customBreadcrumbs }),
    },

    // ═══ GROUP 4: Affiliate & Monetization ═══
    urgencyMessage: parsed.urgencyMessage || undefined,
    affiliateHotels: (parsed.affiliateHotels || []).map(h => ({ _key: h._key || randomKey(), name: h.name, location: h.location || undefined, rating: h.rating || undefined, price: h.price || undefined, image: h.image || undefined, affiliateLink: h.affiliateLink || undefined, features: h.features || undefined })),
    affiliateTours: (parsed.affiliateTours || []).map(t => ({ _key: t._key || randomKey(), title: t.title, description: t.description || undefined, duration: t.duration || undefined, price: t.price || undefined, image: t.image || undefined, affiliateLink: t.affiliateLink || undefined, highlights: t.highlights || undefined })),
    insuranceLink: parsed.insuranceLink || undefined,
    costBreakdown: (parsed.costBreakdown || []).map(c => ({ _key: c._key || randomKey(), category: c.category, budget: c.budget || '', mid: c.mid || '', luxury: c.luxury || '' })),
    proTips: parsed.proTips || [],
    finalCtaBookingLink: parsed.finalCtaBookingLink || undefined,
    finalCtaToursLink: parsed.finalCtaToursLink || undefined,
  };

  return JSON.parse(JSON.stringify(doc));
}

// ============================================================================
// SANITY API
// ============================================================================
async function pushToSanity(doc) {
  const url = `https://${CONFIG.projectId}.api.sanity.io/v${CONFIG.apiVersion}/data/mutate/${CONFIG.dataset}`;
  const mutation = { mutations: [{ createOrReplace: { ...doc, _id: `post-${doc.slug.current}` } }] };
  const response = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${CONFIG.token}` }, body: JSON.stringify(mutation) });
  if (!response.ok) { const error = await response.text(); throw new Error(`Sanity API error (${response.status}): ${error}`); }
  return response.json();
}

// ============================================================================
// MAIN
// ============================================================================
async function main() {
  console.log('\n📝 BLOG POST → SANITY IMPORTER (v3 — real format)\n');
  let markdown;
  try { markdown = readFileSync(filePath, 'utf-8'); } catch (err) { console.error(`❌ Cannot read file: ${filePath}`); process.exit(1); }
  console.log(`  Reading: ${filePath} (${(markdown.length / 1024).toFixed(1)} KB)`);
  console.log('  Parsing blog post...');
  const parsed = parseArticle(markdown);
  const slug = customSlug || parsed.slug || slugify(parsed.title);
  console.log(`  Slug: ${slug}`);
  let doc = buildSanityDocument(parsed, slug);

  // Summary
  console.log('\n📊 PARSED CONTENT SUMMARY:');
  console.log('  ─────────────────────────────────────────');
  console.log(`  Title:             ${doc.title}`);
  console.log(`  Excerpt:           ${(doc.excerpt || '').slice(0, 70)}...`);
  console.log(`  Author:            ${doc.author}`);
  console.log(`  Categories:        ${(doc.categories || []).join(', ') || '(none)'}`);
  console.log(`  Published:         ${doc.publishedAt}`);
  console.log(`  Body Blocks:       ${(doc.body || []).length} Portable Text blocks`);
  console.log('  ─── SEO & Meta ───────────────────────────');
  console.log(`  Meta Title:        ${doc.metaTitle || '(auto)'}`);
  console.log(`  Meta Description:  ${(doc.metaDescription || '').slice(0, 60)}...`);
  console.log(`  Focus Keyword:     ${doc.focusKeyword || '(none)'}`);
  console.log(`  Canonical URL:     ${doc.canonicalUrl || '(default)'}`);
  console.log(`  OG Title:          ${doc.ogTitle || '(uses metaTitle)'}`);
  console.log(`  OG Description:    ${doc.ogDescription ? '✅' : '(uses metaDesc)'}`);
  console.log(`  Twitter Card:      ${doc.twitterCard}`);
  console.log(`  Twitter Title:     ${doc.twitterTitle || '(uses ogTitle)'}`);
  console.log('  ─── Schema Markup ────────────────────────');
  console.log(`  Article:           ${doc.articleSchema?.enabled ? '✅' : '❌'} [${doc.articleSchema?.wordCount || 'auto'} words]`);
  console.log(`  FAQ:               ${doc.faqSchema?.enabled ? '✅' : '❌'} (${doc.faqSchema?.faqs?.length || 0} items)`);
  console.log(`  How-To:            ${doc.howToSchema?.enabled ? '✅' : '❌'}`);
  console.log(`  Review:            ${doc.reviewSchema?.enabled ? '✅' : '❌'}`);
  console.log(`  Event:             ${doc.eventSchema?.enabled ? '✅' : '❌'}`);
  console.log(`  Place:             ${doc.placeSchema?.enabled ? '✅' : '❌'} (${doc.placeSchema?.places?.length || 0} places)`);
  console.log(`  Video:             ${doc.videoSchema?.enabled ? '✅' : '❌'}`);
  console.log(`  Recipe:            ${doc.recipeSchema?.enabled ? '✅' : '❌'}`);
  console.log(`  Product:           ${doc.productSchema?.enabled ? '✅' : '❌'}`);
  console.log(`  Breadcrumb:        ${doc.breadcrumbSchema?.enabled ? '✅' : '❌'} (${doc.breadcrumbSchema?.customBreadcrumbs?.length || 0} custom)`);
  console.log('  ─── Affiliate & Monetization ─────────────');
  console.log(`  Hotels:            ${(doc.affiliateHotels || []).length} items`);
  for (const h of (doc.affiliateHotels || [])) console.log(`    → ${h.name} | ${h.location || '-'} | ${h.price || '-'} | ${h.affiliateLink ? '🔗' : '⚠️ no link'}`);
  console.log(`  Tours:             ${(doc.affiliateTours || []).length} items`);
  for (const t of (doc.affiliateTours || [])) console.log(`    → ${t.title} | ${t.duration || '-'} | ${t.price || '-'} | ${t.affiliateLink ? '🔗' : '⚠️ no link'}`);
  console.log(`  Insurance:         ${doc.insuranceLink ? '✅' : '❌'}`);
  console.log(`  Cost Breakdown:    ${(doc.costBreakdown || []).length} items`);
  if (doc.costBreakdown?.length) for (const c of doc.costBreakdown) console.log(`    → ${c.category}: B=${c.budget || '-'} | M=${c.mid || '-'} | L=${c.luxury || '-'}`);
  console.log(`  Pro Tips:          ${(doc.proTips || []).length} tips`);
  console.log(`  CTA Booking:       ${doc.finalCtaBookingLink ? '✅' : '❌'}`);
  console.log(`  CTA Tours:         ${doc.finalCtaToursLink ? '✅' : '❌'}`);
  console.log(`  Urgency:           ${doc.urgencyMessage || '(none)'}`);
  console.log('  ─────────────────────────────────────────');

  if (dryRun) {
    console.log('\n🔍 DRY RUN — Writing JSON to: import-blog-preview.json');
    const { writeFileSync } = await import('fs');
    writeFileSync('import-blog-preview.json', JSON.stringify(doc, null, 2));
    console.log(`  File size: ${(JSON.stringify(doc).length / 1024).toFixed(1)} KB`);
    console.log('  Review the file, then run without --dry-run to push to Sanity.\n');
    return;
  }

  if (!CONFIG.token) {
    console.error('\n❌ No SANITY_TOKEN set. Set SANITY_TOKEN env var or edit CONFIG.token.');
    const { writeFileSync } = await import('fs');
    writeFileSync('import-blog-preview.json', JSON.stringify(doc, null, 2));
    console.log('  📁 Wrote import-blog-preview.json for manual import.\n');
    process.exit(1);
  }

  console.log('\n🚀 Pushing to Sanity...');
  console.log(`   Project: ${CONFIG.projectId} | Dataset: ${CONFIG.dataset} | Doc ID: post-${slug}`);
  try {
    await pushToSanity(doc);
    console.log('\n✅ SUCCESS!');
    console.log(`   Studio: https://${CONFIG.projectId}.sanity.studio/structure/post;post-${slug}`);
    console.log(`   Live:   https://greektriplanner.me/blog/${slug}\n`);
  } catch (err) {
    console.error(`\n❌ Push failed: ${err.message}`);
    const { writeFileSync } = await import('fs');
    writeFileSync('import-blog-failed.json', JSON.stringify(doc, null, 2));
    console.error('   Saved to import-blog-failed.json for debugging.\n');
    process.exit(1);
  }
}

main().catch(err => { console.error('Fatal error:', err); process.exit(1); });
