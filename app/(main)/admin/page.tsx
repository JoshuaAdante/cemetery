'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Booking, SupportMessage } from '@/types'
import { CARAGA_CEMETERIES } from '@/lib/constants/cemeteries'
import { getPlotName } from '@/lib/constants/plots'

type AdminProfile = {
  id: string
  full_name: string | null
  email: string | null
  phone: string | null
  location: string | null
  role: 'user' | 'admin' | null
  created_at: string
}

type AdminBooking = Booking & {
  plot_type?: string
  contact_name?: string
  contact_email?: string
  contact_phone?: string
  reference_code?: string
}

const statusStyles: Record<string, string> = {
  pending: 'bg-[#fff8e6] text-[#a26500]',
  confirmed: 'bg-[#e6f9f0] text-[#1a7f4b]',
  completed: 'bg-surface-container text-on-surface-variant',
  cancelled: 'bg-[#fde8e8] text-error',
}

function formatMoney(value?: number) {
  return `PHP ${(Number(value) || 0).toLocaleString()}`
}

function cemeteryName(id: string) {
  return CARAGA_CEMETERIES.find((cemetery) => cemetery.id === id)?.name || id
}

export default function AdminPage() {
  const router = useRouter()
  const supabase = createClient()
  const [adminId, setAdminId] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [notice, setNotice] = useState('')
  const [profiles, setProfiles] = useState<AdminProfile[]>([])
  const [bookings, setBookings] = useState<AdminBooking[]>([])
  const [messages, setMessages] = useState<SupportMessage[]>([])
  const [selectedUserId, setSelectedUserId] = useState('')
  const selectedUserIdRef = useRef('')
  const chatEndRef = useRef<HTMLDivElement>(null)
  const [conversationSearch, setConversationSearch] = useState('')
  const [reply, setReply] = useState('')
  const [isSending, setIsSending] = useState(false)

  const selectedMessages = messages.filter((message) => message.user_id === selectedUserId)

  const loadDashboard = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      router.push('/auth/login')
      return
    }

    setAdminId(user.id)

    const { data: ownProfile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .maybeSingle()

    const allowed =
      ownProfile?.role === 'admin' ||
      user.user_metadata?.role === 'admin' ||
      user.email?.toLowerCase().startsWith('admin@')

    setIsAdmin(Boolean(allowed))

    if (!allowed) {
      setIsLoading(false)
      return
    }

    const [profilesResult, bookingsResult, messagesResult] = await Promise.all([
      supabase
        .from('profiles')
        .select('id, full_name, email, phone, location, role, created_at')
        .order('created_at', { ascending: false }),
      supabase.from('bookings').select('*').order('created_at', { ascending: false }),
      supabase.from('messages').select('*').order('created_at', { ascending: true }),
    ])

    if (profilesResult.error || bookingsResult.error || messagesResult.error) {
      setNotice(
        'Some admin data is hidden by Supabase policies. Run the updated schema and set your profile role to admin.'
      )
    } else {
      setNotice('')
    }

    const profileRows = (profilesResult.data || []) as AdminProfile[]
    setProfiles(profileRows)
    setBookings((bookingsResult.data || []) as AdminBooking[])
    setMessages((messagesResult.data || []) as SupportMessage[])

    if (!selectedUserIdRef.current && profileRows.length > 0) {
      const firstUser =
        profileRows.find((profile) => profile.role !== 'admin')?.id || profileRows[0].id
      selectedUserIdRef.current = firstUser
      setSelectedUserId(firstUser)
    }

    setIsLoading(false)
  }

  useEffect(() => {
    loadDashboard()
    const timer = window.setInterval(loadDashboard, 12000)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    selectedUserIdRef.current = selectedUserId
  }, [selectedUserId])

  useEffect(() => {
    if (!selectedUserId || !isAdmin) return

    supabase
      .from('messages')
      .update({ read_by_admin: true })
      .eq('user_id', selectedUserId)
      .eq('sender_role', 'user')
      .eq('read_by_admin', false)
      .then(() => undefined)

    setMessages((current) =>
      current.map((message) =>
        message.user_id === selectedUserId && message.sender_role === 'user'
          ? { ...message, read_by_admin: true }
          : message
      )
    )
  }, [selectedUserId, isAdmin])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [selectedMessages.length, selectedUserId])

  const stats = useMemo(() => {
    const totalRevenue = bookings.reduce((sum, booking) => sum + Number(booking.total_amount || 0), 0)
    const pendingBookings = bookings.filter((booking) => booking.status === 'pending').length
    const unreadSupport = messages.filter(
      (message) => message.sender_role === 'user' && !message.read_by_admin
    ).length

    return [
      { label: 'Registered Users', value: profiles.length.toLocaleString(), icon: 'group' },
      { label: 'Plots Bought', value: bookings.length.toLocaleString(), icon: 'grid_view' },
      { label: 'Pending Bookings', value: pendingBookings.toLocaleString(), icon: 'pending_actions' },
      { label: 'Revenue', value: formatMoney(totalRevenue), icon: 'payments' },
      { label: 'Unread Support', value: unreadSupport.toLocaleString(), icon: 'mark_chat_unread' },
    ]
  }, [profiles, bookings, messages])

  const chartData = useMemo(() => {
    const now = new Date()
    const months = Array.from({ length: 6 }).map((_, index) => {
      const date = new Date(now.getFullYear(), now.getMonth() - (5 - index), 1)
      return {
        key: `${date.getFullYear()}-${date.getMonth()}`,
        label: date.toLocaleDateString('en-PH', { month: 'short' }),
        count: 0,
      }
    })

    bookings.forEach((booking) => {
      const date = new Date(booking.created_at)
      const key = `${date.getFullYear()}-${date.getMonth()}`
      const month = months.find((item) => item.key === key)
      if (month) month.count += 1
    })

    const max = Math.max(...months.map((item) => item.count), 1)
    return months.map((item) => ({ ...item, height: Math.max(12, (item.count / max) * 160) }))
  }, [bookings])

  const conversationUsers = useMemo(() => {
    const userIds = new Set<string>()

    profiles
      .filter((profile) => profile.role !== 'admin')
      .forEach((profile) => userIds.add(profile.id))
    messages.forEach((message) => userIds.add(message.user_id))

    return Array.from(userIds)
      .map((id) => {
        const profile = profiles.find((item) => item.id === id)
        const thread = messages.filter((message) => message.user_id === id)
        const latest = thread[thread.length - 1]
        const unread = thread.filter(
          (message) => message.sender_role === 'user' && !message.read_by_admin
        ).length
        const displayName = profile?.full_name || profile?.email || `User ${id.slice(0, 8)}`
        const contact = profile?.email || profile?.phone || 'No contact saved'

        return {
          id,
          displayName,
          contact,
          latest,
          unread,
          createdAt: profile?.created_at || latest?.created_at || '',
        }
      })
      .filter((item) => {
        const query = conversationSearch.trim().toLowerCase()
        if (!query) return true
        return (
          item.displayName.toLowerCase().includes(query) ||
          item.contact.toLowerCase().includes(query)
        )
      })
      .sort((a, b) => {
        const aTime = new Date(a.latest?.created_at || a.createdAt || 0).getTime()
        const bTime = new Date(b.latest?.created_at || b.createdAt || 0).getTime()
        return bTime - aTime
      })
  }, [conversationSearch, messages, profiles])

  const selectedUser =
    conversationUsers.find((user) => user.id === selectedUserId) ||
    conversationUsers[0] ||
    null

  useEffect(() => {
    if (!selectedUserId && conversationUsers.length > 0) {
      setSelectedUserId(conversationUsers[0].id)
    }
  }, [conversationUsers, selectedUserId])

  const sendReply = async () => {
    const trimmed = reply.trim()
    if (!trimmed || !selectedUserId || !adminId) return

    setIsSending(true)
    const { error } = await supabase.from('messages').insert({
      user_id: selectedUserId,
      sender_id: adminId,
      sender_role: 'admin',
      body: trimmed,
      read_by_user: false,
      read_by_admin: true,
    })
    setIsSending(false)

    if (error) {
      setNotice(error.message)
      return
    }

    setReply('')
    await loadDashboard()
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/auth/login')
    router.refresh()
  }

  if (isLoading) {
    return (
      <main className="min-h-[calc(100vh-80px)] bg-surface flex items-center justify-center">
        <div className="text-center text-on-surface-variant">
          <span className="material-symbols-outlined text-5xl text-secondary animate-pulse">
            dashboard
          </span>
          <p className="mt-3 text-sm">Loading admin dashboard...</p>
        </div>
      </main>
    )
  }

  if (!isAdmin) {
    return (
      <main className="min-h-[calc(100vh-80px)] bg-surface flex items-center justify-center px-4">
        <section className="max-w-md bg-surface-container-lowest border border-outline-variant rounded-xl p-8 text-center shadow-sm">
          <span className="material-symbols-outlined text-5xl text-error mb-4">admin_panel_settings</span>
          <h1 className="text-2xl font-bold text-primary">Admin access required</h1>
          <p className="text-sm text-on-surface-variant mt-2">
            Set this account as admin in Supabase before opening the dashboard.
          </p>
          <button
            onClick={() => router.push('/map')}
            className="mt-6 bg-primary text-on-primary px-5 py-3 rounded-lg text-sm font-semibold"
          >
            Back to map
          </button>
        </section>
      </main>
    )
  }

  return (
    <main className="min-h-[calc(100vh-80px)] bg-surface">
      <div className="max-w-[1280px] mx-auto px-4 md:px-[40px] py-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-secondary">
              Admin control
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-primary mt-1">Dashboard</h1>
            <p className="text-sm text-on-surface-variant mt-2">
              Manage registered users, bought plots, bookings, and support messages.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 border border-outline-variant px-4 py-3 rounded-lg text-sm font-semibold text-error hover:bg-error/10"
          >
            <span className="material-symbols-outlined text-sm">logout</span>
            Log out
          </button>
        </div>

        {notice && (
          <div className="mb-6 bg-[#fff8e6] text-[#7a4a00] border border-[#f1d28a] rounded-xl p-4 text-sm">
            {notice}
          </div>
        )}

        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 shadow-sm"
            >
              <div className="w-10 h-10 rounded-lg bg-secondary-container flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-on-secondary-container">
                  {stat.icon}
                </span>
              </div>
              <p className="text-2xl font-bold text-primary">{stat.value}</p>
              <p className="text-xs text-on-surface-variant mt-1">{stat.label}</p>
            </div>
          ))}
        </section>

        <section className="grid grid-cols-1 xl:grid-cols-12 gap-6 mb-8">
          <div className="xl:col-span-7 bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-primary">Booking Chart</h2>
                <p className="text-sm text-on-surface-variant">Bought plots in the last 6 months</p>
              </div>
              <span className="material-symbols-outlined text-secondary">bar_chart</span>
            </div>
            <div className="h-56 flex items-end gap-4">
              {chartData.map((month) => (
                <div key={month.key} className="flex-1 flex flex-col items-center gap-3">
                  <div className="w-full h-40 flex items-end">
                    <div
                      className="w-full rounded-t-lg bg-secondary"
                      style={{ height: `${month.height}px` }}
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-primary">{month.count}</p>
                    <p className="text-xs text-on-surface-variant">{month.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="xl:col-span-5 bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-primary mb-4">Recent Users</h2>
            <div className="space-y-3">
              {profiles.slice(0, 5).map((profile) => (
                <button
                  key={profile.id}
                  onClick={() => setSelectedUserId(profile.id)}
                  className="w-full flex items-center gap-3 text-left p-3 rounded-lg hover:bg-surface-container transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold">
                    {(profile.full_name || profile.email || 'U')[0].toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-primary truncate">
                      {profile.full_name || 'Unnamed user'}
                    </p>
                    <p className="text-xs text-on-surface-variant truncate">
                      {profile.email || profile.phone || 'No contact saved'}
                    </p>
                  </div>
                  <p className="text-[11px] text-on-surface-variant">
                    {new Date(profile.created_at).toLocaleDateString('en-PH', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                </button>
              ))}
              {profiles.length === 0 && (
                <p className="text-sm text-on-surface-variant py-8 text-center">
                  No registered users visible yet.
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          <div className="xl:col-span-12 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-outline-variant">
              <h2 className="text-xl font-bold text-primary">Users and Bought Plots</h2>
              <p className="text-sm text-on-surface-variant mt-1">
                Booking details, cemetery, plot package, contact, and status.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-surface-container text-on-surface-variant">
                  <tr>
                    <th className="text-left font-semibold px-4 py-3">User</th>
                    <th className="text-left font-semibold px-4 py-3">Plot</th>
                    <th className="text-left font-semibold px-4 py-3">Details</th>
                    <th className="text-left font-semibold px-4 py-3">Amount</th>
                    <th className="text-left font-semibold px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => {
                    const profile = profiles.find((item) => item.id === booking.user_id)
                    return (
                      <tr key={booking.id} className="border-t border-outline-variant">
                        <td className="px-4 py-4">
                          <p className="font-bold text-primary">
                            {booking.contact_name || profile?.full_name || 'Registered user'}
                          </p>
                          <p className="text-xs text-on-surface-variant">
                            {booking.contact_email || profile?.email || booking.contact_phone || 'No contact'}
                          </p>
                        </td>
                        <td className="px-4 py-4">
                          <p className="font-semibold text-primary">{getPlotName(booking.plot_type)}</p>
                          <p className="text-xs text-on-surface-variant">
                            {cemeteryName(booking.cemetery_id)}
                          </p>
                        </td>
                        <td className="px-4 py-4">
                          <p className="text-on-surface">
                            {booking.deceased_name || 'No deceased name saved'}
                          </p>
                          <p className="text-xs text-on-surface-variant">
                            {booking.interment_date
                              ? `Interment: ${new Date(booking.interment_date).toLocaleDateString('en-PH')}`
                              : booking.reference_code || 'No schedule'}
                          </p>
                        </td>
                        <td className="px-4 py-4 font-bold text-primary">
                          {formatMoney(booking.total_amount)}
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className={`text-xs px-3 py-1 rounded-full font-semibold capitalize ${
                              statusStyles[booking.status] || statusStyles.pending
                            }`}
                          >
                            {booking.status}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                  {bookings.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-4 py-12 text-center text-on-surface-variant">
                        No bought plots or bookings yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="xl:col-span-12 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-outline-variant flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-primary">Support Inbox</h2>
                <p className="text-sm text-on-surface-variant mt-1">
                  Receive user messages and reply like a private messenger thread.
                </p>
              </div>
              <div className="bg-secondary-container text-on-secondary-container px-4 py-2 rounded-lg text-sm font-semibold inline-flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">forum</span>
                {messages.filter((message) => message.sender_role === 'user' && !message.read_by_admin).length} unread
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] min-h-[620px]">
              <aside className="border-b lg:border-b-0 lg:border-r border-outline-variant bg-surface-container-lowest">
                <div className="p-4 border-b border-outline-variant">
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">
                      search
                    </span>
                    <input
                      value={conversationSearch}
                      onChange={(event) => setConversationSearch(event.target.value)}
                      placeholder="Search users..."
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-outline-variant text-sm outline-none focus:ring-2 focus:ring-secondary focus:border-secondary"
                    />
                  </div>
                </div>

                <div className="h-[320px] lg:h-[560px] overflow-y-auto">
                  {conversationUsers.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center px-6 text-on-surface-variant">
                      <span className="material-symbols-outlined text-5xl mb-3">person_search</span>
                      <p className="font-semibold text-primary">No users yet</p>
                      <p className="text-sm mt-1">Registered users and incoming messages will appear here.</p>
                    </div>
                  ) : (
                    conversationUsers.map((user) => {
                      const active = user.id === selectedUserId
                      return (
                        <button
                          key={user.id}
                          onClick={() => setSelectedUserId(user.id)}
                          className={`w-full text-left p-4 border-b border-outline-variant transition-colors ${
                            active
                              ? 'bg-secondary-container/40'
                              : 'hover:bg-surface-container-low'
                          }`}
                        >
                          <div className="flex gap-3">
                            <div className="relative flex-shrink-0">
                              <div className="w-11 h-11 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold">
                                {user.displayName[0]?.toUpperCase() || 'U'}
                              </div>
                              {user.unread > 0 && (
                                <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-error text-on-error text-[11px] font-bold flex items-center justify-center">
                                  {user.unread}
                                </span>
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between gap-2">
                                <p className="text-sm font-bold text-primary truncate">
                                  {user.displayName}
                                </p>
                                {user.latest && (
                                  <span className="text-[11px] text-on-surface-variant flex-shrink-0">
                                    {new Date(user.latest.created_at).toLocaleDateString('en-PH', {
                                      month: 'short',
                                      day: 'numeric',
                                    })}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-on-surface-variant truncate mt-0.5">
                                {user.latest
                                  ? `${user.latest.sender_role === 'admin' ? 'You: ' : ''}${user.latest.body}`
                                  : user.contact}
                              </p>
                            </div>
                          </div>
                        </button>
                      )
                    })
                  )}
                </div>
              </aside>

              <section className="flex flex-col bg-surface-container-low min-h-[620px]">
                <div className="px-5 py-4 border-b border-outline-variant bg-surface-container-lowest flex items-center justify-between gap-4">
                  {selectedUser ? (
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold flex-shrink-0">
                        {selectedUser.displayName[0]?.toUpperCase() || 'U'}
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-primary truncate">{selectedUser.displayName}</p>
                        <p className="text-xs text-on-surface-variant truncate">{selectedUser.contact}</p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-on-surface-variant">Select a user</p>
                  )}
                  <span className="material-symbols-outlined text-secondary">support_agent</span>
                </div>

                <div className="flex-1 overflow-y-auto p-4 md:p-6">
                  {!selectedUserId ? (
                    <div className="h-full flex items-center justify-center text-sm text-on-surface-variant text-center">
                      Choose a user from the left to open the message thread.
                    </div>
                  ) : selectedMessages.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-sm text-on-surface-variant text-center">
                      <span className="material-symbols-outlined text-5xl mb-3">chat</span>
                      <p className="font-semibold text-primary">No messages yet</p>
                      <p className="mt-1">Send a message to start support with {selectedUser?.displayName || 'this user'}.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {selectedMessages.map((message) => {
                        const adminMessage = message.sender_role === 'admin'
                        return (
                          <div
                            key={message.id}
                            className={`flex ${adminMessage ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-[76%] rounded-xl px-4 py-3 shadow-sm ${
                                adminMessage
                                  ? 'bg-primary text-on-primary'
                                  : 'bg-surface-container-lowest border border-outline-variant text-on-surface'
                              }`}
                            >
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-bold">
                                  {adminMessage ? 'Admin' : selectedUser?.displayName || 'User'}
                                </span>
                                <span
                                  className={
                                    adminMessage
                                      ? 'text-white/60 text-[11px]'
                                      : 'text-on-surface-variant text-[11px]'
                                  }
                                >
                                  {new Date(message.created_at).toLocaleString('en-PH', {
                                    month: 'short',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: '2-digit',
                                  })}
                                </span>
                              </div>
                              <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.body}</p>
                            </div>
                          </div>
                        )
                      })}
                      <div ref={chatEndRef} />
                    </div>
                  )}
                </div>

                <div className="p-4 border-t border-outline-variant bg-surface-container-lowest">
                  <div className="flex gap-3">
                    <textarea
                      rows={2}
                      value={reply}
                      onChange={(event) => setReply(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' && !event.shiftKey) {
                          event.preventDefault()
                          sendReply()
                        }
                      }}
                      placeholder={
                        selectedUser
                          ? `Message ${selectedUser.displayName}...`
                          : 'Select a user first...'
                      }
                      className="flex-1 resize-none border border-outline-variant rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-secondary focus:border-secondary"
                    />
                    <button
                      onClick={sendReply}
                      disabled={!selectedUserId || !reply.trim() || isSending}
                      className="w-14 rounded-lg bg-primary text-on-primary flex items-center justify-center hover:bg-primary-container disabled:opacity-50 transition-colors"
                      title="Send"
                    >
                      <span className="material-symbols-outlined">send</span>
                    </button>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
