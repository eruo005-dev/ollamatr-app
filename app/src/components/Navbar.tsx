import { useState, useCallback } from 'react'
import { Link, useLocation } from 'react-router'
import { Menu, X, Download } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Modeller', to: '/modeller' },
  { label: 'Hangi Model?', to: '/hangi-model' },
  { label: 'Dokümantasyon', to: '/dokumantasyon' },
  { label: 'Fiyatlandırma', to: '/fiyatlandirma' },
  { label: 'Topluluk', to: '/topluluk' },
] as const

export default function Navbar() {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  const toggleMobile = useCallback(() => setMobileOpen((p) => !p), [])
  const closeMobile = useCallback(() => setMobileOpen(false), [])

  const isActive = (path: string) => location.pathname === path

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b border-border-subtle"
      style={{ backgroundColor: 'rgba(19, 18, 23, 0.8)', backdropFilter: 'blur(12px)' }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-0 font-display text-xl font-bold tracking-tight">
          <span className="text-text-primary">Ollama</span>
          <span className="text-accent-red">TR</span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive(link.to)
                  ? 'text-accent-red'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {link.label}
              {isActive(link.to) && (
                <span className="mt-0.5 block h-0.5 w-full rounded-full bg-accent-red" />
              )}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <Link
          to="/indir"
          className="hidden items-center gap-2 rounded bg-accent-red px-5 py-2.5 text-sm font-semibold uppercase tracking-wider text-white transition-all duration-200 hover:bg-accent-red-light hover:scale-[1.02] md:inline-flex"
        >
          <Download className="h-4 w-4" />
          Uygulamayı İndir
        </Link>

        {/* Mobile hamburger */}
        <button
          onClick={toggleMobile}
          className="inline-flex items-center justify-center rounded-md p-2 text-text-secondary transition-colors hover:text-text-primary md:hidden"
          aria-label="Menüyü aç/kapat"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="border-t border-border-subtle px-6 py-4 md:hidden"
          style={{ backgroundColor: 'rgba(19, 18, 23, 0.95)', backdropFilter: 'blur(12px)' }}
        >
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={closeMobile}
                className={`text-base font-medium transition-colors ${
                  isActive(link.to)
                    ? 'text-accent-red'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/indir"
              onClick={closeMobile}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded bg-accent-red px-5 py-3 text-sm font-semibold uppercase tracking-wider text-white"
            >
              <Download className="h-4 w-4" />
              Uygulamayı İndir
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
