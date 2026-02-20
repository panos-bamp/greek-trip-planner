import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { PortableText } from '@portabletext/react'
import {
  ArrowRight, ArrowLeft, Clock, Calendar, ChevronRight,
  BookOpen, Lightbulb, User
} from 'lucide-react'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { generateAllSchemas } from '@/lib/schemaMarkup'

// Import affiliate components that work
import AffiliateDisclosure from '@/components/affiliate/AffiliateDisclosure'
import HotelCard from '@/components/affiliate/HotelCard'
import TourCard from '@/components/affiliate/TourCard'

const BASE_URL = 'https://greektriplanner.me'

// GROQ query
const postQuery = `*[_type == "post" && slug.current == $slug][0] {
  ...,
  faqSchema,
  mainImage {
    ...,
    asset-> { url, metadata { dimensions } }
  },
  ogImage {
    asset-> { url }
  },
  body[] {
    ...,
    _type == "image" => {
      ...,
      asset-> { url, metadata { dimensions } }
    }
  }
}`

// Generate metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await client.fetch(postQuery, { slug })
  if (!post) return { title: 'Post Not Found' }

  const title = post.metaTitle || post.title
  const description = post.metaDescription || post.excerpt || ''
  const ogImageUrl = post.ogImage?.asset?.url || post.mainImage?.asset?.url
  const canonicalUrl = post.canonicalUrl || `${BASE_URL}/blog/${post.slug.current}`

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
  const slugs = await client.fetch(`*[_type == "post" && defined(slug.current)]{ "slug": slug.current }`)
  return slugs.map((s: any) => ({ slug: s.slug }))
}

export const revalidate = 60

// ─── Extract H2 headings from body for TOC ───
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

