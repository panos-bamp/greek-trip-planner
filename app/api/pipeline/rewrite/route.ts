// ============================================================
// On-Demand Rewrite API
// Path: app/api/pipeline/rewrite/route.ts
// Handles: single article rewrite OR combine multiple into one
// Called from the dashboard when you select articles
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { rewriteArticle, type RawArticle } from '@/lib/content-pipeline/processor'
import { createSanityDraft } from '@/lib/content-pipeline/sanity-publisher'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.PIPELINE_MANUAL_TOKEN}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { ids, mode } = body
  // mode: 'single' | 'combine'
  // ids: string[] — array of crawled_articles UUIDs

  if (!ids || ids.length === 0) {
    return NextResponse.json({ error: 'No article IDs provided' }, { status: 400 })
  }

  // Fetch the selected articles from Supabase
  const { data: articles, error } = await supabase
    .from('crawled_articles')
    .select('*')
    .in('id', ids)

  if (error || !articles || articles.length === 0) {
    return NextResponse.json({ error: 'Articles not found' }, { status: 404 })
  }

  try {
    if (mode === 'combine' && articles.length > 1) {
      // ── COMBINE MODE: merge multiple articles into one insight ──

      // Build a combined source article from all selected
      const combinedTitle = `Combined: ${articles.map((a: any) => a.original_title).join(' + ').slice(0, 120)}`
      const combinedContent = articles
        .map((a: any) =>
          `SOURCE: ${a.source_name} (${a.country})\nTITLE: ${a.original_title}\nCONTENT: ${a.original_content || a.original_excerpt || ''}`
        )
        .join('\n\n---\n\n')

      const combinedSources = articles
        .map((a: any) => `${a.source_name} (${a.country})`)
        .join(', ')

      // Create a synthetic article for the rewriter
      const syntheticArticle: RawArticle & {
        relevanceScore: number
        relevanceReason: string
        isRelevant: boolean
      } = {
        sourceId: 'combined',
        sourceName: combinedSources,
        country: articles[0].country,
        language: 'en', // treat as English since we're combining
        url: articles[0].original_url,
        title: combinedTitle,
        excerpt: articles.map((a: any) => a.original_excerpt).filter(Boolean).join(' '),
        content: combinedContent,
        relevanceScore: Math.max(...articles.map((a: any) => a.relevance_score || 0)),
        relevanceReason: 'Combined from multiple relevant sources',
        isRelevant: true,
      }

      // Override the rewrite prompt to mention this is a synthesis
      const processed = await rewriteArticle(syntheticArticle, true)

      // Push to Sanity
      const sanityId = await createSanityDraft(processed)

      // Update all source articles as 'published' (consumed into combined piece)
      await supabase
        .from('crawled_articles')
        .update({
          status: 'published',
          processed_at: new Date().toISOString(),
          sanity_draft_id: sanityId || null,
        })
        .in('id', ids)

      return NextResponse.json({
        success: true,
        mode: 'combine',
        articlesConsumed: articles.length,
        rewrittenTitle: processed.rewrittenTitle,
        sanityId,
      })
    } else {
      // ── SINGLE MODE: rewrite each selected article individually ──
      const results = []

      for (const article of articles) {
        const rawArticle: RawArticle & {
          relevanceScore: number
          relevanceReason: string
          isRelevant: boolean
        } = {
          sourceId: article.source_id,
          sourceName: article.source_name,
          country: article.country,
          language: article.language,
          url: article.original_url,
          title: article.original_title,
          excerpt: article.original_excerpt,
          content: article.original_content,
          publishedAt: article.original_published_at,
          relevanceScore: article.relevance_score || 0,
          relevanceReason: article.relevance_reason || '',
          isRelevant: true,
        }

        const processed = await rewriteArticle(rawArticle, false)
        const sanityId = await createSanityDraft(processed)

        // Update status in Supabase
        await supabase
          .from('crawled_articles')
          .update({
            rewritten_title: processed.rewrittenTitle,
            rewritten_excerpt: processed.rewrittenExcerpt,
            rewritten_content: processed.rewrittenContent,
            suggested_slug: processed.suggestedSlug,
            target_keywords: processed.targetKeywords,
            suggested_tags: processed.suggestedTags,
            needs_research: processed.needsResearch,
            research_topics: processed.researchTopics,
            research_notes: processed.researchNotes,
            sanity_draft_id: sanityId || null,
            status: 'ready',
            processed_at: new Date().toISOString(),
          })
          .eq('id', article.id)

        results.push({
          id: article.id,
          rewrittenTitle: processed.rewrittenTitle,
          sanityId,
          needsResearch: processed.needsResearch,
        })
      }

      return NextResponse.json({
        success: true,
        mode: 'single',
        results,
      })
    }
  } catch (err) {
    console.error('Rewrite error:', err)
    return NextResponse.json(
      { success: false, error: String(err) },
      { status: 500 }
    )
  }
}
