import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#172839] text-white py-12 mt-auto">
      <div className="max-w-[1200px] mx-auto px-[40px]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-[24px] mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="text-xl font-bold mb-4">Butuan Memorial Portal</div>
            <p className="text-white/70 text-sm max-w-sm leading-relaxed">
              The official centralized memorial management system for the Caraga region. Honoring
              legacies with dignity, transparency, and modern care.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a href="mailto:info@butuanmemorial.gov.ph" className="text-white/60 hover:text-white transition-colors">
                <span className="material-symbols-outlined text-[20px]">mail</span>
              </a>
              <a href="tel:+638523000" className="text-white/60 hover:text-white transition-colors">
                <span className="material-symbols-outlined text-[20px]">call</span>
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <span className="material-symbols-outlined text-[20px]">language</span>
              </a>
            </div>
          </div>

          <div>
            <h5 className="font-semibold text-sm mb-4 uppercase tracking-wider text-white/50">Portal Links</h5>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link href="/map" className="hover:text-white transition-colors">Search Cemetery Map</Link></li>
              <li><Link href="/booking" className="hover:text-white transition-colors">Booking Services</Link></li>
              <li><Link href="/profile" className="hover:text-white transition-colors">Memorial Registry</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Public Documents</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-sm mb-4 uppercase tracking-wider text-white/50">Contact</h5>
            <address className="not-italic text-sm text-white/70 space-y-2 leading-relaxed">
              <p>City Hall Compound, Butuan City,<br />Agusan del Norte, Caraga Region</p>
              <p>Tel: (085) 342-0000</p>
              <p>info@butuanmemorial.gov.ph</p>
            </address>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-xs">
            © 2024 Butuan Memorial Portal. All rights reserved.
          </p>
          <div className="flex gap-6 text-white/40 text-xs">
            <Link href="#" className="hover:text-white/70 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white/70 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
