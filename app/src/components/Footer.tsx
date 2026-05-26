import { Link } from 'react-router'
import { Github } from 'lucide-react'

const QUICK_LINKS = [
  { label: 'Modeller', to: '/modeller' },
  { label: 'Hangi Model?', to: '/hangi-model' },
  { label: 'Destek', to: '/fiyatlandirma' },
  { label: 'İndir', to: '/indir' },
]

const RESOURCES = [
  { label: 'Dokümantasyon', to: '/dokumantasyon' },
  { label: 'Topluluk', to: '/topluluk' },
  { label: 'Hakkımızda', to: '/hakkimizda' },
  { label: 'KVKK', to: '/kvkk' },
]

const LEGAL_LINKS: { label: string; to: string }[] = [
  { label: 'KVKK & Gizlilik', to: '/kvkk' },
  { label: 'Çerez Politikası', to: '/cerez-politikasi' },
]

const LEGAL_INFO: { label: string; value: string }[] = [
  { label: 'Veri Sorumlusu', value: 'Bireysel Operatör — [Operatör İsim Soyisim]' },
  { label: 'İletişim', value: 'iletisim@ollamatr.dev' },
  { label: 'Proje Türü', value: 'Topluluk Projesi · Açık Kaynak (MIT)' },
  { label: 'GitHub', value: 'github.com/ollamatr' },
]

export default function Footer() {
  return (
    <footer className="bg-bg-charcoal">
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-12 lg:px-10">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand & mission */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              to="/"
              aria-label="OllamaTR ana sayfa"
              className="inline-flex items-center gap-0 font-display text-xl font-bold tracking-tight"
            >
              <span className="text-text-primary">Ollama</span>
              <span className="text-accent-red">TR</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-text-secondary">
              Türkçe-uyumlu, yerel çalışan, açık kaynak yapay zeka stack'i. Topluluk tarafından geliştirilen, kâr amacı gütmeyen bir projedir.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-safe-green/30 bg-safe-green/10 px-3 py-1 font-mono text-xs uppercase tracking-wider text-safe-green">
              <span className="h-1.5 w-1.5 rounded-full bg-safe-green animate-pulse" aria-hidden="true" />
              Topluluk Projesi · Tüzel Kişilik Yok
            </div>
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

        {/* Legal information block — KVKK Art.10 + TKHK Art.48 compliance */}
        <section
          aria-labelledby="yasal-bilgiler-heading"
          className="mt-16 border-t border-border-subtle pt-10"
        >
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            <div>
              <h3
                id="yasal-bilgiler-heading"
                className="mb-4 font-display text-sm font-bold uppercase tracking-wider text-text-primary"
              >
                Yasal Bilgiler
              </h3>
              <p className="text-xs leading-relaxed text-text-muted">
                OllamaTR bir topluluk projesidir. Şu anda resmi bir tüzel kişiliği yoktur. KVKK md.10 kapsamında veri sorumlusu bilgileri aşağıdadır. Ticari hizmet sağlanmadığı için TKHK md.48 kapsamındaki şirket bilgileri henüz uygulanabilir değildir.
              </p>
            </div>

            <dl
              aria-label="Yasal bilgiler"
              className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2 lg:col-span-2"
            >
              {LEGAL_INFO.map((item) => (
                <div key={item.label} className="flex flex-col">
                  <dt className="font-mono text-xs uppercase tracking-wide text-text-secondary">
                    {item.label}
                  </dt>
                  <dd className="font-mono text-xs text-text-muted">
                    <code className="bg-transparent">{item.value}</code>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Legal pages links */}
          <nav
            aria-label="Yasal sayfalar"
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2"
          >
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-text-primary">
              Yasal Sayfalar
            </h4>
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {LEGAL_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-xs text-text-secondary underline-offset-2 transition-colors hover:text-accent-red-light hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </section>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border-subtle pt-8 sm:flex-row">
          <p className="text-xs leading-relaxed text-text-muted">
            &copy; 2025 OllamaTR Topluluğu &middot; MIT Lisansı &middot; İçerikte yer alan üçüncü taraf model isimleri (Llama, Gemma, Mistral, Qwen, Phi-3, Command-R, DeepSeek, Trendyol vb.) ilgili sahiplerinin markalarıdır.
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

        {/* Ollama Inc. trademark disclaimer — SMK Art.6 compliance */}
        <div className="mt-8 space-y-2 border-t border-border-subtle pt-6">
          <p
            lang="tr"
            className="text-xs leading-relaxed text-text-muted"
          >
            OllamaTR bağımsız bir Türk projesidir. &ldquo;Ollama&rdquo; Ollama Inc. firmasının tescilli markasıdır. Bu proje topluluk tarafından geliştirilmektedir; Ollama Inc. ile resmi bir bağı, onayı veya sponsorluğu yoktur. Açık kaynaklı Ollama runtime üzerine inşa edilmiştir.
          </p>
          <p
            lang="en"
            className="text-xs leading-relaxed text-text-muted"
          >
            OllamaTR is an independent Turkish project. &ldquo;Ollama&rdquo; is a trademark of Ollama Inc. This project is community-driven and not affiliated with, endorsed by, or sponsored by Ollama Inc. Built on top of the open-source Ollama runtime.
          </p>
        </div>
      </div>
    </footer>
  )
}
