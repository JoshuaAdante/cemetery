'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { SupportMessage } from '@/types'

interface NavbarProps {
  userInitials?: string
  hasAvatar?: boolean
  isAdmin?: boolean
}

export default function Navbar({ userInitials, isAdmin }: NavbarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [userId, setUserId] = useState('')
  const [unreadMessages, setUnreadMessages] = useState<SupportMessage[]>([])

  const isActive = (path: string) => pathname.startsWith(path)

  const loadUnreadMessages = async () => {
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return
    setUserId(user.id)

    const { data } = await supabase
      .from('messages')
      .select('*')
      .eq('user_id', user.id)
      .eq('sender_role', 'admin')
      .eq('read_by_user', false)
      .order('created_at', { ascending: false })
      .limit(5)

    setUnreadMessages((data || []) as SupportMessage[])
  }

  useEffect(() => {
    loadUnreadMessages()
    const timer = window.setInterval(loadUnreadMessages, 15000)
    return () => window.clearInterval(timer)
  }, [])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/auth/login')
    router.refresh()
  }

  const navLinks = [
    { href: '/map', label: 'Map' },
    { href: '/booking', label: 'Booking' },
    { href: '/support', label: 'Support' },
    { href: '/profile', label: 'Profile' },
    ...(isAdmin ? [{ href: '/admin', label: 'Admin' }] : []),
  ]

  const openNotifications = async () => {
    setNotificationsOpen((open) => !open)
  }

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
          <div className="relative">
            <button
              onClick={openNotifications}
              className="relative p-2 rounded-full hover:bg-surface-container-low transition-all text-on-surface-variant"
              title="Notifications"
            >
              <span className="material-symbols-outlined">notifications</span>
              {unreadMessages.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-5 h-5 px-1 rounded-full bg-error text-on-error text-[11px] font-bold flex items-center justify-center">
                  {unreadMessages.length}
                </span>
              )}
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-3 w-80 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-xl overflow-hidden z-[80]">
                <div className="px-4 py-3 border-b border-outline-variant">
                  <p className="text-sm font-bold text-primary">Notifications</p>
                </div>
                {unreadMessages.length === 0 ? (
                  <div className="p-4 text-sm text-on-surface-variant">
                    No new admin messages.
                  </div>
                ) : (
                  <div className="max-h-72 overflow-y-auto">
                    {unreadMessages.map((message) => (
                      <Link
                        key={message.id}
                        href="/support"
                        className="block px-4 py-3 border-b border-outline-variant hover:bg-surface-container-low"
                      >
                        <p className="text-xs font-bold text-secondary mb-1">Admin message</p>
                        <p className="text-sm text-on-surface line-clamp-2">{message.body}</p>
                      </Link>
                    ))}
                  </div>
                )}
                <Link
                  href="/support"
                  className="block px-4 py-3 text-sm font-semibold text-secondary hover:bg-surface-container-low"
                >
                  Open support chat
                </Link>
              </div>
            )}
          </div>

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
