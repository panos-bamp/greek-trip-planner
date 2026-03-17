'use client'

// ============================================================
// Content Pipeline Dashboard
// Path: app/admin/content-pipeline/page.tsx
// Uses your existing design tokens (DM Serif, cream palette)
// ============================================================

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// ─── Types ───────────────────────────────────────────────────

interface Article {
  id: string
  source_id: string
  source_name: string
  country: string
  language: string
  original_url: string
  original_title: string
  original_excerpt: string | null
  relevance_score: number | null
  is_relevant: boolean
  rewritten_title: string | null
  rewritten_excerpt: string | null
  rewritten_content: string | null
  target_keywords: string[] | null
  suggested_tags: string[] | null
  needs_research: boolean
  research_topics: string[] | null
  research_notes: string | null
  status: string
  sanity_draft_id: string | null
  crawled_at: string
  processed_at: string | null
  error_message: string | null
}

interface Stats {
  total_today: number
  relevant_today: number
  ready_to_publish: number
  published_today: number
  needs_research_count: number
  errors_today: number
  from_greece: number
  from_uk: number
  from_germany: number
  from_us: number
  from_industry: number
}

type FilterTab = 'all' | 'ready' | 'needs_research' | 'published' | 'error'

const COUNTRY_FLAGS: Record<string, string> = {
  GR: '🇬🇷', UK: '🇬🇧', DE: '🇩🇪', US: '🇺🇸', INDUSTRY: '🌍',
}

const STATUS_COLORS: Record<string, string> = {
  ready: 'bg-emerald-100 text-emerald-800',
  published: 'bg-blue-100 text-blue-800',
  rewriting: 'bg-amber-100 text-amber-800',
  pending: 'bg-gray-100 text-gray-600',
  error: 'bg-red-100 text-red-700',
  rejected: 'bg-gray-200 text-gray-500',
  scoring: 'bg-purple-100 text-purple-700',
}

// ─── Main Dashboard Component ─────────────────────────────────

