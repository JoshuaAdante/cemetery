'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Image from 'next/image'

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!form.fullName.trim()) return setError('Full name is required.')
    if (!form.email.trim()) return setError('Email is required.')
    if (form.password.length < 8)
      return setError('Password must be at least 8 characters.')
    if (form.password !== form.confirmPassword)
      return setError('Passwords do not match.')
    if (!form.terms) return setError('You must agree to the Terms and Conditions.')

    setLoading(true)
    const supabase = createClient()

    const { error: signUpError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: { full_name: form.fullName },
      },
    })

    if (signUpError) {
      setError(signUpError.message)
      setLoading(false)
      return
    }

    router.push('/map')
  }

  return (
    <main className="w-full max-w-[1200px] mx-auto flex flex-col md:flex-row bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_2px_4px_rgba(45,62,80,0.05)] min-h-screen md:min-h-0 md:my-12">
      {/* Left: Visual */}
      <section className="hidden md:flex md:w-1/2 relative min-h-[600px] flex-col justify-end p-12 overflow-hidden">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVL3QM5k4S9SSbfhs3YvaMw_YIo6rkeoXXM_3ZaHug09aB3ae84bGAMpltHz_4g57pKJKZxN5jrlcOupLBX6ewqmHqPqBevjt4_eyXjWMY4zlg6jaKFEHQ1NpT_9p_x2Yb7CP_D2Mwx1kv7yS6w3QiSYOJLFUWZ_l4Vr-KwPzIILF1Fy4Ex3cs7tQaVzARW8XTv_MwTA6_DZ1G4_0ku4N0C-sZk_5NajYsXjutQWS4Mo2behL18WNTBL-beBffxEdeEWrXfWmfXmw"
          alt="Serene memorial park"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
        <div className="relative z-10 text-white">
          <h1 className="text-4xl font-bold mb-4">Butuan Memorial Portal</h1>
          <p className="text-lg text-white/80 max-w-md">
            Dedicated to honoring legacies and preserving memories for generations to come. Join our
            community of remembrance.
          </p>
        </div>
      </section>

      {/* Right: Form */}
      <section className="w-full md:w-1/2 p-[24px] md:p-12 lg:p-16 flex flex-col justify-center">
        <div className="mb-8 md:hidden">
          <h2 className="text-2xl font-bold text-primary">Butuan Memorial Portal</h2>
        </div>
        <div className="mb-10">
          <h3 className="text-3xl font-bold text-primary mb-2">Create Account</h3>
          <p className="text-on-surface-variant">
            Please fill in your details to begin your journey with us.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-error-container text-on-error-container rounded-lg text-sm">
            {error}
          </div>
        )}

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-on-surface" htmlFor="full_name">
              Full Name
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant">
                person
              </span>
              <input
                id="full_name"
                type="text"
                placeholder="John Doe"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg py-3 pl-10 pr-4 text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-on-surface" htmlFor="email">
              Email Address
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant">
                mail
              </span>
              <input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg py-3 pl-10 pr-4 text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-on-surface" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant">
                lock
              </span>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg py-3 pl-10 pr-4 text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-on-surface" htmlFor="confirm_password">
              Confirm Password
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant">
                shield
              </span>
              <input
                id="confirm_password"
                type="password"
                placeholder="••••••••"
                value={form.confirmPassword}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg py-3 pl-10 pr-4 text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
                required
              />
            </div>
          </div>

          <div className="flex items-start gap-3 py-2">
            <input
              id="terms"
              type="checkbox"
              checked={form.terms}
              onChange={(e) => setForm({ ...form, terms: e.target.checked })}
              className="mt-1 w-5 h-5 rounded border-outline-variant text-secondary focus:ring-secondary/20"
            />
            <label className="text-sm text-on-surface-variant" htmlFor="terms">
              I agree to the{' '}
              <Link href="#" className="text-secondary font-medium hover:underline">
                Terms and Conditions
              </Link>{' '}
              and{' '}
              <Link href="#" className="text-secondary font-medium hover:underline">
                Privacy Policy
              </Link>
              .
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-on-primary text-sm font-bold py-4 px-6 rounded-lg shadow-sm hover:bg-primary/95 active:scale-[0.98] transition-all w-full mt-2 disabled:opacity-60"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>

          <div className="text-center mt-4">
            <p className="text-sm text-on-surface-variant">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-secondary font-bold hover:underline ml-1">
                Log in
              </Link>
            </p>
          </div>
        </form>
      </section>
    </main>
  )
}
