// ============================================================
// Article Processor
import { findRelevantLinks, formatLinksForPrompt } from '@/lib/content-pipeline/internal-links'
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
  faqItems: Array<{ question: string; answer: string }>
}

// ─── Shared Anthropic headers ─────────────────────────────────
function anthropicHeaders() {
  return {
    'Content-Type': 'application/json',
    'x-api-key': process.env.ANTHROPIC_API_KEY!,
    'anthropic-version': '2023-06-01',
  }
}

// ─── HTML Entity Decoder ─────────────────────────────────────
// Decodes HTML entities and strips tags from source content
// Handles Greek (&#928; &Pi;), German, and standard HTML entities
function decodeHtmlContent(html: string): string {
  if (!html) return ''

  return html
    // Named HTML entities
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&shy;/g, '')
    .replace(/&ndash;/g, '–')
    .replace(/&mdash;/g, '—')
    .replace(/&laquo;/g, '«')
    .replace(/&raquo;/g, '»')
    .replace(/&hellip;/g, '...')
    // Numeric HTML entities (covers Greek: &#928; = Π, etc.)
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code, 10)))
    // Hex HTML entities
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    // Named Greek entities (&Pi; &Sigma; etc.) — catch-all for any remaining
    .replace(/&[A-Za-z]+;/g, (entity) => {
      const entities: Record<string, string> = {
        '&Alpha;': 'Α', '&Beta;': 'Β', '&Gamma;': 'Γ', '&Delta;': 'Δ',
        '&Epsilon;': 'Ε', '&Zeta;': 'Ζ', '&Eta;': 'Η', '&Theta;': 'Θ',
        '&Iota;': 'Ι', '&Kappa;': 'Κ', '&Lambda;': 'Λ', '&Mu;': 'Μ',
        '&Nu;': 'Ν', '&Xi;': 'Ξ', '&Omicron;': 'Ο', '&Pi;': 'Π',
        '&Rho;': 'Ρ', '&Sigma;': 'Σ', '&Tau;': 'Τ', '&Upsilon;': 'Υ',
        '&Phi;': 'Φ', '&Chi;': 'Χ', '&Psi;': 'Ψ', '&Omega;': 'Ω',
        '&alpha;': 'α', '&beta;': 'β', '&gamma;': 'γ', '&delta;': 'δ',
        '&epsilon;': 'ε', '&zeta;': 'ζ', '&eta;': 'η', '&theta;': 'θ',
        '&iota;': 'ι', '&kappa;': 'κ', '&lambda;': 'λ', '&mu;': 'μ',
        '&nu;': 'ν', '&xi;': 'ξ', '&omicron;': 'ο', '&pi;': 'π',
        '&rho;': 'ρ', '&sigma;': 'σ', '&tau;': 'τ', '&upsilon;': 'υ',
        '&phi;': 'φ', '&chi;': 'χ', '&psi;': 'ψ', '&omega;': 'ω',
        '&sigmaf;': 'ς',
      }
      return entities[entity] || entity
    })
    // Strip remaining HTML tags
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    // Clean up whitespace
    .replace(/\s{2,}/g, ' ')
    .trim()
}

// ─── Relevance Scoring (batched) ─────────────────────────────

