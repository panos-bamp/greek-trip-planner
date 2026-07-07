'use client'

import { useState, useEffect, useMemo, type ReactNode } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Compass, Download, ArrowLeft, Calendar, Users, Euro, Share2, Bookmark, Sparkles, MapPin, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import TripMap from '@/components/TripMap'
import { extractLocationsFromText, getLocationData } from '@/lib/greece-locations'
import { supabase } from '@/lib/supabase'
import CredentialStrip from '@/components/CredentialStrip'
import YesimCallout from '@/components/YesimCallout'
import DiscoverCarsCard from '@/components/DiscoverCarsCard'
import FerryscannerCard from '@/components/FerryscannerCard'
import GuidesCornerInline from '@/components/GuidesCornerInline'

export default function ResultsPage() {
  const params = useParams()
  const router = useRouter()
  const [itinerary, setItinerary] = useState('')
  const [userData, setUserData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedDay, setSelectedDay] = useState(1)

  useEffect(() => {
    let cancelled = false

    // Two-step load:
    //   1. localStorage (fast — the user who generated it)
    //   2. Supabase fallback (shared link, new device, or cleared browser)
    // The public anon client is safe here — the "Anyone can read by ID"
    // RLS policy allows SELECT for the anon role, and the 8-char random
    // ID acts as an unguessable password.
    const loadItinerary = async () => {
      // Step 1: try localStorage
      try {
        const stored = localStorage.getItem(`itinerary-${params.id}`)
        if (stored) {
          const data = JSON.parse(stored)
          if (!cancelled) {
            setItinerary(data.itinerary || '')
            setUserData(data.answers)
            setIsLoading(false)
          }
          return
        }
      } catch (err) {
        // localStorage may be blocked (Safari private, quota, etc.) — fall through
        console.warn('[results] localStorage read failed, falling back to Supabase:', err)
      }

      // Step 2: fetch from Supabase
      if (!supabase) {
        if (!cancelled) setIsLoading(false)
        return
      }
      try {
        const { data, error } = await supabase
          .from('itineraries')
          .select('itinerary_markdown, answers_json')
          .eq('id', params.id)
          .maybeSingle()
        if (error) {
          console.error('[results] Supabase fetch error:', error.message)
        } else if (data && !cancelled) {
          setItinerary(data.itinerary_markdown || '')
          setUserData(data.answers_json)
          // Also warm localStorage so subsequent loads on this device are instant
          try {
            localStorage.setItem(
              `itinerary-${params.id}`,
              JSON.stringify({
                id: params.id,
                itinerary: data.itinerary_markdown,
                answers: data.answers_json,
              })
            )
          } catch { /* quota/blocked — no-op */ }
        }
      } catch (err) {
        console.error('[results] Supabase fetch exception:', err)
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    loadItinerary()
    return () => { cancelled = true }
  }, [params.id])

  // Extract locations from itinerary text
  const locations = useMemo(() => {
    if (!itinerary) return []
    const extractedNames = extractLocationsFromText(itinerary)
    const lines = itinerary.split('\n')
    const locationObjects: any[] = []
    let currentDay = 1
    lines.forEach((line) => {
      const dayMatch = line.match(/Day (\d+)|DAY (\d+)/i)
      if (dayMatch) currentDay = parseInt(dayMatch[1] || dayMatch[2])
      extractedNames.forEach((locationName) => {
        if (line.toLowerCase().includes(locationName) && !locationObjects.find(loc => loc.name === locationName && loc.day === currentDay)) {
          const locData = getLocationData(locationName)
          if (locData) {
            const timeMatch = line.match(/(morning|afternoon|evening|night|noon)/i)
            locationObjects.push({
              name: locationName.charAt(0).toUpperCase() + locationName.slice(1),
              lat: locData.lat, lng: locData.lng, day: currentDay, type: locData.type,
              time: timeMatch ? timeMatch[1].charAt(0).toUpperCase() + timeMatch[1].slice(1) : undefined,
              description: line.trim().substring(0, 100),
            })
          }
        }
      })
    })
    return locationObjects
  }, [itinerary])

  // Scroll to day section
  useEffect(() => {
    if (selectedDay && itinerary) {
      setTimeout(() => {
        const el = document.getElementById(`day-${selectedDay}`)
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 130
          window.scrollTo({ top: y, behavior: 'smooth' })
        }
      }, 100)
    }
  }, [selectedDay, itinerary])

  const days = itinerary
    ? itinerary.split('### Day').filter(Boolean).map((day, i) => ({ number: i + 1, content: day }))
    : []

  /* ─── Loading State ─── */
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF6F3] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-[#FF5635]/10 flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Compass className="w-8 h-8 text-[#FF5635] animate-spin" />
          </div>
          <h2 className="text-2xl text-[#180204] mb-2" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
            Creating your itinerary…
          </h2>
          <p className="text-[#180204]/50 text-sm">Our AI is crafting something special</p>
        </div>
      </div>
    )
  }

  /* ─── No Itinerary ─── */
  if (!itinerary) {
    return (
      <div className="min-h-screen bg-[#FAF6F3] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-10 text-center max-w-md shadow-lg border border-[#E6DAD1]">
          <div className="w-16 h-16 rounded-full bg-[#FF5635]/10 flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-8 h-8 text-[#FF5635]" />
          </div>
          <h2 className="text-2xl text-[#180204] mb-3" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
            Generating Your Itinerary…
          </h2>
          <p className="text-[#180204]/50 text-sm mb-6 leading-relaxed">
            This might take a moment. The AI is creating your personalized Greece adventure.
          </p>
          <button onClick={() => router.push('/quiz')}
            className="px-8 py-3 bg-[#FF5635] text-white rounded-full font-semibold text-sm hover:bg-[#E03A1A] transition-all shadow-md shadow-[#FF5635]/20">
            Start Over
          </button>
        </div>
      </div>
    )
  }

  /* ─── Parse inline markdown links [text](url) ─── */
  /* ─── Inline parser: handles **bold** + [text](url) markdown together ───
     This unified parser walks through text once and emits React nodes for:
     - Markdown bold: **word** → <strong>
     - Markdown links: [text](url) → styled <a> based on domain
     - Plain text: passthrough
     Operators are matched in priority order — bold first (rarely contains
     brackets), then links. Bare text fragments inside link labels are kept
     plain to avoid double-processing. */
  const renderInlineLinks = (text: string) => {
    if (!text) return null

    // Step 1: remove accidental nested-link patterns the AI sometimes produces:
    //   [[Text](url1)](url2) → keep only the outer link with the cleaner URL
    //   [Text.com](http://Text.com) inside another link → just "Text.com"
    let cleaned = text
    // Repeatedly collapse any `[[Inner](u1)](u2)` into `[Inner](u2)`
    let prev = ''
    while (prev !== cleaned) {
      prev = cleaned
      cleaned = cleaned.replace(/\[\[([^\[\]]+?)\]\(([^)]+?)\)\]\(([^)]+?)\)/g, '[$1]($3)')
    }

    // Step 2: tokenize into a flat array of (kind, value) tuples
    type Token =
      | { kind: 'bold'; value: string }
      | { kind: 'link'; text: string; url: string }
      | { kind: 'text'; value: string }

    const tokens: Token[] = []
    let i = 0
    while (i < cleaned.length) {
      // Bold: **...**
      if (cleaned[i] === '*' && cleaned[i + 1] === '*') {
        const end = cleaned.indexOf('**', i + 2)
        if (end !== -1) {
          const inner = cleaned.slice(i + 2, end)
          // Ignore empty `****`
          if (inner.length > 0) {
            tokens.push({ kind: 'bold', value: inner })
            i = end + 2
            continue
          }
        }
      }
      // Link: [text](url)
      if (cleaned[i] === '[') {
        const closeBracket = cleaned.indexOf(']', i + 1)
        if (closeBracket !== -1 && cleaned[closeBracket + 1] === '(') {
          const closeParen = cleaned.indexOf(')', closeBracket + 2)
          if (closeParen !== -1) {
            const linkText = cleaned.slice(i + 1, closeBracket)
            const url = cleaned.slice(closeBracket + 2, closeParen)
            // Avoid empty/malformed
            if (linkText && url && !url.includes('[')) {
              tokens.push({ kind: 'link', text: linkText, url })
              i = closeParen + 1
              continue
            }
          }
        }
      }
      // Plain text — accumulate until next operator
      const last = tokens[tokens.length - 1]
      if (last && last.kind === 'text') {
        last.value += cleaned[i]
      } else {
        tokens.push({ kind: 'text', value: cleaned[i] })
      }
      i++
    }

    // Step 3: render tokens
    return tokens.map((tok, idx) => {
      if (tok.kind === 'bold') {
        return <strong key={idx} className="font-semibold text-[#180204]">{tok.value}</strong>
      }
      if (tok.kind === 'link') {
        const url = tok.url
        const linkText = tok.text
        const isBooking = url.includes('booking.com') || url.includes('booking.tpx') || url.includes('hotellook')
        const isGYG = url.includes('getyourguide.com') || url.includes('getyourguide.tpx') || url.includes('gyg.tpx')
        const isFerryscanner = url.includes('fas.st')

        if (isBooking) {
          return (
            <a key={idx} href={url} target="_blank" rel="noopener noreferrer nofollow"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#003580]/8 text-[#003580] rounded-lg text-xs font-semibold hover:bg-[#003580]/15 transition-colors mt-1.5 max-w-full">
              <span>🏨</span>
              <span className="truncate">{linkText}</span>
              <ExternalLink className="w-3 h-3 flex-shrink-0" />
            </a>
          )
        }
        if (isGYG) {
          return (
            <a key={idx} href={url} target="_blank" rel="noopener noreferrer nofollow"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FF5533]/8 text-[#FF5533] rounded-lg text-xs font-semibold hover:bg-[#FF5533]/15 transition-colors mt-1.5 max-w-full">
              <span>🎟️</span>
              <span className="truncate">{linkText}</span>
              <ExternalLink className="w-3 h-3 flex-shrink-0" />
            </a>
          )
        }
        if (isFerryscanner) {
          // Ferry route mentions are inline natural-language phrases
          // ("ferry from Piraeus to Santorini") — 5-10 words long.
          // A pill-style badge would break prose flow, so use a subtle
          // inline underlined link with a small ⛴️ suffix marker.
          return (
            <a
              key={idx}
              href={url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline text-[#2C73FF] font-semibold hover:text-[#180204] underline underline-offset-2 decoration-[#2C73FF]/40 hover:decoration-[#180204]/60 transition-colors"
            >
              {linkText}
              <span className="ml-1 text-[10px] opacity-70" aria-hidden="true">⛴️</span>
            </a>
          )
        }
        // Travel guide / generic link
        return (
          <a key={idx} href={url} target="_blank" rel="noopener noreferrer"
            className="text-[#2C73FF] font-medium hover:text-[#FF5635] underline underline-offset-2 decoration-[#2C73FF]/30 hover:decoration-[#FF5635]/50 transition-colors">
            {linkText}
          </a>
        )
      }
      return <span key={idx}>{tok.value}</span>
    })
  }

  /* ─── Render a line of the itinerary ─── */
  const renderLine = (line: string, index: number) => {
    const isDayHeader = line.match(/### Day (\d+)/)
    const dayNumber = isDayHeader ? isDayHeader[1] : null

    // ── SIGN-OFF — italic line with emoji at end-of-trip ──
    // Pattern: *Happy travels, Name — ... 🌊☀️* OR similar
    // Must be ENTIRELY italic (starts AND ends with single *) and contain
    // an emoji or sign-off keyword. Renders as bold, large, centered.
    const signoffMatch = line.match(/^\s*\*([^*].*?[^*])\*\s*$/)
    if (
      signoffMatch &&
      (
        /\p{Extended_Pictographic}/u.test(signoffMatch[1]) ||
        /happy travels|safe travels|enjoy|καλό ταξίδι/i.test(signoffMatch[1])
      ) &&
      // Avoid matching short italic phrases like "*Total: 7 days*"
      signoffMatch[1].length > 20
    ) {
      return (
        <div key={index} className="my-8 text-center">
          <p
            className="text-xl md:text-2xl font-bold text-[#180204] leading-snug"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontStyle: 'normal' }}
          >
            {signoffMatch[1]}
          </p>
        </div>
      )
    }

    // H1 — Main title
    if (line.startsWith('# ')) {
      return (
        <h1 key={index} className="text-3xl text-[#180204] mb-4 leading-tight" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
          {line.replace('# ', '')}
        </h1>
      )
    }

    // H2 — Section headers
    if (line.startsWith('## ')) {
      return (
        <h2 key={index} className="text-xl text-[#180204] mt-10 mb-4 pb-2 border-b border-[#E6DAD1] flex items-center gap-2" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
          <span>{line.replace('## ', '')}</span>
        </h2>
      )
    }

    // H3 — Day headers
    if (line.startsWith('### ')) {
      return (
        <h3 key={index} id={dayNumber ? `day-${dayNumber}` : undefined}
          className="mt-8 mb-4 p-4 rounded-xl flex items-center gap-3 border-l-4 border-[#FF5635]"
          style={{ background: 'linear-gradient(135deg, #FF5635 0%, #FF846C 100%)' }}>
          <MapPin className="w-5 h-5 text-white flex-shrink-0" />
          <span className="text-lg font-semibold text-white" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
            {line.replace('### ', '')}
          </span>
        </h3>
      )
    }

    // Time-of-day blocks
    if (line.startsWith('**Morning:**')) {
      return (
        <div key={index} className="flex items-start gap-3 p-3.5 bg-amber-50/60 rounded-xl border border-amber-100">
          <span className="text-xl flex-shrink-0 mt-0.5">🌅</span>
          <div className="flex-1">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Morning</span>
            <p className="text-sm text-[#180204]/80 mt-0.5 leading-relaxed">{renderInlineLinks(line.replace('**Morning:**', '').trim())}</p>
          </div>
        </div>
      )
    }
    if (line.startsWith('**Afternoon:**')) {
      return (
        <div key={index} className="flex items-start gap-3 p-3.5 bg-sky-50/60 rounded-xl border border-sky-100">
          <span className="text-xl flex-shrink-0 mt-0.5">☀️</span>
          <div className="flex-1">
            <span className="text-xs font-bold text-sky-700 uppercase tracking-wider">Afternoon</span>
            <p className="text-sm text-[#180204]/80 mt-0.5 leading-relaxed">{renderInlineLinks(line.replace('**Afternoon:**', '').trim())}</p>
          </div>
        </div>
      )
    }
    if (line.startsWith('**Evening:**')) {
      return (
        <div key={index} className="flex items-start gap-3 p-3.5 bg-violet-50/60 rounded-xl border border-violet-100">
          <span className="text-xl flex-shrink-0 mt-0.5">🌙</span>
          <div className="flex-1">
            <span className="text-xs font-bold text-violet-700 uppercase tracking-wider">Evening</span>
            <p className="text-sm text-[#180204]/80 mt-0.5 leading-relaxed">{renderInlineLinks(line.replace('**Evening:**', '').trim())}</p>
          </div>
        </div>
      )
    }

    // Where to Stay — with Booking.com link
    if (line.startsWith('**Where to Stay:**')) {
      return (
        <div key={index} className="flex items-start gap-3 p-4 bg-emerald-50/60 rounded-xl border border-emerald-200">
          <span className="text-xl flex-shrink-0">🏨</span>
          <div className="flex-1">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Where to Stay</span>
            <p className="text-sm text-[#180204]/80 mt-1 leading-relaxed">{renderInlineLinks(line.replace('**Where to Stay:**', '').trim())}</p>
          </div>
        </div>
      )
    }

    // Insider Tip
    if (line.startsWith('**Insider Tip:**')) {
      return (
        <div key={index} className="flex items-start gap-3 p-3.5 bg-[#FF5635]/5 rounded-xl border border-[#FF5635]/15">
          <span className="text-xl flex-shrink-0">💡</span>
          <div className="flex-1">
            <span className="text-xs font-bold text-[#FF5635] uppercase tracking-wider">Insider Tip</span>
            <p className="text-sm text-[#180204]/80 mt-0.5 leading-relaxed">{renderInlineLinks(line.replace('**Insider Tip:**', '').trim())}</p>
          </div>
        </div>
      )
    }

    // Daily Budget
    if (line.startsWith('**Daily Budget:**')) {
      return (
        <div key={index} className="flex items-start gap-3 p-3.5 bg-[#2C73FF]/5 rounded-xl border border-[#2C73FF]/15">
          <span className="text-xl flex-shrink-0">💰</span>
          <div className="flex-1">
            <span className="text-xs font-bold text-[#2C73FF] uppercase tracking-wider">Daily Budget</span>
            <p className="text-sm text-[#180204]/80 mt-0.5 leading-relaxed font-medium">{line.replace('**Daily Budget:**', '').trim()}</p>
          </div>
        </div>
      )
    }

    // Travel guide lines with 📖
    if (line.includes('📖')) {
      return (
        <div key={index} className="flex items-center gap-2 p-3 rounded-xl bg-[#FAF6F3] border border-[#E6DAD1]">
          <span className="text-lg">📖</span>
          <span className="text-sm text-[#180204]/70">{renderInlineLinks(line.replace('📖', '').trim())}</span>
        </div>
      )
    }

    // Bullet points
    if (line.startsWith('- ')) {
      return (
        <div key={index} className="flex items-start gap-2.5 ml-1 text-sm text-[#180204]/70 leading-relaxed">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5635] mt-2 flex-shrink-0" />
          <span>{renderInlineLinks(line.replace('- ', ''))}</span>
        </div>
      )
    }

    // Regular paragraph — also parse for inline links
    if (line.trim()) {
      return <p key={index} className="text-sm text-[#180204]/70 leading-relaxed">{renderInlineLinks(line)}</p>
    }

    return null
  }

  /* ─── MAIN RENDER ─── */
  return (
    <div className="min-h-screen bg-[#FAF6F3]">

      {/* ── Header ── */}
      <header className="bg-white border-b border-[#E6DAD1] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => router.push('/')} className="p-2 hover:bg-[#FAF6F3] rounded-xl transition-colors">
              <ArrowLeft className="w-5 h-5 text-[#180204]/60" />
            </button>
            <Link href="/" className="flex items-center">
              <Image src="/logo.png" alt="Greek Trip Planner" width={60} height={18} />
            </Link>
            <div className="hidden sm:block h-5 w-px bg-[#E6DAD1] mx-1" />
            <div className="hidden sm:block">
              <h1 className="text-sm font-semibold text-[#180204]" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
                {userData?.firstName ? `${userData.firstName}'s ` : ''}{userData?.duration || '7'}-Day Itinerary
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <button className="px-3 py-2 text-xs text-[#180204]/60 hover:bg-[#FAF6F3] rounded-lg transition flex items-center gap-1.5 font-medium">
              <Share2 className="w-3.5 h-3.5" /><span className="hidden md:inline">Share</span>
            </button>
            <button className="px-3 py-2 text-xs text-[#180204]/60 hover:bg-[#FAF6F3] rounded-lg transition flex items-center gap-1.5 font-medium">
              <Bookmark className="w-3.5 h-3.5" /><span className="hidden md:inline">Save</span>
            </button>
            <button className="px-4 py-2 bg-[#FF5635] text-white rounded-full hover:bg-[#E03A1A] transition flex items-center gap-1.5 font-semibold text-xs shadow-sm shadow-[#FF5635]/20">
              <Download className="w-3.5 h-3.5" /><span>PDF</span>
            </button>
          </div>
        </div>
      </header>

      {/* ── Day Tabs ── */}
      {days.length > 0 && (
        <div className="bg-white border-b border-[#E6DAD1] sticky top-[53px] z-40">
          <div className="max-w-7xl mx-auto px-4 py-2 overflow-x-auto scrollbar-hidden">
            <div className="flex gap-1.5 min-w-max">
              {days.map(day => (
                <button key={day.number} onClick={() => setSelectedDay(day.number)}
                  className={`px-4 py-1.5 rounded-full font-semibold text-xs transition-all whitespace-nowrap ${
                    selectedDay === day.number
                      ? 'bg-[#FF5635] text-white shadow-sm'
                      : 'bg-[#FAF6F3] text-[#180204]/50 hover:bg-[#E6DAD1]/50 hover:text-[#180204]/70'
                  }`}>
                  Day {day.number}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Main Content ── */}
      <div className="flex">

        {/* Left: Itinerary */}
        <div className="w-full md:w-1/2">

          {/* Trip Overview Banner */}
          <div className="bg-[#180204] text-white p-6">
            <div className="max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-3 py-1 mb-4">
                <Sparkles className="w-3 h-3 text-[#FF5635]" />
                <span className="text-xs font-medium text-white/80">AI-Generated Just for You</span>
              </div>

              <h2 className="text-2xl text-white mb-1.5 leading-tight" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
                Your Greece Itinerary
              </h2>
              <p className="text-white/50 text-sm mb-5">Personalized recommendations, insider tips & realistic timing</p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <div className="rounded-xl p-3 bg-white/8 border border-white/10">
                  <Calendar className="w-4 h-4 text-[#FF5635] mb-1.5" />
                  <div className="text-xs text-white/40">Duration</div>
                  <div className="text-sm font-semibold text-white">{userData?.duration || '7'} days</div>
                </div>
                <div className="rounded-xl p-3 bg-white/8 border border-white/10">
                  <Users className="w-4 h-4 text-[#FF5635] mb-1.5" />
                  <div className="text-xs text-white/40">Travelers</div>
                  <div className="text-sm font-semibold text-white">{userData?.travelWith || 'Solo'}</div>
                </div>
                <div className="rounded-xl p-3 bg-white/8 border border-white/10">
                  <Euro className="w-4 h-4 text-[#FF5635] mb-1.5" />
                  <div className="text-xs text-white/40">Budget</div>
                  <div className="text-sm font-semibold text-white">€{userData?.budget || '150'}/day</div>
                </div>
                <div className="rounded-xl p-3 bg-white/8 border border-white/10">
                  <MapPin className="w-4 h-4 text-[#FF5635] mb-1.5" />
                  <div className="text-xs text-white/40">Season</div>
                  <div className="text-sm font-semibold text-white">{userData?.month || 'Summer'}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Itinerary Content */}
          <div className="p-6 max-w-2xl mx-auto">
            <div className="space-y-3">
              {(() => {
                /**
                 * Multi-anchor injection — render the AI markdown line by line,
                 * but inject our static React components at known section
                 * boundaries. Anchors are detected on the heading lines so
                 * components appear immediately AFTER (or BEFORE) the right
                 * section in the reading flow.
                 *
                 *   1. CredentialStrip → after the "## Overview" heading
                 *   2. YesimCallout    → after the "## Your Route" heading
                 *   3. DiscoverCarsCard → after the "## Transport Between Destinations" heading
                 *   4. GuidesCornerInline → just BEFORE the "## Final Tips" heading
                 *
                 * Once a flag fires, it doesn't fire again — the component is
                 * rendered once per page even if the AI repeats a heading.
                 */
                const flags = {
                  credentialStrip: false,
                  yesim: false,
                  discoverCars: false,
                  ferryscanner: false,
                  guidesCorner: false,
                }

                const lines = itinerary.split('\n')
                const out: ReactNode[] = []

                /* ── Markdown table detector ──
                   Looks ahead from the current index to capture a complete
                   table, returning either { rows, advance } or null. */
                const tryConsumeTable = (startIdx: number): { node: ReactNode; advance: number } | null => {
                  const headerLine = lines[startIdx]?.trim()
                  const sepLine = lines[startIdx + 1]?.trim()
                  // Header must be a pipe row, separator must be |---|---| pattern
                  if (!headerLine || !sepLine) return null
                  if (!headerLine.includes('|')) return null
                  if (!/^\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)+\|?\s*$/.test(sepLine)) return null

                  const splitRow = (raw: string) =>
                    raw.replace(/^\||\|$/g, '').split('|').map((c) => c.trim())

                  const headers = splitRow(headerLine)
                  const bodyRows: string[][] = []
                  let i = startIdx + 2
                  while (i < lines.length) {
                    const t = lines[i]?.trim() ?? ''
                    if (!t || !t.includes('|')) break
                    bodyRows.push(splitRow(t))
                    i++
                  }
                  if (bodyRows.length === 0) return null

                  // Detect "Total" rows by scanning for a "TOTAL" cell — get bold styling
                  const isTotalRow = (cells: string[]) =>
                    cells.some((c) => /^\s*\*\*?\s*total/i.test(c))

                  const node = (
                    <div
                      key={`tbl-${startIdx}`}
                      className="my-6 overflow-x-auto border border-[#E6DAD1] rounded-xl shadow-sm"
                      style={{ WebkitOverflowScrolling: 'touch' }}
                    >
                      <table className="w-full border-collapse text-sm" style={{ minWidth: 480 }}>
                        <thead>
                          <tr style={{ background: '#180204' }}>
                            {headers.map((h, hi) => (
                              <th
                                key={hi}
                                className="text-left text-xs font-semibold uppercase tracking-wider text-white/85 px-4 py-3 whitespace-nowrap"
                                style={{ borderBottom: '2px solid #3a1012', letterSpacing: '0.04em' }}
                              >
                                {h.replace(/^\*\*|\*\*$/g, '')}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {bodyRows.map((row, ri) => {
                            const totalRow = isTotalRow(row)
                            const evenRow = ri % 2 === 1
                            return (
                              <tr
                                key={ri}
                                style={{
                                  background: totalRow ? '#180204' : evenRow ? '#FDFBF9' : '#FFFFFF',
                                  borderBottom: '1px solid #F0E8E2',
                                }}
                              >
                                {row.map((cell, ci) => (
                                  <td
                                    key={ci}
                                    className="px-4 py-3 leading-relaxed"
                                    style={{
                                      color: totalRow ? '#fff' : '#374151',
                                      fontWeight: totalRow ? 700 : 400,
                                      verticalAlign: 'middle',
                                      ...(ci === row.length - 1 && totalRow ? { textAlign: 'right' } : {}),
                                    }}
                                  >
                                    {renderInlineLinks(cell)}
                                  </td>
                                ))}
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                  )
                  return { node, advance: i - startIdx }
                }

                let idx = 0
                while (idx < lines.length) {
                  const line = lines[idx]
                  const trimmed = line.trim()

                  // Anchor 4 (PRE): inject Guide's Corner just before Final Tips
                  // Match flexibly: "Final Tips" / "Final Tips for X" / "Final tips for X from..."
                  if (!flags.guidesCorner && /^##\s*Final\s+[Tt]ips\b/.test(trimmed)) {
                    flags.guidesCorner = true
                    out.push(
                      <GuidesCornerInline
                        key={`gc-${idx}`}
                        userData={userData}
                        itinerary={itinerary}
                        locations={locations}
                      />
                    )
                  }

                  // Markdown table detection — multi-line consumer
                  if (trimmed.includes('|') && trimmed.startsWith('|')) {
                    const tableResult = tryConsumeTable(idx)
                    if (tableResult) {
                      out.push(tableResult.node)
                      idx += tableResult.advance
                      continue
                    }
                  }

                  // Default: render this single line
                  out.push(renderLine(line, idx))

                  // Anchor 1 (POST): credential strip after Overview heading
                  if (!flags.credentialStrip && /^##\s*Overview\s*$/i.test(trimmed)) {
                    flags.credentialStrip = true
                    out.push(<CredentialStrip key={`cs-${idx}`} userData={userData} />)
                  }

                  // Anchor 2 (POST): Yesim callout after the Route section
                  if (!flags.yesim && /^##\s*Your Route\s*$/i.test(trimmed)) {
                    flags.yesim = true
                    out.push(<YesimCallout key={`ys-${idx}`} />)
                  }

                  // Anchor 3 (POST): DiscoverCars after Transport heading
                  if (
                    !flags.discoverCars &&
                    /^##\s*Transport Between Destinations\s*$/i.test(trimmed)
                  ) {
                    flags.discoverCars = true
                    out.push(
                      <DiscoverCarsCard
                        key={`dc-${idx}`}
                        userData={userData}
                        itinerary={itinerary}
                        locations={locations}
                      />
                    )
                  }

                  // Anchor 5 (POST): Ferryscanner immediately after DiscoverCars
                  // Fires on the same anchor (Transport heading) since land + sea
                  // logistics belong side by side in the reader's mental model.
                  if (
                    !flags.ferryscanner &&
                    /^##\s*Transport Between Destinations\s*$/i.test(trimmed)
                  ) {
                    flags.ferryscanner = true
                    out.push(
                      <FerryscannerCard
                        key={`fs-${idx}`}
                        userData={userData}
                        itinerary={itinerary}
                        locations={locations}
                      />
                    )
                  }

                  idx++
                }

                return out
              })()}
            </div>

            {/* CTA — flights primary, blog secondary */}
            <div className="mt-12 rounded-2xl p-8 text-center text-white shadow-xl" style={{ background: 'linear-gradient(135deg, #FF5635 0%, #E03A1A 100%)' }}>
              <h3 className="text-2xl mb-2" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
                Make this trip happen
              </h3>
              <p className="text-white/80 text-sm mb-6">
                Find flights, lock in your dates, and you're set.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <a
                  href="https://trip.tpx.lt/k75QcbiI"
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="inline-flex items-center gap-2 px-7 py-3 bg-white text-[#FF5635] rounded-full font-bold text-sm hover:shadow-xl hover:scale-105 transition-all"
                >
                  <span>✈️</span>
                  <span>Find flights to Greece</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-1.5 px-5 py-2 text-white/80 hover:text-white text-sm font-medium underline underline-offset-4 decoration-white/30 hover:decoration-white/70 transition-all"
                >
                  <span>Browse Greek travel guides</span>
                </Link>
              </div>
            </div>

            {/* Re-generate CTA */}
            <div className="mt-6 text-center">
              <button onClick={() => router.push('/quiz')}
                className="text-sm text-[#180204]/40 hover:text-[#FF5635] transition-colors underline underline-offset-4 decoration-[#E6DAD1] hover:decoration-[#FF5635]">
                Not quite right? Generate a new itinerary
              </button>
            </div>
          </div>
        </div>

        {/* Right: Map */}
        <div className="hidden md:block md:w-1/2 sticky top-[98px] h-[calc(100vh-98px)]">
          <TripMap
            locations={locations}
            selectedDay={selectedDay}
            onLocationClick={(location) => setSelectedDay(location.day)}
          />
        </div>
      </div>
    </div>
  )
}
