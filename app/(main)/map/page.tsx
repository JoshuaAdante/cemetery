'use client'

import dynamic from 'next/dynamic'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Cemetery } from '@/types'
import { CARAGA_CEMETERIES } from '@/lib/constants/cemeteries'

// Dynamic import for Leaflet (no SSR)
const CemeteryMap = dynamic(() => import('@/components/map/CemeteryMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-surface-container">
      <div className="text-center">
        <span className="material-symbols-outlined text-4xl text-secondary animate-pulse">map</span>
        <p className="text-sm text-on-surface-variant mt-2">Loading Caraga Map...</p>
      </div>
    </div>
  ),
})

type FilterType = 'all' | 'public' | 'private' | 'memorial_park'

export default function MapPage() {
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState<FilterType>('all')

  const filtered = useMemo(() => {
    return CARAGA_CEMETERIES.filter((c) => {
      const matchesType = filterType === 'all' || c.type === filterType
      const matchesSearch =
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.address.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesType && matchesSearch
    })
  }, [searchQuery, filterType])

  const totalAvailable = CARAGA_CEMETERIES.reduce((sum, c) => sum + c.available_plots, 0)
  const totalSites = CARAGA_CEMETERIES.length

  const filters: { label: string; value: FilterType }[] = [
    { label: 'All Types', value: 'all' },
    { label: 'Public', value: 'public' },
    { label: 'Private', value: 'private' },
    { label: 'Memorial Parks', value: 'memorial_park' },
  ]

  const availabilityColor = (available: number) => {
    if (available > 50) return 'text-secondary'
    if (available > 0) return 'text-[#e67e00]'
    return 'text-error'
  }

  const availabilityIcon = (available: number) => {
    if (available > 50) return 'grid_view'
    return 'warning'
  }

  const availabilityText = (available: number) => {
    if (available > 50) return `${available} Plots Available`
    if (available > 0) return `${available} Plots — Limited`
    return 'No Plots Available'
  }

  return (
    <main className="h-[calc(100vh-80px)] flex overflow-hidden">
      {/* Sidebar */}
      <aside className="w-full md:w-[400px] bg-surface flex flex-col border-r border-outline-variant z-40 flex-shrink-0">
        {/* Search Header */}
        <div className="p-6 space-y-4 shadow-sm bg-surface-container-lowest">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold text-primary">Find a Resting Place</h1>
            <p className="text-sm text-on-surface-variant">
              Explore cemeteries across the Caraga region.
            </p>
          </div>

          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">
              search
            </span>
            <input
              type="text"
              placeholder="Search by name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-surface-container border border-outline-variant rounded-lg text-sm focus:ring-2 focus:ring-secondary focus:border-secondary transition-all outline-none"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilterType(f.value)}
                className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                  filterType === f.value
                    ? 'bg-secondary-container text-on-secondary-container'
                    : 'bg-surface-container-high text-on-surface-variant hover:bg-secondary-container'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cemetery List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {filtered.length === 0 && (
            <div className="text-center py-12 text-on-surface-variant">
              <span className="material-symbols-outlined text-4xl block mb-2">search_off</span>
              <p className="text-sm">No cemeteries match your search.</p>
            </div>
          )}

          {filtered.map((cemetery) => (
            <div
              key={cemetery.id}
              onClick={() => setSelectedId(cemetery.id)}
              className={`bg-surface-container-lowest rounded-xl p-4 shadow-[0_2px_4px_rgba(45,62,80,0.05)] border transition-all cursor-pointer ${
                selectedId === cemetery.id
                  ? 'border-secondary ring-2 ring-secondary/20'
                  : 'border-transparent hover:border-secondary-container'
              }`}
            >
              <div className="flex gap-4">
                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={cemetery.image_url}
                    alt={cemetery.name}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-primary truncate">{cemetery.name}</h3>
                  <div className="flex items-center text-on-surface-variant mt-1">
                    <span className="material-symbols-outlined text-[14px] mr-1">location_on</span>
                    <span className="text-xs truncate">
                      {cemetery.address}, {cemetery.city}
                    </span>
                  </div>
                  <div className={`flex items-center gap-1 mt-2 ${availabilityColor(cemetery.available_plots)}`}>
                    <span className="material-symbols-outlined text-[14px]">
                      {availabilityIcon(cemetery.available_plots)}
                    </span>
                    <span className="text-xs font-medium">
                      {availabilityText(cemetery.available_plots)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-outline-variant flex justify-between items-center">
                <span className="text-sm font-bold text-primary">
                  Starting at ₱{cemetery.starting_price.toLocaleString()}
                </span>
                <Link
                  href={`/booking?cemetery=${cemetery.id}`}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-primary text-on-primary px-4 py-2 rounded-lg text-xs font-semibold hover:bg-opacity-90 active:scale-95 transition-all"
                >
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Map Container */}
      <section className="flex-1 relative bg-surface-container">
        <CemeteryMap
          cemeteries={filtered}
          selectedId={selectedId}
          onSelectCemetery={(c) => setSelectedId(c.id)}
          height="100%"
        />

        {/* Map Controls overlay — Leaflet handles zoom itself, these are supplementary */}
        <div className="absolute right-6 top-6 flex flex-col gap-2 z-[500]">
          <button
            onClick={() => setSelectedId(undefined)}
            className="w-12 h-12 bg-surface-container-lowest shadow-md rounded-lg flex items-center justify-center text-primary hover:bg-surface-container-high transition-colors"
            title="Reset view"
          >
            <span className="material-symbols-outlined">my_location</span>
          </button>
          <button className="w-12 h-12 bg-surface-container-lowest shadow-md rounded-lg flex items-center justify-center text-primary hover:bg-surface-container-high transition-colors">
            <span className="material-symbols-outlined">layers</span>
          </button>
        </div>

        {/* Region Stats Card */}
        <div className="absolute bottom-6 left-6 z-[500] hidden md:block">
          <div className="bg-surface-container-lowest/95 backdrop-blur-md p-4 rounded-xl shadow-lg border border-outline-variant/30 min-w-[200px]">
            <h4 className="text-sm font-bold text-primary mb-3">Caraga Region Overview</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-on-surface-variant">Total Sites</span>
                <span className="text-xs font-bold text-primary">{totalSites}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-on-surface-variant">Available Plots</span>
                <span className="text-xs font-bold text-secondary">
                  {totalAvailable.toLocaleString()}
                </span>
              </div>
              {selectedId && (
                <div className="mt-2 pt-2 border-t border-outline-variant">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-secondary" />
                    <span className="text-xs text-on-surface">
                      {CARAGA_CEMETERIES.find((c) => c.id === selectedId)?.name}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile FAB */}
      <div className="md:hidden fixed bottom-6 right-6 z-50">
        <button className="bg-secondary text-on-secondary w-14 h-14 rounded-2xl shadow-xl flex items-center justify-center active:scale-95 transition-all">
          <span className="material-symbols-outlined">add_location</span>
        </button>
      </div>
    </main>
  )
}
