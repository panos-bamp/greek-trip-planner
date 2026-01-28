import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { client } from '@/sanity/lib/client'
import { generateAllSchemas } from '@/lib/schemaMarkup'
import { portableTextComponents } from '@/components/portableTextComponents'

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

        <article className="max-w-[70rem] mx-auto px-6 py-12">
          <AffiliateDisclosure />

          {/* Urgency Alert */}
          {post.urgencyMessage && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-8">
              <div className="flex items-center">
                <svg className="h-5 w-5 text-orange-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-orange-800 font-medium">{post.urgencyMessage}</p>
              </div>
            </div>
          )}

          {/* Header */}
          <header className="mb-10">
            {/* Categories */}
            {post.categories && post.categories.length > 0 && (
              <div className="flex gap-2 mb-4">
                {post.categories.map((category: string, index: number) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full"
                  >
                    {category}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-[2.375rem] leading-[1.1] font-bold text-gray-900 mb-4">
              {post.title}
            </h1>

            {/* Meta Info */}
            <div className="flex items-center text-gray-600 text-sm space-x-4">
              {post.author && (
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  {post.author}
                </span>
              )}
              {post.publishedAt && (
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              )}
            </div>
          </header>

          {/* Featured Image */}
          {post.mainImage?.asset?.url && (
            <div className="mb-10">
              <img
                src={post.mainImage.asset.url}
                alt={post.title}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          )}

          {/* Excerpt */}
          {post.excerpt && (
            <div className="text-xl text-gray-700 mb-8 pb-8 border-b-2 border-gray-200 italic">
              {post.excerpt}
            </div>
          )}

          {/* Body Content with Rich Text Formatting */}
          {post.body && (
            <div className="prose-custom mb-12">
              <PortableText 
                value={post.body} 
                components={portableTextComponents}
              />
            </div>
          )}

          {/* FAQ Section */}
          {post.faqSchema?.enabled && post.faqSchema?.faqs?.length > 0 && (
            <section className="my-16 bg-gray-50 rounded-xl p-8 border border-gray-200">
              <h2 className="text-[2.375rem] leading-[1.1] font-bold text-gray-900 mb-8">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {post.faqSchema.faqs.map((faq: any, i: number) => (
                  <div key={i} className="border-b border-gray-300 pb-6 last:border-0">
                    <h3 className="text-[1.75rem] leading-[1.2] font-bold text-gray-900 mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-[1.125rem] leading-[1.5] text-gray-700">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Hotels */}
          {post.affiliateHotels?.length > 0 && (
            <section className="my-16">
              <h2 className="text-[2.375rem] leading-[1.1] font-bold text-gray-900 mb-8">
                Recommended Hotels
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {post.affiliateHotels.map((hotel: any, i: number) => (
                  <HotelCard key={i} {...hotel} />
                ))}
              </div>
            </section>
          )}

          {/* Tours */}
          {post.affiliateTours?.length > 0 && (
            <section className="my-16">
              <h2 className="text-[2.375rem] leading-[1.1] font-bold text-gray-900 mb-8">
                Top Tours & Activities
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {post.affiliateTours.map((tour: any, i: number) => (
                  <TourCard key={i} {...tour} />
                ))}
              </div>
            </section>
          )}

          {/* Insurance CTA */}
          {post.insuranceLink && (
            <div className="my-16 bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 rounded-xl p-8">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-12 w-12 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div className="ml-6 flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    ✈️ Don't Forget Travel Insurance!
                  </h3>
                  <p className="text-lg text-gray-700 mb-5 leading-relaxed">
                    Protect your trip with comprehensive travel insurance. Cover cancellations, 
                    medical emergencies, lost luggage, and more.
                  </p>
                  <a
                    href={post.insuranceLink}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors shadow-md hover:shadow-lg"
                  >
                    Get a Free Quote
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Cost Breakdown */}
          {post.costBreakdown?.length > 0 && (
            <div className="my-16">
              <h3 className="text-[1.75rem] leading-[1.2] font-bold text-gray-900 mb-6">
                💰 Trip Cost Breakdown
              </h3>
              <div className="overflow-x-auto shadow-lg rounded-lg">
                <table className="w-full bg-white">
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
                      <tr 
                        key={index} 
                        className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}
                      >
                        <td className="px-6 py-4 font-semibold text-gray-900">{cost.category}</td>
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
            <section className="my-16">
              {post.proTips.map((tip: string, index: number) => (
                <div key={index} className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-500 rounded-r-lg p-6 my-6 shadow-md">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-7 w-7 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-base font-bold text-gray-900 mb-2">💡 Pro Tip</h4>
                      <p className="text-base text-gray-800 leading-relaxed">{tip}</p>
                    </div>
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Final CTA */}
          {(post.finalCtaBookingLink || post.finalCtaToursLink) && (
            <div className="my-16 bg-gradient-to-br from-blue-600 to-purple-700 text-white rounded-2xl p-10 text-center shadow-xl">
              <h2 className="text-3xl font-bold mb-4">🇬🇷 Ready to Plan Your Greek Adventure?</h2>
              <p className="text-xl mb-8 text-blue-100">
                Book your accommodation and tours today to secure the best rates!
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                {post.finalCtaBookingLink && (
                  <a
                    href={post.finalCtaBookingLink}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="bg-white text-blue-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl"
                  >
                    🏨 Book Hotels
                  </a>
                )}
                {post.finalCtaToursLink && (
                  <a
                    href={post.finalCtaToursLink}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="bg-orange-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-600 transition-colors shadow-lg hover:shadow-xl"
                  >
                    🎭 Book Tours
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
