'use client'

// app/blog/BlogClient.tsx

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'
import { Clock, Calendar, ArrowRight, MapPin } from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

type PostType =
  | 'destination-guide'
  | 'itinerary'
  | 'best-of'
  | 'things-to-do'
  | 'planning-tips'
  | 'travel-style'
  | 'cruises'
  | 'crete'

interface Post {
  _id: string
  title: string
  slug: { current: string }
  mainImage?: any
  excerpt?: string
  publishedAt?: string
  readingTime?: number
  postType?: PostType
}

// ─── Type Config — exact same pattern as insights typeConfig ──────────────────

const typeConfig: Record<string, { label: string; emoji: string; color: string; bg: string; activeBg: string; border: string }> = {
  'destination-guide': {
    label: 'Destination Guides',
    emoji: '🗺️',
    color: 'text-[#2C73FF]',
    bg: 'bg-[#2C73FF]/8',
    activeBg: 'bg-[#2C73FF]',
    border: 'border-[#2C73FF]/20',
  },
  'itinerary': {
    label: 'Itineraries',
    emoji: '📅',
    color: 'text-emerald-700',
    bg: 'bg-emerald-50',
    activeBg: 'bg-emerald-600',
    border: 'border-emerald-200',
  },
  'best-of': {
    label: 'Best Of',
    emoji: '🏆',
    color: 'text-amber-700',
    bg: 'bg-amber-50',
    activeBg: 'bg-amber-500',
    border: 'border-amber-200',
  },
  'things-to-do': {
    label: 'Things To Do & Tours',
    emoji: '🎯',
    color: 'text-violet-700',
    bg: 'bg-violet-50',
    activeBg: 'bg-violet-600',
    border: 'border-violet-200',
  },
  'planning-tips': {
    label: 'Planning & Tips',
    emoji: '✈️',
    color: 'text-sky-700',
    bg: 'bg-sky-50',
    activeBg: 'bg-sky-600',
    border: 'border-sky-200',
  },
  'travel-style': {
    label: 'Travel by Style',
    emoji: '🧳',
    color: 'text-rose-700',
    bg: 'bg-rose-50',
    activeBg: 'bg-rose-600',
    border: 'border-rose-200',
  },
  'cruises': {
    label: 'Cruises & Island Hopping',
    emoji: '⛵',
    color: 'text-teal-700',
    bg: 'bg-teal-50',
    activeBg: 'bg-teal-600',
    border: 'border-teal-200',
  },
  'crete': {
    label: 'Crete In Depth',
    emoji: '🏖️',
    color: 'text-orange-700',
    bg: 'bg-orange-50',
    activeBg: 'bg-orange-500',
    border: 'border-orange-200',
  },
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(dateStr?: string) {
  if (!dateStr) return null
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  })
}

// ─── Featured Post Card (first / most recent) — mirrors FeaturedInsight ───────

