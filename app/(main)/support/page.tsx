'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { SupportMessage } from '@/types'

export default function SupportPage() {
  const router = useRouter()
  const supabase = createClient()
  const bottomRef = useRef<HTMLDivElement>(null)
  const [userId, setUserId] = useState('')
  const [messages, setMessages] = useState<SupportMessage[]>([])
  const [body, setBody] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState('')

  const loadMessages = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .maybeSingle()

    const isAdmin =
      profile?.role === 'admin' ||
      user.user_metadata?.role === 'admin' ||
      user.email?.toLowerCase() === 'admin@cemetery.com'

    if (isAdmin) {
      router.replace('/admin')
      return
    }

    setUserId(user.id)

    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: true })

    if (error) {
      setError('Support messages are not ready yet. Please run the updated Supabase schema.')
      setMessages([])
    } else {
      setError('')
      setMessages((data || []) as SupportMessage[])
      await supabase
        .from('messages')
        .update({ read_by_user: true })
        .eq('user_id', user.id)
        .eq('sender_role', 'admin')
        .eq('read_by_user', false)
    }

    setIsLoading(false)
  }

  useEffect(() => {
    loadMessages()
    const timer = window.setInterval(loadMessages, 10000)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length])

  const sendMessage = async () => {
    const trimmed = body.trim()
    if (!trimmed || !userId) return

    setIsSending(true)
    const { error } = await supabase.from('messages').insert({
      user_id: userId,
      sender_id: userId,
      sender_role: 'user',
      body: trimmed,
      read_by_user: true,
      read_by_admin: false,
    })
    setIsSending(false)

    if (error) {
      setError(error.message)
      return
    }

    setBody('')
    await loadMessages()
  }

  return (
    <main className="min-h-[calc(100vh-80px)] bg-surface">
      <div className="max-w-[1100px] mx-auto px-4 md:px-[40px] py-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-primary">Support Messages</h1>
            <p className="text-sm text-on-surface-variant mt-2">
              Chat privately with the cemetery support admin.
            </p>
          </div>
          <div className="bg-secondary-container text-on-secondary-container px-4 py-2 rounded-lg text-sm font-semibold inline-flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">support_agent</span>
            Admin support
          </div>
        </div>

        <section className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden">
          <div className="h-[58vh] overflow-y-auto p-4 md:p-6 bg-surface-container-low">
            {isLoading ? (
              <div className="h-full flex items-center justify-center text-on-surface-variant">
                Loading messages...
              </div>
            ) : messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-on-surface-variant">
                <span className="material-symbols-outlined text-5xl mb-3">forum</span>
                <p className="font-semibold text-primary">No messages yet</p>
                <p className="text-sm mt-1">Send your first question to the admin.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => {
                  const mine = message.sender_role === 'user'
                  return (
                    <div
                      key={message.id}
                      className={`flex ${mine ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[78%] rounded-xl px-4 py-3 shadow-sm ${
                          mine
                            ? 'bg-primary text-on-primary'
                            : 'bg-surface-container-lowest text-on-surface border border-outline-variant'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold">
                            {mine ? 'You' : 'Admin'}
                          </span>
                          <span className={mine ? 'text-white/60 text-[11px]' : 'text-on-surface-variant text-[11px]'}>
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
                <div ref={bottomRef} />
              </div>
            )}
          </div>

          {error && (
            <div className="px-4 md:px-6 py-3 bg-error/10 text-error text-sm border-t border-error/20">
              {error}
            </div>
          )}

          <div className="p-4 md:p-6 border-t border-outline-variant bg-surface-container-lowest">
            <div className="flex gap-3">
              <textarea
                rows={2}
                value={body}
                onChange={(event) => setBody(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault()
                    sendMessage()
                  }
                }}
                placeholder="Type your message..."
                className="flex-1 resize-none rounded-lg border border-outline-variant px-4 py-3 text-sm outline-none focus:border-secondary focus:ring-2 focus:ring-secondary"
              />
              <button
                onClick={sendMessage}
                disabled={isSending || !body.trim()}
                className="w-14 rounded-lg bg-primary text-on-primary flex items-center justify-center hover:bg-primary-container disabled:opacity-50 transition-colors"
                title="Send"
              >
                <span className="material-symbols-outlined">send</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
