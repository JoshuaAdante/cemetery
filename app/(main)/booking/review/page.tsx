'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Footer from '@/components/Footer'
import { CARAGA_CEMETERIES, SERVICES } from '@/lib/constants/cemeteries'
import { PLOT_NAMES } from '@/lib/constants/plots'

export default function BookingReviewPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const supabase = createClient()

  const cemeteryId = searchParams.get('cemetery') || '1'
  const plotId = searchParams.get('plot') || 'p1'
  const basePrice = Number(searchParams.get('price') || 450000)
  const addons = Number(searchParams.get('addons') || 0)
  const serviceIds = (searchParams.get('services') || '').split(',').filter(Boolean)
  const total = basePrice + addons

  const cemetery = CARAGA_CEMETERIES.find((c) => c.id === cemeteryId) || CARAGA_CEMETERIES[0]
  const selectedServices = SERVICES.filter((s) => serviceIds.includes(s.id))

  const [cardForm, setCardForm] = useState({
    name: '',
    number: '',
    expiry: '',
    cvv: '',
  })
  const [bookingDraft, setBookingDraft] = useState<Record<string, string> | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const rawDraft = sessionStorage.getItem('bookingDraft')
    if (!rawDraft) return

    try {
      setBookingDraft(JSON.parse(rawDraft))
    } catch {
      setBookingDraft(null)
    }
  }, [])

  const handle = (field: string, value: string) => setCardForm((f) => ({ ...f, [field]: value }))

  const formatCardNumber = (v: string) => {
    return v
      .replace(/\D/g, '')
      .slice(0, 16)
      .replace(/(.{4})/g, '$1 ')
      .trim()
  }

  const formatExpiry = (v: string) => {
    return v
      .replace(/\D/g, '')
      .slice(0, 4)
      .replace(/(.{2})/, '$1/')
  }

  const handleSubmit = async () => {
    if (!cardForm.name || !cardForm.number || !cardForm.expiry || !cardForm.cvv) {
      setError('Please fill in all payment details.')
      return
    }
    setIsLoading(true)
    setError('')

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/auth/login')
        return
      }

      const { error: dbError } = await supabase.from('bookings').insert({
        user_id: user.id,
        cemetery_id: cemeteryId,
        plot_type: plotId,
        status: 'pending',
        total_amount: total,
        deposit_paid: 10000,
        service_ids: serviceIds,
        interment_date: bookingDraft?.intermentDate || null,
        preferred_time: bookingDraft?.preferredTime || null,
        deceased_name: bookingDraft?.deceasedName || null,
        date_of_birth: bookingDraft?.dateOfBirth || null,
        date_of_passing: bookingDraft?.dateOfPassing || null,
        place_of_birth: bookingDraft?.placeOfBirth || null,
        religion: bookingDraft?.religion || null,
        obituary: bookingDraft?.obituary || null,
        contact_name: bookingDraft?.fullName || user.user_metadata?.full_name || null,
        contact_email: bookingDraft?.email || user.email || null,
        contact_phone: bookingDraft?.phone || null,
        contact_address: bookingDraft?.address || null,
        relationship: bookingDraft?.relationship || null,
      })

      if (dbError) throw dbError

      sessionStorage.removeItem('bookingDraft')
      router.push('/profile?tab=bookings&success=1')
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-surface">
      <main className="max-w-[1200px] mx-auto px-4 md:px-[40px] py-12">
        {/* Progress Stepper */}
        <div className="flex items-center overflow-x-auto pb-4 mb-12 no-scrollbar">
          {[
            { n: 1, label: 'Select Plot', done: true },
            { n: 2, label: 'Details', done: true },
            { n: 3, label: 'Services', done: true },
            { n: 4, label: 'Review', active: true },
          ].map((step, i) => (
            <div key={step.n} className="flex items-center flex-shrink-0">
              {i > 0 && <div className="w-12 md:w-24 h-[2px] bg-secondary/40 mx-4" />}
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                    step.done
                      ? 'bg-secondary text-white'
                      : 'bg-primary text-white'
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
                    step.active ? 'font-bold text-primary' : 'text-secondary'
                  }`}
                >
                  {step.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary">Review & Payment</h1>
          <p className="text-on-surface-variant mt-2">
            Confirm your booking details and complete payment.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[24px]">
          <div className="lg:col-span-7 flex flex-col gap-[24px]">
            {/* Booking Summary Card */}
            <div className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant shadow-[0_2px_4px_rgba(45,62,80,0.05)]">
              <h2 className="text-xl font-semibold text-primary mb-6">Booking Overview</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4 pb-4 border-b border-outline-variant">
                  <div className="bg-secondary-container p-3 rounded-xl">
                    <span className="material-symbols-outlined text-on-secondary-container">
                      location_on
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-on-surface-variant">Cemetery</p>
                    <p className="font-bold text-primary">{cemetery.name}</p>
                    <p className="text-sm text-on-surface-variant">
                      {cemetery.address}, {cemetery.city}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 pb-4 border-b border-outline-variant">
                  <div className="bg-secondary-container p-3 rounded-xl">
                    <span className="material-symbols-outlined text-on-secondary-container">
                      grid_view
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-on-surface-variant">Plot Package</p>
                    <p className="font-bold text-primary">{PLOT_NAMES[plotId] || 'Premium Plot'}</p>
                    <p className="text-sm text-secondary">₱{basePrice.toLocaleString()}</p>
                  </div>
                </div>
                {selectedServices.length > 0 && (
                  <div className="flex items-start gap-4">
                    <div className="bg-secondary-container p-3 rounded-xl">
                      <span className="material-symbols-outlined text-on-secondary-container">
                        add_circle
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-on-surface-variant">Add-on Services</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {selectedServices.map((s) => (
                          <span
                            key={s.id}
                            className="bg-secondary-container text-on-secondary-container text-xs px-3 py-1 rounded-full"
                          >
                            {s.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Payment */}
            <div className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant shadow-[0_2px_4px_rgba(45,62,80,0.05)]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-primary">Payment Information</h2>
                <div className="flex gap-2">
                  <div className="bg-surface-container px-2 py-1 rounded text-xs font-bold text-on-surface-variant">
                    VISA
                  </div>
                  <div className="bg-surface-container px-2 py-1 rounded text-xs font-bold text-on-surface-variant">
                    MC
                  </div>
                  <div className="bg-surface-container px-2 py-1 rounded text-xs font-bold text-on-surface-variant">
                    JCB
                  </div>
                </div>
              </div>

              {error && (
                <div className="bg-error/10 text-error text-sm p-4 rounded-lg mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">error</span>
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-2">
                    Cardholder Name *
                  </label>
                  <input
                    type="text"
                    value={cardForm.name}
                    onChange={(e) => handle('name', e.target.value)}
                    placeholder="As printed on card"
                    className="w-full border border-outline-variant rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-2">
                    Card Number *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={cardForm.number}
                      onChange={(e) => handle('number', formatCardNumber(e.target.value))}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      className="w-full border border-outline-variant rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-all pr-12"
                    />
                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline">
                      credit_card
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-on-surface mb-2">
                      Expiry Date *
                    </label>
                    <input
                      type="text"
                      value={cardForm.expiry}
                      onChange={(e) => handle('expiry', formatExpiry(e.target.value))}
                      placeholder="MM/YY"
                      maxLength={5}
                      className="w-full border border-outline-variant rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-on-surface mb-2">
                      CVV *
                    </label>
                    <input
                      type="text"
                      value={cardForm.cvv}
                      onChange={(e) => handle('cvv', e.target.value.replace(/\D/g, '').slice(0, 4))}
                      placeholder="•••"
                      maxLength={4}
                      className="w-full border border-outline-variant rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-6 text-xs text-on-surface-variant">
                <span className="material-symbols-outlined text-secondary text-sm">lock</span>
                Your payment information is encrypted and secure.
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
                onClick={handleSubmit}
                disabled={isLoading}
                className="flex-[2] bg-primary text-on-primary py-4 rounded-lg text-sm font-bold hover:bg-primary-container disabled:opacity-50 transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-sm">
                      autorenew
                    </span>
                    Processing...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-sm">lock</span>
                    Confirm & Pay ₱10,000 Deposit
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Price Summary Sidebar */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 flex flex-col gap-6">
              <div className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant shadow-[0_2px_4px_rgba(45,62,80,0.05)]">
                <h2 className="text-xl font-semibold text-primary mb-6">Price Breakdown</h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-on-surface-variant">Plot Package</span>
                    <span className="font-medium text-primary">₱{basePrice.toLocaleString()}</span>
                  </div>
                  {selectedServices.map((s) => (
                    <div key={s.id} className="flex justify-between text-sm">
                      <span className="text-on-surface-variant">{s.name}</span>
                      <span className="text-secondary">+₱{s.price.toLocaleString()}</span>
                    </div>
                  ))}
                  <div className="border-t border-outline-variant pt-4 flex justify-between">
                    <span className="font-bold text-primary text-base">Total</span>
                    <span className="text-2xl font-bold text-primary">
                      ₱{total.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="bg-secondary-container/30 rounded-xl p-4 mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-semibold text-primary">Deposit Due Today</span>
                    <span className="font-bold text-primary">₱10,000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-on-surface-variant">Remaining Balance</span>
                    <span className="text-on-surface-variant">
                      ₱{(total - 10000).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    { icon: 'verified_user', text: 'Secure 256-bit encryption' },
                    { icon: 'support_agent', text: 'Dedicated support line' },
                    { icon: 'history_edu', text: 'Digital Legacy Charter included' },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-secondary text-sm">
                        {item.icon}
                      </span>
                      <span className="text-sm text-on-surface-variant">{item.text}</span>
                    </div>
                  ))}
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
