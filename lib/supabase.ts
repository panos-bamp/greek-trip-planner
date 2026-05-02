import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

// ─────────────────────────────────────────────────────────────
// PUBLIC (ANON) CLIENT — unchanged from before
// Used in client components and any code path that respects RLS.
// Safe to expose: NEXT_PUBLIC_* values are visible in the browser.
// ─────────────────────────────────────────────────────────────

let _supabase: SupabaseClient | null = null

export const getSupabase = () => {
  // Return null if credentials not configured (silent failure)
  if (!supabaseUrl || !supabaseAnonKey || 
      supabaseUrl.includes('your_') || supabaseAnonKey.includes('your_')) {
    return null
  }
  
  if (!_supabase) {
    try {
      _supabase = createClient(supabaseUrl, supabaseAnonKey)
    } catch (error) {
      // Silent failure - Supabase is optional
      return null
    }
  }
  
  return _supabase
}

// For backwards compatibility
export const supabase = getSupabase()

// ─────────────────────────────────────────────────────────────
// ADMIN (SERVICE ROLE) CLIENT — new
// Bypasses Row Level Security. SERVER-SIDE ONLY.
// NEVER import this in client components or anywhere bundled to
// the browser — it would expose the service role key.
//
// Use cases:
//   - API routes (app/api/*)
//   - Server components
//   - Server-only library code (e.g. itinerary-postprocess)
//
// If SUPABASE_SERVICE_ROLE_KEY is missing, falls back to the anon
// client so the app keeps working (queries may return less data
// when RLS is enabled, but it won't crash).
// ─────────────────────────────────────────────────────────────

let _supabaseAdmin: SupabaseClient | null = null

export const getSupabaseAdmin = () => {
  // Validate URL is present
  if (!supabaseUrl || supabaseUrl.includes('your_')) {
    return null
  }

  // Prefer the service role key; fall back to anon if missing
  const key = supabaseServiceKey && !supabaseServiceKey.includes('your_')
    ? supabaseServiceKey
    : supabaseAnonKey

  if (!key) return null

  if (!_supabaseAdmin) {
    try {
      _supabaseAdmin = createClient(supabaseUrl, key, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      })
    } catch (error) {
      return null
    }
  }

  return _supabaseAdmin
}

// Convenience export — null-safe; consumers should still handle the null case
export const supabaseAdmin = getSupabaseAdmin()

// ─────────────────────────────────────────────────────────────
// DATABASE TYPES
// ─────────────────────────────────────────────────────────────

export interface Destination {
  id: string
  name: string
  type: string
  ideal_days: string
  best_season: string[]
  vibe_tags: string[]
  budget_level: string
  airport_code: string | null
  ferry_port: string | null
  description: string
  insider_tips: string[]
  created_at: string
}

export interface Experience {
  id: number
  destination_id: string
  name: string
  type: string
  duration: string | null
  cost_eur: number | null
  vibe_tags: string[]
  booking_url: string | null
  affiliate_commission_rate: number | null
  rating: number | null
  description: string
  insider_tip: string | null
  created_at: string
}

export interface Logistics {
  id: number
  from_destination: string
  to_destination: string
  transport_type: string
  duration_hours: number | null
  frequency: string | null
  cost_range_min: number | null
  cost_range_max: number | null
  booking_url: string | null
  seasons: string[] | null
  same_day_possible: boolean | null
  notes: string | null
  created_at: string
}

export interface Accommodation {
  id: number
  destination_id: string
  name: string
  type: string
  price_tier: string
  price_per_night_eur: number | null
  location: string | null
  booking_url: string | null
  affiliate_commission_rate: number | null
  rating: number | null
  best_for: string[] | null
  created_at: string
}
