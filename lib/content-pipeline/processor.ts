// ============================================================
// Article Processor
// Handles: relevance scoring, translation, deep research rewriting
// Rewrite uses web_search tool for live research before writing
// Output: 2000-5000 words depending on topic depth
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

// ─── Shared Anthropic headers ─────────────────────────────────
function anthropicHeaders() {
  return {
    'Content-Type': 'application/json',
    'x-api-key': process.env.ANTHROPIC_API_KEY!,
    'anthropic-version': '2023-06-01',
  }
}

// ─── Relevance Scoring (batched) ─────────────────────────────

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
        model: 'claude-sonnet-4-5',
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

// ─── Deep Research Rewrite ────────────────────────────────────
//
// How it works:
// 1. Claude receives the source article as a starting point
// 2. It uses web_search to research the topic deeply:
//    - Finds similar articles to understand coverage gaps
//    - Searches for current stats, prices, seasonal data
//    - Finds practical travel info (transport, booking, costs)
// 3. Claude writes a 2000-5000 word comprehensive article
// 4. We run an agentic loop until Claude stops using tools
//
// Word count scales with relevance score:
//   90%+  → 4000-5000 words
//   70-89% → 3000-4000 words
//   55-69% → 2000-3000 words

const WEB_SEARCH_TOOL = {
  type: 'web_search_20250305',
  name: 'web_search',
}

