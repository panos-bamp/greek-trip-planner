// ============================================================
// Sanity Insight Publisher
// Path: lib/content-pipeline/sanity-publisher.ts
// Creates DRAFT insight documents in Sanity CMS
// Targets _type: 'insight' to appear in /insights section
// ============================================================

import type { ProcessedArticle } from './processor'
import { getAffiliatesForArticle, resolveArticleAffiliates } from './affiliate-links'

// FAQ item type
interface FaqItem { question: string; answer: string }

const SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const SANITY_DATASET   = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const SANITY_TOKEN     = process.env.SANITY_API_TOKEN! // needs Editor or Admin role

// ─── insightType auto-detection ──────────────────────────────
const INSIGHT_TYPE_RULES: Array<{ keywords: string[]; type: string }> = [
  {
    keywords: ['arrivals', 'revenue', 'statistics', 'record', 'numbers', 'data', 'figures', 'visitors', 'million', 'billion'],
    type: 'statistics',
  },
  {
    keywords: ['trend', 'forecast', 'future', 'prediction', 'outlook', 'emerging', '2026', '2027'],
    type: 'trend-analysis',
  },
  {
    keywords: ['santorini', 'mykonos', 'crete', 'rhodes', 'corfu', 'zakynthos', 'athens', 'island', 'destination', 'performance'],
    type: 'destination-performance',
  },
  {
    keywords: ['uk', 'british', 'german', 'france', 'french', 'american', 'source market', 'inbound'],
    type: 'source-market',
  },
  {
    keywords: ['hotel', 'accommodation', 'resort', 'booking', 'occupancy', 'airbnb'],
    type: 'accommodation',
  },
  {
    keywords: ['cruise', 'ship', 'port', 'passenger'],
    type: 'cruise',
  },
  {
    keywords: ['regulation', 'policy', 'law', 'tax', 'vat', 'permit', 'government', 'ministry', 'ban'],
    type: 'policy-regulation',
  },
  {
    keywords: ['sustainable', 'sustainability', 'green', 'eco', 'environment', 'carbon', 'climate'],
    type: 'sustainability',
  },
  {
    keywords: ['report', 'annual', 'quarter', 'q1', 'q2', 'q3', 'q4', 'wttc', 'insete', 'bank of greece'],
    type: 'market-report',
  },
]

function detectInsightType(title: string, tags: string[]): string {
  const text = `${title} ${tags.join(' ')}`.toLowerCase()
  for (const rule of INSIGHT_TYPE_RULES) {
    if (rule.keywords.some(kw => text.includes(kw))) return rule.type
  }
  return 'opinion'
}

