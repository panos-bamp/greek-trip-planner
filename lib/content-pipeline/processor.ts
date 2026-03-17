// ============================================================
// Article Processor
// Handles: relevance scoring, translation, rewriting, flagging
// Uses Claude claude-sonnet-4-20250514 via Anthropic API
// ============================================================

export interface RawArticle {
  sourceId: string
  sourceName: string
  country: string
  language: string
  url: string
  title: string
  excerpt?: string
  content?: string
  publishedAt?: string
  author?: string
  imageUrl?: string
}

export interface ScoredArticle extends RawArticle {
  relevanceScore: number
  relevanceReason: string
  isRelevant: boolean
}

export interface ProcessedArticle extends ScoredArticle {
  rewrittenTitle: string
  rewrittenExcerpt: string
  rewrittenContent: string
  suggestedSlug: string
  targetKeywords: string[]
  suggestedTags: string[]
  needsResearch: boolean
  researchTopics: string[]
  researchNotes: string
}

// ─── Shared headers for all Anthropic API calls ───────────────
function anthropicHeaders() {
  return {
    'Content-Type': 'application/json',
    'x-api-key': process.env.ANTHROPIC_API_KEY!,
    'anthropic-version': '2023-06-01',
  }
}

// ─── Relevance Scoring (batched for efficiency) ──────────────

/**
 * Score a batch of articles for Greece inbound tourism relevance.
 * Sends up to 10 articles in a single API call.
 */
export async function scoreArticlesBatch(
  articles: RawArticle[]
): Promise<ScoredArticle[]> {
  if (articles.length === 0) return []

  const articlesPayload = articles.map((a, i) => ({
    index: i,
    title: a.title,
    excerpt: a.excerpt?.slice(0, 300) || '',
    source: a.sourceName,
    country: a.country,
    language: a.language,
  }))

  const prompt = `You are an expert in Greek inbound tourism. Score each article for relevance to Greece inbound tourism (international visitors traveling TO Greece).

Articles to score:
${JSON.stringify(articlesPayload, null, 2)}

For each article, determine:
1. relevance_score: 0-100 (0=unrelated, 50=tangentially related, 80+=directly relevant, 90+=highly valuable)
2. relevance_reason: 1 sentence explanation
3. is_relevant: true if score >= 55

RELEVANCE CRITERIA (score HIGH if):
- Mentions Greece, Greek islands, Athens, Thessaloniki, Santorini, Mykonos, Crete, Rhodes, Corfu, Zakynthos, etc.
- Discusses Greek tourism trends, visitor numbers, bookings, prices
- Covers tours, transfers, activities in Greece
- Discusses European travel trends that directly affect Greece (Mediterranean travel, summer holidays)
- Industry news about tour operators, OTAs relevant to Greece
- Travel infrastructure: airports, ferries, transport in Greece

SCORE LOW if:
- Generic travel content unrelated to Greece
- Other European destinations not compared to Greece
- Domestic Greek news unrelated to tourism

Respond ONLY with valid JSON array (no markdown, no explanation):
[{"index": 0, "relevance_score": 75, "relevance_reason": "...", "is_relevant": true}, ...]`

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: anthropicHeaders(),
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2000,
        messages: [{ role: 'user', content: prompt }],
      }),
    })

    if (!response.ok) {
      const errText = await response.text()
      console.error(`Anthropic scoring API error ${response.status}:`, errText)
      throw new Error(`API ${response.status}: ${errText}`)
    }

    const data = await response.json()
    const text = data.content?.[0]?.text || '[]'
    const clean = text.replace(/```json|```/g, '').trim()
    const scores: Array<{
      index: number
      relevance_score: number
      relevance_reason: string
      is_relevant: boolean
    }> = JSON.parse(clean)

    return articles.map((article, i) => {
      const score = scores.find(s => s.index === i)
      return {
        ...article,
        relevanceScore: score?.relevance_score ?? 0,
        relevanceReason: score?.relevance_reason ?? 'Not scored',
        isRelevant: score?.is_relevant ?? false,
      }
    })
  } catch (err) {
    console.error('Batch scoring error:', err)
    return articles.map(a => ({
      ...a,
      relevanceScore: 0,
      relevanceReason: 'Scoring failed',
      isRelevant: false,
    }))
  }
}

