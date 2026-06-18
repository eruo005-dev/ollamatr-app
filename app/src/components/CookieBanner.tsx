import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Cookie, X } from 'lucide-react'
import { Link } from 'react-router'

// We do NOT use analytics or marketing cookies — the Çerez Politikası says so.
// The consent shape only covers the categories that actually exist: necessary
// (always on) and preferences (optional). Analytics/marketing were removed so
// the banner matches reality rather than offering toggles for cookies we never set.
type Consent = {
  necessary: true
  preferences: boolean
  timestamp: string
}

const STORAGE_KEY = 'ollamatr-cookie-consent'

type CategoryKey = 'preferences'

type CategoryDef = {
  key: CategoryKey
  label: string
  description: string
}

const CATEGORIES: CategoryDef[] = [
  {
    key: 'preferences',
    label: 'Tercih',
    description: 'Dil, tema ve diğer kişisel tercihlerinizi hatırlar.',
  },
]

function saveConsent(consent: Consent): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent))
  } catch {
    // localStorage unavailable (private mode, quota); fail silently
  }
}

function readConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed: unknown = JSON.parse(raw)
    if (
      typeof parsed === 'object' &&
      parsed !== null &&
      'necessary' in parsed &&
      'timestamp' in parsed
    ) {
      return parsed as Consent
    }
    return null
  } catch {
    return null
  }
}

export default function CookieBanner() {
  const reduce = useReducedMotion()
  const [visible, setVisible] = useState<boolean>(() => readConsent() === null)
  const [showPreferences, setShowPreferences] = useState(false)
  const [preferences, setPreferences] = useState(false)

  // Çerez Politikası page (and footer) dispatch this to reopen the manager
  // even after consent was already given — without it that control was dead.
  useEffect(() => {
    const open = () => {
      const c = readConsent()
      setPreferences(c?.preferences ?? false)
      setShowPreferences(true)
      setVisible(true)
    }
    window.addEventListener('open-cookie-preferences', open)
    return () => window.removeEventListener('open-cookie-preferences', open)
  }, [])

  const buildConsent = (p: boolean): Consent => ({
    necessary: true,
    preferences: p,
    timestamp: new Date().toISOString(),
  })

  const handleNecessaryOnly = (): void => {
    saveConsent(buildConsent(false))
    setVisible(false)
  }

  const handleSavePreferences = (): void => {
    saveConsent(buildConsent(preferences))
    setVisible(false)
  }

  const handleClose = (): void => {
    handleNecessaryOnly()
  }

  const setCategory = (_key: CategoryKey, value: boolean): void => {
    setPreferences(value)
  }

  const getCategoryValue = (_key: CategoryKey): boolean => {
    return preferences
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-labelledby="cookie-banner-title"
          aria-describedby="cookie-banner-desc"
          initial={reduce ? false : { y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduce ? { opacity: 0 } : { y: 100, opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 left-4 right-4 z-[90] mx-auto max-w-4xl rounded-lg border border-border-subtle bg-bg-surface text-text-primary shadow-2xl md:bottom-6 md:left-6 md:right-6"
        >
          <div className="relative p-5 md:p-6">
            <button
              type="button"
              onClick={handleClose}
              aria-label="Çerez bildirimini kapat (yalnızca zorunlu çerezler etkin kalır)"
              className="absolute right-3 top-3 rounded-md p-1.5 text-text-secondary transition-colors hover:bg-white/5 hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-red"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>

            <div className="flex items-start gap-4">
              <div
                className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-red/10 text-accent-red-light sm:flex"
                aria-hidden="true"
              >
                <Cookie className="h-5 w-5" />
              </div>

              <div className="min-w-0 flex-1">
                <h2
                  id="cookie-banner-title"
                  className="font-display text-lg font-bold text-text-primary"
                >
                  Çerezleri yönetin
                </h2>
                <p
                  id="cookie-banner-desc"
                  className="mt-2 text-sm leading-relaxed text-text-secondary"
                >
                  Yalnızca zorunlu ve tercih çerezleri kullanıyoruz; analitik
                  veya pazarlama çerezi kullanmıyoruz. Zorunlu çerezler sitenin
                  çalışması için gereklidir. Detaylı bilgi için{' '}
                  <Link
                    to="/cerez-politikasi"
                    className="text-accent-red-light underline-offset-2 hover:underline focus:outline-none focus:ring-2 focus:ring-accent-red"
                  >
                    Çerez Politikası
                  </Link>
                  .
                </p>

                <details
                  className="mt-4 group"
                  open={showPreferences}
                  onToggle={(e) =>
                    setShowPreferences(
                      (e.currentTarget as HTMLDetailsElement).open
                    )
                  }
                >
                  <summary className="cursor-pointer text-sm font-medium text-text-primary list-none">
                    <span className="inline-flex items-center gap-1 underline-offset-2 hover:underline">
                      Tercihleri Yönet
                      <span
                        aria-hidden="true"
                        className="transition-transform group-open:rotate-180"
                      >
                        ▾
                      </span>
                    </span>
                  </summary>

                  <fieldset className="mt-4 space-y-3 rounded-md border border-border-subtle bg-black/20 p-4">
                    <legend className="sr-only">Çerez kategorileri</legend>

                    <label className="flex items-start gap-3 text-sm">
                      <input
                        type="checkbox"
                        checked
                        disabled
                        aria-label="Zorunlu çerezler (her zaman etkin)"
                        className="mt-0.5 h-4 w-4 cursor-not-allowed accent-accent-red"
                      />
                      <span className="flex-1">
                        <span className="block font-medium text-text-primary">
                          Zorunlu{' '}
                          <span className="text-xs text-text-muted">
                            (her zaman etkin)
                          </span>
                        </span>
                        <span className="block text-xs text-text-secondary">
                          Oturum, güvenlik ve temel işlevsellik için gereklidir.
                        </span>
                      </span>
                    </label>

                    {CATEGORIES.map((cat) => (
                      <label
                        key={cat.key}
                        className="flex items-start gap-3 text-sm"
                      >
                        <input
                          type="checkbox"
                          checked={getCategoryValue(cat.key)}
                          onChange={(e) =>
                            setCategory(cat.key, e.target.checked)
                          }
                          className="mt-0.5 h-4 w-4 cursor-pointer accent-accent-red focus:outline-none focus:ring-2 focus:ring-accent-red"
                        />
                        <span className="flex-1">
                          <span className="block font-medium text-text-primary">
                            {cat.label}
                          </span>
                          <span className="block text-xs text-text-secondary">
                            {cat.description}
                          </span>
                        </span>
                      </label>
                    ))}

                    <button
                      type="button"
                      onClick={handleSavePreferences}
                      className="mt-2 w-full rounded-md border border-border-subtle px-4 py-2 text-sm font-semibold text-text-primary transition-colors hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-accent-red sm:w-auto"
                    >
                      Tercihlerimi Kaydet
                    </button>
                  </fieldset>
                </details>

                <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                  <button
                    type="button"
                    onClick={handleNecessaryOnly}
                    className="rounded-md bg-accent-red-deep px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#A01528] focus:outline-none focus:ring-2 focus:ring-accent-red focus:ring-offset-2 focus:ring-offset-bg-surface"
                  >
                    Sadece Zorunlu
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
