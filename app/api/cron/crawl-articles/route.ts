// ============================================================
// Content Pipeline Cron Job
// Path: app/api/cron/crawl-articles/route.ts
// Triggered daily at 07:00 UTC by Vercel Cron
// Also callable manually from the dashboard
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { RSS_SOURCES } from '@/lib/rss-sources'
import {
  scoreArticlesBatch,
  rewriteArticle,
  delay,
  type RawArticle,
} from '@/lib/content-pipeline/processor'
import { createSanityDraft } from '@/lib/content-pipeline/sanity-publisher'

// ─── Supabase client (service role for full access) ──────────
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// ─── RSS Parser (built-in, no npm needed) ────────────────────

interface ParsedItem {
  title: string
  link: string
  pubDate?: string
  description?: string
  content?: string
  author?: string
  enclosure?: { url?: string }
  'media:content'?: { $?: { url?: string } }
}

async function fetchRSSFeed(
  url: string
): Promise<ParsedItem[]> {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; GreekTripPlanner/1.0)',
        Accept: 'application/rss+xml, application/xml, text/xml, */*',
      },
      signal: AbortSignal.timeout(10000), // 10s timeout per feed
    })

    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const xml = await res.text()
    return parseRSSXML(xml)
  } catch (err) {
    console.warn(`RSS fetch failed for ${url}:`, err)
    return []
  }
}

function parseRSSXML(xml: string): ParsedItem[] {
  const items: ParsedItem[] = []

  // Match all <item> or <entry> blocks
  const itemRegex = /<(?:item|entry)[^>]*>([\s\S]*?)<\/(?:item|entry)>/gi
  let itemMatch

  while ((itemMatch = itemRegex.exec(xml)) !== null) {
    const block = itemMatch[1]

    const title = extractTag(block, 'title')
    const link =
      extractTag(block, 'link') ||
      extractAttr(block, 'link', 'href') ||
      extractTag(block, 'guid')
    const description =
      extractTag(block, 'description') || extractTag(block, 'summary')
    const content =
      extractTag(block, 'content:encoded') ||
      extractTag(block, 'content') ||
      description
    const pubDate =
      extractTag(block, 'pubDate') ||
      extractTag(block, 'published') ||
      extractTag(block, 'updated') ||
      extractTag(block, 'dc:date')
    const author =
      extractTag(block, 'author') ||
      extractTag(block, 'dc:creator') ||
      extractTag(block, 'name')
    const enclosureUrl =
      extractAttr(block, 'enclosure', 'url') ||
      extractAttr(block, 'media:content', 'url')

    if (title && link) {
      items.push({
        title: stripHtmlEntities(stripTags(title)),
        link: link.trim(),
        pubDate,
        description: description ? stripHtmlEntities(stripTags(description)).slice(0, 500) : undefined,
        content: content ? stripHtmlEntities(content).slice(0, 3000) : undefined,
        author: author ? stripTags(author) : undefined,
        enclosure: enclosureUrl ? { url: enclosureUrl } : undefined,
      })
    }
  }

  return items.slice(0, 20) // Max 20 items per feed
}

function extractTag(xml: string, tag: string): string {
  const regex = new RegExp(
    `<${tag}[^>]*>(?:<!\\[CDATA\\[)?(.*?)(?:\\]\\]>)?<\\/${tag}>`,
    'is'
  )
  const match = xml.match(regex)
  return match ? match[1].trim() : ''
}

function extractAttr(xml: string, tag: string, attr: string): string {
  const regex = new RegExp(`<${tag}[^>]*${attr}="([^"]*)"`, 'i')
  const match = xml.match(regex)
  return match ? match[1].trim() : ''
}

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, '').trim()
}

function stripHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&#\d+;/g, '')
}

// ─── Deduplication check ─────────────────────────────────────

async function getAlreadyCrawledUrls(urls: string[]): Promise<Set<string>> {
  if (urls.length === 0) return new Set()
  const { data } = await supabase
    .from('crawled_articles')
    .select('original_url')
    .in('original_url', urls)
  return new Set((data || []).map(r => r.original_url))
}

