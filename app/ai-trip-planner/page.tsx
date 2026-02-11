import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Clock, MapPin, Star, CheckCircle, Sparkles, Users, Calendar, Compass, Ship, ChevronDown, Sun, Utensils, Camera } from 'lucide-react'

export const metadata = {
  title: 'AI Greece Trip Planner Tool | Free Personalized Itinerary Generator',
  description: 'Create your personalized Greece itinerary in 3 minutes. Our AI analyzes your travel style, budget, and interests to build the perfect Greek island-hopping plan. 100% free.',
  openGraph: {
    title: 'AI Greece Trip Planner Tool | Free Personalized Itinerary Generator',
    description: 'Create your personalized Greece itinerary in 3 minutes. Our AI analyzes your travel style, budget, and interests to build the perfect plan.',
    url: 'https://greektriplanner.me/ai-trip-planner',
    siteName: 'Greek Trip Planner',
    images: [{ url: '/hero-acropolis.jpg', width: 1200, height: 630 }],
    type: 'website',
  },
}

export default function PlannerPage() {
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
            <Link
              href="/quiz"
              className="btn-accent px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2"
            >
              Start Planning <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <Link href="/quiz" className="md:hidden btn-accent px-4 py-2 rounded-full text-sm font-semibold">
            Start Planning
          </Link>
        </div>
      </nav>

      {/* ===== HERO — Tool Introduction ===== */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-24 bg-[#FAF6F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left — Text content */}
            <div>
              <div className="inline-flex items-center gap-2 bg-[#FF5635]/10 rounded-full px-4 py-1.5 mb-6">
                <Sparkles className="w-4 h-4 text-[#FF5635]" />
                <span className="text-[#FF5635] text-sm font-semibold">Free AI-Powered Tool</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl text-[#180204] leading-[1.08] mb-6">
                Your Personal<br />
                <span className="text-[#FF5635]">Greece Itinerary</span><br />
                in 3 Minutes
              </h1>

              <p className="text-lg text-[#180204]/65 leading-relaxed mb-8 max-w-lg">
                Answer 11 quick questions about your travel style, interests, and budget. Our AI — powered by 15+ years of local expertise — builds a day-by-day itinerary customized to you.
              </p>

              {/* Quick trust badges */}
              <div className="flex flex-wrap gap-4 mb-10">
                {[
                  { icon: Clock, text: '3 min to complete' },
                  { icon: CheckCircle, text: '100% free forever' },
                  { icon: Users, text: '12,000+ itineraries created' },
                ].map((badge) => (
                  <div key={badge.text} className="flex items-center gap-2 text-[#180204]/60 text-sm">
                    <badge.icon className="w-4 h-4 text-[#2C73FF]" />
                    <span>{badge.text}</span>
                  </div>
                ))}
              </div>

              {/* Primary CTA */}
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <Link
                  href="/quiz"
                  className="btn-accent px-8 py-4 rounded-full text-lg font-semibold flex items-center gap-3 animate-pulse-glow"
                >
                  Create My Itinerary <ArrowRight className="w-5 h-5" />
                </Link>
                <div className="flex items-center gap-2 text-sm text-[#180204]/45 pt-2">
                  <span>No account needed</span>
                  <span className="text-[#180204]/20">·</span>
                  <span>No credit card</span>
                </div>
              </div>
            </div>

            {/* Right — Itinerary Preview Mockup */}
            <div className="relative">
              <div className="bg-white rounded-3xl shadow-xl border border-[#E6DAD1] overflow-hidden">
                {/* Mockup header */}
                <div className="bg-[#180204] px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sun className="w-4 h-4 text-[#FF5635]" />
                    <span className="text-white text-sm font-semibold font-sans">Your Greece Itinerary</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF5635]/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#2C73FF]/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white/30" />
                  </div>
                </div>

                {/* Mockup itinerary content */}
                <div className="p-6 space-y-4">
                  {/* Trip overview bar */}
                  <div className="flex items-center justify-between text-xs font-sans text-[#180204]/50 pb-3 border-b border-[#E6DAD1]/60">
                    <span>10 Days · 2 Travelers · Mid-Range Budget</span>
                    <span className="text-[#FF5635] font-semibold">AI-Generated</span>
                  </div>

                  {/* Day 1 */}
                  <div className="flex gap-4 items-start">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-[#FF5635] rounded-full flex items-center justify-center text-white text-xs font-bold font-sans">1</div>
                      <div className="w-0.5 h-12 bg-[#E6DAD1] mt-1" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-[#180204] font-sans">Athens — Arrival & Acropolis</div>
                      <div className="text-xs text-[#180204]/50 font-sans mt-1">Acropolis · Plaka Walking Tour · Rooftop Dinner</div>
                      <div className="flex gap-2 mt-2">
                        <span className="text-xs bg-[#FF5635]/8 text-[#FF5635] px-2 py-0.5 rounded-full font-sans">Culture</span>
                        <span className="text-xs bg-[#2C73FF]/8 text-[#2C73FF] px-2 py-0.5 rounded-full font-sans">Dining</span>
                      </div>
                    </div>
                  </div>

                  {/* Day 2-3 */}
                  <div className="flex gap-4 items-start">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-[#2C73FF] rounded-full flex items-center justify-center text-white text-xs font-bold font-sans">2-3</div>
                      <div className="w-0.5 h-12 bg-[#E6DAD1] mt-1" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-[#180204] font-sans">Athens — Deep Exploration</div>
                      <div className="text-xs text-[#180204]/50 font-sans mt-1">Ancient Agora · National Museum · Monastiraki</div>
                      <div className="flex gap-2 mt-2">
                        <span className="text-xs bg-amber-500/8 text-amber-600 px-2 py-0.5 rounded-full font-sans">History</span>
                        <span className="text-xs bg-green-500/8 text-green-600 px-2 py-0.5 rounded-full font-sans">Local Food</span>
                      </div>
                    </div>
                  </div>

                  {/* Day 4-6 */}
                  <div className="flex gap-4 items-start">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-[#180204] rounded-full flex items-center justify-center text-white text-xs font-bold font-sans">4-6</div>
                      <div className="w-0.5 h-6 bg-[#E6DAD1] mt-1" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-[#180204] font-sans">Santorini — Caldera & Sunsets</div>
                      <div className="text-xs text-[#180204]/50 font-sans mt-1">Ferry from Piraeus · Oia · Wine Tasting · Beaches</div>
                      <div className="flex gap-2 mt-2">
                        <span className="text-xs bg-purple-500/8 text-purple-600 px-2 py-0.5 rounded-full font-sans">Romance</span>
                        <span className="text-xs bg-[#FF5635]/8 text-[#FF5635] px-2 py-0.5 rounded-full font-sans">Adventure</span>
                      </div>
                    </div>
                  </div>

                  {/* More indicator */}
                  <div className="flex items-center gap-2 text-[#FF5635] text-sm font-sans font-medium pt-2 pl-12">
                    <span>+ Days 7-10: Naxos & Return</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-2 sm:-right-4 bg-white rounded-2xl shadow-lg border border-[#E6DAD1] px-4 py-3 flex items-center gap-3">
                <div className="flex -space-x-1.5">
                  {['S', 'J', 'M'].map((letter, i) => (
                    <div key={i} className="w-7 h-7 bg-[#FF5635]/10 border-2 border-white rounded-full flex items-center justify-center text-[#FF5635] text-xs font-bold font-sans">
                      {letter}
                    </div>
                  ))}
                </div>
                <div className="text-xs font-sans">
                  <div className="font-semibold text-[#180204]">4.9/5 Rating</div>
                  <div className="text-[#180204]/45">from 847 travelers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHAT YOU'LL GET ===== */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="divider-accent mx-auto mb-4" />
            <h2 className="text-4xl sm:text-5xl text-[#180204] mb-4">What You&apos;ll Get</h2>
            <p className="text-[#180204]/60 max-w-xl mx-auto">Your AI-generated itinerary includes everything you need for the perfect Greek trip</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Calendar,
                title: 'Day-by-Day Schedule',
                desc: 'A complete daily plan with morning, afternoon, and evening activities. Realistic timing that accounts for travel between locations, meal breaks, and rest.',
                color: '#FF5635',
              },
              {
                icon: Ship,
                title: 'Ferry & Transport Routes',
                desc: 'Real ferry schedules between islands, airport transfer tips, and the most efficient routes. No more guessing logistics — we handle the connections.',
                color: '#2C73FF',
              },
              {
                icon: Utensils,
                title: 'Restaurant Picks',
                desc: 'Handpicked tavernas and restaurants where locals actually eat. From seaside fish tavernas to hidden mountain spots — authentic Greek cuisine.',
                color: '#FF5635',
              },
              {
                icon: Camera,
                title: 'Hidden Gems & Tips',
                desc: 'Secret beaches, lesser-known viewpoints, and local festivals most tourists miss. 15+ years of living in Greece distilled into insider recommendations.',
                color: '#2C73FF',
              },
              {
                icon: MapPin,
                title: 'Accommodation Areas',
                desc: 'Best neighborhoods and areas to stay in each destination, matched to your budget. Know exactly where to book for the best experience.',
                color: '#FF5635',
              },
              {
                icon: Compass,
                title: 'Island-Hopping Logic',
                desc: 'Optimized island sequences that minimize travel time and maximize experiences. The right order matters — we get it right every time.',
                color: '#2C73FF',
              },
            ].map((item) => (
              <div key={item.title} className="bg-[#FAF6F3] rounded-2xl p-7 card-hover group">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300"
                  style={{ backgroundColor: `${item.color}15` }}
                >
                  <item.icon className="w-6 h-6 transition-colors duration-300" style={{ color: item.color }} />
                </div>
                <h3 className="text-xl text-[#180204] mb-2 font-sans font-semibold">{item.title}</h3>
                <p className="text-[#180204]/55 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== THE PROCESS — 3 Steps ===== */}
      <section className="section-padding bg-[#FAF6F3]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="divider-accent mx-auto mb-4" />
            <h2 className="text-4xl sm:text-5xl text-[#180204] mb-4">How It Works</h2>
            <p className="text-[#180204]/60 max-w-xl mx-auto">From questions to your perfect itinerary — in three simple steps</p>
          </div>

          <div className="space-y-8">
            {[
              {
                step: '01',
                title: 'Tell Us About Your Trip',
                desc: 'Answer 11 quick questions: when you\'re traveling, who you\'re with, your interests, budget, and travel style. Takes about 3 minutes — like chatting with a friend who knows Greece inside out.',
                detail: 'Questions cover: travel dates, group type, budget range, interests (beaches, history, nightlife, food), pace preference, and must-see destinations.',
                color: '#FF5635',
              },
              {
                step: '02',
                title: 'AI Builds Your Itinerary',
                desc: 'Our AI combines your answers with our local knowledge database — real ferry schedules, seasonal tips, authentic restaurant picks, and 15+ years of on-the-ground expertise in Greece.',
                detail: 'The AI cross-references over 100 destinations, thousands of activities, and real-time logistics to create something uniquely yours.',
                color: '#2C73FF',
              },
              {
                step: '03',
                title: 'Get Your Plan & Customize',
                desc: 'Receive a complete day-by-day itinerary you can edit, share, and use. Swap activities, adjust timing, add your own discoveries. It\'s your trip — we just gave you the perfect starting point.',
                detail: 'Your itinerary is fully editable. Save it, share it with travel companions, or use it as inspiration to build your own variation.',
                color: '#180204',
              },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-3xl p-8 md:p-10 border border-[#E6DAD1]/60 card-hover">
                <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">
                  {/* Step number */}
                  <div
                    className="text-4xl font-bold font-sans flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center text-white"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.step}
                  </div>
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-2xl sm:text-3xl text-[#180204] mb-3">{item.title}</h3>
                    <p className="text-[#180204]/65 text-lg leading-relaxed mb-4">{item.desc}</p>
                    <p className="text-[#180204]/45 text-sm leading-relaxed border-l-2 border-[#E6DAD1] pl-4">{item.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA after process */}
          <div className="text-center mt-14">
            <Link
              href="/quiz"
              className="btn-accent px-8 py-4 rounded-full text-lg font-semibold inline-flex items-center gap-3"
            >
              Start My Itinerary Now <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-[#180204]/40 text-sm mt-4 font-sans">Free forever · No account needed · Results in 3 minutes</p>
          </div>
        </div>
      </section>

      {/* ===== WHAT MAKES US DIFFERENT ===== */}
      <section className="section-padding bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="divider-accent mx-auto mb-4" />
            <h2 className="text-4xl sm:text-5xl text-[#180204] mb-4">Why This Isn&apos;t Just Another Planner</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left — What others do */}
            <div className="bg-[#FAF6F3] rounded-3xl p-8 border border-[#E6DAD1]/60">
              <h3 className="text-xl text-[#180204]/40 font-sans font-semibold mb-6">Generic AI Planners</h3>
              <ul className="space-y-4">
                {[
                  'Copy-paste itineraries from travel blogs',
                  '"Visit 5 islands in 3 days" fantasy plans',
                  'No real ferry schedules or logistics',
                  'Restaurant picks from outdated databases',
                  'Zero local knowledge — just internet scraping',
                  'One-size-fits-all for every traveler',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[#180204]/45 text-sm font-sans">
                    <span className="text-[#180204]/25 mt-0.5">✗</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right — What we do */}
            <div className="bg-[#180204] rounded-3xl p-8 text-white">
              <h3 className="text-xl font-sans font-semibold mb-6 text-[#FF5635]">Greek Trip Planner</h3>
              <ul className="space-y-4">
                {[
                  'AI trained on 15+ years of local expertise',
                  'Realistic timing with actual travel distances',
                  'Real ferry schedules and connection data',
                  'Tavernas where Greeks actually eat',
                  'Hidden gems only locals know about',
                  'Personalized to YOUR style and budget',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/80 text-sm font-sans">
                    <CheckCircle className="w-4 h-4 text-[#FF5635] mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SOCIAL PROOF — Testimonials ===== */}
      <section className="section-padding bg-[#FAF6F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="divider-accent mx-auto mb-4" />
            <h2 className="text-4xl sm:text-5xl text-[#180204] mb-4">Trusted by 12,000+ Travelers</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: 'The itinerary was spot-on. Ferry timing was accurate, restaurants were amazing, and the hidden beach recommendation in Naxos was the highlight of our trip.',
                name: 'Sarah M.',
                location: 'California',
                trip: '10 days, couple',
              },
              {
                quote: 'We were planning to wing it, but this tool gave us such a solid plan we actually stuck to it. The AI really understood that we wanted authentic experiences, not tourist traps.',
                name: 'James T.',
                location: 'UK',
                trip: '14 days, family',
              },
              {
                quote: 'First time in Greece and I was overwhelmed by options. The planner simplified everything and gave me confidence. The Meteora recommendation was life-changing.',
                name: 'Maria L.',
                location: 'Australia',
                trip: '12 days, solo',
              },
            ].map((testimonial, i) => (
              <div key={i} className="bg-white rounded-3xl p-8 border border-[#E6DAD1]/60 card-hover">
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-[#FF5635] fill-[#FF5635]" />
                  ))}
                </div>
                <p className="text-[#180204]/70 leading-relaxed mb-6 font-sans italic text-sm">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#FF5635]/10 rounded-full flex items-center justify-center text-[#FF5635] font-bold text-sm font-sans">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-[#180204] font-semibold text-sm font-sans">{testimonial.name}</div>
                      <div className="text-[#180204]/45 text-xs font-sans">{testimonial.location}</div>
                    </div>
                  </div>
                  <span className="text-[#2C73FF] text-xs font-sans font-medium bg-[#2C73FF]/8 px-2 py-1 rounded-full">{testimonial.trip}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="section-padding bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="divider-accent mx-auto mb-4" />
            <h2 className="text-4xl sm:text-5xl text-[#180204] mb-4">Common Questions</h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'Is this really 100% free?',
                a: 'Yes — completely free, forever. No hidden fees, no premium tiers, no credit card required, no account to create. We believe great travel planning should be accessible to everyone.',
              },
              {
                q: 'How personalized is the itinerary?',
                a: 'Very. The AI analyzes your travel dates, group composition, budget range, interests, pace preference, and must-see destinations. Two travelers with different preferences will get completely different itineraries for the same dates.',
              },
              {
                q: 'Can I edit the itinerary after it\'s generated?',
                a: 'Absolutely. Think of your generated itinerary as a smart starting point. You can swap activities, adjust timing, add your own discoveries, or rearrange days. It\'s your trip — we just gave you the framework.',
              },
              {
                q: 'How accurate are the ferry schedules?',
                a: 'We use real ferry route data, but schedules can change seasonally. We always recommend double-checking with official ferry websites closer to your travel dates, especially for shoulder season trips.',
              },
              {
                q: 'What if I\'m not sure about my travel dates yet?',
                a: 'No problem. You can provide approximate dates or just the month and trip length. The AI will adapt its recommendations to the season — different months mean different island conditions, crowds, and pricing.',
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
            alt="Santorini sunset"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#180204]/70" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl text-white mb-6">
            Ready to Plan Your<br /><span className="text-[#FF5635]">Greek Adventure?</span>
          </h2>
          <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
            11 questions. 3 minutes. One perfectly personalized itinerary.
          </p>
          <Link
            href="/quiz"
            className="btn-accent px-10 py-4 rounded-full text-lg font-semibold inline-flex items-center gap-3"
          >
            Create My Free Itinerary <ArrowRight className="w-5 h-5" />
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
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Greek Trip Planner - AI Itinerary Generator",
            "description": "Free AI-powered Greece trip planner. Create personalized itineraries for Athens, Santorini & Greek islands in 3 minutes.",
            "url": "https://greektriplanner.me/ai-trip-planner",
            "applicationCategory": "TravelApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "EUR"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "847"
            }
          })
        }}
      />
    </main>
  )
}
