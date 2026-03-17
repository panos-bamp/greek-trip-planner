// ============================================================
// Sanity Draft Publisher
// Creates draft blog posts in your Sanity CMS
// Uses the Sanity HTTP API (no SDK needed)
// ============================================================

import type { ProcessedArticle } from './processor'

const SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const SANITY_TOKEN = process.env.SANITY_API_TOKEN! // needs write access

/**
 * Creates a draft post in Sanity CMS from a processed article.
 * Returns the Sanity document ID if successful, null if failed.
 */
export async function createSanityDraft(
  article: ProcessedArticle
): Promise<string | null> {
  if (!SANITY_PROJECT_ID || !SANITY_TOKEN) {
    console.warn('Sanity credentials not configured — skipping draft creation')
    return null
  }

  // Build the Sanity document
  const doc = {
    _type: 'post',
    _id: `drafts.pipeline-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,

    // Core content
    title: article.rewrittenTitle,
    slug: {
      _type: 'slug',
      current: article.suggestedSlug,
    },
    excerpt: article.rewrittenExcerpt,

    // Body as portable text (we'll wrap HTML as a single block for now)
    // If your schema uses a rich text field, adjust accordingly
    body: htmlToPortableText(article.rewrittenContent),

    // SEO fields (if your schema has them)
    seo: {
      metaTitle: article.rewrittenTitle.slice(0, 60),
      metaDescription: article.rewrittenExcerpt.slice(0, 160),
      keywords: article.targetKeywords,
    },

    // Categories / tags
    tags: article.suggestedTags,

    // Pipeline metadata (for tracking)
    pipelineMeta: {
      sourceId: article.sourceId,
      sourceName: article.sourceName,
      sourceCountry: article.country,
      originalUrl: article.url,
      relevanceScore: article.relevanceScore,
      crawledAt: new Date().toISOString(),
      needsResearch: article.needsResearch,
      researchTopics: article.researchTopics,
    },

    // Draft state — not published until you manually approve
    publishedAt: null,
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
        body: JSON.stringify({
          mutations: [{ createOrReplace: doc }],
        }),
      }
    )

    if (!response.ok) {
      const error = await response.text()
      console.error('Sanity mutation failed:', error)
      return null
    }

    const result = await response.json()
    return result.results?.[0]?.id || doc._id
  } catch (err) {
    console.error('Sanity publish error:', err)
    return null
  }
}

// ─── Minimal HTML → Portable Text converter ──────────────────
// Converts simple HTML to Sanity's portable text blocks
// Handles: <p>, <h2>, <h3>, <ul>/<li>, plain text

function htmlToPortableText(html: string): object[] {
  if (!html) return []

  // If no HTML tags, wrap as single paragraph
  if (!html.includes('<')) {
    return [
      {
        _type: 'block',
        _key: randomKey(),
        style: 'normal',
        children: [{ _type: 'span', _key: randomKey(), text: html, marks: [] }],
        markDefs: [],
      },
    ]
  }

  const blocks: object[] = []

  // Split by block-level tags
  const segments = html
    .replace(/<\/?(ul|ol)>/gi, '')
    .split(/(<h[23][^>]*>.*?<\/h[23]>|<p[^>]*>.*?<\/p>|<li[^>]*>.*?<\/li>)/gis)
    .filter(s => s.trim())

  for (const segment of segments) {
    const h2Match = segment.match(/<h2[^>]*>(.*?)<\/h2>/is)
    const h3Match = segment.match(/<h3[^>]*>(.*?)<\/h3>/is)
    const pMatch = segment.match(/<p[^>]*>(.*?)<\/p>/is)
    const liMatch = segment.match(/<li[^>]*>(.*?)<\/li>/is)

    if (h2Match) {
      blocks.push(makeBlock(stripTags(h2Match[1]), 'h2'))
    } else if (h3Match) {
      blocks.push(makeBlock(stripTags(h3Match[1]), 'h3'))
    } else if (pMatch) {
      const text = stripTags(pMatch[1]).trim()
      if (text) blocks.push(makeBlock(text, 'normal'))
    } else if (liMatch) {
      const text = stripTags(liMatch[1]).trim()
      if (text) blocks.push(makeBullet(text))
    } else {
      const text = stripTags(segment).trim()
      if (text) blocks.push(makeBlock(text, 'normal'))
    }
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
  return html.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ').trim()
}

function randomKey(): string {
  return Math.random().toString(36).slice(2, 10)
}
