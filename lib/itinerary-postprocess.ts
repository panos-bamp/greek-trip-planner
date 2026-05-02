/**
 * Itinerary post-processor.
 *
 * The AI generates itineraries with placeholder tokens like:
 *   [HOTEL_LINK:athens]
 *   [TOUR_LINK:zakynthos:beach]
 *
 * This module:
 *   1. Detects every placeholder in the AI output
 *   2. Queries Supabase for matching rows (highest-rated wins)
 *   3. Falls back to AI-generated search URLs when no Supabase match exists
 *   4. Wraps all URLs through TravelPayouts API in a single batch call
 *   5. Replaces placeholders with rendered markdown links
 *
 * The renderer in /results/[id]/page.tsx already detects [text](url) markdown
 * patterns and styles them by domain, so this just needs to output that format.
 */

import { supabase } from '@/lib/supabase'
import { getAffiliateLinks } from '@/lib/travelpayouts'

/* ─────────────────────────────────────────────────────────────
   PLACEHOLDER PATTERNS
   ───────────────────────────────────────────────────────────── */

// [HOTEL_LINK:destination_id]
const HOTEL_PATTERN = /\[HOTEL_LINK:([a-z0-9_-]+)\]/gi

// [TOUR_LINK:destination_id:vibe_hint] — vibe_hint is optional
const TOUR_PATTERN = /\[TOUR_LINK:([a-z0-9_-]+)(?::([a-z0-9_,-]+))?\]/gi

/* ─────────────────────────────────────────────────────────────
   TYPES
   ───────────────────────────────────────────────────────────── */

interface AccommodationRow {
  id: number
  destination_id: string
  name: string
  type: string | null
  price_per_night_eur: number | null
  booking_url: string | null
  rating: number | null
}

interface ExperienceRow {
  id: number
  destination_id: string
  name: string
  type: string | null
  cost_eur: number | null
  vibe_tags: string[] | null
  booking_url: string | null
  rating: number | null
}

interface PlaceholderMatch {
  fullMatch: string         // e.g. "[HOTEL_LINK:athens]"
  kind: 'hotel' | 'tour'
  destinationId: string     // e.g. "athens"
  vibeHint?: string         // tour only — comma-separated
}

interface ResolvedLink {
  rawUrl: string            // before TP wrapping
  displayName: string       // markdown link text
}

/* ─────────────────────────────────────────────────────────────
   PUBLIC API
   ───────────────────────────────────────────────────────────── */

/**
 * Process an AI-generated itinerary by replacing all affiliate placeholders
 * with real, tracked, deep-link markdown.
 *
 * @param itinerary  Raw markdown string from Claude
 * @param subId      Optional sub_id for TravelPayouts tracking (e.g. itinerary ID)
 * @returns Final markdown string with all links resolved
 */
export async function postprocessItinerary(
  itinerary: string,
  subId?: string
): Promise<string> {
  // Step 1: Find all placeholders
  const placeholders = extractPlaceholders(itinerary)
  if (placeholders.length === 0) return itinerary

  // Step 2: Resolve each placeholder to a raw URL + display name
  // (uses Supabase for deep links, falls back to search URLs)
  const resolutions = await resolvePlaceholders(placeholders)

  // Step 3: Wrap all raw URLs through TravelPayouts in one batch
  const allRawUrls = Array.from(resolutions.values()).map((r) => r.rawUrl)
  const trackedMap = await getAffiliateLinks(allRawUrls, subId)

  // Step 4: Replace each placeholder with rendered markdown
  let result = itinerary
  resolutions.forEach((resolution, fullMatch) => {
    const trackedUrl = trackedMap.get(resolution.rawUrl) ?? resolution.rawUrl
    const markdown = `[${resolution.displayName}](${trackedUrl})`
    // Replace the FIRST occurrence (placeholders may repeat — handle each one)
    result = result.replace(fullMatch, markdown)
  })

  // Some placeholders may appear multiple times — re-run replacement for any leftovers
  resolutions.forEach((resolution, fullMatch) => {
    const trackedUrl = trackedMap.get(resolution.rawUrl) ?? resolution.rawUrl
    const markdown = `[${resolution.displayName}](${trackedUrl})`
    result = result.split(fullMatch).join(markdown)
  })

  return result
}

/* ─────────────────────────────────────────────────────────────
   STEP 1: EXTRACT PLACEHOLDERS
   ───────────────────────────────────────────────────────────── */

function extractPlaceholders(itinerary: string): PlaceholderMatch[] {
  const matches: PlaceholderMatch[] = []
  const seen = new Set<string>() // dedupe identical placeholders

  // Hotels
  let m: RegExpExecArray | null
  HOTEL_PATTERN.lastIndex = 0
  while ((m = HOTEL_PATTERN.exec(itinerary)) !== null) {
    const fullMatch = m[0]
    if (seen.has(fullMatch)) continue
    seen.add(fullMatch)
    matches.push({
      fullMatch,
      kind: 'hotel',
      destinationId: m[1].toLowerCase(),
    })
  }

  // Tours
  TOUR_PATTERN.lastIndex = 0
  while ((m = TOUR_PATTERN.exec(itinerary)) !== null) {
    const fullMatch = m[0]
    if (seen.has(fullMatch)) continue
    seen.add(fullMatch)
    matches.push({
      fullMatch,
      kind: 'tour',
      destinationId: m[1].toLowerCase(),
      vibeHint: m[2]?.toLowerCase(),
    })
  }

  return matches
}

