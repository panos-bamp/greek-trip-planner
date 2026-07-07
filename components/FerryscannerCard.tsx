'use client'

/**
 * FerryscannerCard — adaptive ferry booking affiliate card.
 *
 * Always renders. Adapts headline and copy based on:
 *   - userData.regionPreference (islands / mainland / both)
 *   - Extracted destinations from the itinerary
 *
 * URL is the static, pre-tracked Ferryscanner short link:
 *   https://fas.st/t/4tMSDaRg
 *
 * Placement: after DiscoverCarsCard in the "Transport Between Destinations"
 * section. Complements car rental (land) with ferries (sea).
 *
 * Visual: blue accent (#2C73FF) — matches your existing ferryscanner_card.html
 * design, differentiating from DiscoverCars' coral CTA.
 */

import { useMemo } from 'react'
import { ExternalLink } from 'lucide-react'

interface FerryscannerCardProps {
  userData: any
  itinerary: string
  locations: Array<{ name: string; type?: string; day?: number }>
}

const FERRYSCANNER_URL = 'https://fas.st/t/4tMSDaRg'

/* ─────────────────────────────────────────────────────────────
   TRIP-TYPE DETECTION
   ───────────────────────────────────────────────────────────── */

type TripType =
  | 'multi-island-cyclades'   // 2+ Cyclades islands
  | 'ionian-hopping'           // Ionian islands
  | 'athens-plus-islands'      // Piraeus gateway trip
  | 'sporades-saronic'         // Sporades or Saronic Gulf
  | 'crete-focused'            // Crete-heavy; ferries still useful for Peloponnese connections
  | 'mainland-only'            // Athens/Peloponnese/Meteora; ferries useful for future planning
  | 'mixed'                    // Fallback

const CYCLADES = new Set([
  'Santorini', 'Mykonos', 'Naxos', 'Paros', 'Milos', 'Ios', 'Folegandros',
  'Amorgos', 'Sifnos', 'Serifos', 'Andros', 'Tinos', 'Syros', 'Kea',
  'Kythnos', 'Antiparos', 'Koufonisia', 'Anafi', 'Iraklia', 'Donoussa',
])

const IONIAN = new Set([
  'Corfu', 'Kefalonia', 'Zakynthos', 'Lefkada', 'Ithaca', 'Paxos',
])

const SPORADES = new Set([
  'Skiathos', 'Skopelos', 'Alonissos', 'Skyros',
])

const SARONIC = new Set([
  'Hydra', 'Aegina', 'Poros', 'Spetses', 'Agistri',
])

const CRETE_HUBS = new Set([
  'Crete', 'Heraklion', 'Chania', 'Rethymno', 'Agios Nikolaos', 'Sitia', 'Elounda',
])

const MAINLAND_HUBS = new Set([
  'Athens', 'Thessaloniki', 'Meteora', 'Delphi', 'Nafplio', 'Olympia',
  'Monemvasia', 'Kalamata', 'Mystras', 'Volos',
])

function detectTripType(userData: any, destinations: string[]): TripType {
  const regionPref = userData?.regionPreference || 'both'

  const cycladesCount = destinations.filter((d) => CYCLADES.has(d)).length
  const ionianCount = destinations.filter((d) => IONIAN.has(d)).length
  const sporadesSaronicCount = destinations.filter(
    (d) => SPORADES.has(d) || SARONIC.has(d)
  ).length
  const hasCrete = destinations.some((d) => CRETE_HUBS.has(d))
  const mainlandCount = destinations.filter((d) => MAINLAND_HUBS.has(d)).length
  const hasAthens = destinations.includes('Athens')

  // 2+ Cyclades → strongest ferry story
  if (cycladesCount >= 2) return 'multi-island-cyclades'

  // Ionian hopping
  if (ionianCount >= 2) return 'ionian-hopping'

  // Athens + at least one island → Piraeus is the story
  if (hasAthens && (cycladesCount >= 1 || sporadesSaronicCount >= 1 || ionianCount >= 1)) {
    return 'athens-plus-islands'
  }

  // Sporades or Saronic focus
  if (sporadesSaronicCount >= 1) return 'sporades-saronic'

  // Crete
  if (hasCrete) return 'crete-focused'

  // Mainland only (no islands at all)
  if (mainlandCount >= 2 || regionPref === 'mainland') return 'mainland-only'

  return 'mixed'
}

/* ─────────────────────────────────────────────────────────────
   COPY VARIANTS
   Adapts the headline + subhead to the trip type. Always shows —
   even mainland-only travellers may want to see ferry options for
   day trips (Saronic Gulf from Athens, e.g.) or future planning.
   ───────────────────────────────────────────────────────────── */

interface CardCopy {
  headline: string
  subhead: string
  bullets: string[]
  cta: string
}

