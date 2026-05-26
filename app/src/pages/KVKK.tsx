import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Shield,
  CheckCircle2,
  ChevronDown,
  Download,
  ServerOff,
  HardDrive,
  Lock,
  FileCheck,
  ArrowRight,
  XCircle,
  Monitor,
} from 'lucide-react'
import { easeExpoOut } from '@/lib/animations'
import { ErrorBoundary } from '@/components/ErrorBoundary'

/* ------------------------------------------------------------------ */
/*  Scroll reveal hook (from Modeller.tsx pattern)                    */
/* ------------------------------------------------------------------ */
function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, visible }
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const checklistItems = [
  {
    article: 'Madde 4/2',
    title: "Veri işleme faaliyetinin yurt içinde gerçekleştirilmesi",
    desc: "Tüm veri işleme yerel donanımda.",
    status: 'UYUMLU',
  },
  {
    article: 'Madde 10',
    title: 'Aydınlatma yükümlülüğü',
    desc: 'Kurulumda açık izin akışı.',
    status: 'UYUMLU',
  },
  {
    article: 'Madde 11',
    title: "Veri sahibinin hakları",
    desc: 'Kullanıcı tüm verilerini dilediği zaman silebilir.',
    status: 'UYUMLU',
  },
  {
    article: 'Madde 12',
    title: 'Veri güvenliği',
    desc: 'Yerel şifreleme, hiçbir veri iletimi yok.',
    status: 'UYUMLU',
  },
  {
    article: 'Madde 15',
    title: 'Veri ihlali bildirimi',
    desc: 'Yerel işleme nedeniyle veri ihlali riski sıfır.',
    status: 'UYUMLU',
  },
]

const installerSteps = [
  {
    num: 1,
    title: 'KVKK Aydınlatma Metni',
    desc: 'Kurulum sihirbazında KVKK aydınlatma metni otomatik gösterilir. Kullanıcı açıkça onay vermeden kurulum devam etmez.',
    icon: FileCheck,
  },
  {
    num: 2,
    title: 'Yerel İşlem Onayı',
    desc: "'Tüm AI işlemlerinin yerel donanımda gerçekleşeceği' kullanıcı tarafından onaylanır.",
    icon: HardDrive,
  },
  {
    num: 3,
    title: 'Varsayılan Gizlilik Ayarları',
    desc: 'Kurulum sonrası tüm telemetri kapalıdır. Kullanıcı açıkça etkinleştirmedikçe hiçbir veri toplanmaz.',
    icon: Lock,
  },
  {
    num: 4,
    title: 'Veri Silme Kontrolü',
    desc: 'Kullanıcı panelinden tüm sohbet geçmişi, indirilen modeller ve ayarlar tek tıkla silinebilir.',
    icon: ServerOff,
  },
]

interface ComparisonRow {
  feature: string
  ollamatr: string
  cloud: string
  /** When true, the cloud cell is rendered with warn-yellow (risk indicator). */
  cloudRisk?: boolean
}

const comparisonRows: ComparisonRow[] = [
  { feature: 'Veri İşleme Yeri', ollamatr: 'Yerel Donanım', cloud: 'ABD/EU Sunucular', cloudRisk: true },
  { feature: 'İnternet Gereksinimi', ollamatr: 'Gerekmez', cloud: 'Zorunlu' },
  { feature: 'Veri Saklama', ollamatr: 'Kullanıcı cihazında', cloud: 'Sunucuda saklanır', cloudRisk: true },
  { feature: 'KVKK Uyumu', ollamatr: 'Doğal uyum', cloud: 'Riskli (transfer)', cloudRisk: true },
  { feature: 'Veri Silme', ollamatr: 'Anlık, yerel', cloud: 'Talep gerekli' },
  { feature: '3. Taraf Paylaşım', ollamatr: 'Sadece sizin', cloud: '3. taraflarla paylaşılabilir', cloudRisk: true },
  { feature: 'Maliyet', ollamatr: 'Ücretsiz/149₺', cloud: '$20/ay+' },
]

