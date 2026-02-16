import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { generateAllSchemas } from '@/lib/schemaMarkup'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

const BASE_URL = 'https://greektriplanner.me'

export const dynamic = 'force-dynamic'
export const revalidate = 3600

// PortableText components - using urlFor like the working example!
const components = {
    block: {
    h1: ({children}: any) => <h1 className="text-4xl font-bold mt-8 mb-4">{children}</h1>,
    h2: ({children}: any) => <h2 className="text-3xl font-bold mt-8 mb-4">{children}</h2>,
    h3: ({children}: any) => <h3 className="text-2xl font-bold mt-6 mb-3">{children}</h3>,
    h4: ({children}: any) => <h4 className="text-xl font-bold mt-4 mb-2">{children}</h4>,
    normal: ({children}: any) => <p className="text-lg leading-relaxed mb-4 text-gray-700">{children}</p>,
    blockquote: ({children}: any) => (
      <blockquote className="border-l-4 border-blue-500 pl-6 py-2 my-6 italic bg-blue-50 rounded">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({children}: any) => <ul className="list-disc ml-6 mb-6 space-y-2">{children}</ul>,
    number: ({children}: any) => <ol className="list-decimal ml-6 mb-6 space-y-2">{children}</ol>,
  },
  listItem: {
    bullet: ({children}: any) => <li className="text-lg text-gray-700">{children}</li>,
    number: ({children}: any) => <li className="text-lg text-gray-700">{children}</li>,
  },
  marks: {
    strong: ({children}: any) => <strong className="font-bold">{children}</strong>,
    em: ({children}: any) => <em className="italic">{children}</em>,
    link: ({value, children}: any) => {
      const target = value?.href?.startsWith('http') ? '_blank' : undefined
      return (
        <a 
          href={value?.href} 
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          className="text-blue-600 hover:text-blue-800 underline font-medium"
        >
          {children}
        </a>
      )
    },
  },
  // IMAGE HANDLER - Using urlFor like the working example!
  types: {
    image: ({value}: any) => {
      if (!value) return null
      
      return (
        <figure className="my-8">
          <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden">
            <Image
              src={urlFor(value).width(1200).url()}
              alt={value.alt || 'Blog post image'}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-3 text-center text-sm text-gray-600 italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
}

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

        {/* Navigation */}
        <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-50 border-b border-[#E6DAD1]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <Image src="/logo.png" alt="Greek Trip Planner" width={70} height={21} priority />
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link href="/how-it-works" className="text-[#180204]/70 hover:text-[#FF5635] transition-colors text-sm font-medium">How it Works</Link>
              <Link href="/blog" className="text-[#180204]/70 hover:text-[#FF5635] transition-colors text-sm font-medium">Blog</Link>
              <Link href="/about" className="text-[#180204]/70 hover:text-[#FF5635] transition-colors text-sm font-medium">About</Link>
              <Link href="/ai-trip-planner" className="bg-[#FF5635] hover:bg-[#e64d2e] text-white px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 transition-colors">
                Start Planning <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <Link href="/ai-trip-planner" className="md:hidden bg-[#FF5635] text-white px-4 py-2 rounded-full text-sm font-semibold">
              Start Planning
            </Link>
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

            {/* Body Content with PortableText */}
            {post.body && (
              <div className="prose prose-lg max-w-none">
                <PortableText value={post.body} components={components} />
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

        {/* Footer */}
        <footer className="bg-[#180204] py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center">
              <Image src="/logo.png" alt="Greek Trip Planner" width={70} height={21} className="brightness-0 invert mb-6" />
              <div className="flex flex-wrap justify-center gap-6 mb-8">
                <Link href="/how-it-works" className="text-white/60 hover:text-[#FF5635] transition-colors text-sm">How it Works</Link>
                <Link href="/blog" className="text-white/60 hover:text-[#FF5635] transition-colors text-sm">Blog</Link>
                <Link href="/about" className="text-white/60 hover:text-[#FF5635] transition-colors text-sm">About</Link>
                <Link href="/editorial-policy" className="text-white/60 hover:text-[#FF5635] transition-colors text-sm">Editorial Policy</Link>
              </div>
              <div className="border-t border-white/10 w-full pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-white/40 text-sm">&copy; 2026 Greek Trip Planner. All rights reserved.</p>
                <div className="flex items-center gap-4">
                  <a href="https://traveltourismdirectory.com/" className="text-white/40 hover:text-white/60 transition-colors text-sm" target="_blank" rel="noopener noreferrer">Travel and Tourism Directory</a>
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
  } catch (error) {
    console.error('Page error:', error)
    notFound()
  }
}
