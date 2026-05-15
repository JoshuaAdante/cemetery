'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams, useRouter } from 'next/navigation'
import { CARAGA_CEMETERIES } from '@/lib/constants/cemeteries'
import Footer from '@/components/Footer'

const PLOTS = [
  {
    id: 'p1',
    name: 'Premium Estate',
    description: 'Located under the heritage Oak tree with private granite bench.',
    price: 450000,
    badge: 'Most Selected',
  },
  {
    id: 'p2',
    name: 'Serenity Path',
    description: 'East-facing plots bordering the central reflecting pool.',
    price: 280000,
    badge: null,
  },
  {
    id: 'p3',
    name: 'Celestial Garden',
    description: 'Open lawns with garden view and morning sunlight exposure.',
    price: 185000,
    badge: null,
  },
  {
    id: 'p4',
    name: 'Heritage Row',
    description: 'Adjacent to the founding family section with cobblestone pathways.',
    price: 125000,
    badge: 'Budget Friendly',
  },
]

export default function BookingPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const cemeteryId = searchParams.get('cemetery') || '1'

  const [selectedPlot, setSelectedPlot] = useState(PLOTS[0].id)
  const [selectedCemId, setSelectedCemId] = useState(cemeteryId)

  const cemetery = CARAGA_CEMETERIES.find((c) => c.id === selectedCemId) || CARAGA_CEMETERIES[0]
  const plot = PLOTS.find((p) => p.id === selectedPlot) || PLOTS[0]

  const handleContinue = () => {
    const params = new URLSearchParams({
      cemetery: selectedCemId,
      plot: selectedPlot,
      price: plot.price.toString(),
    })
    router.push(`/booking/details?${params}`)
  }

  return (
    <div className="min-h-screen bg-surface">
      <main className="max-w-[1200px] mx-auto px-4 md:px-[40px] py-12">
        {/* Header */}
        <section className="mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-4xl font-bold text-primary">Service Booking</h1>
              <p className="text-on-surface-variant mt-2">
                Plan a respectful farewell with guidance at every step.
              </p>
            </div>
            <div className="bg-secondary-container px-4 py-2 rounded-lg flex items-center gap-2">
              <span className="material-symbols-outlined text-on-secondary-container">
                support_agent
              </span>
              <span className="text-sm text-on-secondary-container">
                Need assistance? Call (085) 815-1234
              </span>
            </div>
          </div>

          {/* Progress Stepper */}
          <div className="flex items-center w-full overflow-x-auto pb-4 no-scrollbar">
            <div className="flex items-center flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold">
                1
              </div>
              <span className="ml-3 text-sm font-bold text-primary whitespace-nowrap">
                Select Plot
              </span>
            </div>
            <div className="w-12 md:w-24 h-[2px] bg-outline-variant mx-4 flex-shrink-0" />
            <div className="flex items-center flex-shrink-0 opacity-40">
              <div className="w-10 h-10 rounded-full border-2 border-outline text-on-surface-variant flex items-center justify-center font-bold">
                2
              </div>
              <span className="ml-3 text-sm text-on-surface-variant whitespace-nowrap">Details</span>
            </div>
            <div className="w-12 md:w-24 h-[2px] bg-outline-variant mx-4 flex-shrink-0" />
            <div className="flex items-center flex-shrink-0 opacity-40">
              <div className="w-10 h-10 rounded-full border-2 border-outline text-on-surface-variant flex items-center justify-center font-bold">
                3
              </div>
              <span className="ml-3 text-sm text-on-surface-variant whitespace-nowrap">Services</span>
            </div>
            <div className="w-12 md:w-24 h-[2px] bg-outline-variant mx-4 flex-shrink-0" />
            <div className="flex items-center flex-shrink-0 opacity-40">
              <div className="w-10 h-10 rounded-full border-2 border-outline text-on-surface-variant flex items-center justify-center font-bold">
                4
              </div>
              <span className="ml-3 text-sm text-on-surface-variant whitespace-nowrap">Review</span>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[24px]">
          <div className="lg:col-span-8 flex flex-col gap-[24px]">
            {/* Cemetery selector */}
            <div>
              <h2 className="text-2xl font-semibold text-primary mb-4">1. Select Cemetery</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {CARAGA_CEMETERIES.slice(0, 4).map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCemId(c.id)}
                    className={`text-left p-4 rounded-xl border-2 transition-all ${
                      selectedCemId === c.id
                        ? 'border-secondary bg-secondary-container/20'
                        : 'border-outline-variant hover:border-secondary-container'
                    }`}
                  >
                    <p className="font-semibold text-primary text-sm">{c.name}</p>
                    <p className="text-xs text-on-surface-variant mt-1">
                      {c.address}, {c.city}
                    </p>
                    <p className="text-xs text-secondary mt-1">
                      Starting ₱{c.starting_price.toLocaleString()}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Map preview / cemetery image */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-primary">2. Select Plot Location</h2>
                <span className="text-secondary text-sm flex items-center gap-1 cursor-pointer hover:underline">
                  <span className="material-symbols-outlined text-sm">filter_list</span>
                  Filter by Garden
                </span>
              </div>

              <div className="relative w-full aspect-[21/9] rounded-xl overflow-hidden shadow border border-outline-variant mb-6">
                <Image
                  src={cemetery.image_url}
                  alt={cemetery.name}
                  fill
                  className="object-cover opacity-90"
                />
                <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-primary/50 to-transparent">
                  <div className="bg-surface-container-lowest/90 backdrop-blur-md p-4 rounded-lg inline-flex items-center gap-4 max-w-sm">
                    <div className="bg-secondary p-2 rounded-lg">
                      <span className="material-symbols-outlined text-white">location_on</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-primary">{cemetery.name}</p>
                      <p className="text-xs text-on-surface-variant">
                        {cemetery.available_plots} plots available
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Plot Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
                {PLOTS.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => setSelectedPlot(p.id)}
                    className={`border-2 bg-surface-container-lowest p-6 rounded-xl cursor-pointer relative transition-all ${
                      selectedPlot === p.id
                        ? 'border-secondary shadow-[0_8px_16px_rgba(45,62,80,0.08)]'
                        : 'border-outline-variant hover:shadow-[0_8px_16px_rgba(45,62,80,0.08)]'
                    }`}
                  >
                    {selectedPlot === p.id && (
                      <div className="absolute top-4 right-4 bg-secondary text-white rounded-full p-1">
                        <span className="material-symbols-outlined text-sm">check</span>
                      </div>
                    )}
                    {p.badge && (
                      <span className="absolute top-4 left-4 text-xs bg-tertiary-fixed text-on-tertiary-fixed-variant px-2 py-0.5 rounded-full font-medium uppercase tracking-wider">
                        {p.badge}
                      </span>
                    )}
                    <h3 className="text-xl font-semibold text-primary mb-2 mt-4">{p.name}</h3>
                    <p className="text-sm text-on-surface-variant mb-4">{p.description}</p>
                    <span className="text-xl font-bold text-secondary">
                      ₱{p.price.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Summary Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 flex flex-col gap-6">
              <div className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant shadow-[0_2px_4px_rgba(45,62,80,0.05)]">
                <h2 className="text-2xl font-semibold text-primary mb-6">Booking Summary</h2>
                <ul className="space-y-4 mb-8">
                  <li className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-primary">{plot.name}</p>
                      <p className="text-xs text-on-surface-variant">{cemetery.name}</p>
                    </div>
                    <span className="text-sm font-bold text-primary">
                      ₱{plot.price.toLocaleString()}
                    </span>
                  </li>
                  <li className="flex justify-between items-center opacity-40">
                    <p className="text-sm">Service Package</p>
                    <p className="text-sm">Pending</p>
                  </li>
                  <li className="border-t border-outline-variant pt-4 flex justify-between items-center">
                    <p className="text-base font-bold text-primary">Subtotal</p>
                    <p className="text-2xl font-bold text-primary">
                      ₱{plot.price.toLocaleString()}
                    </p>
                  </li>
                </ul>

                <div className="space-y-3">
                  <button
                    onClick={handleContinue}
                    className="w-full bg-primary text-on-primary py-4 rounded-lg text-sm font-bold hover:bg-primary-container transition-colors flex items-center justify-center gap-2"
                  >
                    Continue to Details
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                  <button className="w-full border border-secondary text-secondary py-4 rounded-lg text-sm font-bold hover:bg-surface-container transition-colors">
                    Save for Later
                  </button>
                </div>

                <p className="mt-6 text-xs text-center text-on-surface-variant">
                  Payment plans available. Secure this plot with a ₱10,000 deposit.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-surface-container p-4 rounded-lg flex flex-col items-center text-center">
                  <span className="material-symbols-outlined text-secondary mb-2">
                    verified_user
                  </span>
                  <p className="text-xs font-bold">Secure Booking</p>
                </div>
                <div className="bg-surface-container p-4 rounded-lg flex flex-col items-center text-center">
                  <span className="material-symbols-outlined text-secondary mb-2">history_edu</span>
                  <p className="text-xs font-bold">Legacy Charter</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
