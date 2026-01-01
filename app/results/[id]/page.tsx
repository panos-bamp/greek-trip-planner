'use client'

import { useState, useEffect, useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Compass, Download, Mail, ArrowLeft, MapPin, Calendar, Users, Euro, Share2, Bookmark, Check, Sparkles } from 'lucide-react'
import TripMap from '@/components/TripMap'
import { extractLocationsFromText, getLocationData } from '@/lib/greece-locations'

export default function ResultsPage() {
  const params = useParams()
  const router = useRouter()
  const [itinerary, setItinerary] = useState('')
  const [userData, setUserData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedDay, setSelectedDay] = useState(1)

  useEffect(() => {
    const stored = localStorage.getItem(`itinerary-${params.id}`)
    if (stored) {
      const data = JSON.parse(stored)
      setItinerary(data.itinerary || '')
      setUserData(data.answers)
    }
    setIsLoading(false)
  }, [params.id])

  // Extract locations from itinerary text
  const locations = useMemo(() => {
    if (!itinerary) return []
    
    const extractedNames = extractLocationsFromText(itinerary)
    const lines = itinerary.split('\n')
    const locationObjects: any[] = []
    
    // Try to determine which day each location belongs to
    let currentDay = 1
    
    lines.forEach((line) => {
      // Detect day markers
      const dayMatch = line.match(/Day (\d+)|DAY (\d+)/i)
      if (dayMatch) {
        currentDay = parseInt(dayMatch[1] || dayMatch[2])
      }
      
      // Check if this line contains any of our locations
      extractedNames.forEach((locationName) => {
        if (line.toLowerCase().includes(locationName) && 
            !locationObjects.find(loc => loc.name === locationName && loc.day === currentDay)) {
          const locData = getLocationData(locationName)
          if (locData) {
            // Extract time if present (Morning, Afternoon, Evening, etc.)
            const timeMatch = line.match(/(morning|afternoon|evening|night|noon)/i)
            const time = timeMatch ? timeMatch[1].charAt(0).toUpperCase() + timeMatch[1].slice(1) : undefined
            
            locationObjects.push({
              name: locationName.charAt(0).toUpperCase() + locationName.slice(1),
              lat: locData.lat,
              lng: locData.lng,
              day: currentDay,
              type: locData.type,
              time: time,
              description: line.trim().substring(0, 100)
            })
          }
        }
      })
    })
    
    return locationObjects
  }, [itinerary])

  // Scroll to day section when selectedDay changes
  useEffect(() => {
    if (selectedDay && itinerary) {
      setTimeout(() => {
        const dayElement = document.getElementById(`day-${selectedDay}`)
        if (dayElement) {
          const yOffset = -130 // Header (56px) + Tabs (60px) + padding (14px)
          const y = dayElement.getBoundingClientRect().top + window.scrollY + yOffset
          window.scrollTo({ top: y, behavior: 'smooth' })
        }
      }, 100)
    }
  }, [selectedDay, itinerary])

  if (isLoading) {
    return (
      <div className="min-h-screen gradient-primary flex items-center justify-center">
        <div className="text-white text-center">
          <Compass className="w-20 h-20 animate-spin mx-auto mb-6 text-accent-pink" />
          <h2 className="text-3xl font-bold mb-2">Creating your perfect Greece itinerary...</h2>
          <p className="text-white/70">Our AI is crafting something special ✨</p>
        </div>
      </div>
    )
  }

  const days = itinerary 
    ? itinerary.split('### Day').filter(Boolean).map((day, index) => ({
        number: index + 1,
        content: day
      }))
    : []

  if (!itinerary) {
    return (
      <div className="min-h-screen gradient-primary flex items-center justify-center p-4">
        <div className="bg-white rounded-[2.5rem] p-12 text-center max-w-md shadow-2xl">
          <div className="text-7xl mb-6">🎨</div>
          <h2 className="text-3xl font-black text-primary mb-4" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
            Generating Your Itinerary...
          </h2>
          <p className="text-text-secondary mb-6 leading-relaxed">
            This might take a moment. The AI is creating your personalized Greece adventure!
          </p>
          <button
            onClick={() => router.push('/quiz')}
            className="px-8 py-4 gradient-pink text-white rounded-full font-bold hover:shadow-xl transition-all"
          >
            Start Over
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg-light">
      {/* Header - Sticky at top */}
      <header id="sticky-header" className="gradient-dark border-b border-gray-800 sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button onClick={() => router.push('/')} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 gradient-pink rounded-xl flex items-center justify-center shadow-lg">
                  <Compass className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-white" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
                    {userData?.duration || '7'}-Day Greece Adventure
                  </h1>
                  <p className="text-xs text-white/60">
                    {userData?.firstName}'s Personalized Trip
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <button className="px-4 py-2 text-sm text-white/80 hover:bg-white/10 rounded-xl transition flex items-center space-x-1 font-semibold">
                <Share2 className="w-4 h-4" />
                <span className="hidden md:inline">Share</span>
              </button>
              
              <button className="px-4 py-2 text-sm text-white/80 hover:bg-white/10 rounded-xl transition flex items-center space-x-1 font-semibold">
                <Bookmark className="w-4 h-4" />
                <span className="hidden md:inline">Save</span>
              </button>
              
              <button className="px-5 py-2 gradient-pink text-white rounded-xl hover:shadow-lg transition flex items-center space-x-2 font-bold text-sm">
                <Download className="w-4 h-4" />
                <span>PDF</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Day Tabs - STICKY directly below header, OUTSIDE of scrolling content */}
      <div id="day-tabs" className="bg-white border-b border-gray-200 sticky top-[56px] z-40 shadow-sm">
        <div className="overflow-x-auto scrollbar-hide px-4 py-3">
          <div className="flex space-x-2 min-w-max">
            {days.map((day) => (
              <button
                key={day.number}
                onClick={() => setSelectedDay(day.number)}
                className={`px-5 py-2 rounded-xl font-bold whitespace-nowrap transition-all text-sm ${
                  selectedDay === day.number
                    ? 'text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                style={selectedDay === day.number ? {background: '#FF7CE6'} : {}}
              >
                Day {day.number}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content - SCROLLABLE */}
      <div className="flex">
        {/* Left: Itinerary - This scrolls */}
        <div className="w-full md:w-1/2">
          {/* Trip Overview */}
          <div className="gradient-dark text-white p-6">
            <div className="max-w-2xl mx-auto">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full mb-3 border border-white/20">
                <Sparkles className="w-3 h-3 text-accent-pink" />
                <span className="text-xs font-semibold">AI-Generated Just for You</span>
              </div>
              
              <h2 className="text-2xl font-black mb-1" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
                Your Perfect Greece Itinerary
              </h2>
              <p className="text-white/80 mb-5 text-sm">
                Personalized recommendations, insider tips & realistic timing
              </p>

              {/* Trip Stats - Colorful Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <div className="rounded-xl p-3 border-2" style={{background: '#9788FF', borderColor: '#7B6EE6'}}>
                  <div className="text-2xl mb-1">📅</div>
                  <div className="text-xs text-white/70 mb-0.5">Duration</div>
                  <div className="font-bold text-white text-sm">{userData?.duration || '7'} days</div>
                </div>
                
                <div className="rounded-xl p-3 border-2" style={{background: '#46F2B6', borderColor: '#2ED99F'}}>
                  <div className="text-2xl mb-1">👥</div>
                  <div className="text-xs text-white/90 mb-0.5">Travelers</div>
                  <div className="font-bold text-gray-900 text-sm">{userData?.travelWith || 'Solo'}</div>
                </div>
                
                <div className="rounded-xl p-3 border-2" style={{background: '#2C73FF', borderColor: '#1A5FE6'}}>
                  <div className="text-2xl mb-1">💰</div>
                  <div className="text-xs text-white/90 mb-0.5">Budget</div>
                  <div className="font-bold text-white text-sm">€{userData?.budget || '150'}/day</div>
                </div>
                
                <div className="rounded-xl p-3 border-2" style={{background: '#FF7CE6', borderColor: '#E663D0'}}>
                  <div className="text-2xl mb-1">🌤️</div>
                  <div className="text-xs text-white/90 mb-0.5">Season</div>
                  <div className="font-bold text-white text-sm">{userData?.month || 'Summer'}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Itinerary Content */}
          <div className="p-6 max-w-2xl mx-auto bg-white">
            <div className="space-y-6">
              {itinerary.split('\n').map((line, index) => {
                const isDayHeader = line.match(/### Day (\d+)/)
                const dayNumber = isDayHeader ? isDayHeader[1] : null
                
                if (line.startsWith('# ')) {
                  return <h1 key={index} className="text-3xl font-black text-primary mb-3 flex items-center space-x-2" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
                    <span className="text-4xl">✨</span>
                    <span>{line.replace('# ', '')}</span>
                  </h1>
                }
                if (line.startsWith('## ')) {
                  return <h2 key={index} className="text-2xl font-bold text-primary mt-8 mb-3 flex items-center space-x-2">
                    <span className="text-3xl">🗺️</span>
                    <span>{line.replace('## ', '')}</span>
                  </h2>
                }
                if (line.startsWith('### ')) {
                  return (
                    <h3 
                      key={index} 
                      id={dayNumber ? `day-${dayNumber}` : undefined}
                      className="text-xl font-bold mt-6 mb-3 flex items-center space-x-2 p-3 rounded-xl border-l-4"
                      style={{background: '#FF7CE6', borderColor: '#E663D0', color: 'white'}}
                    >
                      <span className="text-2xl">📍</span>
                      <span>{line.replace('### ', '')}</span>
                    </h3>
                  )
                }
                if (line.startsWith('**Morning:**')) {
                  return <div key={index} className="flex items-start space-x-2 p-3 bg-orange-50 rounded-xl">
                    <span className="text-2xl">🌅</span>
                    <p className="font-semibold text-gray-900 flex-1 text-sm">{line.replace(/\*\*/g, '')}</p>
                  </div>
                }
                if (line.startsWith('**Afternoon:**')) {
                  return <div key={index} className="flex items-start space-x-2 p-3 bg-blue-50 rounded-xl">
                    <span className="text-2xl">☀️</span>
                    <p className="font-semibold text-gray-900 flex-1 text-sm">{line.replace(/\*\*/g, '')}</p>
                  </div>
                }
                if (line.startsWith('**Evening:**')) {
                  return <div key={index} className="flex items-start space-x-2 p-3 bg-purple-50 rounded-xl">
                    <span className="text-2xl">🌙</span>
                    <p className="font-semibold text-gray-900 flex-1 text-sm">{line.replace(/\*\*/g, '')}</p>
                  </div>
                }
                if (line.startsWith('**Where to Stay:**')) {
                  return <div key={index} className="flex items-start space-x-2 p-3 bg-green-50 rounded-xl border-2 border-green-200">
                    <span className="text-2xl">🏨</span>
                    <p className="font-semibold text-gray-900 flex-1 text-sm">{line.replace(/\*\*/g, '')}</p>
                  </div>
                }
                if (line.startsWith('**Insider Tip:**')) {
                  return <div key={index} className="flex items-start space-x-2 p-3 bg-yellow-50 rounded-xl border-2 border-yellow-200">
                    <span className="text-2xl">💡</span>
                    <p className="font-semibold text-gray-900 flex-1 text-sm">{line.replace(/\*\*/g, '')}</p>
                  </div>
                }
                if (line.startsWith('**Daily Budget:**')) {
                  return <div key={index} className="flex items-start space-x-2 p-3 bg-pink-50 rounded-xl border-2 border-pink-200">
                    <span className="text-2xl">💰</span>
                    <p className="font-bold text-gray-900 flex-1 text-sm">{line.replace(/\*\*/g, '')}</p>
                  </div>
                }
                if (line.startsWith('- ')) {
                  return <li key={index} className="text-gray-700 ml-6 leading-relaxed flex items-start space-x-2 text-sm">
                    <Check className="w-4 h-4 text-accent-pink mt-0.5 flex-shrink-0" />
                    <span>{line.replace('- ', '')}</span>
                  </li>
                }
                if (line.trim()) {
                  return <p key={index} className="text-gray-700 leading-relaxed text-sm">{line}</p>
                }
                return null
              })}
            </div>

            {/* CTA Section */}
            <div className="mt-10 gradient-pink rounded-2xl p-8 text-center text-white shadow-2xl">
              <div className="text-5xl mb-3">🎉</div>
              <h3 className="text-2xl font-black mb-2" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
                Ready to Book?
              </h3>
              <p className="text-white/90 mb-5">
                Start booking your experiences and accommodations now
              </p>
              <button className="px-8 py-3 bg-white rounded-full font-black text-lg hover:shadow-2xl hover:scale-105 transition-all" style={{color: '#FF7CE6'}}>
                Start Booking →
              </button>
            </div>
          </div>
        </div>

        {/* Right: Interactive Map - STICKY */}
        <div className="hidden md:block md:w-1/2 sticky top-[116px] h-[calc(100vh-116px)]">
          <TripMap 
            locations={locations} 
            selectedDay={selectedDay}
            onLocationClick={(location) => {
              console.log('Clicked location:', location)
              // Optional: Scroll to this location in the itinerary
              setSelectedDay(location.day)
            }}
          />
        </div>
      </div>
    </div>
  )
}
