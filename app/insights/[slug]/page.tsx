import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ArrowLeft, Clock, Calendar, TrendingUp, TrendingDown, Minus, BarChart3, ExternalLink, Download, BookOpen, ChevronRight, Share2, Lightbulb } from 'lucide-react'
import { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { PortableText } from '@portabletext/react'
import { portableTextComponents } from '@/components/portableTextComponents'
import { generateInsightSchemas } from '@/lib/insightSchemaMarkup'
import { notFound } from 'next/navigation'

// Insight type labels
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

// GROQ query for individual insight
const insightQuery = `*[_type == "insight" && slug.current == $slug][0] {
  ...,
  mainImage {
    ...,
    asset-> { url, metadata { dimensions } }
  },
  ogImage {
    asset-> { url }
  },
  "relatedBlogPosts": relatedBlogPosts[]-> {
    _id, title, slug, mainImage, excerpt
  },
  "relatedInsights": relatedInsights[]-> {
    _id, title, slug, mainImage, excerpt, insightType, publishedAt, readingTime, keyMetrics
  }
}`

// Generate metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await client.fetch(insightQuery, { slug })
  if (!post) return { title: 'Insight Not Found' }

  const title = post.metaTitle || post.title
  const description = post.metaDescription || post.excerpt || ''
  const ogImageUrl = post.ogImage?.asset?.url || post.mainImage?.asset?.url
  const canonicalUrl = post.canonicalUrl || `https://greektriplanner.me/insights/${post.slug.current}`

  return {
    title: `${title} | Greek Trip Planner`,
    description,
    openGraph: {
      title: post.ogTitle || title,
      description: post.ogDescription || description,
      url: canonicalUrl,
      siteName: 'Greek Trip Planner',
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      ...(ogImageUrl && { images: [{ url: ogImageUrl, width: 1200, height: 630 }] }),
    },
    twitter: {
      card: post.twitterCardType || 'summary_large_image',
      title: post.ogTitle || title,
      description: post.ogDescription || description,
    },
    alternates: {
      canonical: canonicalUrl,
    },
    ...(post.noIndex && { robots: { index: false, follow: false } }),
  }
}

// Generate static params
export async function generateStaticParams() {
  const slugs = await client.fetch(`*[_type == "insight" && defined(slug.current)]{ "slug": slug.current }`)
  return slugs.map((s: any) => ({ slug: s.slug }))
}

export const revalidate = 60

// Extract H2 headings from body for TOC
function extractHeadings(body: any[]): { text: string; key: string }[] {
  if (!body) return []
  return body
    .filter((block: any) => block._type === 'block' && block.style === 'h2')
    .map((block: any) => {
      const text = block.children?.map((child: any) => child.text).join('') || ''
      const key = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      return { text, key }
    })
}