/* ─────────────────────────────────────────────────────────────
   STEP 2: RESOLVE PLACEHOLDERS → RAW URL + DISPLAY NAME
   ───────────────────────────────────────────────────────────── */

async function resolvePlaceholders(
  placeholders: PlaceholderMatch[]
): Promise<Map<string, ResolvedLink>> {
  const result = new Map<string, ResolvedLink>()

  if (!supabase) {
    // No Supabase configured — fall back for everything
    placeholders.forEach((p) => {
      result.set(p.fullMatch, fallbackResolution(p))
    })
    return result
  }

  // Group by destination_id to minimize Supabase round-trips
  const hotelDests = new Set<string>()
  const tourDests = new Set<string>()
  placeholders.forEach((p) => {
    if (p.kind === 'hotel') hotelDests.add(p.destinationId)
    else tourDests.add(p.destinationId)
  })

  // Fetch all needed accommodations in one query
  const accommodationsByDest = new Map<string, AccommodationRow[]>()
  if (hotelDests.size > 0) {
    const { data, error } = await supabase
      .from('accommodations')
      .select('id, destination_id, name, type, price_per_night_eur, booking_url, rating')
      .in('destination_id', Array.from(hotelDests))
      .not('booking_url', 'is', null)
      .order('rating', { ascending: false })

    if (error) {
      console.error('[postprocess] Accommodations query error:', error.message)
    } else if (Array.isArray(data)) {
      data.forEach((row) => {
        const list = accommodationsByDest.get(row.destination_id) ?? []
        list.push(row as AccommodationRow)
        accommodationsByDest.set(row.destination_id, list)
      })
    }
  }

  // Fetch all needed experiences in one query
  const experiencesByDest = new Map<string, ExperienceRow[]>()
  if (tourDests.size > 0) {
    const { data, error } = await supabase
      .from('experiences')
      .select('id, destination_id, name, type, cost_eur, vibe_tags, booking_url, rating')
      .in('destination_id', Array.from(tourDests))
      .not('booking_url', 'is', null)
      .order('rating', { ascending: false })

    if (error) {
      console.error('[postprocess] Experiences query error:', error.message)
    } else if (Array.isArray(data)) {
      data.forEach((row) => {
        const list = experiencesByDest.get(row.destination_id) ?? []
        list.push(row as ExperienceRow)
        experiencesByDest.set(row.destination_id, list)
      })
    }
  }

  // Resolve each placeholder
  placeholders.forEach((p) => {
    if (p.kind === 'hotel') {
      const candidates = accommodationsByDest.get(p.destinationId) ?? []
      const picked = candidates[0] // already sorted by rating desc
      if (picked && picked.booking_url) {
        result.set(p.fullMatch, {
          rawUrl: picked.booking_url,
          displayName: `🏨 ${picked.name}`,
        })
      } else {
        result.set(p.fullMatch, fallbackResolution(p))
      }
    } else {
      const candidates = experiencesByDest.get(p.destinationId) ?? []
      const picked = pickBestTour(candidates, p.vibeHint)
      if (picked && picked.booking_url) {
        result.set(p.fullMatch, {
          rawUrl: picked.booking_url,
          displayName: `🎟️ ${picked.name}`,
        })
      } else {
        result.set(p.fullMatch, fallbackResolution(p))
      }
    }
  })

  return result
}

/**
 * For tours, optionally re-rank by vibe_hint match before falling back to rating.
 * The list is already sorted by rating desc, so we just look for vibe matches
 * in that order — first vibe match wins; otherwise the top-rated wins.
 */
function pickBestTour(
  candidates: ExperienceRow[],
  vibeHint?: string
): ExperienceRow | null {
  if (candidates.length === 0) return null
  if (!vibeHint) return candidates[0]

  const hints = vibeHint.split(',').map((h) => h.trim().toLowerCase()).filter(Boolean)
  if (hints.length === 0) return candidates[0]

  // First pass: find a candidate whose vibe_tags include any of the hints
  const matched = candidates.find((c) => {
    if (!Array.isArray(c.vibe_tags)) return false
    const tagsLower = c.vibe_tags.map((t) => String(t).toLowerCase())
    return hints.some((h) => tagsLower.includes(h))
  })

  return matched ?? candidates[0]
}

/* ─────────────────────────────────────────────────────────────
   FALLBACK: build search URL when no Supabase row exists
   ───────────────────────────────────────────────────────────── */

function fallbackResolution(p: PlaceholderMatch): ResolvedLink {
  // Capitalize destination_id for human-readable URLs / display
  const destDisplay = capitalize(p.destinationId.replace(/-/g, ' '))

  if (p.kind === 'hotel') {
    return {
      rawUrl: `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(destDisplay + ' Greece')}`,
      displayName: `🏨 Search hotels on Booking.com`,
    }
  }

  // Tour
  const queryParts = [destDisplay]
  if (p.vibeHint) {
    queryParts.unshift(p.vibeHint.split(',')[0].replace(/-/g, ' '))
  }
  return {
    rawUrl: `https://www.getyourguide.com/s/?q=${encodeURIComponent(queryParts.join(' '))}`,
    displayName: `🎟️ Find tours on GetYourGuide`,
  }
}

function capitalize(s: string): string {
  if (!s) return s
  return s
    .split(' ')
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(' ')
}
