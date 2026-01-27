import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { client } from '@/sanity/lib/client'
import { generateAllSchemas } from '@/lib/schemaMarkup'

// Affiliate Components
import { AffiliateDisclosure } from '@/components/affiliate/AffiliateDisclosure'
import { HotelCard } from '@/components/affiliate/HotelCard'
import { TourCard } from '@/components/affiliate/TourCard'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://greektriplanner.me'

export const dynamic = 'force-dynamic'
export const revalidate = 3600

async function getPost(slug: string) {
  if (!slug) {
    console.error('No slug provided to getPost')
    return null
  }

  try {
    const query = `*[_type == "post" && slug.current == $slug][0]{
      ...,
      mainImage{
        asset->{
          url
        }
      }
    }`
    
    const post = await client.fetch(query, { slug })
    return post
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> | { slug: string } }
): Promise<Metadata> {
  try {
    // Handle both async and sync params (Next.js 15+ compatibility)
    const resolvedParams = await Promise.resolve(params)
    const slug = resolvedParams.slug
    
    if (!slug) {
      return { title: 'Post Not Found' }
    }

    const post = await getPost(slug)
    if (!post) {
      return { title: 'Post Not Found' }
    }

    const metaTitle = post.metaTitle || post.title
    const metaDescription = post.metaDescription || post.excerpt
    const ogImage = post.ogImage || post.mainImage?.asset?.url
    const canonicalUrl = post.canonicalUrl || `${BASE_URL}/blog/${slug}`

    return {
      title: metaTitle,
      description: metaDescription,
      alternates: {
        canonical: canonicalUrl,
      },
      openGraph: {
        title: post.ogTitle || metaTitle,
        description: post.ogDescription || metaDescription,
        images: ogImage ? [{ url: ogImage }] : [],
        type: 'article',
        publishedTime: post.publishedAt,
        modifiedTime: post._updatedAt,
        authors: post.author ? [post.author] : [],
      },
      twitter: {
        card: post.twitterCard || 'summary_large_image',
        title: post.twitterTitle || post.ogTitle || metaTitle,
        description: post.twitterDescription || post.ogDescription || metaDescription,
        images: ogImage ? [ogImage] : [],
      },
      keywords: post.focusKeyword
        ? [post.focusKeyword, ...(post.categories || [])]
        : post.categories || [],
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return { title: 'Blog Post' }
  }
}

export default async function BlogPost(
  { params }: { params: Promise<{ slug: string }> | { slug: string } }
) {
  try {
    // Handle both async and sync params (Next.js 15+ compatibility)
    const resolvedParams = await Promise.resolve(params)
    const slug = resolvedParams.slug
    
    if (!slug) {
      console.error('No slug in params')
      notFound()
    }

    const post = await getPost(slug)
    if (!post) {
      notFound()
    }

    // Generate schema markup
    let schemas: any[] = []
    try {
      schemas = generateAllSchemas(post, BASE_URL)
    } catch (error) {
      console.error('Error generating schemas:', error)
    }

    return (
      <>
        {/* Schema Markup */}
        {schemas.length > 0 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
            suppressHydrationWarning
          />
        )}

        <article className="max-w-4xl mx-auto px-4 py-8">
          <AffiliateDisclosure />

          {/* Urgency Alert */}
          {post.urgencyMessage && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <svg className="h-5 w-5 text-orange-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-orange-800 font-medium">{post.urgencyMessage}</p>
              </div>
            </div>
          )}

          {/* Header */}
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            {post.author && (
              <p className="text-gray-600">
                By {post.author}
                {post.publishedAt && ` • ${new Date(post.publishedAt).toLocaleDateString()}`}
              </p>
            )}
            {post.categories && post.categories.length > 0 && (
              <div className="flex gap-2 mt-3">
                {post.categories.map((category: string, index: number) => (
                  <span key={index} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                    {category}
                  </span>
                ))}
              </div>
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

          {/* Body Content */}
          {post.body && (
            <div className="prose prose-lg max-w-none mb-12">
              <PortableText value={post.body} />
            </div>
          )}

          {/* FAQ Section */}
          {post.faqSchema?.enabled && post.faqSchema?.faqs?.length > 0 && (
            <section className="mb-12 bg-gray-50 rounded-lg p-8">
              <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {post.faqSchema.faqs.map((faq: any, i: number) => (
                  <div key={i} className="border-b border-gray-200 pb-6 last:border-0">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{faq.question}</h3>
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Hotels */}
          {post.affiliateHotels?.length > 0 && (
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Recommended Hotels</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {post.affiliateHotels.map((hotel: any, i: number) => (
                  <HotelCard key={i} {...hotel} />
                ))}
              </div>
            </section>
          )}

          {/* Tours */}
          {post.affiliateTours?.length > 0 && (
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Top Tours & Activities</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {post.affiliateTours.map((tour: any, i: number) => (
                  <TourCard key={i} {...tour} />
                ))}
              </div>
            </section>
          )}

          {/* Insurance CTA */}
          {post.insuranceLink && (
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 rounded-lg p-6 my-8">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-12 w-12 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">✈️ Don't Forget Travel Insurance!</h3>
                  <p className="text-gray-700 mb-4">
                    Protect your trip with comprehensive travel insurance.
                  </p>
                  <a
                    href={post.insuranceLink}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
                  >
                    Get a Free Quote
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Cost Breakdown */}
          {post.costBreakdown?.length > 0 && (
            <div className="my-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">💰 Trip Cost Breakdown</h3>
              <div className="overflow-x-auto">
                <table className="w-full bg-white rounded-lg shadow-md">
                  <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold">Category</th>
                      <th className="px-6 py-4 text-center font-semibold">Budget</th>
                      <th className="px-6 py-4 text-center font-semibold">Mid-Range</th>
                      <th className="px-6 py-4 text-center font-semibold">Luxury</th>
                    </tr>
                  </thead>
                  <tbody>
                    {post.costBreakdown.map((cost: any, index: number) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="px-6 py-4 font-medium text-gray-900">{cost.category}</td>
                        <td className="px-6 py-4 text-center text-gray-700">{cost.budget}</td>
                        <td className="px-6 py-4 text-center text-gray-700">{cost.mid}</td>
                        <td className="px-6 py-4 text-center text-gray-700">{cost.luxury}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Pro Tips */}
          {post.proTips?.length > 0 && (
            <section className="mb-12">
              {post.proTips.map((tip: string, index: number) => (
                <div key={index} className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-500 rounded-r-lg p-5 my-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h4 className="text-sm font-bold text-gray-900 mb-1">💡 Pro Tip</h4>
                      <p className="text-sm text-gray-800">{tip}</p>
                    </div>
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Final CTA */}
          {(post.finalCtaBookingLink || post.finalCtaToursLink) && (
            <div className="bg-blue-600 text-white rounded-lg p-8 my-12 text-center">
              <h2 className="text-2xl font-bold mb-4">🇬🇷 Ready to Plan Your Trip?</h2>
              <div className="flex gap-4 justify-center flex-wrap">
                {post.finalCtaBookingLink && (
                  <a
                    href={post.finalCtaBookingLink}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
                  >
                    Book Hotels
                  </a>
                )}
                {post.finalCtaToursLink && (
                  <a
                    href={post.finalCtaToursLink}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600"
                  >
                    Book Tours
                  </a>
                )}
              </div>
            </div>
          )}
        </article>
      </>
    )
  } catch (error) {
    console.error('Error in BlogPost component:', error)
    notFound()
  }
}
