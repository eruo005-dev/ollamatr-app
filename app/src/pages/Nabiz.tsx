/**
 * Nabız — curated Türkçe AI gündem feed.
 *
 * Replaces the former /indir page which promised an installer that doesn't
 * yet ship. The Pulse meets the same primary user intent ("what's happening
 * with local AI in Türkçe?") with content that is true today.
 *
 * Content rules per DESIGN-READ.md:
 *   - Every item links to a real source (HuggingFace, GitHub, ArXiv,
 *     KVKK Kurumu, official press releases).
 *   - No invented stats. No invented dates. No invented people.
 *   - Items with unverifiable dates use approximate markers ("2024 Q4")
 *     rather than fabricated ISO strings.
 *   - Empty space is honest. The curation pipeline is community-fed via
 *     Telegram, surfaced prominently.
 */
import { useMemo, useState } from 'react'
import { Link } from 'react-router'
import { ArrowUpRight, Filter, Send } from 'lucide-react'
import rawItems from '@/lib/nabiz-items.json'

type Category =
  | 'Tümü'
  | 'Ollama'
  | 'Türkçe LLM'
  | 'Topluluk'
  | 'Akademik'
  | 'KVKK & Hukuk'
  | 'Etkinlik'

const CATEGORIES: Category[] = [
  'Tümü',
  'Ollama',
  'Türkçe LLM',
  'Topluluk',
  'Akademik',
  'KVKK & Hukuk',
  'Etkinlik',
]

interface PulseItem {
  id: string
  isoDate: string // RFC-3339 — drives RSS pubDate at build time
  date: string // human-friendly display string
  category: Exclude<Category, 'Tümü'>
  title: string
  summary: string
  source: string
  href: string
}

/* ============================================================================
 * Curated pulse items — sourced from `src/lib/nabiz-items.json` so the same
 * data drives both this page and the prebuild `scripts/generate-rss.mjs`
 * step. Keep the JSON file as the single source of truth.
 * ========================================================================== */
const ITEMS: PulseItem[] = (rawItems as PulseItem[])
  .slice()
  .sort(
    (a, b) =>
      new Date(b.isoDate).getTime() - new Date(a.isoDate).getTime()
  )

/* ============================================================================
 * Page
 * ========================================================================== */
export default function Nabiz() {
  const [activeCategory, setActiveCategory] = useState<Category>('Tümü')

  const filtered = useMemo(() => {
    if (activeCategory === 'Tümü') return ITEMS
    return ITEMS.filter((item) => item.category === activeCategory)
  }, [activeCategory])

  return (
    <div className="bg-bg-obsidian pb-24">
      {/* HERO */}
      <section className="px-6 pb-12 pt-40 lg:px-10 lg:pb-16 lg:pt-44">
        <div className="mx-auto max-w-4xl">
          <p className="mb-3 font-mono text-xs tracking-wide text-accent-red-light">
            Nabız
          </p>
          <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-text-primary lg:text-5xl">
            Türkçe yapay zekada olup biten.
          </h1>
          <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-text-secondary">
            Ollama yayınları, Türkçe LLM güncellemeleri, akademik çıktılar, KVKK
            kararları ve topluluk etkinlikleri — kaynak bağlantılarıyla, sade
            bir listede.
          </p>
          <p className="mt-3 max-w-2xl font-body text-sm leading-relaxed text-text-muted">
            Liste topluluk tarafından beslenir. Eklenecek bir haber için{' '}
            <a
              href="https://t.me/+sK_c-yKLc4E0Y2I0"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-red-light underline-offset-2 hover:underline"
            >
              Telegram grubuna
            </a>{' '}
            yaz.
          </p>
        </div>
      </section>

      {/* FILTER PILLS */}
      <section className="px-6 lg:px-10" aria-label="Kategori filtresi">
        <div className="mx-auto max-w-4xl">
          <div className="mb-3 inline-flex items-center gap-2 text-xs font-medium tracking-wide text-text-muted">
            <Filter className="h-3.5 w-3.5" aria-hidden="true" />
            Kategori
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const isActive = cat === activeCategory
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  aria-pressed={isActive}
                  className={`rounded-sm border px-3 py-1.5 font-mono text-xs tracking-wide transition-colors duration-200 ${
                    isActive
                      ? 'border-accent-red bg-accent-red/10 text-accent-red-light'
                      : 'border-border-subtle bg-transparent text-text-secondary hover:border-text-secondary hover:text-text-primary'
                  }`}
                >
                  {cat}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* FEED */}
      <section
        className="mt-12 px-6 lg:px-10"
        aria-label="Türkçe yapay zeka gündemi"
      >
        <div className="mx-auto max-w-4xl">
          <p
            id="result-count"
            aria-live="polite"
            className="mb-6 font-mono text-xs text-text-muted"
          >
            {filtered.length} kayıt gösteriliyor
          </p>

          <ul className="flex flex-col gap-4">
            {filtered.map((item) => (
              <li
                key={item.id}
                className="rounded-lg border border-border-subtle bg-bg-charcoal p-6 transition-colors duration-200 hover:border-accent-red/40 md:p-7"
              >
                <div className="flex flex-wrap items-center gap-3 font-mono text-xs tracking-wide text-text-muted">
                  <span className="rounded-sm border border-border-subtle px-2 py-0.5 text-text-secondary">
                    {item.category}
                  </span>
                  <span>{item.date}</span>
                </div>

                <h2 className="mt-3 font-display text-xl font-bold leading-tight text-text-primary md:text-2xl">
                  {item.title}
                </h2>

                <p className="mt-3 font-body text-sm leading-relaxed text-text-secondary md:text-base">
                  {item.summary}
                </p>

                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-1.5 font-mono text-xs tracking-wide text-accent-red-light underline-offset-2 hover:underline"
                  aria-label={`${item.title} kaynağına git`}
                >
                  {item.source}
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>

          {filtered.length === 0 && (
            <div className="rounded-lg border border-dashed border-border-subtle bg-bg-charcoal/40 p-12 text-center">
              <p className="font-body text-sm text-text-secondary">
                Bu kategoride henüz kayıt yok. Telegram'da bize bir haber önerin.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CONTRIBUTE CTA */}
      <section className="mt-16 px-6 lg:px-10">
        <div className="mx-auto max-w-4xl rounded-lg border border-border-subtle bg-bg-charcoal p-8 md:p-10">
          <h2 className="font-display text-2xl font-bold tracking-tight text-text-primary">
            Bir haberi paylaş, listeye eklensin.
          </h2>
          <p className="mt-3 max-w-2xl font-body text-sm leading-relaxed text-text-secondary md:text-base">
            Nabız topluluk tarafından güncellenir. Yeni bir model yayını, akademik
            çıktı, KVKK kararı, topluluk etkinliği gördüysen Telegram grubuna kaynak
            bağlantısıyla yaz — değerlendirip listeye alırız.
          </p>
          <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <a
              href="https://t.me/+sK_c-yKLc4E0Y2I0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded bg-accent-red-deep px-6 py-3 font-body text-sm font-semibold tracking-wide text-white transition-colors duration-200 hover:bg-[#A01528]"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
              Telegram'da öner
            </a>
            <Link
              to="/modeller"
              className="inline-flex items-center gap-2 rounded border border-border-subtle px-6 py-3 font-body text-sm font-semibold tracking-wide text-text-primary transition-colors duration-200 hover:border-accent-red hover:text-accent-red-light"
            >
              Model Kataloğu
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
