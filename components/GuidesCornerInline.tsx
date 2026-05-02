'use client'

/**
 * GuidesCornerInline — adaptive trust component for AI-generated itineraries.
 *
 * Renders a contextual "Guide's Corner" quote that adapts to:
 *   - User's Greece experience level (first-time vs. returning vs. frequent)
 *   - Crowd preference (popular vs. hidden gems)
 *   - The actual destinations in their itinerary (parsed from `## Your Route`)
 *
 * Three variants:
 *   A — "Validation" for first-time visitors choosing classic destinations
 *   B — "Pro insight" for hidden-gem seekers and returning visitors
 *   C — "Reassurance" for first-timers who picked balanced/mainland routes
 *
 * Designed to be DROPPED INTO the results page renderer at a fixed anchor
 * (recommended: just before the AI's `## Final Tips` heading) to catch the
 * reader at peak conversion intent.
 *
 * No API calls. No prompt changes. Reads from props already in scope.
 */

import { useMemo } from 'react'

interface GuidesCornerInlineProps {
  /** Quiz answers from localStorage (data.answers) */
  userData: any
  /** The raw markdown itinerary string */
  itinerary: string
  /** Already-extracted locations array from the parent component */
  locations: Array<{ name: string; type?: string; day?: number }>
}

/* ─────────────────────────────────────────────────────────────
   HIDDEN-GEM REFERENCE LIST
   Mirrors the same list used in /lib/claude.ts so the
   "standout destination" detection is consistent across the app.
   Update both files together if the canonical list changes.
   ───────────────────────────────────────────────────────────── */
const HIDDEN_GEMS = new Set([
  'Folegandros',
  'Amorgos',
  'Koufonisia',
  'Ikaria',
  'Karpathos',
  'Astypalea',
  'Monemvasia',
  'Zagori Villages',
  'Mani Peninsula',
  'Tinos',
  'Sifnos',
  'Serifos',
  'Lemnos',
  'Samothrace',
  'Milos', // included as a "rising hidden gem" — Folegandros is rarer
  'Naxos', // when chosen over Mykonos signals a savvy traveler
])

const POPULAR_DESTINATIONS = new Set([
  'Santorini',
  'Mykonos',
  'Rhodes',
  'Corfu',
  'Zakynthos',
  'Crete',
  'Kos',
  'Athens',
  'Meteora',
  'Delphi',
])

/* ─────────────────────────────────────────────────────────────
   ROUTE EXTRACTION
   Parses the `## Your Route` line from the markdown to get an
   ordered list of destination names (without day counts).
   Falls back to the locations array if parsing fails.
   ───────────────────────────────────────────────────────────── */
function extractRouteDestinations(
  itinerary: string,
  locations: GuidesCornerInlineProps['locations']
): string[] {
  // Try to find the "## Your Route" section first
  const routeMatch = itinerary.match(/##\s*Your Route\s*\n([\s\S]+?)(?:\n##|\n###|$)/i)

  if (routeMatch && routeMatch[1]) {
    // Extract destinations from a line like "Athens (1 day) → Milos (2 days) → Santorini (2 days)"
    const routeLine = routeMatch[1].trim().split('\n')[0] // first non-empty line
    const destinations = routeLine
      .split(/[→➜>\u2192]/) // handle various arrow characters
      .map((part) => part.replace(/\([^)]*\)/g, '').trim()) // strip "(N days)"
      .filter(Boolean)

    if (destinations.length > 0) return destinations
  }

  // Fallback: deduplicate from extracted locations (preserve order by day)
  const seen = new Set<string>()
  const ordered: string[] = []
  locations
    .sort((a, b) => (a.day || 0) - (b.day || 0))
    .forEach((loc) => {
      if (!seen.has(loc.name)) {
        seen.add(loc.name)
        ordered.push(loc.name)
      }
    })
  return ordered
}

/* ─────────────────────────────────────────────────────────────
   VARIANT SELECTION
   Returns 'A' | 'B' | 'C' based on quiz signals.
   ───────────────────────────────────────────────────────────── */
type Variant = 'A' | 'B' | 'C'

function selectVariant(userData: any, destinations: string[]): Variant {
  const experience = userData?.greeceExperience || 'first-time'
  const crowdPref = Number(userData?.crowdPreference ?? 50)

  const hasStandoutHiddenGem = destinations.some((d) => HIDDEN_GEMS.has(d))
  const hasOnlyClassics = destinations.every(
    (d) => POPULAR_DESTINATIONS.has(d) || !HIDDEN_GEMS.has(d)
  )

  // Variant B — "Pro insight"
  // Returning/frequent visitors OR hidden-gem seekers OR savvy first-timers picking deep cuts
  if (
    experience === 'returning' ||
    experience === 'frequent' ||
    crowdPref > 60 ||
    hasStandoutHiddenGem
  ) {
    return 'B'
  }

  // Variant A — "Validation"
  // First-timers who balanced popular + a hidden gem (smart route)
  if (experience === 'first-time' && crowdPref >= 35 && crowdPref <= 60) {
    return 'A'
  }

  // Variant C — "Reassurance"
  // First-timers leaning popular/classic, or default fallback
  return 'C'
}

/* ─────────────────────────────────────────────────────────────
   QUOTE BUILDER
   Takes the variant + extracted destinations and produces the
   final personalized quote. Each template has graceful fallbacks
   when destinations can't be cleanly extracted.
   ───────────────────────────────────────────────────────────── */
