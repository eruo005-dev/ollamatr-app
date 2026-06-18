import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  Shield,
  CheckCircle2,
  ChevronDown,
  ServerOff,
  HardDrive,
  Lock,
  FileCheck,
  ArrowRight,
  XCircle,
  Monitor,
  ScrollText,
} from 'lucide-react'
import { easeExpoOut } from '@/lib/animations'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { ErrorBoundary } from '@/components/ErrorBoundary'

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
interface ChecklistItem {
  article: string
  title: string
  desc: string
  /** Neutral label — NOT a compliance assertion. */
  label: string
}

const checklistItems: ChecklistItem[] = [
  {
    article: 'Madde 4',
    title: 'Genel İlkeler',
    desc: 'Kişisel verilerin hukuka ve dürüstlük kurallarına uygun olarak; doğru ve gerektiğinde güncel; belirli, açık ve meşru amaçlar için; işlendikleri amaçla bağlantılı, sınırlı ve ölçülü olarak; ilgili mevzuatta öngörülen veya işlendikleri amaç için gerekli olan süre kadar muhafaza edilmesi gerekir. OllamaTR masaüstü ürünü tüm AI işlemlerini cihazınızda yerel olarak gerçekleştirir; bu durum genel ilkelere uyumu kolaylaştırır.',
    label: 'MADDE 4: GENEL İLKELER',
  },
  {
    article: 'Madde 10',
    title: 'Aydınlatma Yükümlülüğü',
    desc: 'Veri sorumlusu, kişisel verilerin elde edilmesi sırasında ilgili kişileri aydınlatmakla yükümlüdür. Bu sayfanın alt kısmında yer alan Aydınlatma Metni bölümünde bu yükümlülüğü karşılayan bilgiler sunulmaktadır.',
    label: 'MADDE 10: AYDINLATMA YÜKÜMLÜLÜĞÜ',
  },
  {
    article: 'Madde 11',
    title: 'Veri Sahibinin Hakları',
    desc: 'İlgili kişilerin sahip olduğu 8 yasal hak Aydınlatma Metni bölümünde tek tek sıralanmıştır. Talepleriniz için support@ollamatr.com adresine başvurabilirsiniz.',
    label: 'MADDE 11: VERİ SAHİBİ HAKLARI',
  },
  {
    article: 'Madde 12',
    title: 'Veri Güvenliği',
    desc: 'Veri sorumlusu; kişisel verilerin hukuka aykırı işlenmesini ve erişilmesini önlemek, muhafazasını sağlamak amacıyla uygun güvenlik düzeyini temin etmeye yönelik gerekli her türlü teknik ve idari tedbirleri almakla yükümlüdür. OllamaTR masaüstü ürünü için yerel şifreleme ve internetten yalıtılmış işleme; web sitesi için TLS, erişim kontrolleri ve güncel altyapı uygulanmaktadır.',
    label: 'MADDE 12: VERİ GÜVENLİĞİ',
  },
  {
    article: 'Madde 15',
    title: 'Veri İhlali Bildirimi',
    desc: 'Yerel işleme veri ihlali riskini önemli ölçüde azaltır; ancak risk asla sıfır değildir. Bir veri ihlali halinde KVKK Kurulu’na 72 saat içinde bildirimde bulunulacak ve etkilenen ilgili kişiler bilgilendirilecektir.',
    label: 'MADDE 15: VERİ İHLALİ BİLDİRİMİ',
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
  { feature: 'Maliyet', ollamatr: 'Ücretsiz', cloud: '$20/ay+' },
]

const trustPillars = [
  { title: '%100 Yerel İşleme', desc: 'Tüm veriler cihazınızda işlenir.' },
  { title: 'Sıfır Bulut Bağımlılığı', desc: 'İnternet olmadan çalışır.' },
  { title: 'KVKK Tam Uyum', desc: "6698 sayılı Kanun'a göre yapılandırılmıştır." },
]

/* ------------------------------------------------------------------ */
/*  Aydınlatma Metni — Article 11 rights enumeration                    */
/* ------------------------------------------------------------------ */
const article11Rights: string[] = [
  'Kişisel verilerinin işlenip işlenmediğini öğrenme,',
  'Kişisel verileri işlenmişse buna ilişkin bilgi talep etme,',
  'Kişisel verilerin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme,',
  'Yurt içinde veya yurt dışında kişisel verilerin aktarıldığı üçüncü kişileri bilme,',
  'Kişisel verilerin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme,',
  'KVKK’nın 7. maddesinde öngörülen şartlar çerçevesinde kişisel verilerin silinmesini veya yok edilmesini isteme,',
  '(5) ve (6) bentleri uyarınca yapılan işlemlerin, kişisel verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme,',
  'İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle kişinin kendisi aleyhine bir sonucun ortaya çıkmasına itiraz etme ve kişisel verilerin kanuna aykırı olarak işlenmesi sebebiyle zarara uğraması hâlinde zararın giderilmesini talep etme.',
]

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */
function TrustPillarCard({ pillar, index }: { pillar: (typeof trustPillars)[number]; index: number }) {
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
      <h3 className="font-display text-lg font-bold text-text-primary">{pillar.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-text-secondary">{pillar.desc}</p>
    </div>
  )
}

function ExpandableChecklistItem({ item }: { item: ChecklistItem }) {
  const [open, setOpen] = useState(false)
  const reduce = useReducedMotion()

  return (
    <div className="border-b border-border-subtle">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-2 py-5 text-left transition-colors duration-200 hover:bg-[rgba(217,30,54,0.02)]"
      >
        <div className="flex items-center gap-4">
          <span className="shrink-0 font-mono text-xs tracking-wide text-text-muted">
            {item.article}
          </span>
          <div>
            <h4 className="font-body text-base font-medium text-text-primary">{item.title}</h4>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <span className="inline-flex items-center gap-1 rounded border border-border-subtle bg-bg-charcoal px-2 py-1 font-mono text-[0.625rem] font-medium tracking-wide text-text-secondary">
            {item.label}
          </span>
          <ChevronDown
            className={`h-4 w-4 text-text-muted transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          />
        </div>
      </button>

      <AnimatePresence initial={false} mode="wait">
        {open && (
          <motion.div
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.25, ease: easeExpoOut }}
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
  sectionStyle: (
    visible: boolean,
    delay?: number
  ) => {
    opacity: number
    transform: string
    transition: string
  }
}

function KVKKHeavyContent({ sectionStyle }: HeavyContentProps) {
  const reduce = useReducedMotion()
  const { ref: promiseRef, visible: promiseVisible } = useScrollReveal()
  const { ref: diagramRef, visible: diagramVisible } = useScrollReveal()
  const { ref: checklistRef, visible: checklistVisible } = useScrollReveal()
  const { ref: installerRef, visible: installerVisible } = useScrollReveal()
  const { ref: comparisonRef, visible: comparisonVisible } = useScrollReveal()
  const { ref: aydinlatmaRef, visible: aydinlatmaVisible } = useScrollReveal()
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
              OllamaTR <strong>masaüstü uygulaması</strong> (Ollama + Open WebUI paketi) tüm AI işlemlerini
              cihazınızda yerel olarak gerçekleştirir. Geleneksel AI hizmetleri (ChatGPT, Claude vb.) sorgularınızı
              kendi sunucularına gönderir ve verilerinizi saklar. Masaüstü ürünümüz tamamen farklıdır:
            </p>
            <ul className="mt-6 space-y-3">
              {[
                'Tüm model çalıştırma yerel bilgisayarınızda gerçekleşir',
                'Hiçbir prompt, yanıt veya model kullanım verisi internete çıkmaz',
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

            {/* Carve-out box */}
            <div
              style={sectionStyle(promiseVisible, 0.4)}
              className="mt-6 rounded-lg border border-warn-yellow/30 bg-warn-yellow/5 p-4"
            >
              <p className="text-xs leading-relaxed text-text-secondary">
                <strong className="text-warn-yellow">Önemli kapsam:</strong> Bu taahhüt OllamaTR{' '}
                <strong>masaüstü ürününün</strong> AI işleme bileşenini kapsar. Bu{' '}
                <strong>web sitesi</strong> ve yol haritasındaki olası bulut hizmetleri ise aşağıda yer alan
                Aydınlatma Metni ile{' '}
                <Link to="/cerez-politikasi" className="text-accent-red-light underline hover:text-accent-red-light">
                  Çerez Politikası
                </Link>{' '}
                kapsamındadır.
              </p>
            </div>

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
                  animate={reduce ? undefined : { opacity: [0.6, 1, 0.6] }}
                  transition={reduce ? undefined : { duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="flex items-center"
                  aria-hidden="true"
                >
                  <XCircle className="h-4 w-4 text-accent-red-light" />
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
      {/* SECTION 3 — KVKK Article Reference List                       */}
      {/* ============================================================ */}
      <section className="bg-bg-obsidian px-6 py-24 lg:px-10">
        <div ref={checklistRef} className="mx-auto max-w-4xl">
          <h2
            style={sectionStyle(checklistVisible)}
            className="mb-3 font-display text-2xl font-bold text-text-primary md:text-3xl"
          >
            KVKK MADDE REFERANSLARI
          </h2>
          <p
            style={sectionStyle(checklistVisible, 0.05)}
            className="mb-10 text-sm leading-relaxed text-text-secondary"
          >
            6698 sayılı Kanun'un OllamaTR ile doğrudan ilgili maddelerine ait yasal özet. Bu liste bir
            uyumluluk beyanı değil, sayfanın altındaki Aydınlatma Metni ile birlikte okunması gereken yasal
            referanslardır.
          </p>

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
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-red-deep text-sm font-bold text-white">
                  {step.num}
                </div>
                <div className="flex items-start gap-3">
                  <step.icon className="mt-0.5 h-5 w-5 text-text-secondary" />
                  <div>
                    <h4 className="font-display text-base font-bold text-text-primary">{step.title}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-text-secondary">{step.desc}</p>
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

          <div style={sectionStyle(comparisonVisible, 0.15)} className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse rounded-lg border border-border-subtle">
              <thead>
                <tr className="bg-bg-charcoal">
                  <th className="px-5 py-4 text-left font-display text-sm font-bold tracking-wide text-text-muted">
                    Özellik
                  </th>
                  <th className="border-l-2 border-l-accent-red px-5 py-4 text-left font-display text-sm font-bold tracking-wide text-accent-red-light">
                    OllamaTR
                  </th>
                  <th className="px-5 py-4 text-left font-display text-sm font-bold tracking-wide text-text-muted">
                    Bulut AI (ChatGPT vb.)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {comparisonRows.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={`transition-colors duration-150 ${
                      i % 2 === 0 ? 'bg-bg-obsidian' : 'bg-bg-charcoal/50'
                    }`}
                  >
                    <td className="px-5 py-4 font-body text-sm font-medium text-text-primary">{row.feature}</td>
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
      {/* SECTION 6 — AYDINLATMA METNİ (Art. 10 formal disclosure)     */}
      {/* ============================================================ */}
      <section
        id="aydinlatma-metni"
        className="border-t border-border-subtle bg-bg-charcoal px-6 py-24 lg:px-10"
      >
        <div ref={aydinlatmaRef} className="mx-auto max-w-3xl">
          <div
            style={sectionStyle(aydinlatmaVisible)}
            className="mb-4 inline-flex items-center gap-2 rounded border border-border-subtle bg-bg-obsidian px-3 py-1.5"
          >
            <ScrollText className="h-3.5 w-3.5 text-accent-red-light" />
            <span className="font-mono text-[0.625rem] tracking-wide text-text-muted">
              6698 Sayılı KVKK Madde 10
            </span>
          </div>

          <h2
            style={sectionStyle(aydinlatmaVisible, 0.05)}
            className="font-display text-3xl font-bold leading-tight text-text-primary md:text-4xl"
          >
            Aydınlatma Metni
          </h2>

          <p
            style={sectionStyle(aydinlatmaVisible, 0.1)}
            className="mt-6 text-base leading-relaxed text-text-secondary"
          >
            6698 Sayılı Kişisel Verilerin Korunması Kanunu Madde 10 kapsamında, OllamaTR olarak veri işleme
            faaliyetlerimize ilişkin sizleri bilgilendirme yükümlülüğümüz vardır. Aşağıdaki açıklamalar, bu
            internet sitesi ve sunulan hizmetler bağlamında geçerlidir.
          </p>

          {/* Subsection (a) — Veri Sorumlusu (Bireysel Operatör) */}
          <div style={sectionStyle(aydinlatmaVisible, 0.15)} className="mt-10">
            <h3 className="font-display text-xl font-bold text-text-primary">a) Veri Sorumlusu</h3>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              OllamaTR şu anda bir tüzel kişiliğe (şirkete) sahip değildir. KVKK Madde 3/1-ı uyarınca veri
              sorumlusu, kişisel verilerin işleme amaçlarını ve vasıtalarını belirleyen, veri kayıt sisteminin
              kurulmasından ve yönetilmesinden sorumlu olan gerçek veya tüzel kişiyi ifade eder. Bu proje
              aşağıdaki gerçek kişinin sorumluluğu altında topluluk tarafından geliştirilmektedir:
            </p>
            <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-text-secondary">
              <li>
                Veri Sorumlusu: <code className="rounded bg-bg-obsidian px-1.5 py-0.5 font-mono text-xs text-warn-yellow">Bireysel Operatör — OllamaTR — eruo005-dev (açık kaynak topluluk projesi)</code>
              </li>
              <li>
                E-posta:{' '}
                <a
                  href="mailto:support@ollamatr.com"
                  className="text-accent-red-light underline hover:text-accent-red-light"
                >
                  support@ollamatr.com
                </a>
              </li>
              <li>Proje Türü: Topluluk projesi · Açık kaynak (MIT)</li>
              <li>
                GitHub:{' '}
                <a
                  href="https://github.com/eruo005-dev/ollamatr-app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-red-light underline hover:text-accent-red-light"
                >
                  github.com/eruo005-dev/ollamatr-app
                </a>
              </li>
            </ul>
          </div>

          {/* Subsection (b) — İşleme Amaçları */}
          <div style={sectionStyle(aydinlatmaVisible, 0.2)} className="mt-10">
            <h3 className="font-display text-xl font-bold text-text-primary">b) İşleme Amaçları</h3>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:
            </p>
            <ol className="mt-3 list-decimal space-y-2 pl-6 text-sm leading-relaxed text-text-secondary marker:text-text-muted">
              <li>Web sitemizin ziyaretçilerine hizmet sunulması ve site performansının iyileştirilmesi,</li>
              <li>Topluluk üyeleriyle e-posta üzerinden iletişim kurulması (bağışlar, sorular, geri bildirimler),</li>
              <li>GitHub Issues, Discord ve topluluk kanalları üzerinden katkı koordinasyonu,</li>
              <li>KVKK ve sair mevzuatın gerektirdiği yasal yükümlülüklerin yerine getirilmesi.</li>
            </ol>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              Şu anda satışı yapılan ücretli bir hizmet bulunmadığından; müşteri ilişkileri yönetimi, abonelik
              yönetimi veya ödeme işleme gibi amaçlar bu projede uygulanmamaktadır.
            </p>
          </div>

          {/* Subsection (c) — Aktarılan Taraflar */}
          <div style={sectionStyle(aydinlatmaVisible, 0.25)} className="mt-10">
            <h3 className="font-display text-xl font-bold text-text-primary">c) Aktarılan Taraflar</h3>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              Web sitemiz Vercel Inc. (ABD) barındırma altyapısında yayınlanmaktadır; bu nedenle ziyaretçi
              bağlantı verileri (IP, tarayıcı bilgileri) teknik olarak bu barındırma sağlayıcısı tarafından
              yurt dışında işlenir (KVKK Madde 9). Bunun dışında ziyaretçi verisi başka bir yurt dışı
              tedarikçiye aktarılmaz. Ayrıca aşağıdaki sınırlı durumlarda aktarım söz konusu olabilir:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6 text-sm leading-relaxed text-text-secondary marker:text-text-muted">
              <li>
                E-posta yazışmaları, topluluk operatörünün e-posta sağlayıcısı üzerinden gerçekleştirilir
                (operatör tarafından açıklanacaktır).
              </li>
              <li>
                Yasal yükümlülükler nedeniyle bilgi talep eden yetkili kurumlar (KVKK Kurulu, vergi otoriteleri,
                mahkemeler).
              </li>
            </ul>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              Not: Geçmiş sürümlerde web sitesinde Google Fonts CDN kullanılmıştı; mevcut sürümde tüm yazı
              tipleri kendi sunucumuzdan sunulmaktadır ve bu nedenle ziyaretçi verisinin Google LLC'ye
              aktarımı söz konusu değildir.
            </p>
          </div>

          {/* Subsection (d) — Yöntem ve Hukuki Sebep */}
          <div style={sectionStyle(aydinlatmaVisible, 0.3)} className="mt-10">
            <h3 className="font-display text-xl font-bold text-text-primary">d) Yöntem ve Hukuki Sebep</h3>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              Kişisel verileriniz; web sitemiz, e-posta yazışmaları ve sözleşmesel süreçler üzerinden elektronik
              ortamda toplanmaktadır. İşleme faaliyetlerinin hukuki sebepleri aşağıdaki gibidir:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6 text-sm leading-relaxed text-text-secondary marker:text-text-muted">
              <li>
                <strong>Web sitesi ziyaretleri:</strong> KVKK Madde 5/2-(f) — temel hak ve özgürlüklerinize zarar
                vermemek kaydıyla, veri sorumlusunun meşru menfaatleri.
              </li>
              <li>
                <strong>Topluluk üyeleri ile e-posta iletişimi:</strong> KVKK Madde 5/1 — e-posta gönderme
                aksiyonu ile verilmiş sayılan açık rıza.
              </li>
              <li>
                <strong>Yasal saklama yükümlülüğü (uygulanırsa):</strong> KVKK Madde 5/2-(ç) — veri sorumlusunun
                hukuki yükümlülüğünü yerine getirebilmesi.
              </li>
            </ul>
          </div>

          {/* Subsection (e) — Article 11 Rights */}
          <div style={sectionStyle(aydinlatmaVisible, 0.35)} className="mt-10">
            <h3 className="font-display text-xl font-bold text-text-primary">
              e) İlgili Kişi Hakları (Madde 11)
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              KVKK'nın 11. maddesi uyarınca veri sorumlusuna başvurarak aşağıdaki haklarınızı kullanabilirsiniz.
              Her ilgili kişi:
            </p>
            <ol className="mt-3 list-decimal space-y-2 pl-6 text-sm leading-relaxed text-text-secondary marker:text-accent-red-light">
              {article11Rights.map((right) => (
                <li key={right}>{right}</li>
              ))}
            </ol>
            <p className="mt-5 rounded-lg border border-border-subtle bg-bg-obsidian p-4 text-sm leading-relaxed text-text-secondary">
              Bu haklarınızı kullanmak için{' '}
              <a
                href="mailto:support@ollamatr.com"
                className="text-accent-red-light underline hover:text-accent-red-light"
              >
                support@ollamatr.com
              </a>{' '}
              adresine başvurabilirsiniz. Talepler en geç 30 gün içerisinde cevaplanacaktır (KVKK Madde 13).
            </p>
          </div>

          {/* VERBİS muafiyet */}
          <div style={sectionStyle(aydinlatmaVisible, 0.4)} className="mt-10">
            <h3 className="font-display text-xl font-bold text-text-primary">VERBİS Kaydı</h3>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              Veri Sorumluları Sicili (VERBİS) kaydı, KVKK Madde 16 kapsamında belirli eşikleri aşan veri
              sorumluları için zorunludur. OllamaTR şu anda bir gerçek kişi tarafından düşük hacimde işletilen
              bir topluluk projesidir ve "yıllık çalışan sayısı 50'den çok veya yıllık mali bilanço toplamı
              25 milyon TL'den çok olan gerçek ve tüzel kişi veri sorumluları" kategorisine girmemektedir. Bu
              nedenle 2017/61 sayılı Karar uyarınca VERBİS kaydı muafiyetinden yararlanılmaktadır. Proje
              ileride bu eşikleri aşan bir tüzel kişiliğe dönüşürse VERBİS kaydı gerçekleştirilecektir.
            </p>
          </div>

          {/* Brand promise carve-out */}
          <div style={sectionStyle(aydinlatmaVisible, 0.45)} className="mt-10">
            <h3 className="font-display text-xl font-bold text-text-primary">Marka Vaadi Kapsamı</h3>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              "Verileriniz cihazınızda kalır" şeklindeki taahhüdümüz, özel olarak OllamaTR{' '}
              <strong>masaüstü ürününe</strong> (Ollama + Open WebUI paketi) işaret etmektedir. Tüm AI işlemleri
              (prompt'lar, yanıtlar, model çalıştırma) kullanıcının cihazında yerel olarak gerçekleşir ve
              herhangi bir sunucuya iletilmez.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              Bu <strong>web sitesinin kendisi</strong> ve gelecekteki olası kurumsal/bulut hizmetleri; işbu
              Aydınlatma Metni ve{' '}
              <Link to="/cerez-politikasi" className="text-accent-red-light underline hover:text-accent-red-light">
                Çerez Politikası
              </Link>{' '}
              kapsamındadır. Şu anda satışı yapılan ücretli bir hizmet bulunmamaktadır.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 7 — CTA                                              */}
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
            KVKK ilkelerine uygun, yerel, ücretsiz AI deneyimini hemen başlatın.
          </p>
          <div
            style={{
              opacity: ctaVisible ? 1 : 0,
              transform: ctaVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
            }}
            className="mt-8 flex flex-wrap justify-center gap-4"
          >
            <a
              href="https://t.me/+sK_c-yKLc4E0Y2I0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded bg-accent-red-deep px-7 py-3.5 font-body text-sm font-semibold tracking-wide text-white transition-colors duration-200 hover:bg-[#A01528]"
            >
              Telegram'a Katıl
            </a>
            <a
              href="mailto:support@ollamatr.com"
              className="inline-flex items-center gap-2 rounded border border-border-subtle px-7 py-3.5 font-body text-sm font-semibold tracking-wide text-text-primary transition-all duration-200 hover:border-accent-red hover:text-accent-red-light"
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
            className="mb-4 inline-block font-body text-sm font-medium tracking-wide text-accent-red-light"
          >
            VERİ GİZLİLİĞİ
          </span>
          <h1
            style={heroStyle(0.1)}
            className="font-display text-4xl font-bold leading-tight text-text-primary md:text-5xl lg:text-6xl"
          >
            KVKK ve OllamaTR
          </h1>
          <p
            style={heroStyle(0.22)}
            className="mt-6 max-w-xl text-lg leading-relaxed text-text-secondary"
          >
            OllamaTR masaüstü ürününde tüm AI işlemleri yerel donanımınızda gerçekleşir. Bu sayfada hem ürün
            yaklaşımımızı hem de bu web sitesi için geçerli olan resmi Aydınlatma Metni'ni bulabilirsiniz
            (6698 sayılı KVKK Madde 10).
          </p>
          <div style={heroStyle(0.32)} className="mt-6 flex flex-wrap gap-3">
            <a
              href="#aydinlatma-metni"
              className="inline-flex items-center gap-2 rounded border border-border-subtle px-4 py-2 font-body text-xs font-medium tracking-wide text-text-primary transition-colors hover:border-accent-red hover:text-accent-red-light"
            >
              <ScrollText className="h-3.5 w-3.5" />
              Aydınlatma Metni'ne Atla
            </a>
            <Link
              to="/cerez-politikasi"
              className="inline-flex items-center gap-2 rounded border border-border-subtle px-4 py-2 font-body text-xs font-medium tracking-wide text-text-primary transition-colors hover:border-accent-red hover:text-accent-red-light"
            >
              Çerez Politikası
            </Link>
          </div>
        </div>
      </section>

      {/* Heavy below-fold sections — deferred mount + error-boundary isolated */}
      <ErrorBoundary>
        {heavyReady ? <KVKKHeavyContent sectionStyle={sectionStyle} /> : null}
      </ErrorBoundary>
    </div>
  )
}
