'use client'

/**
 * DiscoverCarsCard — adaptive car rental affiliate card.
 *
 * Always renders, but adapts its copy + headline based on:
 *   - userData.regionPreference (islands / mainland / both)
 *   - The actual destinations extracted from the itinerary
 *
 * URL is the static, pre-tracked TravelPayouts short link:
 *   https://discovercars.tpx.lt/f2faahhR
 *
 * Placement: after the "Transport Between Destinations" section, where
 * the reader is already thinking about logistics.
 */

import { useMemo } from 'react'
import { ExternalLink } from 'lucide-react'

interface DiscoverCarsCardProps {
  userData: any
  itinerary: string
  locations: Array<{ name: string; type?: string; day?: number }>
}

const DISCOVER_CARS_URL = 'https://discovercars.tpx.lt/f2faahhR'

/* ─────────────────────────────────────────────────────────────
   TRIP-TYPE DETECTION
   ───────────────────────────────────────────────────────────── */

type TripType =
  | 'crete-focused'      // Crete is a major part of the itinerary
  | 'mainland-roadtrip'  // Mainland-heavy, Athens + Peloponnese / Meteora / Delphi
  | 'large-island'       // Naxos / Paros / Rhodes / Corfu — driving makes sense
  | 'multi-island-small' // Cyclades-only, small islands (Santorini, Mykonos, etc.)
  | 'mixed'              // Mix of regions

const LARGE_DRIVABLE_ISLANDS = new Set([
  'Crete', 'Rhodes', 'Corfu', 'Naxos', 'Paros', 'Lesbos', 'Chios',
  'Kefalonia', 'Samos', 'Lemnos', 'Karpathos',
])

const MAINLAND_REGIONS = new Set([
  'Attica', 'Central Greece', 'Northern Greece', 'Peloponnese',
])

function detectTripType(
  userData: any,
  destinations: string[]
): TripType {
  const regionPref = userData?.regionPreference || 'both'

  const hasCrete = destinations.some((d) =>
    ['Crete', 'Heraklion', 'Chania', 'Rethymno', 'Agios Nikolaos'].includes(d)
  )
  if (hasCrete) return 'crete-focused'

  const mainlandCount = destinations.filter((d) =>
    ['Athens', 'Thessaloniki', 'Meteora', 'Delphi', 'Nafplio', 'Olympia',
     'Mycenae', 'Monemvasia', 'Mystras', 'Arachova', 'Volos', 'Pelion'].includes(d)
  ).length

  if (regionPref === 'mainland' || mainlandCount >= 2) return 'mainland-roadtrip'

  const hasLargeIsland = destinations.some((d) => LARGE_DRIVABLE_ISLANDS.has(d))
  if (hasLargeIsland) return 'large-island'

  if (regionPref === 'islands') return 'multi-island-small'

  return 'mixed'
}

/* ─────────────────────────────────────────────────────────────
   COPY VARIANTS
   ───────────────────────────────────────────────────────────── */

interface CardCopy {
  headline: string
  subhead: string
  cta: string
}

function getCardCopy(tripType: TripType, firstDest: string): CardCopy {
  switch (tripType) {
    case 'crete-focused':
      return {
        headline: 'A car is essential in Crete',
        subhead: 'Crete is the second-largest Mediterranean island. Distances between coast, mountains, and gorges are real — public transport reaches the headlines, not the hidden coves.',
        cta: 'Compare car rentals in Crete',
      }
    case 'mainland-roadtrip':
      return {
        headline: 'The mainland rewards road trips',
        subhead: `Meteora, Delphi, the Peloponnese — the best of mainland Greece is between the cities, not in them. Pick up at ${firstDest || 'Athens'} airport, drop off where you finish.`,
        cta: 'Compare car rentals in Greece',
      }
    case 'large-island':
      return {
        headline: 'Local rental unlocks hidden beaches',
        subhead: 'On larger islands, the famous beaches have parking and crowds. The ones worth the drive don\'t. A small car for 2-3 days pays for itself in beach time.',
        cta: 'Compare local rentals',
      }
    case 'multi-island-small':
      return {
        headline: 'Driving on smaller Cyclades islands',
        subhead: 'Most small Cyclades islands are walkable from port — but if you want hidden beaches off the main road, a car for 1-2 days saves taxi pain. Compare prices before flying.',
        cta: 'See rental prices',
      }
    case 'mixed':
    default:
      return {
        headline: 'Need a rental car for any leg?',
        subhead: 'Compare prices across Hertz, Sixt, Avis, and 800+ local agencies in Greece. Free cancellation up to 48 hours before pickup, full insurance options.',
        cta: 'Compare prices on DiscoverCars',
      }
  }
}