function FeaturedPost({ post }: { post: Post }) {
  const config = post.postType ? typeConfig[post.postType] : null
  const date = formatDate(post.publishedAt)

  return (
    <Link
      href={`/blog/${post.slug.current}`}
      className="group block bg-white rounded-3xl overflow-hidden card-hover border border-[#E6DAD1]/60 mb-10"
    >
      <div className="grid md:grid-cols-2 gap-0">
        {/* Image */}
        <div className="relative h-64 md:h-full min-h-[320px] overflow-hidden">
          {post.mainImage?.asset ? (
            <Image
              src={urlFor(post.mainImage).width(800).height(600).url()}
              alt={post.mainImage?.alt || post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#180204] to-[#3a1012] flex items-center justify-center">
              <MapPin className="w-16 h-16 text-white/10" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#180204]/40 to-transparent md:bg-gradient-to-r md:from-transparent md:to-transparent" />
          {config && (
            <div className="absolute top-5 left-5">
              <span className={`${config.bg} ${config.color} px-3 py-1.5 rounded-full text-xs font-sans font-semibold backdrop-blur-sm`}>
                {config.emoji} {config.label}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-8 md:p-10 flex flex-col justify-center">
          <div className="flex flex-wrap items-center gap-3 text-[#180204]/45 text-sm font-sans mb-4">
            {date && (
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {date}
              </span>
            )}
            {post.readingTime && (
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {post.readingTime} min read
              </span>
            )}
          </div>

          <h2 className="text-2xl sm:text-3xl text-[#180204] leading-snug mb-4 group-hover:text-[#FF5635] transition-colors">
            {post.title}
          </h2>

          {post.excerpt && (
            <p className="text-[#180204]/55 font-sans leading-relaxed mb-6 line-clamp-3">
              {post.excerpt}
            </p>
          )}

          <span className="text-[#FF5635] text-sm font-semibold flex items-center gap-1.5 font-sans group-hover:gap-2.5 transition-all">
            Read Full Guide <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  )
}

// ─── Post Card — mirrors InsightCard ─────────────────────────────────────────

function PostCard({ post }: { post: Post }) {
  const config = post.postType ? typeConfig[post.postType] : null
  const date = formatDate(post.publishedAt)

  return (
    <Link
      href={`/blog/${post.slug.current}`}
      className="group bg-white rounded-3xl overflow-hidden card-hover border border-[#E6DAD1]/60 flex flex-col"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        {post.mainImage?.asset ? (
          <Image
            src={urlFor(post.mainImage).width(600).height(400).url()}
            alt={post.mainImage?.alt || post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#180204] to-[#3a1012] flex items-center justify-center">
            <MapPin className="w-10 h-10 text-white/15" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#180204]/40 to-transparent" />
        {config && (
          <div className="absolute top-4 left-4">
            <span className={`${config.bg} ${config.color} px-3 py-1 rounded-full text-xs font-sans font-semibold backdrop-blur-sm`}>
              {config.emoji} {config.label}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-3 text-[#180204]/40 text-xs font-sans mb-3">
          {date && (
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" /> {date}
            </span>
          )}
          {post.readingTime && (
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" /> {post.readingTime} min
            </span>
          )}
        </div>

        <h3 className="text-lg text-[#180204] leading-snug mb-3 group-hover:text-[#FF5635] transition-colors line-clamp-2">
          {post.title}
        </h3>

        {post.excerpt && (
          <p className="text-[#180204]/50 text-sm font-sans leading-relaxed mb-4 line-clamp-2 flex-1">
            {post.excerpt}
          </p>
        )}

        <span className="text-[#FF5635] text-sm font-semibold flex items-center gap-1 font-sans group-hover:gap-2 transition-all mt-auto">
          Read Guide <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </Link>
  )
}

// ─── Main Client Component ────────────────────────────────────────────────────

export default function BlogClient({ posts }: { posts: Post[] }) {
  const [activeType, setActiveType] = useState<PostType | 'all'>('all')

  // Only show pills for types that have at least one post
  const availableTypes = useMemo(() => {
    const inUse = new Set(posts.map(p => p.postType).filter(Boolean))
    return Object.entries(typeConfig).filter(([key]) => inUse.has(key as PostType))
  }, [posts])

  const filtered = useMemo(() =>
    activeType === 'all' ? posts : posts.filter(p => p.postType === activeType),
    [posts, activeType]
  )

  const showFeatured = activeType === 'all' && filtered.length > 0

  return (
    <>
      {/* ===== STICKY FILTER BAR — same structure as insights ===== */}
      {availableTypes.length > 0 && (
        <section className="border-b border-[#E6DAD1] bg-white sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hidden">

              {/* All Posts pill */}
              <button
                onClick={() => setActiveType('all')}
                className={`px-4 py-2 rounded-full text-sm font-sans font-medium whitespace-nowrap flex-shrink-0 transition-all duration-200 ${
                  activeType === 'all'
                    ? 'bg-[#180204] text-white shadow-sm'
                    : 'bg-[#FAF6F3] text-[#180204]/65 hover:text-[#180204] border border-[#E6DAD1] hover:border-[#180204]/20'
                }`}
              >
                All Posts
                {activeType === 'all' && (
                  <span className="ml-2 bg-white/15 text-white text-xs px-1.5 py-0.5 rounded-full">
                    {posts.length}
                  </span>
                )}
              </button>

              {/* Type pills */}
              {availableTypes.map(([key, config]) => {
                const isActive = activeType === key
                const count = posts.filter(p => p.postType === key).length
                return (
                  <button
                    key={key}
                    onClick={() => setActiveType(key as PostType)}
                    className={`px-4 py-2 rounded-full text-sm font-sans font-medium whitespace-nowrap flex-shrink-0 border transition-all duration-200 ${
                      isActive
                        ? `${config.activeBg} text-white border-transparent shadow-sm`
                        : `${config.bg} ${config.color} ${config.border} hover:border-current/30`
                    }`}
                  >
                    {config.emoji} {config.label}
                    {isActive && (
                      <span className="ml-2 bg-white/20 text-white text-xs px-1.5 py-0.5 rounded-full">
                        {count}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ===== POSTS GRID ===== */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <MapPin className="w-16 h-16 text-[#180204]/15 mx-auto mb-6" />
              <h2 className="text-2xl text-[#180204] mb-3">No articles found</h2>
              <p className="text-[#180204]/50 font-sans max-w-md mx-auto mb-8">
                No posts of this type yet. Check back soon!
              </p>
              <button
                onClick={() => setActiveType('all')}
                className="btn-accent px-6 py-3 rounded-full text-sm font-semibold"
              >
                Show All Posts
              </button>
            </div>
          ) : (
            <>
              {/* Featured — only on "All" view */}
              {showFeatured && <FeaturedPost post={filtered[0]} />}

              {/* Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(showFeatured ? filtered.slice(1) : filtered).map(post => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>

              {/* Count bar */}
              <p className="text-center text-sm text-[#180204]/35 font-sans mt-10">
                Showing {filtered.length} of {posts.length} articles
              </p>
            </>
          )}
        </div>
      </section>
    </>
  )
}