// ─── Portable Text Components (inline) ───
const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset) return null
      const dimensions = value?.asset?.metadata?.dimensions
      const aspectRatio = dimensions ? dimensions.width / dimensions.height : 16 / 9
      const displayWidth = 1200
      const displayHeight = Math.round(displayWidth / aspectRatio)
      return (
        <figure className="my-8 rounded-2xl overflow-hidden">
          <Image
            src={urlFor(value).width(displayWidth).url()}
            alt={value.alt || ''}
            width={displayWidth}
            height={displayHeight}
            className="w-full h-auto"
          />
          {value.caption && (
            <figcaption className="text-center text-sm text-[#180204]/40 font-sans mt-3 italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
    affiliateHotel: ({ value }: any) => {
      if (!value) return null
      return <HotelCard {...value} />
    },
    affiliateTour: ({ value }: any) => {
      if (!value) return null
      return <TourCard {...value} />
    },
    htmlEmbed: ({ value }: any) => {
     if (!value?.html) return null
       return (
         <div className="my-8 html-embed-container overflow-x-auto" dangerouslySetInnerHTML={{ __html: value.html }} />
      )
    },
  },
  block: {
    h2: ({ children, value }: any) => {
      const text = value?.children?.map((child: any) => child.text).join('') || ''
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      return <h2 id={id} className="text-3xl sm:text-4xl text-[#180204] mt-12 mb-4 scroll-mt-24">{children}</h2>
    },
    h3: ({ children }: any) => <h3 className="text-2xl text-[#180204] mt-8 mb-3">{children}</h3>,
    h4: ({ children }: any) => <h4 className="text-xl text-[#180204] mt-6 mb-2 font-sans font-semibold">{children}</h4>,
    normal: ({ children }: any) => <p className="text-[#180204]/70 leading-relaxed mb-5 font-sans text-base">{children}</p>,
    bullet: ({ children }: any) => <li className="list-disc ml-6 text-[#180204]/70 leading-relaxed font-sans text-base mb-1">{children}</li>,
    number: ({ children }: any) => <li className="list-decimal ml-6 text-[#180204]/70 leading-relaxed font-sans text-base mb-1">{children}</li>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-[#FF5635] pl-5 my-6 italic text-[#180204]/60 font-sans">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-bold text-[#180204]">{children}</strong>,
    em: ({ children }: any) => <em className="italic">{children}</em>,
    underline: ({ children }: any) => <span className="underline">{children}</span>,
    link: ({ value, children }: any) => {
      const href = value?.href || ''
      const isExternal = href.startsWith('http')
      return (
        <a
          href={href}
          className="text-[#2C73FF] hover:text-[#0052E0] underline transition-colors"
          {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {children}
        </a>
      )
    },
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc pl-6 space-y-2 mb-5 text-[#180204]/70 font-sans">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal pl-6 space-y-2 mb-5 text-[#180204]/70 font-sans">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: any) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }: any) => <li className="leading-relaxed">{children}</li>,
  },
}

// ═══════════════════════════════════════════════════
// BLOG POST PAGE COMPONENT
// ═══════════════════════════════════════════════════
export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await client.fetch(postQuery, { slug })

  if (!post) notFound()

  // Schema markup
  let schemas: object[] = []
  try {
    schemas = generateAllSchemas(post, BASE_URL)
  } catch (error) {
    console.error('Schema generation error:', error)
  }

  const publishDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : null
  const updateDate = post.updatedAt
    ? new Date(post.updatedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : null

  const headings = extractHeadings(post.body)

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
            <Link href="/blog" className="text-[#FF5635] transition-colors text-sm font-medium">Blog</Link>
            <Link href="/insights" className="text-[#180204]/70 hover:text-[#FF5635] transition-colors text-sm font-medium">Insights</Link>
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

      {/* ═══════════════════════════════════════════
          1. HERO SECTION — Image + Breadcrumbs + Meta
          ═══════════════════════════════════════════ */}
      <section className="relative pt-16">
        {/* Hero image background */}
        <div className="relative overflow-hidden">
          {post.mainImage?.asset?.url ? (
            <>
              <Image
                src={urlFor(post.mainImage).width(1920).height(700).url()}
                alt={post.mainImage?.alt || post.title}
                width={1920}
                height={700}
                className="w-full h-[400px] sm:h-[480px] md:h-[540px] object-cover"
                priority
              />
              {/* Dark overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#180204]/80 via-[#180204]/40 to-[#180204]/20" />
            </>
          ) : (
            /* Fallback dark hero if no image */
            <div className="w-full h-[400px] sm:h-[480px] md:h-[540px] bg-[#180204] relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.04]" style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
                backgroundSize: '40px 40px'
              }} />
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF5635]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            </div>
          )}

          {/* Content overlay: breadcrumbs + title + metadata */}
          <div className="absolute inset-0 flex items-end">
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-10 md:pb-14">
              <div className="max-w-3xl">

                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-white/50 text-sm font-sans mb-5">
                  <Link href="/" className="hover:text-white/80 transition-colors">Home</Link>
                  <ChevronRight className="w-3.5 h-3.5" />
                  <Link href="/blog" className="hover:text-white/80 transition-colors">Blog</Link>
                  <ChevronRight className="w-3.5 h-3.5" />
                  <span className="text-white/70 truncate max-w-[200px] sm:max-w-xs">{post.title}</span>
                </nav>

                {/* Title */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl text-white leading-[1.1] mb-5">
                  {post.title}
                </h1>

                {/* Metadata row */}
                <div className="flex flex-wrap items-center gap-4 text-white/50 text-sm font-sans">
                  {post.author && (
                    <span className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" />
                      {post.author}
                    </span>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          2. EXCERPT HIGHLIGHT BOX (replaces Key Metrics)
          ═══════════════════════════════════════════ */}
      {post.excerpt && (
        <section className="relative z-10 -mt-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-lg border border-[#E6DAD1]/60 p-6 md:p-8">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-[#FF5635] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-sm font-sans font-semibold text-[#180204]/70 uppercase tracking-wide">At a Glance</span>
                  <p className="text-[#180204]/65 font-sans leading-relaxed mt-2 text-base">
                    {post.excerpt}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════
          3. ARTICLE BODY + TABLE OF CONTENTS SIDEBAR
          ═══════════════════════════════════════════ */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-10">

            {/* ─── Desktop Sidebar: TOC ─── */}
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
                </div>
              </aside>
            )}

            {/* ─── Main article content ─── */}
            <article className="min-w-0 flex-1 max-w-4xl">

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

              {/* Affiliate Disclosure */}
              {post.showAffiliateDisclosure && (
                <div className="mb-8">
                  <AffiliateDisclosure />
                </div>
              )}

              {/* Article Body */}
              <div className="prose-blog">
                {post.body && (
                  <PortableText value={post.body} components={portableTextComponents} />
                )}
              </div>

              {/* ===== FAQ SECTION (matching insights page format) ===== */}
              {post.faqSchema?.enabled && post.faqSchema?.faqs && post.faqSchema.faqs.length > 0 && (
                <div className="mt-12">
                  <h3 className="text-2xl text-[#180204] mb-6">Frequently Asked Questions</h3>
                  <div className="space-y-4">
                    {post.faqSchema.faqs.map((faq: any, i: number) => (
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

      {/* ===== BACK TO BLOG ===== */}
      <section className="bg-[#FAF6F3] border-t border-[#E6DAD1] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="text-[#180204]/50 hover:text-[#FF5635] text-sm font-sans font-medium flex items-center gap-2 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to All Guides
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
