import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, BookOpen, Calendar, User, Sun } from 'lucide-react'
import { client } from '@/sanity/lib/client'
import { urlForImage } from '@/sanity/lib/image'

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

      {/* ===== NAVIGATION ===== */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-50 border-b border-[#E6DAD1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="Greek Trip Planner" width={70} height={21} priority />
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/how-it-works" className="text-[#180204]/70 hover:text-[#FF5635] transition-colors text-sm font-medium">How it Works</Link>
            <Link href="/blog" className="text-[#FF5635] transition-colors text-sm font-medium">Blog</Link>
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

      {/* ===== HERO ===== */}
      <section className="relative pt-16">
        <div className="relative h-[340px] sm:h-[400px] overflow-hidden">
          <Image
            src="/greece-blog.jpg"
            alt="Greek Travel Blog"
            fill
            className="object-cover"
            priority
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#180204]/70 via-[#180204]/30 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-4">
              <BookOpen className="w-4 h-4 text-[#FF5635]" />
              <span className="text-white/90 text-sm font-medium">Our Stories</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl text-white mb-3">Travel Blog</h1>
            <p className="text-white/70 text-lg max-w-xl">Stories, guides, and insider tips for exploring Greece</p>
          </div>
        </div>
      </section>

      {/* ===== FEATURED ARTICLE ===== */}
      {featuredPost && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10 mb-16">
          <Link
            href={`/blog/${featuredPost.slug?.current}`}
            className="group block bg-white rounded-3xl overflow-hidden shadow-lg border border-[#E6DAD1]/60 card-hover"
          >
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative h-64 md:h-auto min-h-[280px] overflow-hidden">
                {featuredPost.mainImage ? (
                  <Image
                    src={urlForImage(featuredPost.mainImage).width(800).height(500).url()}
                    alt={featuredPost.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-[#FAF6F3] flex items-center justify-center">
                    <Sun className="w-12 h-12 text-[#E6DAD1]" />
                  </div>
                )}
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-[#FF5635]/10 text-[#FF5635] text-xs font-semibold px-3 py-1 rounded-full font-sans">Featured Article</span>
                  {formatDate(featuredPost.publishedAt) && (
                    <span className="text-[#180204]/40 text-sm font-sans flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(featuredPost.publishedAt)}
                    </span>
                  )}
                </div>
                <h2 className="text-2xl sm:text-3xl text-[#180204] mb-4 group-hover:text-[#FF5635] transition-colors">
                  {featuredPost.title}
                </h2>
                {featuredPost.author?.name && (
                  <div className="flex items-center gap-2 mb-4">
                    <User className="w-4 h-4 text-[#180204]/40" />
                    <span className="text-[#180204]/50 text-sm font-sans">{featuredPost.author.name}</span>
                  </div>
                )}
                {featuredPost.excerpt && (
                  <p className="text-[#180204]/60 leading-relaxed mb-6 line-clamp-3 font-sans">{featuredPost.excerpt}</p>
                )}
                <span className="text-[#FF5635] font-semibold flex items-center gap-2 group-hover:gap-3 transition-all font-sans">
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
                    src={urlForImage(post.mainImage).width(600).height(400).url()}
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
