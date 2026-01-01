import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Check, Clock, Target, Zap, Users, MapPin, Heart } from 'lucide-react'

export const metadata: Metadata = {
  title: 'How to Plan a Greece Trip with AI | Step-by-Step Guide',
  description: 'Learn how to plan a Greece trip in minutes with our AI planner. Simple 3-step process for creating perfect itineraries. No planning experience needed!',
  openGraph: {
    title: 'How to Plan a Greece Trip with AI | Step-by-Step Guide',
    description: 'Learn how to plan a Greece trip in minutes with our AI planner.',
    images: ['/how-it-works-og.jpg'],
  },
}

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navigation - Same as home page */}
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

      {/* Hero Section with Background Image */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-acropolis.jpg"
            alt="Plan your Greece trip"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/60 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            How to Plan a Greece Trip in 3 Easy Steps
          </h1>
          <p className="text-xl text-white/90 leading-relaxed max-w-3xl mx-auto">
            Planning a Greece trip used to mean hours of research, comparing ferry schedules, and second-guessing your choices. Not anymore. Our AI-powered planner makes it simple to plan a Greece trip that perfectly matches your style, budget, and timeframe—no travel expertise required.
          </p>

          {/* Quick Stats */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="text-3xl font-bold text-white mb-1">2-3</div>
              <div className="text-sm text-white/80">minutes</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="text-3xl font-bold text-white mb-1">100%</div>
              <div className="text-sm text-white/80">personalized</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="text-3xl font-bold text-white mb-1">$0</div>
              <div className="text-sm text-white/80">completely free</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="text-3xl font-bold text-white mb-1">📱</div>
              <div className="text-sm text-white/80">any device</div>
            </div>
          </div>
        </div>
      </section>

      {/* Traditional vs Our Way Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
            Why Planning a Greece Trip Used to Be Overwhelming
          </h2>
          <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto leading-relaxed">
            Most people spend their entire vacation planning time just trying to figure out logistics. We handle that for you so you can focus on getting excited about your trip.
          </p>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="grid md:grid-cols-2">
              {/* Traditional Way */}
              <div className="p-8 border-r border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Traditional Planning</h3>
                <div className="space-y-4">
                  {[
                    '10-20 hours of research',
                    'Reading dozens of blog posts',
                    'Manually checking ferry schedules',
                    'Guessing realistic timing',
                    'Unsure if you\'re missing something',
                    'Generic "10 best places" lists',
                    'No budget guidance'
                  ].map((item, i) => (
                    <div key={i} className="flex items-start space-x-3">
                      <span className="text-red-500 mt-1">✗</span>
                      <span className="text-gray-700 leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Our Way */}
              <div className="p-8 bg-gradient-to-br from-blue-50 to-purple-50">
                <h3 className="text-xl font-bold text-gray-900 mb-6">With Our AI Planner</h3>
                <div className="space-y-4">
                  {[
                    '3 minutes total',
                    'Answer 8 simple questions',
                    'Automatic route optimization',
                    'AI calculates actual travel times',
                    'Comprehensive coverage guaranteed',
                    'Personalized to YOUR interests',
                    'Clear cost estimates'
                  ].map((item, i) => (
                    <div key={i} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Step-by-Step Process */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
            Our Simple 3-Step Process to Plan Your Greece Vacation
          </h2>
          <p className="text-lg text-gray-600 mb-16 text-center max-w-3xl mx-auto leading-relaxed">
            From start to finish in less time than it takes to brew your morning coffee
          </p>

          {/* Step 1 */}
          <div className="mb-20">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-xl mr-4">1</div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Tell Us About Your Dream Trip</h3>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-8">
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Takes 2 minutes. Answer questions about your travel style, interests, and preferences.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { icon: <Clock className="w-5 h-5" />, title: 'Trip Duration', desc: 'How many days? (3-21 days)', why: 'Different trip lengths need different approaches' },
                  { icon: <Users className="w-5 h-5" />, title: 'Travel Style', desc: 'Relaxed, balanced, or adventure?', why: 'Your pace determines daily activities' },
                  { icon: <MapPin className="w-5 h-5" />, title: 'Destinations', desc: 'Athens, Santorini, Mykonos?', why: 'We optimize routes and connections' },
                  { icon: <Target className="w-5 h-5" />, title: 'Budget Range', desc: 'Budget, mid-range, or luxury?', why: 'Affects accommodation & dining' }
                ].map((item, i) => (
                  <div key={i} className="bg-white rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="text-blue-500">{item.icon}</div>
                      <h4 className="font-bold text-gray-900">{item.title}</h4>
                    </div>
                    <p className="text-gray-700 text-sm mb-2 leading-relaxed">{item.desc}</p>
                    <p className="text-gray-500 text-sm leading-relaxed">💡 <em>{item.why}</em></p>
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
                <p className="text-gray-700 leading-relaxed">
                  <strong>Why This Works:</strong> Our questions aren't generic. Each one directly influences your itinerary. We're not asking for information we won't use—every answer shapes your personalized Greece trip plan.
                </p>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="mb-20">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold text-xl mr-4">2</div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Our AI Creates Your Perfect Itinerary</h3>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8">
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Takes 60 seconds. While you wait, our AI is working hard behind the scenes:
              </p>

              <div className="grid gap-4">
                {[
                  { title: 'Route Optimization', desc: 'Analyzes all destination combinations, minimizes backtracking, considers ferry schedules and seasonal availability' },
                  { title: 'Timing Calculations', desc: 'Real ferry durations, actual walking times, check-in/check-out logistics, buffer time for delays' },
                  { title: 'Personalization Engine', desc: 'Matches attractions to your interests, filters by budget, adjusts intensity to travel style' },
                  { title: 'Local Intelligence', desc: 'Database of 500+ restaurants, hidden gems, cultural tips, seasonal recommendations, photo spots' },
                  { title: 'Budget Estimation', desc: 'Accommodation costs, meal expenses, transport, attractions, money-saving alternatives' }
                ].map((item, i) => (
                  <div key={i} className="bg-white rounded-xl p-6 border border-purple-200">
                    <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-purple-100 border border-purple-300 rounded-xl p-6">
                <p className="text-gray-700 leading-relaxed">
                  <strong>The Result:</strong> A comprehensive, realistic itinerary that actually works in the real world—not a "see 5 islands in 3 days" fantasy that leaves you exhausted.
                </p>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div>
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-xl mr-4">3</div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Download, Customize, and Go</h3>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8">
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                You receive a comprehensive travel guide with everything you need:
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { icon: '📅', title: 'Day-by-Day Schedule', desc: 'Morning, afternoon, evening activities with specific timing and realistic pacing' },
                  { icon: '🗺️', title: 'Interactive Maps', desc: 'All locations marked, walking routes, ferry terminals, transportation methods' },
                  { icon: '🏨', title: 'Accommodation Guide', desc: 'Specific neighborhoods, why recommended, booking timing advice' },
                  { icon: '🍽️', title: 'Restaurant Recommendations', desc: 'Authentic tavernas, must-try dishes, dietary options, price ranges' },
                  { icon: '💡', title: 'Insider Tips', desc: 'What to skip, best times to visit, local customs, photography tips' },
                  { icon: '💰', title: 'Budget Breakdown', desc: 'Daily costs, expenses by category, money-saving tips, where to splurge' }
                ].map((item, i) => (
                  <div key={i} className="bg-white rounded-xl p-6 border border-green-200">
                    <div className="text-3xl mb-3">{item.icon}</div>
                    <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-green-100 border border-green-300 rounded-xl p-6">
                <p className="text-gray-700 leading-relaxed">
                  <strong>Customize Everything:</strong> Don't like a recommendation? Change it! Your itinerary is fully editable. Add or remove activities, adjust timing, swap restaurants, or regenerate with different parameters.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why This Method Works */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            The Science Behind Planning a Perfect Greece Trip
          </h2>
          <p className="text-lg text-gray-300 mb-16 text-center max-w-3xl mx-auto leading-relaxed">
            Our AI analyzed thousands of successful Greece trips to understand what actually works
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Based on Real Data</h3>
              <p className="text-gray-300 leading-relaxed">
                Analyzed thousands of successful Greece trips. We know how much time people actually spend at attractions, which ferry connections have delays, and which restaurants get packed.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center mb-6">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Optimized for Greek Reality</h3>
              <p className="text-gray-300 leading-relaxed">
                Greece operates differently. Siesta culture, ferry schedules that aren't always punctual, island distances farther than they look, seasonal variations. Our AI knows these nuances.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center mb-6">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Avoids Common Mistakes</h3>
              <p className="text-gray-300 leading-relaxed">
                Too many islands in too few days, not accounting for ferry time, underestimating Athens traffic, booking too far from action. Our planner prevents these automatically.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
            How to Plan a Greece Trip: Comparing Your Options
          </h2>
          <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto leading-relaxed">
            See how different planning methods stack up
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'DIY Manual', time: '15-20 hrs', cost: 'Free', pros: 'Complete control', cons: 'Overwhelming, likely miss tips' },
              { name: 'Travel Agent', time: '3-5 hrs', cost: '$100-500', pros: 'Expert guidance', cons: 'Expensive, limited personalization' },
              { name: 'Guided Tour', time: 'Minimal', cost: '$2,000+', pros: 'Everything arranged', cons: 'Expensive, fixed schedule' },
              { name: 'Generic AI', time: '5-10 min', cost: '$10-30', pros: 'Fast, cheap', cons: 'Generic, unrealistic timing' },
              { name: 'Our Greece AI ⭐', time: '3 min', cost: 'FREE', pros: 'Fast, personalized, expert', cons: 'Requires internet', featured: true }
            ].map((method, i) => (
              <div key={i} className={`rounded-2xl p-6 border-2 ${method.featured ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}>
                {method.featured && (
                  <div className="inline-block bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                    RECOMMENDED
                  </div>
                )}
                <h3 className="text-xl font-bold text-gray-900 mb-4">{method.name}</h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Time:</strong> <span className="text-gray-700">{method.time}</span></p>
                  <p><strong>Cost:</strong> <span className="text-gray-700">{method.cost}</span></p>
                  <p><strong>Pros:</strong> <span className="text-gray-700">{method.pros}</span></p>
                  <p><strong>Cons:</strong> <span className="text-gray-700">{method.cons}</span></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
            Common Questions About How to Plan a Greece Trip
          </h2>
          
          <div className="mt-12 space-y-6">
            {[
              { q: 'Do I need to know anything about Greece before starting?', a: 'Nope! Our questions will guide you. If you know "I want to see Santorini" and "I have 10 days," we can work with that.' },
              { q: 'What if I don\'t know which islands to visit?', a: 'Tell us your interests (beaches, history, nightlife, etc.) and we\'ll recommend the best islands for you. You can always accept or reject suggestions.' },
              { q: 'Can I plan a trip if I\'m still deciding dates?', a: 'Absolutely! Plan first, book later. Use the itinerary to help decide if 7 or 10 days works better for what you want to see.' },
              { q: 'How accurate are your ferry times?', a: 'We use typical ferry schedules, but they change seasonally and year-to-year. Always verify with ferry booking sites closer to your trip.' },
              { q: 'What if I want to change my itinerary after generating it?', a: 'Easily edit anything in your itinerary or regenerate with different answers. It\'s a starting point you control.' },
              { q: 'Is this really free?', a: 'Yes! 100% free, no credit card, no catch. We\'re passionate about Greece travel and built this to help people.' }
            ].map((faq, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">{faq.q}</h3>
                <p className="text-gray-700 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 gradient-primary">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Start Planning Your Perfect Greece Vacation Now
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            You're 3 minutes away from a comprehensive Greece trip plan customized exactly for you. No more reading dozens of contradicting blog posts or stressing about logistics.
          </p>
          
          <Link
            href="/quiz"
            className="inline-flex items-center space-x-3 px-10 py-5 bg-white text-primary rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all"
          >
            <span>Start Planning My Greece Trip</span>
            <ArrowRight className="w-5 h-5" />
          </Link>

          {/* Trust Indicators */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            <div className="text-white/90">
              <Check className="w-5 h-5 mx-auto mb-2" />
              <div className="text-sm">Used by 12,000+ travelers</div>
            </div>
            <div className="text-white/90">
              <Check className="w-5 h-5 mx-auto mb-2" />
              <div className="text-sm">4.9/5 rating</div>
            </div>
            <div className="text-white/90">
              <Check className="w-5 h-5 mx-auto mb-2" />
              <div className="text-sm">100% free forever</div>
            </div>
            <div className="text-white/90">
              <Check className="w-5 h-5 mx-auto mb-2" />
              <div className="text-sm">No account required</div>
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
            "@type": "HowTo",
            "name": "How to Plan a Greece Trip with AI",
            "description": "Learn how to plan a perfect Greece trip in 3 easy steps using our AI-powered planner",
            "totalTime": "PT3M",
            "step": [
              {
                "@type": "HowToStep",
                "name": "Tell us about your dream trip",
                "text": "Answer 8 quick questions about your travel preferences, budget, interests, and travel style",
                "position": 1
              },
              {
                "@type": "HowToStep",
                "name": "AI creates your itinerary",
                "text": "Our AI analyzes your preferences and creates an optimized, personalized Greece itinerary with realistic timing and local insights",
                "position": 2
              },
              {
                "@type": "HowToStep",
                "name": "Download and customize",
                "text": "Receive your comprehensive day-by-day plan with maps, restaurants, accommodation suggestions, and insider tips",
                "position": 3
              }
            ]
          })
        }}
      />
    </main>
  )
}
