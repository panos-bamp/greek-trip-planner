import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Clock, MapPin, Star, Compass, Ship, ChevronDown, Sun, Utensils, Landmark, Heart, Gem, Shield, Sparkles, Users, Zap, Globe, Calendar, Camera } from 'lucide-react'

export const metadata = {
  title: 'How It Works | Greek Trip Planner — AI-Powered Greece Itineraries',
  description: 'Learn how our free AI trip planner creates personalized Greece itineraries in 3 minutes. Real ferry schedules, local expertise, and smart recommendations for every traveler.',
  openGraph: {
    title: 'How It Works | Greek Trip Planner',
    description: 'Learn how our free AI trip planner creates personalized Greece itineraries in 3 minutes.',
    url: 'https://greektriplanner.me/how-it-works',
    siteName: 'Greek Trip Planner',
    images: [{ url: '/hero-acropolis.jpg', width: 1200, height: 630 }],
    type: 'website',
  },
}

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-[#FAF6F3]">

      {/* ===== NAVIGATION ===== */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-50 border-b border-[#E6DAD1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="Greek Trip Planner" width={70} height={21} priority />
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/how-it-works" className="text-[#FF5635] transition-colors text-sm font-semibold">How it Works</Link>
            <Link href="/blog" className="text-[#180204]/70 hover:text-[#FF5635] transition-colors text-sm font-medium">Blog</Link>
            <Link href="/about" className="text-[#180204]/70 hover:text-[#FF5635] transition-colors text-sm font-medium">About</Link>
            <Link
              href="/ai-trip-planner"
              className="btn-accent px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2"
            >
              Start Planning <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <Link href="/ai-trip-planner" className="md:hidden btn-accent px-4 py-2 rounded-full text-sm font-semibold">
            Start Planning
          </Link>
        </div>
      </nav>

      {/* ===== PAGE HERO ===== */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-[#FAF6F3]" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF5635]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#2C73FF]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-[#FF5635]/10 rounded-full px-4 py-1.5 mb-6">
            <Sparkles className="w-4 h-4 text-[#FF5635]" />
            <span className="text-[#FF5635] text-sm font-semibold">Simple · Smart · Free</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl text-[#180204] leading-[1.08] mb-6">
            From <span className="text-[#FF5635]">Questions</span> to<br />
            Your Perfect Itinerary
          </h1>

          <p className="text-lg text-[#180204]/60 leading-relaxed max-w-2xl mx-auto mb-10">
            Our AI combines your personal preferences with 15+ years of local Greek expertise to create day-by-day itineraries that actually work. Here&apos;s how it all comes together.
          </p>

          <Link
            href="/ai-trip-planner"
            className="btn-accent px-8 py-4 rounded-full text-lg font-semibold inline-flex items-center gap-3"
          >
            Try It Now — It&apos;s Free <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* ===== THE 3-STEP PROCESS ===== */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* STEP 1 — Tell Us */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24 lg:mb-32">
            {/* Image */}
            <div className="relative">
              <div className="rounded-4xl overflow-hidden aspect-[4/3] relative">
                <Image
                  src="/Santorini_Evening_Glow.jpg"
                  alt="Smart AI personalization for your Greece trip"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#180204]/30 to-transparent" />
              </div>
              {/* Step badge */}
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-[#FF5635] rounded-2xl flex flex-col items-center justify-center shadow-lg">
                <span className="text-white/60 text-[10px] font-sans font-medium uppercase tracking-wider">Step</span>
                <span className="text-white text-2xl font-bold font-sans leading-none">1</span>
              </div>
            </div>

            {/* Content */}
            <div>
              <h2 className="text-3xl sm:text-4xl text-[#180204] mb-5">Tell Us About Your Dream Trip</h2>
              <p className="text-[#180204]/65 text-lg leading-relaxed mb-8">
                Answer 11 quick questions — it takes about 3 minutes, like chatting with a friend who happens to be a Greece expert. We learn what matters to YOU, not what generic travel algorithms assume.
              </p>

              {/* What we ask */}
              <div className="space-y-4">
                {[
                  { icon: Calendar, label: 'Travel dates & trip length', desc: 'So we can account for seasonal conditions, crowds, and pricing' },
                  { icon: Users, label: 'Who you\'re traveling with', desc: 'Solo, couple, family, or friends — each gets a different vibe' },
                  { icon: Heart, label: 'Your interests & pace', desc: 'Beaches vs. history, fast-paced vs. relaxed, nightlife vs. quiet villages' },
                  { icon: Star, label: 'Budget & travel style', desc: 'Backpacker to luxury — we match recommendations to your comfort level' },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#FF5635]/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                      <item.icon className="w-5 h-5 text-[#FF5635]" />
                    </div>
                    <div>
                      <div className="text-[#180204] font-sans font-semibold text-sm">{item.label}</div>
                      <div className="text-[#180204]/50 text-sm font-sans">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* STEP 2 — AI Magic */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24 lg:mb-32">
            {/* Content (left on desktop) */}
            <div className="lg:order-1">
              <h2 className="text-3xl sm:text-4xl text-[#180204] mb-5">Our AI Does the Heavy Lifting</h2>
              <p className="text-[#180204]/65 text-lg leading-relaxed mb-8">
                This isn&apos;t ChatGPT with a Greece prompt. Our AI is built on a proprietary knowledge base — real ferry data, vetted restaurant picks, tested island-hopping routes, and insights from 15+ years of actually living in Greece.
              </p>

              {/* What the AI does */}
              <div className="space-y-4">
                {[
                  { icon: Ship, label: 'Cross-references real ferry routes', desc: 'Actual schedules, connection times, and port logistics — not guesswork' },
                  { icon: MapPin, label: 'Optimizes geographic flow', desc: 'No backtracking or wasted travel days — the right island order matters' },
                  { icon: Clock, label: 'Builds realistic daily timing', desc: 'Travel time, meal breaks, rest periods, and site visit durations factored in' },
                  { icon: Utensils, label: 'Matches local knowledge to your style', desc: 'Romantic taverna for couples, family-friendly beach for kids, nightlife for friends' },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#2C73FF]/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                      <item.icon className="w-5 h-5 text-[#2C73FF]" />
                    </div>
                    <div>
                      <div className="text-[#180204] font-sans font-semibold text-sm">{item.label}</div>
                      <div className="text-[#180204]/50 text-sm font-sans">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="relative lg:order-2">
              <div className="rounded-4xl overflow-hidden aspect-[4/3] relative">
                <Image
                  src="/Mykonos_Architecture.jpg"
                  alt="Local insider knowledge built into our AI"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#180204]/30 to-transparent" />
              </div>
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-[#2C73FF] rounded-2xl flex flex-col items-center justify-center shadow-lg">
                <span className="text-white/60 text-[10px] font-sans font-medium uppercase tracking-wider">Step</span>
                <span className="text-white text-2xl font-bold font-sans leading-none">2</span>
              </div>
            </div>
          </div>

          {/* STEP 3 — Get & Customize */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <div className="relative">
              <div className="rounded-4xl overflow-hidden aspect-[4/3] relative">
                <Image
                  src="/Meteora_Sunset_View.jpg"
                  alt="Get your personalized Greece itinerary"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#180204]/30 to-transparent" />
              </div>
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-[#180204] rounded-2xl flex flex-col items-center justify-center shadow-lg">
                <span className="text-white/60 text-[10px] font-sans font-medium uppercase tracking-wider">Step</span>
                <span className="text-white text-2xl font-bold font-sans leading-none">3</span>
              </div>
            </div>

            {/* Content */}
            <div>
              <h2 className="text-3xl sm:text-4xl text-[#180204] mb-5">Your Itinerary, Your Rules</h2>
              <p className="text-[#180204]/65 text-lg leading-relaxed mb-8">
                Receive a complete day-by-day plan — then make it yours. Swap activities, adjust timing, add your own discoveries. Think of it as the perfect starting point from someone who really knows Greece.
              </p>

              {/* What you get */}
              <div className="space-y-4">
                {[
                  { icon: Calendar, label: 'Day-by-day schedule', desc: 'Morning, afternoon, evening — every part of your day thoughtfully planned' },
                  { icon: Compass, label: 'Island-hopping route', desc: 'The optimal sequence with ferry connections that actually work' },
                  { icon: Camera, label: 'Hidden gems & insider tips', desc: 'Secret beaches, local festivals, viewpoints tourists never find' },
                  { icon: Zap, label: 'Fully editable', desc: 'Your plan, your trip — adjust anything and make it uniquely yours' },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#180204]/8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                      <item.icon className="w-5 h-5 text-[#180204]" />
                    </div>
                    <div>
                      <div className="text-[#180204] font-sans font-semibold text-sm">{item.label}</div>
                      <div className="text-[#180204]/50 text-sm font-sans">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES — What's Included ===== */}
      <section className="section-padding bg-[#FAF6F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="divider-accent mx-auto mb-4" />
            <h2 className="text-4xl sm:text-5xl text-[#180204] mb-4">Everything Your Trip Needs</h2>
            <p className="text-[#180204]/60 max-w-xl mx-auto">Built-in features that replace hours of research and expensive travel agents</p>
          </div>

          {/* Feature cards — 2x3 grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Ship,
                title: 'Island Hopping Routes',
                desc: 'Optimized ferry schedules and routes connecting the most beautiful Greek islands. We plan the perfect island-hopping sequence so you never miss a connection or waste a day on logistics.',
                img: '/Santorini_Evening_Glow.jpg',
              },
              {
                icon: Heart,
                title: 'Authentic Experiences',
                desc: 'From cooking classes to sunset sailing, discover authentic Greek experiences and hidden tavernas you won\'t find in guidebooks. Activities matched to your interests and travel style.',
                img: '/Mykonos_Architecture.jpg',
              },
              {
                icon: Star,
                title: 'Budget Optimization',
                desc: 'Smart recommendations for every budget level. Stretch your euros further with insider tips, seasonal deals, shoulder-season suggestions, and money-saving strategies that don\'t sacrifice quality.',
                img: '/Paros_Cyclades_Charm.jpg',
              },
              {
                icon: Landmark,
                title: 'Historical Expertise',
                desc: 'Skip-the-line strategies, best times to visit ancient sites, and cultural context that brings 3,000 years of history to life. Know what to prioritize and what to skip.',
                img: '/hero-acropolis.jpg',
              },
              {
                icon: Utensils,
                title: 'Local Dining Guide',
                desc: 'Authentic Greek cuisine from seaside tavernas to hidden mountain spots. Every restaurant is a place where locals actually eat — not tourist traps near the entrance of attractions.',
                img: '/Crete_Knossos_Ruins.jpg',
              },
              {
                icon: Gem,
                title: 'Hidden Gems',
                desc: 'Discover secret beaches, local festivals, and off-the-beaten-path villages that tourist guidebooks never mention. The places that make a trip unforgettable, curated from 15+ years of living here.',
                img: '/Corfu_Beach_Paradise.jpg',
              },
            ].map((feature) => (
              <div key={feature.title} className="bg-white rounded-3xl overflow-hidden card-hover group">
                <div className="relative h-44 overflow-hidden">
                  <Image src={feature.img} alt={feature.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#180204]/40 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <div className="bg-[#FF5635] w-10 h-10 rounded-xl flex items-center justify-center">
                      <feature.icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl text-[#180204] mb-2 font-sans font-semibold">{feature.title}</h3>
                  <p className="text-[#180204]/55 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SERVICES — Organize It All ===== */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="divider-accent mx-auto mb-4" />
            <h2 className="text-4xl sm:text-5xl text-[#180204] mb-4">All Your Travel Logistics</h2>
            <p className="text-[#180204]/60 max-w-xl mx-auto">Organized in one place — no more 47 browser tabs</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: MapPin, title: 'Hotels & Villas', desc: 'From boutique hotels to luxury villas with Aegean views. We recommend the best areas to stay in each destination, matched to your budget and travel style.' },
              { icon: Ship, title: 'Flights & Ferries', desc: 'Real ferry schedules, flight connections, and inter-island transportation timing. All the logistics handled so you don\'t miss connections or waste travel days.' },
              { icon: Utensils, title: 'Tavernas & Dining', desc: 'Authentic Greek cuisine from seaside tavernas to hidden local spots. Every recommendation is a place where Greeks actually eat — not tourist-trap restaurants.' },
              { icon: Compass, title: 'Tours & Activities', desc: 'Archaeological tours, sailing trips, cooking classes, and adventure activities curated by locals. Matched to your interests and pace preference.' },
              { icon: Gem, title: 'Hidden Gems', desc: 'Discover secret beaches, local festivals, and off-the-beaten-path villages tourists never find. The experiences that turn a good trip into an unforgettable one.' },
              { icon: Shield, title: '100% Free Forever', desc: 'No hidden fees, no premium tiers, no credit card required. We believe great travel planning should be accessible to every traveler, regardless of budget.' },
            ].map((service) => (
              <div key={service.title} className="bg-[#FAF6F3] rounded-2xl p-7 card-hover group">
                <div className="w-12 h-12 bg-[#FF5635]/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#FF5635] transition-colors duration-300">
                  <service.icon className="w-6 h-6 text-[#FF5635] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-lg text-[#180204] mb-2 font-sans font-semibold">{service.title}</h3>
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
            <p className="text-[#180204]/60">See how we compare to the alternatives</p>
          </div>

          <div className="bg-white rounded-4xl overflow-hidden shadow-sm border border-[#E6DAD1]">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#E6DAD1]">
                    <th className="text-left p-4 text-[#180204]/50 font-medium font-sans">Feature</th>
                    <th className="p-4 text-center font-sans">
                      <span className="text-[#FF5635] font-bold">Greek Trip Planner</span>
                    </th>
                    <th className="p-4 text-center text-[#180204]/70 font-medium font-sans">Travel Agencies</th>
                    <th className="p-4 text-center text-[#180204]/70 font-medium font-sans">Manual Research</th>
                  </tr>
                </thead>
                <tbody className="font-sans">
                  {[
                    ['Cost', '100% Free', '€500-2000', 'Free (but...)'],
                    ['Time to Create', '3 Minutes', '1-2 Weeks', '40+ Hours'],
                    ['Personalization', 'AI-Customized', 'Generic Packages', 'DIY Effort'],
                    ['Real Ferry Times', '✓ Included', 'Sometimes', 'Manual Research'],
                    ['Local Knowledge', '15+ Years', 'Varies', 'Reddit/TripAdvisor'],
                    ['Instant Results', '✓ Yes', '✗ No', '✗ No'],
                    ['Editable Plan', '✓ Fully', 'Limited Changes', 'N/A'],
                    ['Hidden Gems', '✓ Insider Picks', 'Rarely', 'If You\'re Lucky'],
                  ].map((row, i) => (
                    <tr key={i} className={i < 7 ? 'border-b border-[#E6DAD1]/60' : ''}>
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
            <h2 className="text-4xl sm:text-5xl text-[#180204] mb-4">Questions & Answers</h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'Is the Greece itinerary planner really free?',
                a: 'Yes! 100% free, forever. No hidden fees, no premium tiers, no credit card required. No account to create. Just answer questions and get your itinerary instantly.',
              },
              {
                q: 'How is this different from ChatGPT or other AI tools?',
                a: 'Generic AI tools scrape the internet and produce cookie-cutter suggestions. Our AI is built on a proprietary database of 15+ years of local Greek expertise — real ferry data, vetted restaurants, tested routes, and insights you can\'t Google.',
              },
              {
                q: 'How accurate are the ferry times?',
                a: 'We use real ferry schedule data, but times can change seasonally. We always recommend double-checking with official ferry websites (like ferries.gr) closer to your travel dates, especially for shoulder season trips.',
              },
              {
                q: 'Can I modify the itinerary after it\'s generated?',
                a: 'Absolutely! Your itinerary is completely editable. Think of it as a smart starting point you can customize. Swap days, change activities, add your own discoveries — it\'s your trip.',
              },
              {
                q: 'What time of year is best to visit Greece?',
                a: 'Shoulder season (April-May, September-October) offers perfect weather, fewer crowds, and better prices. Peak season (June-August) is hot and crowded but all islands operate fully. The AI adjusts recommendations based on your travel dates.',
              },
              {
                q: 'How many days do I need for Greece?',
                a: 'Minimum 5-7 days for Athens + 1 island. The ideal first trip is 10-14 days for Athens + 2-3 islands. For a comprehensive trip, plan 14-21 days. Our AI optimizes any duration you choose.',
              },
              {
                q: 'Do I need to create an account?',
                a: 'Nope! No sign-up, no email, no account needed. Just answer 11 questions and get your personalized itinerary instantly. We value your privacy and your time.',
              },
            ].map((faq, i) => (
              <details key={i} className="group bg-[#FAF6F3] rounded-2xl border border-[#E6DAD1]/60">
                <summary className="flex items-center justify-between cursor-pointer p-6 text-[#180204] font-sans font-semibold text-lg list-none">
                  {faq.q}
                  <ChevronDown className="w-5 h-5 text-[#FF5635] group-open:rotate-180 transition-transform flex-shrink-0 ml-4" />
                </summary>
                <div className="px-6 pb-6 text-[#180204]/65 leading-relaxed font-sans">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="relative py-20 md:py-28">
        <div className="absolute inset-0">
          <Image
            src="/Santorini_Sunset_View.jpg"
            alt="Start planning your Greece trip"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#180204]/70" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl text-white mb-6">
            Ready to See It<br />in Action?
          </h2>
          <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
            3 minutes. 11 questions. One perfectly personalized Greek itinerary — completely free.
          </p>
          <Link
            href="/ai-trip-planner"
            className="btn-accent px-10 py-4 rounded-full text-lg font-semibold inline-flex items-center gap-3"
          >
            Start Planning My Trip <ArrowRight className="w-5 h-5" />
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
              <Link href="/how-it-works" className="text-white/60 hover:text-[#FF5635] transition-colors text-sm font-sans">How it Works</Link>
              <Link href="/blog" className="text-white/60 hover:text-[#FF5635] transition-colors text-sm font-sans">Blog</Link>
              <Link href="/about" className="text-white/60 hover:text-[#FF5635] transition-colors text-sm font-sans">About</Link>
            </div>
            <div className="border-t border-white/10 w-full pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-white/40 text-sm font-sans">&copy; 2026 Greek Trip Planner. All rights reserved.</p>
              <div className="flex items-center gap-4">
                <a href="https://traveltourismdirectory.com/" className="text-white/40 hover:text-white/60 transition-colors text-sm font-sans" target="_blank" rel="noopener noreferrer">
                  Travel and Tourism Directory
                </a>
                <a href="https://bookmarktravel.com/" target="_blank" rel="noopener noreferrer">
                  <Image
                    src="https://bookmarktravel.com/images/bookmarktravel-234.jpg"
                    alt="Bookmark Travel"
                    width={117}
                    height={20}
                    className="opacity-50 hover:opacity-80 transition-opacity"
                    unoptimized
                  />
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
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "How It Works - Greek Trip Planner",
              "description": "Learn how our free AI trip planner creates personalized Greece itineraries in 3 minutes.",
              "url": "https://greektriplanner.me/how-it-works"
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Is the Greece itinerary planner really free?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes! 100% free, forever. No hidden fees, no premium tiers, no credit card required."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How is this different from ChatGPT or other AI tools?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Our AI is built on a proprietary database of 15+ years of local Greek expertise — real ferry data, vetted restaurants, tested routes."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How accurate are the ferry times?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We use real ferry schedule data, but times can change seasonally. Double-check with official ferry websites closer to your travel dates."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can I modify the itinerary after it's generated?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Absolutely! Your itinerary is completely editable. Think of it as a smart starting point you can customize."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What time of year is best to visit Greece?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Shoulder season (April-May, Sept-Oct) offers perfect weather, fewer crowds, and better prices. Peak season (June-Aug) is hot and crowded but all islands operate."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How many days do I need for Greece?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Minimum 5-7 days (Athens + 1 island). Ideal first trip is 10-14 days (Athens + 2-3 islands). Comprehensive trip: 14-21 days."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Do I need to create an account?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Nope! No sign-up, no email, no account needed. Just answer 11 questions and get your personalized itinerary instantly."
                  }
                }
              ]
            }
          ])
        }}
      />
    </main>
  )
}
