import Link from 'next/link'
import { ArrowRight, Shield, BookOpen, Heart, Star, ExternalLink, AlertCircle, Sparkles, Tag, XCircle } from 'lucide-react'

export const metadata = {
  title: 'Editorial Policy & Disclosure | Greek Trip Planner',
  description: 'How we create content, handle affiliate relationships, run our Featured Partner program, and maintain editorial independence. Our commitment to honest, experience-based Greece travel advice.',
  openGraph: {
    title: 'Editorial Policy & Disclosure | Greek Trip Planner',
    description: 'How we create content, handle affiliate relationships, and maintain editorial independence.',
    url: 'https://greektriplanner.me/editorial-policy',
    siteName: 'Greek Trip Planner',
    type: 'website',
  },
}

export default function EditorialPolicyPage() {
  return (
    <main className="min-h-screen bg-[#FAF6F3]">
      {/* Navbar is rendered globally by app/layout.tsx */}

      {/* ===== HEADER ===== */}
      <section className="pt-28 pb-12 md:pt-32 md:pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 bg-[#FF5635]/8 border border-[#FF5635]/15 rounded-full px-4 py-1.5 mb-6">
            <Shield className="w-4 h-4 text-[#FF5635]" />
            <span className="text-[#FF5635] text-sm font-medium font-sans">Transparency</span>
          </div>
          <h1 className="text-4xl sm:text-5xl text-[#180204] mb-4">Editorial Policy & Disclosure</h1>
          <p className="text-[#180204]/60 text-lg max-w-2xl font-sans leading-relaxed">
            How we create content, make money, and keep our recommendations honest. We believe in full transparency &mdash; if you&apos;re curious enough to read this page, you deserve straight answers.
          </p>
          <p className="text-[#180204]/40 text-sm font-sans mt-4 italic">
            Last updated: May 2026
          </p>
        </div>
      </section>

      {/* ===== CONTENT ===== */}
      <section className="pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Our Editorial Approach */}
          <div className="bg-white rounded-2xl border border-[#E6DAD1]/60 p-8 md:p-10 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#FF5635]/10 rounded-xl flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-[#FF5635]" />
              </div>
              <h2 className="text-2xl text-[#180204]">Our Editorial Approach</h2>
            </div>
            <div className="space-y-5 text-[#180204]/65 font-sans leading-relaxed">
              <p>
                Our main goal with Greek Trip Planner is to share useful, experience-based travel guides that help you plan a better trip to Greece. Every recommendation in our planner and every guide on our blog is rooted in real experience &mdash; places we&apos;ve actually been, food we&apos;ve actually eaten, ferries we&apos;ve actually taken.
              </p>
              <p>
                We write the kind of travel advice we&apos;d want to find ourselves: practical, honest, and specific. If a popular destination is overhyped for certain travelers, we&apos;ll say so. If a lesser-known spot is extraordinary, we&apos;ll tell you exactly why and how to get there.
              </p>
              <p>
                We also supplement first-hand experience with careful research &mdash; checking current prices, ferry schedules, opening hours, and local regulations. But research alone is never enough. The core of every guide is always personal experience from someone who has been there.
              </p>
            </div>
          </div>

          {/* How We Make Money */}
          <div className="bg-white rounded-2xl border border-[#E6DAD1]/60 p-8 md:p-10 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#2C73FF]/10 rounded-xl flex items-center justify-center">
                <Star className="w-5 h-5 text-[#2C73FF]" />
              </div>
              <h2 className="text-2xl text-[#180204]">How We Make Money</h2>
            </div>
            <div className="space-y-5 text-[#180204]/65 font-sans leading-relaxed">
              <p>
                While all content on Greek Trip Planner is free, the site needs revenue to keep running. We earn from three clearly separated revenue streams. We&apos;ve structured them this way deliberately so that you, the reader, can always tell what you&apos;re looking at and why it&apos;s there.
              </p>

              {/* 1. Affiliate Commissions */}
              <div className="bg-[#FAF6F3] rounded-xl p-5 border border-[#E6DAD1]/40">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-[#2C73FF]/10 text-[#2C73FF] rounded-full text-xs font-semibold font-sans">1</span>
                  <h3 className="text-[#180204] font-semibold">Affiliate Commissions <span className="text-[#180204]/40 font-normal text-sm">— our primary revenue source</span></h3>
                </div>
                <div className="text-[#180204]/60 text-sm space-y-3">
                  <p>
                    When we link to hotels, tours, ferry bookings, travel insurance, or other travel products in our blog posts, some of those links are affiliate links. If you click one and make a purchase, we earn a small commission at no extra cost to you. We work with partners like GetYourGuide, Booking.com, Viator, DiscoverCars, EKTA Travel Insurance, and similar travel platforms.
                  </p>
                  <p>
                    All affiliate links on our site carry the <code className="bg-white/80 px-1.5 py-0.5 rounded text-xs">rel=&quot;sponsored&quot;</code> attribute, which is the technical disclosure required by Google and aligned with current SEO best practices.
                  </p>
                  <p>
                    The choice of <em>which</em> affiliate partner to link to is always made on editorial merit first &mdash; we recommend the option we&apos;d genuinely use ourselves, and only then check whether an affiliate link is available. If it isn&apos;t, the recommendation stays anyway.
                  </p>
                </div>
              </div>

              {/* 2. Featured Partner Placements */}
              <div className="bg-[#FAF6F3] rounded-xl p-5 border border-[#E6DAD1]/40">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-[#2C73FF]/10 text-[#2C73FF] rounded-full text-xs font-semibold font-sans">2</span>
                  <h3 className="text-[#180204] font-semibold">Featured Partner Placements <span className="text-[#180204]/40 font-normal text-sm">— clearly labeled, never disguised</span></h3>
                </div>
                <div className="text-[#180204]/60 text-sm space-y-3">
                  <p>
                    A small number of travel companies pay to appear as <strong className="text-[#180204]">Featured Partners</strong> in specific sections of our site. These are visually distinct, clearly labeled inventory units &mdash; think of them like the sponsored listings on Booking.com or the partner cards on comparison sites, not like editorial recommendations.
                  </p>

                  <div>
                    <p className="font-medium text-[#180204] mb-2">What this looks like in practice:</p>
                    <ul className="space-y-1.5 pl-1">
                      <li className="flex items-start gap-2">
                        <span className="text-[#2C73FF] mt-1 text-xs">●</span>
                        <span>Every Featured Partner placement carries a visible <strong className="text-[#180204]">&ldquo;Featured Partner&rdquo;</strong> label</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#2C73FF] mt-1 text-xs">●</span>
                        <span>Featured Partner cards have a distinct visual treatment that separates them from editorial picks</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#2C73FF] mt-1 text-xs">●</span>
                        <span>All links inside Featured Partner placements carry <code className="bg-white/80 px-1.5 py-0.5 rounded text-xs">rel=&quot;sponsored&quot;</code></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#2C73FF] mt-1 text-xs">●</span>
                        <span>Featured Partners never replace, downgrade, or influence our editorial picks</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-medium text-[#180204] mb-2">How Featured Partners are kept separate from editorial content:</p>
                    <ul className="space-y-1.5 pl-1">
                      <li className="flex items-start gap-2">
                        <span className="text-[#2C73FF] mt-1 text-xs">●</span>
                        <span>Featured Partner cards appear in their <strong className="text-[#180204]">own clearly labeled sections</strong>, visually and structurally separate from our Editor&apos;s Picks. They are never mixed into ranked editorial lists.</span>
                      </li>
                    </ul>
                  </div>

                  <p className="pt-1">
                    Why we do this: Affiliate revenue alone doesn&apos;t fully fund the editorial work behind 133 destination guides. Featured Partner placements help us pay for the certified guides, the OSINT verification, the photography, and the ongoing updates that keep our content useful. We chose this model &mdash; clearly labeled inventory, structurally separated from editorial content &mdash; over the more common alternative of disguised paid recommendations because it&apos;s the only version we can defend to our readers.
                  </p>

                  <p className="pt-1">
                    <Link href="/partners" className="text-[#2C73FF] hover:text-[#2C73FF]/80 inline-flex items-center gap-1 font-medium">
                      See our Featured Partner program details <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </p>
                </div>
              </div>

              {/* 3. Editor's Picks - Never For Sale */}
              <div className="bg-[#FF5635]/5 rounded-xl p-5 border border-[#FF5635]/20">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-[#FF5635]/10 text-[#FF5635] rounded-full text-xs font-semibold font-sans">3</span>
                  <h3 className="text-[#180204] font-semibold">Editor&apos;s Picks <span className="text-[#FF5635] font-normal text-sm">— never for sale</span></h3>
                </div>
                <p className="text-[#180204]/65 text-sm">
                  The <strong className="text-[#180204]">★ Editor&apos;s Picks</strong> in our restaurant, hotel, and tour guides are selected by our certified Greek tour guides based on personal visits and field verification. These designations are <strong className="text-[#180204]">never available for purchase under any circumstances</strong>. No payment, advertising spend, partnership relationship, or commercial arrangement can result in an Editor&apos;s Pick designation. If we ever decline a Featured Partner deal, it&apos;s usually because the operator wanted something we don&apos;t sell &mdash; most commonly, an Editor&apos;s Pick badge.
                </p>
              </div>

            </div>
          </div>

          {/* What We Don't Do */}
          <div className="bg-white rounded-2xl border border-[#E6DAD1]/60 p-8 md:p-10 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#FF5635]/10 rounded-xl flex items-center justify-center">
                <XCircle className="w-5 h-5 text-[#FF5635]" />
              </div>
              <h2 className="text-2xl text-[#180204]">What We Don&apos;t Do</h2>
            </div>
            <ul className="space-y-3 text-[#180204]/65 font-sans leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-[#FF5635] mt-1.5 text-sm">●</span>
                <span><strong className="text-[#180204]">We don&apos;t accept payment in exchange for editorial recommendations.</strong> Editor&apos;s Picks, &ldquo;Best of&rdquo; rankings, and editorial endorsements are never for sale. Companies cannot pay to be recommended.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FF5635] mt-1.5 text-sm">●</span>
                <span><strong className="text-[#180204]">We don&apos;t publish sponsored articles disguised as editorial content.</strong> Any paid content is clearly labeled, attributed to the sponsor, and visually distinct from our editorial work. We do not ghostwrite or republish sponsor-supplied articles under our team&apos;s bylines.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FF5635] mt-1.5 text-sm">●</span>
                <span><strong className="text-[#180204]">We don&apos;t accept dofollow links on paid placements.</strong> All commercial links carry <code className="bg-[#FAF6F3] px-1.5 py-0.5 rounded text-xs">rel=&quot;sponsored&quot;</code> &mdash; this protects both us and our partners from Google policy issues. Any site that offers dofollow paid links is putting both parties at risk.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FF5635] mt-1.5 text-sm">●</span>
                <span><strong className="text-[#180204]">We don&apos;t run display advertising or programmatic ads.</strong></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FF5635] mt-1.5 text-sm">●</span>
                <span><strong className="text-[#180204]">We don&apos;t sell your data or email address.</strong></span>
              </li>
            </ul>
          </div>

          {/* Editorial Independence */}
          <div className="bg-white rounded-2xl border border-[#E6DAD1]/60 p-8 md:p-10 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#FF5635]/10 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#FF5635]" />
              </div>
              <h2 className="text-2xl text-[#180204]">Editorial Independence</h2>
            </div>
            <div className="space-y-5 text-[#180204]/65 font-sans leading-relaxed">
              <p>
                This is the part we care about most. Our affiliate relationships and Featured Partner placements never influence our editorial recommendations. Here&apos;s how we ensure that:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-[#FF5635] mt-1.5 text-sm">●</span>
                  <span><strong className="text-[#180204]">We recommend first, monetize second.</strong> We choose what to recommend based on quality and experience. Only after making that editorial decision do we check if an affiliate link is available.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#FF5635] mt-1.5 text-sm">●</span>
                  <span><strong className="text-[#180204]">Featured Partners are visually separated from editorial content.</strong> A Featured Partner card in an article does not mean that operator is editorially recommended &mdash; it means they&apos;ve paid for visible placement under our clearly disclosed terms.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#FF5635] mt-1.5 text-sm">●</span>
                  <span><strong className="text-[#180204]">We include negative opinions.</strong> If a popular hotel is overpriced or a famous restaurant has declined, we say so &mdash; even if it means losing potential affiliate or partnership revenue.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#FF5635] mt-1.5 text-sm">●</span>
                  <span><strong className="text-[#180204]">We disclose clearly, both technically and visibly.</strong> All commercial links carry <code className="bg-[#FAF6F3] px-1.5 py-0.5 rounded text-xs">rel=&quot;sponsored&quot;</code>. Featured Partner placements carry visible labels. Articles containing affiliate links include a disclosure notice at the top.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#FF5635] mt-1.5 text-sm">●</span>
                  <span><strong className="text-[#180204]">We&apos;d give the same advice to family.</strong> This is our gut check. If we wouldn&apos;t recommend a place to our own parents or friends visiting Greece, it doesn&apos;t make it into our editorial picks.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Featured Partner Program */}
          <div className="bg-white rounded-2xl border border-[#E6DAD1]/60 p-8 md:p-10 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#2C73FF]/10 rounded-xl flex items-center justify-center">
                <Tag className="w-5 h-5 text-[#2C73FF]" />
              </div>
              <h2 className="text-2xl text-[#180204]">Featured Partner Program</h2>
            </div>
            <div className="space-y-5 text-[#180204]/65 font-sans leading-relaxed">
              <p>
                For complete transparency about what kinds of Featured Partner relationships we accept:
              </p>

              <div className="bg-[#FAF6F3] rounded-xl p-5 border border-[#E6DAD1]/40">
                <h3 className="text-[#180204] font-semibold mb-3 text-sm">We work with:</h3>
                <ul className="space-y-2 text-sm text-[#180204]/65">
                  <li className="flex items-start gap-2">
                    <span className="text-[#2C73FF] mt-1 text-xs">●</span>
                    <span>Travel-related companies operating legitimately in Greece or serving travelers to Greece</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#2C73FF] mt-1 text-xs">●</span>
                    <span>Hotels, tours, transfers, car rentals, restaurants, travel insurance, connectivity, and related travel services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#2C73FF] mt-1 text-xs">●</span>
                    <span>Brands whose offering we would be willing to use ourselves or recommend to a friend</span>
                  </li>
                </ul>
              </div>

              <div className="bg-[#FAF6F3] rounded-xl p-5 border border-[#E6DAD1]/40">
                <h3 className="text-[#180204] font-semibold mb-3 text-sm">We don&apos;t work with:</h3>
                <ul className="space-y-2 text-sm text-[#180204]/65">
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF5635] mt-1 text-xs">●</span>
                    <span>Gambling, crypto, adult content, CBD, weapons, or predatory financial products</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF5635] mt-1 text-xs">●</span>
                    <span>Companies operating outside the travel and tourism vertical</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF5635] mt-1 text-xs">●</span>
                    <span>Pure link-buying intermediaries or SEO agencies acquiring links on behalf of undisclosed clients</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF5635] mt-1 text-xs">●</span>
                    <span>Operators with significant unresolved consumer complaints or reputation issues</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF5635] mt-1 text-xs">●</span>
                    <span>Anyone requesting dofollow links, exact-match commercial anchor text, or undisclosed sponsorship</span>
                  </li>
                </ul>
              </div>

              <div className="bg-[#FAF6F3] rounded-xl p-5 border border-[#E6DAD1]/40">
                <h3 className="text-[#180204] font-semibold mb-3 text-sm">Editorial rules we always apply:</h3>
                <ul className="space-y-2 text-sm text-[#180204]/65">
                  <li className="flex items-start gap-2">
                    <span className="text-[#2C73FF] mt-1 text-xs">●</span>
                    <span>Featured Partner content is reviewed and edited by our team before publication</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#2C73FF] mt-1 text-xs">●</span>
                    <span>Anchor text is limited to brand name, brand + descriptor, or generic phrases</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#2C73FF] mt-1 text-xs">●</span>
                    <span>We retain the right to remove a Featured Partner placement if the operator&apos;s quality, reviews, or operations deteriorate significantly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#2C73FF] mt-1 text-xs">●</span>
                    <span>A pro-rated refund applies if we initiate removal</span>
                  </li>
                </ul>
              </div>

              <p>
                If you&apos;re a travel operator interested in our Featured Partner program, our{' '}
                <Link href="/partners" className="text-[#2C73FF] hover:text-[#2C73FF]/80 font-medium inline-flex items-center gap-1">
                  partner page <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                {' '}has the details.
              </p>
            </div>
          </div>

          {/* AI and Content */}
          <div className="bg-white rounded-2xl border border-[#E6DAD1]/60 p-8 md:p-10 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#2C73FF]/10 rounded-xl flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-[#2C73FF]" />
              </div>
              <h2 className="text-2xl text-[#180204]">Our Use of AI</h2>
            </div>
            <div className="space-y-5 text-[#180204]/65 font-sans leading-relaxed">
              <p>
                We use AI in two distinct ways, and we think it&apos;s important to be clear about both:
              </p>

              <div className="bg-[#FAF6F3] rounded-xl p-5 border border-[#E6DAD1]/40">
                <h3 className="text-[#180204] font-semibold mb-2">The Trip Planner Tool</h3>
                <p className="text-[#180204]/60 text-sm">
                  Our AI trip planner uses artificial intelligence to generate personalized itineraries. It&apos;s trained on our own local knowledge, real ferry data, and years of experience. The AI is a tool for personalizing and scaling the advice we&apos;d give in person. It&apos;s powerful, but it&apos;s not infallible &mdash; we always recommend double-checking ferry schedules and critical bookings independently.
                </p>
              </div>

              <div className="bg-[#FAF6F3] rounded-xl p-5 border border-[#E6DAD1]/40">
                <h3 className="text-[#180204] font-semibold mb-2">Blog Content</h3>
                <p className="text-[#180204]/60 text-sm">
                  AI may assist with research, structuring, or drafting certain parts of our blog content. However, every guide is reviewed, verified, and edited by our team members who have personally visited the destinations. The recommendations, opinions, and local insights come from real human experience. We don&apos;t publish AI-generated content that hasn&apos;t been verified against first-hand knowledge.
                </p>
              </div>
            </div>
          </div>

          {/* Content Accuracy */}
          <div className="bg-white rounded-2xl border border-[#E6DAD1]/60 p-8 md:p-10 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#FF5635]/10 rounded-xl flex items-center justify-center">
                <Heart className="w-5 h-5 text-[#FF5635]" />
              </div>
              <h2 className="text-2xl text-[#180204]">Content Accuracy & Updates</h2>
            </div>
            <div className="space-y-5 text-[#180204]/65 font-sans leading-relaxed">
              <p>
                Travel information changes constantly. A restaurant that was excellent last year might have changed owners. A ferry route might have been discontinued. We do our best to keep everything current, but we&apos;re a small team covering a lot of ground.
              </p>
              <p>
                We review and update our most popular guides regularly. When we update a guide, we note significant changes. If destinations or details have changed, please let us know &mdash; reader feedback is one of the most valuable ways we keep content accurate.
              </p>
              <p>
                <strong className="text-[#180204]">A note on prices:</strong> All prices mentioned in our guides are approximate and based on the time of writing. Greek tourism prices can vary significantly by season, and costs for things like ferries and accommodations change annually. Always verify current prices before booking.
              </p>
            </div>
          </div>

          {/* Photography */}
          <div className="bg-white rounded-2xl border border-[#E6DAD1]/60 p-8 md:p-10 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#2C73FF]/10 rounded-xl flex items-center justify-center">
                <ExternalLink className="w-5 h-5 text-[#2C73FF]" />
              </div>
              <h2 className="text-2xl text-[#180204]">Photography</h2>
            </div>
            <div className="space-y-5 text-[#180204]/65 font-sans leading-relaxed">
              <p>
                We use a mix of original photography taken by our team and licensed stock photography. We try to select images that accurately represent each destination &mdash; not overly filtered or misleading &ldquo;golden hour only&rdquo; shots that make everywhere look like paradise. Greece is beautiful enough without needing to fake it.
              </p>
            </div>
          </div>

          {/* Policy Change Note */}
          <div className="bg-white rounded-2xl border border-[#E6DAD1]/60 p-8 md:p-10 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#FF5635]/10 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#FF5635]" />
              </div>
              <h2 className="text-2xl text-[#180204]">A Note on This Policy Change</h2>
            </div>
            <div className="space-y-5 text-[#180204]/65 font-sans leading-relaxed">
              <p>
                If you&apos;ve read our editorial policy before May 2026, you&apos;ll notice we&apos;ve evolved how we describe our revenue model. The earlier version said we don&apos;t accept &ldquo;paid placements.&rdquo; That was true at the time, but as the site has grown we&apos;ve introduced a transparent Featured Partner program with clear labeling, separation from editorial picks, and the same <code className="bg-[#FAF6F3] px-1.5 py-0.5 rounded text-xs">rel=&quot;sponsored&quot;</code> standards we already applied to affiliate links.
              </p>
              <p>
                We chose to add this category &mdash; and tell you about it openly &mdash; because the alternative was either (a) declining to ever introduce sponsored inventory, which would have limited what we could fund editorially, or (b) doing it quietly without telling you. Option (b) is what most sites do. Option (a) is what idealists do. We chose a third option: transparent labeled inventory with clear rules, which we think is the honest version.
              </p>
              <p>
                If you spot anywhere on the site where the Featured Partner labeling isn&apos;t clear, or where you can&apos;t easily tell editorial from paid, please let us know. That&apos;s the system we&apos;re trying to maintain.
              </p>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-[#180204] rounded-2xl p-8 md:p-10 text-center">
            <h2 className="text-2xl text-white mb-3">Questions About Our Policies?</h2>
            <p className="text-white/60 font-sans mb-6 max-w-lg mx-auto">
              If you have questions about our editorial approach, affiliate relationships, Featured Partner program, or anything else on this page, we&apos;re happy to talk.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/about" className="text-white/70 hover:text-white transition-colors font-sans text-sm inline-flex items-center gap-2">
                Learn more about us <ArrowRight className="w-4 h-4" />
              </Link>
              <span className="hidden sm:inline text-white/30">·</span>
              <Link href="/partners" className="text-white/70 hover:text-white transition-colors font-sans text-sm inline-flex items-center gap-2">
                Featured Partner program <ArrowRight className="w-4 h-4" />
              </Link>
              <span className="hidden sm:inline text-white/30">·</span>
              <Link href="/contact" className="text-white/70 hover:text-white transition-colors font-sans text-sm inline-flex items-center gap-2">
                Contact <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Footer is rendered globally by app/layout.tsx */}
    </main>
  )
}
