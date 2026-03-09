import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, BookOpen, Calendar, User, Sun } from 'lucide-react'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import Navbar from '@/components/Navbar'

export const metadata = {
  title: 'Greece Travel Blog | Guides, Tips & Island Insights',
  description: 'Expert Greece travel guides, island-hopping tips, and insider recommendations. Plan your perfect Greek adventure with our comprehensive blog.',
  openGraph: {
    title: 'Greece Travel Blog | Guides, Tips & Island Insights',
    description: 'Expert Greece travel guides, island-hopping tips, and insider recommendations.',
    url: 'https://greektriplanner.me/blog',
    siteName: 'Greek Trip Planner',
    type: 'website',
  },
}

async function getPosts() {
  const posts = await client.fetch(
    `*[_type == "post"] | order(publishedAt desc) {
      title,
      slug,
      publishedAt,
      excerpt,
      mainImage,
      author->{name},
      categories[]->{title}
    }`,
    {},
    { next: { revalidate: 60 } }
  )
  return posts
}

function formatDate(dateString: string) {
  if (!dateString || dateString === '1970-01-01') return ''
  const date = new Date(dateString)
  if (date.getFullYear() === 1970) return ''
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default async function BlogPage() {
  const posts = await getPosts()
  const featuredPost = posts[0]
  const latestPosts = posts.slice(1)

  return (
    <main className="min-h-screen bg-[#FAF6F3]">
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="relative pt-16">
        <div className="relative h-[520px] sm:h-[620px] overflow-hidden">
          <Image
            src="/greece-blog.jpg"
            alt="Greek Travel Blog"
            fill
            className="object-cover"
            priority
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#180204]/75 via-[#180204]/30 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-start justify-center px-6 sm:px-12 lg:px-20">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-5">
              <BookOpen className="w-4 h-4 text-[#FF5635]" />
              <span className="text-white/90 text-sm font-medium">Our Stories</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl text-white mb-4 max-w-2xl">Travel Blog</h1>
            <p className="text-white/70 text-lg max-w-xl">Stories, guides, and insider tips for exploring Greece</p>
          </div>
        </div>
      </section>

      {/* ===== FEATURED ARTICLE — Editorial Spotlight ===== */}
      {featuredPost && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center gap-3 mb-8">
            <span className="block w-8 h-[3px] bg-[#FF5635] rounded-full" />
            <span className="text-[#FF5635] text-xs font-bold uppercase tracking-[0.2em] font-sans">Editor's Pick</span>
          </div>
          <Link
            href={`/blog/${featuredPost.slug?.current}`}
            className="group grid lg:grid-cols-[1fr_420px] gap-0 rounded-3xl overflow-hidden shadow-xl border border-[#E6DAD1]/50 bg-white card-hover"
          >
            {/* Image — large, left side */}
            <div className="relative h-72 sm:h-96 lg:h-auto min-h-[420px] overflow-hidden">
              {featuredPost.mainImage ? (
                <Image
                  src={urlFor(featuredPost.mainImage).width(1000).height(700).url()}
                  alt={featuredPost.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              ) : (
                <div className="w-full h-full bg-[#FAF6F3] flex items-center justify-center">
                  <Sun className="w-16 h-16 text-[#E6DAD1]" />
                </div>
              )}
              {/* Subtle dark gradient on left image for depth */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#180204]/10" />
            </div>

            {/* Content — right side, dark panel */}
            <div className="bg-[#180204] p-8 sm:p-10 lg:p-12 flex flex-col justify-between">
              <div>
                {/* Meta row */}
                <div className="flex items-center gap-3 mb-6">
                  {formatDate(featuredPost.publishedAt) && (
                    <span className="text-white/40 text-xs font-sans flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(featuredPost.publishedAt)}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h2 className="text-2xl sm:text-3xl lg:text-[2rem] leading-snug text-white mb-5 group-hover:text-[#FF5635] transition-colors duration-300">
                  {featuredPost.title}
                </h2>

                {/* Divider */}
                <div className="w-12 h-[2px] bg-[#FF5635]/60 rounded-full mb-5" />

                {/* Excerpt */}
                {featuredPost.excerpt && (
                  <p className="text-white/55 leading-relaxed line-clamp-4 font-sans text-sm">{featuredPost.excerpt}</p>
                )}
              </div>

              {/* Author + CTA */}
              <div className="mt-8 flex items-center justify-between">
                {featuredPost.author?.name && (
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#FF5635]/20 flex items-center justify-center">
                      <User className="w-3.5 h-3.5 text-[#FF5635]" />
                    </div>
                    <span className="text-white/50 text-sm font-sans">{featuredPost.author.name}</span>
                  </div>
                )}
                <span className="inline-flex items-center gap-2 bg-[#FF5635] text-white text-sm font-semibold px-5 py-2.5 rounded-full group-hover:bg-[#e04a2a] transition-colors font-sans">
                  Read Article <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* ===== LATEST ARTICLES ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <h2 className="text-3xl sm:text-4xl text-[#180204] mb-10">Latest Articles</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestPosts.map((post: any) => (
            <Link
              key={post.slug?.current}
              href={`/blog/${post.slug?.current}`}
              className="group bg-white rounded-2xl overflow-hidden border border-[#E6DAD1]/60 card-hover"
            >
              <div className="relative h-48 overflow-hidden">
                {post.mainImage ? (
                  <Image
                    src={urlFor(post.mainImage).width(600).height(400).url()}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-[#FAF6F3] flex items-center justify-center">
                    <Sun className="w-10 h-10 text-[#E6DAD1]" />
                  </div>
                )}
              </div>
              <div className="p-5">
                <h3 className="text-lg text-[#180204] mb-2 group-hover:text-[#FF5635] transition-colors line-clamp-2 font-sans font-semibold">
                  {post.title}
                </h3>
                {formatDate(post.publishedAt) && (
                  <div className="flex items-center gap-1.5 mb-3">
                    <Calendar className="w-3.5 h-3.5 text-[#180204]/35" />
                    <span className="text-[#180204]/40 text-xs font-sans">{formatDate(post.publishedAt)}</span>
                  </div>
                )}
                {post.excerpt && (
                  <p className="text-[#180204]/55 text-sm leading-relaxed mb-4 line-clamp-3 font-sans">{post.excerpt}</p>
                )}
                <span className="text-[#FF5635] text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all font-sans">
                  Read More <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="bg-[#180204] py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl text-white mb-4">Ready to Plan Your Greece Trip?</h2>
          <p className="text-white/60 mb-8 max-w-xl mx-auto">Our AI planner creates personalized itineraries based on your travel style, budget, and interests. Completely free.</p>
          <Link
            href="/ai-trip-planner"
            className="btn-accent px-8 py-4 rounded-full text-lg font-semibold inline-flex items-center gap-3"
          >
            Start Planning Free <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-[#180204] border-t border-white/10 py-12">
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
                  <Image
                    src="https://bookmarktravel.com/images/bookmarktravel-234.jpg"
                    alt="Bookmark Travel"
                    width={117}
                    height={20}
                    className="opacity-50 hover:opacity-80 transition-opacity"
                    unoptimized
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
