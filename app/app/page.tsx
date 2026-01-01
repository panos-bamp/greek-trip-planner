import Link from 'next/link'
import Image from 'next/image'
import { Sparkles, MapPin, Calendar, Compass, ArrowRight, Check, Star } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Greece Trip Planner | Free Itinerary Generator 2025',
  description: 'Plan your perfect Greece vacation with our free AI trip planner. Get personalized itineraries for Athens, Santorini & Greek islands in minutes. Start now!',
  openGraph: {
    title: 'AI Greece Trip Planner | Free Itinerary Generator 2025',
    description: 'Plan your perfect Greece vacation with our free AI trip planner.',
    images: ['/og-image.jpg'],
  },
}

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Navigation - White background with logo */}
      <nav className="fixed top-0 w-full bg-white shadow-sm z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Image 
                src="/logo.png" 
                alt="Greek Trip Planner" 
                width={70} 
                height={21}
                priority
              />
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/features" className="text-gray-700 hover:text-primary transition font-medium">Features</Link>
              <Link href="/how-it-works" className="text-gray-700 hover:text-primary transition font-medium">How it Works</Link>
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

      {/* Hero Section - Acropolis background image */}
      <div className="pt-32 pb-20 relative overflow-hidden min-h-[600px] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-acropolis.jpg"
            alt="Athens Acropolis"
            fill
            className="object-cover"
            priority
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/60 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-5 py-2.5 rounded-full mb-8 border border-white/20 animate-slide-up-fade">
              <Sparkles className="w-4 h-4 text-accent-pink" />
              <span className="text-white/90 text-sm font-semibold">AI-Powered Trip Planning</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight animate-slide-up-fade" style={{fontFamily: 'Space Grotesk, sans-serif', animationDelay: '0.1s'}}>
              Free AI Greece Trip Planner: Create Your Perfect Itinerary in Minutes
            </h1>

            <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed animate-slide-up-fade" style={{animationDelay: '0.2s'}}>
              Planning a trip to Greece? Our AI-powered Greece itinerary planner creates personalized travel plans tailored to your style, budget, and time. Skip the overwhelm—get insider tips, realistic timing, and day-by-day plans for Athens, Santorini, Mykonos, and beyond.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 animate-slide-up-fade" style={{animationDelay: '0.3s'}}>
              <Link
                href="/quiz"
                className="group px-10 py-5 bg-white text-primary rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all inline-flex items-center space-x-3"
              >
                <span>Plan My Trip</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <button className="px-10 py-5 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold text-lg border-2 border-white/30 hover:bg-white/20 hover:border-white/50 transition-all">
                See Example
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-primary mb-4" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
              The Smartest Way to Plan Your Greece Vacation
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
              Stop spending hours researching Greece travel guides. Our AI Greece trip planner analyzes your preferences and creates optimized itineraries with timing, transportation tips, and hidden gems most tourists never discover.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="p-8 rounded-3xl bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-100 hover:shadow-xl hover:scale-105 transition-all">
              <div className="w-14 h-14 gradient-pink rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-3">AI-Powered</h3>
              <p className="text-text-secondary leading-relaxed">
                Advanced AI analyzes your preferences to create the perfect itinerary tailored just for you
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-100 hover:shadow-xl hover:scale-105 transition-all">
              <div className="w-14 h-14 gradient-blue rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <MapPin className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-3">Local Insights</h3>
              <p className="text-text-secondary leading-relaxed">
                Get insider tips and hidden gems that most tourists never discover
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-100 hover:shadow-xl hover:scale-105 transition-all">
              <div className="w-14 h-14 gradient-green rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Calendar className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-3">Realistic Timing</h3>
              <p className="text-text-secondary leading-relaxed">
                No rushing! Itineraries account for real travel times and local rhythms
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div id="how-it-works" className="py-24 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-primary mb-4" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
              How It Works
            </h2>
            <p className="text-xl text-text-secondary">
              Your dream Greece trip in 3 simple steps
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-start space-x-6 bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all">
              <div className="flex-shrink-0 w-12 h-12 gradient-pink rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                1
              </div>
              <div>
                <h3 className="text-2xl font-bold text-primary mb-2">Answer Quick Questions</h3>
                <p className="text-text-secondary leading-relaxed">
                  Tell us about your travel style, interests, and preferences in just 3 minutes
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-6 bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all">
              <div className="flex-shrink-0 w-12 h-12 gradient-blue rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                2
              </div>
              <div>
                <h3 className="text-2xl font-bold text-primary mb-2">AI Creates Your Plan</h3>
                <p className="text-text-secondary leading-relaxed">
                  Our AI analyzes thousands of data points to craft your perfect personalized itinerary
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-6 bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all">
              <div className="flex-shrink-0 w-12 h-12 gradient-green rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                3
              </div>
              <div>
                <h3 className="text-2xl font-bold text-primary mb-2">Start Your Adventure</h3>
                <p className="text-text-secondary leading-relaxed">
                  Get your complete itinerary instantly with day-by-day plans, tips, and recommendations
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <Link
              href="/quiz"
              className="inline-flex items-center space-x-3 px-10 py-5 gradient-pink text-white rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all"
            >
              <span>Create My Itinerary</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Footer - Blue color */}
      <footer className="py-12 gradient-primary text-white/80">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div className="flex items-center space-x-3">
              <span className="text-xl font-bold text-white" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
                Greek Trip Planner
              </span>
            </div>
            
            <div className="flex items-center space-x-8 text-sm">
              <a href="#" className="hover:text-white transition">Privacy</a>
              <a href="#" className="hover:text-white transition">Terms</a>
              <a href="#" className="hover:text-white transition">Contact</a>
            </div>
            
            <div className="text-sm">
              © 2024 Greek Trip Planner. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
