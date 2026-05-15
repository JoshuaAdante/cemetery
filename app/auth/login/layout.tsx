import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign In | Butuan Memorial Portal',
}

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {children}
    </div>
  )
}
