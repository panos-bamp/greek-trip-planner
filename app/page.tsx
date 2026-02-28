import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, MapPin, Utensils, Compass, Star, ChevronDown, Ship, Landmark, Sun, Shield, Gem, Heart, Users, Sparkles, BookOpen, Map, BarChart3, TrendingUp, Globe, Zap } from 'lucide-react'

export const metadata = {
  title: 'AI Greece Trip Planner | 133 Destinations · Free Itinerary Generator 2026',
  description: 'The world\'s most comprehensive AI Greece trip planner. 133 destinations, 11 regions, built by 5 Greek tourism experts. Create your personalized itinerary in 3 minutes — free.',
  openGraph: {
    title: 'AI Greece Trip Planner | 133 Destinations · Free Itinerary Generator 2026',
    description: 'The world\'s most comprehensive AI Greece trip planner. 133 destinations built by 5 local experts. Free personalized itineraries in 3 minutes.',
    url: 'https://greektriplanner.me',
    siteName: 'Greek Trip Planner',
    images: [{ url: '/hero-acropolis.jpg', width: 1200, height: 630 }],
    type: 'website',
  },
}

export default function HomePage() {

  /* ─── Destination directory data — ALL LIVE ─── */
  const destinationsByRegion = [
    {
      region: 'Cyclades',
      count: 24,
      destinations: [
        { name: 'Santorini', slug: 'santorini' }, { name: 'Mykonos', slug: 'mykonos' },
        { name: 'Naxos', slug: 'naxos' }, { name: 'Paros', slug: 'paros' },
        { name: 'Milos', slug: 'milos' }, { name: 'Ios', slug: 'ios' },
        { name: 'Folegandros', slug: 'folegandros' }, { name: 'Sifnos', slug: 'sifnos' },
        { name: 'Tinos', slug: 'tinos' }, { name: 'Serifos', slug: 'serifos' },
        { name: 'Andros', slug: 'andros' }, { name: 'Amorgos', slug: 'amorgos' },
        { name: 'Antiparos', slug: 'antiparos' }, { name: 'Syros', slug: 'syros' },
        { name: 'Koufonisia', slug: 'koufonisia' }, { name: 'Sikinos', slug: 'sikinos' },
        { name: 'Anafi', slug: 'anafi' }, { name: 'Kea', slug: 'kea' },
        { name: 'Kythnos', slug: 'kythnos' }, { name: 'Kimolos', slug: 'kimolos' },
        { name: 'Thirassia', slug: 'thirassia' }, { name: 'Iraklia', slug: 'iraklia' },
        { name: 'Schinoussa', slug: 'schinoussa' }, { name: 'Donoussa', slug: 'donoussa' },
      ],
    },
    {
      region: 'Dodecanese',
      count: 14,
      destinations: [
        { name: 'Rhodes', slug: 'rhodes' }, { name: 'Kos', slug: 'kos' },
        { name: 'Patmos', slug: 'patmos' }, { name: 'Symi', slug: 'symi' },
        { name: 'Karpathos', slug: 'karpathos' }, { name: 'Leros', slug: 'leros' },
        { name: 'Kalymnos', slug: 'kalymnos' }, { name: 'Astypalea', slug: 'astypalea' },
        { name: 'Kastellorizo', slug: 'kastellorizo' }, { name: 'Tilos', slug: 'tilos' },
        { name: 'Nisyros', slug: 'nisyros' }, { name: 'Lipsi', slug: 'lipsi' },
        { name: 'Chalki', slug: 'chalki' }, { name: 'Agathonisi', slug: 'agathonisi' },
      ],
    },
    {
      region: 'Ionian Islands',
      count: 6,
      destinations: [
        { name: 'Corfu', slug: 'corfu' }, { name: 'Zakynthos', slug: 'zakynthos' },
        { name: 'Kefalonia', slug: 'kefalonia' }, { name: 'Lefkada', slug: 'lefkada' },
        { name: 'Ithaca', slug: 'ithaca' }, { name: 'Paxos', slug: 'paxos' },
      ],
    },
    {
      region: 'Crete',
      count: 14,
      destinations: [
        { name: 'Crete', slug: 'crete' }, { name: 'Heraklion', slug: 'heraklion' },
        { name: 'Chania', slug: 'chania' }, { name: 'Rethymno', slug: 'rethymno' },
        { name: 'Agios Nikolaos', slug: 'agios-nikolaos' }, { name: 'Elounda', slug: 'elounda' },
        { name: 'Sitia', slug: 'sitia' }, { name: 'Ierapetra', slug: 'ierapetra' },
        { name: 'Paleochora', slug: 'paleochora' }, { name: 'Loutro', slug: 'loutro' },
        { name: 'Matala', slug: 'matala' }, { name: 'Samaria Gorge', slug: 'samaria-gorge' },
        { name: 'Balos Beach', slug: 'balos-beach' }, { name: 'Elafonissi Beach', slug: 'elafonissi-beach' },
      ],
    },
    {
      region: 'Sporades',
      count: 4,
      destinations: [
        { name: 'Skopelos', slug: 'skopelos' }, { name: 'Skiathos', slug: 'skiathos' },
        { name: 'Alonissos', slug: 'alonissos' }, { name: 'Skyros', slug: 'skyros' },
      ],
    },
    {
      region: 'Saronic Gulf',
      count: 5,
      destinations: [
        { name: 'Hydra', slug: 'hydra' }, { name: 'Aegina', slug: 'aegina' },
        { name: 'Poros', slug: 'poros' }, { name: 'Spetses', slug: 'spetses' },
        { name: 'Agistri', slug: 'agistri' },
      ],
    },
    {
      region: 'North Aegean',
      count: 7,
      destinations: [
        { name: 'Lesbos', slug: 'lesbos' }, { name: 'Samos', slug: 'samos' },
        { name: 'Chios', slug: 'chios' }, { name: 'Ikaria', slug: 'ikaria' },
        { name: 'Thasos', slug: 'thasos' }, { name: 'Samothrace', slug: 'samothrace' },
        { name: 'Lemnos', slug: 'lemnos' },
      ],
    },
    {
      region: 'Peloponnese',
      count: 23,
      destinations: [
        { name: 'Nafplio', slug: 'nafplio' }, { name: 'Olympia', slug: 'olympia' },
        { name: 'Mycenae', slug: 'mycenae' }, { name: 'Epidaurus', slug: 'epidaurus' },
        { name: 'Monemvasia', slug: 'monemvasia' }, { name: 'Mystras', slug: 'mystras' },
        { name: 'Mani Peninsula', slug: 'mani-peninsula' }, { name: 'Kardamyli', slug: 'kardamyli' },
        { name: 'Sparta', slug: 'sparta' }, { name: 'Ancient Corinth', slug: 'ancient-corinth' },
        { name: 'Kalamata', slug: 'kalamata' }, { name: 'Pylos', slug: 'pylos' },
        { name: 'Gytheio', slug: 'gytheio' }, { name: 'Dimitsana', slug: 'dimitsana' },
        { name: 'Stemnitsa', slug: 'stemnitsa' }, { name: 'Methoni', slug: 'methoni' },
        { name: 'Koroni', slug: 'koroni' }, { name: 'Vathia', slug: 'vathia' },
        { name: 'Limeni', slug: 'limeni' }, { name: 'Areopoli', slug: 'areopoli' },
        { name: 'Ancient Messene', slug: 'ancient-messene' }, { name: 'Nemea', slug: 'nemea' },
        { name: 'Kalavryta', slug: 'kalavryta' },
      ],
    },
    {
      region: 'Central Greece',
      count: 12,
      destinations: [
        { name: 'Meteora', slug: 'meteora' }, { name: 'Delphi', slug: 'delphi' },
        { name: 'Pelion', slug: 'pelion' }, { name: 'Arachova', slug: 'arachova' },
        { name: 'Volos', slug: 'volos' }, { name: 'Galaxidi', slug: 'galaxidi' },
        { name: 'Hosios Loukas', slug: 'hosios-loukas' }, { name: 'Thermopylae', slug: 'thermopylae' },
        { name: 'Lake Plastira', slug: 'lake-plastira' }, { name: 'Makrinitsa', slug: 'makrinitsa' },
        { name: 'Portaria', slug: 'portaria' }, { name: 'Tsagarada', slug: 'tsagarada' },
      ],
    },
    {
      region: 'Northern Greece',
      count: 19,
      destinations: [
        { name: 'Thessaloniki', slug: 'thessaloniki' }, { name: 'Zagori Villages', slug: 'zagori-villages' },
        { name: 'Vikos Gorge', slug: 'vikos-gorge' }, { name: 'Ioannina', slug: 'ioannina' },
        { name: 'Metsovo', slug: 'metsovo' }, { name: 'Mount Olympus', slug: 'mount-olympus' },
        { name: 'Halkidiki', slug: 'halkidiki' }, { name: 'Kastoria', slug: 'kastoria' },
        { name: 'Vergina', slug: 'vergina' }, { name: 'Pella', slug: 'pella' },
        { name: 'Kavala', slug: 'kavala' }, { name: 'Prespa Lakes', slug: 'prespa-lakes' },
        { name: 'Lake Kerkini', slug: 'lake-kerkini' }, { name: 'Edessa', slug: 'edessa' },
        { name: 'Naousa', slug: 'naousa' }, { name: 'Parga', slug: 'parga' },
        { name: 'Preveza', slug: 'preveza' }, { name: 'Syvota', slug: 'syvota' },
        { name: 'Litochoro', slug: 'litochoro' },
      ],
    },
    {
      region: 'Attica & Other',
      count: 5,
      destinations: [
        { name: 'Athens', slug: 'athens' }, { name: 'Cape Sounion', slug: 'cape-sounion' },
        { name: 'Kythira', slug: 'kythira' }, { name: 'Gavdos', slug: 'gavdos' },
        { name: 'Elafonisos', slug: 'elafonisos' },
      ],
    },
  ]

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
            <Link href="/insights" className="text-[#180204]/70 hover:text-[#FF5635] transition-colors text-sm font-medium">Insights</Link>
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

      {/* ===== HERO ===== */}
      <section className="relative min-h-[92vh] flex items-center pt-16">
        <div className="absolute inset-0">
          <Image src="/hero-acropolis.jpg" alt="Athens Acropolis" fill className="object-cover" priority quality={85} />
          <div className="gradient-hero absolute inset-0" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <div className="animate-fade-in-up inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6">
              <Sparkles className="w-4 h-4 text-[#FF5635]" />
              <span className="text-white/90 text-sm font-medium">The World&apos;s Most Comprehensive Greece Trip Planner</span>
            </div>
            <h1 className="animate-fade-in-up delay-100 text-5xl sm:text-6xl md:text-7xl text-white leading-[1.05] mb-6">
              133 Destinations.<br />
              <span className="text-[#FF5635]">One Perfect Trip.</span>
            </h1>
            <p className="animate-fade-in-up delay-200 text-lg sm:text-xl text-white/80 max-w-lg mb-10 leading-relaxed font-light">
              The only AI planner built by 5 Greek tourism professionals who actually live and work here. 13 questions, 3 minutes, a day-by-day itinerary no other tool can match.
            </p>
            <div className="animate-fade-in-up delay-300">
              <Link href="/ai-trip-planner" className="btn-accent px-8 py-4 rounded-full text-lg font-semibold inline-flex items-center gap-3 animate-pulse-glow">
                Plan My Trip Free <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="animate-fade-in-up delay-400 mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-lg">
              {[
                { value: '133', label: 'Destinations' },
                { value: '11', label: 'Regions Covered' },
                { value: '5', label: 'Local Experts' },
                { value: '100%', label: 'Free Forever' },
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

      {/* ===== WHY THIS IS DIFFERENT ===== */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="divider-accent mx-auto mb-4" />
            <h2 className="text-4xl sm:text-5xl text-[#180204] mb-4">Not Just Another AI Planner</h2>
            <p className="text-[#180204]/60 max-w-2xl mx-auto">Most travel AI scrapes the internet and gives you what everyone else gets. Ours is built on something no algorithm can replicate: decades of real Greek tourism expertise, encoded into 133 destination profiles.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-[#FF5635]/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <Globe className="w-8 h-8 text-[#FF5635]" />
              </div>
              <h3 className="text-2xl text-[#180204] mb-3">133 Destinations</h3>
              <p className="text-[#180204]/55 leading-relaxed">From Santorini to Samothrace, from Nafplio to Nisyros. Every island, village, archaeological site, and hidden beach — each with a dedicated travel guide written from first-hand experience.</p>
            </div>
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-[#2C73FF]/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <Users className="w-8 h-8 text-[#2C73FF]" />
              </div>
              <h3 className="text-2xl text-[#180204] mb-3">5 Greek Experts</h3>
              <p className="text-[#180204]/55 leading-relaxed">A Peloponnese tour operator, a Cretan hotel owner, an Athens transfer specialist, a Northern Greece supplier, and an engineer who connects it all. Real people, real expertise.</p>
            </div>
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-[#FF5635]/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <Zap className="w-8 h-8 text-[#FF5635]" />
              </div>
              <h3 className="text-2xl text-[#180204] mb-3">13 Smart Questions</h3>
              <p className="text-[#180204]/55 leading-relaxed">Our AI doesn&apos;t just ask where you want to go — it understands your pace, your crowd tolerance, your dining style, your experience level. Then it matches you to destinations you&apos;d never find alone.</p>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link href="/ai-trip-planner" className="btn-accent px-8 py-4 rounded-full text-lg font-semibold inline-flex items-center gap-3">
              Try It Free — 3 Minutes <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-[#180204]/40 text-sm mt-3 font-sans">No account · No credit card · Instant results</p>
          </div>
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

            {/* Couples */}
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

            {/* Families */}
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

            {/* Solo */}
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

            {/* Luxury */}
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

            {/* Friends */}
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

            {/* Road Trip */}
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

          {/* Planning guide pills */}
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

      {/* ===== EXPLORE 133 DESTINATIONS — ALL LINKED ===== */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="divider-accent mx-auto mb-4" />
            <h2 className="text-4xl sm:text-5xl text-[#180204] mb-4">Explore All 133 Destinations</h2>
            <p className="text-[#180204]/60 max-w-2xl mx-auto">Every destination has a dedicated travel guide written by our team. Click any destination to read the full guide — they&apos;re all live.</p>
          </div>

          {/* Featured destination cards — ALL LINKED */}
          <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hidden md:grid md:grid-cols-4 md:overflow-visible">
            {[
              { name: 'Santorini', desc: 'Iconic sunsets & caldera views', img: '/Santorini_Sunset_View.jpg', slug: 'santorini', color: 'bg-orange-50' },
              { name: 'Mykonos', desc: 'Beach clubs & nightlife', img: '/Mykonos_Architecture.jpg', slug: 'mykonos', color: 'bg-blue-50' },
              { name: 'Athens', desc: 'Ancient sites & modern culture', img: '/hero-acropolis.jpg', slug: 'athens', color: 'bg-amber-50' },
              { name: 'Crete', desc: 'Largest island, rich history', img: '/Crete_Knossos_Ruins.jpg', slug: 'crete', color: 'bg-stone-50' },
              { name: 'Meteora', desc: 'Monasteries in the sky', img: '/Meteora_Mountain_Monastery.jpg', slug: 'meteora', color: 'bg-orange-50' },
              { name: 'Paros', desc: 'Authentic Cycladic charm', img: '/Paros_Island_View.jpg', slug: 'paros', color: 'bg-blue-50' },
              { name: 'Rhodes', desc: 'Medieval town & beaches', img: '/Rhodes_Historic_Quarter.jpg', slug: 'rhodes', color: 'bg-amber-50' },
              { name: 'Corfu', desc: 'Lush island paradise', img: '/Corfu_Beach_Paradise.jpg', slug: 'corfu', color: 'bg-stone-50' },
            ].map((dest) => (
              <Link key={dest.name} href={`/blog/${dest.slug}-travel-guide`} className={`min-w-[250px] md:min-w-0 ${dest.color} rounded-3xl overflow-hidden group`}>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={dest.img} alt={dest.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <h3 className="text-xl text-[#180204] mb-1 group-hover:text-[#FF5635] transition-colors">{dest.name}</h3>
                  <p className="text-[#180204]/55 text-sm">{dest.desc}</p>
                  <span className="text-[#FF5635] text-xs font-sans font-semibold mt-2 inline-flex items-center gap-1 group-hover:gap-2 transition-all">Read Guide <ArrowRight className="w-3 h-3" /></span>
                </div>
              </Link>
            ))}
          </div>

          {/* Full destination directory by region — ALL LINKED */}
          <div className="mt-12 space-y-6">
            {destinationsByRegion.map((group) => (
              <div key={group.region}>
                <h3 className="text-lg text-[#180204] mb-3 font-sans font-semibold">
                  {group.region} <span className="text-[#180204]/30 text-sm font-normal ml-1">({group.count})</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.destinations.map((d) => (
                    <Link
                      key={d.slug}
                      href={`/blog/${d.slug}-travel-guide`}
                      className="bg-[#FAF6F3] border border-[#E6DAD1]/60 text-[#180204]/65 hover:text-[#FF5635] hover:border-[#FF5635]/30 hover:bg-[#FF5635]/5 px-3 py-1.5 rounded-full text-sm font-sans transition-all"
                    >
                      {d.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            {/* Popular Guides */}
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

      {/* ===== GREECE TOURISM INSIGHTS — NEW ===== */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left — Content */}
            <div>
              <div className="divider-accent mb-4" />
              <h2 className="text-4xl sm:text-5xl text-[#180204] mb-6">Greece Tourism<br /><span className="text-[#2C73FF]">Insights & Data</span></h2>
              <p className="text-[#180204]/65 text-lg leading-relaxed mb-8">
                We don&apos;t just help you plan trips — we analyze the Greek tourism industry at a level nobody else does. Original research, real data, and the kind of analysis that shapes how professionals and travelers understand Greece.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: BarChart3, label: 'Market Reports', desc: 'Revenue data, visitor statistics, industry forecasts' },
                  { icon: TrendingUp, label: 'Trend Analysis', desc: 'Emerging patterns in Greek travel demand' },
                  { icon: MapPin, label: 'Destination Performance', desc: 'Which regions are growing and why' },
                  { icon: Globe, label: 'Source Markets', desc: 'Where Greece\'s visitors come from' },
                ].map((item) => (
                  <div key={item.label} className="bg-[#FAF6F3] rounded-xl p-4 border border-[#E6DAD1]/40">
                    <item.icon className="w-5 h-5 text-[#2C73FF] mb-2" />
                    <h4 className="text-sm font-semibold text-[#180204] font-sans">{item.label}</h4>
                    <p className="text-xs text-[#180204]/50 font-sans mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>

              <Link href="/insights" className="inline-flex items-center gap-2 px-6 py-3 bg-[#2C73FF] text-white rounded-full font-semibold hover:bg-[#1a5fe0] transition-colors">
                Explore All Insights <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Right — Stats showcase */}
            <div className="bg-[#180204] rounded-3xl p-8 md:p-10">
              <div className="flex items-center gap-2 mb-8">
                <BarChart3 className="w-5 h-5 text-[#FF5635]" />
                <span className="text-white/70 text-sm font-semibold font-sans uppercase tracking-wider">Key Statistics</span>
              </div>

              <div className="space-y-6">
                {[
                  { value: '€22B+', label: 'Greece tourism revenue (2025)', trend: '+12%' },
                  { value: '36M+', label: 'International arrivals to Greece', trend: '+8%' },
                  { value: '23%', label: 'Tourism share of Greek GDP', trend: 'Stable' },
                  { value: '#1', label: 'European destination for island tourism', trend: '—' },
                ].map((stat, i) => (
                  <div key={i} className="flex items-center justify-between border-b border-white/10 pb-5 last:border-0 last:pb-0">
                    <div>
                      <div className="text-3xl font-bold text-white">{stat.value}</div>
                      <div className="text-white/45 text-sm font-sans mt-1">{stat.label}</div>
                    </div>
                    <span className={`text-xs font-semibold font-sans px-2.5 py-1 rounded-full ${stat.trend.startsWith('+') ? 'bg-emerald-500/15 text-emerald-400' : stat.trend === 'Stable' ? 'bg-amber-500/15 text-amber-400' : 'bg-white/10 text-white/40'}`}>
                      {stat.trend}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-white/40 text-xs font-sans">Sources: INSETE, Bank of Greece, GNTO, Eurostat. Updated regularly with original analysis.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="section-padding bg-[#FAF6F3]">
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
              <div key={service.title} className="bg-white rounded-2xl p-7 card-hover group border border-[#E6DAD1]/40">
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
      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="divider-accent mx-auto mb-4" />
            <h2 className="text-4xl sm:text-5xl text-[#180204] mb-4">Stop Wasting Time</h2>
            <p className="text-[#180204]/60">Start planning smart</p>
          </div>
          <div className="bg-[#FAF6F3] rounded-4xl overflow-hidden shadow-sm border border-[#E6DAD1]">
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
                    ['Destinations Covered', '133 with Guides', '10-20 Popular', 'Whatever You Find'],
                    ['Personalization', 'AI + 13 Questions', 'Generic Packages', 'DIY Effort'],
                    ['Local Knowledge', '5 Greek Experts', 'Varies', 'Reddit/TripAdvisor'],
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
      <section className="section-padding bg-[#FAF6F3]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="divider-accent mx-auto mb-4" />
            <h2 className="text-4xl sm:text-5xl text-[#180204] mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-5">
            {[
              { q: 'Is the Greece itinerary planner really free?', a: 'Yes! 100% free, forever. No hidden fees, no premium tiers, no credit card required.' },
              { q: 'Do I need to create an account?', a: 'Nope! No sign-up, no email, no account needed. Just answer questions and get your itinerary instantly.' },
              { q: 'How is this different from ChatGPT or other AI tools?', a: 'Generic AI tools scrape the internet. Ours is built on a proprietary database of 133 Greek destinations, each profiled by tourism professionals who live and work across Greece. The result is itineraries with realistic ferry routes, seasonal accuracy, and recommendations no generic AI can match.' },
              { q: 'How accurate are the ferry times?', a: 'We use real ferry schedule data, but times can change seasonally. Always double-check with official ferry websites closer to your travel dates.' },
              { q: 'Can I modify the itinerary after it\'s generated?', a: 'Absolutely! Your itinerary is completely editable. Think of it as a smart starting point you can customize.' },
              { q: 'What time of year is best to visit Greece?', a: 'Shoulder season (April-May, Sept-Oct) offers perfect weather, fewer crowds, and better prices. Peak season (June-Aug) is hot and crowded but all islands operate.' },
            ].map((faq, i) => (
              <details key={i} className="group bg-white rounded-2xl border border-[#E6DAD1]/60">
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
      <section className="section-padding bg-white">
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
              <div key={i} className="bg-[#FAF6F3] rounded-3xl p-8 border border-[#E6DAD1]/60 card-hover">
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
          <h2 className="text-4xl sm:text-5xl md:text-6xl text-white mb-6">133 Destinations.<br /><span className="text-[#FF5635]">Your Perfect Trip.</span></h2>
          <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">The most comprehensive AI Greece trip planner in the world. Built by locals, powered by real expertise, completely free.</p>
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
              <Link href="/insights" className="text-white/60 hover:text-[#FF5635] transition-colors text-sm font-sans">Insights</Link>
              <Link href="/about" className="text-white/60 hover:text-[#FF5635] transition-colors text-sm font-sans">About</Link>
              <Link href="/editorial-policy" className="text-white/60 hover:text-[#FF5635] transition-colors text-sm font-sans">Editorial Policy</Link>
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
            "name": "Greek Trip Planner — AI Itinerary Generator",
            "description": "The world's most comprehensive AI Greece trip planner. 133 destinations, 11 regions, built by 5 Greek tourism experts. Free personalized itineraries in 3 minutes.",
            "url": "https://greektriplanner.me",
            "applicationCategory": "TravelApplication",
            "operatingSystem": "Any",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" },
          })
        }}
      />
    </main>
  )
}
