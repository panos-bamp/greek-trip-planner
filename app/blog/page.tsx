import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Calendar, User } from "lucide-react"
import { Metadata } from "next"
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'

export const metadata: Metadata = {
  title: "Travel Blog | Greek Trip Planner",
  description: "Discover travel tips, guides, and stories about Greece and the Greek islands.",
}

export const revalidate = 60

async function getAllPosts() {
  try {
    const query = `*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      mainImage,
      author,
      categories
    }`
    return await client.fetch(query)
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  // Helper function to get author name
  const getAuthorName = (author: any) => {
    if (!author) return null
    if (typeof author === 'string') return author
    if (author.name) return author.name
    return null
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation - Match home page */}
      <nav className="fixed top-0 w-full bg-white shadow-sm z-50">
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
              <Link href="/blog" className="text-gray-700 hover:text-primary transition font-medium">Blog</Link>
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

      {/* Add padding for fixed nav */}
      <div className="pt-24">
        {/* Hero Section */}
        <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600">
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="container mx-auto px-6 relative z-10 text-center text-white">
            <p className="text-blue-200 uppercase tracking-widest text-sm mb-4 font-semibold">Our Stories</p>
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              Travel Blog
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto">
              Stories, guides, and insider tips for exploring Greece
            </p>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            {posts && posts.length > 0 ? (
              <>
                {/* Featured Post */}
                {posts[0] && (
                  <div className="mb-16">
                    <Link href={`/blog/${posts[0].slug.current}`} className="group">
                      <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
                          {posts[0].mainImage ? (
                            <Image
                              src={urlFor(posts[0].mainImage).width(800).height(600).url()}
                              alt={posts[0].title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                              <span className="text-gray-400">No image</span>
                            </div>
                          )}
                        </div>
                        <div>
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 font-bold uppercase tracking-wider text-sm">
                            Featured Article
                          </span>
                          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4 group-hover:text-blue-600 transition-colors">
                            {posts[0].title}
                          </h2>
                          <div className="flex items-center gap-4 text-gray-500 mb-4 text-sm">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              <time>
                                {new Date(posts[0].publishedAt).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </time>
                            </div>
                            {getAuthorName(posts[0].author) && (
                              <div className="flex items-center gap-2">
                                <User className="h-4 w-4" />
                                <span>{getAuthorName(posts[0].author)}</span>
                              </div>
                            )}
                          </div>
                          {posts[0].excerpt && (
                            <p className="text-gray-600 text-lg mb-6 line-clamp-3">
                              {posts[0].excerpt}
                            </p>
                          )}
                          <span className="inline-flex items-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 font-bold">
                            Read Article
                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform text-pink-500" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                )}

                {/* Rest of Posts */}
                {posts.length > 1 && (
                  <>
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Latest Articles</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {posts.slice(1).map((post: any) => (
                        <article key={post._id} className="group">
                          <Link href={`/blog/${post.slug.current}`}>
                            <div className="relative h-56 rounded-xl overflow-hidden mb-4 shadow-lg">
                              {post.mainImage ? (
                                <Image
                                  src={urlFor(post.mainImage).width(600).height(400).url()}
                                  alt={post.title}
                                  fill
                                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                              ) : (
                                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                                  <span className="text-gray-400">No image</span>
                                </div>
                              )}
                            </div>
                            
                            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                              {post.title}
                            </h3>
                            
                            <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                              <Calendar className="h-4 w-4" />
                              <time>
                                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </time>
                            </div>
                            
                            {post.excerpt && (
                              <p className="text-gray-600 line-clamp-2 mb-3 text-sm">
                                {post.excerpt}
                              </p>
                            )}
                            
                            <span className="inline-flex items-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 font-semibold text-sm">
                              Read More
                              <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform text-pink-500" />
                            </span>
                          </Link>
                        </article>
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="text-center py-20">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calendar className="h-12 w-12 text-blue-600/50" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Coming Soon</h2>
                <p className="text-gray-600 max-w-md mx-auto">
                  We're working on exciting travel stories and guides. Check back soon!
                </p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 gradient-primary text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Experience Greece?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Let us help you plan your perfect Greek adventure
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/quiz" 
                className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-full hover:bg-pink-50 hover:shadow-lg transition-all"
              >
                Start Planning Your Trip
              </Link>
              <Link 
                href="/features" 
                className="px-8 py-3 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-blue-600 transition-all"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Footer - Match home page */}
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
              <Link href="/blog" className="text-white/80 hover:text-white transition text-sm">Blog</Link>
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
                    width={234}
                    height={39}
                    className="h-auto"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
