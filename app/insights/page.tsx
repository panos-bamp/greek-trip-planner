import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Clock, Calendar, TrendingUp, TrendingDown, Minus, BarChart3, Filter } from 'lucide-react'
import { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'

export const metadata: Metadata = {
  title: 'Greece Tourism Insights & Data | Greek Trip Planner',
  description: 'In-depth tourism statistics, market reports, and data analysis for Greece. Revenue figures, visitor trends, destination performance, and industry forecasts.',
  openGraph: {
    title: 'Greece Tourism Insights & Data | Greek Trip Planner',
    description: 'In-depth tourism statistics, market reports, and data analysis for Greece.',
    url: 'https://greektriplanner.me/insights',
    siteName: 'Greek Trip Planner',
    type: 'website',
  },
}

export const revalidate = 60

// Insight type labels and colors
const typeConfig: Record<string, { label: string; color: string; bg: string }> = {
  'market-report': { label: 'Market Report', color: 'text-[#2C73FF]', bg: 'bg-[#2C73FF]/8' },
  'statistics': { label: 'Statistics & Data', color: 'text-[#FF5635]', bg: 'bg-[#FF5635]/8' },
  'trend-analysis': { label: 'Trend Analysis', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  'destination-performance': { label: 'Destination', color: 'text-amber-600', bg: 'bg-amber-50' },
  'source-market': { label: 'Source Market', color: 'text-violet-600', bg: 'bg-violet-50' },
  'accommodation': { label: 'Hotel & Accommodation', color: 'text-rose-600', bg: 'bg-rose-50' },
  'cruise': { label: 'Cruise Industry', color: 'text-sky-600', bg: 'bg-sky-50' },
  'policy-regulation': { label: 'Policy & Regulation', color: 'text-slate-600', bg: 'bg-slate-100' },
  'sustainability': { label: 'Sustainability', color: 'text-green-600', bg: 'bg-green-50' },
  'opinion': { label: 'Industry Opinion', color: 'text-orange-600', bg: 'bg-orange-50' },
}

async function getAllInsights() {
  try {
    const query = `*[_type == "insight"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      insightType,
      publishedAt,
      updatedAt,
      readingTime,
      mainImage,
      topics,
      keyMetrics
    }`
    return await client.fetch(query)
  } catch (error) {
    console.error('Error fetching insights:', error)
    return []
  }
}

export default async function InsightsPage() {
  const insights = await getAllInsights()

  // Get unique insight types for filter display
  const activeTypes = [...new Set(insights.map((i: any) => i.insightType).filter(Boolean))]

  return (
    <main className="min-h-screen bg-[#FAF6F3]">

      {/* ===== NAVIGATION ===== */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-50 border-b border-[#E6DAD1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="Greek Trip Planner" width={70} height={21} priority />
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/how-it-works" className="text-[#180204]/70 hover:text-[#FF5635] transition-colors text-sm font-medium">How it Works</Link>
            <Link href="/blog" className="text-[#180204]/70 hover:text-[#FF5635] transition-colors text-sm font-medium">Blog</Link>
            <Link href="/insights" className="text-[#FF5635] transition-colors text-sm font-medium">Insights</Link>
            <Link href="/about" className="text-[#180204]/70 hover:text-[#FF5635] transition-colors text-sm font-medium">About</Link>
            <Link href="/ai-trip-planner" className="btn-accent px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2">
              Start Planning <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <Link href="/ai-trip-planner" className="md:hidden btn-accent px-4 py-2 rounded-full text-sm font-semibold">
            Start Planning
          </Link>
        </div>
      </nav>

      {/* ===== HERO SECTION ===== */}
      <section className="relative pt-16">
        <div className="bg-[#180204] relative overflow-hidden">
          {/* Subtle grid pattern overlay */}
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} />
          {/* Accent glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF5635]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#2C73FF]/8 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-white/8 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 mb-6">
                <BarChart3 className="w-4 h-4 text-[#FF5635]" />
                <span className="text-white/70 text-sm font-medium font-sans">Tourism Research & Analysis</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl text-white leading-[1.08] mb-5">
                Greece Tourism<br />
                <span className="text-[#FF5635]">Insights & Data</span>
              </h1>
              <p className="text-lg sm:text-xl text-white/60 max-w-xl leading-relaxed font-sans font-light">
                Data-driven analysis of Greek tourism trends, statistics, and market intelligence. Sourced from official data, updated regularly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CATEGORY FILTERS ===== */}
      {activeTypes.length > 1 && (
        <section className="border-b border-[#E6DAD1] bg-white sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hidden">
              <span className="bg-[#180204] text-white px-4 py-2 rounded-full text-sm font-sans font-medium whitespace-nowrap flex-shrink-0">
                All Insights
              </span>
              {activeTypes.map((type: any) => {
                const config = typeConfig[type] || { label: type, color: 'text-[#180204]/70', bg: 'bg-[#FAF6F3]' }
                return (
                  <span
                    key={type}
                    className={`${config.bg} ${config.color} px-4 py-2 rounded-full text-sm font-sans font-medium whitespace-nowrap flex-shrink-0 border border-transparent hover:border-current/20 transition-colors cursor-default`}
                  >
                    {config.label}
                  </span>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ===== INSIGHTS GRID ===== */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {insights.length === 0 ? (
            /* Empty state */
            <div className="text-center py-20">
              <BarChart3 className="w-16 h-16 text-[#180204]/15 mx-auto mb-6" />
              <h2 className="text-2xl text-[#180204] mb-3">Insights Coming Soon</h2>
              <p className="text-[#180204]/50 font-sans max-w-md mx-auto mb-8">
                We&apos;re preparing our first research reports on Greek tourism statistics, market trends, and destination performance data.
              </p>
              <Link href="/blog" className="btn-accent px-6 py-3 rounded-full text-sm font-semibold inline-flex items-center gap-2">
                Read Our Travel Blog <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <>
              {/* Featured insight (first/most recent) */}
              {insights.length > 0 && (
                <FeaturedInsight insight={insights[0]} />
              )}

              {/* Rest of insights in grid */}
              {insights.length > 1 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                  {insights.slice(1).map((insight: any) => (
                    <InsightCard key={insight._id} insight={insight} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ===== CROSS-LINK TO BLOG ===== */}
      <section className="bg-white border-t border-[#E6DAD1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl sm:text-3xl text-[#180204] mb-2">Planning a Trip to Greece?</h2>
              <p className="text-[#180204]/55 font-sans">Our travel guides translate these insights into practical advice for your vacation.</p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <Link href="/blog" className="bg-[#FAF6F3] border border-[#E6DAD1] text-[#180204] hover:border-[#FF5635]/30 hover:text-[#FF5635] px-6 py-3 rounded-full text-sm font-sans font-semibold transition-all">
                Travel Blog
              </Link>
              <Link href="/ai-trip-planner" className="btn-accent px-6 py-3 rounded-full text-sm font-semibold inline-flex items-center gap-2">
                Plan My Trip <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-[#180204] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            <Image src="/logo.png" alt="Greek Trip Planner" width={70} height={21} className="brightness-0 invert mb-6" />
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <Link href="/how-it-works" className="text-white/60 hover:text-[#FF5635] transition-colors text-sm font-sans">How it Works</Link>
              <Link href="/blog" className="text-white/60 hover:text-[#FF5635] transition-colors text-sm font-sans">Blog</Link>
              <Link href="/insights" className="text-white/60 hover:text-[#FF5635] transition-colors text-sm font-sans">Insights</Link>
              <Link href="/about" className="text-white/60 hover:text-[#FF5635] transition-colors text-sm font-sans">About</Link>
            </div>
            <div className="border-t border-white/10 w-full pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-white/40 text-sm font-sans">&copy; 2026 Greek Trip Planner. All rights reserved.</p>
              <div className="flex items-center gap-4">
                <a href="https://traveltourismdirectory.com/" className="text-white/40 hover:text-white/60 transition-colors text-sm font-sans" target="_blank" rel="noopener noreferrer">Travel and Tourism Directory</a>
                <a href="https://bookmarktravel.com/" target="_blank" rel="noopener noreferrer">
                  <Image src="https://bookmarktravel.com/images/bookmarktravel-234.jpg" alt="Bookmark Travel" width={117} height={20} className="opacity-50 hover:opacity-80 transition-opacity" unoptimized />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* ===== SCHEMA MARKUP ===== */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Greece Tourism Insights & Data",
            "description": "In-depth tourism statistics, market reports, and data analysis for Greece.",
            "url": "https://greektriplanner.me/insights",
            "isPartOf": {
              "@type": "WebSite",
              "name": "Greek Trip Planner",
              "url": "https://greektriplanner.me"
            },
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://greektriplanner.me" },
                { "@type": "ListItem", "position": 2, "name": "Insights", "item": "https://greektriplanner.me/insights" }
              ]
            }
          })
        }}
      />
    </main>
  )
}


/* ===== FEATURED INSIGHT COMPONENT ===== */
function FeaturedInsight({ insight }: { insight: any }) {
  const config = typeConfig[insight.insightType] || { label: 'Insight', color: 'text-[#FF5635]', bg: 'bg-[#FF5635]/8' }
  const date = insight.publishedAt
    ? new Date(insight.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : null
  const updatedDate = insight.updatedAt
    ? new Date(insight.updatedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : null

  return (
    <Link
      href={`/insights/${insight.slug?.current}`}
      className="group block bg-white rounded-3xl overflow-hidden card-hover border border-[#E6DAD1]/60"
    >
      <div className="grid md:grid-cols-2 gap-0">
        {/* Image */}
        <div className="relative h-64 md:h-full min-h-[320px] overflow-hidden">
          {insight.mainImage?.asset && (
            <Image
              src={urlFor(insight.mainImage).width(800).height(600).url()}
              alt={insight.mainImage?.alt || insight.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#180204]/40 to-transparent md:bg-gradient-to-r md:from-transparent md:to-transparent" />
          {/* Type badge on image */}
          <div className="absolute top-5 left-5">
            <span className={`${config.bg} ${config.color} px-3 py-1.5 rounded-full text-xs font-sans font-semibold backdrop-blur-sm`}>
              {config.label}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 md:p-10 flex flex-col justify-center">
          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-3 text-[#180204]/45 text-sm font-sans mb-4">
            {date && (
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {date}
              </span>
            )}
            {updatedDate && updatedDate !== date && (
              <span className="text-[#FF5635]/70 text-xs">Updated {updatedDate}</span>
            )}
            {insight.readingTime && (
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {insight.readingTime} min read
              </span>
            )}
          </div>

          <h2 className="text-2xl sm:text-3xl text-[#180204] leading-snug mb-4 group-hover:text-[#FF5635] transition-colors">
            {insight.title}
          </h2>

          {insight.excerpt && (
            <p className="text-[#180204]/55 font-sans leading-relaxed mb-6 line-clamp-3">
              {insight.excerpt}
            </p>
          )}

          {/* Key Metrics mini-display */}
          {insight.keyMetrics && insight.keyMetrics.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
              {insight.keyMetrics.slice(0, 3).map((metric: any, i: number) => (
                <div key={i} className="bg-[#FAF6F3] rounded-xl px-4 py-3">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    {metric.trend === 'up' && <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />}
                    {metric.trend === 'down' && <TrendingDown className="w-3.5 h-3.5 text-red-500" />}
                    {metric.trend === 'flat' && <Minus className="w-3.5 h-3.5 text-[#180204]/30" />}
                    <span className="text-lg font-bold text-[#180204] font-sans">{metric.value}</span>
                  </div>
                  <span className="text-[#180204]/45 text-xs font-sans">{metric.label}</span>
                </div>
              ))}
            </div>
          )}

          <span className="text-[#FF5635] text-sm font-semibold flex items-center gap-1.5 font-sans group-hover:gap-2.5 transition-all">
            Read Full Analysis <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  )
}


/* ===== INSIGHT CARD COMPONENT ===== */
function InsightCard({ insight }: { insight: any }) {
  const config = typeConfig[insight.insightType] || { label: 'Insight', color: 'text-[#FF5635]', bg: 'bg-[#FF5635]/8' }
  const date = insight.publishedAt
    ? new Date(insight.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : null

  return (
    <Link
      href={`/insights/${insight.slug?.current}`}
      className="group bg-white rounded-3xl overflow-hidden card-hover border border-[#E6DAD1]/60 flex flex-col"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        {insight.mainImage?.asset ? (
          <Image
            src={urlFor(insight.mainImage).width(600).height(400).url()}
            alt={insight.mainImage?.alt || insight.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#180204] to-[#3a1012] flex items-center justify-center">
            <BarChart3 className="w-12 h-12 text-white/20" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#180204]/40 to-transparent" />
        {/* Type badge */}
        <div className="absolute top-4 left-4">
          <span className={`${config.bg} ${config.color} px-3 py-1 rounded-full text-xs font-sans font-semibold backdrop-blur-sm`}>
            {config.label}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Meta */}
        <div className="flex items-center gap-3 text-[#180204]/40 text-xs font-sans mb-3">
          {date && (
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {date}
            </span>
          )}
          {insight.readingTime && (
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {insight.readingTime} min
            </span>
          )}
        </div>

        <h3 className="text-lg text-[#180204] leading-snug mb-3 group-hover:text-[#FF5635] transition-colors line-clamp-2">
          {insight.title}
        </h3>

        {insight.excerpt && (
          <p className="text-[#180204]/50 text-sm font-sans leading-relaxed mb-4 line-clamp-2 flex-1">
            {insight.excerpt}
          </p>
        )}

        {/* Key metrics mini row */}
        {insight.keyMetrics && insight.keyMetrics.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {insight.keyMetrics.slice(0, 2).map((metric: any, i: number) => (
              <span key={i} className="bg-[#FAF6F3] text-[#180204] px-2.5 py-1 rounded-lg text-xs font-sans font-semibold">
                {metric.value} <span className="text-[#180204]/40 font-normal">{metric.label}</span>
              </span>
            ))}
          </div>
        )}

        <span className="text-[#FF5635] text-sm font-semibold flex items-center gap-1 font-sans group-hover:gap-2 transition-all mt-auto">
          Read Analysis <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </Link>
  )
}