function getCardCopy(tripType: TripType, destinations: string[]): CardCopy {
  const firstIsland = destinations.find(
    (d) => CYCLADES.has(d) || IONIAN.has(d) || SPORADES.has(d) || SARONIC.has(d)
  )

  switch (tripType) {
    case 'multi-island-cyclades':
      return {
        headline: 'Ferries are your Cyclades highway',
        subhead:
          'Multiple islands means multiple crossings — book them together and lock in seats before summer routes sell out. Fast catamarans, conventional boats, all operators in one search.',
        bullets: [
          'Every Greek operator in one search',
          'Live prices & seat availability',
          'Book multiple legs together',
          'Sells out fast in July–August',
        ],
        cta: 'Search Cyclades ferries',
      }

    case 'ionian-hopping':
      return {
        headline: 'Ionian ferry routes made simple',
        subhead:
          'Corfu, Kefalonia, Zakynthos — the Ionian ferries are less frequent than the Cyclades, so timing matters. Compare all operators, see live availability, book multiple legs.',
        bullets: [
          'Every Ionian operator in one search',
          'Live schedules & prices',
          'Multi-leg bookings together',
          'Book ahead — routes are less frequent',
        ],
        cta: 'Search Ionian ferries',
      }

    case 'athens-plus-islands':
      return {
        headline: firstIsland
          ? `Piraeus → ${firstIsland} and back`
          : 'Ferries from Piraeus',
        subhead:
          'Piraeus is the busiest passenger port in Europe. Compare fast (2–5 hrs) vs conventional (5–8 hrs) sailings across all operators, and secure seats before summer sells out.',
        bullets: [
          'All Piraeus operators in one search',
          'Fast vs conventional side-by-side',
          'Live prices & availability',
          'Instant mobile tickets',
        ],
        cta: 'Search Piraeus ferries',
      }

    case 'sporades-saronic':
      return {
        headline: 'Compare ferry routes to nearby islands',
        subhead:
          'Whether it\'s the Saronic hop from Piraeus or the Sporades from Volos, ferry schedules change with the season. Get live availability and book across all operators.',
        bullets: [
          'Every operator in one search',
          'Seasonal schedule accuracy',
          'Instant mobile tickets',
          'Book multiple legs together',
        ],
        cta: 'Search ferries',
      }

    case 'crete-focused':
      return {
        headline: 'Considering a Peloponnese add-on?',
        subhead:
          'Crete rewards focus, but if you have extra days, the ferry from Chania or Heraklion to the Peloponnese opens up Monemvasia and the Mani. Worth checking availability.',
        bullets: [
          'Crete → Peloponnese overnight routes',
          'Chania & Heraklion departures',
          'Live seat availability',
          'Book cabins in advance',
        ],
        cta: 'Search ferries from Crete',
      }

    case 'mainland-only':
      return {
        headline: 'Day-trip to the Saronic islands?',
        subhead:
          'Even a mainland-focused trip can spare a day for Aegina, Hydra, or Poros — the Saronic Gulf hydrofoils leave Piraeus every hour and get you back by dinner.',
        bullets: [
          'Hourly hydrofoils from Piraeus',
          'Round-trip in a single day',
          'Live prices & availability',
          'No advance booking needed off-season',
        ],
        cta: 'Search Saronic ferries',
      }

    case 'mixed':
    default:
      return {
        headline: 'Need a ferry for any leg?',
        subhead:
          'Compare every operator on every Greek route in one search — fast catamarans, conventional boats, seasonal timings. Instant mobile tickets, no queue at the port.',
        bullets: [
          'Every Greek operator in one search',
          'Live prices & seat availability',
          'Book multiple legs together',
          'Instant tickets on your phone',
        ],
        cta: 'Search Greek ferries',
      }
  }
}

/* ─────────────────────────────────────────────────────────────
   MAIN COMPONENT
   ───────────────────────────────────────────────────────────── */

export default function FerryscannerCard({
  userData,
  itinerary,
  locations,
}: FerryscannerCardProps) {
  const { copy } = useMemo(() => {
    const destinations = extractRouteDestinations(itinerary, locations)
    const tripType = detectTripType(userData, destinations)
    return { copy: getCardCopy(tripType, destinations) }
  }, [userData, itinerary, locations])

  return (
    <div
      className="my-8 rounded-2xl overflow-hidden border shadow-sm"
      style={{
        background: '#FAF6F3',
        borderColor: '#E0D8D3',
        borderLeft: '5px solid #2C73FF',
      }}
    >
      {/* Top stripe with brand accent */}
      <div className="px-6 pt-5 pb-2 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl flex-shrink-0" aria-hidden="true">⛴️</span>
          <p
            className="text-[11px] font-bold tracking-wider uppercase m-0 text-[#180204]/50"
            style={{ letterSpacing: '0.08em' }}
          >
            Ferry Booking
          </p>
        </div>
        <span className="text-[11px] text-[#180204]/40">via Ferryscanner</span>
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

        {/* 2-col bullet grid — matches your ferryscanner_card.html design */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-2 mb-5">
          {copy.bullets.map((bullet) => (
            <div key={bullet} className="flex items-center gap-2 text-[13px] text-[#180204]/80">
              <span
                className="inline-flex items-center justify-center w-[18px] h-[18px] rounded-full flex-shrink-0"
                style={{ background: '#EBF1FF' }}
                aria-hidden="true"
              >
                <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                  <polyline
                    points="1.5,5 4,7.5 8.5,2.5"
                    stroke="#2C73FF"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span>{bullet}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <a
          href={FERRYSCANNER_URL}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-[14px] transition-all hover:shadow-md"
          style={{
            background: '#2C73FF',
            color: '#FFFFFF',
          }}
        >
          <span>⛴️</span>
          <span>{copy.cta}</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   ROUTE EXTRACTION (shared pattern with other adaptive cards)
   ───────────────────────────────────────────────────────────── */

function extractRouteDestinations(
  itinerary: string,
  locations: FerryscannerCardProps['locations']
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
