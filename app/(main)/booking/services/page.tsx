'use client'

import { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Footer from '@/components/Footer'
import { CARAGA_CEMETERIES, SERVICES } from '@/lib/constants/cemeteries'

export default function BookingServicesPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const cemeteryId = searchParams.get('cemetery') || '1'
  const plotId = searchParams.get('plot') || 'p1'
  const basePrice = Number(searchParams.get('price') || 450000)

  const cemetery = CARAGA_CEMETERIES.find((c) => c.id === cemeteryId) || CARAGA_CEMETERIES[0]
  const [selectedServices, setSelectedServices] = useState<string[]>([])

  const toggle = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    )
  }

  const addonsTotal = SERVICES.filter((s) => selectedServices.includes(s.id)).reduce(
    (sum, s) => sum + s.price,
    0
  )
  const total = basePrice + addonsTotal

  const handleContinue = () => {
    const params = new URLSearchParams({
      cemetery: cemeteryId,
      plot: plotId,
      price: basePrice.toString(),
      services: selectedServices.join(','),
      addons: addonsTotal.toString(),
    })
    router.push(`/booking/review?${params}`)
  }

  const serviceIcons: Record<string, string> = {
    s1: 'church',
    s2: 'local_florist',
    s3: 'cloud',
    s4: 'videocam',
    s5: 'self_improvement',
  }

  return (
    <div className="min-h-screen bg-surface">
      <main className="max-w-[1200px] mx-auto px-4 md:px-[40px] py-12">
        {/* Progress Stepper */}
        <div className="flex items-center overflow-x-auto pb-4 mb-12 no-scrollbar">
          {[
            { n: 1, label: 'Select Plot', done: true },
            { n: 2, label: 'Details', done: true },
            { n: 3, label: 'Services', active: true },
            { n: 4, label: 'Review', done: false },
          ].map((step, i) => (
            <div key={step.n} className="flex items-center flex-shrink-0">
              {i > 0 && <div className="w-12 md:w-24 h-[2px] bg-outline-variant mx-4" />}
              <div
                className={`flex items-center gap-3 ${
                  !step.done && !step.active ? 'opacity-40' : ''
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                    step.done
                      ? 'bg-secondary text-white'
                      : step.active
                      ? 'bg-primary text-white'
                      : 'border-2 border-outline text-on-surface-variant'
                  }`}
                >
                  {step.done ? (
                    <span className="material-symbols-outlined text-sm">check</span>
                  ) : (
                    step.n
                  )}
                </div>
                <span
                  className={`text-sm whitespace-nowrap ${
                    step.active ? 'font-bold text-primary' : 'text-on-surface-variant'
                  }`}
                >
                  {step.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary">Service Add-ons</h1>
          <p className="text-on-surface-variant mt-2">
            Enhance the farewell with thoughtful, professional services.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[24px]">
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
              {SERVICES.map((service) => {
                const selected = selectedServices.includes(service.id)
                const icon = serviceIcons[service.id] || 'star'
                return (
                  <div
                    key={service.id}
                    onClick={() => toggle(service.id)}
                    className={`relative bg-surface-container-lowest p-6 rounded-xl border-2 cursor-pointer transition-all ${
                      selected
                        ? 'border-secondary shadow-[0_8px_16px_rgba(45,62,80,0.08)]'
                        : 'border-outline-variant hover:shadow-[0_8px_16px_rgba(45,62,80,0.08)]'
                    }`}
                  >
                    {selected && (
                      <div className="absolute top-4 right-4 bg-secondary text-white rounded-full p-1">
                        <span className="material-symbols-outlined text-sm">check</span>
                      </div>
                    )}
                    <div className="w-12 h-12 rounded-xl bg-secondary-container flex items-center justify-center mb-4">
                      <span className="material-symbols-outlined text-on-secondary-container">
                        {icon}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-primary mb-2">{service.name}</h3>
                    <p className="text-sm text-on-surface-variant mb-4">{service.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-secondary">
                        +₱{service.price.toLocaleString()}
                      </span>
                      <button
                        className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
                          selected
                            ? 'bg-secondary text-white'
                            : 'bg-secondary-container text-on-secondary-container'
                        }`}
                      >
                        {selected ? 'Selected' : 'Add Service'}
                      </button>
                    </div>
                  </div>
                )
              })}

              {/* Bundle Suggestion */}
              <div className="md:col-span-2 bg-gradient-to-r from-primary to-primary-container p-6 rounded-xl text-white">
                <div className="flex items-center gap-3 mb-3">
                  <span className="material-symbols-outlined text-secondary">star</span>
                  <span className="font-bold">Peace & Legacy Bundle</span>
                  <span className="ml-auto bg-secondary text-primary text-xs font-bold px-3 py-1 rounded-full">
                    Save ₱8,500
                  </span>
                </div>
                <p className="text-sm text-on-primary/80 mb-4">
                  Chapel Service + Floral Tributes + Digital Legacy at a discounted rate.
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold">₱57,000</span>
                    <span className="text-sm line-through opacity-60 ml-2">₱65,500</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedServices(['s1', 's2', 's3'])
                    }}
                    className="bg-secondary-container text-on-secondary-container px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
                  >
                    Add Bundle
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => router.back()}
                className="flex-1 border border-outline-variant text-on-surface py-4 rounded-lg text-sm font-semibold hover:bg-surface-container transition-colors"
              >
                ← Back
              </button>
              <button
                onClick={handleContinue}
                className="flex-[2] bg-primary text-on-primary py-4 rounded-lg text-sm font-bold hover:bg-primary-container transition-colors flex items-center justify-center gap-2"
              >
                Continue to Review
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 bg-surface-container-lowest p-8 rounded-xl border border-outline-variant shadow-[0_2px_4px_rgba(45,62,80,0.05)]">
              <h2 className="text-xl font-semibold text-primary mb-6">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-on-surface-variant">Plot Package</span>
                  <span className="font-bold text-primary">₱{basePrice.toLocaleString()}</span>
                </div>
                {SERVICES.filter((s) => selectedServices.includes(s.id)).map((s) => (
                  <div key={s.id} className="flex justify-between text-sm">
                    <span className="text-on-surface-variant">{s.name}</span>
                    <span className="text-secondary font-medium">+₱{s.price.toLocaleString()}</span>
                  </div>
                ))}
                {selectedServices.length === 0 && (
                  <div className="text-sm text-on-surface-variant opacity-40 italic">
                    No add-ons selected
                  </div>
                )}
                <div className="border-t border-outline-variant pt-3 flex justify-between">
                  <span className="font-bold text-primary">Total</span>
                  <span className="text-2xl font-bold text-primary">₱{total.toLocaleString()}</span>
                </div>
              </div>
              <div className="bg-surface-container rounded-lg p-4">
                <div className="flex items-center gap-2 text-secondary mb-1">
                  <span className="material-symbols-outlined text-sm">payments</span>
                  <span className="text-sm font-semibold">Flexible Payments</span>
                </div>
                <p className="text-xs text-on-surface-variant">
                  Secure with a ₱10,000 deposit. Balance due within 30 days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
