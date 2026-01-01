import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY!,
})

export async function generateItinerary(answers: any, dbData: any) {
  const prompt = buildPrompt(answers, dbData)
  
  try {
    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4000,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    })

    return message.content[0].type === 'text' ? message.content[0].text : ''
  } catch (error) {
    console.error('Claude API Error:', error)
    throw new Error(`AI generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

function buildPrompt(answers: any, dbData: any): string {
  // Handle the data structure from the quiz
  const duration = answers.duration || '7-10'
  const month = answers.month || 'Summer'
  const budget = answers.budget || 150
  const interests = Array.isArray(answers.interests) ? answers.interests : []
  const dining = Array.isArray(answers.dining) ? answers.dining : []
  const accommodation = Array.isArray(answers.accommodation) ? answers.accommodation : []
  
  return `You are an expert Greece travel planner with deep local knowledge. Create a personalized ${duration}-day itinerary based on these preferences:

TRAVELER PROFILE:
- Name: ${answers.firstName} ${answers.lastName}
- Duration: ${duration} days
- Travel Month: ${month}
- Budget: €${budget}/day per person
- Travel Style: Adventure level ${answers.vacationStyle || 50}/100
- Interests: ${interests.length > 0 ? interests.join(', ') : 'General tourism'}
- Dining Preferences: ${dining.length > 0 ? dining.join(', ') : 'Variety'}
- Accommodation Style: ${accommodation.length > 0 ? accommodation.join(', ') : 'Mid-range'}
- Day Preference: ${answers.dayStart ? (answers.dayStart < 50 ? 'Early riser' : 'Night owl') : 'Flexible'}
- Outdoor vs Culture: ${answers.outdoorCulture || 'Balanced'}
- Attractions: ${answers.attractions ? (answers.attractions < 50 ? 'Popular spots' : 'Hidden gems') : 'Mix'}
- Traveling with: ${answers.travelWith || 'Solo'}

AVAILABLE DESTINATIONS (from database):
${dbData.destinations ? JSON.stringify(dbData.destinations.slice(0, 5), null, 2) : 'Athens, Santorini, Mykonos'}

AVAILABLE EXPERIENCES (from database):
${dbData.experiences ? JSON.stringify(dbData.experiences.slice(0, 10), null, 2) : 'Various tours and activities'}

LOGISTICS (from database):
${dbData.logistics ? JSON.stringify(dbData.logistics.slice(0, 5), null, 2) : 'Ferries and flights available'}

ACCOMMODATIONS (from database):
${dbData.accommodations ? JSON.stringify(dbData.accommodations.slice(0, 5), null, 2) : 'Hotels across price ranges'}

INSTRUCTIONS:
1. Create a realistic, day-by-day itinerary that matches their budget and interests
2. Include specific recommendations from the database when available
3. Factor in travel time between destinations
4. Add insider tips for each destination
5. Provide budget breakdown showing costs align with their €${budget}/day budget
6. Suggest best routes and transportation options
7. Mention seasonal considerations for ${month}

FORMAT YOUR RESPONSE AS:

# Your Perfect ${duration}-Day Greece Adventure

## Overview
[Brief intro tailored to their style]

## Recommended Route
[List destinations in order with days allocated]

## Day-by-Day Itinerary

### Day 1: [Location]
**Morning:** [Activity with approximate cost]
**Afternoon:** [Activity]
**Evening:** [Activity]
**Where to Stay:** [Hotel recommendation with price range]
**Insider Tip:** [Practical advice]
**Daily Budget:** €[breakdown]

[Repeat for each day]

## Total Budget Breakdown
- Accommodations: €[total]
- Experiences & Tours: €[total]
- Transportation: €[total]
- Food & Dining: €[total]
- **TOTAL: €[total] (€${budget}/day target)**

## Final Tips
[3-5 insider tips for this specific itinerary]

Make it personal, specific, and actionable.`
}