function estimateReadingTime(html: string): number {
  const words = stripTags(html).split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

// ─── Main publisher ───────────────────────────────────────────

export async function createSanityDraft(
  article: ProcessedArticle
): Promise<string | null> {
  if (!SANITY_PROJECT_ID || !SANITY_TOKEN) {
    console.warn('Sanity credentials not configured — skipping draft creation')
    return null
  }

  const insightType = detectInsightType(
    article.rewrittenTitle || article.title,
    article.suggestedTags || []
  )

  const docId = `drafts.pipeline-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

  const doc = {
    _type: 'insight',
    _id: docId,

    title: article.rewrittenTitle || article.title,
    slug: { _type: 'slug', current: article.suggestedSlug },
    excerpt: (article.rewrittenExcerpt || article.excerpt || '').slice(0, 300),
    subtitle: `Source: ${article.sourceName} · ${article.country}`,

    insightType,
    topics: article.suggestedTags || [],

    author: 'Greek Trip Planner Research',
    authorBio:
      'The Greek Trip Planner research team monitors international travel media daily, analyzing coverage from Greek, UK, German, and US sources to surface the most relevant insights for travelers and tourism professionals.',

    publishedAt: new Date().toISOString(),
    readingTime: estimateReadingTime(article.rewrittenContent || ''),
    showTableOfContents: true,

    body: htmlToPortableText(article.rewrittenContent || ''),

    keyTakeaways: (article.researchTopics || []).map(
      (t: string) => `Research opportunity: ${t}`
    ),

    externalReferences: [
      {
        _type: 'object',
        _key: randomKey(),
        title: article.title,
        url: article.url,
        source: article.sourceName,
      },
    ],

    // SEO defaults
    metaTitle: (article.rewrittenTitle || article.title).slice(0, 60),
    metaDescription: (article.rewrittenExcerpt || article.excerpt || '').slice(0, 160),
    focusKeyword: article.targetKeywords?.[0] || '',
    canonicalUrl: `https://greektriplanner.me/insights/${article.suggestedSlug}`,

    // ── Schema markup ──────────────────────────────────────────
    // Article schema type — field name in Sanity is schemaArticleType
    // Detect best type based on insightType
    schemaArticleType: (['market-report', 'statistics'].includes(insightType))
      ? 'NewsArticle'
      : 'Article',

    // FAQ schema — enabled when Claude generated FAQ items
    // Field names match insight.ts exactly: enableFaqSchema + faqItems
    enableFaqSchema: (article.faqItems && article.faqItems.length > 0),
    faqItems: (article.faqItems || []).map((item: FaqItem) => ({
      _type: 'faqItem',      // must match schema array item name
      _key: randomKey(),
      question: item.question,
      answer: item.answer,
    })),

    // Breadcrumb schema — always enabled
    enableBreadcrumbSchema: true,

    // Speakable — off by default
    enableSpeakableSchema: false,

    ctaType: 'subscribe',

    // ── Affiliate links (resolved via TP API) ────────────────────
    ...(await (async () => {
      const dest = article.suggestedTags?.[0] || 'Greece'
      const titleLow = (article.rewrittenTitle || article.title).toLowerCase()
      const raw = getAffiliatesForArticle(
        insightType,
        dest,
        article.suggestedTags || [],
        titleLow
      )
      // Resolve canonical URLs to tracked partner_urls via TP API
      const affiliates = await resolveArticleAffiliates(raw)
      const fmt = (l: any) => l ? {
        url: l.affiliateUrl,
        canonicalUrl: l.canonicalUrl,
        widget: l.widget,
        label: l.label,
        cta: l.cta,
        program: l.program,
        commission: l.commission,
      } : null
      return {
        affiliatePrimary:   fmt(affiliates.primary),
        affiliateSecondary: fmt(affiliates.secondary),
        affiliateTertiary:  fmt(affiliates.tertiary),
      }
    })()),
  }

  try {
    const response = await fetch(
      `https://${SANITY_PROJECT_ID}.api.sanity.io/v2023-08-01/data/mutate/${SANITY_DATASET}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${SANITY_TOKEN}`,
        },
        body: JSON.stringify({ mutations: [{ createOrReplace: doc }] }),
      }
    )

    if (!response.ok) {
      console.error('Sanity mutation failed:', await response.text())
      return null
    }

    const result = await response.json()
    return result.results?.[0]?.id || docId
  } catch (err) {
    console.error('Sanity publish error:', err)
    return null
  }
}

// ─── HTML → Portable Text ─────────────────────────────────────
// NOTE: Using [\s\S] instead of . with s flag for TypeScript compatibility

function htmlToPortableText(html: string): object[] {
  if (!html) return []

  if (!html.includes('<')) return [makeBlock(html, 'normal')]

  const blocks: object[] = []

  const cleaned = html.replace(/<\/?(ul|ol)>/gi, '')

  // [\s\S]*? used instead of .*? with /s flag — compatible with all TS targets
  const segments = cleaned
    .split(/(<h[23][^>]*>[\s\S]*?<\/h[23]>|<p[^>]*>[\s\S]*?<\/p>|<li[^>]*>[\s\S]*?<\/li>)/gi)
    .filter(s => s.trim())

  for (const segment of segments) {
    const h2 = segment.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i)
    const h3 = segment.match(/<h3[^>]*>([\s\S]*?)<\/h3>/i)
    const p  = segment.match(/<p[^>]*>([\s\S]*?)<\/p>/i)
    const li = segment.match(/<li[^>]*>([\s\S]*?)<\/li>/i)

    if (h2)      { const t = stripTags(h2[1]).trim(); if (t) blocks.push(makeBlock(t, 'h2')) }
    else if (h3) { const t = stripTags(h3[1]).trim(); if (t) blocks.push(makeBlock(t, 'h3')) }
    else if (p)  { const t = stripTags(p[1]).trim();  if (t) blocks.push(makeBlock(t, 'normal')) }
    else if (li) { const t = stripTags(li[1]).trim(); if (t) blocks.push(makeBullet(t)) }
    else         { const t = stripTags(segment).trim(); if (t) blocks.push(makeBlock(t, 'normal')) }
  }

  return blocks.length > 0 ? blocks : [makeBlock(stripTags(html), 'normal')]
}

function makeBlock(text: string, style: string): object {
  return {
    _type: 'block',
    _key: randomKey(),
    style,
    children: [{ _type: 'span', _key: randomKey(), text, marks: [] }],
    markDefs: [],
  }
}

function makeBullet(text: string): object {
  return {
    _type: 'block',
    _key: randomKey(),
    style: 'normal',
    listItem: 'bullet',
    level: 1,
    children: [{ _type: 'span', _key: randomKey(), text, marks: [] }],
    markDefs: [],
  }
}

function stripTags(html: string): string {
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .trim()
}

function randomKey(): string {
  return Math.random().toString(36).slice(2, 10)
}
