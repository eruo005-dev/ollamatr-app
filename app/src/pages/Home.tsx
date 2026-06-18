import { useState, useMemo } from 'react'
import { Link } from 'react-router'
import {
  Shield,
  Terminal,
  MessageSquare,
  Cpu,
  BookOpen,
  ArrowRight,
} from 'lucide-react'
import DataStreamCanvas from '@/components/DataStreamCanvas'
import TiltCard from '@/components/TiltCard'
import { useScrollReveal } from '@/hooks/useScrollReveal'

/* ───────────────────────── Animated counter ───────────────────────── */
/* ═══════════════════════════ MODEL DATA ═══════════════════════════ */
const MODELS = [
  {
    name: 'Llama-3-Turkish-8B',
    desc: "Meta'nın Llama 3'ünün Türkçe fine-tune'u. Genel amaçlı, hafif, hızlı.",
    ram: 8,
    ramColor: 'text-warn-yellow',
  },
  {
    name: 'Mistral-Turk-7B',
    desc: 'Mistral mimarisi üzerinden Türkçe dil modeli. Kod ve metin üretimi.',
    ram: 7,
    ramColor: 'text-safe-green',
  },
  {
    name: 'Bora-7B',
    desc: "Türkiye'de geliştirilen açık kaynak dil modeli. Yerel bağlama duyarlı.",
    ram: 7,
    ramColor: 'text-safe-green',
  },
  {
    name: 'Trendyol-LLM-7B-v2',
    desc: "Türkiye'nin en büyük e-ticaret verisiyle eğitilmiş model.",
    ram: 7,
    ramColor: 'text-safe-green',
  },
  {
    name: 'Kardesler-LLM-13B',
    desc: 'Yüksek performanslı Türkçe model. Karmaşık görevler için ideal.',
    ram: 13,
    ramColor: 'text-warn-yellow',
  },
  {
    name: 'Gemma-2-Turkish-9B',
    desc: 'Google Gemma 2 tabanlı, Türkçe optimize edilmiş model.',
    ram: 9,
    ramColor: 'text-warn-yellow',
  },
]

/* ═══════════════════════════ RAM CALCULATOR HOOK ═══════════════════════════ */
type RamStatus = 'neutral' | 'safe' | 'warning' | 'danger'

function useRAMCalculator() {
  const [modelSize, setModelSize] = useState('')
  const [ramSize, setRamSize] = useState('')

  const status: RamStatus = useMemo(() => {
    const model = parseFloat(modelSize)
    const ram = parseFloat(ramSize)
    if (!model || !ram || ram <= 0) return 'neutral'
    const ratio = model / ram
    if (ratio <= 0.5) return 'safe'
    if (ratio <= 0.8) return 'warning'
    return 'danger'
  }, [modelSize, ramSize])

  return { modelSize, setModelSize, ramSize, setRamSize, status }
}

const STATUS_CONFIG: Record<
  RamStatus,
  { text: string; colorClass: string }
> = {
  neutral: {
    text: 'RAM DURUMU: BEKLENİYOR',
    colorClass: 'text-text-muted border-text-muted',
  },
  safe: {
    text: 'YETERLİ: MODEL ÇALIŞABİLİR',
    colorClass: 'text-safe-green border-safe-green',
  },
  warning: {
    text: 'SINIRDA: DÜŞÜK PERFORMANS',
    colorClass: 'text-warn-yellow border-warn-yellow',
  },
  danger: {
    text: 'YETERSİZ: RAM ARTTIRILMALI',
    colorClass: 'text-accent-red-light border-accent-red',
  },
}

/* ═══════════════════════════ HOME PAGE ═══════════════════════════ */
export default function Home() {
  return (
    <div className="relative">
      {/* Fixed canvas background */}
      <DataStreamCanvas />

      {/* Page content sits above canvas */}
      <div className="relative z-10">
        <HeroSection />
        <ProblemSection />
        <ModelShowcaseSection />
        <RAMCalculatorSection />
        <FeaturesSection />
        <CTABannerSection />
      </div>
    </div>
  )
}

/* ═══════════════════════════ SECTION 1: HERO ═══════════════════════════ */
const HERO_TITLE = 'Yapay zeka, Türkçe konuşsun.'

