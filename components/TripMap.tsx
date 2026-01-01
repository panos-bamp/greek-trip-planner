'use client'

import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

// Initialize Mapbox token
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''

interface Location {
  name: string
  lat: number
  lng: number
  day: number
  type: string
  time?: string
  description?: string
}

interface TripMapProps {
  locations: Location[]
  selectedDay?: number
  onLocationClick?: (location: Location) => void
}

export default function TripMap({ locations, selectedDay, onLocationClick }: TripMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const markers = useRef<mapboxgl.Marker[]>([])
  const [mapLoaded, setMapLoaded] = useState(false)

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return

    // Create map centered on Greece
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [23.7275, 37.9838], // Athens coordinates
      zoom: 6,
      attributionControl: false
    })

    // Add navigation controls (zoom in/out)
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right')

    // Add attribution in bottom right
    map.current.addControl(new mapboxgl.AttributionControl({
      compact: true
    }), 'bottom-right')

    map.current.on('load', () => {
      setMapLoaded(true)
    })

    return () => {
      map.current?.remove()
      map.current = null
    }
  }, [])

  // Update markers when locations or selectedDay changes
  useEffect(() => {
    if (!map.current || !mapLoaded || locations.length === 0) return

    // Clear existing markers
    markers.current.forEach(marker => marker.remove())
    markers.current = []

    // Filter locations by selected day if provided
    const displayLocations = selectedDay 
      ? locations.filter(loc => loc.day === selectedDay)
      : locations

    // Group locations by day for route lines
    const locationsByDay = displayLocations.reduce((acc, loc) => {
      if (!acc[loc.day]) acc[loc.day] = []
      acc[loc.day].push(loc)
      return acc
    }, {} as Record<number, Location[]>)

    // Add route lines for each day
    Object.entries(locationsByDay).forEach(([day, dayLocations]) => {
      if (dayLocations.length < 2) return

      const coordinates = dayLocations.map(loc => [loc.lng, loc.lat])
      const routeId = `route-day-${day}`

      // Remove existing route if it exists
      if (map.current?.getSource(routeId)) {
        map.current.removeLayer(routeId)
        map.current.removeSource(routeId)
      }

      // Add route line
      map.current?.addSource(routeId, {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: coordinates
          }
        }
      })

      map.current?.addLayer({
        id: routeId,
        type: 'line',
        source: routeId,
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#FF7CE6',
          'line-width': 3,
          'line-opacity': 0.8
        }
      })
    })

    // Create markers for each location
    displayLocations.forEach((location, index) => {
      // Create custom marker element
      const el = document.createElement('div')
      el.className = 'custom-marker'
      el.style.width = '40px'
      el.style.height = '40px'
      el.style.cursor = 'pointer'
      el.style.position = 'relative'

      // Location type icons
      const typeIcons: Record<string, string> = {
        attraction: '🏛️',
        restaurant: '🍽️',
        hotel: '🏨',
        beach: '🏖️',
        viewpoint: '📸',
        neighborhood: '🏘️',
        island: '🏝️',
        town: '🏘️',
        default: '📍'
      }

      const icon = typeIcons[location.type] || typeIcons.default

      // Main marker (emoji icon)
      const iconDiv = document.createElement('div')
      iconDiv.innerHTML = `
        <div style="
          background: #FF7CE6;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          transition: transform 0.2s;
        ">
          ${icon}
        </div>
      `
      el.appendChild(iconDiv)

      // Day number badge
      const badge = document.createElement('div')
      badge.textContent = `${location.day}`
      badge.style.cssText = `
        position: absolute;
        top: -8px;
        right: -8px;
        background: #05037E;
        color: white;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 11px;
        border: 2px solid white;
        box-shadow: 0 1px 4px rgba(0,0,0,0.3);
      `
      el.appendChild(badge)

      // Hover effect
      el.addEventListener('mouseenter', () => {
        iconDiv.querySelector('div')!.style.transform = 'scale(1.15)'
      })
      el.addEventListener('mouseleave', () => {
        iconDiv.querySelector('div')!.style.transform = 'scale(1)'
      })

      // Click handler
      if (onLocationClick) {
        el.addEventListener('click', () => {
          onLocationClick(location)
        })
      }

      // Create popup with location details
      const popup = new mapboxgl.Popup({ 
        offset: 25,
        closeButton: false,
        className: 'custom-popup'
      }).setHTML(`
        <div style="padding: 12px; min-width: 200px;">
          <div style="font-weight: bold; font-size: 14px; color: #05037E; margin-bottom: 4px;">
            Day ${location.day}${location.time ? ` - ${location.time}` : ''}
          </div>
          <div style="font-size: 16px; font-weight: 600; color: #1a1a1a; margin-bottom: 4px;">
            ${location.name}
          </div>
          <div style="font-size: 12px; color: #666; text-transform: capitalize;">
            ${location.type}
          </div>
          ${location.description ? `
            <div style="font-size: 12px; color: #555; margin-top: 6px; padding-top: 6px; border-top: 1px solid #eee;">
              ${location.description}
            </div>
          ` : ''}
        </div>
      `)

      // Add marker to map
      const marker = new mapboxgl.Marker(el)
        .setLngLat([location.lng, location.lat])
        .setPopup(popup)
        .addTo(map.current!)

      markers.current.push(marker)
    })

    // Fit map to show all markers with padding
    if (displayLocations.length > 0) {
      const bounds = new mapboxgl.LngLatBounds()
      displayLocations.forEach(loc => bounds.extend([loc.lng, loc.lat]))
      
      map.current?.fitBounds(bounds, { 
        padding: { top: 80, bottom: 80, left: 80, right: 80 },
        maxZoom: 12,
        duration: 1000
      })
    }

    // Cleanup function
    return () => {
      // Remove route lines
      Object.keys(locationsByDay).forEach(day => {
        const routeId = `route-day-${day}`
        if (map.current?.getSource(routeId)) {
          map.current.removeLayer(routeId)
          map.current.removeSource(routeId)
        }
      })
    }
  }, [locations, selectedDay, mapLoaded, onLocationClick])

  return (
    <>
      <div 
        ref={mapContainer} 
        className="w-full h-full rounded-xl"
        style={{ minHeight: '400px' }}
      />
      
      {/* Loading state */}
      {!mapLoaded && (
        <div className="absolute inset-0 bg-gray-100 rounded-xl flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading map...</p>
          </div>
        </div>
      )}

      {/* Custom popup styles */}
      <style jsx global>{`
        .mapboxgl-popup-content {
          padding: 0;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        .mapboxgl-popup-tip {
          border-top-color: white;
        }
        .custom-marker {
          transition: all 0.2s ease;
        }
      `}</style>
    </>
  )
}
