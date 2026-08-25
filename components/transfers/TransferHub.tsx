// components/transfers/TransferHub.tsx

import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { ChevronRight, Sparkles, ArrowRight } from 'lucide-react'
import { urlFor } from '@/sanity/lib/image'
import { client } from '@/sanity/lib/client'
import { portableTextComponents } from '@/components/portableTextComponents'
import BookingOptions from './BookingOptions'

// The shared portableTextComponents does not currently register a renderer
// for the "htmlEmbed" block type (confirmed from the live page — comparison
// tables were rendering as "Unknown block type" and hidden entirely). This
// merges in a local handler without touching the shared file, since it's
// unclear whether /blog depends on a different behavior there.
const transferBodyComponents = {
  ...portableTextComponents,
  types: {
    ...(portableTextComponents as any).types,
    htmlEmbed: ({ value }: any) => (
      <div
        className="html-embed-container overflow-x-auto max-w-[680px] my-6"
        dangerouslySetInnerHTML={{ __html: value.html }}
      />
    ),
  },
}

const CHECKLIST = [
  { title: 'Licensed operator', text: 'Registered and legally permitted to run transfers in Greece.' },
  { title: 'Fixed price, no surge', text: "What you're quoted is what you pay." },
  { title: 'Flight-tracked pickup', text: 'Delays monitored automatically, free waiting time.' },
  { title: 'English-speaking driver', text: 'No language gap on arrival.' },
  { title: 'Insured vehicle', text: 'Verified coverage on every trip.' },
  { title: 'Free cancellation', text: 'Plans change — cancel at no cost.' },
]

const TYPE_LABELS: Record<string, { tag: string; class: string }> = {
  airport: { tag: 'Airport', class: 'text-[#FF5635]' },
  port: { tag: 'Port', class: 'text-[#FF5635]' },
  intercity: { tag: 'Day trip', class: 'text-[#2C73FF]' },
  vip: { tag: 'VIP', class: 'text-[#2C73FF]' },
  helicopter: { tag: 'Helicopter', class: 'text-[#2C73FF]' },
  boat: { tag: 'Boat', class: 'text-[#2C73FF]' },
}

interface Props {
  page: any // shaped by transferPageQuery in app/transfers/[slug]/page.tsx
}

