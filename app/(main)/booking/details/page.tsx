'use client'

import { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Footer from '@/components/Footer'
import { CARAGA_CEMETERIES } from '@/lib/constants/cemeteries'

export default function BookingDetailsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const cemeteryId = searchParams.get('cemetery') || '1'
  const plotId = searchParams.get('plot') || 'p1'
  const price = Number(searchParams.get('price') || 450000)

  const cemetery = CARAGA_CEMETERIES.find((c) => c.id === cemeteryId) || CARAGA_CEMETERIES[0]

  const [form, setForm] = useState({
    // Personal
    fullName: '',
    email: '',
    phone: '',
    address: '',
    relationship: 'spouse',
    // Deceased
    deceasedName: '',
    dateOfBirth: '',
    dateOfPassing: '',
    placeOfBirth: '',
    religion: '',
    obituary: '',
    // Date
    intermentDate: '',
    preferredTime: 'morning',
  })

  const handle = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }))

  const handleContinue = () => {
    const params = new URLSearchParams({
      cemetery: cemeteryId,
      plot: plotId,
      price: price.toString(),
    })
    router.push(`/booking/services?${params}`)
  }

  return (
    <div className="min-h-screen bg-surface">
      <main className="max-w-[1200px] mx-auto px-4 md:px-[40px] py-12">
        {/* Progress Stepper */}
        <div className="flex items-center overflow-x-auto pb-4 mb-12 no-scrollbar">
          {[
            { n: 1, label: 'Select Plot', done: true },
            { n: 2, label: 'Details', active: true },
            { n: 3, label: 'Services', done: false },
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[24px]">
          <div className="lg:col-span-8 flex flex-col gap-[24px]">
            {/* Your Information */}
            <div className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant shadow-[0_2px_4px_rgba(45,62,80,0.05)]">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-secondary p-2 rounded-lg">
                  <span className="material-symbols-outlined text-white">person</span>
                </div>
                <h2 className="text-xl font-semibold text-primary">Your Information</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-on-surface mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={form.fullName}
                    onChange={(e) => handle('fullName', e.target.value)}
                    placeholder="Juan dela Cruz"
                    className="w-full border border-outline-variant rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => handle('email', e.target.value)}
                    placeholder="juan@email.com"
                    className="w-full border border-outline-variant rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-2">
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => handle('phone', e.target.value)}
                    placeholder="+63 9XX XXX XXXX"
                    className="w-full border border-outline-variant rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-all"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-on-surface mb-2">
                    Home Address
                  </label>
                  <input
                    type="text"
                    value={form.address}
                    onChange={(e) => handle('address', e.target.value)}
                    placeholder="Street, Barangay, City, Province"
                    className="w-full border border-outline-variant rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-all"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-on-surface mb-2">
                    Relationship to Deceased
                  </label>
                  <select
                    value={form.relationship}
                    onChange={(e) => handle('relationship', e.target.value)}
                    className="w-full border border-outline-variant rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-all bg-white"
                  >
                    <option value="spouse">Spouse</option>
                    <option value="child">Child</option>
                    <option value="parent">Parent</option>
                    <option value="sibling">Sibling</option>
                    <option value="relative">Other Relative</option>
                    <option value="authorized">Authorized Representative</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Deceased Information */}
            <div className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant shadow-[0_2px_4px_rgba(45,62,80,0.05)]">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-secondary p-2 rounded-lg">
                  <span className="material-symbols-outlined text-white">sentiment_calm</span>
                </div>
                <h2 className="text-xl font-semibold text-primary">Deceased Information</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-on-surface mb-2">
                    Full Name of Deceased *
                  </label>
                  <input
                    type="text"
                    value={form.deceasedName}
                    onChange={(e) => handle('deceasedName', e.target.value)}
                    placeholder="Full legal name"
                    className="w-full border border-outline-variant rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-2">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    value={form.dateOfBirth}
                    onChange={(e) => handle('dateOfBirth', e.target.value)}
                    className="w-full border border-outline-variant rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-2">
                    Date of Passing *
                  </label>
                  <input
                    type="date"
                    value={form.dateOfPassing}
                    onChange={(e) => handle('dateOfPassing', e.target.value)}
                    className="w-full border border-outline-variant rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-2">
                    Place of Birth
                  </label>
                  <input
                    type="text"
                    value={form.placeOfBirth}
                    onChange={(e) => handle('placeOfBirth', e.target.value)}
                    placeholder="City, Province"
                    className="w-full border border-outline-variant rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-2">
                    Religion / Faith
                  </label>
                  <select
                    value={form.religion}
                    onChange={(e) => handle('religion', e.target.value)}
                    className="w-full border border-outline-variant rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-all bg-white"
                  >
                    <option value="">Select religion</option>
                    <option value="roman_catholic">Roman Catholic</option>
                    <option value="protestant">Protestant</option>
                    <option value="islam">Islam</option>
                    <option value="iglesia">Iglesia ni Cristo</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-on-surface mb-2">
                    Obituary / Memorial Message
                  </label>
                  <textarea
                    rows={4}
                    value={form.obituary}
                    onChange={(e) => handle('obituary', e.target.value)}
                    placeholder="A brief life summary or message to be included in the memorial record..."
                    className="w-full border border-outline-variant rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-all resize-none"
                  />
                  <p className="text-xs text-on-surface-variant mt-1">
                    {form.obituary.length}/500 characters
                  </p>
                </div>
              </div>
            </div>

            {/* Interment Schedule */}
            <div className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant shadow-[0_2px_4px_rgba(45,62,80,0.05)]">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-secondary p-2 rounded-lg">
                  <span className="material-symbols-outlined text-white">calendar_month</span>
                </div>
                <h2 className="text-xl font-semibold text-primary">Interment Schedule</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-2">
                    Preferred Interment Date *
                  </label>
                  <input
                    type="date"
                    value={form.intermentDate}
                    onChange={(e) => handle('intermentDate', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full border border-outline-variant rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-2">
                    Preferred Time
                  </label>
                  <select
                    value={form.preferredTime}
                    onChange={(e) => handle('preferredTime', e.target.value)}
                    className="w-full border border-outline-variant rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-all bg-white"
                  >
                    <option value="morning">Morning (8:00 AM – 12:00 PM)</option>
                    <option value="afternoon">Afternoon (1:00 PM – 5:00 PM)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
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
                Continue to Services
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Booking Summary Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 bg-surface-container-lowest p-8 rounded-xl border border-outline-variant shadow-[0_2px_4px_rgba(45,62,80,0.05)]">
              <h2 className="text-xl font-semibold text-primary mb-6">Booking Summary</h2>
              <div className="rounded-lg overflow-hidden mb-4 border border-outline-variant">
                <div className="bg-surface-container p-4">
                  <p className="text-xs text-on-surface-variant">Selected Cemetery</p>
                  <p className="font-bold text-primary">{cemetery.name}</p>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    {cemetery.city}, Caraga
                  </p>
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex justify-between text-sm">
                  <span className="text-on-surface-variant">Plot Package</span>
                  <span className="font-bold text-primary">₱{price.toLocaleString()}</span>
                </li>
                <li className="flex justify-between text-sm opacity-40">
                  <span>Add-on Services</span>
                  <span>TBD</span>
                </li>
                <li className="border-t border-outline-variant pt-3 flex justify-between">
                  <span className="font-bold text-primary">Est. Total</span>
                  <span className="text-xl font-bold text-primary">₱{price.toLocaleString()}</span>
                </li>
              </ul>
              <p className="text-xs text-on-surface-variant">
                Final total will be confirmed after adding services in Step 3.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
