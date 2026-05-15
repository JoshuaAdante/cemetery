'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

interface NavbarProps {
  userInitials?: string
  hasAvatar?: boolean
}

export default function Navbar({ userInitials, hasAvatar }: NavbarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)

  const isActive = (path: string) => pathname.startsWith(path)

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/auth/login')
    router.refresh()
  }

  const navLinks = [
    { href: '/map', label: 'Map' },
    { href: '/booking', label: 'Booking' },
    { href: '/profile', label: 'Profile' },
  ]

  return (
    <header className="bg-surface-container-lowest shadow-[0_2px_4px_rgba(45,62,80,0.05)] sticky top-0 z-50">
      <div className="flex justify-between items-center w-full px-[40px] h-20 max-w-[1200px] mx-auto">
        <Link
          href="/"
          className="text-2xl font-bold text-primary tracking-tight hover:opacity-90 transition-opacity"
        >
          Butuan Memorial Portal
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-[24px]">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? 'text-secondary border-b-2 border-secondary pb-1 font-bold'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-surface-container-low transition-all text-on-surface-variant">
            <span className="material-symbols-outlined">notifications</span>
          </button>

          {/* Avatar / Initials */}
          <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-semibold text-sm cursor-pointer"
            onClick={handleLogout}
            title="Sign out"
          >
            {userInitials || (
              <span className="material-symbols-outlined">account_circle</span>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="material-symbols-outlined text-primary">
              {menuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-surface-container-lowest border-t border-outline-variant px-[16px] py-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? 'bg-secondary-container text-on-secondary-container'
                  : 'text-on-surface-variant hover:bg-surface-container-low'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 rounded-lg text-sm font-medium text-error hover:bg-error-container transition-colors"
          >
            Sign Out
          </button>
        </div>
      )}
    </header>
  )
}
