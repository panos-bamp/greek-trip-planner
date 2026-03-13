// app/blog/page.tsx

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, BookOpen } from 'lucide-react'
import { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import Navbar from '@/components/Navbar'
import BlogClient from './BlogClient'

export const metadata: Metadata = {
  title: 'Greece Travel Blog — Guides, Itineraries & Tips | Greek Trip Planner',
  description: 'Expert travel guides, island comparisons, itineraries, and practical tips for planning your perfect Greece trip. Updated for 2026.',
  openGraph: {
    title: 'Greece Travel Blog | Greek Trip Planner',
    description: 'Expert guides, itineraries and tips for traveling Greece.',
    url: 'https://greektriplanner.me/blog',
    siteName: 'Greek Trip Planner',
    type: 'website',
  },
}

export const revalidate = 60

async function getAllPosts() {
  try {
    const query = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      postType,
      publishedAt,
      readingTime,
      mainImage
    }`
    return await client.fetch(query)
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <main className="min-h-screen bg-[#FAF6F3]">
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="relative pt-16">
        <div className="bg-[#180204] relative overflow-hidden">
          {/* Grid pattern — same as insights */}
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} />
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF5635]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#2C73FF]/8 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-white/8 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 mb-6">
                <BookOpen className="w-4 h-4 text-[#FF5635]" />
                <span className="text-white/70 text-sm font-medium font-sans">Greece Travel Guides & Tips</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl text-white leading-[1.08] mb-5">
                Plan Your Perfect<br />
                <span className="text-[#FF5635]">Greece Trip</span>
              </h1>
              <p className="text-lg sm:text-xl text-white/60 max-w-xl leading-relaxed font-sans font-light">
                Expert destination guides, honest itineraries, and practical tips — for every island, every style, every budget.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CLIENT COMPONENT: Sticky filter bar + grid ===== */}
      <BlogClient posts={posts} />

      {/* ===== CROSS-LINK TO INSIGHTS ===== */}
      <section className="bg-white border-t border-[#E6DAD1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl sm:text-3xl text-[#180204] mb-2">Want the Data Behind the Destinations?</h2>
              <p className="text-[#180204]/55 font-sans">Our Insights section covers tourism statistics, market trends, and destination performance.</p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <Link href="/insights" className="bg-[#FAF6F3] border border-[#E6DAD1] text-[#180204] hover:border-[#FF5635]/30 hover:text-[#FF5635] px-6 py-3 rounded-full text-sm font-sans font-semibold transition-all">
                View Insights
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
              <Link href="/blog"         className="text-[#FF5635] text-sm font-sans font-semibold">Blog</Link>
              <Link href="/insights"     className="text-white/60 hover:text-[#FF5635] transition-colors text-sm font-sans">Insights</Link>
              <Link href="/about"        className="text-white/60 hover:text-[#FF5635] transition-colors text-sm font-sans">About</Link>
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

      {/* ===== SCHEMA ===== */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Greece Travel Blog",
            "description": "Expert travel guides, itineraries and tips for Greece.",
            "url": "https://greektriplanner.me/blog",
            "isPartOf": { "@type": "WebSite", "name": "Greek Trip Planner", "url": "https://greektriplanner.me" },
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://greektriplanner.me" },
                { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://greektriplanner.me/blog" }
              ]
            }
          })
        }}
      />
    </main>
  )
}
