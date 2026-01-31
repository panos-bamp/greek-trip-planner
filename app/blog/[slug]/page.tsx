import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { client } from '@/sanity/lib/client'
import { generateAllSchemas } from '@/lib/schemaMarkup'
import { portableTextComponents } from '@/components/portableTextComponents'  // ← ADD THIS!
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

const BASE_URL = 'https://greektriplanner.me'

export const dynamic = 'force-dynamic'
export const revalidate = 3600

async function getPost(slug: string) {
  if (!slug) return null
  try {
    const query = `*[_type == "post" && slug.current == $slug][0]{
      ...,
      mainImage{asset->{url}}
    }`
    return await client.fetch(query, { slug })
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> | { slug: string } }
): Promise<Metadata> {
  try {
    const resolvedParams = await Promise.resolve(params)
    const post = await getPost(resolvedParams.slug)
    if (!post) return { title: 'Post Not Found' }

    return {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
    }
  } catch (error) {
    return { title: 'Blog Post' }
  }
}

export default async function BlogPost(
  { params }: { params: Promise<{ slug: string }> | { slug: string } }
) {
  try {
    const resolvedParams = await Promise.resolve(params)
    const slug = resolvedParams.slug
    
    if (!slug) notFound()
    
    const post = await getPost(slug)
    if (!post) notFound()

    // Generate schema
    let schemas: any[] = []
    try {
      schemas = generateAllSchemas(post, BASE_URL)
    } catch (error) {
      console.error('Schema error:', error)
    }

    return (
      <main className="min-h-screen">
        {/* Schema Markup */}
        {schemas.length > 0 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
            suppressHydrationWarning
          />
        )}

        {/* Navigation - Exact match from home page */}
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

        {/* Main Content - Add padding for fixed nav */}
        <div className="pt-24">
          <article className="max-w-4xl mx-auto px-6 py-12">
            {/* Title */}
            <header className="mb-8">
              <h1 className="text-5xl font-bold mb-4">{post.title}</h1>
              {post.author && (
                <p className="text-gray-600">
                  By {post.author}
                  {post.publishedAt && ` • ${new Date(post.publishedAt).toLocaleDateString()}`}
                </p>
              )}
            </header>

            {/* Featured Image */}
            {post.mainImage?.asset?.url && (
              <img
                src={post.mainImage.asset.url}
                alt={post.title}
                className="w-full h-auto rounded-lg mb-8"
              />
            )}

            {/* Excerpt */}
            {post.excerpt && (
              <div className="text-xl text-gray-600 mb-8 italic border-l-4 border-blue-500 pl-4">
                {post.excerpt}
              </div>
            )}

            {/* Body Content - NOW USING portableTextComponents! */}
            {post.body && (
              <div className="prose prose-lg max-w-none">
                <PortableText value={post.body} components={portableTextComponents} />
              </div>
            )}

            {/* FAQ */}
            {post.faqSchema?.enabled && post.faqSchema?.faqs?.length > 0 && (
              <section className="mt-12 bg-gray-50 rounded-lg p-8">
                <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
                {post.faqSchema.faqs.map((faq: any, i: number) => (
                  <div key={i} className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                ))}
              </section>
            )}
          </article>
        </div>

        {/* Footer - Exact match from home page */}
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
      </main>
    )
  } catch (error) {
    console.error('Page error:', error)
    notFound()
  }
}
