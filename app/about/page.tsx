import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, MapPin, Compass, Heart, Ship, Utensils, Clock, Mountain, Mail } from 'lucide-react'

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

      {/* ===== HERO ===== */}
      <section className="relative pt-16">
        <div className="relative h-[340px] sm:h-[400px] overflow-hidden">
          <Image src="/hero-acropolis.jpg" alt="Athens — where it all started" fill className="object-cover" priority quality={85} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#180204]/75 via-[#180204]/35 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-4">
              <Heart className="w-4 h-4 text-[#FF5635]" />
              <span className="text-white/90 text-sm font-medium">Our Story</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl text-white mb-3">
              Five Greeks Who Know<br /><span className="text-[#FF5635]">Their Country by Heart</span>
            </h1>
            <p className="text-white/70 text-lg max-w-2xl">
              Not a corporate team. Not travel bloggers who visited once. Five friends who were born here, work here, and want you to experience the Greece they know.
            </p>
          </div>
        </div>
      </section>

      {/* ===== MISSION STRIP ===== */}
      <section className="bg-white border-b border-[#E6DAD1]/60 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-[#180204]/70 text-base font-sans leading-relaxed">
            Greek Trip Planner is dedicated to <strong>honest, first-hand travel advice</strong> about Greece — written by people who actually live and work here. Our mission: give every traveler the inside knowledge they&apos;d get if they happened to know a Greek local.
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mt-6 text-sm font-sans text-[#180204]/60">
            <span>✅ Guides based on real, repeated visits</span>
            <span>✅ No AI-generated content</span>
            <span>✅ Transparent about how we make money</span>
            <span>✅ Updated by people still working in tourism</span>
          </div>
          <div className="text-center mt-5">
            <Link href="/editorial-policy" className="text-[#FF5635] text-sm font-semibold font-sans hover:underline inline-flex items-center gap-1.5">
              Read our editorial principles <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FOUNDER STORY — 2-column layout ===== */}
      <section className="py-16 md:py-24 bg-[#FAF6F3]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            {/* LEFT — story */}
            <div className="flex flex-col justify-start">
              <div className="divider-accent mb-6" />
              <h2 className="text-3xl sm:text-4xl text-[#180204] mb-8">Founder story: about Panos</h2>

              <div className="space-y-5 text-[#180204]/70 text-[1.05rem] leading-relaxed font-sans">
                <p>
                  Hi! My name is <strong className="text-[#180204]">Panos</strong>. I was born in Athens, studied engineering, and I&apos;ve always loved two things: solving problems and exploring Greece.
                </p>
                <p>
                  Over the years, friends visiting from abroad would ask me for travel advice, and I&apos;d spend hours putting together itineraries for them — the places I&apos;d actually go, the tavernas where my family eats, the ferry routes that don&apos;t waste half your day.
                </p>
                <p>
                  But something kept bothering me. I&apos;d go online and find Greece travel advice written by people who&apos;d spent a week or two here. Blog posts recommending &ldquo;the best Greek islands&rdquo; from writers who&apos;d visited three of them. Itineraries that had you ferry-hopping from the Ionians to the Cyclades as if that were a casual afternoon trip. It wasn&apos;t bad information exactly — it was <em>incomplete</em> information, and that&apos;s worse, because you don&apos;t know what you&apos;re missing.
                </p>
                <p>
                  So I called up four friends — people who&apos;d spent their entire careers in Greek tourism, each an expert in a different part of the country — and proposed an idea: <em>What if we combined everything we know into something anyone can use?</em>
                </p>
                <p>
                  They said yes immediately. They&apos;d been watching the same problem for years from the other side — tourists arriving with bad plans and unrealistic expectations. They were as frustrated as I was.
                </p>
                <p>
                  Greek Trip Planner is the result. An AI-powered tool built on decades of real, first-hand expertise. Every recommendation traces back to someone who has actually been there — not once for a blog post, but hundreds of times for a living.
                </p>
                <p className="pt-2 font-medium text-[#180204]/80">
                  Happy travels,<br />
                  <span className="text-[#FF5635] text-lg">— Panos</span>
                </p>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4 mt-10 pt-8 border-t border-[#E6DAD1]/60">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#FF5635]">133</div>
                  <div className="text-xs text-[#180204]/45 font-sans mt-1">Destinations</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#FF5635]">50+</div>
                  <div className="text-xs text-[#180204]/45 font-sans mt-1">Years combined exp.</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#FF5635]">11</div>
                  <div className="text-xs text-[#180204]/45 font-sans mt-1">Regions of Greece</div>
                </div>
              </div>
            </div>

            {/* RIGHT — large photo + caption below */}
            <div>
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-xl ring-1 ring-[#E6DAD1]/60">
                <Image
                  src="/team/panos1.jpg"
                  alt="Panos, founder of Greek Trip Planner, with the Acropolis of Athens behind him"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-top"
                  priority
                />
              </div>
              {/* Caption below the photo */}
              <div className="mt-4 flex items-center gap-3 px-1">
                <div className="relative w-9 h-9 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-[#FF5635]/20">
                  <Image src="/team/panos.jpg" alt="Panos avatar" fill sizes="36px" className="object-cover" />
                </div>
                <div>
                  <p className="text-sm font-semibold font-sans text-[#180204]">Panos</p>
                  <p className="text-xs text-[#180204]/45 font-sans">Founder · Athens, Greece 🇬🇷</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===== THE TEAM ===== */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="divider-accent mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl text-[#180204] mb-4">The People Behind the Recommendations</h2>
            <p className="text-[#180204]/60 max-w-xl mx-auto font-sans">
              Five friends, five areas of expertise, one shared obsession: making sure you experience Greece the way it deserves.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[#FAF6F3] rounded-2xl p-7 border border-[#E6DAD1]/40 lg:col-span-1 sm:col-span-2">
              <div className="flex items-center gap-4 mb-5">
                <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-[#FF5635]/15">
                  <Image src="/team/panos.jpg" alt="Panos, founder of Greek Trip Planner" fill sizes="56px" className="object-cover" />
                </div>
                <div>
                  <h3 className="text-lg text-[#180204] font-sans font-semibold">Panos</h3>
                  <p className="text-[#FF5635] text-sm font-medium">Founder &middot; Engineer &middot; Athens</p>
                </div>
              </div>
              <p className="text-[#180204]/55 text-sm leading-relaxed font-sans">
                Born and raised in Athens. An engineer by trade who can&apos;t stop solving problems. Built this platform because he was tired of seeing travelers get bad advice from people who barely know Greece. Coordinates the team, handles the tech, and writes about Athens and the Saronic islands. Probably planning his next trip to the Cyclades right now.
              </p>
            </div>

            <div className="bg-[#FAF6F3] rounded-2xl p-7 border border-[#E6DAD1]/40">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 bg-[#FF5635]/10 rounded-full flex items-center justify-center text-2xl">🏛️</div>
                <div>
                  <h3 className="text-lg text-[#180204] font-sans font-semibold">Vaggelis</h3>
                  <p className="text-[#FF5635] text-sm font-medium">Tour Operator &middot; Peloponnese</p>
                </div>
              </div>
              <p className="text-[#180204]/55 text-sm leading-relaxed font-sans">
                Runs a tour operation across the Peloponnese and knows every corner of the region — from the ancient theaters of Epidaurus to the tower villages of Mani. If there&apos;s a hidden beach near Monemvasia or an olive oil producer in Kalamata worth visiting, Vaggelis has already sent a hundred guests there.
              </p>
            </div>

            <div className="bg-[#FAF6F3] rounded-2xl p-7 border border-[#E6DAD1]/40">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 bg-[#FF5635]/10 rounded-full flex items-center justify-center text-2xl">🚐</div>
                <div>
                  <h3 className="text-lg text-[#180204] font-sans font-semibold">Panagiotis</h3>
                  <p className="text-[#FF5635] text-sm font-medium">Transfer Business &middot; Athens, Mykonos, Santorini</p>
                </div>
              </div>
              <p className="text-[#180204]/55 text-sm leading-relaxed font-sans">
                Runs a transfer and logistics business across Athens, Mykonos, and Santorini. When you need to know the fastest way from the airport to Plaka, the best port to catch a ferry, or whether a particular Mykonos hotel is actually walkable from town — Panagiotis is the one who knows.
              </p>
            </div>

            <div className="bg-[#FAF6F3] rounded-2xl p-7 border border-[#E6DAD1]/40">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 bg-[#FF5635]/10 rounded-full flex items-center justify-center text-2xl">🏨</div>
                <div>
                  <h3 className="text-lg text-[#180204] font-sans font-semibold">Kostas</h3>
                  <p className="text-[#FF5635] text-sm font-medium">Hotel Owner & Tour Operator &middot; Crete</p>
                </div>
              </div>
              <p className="text-[#180204]/55 text-sm leading-relaxed font-sans">
                Owns a hotel in Chania and runs tours across all of Crete. From the Samaria Gorge to Elafonissi Beach, from the backstreets of Rethymno to the quiet villages of Lasithi — Kostas has spent his life on the island. Crete is a country within a country, and Kostas knows every layer.
              </p>
            </div>

            <div className="bg-[#FAF6F3] rounded-2xl p-7 border border-[#E6DAD1]/40">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 bg-[#FF5635]/10 rounded-full flex items-center justify-center text-2xl">⛰️</div>
                <div>
                  <h3 className="text-lg text-[#180204] font-sans font-semibold">Tasos</h3>
                  <p className="text-[#FF5635] text-sm font-medium">Hotel Supplier &middot; Thessaloniki, Central & Northern Greece</p>
                </div>
              </div>
              <p className="text-[#180204]/55 text-sm leading-relaxed font-sans">
                Based in Thessaloniki, Tasos supplies hotels across Central and Northern Greece. He knows which mountain guesthouse in Zagori has the best fireplace, which Pelion village is worth the winding drive, and where to eat in Thessaloniki like a local.
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
            <p className="text-[#180204]/60 max-w-xl mx-auto font-sans">Not marketing claims — real expertise from people who live and work across Greece every day</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-7 border border-[#E6DAD1]/40">
              <div className="w-12 h-12 bg-[#FF5635]/10 rounded-xl flex items-center justify-center mb-5"><Ship className="w-6 h-6 text-[#FF5635]" /></div>
              <h3 className="text-lg text-[#180204] mb-2 font-sans font-semibold">Island Logistics & Ferries</h3>
              <p className="text-[#180204]/55 text-sm leading-relaxed font-sans">Panagiotis moves travelers daily across the busiest routes. We know which ferries run late, which ports are chaotic in August, and how to build island sequences that don&apos;t waste your vacation on transit.</p>
            </div>
            <div className="bg-white rounded-2xl p-7 border border-[#E6DAD1]/40">
              <div className="w-12 h-12 bg-[#FF5635]/10 rounded-xl flex items-center justify-center mb-5"><Utensils className="w-6 h-6 text-[#FF5635]" /></div>
              <h3 className="text-lg text-[#180204] mb-2 font-sans font-semibold">Where Greeks Actually Eat</h3>
              <p className="text-[#180204]/55 text-sm leading-relaxed font-sans">Our team eats at these places every week — not once for a review. When Kostas recommends a taverna in Chania or Tasos suggests a tsipouradiko in Volos, it&apos;s because they&apos;ve been eating there for years.</p>
            </div>
            <div className="bg-white rounded-2xl p-7 border border-[#E6DAD1]/40">
              <div className="w-12 h-12 bg-[#FF5635]/10 rounded-xl flex items-center justify-center mb-5"><MapPin className="w-6 h-6 text-[#FF5635]" /></div>
              <h3 className="text-lg text-[#180204] mb-2 font-sans font-semibold">133 Destinations, Personally Known</h3>
              <p className="text-[#180204]/55 text-sm leading-relaxed font-sans">Every destination in our database has been visited and vetted by at least one team member. From Agathonisi to Athens, from Zagori to Zakynthos — we write what we know.</p>
            </div>
            <div className="bg-white rounded-2xl p-7 border border-[#E6DAD1]/40">
              <div className="w-12 h-12 bg-[#FF5635]/10 rounded-xl flex items-center justify-center mb-5"><Clock className="w-6 h-6 text-[#FF5635]" /></div>
              <h3 className="text-lg text-[#180204] mb-2 font-sans font-semibold">Realistic Timing & Pacing</h3>
              <p className="text-[#180204]/55 text-sm leading-relaxed font-sans">Vaggelis runs tours daily. He knows exactly how long a Mycenae visit takes, whether you can combine Nafplio and Epidaurus in one day, and how much buffer you need for the Greek concept of &ldquo;siga siga.&rdquo;</p>
            </div>
            <div className="bg-white rounded-2xl p-7 border border-[#E6DAD1]/40">
              <div className="w-12 h-12 bg-[#FF5635]/10 rounded-xl flex items-center justify-center mb-5"><Mountain className="w-6 h-6 text-[#FF5635]" /></div>
              <h3 className="text-lg text-[#180204] mb-2 font-sans font-semibold">Mainland Beyond the Obvious</h3>
              <p className="text-[#180204]/55 text-sm leading-relaxed font-sans">Tasos covers the Greece most tourists miss — Zagori stone villages, Pelion&apos;s forest trails, Kastoria&apos;s lakefront, Prespa&apos;s wilderness. Some of our most powerful recommendations are off the typical tourist map.</p>
            </div>
            <div className="bg-white rounded-2xl p-7 border border-[#E6DAD1]/40">
              <div className="w-12 h-12 bg-[#FF5635]/10 rounded-xl flex items-center justify-center mb-5"><Compass className="w-6 h-6 text-[#FF5635]" /></div>
              <h3 className="text-lg text-[#180204] mb-2 font-sans font-semibold">Every Season, Not Just Summer</h3>
              <p className="text-[#180204]/55 text-sm leading-relaxed font-sans">We work in Greek tourism year-round. Greece in October is different from Greece in August. Crete in winter, Athens in spring, Northern Greece in autumn — we know each season&apos;s personality.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== COMMON QUESTIONS ===== */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="divider-accent mb-8" />
          <h2 className="text-3xl sm:text-4xl text-[#180204] mb-4">Questions People Ask Us</h2>
          <p className="text-[#180204]/55 font-sans mb-10">Here are the ones that come up most — answered honestly.</p>
          <div className="space-y-8">
            <div className="border-b border-[#E6DAD1]/60 pb-8">
              <h3 className="text-lg font-sans font-semibold text-[#180204] mb-3">How many Greek islands have you actually visited?</h3>
              <p className="text-[#180204]/65 font-sans leading-relaxed">Between the five of us: all of the inhabited ones worth visiting, and many that are barely on the map. Panos alone has been to over 40 islands across the Cyclades, Dodecanese, and Saronic gulf. We&apos;re not much for counting — what matters is that when we write about a destination, at least one of us knows it well enough to have an opinion that goes beyond a Google search.</p>
            </div>
            <div className="border-b border-[#E6DAD1]/60 pb-8">
              <h3 className="text-lg font-sans font-semibold text-[#180204] mb-3">Why did you build an AI tool instead of a regular travel blog?</h3>
              <p className="text-[#180204]/65 font-sans leading-relaxed">A blog gives you our best guess at what a typical traveler needs. An AI tool lets us have a real conversation with you about your specific trip — your timeline, your travel style, whether you have kids, whether you care more about history or beaches or food. The knowledge is the same; the AI just makes it personal. We wanted every traveler to feel like they were texting a Greek friend for advice, not reading a generic listicle.</p>
            </div>
            <div className="border-b border-[#E6DAD1]/60 pb-8">
              <h3 className="text-lg font-sans font-semibold text-[#180204] mb-3">Can you help me plan my trip personally?</h3>
              <p className="text-[#180204]/65 font-sans leading-relaxed">Our AI trip planner handles most requests really well — it&apos;s built on everything we know, and it&apos;s free to use. If you have a very specific or complex situation (multi-week itinerary, accessibility needs, unusual combination of regions), feel free to reach out via the contact form. We do read every message, though we can&apos;t always respond to every one in detail.</p>
            </div>
            <div className="border-b border-[#E6DAD1]/60 pb-8">
              <h3 className="text-lg font-sans font-semibold text-[#180204] mb-3">What&apos;s your take on overtourism in Greece?</h3>
              <p className="text-[#180204]/65 font-sans leading-relaxed">It&apos;s a real issue, and we think about it. Some places — Santorini in August, Mykonos Old Town at peak hours — have been genuinely diminished by crowds. That&apos;s part of why we push hard for less-visited destinations: places like Sifnos, Folegandros, the Mani, or the Zagori villages give you a better experience and spread tourism more equitably. When we have a choice between two good recommendations, we lean toward the one that doesn&apos;t already have a queue.</p>
            </div>
            <div className="border-b border-[#E6DAD1]/60 pb-8">
              <h3 className="text-lg font-sans font-semibold text-[#180204] mb-3">What&apos;s the best time of year to visit Greece?</h3>
              <p className="text-[#180204]/65 font-sans leading-relaxed">Honestly? May–June and September–October. You get the weather without the August crowds and inflated prices. Athens is wonderful year-round. The islands peak in July–August but become a different, calmer experience after mid-September — and the sea is still warm. Crete is excellent from April through November. The real answer depends on where you&apos;re going — ask our planner for a destination-specific answer.</p>
            </div>
            <div>
              <h3 className="text-lg font-sans font-semibold text-[#180204] mb-3">Can you really make a living from a travel site?</h3>
              <p className="text-[#180204]/65 font-sans leading-relaxed">For us, the platform is a complement to careers we already have in tourism — not a replacement. That actually makes us more honest: we don&apos;t need to chase traffic with sensational content or recommend things we don&apos;t believe in just to hit an affiliate quota. The site sustains itself through transparent affiliate commissions and a small number of featured partner placements. It&apos;s a slow build — but built on something real.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TRUST & TRANSPARENCY ===== */}
      <section className="py-16 md:py-24 bg-[#FAF6F3]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="divider-accent mb-8" />
          <h2 className="text-3xl sm:text-4xl text-[#180204] mb-8">How We Stay Honest</h2>
          <p className="text-[#180204]/70 text-lg leading-relaxed font-sans mb-10">
            We work in Greek tourism. That gives us deep knowledge, but it also means we need to be upfront about how we operate.
          </p>
          <div className="space-y-5">
            <div className="bg-white rounded-2xl p-6 border border-[#E6DAD1]/60">
              <h3 className="text-[#180204] font-sans font-semibold mb-2">Editor&apos;s Picks Are Never for Sale</h3>
              <p className="text-[#180204]/60 font-sans leading-relaxed text-sm">Our top recommendations — the ones marked with a star — come from personal visits by our team. No restaurant, hotel, or operator can pay to become an Editor&apos;s Pick. If a team member wouldn&apos;t send their own family there, it doesn&apos;t get the star.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-[#E6DAD1]/60">
              <h3 className="text-[#180204] font-sans font-semibold mb-2">Featured Partners Are Clearly Labeled</h3>
              <p className="text-[#180204]/60 font-sans leading-relaxed text-sm">Some restaurants, hotels, and operators appear as Featured Partners. They pay for their placement, but the relationship is shown openly — clear labels, separate sections, never mixed in with our editorial picks. Full details on the <Link href="/partners" className="text-[#FF5635] hover:underline">Featured Partner program</Link>.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-[#E6DAD1]/60">
              <h3 className="text-[#180204] font-sans font-semibold mb-2">Affiliate Links — Fully Disclosed</h3>
              <p className="text-[#180204]/60 font-sans leading-relaxed text-sm">Some links in our guides earn a small commission if you book through them — for accommodations, tours, ferries, car rental, and travel essentials. This never influences what we recommend. Full details in our <Link href="/editorial-policy" className="text-[#FF5635] hover:underline">editorial policy</Link>.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-[#E6DAD1]/60">
              <h3 className="text-[#180204] font-sans font-semibold mb-2">Written from Experience, Not Research</h3>
              <p className="text-[#180204]/60 font-sans leading-relaxed text-sm">Every guide starts from first-hand knowledge. We write what we&apos;ve seen, tasted, and navigated ourselves. When a popular island is overhyped, we say so. When a village nobody talks about is extraordinary, we share it.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-[#E6DAD1]/60">
              <h3 className="text-[#180204] font-sans font-semibold mb-2">Constantly Updated</h3>
              <p className="text-[#180204]/60 font-sans leading-relaxed text-sm">Greece changes. Restaurants close, ferries reroute, gems emerge. Because our team works in tourism actively, we catch these changes in real time — not during an annual review. If something is outdated, let us know.</p>
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
            <p>Fair question. We get it a lot.</p>
            <p>Honestly, this started because all five of us were already doing it — answering WhatsApp messages from friends of friends, writing emails with itinerary advice, drawing routes on napkins at dinner. We just decided to put it all in one place and let anyone access it.</p>
            <p>The platform sustains itself two ways: transparent affiliate partnerships with booking platforms (small commissions when you book through our links), and a small number of clearly labeled Featured Partner placements from restaurants, hotels, and operators we&apos;re willing to recommend. Both revenue streams are visible to you, and neither lets anyone buy their way into our editorial Picks.</p>
            <p>And selfishly — when more people discover the real Greece, the kind of tourism we believe in grows. Travelers who visit Tinos instead of only Mykonos. Who drive through Mani instead of just flying to Santorini. Who eat at the village taverna instead of the port tourist trap. That&apos;s the Greece we love, and it benefits from more informed visitors.</p>
          </div>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section className="py-16 md:py-20 bg-[#FAF6F3]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="divider-accent mb-8" />
          <h2 className="text-3xl sm:text-4xl text-[#180204] mb-6">Say Hello</h2>
          <p className="text-[#180204]/65 font-sans text-lg leading-relaxed mb-8">
            We genuinely love hearing from travelers — whether it&apos;s a question about your trip, feedback on something we got wrong, or just to say your trip went well. We read everything, even if we can&apos;t always respond in detail.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-[#FF5635] text-white px-7 py-3.5 rounded-full font-semibold font-sans hover:bg-[#e04a2a] transition-colors">
              <Mail className="w-4 h-4" /> Send us a message
            </Link>
            <Link href="/editorial-policy" className="inline-flex items-center justify-center gap-2 border border-[#E6DAD1] text-[#180204]/70 px-7 py-3.5 rounded-full font-semibold font-sans hover:border-[#FF5635] hover:text-[#FF5635] transition-colors">
              <ArrowRight className="w-4 h-4" /> Read our editorial policy
            </Link>
          </div>
          <p className="text-[#180204]/40 font-sans text-sm mt-8">
            For commercial or partnership inquiries, see our <Link href="/partners" className="text-[#FF5635] hover:underline">Featured Partner program</Link>.
          </p>
        </div>
      </section>

      {/* ===== EDITORIAL LINK ===== */}
      <section className="py-12 bg-white border-t border-[#E6DAD1]/60">
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
          <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
            You&apos;re not just using an AI tool — you&apos;re tapping into decades of combined Greece expertise from people who live this every day.
          </p>
          <Link href="/ai-trip-planner" className="btn-accent px-10 py-4 rounded-full text-lg font-semibold inline-flex items-center gap-3">
            Start Planning Free <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

    </main>
  )
}
