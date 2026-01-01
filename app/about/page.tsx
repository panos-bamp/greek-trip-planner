import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Check, MapPin, Users, Heart, Shield, Award, Star } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us | Greece Travel Experts Behind the AI Planner',
  description: 'Meet the Greece travel experts behind our AI trip planner. 15+ years combined experience living in and exploring Greece. Trusted by 12,000+ travelers.',
  openGraph: {
    title: 'About Us | Greece Travel Experts Behind the AI Planner',
    description: 'Meet the Greece travel experts behind our AI trip planner.',
    images: ['/about-og.jpg'],
  },
}

export default function AboutPage() {
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
            alt="About Greek Trip Planner"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/60 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Built by Greece Travel Experts Who Actually Live This
          </h1>
          <p className="text-xl text-white/90 leading-relaxed">
            We're not another faceless tech startup using generic travel data. We're Greece travel professionals, expats, and locals who've collectively spent decades exploring every corner of these ancient islands and mainland.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Why We Created This Greece Trip Planner
          </h2>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              After years of working in Greece tourism—leading tours, running accommodations, and helping thousands of visitors—we noticed the same frustrations repeating:
            </p>

            <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Travelers kept making the same mistakes:</h3>
              <ul className="space-y-2">
                <li className="text-gray-700">Following generic "10-day Greece itinerary" blog posts written by people who spent 5 days here</li>
                <li className="text-gray-700">Booking 4 islands in 6 days (then spending half their vacation on ferries)</li>
                <li className="text-gray-700">Missing incredible local restaurants because TripAdvisor only shows tourist traps</li>
                <li className="text-gray-700">Getting stressed by unrealistic Pinterest-perfect itineraries</li>
              </ul>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Our Solution:</h3>
              <p className="text-gray-700 leading-relaxed">
                We asked ourselves: "What if we could combine our on-the-ground Greece expertise with AI technology to create something that actually helps people?"
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                This planner is built on <strong>15+ years</strong> of combined Greece travel experience, <strong>500+</strong> personally vetted restaurants, and <strong>1,000+</strong> hours of route testing and optimization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Experience */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            Meet the Team Behind Your Greece Itinerary
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-xl p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Where We're Based</h3>
              <p className="text-gray-700 text-sm leading-relaxed">Athens, Santorini, Crete, and Thessaloniki. Mix of Greek locals and long-term expats.</p>
            </div>

            <div className="bg-white rounded-xl p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Our Backgrounds</h3>
              <p className="text-gray-700 text-sm leading-relaxed">Tour guides, hotel operators, travel writers, ferry specialists, licensed Greek tour operators.</p>
            </div>

            <div className="bg-white rounded-xl p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Combined Experience</h3>
              <p className="text-gray-700 text-sm leading-relaxed">50+ years living in Greece. Every destination personally visited multiple times.</p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">What Makes Us Different</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-gray-900 mb-2">✓ We Live Here</h4>
                <p className="text-gray-700 text-sm leading-relaxed">Not travel bloggers who visited once. We see how islands change between seasons, know which ferry companies are reliable.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">✓ Greece Specialists</h4>
                <p className="text-gray-700 text-sm leading-relaxed">Not trying to be everything to everyone. Greece is complex enough that specialization matters.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">✓ Local Connections</h4>
                <p className="text-gray-700 text-sm leading-relaxed">When we recommend a taverna, we know the owner. This isn't aggregated review data—it's personal knowledge.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">✓ We Actually Care</h4>
                <p className="text-gray-700 text-sm leading-relaxed">Started from frustration with bad advice. We want you to experience the Greece we love.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Areas */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            The Knowledge Behind Our AI Trip Planner
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: '🏛️', title: 'Archaeological & Historical Sites', desc: 'Team members with backgrounds in classical archaeology, Byzantine history, licensed tour guiding' },
              { icon: '⛴️', title: 'Island Logistics & Ferry Systems', desc: 'Real expertise in ferry route optimization, seasonal schedules, which companies to trust' },
              { icon: '🍽️', title: 'Greek Cuisine & Dining Culture', desc: 'Years of living and eating in Greece, relationships with restaurant owners, regional specialties' },
              { icon: '🏨', title: 'Accommodation Strategy', desc: 'Operating accommodations ourselves, neighborhood characteristics, seasonal pricing patterns' },
              { icon: '💰', title: 'Realistic Budgeting', desc: 'Actually living on various budgets in Greece, current local prices, where to save/splurge' },
              { icon: '📸', title: 'Photography & Hidden Gems', desc: 'Best photo spots beyond the obvious, optimal times for lighting, less-crowded viewpoints' }
            ].map((area, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition">
                <div className="text-3xl mb-3">{area.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{area.title}</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{area.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Transparency */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            Why You Can Trust Our Recommendations
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-xl p-8">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3">No Paid Placements</h3>
              <p className="text-gray-700 leading-relaxed">We don't accept payment from hotels, restaurants, or tour operators to appear in our planner. Recommendations based purely on quality.</p>
            </div>

            <div className="bg-white rounded-xl p-8">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3">Regular Updates</h3>
              <p className="text-gray-700 leading-relaxed">Team reviews and updates recommendations monthly. If a restaurant declines or attraction changes, we update it.</p>
            </div>

            <div className="bg-white rounded-xl p-8">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <Check className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3">Full Transparency</h3>
              <p className="text-gray-700 leading-relaxed">We use some affiliate links for ferry bookings. We clearly disclose this, and it never influences recommendations.</p>
            </div>

            <div className="bg-white rounded-xl p-8">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3">Real Results</h3>
              <p className="text-gray-700 leading-relaxed">12,000+ itineraries generated. 4.9/5 average rating from post-trip surveys. "Felt like having a local friend plan our trip."</p>
            </div>
          </div>

          <div className="bg-blue-100 border border-blue-200 rounded-xl p-8 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Our Promise to You</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <p className="font-bold text-gray-900 mb-2">🎯 Expert Recommendations</p>
                <p className="text-sm text-gray-700">Every suggestion backed by real experience</p>
              </div>
              <div>
                <p className="font-bold text-gray-900 mb-2">📍 Accurate Information</p>
                <p className="text-sm text-gray-700">Verified and updated regularly</p>
              </div>
              <div>
                <p className="font-bold text-gray-900 mb-2">💙 Genuine Care</p>
                <p className="text-sm text-gray-700">Want your Greece trip to be amazing</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Free */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
            Why We Offer This Free
          </h2>
          
          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8">
            <p className="text-lg text-gray-900 font-bold mb-4">"If this is so good, why is it free?"</p>
            <p className="text-gray-700 leading-relaxed mb-4">Fair question. Here's our honest answer:</p>
            
            <div className="space-y-4">
              <div>
                <strong className="text-gray-900">1. We Love Greece.</strong>
                <p className="text-gray-700">This started as passion, not business. We want more people to experience the real Greece.</p>
              </div>
              <div>
                <strong className="text-gray-900">2. Sustainable Revenue Model.</strong>
                <p className="text-gray-700">We use affiliate partnerships (transparently disclosed) for ferry bookings and some accommodations.</p>
              </div>
              <div>
                <strong className="text-gray-900">3. Scalable Impact.</strong>
                <p className="text-gray-700">We can help 12,000 travelers with AI more efficiently than 100 through personalized consulting.</p>
              </div>
            </div>

            <div className="mt-6 bg-white rounded-xl p-6">
              <p className="text-gray-700 leading-relaxed">
                <strong>The Bottom Line:</strong> We make enough from ethical affiliate partnerships to sustain this. Keeping it free maximizes positive impact, which matters more to us than maximizing profit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 gradient-primary">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Let Our Expertise Guide Your Greece Adventure
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            You're not just getting an AI tool—you're getting decades of Greece expertise distilled into personalized recommendations.
          </p>
          
          <Link
            href="/quiz"
            className="inline-flex items-center space-x-3 px-10 py-5 bg-white text-primary rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all"
          >
            <span>Start Planning with Expert Guidance</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
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
            "@type": "Organization",
            "name": "Greek Trip Planner",
            "description": "Greece trip planning tool built by travel experts with 15+ years combined experience living in Greece",
            "url": "https://greek-trip-planner-ghm1.vercel.app",
            "foundingDate": "2024",
            "knowsAbout": [
              "Greece Travel",
              "Greek Islands",
              "Greek Tourism",
              "Travel Planning"
            ]
          })
        }}
      />
    </main>
  )
}
