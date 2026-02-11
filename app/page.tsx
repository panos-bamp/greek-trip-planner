import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, MapPin, Clock, Utensils, Compass, Star, ChevronDown, Ship, Landmark, Sun, Shield, Gem, Heart } from 'lucide-react'

export const metadata = {
  title: 'AI Greece Trip Planner | Free Itinerary Generator 2025',
  description: 'Plan your perfect Greece trip with our free AI-powered itinerary generator. Get personalized recommendations for Athens, Santorini & Greek islands in minutes.',
  openGraph: {
    title: 'AI Greece Trip Planner | Free Itinerary Generator 2025',
    description: 'Plan your perfect Greece trip with our free AI-powered itinerary generator.',
    url: 'https://greektriplanner.me',
    siteName: 'Greek Trip Planner',
    images: [{ url: '/hero-acropolis.jpg', width: 1200, height: 630 }],
    type: 'website',
  },
}

export default function HomePage() {
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
              href="/ai-trip-planner" 
              className="btn-accent px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2"
            >
              Start Planning <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          {/* Mobile menu button */}
          <Link href="/ai-trip-planner" className="md:hidden btn-accent px-4 py-2 rounded-full text-sm font-semibold">
            Start Planning
          </Link>
        </div>
      </nav>

      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[92vh] flex items-center justify-center pt-16">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image 
            src="/hero-acropolis.jpg" 
            alt="Athens Acropolis" 
            fill 
            className="object-cover" 
            priority 
            quality={85}
          />
          <div className="gradient-hero absolute inset-0" />
        </div>
        
        {/* Hero content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          {/* Small label */}
          <div className="animate-fade-in-up inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6">
            <Sun className="w-4 h-4 text-[#FF5635]" />
            <span className="text-white/90 text-sm font-medium">AI-Powered Trip Planning</span>
          </div>
          
          {/* Main headline — DM Serif Display */}
          <h1 className="animate-fade-in-up delay-100 text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[1.05] mb-6">
            Plan Your Perfect<br />
            <span className="text-[#FF5635]">Greece Trip</span>
          </h1>
          
          {/* Subtitle */}
          <p className="animate-fade-in-up delay-200 text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Free AI planner creates personalized itineraries for Athens, Santorini & Greek islands. Get insider tips and realistic timing in minutes.
          </p>
          
          {/* CTA */}
          <div className="animate-fade-in-up delay-300 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/ai-trip-planner" 
              className="btn-accent px-8 py-4 rounded-full text-lg font-semibold flex items-center gap-3 animate-pulse-glow"
            >
              Plan My Trip Free <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              href="#how-it-works" 
              className="text-white/70 hover:text-white transition-colors flex items-center gap-2 text-sm"
            >
              Learn how it works <ChevronDown className="w-4 h-4" />
            </Link>
          </div>
          
          {/* Social proof stats */}
          <div className="animate-fade-in-up delay-400 mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto">
            {[
              { value: '12,000+', label: 'Itineraries Created' },
              { value: '4.9/5', label: 'Average Rating' },
              { value: '100%', label: 'Free Forever' },
              { value: '3 min', label: 'To Complete' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-white/50 text-xs mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-subtle-float">
          <ChevronDown className="w-6 h-6 text-white/40" />
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section id="how-it-works" className="section-padding bg-[#FAF6F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section header */}
          <div className="text-center mb-16">
            <div className="divider-accent mx-auto mb-4" />
            <h2 className="text-4xl sm:text-5xl text-[#180204] mb-4">How It Works</h2>
            <p className="text-[#180204]/60 max-w-xl mx-auto">Three simple steps to your dream Greek adventure</p>
          </div>
          
          {/* Step 1 — Image Left */}
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center mb-20 lg:mb-28">
            <div className="relative rounded-4xl overflow-hidden aspect-[4/3]">
              <Image 
                src="/Santorini_Evening_Glow.jpg" 
                alt="Smart AI Personalization" 
                fill 
                className="object-cover" 
              />
              <div className="absolute top-4 left-4 bg-[#FF5635] text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold font-sans">1</div>
            </div>
            <div>
              <h3 className="text-3xl sm:text-4xl text-[#180204] mb-4">Smart AI Personalization</h3>
              <p className="text-[#180204]/65 text-lg leading-relaxed mb-6">
                Not generic templates. Our AI learns YOUR preferences—travel style, interests, budget—and creates itineraries that actually fit you. Backpacker or luxury traveler, solo or family, we customize everything.
              </p>
              <div className="flex items-center gap-3 text-[#FF5635] font-medium">
                <Compass className="w-5 h-5" />
                <span>Tailored to your travel style</span>
              </div>
            </div>
          </div>

          {/* Step 2 — Image Right */}
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center mb-20 lg:mb-28">
            <div className="md:order-2 relative rounded-4xl overflow-hidden aspect-[4/3]">
              <Image 
                src="/Mykonos_Architecture.jpg" 
                alt="Local Insider Knowledge" 
                fill 
                className="object-cover" 
              />
              <div className="absolute top-4 left-4 bg-[#2C73FF] text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold font-sans">2</div>
            </div>
            <div className="md:order-1">
              <h3 className="text-3xl sm:text-4xl text-[#180204] mb-4">Local Insider Knowledge</h3>
              <p className="text-[#180204]/65 text-lg leading-relaxed mb-6">
                Built by Greece travel experts who live here. Real ferry schedules, authentic tavernas, secret beaches, cultural tips. Not scraped internet data—actual local knowledge from 15+ years experience.
              </p>
              <div className="flex items-center gap-3 text-[#2C73FF] font-medium">
                <MapPin className="w-5 h-5" />
                <span>15+ years of local expertise</span>
              </div>
            </div>
          </div>

          {/* Step 3 — Image Left */}
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative rounded-4xl overflow-hidden aspect-[4/3]">
              <Image 
                src="/Meteora_Sunset_View.jpg" 
                alt="Realistic Planning" 
                fill 
                className="object-cover" 
              />
              <div className="absolute top-4 left-4 bg-[#180204] text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold font-sans">3</div>
            </div>
            <div>
              <h3 className="text-3xl sm:text-4xl text-[#180204] mb-4">Realistic Planning</h3>
              <p className="text-[#180204]/65 text-lg leading-relaxed mb-6">
                No more &ldquo;See 5 islands in 2 days&rdquo; nonsense. We factor in ferry times, actual distances, rest periods, meal breaks. Your itinerary will be achievable, not exhausting.
              </p>
              <div className="flex items-center gap-3 text-[#180204] font-medium">
                <Clock className="w-5 h-5" />
                <span>Realistic timing built in</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ===== GET INSPIRED — Destinations ===== */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="divider-accent mx-auto mb-4" />
            <h2 className="text-4xl sm:text-5xl text-[#180204] mb-4">Get Inspired</h2>
            <p className="text-[#180204]/60 max-w-xl mx-auto">Explore Greece&apos;s most breathtaking destinations</p>
          </div>
          
          {/* Horizontal scroll on mobile, grid on desktop */}
          <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hidden md:grid md:grid-cols-4 md:overflow-visible">
            {[
              { name: 'Santorini', desc: 'Iconic sunsets & caldera views', img: '/Santorini_Sunset_View.jpg', color: 'bg-orange-50' },
              { name: 'Mykonos', desc: 'Beach clubs & nightlife', img: '/Mykonos_Architecture.jpg', color: 'bg-blue-50' },
              { name: 'Meteora', desc: 'Monasteries in the sky', img: '/Meteora_Mountain_Monastery.jpg', color: 'bg-amber-50' },
              { name: 'Paros', desc: 'Authentic Cycladic charm', img: '/Paros_Island_View.jpg', color: 'bg-stone-50' },
              { name: 'Athens', desc: 'Ancient sites & modern culture', img: '/hero-acropolis.jpg', color: 'bg-orange-50' },
              { name: 'Crete', desc: 'Largest island, rich history', img: '/Crete_Knossos_Ruins.jpg', color: 'bg-blue-50' },
              { name: 'Rhodes', desc: 'Medieval town & beaches', img: '/Rhodes_Historic_Quarter.jpg', color: 'bg-amber-50' },
              { name: 'Corfu', desc: 'Lush island paradise', img: '/Corfu_Beach_Paradise.jpg', color: 'bg-stone-50' },
            ].map((dest) => (
              <Link 
                key={dest.name} 
                href="/blog" 
                className={`min-w-[250px] md:min-w-0 ${dest.color} rounded-3xl overflow-hidden card-hover group`}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image 
                    src={dest.img} 
                    alt={dest.name} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-xl text-[#180204] mb-1">{dest.name}</h3>
                  <p className="text-[#180204]/55 text-sm">{dest.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES GRID ===== */}
      <section className="section-padding bg-[#FAF6F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="divider-accent mx-auto mb-4" />
            <h2 className="text-4xl sm:text-5xl text-[#180204] mb-4">Everything You Need</h2>
            <p className="text-[#180204]/60 max-w-xl mx-auto">For your perfect Greek adventure</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { 
                title: 'Island Hopping Routes', 
                desc: 'Optimized ferry schedules and routes connecting the most beautiful Greek islands. We plan the perfect island-hopping sequence so you never miss a connection.',
                img: '/Santorini_Evening_Glow.jpg',
                icon: Ship
              },
              { 
                title: 'Authentic Experiences', 
                desc: 'From cooking classes to sunset sailing, discover authentic Greek experiences and hidden tavernas you won\'t find in guidebooks.',
                img: '/Mykonos_Architecture.jpg',
                icon: Heart
              },
              { 
                title: 'Budget Optimization', 
                desc: 'Smart recommendations for every budget. Stretch your euros further with insider tips, seasonal deals, and money-saving strategies.',
                img: '/Paros_Cyclades_Charm.jpg',
                icon: Star
              },
              { 
                title: 'Historical Expertise', 
                desc: 'Skip-the-line strategies, best times to visit ancient sites, and cultural context that brings 3,000 years of history to life.',
                img: '/hero-acropolis.jpg',
                icon: Landmark
              },
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

      {/* ===== SERVICES / ORGANIZE ===== */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="divider-accent mx-auto mb-4" />
            <h2 className="text-4xl sm:text-5xl text-[#180204] mb-4">Organize It All</h2>
            <p className="text-[#180204]/60 max-w-xl mx-auto">In one place</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: MapPin, title: 'Hotels & Villas', desc: 'From boutique hotels to luxury villas with Aegean views. Find your perfect Greek home base.' },
              { icon: Ship, title: 'Flights & Ferries', desc: 'Real ferry schedules, flight connections, and inter-island transportation timing. All the logistics handled.' },
              { icon: Utensils, title: 'Tavernas & Dining', desc: 'Authentic Greek cuisine from seaside tavernas to hidden local spots. Where Greeks actually eat.' },
              { icon: Compass, title: 'Tours & Activities', desc: 'Archaeological tours, sailing trips, cooking classes, and adventure activities curated by locals.' },
              { icon: Gem, title: 'Hidden Gems', desc: 'Discover secret beaches, local festivals, and off-the-beaten-path villages tourists never find.' },
              { icon: Shield, title: '100% Free Forever', desc: 'No hidden fees, no premium tiers, no credit card required. Seriously—completely free.' },
            ].map((service) => (
              <div key={service.title} className="bg-[#FAF6F3] rounded-2xl p-7 card-hover group">
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
              {
                q: 'Is the Greece itinerary planner really free?',
                a: 'Yes! 100% free, forever. No hidden fees, no premium tiers, no credit card required.',
              },
              {
                q: 'Do I need to create an account?',
                a: 'Nope! No sign-up, no email, no account needed. Just answer questions and get your itinerary instantly.',
              },
              {
                q: 'How accurate are the ferry times?',
                a: 'We use real ferry schedule data, but times can change seasonally. Always double-check with official ferry websites closer to your travel dates.',
              },
              {
                q: 'Can I modify the itinerary after it\'s generated?',
                a: 'Absolutely! Your itinerary is completely editable. Think of it as a smart starting point you can customize.',
              },
              {
                q: 'What time of year is best to visit Greece?',
                a: 'Shoulder season (April-May, Sept-Oct) offers perfect weather, fewer crowds, and better prices. Peak season (June-Aug) is hot and crowded but all islands operate.',
              },
              {
                q: 'How many days do I need for Greece?',
                a: 'Minimum 5-7 days (Athens + 1 island). Ideal first trip is 10-14 days (Athens + 2-3 islands). Comprehensive trip: 14-21 days.',
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

      {/* ===== TESTIMONIALS ===== */}
      <section className="section-padding bg-[#FAF6F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="divider-accent mx-auto mb-4" />
            <h2 className="text-4xl sm:text-5xl text-[#180204] mb-4">What Travelers Say</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: 'This Greece trip planner saved us SO much time! The itinerary was spot-on, and the ferry timing estimates were actually accurate. Highly recommend!',
                name: 'Sarah M.',
                location: 'California',
              },
              {
                quote: 'Best free travel tool I\'ve used. The local restaurant recommendations alone were worth it. Found gems we never would have discovered otherwise.',
                name: 'James T.',
                location: 'UK',
              },
              {
                quote: 'As a first-timer to Greece, I was overwhelmed. This AI planner made everything simple and gave me confidence in my itinerary. Trip was perfect!',
                name: 'Maria L.',
                location: 'Australia',
              },
            ].map((testimonial, i) => (
              <div key={i} className="bg-white rounded-3xl p-8 border border-[#E6DAD1]/60 card-hover">
                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-[#FF5635] fill-[#FF5635]" />
                  ))}
                </div>
                <p className="text-[#180204]/70 leading-relaxed mb-6 font-sans italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#FF5635]/10 rounded-full flex items-center justify-center text-[#FF5635] font-bold text-sm font-sans">
                    {testimonial.name.charAt(0)}
                  </div>
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
          <Image 
            src="/Santorini_Sunset_View.jpg" 
            alt="Greek islands sunset" 
            fill 
            className="object-cover" 
          />
          <div className="absolute inset-0 bg-[#180204]/65" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl text-white mb-6">
            Your Greek Adventure<br />Starts Here
          </h2>
          <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
            Join 12,000+ travelers who created their dream Greece itinerary in minutes. Completely free, no credit card required.
          </p>
          <Link 
            href="/ai-trip-planner" 
            className="btn-accent px-10 py-4 rounded-full text-lg font-semibold inline-flex items-center gap-3"
          >
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
            "name": "Greek Trip Planner",
            "description": "Free AI-powered Greece trip planner. Get personalized itineraries for Athens, Santorini & Greek islands in minutes.",
            "url": "https://greektriplanner.me",
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
