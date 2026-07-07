import { NextRequest, NextResponse } from 'next/server'
import { generateItinerary } from '@/lib/claude'
import { supabaseAdmin } from '@/lib/supabase'
import { postprocessItinerary } from '@/lib/itinerary-postprocess'

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
    if (supabaseAdmin) {
      console.log('API: Fetching from Supabase...')

      const destResult = await supabaseAdmin
        .from('destinations')
        .select('*')
        .limit(10)
      destinations = destResult.data
      if (destResult.error) console.error('Destinations error:', destResult.error)

      // Tours/activities — broaden the fetch so we feed the AI rich context
      // about every destination that has data, not just 20 random rows.
      const expResult = await supabaseAdmin
        .from('experiences')
        .select('id, destination_id, name, type, cost_eur, vibe_tags, rating')
        .order('rating', { ascending: false })
        .limit(60)
      experiences = expResult.data
      if (expResult.error) console.error('Experiences error:', expResult.error)

      const logResult = await supabaseAdmin
        .from('logistics')
        .select('*')
        .limit(15)
      logistics = logResult.data
      if (logResult.error) console.error('Logistics error:', logResult.error)

      // Accommodations — fetch broadly so the AI sees every covered destination.
      // The price filter that was here before was too aggressive and hid useful
      // data from the prompt. The post-processor picks the right hotel anyway.
      const accResult = await supabaseAdmin
        .from('accommodations')
        .select('id, destination_id, name, type, price_per_night_eur, rating')
        .order('rating', { ascending: false })
        .limit(40)
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

    // Generate itinerary using Claude (works with or without Supabase data).
    // The AI emits placeholders like [HOTEL_LINK:athens] and [TOUR_LINK:milos:beach]
    // which we resolve in the post-processing step.
    console.log('API: Calling Claude AI...')
    const rawItinerary = await generateItinerary(answers, {
      destinations,
      experiences,
      logistics,
      accommodations,
    })

    console.log('API: Generated raw itinerary length:', rawItinerary?.length || 0)

    // Generate unique ID for this itinerary (used as TravelPayouts sub_id too)
    const id = Math.random().toString(36).substring(2, 10)

    // Post-process: replace [HOTEL_LINK:xxx] / [TOUR_LINK:xxx:yyy] placeholders
    // with deep-linked, TravelPayouts-tracked affiliate URLs.
    let itinerary = rawItinerary
    try {
      itinerary = await postprocessItinerary(rawItinerary, `itinerary-${id}`)
      console.log('API: Post-processed itinerary length:', itinerary?.length || 0)
    } catch (err) {
      // If post-processing fails entirely, return the raw output —
      // user still gets their itinerary, links just won't be tracked.
      console.error('API: Post-processing failed, returning raw output:', err)
    }

    // Persist to Supabase so the itinerary can be viewed on any device
    // (shared links, "open on my phone", or later PDF/email delivery).
    // Failure here is non-blocking — the user still gets their itinerary,
    // it just won't be viewable outside their current browser session.
    if (supabaseAdmin) {
      try {
        const { error: insertError } = await supabaseAdmin
          .from('itineraries')
          .insert({
            id,
            first_name: answers?.firstName ?? null,
            itinerary_markdown: itinerary,
            answers_json: answers,
          })
        if (insertError) {
          console.error('API: Persistence insert failed:', insertError.message)
        } else {
          console.log('API: Persisted itinerary', id)
        }
      } catch (err) {
        console.error('API: Persistence exception:', err)
      }
    }

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
