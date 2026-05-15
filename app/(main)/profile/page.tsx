'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { User } from '@supabase/supabase-js'
import Footer from '@/components/Footer'

type Tab = 'profile' | 'bookings' | 'records'

const MOCK_BOOKINGS = [
  {
    id: 'bk-001',
    cemetery: 'Butuan Memorial Park — Libertad',
    plot: 'Premium Estate',
    status: 'confirmed',
    date: '2024-11-15',
    amount: 450000,
    reference: 'BMP-2024-0091',
  },
  {
    id: 'bk-002',
    cemetery: 'Eternal Gardens Memorial — Baan',
    plot: 'Serenity Garden',
    status: 'pending',
    date: '2024-12-01',
    amount: 280000,
    reference: 'EGM-2024-0204',
  },
]

const MOCK_RECORDS = [
  {
    id: 'mr-001',
    name: 'Ramon S. Aguinaldo',
    born: '1942-03-14',
    passed: '2024-10-01',
    cemetery: 'Butuan Memorial Park — Libertad',
    plot: 'Premium Estate',
  },
]

const STATUS_STYLES: Record<string, string> = {
  confirmed: 'bg-[#e6f9f0] text-[#1a7f4b]',
  pending: 'bg-[#fff8e6] text-[#a26500]',
  completed: 'bg-surface-container text-on-surface-variant',
  cancelled: 'bg-[#fde8e8] text-error',
}

