import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Register | Butuan Memorial Portal',
}

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 md:px-[40px]">
      {children}
    </div>
  )
}
