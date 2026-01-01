import Link from 'next/link'
import Image from 'next/image'
import { Sparkles, MapPin, Calendar, Compass, ArrowRight, Check, Star, Clock, Users, Heart, DollarSign, Globe, TrendingUp } from 'lucide-react'
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

      {/* Hero Section */}
      <div className="pt-32 pb-20 relative overflow-hidden min-h-[600px] flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src="/hero-acropolis.jpg"
            alt="Athens Acropolis"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/60 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-5 py-2.5 rounded-full mb-8 border border-white/20">
              <Sparkles className="w-4 h-4 text-accent-pink" />
              <span className="text-white/90 text-sm font-semibold">AI-Powered Trip Planning</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              Free AI Greece Trip Planner: Create Your Perfect Itinerary in Minutes
            </h1>

            <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Planning a trip to Greece? Our AI-powered Greece itinerary planner creates personalized travel plans tailored to your style, budget, and time. Skip the overwhelm—get insider tips, realistic timing, and day-by-day plans for Athens, Santorini, Mykonos, and beyond.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                href="/quiz"
                className="group px-10 py-5 bg-white text-primary rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all inline-flex items-center space-x-3"
              >
                <span>Plan My Trip Free</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              <div className="text-white/90 text-center">
                <div className="text-3xl font-bold">12,000+</div>
                <div className="text-sm">Itineraries Created</div>
              </div>
              <div className="text-white/90 text-center">
                <div className="text-3xl font-bold">4.9/5</div>
                <div className="text-sm">Average Rating</div>
              </div>
              <div className="text-white/90 text-center">
                <div className="text-3xl font-bold">100%</div>
                <div className="text-sm">Free Forever</div>
              </div>
              <div className="text-white/90 text-center">
                <div className="text-3xl font-bold">3 min</div>
                <div className="text-sm">To Complete</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Different Section with Images */}
      <div className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-primary mb-4">
              The Smartest Way to Plan Your Greece Vacation
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Stop spending hours researching Greece travel guides. Our AI analyzes your preferences and creates optimized itineraries with timing, transportation tips, and hidden gems most tourists never discover.
            </p>
          </div>

          {/* Feature Grid with Images */}
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto mb-16">
            {/* Feature 1 */}
            <div className="relative">
              <div className="rounded-3xl overflow-hidden mb-6 h-64">
                <img
                  src="/Santorini_Evening_Glow.jpg"
                  alt="AI Personalization"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full gradient-pink flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-primary mb-2">Smart AI Personalization</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Not generic templates. Our AI learns YOUR preferences—travel style, interests, budget—and creates itineraries that actually fit you. Backpacker or luxury traveler, solo or family, we customize everything.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="relative">
              <div className="rounded-3xl overflow-hidden mb-6 h-64">
                <img
                  src="/Mykonos_Architecture.jpg"
                  alt="Greece Expertise"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-primary mb-2">Local Insider Knowledge</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Built by Greece travel experts who live here. Real ferry schedules, authentic tavernas, secret beaches, cultural tips. Not scraped internet data—actual local knowledge from 15+ years experience.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="relative">
              <div className="rounded-3xl overflow-hidden mb-6 h-64">
                <img
                  src="/Meteora_Sunset_View.jpg"
                  alt="Realistic Timing"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-primary mb-2">Realistic, Practical Timing</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Forget unrealistic "5 islands in 4 days" itineraries. We account for actual ferry times, Greek siesta closures, realistic pacing. You'll actually enjoy your vacation instead of spending it in transit.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="relative">
              <div className="rounded-3xl overflow-hidden mb-6 h-64">
                <img
                  src="/Paros_Cyclades_Charm.jpg"
                  alt="Budget Planning"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-primary mb-2">Budget-Friendly Options</h3>
                  <p className="text-gray-700 leading-relaxed">
                    €50/day backpacker or €200+/day luxury traveler? We create plans for ANY budget. Transparent cost estimates, money-saving tips, where to splurge vs. where to save.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Destinations Grid */}
      <div className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-primary mb-4">
              Destinations We Cover
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From ancient Athens to island paradises, we know Greece inside out
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { name: 'Santorini', img: '/Santorini_Sunset_View.jpg', desc: 'Iconic sunsets & caldera views' },
              { name: 'Mykonos', img: '/Mykonos_Architecture.jpg', desc: 'Beaches, nightlife & windmills' },
              { name: 'Crete', img: '/Crete_Knossos_Ruins.jpg', desc: 'Largest island, rich history' },
              { name: 'Athens', img: '/hero-acropolis.jpg', desc: 'Ancient sites & modern culture' },
              { name: 'Paros', img: '/Paros_Island_View.jpg', desc: 'Authentic Cycladic charm' },
              { name: 'Rhodes', img: '/Rhodes_Historic_Quarter.jpg', desc: 'Medieval town & beaches' },
              { name: 'Meteora', img: '/Meteora_Mountain_Monastery.jpg', desc: 'Monasteries in the sky' },
              { name: 'Corfu', img: '/Corfu_Beach_Paradise.jpg', desc: 'Lush island paradise' },
            ].map((dest, i) => (
              <div key={i} className="group relative rounded-2xl overflow-hidden h-72 cursor-pointer">
                <img
                  src={dest.img}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-1">{dest.name}</h3>
                  <p className="text-white/90 text-sm">{dest.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600">...and 15+ more destinations across Greece</p>
          </div>
        </div>
      </div>

      {/* How It Works - 3 Steps */}
      <div className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-primary mb-4">
              Your Perfect Greece Itinerary in 3 Simple Steps
            </h2>
          </div>

          <div className="max-w-5xl mx-auto space-y-16">
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                <div className="bg-blue-500 text-white text-2xl font-bold w-14 h-14 rounded-full flex items-center justify-center mb-4">
                  1
                </div>
                <h3 className="text-3xl font-bold text-primary mb-4">Tell Us About Your Dream Trip</h3>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  Answer 8 quick questions about your travel style, interests, budget, and preferences. Takes just 2-3 minutes.
                </p>
                <ul className="space-y-3">
                  {['Trip duration (3-21 days)', 'Travel style & pace', 'Destinations of interest', 'Budget range', 'Special interests'].map((item, i) => (
                    <li key={i} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="md:w-1/2">
                <div className="rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="/Paros_Village_Scene.jpg"
                    alt="Greece travel planning"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-12">
              <div className="md:w-1/2">
                <div className="bg-purple-500 text-white text-2xl font-bold w-14 h-14 rounded-full flex items-center justify-center mb-4">
                  2
                </div>
                <h3 className="text-3xl font-bold text-primary mb-4">AI Creates Your Custom Plan</h3>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  Our intelligent algorithm analyzes thousands of data points to craft your perfect personalized itinerary in under 60 seconds.
                </p>
                <ul className="space-y-3">
                  {['Optimal route planning', 'Realistic daily schedules', 'Ferry & transport timing', 'Budget-matched recommendations', 'Hidden gems & local favorites'].map((item, i) => (
                    <li key={i} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="md:w-1/2">
                <div className="rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="/Rhodes_Old_Town_Streets.jpg"
                    alt="AI trip planning"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                <div className="bg-green-500 text-white text-2xl font-bold w-14 h-14 rounded-full flex items-center justify-center mb-4">
                  3
                </div>
                <h3 className="text-3xl font-bold text-primary mb-4">Download & Start Your Adventure</h3>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  Get your complete itinerary with day-by-day plans, maps, restaurant recommendations, insider tips, and budget breakdown.
                </p>
                <ul className="space-y-3">
                  {['Day-by-day schedule', 'Interactive maps', 'Accommodation suggestions', 'Authentic dining spots', 'Insider tips & tricks', 'Complete budget breakdown'].map((item, i) => (
                    <li key={i} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="md:w-1/2">
                <div className="rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="/Corfu_Scenic_Waterfront.jpg"
                    alt="Greece itinerary"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Who Is This For */}
      <div className="py-24 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-primary mb-4">
              Perfect For Every Type of Greece Traveler
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { icon: <Heart />, title: 'Couples & Honeymooners', desc: 'Romantic Santorini sunsets, intimate Athens neighborhoods, couple activities' },
              { icon: <Users />, title: 'Families with Kids', desc: 'Kid-friendly restaurants, manageable distances, engaging activities for all ages' },
              { icon: <MapPin />, title: 'Solo Travelers', desc: 'Safe itineraries, social activities, solo-friendly destinations with insider tips' },
              { icon: <DollarSign />, title: 'Budget Travelers', desc: 'Affordable accommodations, cheap eats, free attractions—maximize without breaking bank' },
              { icon: <Star />, title: 'Luxury Travelers', desc: 'Boutique hotels, fine dining, private tours, exclusive experiences' },
              { icon: <Globe />, title: 'First-Time Visitors', desc: 'Perfect introduction hitting must-sees without overwhelm, cultural tips included' },
            ].map((type, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 hover:shadow-xl transition">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-4">
                  {type.icon}
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{type.title}</h3>
                <p className="text-gray-700 leading-relaxed">{type.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-primary mb-12 text-center">
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
                <div key={i} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h3 className="text-lg font-bold text-primary mb-3">{faq.q}</h3>
                  <p className="text-gray-700 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Social Proof */}
      <div className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-black text-primary mb-12 text-center">
            What Travelers Say
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { name: 'Sarah M.', location: 'California', text: 'This Greece trip planner saved us SO much time! The itinerary was spot-on, and the ferry timing estimates were actually accurate. Highly recommend!' },
              { name: 'James T.', location: 'UK', text: 'Best free travel tool I\'ve used. The local restaurant recommendations alone were worth it. Found gems we never would have discovered otherwise.' },
              { name: 'Maria L.', location: 'Australia', text: 'As a first-timer to Greece, I was overwhelmed. This AI planner made everything simple and gave me confidence in my itinerary. Trip was perfect!' },
            ].map((review, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-lg">
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

      {/* Final CTA */}
      <div className="py-24 gradient-primary">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Ready to Plan Your Perfect Greece Vacation?
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join 12,000+ travelers who've created their dream Greece itinerary in minutes. Completely free, no credit card required.
          </p>

          <Link
            href="/quiz"
            className="inline-flex items-center space-x-3 px-12 py-6 bg-white text-primary rounded-full font-bold text-xl hover:shadow-2xl hover:scale-105 transition-all"
          >
            <span>Start Planning My Greece Trip</span>
            <ArrowRight className="w-6 h-6" />
          </Link>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              '100% Free Forever',
              'No Credit Card',
              'No Account Needed',
              'Instant Results'
            ].map((badge, i) => (
              <div key={i} className="flex items-center justify-center space-x-2 text-white/90">
                <Check className="w-5 h-5" />
                <span className="text-sm">{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

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
              <p className="text-white/60 text-sm">© 2024 Greek Trip Planner. All rights reserved.</p>
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
                    width="234" 
                    height="39" 
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
            "url": "https://greek-trip-planner-ghm1.vercel.app/",
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
