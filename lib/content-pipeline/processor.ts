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
  affiliateSuggestions: Array<{
    anchorText: string
    destination: string
    type: string
    context: string
  }>
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

  // Word count: scales with relevance score, minimum 2000, maximum 5000
  const wordCount = article.relevanceScore >= 85
    ? '3500-5000'
    : article.relevanceScore >= 70
      ? '2500-3500'
      : '2000-2500'

  // Find relevant internal links — use decoded text so Greek/German content matches properly
  const sourceText = `${article.title} ${decodeHtmlContent(article.excerpt || '')} ${decodeHtmlContent(article.content || '')}`
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

    const systemPrompt = `You are a senior travel journalist writing for greektriplanner.me, an authoritative English-language publication covering Greece inbound tourism. Your readers are international travelers and travel industry professionals who want intelligence, not inspiration.

WRITING STANDARDS:

1. JOURNALIST VOICE, NOT BROCHURE COPY
Write like you are reporting a story — with a point of view, tension, and narrative drive.
BAD: "Greece in May is simply magnificent with warm temperatures and fewer crowds."
GOOD: "May has quietly become Greece's most fiercely contested shoulder season — and the numbers prove it."
Avoid all promotional language: never write "stunning", "magnificent", "simply beautiful", "paradise".

2. SOURCE ARTICLE IS A TRIGGER, NOT YOUR CONTENT
Use the source as the news hook that tells you WHAT to write about.
Your article must go significantly beyond it — with new 2026 data, expert context, counterpoints, and original analysis.
A reader who already read the source should find your article a major upgrade.

3. CRITICAL: ALWAYS USE CURRENT YEAR 2026
The source may be from 2024 or earlier. You MUST update all year references to 2026.
Never publish "in 2024" or "this year (2024)". If the source discusses past forecasts or scenarios,
reframe them: what actually happened, and what does the 2026 outlook look like now?

4. DEPTH REQUIRES SPECIFICITY
BAD: "Tourism numbers were strong."
GOOD: "Greece welcomed 35.6 million visitors in 2024 according to INSETE — a 7.2% increase that defied early forecasts."
Every claim needs a source, number, or named authority behind it.

5. HEADINGS TELL A STORY
BAD: "Tourism Statistics" / "Best Destinations" / "Practical Tips"
GOOD: "Why 2026 Is Greece's Most Polarised Season Yet" / "The Islands Gaining Ground on Santorini"

6. GREEKTRIPLANNER.ME HAS GENERIC TRAVEL GUIDES ALREADY
Do not write "Getting There", "Where to Stay", "Best Time to Visit" sections.
Write analysis, market intelligence, and perspective that a travel guide cannot provide.`

  const userPrompt = `${combinedNote}
TODAY'S DATE: March 2026. CURRENT YEAR: 2026. Update ALL year references in your article to 2026.

SOURCE ARTICLE (your news hook — do not summarise, use as trigger only — stay focused on this):
Title: ${article.title}
Source: ${article.sourceName} (${article.country})
Language: ${article.language}
URL: ${article.url}
Content: ${decodeHtmlContent(article.content || article.excerpt || article.title).slice(0, 3000)}
${needsTranslation ? '\n[TRANSLATE from Greek/German — use as starting point only, do not copy]\n' : ''}
Relevance Score: ${article.relevanceScore}/100
${internalLinksBlock}
─────────────────────────────────────────
TODAY'S DATE: March 2026. CURRENT YEAR IS 2026. Update all year references accordingly.

─────────────────────────────────────────
STEP 1 — RESEARCH (run 2-5 searches)

MANDATORY:
• Search 1: Latest 2025-2026 data, official statistics, or news on this topic
• Search 2: Best existing articles on this topic — identify what they cover and what gap you can fill

CONDITIONAL (only if the source mentions these):
• Search 3: Prices, booking trends, commercial data — only if source mentions costs or commercial aspects
• Search 4: Specific places, local detail, cultural context — only if source mentions named locations
• Search 5: Policy changes, new openings, emerging trends — only if source mentions recent developments

After researching, ask: What is the most surprising or significant thing I found that the source did NOT cover? That is your lead.

─────────────────────────────────────────
STEP 2 — WRITE a ${wordCount} word JOURNALISM PIECE

BEFORE WRITING — answer these internally:
1. What is the real story? (not just the topic — the specific insight, tension, or implication)
2. What does the reader know after reading this that they did not know before?
3. Is my opening sentence something that would make a senior editor keep reading?
4. Which 3-5 internal links from the list above will I embed?
   (If no list was provided above, skip this — but if links ARE listed, embedding them is NOT optional)

ARTICLE REQUIREMENTS:
• Opening paragraph: Lead with your single sharpest research finding.
  Format: [Specific number or fact], [context], [why it matters or what's surprising].
  Example: "Greece captured the second slot in British Airways Holidays' short-haul rankings for the third consecutive year — a position it is now actively defending against a resurgent Turkey."
  NOT: "Greece continues to attract British tourists despite global uncertainty." (vague, unsurprising)
  NOT: "Nestled in the heart of the Mediterranean, Greece offers..." (scene-setting, cut immediately)
• Body sections: Each H2 advances the story. Every paragraph has at least one specific,
  attributed data point. Include complications and counterpoints — not just positive news.
  DESCRIPTION TEST: Read each descriptive sentence. If it could appear in a hotel brochure
  or a Wikipedia article, replace it with a market implication, price data, booking trend,
  or infrastructure fact. "Chania's old harbour is architecturally compelling" fails the test.
  "Chania's old harbour district drove a 23% accommodation price rise between 2023-2025" passes.
• Closing: Concrete implication or forward-looking analysis. What should the reader think or do?
  STRUCTURE TEST: Read your closing paragraph. If it is stronger than your opening, swap them.
  The sharpest insight belongs at the top, not saved for the end.
• Practical anchor (ONE paragraph only, for destination/site articles): If the article covers
  a specific place a reader might visit — a site, a destination, a neighbourhood — include
  one concise paragraph with access information: nearest town, transport, opening season,
  admission. This is NOT a travel guide section. It is one paragraph of practical intelligence
  that completes the picture without turning the article into a generic guide.

ABSOLUTE RULES:
No promotional language: no "stunning", "magnificent", "paradise", "gem", "hidden gem", "idyllic"
No vague attribution: NEVER write "industry analysts noted", "experts say", "data shows" without naming the specific analyst, report, or data source. If you cannot name it, do not write the claim.
No padding sections: do not explain what an event or organisation IS if the reader clearly knows (e.g. do not explain what a trade forum is). Use those words to go deeper on the story.
No diplomatic openings: never start with "Despite..." or "In the context of..." — lead with the sharpest specific fact you found.
No year references before 2025: update all "in 2024" / "this year" to 2026 context
No generic travel guide sections: no "Getting There", "Where to Stay", "Best Time to Visit"
No summarising the source: use it as a trigger only
INTERNAL LINKS ARE MANDATORY: You MUST embed 3-5 of the provided internal links as HTML <a> tags in the article body.
CORRECT: <p>Travelers planning a visit should review the <a href="https://greektriplanner.me/blog/corfu-travel-guide">Corfu travel guide</a> before booking.</p>
WRONG: listing links at the end, using bare URLs, or skipping them entirely.
If you do not embed at least 3 links, the article FAILS the editorial check.

WHEN YOU CANNOT FIND SPECIFIC DATA:
If a search returns no hard numbers for a claim, write what you DO know and flag the gap explicitly in research_topics. Do not write around missing data with vague language — acknowledge it and move on to what you can prove.

OPENING SENTENCE TEST:
Read your first sentence. Would a senior travel editor at The Economist or FT Weekend keep reading? If it starts with "Despite", "Greece is", "In recent years", or any variation of scene-setting — rewrite it. Lead with a number, a tension, or a counterintuitive finding.

HTML RULES — READ CAREFULLY:
- Use ONLY: <h2>, <h3>, <p>, <ul>, <li>, <strong>. No structural HTML.
- Every <p> tag must contain 1-3 sentences maximum. Never write a paragraph longer than 3 sentences.
- NEVER use \n or \n\n inside the JSON string. Use <p> tags to separate paragraphs.
- Each sentence in the HTML must end with a period inside the <p> tag, not outside it.
- WRONG: "First sentence.\n\nSecond sentence." 
- RIGHT: "<p>First sentence.</p><p>Second sentence.</p>"
- The JSON string must be a single continuous line of HTML with no literal newlines.

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
  "affiliate_suggestions": [
    {
      "anchor_text": "natural phrase from article body where affiliate link fits",
      "destination": "specific product/destination the link should point to",
      "type": "ferry|hotel|tour|car_rental|insurance",
      "context": "which paragraph or section this belongs in"
    }
  ],
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
- Do not duplicate content already in the article body

RULES FOR AFFILIATE SUGGESTIONS:
- Suggest 1-3 maximum — only where genuinely contextually relevant
- Types: ferry (Ferryhopper links for island articles), hotel (Booking.com for accommodation articles),
  tour (GetYourGuide for activity/site articles), car_rental (for island/driving articles),
  insurance (for general Greece travel planning articles)
- anchor_text must be a natural phrase already in the article — never "click here" or "book now"
- Only suggest if the article topic directly implies a bookable action for the reader
- If no natural affiliate fit exists, return an empty array`

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
      console.error('No final text after', iterations, 'iterations — using simple rewrite fallback')
      return await simpleRewriteArticle(article, formatLinksForPrompt(relevantLinks))
    }

    // Robust extraction — HTML inside JSON breaks standard JSON.parse
    const result = extractClaudeOutput(finalText)
    if (!result) {
      throw new Error('No parseable JSON in Claude output — check Vercel logs')
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
      affiliateSuggestions: (result.affiliate_suggestions || []).map((s: any) => ({
        anchorText: s.anchor_text || '',
        destination: s.destination || '',
        type: s.type || '',
        context: s.context || '',
      })),
    }

  } catch (err) {
    const errMsg = String(err)
    console.error(`Rewrite error for "${article.title}": ${errMsg}`)
    try {
      return await simpleRewriteArticle(article, formatLinksForPrompt(relevantLinks))
    } catch {
      // both failed
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
      affiliateSuggestions: [],
    }
  }
}

