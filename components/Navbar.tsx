'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight, X, Compass, BookOpen, BarChart3, Users, Sparkles, ChevronDown, MapPin, Map, Mail } from 'lucide-react'

const topDestinations = [
  { name: 'Athens',    slug: 'athens',    emoji: '🏛️', desc: 'History & culture' },
  { name: 'Santorini', slug: 'santorini', emoji: '🌅', desc: 'Iconic caldera views' },
  { name: 'Mykonos',   slug: 'mykonos',   emoji: '🎉', desc: 'Glamour & nightlife' },
  { name: 'Crete',     slug: 'crete',     emoji: '🏔️', desc: 'Beaches & gorges' },
  { name: 'Rhodes',    slug: 'rhodes',    emoji: '🏰', desc: 'Medieval old town' },
]

const navLinks = [
  { href: '/how-it-works', label: 'How it Works', icon: Compass,     desc: 'See how our AI builds your itinerary' },
  { href: '/destinations', label: 'Destinations', icon: Map,         desc: '133 destinations across Greece' },
  { href: '/blog',         label: 'Blog',         icon: BookOpen,    desc: '133 destination guides by local experts' },
  { href: '/insights',     label: 'Insights',     icon: BarChart3,   desc: 'Greece tourism data & analysis' },
  { href: '/about',        label: 'About',        icon: Users,       desc: 'Meet the 5 Greeks behind the planner' },
  { href: '/contact',      label: 'Contact',      icon: Mail,        desc: 'Get in touch with Panos' },
]

// ─── DESTINATIONS DROPDOWN (desktop only) ────────────────────────────────────

function DestinationsDropdown({ isActive }: { isActive: boolean }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleMouseEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpen(true)
  }
  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 150)
  }

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger button */}
      <Link
        href="/destinations"
        onClick={() => setOpen(false)}
        className={`flex items-center gap-1 text-sm font-medium transition-colors ${
          isActive ? 'text-[#FF5635]' : 'text-[#180204]/70 hover:text-[#FF5635]'
        }`}
      >
        Destinations
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </Link>

      {/* Active underline — matches other nav items */}
      {isActive && (
        <span className="absolute -bottom-[21px] left-0 right-0 h-[2px] bg-[#FF5635] rounded-full" />
      )}

      {/* Dropdown panel */}
      <div
        className={`absolute top-[calc(100%+20px)] left-1/2 -translate-x-1/2 w-64
          bg-white border border-[#E6DAD1] rounded-2xl shadow-xl shadow-[#180204]/10
          overflow-hidden z-50 origin-top transition-all duration-200
          ${open
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 scale-95 -translate-y-1 pointer-events-none'
          }`}
      >
        {/* Arrow pointer */}
        <div className="absolute -top-[6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-l border-t border-[#E6DAD1] rotate-45" />

        {/* Top destinations */}
        <div className="p-2">
          <p className="text-[10px] font-bold text-[#180204]/35 uppercase tracking-widest px-3 pt-2 pb-1.5 font-sans">
            Top Destinations
          </p>
          {topDestinations.map((dest) => (
            <Link
              key={dest.slug}
              href={`/blog/${dest.slug}-travel-guide`}
              onClick={() => setOpen(false)}
              className="group flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#FAF6F3] transition-colors"
            >
              <span className="text-lg leading-none w-7 text-center flex-shrink-0">
                {dest.emoji}
              </span>
              <div className="min-w-0">
                <span className="block text-sm font-semibold text-[#180204] group-hover:text-[#FF5635] transition-colors font-sans leading-tight">
                  {dest.name}
                </span>
                <span className="block text-[11px] text-[#180204]/40 font-sans">
                  {dest.desc}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Divider */}
        <div className="mx-4 border-t border-[#E6DAD1]" />

        {/* View all */}
        <div className="p-2 pt-1.5">
          <Link
            href="/destinations"
            onClick={() => setOpen(false)}
            className="group flex items-center justify-between px-3 py-2.5 rounded-xl bg-[#180204] hover:bg-[#FF5635] transition-colors duration-200"
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-white/60 group-hover:text-white transition-colors" />
              <span className="text-sm font-semibold text-white font-sans">
                View All Destinations
              </span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-white/40 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
          </Link>
        </div>
      </div>
    </div>
  )
}

