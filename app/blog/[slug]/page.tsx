import Link from 'next/link'
import Image from 'next/image'
import { client, urlFor } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'
import { portableTextComponents } from '@/components/portableTextComponents'
import { ArrowLeft, Calendar, Clock } from 'lucide-react'

export const dynamic = 'force-dynamic'
export const revalidate = 3600

interface Post {
  title: string
  slug: {
    current: string
  }
  mainImage?: any
  body: any[]
  author?: string
  publishedAt?: string
  categories?: string[]
  excerpt?: string
}

async function getPost(slug: string): Promise<Post | null> {
  try {
    const post = await client.fetch(
      `*[_type == "post" && slug.current == $slug][0] {
        title,
        slug,
        mainImage,
        body,
        author,
        publishedAt,
        categories,
        excerpt
      }`,
      { slug }
    )
    
    return post || null
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return null
  }
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  })
}

function estimateReadingTime(body: any[]) {
  const text = JSON.stringify(body)
  const words = text.split(/\s+/).length
  const minutes = Math.ceil(words / 200)
  return minutes
}

export default async function BlogPost({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    return (
      <div className="min-h-screen py-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">Post not found</h1>
          <Link href="/blog" className="text-accent-blue hover:underline">
            ← Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  const readingTime = estimateReadingTime(post.body)

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
            </div>
          </div>
        </div>
      </nav>

      {/* Back to Blog */}
      <div className="pt-32 pb-8 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <Link 
              href="/blog" 
              className="inline-flex items-center space-x-2 text-gray-600 hover:text-primary transition font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Blog</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="pb-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-5 gap-16 items-start">
              {/* Left: Title, Excerpt, Author */}
              <div className="md:col-span-3">
                {/* Category */}
                {post.categories && post.categories.length > 0 && (
                  <div className="mb-6">
                    <span className="inline-block px-4 py-2 bg-accent-lightblue text-primary text-sm font-bold rounded-full">
                      {post.categories[0]}
                    </span>
                  </div>
                )}

                {/* Title */}
                <h1 className="text-5xl md:text-6xl font-black text-primary mb-6 leading-tight" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
                  {post.title}
                </h1>

                {/* Excerpt */}
                {post.excerpt && (
                  <p className="text-2xl text-gray-600 mb-8 leading-relaxed">
                    {post.excerpt}
                  </p>
                )}

                {/* Author Info */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent-blue flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    {post.author ? post.author[0].toUpperCase() : 'G'}
                  </div>

                  <div>
                    <div className="font-semibold text-primary">
                      {post.author || 'Greek Trip Planner'}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      {post.publishedAt && (
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(post.publishedAt)}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{readingTime} min read</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Featured Image */}
              <div className="md:col-span-2">
                {post.mainImage && (
                  <div className="relative w-full h-full min-h-[400px] rounded-2xl overflow-hidden">
                    <img
                      src={urlFor(post.mainImage).width(800).url()}
                      alt={post.mainImage.alt || post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area with Rich Text Components */}
      <article className="pb-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <PortableText 
              value={post.body} 
              components={portableTextComponents}
            />
          </div>
        </div>
      </article>

      {/* Author Box */}
      {post.author && (
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl p-8 border border-gray-200">
                <div className="flex items-start space-x-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent-blue flex items-center justify-center text-white font-bold text-3xl flex-shrink-0">
                    {post.author[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-500 mb-2">About the author</p>
                    <h3 className="text-2xl font-bold text-primary mb-3">{post.author}</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Greece travel expert and local insider with years of experience exploring 
                      the islands and mainland. Passionate about sharing authentic experiences 
                      and hidden gems with fellow travelers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA to Blog */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Link 
              href="/blog"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-primary text-white rounded-full font-bold hover:bg-accent-blue transition-all hover:scale-105"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Read More Articles</span>
            </Link>
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
