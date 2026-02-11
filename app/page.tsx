import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, MapPin, Clock, Utensils, Compass, Star, ChevronDown, Ship, Landmark, Sun, Shield, Gem, Heart, Users, Sparkles, BookOpen, Map, Camera } from 'lucide-react'

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
            <Link href="/ai-trip-planner" className="btn-accent px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2">
              Start Planning <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <Link href="/ai-trip-planner" className="md:hidden btn-accent px-4 py-2 rounded-full text-sm font-semibold">
            Start Planning
          </Link>
        </div>
      </nav>

      {/* ===== HERO SECTION — LEFT ALIGNED ===== */}
      <section className="relative min-h-[92vh] flex items-center pt-16">
        <div className="absolute inset-0">
          <Image src="/hero-acropolis.jpg" alt="Athens Acropolis" fill className="object-cover" priority quality={85} />
          <div className="gradient-hero absolute inset-0" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <div className="animate-fade-in-up inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6">
              <Sun className="w-4 h-4 text-[#FF5635]" />
              <span className="text-white/90 text-sm font-medium">AI-Powered Trip Planning</span>
            </div>
            <h1 className="animate-fade-in-up delay-100 text-5xl sm:text-6xl md:text-7xl text-white leading-[1.05] mb-6">
              Plan Your Perfect<br />
              <span className="text-[#FF5635]">Greece Trip</span>
            </h1>
            <p className="animate-fade-in-up delay-200 text-lg sm:text-xl text-white/80 max-w-lg mb-10 leading-relaxed font-light">
              Free AI planner creates personalized itineraries for Athens, Santorini & Greek islands. Get insider tips and realistic timing in minutes.
            </p>
            <div className="animate-fade-in-up delay-300">
              <Link href="/ai-trip-planner" className="btn-accent px-8 py-4 rounded-full text-lg font-semibold inline-flex items-center gap-3 animate-pulse-glow">
                Plan My Trip Free <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="animate-fade-in-up delay-400 mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-lg">
              {[
                { value: '12,000+', label: 'Itineraries Created' },
                { value: '4.9/5', label: 'Average Rating' },
                { value: '100%', label: 'Free Forever' },
                { value: '3 min', label: 'To Complete' },
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

      {/* ===== YOUR GREECE, YOUR WAY ===== */}
      <section className="section-padding bg-[#FAF6F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="divider-accent mx-auto mb-4" />
            <h2 className="text-4xl sm:text-5xl text-[#180204] mb-4">Your Greece, Your Way</h2>
            <p className="text-[#180204]/60 max-w-2xl mx-auto">Whether you&apos;re chasing sunsets with your partner, exploring ruins solo, or keeping the kids entertained — we build the itinerary around YOU. Read our expert guides to start dreaming.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* ✅ LIVE — Couples */}
            <Link href="/blog/best-greek-islands-for-couples" className="group bg-white rounded-3xl overflow-hidden card-hover">
              <div className="relative h-52 overflow-hidden">
                <Image src="/Santorini_Evening_Glow.jpg" alt="Romantic Greece trip for couples" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#180204]/50 to-transparent" />
                <div className="absolute bottom-4 left-5 right-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="w-4 h-4 text-[#FF5635]" />
                    <span className="text-white/80 text-xs font-sans font-medium uppercase tracking-wider">Couples</span>
                  </div>
                  <h3 className="text-xl text-white">Romantic Island Escapes</h3>
                </div>
              </div>
              <div className="p-5">
                <p className="text-[#180204]/60 text-sm leading-relaxed mb-3">Caldera sunsets in Santorini, private beaches in Milos, candlelit dinners in Nafplio. Discover the most romantic corners of Greece.</p>
                <span className="text-[#FF5635] text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all font-sans">Best Islands for Couples <ArrowRight className="w-4 h-4" /></span>
              </div>
            </Link>

            {/* ✅ LIVE — Families */}
            <Link href="/blog/best-greek-islands-for-families" className="group bg-white rounded-3xl overflow-hidden card-hover">
              <div className="relative h-52 overflow-hidden">
                <Image src="/Paros_Island_View.jpg" alt="Family trip to Greece" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#180204]/50 to-transparent" />
                <div className="absolute bottom-4 left-5 right-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-[#2C73FF]" />
                    <span className="text-white/80 text-xs font-sans font-medium uppercase tracking-wider">Families</span>
                  </div>
                  <h3 className="text-xl text-white">Family-Friendly Adventures</h3>
                </div>
              </div>
              <div className="p-5">
                <p className="text-[#180204]/60 text-sm leading-relaxed mb-3">Sandy beaches with shallow water, kid-approved tavernas, ancient myths that come alive. Greece is magic for families of all ages.</p>
                <span className="text-[#FF5635] text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all font-sans">Best Islands for Families <ArrowRight className="w-4 h-4" /></span>
              </div>
            </Link>

            {/* ❌ NOT LIVE — Solo */}
            <div className="bg-white rounded-3xl overflow-hidden">
              <div className="relative h-52 overflow-hidden">
                <Image src="/Meteora_Sunset_View.jpg" alt="Solo trip to Greece" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#180204]/50 to-transparent" />
                <div className="absolute bottom-4 left-5 right-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Compass className="w-4 h-4 text-[#FF5635]" />
                    <span className="text-white/80 text-xs font-sans font-medium uppercase tracking-wider">Solo</span>
                  </div>
                  <h3 className="text-xl text-white">Solo Discovery</h3>
                </div>
              </div>
              <div className="p-5">
                <p className="text-[#180204]/60 text-sm leading-relaxed">Safe, welcoming, and endlessly fascinating. From the monasteries of Meteora to the trails of Ikaria — Greece rewards the solo traveler.</p>
              </div>
            </div>

            {/* ❌ NOT LIVE — Luxury */}
            <div className="bg-white rounded-3xl overflow-hidden">
              <div className="relative h-52 overflow-hidden">
                <Image src="/Mykonos_Architecture.jpg" alt="Luxury trip to Greece" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#180204]/50 to-transparent" />
                <div className="absolute bottom-4 left-5 right-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-4 h-4 text-[#FF5635]" />
                    <span className="text-white/80 text-xs font-sans font-medium uppercase tracking-wider">Luxury</span>
                  </div>
                  <h3 className="text-xl text-white">Luxury Greek Getaways</h3>
                </div>
              </div>
              <div className="p-5">
                <p className="text-[#180204]/60 text-sm leading-relaxed">Five-star villas with infinity pools, private yacht charters, Michelin dining. Experience Greece at its most indulgent and exclusive.</p>
              </div>
            </div>

            {/* ❌ NOT LIVE — Girls Trip */}
            <div className="bg-white rounded-3xl overflow-hidden">
              <div className="relative h-52 overflow-hidden">
                <Image src="/Rhodes_Historic_Quarter.jpg" alt="Girls trip to Greece" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#180204]/50 to-transparent" />
                <div className="absolute bottom-4 left-5 right-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-[#2C73FF]" />
                    <span className="text-white/80 text-xs font-sans font-medium uppercase tracking-wider">Friends</span>
                  </div>
                  <h3 className="text-xl text-white">Girls Trip & Friend Groups</h3>
                </div>
              </div>
              <div className="p-5">
                <p className="text-[#180204]/60 text-sm leading-relaxed">Beach clubs in Mykonos, wine tasting in Santorini, shopping in Athens. The ultimate group getaway with something for everyone.</p>
              </div>
            </div>

            {/* ❌ NOT LIVE — Road Trip */}
            <div className="bg-white rounded-3xl overflow-hidden">
              <div className="relative h-52 overflow-hidden">
                <Image src="/Corfu_Beach_Paradise.jpg" alt="Greece road trip" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#180204]/50 to-transparent" />
                <div className="absolute bottom-4 left-5 right-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Map className="w-4 h-4 text-[#FF5635]" />
                    <span className="text-white/80 text-xs font-sans font-medium uppercase tracking-wider">Road Trip</span>
                  </div>
                  <h3 className="text-xl text-white">Open Road Adventures</h3>
                </div>
              </div>
              <div className="p-5">
                <p className="text-[#180204]/60 text-sm leading-relaxed">Wind through the Mani Peninsula, explore Zagori villages, drive coastal Crete. The best of Greece is between the destinations.</p>
              </div>
            </div>

          </div>

          {/* Planning guide pills — only link live ones */}
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/blog/greece-itinerary-7-days" className="bg-white border border-[#E6DAD1] text-[#180204]/70 hover:text-[#FF5635] hover:border-[#FF5635]/30 px-4 py-2 rounded-full text-sm font-sans font-medium transition-all">7-Day Itinerary</Link>
            <Link href="/blog/greece-itinerary-10-days" className="bg-white border border-[#E6DAD1] text-[#180204]/70 hover:text-[#FF5635] hover:border-[#FF5635]/30 px-4 py-2 rounded-full text-sm font-sans font-medium transition-all">10-Day Itinerary</Link>
            <Link href="/blog/how-much-does-a-trip-to-greece-cost" className="bg-white border border-[#E6DAD1] text-[#180204]/70 hover:text-[#FF5635] hover:border-[#FF5635]/30 px-4 py-2 rounded-full text-sm font-sans font-medium transition-all">Budget Guide</Link>
            <Link href="/blog/where-to-go-in-greece-for-first-time" className="bg-white border border-[#E6DAD1] text-[#180204]/70 hover:text-[#FF5635] hover:border-[#FF5635]/30 px-4 py-2 rounded-full text-sm font-sans font-medium transition-all">First Time in Greece</Link>
            <Link href="/blog/3-days-in-athens" className="bg-white border border-[#E6DAD1] text-[#180204]/70 hover:text-[#FF5635] hover:border-[#FF5635]/30 px-4 py-2 rounded-full text-sm font-sans font-medium transition-all">3 Days in Athens</Link>
            <Link href="/blog/3-days-in-santorini" className="bg-white border border-[#E6DAD1] text-[#180204]/70 hover:text-[#FF5635] hover:border-[#FF5635]/30 px-4 py-2 rounded-full text-sm font-sans font-medium transition-all">3 Days in Santorini</Link>
          </div>
        </div>
      </section>

      {/* ===== EXPLORE DESTINATIONS ===== */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="divider-accent mx-auto mb-4" />
            <h2 className="text-4xl sm:text-5xl text-[#180204] mb-4">Explore 120+ Destinations</h2>
            <p className="text-[#180204]/60 max-w-2xl mx-auto">Every island, ancient site, and hidden village — covered in depth by local experts. Guides are being published weekly.</p>
          </div>
          
          {/* Featured destination cards — none of these 8 are live yet, so no links */}
          <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hidden md:grid md:grid-cols-4 md:overflow-visible">
            {[
              { name: 'Santorini', desc: 'Iconic sunsets & caldera views', img: '/Santorini_Sunset_View.jpg', color: 'bg-orange-50' },
              { name: 'Mykonos', desc: 'Beach clubs & nightlife', img: '/Mykonos_Architecture.jpg', color: 'bg-blue-50' },
              { name: 'Athens', desc: 'Ancient sites & modern culture', img: '/hero-acropolis.jpg', color: 'bg-amber-50' },
              { name: 'Crete', desc: 'Largest island, rich history', img: '/Crete_Knossos_Ruins.jpg', color: 'bg-stone-50' },
              { name: 'Meteora', desc: 'Monasteries in the sky', img: '/Meteora_Mountain_Monastery.jpg', color: 'bg-orange-50' },
              { name: 'Paros', desc: 'Authentic Cycladic charm', img: '/Paros_Island_View.jpg', color: 'bg-blue-50' },
              { name: 'Rhodes', desc: 'Medieval town & beaches', img: '/Rhodes_Historic_Quarter.jpg', color: 'bg-amber-50' },
              { name: 'Corfu', desc: 'Lush island paradise', img: '/Corfu_Beach_Paradise.jpg', color: 'bg-stone-50' },
            ].map((dest) => (
              <div key={dest.name} className={`min-w-[250px] md:min-w-0 ${dest.color} rounded-3xl overflow-hidden`}>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={dest.img} alt={dest.name} fill className="object-cover" />
                </div>
                <div className="p-5">
                  <h3 className="text-xl text-[#180204] mb-1">{dest.name}</h3>
                  <p className="text-[#180204]/55 text-sm">{dest.desc}</p>
                  <span className="text-[#180204]/30 text-xs font-sans mt-2 inline-block">Guide coming soon</span>
                </div>
              </div>
            ))}
          </div>

          {/* Destination directory by region — only live guides get links */}
          <div className="mt-12 space-y-6">

            {/* Cyclades — LIVE: Milos, Tinos, Serifos */}
            <div>
              <h3 className="text-lg text-[#180204] mb-3 font-sans font-semibold">Cyclades Islands</h3>
              <div className="flex flex-wrap gap-2">
                <span className="bg-[#FAF6F3] border border-[#E6DAD1]/60 text-[#180204]/40 px-3 py-1.5 rounded-full text-sm font-sans">Naxos</span>
                <Link href="/blog/milos-travel-guide" className="bg-[#FAF6F3] border border-[#E6DAD1]/60 text-[#180204]/65 hover:text-[#FF5635] hover:border-[#FF5635]/30 px-3 py-1.5 rounded-full text-sm font-sans transition-all">Milos</Link>
                <span className="bg-[#FAF6F3] border border-[#E6DAD1]/60 text-[#180204]/40 px-3 py-1.5 rounded-full text-sm font-sans">Ios</span>
                <span className="bg-[#FAF6F3] border border-[#E6DAD1]/60 text-[#180204]/40 px-3 py-1.5 rounded-full text-sm font-sans">Folegandros</span>
                <span className="bg-[#FAF6F3] border border-[#E6DAD1]/60 text-[#180204]/40 px-3 py-1.5 rounded-full text-sm font-sans">Sifnos</span>
                <Link href="/blog/tinos-travel-guide" className="bg-[#FAF6F3] border border-[#E6DAD1]/60 text-[#180204]/65 hover:text-[#FF5635] hover:border-[#FF5635]/30 px-3 py-1.5 rounded-full text-sm font-sans transition-all">Tinos</Link>
                <span className="bg-[#FAF6F3] border border-[#E6DAD1]/60 text-[#180204]/40 px-3 py-1.5 rounded-full text-sm font-sans">Syros</span>
                <Link href="/blog/serifos-travel-guide" className="bg-[#FAF6F3] border border-[#E6DAD1]/60 text-[#180204]/65 hover:text-[#FF5635] hover:border-[#FF5635]/30 px-3 py-1.5 rounded-full text-sm font-sans transition-all">Serifos</Link>
                <span className="bg-[#FAF6F3] border border-[#E6DAD1]/60 text-[#180204]/40 px-3 py-1.5 rounded-full text-sm font-sans">Andros</span>
                <span className="bg-[#FAF6F3] border border-[#E6DAD1]/60 text-[#180204]/40 px-3 py-1.5 rounded-full text-sm font-sans">Amorgos</span>
                <span className="bg-[#FAF6F3] border border-[#E6DAD1]/60 text-[#180204]/40 px-3 py-1.5 rounded-full text-sm font-sans">Antiparos</span>
                <span className="bg-[#FAF6F3] border border-[#E6DAD1]/60 text-[#180204]/40 px-3 py-1.5 rounded-full text-sm font-sans">Koufonisia</span>
                <span className="bg-[#FAF6F3] border border-[#E6DAD1]/60 text-[#180204]/40 px-3 py-1.5 rounded-full text-sm font-sans">Kea</span>
                <span className="bg-[#FAF6F3] border border-[#E6DAD1]/60 text-[#180204]/40 px-3 py-1.5 rounded-full text-sm font-sans">Kimolos</span>
              </div>
            </div>

            {/* Dodecanese — LIVE: Kos */}
            <div>
              <h3 className="text-lg text-[#180204] mb-3 font-sans font-semibold">Dodecanese Islands</h3>
              <div className="flex flex-wrap gap-2">
                <Link href="/blog/kos-travel-guide" className="bg-[#FAF6F3] border border-[#E6DAD1]/60 text-[#180204]/65 hover:text-[#FF5635] hover:border-[#FF5635]/30 px-3 py-1.5 rounded-full text-sm font-sans transition-all">Kos</Link>
                <span className="bg-[#FAF6F3] border border-[#E6DAD1]/60 text-[#180204]/40 px-3 py-1.5 rounded-full text-sm font-sans">Patmos</span>
                <span className="bg-[#FAF6F3] border border-[#E6DAD1]/60 text-[#180204]/40 px-3 py-1.5 rounded-full text-sm font-sans">Symi</span>
                <span className="bg-[#FAF6F3] border border-[#E6DAD1]/60 text-[#180204]/40 px-3 py-1.5 rounded-full text-sm font-sans">Karpathos</span>
                <span className="bg-[#FAF6F3] border border-[#E6DAD1]/60 text-[#180204]/40 px-3 py-1.5 rounded-full text-sm font-sans">Leros</span>
                <span className="bg-[#FAF6F3] border border-[#E6DAD1]/60 text-[#180204]/40 px-3 py-1.5 rounded-full text-sm font-sans">Kalymnos</span>
                <span className="bg-[#FAF6F3] border border-[#E6DAD1]/60 text-[#180204]/40 px-3 py-1.5 rounded-full text-sm font-sans">Astypalea</span>
                <span className="bg-[#FAF6F3] border border-[#E6DAD1]/60 text-[#180204]/40 px-3 py-1.5 rounded-full text-sm font-sans">Kastellorizo</span>
                <span className="bg-[#FAF6F3] border border-[#E6DAD1]/60 text-[#180204]/40 px-3 py-1.5 rounded-full text-sm font-sans">Nisyros</span>
                <span className="bg-[#FAF6F3] border border-[#E6DAD1]/60 text-[#180204]/40 px-3 py-1.5 rounded-full text-sm font-sans">Lipsi</span>
              </div>
            </div>

            {/* Ionian — LIVE: Zakynthos, Lefkada */}
            <div>
              <h3 className="text-lg text-[#180204] mb-3 font-sans font-semibold">Ionian Islands</h3>
              <div className="flex flex-wrap gap-2">
                <Link href="/blog/zakynthos-travel-guide" className="bg-[#FAF6F3] border border-[#E6DAD1]/60 text-[#180204]/65 hover:text-[#FF5635] hover:border-[#FF5635]/30 px-3 py-1.5 rounded-full text-sm font-sans transition-all">Zakynthos</Link>
                <span className="bg-[#FAF6F3] border border-[#E6DAD1]/60 text-[#180204]/40 px-3 py-1.5 rounded-full text-sm font-sans">Kefalonia</span>
                <Link href="/blog/lefkada-travel-guide" className="bg-[#FAF6F3] border border-[#E6DAD1]/60 text-[#180204]/65 hover:text-[#FF5635] hover:border-[#FF5635]/30 px-3 py-1.5 rounded-full text-sm font-sans transition-all">Lefkada</Link>
                <span className="bg-[#FAF6F3] border border-[#E6DAD1]/60 text-[#180204]/40 px-3 py-1.5 rounded-full text-sm font-sans">Ithaca</span>
                <span className="bg-[#FAF6F3] border border-[#E6DAD1]/60 text-[#180204]/40 px-3 py-1.5 rounded-full text-sm font-sans">Paxos</span>
                <span className="bg-[#FAF6F3] border border-[#E6DAD1]/60 text-[#180204]/40 px-3 py-1.5 rounded-full text-sm font-sans">Kythira</span>
              </div>
            </div>

            {/* Crete — LIVE: Chania, Rethymno */}
            <div>
              <h3 className="text-lg text-[#180204] mb-3 font-sans font-semibold">Crete</h3>
              <div className="flex flex-wrap gap-2">
                <Link href="/blog/chania-travel-guide" className="bg-[#FAF6F3] border border-[#E6DAD1]/60 text-[#180204]/65 hover:text-[#FF5635] hover:border-[#FF5635]/30 px-3 py-1.5 rounded-full text-sm font-sans transition-all">Chania</Link>
                <Link href="/blog/rethymno-travel-guide" className="bg-[#FAF6F3] border border-[#E6DAD1]/60 text-[#180204]/65 hover:text-[#FF5635] hover:border-[#FF5635]/30 px-3 py-1.5 rounded-full text-sm font-sans transition-all">Rethymno</Link>
                <span className="bg-[#FAF6F3] border border-[#E6DAD1]/60 text-[#180204]/40 px-3 py-1.5 rounded-full text-sm font-sans">Heraklion</span>
                <span className="bg-[#FAF6F3] border border-[#E6DAD1]/60 text-[#180204]/40 px-3 py-1.5 rounded-full text-sm font-sans">Agios Nikolaos</span>
                <span className="bg-[#FAF6F3] border border-[#E6DAD1]/60 text-[#180204]/40 px-3 py-1.5 rounded-full text-sm font-sans">Elounda</span>
                <span className="bg-[#FAF6F3] border border-[#E6DAD1]/60 text-[#180204]/40 px-3 py-1.5 rounded-full text-sm font-sans">Balos Beach</span>
                <span className="bg-[#FAF6F3] border border-[#E6DAD1]/60 text-[#180204]/40 px-3 py-1.5 rounded-full text-sm font-sans">Elafonissi Beach</span>
              </div>
            </div>

            {/* Sporades & Saronic — NONE live */}
            <div>
              <h3 className="text-lg text-[#180204] mb-3 font-sans font-semibold">Sporades & Saronic Gulf</h3>
              <div className="flex flex-wrap gap-2">
                {['Skopelos', 'Skiathos', 'Alonissos', 'Skyros', 'Hydra', 'Aegina', 'Poros', 'Spetses', 'Agistri'].map((name) => (
                  <span key={name} className="bg-[#FAF6F3] border border-[#E6DAD1]/60 text-[#180204]/40 px-3 py-1.5 rounded-full text-sm font-sans">{name}</span>
                ))}
              </div>
            </div>

            {/* Mainland — NONE live */}
            <div>
              <h3 className="text-lg text-[#180204] mb-3 font-sans font-semibold">Mainland Greece</h3>
              <div className="flex flex-wrap gap-2">
                {['Thessaloniki', 'Delphi', 'Nafplio', 'Olympia', 'Monemvasia', 'Mani Peninsula', 'Zagori Villages', 'Halkidiki', 'Pelion', 'Parga', 'Mount Olympus', 'Cape Sounion'].map((name) => (
                  <span key={name} className="bg-[#FAF6F3] border border-[#E6DAD1]/60 text-[#180204]/40 px-3 py-1.5 rounded-full text-sm font-sans">{name}</span>
                ))}
              </div>
            </div>

            {/* Popular Guides — ALL LIVE */}
            <div>
              <h3 className="text-lg text-[#180204] mb-3 font-sans font-semibold">Popular Guides</h3>
              <div className="flex flex-wrap gap-2">
                <Link href="/blog/best-beaches-in-greece" className="bg-[#FF5635]/8 border border-[#FF5635]/15 text-[#FF5635] hover:bg-[#FF5635] hover:text-white px-3 py-1.5 rounded-full text-sm font-sans font-medium transition-all">Best Beaches in Greece</Link>
                <Link href="/blog/best-greek-islands-to-visit-for-the-first-time" className="bg-[#FF5635]/8 border border-[#FF5635]/15 text-[#FF5635] hover:bg-[#FF5635] hover:text-white px-3 py-1.5 rounded-full text-sm font-sans font-medium transition-all">Best Islands for First-Timers</Link>
                <Link href="/blog/best-greek-islands-for-beaches" className="bg-[#FF5635]/8 border border-[#FF5635]/15 text-[#FF5635] hover:bg-[#FF5635] hover:text-white px-3 py-1.5 rounded-full text-sm font-sans font-medium transition-all">Best Islands for Beaches</Link>
                <Link href="/blog/best-places-to-visit-in-greece-for-young-adults" className="bg-[#FF5635]/8 border border-[#FF5635]/15 text-[#FF5635] hover:bg-[#FF5635] hover:text-white px-3 py-1.5 rounded-full text-sm font-sans font-medium transition-all">Best for Nightlife</Link>
                <Link href="/blog/best-places-to-visit-in-greece-by-month" className="bg-[#FF5635]/8 border border-[#FF5635]/15 text-[#FF5635] hover:bg-[#FF5635] hover:text-white px-3 py-1.5 rounded-full text-sm font-sans font-medium transition-all">Best by Month</Link>
                <Link href="/blog/best-unknown-and-small-greek-islands" className="bg-[#FF5635]/8 border border-[#FF5635]/15 text-[#FF5635] hover:bg-[#FF5635] hover:text-white px-3 py-1.5 rounded-full text-sm font-sans font-medium transition-all">Hidden Gem Islands</Link>
                <Link href="/blog/best-way-to-see-the-greek-islands" className="bg-[#FF5635]/8 border border-[#FF5635]/15 text-[#FF5635] hover:bg-[#FF5635] hover:text-white px-3 py-1.5 rounded-full text-sm font-sans font-medium transition-all">Island Hopping Guide</Link>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link href="/blog" className="inline-flex items-center gap-2 text-[#180204] hover:text-[#FF5635] transition-colors font-sans font-semibold">
              <BookOpen className="w-5 h-5" />
              Browse All Travel Guides <ArrowRight className="w-4 h-4" />
            </Link>
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
                    <th className="p-4 text-center font-sans"><span className="text-[#FF5635] font-bold">Greek Trip Planner</span></th>
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
              { q: 'Is the Greece itinerary planner really free?', a: 'Yes! 100% free, forever. No hidden fees, no premium tiers, no credit card required.' },
              { q: 'Do I need to create an account?', a: 'Nope! No sign-up, no email, no account needed. Just answer questions and get your itinerary instantly.' },
              { q: 'How accurate are the ferry times?', a: 'We use real ferry schedule data, but times can change seasonally. Always double-check with official ferry websites closer to your travel dates.' },
              { q: 'Can I modify the itinerary after it\'s generated?', a: 'Absolutely! Your itinerary is completely editable. Think of it as a smart starting point you can customize.' },
              { q: 'What time of year is best to visit Greece?', a: 'Shoulder season (April-May, Sept-Oct) offers perfect weather, fewer crowds, and better prices. Peak season (June-Aug) is hot and crowded but all islands operate.' },
              { q: 'How many days do I need for Greece?', a: 'Minimum 5-7 days (Athens + 1 island). Ideal first trip is 10-14 days (Athens + 2-3 islands). Comprehensive trip: 14-21 days.' },
            ].map((faq, i) => (
              <details key={i} className="group bg-[#FAF6F3] rounded-2xl border border-[#E6DAD1]/60">
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
              { quote: 'Best free travel tool I\'ve used. The local restaurant recommendations alone were worth it. Found gems we never would have discovered otherwise.', name: 'James T.', location: 'UK' },
              { quote: 'As a first-timer to Greece, I was overwhelmed. This AI planner made everything simple and gave me confidence in my itinerary. Trip was perfect!', name: 'Maria L.', location: 'Australia' },
            ].map((testimonial, i) => (
              <div key={i} className="bg-white rounded-3xl p-8 border border-[#E6DAD1]/60 card-hover">
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
          <h2 className="text-4xl sm:text-5xl md:text-6xl text-white mb-6">Your Greek Adventure<br />Starts Here</h2>
          <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">Join 12,000+ travelers who created their dream Greece itinerary in minutes. Completely free, no credit card required.</p>
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
              <Link href="/how-it-works" className="text-white/60 hover:text-[#FF5635] transition-colors text-sm font-sans">How it Works</Link>
              <Link href="/blog" className="text-white/60 hover:text-[#FF5635] transition-colors text-sm font-sans">Blog</Link>
              <Link href="/about" className="text-white/60 hover:text-[#FF5635] transition-colors text-sm font-sans">About</Link>
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
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Greek Trip Planner",
            "description": "Free AI-powered Greece trip planner. Get personalized itineraries for Athens, Santorini & Greek islands in minutes.",
            "url": "https://greektriplanner.me",
            "applicationCategory": "TravelApplication",
            "operatingSystem": "Any",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" },
            "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "847" }
          })
        }}
      />
    </main>
  )
}
