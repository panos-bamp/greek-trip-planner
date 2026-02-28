import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, MapPin, Compass, Heart, Ship, Utensils, Clock, Mountain } from 'lucide-react'
import Navbar from '@/components/Navbar'

export const metadata = {
  title: 'About Us | The People Behind Greek Trip Planner',
  description: 'Meet the Greek locals behind Greek Trip Planner — an engineer from Athens, a Peloponnese tour operator, a Cretan hotel owner, and more. Real people, real Greece expertise.',
  openGraph: {
    title: 'About Us | The People Behind Greek Trip Planner',
    description: 'Meet the Greek locals behind Greek Trip Planner — real people with decades of on-the-ground expertise.',
    url: 'https://greektriplanner.me/about',
    siteName: 'Greek Trip Planner',
    type: 'website',
  },
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#FAF6F3]">
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="relative pt-16">
        <div className="relative h-[380px] sm:h-[440px] overflow-hidden">
          <Image src="/hero-acropolis.jpg" alt="Athens — where it all started" fill className="object-cover" priority quality={85} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#180204]/75 via-[#180204]/35 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-14 px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-4">
              <Heart className="w-4 h-4 text-[#FF5635]" />
              <span className="text-white/90 text-sm font-medium">Our Story</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl text-white mb-3">Five Greeks Who Know<br /><span className="text-[#FF5635]">Their Country by Heart</span></h1>
            <p className="text-white/70 text-lg max-w-2xl">Not a corporate team. Not travel bloggers who visited once. Five friends who were born here, work here, and want you to experience the Greece they know.</p>
          </div>
        </div>
      </section>

      {/* ===== THE STORY ===== */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="divider-accent mb-8" />
          <h2 className="text-3xl sm:text-4xl text-[#180204] mb-8">How This Started</h2>

          <div className="prose-custom space-y-6 text-[#180204]/70 text-lg leading-relaxed font-sans">
            <p>
              My name is Panos. I was born in Athens, studied engineering, and I&apos;ve always loved two things: solving problems and exploring Greece. Over the years, friends visiting from abroad would ask me for travel advice, and I&apos;d spend hours putting together itineraries for them &mdash; the places I&apos;d actually go, the tavernas where my family eats, the ferry routes that don&apos;t waste half your day.
            </p>
            <p>
              But something kept bothering me. I&apos;d go online and find Greece travel advice written by people who&apos;d spent a week or two here. Blog posts recommending &ldquo;the best Greek islands&rdquo; from writers who&apos;d visited three of them. Itineraries that had you ferry-hopping from the Ionians to the Cyclades as if that were a casual afternoon trip. Guides to Crete that only covered Heraklion. It wasn&apos;t bad information exactly &mdash; it was <em>incomplete</em> information, and that&apos;s worse, because you don&apos;t know what you&apos;re missing.
            </p>
            <p>
              I couldn&apos;t accept that the loudest voices about Greek travel belonged to people who barely knew the country. Greece has 133 destinations worth visiting &mdash; not just 5 islands and Athens. The Peloponnese alone could fill a two-week trip. Northern Greece is a different world entirely. And the small Cyclades? Most tourists have never heard of Koufonisia or Schinoussa, yet they&apos;re some of the most magical places in the Mediterranean.
            </p>
            <p>
              So I called up four friends &mdash; people who&apos;d spent their entire careers in Greek tourism, each an expert in a different part of the country &mdash; and proposed an idea: <em>What if we combined everything we know into something anyone can use?</em> Not a consulting business for a handful of clients, but a tool that gives every traveler the advice they&apos;d get if they happened to know a Greek local.
            </p>
            <p>
              They said yes immediately. They&apos;d been watching the same problem for years from the other side &mdash; tourists arriving with bad plans, unrealistic expectations, and zero knowledge of the region they were in. They were as frustrated as I was.
            </p>
            <p>
              Greek Trip Planner is the result. An AI-powered tool built on decades of real, first-hand Greek tourism expertise. Every recommendation traces back to someone who has actually been there &mdash; not once for a blog post, but hundreds of times for a living.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE TEAM ===== */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="divider-accent mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl text-[#180204] mb-4">The People Behind the Recommendations</h2>
            <p className="text-[#180204]/60 max-w-xl mx-auto">Five friends, five areas of expertise, one shared obsession: making sure you experience Greece the way it deserves.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Panos */}
            <div className="bg-[#FAF6F3] rounded-2xl p-7 border border-[#E6DAD1]/40 lg:col-span-1 sm:col-span-2">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 bg-[#FF5635]/10 rounded-full flex items-center justify-center text-2xl">🧑‍💻</div>
                <div>
                  <h3 className="text-lg text-[#180204] font-sans font-semibold">Panos</h3>
                  <p className="text-[#FF5635] text-sm font-medium">Founder &middot; Engineer &middot; Athens</p>
                </div>
              </div>
              <p className="text-[#180204]/55 text-sm leading-relaxed font-sans">
                Born and raised in Athens. An engineer by trade who can&apos;t stop solving problems. Built this platform because he was tired of seeing travelers get bad advice from people who barely know Greece. Coordinates the team, handles the tech, and writes about Athens and the Saronic islands. Probably planning his next trip to the Cyclades right now.
              </p>
            </div>

            {/* Vaggelis */}
            <div className="bg-[#FAF6F3] rounded-2xl p-7 border border-[#E6DAD1]/40">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 bg-[#FF5635]/10 rounded-full flex items-center justify-center text-2xl">🏛️</div>
                <div>
                  <h3 className="text-lg text-[#180204] font-sans font-semibold">Vaggelis</h3>
                  <p className="text-[#FF5635] text-sm font-medium">Tour Operator &middot; Peloponnese</p>
                </div>
              </div>
              <p className="text-[#180204]/55 text-sm leading-relaxed font-sans">
                Runs a tour operation across the Peloponnese and knows every corner of the region &mdash; from the ancient theaters of Epidaurus to the tower villages of Mani. If there&apos;s a hidden beach near Monemvasia or an olive oil producer in Kalamata worth visiting, Vaggelis has already sent a hundred guests there. His knowledge of the Peloponnese is encyclopedic.
              </p>
            </div>

            {/* Panagiotis */}
            <div className="bg-[#FAF6F3] rounded-2xl p-7 border border-[#E6DAD1]/40">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 bg-[#FF5635]/10 rounded-full flex items-center justify-center text-2xl">🚐</div>
                <div>
                  <h3 className="text-lg text-[#180204] font-sans font-semibold">Panagiotis</h3>
                  <p className="text-[#FF5635] text-sm font-medium">Transfer Business &middot; Athens, Mykonos, Santorini</p>
                </div>
              </div>
              <p className="text-[#180204]/55 text-sm leading-relaxed font-sans">
                Runs a transfer and logistics business across Athens, Mykonos, and Santorini. When you need to know the fastest way from the airport to Plaka, the best port to catch a ferry, or whether a particular Mykonos hotel is actually walkable from town &mdash; Panagiotis is the one who knows. Years of moving thousands of travelers have given him unmatched knowledge of Greece&apos;s most-visited triangle.
              </p>
            </div>

            {/* Kostas */}
            <div className="bg-[#FAF6F3] rounded-2xl p-7 border border-[#E6DAD1]/40">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 bg-[#FF5635]/10 rounded-full flex items-center justify-center text-2xl">🏨</div>
                <div>
                  <h3 className="text-lg text-[#180204] font-sans font-semibold">Kostas</h3>
                  <p className="text-[#FF5635] text-sm font-medium">Hotel Owner & Tour Operator &middot; Crete</p>
                </div>
              </div>
              <p className="text-[#180204]/55 text-sm leading-relaxed font-sans">
                Owns a hotel in Chania and runs tours across all of Crete. From the Samaria Gorge to Elafonissi Beach, from the backstreets of Rethymno to the quiet villages of Lasithi &mdash; Kostas has spent his life on the island. He&apos;s the reason our Crete recommendations go far beyond the usual &ldquo;visit Knossos and go to the beach&rdquo; advice. Crete is a country within a country, and Kostas knows every layer.
              </p>
            </div>

            {/* Tasos */}
            <div className="bg-[#FAF6F3] rounded-2xl p-7 border border-[#E6DAD1]/40">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 bg-[#FF5635]/10 rounded-full flex items-center justify-center text-2xl">⛰️</div>
                <div>
                  <h3 className="text-lg text-[#180204] font-sans font-semibold">Tasos</h3>
                  <p className="text-[#FF5635] text-sm font-medium">Hotel Supplier &middot; Thessaloniki, Central & Northern Greece</p>
                </div>
              </div>
              <p className="text-[#180204]/55 text-sm leading-relaxed font-sans">
                Based in Thessaloniki, Tasos supplies hotels across Central and Northern Greece. He knows which mountain guesthouse in Zagori has the best fireplace, which Pelion village is worth the winding drive, and where to eat in Thessaloniki like a local. His territory &mdash; Meteora, Halkidiki, Mount Olympus, the lake regions &mdash; is the Greece most tourists never see, and that&apos;s exactly what makes his knowledge so valuable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHAT WE ACTUALLY KNOW ===== */}
      <section className="py-16 md:py-24 bg-[#FAF6F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="divider-accent mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl text-[#180204] mb-4">What We Actually Know</h2>
            <p className="text-[#180204]/60 max-w-xl mx-auto">Not marketing claims &mdash; real expertise from people who live and work across Greece every day</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Ship, title: 'Island Logistics & Ferries', desc: 'Panagiotis moves travelers daily across the busiest routes. We know which ferries run late, which ports are chaotic in August, and how to build island sequences that don\'t waste your vacation on transit.' },
              { icon: Utensils, title: 'Where Greeks Actually Eat', desc: 'Our team eats at these places every week — not once for a review. When Kostas recommends a taverna in Chania or Tasos suggests a tsipouradiko in Volos, it\'s because they\'ve been eating there for years.' },
              { icon: MapPin, title: '133 Destinations, Personally Known', desc: 'Every destination in our database has been visited and vetted by at least one team member. From Agathonisi to Athens, from Zagori to Zakynthos — we write what we know.' },
              { icon: Clock, title: 'Realistic Timing & Pacing', desc: 'Vaggelis runs tours daily. He knows exactly how long a Mycenae visit takes, whether you can combine Nafplio and Epidaurus in one day, and how much buffer you need for the Greek concept of \"siga siga.\"' },
              { icon: Mountain, title: 'Mainland Beyond the Obvious', desc: 'Tasos covers the Greece most tourists miss — Zagori stone villages, Pelion\'s forest trails, Kastoria\'s lakefront, Prespa\'s wilderness. Some of our most powerful recommendations are off the typical tourist map.' },
              { icon: Compass, title: 'Every Season, Not Just Summer', desc: 'We work in Greek tourism year-round. Greece in October is different from Greece in August. Crete in winter, Athens in spring, Northern Greece in autumn — we know each season\'s personality.' },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-7 group border border-[#E6DAD1]/40">
                <div className="w-12 h-12 bg-[#FF5635]/10 rounded-xl flex items-center justify-center mb-5">
                  <item.icon className="w-6 h-6 text-[#FF5635]" />
                </div>
                <h3 className="text-lg text-[#180204] mb-2 font-sans font-semibold">{item.title}</h3>
                <p className="text-[#180204]/55 text-sm leading-relaxed font-sans">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== NUMBERS ===== */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '133', label: 'Destinations Covered', color: 'text-[#FF5635]' },
              { value: '5', label: 'Local Experts on the Team', color: 'text-[#2C73FF]' },
              { value: '50+', label: 'Years Combined Experience', color: 'text-[#FF5635]' },
              { value: '11', label: 'Regions of Greece', color: 'text-[#2C73FF]' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className={`text-3xl sm:text-4xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-[#180204]/50 text-sm mt-2 font-sans">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TRUST & TRANSPARENCY ===== */}
      <section className="py-16 md:py-24 bg-[#FAF6F3]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="divider-accent mb-8" />
          <h2 className="text-3xl sm:text-4xl text-[#180204] mb-8">How We Stay Honest</h2>

          <div className="space-y-6 text-[#180204]/70 text-lg leading-relaxed font-sans">
            <p>
              We work in Greek tourism. That gives us deep knowledge, but it also means we need to be upfront about how we operate.
            </p>
          </div>

          <div className="mt-10 space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-[#E6DAD1]/60">
              <h3 className="text-lg text-[#180204] font-sans font-semibold mb-2">No Paid Placements</h3>
              <p className="text-[#180204]/60 font-sans leading-relaxed">No hotel, restaurant, or tour operator pays to appear in our planner or guides. Recommendations come from personal experience. If a team member wouldn&apos;t send their own family there, it doesn&apos;t make the list.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-[#E6DAD1]/60">
              <h3 className="text-lg text-[#180204] font-sans font-semibold mb-2">Affiliate Links &mdash; Fully Disclosed</h3>
              <p className="text-[#180204]/60 font-sans leading-relaxed">Some links in our guides earn a small commission if you book through them &mdash; for accommodations, tours, and ferry tickets. This never influences what we recommend. We suggest the same places to our own friends and families. Full details in our <Link href="/editorial-policy" className="text-[#FF5635] hover:underline">editorial policy</Link>.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-[#E6DAD1]/60">
              <h3 className="text-lg text-[#180204] font-sans font-semibold mb-2">Written from Experience, Not Research</h3>
              <p className="text-[#180204]/60 font-sans leading-relaxed">Every guide starts from first-hand knowledge. We write what we&apos;ve seen, tasted, and navigated ourselves. When a popular island is overhyped, we say so. When a village nobody talks about is extraordinary, we share it &mdash; even if it means more crowds at our favorite spots.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-[#E6DAD1]/60">
              <h3 className="text-lg text-[#180204] font-sans font-semibold mb-2">Constantly Updated</h3>
              <p className="text-[#180204]/60 font-sans leading-relaxed">Greece changes. Restaurants close, ferries reroute, gems emerge. Because our team works in tourism actively, we catch these changes in real time &mdash; not during an annual review. If something is outdated, let us know.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHY FREE ===== */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="divider-accent mb-8" />
          <h2 className="text-3xl sm:text-4xl text-[#180204] mb-8">&ldquo;If It&apos;s Good, Why Is It Free?&rdquo;</h2>

          <div className="space-y-6 text-[#180204]/70 text-lg leading-relaxed font-sans">
            <p>
              Fair question. We get it a lot.
            </p>
            <p>
              Honestly, this started because all five of us were already doing it &mdash; answering WhatsApp messages from friends of friends, writing emails with itinerary advice, drawing routes on napkins at dinner. We just decided to put it all in one place and let anyone access it.
            </p>
            <p>
              The platform sustains itself through transparent affiliate partnerships with booking platforms. That means we never need to charge you, upsell you, or hide the best recommendations behind a paywall.
            </p>
            <p>
              And selfishly &mdash; when more people discover the real Greece, the kind of tourism we believe in grows. Travelers who visit Tinos instead of only Mykonos. Who drive through Mani instead of just flying to Santorini. Who eat at the village taverna instead of the port tourist trap. That&apos;s the Greece we love, and it benefits from more informed visitors.
            </p>
          </div>
        </div>
      </section>

      {/* ===== EDITORIAL LINK ===== */}
      <section className="py-12 bg-[#FAF6F3]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#180204]/60 font-sans mb-4">Curious about how we create content and handle commercial relationships?</p>
          <Link href="/editorial-policy" className="text-[#FF5635] font-semibold font-sans hover:underline inline-flex items-center gap-2">
            Read Our Editorial Policy & Disclosure <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0">
          <Image src="/Santorini_Sunset_View.jpg" alt="Greek islands sunset" fill className="object-cover" />
          <div className="absolute inset-0 bg-[#180204]/65" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl sm:text-5xl text-white mb-6">Let Five Greeks<br />Plan Your Trip</h2>
          <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">You&apos;re not just using an AI tool &mdash; you&apos;re tapping into decades of combined Greece expertise from people who live this every day.</p>
          <Link href="/ai-trip-planner" className="btn-accent px-10 py-4 rounded-full text-lg font-semibold inline-flex items-center gap-3">
            Start Planning Free <ArrowRight className="w-5 h-5" />
          </Link>
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
    </main>
  )
}
