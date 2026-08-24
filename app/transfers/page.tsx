// app/transfers/page.tsx

import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import {
  Plane, ShieldCheck, Clock, MessageCircle, ArrowRight,
  Sailboat, MapPinned, Sparkles, Star,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Greece Transfers — Fixed-Price Airport & Port Transfers | Greek Trip Planner',
  description: 'Book fixed-price private transfers for every major Greek airport, port and island. Compare routes, prices and durations for Athens, Santorini, Mykonos and more.',
  openGraph: {
    title: 'Greece Transfers | Greek Trip Planner',
    description: 'Fixed-price private transfers for every major Greek airport, port and island.',
    url: 'https://greektriplanner.me/transfers',
    siteName: 'Greek Trip Planner',
    type: 'website',
  },
}

export const revalidate = 86400

// ============================================
// DATA
// ============================================

interface HubRow {
  _id: string
  title: string
  slug: { current: string }
  destination: string
  displayOrder: number | null
  primaryRouteLabel: string | null
  priceRangeEUR: string | null
  durationLabel: string | null
  spokeCount: number
}

async function getHubs(): Promise<HubRow[]> {
  try {
    // spokeCount is computed here rather than stored, so it never drifts
    // out of sync with the actual spoke pages that reference this hub.
    const query = `*[_type == "transferPage" && pageType == "hub" && defined(slug.current)]
      | order(coalesce(displayOrder, 999) asc) {
        _id,
        title,
        slug,
        destination,
        displayOrder,
        primaryRouteLabel,
        priceRangeEUR,
        durationLabel,
        "spokeCount": count(*[_type == "transferPage" && pageType == "spoke" && references(^._id)])
      }`
    return await client.fetch(query)
  } catch (error) {
    console.error('Error fetching transfer hubs:', error)
    return []
  }
}

interface RelatedPost {
  title: string
  slug: { current: string }
  excerpt?: string
  mainImage?: { asset?: { url?: string }; alt?: string }
}

async function getRelatedPosts(): Promise<RelatedPost[]> {
  try {
    const query = `*[_type == "post" && slug.current in ["things-to-do-in-greece", "best-time-to-travel-to-greece"]]{
      title, slug, excerpt, mainImage{asset->{url}, alt}
    }`
    return await client.fetch(query)
  } catch (error) {
    console.error('Error fetching related posts:', error)
    return []
  }
}

const AIRPORTS = [
  { name: 'Athens (Eleftherios Venizelos)', code: 'ATH' },
  { name: 'Thessaloniki (Makedonia)', code: 'SKG' },
  { name: 'Heraklion, Crete', code: 'HER' },
  { name: 'Chania, Crete', code: 'CHQ' },
  { name: 'Rhodes', code: 'RHO' },
  { name: 'Corfu', code: 'CFU' },
  { name: 'Santorini (Thira)', code: 'JTR' },
  { name: 'Mykonos', code: 'JMK' },
  { name: 'Kos', code: 'KGS' },
  { name: 'Piraeus, Rafina & Lavrio ports', code: 'ATH area' },
]

const CHECKLIST = [
  { title: 'Licensed operator', text: 'Registered and legally permitted to run transfers in Greece.' },
  { title: 'Fixed price, no surge', text: "What you're quoted is what you pay — no metered surprises." },
  { title: 'Flight-tracked pickup', text: 'Delays are monitored automatically, with free waiting time.' },
  { title: 'English-speaking driver', text: "No language gap when you're tired and least equipped for one." },
  { title: 'Insured vehicle', text: 'Verified insurance coverage on every trip, every partner.' },
  { title: 'Free cancellation', text: 'Plans change — cancel ahead of time at no cost.' },
]

const FAQS = [
  {
    q: 'Is it cheaper to book a transfer in advance?',
    a: 'Usually, yes. Pre-booked private transfers use fixed rates agreed before you travel, while airport taxi ranks can vary by time of day, demand, and driver. Booking ahead also guarantees a driver is waiting for you rather than joining a queue on arrival.',
  },
  {
    q: 'What happens if my flight is delayed?',
    a: 'Reputable operators track your flight number and adjust pickup time automatically, with free waiting time built in — this is one of the criteria in our vetting checklist above.',
  },
  {
    q: 'Can I book a transfer for a group or with extra luggage?',
    a: 'Yes — most operators offer minivan and larger vehicle options for groups above 4 people or extra luggage; select this when booking on the destination page.',
  },
]