const trustPillars = [
  { title: '%100 Yerel İşleme', desc: 'Tüm veriler cihazınızda işlenir.' },
  { title: 'Sıfır Bulut Bağımlılığı', desc: 'İnternet olmadan çalışır.' },
  { title: 'KVKK Tam Uyum', desc: "6698 sayılı Kanun'a göre yapılandırılmıştır." },
]

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */
function TrustPillarCard({ pillar, index }: { pillar: typeof trustPillars[number]; index: number }) {
  const { ref, visible } = useScrollReveal()
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(30px)',
        transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.12}s`,
      }}
      className="rounded-lg border border-border-subtle bg-bg-obsidian p-6"
    >
      <h3 className="font-display text-lg font-bold text-text-primary">
        {pillar.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-text-secondary">
        {pillar.desc}
      </p>
    </div>
  )
}

function ExpandableChecklistItem({
  item,
}: {
  item: (typeof checklistItems)[number]
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-border-subtle">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-2 py-5 text-left transition-colors duration-200 hover:bg-[rgba(217,30,54,0.02)]"
      >
        <div className="flex items-center gap-4">
          <span className="shrink-0 font-mono text-xs uppercase tracking-wider text-text-muted">
            {item.article}
          </span>
          <div>
            <h4 className="font-body text-base font-medium text-text-primary">
              {item.title}
            </h4>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <span className="inline-flex items-center gap-1 rounded bg-safe-green/10 px-2 py-1 font-mono text-[0.625rem] font-medium uppercase tracking-wider text-safe-green">
            <CheckCircle2 className="h-3 w-3" />
            {item.status}
          </span>
          <ChevronDown
            className={`h-4 w-4 text-text-muted transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          />
        </div>
      </button>

      <AnimatePresence initial={false} mode="wait">
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: easeExpoOut }}
            className="overflow-hidden"
          >
            <div className="px-2 pb-5 pl-[4.5rem]">
              <p className="text-sm leading-relaxed text-text-secondary">{item.desc}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Heavy below-fold content (deferred mount)                          */
/* ------------------------------------------------------------------ */
interface HeavyContentProps {
  sectionStyle: (visible: boolean, delay?: number) => {
    opacity: number
    transform: string
    transition: string
  }
}