export default function ProfilePage() {
  const searchParams = useSearchParams()
  const supabase = createClient()

  const defaultTab = (searchParams.get('tab') as Tab) || 'profile'
  const [activeTab, setActiveTab] = useState<Tab>(defaultTab)
  const [user, setUser] = useState<User | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [successMsg, setSuccessMsg] = useState(
    searchParams.get('success') ? 'Booking confirmed! We will contact you shortly.' : ''
  )

  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: 'Butuan City, Caraga',
  })

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUser(user)
        setProfile({
          fullName: user.user_metadata?.full_name || '',
          email: user.email || '',
          phone: user.user_metadata?.phone || '',
          location: user.user_metadata?.location || 'Butuan City, Caraga',
        })
      }
    }
    getUser()
  }, [])

  const initials = profile.fullName
    ? profile.fullName.split(' ').slice(0, 2).map((n) => n[0]).join('').toUpperCase()
    : profile.email?.[0]?.toUpperCase() || 'U'

  const handleSave = async () => {
    setIsSaving(true)
    const { error } = await supabase.auth.updateUser({
      data: {
        full_name: profile.fullName,
        phone: profile.phone,
        location: profile.location,
      },
    })
    setIsSaving(false)
    if (!error) {
      setIsEditing(false)
      setSuccessMsg('Profile updated successfully.')
      setTimeout(() => setSuccessMsg(''), 3000)
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'profile', label: 'Profile', icon: 'person' },
    { id: 'bookings', label: 'My Bookings', icon: 'calendar_month' },
    { id: 'records', label: 'Legacy Records', icon: 'history_edu' },
  ]

  return (
    <div className="min-h-screen bg-surface">
      <main className="max-w-[1200px] mx-auto px-4 md:px-[40px] py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary">My Account</h1>
          <p className="text-on-surface-variant mt-2">
            Manage your profile, bookings, and memorial records.
          </p>
        </div>

        {successMsg && (
          <div className="mb-6 bg-[#e6f9f0] text-[#1a7f4b] p-4 rounded-xl flex items-center gap-3 border border-[#b2dfc6]">
            <span className="material-symbols-outlined">check_circle</span>
            {successMsg}
          </div>
        )}

        {/* Tab Bar */}
        <div className="flex gap-1 bg-surface-container p-1 rounded-xl mb-8 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-surface-container-lowest text-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              <span className="material-symbols-outlined text-sm">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-[24px]">
            {/* Avatar Card */}
            <div className="lg:col-span-4">
              <div className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant shadow-sm flex flex-col items-center text-center gap-4">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-3xl font-bold text-white">
                    {initials}
                  </div>
                  <button className="absolute bottom-0 right-0 bg-secondary text-white w-8 h-8 rounded-full flex items-center justify-center shadow hover:bg-secondary/90 transition-colors">
                    <span className="material-symbols-outlined text-sm">edit</span>
                  </button>
                </div>
                <div>
                  <p className="text-xl font-bold text-primary">{profile.fullName || 'User'}</p>
                  <p className="text-sm text-on-surface-variant">{profile.email}</p>
                  <p className="text-sm text-on-surface-variant">{profile.location}</p>
                </div>
                <div className="w-full border-t border-outline-variant pt-4 space-y-2">
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center justify-center gap-2 text-sm text-error hover:bg-error/10 py-2 px-4 rounded-lg transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">logout</span>
                    Sign Out
                  </button>
                </div>
              </div>
            </div>

            {/* Edit Profile Form */}
            <div className="lg:col-span-8">
              <div className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-primary">Personal Information</h2>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 text-secondary text-sm font-medium hover:underline"
                    >
                      <span className="material-symbols-outlined text-sm">edit</span>
                      Edit
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsEditing(false)}
                      className="flex items-center gap-2 text-on-surface-variant text-sm font-medium hover:underline"
                    >
                      Cancel
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    { field: 'fullName', label: 'Full Name', type: 'text' },
                    { field: 'email', label: 'Email Address', type: 'email' },
                    { field: 'phone', label: 'Contact Number', type: 'tel' },
                    { field: 'location', label: 'Location', type: 'text' },
                  ].map(({ field, label, type }) => (
                    <div key={field}>
                      <label className="block text-sm font-medium text-on-surface mb-2">
                        {label}
                      </label>
                      <input
                        type={type}
                        value={profile[field as keyof typeof profile]}
                        disabled={!isEditing || field === 'email'}
                        onChange={(e) =>
                          setProfile((p) => ({ ...p, [field]: e.target.value }))
                        }
                        className={`w-full border rounded-lg px-4 py-3 text-sm outline-none transition-all ${
                          isEditing && field !== 'email'
                            ? 'border-outline-variant focus:ring-2 focus:ring-secondary focus:border-secondary'
                            : 'border-transparent bg-surface-container text-on-surface-variant'
                        }`}
                      />
                    </div>
                  ))}
                </div>

                {isEditing && (
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="mt-6 bg-primary text-on-primary px-8 py-3 rounded-lg text-sm font-bold hover:bg-primary-container disabled:opacity-50 transition-colors"
                  >
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </button>
                )}
              </div>

              {/* Change Password */}
              <div className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant shadow-sm mt-6">
                <h2 className="text-xl font-semibold text-primary mb-4">Change Password</h2>
                <p className="text-sm text-on-surface-variant mb-4">
                  We will send a password reset link to your registered email.
                </p>
                <button
                  onClick={() =>
                    supabase.auth.resetPasswordForEmail(profile.email)
                  }
                  className="flex items-center gap-2 border border-outline-variant text-on-surface px-6 py-3 rounded-lg text-sm font-medium hover:bg-surface-container transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">lock_reset</span>
                  Send Reset Link
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="flex flex-col gap-6">
            {MOCK_BOOKINGS.length === 0 ? (
              <div className="text-center py-20 bg-surface-container-lowest rounded-xl border border-outline-variant">
                <span className="material-symbols-outlined text-5xl text-on-surface-variant block mb-4">
                  calendar_month
                </span>
                <p className="text-on-surface-variant">No bookings yet.</p>
              </div>
            ) : (
              MOCK_BOOKINGS.map((b) => (
                <div
                  key={b.id}
                  className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-bold text-primary">{b.cemetery}</h3>
                        <span
                          className={`text-xs px-3 py-1 rounded-full font-medium capitalize ${
                            STATUS_STYLES[b.status]
                          }`}
                        >
                          {b.status}
                        </span>
                      </div>
                      <p className="text-sm text-on-surface-variant">{b.plot}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-primary">
                        ₱{b.amount.toLocaleString()}
                      </p>
                      <p className="text-xs text-on-surface-variant">Ref: {b.reference}</p>
                    </div>
                  </div>
                  <div className="border-t border-outline-variant pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div className="flex items-center gap-2 text-sm text-on-surface-variant">
                      <span className="material-symbols-outlined text-sm">calendar_month</span>
                      Scheduled: {new Date(b.date).toLocaleDateString('en-PH', { dateStyle: 'long' })}
                    </div>
                    <div className="flex gap-3">
                      <button className="text-sm text-secondary hover:underline">
                        View Details
                      </button>
                      {b.status === 'pending' && (
                        <button className="text-sm text-error hover:underline">Cancel</button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Legacy Records Tab */}
        {activeTab === 'records' && (
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <p className="text-on-surface-variant text-sm">
                {MOCK_RECORDS.length} memorial record{MOCK_RECORDS.length !== 1 ? 's' : ''}
              </p>
              <button className="bg-primary text-on-primary px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-primary-container transition-colors">
                <span className="material-symbols-outlined text-sm">add</span>
                Add Record
              </button>
            </div>

            {MOCK_RECORDS.map((r) => (
              <div
                key={r.id}
                className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm"
              >
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-full bg-secondary-container flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-on-secondary-container">
                      {r.name[0]}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-primary">{r.name}</h3>
                    <p className="text-sm text-on-surface-variant">
                      {new Date(r.born).getFullYear()} — {new Date(r.passed).getFullYear()}
                    </p>
                    <div className="flex flex-wrap gap-4 mt-4 text-sm text-on-surface-variant">
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">location_on</span>
                        {r.cemetery}
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">grid_view</span>
                        {r.plot}
                      </div>
                    </div>
                  </div>
                  <button className="text-secondary hover:underline text-sm flex-shrink-0">
                    Edit
                  </button>
                </div>
              </div>
            ))}

            {MOCK_RECORDS.length === 0 && (
              <div className="text-center py-20 bg-surface-container-lowest rounded-xl border border-outline-variant">
                <span className="material-symbols-outlined text-5xl text-on-surface-variant block mb-4">
                  history_edu
                </span>
                <p className="text-on-surface-variant">No memorial records yet.</p>
              </div>
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
