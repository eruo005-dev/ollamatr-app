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
  date: string // display string — exact ISO only when verifiable
  category: Exclude<Category, 'Tümü'>
  title: string
  summary: string
  source: string
  href: string
}

/* ============================================================================
 * Curated pulse items — each one verifiable. Keep this list short and true.
 * Add items via PR with a verifiable source link.
 * ========================================================================== */
const ITEMS: PulseItem[] = [
  {
    id: 'ollamatr-community-edition',
    date: 'Mayıs 2026',
    category: 'Topluluk',
    title: 'OllamaTR Topluluk Edisyonu açıldı',
    summary:
      'Türkçe yapay zeka altyapısı için bireysel operatör yönetiminde, açık kaynak (MIT) ve KVKK uyumlu topluluk projesi. Şirket henüz yok; geliştirici katkıları açık.',
    source: 'github.com/eruo005-dev/ollamatr-app',
    href: 'https://github.com/eruo005-dev/ollamatr-app',
  },
  {
    id: 'trendyol-llm-v2',
    date: '2024',
    category: 'Türkçe LLM',
    title: 'Trendyol-LLM-7B-base-v2.0 yayınlandı',
    summary:
      'Trendyol Grubu tarafından açık kaynak (Apache 2.0) olarak yayınlanan 7B parametreli Türkçe odaklı temel model. E-ticaret kullanım örnekleri için fine-tune uyumlu.',
    source: 'huggingface.co/Trendyol',
    href: 'https://huggingface.co/Trendyol/Trendyol-LLM-7b-base-v2.0',
  },
  {
    id: 'kocdigital-llama3-tr',
    date: '2024',
    category: 'Türkçe LLM',
    title: 'KOCDigital-LLM-8b-v0.1 (Llama-3 Türkçe ince ayar)',
    summary:
      'Koç Digital tarafından Llama-3 8B üzerine yapılmış Türkçe instruct fine-tune. OpenLLM Turkish Leaderboard üzerinde yarışmacı puanlarla yer aldı.',
    source: 'huggingface.co/KOCDIGITAL',
    href: 'https://huggingface.co/KOCDIGITAL/Kocdigital-LLM-8b-v0.1',
  },
  {
    id: 'cosmos-t1',
    date: '2024',
    category: 'Akademik',
    title: 'Cosmos T1 — YTÜ tarafından yerli Türkçe LLM',
    summary:
      'Yıldız Teknik Üniversitesi tarafından geliştirilen Türkçe odaklı temel model. "Kendisinden üç kat büyük modellerle yarışıyor" iddiası ile basında yer aldı.',
    source: 'YTÜ Haber Bülteni',
    href: 'https://www.yildiz.edu.tr/universite/haberler/yerli-yapay-zeka-cosmos-t1-kendisinden-uc-kat-buyuk-modellerle-yarisiyor',
  },
  {
    id: 'turna',
    date: '2024',
    category: 'Akademik',
    title: 'TURNA — Boğaziçi TABILAB Türkçe encoder/decoder',
    summary:
      'Boğaziçi Üniversitesi TABILAB / BUCOLIN tarafından yayınlanan Türkçe odaklı sequence-to-sequence model. Çeşitli downstream görevlerde değerlendirildi.',
    source: 'huggingface.co/boun-tabi-LMG',
    href: 'https://huggingface.co/boun-tabi-LMG',
  },
  {
    id: 'ollama-turkish-chars-issue',
    date: '2025',
    category: 'Ollama',
    title: 'Ollama upstream: Türkçe çoklu bayt karakter desteği talebi',
    summary:
      'Ollama runtime üzerinde Türkçe karakterlerin (İ ı ş ğ ç ö ü) bazı akış senaryolarında düşmesi raporlandı. Almanca / Polonyaca için merge edilmiş emsal mevcut.',
    source: 'github.com/ollama/ollama',
    href: 'https://github.com/ollama/ollama/issues',
  },
  {
    id: 'kvkk-yapay-zeka-rehberi',
    date: 'Güncel',
    category: 'KVKK & Hukuk',
    title: 'KVKK Kurumu — Yapay zeka uygulamalarında veri koruma',
    summary:
      '6698 sayılı Kanun kapsamında yapay zeka sistemlerinde kişisel veri işleme ilkeleri ve veri sorumlusu yükümlülükleri. Ayrıntılar için Kurum yayınlarına bakınız.',
    source: 'kvkk.gov.tr',
    href: 'https://www.kvkk.gov.tr/',
  },
  {
    id: 'openllm-tr-leaderboard',
    date: 'Güncel',
    category: 'Akademik',
    title: 'OpenLLM Turkish Leaderboard',
    summary:
      'HuggingFace topluluğu tarafından sürdürülen Türkçe LLM değerlendirme tablosu. MMLU-TR, ARC-TR ve diğer Türkçe benchmark sonuçları izlenebilir.',
    source: 'huggingface.co/spaces/malhajar/OpenLLMTurkishLeaderboard',
    href: 'https://huggingface.co/spaces/malhajar/OpenLLMTurkishLeaderboard',
  },
]

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
          <p className="mb-3 font-mono text-xs uppercase tracking-wider text-accent-red">
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
          <div className="mb-3 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-text-muted">
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
                  className={`rounded-sm border px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors duration-200 ${
                    isActive
                      ? 'border-accent-red bg-accent-red/10 text-accent-red'
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
                <div className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-wider text-text-muted">
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
                  className="mt-5 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-accent-red-light underline-offset-2 hover:underline"
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
              className="inline-flex items-center gap-2 rounded bg-accent-red px-6 py-3 font-body text-sm font-semibold uppercase tracking-wider text-white transition-colors duration-200 hover:bg-accent-red-light"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
              Telegram'da öner
            </a>
            <Link
              to="/modeller"
              className="inline-flex items-center gap-2 rounded border border-border-subtle px-6 py-3 font-body text-sm font-semibold uppercase tracking-wider text-text-primary transition-colors duration-200 hover:border-accent-red hover:text-accent-red-light"
            >
              Model Kataloğu
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
