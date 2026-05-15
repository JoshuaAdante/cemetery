'use client'

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Cemetery } from '@/types'
import { CARAGA_MAP_CENTER, CARAGA_MAP_ZOOM } from '@/lib/constants/cemeteries'

// Fix default marker icons broken by webpack
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

interface CemeteryMapProps {
  cemeteries: Cemetery[]
  selectedId?: string
  onSelectCemetery?: (cemetery: Cemetery) => void
  height?: string
}

function createCustomIcon(isSelected: boolean, type: string) {
  const color = isSelected ? '#156968' : '#172839'
  const size = isSelected ? 44 : 36

  const svgIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size + 8}" viewBox="0 0 ${size} ${size + 8}">
      <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2 - 2}" fill="${color}" stroke="white" stroke-width="3"/>
      <text x="${size / 2}" y="${size / 2 + 6}" text-anchor="middle" fill="white" font-family="Material Symbols Outlined" font-size="16">location_on</text>
    </svg>
  `

  return L.divIcon({
    html: `
      <div style="
        background: ${color};
        color: white;
        border-radius: 50%;
        width: ${size}px;
        height: ${size}px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 3px solid white;
        box-shadow: 0 4px 12px rgba(0,0,0,${isSelected ? '0.4' : '0.25'});
        cursor: pointer;
        transition: transform 0.2s;
        ${isSelected ? 'transform: scale(1.15);' : ''}
      ">
        <span style="font-family: 'Material Symbols Outlined'; font-size: 18px; font-variation-settings: 'FILL' 1;">location_on</span>
      </div>
    `,
    className: '',
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size],
  })
}

export default function CemeteryMap({
  cemeteries,
  selectedId,
  onSelectCemetery,
  height = '100%',
}: CemeteryMapProps) {
  const mapRef = useRef<L.Map | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const markersRef = useRef<Record<string, L.Marker>>({})

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    // Initialize map centered on Butuan City / Caraga Region
    const map = L.map(containerRef.current, {
      center: CARAGA_MAP_CENTER,
      zoom: CARAGA_MAP_ZOOM,
      zoomControl: false,
    })

    // OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map)

    // Custom zoom control (top-right)
    L.control.zoom({ position: 'topright' }).addTo(map)

    // Add markers for each cemetery
    cemeteries.forEach((cemetery) => {
      const isSelected = cemetery.id === selectedId
      const marker = L.marker([cemetery.latitude, cemetery.longitude], {
        icon: createCustomIcon(isSelected, cemetery.type),
      })

      const availabilityLabel =
        cemetery.available_plots > 50
          ? `<span style="color:#156968;font-weight:600;">${cemetery.available_plots} Plots Available</span>`
          : cemetery.available_plots > 0
          ? `<span style="color:#e67e00;font-weight:600;">${cemetery.available_plots} Plots — Limited</span>`
          : `<span style="color:#ba1a1a;font-weight:600;">No Plots Available</span>`

      const typeLabel =
        cemetery.type === 'memorial_park'
          ? 'Memorial Park'
          : cemetery.type === 'private'
          ? 'Private Cemetery'
          : 'Public Cemetery'

      const popupContent = `
        <div style="min-width:220px;font-family:'Inter',sans-serif;padding:4px;">
          <p style="font-size:11px;color:#74777d;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 4px;">${typeLabel}</p>
          <p style="font-size:15px;font-weight:700;color:#172839;margin:0 0 4px;">${cemetery.name}</p>
          <p style="font-size:12px;color:#43474c;margin:0 0 8px;">
            📍 ${cemetery.address}, ${cemetery.city}
          </p>
          <p style="font-size:12px;margin:0 0 10px;">${availabilityLabel}</p>
          <div style="display:flex;justify-content:space-between;align-items:center;border-top:1px solid #c4c6cd;padding-top:8px;margin-top:4px;">
            <span style="font-size:13px;font-weight:700;color:#172839;">Starting ₱${cemetery.starting_price.toLocaleString()}</span>
            <a href="/booking?cemetery=${cemetery.id}" style="background:#172839;color:white;padding:6px 14px;border-radius:6px;font-size:12px;font-weight:600;text-decoration:none;">Book Now</a>
          </div>
        </div>
      `

      marker.bindPopup(popupContent, {
        closeButton: true,
        className: 'cemetery-popup',
        maxWidth: 280,
      })

      marker.on('click', () => {
        onSelectCemetery?.(cemetery)
      })

      marker.addTo(map)
      markersRef.current[cemetery.id] = marker
    })

    mapRef.current = map

    return () => {
      map.remove()
      mapRef.current = null
      markersRef.current = {}
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Update markers when selection changes
  useEffect(() => {
    if (!mapRef.current) return
    cemeteries.forEach((cemetery) => {
      const marker = markersRef.current[cemetery.id]
      if (marker) {
        const isSelected = cemetery.id === selectedId
        marker.setIcon(createCustomIcon(isSelected, cemetery.type))
        if (isSelected) {
          mapRef.current!.flyTo([cemetery.latitude, cemetery.longitude], 13, {
            duration: 1,
          })
          marker.openPopup()
        }
      }
    })
  }, [selectedId, cemeteries])

  return (
    <div
      ref={containerRef}
      style={{ height, width: '100%' }}
      className="z-0"
    />
  )
}
