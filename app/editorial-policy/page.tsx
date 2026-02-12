import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Shield, BookOpen, Heart, Star, ExternalLink, AlertCircle } from 'lucide-react'

export const metadata = {
  title: 'Editorial Policy & Disclosure | Greek Trip Planner',
  description: 'How we create content, handle affiliate relationships, and maintain editorial independence. Our commitment to honest, experience-based Greece travel advice.',
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

      {/* ===== NAVIGATION ===== */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-50 border-b border-[#E6DAD1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="Greek Trip Planner" width={70} height={21} priority />
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/how-it-works" className="text-[#180204]/70 hover:text-[#FF5635] transition-colors text-sm font-medium">How it Works</Link>
            <Link href="/blog" className="text-[#180204]/70 hover:text-[#FF5635] transition-colors text-sm font-medium">Blog</Link>
            <Link href="/about" className="text-[#180204]/70 hover:text-[#FF5635] transition-colors text-sm font-medium">About</Link>
            <Link href="/ai-trip-planner" className="btn-accent px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2">
              Start Planning <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <Link href="/ai-trip-planner" className="md:hidden btn-accent px-4 py-2 rounded-full text-sm font-semibold">
            Start Planning
          </Link>
        </div>
      </nav>

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
                While all content on Greek Trip Planner is free, the site needs revenue to keep running. Here&apos;s exactly how we generate income:
              </p>

              <div className="bg-[#FAF6F3] rounded-xl p-5 border border-[#E6DAD1]/40">
                <h3 className="text-[#180204] font-semibold mb-2">Affiliate Commissions</h3>
                <p className="text-[#180204]/60 text-sm">
                  This is our primary revenue source. When we link to hotels, tours, ferry bookings, or travel products in our blog posts, some of those links are affiliate links. If you click one and make a purchase, we earn a small commission at no extra cost to you. We work with partners like GetYourGuide, Booking.com, Viator, and similar travel platforms.
                </p>
              </div>

              <div className="bg-[#FAF6F3] rounded-xl p-5 border border-[#E6DAD1]/40">
                <h3 className="text-[#180204] font-semibold mb-2">What We Don&apos;t Do</h3>
                <p className="text-[#180204]/60 text-sm">
                  We do not accept paid placements, sponsored blog posts, or payment from hotels, restaurants, or tour operators to appear in our planner or content. We don&apos;t run display advertising. We don&apos;t sell your data or email address.
                </p>
              </div>

              <p>
                We like affiliate links as a revenue model because they&apos;re relevant, helpful to you, and we maintain full editorial control. No one tells us what to write or what to link to. In most cases, we don&apos;t even have direct contact with the companies &mdash; the links use automated systems. We can recommend or un-recommend anything at any time.
              </p>
            </div>
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
                This is the part we care about most. Our affiliate relationships never influence our recommendations. Here&apos;s how we ensure that:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-[#FF5635] mt-1.5 text-sm">●</span>
                  <span><strong className="text-[#180204]">We recommend first, monetize second.</strong> We choose what to recommend based on quality and experience. Only after making that editorial decision do we check if an affiliate link is available. If it isn&apos;t, the recommendation stays anyway.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#FF5635] mt-1.5 text-sm">●</span>
                  <span><strong className="text-[#180204]">We include negative opinions.</strong> If a popular hotel is overpriced or a famous restaurant has declined, we say so &mdash; even if it means losing potential affiliate revenue.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#FF5635] mt-1.5 text-sm">●</span>
                  <span><strong className="text-[#180204]">We disclose clearly.</strong> Blog posts containing affiliate links include a disclosure notice at the top. You always know when links may generate revenue for us.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#FF5635] mt-1.5 text-sm">●</span>
                  <span><strong className="text-[#180204]">We&apos;d give the same advice to family.</strong> This is our gut check. If we wouldn&apos;t recommend a place to our own parents or friends visiting Greece, it doesn&apos;t make it into our content.</span>
                </li>
              </ul>
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

          {/* Contact */}
          <div className="bg-[#180204] rounded-2xl p-8 md:p-10 text-center">
            <h2 className="text-2xl text-white mb-3">Questions About Our Policies?</h2>
            <p className="text-white/60 font-sans mb-6 max-w-lg mx-auto">
              If you have questions about our editorial approach, affiliate relationships, or anything else on this page, we&apos;re happy to talk.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/about" className="text-white/70 hover:text-white transition-colors font-sans text-sm inline-flex items-center gap-2">
                Learn more about us <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-[#180204] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            <Image src="/logo.png" alt="Greek Trip Planner" width={70} height={21} className="brightness-0 invert mb-6" />
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <Link href="/how-it-works" className="text-white/60 hover:text-[#FF5635] transition-colors text-sm font-sans">How it Works</Link>
              <Link href="/blog" className="text-white/60 hover:text-[#FF5635] transition-colors text-sm font-sans">Blog</Link>
              <Link href="/about" className="text-white/60 hover:text-[#FF5635] transition-colors text-sm font-sans">About</Link>
              <Link href="/editorial-policy" className="text-white/60 hover:text-[#FF5635] transition-colors text-sm font-sans">Editorial Policy</Link>
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
