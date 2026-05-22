import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Handshake, Layers, MapPin, BadgeCheck, Calculator, XCircle, FileText, Users, Mail } from 'lucide-react'
import Navbar from '@/components/Navbar'

export const metadata = {
  title: 'Featured Partner Program | Greek Trip Planner',
  description: 'Partner with Greek Trip Planner to reach international travelers planning trips to Greece. Clearly labeled Featured Partner placements with full editorial transparency.',
  openGraph: {
    title: 'Featured Partner Program | Greek Trip Planner',
    description: 'Partner with Greek Trip Planner to reach international travelers planning trips to Greece.',
    url: 'https://greektriplanner.me/partners',
    siteName: 'Greek Trip Planner',
    type: 'website',
  },
}

export default function PartnersPage() {
  return (
    <main className="min-h-screen bg-[#FAF6F3]">
      <Navbar />

      {/* ===== HEADER ===== */}
      <section className="pt-28 pb-12 md:pt-32 md:pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 bg-[#2C73FF]/8 border border-[#2C73FF]/15 rounded-full px-4 py-1.5 mb-6">
            <Handshake className="w-4 h-4 text-[#2C73FF]" />
            <span className="text-[#2C73FF] text-sm font-medium font-sans">Partner with us</span>
          </div>
          <h1 className="text-4xl sm:text-5xl text-[#180204] mb-4">Featured Partner Program</h1>
          <p className="text-[#180204]/60 text-lg max-w-2xl font-sans leading-relaxed">
            Reach international travelers planning trips to Greece &mdash; through clearly labeled, editorially-reviewed Featured Partner placements that respect both reader trust and your business goals.
          </p>
        </div>
      </section>

      {/* ===== CONTENT ===== */}
      <section className="pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Intro */}
          <div className="bg-white rounded-2xl border border-[#E6DAD1]/60 p-8 md:p-10 mb-8">
            <div className="space-y-5 text-[#180204]/65 font-sans leading-relaxed">
              <p>
                Greek Trip Planner is read by international travelers planning trips to Greece &mdash; primarily from the US, UK, Australia, Canada, and Western Europe. They reach our site at the decision-making stage: choosing where to stay, what to book, how to get around, where to eat.
              </p>
              <p>
                If you operate a travel-related business serving these travelers, we offer a small number of clearly labeled Featured Partner placements that put your brand in front of them at the right moment.
              </p>
              <p>
                This page explains how the program works, who it&apos;s for, what it costs, and what it isn&apos;t.
              </p>
            </div>
          </div>

          {/* What We Offer */}
          <div className="bg-white rounded-2xl border border-[#E6DAD1]/60 p-8 md:p-10 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#2C73FF]/10 rounded-xl flex items-center justify-center">
                <Layers className="w-5 h-5 text-[#2C73FF]" />
              </div>
              <h2 className="text-2xl text-[#180204]">What We Offer</h2>
            </div>
            <div className="space-y-5 text-[#180204]/65 font-sans leading-relaxed">

              <div className="bg-[#FAF6F3] rounded-xl p-5 border border-[#E6DAD1]/40">
                <h3 className="text-[#180204] font-semibold mb-2">Featured Partner Card &mdash; Article Level</h3>
                <p className="text-[#180204]/60 text-sm mb-2">
                  A branded card placed in one specific high-traffic article for the contract period. Same visual quality as our existing partner cards, with a clear &ldquo;Featured Partner&rdquo; label so readers know exactly what they&apos;re looking at.
                </p>
                <p className="text-[#180204]/50 text-sm italic">
                  Best for: a brand targeting a specific destination or topic (e.g., car rental on the Athens car rental guide, a hotel on a destination-specific best-hotels article).
                </p>
              </div>

              <div className="bg-[#FAF6F3] rounded-xl p-5 border border-[#E6DAD1]/40">
                <h3 className="text-[#180204] font-semibold mb-2">Featured Partner Card &mdash; Category Level</h3>
                <p className="text-[#180204]/60 text-sm mb-2">
                  Your card appears across all articles in a defined category (for example: all car rental articles across destinations, all restaurant guides for a specific island, all transfer-related articles).
                </p>
                <p className="text-[#180204]/50 text-sm italic">
                  Best for: brands with broader geographic or category reach.
                </p>
              </div>

              <div className="bg-[#FAF6F3] rounded-xl p-5 border border-[#E6DAD1]/40">
                <h3 className="text-[#180204] font-semibold mb-2">Restaurant, Hotel & Operator Featured Listings</h3>
                <p className="text-[#180204]/60 text-sm mb-2">
                  Restaurants, hotels, tour operators, and transfer companies can appear as Featured Partners within our destination guides where contextually relevant. Listings include a photo, description in our editorial voice, must-order or signature details, reservation guidance, and inclusion in our at-a-glance comparison tables &mdash; all clearly labeled as Featured Partner.
                </p>
                <p className="text-[#180204]/50 text-sm italic">
                  Best for: small to mid-sized operators with a strong product, verified reviews, and a willingness to be featured under transparent terms.
                </p>
              </div>

              <div className="bg-[#FAF6F3] rounded-xl p-5 border border-[#E6DAD1]/40">
                <h3 className="text-[#180204] font-semibold mb-2">Affiliate Partnerships</h3>
                <p className="text-[#180204]/60 text-sm mb-2">
                  If you operate an affiliate or referral program with competitive commission structures, we can explore an affiliate relationship instead of (or alongside) a Featured Partner placement. We work with established programs (GetYourGuide, Booking.com, DiscoverCars, EKTA Travel Insurance, and others) and are open to evaluating new ones.
                </p>
              </div>

            </div>
          </div>

          {/* Where Featured Partners Appear */}
          <div className="bg-white rounded-2xl border border-[#E6DAD1]/60 p-8 md:p-10 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#FF5635]/10 rounded-xl flex items-center justify-center">
                <MapPin className="w-5 h-5 text-[#FF5635]" />
              </div>
              <h2 className="text-2xl text-[#180204]">Where Featured Partners Appear in Our Articles</h2>
            </div>
            <div className="space-y-5 text-[#180204]/65 font-sans leading-relaxed">
              <p>
                So you know exactly what you&apos;re buying, here&apos;s the placement rule we follow on every article:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-[#FF5635] mt-1.5 text-sm">●</span>
                  <span>The <strong className="text-[#180204]">top of every article is editorial-only</strong> &mdash; the hero, the quick-answer summary, the &ldquo;best of by category&rdquo; box, and the Editor&apos;s Picks section. Featured Partners do not appear above the fold or in the editorial summary.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#FF5635] mt-1.5 text-sm">●</span>
                  <span>Featured Partners appear <strong className="text-[#180204]">deeper in the article, in their own clearly-headed section</strong> (typically &ldquo;Also worth considering&rdquo; or &ldquo;Featured partners in [destination]&rdquo;), structurally separated from Editor&apos;s Picks.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#FF5635] mt-1.5 text-sm">●</span>
                  <span>Featured Partners and Editor&apos;s Picks are <strong className="text-[#180204]">never interleaved or ranked together</strong>. We don&apos;t blend paid and editorial in the same list.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#FF5635] mt-1.5 text-sm">●</span>
                  <span>Featured Partners appear as additional rows in our comparison tables, clearly labeled.</span>
                </li>
              </ul>
              <div className="bg-[#FFF8F6] border border-[#FF5635]/20 rounded-xl p-5 mt-4">
                <p className="text-sm text-[#180204]/70">
                  <strong className="text-[#180204]">The trade-off this creates:</strong> Featured Partners get less prominence than a &ldquo;top of article&rdquo; placement would, but they sit in a context that protects reader trust. We&apos;ve found that placements readers actually trust outperform placements readers ignore &mdash; even when the trusted placement is lower on the page.
                </p>
              </div>
            </div>
          </div>

          {/* How We Verify */}
          <div className="bg-white rounded-2xl border border-[#E6DAD1]/60 p-8 md:p-10 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#2C73FF]/10 rounded-xl flex items-center justify-center">
                <BadgeCheck className="w-5 h-5 text-[#2C73FF]" />
              </div>
              <h2 className="text-2xl text-[#180204]">How We Verify Partners</h2>
            </div>
            <div className="space-y-5 text-[#180204]/65 font-sans leading-relaxed">
              <p>
                Before accepting a Featured Partner, we verify:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-[#2C73FF] mt-1.5 text-sm">●</span>
                  <span>The operator is legitimately in business</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#2C73FF] mt-1.5 text-sm">●</span>
                  <span>Reviews and ratings on Google, TripAdvisor, and relevant platforms back up what&apos;s being claimed</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#2C73FF] mt-1.5 text-sm">●</span>
                  <span>The product or service is one we&apos;d be willing to recommend to a friend visiting Greece</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#2C73FF] mt-1.5 text-sm">●</span>
                  <span>There are no significant unresolved consumer complaints or reputation issues</span>
                </li>
              </ul>
              <p>
                For restaurants and hotels, where possible, one of our certified Greek tour guides will visit the property. Where a personal visit isn&apos;t feasible, we use a documented credentials-based verification process (review trail, owner interview, public-source verification of credentials). Featured Partner placements based on credentials-only verification are clearly distinguished from Editor&apos;s Picks, which require a personal visit.
              </p>
            </div>
          </div>

          {/* How We Price */}
          <div className="bg-white rounded-2xl border border-[#E6DAD1]/60 p-8 md:p-10 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#2C73FF]/10 rounded-xl flex items-center justify-center">
                <Calculator className="w-5 h-5 text-[#2C73FF]" />
              </div>
              <h2 className="text-2xl text-[#180204]">How We Price</h2>
            </div>
            <div className="space-y-5 text-[#180204]/65 font-sans leading-relaxed">
              <p>
                We don&apos;t publish a fixed rate card because no two placements are the same. Pricing on Greek Trip Planner depends on three factors:
              </p>

              <div className="grid sm:grid-cols-3 gap-3">
                <div className="bg-[#FAF6F3] rounded-xl p-5 border border-[#E6DAD1]/40">
                  <div className="inline-flex items-center justify-center w-7 h-7 bg-[#2C73FF]/10 text-[#2C73FF] rounded-full text-sm font-semibold font-sans mb-3">1</div>
                  <h3 className="text-[#180204] font-semibold mb-2 text-sm">Article or category traffic</h3>
                  <p className="text-[#180204]/60 text-xs leading-relaxed">
                    A placement on a high-traffic commercial article (e.g. Athens car rental) is priced differently from a placement on a niche destination article.
                  </p>
                </div>
                <div className="bg-[#FAF6F3] rounded-xl p-5 border border-[#E6DAD1]/40">
                  <div className="inline-flex items-center justify-center w-7 h-7 bg-[#2C73FF]/10 text-[#2C73FF] rounded-full text-sm font-semibold font-sans mb-3">2</div>
                  <h3 className="text-[#180204] font-semibold mb-2 text-sm">Destination tier</h3>
                  <p className="text-[#180204]/60 text-xs leading-relaxed">
                    Placements on Mykonos, Santorini, Athens, or Crete are priced differently from those on emerging or smaller destinations like Andros, Ios, Folegandros, or Sifnos.
                  </p>
                </div>
                <div className="bg-[#FAF6F3] rounded-xl p-5 border border-[#E6DAD1]/40">
                  <div className="inline-flex items-center justify-center w-7 h-7 bg-[#2C73FF]/10 text-[#2C73FF] rounded-full text-sm font-semibold font-sans mb-3">3</div>
                  <h3 className="text-[#180204] font-semibold mb-2 text-sm">Duration & exclusivity</h3>
                  <p className="text-[#180204]/60 text-xs leading-relaxed">
                    Seasonal vs. annual vs. multi-year, exclusive (single Featured Partner per category) vs. non-exclusive.
                  </p>
                </div>
              </div>

              <p>
                <strong className="text-[#180204]">The program&apos;s pricing floor is €150</strong> &mdash; that&apos;s our entry point for small operators (single-location restaurants, family-run hotels with under 15 rooms, single-vehicle transfer operators) on smaller destinations, sold as seasonal placements. <strong className="text-[#180204]">The ceiling is €4,000+</strong> for annual sitewide category exclusives on our highest-traffic commercial pages.
              </p>
              <p>
                Most placements sit somewhere in between. Once you tell us what you&apos;re interested in, we&apos;ll come back with a specific quote within 3 business days, and we&apos;ll show you how we got to that number.
              </p>
            </div>
          </div>

          {/* Founding Partner Terms */}
          <div className="bg-[#FF5635]/5 rounded-2xl border border-[#FF5635]/20 p-8 md:p-10 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#FF5635]/15 rounded-xl flex items-center justify-center">
                <BadgeCheck className="w-5 h-5 text-[#FF5635]" />
              </div>
              <h2 className="text-2xl text-[#180204]">Founding Partner Terms</h2>
            </div>
            <div className="space-y-5 text-[#180204]/65 font-sans leading-relaxed">
              <p>
                Through the 2026 season, we&apos;re offering Founding Partner terms to the first 1&ndash;3 operators in each destination or category. Founding Partners get:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-[#FF5635] mt-1.5 text-sm">●</span>
                  <span>A meaningful discount on their first season or year (typically 40&ndash;50% off rack rate)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#FF5635] mt-1.5 text-sm">●</span>
                  <span>Locked-in renewal pricing below standard rate for the following season</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#FF5635] mt-1.5 text-sm">●</span>
                  <span>Priority consideration when category exclusivity becomes available</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#FF5635] mt-1.5 text-sm">●</span>
                  <span>Inclusion in case studies and testimonial features (with your permission)</span>
                </li>
              </ul>
              <p>
                In exchange, Founding Partners commit to the placement, allow us to use the relationship in marketing the program to future partners, and provide feedback on what&apos;s working.
              </p>
              <p>
                <strong className="text-[#180204]">If you&apos;re inquiring through this page in 2026, ask about Founding Partner availability for your category.</strong>
              </p>
            </div>
          </div>

          {/* What We Don't Offer */}
          <div className="bg-white rounded-2xl border border-[#E6DAD1]/60 p-8 md:p-10 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#FF5635]/10 rounded-xl flex items-center justify-center">
                <XCircle className="w-5 h-5 text-[#FF5635]" />
              </div>
              <h2 className="text-2xl text-[#180204]">What We Don&apos;t Offer</h2>
            </div>
            <div className="space-y-5 text-[#180204]/65 font-sans leading-relaxed">
              <p>
                Some things are off the table regardless of budget. We&apos;ve listed them publicly so we don&apos;t waste each other&apos;s time:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-[#FF5635] mt-1.5 text-sm">●</span>
                  <span><strong className="text-[#180204]">Editor&apos;s Picks (★) for sale.</strong> Our editorial designations are based on personal visits by our certified Greek tour guides. No payment can result in an Editor&apos;s Pick.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#FF5635] mt-1.5 text-sm">●</span>
                  <span><strong className="text-[#180204]">Dofollow paid links.</strong> All commercial links carry <code className="bg-[#FAF6F3] px-1.5 py-0.5 rounded text-xs">rel=&quot;sponsored&quot;</code> &mdash; this protects both parties from Google policy issues. If your campaign requires dofollow links, we&apos;re not the right publisher.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#FF5635] mt-1.5 text-sm">●</span>
                  <span><strong className="text-[#180204]">Sponsored articles disguised as editorial content.</strong> Any paid content is clearly labeled. We don&apos;t ghostwrite or republish sponsor-supplied articles under our team&apos;s bylines.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#FF5635] mt-1.5 text-sm">●</span>
                  <span><strong className="text-[#180204]">Exact-match commercial anchor text.</strong> Anchors are brand name, brand + descriptor, or generic phrases. We don&apos;t accept anchors like &ldquo;cheap car rental Athens&rdquo; &mdash; they&apos;re an obvious paid-link footprint that puts both sides at risk.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#FF5635] mt-1.5 text-sm">●</span>
                  <span><strong className="text-[#180204]">Placements above the editorial fold.</strong> The hero, summary, quick-answer box, and Editor&apos;s Picks section of any article stay editorial. Featured Partners appear deeper in the article only.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#FF5635] mt-1.5 text-sm">●</span>
                  <span><strong className="text-[#180204]">Placements without editorial review.</strong> All Featured Partner content is reviewed and edited by our team before publication.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#FF5635] mt-1.5 text-sm">●</span>
                  <span><strong className="text-[#180204]">Categories outside travel and tourism.</strong> No gambling, crypto, adult content, CBD, weapons, predatory financial products, or unrelated industries.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Standard Terms */}
          <div className="bg-white rounded-2xl border border-[#E6DAD1]/60 p-8 md:p-10 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#2C73FF]/10 rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-[#2C73FF]" />
              </div>
              <h2 className="text-2xl text-[#180204]">Standard Terms</h2>
            </div>
            <ul className="space-y-3 text-[#180204]/65 font-sans leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-[#2C73FF] mt-1.5 text-sm">●</span>
                <span><strong className="text-[#180204]">Editorial control:</strong> We retain final say on content, voice, placement, and presentation. You review for factual accuracy before publication.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#2C73FF] mt-1.5 text-sm">●</span>
                <span><strong className="text-[#180204]">Permanent vs. fixed-term:</strong> Most placements are sold as fixed-term (seasonal, annual, multi-year). Permanent placements available at premium rates with annual review.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#2C73FF] mt-1.5 text-sm">●</span>
                <span><strong className="text-[#180204]">Renewal:</strong> Founding Partners receive locked-in renewal pricing below standard rate. Standard partners renew at then-current rates.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#2C73FF] mt-1.5 text-sm">●</span>
                <span><strong className="text-[#180204]">Payment:</strong> Bank transfer (Greek SEPA) or Wise. 100% upfront for first placement, net-30 available after an established relationship. We issue proper invoices (τιμολόγιο παροχής υπηρεσιών) &mdash; VAT applies for EU partners as per Greek tax law.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#2C73FF] mt-1.5 text-sm">●</span>
                <span><strong className="text-[#180204]">Editorial standards clause:</strong> We reserve the right to remove a Featured Partner placement if the operator&apos;s quality, reviews, or operations deteriorate significantly during the contract period. Pro-rated refund applies if we initiate removal. No refund if the operator initiates early termination.</span>
              </li>
            </ul>
          </div>

          {/* Who This Is For */}
          <div className="bg-white rounded-2xl border border-[#E6DAD1]/60 p-8 md:p-10 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#2C73FF]/10 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-[#2C73FF]" />
              </div>
              <h2 className="text-2xl text-[#180204]">Who This Is For</h2>
            </div>
            <div className="space-y-5 text-[#180204]/65 font-sans leading-relaxed">

              <div className="bg-[#FAF6F3] rounded-xl p-5 border border-[#E6DAD1]/40">
                <h3 className="text-[#180204] font-semibold mb-3 text-sm">The Featured Partner program works best for:</h3>
                <ul className="space-y-2 text-sm text-[#180204]/65">
                  <li className="flex items-start gap-2">
                    <span className="text-[#2C73FF] mt-1 text-xs">●</span>
                    <span>Restaurants, hotels, and tour operators in Greek destinations we cover</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#2C73FF] mt-1 text-xs">●</span>
                    <span>Small family-run accommodations and tavernas with strong reviews and a story worth telling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#2C73FF] mt-1 text-xs">●</span>
                    <span>Car rental, transfer, and connectivity (eSIM/SIM) companies serving travelers to Greece</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#2C73FF] mt-1 text-xs">●</span>
                    <span>Travel insurance providers and travel service brands</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#2C73FF] mt-1 text-xs">●</span>
                    <span>Established travel OTAs and aggregators with competitive commission programs</span>
                  </li>
                </ul>
              </div>

              <div className="bg-[#FAF6F3] rounded-xl p-5 border border-[#E6DAD1]/40">
                <h3 className="text-[#180204] font-semibold mb-3 text-sm">The program is not the right fit for:</h3>
                <ul className="space-y-2 text-sm text-[#180204]/65">
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF5635] mt-1 text-xs">●</span>
                    <span>Pure SEO link-buying campaigns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF5635] mt-1 text-xs">●</span>
                    <span>Brands outside the travel and tourism vertical</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF5635] mt-1 text-xs">●</span>
                    <span>Operators expecting editorial endorsement in exchange for payment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF5635] mt-1 text-xs">●</span>
                    <span>Anyone requesting undisclosed placement or dofollow links</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>

          {/* Get In Touch — final CTA */}
          <div className="bg-[#180204] rounded-2xl p-8 md:p-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#FF5635]/15 rounded-xl flex items-center justify-center">
                <Mail className="w-5 h-5 text-[#FF5635]" />
              </div>
              <h2 className="text-2xl text-white">Get in Touch</h2>
            </div>
            <p className="text-white/70 font-sans mb-5 leading-relaxed">
              If your business fits the program and you&apos;d like to discuss a Featured Partner placement, write to us with:
            </p>
            <ul className="space-y-2 mb-6 text-white/70 font-sans text-sm">
              <li className="flex items-start gap-2">
                <span className="text-[#FF5635] mt-1 text-xs">●</span>
                <span>Your business and the specific Greek destination(s) or category you&apos;re interested in</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FF5635] mt-1 text-xs">●</span>
                <span>Which article(s) or section(s) you&apos;d like to discuss</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FF5635] mt-1 text-xs">●</span>
                <span>Your typical campaign budget range</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FF5635] mt-1 text-xs">●</span>
                <span>Your booking link or affiliate program if you have one</span>
              </li>
            </ul>
            <p className="text-white/50 text-sm font-sans mb-6 italic">
              We respond within 3&ndash;5 business days. We don&apos;t bulk-sell placements and we don&apos;t respond to template outreach. If your email looks like a mailmerge, it probably won&apos;t get a reply.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                href="/contact?topic=partners"
                className="inline-flex items-center justify-center gap-2 bg-[#FF5635] hover:bg-[#FF5635]/90 text-white font-semibold rounded-full px-6 py-3 font-sans text-sm transition-colors"
              >
                Contact us about a partnership <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/editorial-policy"
                className="inline-flex items-center justify-center gap-2 text-white/70 hover:text-white font-sans text-sm transition-colors"
              >
                See our Editorial Policy <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-[#180204] py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            <Image src="/logo.png" alt="Greek Trip Planner" width={70} height={21} className="brightness-0 invert mb-6" />
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <Link href="/how-it-works" className="text-white/60 hover:text-[#FF5635] transition-colors text-sm font-sans">How it Works</Link>
              <Link href="/blog" className="text-white/60 hover:text-[#FF5635] transition-colors text-sm font-sans">Blog</Link>
              <Link href="/insights" className="text-white/60 hover:text-[#FF5635] transition-colors text-sm font-sans">Insights</Link>
              <Link href="/about" className="text-white/60 hover:text-[#FF5635] transition-colors text-sm font-sans">About</Link>
              <Link href="/editorial-policy" className="text-white/60 hover:text-[#FF5635] transition-colors text-sm font-sans">Editorial Policy</Link>
              <Link href="/partners" className="text-white/60 hover:text-[#FF5635] transition-colors text-sm font-sans">Partners</Link>
            </div>
            <div className="border-t border-white/10 w-full pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-white/40 text-sm font-sans">&copy; 2026 Greek Trip Planner. All rights reserved.</p>
              <div className="flex items-center gap-4">
                <a href="https://traveltourismdirectory.com/" className="text-white/40 hover:text-white/60 transition-colors text-sm font-sans" target="_blank" rel="noopener noreferrer">Travel and Tourism Directory</a>
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
}
