import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Lazy initialization - only create client when actually used
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

// Database types (based on your schema)
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
