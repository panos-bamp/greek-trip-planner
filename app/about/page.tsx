import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, MapPin, Compass, Heart, Star, Ship, Utensils, Camera, BookOpen, Shield, Clock, ChevronDown } from 'lucide-react'

export const metadata = {
  title: 'About Us | The Story Behind Greek Trip Planner',
  description: 'Meet the Greece travel experts behind Greek Trip Planner. 15+ years of local experience, 500+ vetted restaurants, and a passion for helping travelers discover the real Greece.',
  openGraph: {
    title: 'About Us | The Story Behind Greek Trip Planner',
    description: 'Meet the Greece travel experts behind Greek Trip Planner.',
    url: 'https://greektriplanner.me/about',
    siteName: 'Greek Trip Planner',
    type: 'website',
  },
}

export default function AboutPage() {
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
            <Link href="/about" className="text-[#FF5635] transition-colors text-sm font-medium">About</Link>
            <Link href="/ai-trip-planner" className="btn-accent px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2">
              Start Planning <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <Link href="/ai-trip-planner" className="md:hidden btn-accent px-4 py-2 rounded-full text-sm font-semibold">
            Start Planning
          </Link>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section className="relative pt-16">
        <div className="relative h-[380px] sm:h-[440px] overflow-hidden">
          <Image
            src="/hero-acropolis.jpg"
            alt="About Greek Trip Planner"
            fill
            className="object-cover"
            priority
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#180204]/75 via-[#180204]/35 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-14 px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-4">
              <Heart className="w-4 h-4 text-[#FF5635]" />
              <span className="text-white/90 text-sm font-medium">Our Story</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl text-white mb-3">Built by People Who<br /><span className="text-[#FF5635]">Actually Live This</span></h1>
            <p className="text-white/70 text-lg max-w-2xl">Not another faceless travel app. We&apos;re Greece locals, expats, and obsessive travelers who&apos;ve spent decades exploring every corner of these islands.</p>
          </div>
        </div>
      </section>

      {/* ===== THE STORY ===== */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="divider-accent mb-8" />
          <h2 className="text-3xl sm:text-4xl text-[#180204] mb-8">How This Started</h2>
          
          <div className="prose-custom space-y-6 text-[#180204]/70 text-lg leading-relaxed font-sans">
            <p>
              I moved to Greece over 15 years ago, originally for &ldquo;a summer.&rdquo; That summer turned into a decade and a half of island-hopping, guiding tours, running accommodations, and falling deeper in love with this country every year. I&apos;ve seen thousands of travelers arrive in Athens excited and leave frustrated because their itinerary was completely unrealistic.
            </p>
            <p>
              The pattern was always the same. Someone would Google &ldquo;10-day Greece itinerary,&rdquo; find a blog post written by someone who spent five days here, and try to cram four islands into six days. They&apos;d spend half their vacation on ferries, miss the quiet beach that&apos;s actually better than the famous one, and eat at whatever TripAdvisor put in front of them &mdash; usually a tourist trap with a view and a markup.
            </p>
            <p>
              I&apos;d watch this happen and think: <em>if they&apos;d just asked a local, their entire trip would have been different.</em>
            </p>
            <p>
              That frustration became this project. What if we could take everything we know &mdash; the real ferry schedules, the tavernas where <em>Greeks</em> actually eat, the timing that makes a day work instead of exhausting you &mdash; and make it accessible to everyone? Not as a consulting service for a few hundred people a year, but as something anyone could use, for free, in three minutes.
            </p>
            <p>
              Greek Trip Planner is that idea, built by a small team of people who live and breathe Greece. We&apos;re not trying to cover the entire world. Greece is complex enough &mdash; 6,000 islands, millennia of history, ferry systems that change with the wind &mdash; that doing it justice requires real specialization.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHAT WE ACTUALLY KNOW ===== */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="divider-accent mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl text-[#180204] mb-4">What We Actually Know</h2>
            <p className="text-[#180204]/60 max-w-xl mx-auto">Not marketing claims &mdash; actual expertise built over years of living, working, and traveling across Greece</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Ship, title: 'Island Logistics & Ferries', desc: 'We\'ve taken hundreds of ferries across the Aegean and Ionian. We know which companies are reliable, which routes get cancelled in wind, and how to build island-hopping sequences that actually work.' },
              { icon: Utensils, title: 'Where Greeks Actually Eat', desc: 'We know restaurant owners by name. When we recommend a taverna, it\'s because we\'ve eaten there dozens of times — not because it has good reviews from tourists who visited once.' },
              { icon: MapPin, title: 'Every Season, Every Island', desc: 'Greece in August and Greece in October are two completely different countries. We\'ve experienced both, across dozens of islands, and our recommendations account for seasonal realities.' },
              { icon: Clock, title: 'Realistic Timing', desc: 'The difference between a stressful day and a perfect one is usually about two hours of buffer. We factor in actual walking times, ferry delays, meal durations, and the Greek concept of \"siga siga\" (slowly, slowly).' },
              { icon: Camera, title: 'Beyond the Obvious', desc: 'Yes, Oia sunset is beautiful. But the view from Imerovigli is better, with a fraction of the crowd. We\'ve spent years finding the spots that don\'t show up on Instagram.' },
              { icon: Compass, title: 'Mainland Expertise Too', desc: 'Meteora, Nafplio, the Peloponnese, Zagori villages — Greece isn\'t just islands. Some of our favorite recommendations are on the mainland, where most tourists never go.' },
            ].map((item) => (
              <div key={item.title} className="bg-[#FAF6F3] rounded-2xl p-7 group">
                <div className="w-12 h-12 bg-[#FF5635]/10 rounded-xl flex items-center justify-center mb-5">
                  <item.icon className="w-6 h-6 text-[#FF5635]" />
                </div>
                <h3 className="text-lg text-[#180204] mb-2 font-sans font-semibold">{item.title}</h3>
                <p className="text-[#180204]/55 text-sm leading-relaxed font-sans">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== NUMBERS ===== */}
      <section className="py-16 bg-[#FAF6F3]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '15+', label: 'Years Living in Greece', color: 'text-[#FF5635]' },
              { value: '12,000+', label: 'Itineraries Created', color: 'text-[#2C73FF]' },
              { value: '500+', label: 'Restaurants Personally Vetted', color: 'text-[#FF5635]' },
              { value: '4.9/5', label: 'Average Traveler Rating', color: 'text-[#2C73FF]' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className={`text-3xl sm:text-4xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-[#180204]/50 text-sm mt-2 font-sans">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TRUST & TRANSPARENCY ===== */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="divider-accent mb-8" />
          <h2 className="text-3xl sm:text-4xl text-[#180204] mb-8">How We Stay Honest</h2>
          
          <div className="space-y-6 text-[#180204]/70 text-lg leading-relaxed font-sans">
            <p>
              In an era of sponsored content and hidden advertising, we think transparency matters. Here&apos;s how we operate:
            </p>
          </div>

          <div className="mt-10 space-y-6">
            <div className="bg-[#FAF6F3] rounded-2xl p-6 border border-[#E6DAD1]/60">
              <h3 className="text-lg text-[#180204] font-sans font-semibold mb-2">No Paid Placements</h3>
              <p className="text-[#180204]/60 font-sans leading-relaxed">No hotel, restaurant, or tour operator has ever paid to appear in our planner or blog. Recommendations are based purely on personal experience and quality. If a place declines, we remove it.</p>
            </div>
            <div className="bg-[#FAF6F3] rounded-2xl p-6 border border-[#E6DAD1]/60">
              <h3 className="text-lg text-[#180204] font-sans font-semibold mb-2">Affiliate Links &mdash; Fully Disclosed</h3>
              <p className="text-[#180204]/60 font-sans leading-relaxed">Some links in our blog earn us a small commission if you book through them &mdash; primarily for accommodations, tours, and ferry tickets. This never influences what we recommend. We&apos;d suggest the same places to our own family. Full details in our <Link href="/editorial-policy" className="text-[#FF5635] hover:underline">editorial policy</Link>.</p>
            </div>
            <div className="bg-[#FAF6F3] rounded-2xl p-6 border border-[#E6DAD1]/60">
              <h3 className="text-lg text-[#180204] font-sans font-semibold mb-2">Content We&apos;d Want to Read</h3>
              <p className="text-[#180204]/60 font-sans leading-relaxed">Every guide is written from real experience. We write the kind of travel advice we&apos;d want to find ourselves &mdash; practical, honest, and occasionally opinionated. If a popular island is overhyped, we&apos;ll tell you. If a little-known beach is extraordinary, we&apos;ll share it (reluctantly).</p>
            </div>
            <div className="bg-[#FAF6F3] rounded-2xl p-6 border border-[#E6DAD1]/60">
              <h3 className="text-lg text-[#180204] font-sans font-semibold mb-2">Regular Updates</h3>
              <p className="text-[#180204]/60 font-sans leading-relaxed">Greece changes. Restaurants close, ferries reroute, new gems open. We review and update our guides regularly &mdash; not annually, but as things change. If you notice something outdated, please let us know.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHY FREE ===== */}
      <section className="py-16 md:py-24 bg-[#FAF6F3]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="divider-accent mb-8" />
          <h2 className="text-3xl sm:text-4xl text-[#180204] mb-8">&ldquo;If It&apos;s Good, Why Is It Free?&rdquo;</h2>
          
          <div className="space-y-6 text-[#180204]/70 text-lg leading-relaxed font-sans">
            <p>
              Fair question. We get it a lot.
            </p>
            <p>
              The honest answer is that this started as a passion project, not a business plan. We were already helping friends, family, and friends-of-friends plan their Greece trips for free. The AI planner just lets us do that at scale.
            </p>
            <p>
              We earn enough through transparent affiliate partnerships to keep the lights on and the content fresh. That model means we never need to charge you, upsell you, or put the best recommendations behind a paywall.
            </p>
            <p>
              Keeping it free also means more people experience the real Greece &mdash; the kind we fell in love with. That matters more to us than maximizing revenue.
            </p>
          </div>
        </div>
      </section>

      {/* ===== EDITORIAL LINK ===== */}
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#180204]/60 font-sans mb-4">Curious about how we create content and handle commercial relationships?</p>
          <Link href="/editorial-policy" className="text-[#FF5635] font-semibold font-sans hover:underline inline-flex items-center gap-2">
            Read Our Editorial Policy & Disclosure <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0">
          <Image src="/Santorini_Sunset_View.jpg" alt="Greek islands sunset" fill className="object-cover" />
          <div className="absolute inset-0 bg-[#180204]/65" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl sm:text-5xl text-white mb-6">Let Our Expertise<br />Guide Your Trip</h2>
          <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">You&apos;re not just getting an AI tool &mdash; you&apos;re getting decades of Greece expertise distilled into personalized recommendations.</p>
          <Link href="/ai-trip-planner" className="btn-accent px-10 py-4 rounded-full text-lg font-semibold inline-flex items-center gap-3">
            Start Planning Free <ArrowRight className="w-5 h-5" />
          </Link>
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
