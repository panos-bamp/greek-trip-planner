import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { client } from '@/sanity/lib/client'
import { generateAllSchemas } from '@/lib/schemaMarkup'

// Affiliate Components - Only use the ones that definitely work
import { AffiliateDisclosure } from '@/components/affiliate/AffiliateDisclosure'
import { HotelCard } from '@/components/affiliate/HotelCard'
import { TourCard } from '@/components/affiliate/TourCard'

// Your site base URL
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://greektriplanner.me'

export const dynamic = 'force-dynamic'
export const revalidate = 3600

// Fetch post from Sanity
async function getPost(slug: string) {
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
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = await getPost(params.slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  const metaTitle = post.metaTitle || post.title
  const metaDescription = post.metaDescription || post.excerpt
  const ogImage = post.ogImage || post.mainImage?.asset?.url
  const canonicalUrl = post.canonicalUrl || `${BASE_URL}/blog/${params.slug}`

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
      authors: [post.author],
    },
    twitter: {
      card: post.twitterCard || 'summary_large_image',
      title: post.twitterTitle || post.ogTitle || metaTitle,
      description: post.twitterDescription || post.ogDescription || metaDescription,
      images: ogImage ? [ogImage] : [],
    },
    keywords: post.focusKeyword
      ? [post.focusKeyword, ...(post.categories || [])]
      : post.categories,
  }
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)

  if (!post) {
    notFound()
  }

  // Generate all schema markup JSON-LD
  const schemas = generateAllSchemas(post, BASE_URL)

  return (
    <>
      {/* Schema Markup - JSON-LD for SEO */}
      {schemas && schemas.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemas),
          }}
          key="schema-markup"
        />
      )}

      {/* Blog Post Content */}
      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Affiliate Disclosure */}
        <AffiliateDisclosure />

        {/* Urgency Alert - Inline */}
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

        {/* Post Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          {post.author && (
            <p className="text-gray-600">
              By {post.author} • {new Date(post.publishedAt).toLocaleDateString()}
            </p>
          )}
          {post.categories && post.categories.length > 0 && (
            <div className="flex gap-2 mt-3">
              {post.categories.map((category: string, index: number) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                >
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
            alt={post.mainImage.alt || post.title}
            className="w-full h-auto rounded-lg mb-8"
          />
        )}

        {/* Excerpt */}
        {post.excerpt && (
          <div className="text-xl text-gray-600 mb-8 italic border-l-4 border-blue-500 pl-4">
            {post.excerpt}
          </div>
        )}

        {/* Post Content (Portable Text) */}
        <div className="prose prose-lg max-w-none mb-12">
          <PortableText value={post.body} />
        </div>

        {/* FAQ Section - If FAQ Schema is enabled */}
        {post.faqSchema?.enabled && post.faqSchema?.faqs && post.faqSchema.faqs.length > 0 && (
          <section className="mb-12 bg-gray-50 rounded-lg p-8">
            <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {post.faqSchema.faqs.map((faq: any, index: number) => (
                <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Affiliate Hotels */}
        {post.affiliateHotels && post.affiliateHotels.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Recommended Hotels</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {post.affiliateHotels.map((hotel: any, index: number) => (
                <HotelCard key={index} {...hotel} />
              ))}
            </div>
          </section>
        )}

        {/* Affiliate Tours */}
        {post.affiliateTours && post.affiliateTours.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Top Tours & Activities</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {post.affiliateTours.map((tour: any, index: number) => (
                <TourCard key={index} {...tour} />
              ))}
            </div>
          </section>
        )}

        {/* Insurance CTA - Inline */}
        {post.insuranceLink && (
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 rounded-lg p-6 my-8">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-12 w-12 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="ml-4 flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  ✈️ Don't Forget Travel Insurance!
                </h3>
                <p className="text-gray-700 mb-4">
                  Protect your trip with comprehensive travel insurance. Cover cancellations, medical emergencies, 
                  lost luggage, and more. Get peace of mind for just a few euros per day.
                </p>
                <ul className="mb-4 space-y-2">
                  <li className="flex items-center text-sm text-gray-700">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Trip cancellation & interruption coverage
                  </li>
                  <li className="flex items-center text-sm text-gray-700">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Emergency medical & dental expenses
                  </li>
                  <li className="flex items-center text-sm text-gray-700">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    24/7 emergency assistance
                  </li>
                </ul>
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

        {/* Cost Breakdown - Inline */}
        {post.costBreakdown && post.costBreakdown.length > 0 && (
          <div className="my-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">💰 Trip Cost Breakdown</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow-md overflow-hidden">
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
                      <td className="px-6 py-4 font-medium text-gray-900">{cost.category}</td>
                      <td className="px-6 py-4 text-center text-gray-700">{cost.budget}</td>
                      <td className="px-6 py-4 text-center text-gray-700">{cost.mid}</td>
                      <td className="px-6 py-4 text-center text-gray-700">{cost.luxury}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <p className="text-sm text-blue-800">
                <strong>💡 Pro Tip:</strong> These are estimated daily costs. Booking in advance and traveling 
                during shoulder season (April-May, September-October) can save you 20-30% on accommodation and tours.
              </p>
            </div>
          </div>
        )}

        {/* Pro Tips - Inline */}
        {post.proTips && post.proTips.length > 0 && (
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

        {/* Final CTA - Inline */}
        {post.finalCtaBookingLink && post.finalCtaToursLink && (
          <div className="bg-gradient-to-br from-blue-600 to-purple-700 text-white rounded-2xl p-8 my-12">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">🇬🇷 Ready to Start Planning Your Greek Adventure?</h2>
              <p className="text-xl mb-8 text-blue-100">
                Don't wait! Peak season fills up fast. Book your accommodation and tours today to secure the best rates.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <div className="text-4xl mb-3">🏨</div>
                  <h3 className="text-xl font-bold mb-2">Book Your Hotels</h3>
                  <p className="text-blue-100 text-sm mb-4">
                    Free cancellation on most properties. Reserve now, pay later!
                  </p>
                  <a
                    href={post.finalCtaBookingLink}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="inline-block w-full bg-white text-blue-700 font-bold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    Find Hotels →
                  </a>
                </div>
                
                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <div className="text-4xl mb-3">🎭</div>
                  <h3 className="text-xl font-bold mb-2">Book Tours & Activities</h3>
                  <p className="text-blue-100 text-sm mb-4">
                    Skip-the-line tickets, guided tours, and unique experiences.
                  </p>
                  <a
                    href={post.finalCtaToursLink}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="inline-block w-full bg-orange-500 text-white font-bold px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    Browse Tours →
                  </a>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-white/20">
                <p className="text-sm text-blue-100">
                  ⭐ By booking through our links, you support our free travel guides at no extra cost to you!
                </p>
              </div>
            </div>
          </div>
        )}
      </article>
    </>
  )
}
