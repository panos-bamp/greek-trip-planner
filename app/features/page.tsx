import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Check, Sparkles, MapPin, Clock, DollarSign, Route, Users, Globe, Shield, Smartphone, Star } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Greece Trip Planning Tool Features | AI-Powered Planner',
  description: 'Discover powerful Greece trip planning tool features: AI personalization, realistic timing, local insights, budget tracking, and more. 100% free to use.',
  openGraph: {
    title: 'Greece Trip Planning Tool Features | AI-Powered Planner',
    description: 'Discover powerful Greece trip planning tool features: AI personalization, realistic timing, local insights, budget tracking, and more.',
    images: ['/features-og.jpg'],
  },
}

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-white">
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

      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-acropolis.jpg"
            alt="Greece trip planning features"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/60 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Powerful Greece Trip Planning Tool Features That Actually Make Travel Planning Easy
          </h1>
          <p className="text-xl text-white/90 leading-relaxed max-w-3xl mx-auto">
            Not all trip planning tools are created equal. Our Greece-specific planner combines AI intelligence with deep local knowledge to deliver features that solve the real challenges of planning a Greece vacation. Here's everything you get—completely free.
          </p>
        </div>
      </section>

      {/* Quick Features Overview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
            What Makes Our Greece Trip Planning Tool Different
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {[
              { icon: <Sparkles />, title: 'AI-Powered Personalization', desc: 'Not generic templates' },
              { icon: <Globe />, title: 'Greece-Specific Intelligence', desc: 'Local expertise built-in' },
              { icon: <Clock />, title: 'Realistic Timing Engine', desc: 'Actual travel times' },
              { icon: <DollarSign />, title: 'Smart Budget Planning', desc: 'Transparent cost estimates' },
              { icon: <Route />, title: 'Route Optimization', desc: 'Minimize backtracking' },
              { icon: <Smartphone />, title: 'Mobile-Friendly', desc: 'Plan anywhere, anytime' },
              { icon: <Check />, title: '100% Free', desc: 'No hidden costs ever' },
              { icon: <Shield />, title: 'Privacy First', desc: 'No account needed' }
            ].map((feature, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4 text-blue-600">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Features */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          
          {/* Feature 1: AI Personalization */}
          <div className="mb-20">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white flex items-center justify-center mr-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">AI-Powered Smart Personalization</h2>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Our AI doesn't just list popular places—it learns YOUR preferences and creates an itinerary that matches your unique travel style.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white rounded-xl p-6">
                  <h3 className="font-bold text-gray-900 mb-3">Travel Style Matching</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">Adjusts pacing for relaxed, balanced, or adventurous travelers</p>
                </div>
                <div className="bg-white rounded-xl p-6">
                  <h3 className="font-bold text-gray-900 mb-3">Interest-Based Recommendations</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">Prioritizes what YOU care about (history, beaches, food, nightlife)</p>
                </div>
                <div className="bg-white rounded-xl p-6">
                  <h3 className="font-bold text-gray-900 mb-3">Group Dynamic Optimization</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">Different suggestions for solo, couples, families, or groups</p>
                </div>
                <div className="bg-white rounded-xl p-6">
                  <h3 className="font-bold text-gray-900 mb-3">Budget Alignment</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">Every recommendation fits your specified budget range</p>
                </div>
              </div>

              <div className="bg-blue-100 border border-blue-200 rounded-xl p-6">
                <p className="text-gray-700 leading-relaxed">
                  <strong>Why This Matters:</strong> Generic trip planning tools give everyone the same "top 10" list. You're not everyone. Our tool recognizes that a 25-year-old backpacker needs different recommendations than a family with kids or a honeymooning couple.
                </p>
              </div>
            </div>
          </div>

          {/* Feature 2: Greece-Specific Intelligence */}
          <div className="mb-20">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-blue-500 text-white flex items-center justify-center mr-4">
                <Globe className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Greece-Specific Intelligence Database</h2>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8">
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Our Greece trip planning tool contains deep, specialized knowledge about Greece that generic travel planners can't match.
              </p>

              <div className="space-y-4">
                {[
                  { icon: '🏛️', title: 'Destination Intelligence', desc: '25+ islands and mainland destinations, 500+ restaurants, 200+ attractions with actual visit durations' },
                  { icon: '⛴️', title: 'Ferry & Transportation Data', desc: 'Real ferry schedules, reliable vs. frequently delayed routes, seasonal service changes' },
                  { icon: '🏖️', title: 'Seasonal Insights', desc: 'Best time to visit, crowd levels by month, weather patterns, festival calendars' },
                  { icon: '🍽️', title: 'Authentic Dining Intelligence', desc: 'Traditional tavernas vs. tourist restaurants, must-try dishes, price ranges' }
                ].map((item, i) => (
                  <div key={i} className="bg-white rounded-xl p-6 flex items-start space-x-4">
                    <div className="text-3xl">{item.icon}</div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-700 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Feature 3: Realistic Timing */}
          <div className="mb-20">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-500 text-white flex items-center justify-center mr-4">
                <Clock className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Realistic Timing Calculator</h2>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8">
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                The most common trip planning mistake is unrealistic timing. Our Greece trip planning tool features an engine that calculates actual, realistic schedules.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { title: 'Ferry & Transit Times', desc: 'Actual ferry durations, port-to-town transfer, buffer time for delays' },
                  { title: 'Walking & Travel Times', desc: 'Real walking distances, terrain considerations, traffic patterns' },
                  { title: 'Attraction Visit Durations', desc: 'How long people actually spend, peak vs. off-peak waiting times' },
                  { title: 'Logistics Time', desc: 'Check-in/check-out, meal durations, siesta closures (2-6 PM in summer)' }
                ].map((item, i) => (
                  <div key={i} className="bg-white rounded-xl p-6">
                    <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-orange-100 border border-orange-200 rounded-xl p-6">
                <p className="text-gray-700 leading-relaxed">
                  <strong>Why This Matters:</strong> Most trip planning tools pack 12 hours of activities into 6 hours of available time. You end up exhausted, missing things, or feeling rushed. Our tool ensures you actually enjoy your vacation.
                </p>
              </div>
            </div>
          </div>

          {/* Feature 4: Budget Planning */}
          <div className="mb-20">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-teal-500 text-white flex items-center justify-center mr-4">
                <DollarSign className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Smart Budget Planning & Tracking</h2>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-8">
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Transparent cost estimates so you know exactly what your Greece trip will cost—no surprises.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { icon: '💵', title: 'Cost Estimation', desc: 'Daily budgets, accommodation costs, meal expenses, ferry costs, attraction fees' },
                  { icon: '💡', title: 'Money-Saving Intelligence', desc: 'Free alternatives, cheap eats without sacrificing quality, best value accommodations' },
                  { icon: '🎯', title: 'Budget Flexibility', desc: 'Splurge vs. Save recommendations, where to spend more, where to cut costs' },
                  { icon: '📊', title: 'Transparent Pricing', desc: 'Real current prices, no hidden costs, exchange rate considerations' }
                ].map((item, i) => (
                  <div key={i} className="bg-white rounded-xl p-6">
                    <div className="text-2xl mb-3">{item.icon}</div>
                    <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Feature 5: Route Optimization */}
          <div className="mb-20">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center mr-4">
                <Route className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Intelligent Route Optimization</h2>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8">
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Automatically creates the most efficient route through your chosen destinations—no backtracking, no wasted time.
              </p>

              <div className="space-y-4">
                {[
                  { title: 'Geographic Efficiency', desc: 'Clusters nearby destinations, minimizes travel distance, accounts for ferry routes' },
                  { title: 'Ferry Schedule Integration', desc: 'Routes based on actual availability, avoids excessive connections, considers frequency' },
                  { title: 'Time Optimization', desc: 'Balances days between destinations, ensures adequate time in each location' },
                  { title: 'Interest Clustering', desc: 'Groups similar attractions efficiently, creates themed days, minimizes cross-city travel' }
                ].map((item, i) => (
                  <div key={i} className="bg-white rounded-xl p-6">
                    <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
            How Our Greece Trip Planning Tool Features Stack Up
          </h2>
          
          <div className="mt-12 overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-4 text-left font-bold text-gray-900">Feature</th>
                  <th className="p-4 text-center font-bold text-blue-600">Our Tool</th>
                  <th className="p-4 text-center font-bold text-gray-600">Generic AI</th>
                  <th className="p-4 text-center font-bold text-gray-600">Travel Agents</th>
                  <th className="p-4 text-center font-bold text-gray-600">DIY Planning</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  ['Greece Expertise', '✅ Deep', '❌ Superficial', '⚠️ Varies', '⚠️ Your Research'],
                  ['Personalization', '✅ Full', '⚠️ Limited', '✅ Yes', '✅ Total'],
                  ['Realistic Timing', '✅ Yes', '❌ Often Not', '✅ Yes', '⚠️ Guesswork'],
                  ['Cost', '✅ Free', '💰 $10-30', '💰 $100-500', '✅ Free'],
                  ['Time to Create', '✅ 3 min', '⚠️ 10 min', '⏱️ Hours', '⏱️ Days'],
                  ['Customizable', '✅ Fully', '⚠️ Limited', '⚠️ Somewhat', '✅ Yes'],
                  ['Local Insights', '✅ Extensive', '❌ Basic', '⚠️ Depends', '❌ None'],
                  ['Mobile Access', '✅ Perfect', '⚠️ Varies', '❌ No', '⚠️ Notes App']
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="p-4 font-medium text-gray-900">{row[0]}</td>
                    <td className="p-4 text-center">{row[1]}</td>
                    <td className="p-4 text-center">{row[2]}</td>
                    <td className="p-4 text-center">{row[3]}</td>
                    <td className="p-4 text-center">{row[4]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Real-World Benefits */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
            What These Greece Trip Planning Tool Features Mean for You
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {[
              { icon: '⏱️', title: 'Save 15-20 Hours', desc: 'No more reading 47 different blog posts with conflicting information' },
              { icon: '💰', title: 'Avoid Costly Mistakes', desc: 'Don\'t book accommodation in the wrong area or miss key ferry connections' },
              { icon: '🇬🇷', title: 'Experience Authentic Greece', desc: 'Eat where locals eat, visit hidden gems, skip tourist traps' },
              { icon: '📊', title: 'Stay on Budget', desc: 'Know exactly what things cost before you go' },
              { icon: '✨', title: 'Maximize Your Vacation', desc: 'Spend time enjoying Greece, not figuring out logistics' },
              { icon: '😌', title: 'Reduce Travel Stress', desc: 'Confidence knowing you have a solid, realistic plan' }
            ].map((benefit, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 gradient-primary">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Try All These Features Free Right Now
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Ready to experience the most comprehensive Greece trip planning tool features available? Start creating your personalized itinerary in the next 3 minutes.
          </p>
          
          <Link
            href="/quiz"
            className="inline-flex items-center space-x-3 px-10 py-5 bg-white text-primary rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all"
          >
            <span>Explore All Features - Start Planning</span>
            <ArrowRight className="w-5 h-5" />
          </Link>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            <div className="text-white/90">
              <Check className="w-5 h-5 mx-auto mb-2" />
              <div className="text-sm">100% Free Forever</div>
            </div>
            <div className="text-white/90">
              <Check className="w-5 h-5 mx-auto mb-2" />
              <div className="text-sm">No Credit Card</div>
            </div>
            <div className="text-white/90">
              <Check className="w-5 h-5 mx-auto mb-2" />
              <div className="text-sm">No Account Needed</div>
            </div>
            <div className="text-white/90">
              <Check className="w-5 h-5 mx-auto mb-2" />
              <div className="text-sm">Mobile Friendly</div>
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
              <a href="https://traveltourismdirectory.com/" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition text-sm">Travel and Tourism Directory</a>
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
            "@type": "SoftwareApplication",
            "name": "Greek Trip Planner",
            "applicationCategory": "TravelApplication",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "featureList": [
              "AI-powered personalization",
              "Greece-specific destination intelligence",
              "Realistic timing calculations",
              "Smart budget planning",
              "Route optimization",
              "Local insider knowledge",
              "Multi-format output",
              "Mobile responsive design",
              "Privacy-first approach"
            ]
          })
        }}
      />
    </main>
  )
}