// ─── Robust Claude Output Parser ────────────────────────────
// Extracts rewritten_content separately to avoid JSON.parse failures
// caused by unescaped quotes inside HTML strings.

function extractClaudeOutput(raw: string): Record<string, any> | null {
  try {
    const text = raw.replace(/```json[\s\S]*?```|```/g, '').trim()
    const start = text.indexOf('{')
    const end = text.lastIndexOf('}')
    if (start === -1 || end === -1) return null
    const jsonStr = text.slice(start, end + 1)

    // Extract rewritten_content value before parsing
    const contentRegex = /"rewritten_content"\s*:\s*"([\s\S]*?)"\s*,\s*"(?:suggested_slug|target_keywords|needs_research|faq_items|research_notes|research_topics)"/
    const contentMatch = jsonStr.match(contentRegex)
    const htmlContent = contentMatch ? contentMatch[1] : ''

    let sanitized: string
    if (contentMatch) {
      const nextKeyMatch = contentMatch[0].match(/"(suggested_slug|target_keywords|needs_research|faq_items|research_notes|research_topics)"/)
      const nextKey = nextKeyMatch ? nextKeyMatch[1] : 'suggested_slug'
      sanitized = jsonStr.replace(contentMatch[0], `"rewritten_content": "PLACEHOLDER", "${nextKey}"`)
    } else {
      sanitized = jsonStr
    }

    let parsed: Record<string, any>
    try {
      parsed = JSON.parse(sanitized)
    } catch {
      const superClean = sanitized.replace(/[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/g, '')
      parsed = JSON.parse(superClean)
    }

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
// Single API call, no web search. Used when main rewrite fails.

async function simpleRewriteArticle(article: ScoredArticle, internalLinks: string = ''): Promise<ProcessedArticle> {
  const needsTranslation = article.language !== 'en'
  const cleanContent = decodeHtmlContent(
    article.content || article.excerpt || article.title
  ).slice(0, 2000)

  const prompt = `You are a travel journalist writing for greektriplanner.me. Write a professional news/insight article in English. Current year: 2026.
${needsTranslation ? 'SOURCE IS IN GREEK OR GERMAN. Translate and write entirely in fluent English.' : ''}

SOURCE:
Title: ${article.title}
Content: ${cleanContent}

Write a 1500-word journalist-quality insight article. Use specific data, no promotional language, no generic travel advice.
${internalLinks ? `INTERNAL LINKS — embed 3-5 of these as <a href> tags on natural phrases in the body:
${internalLinks}` : ''}
HTML: <h2>, <h3>, <p>, <ul>, <li>. Every <p> must be 1-3 sentences. No literal \n in output.

Output ONLY this JSON (no markdown, escape all quotes in HTML with backslash):
{"rewritten_title":"SEO title","rewritten_excerpt":"Meta 150-160 chars","rewritten_content":"HTML here","suggested_slug":"url-slug","target_keywords":["kw1","kw2","kw3"],"suggested_tags":["t1","t2","t3"],"needs_research":false,"research_topics":[],"research_notes":"Simple fallback","faq_items":[{"question":"Q1?","answer":"A1."},{"question":"Q2?","answer":"A2."},{"question":"Q3?","answer":"A3."}]}`

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: anthropicHeaders(),
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 8000,
      messages: [{ role: 'user', content: prompt }],
    }),
  })

  if (!response.ok) throw new Error(`Simple rewrite ${response.status}: ${await response.text()}`)

  const data = await response.json()
  const result = extractClaudeOutput(data.content?.[0]?.text || '')
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
    affiliateSuggestions: [],
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
