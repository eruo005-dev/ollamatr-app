import { Link } from 'react-router'
import { Github } from 'lucide-react'

const QUICK_LINKS = [
  { label: 'Modeller', to: '/modeller' },
  { label: 'Hangi Model?', to: '/hangi-model' },
  { label: 'Fiyatlandırma', to: '/fiyatlandirma' },
  { label: 'İndir', to: '/indir' },
]

const RESOURCES = [
  { label: 'Dokümantasyon', to: '/dokumantasyon' },
  { label: 'Topluluk', to: '/topluluk' },
  { label: 'Hakkımızda', to: '/hakkimizda' },
  { label: 'KVKK', to: '/kvkk' },
]

export default function Footer() {
  return (
    <footer className="bg-bg-charcoal">
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-12 lg:px-10">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand & mission */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-0 font-display text-xl font-bold tracking-tight">
              <span className="text-text-primary">Ollama</span>
              <span className="text-accent-red">TR</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-text-secondary">
              Türkiye'nin ilk yerel AI altyapı dağıtımı. Geliştiriciler, KOBİ'ler ve öğrenciler için Türkçe-uyumlu, KVKK-ready açık kaynak yapay zeka platformu.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="mb-4 font-display text-sm font-bold uppercase tracking-wider text-text-primary">
              Hızlı Bağlantılar
            </h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-text-secondary transition-colors hover:text-accent-red-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="mb-4 font-display text-sm font-bold uppercase tracking-wider text-text-primary">
              Kaynaklar
            </h4>
            <ul className="space-y-3">
              {RESOURCES.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-text-secondary transition-colors hover:text-accent-red-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="mb-4 font-display text-sm font-bold uppercase tracking-wider text-text-primary">
              Bağlantı
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://github.com/ollamatr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-accent-red-light"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </li>
              <li>
                <Link
                  to="/topluluk"
                  className="text-sm text-text-secondary transition-colors hover:text-accent-red-light"
                >
                  Telegram
                </Link>
              </li>
              <li>
                <Link
                  to="/topluluk"
                  className="text-sm text-text-secondary transition-colors hover:text-accent-red-light"
                >
                  Discord
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border-subtle pt-8 sm:flex-row">
          <p className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} OllamaTR. Tüm hakları saklıdır.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/ollamatr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-text-muted transition-colors hover:text-text-secondary"
            >
              <Github className="h-3.5 w-3.5" />
              GitHub
            </a>
            <div className="inline-flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-safe-green opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-safe-green" />
              </span>
              <span className="text-xs text-text-muted">Tüm Sistemler Çalışıyor</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
