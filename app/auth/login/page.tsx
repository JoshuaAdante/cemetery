'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Image from 'next/image'

export default function LoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '', remember: false })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const supabase = createClient()
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    })

    if (signInError) {
      setError(signInError.message)
      setLoading(false)
      return
    }

    router.push('/map')
    router.refresh()
  }

  const handleGoogleLogin = async () => {
    const supabase = createClient()
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
  }

  return (
    <main className="flex-grow flex items-center justify-center px-4 md:px-[40px] py-12 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-fixed/20 via-background to-secondary-fixed/10" />
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbDzeM7WkCIPqtaCvQSmHHC49W_YKZEdY2TGP3x5exxQ1cUIYgkd-V7yYcYSYFPKgrtnD9PHsbyl9y1ExD4hHuGP_4mHJLxVdilb4rz_KgLS7AuB6SBQY1c0YcmX26gzBvkiW3O_ucWVwT8ZGY1wAgr8TJhEHr7iTBNpytPSiHmVogPCvVdRxplVDr3382cHCfDkzR5wXvdVbi397PXc2SeMS_hBkRIya9Ib9vpS3sNDIE6-_NIQbakKHsdagCQL-MyRk7UGS6MZk"
          alt=""
          fill
          className="object-cover opacity-10 mix-blend-overlay"
        />
      </div>

      <div className="w-full max-w-[440px] z-10">
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl shadow-[0_8px_32px_rgba(23,40,57,0.08)] p-8 md:p-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary tracking-tight mb-2">
              Butuan Memorial Portal
            </h1>
            <p className="text-sm text-on-surface-variant">Sign in to your account</p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-error-container text-on-error-container rounded-lg text-sm">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-on-surface" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant">
                  mail
                </span>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all text-sm placeholder:text-outline-variant"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-on-surface" htmlFor="password">
                  Password
                </label>
                <Link
                  href="#"
                  className="text-sm text-secondary hover:underline transition-all"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant">
                  lock
                </span>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full pl-10 pr-10 py-3 bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all text-sm placeholder:text-outline-variant"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-outline-variant hover:text-on-surface transition-colors"
                >
                  <span className="material-symbols-outlined">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                checked={form.remember}
                onChange={(e) => setForm({ ...form, remember: e.target.checked })}
                className="w-4 h-4 text-secondary border-outline-variant rounded focus:ring-secondary cursor-pointer"
              />
              <label
                htmlFor="remember"
                className="ml-2 text-sm text-on-surface-variant cursor-pointer select-none"
              >
                Remember me for 30 days
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-primary text-on-primary rounded-lg text-sm font-bold shadow-sm hover:bg-primary-container active:scale-[0.98] transition-all disabled:opacity-60"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-outline-variant" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-surface-container-lowest text-xs text-outline">
                Or continue with
              </span>
            </div>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-3 w-full py-3 px-4 bg-surface border border-outline-variant rounded-lg text-sm text-on-surface hover:bg-surface-container-low active:scale-[0.98] transition-all"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1.01.67-2.28 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Google
          </button>

          <div className="mt-10 pt-6 border-t border-outline-variant/30 text-center">
            <p className="text-sm text-on-surface-variant">
              Don&apos;t have an account?{' '}
              <Link
                href="/auth/register"
                className="text-secondary font-bold hover:underline transition-all"
              >
                Register here
              </Link>
            </p>
          </div>
        </div>

        <footer className="mt-8 flex justify-center space-x-6">
          <Link href="#" className="text-xs text-outline hover:text-on-surface-variant transition-colors">
            Privacy Policy
          </Link>
          <Link href="#" className="text-xs text-outline hover:text-on-surface-variant transition-colors">
            Terms of Service
          </Link>
          <Link href="#" className="text-xs text-outline hover:text-on-surface-variant transition-colors">
            Help Center
          </Link>
        </footer>
      </div>
    </main>
  )
}
