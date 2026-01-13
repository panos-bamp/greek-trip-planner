/**
 * Blog Post Page with Affiliate Support
 * Conditionally renders affiliate components based on post settings
 * 
 * Location: app/blog/[slug]/page.tsx
 */

import Link from 'next/link'
import Image from 'next/image'
import { client, urlFor } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'
import { portableTextComponents } from '@/components/portableTextComponents'
import { ArrowLeft, Calendar, Clock } from 'lucide-react'

// Affiliate Components
import { AffiliateDisclosure } from '@/components/affiliate/AffiliateDisclosure'
import { UrgencyAlert } from '@/components/affiliate/UrgencyAlert'
import { HotelCard } from '@/components/affiliate/HotelCard'
import { TourCard } from '@/components/affiliate/TourCard'
import { InsuranceCta } from '@/components/affiliate/InsuranceCta'
import { CostSummaryCards } from '@/components/affiliate/CostSummaryCards'
import { FinalCtaSection } from '@/components/affiliate/FinalCtaSection'

export const dynamic = 'force-dynamic'
export const revalidate = 3600

interface Post {
  title: string
  slug: { current: string }
  mainImage?: any
  body: any[]
  author?: string
  publishedAt?: string
  categories?: string[]
  excerpt?: string
  // Affiliate fields
  isAffiliate?: boolean
  showDisclosure?: boolean
  disclosureText?: string
  urgencyAlert?: {
    enabled: boolean
    title: string
    message: string
    primaryCta?: string
    primaryLink?: string
    secondaryCta?: string
    secondaryLink?: string
  }
  costSummary?: {
    enabled: boolean
    budgetTier: { priceRange: string; includes: string[]; ctaLink?: string }
    midRangeTier: { priceRange: string; includes: string[]; ctaLink?: string }
    luxuryTier: { priceRange: string; includes: string[]; ctaLink?: string }
  }
  hotelRecommendations?: Array<{
    name: string
    tier: 'budget' | 'mid-range' | 'luxury'
    badge?: string
    stars: number
    image?: any
    location: string
    description: string
    priceFrom: string
    rating?: string
    reviewCount?: string
    highlights?: string[]
    proTip?: string
    bookingUrl: string
    ctaText?: string
  }>
  tourRecommendations?: Array<{
    name: string
    badge?: string
    image?: any
    duration: string
    description: string
    price: string
    rating?: string
    reviewCount?: string
    includes?: string[]
    whyBook?: string
    bookingUrl: string
    ctaText?: string
  }>
  insuranceCta?: {
    enabled: boolean
    title?: string
    description?: string
    testimonial?: string
    testimonialAuthor?: string
    features?: string[]
    priceFrom?: string
    pricePeriod?: string
    discountCode?: string
    discountPercent?: string
    bookingUrl: string
    ctaText?: string
  }
  finalCta?: {
    enabled: boolean
    title?: string
    subtitle?: string
    pathways?: Array<{
      icon: string
      title: string
      description: string
      ctaText: string
      ctaUrl: string
      isFeatured?: boolean
    }>
  }
}

