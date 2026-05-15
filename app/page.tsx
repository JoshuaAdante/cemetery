import Link from 'next/link'
import Image from 'next/image'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbDzeM7WkCIPqtaCvQSmHHC49W_YKZEdY2TGP3x5exxQ1cUIYgkd-V7yYcYSYFPKgrtnD9PHsbyl9y1ExD4hHuGP_4mHJLxVdilb4rz_KgLS7AuB6SBQY1c0YcmX26gzBvkiW3O_ucWVwT8ZGY1wAgr8TJhEHr7iTBNpytPSiHmVogPCvVdRxplVDr3382cHCfDkzR5wXvdVbi397PXc2SeMS_hBkRIya9Ib9vpS3sNDIE6-_NIQbakKHsdagCQL-MyRk7UGS6MZk"
          alt="Caraga region landscape"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/50 to-primary/80" />

        {/* Nav */}
        <nav className="absolute top-0 left-0 right-0 flex justify-between items-center px-[40px] h-20 max-w-[1200px] mx-auto w-full">
          <div className="text-white font-bold text-xl tracking-tight">Butuan Memorial Portal</div>
          <div className="hidden md:flex items-center gap-6 text-white/80 text-sm">
            <Link href="/map" className="hover:text-white transition-colors">Map</Link>
            <Link href="/auth/login" className="hover:text-white transition-colors">Booking</Link>
            <Link href="/profile" className="hover:text-white transition-colors">Profile</Link>
            <Link href="/auth/login" className="hover:text-white transition-colors">Obituaries</Link>
            <Link href="/auth/login" className="hover:text-white transition-colors">Delivery</Link>
            <Link href="/auth/login" className="hover:text-white transition-colors">Contacts</Link>
          </div>
          <Link
            href="/auth/login"
            className="text-sm font-semibold text-white border border-white/50 px-4 py-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            Sign In / Register
          </Link>
        </nav>

        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Honoring Legacies with Dignity
          </h1>
          <p className="text-lg text-white/80 mb-10 max-w-xl mx-auto">
            A centralized gateway for the Caraga region to preserve memories, manage services, and
            find peace in remembrance.
          </p>

          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto mb-8">
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">
                search
              </span>
              <input
                type="text"
                placeholder="Search for cemeteries or memorial sites..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border-0 text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>
            <Link
              href="/map"
              className="bg-primary text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-primary-container transition-colors whitespace-nowrap"
            >
              Find Location
            </Link>
          </div>

          <div className="flex items-center justify-center gap-4">
            <Link
              href="/map"
              className="bg-secondary/20 backdrop-blur-sm text-white border border-secondary/40 px-6 py-3 rounded-lg text-sm font-medium hover:bg-secondary/30 transition-colors"
            >
              Search Map
            </Link>
            <Link
              href="/booking"
              className="bg-white/10 backdrop-blur-sm text-white border border-white/30 px-6 py-3 rounded-lg text-sm font-medium hover:bg-white/20 transition-colors"
            >
              Book Services
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 md:px-[40px] max-w-[1200px] mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-secondary text-sm font-semibold uppercase tracking-wider mb-4">
              Our Mission
            </p>
            <h2 className="text-4xl font-bold text-primary mb-6">
              Centralizing Remembrance in the Caraga Region
            </h2>
            <p className="text-on-surface-variant leading-relaxed mb-8">
              The Butuan Memorial Portal was established to bridge the gap between tradition and
              modern accessibility. We provide a dignified, digital space for families to navigate
              cemetery management with ease and reverence.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary-container flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-on-secondary-container">hub</span>
                </div>
                <div>
                  <p className="font-semibold text-primary text-sm">Unified Network</p>
                  <p className="text-xs text-on-surface-variant mt-1">
                    Connecting all major cemeteries across Butuan and Caraga.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary-container flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-on-secondary-container">
                    cloud_done
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-primary text-sm">Digital Preservation</p>
                  <p className="text-xs text-on-surface-variant mt-1">
                    Archiving legacies for future generations through secure records.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbDzeM7WkCIPqtaCvQSmHHC49W_YKZEdY2TGP3x5exxQ1cUIYgkd-V7yYcYSYFPKgrtnD9PHsbyl9y1ExD4hHuGP_4mHJLxVdilb4rz_KgLS7AuB6SBQY1c0YcmX26gzBvkiW3O_ucWVwT8ZGY1wAgr8TJhEHr7iTBNpytPSiHmVogPCvVdRxplVDr3382cHCfDkzR5wXvdVbi397PXc2SeMS_hBkRIya9Ib9vpS3sNDIE6-_NIQbakKHsdagCQL-MyRk7UGS6MZk"
              alt="Caraga region"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Features Bento Grid */}
      <section className="py-16 px-4 md:px-[40px] bg-surface-container-low">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Simplified Memorial Management</h2>
            <p className="text-on-surface-variant">
              Essential tools designed for families and administrative efficiency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Interactive Maps - Large card */}
            <div className="md:col-span-1 bg-surface-container-lowest rounded-2xl p-8 shadow-sm border border-outline-variant/30">
              <div className="w-12 h-12 rounded-xl bg-secondary-container flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-on-secondary-container">map</span>
              </div>
              <h3 className="text-xl font-semibold text-primary mb-3">Interactive Plot Maps</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                Navigate cemetery grounds virtually with high-precision mapping and GPS location
                tracking for every memorial site.
              </p>
              <Link
                href="/map"
                className="text-secondary text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all"
              >
                Explore Map
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>

            {/* Service Booking - Dark featured card */}
            <div className="md:col-span-2 bg-primary rounded-2xl p-8 text-white relative overflow-hidden">
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined">calendar_month</span>
                </div>
                <h3 className="text-2xl font-semibold mb-3">Service Booking</h3>
                <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-md">
                  Schedule maintenance, request documents, or book funeral services through our
                  streamlined regional portal.
                </p>
                <Link
                  href="/auth/login"
                  className="inline-flex items-center gap-2 bg-secondary text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-secondary/90 transition-colors"
                >
                  Book Now
                </Link>
              </div>
            </div>

            {/* Locate Ancestors */}
            <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/30">
              <div className="w-10 h-10 rounded-lg bg-secondary-container flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-on-secondary-container text-[20px]">
                  group
                </span>
              </div>
              <h3 className="font-semibold text-primary mb-2">Locate Ancestors</h3>
              <p className="text-on-surface-variant text-xs leading-relaxed">
                Quickly find burial locations using our comprehensive regional database.
              </p>
            </div>

            {/* Data Integrity */}
            <div className="bg-surface-container rounded-2xl p-6 shadow-sm border border-outline-variant/30">
              <div className="w-10 h-10 rounded-lg bg-outline-variant/30 flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
                  verified_user
                </span>
              </div>
              <h3 className="font-semibold text-primary mb-2">Data Integrity</h3>
              <p className="text-on-surface-variant text-xs leading-relaxed">
                Your sensitive records are protected with enterprise-grade security and respectful
                data handling protocols.
              </p>
            </div>

            {/* Smart Reminders */}
            <div className="bg-secondary-container rounded-2xl p-6 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-white/40 flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-on-secondary-container text-[20px]">
                  notifications_active
                </span>
              </div>
              <h3 className="font-semibold text-on-secondary-container mb-2">Smart Reminders</h3>
              <p className="text-on-secondary-container/70 text-xs leading-relaxed">
                Stay informed about upcoming anniversaries and service schedules automatically.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Caraga Network Section */}
      <section className="py-16 px-4 md:px-[40px] max-w-[1200px] mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-surface-container-low rounded-2xl p-8 md:p-12">
          <div>
            <h2 className="text-3xl font-bold text-primary mb-4">Explore the Caraga Network</h2>
            <p className="text-on-surface-variant leading-relaxed mb-6">
              Our network spans across the entire Caraga region, providing real-time data for both
              public and private cemeteries. Find the nearest memorial park or browse historical
              sites with ease.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                '15+ Registered Cemeteries',
                'Live Plot Availability Tracking',
                'GPS Navigation Integrated',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary text-[20px]">
                    check_circle
                  </span>
                  <span className="text-sm text-on-surface">{item}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/map"
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-primary-container transition-colors"
            >
              View Regional Map
            </Link>
          </div>
          <div className="relative h-64 rounded-xl overflow-hidden bg-surface-container">
            {/* Mini map preview */}
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-surface-container to-surface-container-high">
              <div className="text-center">
                <span className="material-symbols-outlined text-5xl text-secondary mb-3 block">
                  map
                </span>
                <p className="text-sm font-semibold text-primary">Caraga Region</p>
                <p className="text-xs text-on-surface-variant">Interactive Map Available</p>
                <Link
                  href="/map"
                  className="mt-4 inline-block text-xs text-secondary font-semibold hover:underline"
                >
                  Open Map →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
