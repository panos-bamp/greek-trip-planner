import Link from 'next/link'
import Image from 'next/image'
import { client, urlFor } from '@/lib/sanity'
import { ArrowRight, Calendar } from 'lucide-react'

export const dynamic = 'force-dynamic' // Don't pre-render at build time

interface Post {
  _id: string
  title: string
  slug: {
    current: string
  }
  mainImage?: any
  excerpt?: string
  publishedAt?: string
  author?: string
  categories?: string[]
}

export const revalidate = 3600

async function getPosts(): Promise<Post[]> {
  const posts = await client.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      mainImage,
      excerpt,
      publishedAt,
      author,
      categories
    }
  `)
  return posts
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  })
}

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white border-b border-gray-200 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <Image 
                src="/logo.png" 
                alt="Greek Trip Planner" 
                width={70} 
                height={21}
                priority
              />
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/features" className="text-gray-700 hover:text-primary transition font-medium">Features</Link>
              <Link href="/how-it-works" className="text-gray-700 hover:text-primary transition font-medium">How it Works</Link>
              <Link href="/blog" className="text-primary font-semibold">Blog</Link>
              <Link href="/about" className="text-gray-700 hover:text-primary transition font-medium">About</Link>
              <Link 
                href="/quiz"
                className="px-6 py-3 gradient-pink text-white rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all flex items-center space-x-2"
              >
                <span>Start Planning</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - 2 Column Layout */}
      <div className="pt-32 pb-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-5 gap-16 items-start">
              {/* Left: Text (60%) */}
              <div className="md:col-span-3">
                <p className="text-sm font-semibold text-primary mb-4 tracking-wider uppercase">
                  Blog
                </p>
                
                <h1 className="text-6xl md:text-7xl font-black text-primary mb-8 leading-tight" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
                  Greece Travel Blog
                </h1>

                <p className="text-xl text-gray-600 leading-relaxed">
                  Expert insights, travel tips, and insider guides from our team of Greece specialists. 
                  Discover hidden gems, practical advice, and authentic experiences to help you plan 
                  the perfect Greek adventure.
                </p>
              </div>

              {/* Right: 2 Stacked Images (40%) */}
              <div className="md:col-span-2 space-y-6">
                <div className="relative h-64 rounded-2xl overflow-hidden">
                  <img
                    src="/Santorini_Sunset_View.jpg"
                    alt="Greece"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="relative h-48 rounded-2xl overflow-hidden">
                  <img
                    src="/Mykonos_Architecture.jpg"
                    alt="Greece"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {posts.map((post: Post) => (
                <Link 
                  key={post._id} 
                  href={`/blog/${post.slug.current}`}
                  className="group block"
                >
                  <article className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                    {/* Image */}
                    <div className="relative h-52 overflow-hidden flex-shrink-0">
                      {post.mainImage ? (
                        <img
                          src={urlFor(post.mainImage).width(600).height(400).url()}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary to-accent-blue"></div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      {/* Category */}
                      {post.categories && post.categories.length > 0 && (
                        <div className="mb-3">
                          <span className="inline-block px-3 py-1 bg-accent-lightblue text-primary text-xs font-semibold rounded-full">
                            {post.categories[0]}
                          </span>
                        </div>
                      )}

                      {/* Title */}
                      <h3 className="text-2xl font-bold text-primary mb-3 line-clamp-2 group-hover:text-accent-blue transition">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      {post.excerpt && (
                        <p className="text-gray-600 mb-4 line-clamp-3 flex-1">
                          {post.excerpt}
                        </p>
                      )}

                      {/* Meta */}
                      <div className="flex items-center justify-between text-sm text-gray-500 mt-auto pt-4 border-t border-gray-100">
                        <span className="font-medium">{post.author || 'Greek Trip Planner'}</span>
                        {post.publishedAt && (
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>{formatDate(post.publishedAt)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="gradient-primary py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <Image 
                src="/logo.png" 
                alt="Greek Trip Planner" 
                width={70} 
                height={21}
              />
            </div>
            
            <div className="flex items-center space-x-8">
              <Link href="/features" className="text-white/80 hover:text-white transition text-sm">Features</Link>
              <Link href="/how-it-works" className="text-white/80 hover:text-white transition text-sm">How it Works</Link>
              <Link href="/blog" className="text-white font-semibold text-sm">Blog</Link>
              <Link href="/about" className="text-white/80 hover:text-white transition text-sm">About</Link>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-white/60 text-sm">© 2024 Greek Trip Planner. All rights reserved.</p>
              <div className="flex items-center gap-6">
                <a 
                  href="https://traveltourismdirectory.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition text-sm"
                >
                  Travel and Tourism Directory
                </a>
                <a 
                  href="https://bookmarktravel.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <img 
                    src="https://bookmarktravel.com/images/bookmarktravel-234.jpg" 
                    alt="Bookmark Travel" 
                    width="234" 
                    height="39" 
                    className="h-auto"
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