export default function ContentPipelineDashboard() {
  const [articles, setArticles] = useState<Article[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [activeTab, setActiveTab] = useState<FilterTab>('all')
  const [isRunning, setIsRunning] = useState(false)
  const [lastRun, setLastRun] = useState<string | null>(null)
  const [runLog, setRunLog] = useState<string[]>([])
  const [showLog, setShowLog] = useState(false)
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      // Fetch stats from view
      const { data: statsData } = await supabase
        .from('content_pipeline_stats')
        .select('*')
        .single()
      if (statsData) setStats(statsData)

      // Fetch articles
      let query = supabase
        .from('crawled_articles')
        .select('*')
        .order('crawled_at', { ascending: false })
        .limit(100)

      if (activeTab === 'ready') query = query.eq('status', 'ready')
      else if (activeTab === 'needs_research') query = query.eq('needs_research', true)
      else if (activeTab === 'published') query = query.eq('status', 'published')
      else if (activeTab === 'error') query = query.eq('status', 'error')
      else query = query.gte('crawled_at', new Date(Date.now() - 7 * 86400000).toISOString())

      const { data } = await query
      setArticles(data || [])
    } finally {
      setLoading(false)
    }
  }, [activeTab])

  useEffect(() => { fetchData() }, [fetchData])

  // ── Manual pipeline trigger ───────────────────────────────
  const triggerPipeline = async () => {
    setIsRunning(true)
    setRunLog(['Starting pipeline...'])
    setShowLog(true)
    try {
      const res = await fetch('/api/cron/crawl-articles', {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_PIPELINE_MANUAL_TOKEN || ''}`,
        },
      })
      const data = await res.json()
      setRunLog(data.log || ['Pipeline completed'])
      setLastRun(new Date().toLocaleTimeString())
      await fetchData()
    } catch {
      setRunLog(prev => [...prev, '❌ Pipeline request failed'])
    } finally {
      setIsRunning(false)
    }
  }

  // ── Publish to Sanity ─────────────────────────────────────
  const publishArticle = async (article: Article) => {
    const { error } = await supabase
      .from('crawled_articles')
      .update({ status: 'published', published_at: new Date().toISOString() })
      .eq('id', article.id)
    if (!error) await fetchData()
  }

  // ── Reject article ────────────────────────────────────────
  const rejectArticle = async (id: string) => {
    await supabase
      .from('crawled_articles')
      .update({ status: 'rejected' })
      .eq('id', id)
    await fetchData()
  }

  // ── Filter articles by search ─────────────────────────────
  const filteredArticles = articles.filter(a => {
    if (!searchQuery) return true
    const q = searchQuery.toLowerCase()
    return (
      (a.rewritten_title || a.original_title).toLowerCase().includes(q) ||
      a.source_name.toLowerCase().includes(q) ||
      a.country.toLowerCase().includes(q)
    )
  })

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-cream-DEFAULT)', fontFamily: 'var(--font-sans)' }}>

      {/* ── Header ─────────────────────────────────────────── */}
      <div style={{ background: 'var(--color-dark-DEFAULT)' }} className="px-6 py-5 pt-20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 style={{ fontFamily: 'var(--font-serif)', color: 'white' }} className="text-2xl font-normal">
              Content Pipeline
            </h1>
            <p className="text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Greece Tourism Intelligence · {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {lastRun && (
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
                Last run: {lastRun}
              </span>
            )}
            <button
              onClick={() => fetchData()}
              className="px-3 py-2 rounded-lg text-sm border transition-all"
              style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.7)' }}
            >
              ↻ Refresh
            </button>
            <button
              onClick={triggerPipeline}
              disabled={isRunning}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-60"
              style={{
                background: isRunning ? 'rgba(255,86,53,0.6)' : 'var(--color-accent-DEFAULT)',
                color: 'white',
              }}
            >
              {isRunning ? '⟳ Running...' : '▶ Run Pipeline Now'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* ── Stats Grid ─────────────────────────────────────── */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
            {[
              { label: 'Found Today', value: stats.total_today, color: '#180204', sub: 'total articles' },
              { label: 'Relevant', value: stats.relevant_today, color: '#2C73FF', sub: 'to Greece tourism' },
              { label: 'Ready', value: stats.ready_to_publish, color: '#10b981', sub: 'to publish' },
              { label: 'Published', value: stats.published_today, color: '#8b5cf6', sub: 'today' },
              { label: 'Need Research', value: stats.needs_research_count, color: '#FF5635', sub: 'flagged' },
              { label: 'Errors', value: stats.errors_today, color: '#ef4444', sub: 'failed' },
            ].map(s => (
              <div key={s.label} className="rounded-2xl p-4" style={{ background: 'white', border: '1px solid var(--color-cream-200)' }}>
                <div className="text-3xl font-bold" style={{ color: s.color }}>
                  {s.value ?? 0}
                </div>
                <div className="text-xs font-semibold mt-1" style={{ color: 'var(--color-dark-DEFAULT)' }}>
                  {s.label}
                </div>
                <div className="text-xs" style={{ color: 'rgba(24,2,4,0.4)' }}>{s.sub}</div>
              </div>
            ))}
          </div>
        )}

        {/* ── Source breakdown ───────────────────────────────── */}
        {stats && (
          <div className="rounded-2xl p-4 mb-6 flex gap-6 flex-wrap" style={{ background: 'white', border: '1px solid var(--color-cream-200)' }}>
            <span className="text-xs font-semibold" style={{ color: 'rgba(24,2,4,0.4)' }}>BY MARKET:</span>
            {[
              { flag: '🇬🇷', label: 'Greece', value: stats.from_greece },
              { flag: '🇬🇧', label: 'UK', value: stats.from_uk },
              { flag: '🇩🇪', label: 'Germany', value: stats.from_germany },
              { flag: '🇺🇸', label: 'US', value: stats.from_us },
              { flag: '🌍', label: 'Industry', value: stats.from_industry },
            ].map(m => (
              <div key={m.label} className="flex items-center gap-1.5">
                <span>{m.flag}</span>
                <span className="text-sm font-medium" style={{ color: 'var(--color-dark-DEFAULT)' }}>{m.value ?? 0}</span>
                <span className="text-xs" style={{ color: 'rgba(24,2,4,0.4)' }}>{m.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* ── Run Log ────────────────────────────────────────── */}
        {showLog && runLog.length > 0 && (
          <div className="rounded-2xl p-4 mb-6" style={{ background: '#0f172a', border: '1px solid #1e293b' }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-emerald-400">PIPELINE LOG</span>
              <button onClick={() => setShowLog(false)} className="text-xs text-slate-500 hover:text-slate-300">✕ close</button>
            </div>
            <div className="space-y-0.5 max-h-48 overflow-y-auto">
              {runLog.map((line, i) => (
                <div key={i} className="text-xs font-mono text-slate-300">{line}</div>
              ))}
              {isRunning && (
                <div className="text-xs font-mono text-emerald-400 animate-pulse">▌</div>
              )}
            </div>
          </div>
        )}

        {/* ── Tabs + Search ──────────────────────────────────── */}
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div className="flex gap-1 p-1 rounded-xl" style={{ background: 'white', border: '1px solid var(--color-cream-200)' }}>
            {([
              { key: 'all', label: 'All (7d)' },
              { key: 'ready', label: `Ready ${stats ? `(${stats.ready_to_publish})` : ''}` },
              { key: 'needs_research', label: `Research ${stats ? `(${stats.needs_research_count})` : ''}` },
              { key: 'published', label: 'Published' },
              { key: 'error', label: 'Errors' },
            ] as { key: FilterTab; label: string }[]).map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
                style={{
                  background: activeTab === tab.key ? 'var(--color-dark-DEFAULT)' : 'transparent',
                  color: activeTab === tab.key ? 'white' : 'var(--color-dark-400)',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="px-4 py-2 rounded-xl text-sm outline-none"
            style={{
              background: 'white',
              border: '1px solid var(--color-cream-200)',
              color: 'var(--color-dark-DEFAULT)',
              width: '240px',
            }}
          />
        </div>

        {/* ── Research Queue Banner ──────────────────────────── */}
        {activeTab === 'needs_research' && filteredArticles.length > 0 && (
          <div className="rounded-2xl p-4 mb-4 flex items-start gap-3" style={{ background: '#fff7ed', border: '1px solid #fed7aa' }}>
            <span className="text-xl">🔬</span>
            <div>
              <p className="text-sm font-semibold" style={{ color: '#9a3412' }}>Research Queue</p>
              <p className="text-xs mt-0.5" style={{ color: '#c2410c' }}>
                These articles contain topics that deserve deeper original research — new data, policy changes, emerging destinations, or market shifts. Turn them into high-value long-form content.
              </p>
            </div>
          </div>
        )}

        {/* ── Article Cards ──────────────────────────────────── */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="text-4xl mb-3">⟳</div>
              <p className="text-sm" style={{ color: 'rgba(24,2,4,0.4)' }}>Loading articles...</p>
            </div>
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="flex items-center justify-center py-20 rounded-2xl" style={{ background: 'white', border: '1px solid var(--color-cream-200)' }}>
            <div className="text-center">
              <div className="text-4xl mb-3">📭</div>
              <p className="font-medium" style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-dark-DEFAULT)' }}>No articles here yet</p>
              <p className="text-sm mt-1" style={{ color: 'rgba(24,2,4,0.4)' }}>Run the pipeline to fetch today's content</p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredArticles.map(article => {
              const isExpanded = expandedId === article.id
              const displayTitle = article.rewritten_title || article.original_title
              const displayExcerpt = article.rewritten_excerpt || article.original_excerpt

              return (
                <div
                  key={article.id}
                  className="rounded-2xl overflow-hidden transition-all"
                  style={{
                    background: 'white',
                    border: `1px solid ${article.needs_research ? '#fed7aa' : 'var(--color-cream-200)'}`,
                  }}
                >
                  {/* Card Header */}
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      {/* Left content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span className="text-base">{COUNTRY_FLAGS[article.country] || '🌐'}</span>
                          <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: 'var(--color-cream-200)', color: 'var(--color-dark-400)' }}>
                            {article.source_name}
                          </span>
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${STATUS_COLORS[article.status] || 'bg-gray-100'}`}>
                            {article.status}
                          </span>
                          {article.needs_research && (
                            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-orange-100 text-orange-700">
                              🔬 needs research
                            </span>
                          )}
                          {article.relevance_score !== null && (
                            <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{
                              background: article.relevance_score >= 80 ? '#dcfce7' : article.relevance_score >= 60 ? '#fef9c3' : '#f1f5f9',
                              color: article.relevance_score >= 80 ? '#166534' : article.relevance_score >= 60 ? '#713f12' : '#475569',
                            }}>
                              {article.relevance_score}% relevant
                            </span>
                          )}
                        </div>

                        <h3
                          className="text-base font-medium leading-snug cursor-pointer hover:opacity-75 transition-opacity"
                          style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-dark-DEFAULT)' }}
                          onClick={() => setExpandedId(isExpanded ? null : article.id)}
                        >
                          {displayTitle}
                        </h3>

                        {displayExcerpt && (
                          <p className="text-sm mt-1.5 line-clamp-2" style={{ color: 'rgba(24,2,4,0.55)' }}>
                            {displayExcerpt}
                          </p>
                        )}

                        {/* Keywords */}
                        {article.target_keywords && article.target_keywords.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {article.target_keywords.map(kw => (
                              <span key={kw} className="text-xs px-2 py-0.5 rounded-full" style={{ background: '#eff6ff', color: '#1d4ed8' }}>
                                {kw}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-2 flex-shrink-0">
                        {article.status === 'ready' && (
                          <button
                            onClick={() => publishArticle(article)}
                            className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                            style={{ background: 'var(--color-primary-DEFAULT)', color: 'white' }}
                          >
                            ✓ Mark Published
                          </button>
                        )}
                        <a
                          href={article.original_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-lg text-xs font-medium text-center transition-all"
                          style={{ background: 'var(--color-cream-200)', color: 'var(--color-dark-400)' }}
                        >
                          View Source ↗
                        </a>
                        {article.sanity_draft_id && (
                          <a
                            href={`https://greek-trip-planner.sanity.studio/structure/post;${article.sanity_draft_id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-lg text-xs font-medium text-center"
                            style={{ background: '#fdf4ff', color: '#7e22ce' }}
                          >
                            Open in Sanity ↗
                          </a>
                        )}
                        {article.status !== 'rejected' && article.status !== 'published' && (
                          <button
                            onClick={() => rejectArticle(article.id)}
                            className="px-3 py-1.5 rounded-lg text-xs font-medium"
                            style={{ background: '#fef2f2', color: '#b91c1c' }}
                          >
                            Reject
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Expand toggle */}
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : article.id)}
                      className="mt-2 text-xs flex items-center gap-1 transition-opacity hover:opacity-60"
                      style={{ color: 'rgba(24,2,4,0.35)' }}
                    >
                      {isExpanded ? '▲ Collapse' : '▼ Show rewritten content'}
                    </button>
                  </div>

                  {/* Expanded: rewritten content preview */}
                  {isExpanded && (
                    <div className="px-4 pb-4 pt-0 border-t" style={{ borderColor: 'var(--color-cream-200)' }}>
                      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Rewritten content */}
                        <div>
                          <p className="text-xs font-semibold mb-2 uppercase tracking-wide" style={{ color: 'rgba(24,2,4,0.35)' }}>
                            Rewritten Content
                          </p>
                          {article.rewritten_title && (
                            <p className="text-sm font-semibold mb-1" style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-dark-DEFAULT)' }}>
                              {article.rewritten_title}
                            </p>
                          )}
                          <div
                            className="text-xs rounded-xl p-3 max-h-48 overflow-y-auto"
                            style={{ background: 'var(--color-cream-100)', color: 'rgba(24,2,4,0.7)', lineHeight: '1.6' }}
                            dangerouslySetInnerHTML={{
                              __html: article.rewritten_content?.slice(0, 1000) + (article.rewritten_content && article.rewritten_content.length > 1000 ? '...' : '') || '<em>Not yet rewritten</em>',
                            }}
                          />
                        </div>

                        {/* Research notes */}
                        <div>
                          <p className="text-xs font-semibold mb-2 uppercase tracking-wide" style={{ color: 'rgba(24,2,4,0.35)' }}>
                            Research Notes
                          </p>
                          {article.needs_research ? (
                            <div className="rounded-xl p-3" style={{ background: '#fff7ed', border: '1px solid #fed7aa' }}>
                              <p className="text-xs font-semibold text-orange-700 mb-1">🔬 Topics to research:</p>
                              <ul className="space-y-1">
                                {(article.research_topics || []).map((t, i) => (
                                  <li key={i} className="text-xs text-orange-600">• {t}</li>
                                ))}
                              </ul>
                              {article.research_notes && (
                                <p className="text-xs text-orange-600 mt-2 italic">{article.research_notes}</p>
                              )}
                            </div>
                          ) : (
                            <div className="rounded-xl p-3" style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
                              <p className="text-xs text-emerald-600">✓ No additional research needed</p>
                            </div>
                          )}

                          {/* Meta */}
                          <div className="mt-3 space-y-1">
                            <p className="text-xs" style={{ color: 'rgba(24,2,4,0.4)' }}>
                              📅 Crawled: {new Date(article.crawled_at).toLocaleString('en-GB')}
                            </p>
                            {article.processed_at && (
                              <p className="text-xs" style={{ color: 'rgba(24,2,4,0.4)' }}>
                                ✍️ Processed: {new Date(article.processed_at).toLocaleString('en-GB')}
                              </p>
                            )}
                            {article.error_message && (
                              <p className="text-xs text-red-500">⚠️ {article.error_message}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
