import { useRef, useState } from 'react'
import { Link } from 'react-router'
import { Check, X } from 'lucide-react'
import { motion, useInView } from 'framer-motion'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'

/* ------------------------------------------------------------------ */
/*  Animation helpers                                                  */
/* ------------------------------------------------------------------ */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}

const staggerChild = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
}

/* ------------------------------------------------------------------ */
/*  Pricing tiers data                                                  */
/* ------------------------------------------------------------------ */

interface Feature {
  text: string
  included: boolean
}

interface Tier {
  name: string
  label: string
  price: string
  period: string
  description: string
  features: Feature[]
  cta: string
  ctaStyle: 'primary' | 'ghost'
  ctaLink: string
  featured?: boolean
  borderColor?: string
}

const tiers: Tier[] = [
  {
    name: 'Başlangıç',
    label: 'ÜCRETSİZ',
    price: 'Ücretsiz',
    period: '',
    description: 'Bireysel kullanıcılar ve hobiler için',
    features: [
      { text: 'OllamaTR uygulaması', included: true },
      { text: '50+ temel model erişimi', included: true },
      { text: 'Türkçe arayüz', included: true },
      { text: 'Topluluk desteği', included: true },
      { text: 'KVKK temel modülü', included: true },
    ],
    cta: 'Hemen İndir',
    ctaStyle: 'ghost',
    ctaLink: '/indir',
  },
  {
    name: 'Pro',
    label: 'PRO',
    price: '149₺',
    period: '/ay',
    description: 'Profesyonel geliştiriciler için',
    featured: true,
    borderColor: 'border-accent-red',
    features: [
      { text: 'Başlangıç\'taki her şey', included: true },
      { text: 'Özel model öneri motoru', included: true },
      { text: 'Gelişmiş KVKK raporlama', included: true },
      { text: 'Öncelikli teknik destek', included: true },
      { text: 'API erişimi (10.000 istek/ay)', included: true },
      { text: 'Model performans analitiği', included: true },
      { text: 'Çoklu cihaz yönetimi', included: true },
    ],
    cta: "Pro'ya Yükselt",
    ctaStyle: 'primary',
    ctaLink: '#',
  },
  {
    name: 'KOBİ',
    label: 'KOBİ / KURUMSAL',
    price: '25.000₺ - 60.000₺',
    period: 'başlangıç',
    description: 'Kurumsal ve KOBİ çözümleri',
    borderColor: 'border-[#FFB800]',
    features: [
      { text: 'Pro\'daki her şey', included: true },
      { text: 'Yerinde kurulum (on-premise)', included: true },
      { text: 'Özel model eğitimi', included: true },
      { text: '7/24 telefon desteği', included: true },
      { text: 'KVKK tam danışmanlık', included: true },
      { text: 'API erişimi (sınırsız)', included: true },
      { text: 'Özel entegrasyon desteği', included: true },
      { text: 'Eğitim ve workshop', included: true },
    ],
    cta: 'Bizimle İletişime Geç',
    ctaStyle: 'ghost',
    ctaLink: '#',
  },
]

/* ------------------------------------------------------------------ */
/*  Comparison table data                                               */
/* ------------------------------------------------------------------ */

const comparisonFeatures = [
  { name: 'Model Kataloğu', baslangic: '50+', pro: '50+', kobi: '50+ + Özel' },
  { name: 'KVKK Modülü', baslangic: 'Temel', pro: 'Gelişmiş', kobi: 'Tam + Danışmanlık' },
  { name: 'API Erişimi', baslangic: '—', pro: '10K/ay', kobi: 'Sınırsız' },
  { name: 'Teknik Destek', baslangic: 'Topluluk', pro: 'Öncelikli', kobi: '7/24 Telefon' },
  { name: 'Model Eğitimi', baslangic: '—', pro: '—', kobi: 'Var' },
  { name: 'Yerinde Kurulum', baslangic: '—', pro: '—', kobi: 'Var' },
  { name: 'Fiyat', baslangic: 'Ücretsiz', pro: '149₺/ay', kobi: '25-60K₺' },
]

/* ------------------------------------------------------------------ */
/*  FAQ data                                                            */
/* ------------------------------------------------------------------ */

const faqItems = [
  {
    question: 'Pro planı deneyebilir miyim?',
    answer: 'Evet, 14 gün ücretsiz deneme süresi mevcut.',
  },
  {
    question: 'KOBİ paketi fiyatı nasıl belirleniyor?',
    answer: 'Kullanıcı sayısı, model ihtiyacı ve destek seviyesine göre özelleştirilir.',
  },
  {
    question: 'İstediğim zaman iptal edebilir miyim?',
    answer: 'Kesinlikle. Aylık aboneliğinizi dilediğiniz zaman iptal edebilirsiniz.',
  },
  {
    question: 'Öğrenci indirimi var mı?',
    answer: 'Evet, .edu.tr uzantılı e-posta ile %50 indirim!',
  },
  {
    question: 'Kurumsal faturalandırma mümkün mü?',
    answer: 'Evet, KOBİ paketlerinde standart kurumsal fatura kesilir.',
  },
]