function buildQuote(
  variant: Variant,
  firstName: string,
  destinations: string[]
): string {
  const name = firstName ? `${firstName}, ` : ''
  const firstDest = destinations[0] || ''
  const lastDest = destinations[destinations.length - 1] || ''
  const standout = destinations.find((d) => HIDDEN_GEMS.has(d)) || ''
  const hasMultiple = destinations.length >= 2

  // ─── Variant A: VALIDATION ───
  // For first-timers with balanced routes (popular + 1 hidden gem)
  if (variant === 'A') {
    if (standout && firstDest) {
      return `${name}this is the route I'd actually recommend for a first trip like yours. Anchoring in ${firstDest} and adding ${standout} to the mix — that's the move most planners miss. You'll come back wanting more, but for the right reasons.`
    }
    if (firstDest && lastDest && firstDest !== lastDest) {
      return `${name}this is a balanced first-trip route — ${firstDest} as your foundation, ${lastDest} as the finale. That's how I'd actually plan it for someone new to Greece.`
    }
    return `${name}this is a solid first-trip route. The pacing is realistic and the destinations work together logistically — that's what matters most on a first visit.`
  }

  // ─── Variant B: PRO INSIGHT ───
  // For hidden-gem seekers and returning visitors — give them something the AI didn't say
  if (variant === 'B') {
    if (standout) {
      return `${name}choosing ${standout} tells me you've done your research. One thing the AI won't catch: in peak summer, the popular beaches there fill up by 11am — go before 9 or after 5 for the version locals actually enjoy. Trust me, the difference is everything.`
    }
    if (firstDest) {
      return `${name}you clearly know what you're after on this trip. One pro note the AI won't catch: in ${firstDest}, the hours between 14:00 and 17:00 are sacred to locals — that's when you'll find the authentic Greece, not at the tourist hotspots.`
    }
    return `${name}you've put together a thoughtful route. One thing worth knowing: every location on this itinerary has a "locals' hour" — usually mid-afternoon — when the tourist crowds thin and the real character of the place comes through. Look for it.`
  }

  // ─── Variant C: REASSURANCE ───
  // For first-timers picking classic/safe routes — confirm + add one specific tip
  if (firstDest && lastDest && firstDest !== lastDest && hasMultiple) {
    return `${name}${firstDest} → ${lastDest} is the foundation of Greek travel for a reason — this is how I'd plan a first visit too. The pacing is realistic, no cramming, and you'll see why people come back. The one thing to double-check: opening hours shift in shoulder season, so confirm sites the day before.`
  }
  if (firstDest) {
    return `${name}${firstDest} is the right anchor for a first Greek trip. The route is realistic — no cramming, no missed connections. One thing worth confirming the day before: opening hours can shift unexpectedly in shoulder season.`
  }
  return `${name}this is a realistic first-trip route — no cramming, no missed connections. The destinations work together logistically, which matters more on a first visit than people realize.`
}

/* ─────────────────────────────────────────────────────────────
   MAIN COMPONENT
   ───────────────────────────────────────────────────────────── */
export default function GuidesCornerInline({
  userData,
  itinerary,
  locations,
}: GuidesCornerInlineProps) {
  const { variant, quote } = useMemo(() => {
    const destinations = extractRouteDestinations(itinerary, locations)
    const v = selectVariant(userData, destinations)
    const firstName = userData?.firstName || ''
    return { variant: v, quote: buildQuote(v, firstName, destinations) }
  }, [userData, itinerary, locations])

  return (
    <div
      className="my-8 rounded-2xl overflow-hidden border border-[#E0D8D3] shadow-sm"
      style={{ background: '#FAF6F3', borderLeft: '5px solid #FF5635' }}
    >
      {/* Header strip — Guide's Corner label */}
      <div className="px-6 pt-5 pb-1">
        <p
          className="text-[11px] font-bold tracking-wider uppercase text-[#FF5635] m-0"
          style={{ letterSpacing: '0.08em' }}
        >
          Guide's Corner
        </p>
      </div>

      {/* Quote block */}
      <div className="px-6 py-4">
        <div
          className="bg-white rounded-r-lg px-5 py-4 border-l-4 border-[#FF5635]"
        >
          <p className="text-[15px] text-[#180204] leading-relaxed italic m-0">
            "{quote}"
          </p>
        </div>
      </div>

      {/* Dual signature — Vaggelis primary, Panos secondary */}
      <div className="px-6 pb-5 pt-1">
        <div className="flex items-center gap-3 flex-wrap">
          {/* Vaggelis avatar — column icon */}
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0"
            style={{
              background: '#EDE9FE',
              boxShadow: '0 0 0 1.5px #E0D8D3',
            }}
          >
            🏛️
          </div>

          <div className="flex-1 min-w-0">
            {/* Primary signature: Vaggelis */}
            <p className="text-[14px] font-bold text-[#180204] m-0 leading-tight">
              Vaggelis
            </p>
            <p className="text-[12px] text-[#888] m-0 mt-0.5 leading-tight">
              Certified Greek Tourist Guide
            </p>

            {/* Secondary signature: Panos — visually subordinate */}
            <p
              className="text-[11px] text-[#888] m-0 mt-2 pt-2 leading-tight"
              style={{ borderTop: '1px solid #E0D8D3' }}
            >
              Route reviewed with{' '}
              <span className="font-semibold text-[#180204]">Panos</span>
              <span className="opacity-70"> · Founder, Greek Trip Planner</span>
            </p>
          </div>
        </div>
      </div>

      {/* Debug-only: visible variant tag (remove for production) */}
      {process.env.NODE_ENV === 'development' && (
        <div
          className="px-6 pb-3 text-[10px] font-mono opacity-40"
          aria-hidden="true"
        >
          variant: {variant}
        </div>
      )}
    </div>
  )
}