const BROWSE_TYPES = [
  { label: 'Airport transfers', icon: Plane },
  { label: 'Port & ferry transfers', icon: Sailboat },
  { label: 'Day trips & inter-city', icon: MapPinned },
  { label: 'VIP & private', icon: Sparkles },
]

// ============================================
// PAGE
// ============================================

export default async function TransfersPage() {
  const [hubs, relatedPosts] = await Promise.all([getHubs(), getRelatedPosts()])

  const thingsToDo = relatedPosts.find((p) => p.slug.current === 'things-to-do-in-greece')
  const bestTime = relatedPosts.find((p) => p.slug.current === 'best-time-to-travel-to-greece')

  return (
    <main className="min-h-screen bg-[#FAF6F3]">
      {/* Navbar is rendered globally by app/layout.tsx */}

      {/* ===== HERO + ARRIVALS BOARD ===== */}
      <section className="relative pt-16">
        <div className="bg-[#180204] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF5635]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-28 pb-0">
            <div className="max-w-2xl mb-10">
              <div className="inline-flex items-center gap-2 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF5635] animate-pulse" />
                <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-[#FF5635]">
                  Transfers · Greece
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl text-white leading-[1.12] mb-4">
                Know the price <em className="italic text-[#FFA391] not-italic font-serif italic">before</em> you land.
              </h1>
              <p className="text-base text-white/60 max-w-md leading-relaxed font-sans">
                Fixed-price private transfers for every major Greek airport, port and island —
                pick your route below and see exactly what it costs and how long it takes.
              </p>
            </div>

            {/* Arrivals board */}
            <div className="rounded-t-2xl overflow-hidden border border-white/[0.08] bg-[#0f0203]">
              <div className="hidden sm:grid grid-cols-[2.2fr_1.6fr_0.9fr_0.9fr_32px] px-6 py-3.5 font-mono text-[10px] tracking-[0.1em] uppercase text-white/40 border-b border-white/[0.08]">
                <div>Destination</div>
                <div>Route</div>
                <div>From</div>
                <div>Time</div>
                <div />
              </div>

              <div className="max-h-[420px] overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-white/15 [&::-webkit-scrollbar-thumb]:rounded-full">
                {hubs.length === 0 && (
                  <div className="px-6 py-10 text-center text-white/40 text-sm font-mono">
                    No transfer hubs published yet.
                  </div>
                )}
                {hubs.map((hub, i) => (
                  <Link
                    key={hub._id}
                    href={`/transfers/${hub.slug.current}`}
                    className="grid grid-cols-[1fr_auto_20px] sm:grid-cols-[2.2fr_1.6fr_0.9fr_0.9fr_32px] gap-y-1 items-center px-4 sm:px-6 py-3.5 sm:py-[15px] text-white border-b border-white/[0.05] hover:bg-white/[0.04] transition-colors group"
                  >
                    <div className="flex items-center gap-2 font-semibold text-[14.5px] [grid-area:dest] sm:[grid-area:auto]">
                      {i < 3 && <span className="w-[5px] h-[5px] rounded-full bg-[#FF5635] flex-shrink-0" />}
                      {hub.title.replace(/ Airport Transfer.*$/i, '') || hub.destination}
                    </div>
                    <div className="text-right sm:text-left font-mono text-[13px] text-[#FFA391] [grid-area:price] sm:[grid-area:auto]">
                      {hub.priceRangeEUR || '—'}
                    </div>
                    <div className="col-span-3 sm:col-span-1 font-mono text-[11.5px] text-white/45 [grid-area:route] sm:[grid-area:auto]">
                      {hub.primaryRouteLabel || 'View routes'}
                      {hub.spokeCount > 0 && (
                        <span className="text-[#FFA391]/70 ml-1">
                          {hub.spokeCount > 1 ? `+${hub.spokeCount} more` : 'more routes →'}
                        </span>
                      )}
                    </div>
                    <div className="hidden sm:block font-mono text-[13px] text-white/60">
                      {hub.durationLabel || '—'}
                    </div>
                    <div className="[grid-area:arrow] sm:[grid-area:auto] text-white/30 group-hover:text-[#FF5635] group-hover:translate-x-1 transition-all text-[15px]">
                      →
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 px-6 py-3.5 bg-[#180204] rounded-b-2xl font-mono text-[11px] text-white/40">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5CFF9C] animate-pulse" />
              Fixed prices · Verified partners · Updated for 2026
            </div>
            <div className="h-12" />
          </div>
        </div>
      </section>

      {/* ===== WHY BOOK AHEAD ===== */}
      <section className="bg-[#FAF6F3] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-lg mb-11">
            <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#2C73FF] mb-2.5">
              Why book ahead
            </div>
            <h2 className="text-3xl text-[#180204] leading-tight">
              No arrivals-hall haggling, no surge pricing.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {[
              { n: '01 — PRICE', icon: ShieldCheck, title: 'Fixed, agreed in advance', text: 'What you pay is what you booked — no metered surprises, no "airport surcharge" sprung on you at the curb.' },
              { n: '02 — TIMING', icon: Clock, title: 'Flight-tracked pickup', text: "Drivers monitor your actual arrival time, so a delayed flight doesn't mean a missed transfer or a wait charge." },
              { n: '03 — COMMUNICATION', icon: MessageCircle, title: 'English-speaking drivers', text: "No language gap at the one moment of the trip you're most tired and least equipped for one." },
            ].map((c) => (
              <div key={c.n} className="bg-white border border-[#E6DAD1] rounded-[14px] p-7">
                <div className="font-mono text-[11px] text-[#FF5635] tracking-[0.1em] mb-3.5">{c.n}</div>
                <h3 className="font-sans font-bold text-base mb-2 text-[#180204]">{c.title}</h3>
                <p className="text-[13.5px] text-[#666] leading-relaxed">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TRUST STAT + AIRPORTS COVERED ===== */}
      <section className="bg-[#FAF6F3] py-20 border-t border-[#E6DAD1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-10 mb-11">
            <div className="bg-white border border-[#E6DAD1] rounded-[14px] p-8">
              <div className="font-serif text-[44px] leading-none text-[#180204] mb-1.5">4.8/5</div>
              <div className="flex gap-0.5 text-[#FF5635] mb-2.5">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-[13px] text-[#777] leading-relaxed">
                Our primary transfer partner, Welcome Pickups, is independently rated 4.8 out of 5
                from 48,000+ reviews on{' '}
                <a href="https://www.trustpilot.com/review/welcomepickups.com" target="_blank" rel="noopener noreferrer" className="text-[#2C73FF] font-semibold hover:underline">
                  Trustpilot
                </a>{' '}
                — not a rating we generate ourselves.
              </p>
            </div>
            <div>
              <h3 className="font-sans font-bold text-base mb-4 text-[#180204]">Major airports & ports we cover</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                {AIRPORTS.map((a) => (
                  <div key={a.code} className="flex justify-between text-[13.5px] py-2.5 border-b border-[#E6DAD1]">
                    <span className="text-[#180204]">{a.name}</span>
                    <span className="font-mono text-[11.5px] text-[#999]">{a.code}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {BROWSE_TYPES.map((t) => (
              <a
                key={t.label}
                href="#"
                className="inline-flex items-center gap-2 bg-white border border-[#E6DAD1] rounded-full px-[18px] py-2.5 text-[12.5px] font-semibold text-[#180204] hover:border-[#2C73FF] hover:text-[#2C73FF] transition-colors"
              >
                <t.icon className="w-3.5 h-3.5" />
                {t.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== VETTED CHECKLIST — full-width band ===== */}
      <section className="bg-[#F3E4DE] py-[72px] border-y border-[#E6DAD1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end flex-wrap gap-4 mb-10 pl-5 border-l-4 border-[#5C2A2E]">
            <h2 className="text-[28px] text-[#180204]">How we choose every transfer partner</h2>
            <p className="text-xs text-[#7A5457] whitespace-nowrap">
              📊 <strong className="text-[#5C2A2E]">Panos</strong> · OSINT Tourism Researcher · 2026
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-6">
            {CHECKLIST.map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <span className="w-[22px] h-[22px] rounded-full bg-[#5C2A2E] flex items-center justify-center flex-shrink-0 mt-px">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <polyline points="1.5,5 4,7.5 8.5,2.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="text-[14.5px] text-[#180204] leading-snug">
                  <strong className="block font-bold mb-0.5">{item.title}</strong>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-lg mb-11">
            <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#2C73FF] mb-2.5">
              Common questions
            </div>
            <h2 className="text-3xl text-[#180204]">Before you book</h2>
          </div>
          <div className="max-w-2xl">
            {FAQS.map((f) => (
              <details key={f.q} className="border-b border-[#E6DAD1] py-[18px] group">
                <summary className="font-sans font-semibold text-[15px] cursor-pointer list-none flex justify-between items-center text-[#180204]">
                  {f.q}
                  <span className="font-mono text-xl text-[#2C73FF] group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-[13.5px] text-[#666] leading-relaxed max-w-xl">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTINUE PLANNING — real posts from Sanity ===== */}
      <section className="bg-[#FAF6F3] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-lg mb-11">
            <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#2C73FF] mb-2.5">
              Beyond the transfer
            </div>
            <h2 className="text-3xl text-[#180204]">Continue planning your trip</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
            {thingsToDo && (
              <Link href={`/blog/${thingsToDo.slug.current}`} className="relative rounded-2xl overflow-hidden block aspect-[16/10] group">
                {thingsToDo.mainImage?.asset?.url && (
                  <Image
                    src={thingsToDo.mainImage.asset.url}
                    alt={thingsToDo.mainImage.alt || thingsToDo.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#180204]/85 via-[#180204]/15 to-transparent" />
                <div className="absolute left-0 right-0 bottom-0 p-6 z-10">
                  <span className="font-mono text-[10.5px] tracking-[0.1em] uppercase text-[#FFE0DA] block mb-1.5">Guide</span>
                  <h3 className="text-white font-serif text-xl mb-1">{thingsToDo.title}</h3>
                  <p className="text-white/75 text-[13px]">{thingsToDo.excerpt}</p>
                </div>
              </Link>
            )}
            {bestTime && (
              <Link href={`/blog/${bestTime.slug.current}`} className="relative rounded-2xl overflow-hidden block aspect-[16/10] group">
                {bestTime.mainImage?.asset?.url && (
                  <Image
                    src={bestTime.mainImage.asset.url}
                    alt={bestTime.mainImage.alt || bestTime.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#180204]/85 via-[#180204]/15 to-transparent" />
                <div className="absolute left-0 right-0 bottom-0 p-6 z-10">
                  <span className="font-mono text-[10.5px] tracking-[0.1em] uppercase text-[#FFE0DA] block mb-1.5">Guide</span>
                  <h3 className="text-white font-serif text-xl mb-1">{bestTime.title}</h3>
                  <p className="text-white/75 text-[13px]">{bestTime.excerpt}</p>
                </div>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* ===== CROSS-LINK TO BLOG — mirrors blog→insights pattern ===== */}
      <section className="bg-white border-t border-[#E6DAD1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl sm:text-3xl text-[#180204] mb-2">Planning More Than the Transfer?</h2>
              <p className="text-[#180204]/55 font-sans">Our Blog covers destination guides, itineraries, and island comparisons for every part of your trip.</p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <Link href="/blog" className="bg-[#FAF6F3] border border-[#E6DAD1] text-[#180204] hover:border-[#FF5635]/30 hover:text-[#FF5635] px-6 py-3 rounded-full text-sm font-sans font-semibold transition-all">
                View Blog
              </Link>
              <Link href="/ai-trip-planner" className="btn-accent px-6 py-3 rounded-full text-sm font-semibold inline-flex items-center gap-2">
                Plan My Trip <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer is rendered globally by app/layout.tsx */}

      {/* ===== SCHEMA ===== */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Greece Transfers',
            description: 'Fixed-price private transfers for every major Greek airport, port and island.',
            url: 'https://greektriplanner.me/transfers',
            isPartOf: { '@type': 'WebSite', name: 'Greek Trip Planner', url: 'https://greektriplanner.me' },
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://greektriplanner.me' },
                { '@type': 'ListItem', position: 2, name: 'Transfers', item: 'https://greektriplanner.me/transfers' },
              ],
            },
          }),
        }}
      />
    </main>
  )
}
