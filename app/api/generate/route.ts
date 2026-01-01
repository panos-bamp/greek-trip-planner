import { NextRequest, NextResponse } from 'next/server'
import { generateItinerary } from '@/lib/claude'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    console.log('API: Received request')
    const answers = await request.json()
    console.log('API: Parsed answers:', answers)

    let destinations = null
    let experiences = null
    let logistics = null
    let accommodations = null

    // Only fetch from Supabase if it's configured
    if (supabase) {
      console.log('API: Fetching from Supabase...')
      
      const destResult = await supabase
        .from('destinations')
        .select('*')
        .limit(10)
      destinations = destResult.data
      if (destResult.error) console.error('Destinations error:', destResult.error)

      const expResult = await supabase
        .from('experiences')
        .select('*')
        .limit(20)
      experiences = expResult.data
      if (expResult.error) console.error('Experiences error:', expResult.error)

      const logResult = await supabase
        .from('logistics')
        .select('*')
        .limit(15)
      logistics = logResult.data
      if (logResult.error) console.error('Logistics error:', logResult.error)

      const accResult = await supabase
        .from('accommodations')
        .select('*')
        .gte('price_per_night_eur', answers.budget * 0.3)
        .lte('price_per_night_eur', answers.budget * 0.6)
        .limit(10)
      accommodations = accResult.data
      if (accResult.error) console.error('Accommodations error:', accResult.error)

      console.log('API: Fetched data from Supabase:', {
        destinations: destinations?.length || 0,
        experiences: experiences?.length || 0,
        logistics: logistics?.length || 0,
        accommodations: accommodations?.length || 0,
      })
    } else {
      console.log('API: Supabase not configured, using AI knowledge only')
    }

    // Generate itinerary using Claude (works with or without Supabase data)
    console.log('API: Calling Claude AI...')
    const itinerary = await generateItinerary(answers, {
      destinations,
      experiences,
      logistics,
      accommodations,
    })

    console.log('API: Generated itinerary length:', itinerary?.length || 0)

    // Generate unique ID for this itinerary
    const id = Math.random().toString(36).substring(7)

    const result = {
      id,
      itinerary,
      answers,
    }

    console.log('API: Returning result with ID:', id)
    return NextResponse.json(result)

  } catch (error) {
    console.error('API ERROR:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { error: 'Failed to generate itinerary', details: errorMessage },
      { status: 500 }
    )
  }
}