export async function scoreArticlesBatch(
  articles: RawArticle[]
): Promise<ScoredArticle[]> {
  if (articles.length === 0) return []

  const articlesPayload = articles.map((a, i) => ({
    index: i,
    title: a.title,
    excerpt: decodeHtmlContent(a.excerpt || '').slice(0, 300),
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
        model: 'claude-sonnet-4-6',
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

// web_search_20250305 is a server-side built-in tool.
// Anthropic executes the search automatically — no tool_result needed from us.
// The search results are embedded directly in the assistant's response content.
const WEB_SEARCH_TOOL = {
  type: 'web_search_20250305',
  name: 'web_search',
  max_uses: 5,
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

  // Find relevant internal links from the site's existing content
  const sourceText = `${article.title} ${article.excerpt || ''} ${article.content || ''}`
  const relevantLinks = findRelevantLinks(sourceText, 8)
  const internalLinksBlock = relevantLinks.length > 0
    ? `\n─────────────────────────────────────────
INTERNAL LINKS TO INCLUDE:
Naturally embed 3-6 of these links within the article body where contextually relevant.
Use them as anchor text on natural phrases — not "click here" or bare URLs.
Only use links that genuinely relate to the section content.

${formatLinksForPrompt(relevantLinks)}
─────────────────────────────────────────`
    : ''

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
Content: ${decodeHtmlContent(article.content || article.excerpt || article.title).slice(0, 3000)}
${needsTranslation ? '\n[TRANSLATE from Greek/German — use as starting point only, do not copy]\n' : ''}
Relevance Score: ${article.relevanceScore}/100
${internalLinksBlock}
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
  "research_notes": "One sentence on what would make this article even stronger",
  "faq_items": [
    {"question": "Question travelers commonly ask about this topic?", "answer": "Detailed answer in 2-3 sentences."},
    {"question": "Another common question?", "answer": "Detailed answer."},
    {"question": "Third question?", "answer": "Detailed answer."},
    {"question": "Fourth question?", "answer": "Detailed answer."},
    {"question": "Fifth question?", "answer": "Detailed answer."}
  ]
}

RULES FOR FAQ:
- 5 questions minimum, 8 maximum
- Questions must be real things travelers or industry professionals ask about THIS specific topic
- Answers must be specific and useful — not generic
- Do not duplicate content already in the article body`

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
          model: 'claude-sonnet-4-6',
          max_tokens: 16000,
          system: systemPrompt,
          tools: [WEB_SEARCH_TOOL],
          messages,
        }),
      })

      if (!response.ok) {
        const errText = await response.text()
        console.error(`Anthropic rewrite API error ${response.status}:`, errText)
        // Parse for cleaner error message
        try {
          const errJson = JSON.parse(errText)
          throw new Error(`API ${response.status}: ${errJson?.error?.message || errText}`)
        } catch {
          throw new Error(`API ${response.status}: ${errText}`)
        }
      }

      const data = await response.json()
      const stopReason = data.stop_reason

      // ── How web_search_20250305 works ──────────────────────────
      // This is a SERVER-SIDE tool — Anthropic executes the search
      // automatically. The real search results are already embedded
      // inside data.content as tool_result blocks alongside tool_use.
      // We MUST NOT send fake tool_result messages back — doing so
      // overwrites the real results and breaks translation/research.
      //
      // Correct flow:
      //   1. Add the full assistant message (tool_use + tool_result) to history
      //   2. Call the API again — Claude reads the real results and continues
      //   3. Repeat until stop_reason === 'end_turn'

      // Add the full assistant turn (includes real search results) to history
      messages.push({ role: 'assistant', content: data.content })

      if (stopReason === 'end_turn') {
        // Claude is done — find the final text block
        const textBlock = data.content.find((b: any) => b.type === 'text')
        if (textBlock?.text) finalText = textBlock.text
        break
      }

      if (stopReason === 'tool_use') {
        // Search was executed — real results are in data.content
        // Just loop: call API again so Claude can read results and continue
        continue
      }

      // Any other stop reason — try to extract text and exit
      const textBlock = data.content?.find((b: any) => b.type === 'text')
      if (textBlock?.text) finalText = textBlock.text
      break
    }

    if (!finalText) {
      console.error('No final text after', iterations, 'iterations — falling back to simple rewrite')
      return await simpleRewriteArticle(article)
    }

    // Robust extraction — HTML content inside JSON breaks standard JSON.parse
    const result = extractClaudeOutput(finalText)
    if (!result) {
      throw new Error('No JSON object found in Claude output — check Vercel logs')
    }

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
      faqItems: result.faq_items || [],
    }

  } catch (err) {
    const errMsg = String(err)
    console.error(`Rewrite error for "${article.title}": ${errMsg}`)
    // Try simple rewrite before giving up completely
    try {
      console.log('Attempting simple rewrite fallback...')
      return await simpleRewriteArticle(article)
    } catch {
      // Both failed — return original with error
    }
    return {
      ...article,
      rewrittenTitle: article.title,
      rewrittenExcerpt: article.excerpt || '',
      rewrittenContent: article.content || article.excerpt || '',
      suggestedSlug: slugify(article.title),
      targetKeywords: [],
      suggestedTags: [],
      needsResearch: true,
      researchTopics: [`Rewrite failed: ${errMsg}`],
      researchNotes: errMsg,
      faqItems: [],
    }
  }
}

// ─── Robust Claude Output Parser ────────────────────────────
// Problem: JSON.parse fails when rewritten_content contains unescaped
// HTML quotes/special chars. Solution: extract rewritten_content via
// regex separately, parse everything else as JSON, then recombine.

function extractClaudeOutput(raw: string): Record<string, any> | null {
  try {
    const text = raw.replace(/```json[\s\S]*?```|```/g, '').trim()
    const start = text.indexOf('{')
    const end = text.lastIndexOf('}')
    if (start === -1 || end === -1) return null

    const jsonStr = text.slice(start, end + 1)

    // Extract rewritten_content separately using regex
    // It sits between "rewritten_content": " and the closing ", "next_key"
    const contentRegex = /"rewritten_content"\s*:\s*"([\s\S]*?)"\s*,\s*"(?:suggested_slug|target_keywords|needs_research|faq_items|research_notes|research_topics)"/
    const contentMatch = jsonStr.match(contentRegex)
    const htmlContent = contentMatch ? contentMatch[1] : ''

    // Build a sanitized JSON string with a safe placeholder
    let sanitized: string
    if (contentMatch) {
      const nextKey = contentMatch[0].match(/"(suggested_slug|target_keywords|needs_research|faq_items|research_notes|research_topics)"/)![1]
      sanitized = jsonStr.replace(
        contentMatch[0],
        `"rewritten_content": "PLACEHOLDER", "${nextKey}"`
      )
    } else {
      sanitized = jsonStr
    }

    // Parse the sanitized JSON
    let parsed: Record<string, any>
    try {
      parsed = JSON.parse(sanitized)
    } catch (e1) {
      // Aggressive cleanup for control characters
      const superClean = sanitized
        .replace(/[ --]/g, '')
      parsed = JSON.parse(superClean)
    }

    // Restore the real HTML content
    if (htmlContent) {
      parsed.rewritten_content = htmlContent
    }

    return parsed
  } catch (err) {
    console.error('extractClaudeOutput failed:', String(err))
    return null
  }
}

// ─── Simple Rewrite Fallback ─────────────────────────────────
// Used when web-search rewrite fails. Single API call, no tools,
// clean prompt. Handles Greek/German translation reliably.

async function simpleRewriteArticle(article: ScoredArticle): Promise<ProcessedArticle> {
  const needsTranslation = article.language !== 'en'
  const cleanContent = decodeHtmlContent(
    article.content || article.excerpt || article.title
  ).slice(0, 2000)

  const prompt = `You are a travel content writer specializing in Greece tourism. Write an English article for greektriplanner.me.
${needsTranslation ? 'SOURCE IS IN GREEK OR GERMAN. You MUST translate it and write entirely in English.' : ''}

SOURCE:
Title: ${article.title}
Content: ${cleanContent}

Write a detailed 1500-2000 word insight article in English. Stay focused on the topic. Use HTML tags: <h2>, <h3>, <p>, <ul>, <li>, <strong>.

Respond with ONLY this JSON object. Escape all quotes inside strings with backslash. No markdown fences:
{
  "rewritten_title": "SEO title with primary keyword (60-70 chars)",
  "rewritten_excerpt": "Meta description 150-160 chars",
  "rewritten_content": "Full article HTML here",
  "suggested_slug": "url-slug",
  "target_keywords": ["keyword1", "keyword2", "keyword3"],
  "suggested_tags": ["tag1", "tag2", "tag3"],
  "needs_research": false,
  "research_topics": [],
  "research_notes": "Simple fallback rewrite — no web search",
  "faq_items": [
    {"question": "Relevant question 1?", "answer": "Specific answer."},
    {"question": "Relevant question 2?", "answer": "Specific answer."},
    {"question": "Relevant question 3?", "answer": "Specific answer."}
  ]
}`

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: anthropicHeaders(),
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 8000,
      messages: [{ role: 'user', content: prompt }],
    }),
  })

  if (!response.ok) {
    throw new Error(`Simple rewrite API ${response.status}: ${await response.text()}`)
  }

  const data = await response.json()
  const text = data.content?.[0]?.text || ''
  const result = extractClaudeOutput(text)

  if (!result) throw new Error('Simple rewrite: could not parse output')

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
    researchNotes: result.research_notes || 'Simple fallback rewrite',
    faqItems: result.faq_items || [],
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