function HeroSection() {
  return (
    <section className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden">
      {/* Hero content */}
      <div className="relative z-10 mx-auto max-w-[800px] px-6 pt-16 text-center">
        <h1
          className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-text-primary sm:text-5xl md:text-[4.5rem]"
          style={{ letterSpacing: '-0.02em' }}
        >
          {HERO_TITLE}
        </h1>

        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-safe-green/30 bg-safe-green/10 px-4 py-1.5 font-mono text-xs uppercase tracking-wider text-safe-green">
          <span className="h-1.5 w-1.5 rounded-full bg-safe-green" aria-hidden="true" />
          Topluluk Edisyonu · Tamamen Ücretsiz
        </div>

        <p className="mx-auto mt-6 max-w-[600px] text-lg leading-relaxed text-text-secondary md:text-xl">
          OllamaTR, özenle seçilmiş Türkçe-uyumlu yapay zeka modellerini tek
          tıkla bilgisayarınıza getirir. Ücretsiz, açık kaynak ve %100 yerel
          işleme.
        </p>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/modeller"
            className="inline-flex items-center gap-2 rounded bg-accent-red-deep px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-colors duration-200 hover:bg-accent-red-light"
          >
            Modelleri Gör
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/modeller"
            className="inline-flex items-center gap-2 rounded border border-border-subtle px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-text-primary transition-all duration-200 hover:border-accent-red hover:text-accent-red-light"
          >
            <BookOpen className="h-4 w-4" />
            Model Kataloğu
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════ SECTION 2: PROBLEM ═══════════════════════════ */
function ProblemSection() {
  const { ref, visible } = useScrollReveal()

  return (
    <section ref={ref} className="bg-bg-obsidian py-24 md:py-32 lg:py-[120px]">
      <div
        className="mx-auto max-w-[720px] px-6 text-center lg:px-10"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <h2 className="font-display text-2xl font-bold text-text-primary md:text-3xl lg:text-[2.5rem] lg:leading-tight">
          Türkiye&apos;de AI kullanmak neden bu kadar zor?
        </h2>
        <p className="mt-6 text-base leading-relaxed text-text-secondary md:text-lg">
          Global platformlar Türkçe destek sunmuyor, KVKK uyumluluğu belirsiz,
          kurulumlar İngilizce terminolojiyle dolu. KOBİ&apos;ler ve geliştiriciler
          için yerel bir çözüm yoktu. Şimdi var.
        </p>
      </div>
    </section>
  )
}

/* ═══════════════════════════ SECTION 3: MODEL SHOWCASE ═══════════════════════════ */
function ModelShowcaseSection() {
  return (
    <section className="bg-bg-obsidian py-24 md:py-32 lg:py-[120px]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight text-text-primary md:text-3xl lg:text-[2.5rem]">
            Özenle seçilmiş Türkçe modeller
          </h2>
          <Link
            to="/modeller"
            className="mt-3 inline-flex items-center gap-1 text-sm font-medium uppercase tracking-wider text-text-secondary transition-colors hover:text-accent-red-light"
          >
            İlk 6 popüler model gösteriliyor. Tümünü gör
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Flat responsive grid — cards visible by default */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {MODELS.slice(0, 6).map((model) => (
            <ModelCard key={model.name} model={model} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ModelCard({ model }: { model: (typeof MODELS)[0] }) {
  return (
    <TiltCard className="h-full">
      <div className="rounded-lg border border-border-subtle bg-bg-charcoal p-6 transition-colors duration-200 hover:border-accent-red/50 h-full flex flex-col">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-base font-bold text-text-primary md:text-lg">
            {model.name}
          </h3>
          <span className="font-mono shrink-0 rounded border border-border-subtle bg-bg-surface px-2 py-0.5 text-xs uppercase text-text-secondary">
            {model.ram}GB
          </span>
        </div>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-text-secondary">
          {model.desc}
        </p>
        <Link
          to="/modeller"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent-red-light transition-colors hover:text-accent-red-light"
        >
          <ArrowRight className="h-3.5 w-3.5" />
          Detaylar
        </Link>
      </div>
    </TiltCard>
  )
}

/* ═══════════════════════════ SECTION 4: RAM CALCULATOR ═══════════════════════════ */
function RAMCalculatorSection() {
  const { ref, visible } = useScrollReveal()
  const { modelSize, setModelSize, ramSize, setRamSize, status } = useRAMCalculator()
  const config = STATUS_CONFIG[status]

  return (
    <section ref={ref} className="bg-bg-charcoal py-24 md:py-32 lg:py-[120px]">
      <div
        className="mx-auto max-w-[600px] px-6 lg:px-10"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <h2 className="text-center font-display text-2xl font-bold tracking-tight text-text-primary md:text-3xl lg:text-[2.5rem]">
          Sisteminiz hazır mı?
        </h2>
        <p className="mt-4 text-center text-base text-text-secondary">
          Model boyutu ve RAM miktarını girin, uyumluluğu anında görün.
        </p>

        <div className="mt-10 space-y-6">
          <div>
            <label
              htmlFor="model-size"
              className="mb-2 block font-mono text-xs uppercase text-text-muted"
            >
              Model Boyutu (GB)
            </label>
            <input
              id="model-size"
              type="number"
              min={1}
              max={128}
              value={modelSize}
              onChange={(e) => setModelSize(e.target.value)}
              placeholder="Örn: 8"
              className="w-full rounded border border-border-subtle bg-bg-surface px-4 py-3 text-base text-text-primary outline-none transition-all duration-200 placeholder:text-text-muted focus:border-border-active focus:shadow-[0_0_0_3px_rgba(217,30,54,0.15)]"
            />
          </div>

          <div>
            <label
              htmlFor="ram-size"
              className="mb-2 block font-mono text-xs uppercase text-text-muted"
            >
              Mevcut RAM (GB)
            </label>
            <input
              id="ram-size"
              type="number"
              min={4}
              max={128}
              value={ramSize}
              onChange={(e) => setRamSize(e.target.value)}
              placeholder="Örn: 16"
              className="w-full rounded border border-border-subtle bg-bg-surface px-4 py-3 text-base text-text-primary outline-none transition-all duration-200 placeholder:text-text-muted focus:border-border-active focus:shadow-[0_0_0_3px_rgba(217,30,54,0.15)]"
            />
          </div>

          {/* Status Badge */}
          <div
            className={`rounded border px-4 py-3 text-center font-mono text-xs uppercase transition-colors duration-300 ${config.colorClass}`}
          >
            {config.text}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════ SECTION 5: SOCIAL PROOF — REMOVED ═══════════════════════════
 * The audit panel (G1/G2/T1/T2/R1) flagged the fabricated STATS + TESTIMONIALS
 * as TKHK Madde 61 misleading-advertising risk and the single biggest brand-truth
 * liability on the site. Removed alongside the Hakkimizda fake team + partner logo
 * wall in commit applying redesign-audit-r1. When real numbers + real users exist,
 * a SocialProofSection can return with live data sources.
 */
// SocialProofSection deleted in its entirety; resume real layout below.

/* ═══════════════════════════ SECTION 5: FEATURES ═══════════════════════════ */
const FEATURES = [
  {
    icon: Shield,
    title: 'KVKK Hazır',
    desc: 'Tek tıkla KVKK uyumlu AI kurulumu. Verileriniz hiçbir yere gitmez.',
  },
  {
    icon: Terminal,
    title: 'Tek Tık Kurulum',
    desc: 'Docker bilgisi gerektirmez. Tauri tabanlı installer her şeyi halleder.',
  },
  {
    icon: MessageSquare,
    title: 'Türkçe Dokümantasyon',
    desc: 'Adım adım Türkçe rehberler, API dokümantasyonu ve video eğitimler.',
  },
  {
    icon: Cpu,
    title: 'Yerel Çalışma',
    desc: 'Tüm modeller yerel donanımda çalışır. İnternet bağlantısı gerektirmez, latency sıfır.',
  },
]

function FeaturesSection() {
  const { ref, visible } = useScrollReveal()

  return (
    <section ref={ref} className="bg-bg-charcoal py-24 md:py-32 lg:py-[120px]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <h2
          className="text-center font-display text-2xl font-bold tracking-tight text-text-primary md:text-3xl lg:text-[2.5rem]"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          Neden OllamaTR?
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="rounded-lg border border-border-subtle bg-bg-obsidian p-8 transition-colors duration-200 hover:border-accent-red/30"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(40px)',
                  transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.12 * i}s`,
                }}
              >
                <Icon className="h-8 w-8 text-accent-red-light" />
                <h3 className="mt-5 font-display text-lg font-bold text-text-primary">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {feature.desc}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════ SECTION 7: CTA BANNER ═══════════════════════════ */
function CTABannerSection() {
  const { ref, visible } = useScrollReveal()

  return (
    <section ref={ref} className="relative bg-bg-obsidian py-32 md:py-40 lg:py-44">
      {/* Subtle red radial gradient */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[800px] px-6 text-center lg:px-10">
        <h2
          className="font-display text-3xl font-bold tracking-tight text-text-primary md:text-4xl lg:text-[3.5rem] lg:leading-tight"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
          }}
        >
          Türkiye&apos;nin AI devrimine katıl.
        </h2>

        <p
          className="mx-auto mt-6 max-w-[600px] text-base leading-relaxed text-text-secondary md:text-lg"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.8s',
          }}
        >
          Topluluğa katıl ve özenle seçilmiş Türkçe modelleri yerel olarak
          çalıştırmaya başla. Tamamen ücretsiz ve açık kaynak.
        </p>

        <div
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
            transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 1.0s',
          }}
        >
          <a
            href="https://t.me/+sK_c-yKLc4E0Y2I0"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded bg-accent-red-deep px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-colors duration-200 hover:bg-accent-red-light"
          >
            Telegram topluluğuna katıl
            <ArrowRight className="h-4 w-4" />
          </a>
          <Link
            to="/modeller"
            className="inline-flex items-center gap-2 rounded border border-border-subtle px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-text-primary transition-colors duration-200 hover:border-accent-red hover:text-accent-red-light"
          >
            Modelleri keşfet
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
