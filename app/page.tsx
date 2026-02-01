import Link from 'next/link'
import Image from 'next/image'
import { Sparkles, MapPin, Calendar, Compass, ArrowRight, Check, Star, Clock, Users, Heart, DollarSign, Globe, TrendingUp, Plane, Hotel, Utensils } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Greece Trip Planner | Free Itinerary Generator 2025',
  description: 'Plan your perfect Greece vacation with our free AI trip planner. Get personalized itineraries for Athens, Santorini & Greek islands in minutes. Start now!',
  openGraph: {
    title: 'AI Greece Trip Planner | Free Itinerary Generator 2025',
    description: 'Plan your perfect Greece vacation with our free AI trip planner.',
    images: ['/Santorini_Sunset_View.jpg'],
  },
}

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white shadow-sm z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <Image 
                src="/logo.png" 
                alt="Greek Trip Planner" 
                width={70} 
                height={21}
                priority
              />
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/features" className="text-gray-700 hover:text-primary transition font-medium">Features</Link>
              <Link href="/how-it-works" className="text-gray-700 hover:text-primary transition font-medium">How it Works</Link>
              <Link href="/blog" className="text-gray-700 hover:text-primary transition font-medium">Blog</Link>
              <Link href="/about" className="text-gray-700 hover:text-primary transition font-medium">About</Link>
              <Link 
                href="/quiz"
                className="px-6 py-3 gradient-pink text-white rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all flex items-center space-x-2"
              >
                <span>Start Planning</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - MORE TOP PADDING */}
      <section className="relative min-h-[88vh] md:h-[88vh] flex items-center overflow-hidden pt-32 md:pt-36 lg:pt-40 pb-14 md:pb-0">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/hero-acropolis.jpg"
            alt="Athens Acropolis"
            className="w-full h-full object-cover brightness-75"
          />
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-5xl">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-5 py-2.5 rounded-full mb-8 border border-white/20">
              <Sparkles className="w-4 h-4 text-accent-pink" />
              <span className="text-white/90 text-sm font-semibold">AI-Powered Trip Planning</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
              Plan Your<br />
              <span className="text-blue-200">Perfect</span> Greece Trip
            </h1>

            <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl leading-relaxed">
              Free AI planner creates personalized itineraries for Athens, Santorini & Greek islands. Get insider tips and realistic timing in minutes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link 
                href="/quiz"
                className="px-10 py-4 bg-white text-primary rounded-full font-bold text-lg hover:shadow-xl hover:scale-105 transition-all inline-flex items-center justify-center space-x-3"
              >
                <span>Plan My Trip Free</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="flex items-center justify-center gap-3 text-white font-medium text-lg hover:opacity-80 transition">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  ▶
                </div>
                Watch Demo
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl">
              <div className="text-white text-center md:text-left">
                <div className="text-3xl font-bold">12,000+</div>
                <div className="text-sm text-blue-100">Itineraries Created</div>
              </div>
              <div className="text-white text-center md:text-left">
                <div className="text-3xl font-bold">4.9/5</div>
                <div className="text-sm text-blue-100">Average Rating</div>
              </div>
              <div className="text-white text-center md:text-left">
                <div className="text-3xl font-bold">100%</div>
                <div className="text-sm text-blue-100">Free Forever</div>
              </div>
              <div className="text-white text-center md:text-left">
                <div className="text-3xl font-bold">3 min</div>
                <div className="text-sm text-blue-100">To Complete</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator - LINKS TO #how-it-works */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
          <a href="#how-it-works" className="text-white text-sm flex flex-col items-center gap-2 hover:opacity-70 transition">
            <span>Learn more</span>
            <ArrowRight className="w-5 h-5 rotate-90 animate-bounce" />
          </a>
        </div>
      </section>

      {/* How it Works Section Header */}
      <section id="how-it-works" className="py-16 bg-white scroll-mt-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-primary">How it Works</h2>
        </div>
      </section>

      {/* Step 1 - Smart AI Personalization */}
      <div className="container mx-auto px-6 py-12 sm:py-24">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-24 items-center">
          <div className="overflow-hidden rounded-4xl">
            <img
              src="/Santorini_Evening_Glow.jpg"
              alt="AI Personalization"
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="max-w-md mx-auto lg:mx-0">
            <div className="w-12 h-12 rounded-full gradient-pink flex items-center justify-center mb-6">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-4xl sm:text-5xl font-semibold text-primary mb-5">Smart AI Personalization</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Not generic templates. Our AI learns YOUR preferences—travel style, interests, budget—and creates itineraries that actually fit you. Backpacker or luxury traveler, solo or family, we customize everything.
            </p>
          </div>
        </div>
      </div>

      {/* Step 2 - Local Insider Knowledge */}
      <div className="container mx-auto px-6 py-12 sm:py-24">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-24 items-center">
          <div className="overflow-hidden rounded-4xl lg:order-last">
            <img
              src="/Mykonos_Architecture.jpg"
              alt="Local Knowledge"
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="max-w-md mx-auto lg:mx-0 lg:ml-auto">
            <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center mb-6">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-4xl sm:text-5xl font-semibold text-primary mb-5">Local Insider Knowledge</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Built by Greece travel experts who live here. Real ferry schedules, authentic tavernas, secret beaches, cultural tips. Not scraped internet data—actual local knowledge from 15+ years experience.
            </p>
          </div>
        </div>
      </div>

      {/* Step 3 - Realistic Timing */}
      <div className="container mx-auto px-6 py-12 sm:py-24">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-24 items-center">
          <div className="overflow-hidden rounded-4xl">
            <img
              src="/Meteora_Sunset_View.jpg"
              alt="Realistic Planning"
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="max-w-md mx-auto lg:mx-0">
            <div className="w-12 h-12 rounded-full gradient-green flex items-center justify-center mb-6">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-4xl sm:text-5xl font-semibold text-primary mb-5">Realistic Planning</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              No more "See 5 islands in 2 days" nonsense. We factor in ferry times, actual distances, rest periods, meal breaks. Your itinerary will be achievable, not exhausting.
            </p>
          </div>
        </div>
      </div>

      {/* Popular Destinations - 4x2 GRID (MINDTRIP STYLE) */}
      <section className="py-12 sm:py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-center text-4xl sm:text-6xl font-bold tracking-tight text-primary mb-12">
            🏝️ Get Inspired
          </h2>

          {/* 4-COLUMN GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl mx-auto">
            {/* Destination 1 - Santorini */}
            <Link href="/blog" className="group">
              <div className="relative overflow-hidden rounded-3xl aspect-[3/4] bg-gray-200">
                <img 
                  src="/Santorini_Sunset_View.jpg" 
                  alt="Santorini" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-1">Santorini</h3>
                  <p className="text-sm text-white/90">Iconic sunsets & caldera views</p>
                </div>
              </div>
            </Link>

            {/* Destination 2 - Mykonos */}
            <Link href="/blog" className="group">
              <div className="relative overflow-hidden rounded-3xl aspect-[3/4] bg-gray-200">
                <img 
                  src="/Mykonos_Architecture.jpg" 
                  alt="Mykonos" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-1">Mykonos</h3>
                  <p className="text-sm text-white/90">Beach clubs & nightlife</p>
                </div>
              </div>
            </Link>

            {/* Destination 3 - Meteora */}
            <Link href="/blog" className="group">
              <div className="relative overflow-hidden rounded-3xl aspect-[3/4] bg-gray-200">
                <img 
                  src="/Meteora_Mountain_Monastery.jpg" 
                  alt="Meteora" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-1">Meteora</h3>
                  <p className="text-sm text-white/90">Monasteries in the sky</p>
                </div>
              </div>
            </Link>

            {/* Destination 4 - Paros */}
            <Link href="/blog" className="group">
              <div className="relative overflow-hidden rounded-3xl aspect-[3/4] bg-gray-200">
                <img 
                  src="/Paros_Island_View.jpg" 
                  alt="Paros" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-1">Paros</h3>
                  <p className="text-sm text-white/90">Authentic Cycladic charm</p>
                </div>
              </div>
            </Link>

            {/* Destination 5 - Athens */}
            <Link href="/blog" className="group">
              <div className="relative overflow-hidden rounded-3xl aspect-[3/4] bg-gray-200">
                <img 
                  src="/hero-acropolis.jpg" 
                  alt="Athens" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-1">Athens</h3>
                  <p className="text-sm text-white/90">Ancient sites & modern culture</p>
                </div>
              </div>
            </Link>

            {/* Destination 6 - Crete */}
            <Link href="/blog" className="group">
              <div className="relative overflow-hidden rounded-3xl aspect-[3/4] bg-gray-200">
                <img 
                  src="/Crete_Knossos_Ruins.jpg" 
                  alt="Crete" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-1">Crete</h3>
                  <p className="text-sm text-white/90">Largest island, rich history</p>
                </div>
              </div>
            </Link>

            {/* Destination 7 - Rhodes */}
            <Link href="/blog" className="group">
              <div className="relative overflow-hidden rounded-3xl aspect-[3/4] bg-gray-200">
                <img 
                  src="/Rhodes_Historic_Quarter.jpg" 
                  alt="Rhodes" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-1">Rhodes</h3>
                  <p className="text-sm text-white/90">Medieval town & beaches</p>
                </div>
              </div>
            </Link>

            {/* Destination 8 - Corfu */}
            <Link href="/blog" className="group">
              <div className="relative overflow-hidden rounded-3xl aspect-[3/4] bg-gray-200">
                <img 
                  src="/Corfu_Beach_Paradise.jpg" 
                  alt="Corfu" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-1">Corfu</h3>
                  <p className="text-sm text-white/90">Lush island paradise</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-center text-4xl sm:text-6xl font-bold tracking-tight text-primary mb-16 max-w-4xl mx-auto">
            Everything you need for your Greek adventure
          </h2>

          <div className="grid md:grid-cols-2 gap-5 lg:gap-6 max-w-6xl mx-auto">
            {/* Feature 1 */}
            <div className="bg-gray-50 rounded-4xl p-6 sm:p-10 flex flex-col">
              <div className="overflow-hidden rounded-3xl mb-6">
                <img
                  src="/Santorini_Evening_Glow.jpg"
                  alt="Island Hopping"
                  className="w-full aspect-video object-cover"
                />
              </div>
              <h3 className="text-3xl sm:text-4xl font-semibold text-primary mb-4">Island Hopping Routes</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Optimized ferry schedules and routes connecting the most beautiful Greek islands. We plan the perfect island-hopping sequence so you never miss a connection.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-50 rounded-4xl p-6 sm:p-10 flex flex-col">
              <div className="overflow-hidden rounded-3xl mb-6">
                <img
                  src="/Mykonos_Architecture.jpg"
                  alt="Local Experiences"
                  className="w-full aspect-video object-cover"
                />
              </div>
              <h3 className="text-3xl sm:text-4xl font-semibold text-primary mb-4">Authentic Experiences</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                From cooking classes to sunset sailing, discover authentic Greek experiences and hidden tavernas you won't find in guidebooks.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-50 rounded-4xl p-6 sm:p-10 flex flex-col">
              <div className="overflow-hidden rounded-3xl mb-6">
                <img
                  src="/Paros_Cyclades_Charm.jpg"
                  alt="Budget Optimization"
                  className="w-full aspect-video object-cover"
                />
              </div>
              <h3 className="text-3xl sm:text-4xl font-semibold text-primary mb-4">Budget Optimization</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Smart recommendations for every budget. Stretch your euros further with insider tips, seasonal deals, and money-saving strategies.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gray-50 rounded-4xl p-6 sm:p-10 flex flex-col">
              <div className="overflow-hidden rounded-3xl mb-6">
                <img
                  src="/hero-acropolis.jpg"
                  alt="Historical Sites"
                  className="w-full aspect-video object-cover"
                />
              </div>
              <h3 className="text-3xl sm:text-4xl font-semibold text-primary mb-4">Historical Expertise</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Skip-the-line strategies, best times to visit ancient sites, and cultural context that brings 3,000 years of history to life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-center text-4xl sm:text-6xl font-bold tracking-tight text-primary mb-16">
            Organize it all in one place
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {/* Service 1 */}
            <div className="bg-white rounded-2xl p-6 sm:p-10">
              <Hotel className="w-6 h-6 mb-4 text-primary" />
              <h3 className="text-2xl font-semibold mb-2 text-primary">Hotels & Villas</h3>
              <p className="text-gray-700 leading-relaxed">
                From boutique hotels to luxury villas with Aegean views. Find your perfect Greek home base.
              </p>
            </div>

            {/* Service 2 */}
            <div className="bg-white rounded-2xl p-6 sm:p-10">
              <Plane className="w-6 h-6 mb-4 text-primary" />
              <h3 className="text-2xl font-semibold mb-2 text-primary">Flights & Ferries</h3>
              <p className="text-gray-700 leading-relaxed">
                Real ferry schedules, flight connections, and inter-island transportation timing. All the logistics handled.
              </p>
            </div>

            {/* Service 3 */}
            <div className="bg-white rounded-2xl p-6 sm:p-10">
              <Utensils className="w-6 h-6 mb-4 text-primary" />
              <h3 className="text-2xl font-semibold mb-2 text-primary">Tavernas & Dining</h3>
              <p className="text-gray-700 leading-relaxed">
                Authentic Greek cuisine from seaside tavernas to hidden local spots. Where Greeks actually eat.
              </p>
            </div>

            {/* Service 4 */}
            <div className="bg-white rounded-2xl p-6 sm:p-10">
              <Compass className="w-6 h-6 mb-4 text-primary" />
              <h3 className="text-2xl font-semibold mb-2 text-primary">Tours & Activities</h3>
              <p className="text-gray-700 leading-relaxed">
                Archaeological tours, sailing trips, cooking classes, and adventure activities curated by locals.
              </p>
            </div>

            {/* Service 5 */}
            <div className="bg-white rounded-2xl p-6 sm:p-10">
              <MapPin className="w-6 h-6 mb-4 text-primary" />
              <h3 className="text-2xl font-semibold mb-2 text-primary">Hidden Gems</h3>
              <p className="text-gray-700 leading-relaxed">
                Discover secret beaches, local festivals, and off-the-beaten-path villages tourists never find.
              </p>
            </div>

            {/* Service 6 */}
            <div className="bg-white rounded-2xl p-6 sm:p-10">
              <DollarSign className="w-6 h-6 mb-4 text-primary" />
              <h3 className="text-2xl font-semibold mb-2 text-primary">100% Free Forever</h3>
              <p className="text-gray-700 leading-relaxed">
                No hidden fees, no premium tiers, no credit card required. Seriously—completely free.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-12 text-center">
            Stop Wasting Time. Start Planning Smart.
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full max-w-5xl mx-auto bg-white rounded-2xl overflow-hidden shadow-lg">
              <thead>
                <tr className="gradient-primary text-white">
                  <th className="p-6 text-left text-lg font-semibold">Feature</th>
                  <th className="p-6 text-center text-lg font-semibold">Greek Trip Planner</th>
                  <th className="p-6 text-center text-lg font-semibold">Travel Agencies</th>
                  <th className="p-6 text-center text-lg font-semibold">Manual Research</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  { feature: 'Cost', us: '100% Free', agency: '€500-2000', manual: 'Free (but...)' },
                  { feature: 'Time to Create', us: '3 Minutes', agency: '1-2 Weeks', manual: '40+ Hours' },
                  { feature: 'Personalization', us: 'AI-Customized', agency: 'Generic Packages', manual: 'DIY Effort' },
                  { feature: 'Real Ferry Times', us: '✓ Included', agency: 'Sometimes', manual: 'Manual Research' },
                  { feature: 'Local Knowledge', us: '15+ Years', agency: 'Varies', manual: 'Reddit/TripAdvisor' },
                  { feature: 'Instant Results', us: '✓ Yes', agency: '✗ No', manual: '✗ No' },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition">
                    <td className="p-6 font-semibold text-gray-900">{row.feature}</td>
                    <td className="p-6 text-center text-green-600 font-bold">{row.us}</td>
                    <td className="p-6 text-center text-gray-600">{row.agency}</td>
                    <td className="p-6 text-center text-gray-600">{row.manual}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <div className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-12 text-center">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              {[
                { q: 'Is the Greece itinerary planner really free?', a: 'Yes! 100% free, forever. No hidden fees, no premium tiers, no credit card required.' },
                { q: 'Do I need to create an account?', a: 'Nope! No sign-up, no email, no account needed. Just answer questions and get your itinerary instantly.' },
                { q: 'How accurate are the ferry times?', a: 'We use real ferry schedule data, but times can change seasonally. Always double-check with official ferry websites closer to your travel dates.' },
                { q: 'Can I modify the itinerary after it\'s generated?', a: 'Absolutely! Your itinerary is completely editable. Think of it as a smart starting point you can customize.' },
                { q: 'What time of year is best to visit Greece?', a: 'Shoulder season (April-May, Sept-Oct) offers perfect weather, fewer crowds, and better prices. Peak season (June-Aug) is hot and crowded but all islands operate.' },
                { q: 'How many days do I need for Greece?', a: 'Minimum 5-7 days (Athens + 1 island). Ideal first trip is 10-14 days (Athens + 2-3 islands). Comprehensive trip: 14-21 days.' },
              ].map((faq, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                  <h3 className="text-lg font-bold text-primary mb-3">{faq.q}</h3>
                  <p className="text-gray-700 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Social Proof */}
      <div className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-12 text-center">
            What Travelers Say
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { name: 'Sarah M.', location: 'California', text: 'This Greece trip planner saved us SO much time! The itinerary was spot-on, and the ferry timing estimates were actually accurate. Highly recommend!' },
              { name: 'James T.', location: 'UK', text: 'Best free travel tool I\'ve used. The local restaurant recommendations alone were worth it. Found gems we never would have discovered otherwise.' },
              { name: 'Maria L.', location: 'Australia', text: 'As a first-timer to Greece, I was overwhelmed. This AI planner made everything simple and gave me confidence in my itinerary. Trip was perfect!' },
            ].map((review, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-8 shadow-sm">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed italic">&ldquo;{review.text}&rdquo;</p>
                <div className="font-bold text-primary">{review.name}</div>
                <div className="text-sm text-gray-600">{review.location}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA - greece-home.jpg */}
      <section className="relative py-40 lg:py-48 overflow-hidden">
        {/* Background Image - USING CORRECT PATH */}
        <div className="absolute inset-0">
          <img
            src="/greece-home.jpg"
            alt="Start Your Greek Adventure"
            className="w-full h-full object-cover brightness-75"
          />
        </div>

        {/* Content */}
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-3xl">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
              Your Greek<br />
              Adventure<br />
              Starts Here
            </h2>
            <p className="text-xl sm:text-2xl text-blue-100 mb-10 max-w-xl leading-relaxed">
              Join 12,000+ travelers who created their dream Greece itinerary in minutes. Completely free, no credit card required.
            </p>
            <Link 
              href="/quiz"
              className="inline-flex items-center space-x-3 px-12 py-6 bg-white text-primary rounded-full font-bold text-xl hover:shadow-2xl hover:scale-105 transition-all"
            >
              <span>Start Planning My Greece Trip</span>
              <ArrowRight className="w-6 h-6" />
            </Link>

            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl">
              {[
                '100% Free Forever',
                'No Credit Card',
                'No Account Needed',
                'Instant Results'
              ].map((badge, i) => (
                <div key={i} className="flex items-center space-x-2 text-white">
                  <Check className="w-5 h-5" />
                  <span className="text-sm">{badge}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="gradient-primary py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <Image 
                src="/logo.png" 
                alt="Greek Trip Planner" 
                width={70} 
                height={21}
              />
            </div>
            
            <div className="flex items-center space-x-8">
              <Link href="/features" className="text-white/80 hover:text-white transition text-sm">Features</Link>
              <Link href="/how-it-works" className="text-white/80 hover:text-white transition text-sm">How it Works</Link>
              <Link href="/blog" className="text-white/80 hover:text-white transition text-sm">Blog</Link>
              <Link href="/about" className="text-white/80 hover:text-white transition text-sm">About</Link>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-white/60 text-sm">© 2026 Greek Trip Planner. All rights reserved.</p>
              <div className="flex items-center gap-6">
                <a 
                  href="https://traveltourismdirectory.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition text-sm"
                >
                  Travel and Tourism Directory
                </a>
                <a 
                  href="https://bookmarktravel.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <img 
                    src="https://bookmarktravel.com/images/bookmarktravel-234.jpg" 
                    alt="Bookmark Travel" 
                    width={234}
                    height={39}
                    className="h-auto"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "AI Greece Trip Planner",
            "url": "https://greektriplanner.me/",
            "applicationCategory": "TravelApplication",
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