// ─── Full Article Rewrite ─────────────────────────────────────

/**
 * Takes a relevant article and produces SEO-enhanced rewrite.
 * Also detects if deeper research is needed.
 */
export async function rewriteArticle(
  article: ScoredArticle
): Promise<ProcessedArticle> {
  const needsTranslation = article.language !== 'en'

  const prompt = `You are an expert travel content writer specializing in Greek tourism. Your task is to rewrite and significantly enhance this article for an English-language Greece travel planning website (greektriplanner.me).

SOURCE ARTICLE:
Title: ${article.title}
Source: ${article.sourceName} (${article.country})
Language: ${article.language}
URL: ${article.url}
Content: ${article.content || article.excerpt || article.title}
${needsTranslation ? '\n[NOTE: Content may be in Greek or German — translate AND rewrite]' : ''}

YOUR TASK:
Rewrite this into a high-quality, original article that:
1. Is written in fluent, engaging English
2. Adds value beyond the original (context, tips, booking advice, local insights)
3. Is SEO-optimized for travelers searching for Greece travel info
4. Is 400-600 words (longer for high-score articles)
5. Has a compelling, keyword-rich title

Also identify:
- 3-5 target SEO keywords (long-tail, high intent)
- 3-5 content tags
- Whether this topic needs DEEPER RESEARCH (new data, price changes, policy updates, new destinations emerging, hotel/tour openings, ferry/transport changes, regulatory news)

Respond ONLY with valid JSON (no markdown, no explanation):
{
  "rewritten_title": "...",
  "rewritten_excerpt": "2-3 sentence meta description (max 160 chars)",
  "rewritten_content": "Full article HTML with <h2>, <p>, <ul> tags...",
  "suggested_slug": "url-friendly-slug",
  "target_keywords": ["keyword 1", "keyword 2", "keyword 3"],
  "suggested_tags": ["tag1", "tag2", "tag3"],
  "needs_research": true/false,
  "research_topics": ["topic 1 if needs_research", "topic 2"],
  "research_notes": "Brief note on what additional research would add value"
}`

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: anthropicHeaders(),
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 3000,
        messages: [{ role: 'user', content: prompt }],
      }),
    })

    if (!response.ok) {
      const errText = await response.text()
      console.error(`Anthropic rewrite API error ${response.status}:`, errText)
      throw new Error(`API ${response.status}: ${errText}`)
    }

    const data = await response.json()
    const text = data.content?.[0]?.text || '{}'
    const clean = text.replace(/```json|```/g, '').trim()
    const result = JSON.parse(clean)

    return {
      ...article,
      rewrittenTitle: result.rewritten_title || article.title,
      rewrittenExcerpt: result.rewritten_excerpt || '',
      rewrittenContent: result.rewritten_content || '',
      suggestedSlug: result.suggested_slug || slugify(article.title),
      targetKeywords: result.target_keywords || [],
      suggestedTags: result.suggested_tags || [],
      needsResearch: result.needs_research || false,
      researchTopics: result.research_topics || [],
      researchNotes: result.research_notes || '',
    }
  } catch (err) {
    console.error(`Rewrite error for "${article.title}":`, err)
    return {
      ...article,
      rewrittenTitle: article.title,
      rewrittenExcerpt: article.excerpt || '',
      rewrittenContent: article.content || article.excerpt || '',
      suggestedSlug: slugify(article.title),
      targetKeywords: [],
      suggestedTags: [],
      needsResearch: false,
      researchTopics: [],
      researchNotes: '',
    }
  }
}

// ─── Utility ─────────────────────────────────────────────────

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80)
}

// Delay helper to avoid rate limiting
export const delay = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms))