/* ------------------------------------------------------------------ */
/*  Testimonials data                                                   */
/* ------------------------------------------------------------------ */

const testimonials = [
  {
    quote: 'OllamaTR Pro ile şirketimizdeki tüm AI altyapısını 1 günde kurduk.',
    author: 'Ahmet Y.',
    role: 'CTO @TechKobi',
  },
  {
    quote: "KVKK raporlama özelliği zamanımızın %80'ini kurtardı.",
    author: 'Selin K.',
    role: 'IT Yöneticisi',
  },
]

/* ------------------------------------------------------------------ */
/*  Scroll-reveal wrapper                                               */
/* ------------------------------------------------------------------ */

function ScrollReveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      }}
    >
      {children}
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main component                                                      */
/* ------------------------------------------------------------------ */

export default function Fiyatlandirma() {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null)

  return (
    <div className="bg-bg-obsidian">
      {/* ========== HERO ========== */}
      <section className="px-6 pb-16 pt-40 lg:px-10 lg:pb-24 lg:pt-44">
        <div className="mx-auto max-w-4xl text-center">
          <motion.p
            className="mb-4 font-body text-sm font-medium uppercase tracking-wider text-accent-red"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            FİYATLANDIRMA
          </motion.p>
          <motion.h1
            className="font-display text-4xl font-bold leading-tight tracking-tight text-text-primary lg:text-5xl"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            Şeffaf, Adil, Yerel
          </motion.h1>
          <motion.p
            className="mx-auto mt-6 max-w-2xl font-body text-lg leading-relaxed text-text-secondary"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            Bireysel geliştiriciden kurumsal KOBİ'ye, herkes için uygun plan.
          </motion.p>
        </div>
      </section>

      {/* ========== PRICING TIERS ========== */}
      <section className="bg-bg-charcoal px-6 py-24 lg:px-10 lg:py-32">
        <motion.div
          className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {tiers.map((tier) => (
            <motion.div
              key={tier.name}
              variants={staggerChild}
              className={`relative flex flex-col rounded-lg border p-8 transition-all duration-300 ${
                tier.featured
                  ? 'border-accent-red shadow-[0_0_30px_rgba(217,30,54,0.12)] md:scale-[1.02]'
                  : tier.name === 'KOBİ'
                    ? 'border-[#FFB800]/40'
                    : 'border-border-subtle'
              } bg-bg-charcoal`}
            >
              {/* Featured badge */}
              {tier.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded bg-accent-red px-3 py-1 font-body text-xs font-semibold uppercase tracking-wider text-white">
                  EN POPÜLER
                </span>
              )}

              {/* Tier label */}
              <p
                className={`mb-3 font-body text-xs font-medium uppercase tracking-wider ${
                  tier.featured ? 'text-accent-red' : 'text-text-muted'
                }`}
              >
                {tier.label}
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-1">
                <span
                  className={`font-display text-4xl font-bold ${
                    tier.featured ? 'text-accent-red' : 'text-text-primary'
                  }`}
                >
                  {tier.price}
                </span>
                {tier.period && (
                  <span className="font-body text-sm text-text-secondary">
                    {tier.period}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="mt-2 font-body text-sm text-text-secondary">
                {tier.description}
              </p>

              {/* CTA */}
              <div className="mt-6">
                {tier.ctaStyle === 'primary' ? (
                  <button className="w-full rounded bg-accent-red py-3.5 font-body text-sm font-semibold uppercase tracking-wider text-white transition-all duration-200 hover:bg-accent-red-light hover:scale-[1.02]">
                    {tier.cta}
                  </button>
                ) : (
                  <Link
                    to={tier.ctaLink}
                    className="flex w-full items-center justify-center rounded border border-border-subtle bg-transparent py-3.5 font-body text-sm font-semibold uppercase tracking-wider text-text-primary transition-all duration-200 hover:border-accent-red hover:text-accent-red-light"
                  >
                    {tier.cta}
                  </Link>
                )}
              </div>

              {/* Features */}
              <ul className="mt-8 flex flex-col gap-3">
                {tier.features.map((feature, fIdx) => (
                  <li
                    key={fIdx}
                    className="flex items-start gap-3 font-body text-sm"
                  >
                    {feature.included ? (
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-safe-green" />
                    ) : (
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-text-muted" />
                    )}
                    <span
                      className={
                        feature.included
                          ? 'text-text-primary'
                          : 'text-text-muted'
                      }
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ========== FEATURE COMPARISON TABLE ========== */}
      <section className="px-6 py-24 lg:px-10 lg:py-32">
        <ScrollReveal>
          <h2 className="mb-10 text-center font-display text-2xl font-bold uppercase tracking-wide text-text-primary">
            ÖZELLİK KARŞILAŞTIRMASI
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="mx-auto max-w-4xl overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse">
              <thead>
                <tr className="border-b border-border-subtle">
                  <th className="sticky top-0 bg-bg-obsidian py-4 pr-6 text-left font-body text-sm font-medium text-text-secondary">
                    Özellik
                  </th>
                  <th className="sticky top-0 bg-bg-obsidian px-4 py-4 text-center font-body text-sm font-medium text-text-secondary">
                    Başlangıç
                  </th>
                  <th className="sticky top-0 bg-bg-obsidian px-4 py-4 text-center font-body text-sm font-semibold text-accent-red">
                    Pro
                  </th>
                  <th className="sticky top-0 bg-bg-obsidian px-4 py-4 text-center font-body text-sm font-medium text-text-secondary">
                    KOBİ
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((row, idx) => (
                  <tr
                    key={idx}
                    className={`border-b border-border-subtle transition-colors duration-200 ${
                      hoveredRow === idx
                        ? 'bg-[rgba(244,244,245,0.04)]'
                        : idx % 2 === 0
                          ? 'bg-transparent'
                          : 'bg-[rgba(244,244,245,0.02)]'
                    }`}
                    onMouseEnter={() => setHoveredRow(idx)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <td className="py-4 pr-6 font-body text-sm font-medium text-text-primary">
                      {row.name}
                    </td>
                    <td className="px-4 py-4 text-center font-body text-sm text-text-secondary">
                      {row.baslangic}
                    </td>
                    <td className="border-l border-r border-accent-red/10 bg-accent-red/[0.03] px-4 py-4 text-center font-body text-sm font-medium text-text-primary">
                      {row.pro}
                    </td>
                    <td className="px-4 py-4 text-center font-body text-sm text-text-secondary">
                      {row.kobi}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>
      </section>

      {/* ========== FAQ ACCORDION ========== */}
      <section className="bg-bg-charcoal px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-3xl">
          <ScrollReveal>
            <h2 className="mb-10 text-center font-display text-2xl font-bold uppercase tracking-wide text-text-primary">
              SIK SORULAN SORULAR
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, idx) => (
                <AccordionItem
                  key={idx}
                  value={`item-${idx}`}
                  className="border-b border-border-subtle"
                >
                  <AccordionTrigger className="py-5 font-body text-base font-medium text-text-primary hover:no-underline [&>svg]:text-text-secondary">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 font-body text-sm leading-relaxed text-text-secondary">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollReveal>
        </div>
      </section>

      {/* ========== TESTIMONIALS ========== */}
      <section className="px-6 py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal>
            <h2 className="mb-10 text-center font-display text-xl font-bold uppercase tracking-wide text-text-primary">
              MÜŞTERİ YORUMLARI
            </h2>
          </ScrollReveal>

          <motion.div
            className="grid grid-cols-1 gap-6 md:grid-cols-2"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {testimonials.map((t, idx) => (
              <motion.div
                key={idx}
                variants={staggerChild}
                className="rounded-lg border border-border-subtle bg-bg-charcoal p-8 transition-all duration-300 hover:border-accent-red/30"
              >
                <p className="font-body text-base leading-relaxed text-text-primary">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-bg-surface font-display text-sm font-bold text-accent-red">
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-body text-sm font-semibold text-text-primary">
                      {t.author}
                    </p>
                    <p className="font-body text-xs text-text-secondary">
                      {t.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== BOTTOM CTA ========== */}
      <section className="bg-bg-charcoal px-6 py-24 lg:px-10 lg:py-32">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-text-primary lg:text-4xl">
            Hemen Başla
          </h2>
          <p className="mt-4 font-body text-lg text-text-secondary">
            Ücretsiz başlayın, ihtiyacınız arttıkça yükseltin. Kredi kartı
            gerektirmez.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/indir"
              className="inline-flex items-center justify-center rounded bg-accent-red px-8 py-3.5 font-body text-sm font-semibold uppercase tracking-wider text-white transition-all duration-200 hover:bg-accent-red-light hover:scale-[1.02]"
            >
              İndir
            </Link>
            <Link
              to="#"
              className="inline-flex items-center justify-center rounded border border-border-subtle bg-transparent px-8 py-3.5 font-body text-sm font-semibold uppercase tracking-wider text-text-primary transition-all duration-200 hover:border-accent-red hover:text-accent-red-light"
            >
              KOBİ Teklifi Al
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </div>
  )
}