// ─── Supabase storage ─────────────────────────────────────────

async function saveArticles(articles: object[]): Promise<void> {
  if (articles.length === 0) return
  const { error } = await supabase.from('crawled_articles').insert(articles)
  if (error) console.error('Supabase insert error:', error)
}

async function updateArticle(id: string, data: object): Promise<void> {
  const { error } = await supabase
    .from('crawled_articles')
    .update(data)
    .eq('id', id)
  if (error) console.error('Supabase update error:', error)
}

// ─── Main Pipeline ───────────────────────────────────────────

export async function GET(request: NextRequest) {
  // ── Auth: Vercel Cron sends CRON_SECRET, dashboard sends manual token
  const authHeader = request.headers.get('authorization')
  const isVercelCron = authHeader === `Bearer ${process.env.CRON_SECRET}`
  const isManualRun = authHeader === `Bearer ${process.env.PIPELINE_MANUAL_TOKEN}`

  if (!isVercelCron && !isManualRun) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const startTime = Date.now()
  const runLog: string[] = []
  const log = (msg: string) => {
    console.log(msg)
    runLog.push(`[${new Date().toISOString()}] ${msg}`)
  }

  log('🚀 Content pipeline started')

  const stats = {
    sourcesProcessed: 0,
    articlesFound: 0,
    articlesNew: 0,
    articlesRelevant: 0,
    articlesRewritten: 0,
    draftsPushedToSanity: 0,
    needsResearchCount: 0,
    errors: [] as string[],
  }

  try {
    // ── PHASE 1: Fetch all RSS feeds in parallel ──────────────
    log(`📡 Fetching ${RSS_SOURCES.length} RSS feeds...`)

    const feedResults = await Promise.allSettled(
      RSS_SOURCES.map(async source => {
        const items = await fetchRSSFeed(source.rssUrl)
        // Fallback URL if primary fails
        if (items.length === 0 && source.fallbackUrl) {
          return {
            source,
            items: await fetchRSSFeed(source.fallbackUrl),
          }
        }
        return { source, items }
      })
    )

    const allRawArticles: RawArticle[] = []
    const allUrls: string[] = []

    for (const result of feedResults) {
      if (result.status === 'fulfilled') {
        const { source, items } = result.value
        stats.sourcesProcessed++
        log(`  ✓ ${source.name}: ${items.length} items`)

        for (const item of items) {
          if (item.link) {
            allUrls.push(item.link)
            allRawArticles.push({
              sourceId: source.id,
              sourceName: source.name,
              country: source.country,
              language: source.language,
              url: item.link,
              title: item.title,
              excerpt: item.description,
              content: item.content,
              publishedAt: item.pubDate,
              author: item.author,
              imageUrl: item.enclosure?.url,
            })
          }
        }
      } else {
        stats.errors.push(`Feed fetch failed: ${result.reason}`)
      }
    }

    stats.articlesFound = allRawArticles.length
    log(`\n📰 Total articles found: ${allRawArticles.length}`)

    // ── PHASE 2: Deduplicate ──────────────────────────────────
    const alreadyCrawled = await getAlreadyCrawledUrls(allUrls)
    const newArticles = allRawArticles.filter(
      a => !alreadyCrawled.has(a.url)
    )
    stats.articlesNew = newArticles.length
    log(`🔄 New articles (not yet crawled): ${newArticles.length}`)

    if (newArticles.length === 0) {
      log('✅ No new articles to process')
      return NextResponse.json({ success: true, stats, log: runLog })
    }

    // ── PHASE 3: Relevance scoring (batched, 10 at a time) ────
    log('\n🤖 Scoring relevance...')
    const BATCH_SIZE = 10
    const scored = []

    for (let i = 0; i < newArticles.length; i += BATCH_SIZE) {
      const batch = newArticles.slice(i, i + BATCH_SIZE)
      log(`  Scoring batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(newArticles.length / BATCH_SIZE)}...`)
      const scoredBatch = await scoreArticlesBatch(batch)
      scored.push(...scoredBatch)
      if (i + BATCH_SIZE < newArticles.length) await delay(500)
    }

    const relevantArticles = scored.filter(a => a.isRelevant)
    stats.articlesRelevant = relevantArticles.length
    log(`✅ Relevant articles: ${relevantArticles.length}/${scored.length}`)

    // ── PHASE 4: Save all scored articles to Supabase ─────────
    const toInsert = scored.map(a => ({
      source_id: a.sourceId,
      source_name: a.sourceName,
      country: a.country,
      language: a.language,
      original_url: a.url,
      original_title: a.title,
      original_excerpt: a.excerpt || null,
      original_content: a.content || null,
      original_published_at: a.publishedAt || null,
      original_author: a.author || null,
      original_image_url: a.imageUrl || null,
      relevance_score: a.relevanceScore,
      relevance_reason: a.relevanceReason,
      is_relevant: a.isRelevant,
      status: a.isRelevant ? 'rewriting' : 'pending',
    }))

    await saveArticles(toInsert)
    log(`💾 Saved ${toInsert.length} articles to Supabase`)

    // ── PHASE 5: Rewrite relevant articles ───────────────────
    log('\n✍️  Rewriting relevant articles...')

    // Fetch IDs of just-inserted relevant articles
    const { data: insertedRows } = await supabase
      .from('crawled_articles')
      .select('id, original_url')
      .in('original_url', relevantArticles.map(a => a.url))
      .eq('status', 'rewriting')

    const urlToId = new Map(
      (insertedRows || []).map(r => [r.original_url, r.id])
    )

    // Process relevant articles (with small delay to avoid rate limits)
    for (const article of relevantArticles) {
      const dbId = urlToId.get(article.url)
      if (!dbId) continue

      try {
        log(`  ✍️  Rewriting: "${article.title.slice(0, 60)}..."`)
        const processed = await rewriteArticle(article)

        stats.articlesRewritten++
        if (processed.needsResearch) stats.needsResearchCount++

        // Try to push to Sanity as draft
        let sanityId: string | null = null
        try {
          sanityId = await createSanityDraft(processed)
          if (sanityId) stats.draftsPushedToSanity++
        } catch (sanityErr) {
          log(`  ⚠️  Sanity push failed for "${processed.rewrittenTitle}"`)
        }

        // Update Supabase with full processed data
        await updateArticle(dbId, {
          rewritten_title: processed.rewrittenTitle,
          rewritten_excerpt: processed.rewrittenExcerpt,
          rewritten_content: processed.rewrittenContent,
          suggested_slug: processed.suggestedSlug,
          target_keywords: processed.targetKeywords,
          suggested_tags: processed.suggestedTags,
          needs_research: processed.needsResearch,
          research_topics: processed.researchTopics,
          research_notes: processed.researchNotes,
          sanity_draft_id: sanityId,
          status: 'ready',
          processed_at: new Date().toISOString(),
        })

        await delay(1000) // 1s between rewrites to avoid rate limits
      } catch (err) {
        log(`  ❌ Failed to rewrite: ${article.title}`)
        stats.errors.push(`Rewrite failed: ${article.title}`)
        await updateArticle(urlToId.get(article.url) || '', {
          status: 'error',
          error_message: String(err),
        })
      }
    }

    const duration = ((Date.now() - startTime) / 1000).toFixed(1)
    log(`\n✅ Pipeline complete in ${duration}s`)
    log(`📊 Stats: ${JSON.stringify(stats)}`)

    return NextResponse.json({
      success: true,
      duration: `${duration}s`,
      stats,
      log: runLog,
    })
  } catch (err) {
    const errorMsg = String(err)
    log(`❌ Pipeline fatal error: ${errorMsg}`)
    return NextResponse.json(
      { success: false, error: errorMsg, stats, log: runLog },
      { status: 500 }
    )
  }
}

// Allow POST for manual trigger with body params (future use)
export { GET as POST }
