'use client'

/**
 * /my-trips — personal list of saved itineraries.
 *
 * Purely client-side: reads from localStorage keys populated by the "Save"
 * button on results pages. No auth, no backend, no sync across devices —
 * intentionally minimal for the initial ship. Cross-device access will come
 * later via email magic links (a separate feature).
 *
 * Storage schema (both keys managed together):
 *
 *   localStorage["gtp:saved-trips"] = string[]
 *     — ordered list of itinerary IDs, newest first.
 *
 *   localStorage["gtp:saved-trips-meta"] = Record<id, TripMeta>
 *     — cached preview data so we can render the list instantly
 *       without hitting Supabase for every entry.
 */

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ArrowLeft, MapPin, Calendar, Users, Euro, Trash2, Sparkles, Bookmark } from 'lucide-react'

interface TripMeta {
  id: string
  savedAt: string
  firstName: string | null
  duration: string | null
  travelWith: string | null
  budget: number | null
  month: string | null
  route: string | null
}

export default function MyTripsPage() {
  const router = useRouter()
  const [trips, setTrips] = useState<TripMeta[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load the saved trips index from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem('gtp:saved-trips')
      const ids: string[] = raw ? JSON.parse(raw) : []
      const metasRaw = localStorage.getItem('gtp:saved-trips-meta')
      const metas: Record<string, TripMeta> = metasRaw ? JSON.parse(metasRaw) : {}
      const list = ids
        .map((id) => metas[id])
        .filter((m): m is TripMeta => Boolean(m))
      setTrips(list)
    } catch {
      // localStorage blocked (Safari private, quota, etc.) — empty state
      setTrips([])
    }
    setIsLoaded(true)
  }, [])

  const handleRemove = (id: string) => {
    try {
      const raw = localStorage.getItem('gtp:saved-trips')
      const ids: string[] = raw ? JSON.parse(raw) : []
      const nextIds = ids.filter((x) => x !== id)
      const metasRaw = localStorage.getItem('gtp:saved-trips-meta')
      const metas: Record<string, TripMeta> = metasRaw ? JSON.parse(metasRaw) : {}
      delete metas[id]
      localStorage.setItem('gtp:saved-trips', JSON.stringify(nextIds))
      localStorage.setItem('gtp:saved-trips-meta', JSON.stringify(metas))
      setTrips((prev) => prev.filter((t) => t.id !== id))
    } catch { /* ignore */ }
  }

  return (
    <div className="min-h-screen bg-[color:var(--p-ground)]">
      {/* Header */}
      <header className="bg-white border-b border-[color:var(--p-line)] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/')}
              className="p-2 hover:bg-[color:var(--p-ground)] rounded-xl transition-colors"
              aria-label="Back to home"
            >
              <ArrowLeft className="w-5 h-5 text-[color:var(--p-ink)]/60" />
            </button>
            <Link href="/" className="flex items-center">
              <Image src="/logo.png" alt="Greek Trip Planner" width={60} height={18} />
            </Link>
            <div className="hidden sm:block h-5 w-px bg-[color:var(--p-line)] mx-1" />
            <div className="hidden sm:flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-[color:var(--p-accent-text)]" />
              <h1
                className="text-sm font-semibold text-[color:var(--p-ink)]"
                style={{ fontFamily: "var(--p-serif)" }}
              >
                My Trips
              </h1>
            </div>
          </div>

          <Link
            href="/ai-trip-planner"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[color:var(--p-action)] text-[color:var(--p-on-action)] rounded-full text-xs font-semibold hover:bg-[color:var(--p-action-hover)] transition"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>New trip</span>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-10 md:py-14">
        {/* Page title */}
        <div className="mb-8 md:mb-10">
          <h2
            className="text-3xl md:text-4xl text-[color:var(--p-ink)] leading-tight"
            style={{ fontFamily: "var(--p-serif)" }}
          >
            Your saved trips
          </h2>
          <p className="text-[15px] text-[color:var(--p-ink)]/60 mt-2 leading-relaxed">
            Every itinerary you save is listed here. Saved to this device only for now.
          </p>
        </div>

        {/* Empty state */}
        {isLoaded && trips.length === 0 && (
          <div className="bg-white border border-[color:var(--p-line)] rounded-2xl p-8 md:p-12 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[color:var(--p-ground)] mb-4">
              <Bookmark className="w-6 h-6 text-[color:var(--p-accent-text)]" />
            </div>
            <h3
              className="text-xl text-[color:var(--p-ink)] mb-2"
              style={{ fontFamily: "var(--p-serif)" }}
            >
              No saved trips yet
            </h3>
            <p className="text-sm text-[color:var(--p-ink)]/60 mb-6 max-w-md mx-auto leading-relaxed">
              Generate a Greek trip itinerary and hit the <span className="font-semibold text-[color:var(--p-ink)]">Save</span> button
              on the results page to see it here.
            </p>
            <Link
              href="/ai-trip-planner"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[color:var(--p-action)] text-[color:var(--p-on-action)] rounded-full font-semibold text-sm hover:bg-[color:var(--p-action-hover)] transition"
            >
              <Sparkles className="w-4 h-4" />
              Plan my Greek trip
            </Link>
          </div>
        )}

        {/* Trip cards */}
        {isLoaded && trips.length > 0 && (
          <div className="space-y-4">
            {trips.map((trip) => (
              <TripCard key={trip.id} trip={trip} onRemove={() => handleRemove(trip.id)} />
            ))}
          </div>
        )}

        {/* Loading placeholder */}
        {!isLoaded && (
          <div className="space-y-4">
            {[1, 2].map((n) => (
              <div key={n} className="bg-white border border-[color:var(--p-line)] rounded-2xl p-6 animate-pulse">
                <div className="h-4 w-40 bg-[color:var(--p-ground)] rounded mb-3" />
                <div className="h-3 w-full max-w-md bg-[color:var(--p-ground)] rounded mb-2" />
                <div className="h-3 w-3/4 bg-[color:var(--p-ground)] rounded" />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   TRIP CARD
   ───────────────────────────────────────────────────────────── */

function TripCard({ trip, onRemove }: { trip: TripMeta; onRemove: () => void }) {
  const savedDate = formatSavedDate(trip.savedAt)
  const title = trip.firstName
    ? `${trip.firstName}'s ${trip.duration || ''}-Day Greek Trip`.replace(/-\s*-/, '-').trim()
    : `${trip.duration || ''}-Day Greek Trip`.trim()

  return (
    <div className="bg-white border border-[color:var(--p-line)] rounded-2xl p-5 md:p-6 hover:shadow-md transition-shadow group">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1 min-w-0">
          <h3
            className="text-lg text-[color:var(--p-ink)] leading-snug"
            style={{ fontFamily: "var(--p-serif)" }}
          >
            {title || 'Your Greek Trip'}
          </h3>
          <p className="text-[11px] text-[color:var(--p-ink)]/40 mt-0.5">
            Saved {savedDate}
          </p>
        </div>
        <button
          onClick={onRemove}
          className="p-1.5 text-[color:var(--p-ink)]/30 hover:text-[color:var(--p-accent-text)] hover:bg-[color:var(--p-ground)] rounded-lg transition opacity-0 group-hover:opacity-100 focus:opacity-100"
          aria-label="Remove from My Trips"
          title="Remove from My Trips"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Route preview */}
      {trip.route && (
        <div className="flex items-start gap-2 mb-4">
          <MapPin className="w-3.5 h-3.5 text-[color:var(--p-accent-text)] mt-1 flex-shrink-0" />
          <p className="text-sm text-[color:var(--p-ink)]/80 leading-relaxed line-clamp-2">
            {trip.route}
          </p>
        </div>
      )}

      {/* Meta chips */}
      <div className="flex flex-wrap gap-2 mb-4">
        {trip.duration && (
          <span className="inline-flex items-center gap-1 text-[11px] text-[color:var(--p-ink)]/60 bg-[color:var(--p-ground)] rounded-full px-2.5 py-1">
            <Calendar className="w-3 h-3" />
            {trip.duration} days
          </span>
        )}
        {trip.travelWith && (
          <span className="inline-flex items-center gap-1 text-[11px] text-[color:var(--p-ink)]/60 bg-[color:var(--p-ground)] rounded-full px-2.5 py-1">
            <Users className="w-3 h-3" />
            {trip.travelWith}
          </span>
        )}
        {trip.budget && (
          <span className="inline-flex items-center gap-1 text-[11px] text-[color:var(--p-ink)]/60 bg-[color:var(--p-ground)] rounded-full px-2.5 py-1">
            <Euro className="w-3 h-3" />
            €{trip.budget}/day
          </span>
        )}
        {trip.month && (
          <span className="inline-flex items-center gap-1 text-[11px] text-[color:var(--p-ink)]/60 bg-[color:var(--p-ground)] rounded-full px-2.5 py-1">
            {trip.month}
          </span>
        )}
      </div>

      {/* CTA */}
      <Link
        href={`/results/${trip.id}`}
        className="inline-flex items-center gap-1.5 px-4 py-2 bg-[color:var(--p-ink)] text-white rounded-full text-xs font-semibold hover:bg-[color:var(--p-ink)]/90 transition"
      >
        Open itinerary
        <span aria-hidden="true">→</span>
      </Link>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   HELPERS
   ───────────────────────────────────────────────────────────── */

function formatSavedDate(iso: string): string {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const diffMin = Math.floor(diffMs / 60000)
  if (diffMin < 1) return 'just now'
  if (diffMin < 60) return `${diffMin}m ago`
  const diffHr = Math.floor(diffMin / 60)
  if (diffHr < 24) return `${diffHr}h ago`
  const diffDay = Math.floor(diffHr / 24)
  if (diffDay < 7) return `${diffDay}d ago`
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}
