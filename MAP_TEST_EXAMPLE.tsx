// MAP TEST EXAMPLE
// Copy this code to test the TripMap component

import TripMap from '@/components/TripMap'

export default function MapTestPage() {
  // Sample Greece locations for testing
  const sampleLocations = [
    // Day 1 - Athens
    { 
      name: 'Acropolis', 
      lat: 37.9715, 
      lng: 23.7267, 
      day: 1, 
      type: 'attraction',
      time: 'Morning',
      description: 'Visit the iconic Parthenon and ancient temples'
    },
    { 
      name: 'Plaka', 
      lat: 37.9732, 
      lng: 23.7281, 
      day: 1, 
      type: 'neighborhood',
      time: 'Afternoon',
      description: 'Explore charming streets and local tavernas'
    },
    { 
      name: 'Acropolis Museum', 
      lat: 37.9688, 
      lng: 23.7281, 
      day: 1, 
      type: 'attraction',
      time: 'Late Afternoon',
      description: 'World-class museum of ancient Greek art'
    },

    // Day 2 - Delphi
    { 
      name: 'Delphi', 
      lat: 38.4824, 
      lng: 22.5010, 
      day: 2, 
      type: 'attraction',
      time: 'Full Day',
      description: 'Ancient sanctuary and oracle site'
    },

    // Day 3 - Santorini
    { 
      name: 'Santorini', 
      lat: 36.3932, 
      lng: 25.4615, 
      day: 3, 
      type: 'island',
      description: 'Arrive at the stunning caldera island'
    },
    { 
      name: 'Oia', 
      lat: 36.4618, 
      lng: 25.3753, 
      day: 3, 
      type: 'town',
      time: 'Sunset',
      description: 'Famous for breathtaking sunset views'
    },

    // Day 4 - Santorini
    { 
      name: 'Red Beach', 
      lat: 36.3485, 
      lng: 25.3985, 
      day: 4, 
      type: 'beach',
      time: 'Morning',
      description: 'Unique red volcanic sand beach'
    },
    { 
      name: 'Fira', 
      lat: 36.4166, 
      lng: 25.4324, 
      day: 4, 
      type: 'town',
      time: 'Afternoon',
      description: 'Capital town with stunning views'
    },

    // Day 5 - Mykonos
    { 
      name: 'Mykonos Town', 
      lat: 37.4467, 
      lng: 25.3289, 
      day: 5, 
      type: 'town',
      description: 'Iconic white-washed Cycladic architecture'
    },
    { 
      name: 'Paradise Beach', 
      lat: 37.4170, 
      lng: 25.3590, 
      day: 5, 
      type: 'beach',
      time: 'Afternoon',
      description: 'Famous party beach with crystal waters'
    },
  ]

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">TripMap Test</h1>
        <p className="text-gray-600 mb-8">Testing the interactive Greece map with sample locations</p>
        
        {/* Full map */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">All Days</h2>
          <div className="h-[600px]">
            <TripMap 
              locations={sampleLocations} 
              onLocationClick={(loc) => alert(`Clicked: ${loc.name} (Day ${loc.day})`)}
            />
          </div>
        </div>

        {/* Day-filtered maps */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-4">Day 1 Only (Athens)</h2>
            <div className="h-[400px]">
              <TripMap locations={sampleLocations} selectedDay={1} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-4">Day 3 Only (Santorini)</h2>
            <div className="h-[400px]">
              <TripMap locations={sampleLocations} selectedDay={3} />
            </div>
          </div>
        </div>

        {/* Location list */}
        <div className="bg-white p-6 rounded-xl shadow-lg mt-8">
          <h2 className="text-2xl font-bold mb-4">Sample Locations</h2>
          <div className="space-y-2">
            {sampleLocations.map((loc, i) => (
              <div key={i} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                  {loc.day}
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{loc.name}</div>
                  <div className="text-sm text-gray-600">{loc.time} • {loc.type}</div>
                </div>
                <div className="text-sm text-gray-500">
                  {loc.lat.toFixed(4)}, {loc.lng.toFixed(4)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