// ─── MAIN NAVBAR ─────────────────────────────────────────────────────────────

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Close on escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Close on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const isActive = useCallback((href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }, [pathname])

  return (
    <>
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-50 border-b border-[#E6DAD1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center relative z-[60]">
            <Image src="/logo.png" alt="Greek Trip Planner" width={70} height={21} priority />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {/* How it Works */}
            <Link
              href="/how-it-works"
              className={`transition-colors text-sm font-medium ${
                isActive('/how-it-works') ? 'text-[#FF5635]' : 'text-[#180204]/70 hover:text-[#FF5635]'
              }`}
            >
              How it Works
            </Link>

            {/* Destinations — with dropdown */}
            <DestinationsDropdown isActive={isActive('/destinations')} />

            {/* Blog, Insights, About, Contact */}
            {navLinks
              .filter((l) => !['how-it-works', 'destinations'].some((s) => l.href.includes(s)))
              .map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors text-sm font-medium ${
                    isActive(link.href) ? 'text-[#FF5635]' : 'text-[#180204]/70 hover:text-[#FF5635]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

            <Link
              href="/ai-trip-planner"
              className="btn-accent px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2"
            >
              Start Planning <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile: CTA + Hamburger */}
          <div className="flex md:hidden items-center gap-3">
            <Link
              href="/ai-trip-planner"
              className="btn-accent px-4 py-2 rounded-full text-xs font-semibold"
            >
              Start Planning
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative z-[60] w-10 h-10 flex items-center justify-center rounded-xl hover:bg-[#FAF6F3] transition-colors"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              <div className="w-5 h-4 relative flex flex-col justify-between">
                <span
                  className={`block h-[2px] bg-[#180204] rounded-full transition-all duration-300 origin-center ${
                    isOpen ? 'rotate-45 translate-y-[7px]' : ''
                  }`}
                />
                <span
                  className={`block h-[2px] bg-[#180204] rounded-full transition-all duration-200 ${
                    isOpen ? 'opacity-0 scale-x-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`block h-[2px] bg-[#180204] rounded-full transition-all duration-300 origin-center ${
                    isOpen ? '-rotate-45 -translate-y-[7px]' : ''
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* ===== MOBILE MENU OVERLAY ===== */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-[#180204]/40 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Slide-in panel */}
      <div
        className={`fixed top-0 right-0 h-full w-[85vw] max-w-[380px] bg-[#FAF6F3] z-50 md:hidden transition-transform duration-300 ease-out shadow-2xl ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        {/* Panel header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-[#E6DAD1]">
          <span className="text-sm font-semibold text-[#180204]/50 uppercase tracking-wider font-sans">Menu</span>
          <button
            onClick={() => setIsOpen(false)}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-[#E6DAD1] hover:border-[#FF5635]/30 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-4 h-4 text-[#180204]/70" />
          </button>
        </div>

        {/* Nav links */}
        <div className="px-4 py-6 space-y-2">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-200 group ${
                isActive(link.href)
                  ? 'bg-[#FF5635]/8 border border-[#FF5635]/15'
                  : 'hover:bg-white border border-transparent hover:border-[#E6DAD1]'
              }`}
              style={{
                transitionDelay: isOpen ? `${(i + 1) * 50}ms` : '0ms',
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? 'translateX(0)' : 'translateX(20px)',
                transition: `opacity 300ms ${(i + 1) * 50}ms, transform 300ms ${(i + 1) * 50}ms, background-color 200ms, border-color 200ms`,
              }}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                isActive(link.href) ? 'bg-[#FF5635]/15' : 'bg-[#E6DAD1]/40 group-hover:bg-[#FF5635]/10'
              } transition-colors`}>
                <link.icon className={`w-5 h-5 ${
                  isActive(link.href) ? 'text-[#FF5635]' : 'text-[#180204]/40 group-hover:text-[#FF5635]'
                } transition-colors`} />
              </div>
              <div>
                <span className={`text-base font-semibold font-sans block ${
                  isActive(link.href) ? 'text-[#FF5635]' : 'text-[#180204]'
                }`}>
                  {link.label}
                </span>
                <span className="text-xs text-[#180204]/40 font-sans">{link.desc}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="px-6 mt-2">
          <Link
            href="/ai-trip-planner"
            className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl text-white font-semibold font-sans text-base"
            style={{
              background: 'linear-gradient(135deg, #FF5635 0%, #E03A1A 100%)',
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? 'translateY(0)' : 'translateY(10px)',
              transition: 'opacity 400ms 300ms, transform 400ms 300ms',
            }}
          >
            <Sparkles className="w-5 h-5" />
            Create My Free Itinerary
            <ArrowRight className="w-4 h-4" />
          </Link>
          <p
            className="text-center text-xs text-[#180204]/35 font-sans mt-3"
            style={{
              opacity: isOpen ? 1 : 0,
              transition: 'opacity 300ms 400ms',
            }}
          >
            13 questions · 3 minutes · 133 destinations
          </p>
        </div>

        {/* Bottom branding */}
        <div className="absolute bottom-0 left-0 right-0 px-6 py-5 border-t border-[#E6DAD1]">
          <div className="flex items-center justify-between">
            <Image src="/logo.png" alt="Greek Trip Planner" width={56} height={17} className="opacity-40" />
            <span className="text-[10px] text-[#180204]/25 font-sans">Built by 5 Greek experts</span>
          </div>
        </div>
      </div>
    </>
  )
}
