'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, MapPin, Compass } from 'lucide-react'
import {
  heroDestinations,
  islandGroups,
  mainlandRegions,
  creteSubDestinations,
  hiddenGems,
} from './data'

// ─── NAV ─────────────────────────────────────────────────────────────────────

function Nav() {
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handler = () => {
      navRef.current?.classList.toggle('shadow-md', window.scrollY > 60)
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav
      ref={navRef}
      className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-[#E6DAD1] transition-shadow duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image src="/logo.png" alt="Greek Trip Planner" width={70} height={21} priority />
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link href="/how-it-works" className="text-[#180204]/70 hover:text-[#FF5635] transition-colors text-sm font-medium">
            How it Works
          </Link>
          <Link href="/destinations" className="text-[#180204] font-semibold text-sm transition-colors border-b-2 border-[#FF5635] pb-0.5">
            Destinations
          </Link>
          <Link href="/blog" className="text-[#180204]/70 hover:text-[#FF5635] transition-colors text-sm font-medium">
            Blog
          </Link>
          <Link href="/about" className="text-[#180204]/70 hover:text-[#FF5635] transition-colors text-sm font-medium">
            About
          </Link>
          <Link
            href="/ai-trip-planner"
            className="btn-accent px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2"
          >
            Start Planning <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <Link href="/ai-trip-planner" className="md:hidden btn-accent px-4 py-2 rounded-full text-sm font-semibold">
          Start Planning
        </Link>
      </div>
    </nav>
  )
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function Hero() {
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = () => {
      if (!bgRef.current) return
      const scrollY = window.scrollY
      const heroHeight = bgRef.current.parentElement?.offsetHeight ?? 0
      if (scrollY < heroHeight * 1.5) {
        bgRef.current.style.transform = `translateY(${scrollY * 0.4}px) translateZ(0)`
      }
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <section className="relative h-[92vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Parallax bg image */}
      <div ref={bgRef} className="absolute inset-0 will-change-transform">
        <Image
          src="/images/destinations/hero_section.jpg"
          alt="Santorini blue domes Greece"
          fill
          className="object-cover object-[center_30%]"
          priority
          quality={90}
        />
      </div>

      {/* Gradient overlay */}
      <div className="gradient-hero absolute inset-0" />

      {/* Grain texture */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '256px 256px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <div className="animate-fade-in inline-flex items-center gap-2 bg-white/12 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-7">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5635] inline-block" />
          <span className="text-white/85 text-sm font-medium">250+ destination guides</span>
        </div>

        <h1 className="animate-fade-in-up delay-100 text-[clamp(60px,9vw,96px)] text-white leading-[1.0] tracking-tight mb-5">
          Explore<br />
          <em className="text-[#FF5635] not-italic">Greece</em>
        </h1>

        <p className="animate-fade-in-up delay-200 text-lg text-white/60 max-w-md mx-auto mb-10 leading-relaxed font-light">
          From volcanic Santorini to the monasteries of Meteora — find your perfect Greek destination.
        </p>

        <div className="animate-fade-in-up delay-300 flex flex-wrap justify-center gap-2.5">
          {[
            { label: '⭐ Most Popular', href: '#popular' },
            { label: '🌊 Island Groups', href: '#islands' },
            { label: '🏛️ Mainland', href: '#mainland' },
            { label: '🏝️ Crete', href: '#crete' },
            { label: '💎 Hidden Gems', href: '#hidden' },
          ].map((tag) => (
            <a
              key={tag.label}
              href={tag.href}
              className="bg-white/10 hover:bg-[#FF5635]/30 border border-white/18 hover:border-[#FF5635]/50 text-white/78 hover:text-white rounded-full px-5 py-2 text-sm font-medium backdrop-blur-sm transition-all duration-200"
            >
              {tag.label}
            </a>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in delay-500">
        <span className="text-white/35 text-[10px] tracking-[3px] uppercase font-sans">Scroll</span>
        <div className="w-px h-10 bg-white/15 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-5 bg-white/55 animate-[scrollDown_1.8s_ease-in-out_infinite]" />
        </div>
      </div>
    </section>
  )
}

// ─── SCROLL REVEAL WRAPPER ────────────────────────────────────────────────────

function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
          observer.unobserve(el)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: 0,
        transform: 'translateY(28px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

// ─── MOST POPULAR ─────────────────────────────────────────────────────────────

function PopularSection() {
  const featured = heroDestinations[0]
  const rest = heroDestinations.slice(1)

  return (
    <section id="popular" className="section-padding bg-[#FAF6F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="divider-accent mb-3" />
          <h2 className="text-4xl sm:text-5xl text-[#180204] mb-2">Most Popular</h2>
          <p className="text-[#180204]/50 text-sm">Greece&apos;s most searched and loved destinations</p>
        </Reveal>

        {/* Asymmetric grid — featured tall + 2×2 */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {/* Featured — Santorini */}
          <Reveal delay={80} className="md:row-span-2">
            <Link
              href={`/blog/${featured.slug}-travel-guide`}
              className="group relative block rounded-2xl overflow-hidden card-hover h-full min-h-[360px] md:min-h-[620px]"
            >
              <Image
                src={featured.image}
                alt={featured.name}
                fill
                className="object-cover group-hover:scale-[1.05] transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#180204]/88 via-[#180204]/15 to-transparent group-hover:opacity-90 transition-opacity" />
              <div
                className="absolute top-4 left-4 text-white text-xs font-bold px-3 py-1 rounded-full"
                style={{ backgroundColor: featured.badgeColor }}
              >
                {featured.badge}
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-[34px] text-white mb-1">{featured.name}</h3>
                <p className="text-white/62 text-sm font-sans mb-3">{featured.tagline}</p>
                <span className="text-[#FF5635] text-xs font-semibold font-sans flex items-center gap-1.5 group-hover:gap-3 transition-all">
                  {featured.guides} guides <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          </Reveal>

          {/* 2×2 cards */}
          {rest.map((dest, i) => (
            <Reveal key={dest.slug} delay={100 + i * 60}>
              <Link
                href={`/blog/${dest.slug}-travel-guide`}
                className="group relative block rounded-2xl overflow-hidden card-hover aspect-[4/3]"
              >
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  className="object-cover group-hover:scale-[1.06] transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#180204]/85 via-[#180204]/15 to-transparent group-hover:opacity-90 transition-opacity" />
                <div
                  className="absolute top-3 left-3 text-white text-[11px] font-bold px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: dest.badgeColor }}
                >
                  {dest.badge}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-xl text-white mb-0.5">{dest.name}</h3>
                  <p className="text-white/60 text-xs font-sans">{dest.tagline}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── ISLAND GROUPS ────────────────────────────────────────────────────────────

function IslandGroupsSection() {
  return (
    <section id="islands" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-14">
          <div className="divider-accent mx-auto mb-3" />
          <h2 className="text-4xl sm:text-5xl text-[#180204] mb-2">Greek Islands by Group</h2>
          <p className="text-[#180204]/50 text-sm">6,000 islands — here&apos;s how to navigate them</p>
        </Reveal>

        <div className="space-y-14">
          {islandGroups.map((group) => (
            <Reveal key={group.name}>
              {/* Group header with image */}
              <div className="grid grid-cols-[200px_1fr] sm:grid-cols-[260px_1fr] gap-0 rounded-2xl overflow-hidden mb-4 h-[110px] sm:h-[120px] border border-[#E6DAD1]">
                <div className="relative overflow-hidden">
                  <Image
                    src={group.headerImage}
                    alt={group.name}
                    fill
                    className="object-cover hover:scale-[1.04] transition-transform duration-500"
                    sizes="260px"
                  />
                </div>
                <div className="flex items-center gap-4 bg-white px-6 py-4">
                  <span className="text-3xl leading-none flex-shrink-0">{group.icon}</span>
                  <div>
                    <h3 className="text-xl sm:text-2xl text-[#180204] mb-1">{group.name}</h3>
                    <p className="text-[#180204]/45 text-xs font-sans leading-relaxed">{group.description}</p>
                  </div>
                </div>
              </div>

              {/* Island pills */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
                {group.destinations.map((dest) => (
                  <Link
                    key={dest.slug}
                    href={`/blog/${dest.slug}-travel-guide`}
                    className="group bg-[#FAF6F3] hover:bg-[#180204] border border-[#E6DAD1] hover:border-[#180204] rounded-xl p-3 transition-all duration-200 card-hover"
                  >
                    <div
                      className="w-2 h-2 rounded-full mb-2"
                      style={{ backgroundColor: group.color }}
                    />
                    <p className="font-semibold text-[13px] text-[#180204] group-hover:text-white font-sans leading-tight transition-colors">
                      {dest.name}
                    </p>
                    <p className="text-[11px] text-[#180204]/40 group-hover:text-white/50 font-sans mt-0.5 leading-tight transition-colors">
                      {dest.vibe}
                    </p>
                  </Link>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── MAINLAND ─────────────────────────────────────────────────────────────────

function MainlandSection() {
  return (
    <section id="mainland" className="section-padding bg-[#FAF6F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="divider-accent mb-3" />
          <h2 className="text-4xl sm:text-5xl text-[#180204] mb-2">Mainland Greece</h2>
          <p className="text-[#180204]/50 text-sm">Ancient ruins, Byzantine cities, and mountain villages</p>
        </Reveal>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {mainlandRegions.map((region, i) => (
            <Reveal key={region.region} delay={i * 80}>
              <div className="bg-white border border-[#E6DAD1] rounded-2xl p-5 h-full card-hover transition-all">
                {/* Header */}
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[#E6DAD1]">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0"
                    style={{ backgroundColor: region.color }}
                  >
                    {region.icon}
                  </div>
                  <h3 className="text-sm font-bold text-[#180204] font-sans leading-tight">{region.region}</h3>
                </div>

                {/* Destinations */}
                <ul className="space-y-3">
                  {region.destinations.map((dest) => (
                    <li key={dest.slug}>
                      <Link
                        href={`/blog/${dest.slug}-travel-guide`}
                        className="group flex items-start gap-2"
                      >
                        <MapPin
                          className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 transition-colors"
                          style={{ color: region.color }}
                        />
                        <div>
                          <span className="block font-semibold text-[13px] text-[#180204] group-hover:text-[#FF5635] transition-colors font-sans leading-tight">
                            {dest.name}
                          </span>
                          <span className="block text-[11px] text-[#180204]/40 font-sans leading-tight">
                            {dest.desc}
                          </span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CRETE IN DEPTH ───────────────────────────────────────────────────────────

function CreteSection() {
  return (
    <section id="crete" className="section-padding bg-[#180204]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <Reveal>
            <div className="inline-flex items-center gap-2 bg-[#27AE60]/18 border border-[#27AE60]/30 rounded-full px-4 py-1.5 mb-6">
              <span className="text-[#27AE60] text-xs font-bold font-sans tracking-wide">🏝️ Largest Greek Island</span>
            </div>
            <h2 className="text-[clamp(38px,5vw,60px)] text-white leading-[1.05] mb-5">
              Crete<br />
              <em className="text-[#FF5635] not-italic">in depth</em>
            </h2>
            <p className="text-white/48 font-sans text-sm leading-[1.85] mb-8 font-light">
              Crete deserves its own chapter. With 14 dedicated destination guides covering every corner of the island — from Chania&apos;s Venetian harbour to the pink sands of Elafonissi — it&apos;s Greece&apos;s most comprehensive travel destination.
            </p>

            {/* Sub-destinations grid */}
            <div className="grid grid-cols-2 gap-2 mb-9">
              {creteSubDestinations.map((dest) => (
                <Link
                  key={dest.slug}
                  href={`/blog/${dest.slug}-travel-guide`}
                  className="group flex items-center gap-2 bg-white/[0.05] hover:bg-white/[0.10] border border-white/10 hover:border-[#27AE60]/40 rounded-xl px-3.5 py-2.5 transition-all"
                >
                  <svg
                    className="w-3.5 h-3.5 text-[#27AE60] group-hover:translate-x-0.5 transition-transform flex-shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                  <span className="text-white/65 group-hover:text-white text-sm font-sans transition-colors">
                    {dest.name}
                  </span>
                </Link>
              ))}
            </div>

            <Link
              href="/blog/crete-travel-guide"
              className="btn-accent inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm font-sans"
            >
              Explore All of Crete <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>

          {/* Image */}
          <Reveal delay={150} className="relative">
            <div className="relative rounded-3xl overflow-hidden">
              <div className="aspect-[4/5] relative">
                <Image
                  src="/images/destinations/crete_section.jpg"
                  alt="Crete, Greece"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#180204]/65 to-transparent" />
              </div>

              {/* Stats overlay */}
              <div className="absolute bottom-5 left-4 right-4 bg-white/[0.08] backdrop-blur-md border border-white/14 rounded-2xl p-4 grid grid-cols-3 text-center">
                {[
                  { num: '14', label: 'Guides' },
                  { num: '8', label: 'Beach spots' },
                  { num: '3,500+', label: 'km² to explore' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-[26px] text-white font-serif">{stat.num}</div>
                    <div className="text-white/42 text-[11px] font-sans mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

// ─── HIDDEN GEMS ──────────────────────────────────────────────────────────────

function HiddenGemsSection() {
  return (
    <section id="hidden" className="section-padding bg-[#FAF6F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="divider-accent mb-3" />
          <h2 className="text-4xl sm:text-5xl text-[#180204] mb-2">Hidden Gems 💎</h2>
          <p className="text-[#180204]/50 text-sm">The islands the crowds haven&apos;t discovered yet</p>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {hiddenGems.map((gem, i) => (
            <Reveal key={gem.slug} delay={i * 55}>
              <Link
                href={`/blog/${gem.slug}-travel-guide`}
                className="group relative block rounded-2xl overflow-hidden card-hover aspect-[4/3]"
              >
                <Image
                  src={gem.image}
                  alt={gem.name}
                  fill
                  className="object-cover group-hover:scale-[1.08] transition-transform duration-600"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#180204]/85 via-[#180204]/10 to-transparent" />
                <div className="absolute top-3 left-3 bg-[#FF5635]/85 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full font-sans tracking-wide">
                  Hidden Gem
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-[18px] text-white mb-1">{gem.name}</h3>
                  <p className="text-white/58 text-[11px] font-sans leading-snug">{gem.why}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CTA ──────────────────────────────────────────────────────────────────────

function CtaSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 pb-28">
      <Reveal>
        <div className="max-w-4xl mx-auto bg-[#180204] rounded-[2rem] p-14 md:p-20 text-center relative overflow-hidden">
          {/* Dot texture */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: 'radial-gradient(#FF5635 1.5px, transparent 1.5px)',
              backgroundSize: '26px 26px',
            }}
          />
          <div className="relative z-10">
            <div className="text-5xl mb-5">🗺️</div>
            <h2 className="text-[clamp(28px,4vw,44px)] text-white mb-4">Not sure where to go?</h2>
            <p className="text-white/48 font-sans text-sm leading-[1.8] max-w-md mx-auto mb-9 font-light">
              Tell our AI your travel style, budget, and dates — it&apos;ll recommend the perfect destinations
              and build your itinerary in minutes.
            </p>
            <Link
              href="/ai-trip-planner"
              className="btn-accent inline-flex items-center gap-2 px-9 py-4 rounded-full font-semibold text-[15px] font-sans"
            >
              Find My Perfect Destination <Compass className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

// ─── ROOT CLIENT COMPONENT ────────────────────────────────────────────────────

export default function DestinationsClient() {
  return (
    <main className="min-h-screen bg-[#FAF6F3]">
      <Nav />
      <Hero />
      <PopularSection />
      <IslandGroupsSection />
      <MainlandSection />
      <CreteSection />
      <HiddenGemsSection />
      <CtaSection />

      {/* Footer — matches homepage */}
      <footer className="bg-[#180204] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            <Image
              src="/logo.png"
              alt="Greek Trip Planner"
              width={70}
              height={21}
              className="brightness-0 invert mb-6"
            />
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <Link href="/how-it-works" className="text-white/60 hover:text-[#FF5635] transition-colors text-sm font-sans">How it Works</Link>
              <Link href="/destinations" className="text-white/60 hover:text-[#FF5635] transition-colors text-sm font-sans">Destinations</Link>
              <Link href="/blog" className="text-white/60 hover:text-[#FF5635] transition-colors text-sm font-sans">Blog</Link>
              <Link href="/about" className="text-white/60 hover:text-[#FF5635] transition-colors text-sm font-sans">About</Link>
            </div>
            <div className="border-t border-white/10 w-full pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-white/40 text-sm font-sans">© 2026 Greek Trip Planner. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