export default async function TransferHub({ page }: Props) {
  const vipSpoke = page.spokes?.find((s: any) => s.transferType?.includes('vip'))
  const regularSpokes = page.spokes?.filter((s: any) => s !== vipSpoke) || []

  // Destination-specific related articles (e.g. for Athens: the Athens
  // travel guide, things to do in Athens) — not the generic sitewide pair
  // used on /transfers itself. Matches on title/slug containing the
  // destination name since there's no confirmed shared category field.
  let relatedPosts: any[] = []
  try {
    relatedPosts = await client.fetch(
      `*[_type == "post" && (slug.current match $pattern || title match $pattern)] | order(publishedAt desc)[0...2]{
        title, slug, excerpt, mainImage{asset->{url}, alt}
      }`,
      { pattern: `*${page.destination}*` }
    )
  } catch (error) {
    console.error('Error fetching related posts for transfer hub:', error)
  }

  return (
    <>
      {/* Breadcrumb — pt-[82px] clears the 64px fixed nav with 18px of visible breathing room */}
      <div className="max-w-[1040px] mx-auto px-5 sm:px-8 pt-[82px] pb-[18px] font-mono text-[11.5px] text-[#999]">
        <Link href="/" className="hover:text-[#2C73FF]">Home</Link>
        <span className="mx-1.5">/</span>
        <Link href="/transfers" className="hover:text-[#2C73FF]">Transfers</Link>
        <span className="mx-1.5">/</span>
        <span className="text-[#180204]">{page.title}</span>
      </div>

      {/* Hero — light, editorial. Deliberately not another dark board hero
          (that's the /transfers index signature) and deliberately not a
          full-bleed photo (this page's job is transactional, not
          aspirational — see reasoning in the design discussion). */}
      <section className="bg-[#FAF6F3] pt-8 pb-11">
        <div className="max-w-[1040px] mx-auto px-5 sm:px-8 grid grid-cols-1 md:grid-cols-[1fr_220px] gap-8 items-start">
          <div>
            <div className="inline-flex items-center gap-2 bg-white border border-[#E6DAD1] rounded-full px-3 py-[5px] font-mono text-[10.5px] uppercase tracking-wide text-[#888] mb-[18px]">
              <span className="w-[5px] h-[5px] rounded-full bg-[#FF5635]" />
              HUB · {page.destination?.toUpperCase()}
              <span className="text-[#E6DAD1]">·</span>
              <span className="text-[#2C73FF]">Fixed-price</span>
            </div>
            <h1 className="font-serif text-[32px] sm:text-[38px] leading-[1.15] mb-3.5 max-w-2xl">{page.title}</h1>
            {page.excerpt && (
              <p className="text-base text-[#555] max-w-xl leading-relaxed mb-7">{page.excerpt}</p>
            )}
            <div className="flex flex-wrap border border-[#E6DAD1] rounded-xl overflow-hidden bg-white">
              {page.priceRangeEUR && (
                <div className="flex-1 min-w-[130px] px-[22px] py-4 border-r border-[#E6DAD1] last:border-r-0">
                  <div className="font-mono text-[10px] uppercase tracking-wide text-[#999] mb-1">Price range</div>
                  <div className="font-mono text-base font-medium">{page.priceRangeEUR}</div>
                </div>
              )}
              {page.durationLabel && (
                <div className="flex-1 min-w-[130px] px-[22px] py-4 border-r border-[#E6DAD1] last:border-r-0">
                  <div className="font-mono text-[10px] uppercase tracking-wide text-[#999] mb-1">Duration</div>
                  <div className="font-mono text-base font-medium">{page.durationLabel}</div>
                </div>
              )}
              <div className="flex-1 min-w-[130px] px-[22px] py-4">
                <div className="font-mono text-[10px] uppercase tracking-wide text-[#999] mb-1">Updated</div>
                <div className="font-mono text-base font-medium">
                  {page.updatedAt ? new Date(page.updatedAt).getFullYear() : new Date(page.publishedAt).getFullYear()}
                </div>
              </div>
            </div>
          </div>

          {page.mainImage?.asset?.url ? (
            <div className="rounded-2xl overflow-hidden border border-[#E6DAD1] aspect-[4/5] relative hidden md:block">
              <Image
                src={urlFor(page.mainImage).width(440).height(550).url()}
                alt={page.mainImage?.alt || page.title}
                fill
                className="object-cover"
              />
            </div>
          ) : null}
        </div>
      </section>

      {/* Body — intro paragraph + comparison tables (as htmlEmbed) authored
          in Sanity. Typography classes are explicit here rather than relying
          on a "prose-blog" wrapper class, since that class doesn't appear to
          exist/apply — the live page rendered raw, unstyled h2/p tags. */}
      {page.body && (
        <section className="py-10">
          <div
            className="max-w-[1040px] mx-auto px-5 sm:px-8
              [&_h2]:font-serif [&_h2]:text-[22px] [&_h2]:sm:text-2xl [&_h2]:text-[#180204] [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:first:mt-0
              [&_p]:text-[15px] [&_p]:text-[#444] [&_p]:leading-[1.7] [&_p]:mb-4 [&_p]:max-w-[680px]
              [&_ul]:mb-5 [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_ul]:list-disc
              [&_li]:text-[15px] [&_li]:text-[#444] [&_li]:leading-[1.7]"
          >
            <PortableText value={page.body} components={transferBodyComponents} />
          </div>
        </section>
      )}

      {/* Affiliate disclosure moved to after the booking section — see below */}

      {/* Vetted checklist — full-width band, shared copy across every hub.
          Attribution: Panagiotis, the site's designated Transfer &
          Logistics Specialist — not the generic founder byline. */}
      <div className="bg-[#F3E4DE] py-14">
        <div className="max-w-[1040px] mx-auto px-5 sm:px-8">
          <div className="flex justify-between items-end flex-wrap gap-3.5 mb-8 pl-[18px] border-l-4 border-[#5C2A2E]">
            <h2 className="font-serif text-2xl text-[#180204]">How we choose every transfer partner</h2>
            <p className="text-xs text-[#7A5457] whitespace-nowrap">
              📊 <strong className="text-[#5C2A2E]">Panagiotis</strong> · Transfer & Logistics Specialist
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-7 gap-y-5">
            {CHECKLIST.map((item) => (
              <div key={item.title} className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#5C2A2E] flex items-center justify-center flex-shrink-0 mt-px text-white text-[10px]">✓</span>
                <span className="text-[13.5px] text-[#180204] leading-snug">
                  <strong className="block font-bold">{item.title}</strong>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Booking options */}
      {page.bookingUrl && (
        <section className="py-11">
          <div className="max-w-[1040px] mx-auto px-5 sm:px-8">
            <span className="block font-mono text-[11px] tracking-wide uppercase text-[#2C73FF] mb-2">Book now</span>
            <h2 className="font-serif text-2xl mb-5">Book your {page.destination} transfer</h2>
            <BookingOptions
              routeLabel={page.primaryRouteLabel || page.title}
              bookingUrl={page.bookingUrl}
              price={page.priceRangeEUR?.split('–')[0] || page.priceRangeEUR || '—'}
              variant="hub"
              localOperators={page.localOperators}
            />
          </div>
        </section>
      )}

      {/* Affiliate disclosure — exact copy from the live /blog/paxos-travel-guide
          article, not the generic AffiliateDisclosure component (its default
          text reads differently — "helps support our site" vs. this more
          specific, trust-building version actually used on published posts).
          Styling here is an approximation; couldn't inspect that component's
          actual CSS from a page fetch, so verify the visual match in Studio. */}
      {page.bookingUrl && (
        <div className="max-w-[1040px] mx-auto px-5 sm:px-8 mb-2">
          <div className="flex items-start gap-2.5 bg-[#F7F4F1] border border-[#E6DAD1] rounded-xl px-4 py-3.5 max-w-[680px]">
            <span className="text-base leading-none mt-0.5 flex-shrink-0">ℹ️</span>
            <p className="text-[12.5px] text-[#666] leading-relaxed">
              <strong className="text-[#180204] font-semibold">Affiliate disclosure:</strong> Some links in this article are affiliate links. If you book or buy through them, we may earn a small commission — at no extra cost to you. We only recommend services we genuinely trust and that we'd use ourselves for a trip to Greece.
            </p>
          </div>
        </div>
      )}

      {/* Spoke links */}
      {regularSpokes.length > 0 && (
        <section className="py-11 border-t border-[#E6DAD1]">
          <div className="max-w-[1040px] mx-auto px-5 sm:px-8">
            <span className="block font-mono text-[11px] tracking-wide uppercase text-[#2C73FF] mb-2">More routes</span>
            <h2 className="font-serif text-2xl mb-2">Need a different route?</h2>
            <p className="text-[15px] text-[#555] max-w-xl mb-6">
              {page.destination} connects to more than just your hotel — here&apos;s every route we cover.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
              {regularSpokes.map((spoke: any) => {
                const typeTag = TYPE_LABELS[spoke.transferType?.[0]] || TYPE_LABELS.airport
                return (
                  <Link
                    key={spoke.slug}
                    href={`/transfers/${spoke.slug}`}
                    className="border border-[#E6DAD1] rounded-xl px-[18px] py-4 hover:border-[#2C73FF] transition-colors block"
                  >
                    <span className={`block font-mono text-[9.5px] uppercase tracking-wide mb-1.5 ${typeTag.class}`}>
                      {typeTag.tag}
                    </span>
                    <h4 className="font-bold text-[13.5px] text-[#180204] mb-1">{spoke.title}</h4>
                    <div className="font-mono text-[11px] text-[#999]">
                      {spoke.priceRangeEUR} {spoke.durationLabel && `· ${spoke.durationLabel}`}
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* VIP callout — only if this hub has a VIP-tagged spoke */}
      {vipSpoke && (
        <section className="py-11 border-t border-[#E6DAD1]">
          <div className="max-w-[1040px] mx-auto px-5 sm:px-8">
            <div className="bg-[#180204] rounded-2xl p-8 flex justify-between items-center flex-wrap gap-5">
              <div>
                <h3 className="font-serif text-xl text-white mb-1.5 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#FF5635]" /> Traveling in style?
                </h3>
                <p className="text-white/60 text-[13.5px] max-w-md">
                  VIP transfers and executive service for arrivals that need to make an impression.
                </p>
              </div>
              <Link href={`/transfers/${vipSpoke.slug}`} className="bg-[#FF5635] text-white px-6 py-3 rounded-full text-[13px] font-semibold whitespace-nowrap">
                See VIP options →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {page.faqSchema?.enabled && page.faqSchema?.faqs?.length > 0 && (
        <section className="py-11 border-t border-[#E6DAD1]">
          <div className="max-w-[1040px] mx-auto px-5 sm:px-8">
            <span className="block font-mono text-[11px] tracking-wide uppercase text-[#2C73FF] mb-2">FAQ</span>
            <h2 className="font-serif text-2xl mb-5">Before you book</h2>
            {page.faqSchema.faqs.map((faq: any, i: number) => (
              <details key={i} className="group border-b border-[#E6DAD1] py-4 border-l-2 border-l-transparent open:border-l-[#2C73FF] open:pl-3.5 transition-all">
                <summary className="font-semibold text-[14.5px] cursor-pointer list-none flex justify-between items-center">
                  {faq.question}
                  <ChevronRight className="w-4 h-4 text-[#2C73FF] group-open:rotate-90 transition-transform flex-shrink-0 ml-3" />
                </summary>
                <p className="mt-2.5 text-[13.5px] text-[#666] leading-relaxed max-w-xl">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* Explore other destinations */}
      {page.otherHubs?.length > 0 && (
        <section className="py-11 border-t border-[#E6DAD1]">
          <div className="max-w-[1040px] mx-auto px-5 sm:px-8">
            <h2 className="font-sans font-bold text-lg mb-4">Explore other destinations</h2>
            <div className="flex flex-wrap gap-3">
              {page.otherHubs.map((hub: any) => (
                <Link
                  key={hub.slug}
                  href={`/transfers/${hub.slug}`}
                  className="bg-[#EBF1FF] border border-[#EBF1FF] text-[#003DAB] rounded-full px-[18px] py-[9px] text-[12.5px] font-semibold hover:bg-[#2C73FF] hover:text-white hover:border-[#2C73FF] transition-colors"
                >
                  {hub.destination} Transfer →
                </Link>
              ))}
              <Link href="/transfers" className="border border-[#E6DAD1] rounded-full px-[18px] py-[9px] text-[12.5px] font-semibold hover:border-[#2C73FF] hover:text-[#2C73FF] transition-colors">
                All Transfers →
              </Link>
            </div>
          </div>
        </section>
      )}
      {/* Continue planning — 2 destination-specific articles, not the
          generic sitewide pair used on /transfers itself */}
      {relatedPosts.length > 0 && (
        <section className="py-11 border-t border-[#E6DAD1] bg-[#FAF6F3]">
          <div className="max-w-[1040px] mx-auto px-5 sm:px-8">
            <span className="block font-mono text-[11px] tracking-wide uppercase text-[#2C73FF] mb-2">Beyond the transfer</span>
            <h2 className="font-serif text-2xl mb-6">Continue planning your {page.destination} trip</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {relatedPosts.map((post: any) => (
                <Link
                  key={post.slug.current}
                  href={`/blog/${post.slug.current}`}
                  className="relative rounded-2xl overflow-hidden block aspect-[16/10] group"
                >
                  {post.mainImage?.asset?.url && (
                    <Image
                      src={post.mainImage.asset.url}
                      alt={post.mainImage.alt || post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#180204]/85 via-[#180204]/15 to-transparent" />
                  <div className="absolute left-0 right-0 bottom-0 p-5 z-10">
                    <span className="font-mono text-[10px] tracking-wide uppercase text-[#FFE0DA] block mb-1">Guide</span>
                    <h3 className="text-white font-serif text-lg">{post.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Cross-link CTA — matches the /transfers index page pattern */}
      <section className="bg-white border-t border-[#E6DAD1]">
        <div className="max-w-[1040px] mx-auto px-5 sm:px-8 py-14">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl text-[#180204] mb-2">Planning More Than the Transfer?</h2>
              <p className="text-[#180204]/55 font-sans">Let our AI trip planner build the rest of your {page.destination} itinerary in minutes.</p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <Link href="/transfers" className="bg-[#FAF6F3] border border-[#E6DAD1] text-[#180204] hover:border-[#FF5635]/30 hover:text-[#FF5635] px-6 py-3 rounded-full text-sm font-sans font-semibold transition-all">
                All Transfers
              </Link>
              <Link href="/ai-trip-planner" className="btn-accent px-6 py-3 rounded-full text-sm font-semibold inline-flex items-center gap-2">
                Plan My Trip <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