export default async function InsightArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await client.fetch(insightQuery, { slug })

  if (!post) notFound()

  // Schema markup
  let schemas: object[] = []
  try {
    schemas = generateInsightSchemas(post)
  } catch (error) {
    console.error('Schema generation error:', error)
  }

  const config = typeConfig[post.insightType] || { label: 'Insight', color: 'text-[#FF5635]', bg: 'bg-[#FF5635]/8' }

  const publishDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : null
  const updateDate = post.updatedAt
    ? new Date(post.updatedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : null

  const headings = post.showTableOfContents ? extractHeadings(post.body) : []

  return (
    <main className="min-h-screen bg-[#FAF6F3]">

      {/* ===== SCHEMA MARKUP ===== */}
      {schemas.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
          suppressHydrationWarning
        />
      )}

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

      {/* ===== ARTICLE HEADER ===== */}
      <section className="pt-16">
        <div className="bg-[#180204] relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} />
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF5635]/8 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-white/40 text-sm font-sans mb-6">
              <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href="/insights" className="hover:text-white/70 transition-colors">Insights</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-white/60 truncate max-w-[200px]">{post.title}</span>
            </div>

            {/* Type badge */}
            <div className="mb-5">
              <span className={`${config.bg} ${config.color} px-3 py-1.5 rounded-full text-xs font-sans font-semibold`}>
                {config.label}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl text-white leading-[1.12] mb-4">
              {post.title}
            </h1>

            {post.subtitle && (
              <p className="text-xl text-white/50 font-sans font-light mb-6">{post.subtitle}</p>
            )}

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-4 text-white/40 text-sm font-sans">
              {post.author && (
                <span>By {post.author}</span>
              )}
              {publishDate && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {publishDate}
                </span>
              )}
              {updateDate && updateDate !== publishDate && (
                <span className="text-[#FF5635]/60">Updated {updateDate}</span>
              )}
              {post.readingTime && (
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {post.readingTime} min read
                </span>
              )}
              {post.dataTimePeriod?.label && (
                <span className="flex items-center gap-1.5">
                  <BarChart3 className="w-3.5 h-3.5" />
                  Data: {post.dataTimePeriod.label}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===== KEY METRICS HIGHLIGHT BOX ===== */}
      {post.keyMetrics && post.keyMetrics.length > 0 && (
        <section className="relative z-10 -mt-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="key-metrics bg-white rounded-2xl shadow-lg border border-[#E6DAD1]/60 p-6 md:p-8">
              <div className="flex items-center gap-2 mb-5">
                <BarChart3 className="w-4.5 h-4.5 text-[#FF5635]" />
                <span className="text-sm font-sans font-semibold text-[#180204]/70 uppercase tracking-wide">Key Figures at a Glance</span>
              </div>
              <div className={`grid grid-cols-2 ${post.keyMetrics.length > 4 ? 'md:grid-cols-3' : `md:grid-cols-${Math.min(post.keyMetrics.length, 4)}`} gap-5`}>
                {post.keyMetrics.map((metric: any, i: number) => (
                  <div key={i} className="relative">
                    {i > 0 && <div className="hidden md:block absolute -left-2.5 top-1 bottom-1 w-px bg-[#E6DAD1]" />}
                    <div className="flex items-center gap-1.5 mb-1">
                      {metric.trend === 'up' && <TrendingUp className="w-4 h-4 text-emerald-500" />}
                      {metric.trend === 'down' && <TrendingDown className="w-4 h-4 text-red-500" />}
                      {metric.trend === 'flat' && <Minus className="w-4 h-4 text-[#180204]/25" />}
                      <span className="text-2xl md:text-3xl font-bold text-[#180204] font-sans">{metric.value}</span>
                    </div>
                    <div className="text-sm font-sans font-medium text-[#180204]/70">{metric.label}</div>
                    {metric.context && (
                      <div className="text-xs font-sans text-[#180204]/40 mt-0.5">{metric.context}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===== ARTICLE BODY ===== */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-10">

            {/* Sidebar — TOC (desktop only) */}
            {headings.length > 2 && (
              <aside className="hidden lg:block w-64 flex-shrink-0">
                <div className="sticky top-24">
                  <div className="bg-white rounded-2xl border border-[#E6DAD1]/60 p-5">
                    <h4 className="text-xs font-sans font-semibold text-[#180204]/50 uppercase tracking-wide mb-4">Contents</h4>
                    <nav className="space-y-2">
                      {headings.map((h, i) => (
                        <a
                          key={i}
                          href={`#${h.key}`}
                          className="block text-sm font-sans text-[#180204]/55 hover:text-[#FF5635] transition-colors leading-snug py-0.5"
                        >
                          {h.text}
                        </a>
                      ))}
                    </nav>
                  </div>

                  {/* Topics tags */}
                  {post.topics && post.topics.length > 0 && (
                    <div className="mt-5">
                      <h4 className="text-xs font-sans font-semibold text-[#180204]/50 uppercase tracking-wide mb-3">Topics</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {post.topics.map((topic: string, i: number) => (
                          <span key={i} className="bg-white border border-[#E6DAD1]/60 text-[#180204]/55 px-2.5 py-1 rounded-full text-xs font-sans">
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </aside>
            )}

            {/* Main article content */}
            <article className="min-w-0 flex-1 max-w-4xl">

              {/* Featured image (if exists) */}
              {post.mainImage?.asset?.url && (
                <figure className="mb-10 rounded-2xl overflow-hidden">
                  <Image
                    src={urlFor(post.mainImage).width(1200).height(600).url()}
                    alt={post.mainImage?.alt || post.title}
                    width={1200}
                    height={600}
                    className="w-full h-auto"
                    priority
                  />
                  {post.mainImage?.caption && (
                    <figcaption className="text-center text-sm text-[#180204]/40 font-sans mt-3 italic">
                      {post.mainImage.caption}
                    </figcaption>
                  )}
                </figure>
              )}

              {/* Mobile TOC */}
              {headings.length > 2 && (
                <details className="lg:hidden bg-white rounded-2xl border border-[#E6DAD1]/60 p-5 mb-8 group">
                  <summary className="flex items-center justify-between cursor-pointer text-sm font-sans font-semibold text-[#180204]/70 list-none">
                    <span className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      Table of Contents
                    </span>
                    <ChevronRight className="w-4 h-4 text-[#FF5635] group-open:rotate-90 transition-transform" />
                  </summary>
                  <nav className="mt-3 pt-3 border-t border-[#E6DAD1]/40 space-y-2">
                    {headings.map((h, i) => (
                      <a
                        key={i}
                        href={`#${h.key}`}
                        className="block text-sm font-sans text-[#180204]/55 hover:text-[#FF5635] transition-colors py-0.5"
                      >
                        {h.text}
                      </a>
                    ))}
                  </nav>
                </details>
              )}

              {/* Article body */}
              <div className="prose-insight">
                {post.body && (
                  <PortableText value={post.body} components={portableTextComponents} />
                )}
              </div>

              {/* ===== KEY TAKEAWAYS ===== */}
              {post.keyTakeaways && post.keyTakeaways.length > 0 && (
                <div className="key-takeaways mt-12 bg-[#180204] rounded-2xl p-7 md:p-8">
                  <div className="flex items-center gap-2 mb-5">
                    <Lightbulb className="w-5 h-5 text-[#FF5635]" />
                    <h3 className="text-lg text-white font-sans font-semibold">Key Takeaways</h3>
                  </div>
                  <ul className="space-y-3">
                    {post.keyTakeaways.map((takeaway: string, i: number) => (
                      <li key={i} className="flex gap-3 text-white/75 font-sans leading-relaxed">
                        <span className="text-[#FF5635] font-bold text-sm mt-0.5 flex-shrink-0">{String(i + 1).padStart(2, '0')}</span>
                        <span className="text-sm">{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* ===== DATA SOURCES ===== */}
              {post.dataSources && post.dataSources.length > 0 && (
                <div className="mt-12 bg-white rounded-2xl border border-[#E6DAD1]/60 p-7 md:p-8">
                  <h3 className="text-lg text-[#180204] mb-1 font-sans font-semibold">Data Sources</h3>
                  {post.dataTimePeriod?.label && (
                    <p className="text-sm text-[#180204]/40 font-sans mb-5">Data period: {post.dataTimePeriod.label}</p>
                  )}
                  <div className="space-y-3">
                    {post.dataSources.map((source: any, i: number) => (
                      <div key={i} className="flex items-start gap-3 py-2 border-b border-[#E6DAD1]/30 last:border-0">
                        <div className="w-6 h-6 bg-[#FAF6F3] rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-sans font-semibold text-[#180204]/40">{i + 1}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-sans font-semibold text-[#180204]">{source.name}</span>
                            {source.url && (
                              <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-[#2C73FF] hover:text-[#0052E0] transition-colors">
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            )}
                          </div>
                          {source.description && (
                            <p className="text-xs text-[#180204]/45 font-sans mt-0.5">{source.description}</p>
                          )}
                          {source.accessDate && (
                            <p className="text-xs text-[#180204]/30 font-sans mt-0.5">
                              Accessed: {new Date(source.accessDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Methodology note */}
                  {post.methodology && (
                    <div className="mt-5 pt-4 border-t border-[#E6DAD1]/40">
                      <h4 className="text-xs font-sans font-semibold text-[#180204]/50 uppercase tracking-wide mb-2">Methodology</h4>
                      <p className="text-sm text-[#180204]/50 font-sans leading-relaxed">{post.methodology}</p>
                    </div>
                  )}

                  {/* Data disclaimer */}
                  {post.dataDisclaimer && (
                    <div className="mt-4 bg-[#FAF6F3] rounded-xl p-4">
                      <p className="text-xs text-[#180204]/45 font-sans leading-relaxed italic">{post.dataDisclaimer}</p>
                    </div>
                  )}
                </div>
              )}

              {/* ===== DOWNLOADABLE ASSETS ===== */}
              {post.downloadableAssets && post.downloadableAssets.length > 0 && (
                <div className="mt-8 space-y-3">
                  {post.downloadableAssets.map((asset: any, i: number) => (
                    <div key={i} className="bg-white rounded-2xl border border-[#E6DAD1]/60 p-5 flex items-center gap-4">
                      <div className="w-10 h-10 bg-[#FF5635]/8 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Download className="w-5 h-5 text-[#FF5635]" />
                      </div>
                      <div className="flex-1">
                        <span className="text-sm font-sans font-semibold text-[#180204]">{asset.label}</span>
                        {asset.requiresEmail && (
                          <span className="text-xs text-[#180204]/40 font-sans ml-2">(Email required)</span>
                        )}
                      </div>
                      <span className="text-[#FF5635] text-sm font-semibold font-sans">Download</span>
                    </div>
                  ))}
                </div>
              )}

              {/* ===== AUTHOR CARD ===== */}
              <div className="mt-12 bg-white rounded-2xl border border-[#E6DAD1]/60 p-6 flex gap-5 items-start">
                <div className="w-12 h-12 bg-[#180204] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm font-sans">
                    {(post.author || 'GTP').split(' ').map((w: string) => w[0]).join('').slice(0, 2)}
                  </span>
                </div>
                <div>
                  <div className="text-sm font-sans font-semibold text-[#180204] mb-1">{post.author || 'Greek Trip Planner Research'}</div>
                  {post.authorBio && (
                    <p className="text-sm text-[#180204]/50 font-sans leading-relaxed">{post.authorBio}</p>
                  )}
                </div>
              </div>

              {/* ===== EXTERNAL REFERENCES ===== */}
              {post.externalReferences && post.externalReferences.length > 0 && (
                <div className="mt-10">
                  <h3 className="text-lg text-[#180204] mb-4 font-sans font-semibold">Further Reading</h3>
                  <div className="space-y-2">
                    {post.externalReferences.map((ref: any, i: number) => (
                      <a
                        key={i}
                        href={ref.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 bg-white rounded-xl border border-[#E6DAD1]/60 p-4 hover:border-[#FF5635]/30 transition-colors group"
                      >
                        <ExternalLink className="w-4 h-4 text-[#180204]/30 group-hover:text-[#FF5635] transition-colors flex-shrink-0" />
                        <div>
                          <span className="text-sm font-sans font-medium text-[#180204] group-hover:text-[#FF5635] transition-colors">{ref.title}</span>
                          {ref.source && <span className="text-xs text-[#180204]/40 font-sans ml-2">{ref.source}</span>}
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* ===== FAQ SECTION ===== */}
              {post.enableFaqSchema && post.faqItems && post.faqItems.length > 0 && (
                <div className="mt-12">
                  <h3 className="text-2xl text-[#180204] mb-6">Frequently Asked Questions</h3>
                  <div className="space-y-4">
                    {post.faqItems.map((faq: any, i: number) => (
                      <details key={i} className="group bg-white rounded-2xl border border-[#E6DAD1]/60">
                        <summary className="flex items-center justify-between cursor-pointer p-6 text-[#180204] font-sans font-semibold text-base list-none">
                          {faq.question}
                          <ChevronRight className="w-5 h-5 text-[#FF5635] group-open:rotate-90 transition-transform flex-shrink-0 ml-4" />
                        </summary>
                        <div className="px-6 pb-6 text-[#180204]/60 leading-relaxed font-sans text-sm">{faq.answer}</div>
                      </details>
                    ))}
                  </div>
                </div>
              )}
            </article>
          </div>
        </div>
      </section>

      {/* ===== RELATED INSIGHTS ===== */}
      {post.relatedInsights && post.relatedInsights.length > 0 && (
        <section className="bg-white border-t border-[#E6DAD1] py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl text-[#180204]">Related Insights</h2>
              <Link href="/insights" className="text-[#FF5635] text-sm font-sans font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                All Insights <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {post.relatedInsights.map((related: any) => {
                const relConfig = typeConfig[related.insightType] || { label: 'Insight', color: 'text-[#FF5635]', bg: 'bg-[#FF5635]/8' }
                const relDate = related.publishedAt
                  ? new Date(related.publishedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                  : null
                return (
                  <Link
                    key={related._id}
                    href={`/insights/${related.slug?.current}`}
                    className="group bg-[#FAF6F3] rounded-2xl p-6 hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-[#E6DAD1]/60"
                  >
                    <span className={`${relConfig.bg} ${relConfig.color} px-2.5 py-1 rounded-full text-xs font-sans font-semibold`}>
                      {relConfig.label}
                    </span>
                    <h3 className="text-base text-[#180204] mt-3 mb-2 font-sans font-semibold leading-snug group-hover:text-[#FF5635] transition-colors line-clamp-2">
                      {related.title}
                    </h3>
                    <div className="flex items-center gap-3 text-[#180204]/35 text-xs font-sans">
                      {relDate && <span>{relDate}</span>}
                      {related.readingTime && <span>{related.readingTime} min read</span>}
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ===== RELATED BLOG POSTS ===== */}
      {post.relatedBlogPosts && post.relatedBlogPosts.length > 0 && (
        <section className={`${post.relatedInsights?.length > 0 ? 'bg-[#FAF6F3]' : 'bg-white border-t border-[#E6DAD1]'} py-14`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl text-[#180204] mb-1">Plan Your Trip</h2>
                <p className="text-[#180204]/45 text-sm font-sans">Put these insights into practice with our travel guides</p>
              </div>
              <Link href="/blog" className="text-[#FF5635] text-sm font-sans font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                All Guides <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {post.relatedBlogPosts.map((blogPost: any) => (
                <Link
                  key={blogPost._id}
                  href={`/blog/${blogPost.slug?.current}`}
                  className="group bg-white rounded-2xl overflow-hidden card-hover border border-[#E6DAD1]/60"
                >
                  <div className="relative h-40 overflow-hidden">
                    {blogPost.mainImage?.asset ? (
                      <Image
                        src={urlFor(blogPost.mainImage).width(400).height(250).url()}
                        alt={blogPost.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-[#FF5635]/20 to-[#2C73FF]/20" />
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="text-base text-[#180204] font-sans font-semibold mb-2 group-hover:text-[#FF5635] transition-colors line-clamp-2">
                      {blogPost.title}
                    </h3>
                    <span className="text-[#FF5635] text-sm font-sans font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read Guide <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== BOTTOM CTA ===== */}
      {post.ctaType && post.ctaType !== 'none' && (
        <section className="bg-[#180204] py-16">
          <div className="max-w-2xl mx-auto px-4 text-center">
            {post.ctaType === 'plan-trip' && (
              <>
                <h2 className="text-3xl text-white mb-4">Ready to Visit Greece?</h2>
                <p className="text-white/50 font-sans mb-8">Use our free AI trip planner to create your personalized Greece itinerary in minutes.</p>
                <Link href="/ai-trip-planner" className="btn-accent px-8 py-4 rounded-full text-base font-semibold inline-flex items-center gap-2">
                  {post.ctaCustomText || 'Plan My Trip Free'} <ArrowRight className="w-5 h-5" />
                </Link>
              </>
            )}
            {post.ctaType === 'subscribe' && (
              <>
                <h2 className="text-3xl text-white mb-4">Stay Updated on Greek Tourism</h2>
                <p className="text-white/50 font-sans mb-8">Get our latest insights and data reports delivered to your inbox.</p>
                <Link href="/insights" className="btn-accent px-8 py-4 rounded-full text-base font-semibold inline-flex items-center gap-2">
                  {post.ctaCustomText || 'Browse All Insights'} <ArrowRight className="w-5 h-5" />
                </Link>
              </>
            )}
            {post.ctaType === 'more-insights' && (
              <>
                <h2 className="text-3xl text-white mb-4">Explore More Data</h2>
                <p className="text-white/50 font-sans mb-8">Browse our full library of Greek tourism research and analysis.</p>
                <Link href="/insights" className="btn-accent px-8 py-4 rounded-full text-base font-semibold inline-flex items-center gap-2">
                  {post.ctaCustomText || 'All Insights'} <ArrowRight className="w-5 h-5" />
                </Link>
              </>
            )}
            {post.ctaType === 'download' && (
              <>
                <h2 className="text-3xl text-white mb-4">Download the Full Report</h2>
                <p className="text-white/50 font-sans mb-8">Get the complete dataset and analysis as a downloadable PDF.</p>
                <span className="btn-accent px-8 py-4 rounded-full text-base font-semibold inline-flex items-center gap-2 cursor-pointer">
                  {post.ctaCustomText || 'Download Report'} <Download className="w-5 h-5" />
                </span>
              </>
            )}
          </div>
        </section>
      )}

      {/* ===== BACK TO INSIGHTS ===== */}
      <section className="bg-[#FAF6F3] border-t border-[#E6DAD1] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/insights" className="text-[#180204]/50 hover:text-[#FF5635] text-sm font-sans font-medium flex items-center gap-2 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to All Insights
          </Link>
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
    </main>
  )
}
