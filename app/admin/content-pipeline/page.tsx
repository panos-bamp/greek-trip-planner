'use client'

// ============================================================
// Content Pipeline Dashboard — Review & Rewrite
// Path: app/admin/content-pipeline/page.tsx
// ============================================================

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// ─── Types ────────────────────────────────────────────────────

interface Article {
  id: string
  source_id: string
  source_name: string
  country: string
  language: string
  original_url: string
  original_title: string
  original_excerpt: string | null
  original_content: string | null
  relevance_score: number | null
  relevance_reason: string | null
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

type FilterTab = 'review' | 'ready' | 'needs_research' | 'all' | 'published'

const COUNTRY_FLAGS: Record<string, string> = {
  GR: '🇬🇷', UK: '🇬🇧', DE: '🇩🇪', US: '🇺🇸', INDUSTRY: '🌍',
}

const STATUS_COLORS: Record<string, string> = {
  scored:    'bg-blue-100 text-blue-800',
  ready:     'bg-emerald-100 text-emerald-800',
  published: 'bg-purple-100 text-purple-700',
  rewriting: 'bg-amber-100 text-amber-800',
  pending:   'bg-gray-100 text-gray-500',
  error:     'bg-red-100 text-red-700',
  rejected:  'bg-gray-200 text-gray-400',
}

// ─── Main Dashboard ───────────────────────────────────────────

export default function ContentPipelineDashboard() {
  const [articles, setArticles] = useState<Article[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [activeTab, setActiveTab] = useState<FilterTab>('review')
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [isRunning, setIsRunning] = useState(false)
  const [isRewriting, setIsRewriting] = useState(false)
  const [lastRun, setLastRun] = useState<string | null>(null)
  const [runLog, setRunLog] = useState<string[]>([])
  const [showLog, setShowLog] = useState(false)
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [rewriteStatus, setRewriteStatus] = useState<string>('')

  // ── Fetch data ──────────────────────────────────────────────
  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const { data: statsData } = await supabase
        .from('content_pipeline_stats')
        .select('*')
        .single()
      if (statsData) setStats(statsData)

      let query = supabase
        .from('crawled_articles')
        .select('*')
        .order('relevance_score', { ascending: false })
        .order('crawled_at', { ascending: false })
        .limit(150)

      if (activeTab === 'review') {
        query = query.eq('status', 'scored').eq('is_relevant', true)
      } else if (activeTab === 'ready') {
        query = query.eq('status', 'ready')
      } else if (activeTab === 'needs_research') {
        query = query.eq('needs_research', true)
      } else if (activeTab === 'published') {
        query = query.eq('status', 'published')
      } else {
        query = query.gte('crawled_at', new Date(Date.now() - 7 * 86400000).toISOString())
      }

      const { data } = await query
      setArticles(data || [])
      setSelectedIds(new Set()) // clear selection on tab change
    } finally {
      setLoading(false)
    }
  }, [activeTab])

  useEffect(() => { fetchData() }, [fetchData])

  // ── Pipeline trigger ────────────────────────────────────────
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
      setRunLog((prev) => [...prev, '❌ Pipeline request failed'])
    } finally {
      setIsRunning(false)
    }
  }

  // ── Selection ───────────────────────────────────────────────
  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const selectAll = () => {
    const visible = filteredArticles.map((a) => a.id)
    setSelectedIds(new Set(visible))
  }

  const clearSelection = () => setSelectedIds(new Set())

  // ── Rewrite selected articles ───────────────────────────────
  const rewriteSelected = async (mode: 'single' | 'combine') => {
    if (selectedIds.size === 0) return
    if (mode === 'combine' && selectedIds.size < 2) {
      alert('Select at least 2 articles to combine.')
      return
    }

    setIsRewriting(true)
    setRewriteStatus(
      mode === 'combine'
        ? `Combining ${selectedIds.size} articles into one insight...`
        : `Rewriting ${selectedIds.size} article${selectedIds.size > 1 ? 's' : ''}...`
    )

    try {
      const res = await fetch('/api/pipeline/rewrite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_PIPELINE_MANUAL_TOKEN || ''}`,
        },
        body: JSON.stringify({
          ids: Array.from(selectedIds),
          mode,
        }),
      })

      const data = await res.json()

      if (data.success) {
        if (mode === 'combine') {
          setRewriteStatus(`✅ Combined into: "${data.rewrittenTitle}" — draft in Sanity`)
        } else {
          const titles = data.results?.map((r: any) => r.rewrittenTitle).join(', ')
          setRewriteStatus(`✅ Rewritten: ${titles}`)
        }
        await fetchData()
      } else {
        setRewriteStatus(`❌ Error: ${data.error}`)
      }
    } catch (err) {
      setRewriteStatus(`❌ Request failed: ${String(err)}`)
    } finally {
      setIsRewriting(false)
      setTimeout(() => setRewriteStatus(''), 8000)
    }
  }

  // ── Reject ──────────────────────────────────────────────────
  const rejectArticle = async (id: string) => {
    await supabase
      .from('crawled_articles')
      .update({ status: 'rejected' })
      .eq('id', id)
    await fetchData()
  }

  // ── Filter by search ────────────────────────────────────────
  const filteredArticles = articles.filter((a) => {
    if (!searchQuery) return true
    const q = searchQuery.toLowerCase()
    return (
      a.original_title.toLowerCase().includes(q) ||
      a.source_name.toLowerCase().includes(q) ||
      (a.relevance_reason || '').toLowerCase().includes(q)
    )
  })

  const selectedArticles = filteredArticles.filter((a) => selectedIds.has(a.id))

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-cream-DEFAULT)', fontFamily: 'var(--font-sans)' }}>

      {/* ── Header ───────────────────────────────────────────── */}
      <div style={{ background: 'var(--color-dark-DEFAULT)' }} className="px-6 py-5 pt-20">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 style={{ fontFamily: 'var(--font-serif)', color: 'white' }} className="text-2xl font-normal">
              Content Pipeline
            </h1>
            <p className="text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Review · Select · Rewrite · Publish &nbsp;·&nbsp;
              {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
            </p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            {lastRun && (
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
                Last run: {lastRun}
              </span>
            )}
            <button
              onClick={() => fetchData()}
              className="px-3 py-2 rounded-lg text-sm border transition-all"
              style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.6)' }}
            >
              ↻ Refresh
            </button>
            <button
              onClick={triggerPipeline}
              disabled={isRunning}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-60"
              style={{ background: isRunning ? 'rgba(255,86,53,0.5)' : 'var(--color-accent-DEFAULT)', color: 'white' }}
            >
              {isRunning ? '⟳ Fetching...' : '▶ Run Pipeline'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* ── Stats ────────────────────────────────────────────── */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
            {[
              { label: 'Found Today', value: stats.total_today, color: '#180204' },
              { label: 'To Review', value: stats.relevant_today, color: '#2C73FF' },
              { label: 'Ready', value: stats.ready_to_publish, color: '#10b981' },
              { label: 'Published', value: stats.published_today, color: '#8b5cf6' },
              { label: 'Research', value: stats.needs_research_count, color: '#FF5635' },
              { label: 'Errors', value: stats.errors_today, color: '#ef4444' },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl p-4" style={{ background: 'white', border: '1px solid var(--color-cream-200)' }}>
                <div className="text-2xl font-bold" style={{ color: s.color }}>{s.value ?? 0}</div>
                <div className="text-xs font-medium mt-0.5" style={{ color: 'rgba(24,2,4,0.5)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* ── Pipeline log ─────────────────────────────────────── */}
        {showLog && runLog.length > 0 && (
          <div className="rounded-2xl p-4 mb-6" style={{ background: '#0f172a' }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-emerald-400">PIPELINE LOG</span>
              <button onClick={() => setShowLog(false)} className="text-xs text-slate-500 hover:text-slate-300">✕</button>
            </div>
            <div className="space-y-0.5 max-h-40 overflow-y-auto">
              {runLog.map((line, i) => (
                <div key={i} className="text-xs font-mono text-slate-300">{line}</div>
              ))}
              {isRunning && <div className="text-xs font-mono text-emerald-400 animate-pulse">▌</div>}
            </div>
          </div>
        )}

        {/* ── Action Bar (shows when articles selected) ────────── */}
        {selectedIds.size > 0 && (
          <div className="rounded-2xl p-4 mb-4 flex items-center justify-between flex-wrap gap-3"
            style={{ background: '#eff6ff', border: '2px solid #2C73FF' }}>
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold" style={{ color: '#1d4ed8' }}>
                {selectedIds.size} article{selectedIds.size > 1 ? 's' : ''} selected
              </span>
              {selectedIds.size > 1 && (
                <span className="text-xs" style={{ color: '#3b82f6' }}>
                  {selectedArticles.map(a => a.source_name).join(', ')}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={clearSelection}
                className="px-3 py-1.5 rounded-lg text-xs font-medium"
                style={{ background: 'white', color: '#6b7280', border: '1px solid #e5e7eb' }}
              >
                Clear
              </button>
              {selectedIds.size > 1 && (
                <button
                  onClick={() => rewriteSelected('combine')}
                  disabled={isRewriting}
                  className="px-4 py-1.5 rounded-lg text-xs font-semibold transition-all disabled:opacity-60 flex items-center gap-1.5"
                  style={{ background: '#7c3aed', color: 'white' }}
                >
                  🔀 Combine into One Article
                </button>
              )}
              <button
                onClick={() => rewriteSelected('single')}
                disabled={isRewriting}
                className="px-4 py-1.5 rounded-lg text-xs font-semibold transition-all disabled:opacity-60 flex items-center gap-1.5"
                style={{ background: 'var(--color-primary-DEFAULT)', color: 'white' }}
              >
                {isRewriting ? '⟳ Rewriting...' : `✍️ Rewrite ${selectedIds.size > 1 ? 'Each' : 'Article'}`}
              </button>
            </div>
          </div>
        )}

        {/* ── Rewrite status message ────────────────────────────── */}
        {rewriteStatus && (
          <div className="rounded-xl px-4 py-3 mb-4 text-sm font-medium"
            style={{
              background: rewriteStatus.startsWith('✅') ? '#f0fdf4' : rewriteStatus.startsWith('❌') ? '#fef2f2' : '#fffbeb',
              color: rewriteStatus.startsWith('✅') ? '#166534' : rewriteStatus.startsWith('❌') ? '#991b1b' : '#92400e',
              border: `1px solid ${rewriteStatus.startsWith('✅') ? '#bbf7d0' : rewriteStatus.startsWith('❌') ? '#fecaca' : '#fde68a'}`,
            }}>
            {rewriteStatus}
          </div>
        )}

        {/* ── Tabs + Search ─────────────────────────────────────── */}
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div className="flex gap-1 p-1 rounded-xl" style={{ background: 'white', border: '1px solid var(--color-cream-200)' }}>
            {([
              { key: 'review', label: `📋 Review (${stats?.relevant_today ?? 0})` },
              { key: 'ready', label: `✅ Ready (${stats?.ready_to_publish ?? 0})` },
              { key: 'needs_research', label: `🔬 Research` },
              { key: 'published', label: `📤 Published` },
              { key: 'all', label: `All (7d)` },
            ] as { key: FilterTab; label: string }[]).map((tab) => (
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

          <div className="flex items-center gap-2">
            {activeTab === 'review' && filteredArticles.length > 0 && (
              <button
                onClick={selectedIds.size === filteredArticles.length ? clearSelection : selectAll}
                className="px-3 py-2 rounded-xl text-sm font-medium"
                style={{ background: 'white', border: '1px solid var(--color-cream-200)', color: 'var(--color-dark-400)' }}
              >
                {selectedIds.size === filteredArticles.length ? '☐ Deselect All' : '☑ Select All'}
              </button>
            )}
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 rounded-xl text-sm outline-none"
              style={{ background: 'white', border: '1px solid var(--color-cream-200)', width: '200px' }}
            />
          </div>
        </div>

        {/* ── Review tab instructions ───────────────────────────── */}
        {activeTab === 'review' && filteredArticles.length > 0 && (
          <div className="rounded-2xl p-4 mb-4 flex items-start gap-3"
            style={{ background: '#f0f9ff', border: '1px solid #bae6fd' }}>
            <span className="text-lg">💡</span>
            <div>
              <p className="text-sm font-semibold" style={{ color: '#0369a1' }}>How to use</p>
              <p className="text-xs mt-0.5" style={{ color: '#0284c7' }}>
                Review each article, check the ones worth publishing, then click <strong>Rewrite Each</strong> for individual articles or <strong>Combine into One</strong> to merge related articles into a single comprehensive insight.
              </p>
            </div>
          </div>
        )}

        {/* ── Article Cards ─────────────────────────────────────── */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <p className="text-sm" style={{ color: 'rgba(24,2,4,0.4)' }}>Loading articles...</p>
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 rounded-2xl"
            style={{ background: 'white', border: '1px solid var(--color-cream-200)' }}>
            <div className="text-4xl mb-3">
              {activeTab === 'review' ? '📭' : '✅'}
            </div>
            <p className="font-medium" style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-dark-DEFAULT)' }}>
              {activeTab === 'review' ? 'No articles to review' : 'Nothing here yet'}
            </p>
            <p className="text-sm mt-1" style={{ color: 'rgba(24,2,4,0.4)' }}>
              {activeTab === 'review' ? 'Run the pipeline to fetch today\'s content' : 'Switch to the Review tab'}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredArticles.map((article) => {
              const isSelected = selectedIds.has(article.id)
              const isExpanded = expandedId === article.id

              return (
                <div
                  key={article.id}
                  className="rounded-2xl overflow-hidden transition-all"
                  style={{
                    background: 'white',
                    border: `2px solid ${isSelected ? '#2C73FF' : article.needs_research ? '#fed7aa' : 'var(--color-cream-200)'}`,
                    boxShadow: isSelected ? '0 0 0 3px rgba(44,115,255,0.1)' : 'none',
                  }}
                >
                  <div className="p-4">
                    <div className="flex items-start gap-3">

                      {/* Checkbox (only on review tab) */}
                      {activeTab === 'review' && (
                        <button
                          onClick={() => toggleSelect(article.id)}
                          className="mt-0.5 flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all"
                          style={{
                            background: isSelected ? '#2C73FF' : 'white',
                            borderColor: isSelected ? '#2C73FF' : '#d1d5db',
                          }}
                        >
                          {isSelected && (
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                      )}

                      {/* Article content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                          <span>{COUNTRY_FLAGS[article.country] || '🌐'}</span>
                          <span className="text-xs font-medium px-2 py-0.5 rounded-full"
                            style={{ background: 'var(--color-cream-200)', color: 'var(--color-dark-400)' }}>
                            {article.source_name}
                          </span>
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${STATUS_COLORS[article.status] || 'bg-gray-100'}`}>
                            {article.status}
                          </span>
                          {article.relevance_score !== null && (
                            <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                              style={{
                                background: article.relevance_score >= 80 ? '#dcfce7' : '#fef9c3',
                                color: article.relevance_score >= 80 ? '#166534' : '#713f12',
                              }}>
                              {article.relevance_score}%
                            </span>
                          )}
                          {article.needs_research && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-orange-100 text-orange-700">
                              🔬 research needed
                            </span>
                          )}
                          {article.language !== 'en' && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-violet-100 text-violet-700">
                              {article.language === 'el' ? '🇬🇷 Greek' : '🇩🇪 German'} → will translate
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h3
                          className="text-base font-medium leading-snug cursor-pointer hover:opacity-70 transition-opacity"
                          style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-dark-DEFAULT)' }}
                          onClick={() => setExpandedId(isExpanded ? null : article.id)}
                        >
                          {article.original_title}
                        </h3>

                        {/* Relevance reason */}
                        {article.relevance_reason && (
                          <p className="text-xs mt-1 italic" style={{ color: 'rgba(24,2,4,0.45)' }}>
                            {article.relevance_reason}
                          </p>
                        )}

                        {/* Excerpt preview */}
                        {article.original_excerpt && (
                          <p className="text-sm mt-1.5 line-clamp-2" style={{ color: 'rgba(24,2,4,0.55)' }}>
                            {article.original_excerpt}
                          </p>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-1.5 flex-shrink-0">
                        <a
                          href={article.original_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-lg text-xs font-medium text-center"
                          style={{ background: 'var(--color-cream-200)', color: 'var(--color-dark-400)' }}
                        >
                          Source ↗
                        </a>
                        {article.sanity_draft_id && (
                          <a
                            href={`https://greek-trip-planner.sanity.studio/structure/insight;${article.sanity_draft_id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-lg text-xs font-medium text-center"
                            style={{ background: '#fdf4ff', color: '#7e22ce' }}
                          >
                            Sanity ↗
                          </a>
                        )}
                        {article.status === 'scored' && (
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
                    {(article.original_content || article.original_excerpt) && (
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : article.id)}
                        className="mt-2 text-xs flex items-center gap-1 hover:opacity-60 transition-opacity"
                        style={{ color: 'rgba(24,2,4,0.3)' }}
                      >
                        {isExpanded ? '▲ Collapse' : '▼ Preview content'}
                      </button>
                    )}
                  </div>

                  {/* Expanded: original content preview */}
                  {isExpanded && (
                    <div className="px-4 pb-4 border-t" style={{ borderColor: 'var(--color-cream-200)' }}>
                      <div className="mt-3 grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide mb-2"
                            style={{ color: 'rgba(24,2,4,0.35)' }}>Original Content</p>
                          <div className="text-xs rounded-xl p-3 max-h-48 overflow-y-auto leading-relaxed"
                            style={{ background: 'var(--color-cream-100)', color: 'rgba(24,2,4,0.65)' }}>
                            {article.original_content?.slice(0, 1500) || article.original_excerpt || 'No content available'}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide mb-2"
                            style={{ color: 'rgba(24,2,4,0.35)' }}>Details</p>
                          <div className="space-y-2 text-xs" style={{ color: 'rgba(24,2,4,0.55)' }}>
                            <p>📅 Crawled: {new Date(article.crawled_at).toLocaleString('en-GB')}</p>
                            <p>🌐 Language: {article.language}</p>
                            <p>📊 Relevance: {article.relevance_score}% — {article.relevance_reason}</p>
                            {article.needs_research && article.research_topics && (
                              <div className="rounded-lg p-2 mt-2"
                                style={{ background: '#fff7ed', border: '1px solid #fed7aa' }}>
                                <p className="font-semibold text-orange-700">🔬 Research topics:</p>
                                {article.research_topics.map((t, i) => (
                                  <p key={i} className="text-orange-600">• {t}</p>
                                ))}
                              </div>
                            )}
                            {/* Rewritten content if available */}
                            {article.rewritten_title && (
                              <div className="rounded-lg p-2 mt-2"
                                style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
                                <p className="font-semibold text-emerald-700">✍️ Rewritten as:</p>
                                <p className="text-emerald-600">{article.rewritten_title}</p>
                              </div>
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