function KVKKHeavyContent({ sectionStyle }: HeavyContentProps) {
  const { ref: promiseRef, visible: promiseVisible } = useScrollReveal()
  const { ref: diagramRef, visible: diagramVisible } = useScrollReveal()
  const { ref: checklistRef, visible: checklistVisible } = useScrollReveal()
  const { ref: installerRef, visible: installerVisible } = useScrollReveal()
  const { ref: comparisonRef, visible: comparisonVisible } = useScrollReveal()
  const { ref: ctaRef, visible: ctaVisible } = useScrollReveal()

  return (
    <>
      {/* ============================================================ */}
      {/* SECTION 2 — The KVKK Promise ("Taahhüdümüz")                 */}
      {/* ============================================================ */}
      <section className="bg-bg-charcoal px-6 py-28 lg:px-10">
        <div className="mx-auto grid max-w-5xl items-start gap-12 lg:grid-cols-2">
          {/* Left */}
          <div ref={promiseRef}>
            <h2
              style={sectionStyle(promiseVisible)}
              className="font-display text-3xl font-bold leading-tight text-text-primary md:text-4xl"
            >
              VERİLERİNİZ SİZDE KALIR
            </h2>
            <p
              style={sectionStyle(promiseVisible, 0.1)}
              className="mt-6 text-base leading-relaxed text-text-secondary"
            >
              Tüm verileriniz cihazınızda işlenir. Hiçbir veri sunucularımıza gönderilmez.
              Geleneksel AI hizmetleri (ChatGPT, Claude vb.) sorgularınızı kendi sunucularına gönderir
              ve verilerinizi saklar. OllamaTR tamamen farklıdır:
            </p>
            <ul className="mt-6 space-y-3">
              {[
                'Tüm model çalıştırma yerel bilgisayarınızda gerçekleşir',
                'Hiçbir prompt, yanıt veya kullanım verisi internete çıkmaz',
                'Kurulum sonrası internet bağlantısı bile gerekmez',
                'Verileriniz 3. taraflarla paylaşılmaz, satılmaz, işlenmez',
              ].map((pt, i) => (
                <li
                  key={pt}
                  style={sectionStyle(promiseVisible, 0.15 + i * 0.05)}
                  className="flex items-start gap-3 text-sm leading-relaxed text-text-secondary"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-safe-green" />
                  {pt}
                </li>
              ))}
            </ul>

            {/* Visual diagram */}
            <div ref={diagramRef} className="mt-8">
              <div
                style={sectionStyle(diagramVisible, 0.2)}
                className="flex items-center gap-3 rounded-lg bg-bg-surface p-4"
              >
                <div className="flex items-center gap-2 rounded bg-bg-obsidian px-3 py-2 font-body text-xs text-text-primary">
                  <Monitor className="h-4 w-4" />
                  Kullanıcı
                </div>
                <ArrowRight className="h-4 w-4 text-text-muted" />
                <div className="flex items-center gap-2 rounded border-2 border-safe-green bg-bg-obsidian px-3 py-2 font-body text-xs text-safe-green">
                  <HardDrive className="h-4 w-4" />
                  OllamaTR (Yerel)
                </div>
                <motion.div
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="flex items-center"
                  aria-hidden="true"
                >
                  <XCircle className="h-4 w-4 text-accent-red" />
                </motion.div>
                <span className="font-body text-xs text-text-muted line-through">İnternet/Sunucu</span>
              </div>
            </div>
          </div>

          {/* Right — 3 trust pillars */}
          <div className="space-y-6">
            {trustPillars.map((pillar, i) => (
              <TrustPillarCard key={pillar.title} pillar={pillar} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 3 — Compliance Checklist                               */}
      {/* ============================================================ */}
      <section className="bg-bg-obsidian px-6 py-24 lg:px-10">
        <div ref={checklistRef} className="mx-auto max-w-4xl">
          <h2
            style={sectionStyle(checklistVisible)}
            className="mb-10 font-display text-2xl font-bold text-text-primary md:text-3xl"
          >
            KVKK UYUMLULUK KONTROL LİSTESİ
          </h2>

          <div
            style={sectionStyle(checklistVisible, 0.15)}
            className="rounded-lg border border-border-subtle bg-bg-charcoal"
          >
            {checklistItems.map((item) => (
              <ExpandableChecklistItem key={item.article} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 4 — Installer KVKK Flow                              */}
      {/* ============================================================ */}
      <section className="bg-bg-charcoal px-6 py-28 lg:px-10">
        <div ref={installerRef} className="mx-auto max-w-3xl">
          <h2
            style={sectionStyle(installerVisible)}
            className="mb-4 font-display text-2xl font-bold text-text-primary"
          >
            KURULUM SIRASINDA KVKK
          </h2>
          <p
            style={sectionStyle(installerVisible, 0.1)}
            className="mb-10 text-base leading-relaxed text-text-secondary"
          >
            Tauri installer'ımız ilk kurulumda KVKK uyumlu bir yapılandırma akışı sunar:
          </p>

          <div className="space-y-6">
            {installerSteps.map((step, i) => (
              <div
                key={step.num}
                style={{
                  opacity: installerVisible ? 1 : 0,
                  transform: installerVisible ? 'translateY(0)' : 'translateY(25px)',
                  transition: `all 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.12}s`,
                }}
                className="flex items-start gap-4"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-red text-sm font-bold text-white">
                  {step.num}
                </div>
                <div className="flex items-start gap-3">
                  <step.icon className="mt-0.5 h-5 w-5 text-text-secondary" />
                  <div>
                    <h4 className="font-display text-base font-bold text-text-primary">
                      {step.title}
                    </h4>
                    <p className="mt-1 text-sm leading-relaxed text-text-secondary">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Final checkmark */}
            <div
              style={{
                opacity: installerVisible ? 1 : 0,
                transform: installerVisible ? 'scale(1)' : 'scale(0.8)',
                transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.5s',
              }}
              className="flex items-center gap-3 rounded-lg border border-safe-green/30 bg-safe-green/5 p-4"
            >
              <CheckCircle2 className="h-6 w-6 text-safe-green" />
              <span className="font-body text-sm font-medium text-safe-green">
                Tüm adımlar tamamlandığında KVKK uyumlu çalışmaya başlar.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 5 — Comparison Table                                 */}
      {/* ============================================================ */}
      <section className="bg-bg-obsidian px-6 py-24 lg:px-10">
        <div ref={comparisonRef} className="mx-auto max-w-4xl">
          <h2
            style={sectionStyle(comparisonVisible)}
            className="mb-10 font-display text-2xl font-bold text-text-primary"
          >
            KARŞILAŞTIRMA
          </h2>

          <div
            style={sectionStyle(comparisonVisible, 0.15)}
            className="overflow-x-auto"
          >
            <table className="w-full min-w-[640px] border-collapse rounded-lg border border-border-subtle">
              <thead>
                <tr className="bg-bg-charcoal">
                  <th className="px-5 py-4 text-left font-display text-sm font-bold uppercase tracking-wider text-text-muted">
                    Özellik
                  </th>
                  <th className="border-l-2 border-l-accent-red px-5 py-4 text-left font-display text-sm font-bold uppercase tracking-wider text-accent-red">
                    OllamaTR
                  </th>
                  <th className="px-5 py-4 text-left font-display text-sm font-bold uppercase tracking-wider text-text-muted">
                    Bulut AI (ChatGPT vb.)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {comparisonRows.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={`transition-colors duration-150 ${i % 2 === 0 ? 'bg-bg-obsidian' : 'bg-bg-charcoal/50'}`}
                  >
                    <td className="px-5 py-4 font-body text-sm font-medium text-text-primary">
                      {row.feature}
                    </td>
                    <td className="border-l-2 border-l-accent-red px-5 py-4 font-body text-sm font-medium text-safe-green">
                      {row.ollamatr}
                    </td>
                    <td
                      className={`px-5 py-4 font-body text-sm ${
                        row.cloudRisk === true ? 'font-medium text-warn-yellow' : 'text-text-secondary'
                      }`}
                    >
                      {row.cloud}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 6 — CTA                                              */}
      {/* ============================================================ */}
      <section className="bg-bg-charcoal px-6 py-24 lg:px-10">
        <div ref={ctaRef} className="mx-auto max-w-xl text-center">
          <div
            style={{
              opacity: ctaVisible ? 1 : 0,
              transform: ctaVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <Shield className="mx-auto h-12 w-12 text-safe-green" />
          </div>
          <h2
            style={{
              opacity: ctaVisible ? 1 : 0,
              transform: ctaVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
            }}
            className="mt-6 font-display text-3xl font-bold text-text-primary md:text-4xl"
          >
            Gizliliğinizi Geri Alın
          </h2>
          <p
            style={{
              opacity: ctaVisible ? 1 : 0,
              transform: ctaVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
            }}
            className="mt-4 text-lg leading-relaxed text-text-secondary"
          >
            KVKK uyumlu, yerel, ücretsiz AI deneyimini hemen başlatın.
          </p>
          <div
            style={{
              opacity: ctaVisible ? 1 : 0,
              transform: ctaVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
            }}
            className="mt-8 flex flex-wrap justify-center gap-4"
          >
            <Link
              to="/indir"
              className="inline-flex items-center gap-2 rounded bg-accent-red px-7 py-3.5 font-body text-sm font-semibold uppercase tracking-wider text-white transition-all duration-200 hover:scale-[1.02] hover:bg-accent-red-light"
            >
              <Download className="h-4 w-4" />
              KVKK Uyumlu Kurulum
            </Link>
            <a
              href="mailto:privacy@ollamatr.com"
              className="inline-flex items-center gap-2 rounded border border-border-subtle px-7 py-3.5 font-body text-sm font-semibold uppercase tracking-wider text-text-primary transition-all duration-200 hover:border-accent-red hover:text-accent-red-light"
            >
              Daha Fazla Bilgi
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */
export default function KVKK() {
  const { ref: heroRef, visible: heroVisible } = useScrollReveal()

  /**
   * Deferred mount for heavy below-fold sections.
   *
   * AUDIT FIX (audit-ux.md CRITICAL): KVKK page was timing out on load due to
   * 7 simultaneous IntersectionObserver instances + heavy Framer Motion subtrees
   * all mounting synchronously. We render the hero immediately and defer the
   * rest of the page to the next tick via setTimeout(0). Hash routing remains
   * intact because the route element resolves synchronously — only the inner
   * content mounts on the next tick.
   */
  const [heavyReady, setHeavyReady] = useState(false)
  useEffect(() => {
    const timer = window.setTimeout(() => setHeavyReady(true), 0)
    return () => window.clearTimeout(timer)
  }, [])

  const heroStyle = (delay = 0): { opacity: number; transform: string; transition: string } => ({
    opacity: heroVisible ? 1 : 0,
    transform: heroVisible ? 'translateY(0)' : 'translateY(30px)',
    transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
  })

  const sectionStyle = (
    visible: boolean,
    delay = 0
  ): { opacity: number; transform: string; transition: string } => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(30px)',
    transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
  })

  return (
    <div>
      {/* ============================================================ */}
      {/* SECTION 1 — Hero (mounts synchronously)                      */}
      {/* ============================================================ */}
      <section className="bg-bg-obsidian px-6 pt-40 pb-16 lg:px-10">
        <div ref={heroRef} className="mx-auto max-w-7xl">
          <span
            style={heroStyle(0)}
            className="mb-4 inline-block font-body text-sm font-medium uppercase tracking-wider text-accent-red"
          >
            VERİ GİZLİLİĞİ
          </span>
          <h1
            style={heroStyle(0.1)}
            className="font-display text-4xl font-bold leading-tight text-text-primary md:text-5xl lg:text-6xl"
          >
            KVKK Uyumlu Yerel AI
          </h1>
          <p
            style={heroStyle(0.22)}
            className="mt-6 max-w-xl text-lg leading-relaxed text-text-secondary"
          >
            OllamaTR'de verileriniz asla sunucularımıza gitmez. Tüm işleme yerel donanımda gerçekleşir.
            6698 sayılı KVKK kanununa tam uyum.
          </p>
        </div>
      </section>

      {/* Heavy below-fold sections — deferred mount + error-boundary isolated */}
      <ErrorBoundary>
        {heavyReady ? <KVKKHeavyContent sectionStyle={sectionStyle} /> : null}
      </ErrorBoundary>
    </div>
  )
}