export async function rewriteArticle(
  article: ScoredArticle,
  isCombined: boolean = false
): Promise<ProcessedArticle> {
  const needsTranslation = article.language !== 'en'

  const wordCount = article.relevanceScore >= 90
    ? '4000-5000'
    : article.relevanceScore >= 70
      ? '3000-4000'
      : '2000-3000'

  const combinedNote = isCombined
    ? `\nIMPORTANT: This content comes from MULTIPLE sources. Synthesize them into ONE cohesive comprehensive article — merge overlapping information, do not repeat points.\n`
    : ''

  const systemPrompt = `You are a senior travel journalist and SEO content strategist specializing in Greece inbound tourism. You write for greektriplanner.me — an authoritative English-language resource for international visitors planning trips to Greece.

Your writing principles:
- Stay strictly on the topic and angle of the source article — do not expand into unrelated areas
- Write with authority, depth, and genuine expertise
- Be data-driven: include specific statistics, numbers, dates, and named sources
- Use natural SEO keyword integration — never keyword-stuffing
- Structure with clear H2/H3 headings optimized for featured snippets

IMPORTANT: greektriplanner.me already has dedicated blog posts covering Getting There,
Best Time to Visit, Where to Stay, Food & Dining, and Day Trips for major destinations.
Do NOT write generic travel guide sections. Stay focused on the specific topic,
angle, or news story the source article covers. Go deep on that topic — not wide.`

  const userPrompt = `${combinedNote}
SOURCE ARTICLE (defines the topic and angle — stay focused on this):
Title: ${article.title}
Source: ${article.sourceName} (${article.country})
Language: ${article.language}
URL: ${article.url}
Content: ${(article.content || article.excerpt || article.title).slice(0, 3000)}
${needsTranslation ? '\n[TRANSLATE from Greek/German — use as starting point only, do not copy]\n' : ''}
Relevance Score: ${article.relevanceScore}/100

─────────────────────────────────────────
STEP 1 — RESEARCH

Always run these 2 searches:
• Search 1: Top existing articles on this exact topic — what angle do they take, what are the gaps?
• Search 2: Current 2025-2026 data, statistics, or news directly about this topic

Only run these IF the source article touches on these areas:
• Search 3 (costs/booking): Only if source mentions prices, fees, bookings, or commercial aspects
• Search 4 (local specifics): Only if source mentions specific places, experiences, or local culture
• Search 5 (recent developments): Only if source mentions new openings, changes, policy updates, or emerging trends

─────────────────────────────────────────
STEP 2 — WRITE a ${wordCount} word article

Stay focused on the specific topic and angle from the source article.
Build depth within that topic using what you found in Step 1.

Let the content determine the sections — not a template.
Structure your article around what THIS specific topic requires.

Examples:
- Marine reserve article → the reserve, marine life, diving specifics, conservation status, visitor experience
- Tourism statistics article → trend analysis, source market breakdown, YoY comparison, industry implications  
- New hotel/development article → property details, market context, pricing tier, what it means for visitors
- Policy/regulation article → what changed, who it affects, timeline, practical impact on travelers

Every section must add real depth:
• Use specific numbers, names, and sources from your research
• Include official data or expert context where found
• Explain WHY this matters — to travelers or to the industry
• End with a concise Key Takeaways section (5 bullet points max)

Use HTML: <h2>, <h3>, <p>, <ul>, <li>, <strong>. No <html>, <body>, or <head> tags.

─────────────────────────────────────────
STEP 3 — After research and writing, output ONLY this JSON (no markdown fences):

{
  "rewritten_title": "SEO title 60-70 characters with primary keyword",
  "rewritten_excerpt": "Meta description 150-160 chars — specific, enticing, includes keyword",
  "rewritten_content": "THE FULL ARTICLE HTML — minimum ${wordCount.split('-')[0]} words",
  "suggested_slug": "primary-keyword-greece-guide",
  "target_keywords": ["primary keyword", "secondary keyword", "long-tail phrase 1", "long-tail phrase 2", "long-tail phrase 3"],
  "suggested_tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "needs_research": true/false,
  "research_topics": ["specific data point still missing", "expert source that would add value"],
  "research_notes": "One sentence on what would make this article even stronger"
}`

  try {
    const messages: object[] = [
      { role: 'user', content: userPrompt }
    ]

    let finalText = ''
    let iterations = 0
    const MAX_ITERATIONS = 12

    while (iterations < MAX_ITERATIONS) {
      iterations++
      console.log(`  Research iteration ${iterations}/${MAX_ITERATIONS}...`)

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: anthropicHeaders(),
        body: JSON.stringify({
          model: 'claude-sonnet-4-5',
          max_tokens: 16000,
          system: systemPrompt,
          tools: [WEB_SEARCH_TOOL],
          messages,
        }),
      })

      if (!response.ok) {
        const errText = await response.text()
        console.error(`Anthropic rewrite API error ${response.status}:`, errText)
        throw new Error(`API ${response.status}: ${errText}`)
      }

      const data = await response.json()
      const stopReason = data.stop_reason

      // Add assistant turn to history
      messages.push({ role: 'assistant', content: data.content })

      // Done — extract final text
      if (stopReason === 'end_turn') {
        const textBlock = data.content.find((b: any) => b.type === 'text')
        if (textBlock?.text) finalText = textBlock.text
        break
      }

      // Tool use — feed results back and continue
      if (stopReason === 'tool_use') {
        const toolUseBlocks = data.content.filter((b: any) => b.type === 'tool_use')

        // Web search results are embedded in the tool_result blocks
        // returned by the API — we acknowledge each one
        const toolResults = toolUseBlocks.map((toolUse: any) => ({
          type: 'tool_result',
          tool_use_id: toolUse.id,
          // The actual search results come back via the API automatically
          // We just need to continue the loop
          content: 'Search results received. Continue research or proceed to writing.',
        }))

        messages.push({ role: 'user', content: toolResults })
        continue
      }

      // Fallback — try to get text and exit
      const textBlock = data.content?.find((b: any) => b.type === 'text')
      if (textBlock?.text) finalText = textBlock.text
      break
    }

    if (!finalText) throw new Error('No output produced after research loop')

    // Extract JSON — handle any leading text before the JSON object
    const clean = finalText.replace(/```json|```/g, '').trim()
    const jsonStart = clean.indexOf('{')
    const jsonEnd = clean.lastIndexOf('}')

    if (jsonStart === -1 || jsonEnd === -1) {
      throw new Error('No JSON object found in Claude output')
    }

    const result = JSON.parse(clean.slice(jsonStart, jsonEnd + 1))

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
      needsResearch: true,
      researchTopics: ['Rewrite failed — manual rewrite needed'],
      researchNotes: String(err),
    }
  }
}

// ─── Utility ──────────────────────────────────────────────────

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80)
}

export const delay = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms))