/* ─────────────────────────────────────────────────────────────
   MAIN COMPONENT
   ───────────────────────────────────────────────────────────── */

export default function DiscoverCarsCard({
  userData,
  itinerary,
  locations,
}: DiscoverCarsCardProps) {
  const { copy } = useMemo(() => {
    const destinations = extractRouteDestinations(itinerary, locations)
    const tripType = detectTripType(userData, destinations)
    const firstDest = destinations[0] || ''
    return { copy: getCardCopy(tripType, firstDest) }
  }, [userData, itinerary, locations])

  return (
    <div
      className="my-8 rounded-2xl overflow-hidden border shadow-sm"
      style={{
        background: '#FFFFFF',
        borderColor: '#E6DAD1',
      }}
    >
      {/* Top stripe with brand accent */}
      <div className="px-6 pt-5 pb-2 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl flex-shrink-0" aria-hidden="true">🚗</span>
          <p className="text-[11px] font-bold tracking-wider uppercase m-0 text-[#180204]/50"
            style={{ letterSpacing: '0.08em' }}>
            Car Rental
          </p>
        </div>
        <span className="text-[11px] text-[#180204]/40">
          via DiscoverCars
        </span>
      </div>

      {/* Headline + body */}
      <div className="px-6 pb-5">
        <h3
          className="text-[20px] text-[#180204] m-0 mb-2 leading-tight"
          style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
        >
          {copy.headline}
        </h3>
        <p className="text-[14px] text-[#180204]/70 m-0 leading-relaxed mb-4">
          {copy.subhead}
        </p>

        {/* Trust micro-bullets */}
        <div className="flex flex-wrap gap-2 mb-5">
          {['Free cancellation', '800+ providers', 'Full insurance'].map((label) => (
            <span
              key={label}
              className="text-[11px] px-2.5 py-1 rounded-full"
              style={{
                background: '#FAF6F3',
                color: '#180204',
                border: '1px solid #E6DAD1',
              }}
            >
              {label}
            </span>
          ))}
        </div>

        {/* CTA */}
        <a
          href={DISCOVER_CARS_URL}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-[14px] transition-all hover:shadow-md"
          style={{
            background: '#FF5635',
            color: '#FFFFFF',
          }}
        >
          <span>{copy.cta}</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   ROUTE EXTRACTION (shared with Guide's Corner — same logic)
   ───────────────────────────────────────────────────────────── */

function extractRouteDestinations(
  itinerary: string,
  locations: DiscoverCarsCardProps['locations']
): string[] {
  const routeMatch = itinerary.match(/##\s*Your Route\s*\n([\s\S]+?)(?:\n##|\n###|$)/i)

  if (routeMatch && routeMatch[1]) {
    const routeLine = routeMatch[1].trim().split('\n')[0]
    const destinations = routeLine
      .split(/[→➜>\u2192]/)
      .map((part) => part.replace(/\([^)]*\)/g, '').trim())
      .filter(Boolean)

    if (destinations.length > 0) return destinations
  }

  // Fallback: deduplicate from extracted locations
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