async function getPost(slug: string): Promise<Post | null> {
  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      title,
      slug,
      mainImage,
      body,
      author,
      publishedAt,
      categories,
      excerpt,
      isAffiliate,
      showDisclosure,
      disclosureText,
      urgencyAlert,
      costSummary,
      hotelRecommendations[] {
        name, tier, badge, stars, image, location, description,
        priceFrom, rating, reviewCount, highlights, proTip, bookingUrl, ctaText
      },
      tourRecommendations[] {
        name, badge, image, duration, description, price,
        rating, reviewCount, includes, whyBook, bookingUrl, ctaText
      },
      insuranceCta,
      finalCta
    }`,
    { slug }
  )
  return post
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function estimateReadingTime(body: any[]) {
  const text = JSON.stringify(body)
  const words = text.split(/\s+/).length
  return Math.ceil(words / 200)
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    return (
      <div className="min-h-screen py-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">Post not found</h1>
          <Link href="/blog" className="text-accent-blue hover:underline">← Back to Blog</Link>
        </div>
      </div>
    )
  }

  const readingTime = estimateReadingTime(post.body)
  const isAffiliate = post.isAffiliate === true

  return (
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white border-b border-gray-200 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <Image src="/logo.png" alt="Greek Trip Planner" width={70} height={21} priority />
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
            <Link href="/blog" className="inline-flex items-center space-x-2 text-gray-600 hover:text-primary transition font-medium">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Blog</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="pb-12 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-5 gap-16 items-start">
              {/* Left: Title, Excerpt, Author */}
              <div className="md:col-span-3">
                {post.categories && post.categories.length > 0 && (
                  <div className="mb-6">
                    <span className="inline-block px-4 py-2 bg-accent-lightblue text-primary text-sm font-bold rounded-full">
                      {post.categories[0]}
                    </span>
                  </div>
                )}

                <h1 className="text-5xl md:text-6xl font-black text-primary mb-6 leading-tight" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
                  {post.title}
                </h1>

                {post.excerpt && (
                  <p className="text-2xl text-gray-600 mb-8 leading-relaxed">{post.excerpt}</p>
                )}

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent-blue flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    {post.author ? post.author[0].toUpperCase() : 'G'}
                  </div>
                  <div>
                    <div className="font-semibold text-primary">{post.author || 'Greek Trip Planner'}</div>
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

      {/* Content Area */}
      <article className="pb-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            
            {/* ═══════════════════════════════════════════════════════════
                AFFILIATE: Top Disclosure
                ═══════════════════════════════════════════════════════════ */}
            {isAffiliate && post.showDisclosure !== false && (
              <AffiliateDisclosure position="top" customText={post.disclosureText} />
            )}

            {/* ═══════════════════════════════════════════════════════════
                AFFILIATE: Urgency Alert
                ═══════════════════════════════════════════════════════════ */}
            {isAffiliate && post.urgencyAlert?.enabled && (
              <UrgencyAlert
                title={post.urgencyAlert.title}
                message={post.urgencyAlert.message}
                primaryCta={post.urgencyAlert.primaryCta}
                primaryLink={post.urgencyAlert.primaryLink}
                secondaryCta={post.urgencyAlert.secondaryCta}
                secondaryLink={post.urgencyAlert.secondaryLink}
              />
            )}

            {/* ═══════════════════════════════════════════════════════════
                AFFILIATE: Cost Summary Cards
                ═══════════════════════════════════════════════════════════ */}
            {isAffiliate && post.costSummary?.enabled && (
              <CostSummaryCards
                budgetTier={post.costSummary.budgetTier}
                midRangeTier={post.costSummary.midRangeTier}
                luxuryTier={post.costSummary.luxuryTier}
              />
            )}

            {/* ═══════════════════════════════════════════════════════════
                AFFILIATE: Insurance CTA (Early placement)
                ═══════════════════════════════════════════════════════════ */}
            {isAffiliate && post.insuranceCta?.enabled && (
              <InsuranceCta
                title={post.insuranceCta.title}
                description={post.insuranceCta.description}
                testimonial={post.insuranceCta.testimonial}
                testimonialAuthor={post.insuranceCta.testimonialAuthor}
                features={post.insuranceCta.features}
                priceFrom={post.insuranceCta.priceFrom}
                pricePeriod={post.insuranceCta.pricePeriod}
                discountCode={post.insuranceCta.discountCode}
                discountPercent={post.insuranceCta.discountPercent}
                bookingUrl={post.insuranceCta.bookingUrl}
                ctaText={post.insuranceCta.ctaText}
              />
            )}

            {/* ═══════════════════════════════════════════════════════════
                MAIN CONTENT (PortableText)
                ═══════════════════════════════════════════════════════════ */}
            <PortableText value={post.body} components={portableTextComponents} />

            {/* ═══════════════════════════════════════════════════════════
                AFFILIATE: Hotel Recommendations
                ═══════════════════════════════════════════════════════════ */}
            {isAffiliate && post.hotelRecommendations && post.hotelRecommendations.length > 0 && (
              <section className="mt-16">
                <h2 className="text-3xl font-bold text-primary mb-8">🏨 Where to Stay</h2>
                {post.hotelRecommendations.map((hotel, index) => (
                  <HotelCard
                    key={index}
                    name={hotel.name}
                    tier={hotel.tier}
                    badge={hotel.badge}
                    stars={hotel.stars}
                    image={hotel.image ? urlFor(hotel.image).width(600).url() : undefined}
                    location={hotel.location}
                    description={hotel.description}
                    priceFrom={hotel.priceFrom}
                    rating={hotel.rating}
                    reviewCount={hotel.reviewCount}
                    highlights={hotel.highlights}
                    proTip={hotel.proTip}
                    bookingUrl={hotel.bookingUrl}
                    ctaText={hotel.ctaText}
                  />
                ))}
              </section>
            )}

            {/* ═══════════════════════════════════════════════════════════
                AFFILIATE: Tour Recommendations
                ═══════════════════════════════════════════════════════════ */}
            {isAffiliate && post.tourRecommendations && post.tourRecommendations.length > 0 && (
              <section className="mt-16">
                <h2 className="text-3xl font-bold text-primary mb-8">🎯 Best Tours & Experiences</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {post.tourRecommendations.map((tour, index) => (
                    <TourCard
                      key={index}
                      name={tour.name}
                      badge={tour.badge}
                      image={tour.image ? urlFor(tour.image).width(600).url() : undefined}
                      duration={tour.duration}
                      description={tour.description}
                      price={tour.price}
                      rating={tour.rating}
                      reviewCount={tour.reviewCount}
                      includes={tour.includes}
                      whyBook={tour.whyBook}
                      bookingUrl={tour.bookingUrl}
                      ctaText={tour.ctaText}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* ═══════════════════════════════════════════════════════════
                AFFILIATE: Final CTA Section
                ═══════════════════════════════════════════════════════════ */}
            {isAffiliate && post.finalCta?.enabled && post.finalCta.pathways && (
              <FinalCtaSection
                title={post.finalCta.title}
                subtitle={post.finalCta.subtitle}
                pathways={post.finalCta.pathways}
              />
            )}

            {/* ═══════════════════════════════════════════════════════════
                AFFILIATE: Bottom Disclosure
                ═══════════════════════════════════════════════════════════ */}
            {isAffiliate && post.showDisclosure !== false && (
              <AffiliateDisclosure position="bottom" customText={post.disclosureText} />
            )}

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
              <Image src="/logo.png" alt="Greek Trip Planner" width={70} height={21} />
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
                <Link href="/disclosure" className="text-white/80 hover:text-white transition text-sm">
                  Affiliate Disclosure
                </Link>
                <Link href="/privacy" className="text-white/80 hover:text-white transition text-sm">
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
