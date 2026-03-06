import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight, MapPin, Utensils, Compass, Star, ChevronDown, Ship,
  Landmark, Sun, Shield, Gem, Heart, Users, Sparkles, BookOpen,
  Map, BarChart3, TrendingUp, Globe, Zap,
} from 'lucide-react'

export const metadata = {
  title: 'AI Greece Trip Planner | 133 Destinations · Free Itinerary Generator 2026',
  description: 'The world\'s most comprehensive AI Greece trip planner. 133 destinations, 11 regions, built by 5 Greek tourism experts. Create your personalized itinerary in 3 minutes — free.',
  openGraph: {
    title: 'AI Greece Trip Planner | 133 Destinations · Free Itinerary Generator 2026',
    description: 'The world\'s most comprehensive AI Greece trip planner. 133 destinations built by 5 local experts. Free personalized itineraries in 3 minutes.',
    url: 'https://greektriplanner.me',
    siteName: 'Greek Trip Planner',
    images: [{ url: '/hero-acropolis.jpg', width: 1200, height: 630 }],
    type: 'website',
  },
}

// ─── Featured destinations for the teaser ────────────────────────────────────
const featuredDestinations = [
  { name: 'Santorini', desc: 'Iconic caldera views',   img: '/Santorini_Sunset_View.jpg',     slug: 'santorini' },
  { name: 'Athens',    desc: 'History & modern life',  img: '/hero-acropolis.jpg',             slug: 'athens'    },
  { name: 'Crete',     desc: 'Beaches & gorges',       img: '/Crete_Knossos_Ruins.jpg',        slug: 'crete'     },
  { name: 'Mykonos',   desc: 'Glamour & nightlife',    img: '/Mykonos_Architecture.jpg',       slug: 'mykonos'   },
  { name: 'Rhodes',    desc: 'Medieval old town',      img: '/Rhodes_Historic_Quarter.jpg',    slug: 'rhodes'    },
  { name: 'Meteora',   desc: 'Monasteries in the sky', img: '/Meteora_Mountain_Monastery.jpg', slug: 'meteora'   },
]

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#FAF6F3]">
      {/* Navbar is rendered globally in layout.tsx — do NOT add it here */}

      {/* ===== HERO ===== */}
      <section className="relative min-h-[92vh] flex items-center pt-24 pb-12">
        <div className="absolute inset-0">
          <Image src="/hero-acropolis.jpg" alt="Athens Acropolis" fill className="object-cover" priority quality={85} />
          <div className="gradient-hero absolute inset-0" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <div className="animate-fade-in-up inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6">
              <Sparkles className="w-4 h-4 text-[#FF5635]" />
              <span className="text-white/90 text-sm font-medium">The World&apos;s Most Comprehensive Greece Trip Planner</span>
            </div>
            <h1 className="animate-fade-in-up delay-100 text-5xl sm:text-6xl md:text-7xl text-white leading-[1.05] mb-6">
              133 Destinations.<br />
              <span className="text-[#FF5635]">One Perfect Trip.</span>
            </h1>
            <p className="animate-fade-in-up delay-200 text-lg sm:text-xl text-white/80 max-w-lg mb-10 leading-relaxed font-light">
              The only AI planner built by 5 Greek tourism professionals who actually live and work here. 13 questions, 3 minutes, a day-by-day itinerary no other tool can match.
            </p>
            <div className="animate-fade-in-up delay-300">
              <Link href="/ai-trip-planner" className="btn-accent px-8 py-4 rounded-full text-lg font-semibold inline-flex items-center gap-3 animate-pulse-glow">
                Plan My Trip Free <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="animate-fade-in-up delay-400 mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-lg">
              {[
                { value: '133', label: 'Destinations' },
                { value: '11',  label: 'Regions Covered' },
                { value: '5',   label: 'Local Experts' },
                { value: '100%', label: 'Free Forever' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-white/50 text-xs mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-subtle-float">
          <ChevronDown className="w-6 h-6 text-white/40" />
        </div>
      </section>

      {/* ===== WHY THIS IS DIFFERENT ===== */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="divider-accent mx-auto mb-4" />
            <h2 className="text-4xl sm:text-5xl text-[#180204] mb-4">Not Just Another AI Planner</h2>
            <p className="text-[#180204]/60 max-w-2xl mx-auto">Most travel AI scrapes the internet and gives you what everyone else gets. Ours is built on something no algorithm can replicate: decades of real Greek tourism expertise, encoded into 133 destination profiles.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-[#FF5635]/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <Globe className="w-8 h-8 text-[#FF5635]" />
              </div>
              <h3 className="text-2xl text-[#180204] mb-3">133 Destinations</h3>
              <p className="text-[#180204]/55 leading-relaxed">From Santorini to Samothrace, from Nafplio to Nisyros. Every island, village, archaeological site, and hidden beach — each with a dedicated travel guide written from first-hand experience.</p>
            </div>
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-[#2C73FF]/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <Users className="w-8 h-8 text-[#2C73FF]" />
              </div>
              <h3 className="text-2xl text-[#180204] mb-3">5 Greek Experts</h3>
              <p className="text-[#180204]/55 leading-relaxed">A Peloponnese tour operator, a Cretan hotel owner, an Athens transfer specialist, a Northern Greece supplier, and an engineer who connects it all. Real people, real expertise.</p>
            </div>
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-[#FF5635]/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <Zap className="w-8 h-8 text-[#FF5635]" />
              </div>
              <h3 className="text-2xl text-[#180204] mb-3">13 Smart Questions</h3>
              <p className="text-[#180204]/55 leading-relaxed">Our AI doesn&apos;t just ask where you want to go — it understands your pace, your crowd tolerance, your dining style, your experience level. Then it matches you to destinations you&apos;d never find alone.</p>
            </div>
          </div>
          <div className="text-center mt-10">
            <Link href="/ai-trip-planner" className="btn-accent px-8 py-4 rounded-full text-lg font-semibold inline-flex items-center gap-3">
              Try It Free — 3 Minutes <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-[#180204]/40 text-sm mt-3 font-sans">No account · No credit card · Instant results</p>
          </div>
        </div>
      </section>

      {/* ===== THREE PILLARS — what this site is ===== */}
      <section className="section-padding bg-[#FAF6F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-14">
            <div className="divider-accent mx-auto mb-4" />
            <h2 className="text-4xl sm:text-5xl text-[#180204] mb-4">Everything Greece.<br />One Place.</h2>
            <p className="text-[#180204]/60 max-w-2xl mx-auto">
              Three products built on the same foundation: real expertise from 5 Greek professionals who live and work here.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">

            {/* Pillar 1 — AI Trip Planner */}
            <Link href="/ai-trip-planner" className="group relative bg-[#180204] rounded-3xl p-8 overflow-hidden card-hover flex flex-col">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#FF5635]/10 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <div className="w-14 h-14 bg-[#FF5635]/15 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#FF5635]/25 transition-colors">
                <Sparkles className="w-7 h-7 text-[#FF5635]" />
              </div>
              <div className="flex-1">
                <div className="text-[#FF5635] text-xs font-bold uppercase tracking-widest font-sans mb-2">AI Trip Planner</div>
                <h3 className="text-2xl text-white mb-3">Your Itinerary in 3 Minutes</h3>
                <p className="text-white/50 text-sm leading-relaxed font-sans">
                  Answer 13 questions about your travel style, group, and budget. Get a personalised day-by-day itinerary with realistic ferry routes — built on local knowledge no other AI has.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-2 text-[#FF5635] text-sm font-semibold font-sans group-hover:gap-3 transition-all">
                Start Planning Free <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            {/* Pillar 2 — Travel Guides */}
            <Link href="/destinations" className="group relative bg-white rounded-3xl p-8 overflow-hidden card-hover border border-[#E6DAD1]/60 flex flex-col">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#2C73FF]/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <div className="w-14 h-14 bg-[#2C73FF]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#2C73FF]/20 transition-colors">
                <BookOpen className="w-7 h-7 text-[#2C73FF]" />
              </div>
              <div className="flex-1">
                <div className="text-[#2C73FF] text-xs font-bold uppercase tracking-widest font-sans mb-2">Travel Guides</div>
                <h3 className="text-2xl text-[#180204] mb-3">133 Destination Guides</h3>
                <p className="text-[#180204]/55 text-sm leading-relaxed font-sans">
                  Every Greek island, city, and region covered — from Santorini to Samothrace. Expert-written guides with beaches, restaurants, transport, and what to actually skip.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-2 text-[#2C73FF] text-sm font-semibold font-sans group-hover:gap-3 transition-all">
                Explore Destinations <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            {/* Pillar 3 — Insights */}
            <Link href="/insights" className="group relative bg-white rounded-3xl p-8 overflow-hidden card-hover border border-[#E6DAD1]/60 flex flex-col">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#FF5635]/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <div className="w-14 h-14 bg-[#FF5635]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#FF5635]/20 transition-colors">
                <BarChart3 className="w-7 h-7 text-[#FF5635]" />
              </div>
              <div className="flex-1">
                <div className="text-[#FF5635] text-xs font-bold uppercase tracking-widest font-sans mb-2">Insights & Data</div>
                <h3 className="text-2xl text-[#180204] mb-3">Greek Tourism Analytics</h3>
                <p className="text-[#180204]/55 text-sm leading-relaxed font-sans">
                  Original market research, visitor statistics, and industry trend analysis you won&apos;t find elsewhere. For travellers who want context — and professionals who need data.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-2 text-[#FF5635] text-sm font-semibold font-sans group-hover:gap-3 transition-all">
                View Insights <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* ===== DESTINATIONS TEASER ===== */}
      <section className="section-padding bg-[#FAF6F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <div className="divider-accent mb-4" />
              <h2 className="text-4xl sm:text-5xl text-[#180204] mb-2">Explore Greece</h2>
              <p className="text-[#180204]/55 max-w-md">Islands, cities & hidden gems — 133 destinations with dedicated guides.</p>
            </div>
            <Link
              href="/destinations"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-[#FF5635] border border-[#FF5635]/25 hover:border-[#FF5635] rounded-full px-5 py-2.5 transition-all hover:bg-[#FF5635]/5 flex-shrink-0 font-sans"
            >
              View All 133 Destinations
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* 6-card grid — 3 cols on md+, 2 on mobile */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {featuredDestinations.map((dest, i) => (
              <Link
                key={dest.slug}
                href={`/blog/${dest.slug}-travel-guide`}
                className={`group relative rounded-2xl overflow-hidden card-hover ${
                  i === 0 ? 'md:col-span-2 md:row-span-2' : ''
                }`}
                style={{ aspectRatio: i === 0 ? 'auto' : '4/3' }}
              >
                <div className={`relative w-full ${i === 0 ? 'h-[340px] md:h-full' : 'aspect-[4/3]'}`}>
                  <Image
                    src={dest.img}
                    alt={dest.name}
                    fill
                    className="object-cover group-hover:scale-[1.05] transition-transform duration-600"
                    sizes={i === 0 ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 50vw, 33vw'}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#180204]/80 via-[#180204]/15 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                  <h3 className={`text-white mb-0.5 ${i === 0 ? 'text-2xl sm:text-3xl' : 'text-lg'}`}>
                    {dest.name}
                  </h3>
                  <p className="text-white/58 text-xs font-sans">{dest.desc}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Quick region pills */}
          <div className="flex flex-wrap gap-2 mb-6">
            {[
              { label: '🌊 Cyclades', href: '/destinations#islands' },
              { label: '⚓ Dodecanese', href: '/destinations#islands' },
              { label: '🌿 Ionian', href: '/destinations#islands' },
              { label: '🏛️ Athens & Mainland', href: '/destinations#mainland' },
              { label: '🏝️ Crete', href: '/destinations#crete' },
              { label: '💎 Hidden Gems', href: '/destinations#hidden' },
            ].map((pill) => (
              <Link
                key={pill.label}
                href={pill.href}
                className="bg-[#FAF6F3] border border-[#E6DAD1] text-[#180204]/65 hover:text-[#FF5635] hover:border-[#FF5635]/30 hover:bg-[#FF5635]/5 px-4 py-1.5 rounded-full text-sm font-sans font-medium transition-all"
              >
                {pill.label}
              </Link>
            ))}
          </div>

          {/* Planning guide pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {[
              { label: '7-Day Itinerary',      href: '/blog/greece-itinerary-7-days' },
              { label: '10-Day Itinerary',     href: '/blog/greece-itinerary-10-days' },
              { label: 'Budget Guide',         href: '/blog/how-much-does-a-trip-to-greece-cost' },
              { label: 'First Time in Greece', href: '/blog/where-to-go-in-greece-for-first-time' },
              { label: '3 Days in Athens',     href: '/blog/3-days-in-athens' },
              { label: '3 Days in Santorini',  href: '/blog/3-days-in-santorini' },
            ].map((pill) => (
              <Link
                key={pill.label}
                href={pill.href}
                className="bg-[#FF5635]/8 border border-[#FF5635]/15 text-[#FF5635] hover:bg-[#FF5635] hover:text-white px-4 py-1.5 rounded-full text-sm font-sans font-medium transition-all"
              >
                {pill.label}
              </Link>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="bg-[#180204] rounded-3xl px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-white font-semibold text-lg mb-1">All 133 destinations, fully mapped.</p>
              <p className="text-white/45 text-sm font-sans">Cyclades, Dodecanese, Crete, Peloponnese, Northern Greece and more — each with a dedicated guide.</p>
            </div>
            <Link
              href="/destinations"
              className="btn-accent px-7 py-3.5 rounded-full font-semibold text-sm font-sans flex items-center gap-2 flex-shrink-0 whitespace-nowrap"
            >
              Browse All Destinations <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FEATURES GRID ===== */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="divider-accent mx-auto mb-4" />
            <h2 className="text-4xl sm:text-5xl text-[#180204] mb-4">Everything You Need</h2>
            <p className="text-[#180204]/60 max-w-xl mx-auto">For your perfect Greek adventure</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'Island Hopping Routes', desc: 'Optimized ferry schedules and routes connecting the most beautiful Greek islands. We plan the perfect island-hopping sequence so you never miss a connection.', img: '/Santorini_Evening_Glow.jpg', icon: Ship },
              { title: 'Authentic Experiences', desc: 'From cooking classes to sunset sailing, discover authentic Greek experiences and hidden tavernas you won\'t find in guidebooks.', img: '/Mykonos_Architecture.jpg', icon: Heart },
              { title: 'Budget Optimization', desc: 'Smart recommendations for every budget. Stretch your euros further with insider tips, seasonal deals, and money-saving strategies.', img: '/Paros_Cyclades_Charm.jpg', icon: Star },
              { title: 'Historical Expertise', desc: 'Skip-the-line strategies, best times to visit ancient sites, and cultural context that brings 3,000 years of history to life.', img: '/hero-acropolis.jpg', icon: Landmark },
            ].map((feature) => (
              <div key={feature.title} className="bg-white rounded-4xl overflow-hidden card-hover">
                <div className="relative h-52 overflow-hidden">
                  <Image src={feature.img} alt={feature.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#180204]/40 to-transparent" />
                  <div className="absolute bottom-4 left-5">
                    <div className="bg-[#FF5635] w-10 h-10 rounded-xl flex items-center justify-center">
                      <feature.icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl text-[#180204] mb-3">{feature.title}</h3>
                  <p className="text-[#180204]/60 leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== GREECE TOURISM INSIGHTS ===== */}
      <section className="section-padding bg-[#FAF6F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="divider-accent mb-4" />
              <h2 className="text-4xl sm:text-5xl text-[#180204] mb-6">Greece Tourism<br /><span className="text-[#2C73FF]">Insights & Data</span></h2>
              <p className="text-[#180204]/65 text-lg leading-relaxed mb-8">
                We don&apos;t just help you plan trips — we analyze the Greek tourism industry at a level nobody else does. Original research, real data, and the kind of analysis that shapes how professionals and travelers understand Greece.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: BarChart3,   label: 'Market Reports',          desc: 'Revenue data, visitor statistics, industry forecasts' },
                  { icon: TrendingUp,  label: 'Trend Analysis',          desc: 'Emerging patterns in Greek travel demand' },
                  { icon: MapPin,      label: 'Destination Performance', desc: 'Which regions are growing and why' },
                  { icon: Globe,       label: 'Source Markets',          desc: 'Where Greece\'s visitors come from' },
                ].map((item) => (
                  <div key={item.label} className="bg-[#FAF6F3] rounded-xl p-4 border border-[#E6DAD1]/40">
                    <item.icon className="w-5 h-5 text-[#2C73FF] mb-2" />
                    <h4 className="text-sm font-semibold text-[#180204] font-sans">{item.label}</h4>
                    <p className="text-xs text-[#180204]/50 font-sans mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
              <Link href="/insights" className="inline-flex items-center gap-2 px-6 py-3 bg-[#2C73FF] text-white rounded-full font-semibold hover:bg-[#1a5fe0] transition-colors">
                Explore All Insights <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="bg-[#180204] rounded-3xl p-8 md:p-10">
              <div className="flex items-center gap-2 mb-8">
                <BarChart3 className="w-5 h-5 text-[#FF5635]" />
                <span className="text-white/70 text-sm font-semibold font-sans uppercase tracking-wider">Key Statistics</span>
              </div>
              <div className="space-y-6">
                {[
                  { value: '€22B+', label: 'Greece tourism revenue (2025)',        trend: '+12%'  },
                  { value: '36M+',  label: 'International arrivals to Greece',      trend: '+8%'   },
                  { value: '23%',   label: 'Tourism share of Greek GDP',            trend: 'Stable' },
                  { value: '#1',    label: 'European destination for island tourism', trend: '—'   },
                ].map((stat, i) => (
                  <div key={i} className="flex items-center justify-between border-b border-white/10 pb-5 last:border-0 last:pb-0">
                    <div>
                      <div className="text-3xl font-bold text-white">{stat.value}</div>
                      <div className="text-white/45 text-sm font-sans mt-1">{stat.label}</div>
                    </div>
                    <span className={`text-xs font-semibold font-sans px-2.5 py-1 rounded-full ${
                      stat.trend.startsWith('+')  ? 'bg-emerald-500/15 text-emerald-400'  :
                      stat.trend === 'Stable'     ? 'bg-amber-500/15 text-amber-400'      :
                                                    'bg-white/10 text-white/40'
                    }`}>
                      {stat.trend}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-white/40 text-xs font-sans">Sources: INSETE, Bank of Greece, GNTO, Eurostat. Updated regularly with original analysis.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="divider-accent mx-auto mb-4" />
            <h2 className="text-4xl sm:text-5xl text-[#180204] mb-4">Organize It All</h2>
            <p className="text-[#180204]/60 max-w-xl mx-auto">In one place</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: MapPin,   title: 'Hotels & Villas',    desc: 'From boutique hotels to luxury villas with Aegean views. Find your perfect Greek home base.' },
              { icon: Ship,     title: 'Flights & Ferries',  desc: 'Real ferry schedules, flight connections, and inter-island transportation timing. All the logistics handled.' },
              { icon: Utensils, title: 'Tavernas & Dining',  desc: 'Authentic Greek cuisine from seaside tavernas to hidden local spots. Where Greeks actually eat.' },
              { icon: Compass,  title: 'Tours & Activities', desc: 'Archaeological tours, sailing trips, cooking classes, and adventure activities curated by locals.' },
              { icon: Gem,      title: 'Hidden Gems',        desc: 'Discover secret beaches, local festivals, and off-the-beaten-path villages tourists never find.' },
              { icon: Shield,   title: '100% Free Forever',  desc: 'No hidden fees, no premium tiers, no credit card required. Seriously—completely free.' },
            ].map((service) => (
              <div key={service.title} className="bg-white rounded-2xl p-7 card-hover group border border-[#E6DAD1]/40">
                <div className="w-12 h-12 bg-[#FF5635]/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#FF5635] transition-colors duration-300">
                  <service.icon className="w-6 h-6 text-[#FF5635] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl text-[#180204] mb-2 font-sans font-semibold">{service.title}</h3>
                <p className="text-[#180204]/55 text-sm leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== COMPARISON TABLE ===== */}
      <section className="section-padding bg-[#FAF6F3]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="divider-accent mx-auto mb-4" />
            <h2 className="text-4xl sm:text-5xl text-[#180204] mb-4">Stop Wasting Time</h2>
            <p className="text-[#180204]/60">Start planning smart</p>
          </div>
          <div className="bg-[#FAF6F3] rounded-4xl overflow-hidden shadow-sm border border-[#E6DAD1]">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#E6DAD1]">
                    <th className="text-left p-4 text-[#180204]/50 font-medium font-sans">Feature</th>
                    <th className="p-4 text-center font-sans"><span className="text-[#FF5635] font-bold">Greek Trip Planner</span></th>
                    <th className="p-4 text-center text-[#180204]/70 font-medium font-sans">Travel Agencies</th>
                    <th className="p-4 text-center text-[#180204]/70 font-medium font-sans">Manual Research</th>
                  </tr>
                </thead>
                <tbody className="font-sans">
                  {[
                    ['Cost',                   '100% Free',       '€500-2000',      'Free (but...)'],
                    ['Time to Create',          '3 Minutes',       '1-2 Weeks',      '40+ Hours'],
                    ['Destinations Covered',    '133 with Guides', '10-20 Popular',  'Whatever You Find'],
                    ['Personalization',         'AI + 13 Questions','Generic Packages','DIY Effort'],
                    ['Local Knowledge',         '5 Greek Experts', 'Varies',         'Reddit/TripAdvisor'],
                    ['Instant Results',         '✓ Yes',           '✗ No',           '✗ No'],
                  ].map((row, i) => (
                    <tr key={i} className={i < 5 ? 'border-b border-[#E6DAD1]/60' : ''}>
                      <td className="p-4 text-[#180204]/70 font-medium">{row[0]}</td>
                      <td className="p-4 text-center font-semibold text-[#FF5635]">{row[1]}</td>
                      <td className="p-4 text-center text-[#180204]/50">{row[2]}</td>
                      <td className="p-4 text-center text-[#180204]/50">{row[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="section-padding bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="divider-accent mx-auto mb-4" />
            <h2 className="text-4xl sm:text-5xl text-[#180204] mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-5">
            {[
              { q: 'Is the Greece itinerary planner really free?', a: 'Yes! 100% free, forever. No hidden fees, no premium tiers, no credit card required.' },
              { q: 'Do I need to create an account?', a: 'Nope! No sign-up, no email, no account needed. Just answer questions and get your itinerary instantly.' },
              { q: 'How is this different from ChatGPT or other AI tools?', a: 'Generic AI tools scrape the internet. Ours is built on a proprietary database of 133 Greek destinations, each profiled by tourism professionals who live and work across Greece. The result is itineraries with realistic ferry routes, seasonal accuracy, and recommendations no generic AI can match.' },
              { q: 'How accurate are the ferry times?', a: 'We use real ferry schedule data, but times can change seasonally. Always double-check with official ferry websites closer to your travel dates.' },
              { q: "Can I modify the itinerary after it's generated?", a: "Absolutely! Your itinerary is completely editable. Think of it as a smart starting point you can customize." },
              { q: 'What time of year is best to visit Greece?', a: 'Shoulder season (April-May, Sept-Oct) offers perfect weather, fewer crowds, and better prices. Peak season (June-Aug) is hot and crowded but all islands operate.' },
            ].map((faq, i) => (
              <details key={i} className="group bg-white rounded-2xl border border-[#E6DAD1]/60">
                <summary className="flex items-center justify-between cursor-pointer p-6 text-[#180204] font-sans font-semibold text-lg list-none">
                  {faq.q}
                  <ChevronDown className="w-5 h-5 text-[#FF5635] group-open:rotate-180 transition-transform flex-shrink-0 ml-4" />
                </summary>
                <div className="px-6 pb-6 text-[#180204]/65 leading-relaxed font-sans">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="section-padding bg-[#FAF6F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="divider-accent mx-auto mb-4" />
            <h2 className="text-4xl sm:text-5xl text-[#180204] mb-4">What Travelers Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { quote: 'This Greece trip planner saved us SO much time! The itinerary was spot-on, and the ferry timing estimates were actually accurate. Highly recommend!', name: 'Sarah M.', location: 'California' },
              { quote: "Best free travel tool I've used. The local restaurant recommendations alone were worth it. Found gems we never would have discovered otherwise.", name: 'James T.', location: 'UK' },
              { quote: "As a first-timer to Greece, I was overwhelmed. This AI planner made everything simple and gave me confidence in my itinerary. Trip was perfect!", name: 'Maria L.', location: 'Australia' },
            ].map((testimonial, i) => (
              <div key={i} className="bg-[#FAF6F3] rounded-3xl p-8 border border-[#E6DAD1]/60 card-hover">
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, j) => (<Star key={j} className="w-4 h-4 text-[#FF5635] fill-[#FF5635]" />))}
                </div>
                <p className="text-[#180204]/70 leading-relaxed mb-6 font-sans italic">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#FF5635]/10 rounded-full flex items-center justify-center text-[#FF5635] font-bold text-sm font-sans">{testimonial.name.charAt(0)}</div>
                  <div>
                    <div className="text-[#180204] font-semibold text-sm font-sans">{testimonial.name}</div>
                    <div className="text-[#180204]/45 text-xs font-sans">{testimonial.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0">
          <Image src="/Santorini_Sunset_View.jpg" alt="Greek islands sunset" fill className="object-cover" />
          <div className="absolute inset-0 bg-[#180204]/65" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl text-white mb-6">
            133 Destinations.<br />
            <span className="text-[#FF5635]">Your Perfect Trip.</span>
          </h2>
          <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">The most comprehensive AI Greece trip planner in the world. Built by locals, powered by real expertise, completely free.</p>
          <Link href="/ai-trip-planner" className="btn-accent px-10 py-4 rounded-full text-lg font-semibold inline-flex items-center gap-3">
            Start Planning My Greece Trip <ArrowRight className="w-5 h-5" />
          </Link>
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-white/50 text-sm font-sans">
            <span>100% Free Forever</span>
            <span>No Credit Card</span>
            <span>No Account Needed</span>
            <span>Instant Results</span>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-[#180204] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            <Image src="/logo.png" alt="Greek Trip Planner" width={70} height={21} className="brightness-0 invert mb-6" />
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <Link href="/how-it-works"     className="text-white/60 hover:text-[#FF5635] transition-colors text-sm font-sans">How it Works</Link>
              <Link href="/destinations"     className="text-white/60 hover:text-[#FF5635] transition-colors text-sm font-sans">Destinations</Link>
              <Link href="/blog"             className="text-white/60 hover:text-[#FF5635] transition-colors text-sm font-sans">Blog</Link>
              <Link href="/insights"         className="text-white/60 hover:text-[#FF5635] transition-colors text-sm font-sans">Insights</Link>
              <Link href="/about"            className="text-white/60 hover:text-[#FF5635] transition-colors text-sm font-sans">About</Link>
              <Link href="/contact"          className="text-white/60 hover:text-[#FF5635] transition-colors text-sm font-sans">Contact</Link>
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

      {/* ===== SCHEMA MARKUP ===== */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Greek Trip Planner — AI Itinerary Generator',
            description: "The world's most comprehensive AI Greece trip planner. 133 destinations, 11 regions, built by 5 Greek tourism experts. Free personalized itineraries in 3 minutes.",
            url: 'https://greektriplanner.me',
            applicationCategory: 'TravelApplication',
            operatingSystem: 'Any',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
          })
        }}
      />
    </main>
  )
}
