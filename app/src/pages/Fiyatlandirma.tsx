import { useState } from 'react'
import { Link } from 'react-router'
import { Check, X } from 'lucide-react'
import { motion } from 'framer-motion'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import { fadeUp, staggerContainer, staggerChild } from '@/lib/animations'
import ScrollReveal from '@/components/ScrollReveal'

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
  ctaLink?: string
  featured?: boolean
  borderColor?: string
}

const tiers: Tier[] = [
  {
    name: 'Ücretsiz',
    label: 'ÜCRETSİZ',
    price: '0₺',
    period: '/ay',
    description: 'Bireysel kullanıcılar ve hobiler için',
    features: [
      { text: '50+ model erişimi', included: true },
      { text: 'Yerel çalıştırma', included: true },
      { text: 'Temel WebUI', included: true },
      { text: 'Türkçe dokümantasyon', included: true },
      { text: 'Öncelikli destek', included: false },
      { text: 'Kurumsal özellikler', included: false },
      { text: 'Özel model entegrasyonu', included: false },
    ],
    cta: 'Ücretsiz Başla',
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
      { text: "Ücretsiz'deki her şey", included: true },
      { text: 'Gelişmiş WebUI + temalar', included: true },
      { text: 'Otomatik model güncellemeleri', included: true },
      { text: 'API rate limit: 10.000/gün', included: true },
      { text: 'Çoklu kullanıcı yönetimi', included: true },
      { text: 'Öncelikli teknik destek', included: true },
      { text: 'Model performans analitiği', included: true },
      { text: 'Türkçe destek (e-posta)', included: true },
      { text: 'Kurumsal SLA', included: false },
      { text: 'Özel model entegrasyonu', included: false },
    ],
    cta: "Pro'ya Geç",
    ctaStyle: 'primary',
  },
  {
    name: 'KOBİ Paketi',
    label: 'KOBİ / KURUMSAL',
    price: '25.000₺ — 60.000₺',
    period: 'tek seferlik kurulum',
    description: 'Kurumsal ve KOBİ çözümleri',
    borderColor: 'border-[#FFB800]',
    features: [
      { text: 'Tüm 100+ model erişimi', included: true },
      { text: 'Yerel çalıştırma', included: true },
      { text: 'Özelleştirilmiş WebUI', included: true },
      { text: 'Özel eğitim & workshop', included: true },
      { text: '7/24 telefon desteği', included: true },
      { text: 'KVKK danışmanlığı', included: true },
      { text: "Özel model fine-tune'u", included: true },
      { text: 'Anahtar teslim kurulum', included: true },
      { text: 'SLA garantisi (%99.9)', included: true },
      { text: 'Yıllık bakım sözleşmesi', included: true },
    ],
    cta: 'Teklif Al',
    ctaStyle: 'ghost',
  },
]

/* ------------------------------------------------------------------ */
/*  Comparison table data                                               */
/* ------------------------------------------------------------------ */

interface ComparisonRow {
  name: string
  ucretsiz: string
  pro: string
  kobi: string
}

const comparisonFeatures: ComparisonRow[] = [
  { name: 'Türkçe Model Erişimi', ucretsiz: '50+', pro: '100+', kobi: 'Tümü' },
  { name: 'Yerel Çalıştırma', ucretsiz: '✓', pro: '✓', kobi: '✓' },
  { name: 'WebUI Arayüzü', ucretsiz: 'Temel', pro: 'Gelişmiş', kobi: 'Özelleştirilmiş' },
  { name: 'API Rate Limit', ucretsiz: '—', pro: '10.000/gün', kobi: 'Sınırsız' },
  { name: 'Kullanıcı Yönetimi', ucretsiz: '✗', pro: '✓', kobi: '✓' },
  { name: 'Öncelikli Destek', ucretsiz: '✗', pro: '✓', kobi: '✓ 7/24' },
  { name: 'Otomatik Güncelleme', ucretsiz: '✗', pro: '✓', kobi: '✓' },
  { name: 'KVKK Danışmanlığı', ucretsiz: '✗', pro: '✗', kobi: '✓' },
  { name: 'Özel Model Fine-tune', ucretsiz: '✗', pro: '✗', kobi: '✓' },
  { name: 'SLA Garantisi', ucretsiz: '✗', pro: '✗', kobi: '%99.9' },
]

/* ------------------------------------------------------------------ */
/*  FAQ data                                                            */
/* ------------------------------------------------------------------ */

const faqItems = [
  {
    question: 'Pro aboneliğimi nasıl iptal ederim?',
    answer:
      'Hesabınızdan tek tıkla iptal. İptal sonrası mevcut dönem sonuna kadar Pro özellikleri açık kalır.',
  },
  {
    question: 'KOBİ paketi fiyatı nasıl belirleniyor?',
    answer:
      'Çalışan sayısı, model sayısı ve özel entegrasyon ihtiyaçlarına göre. 25.000₺ — 60.000₺ arası özel teklif sunuyoruz.',
  },
  {
    question: 'Ücretsiz sürümün sınırı var mı?',
    answer:
      'Hayır, 50+ Türkçe modele tam erişim. Sadece bazı kurumsal özellikler kapalı.',
  },
  {
    question: 'Öğrenci indirimi var mı?',
    answer:
      'Evet, .edu.tr uzantılı e-posta ile Pro %50 indirimli — 75₺/ay.',
  },
  {
    question: 'Kurumsal faturalandırma destekliyor musunuz?',
    answer:
      'Evet, e-fatura ve dönemsel faturalandırma. Kurumsal müşterilerimize özel finans ekibimiz hizmet veriyor.',
  },
]

/* ------------------------------------------------------------------ */
/*  Testimonials data                                                   */
/* ------------------------------------------------------------------ */

const testimonials = [
  {
    quote:
      'OllamaTR sayesinde KVKK denetiminden tek seferde geçtik. Tüm hassas veriler şirket içinde kaldı.',
    author: 'Selin A.',
    role: 'CTO, TeknoStart',
  },
  {
    quote:
      "100 çalışanlı şirketimizde 6 ayda kuruldu. Eğitim ve workshop'lar gerçekten profesyoneldi.",
    author: 'Burak T.',
    role: 'IT Direktörü, Lojistik A.Ş.',
  },
  {
    quote:
      'Bitirme projemde Türkçe LLM ile çalıştım. Ücretsiz sürüm bile inanılmaz.',
    author: 'Zeynep K.',
    role: 'ODTÜ öğrencisi',
  },
]

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
            Bireysel geliştiriciler için ücretsiz. Pro özellikler için aylık
            abonelik. Kurumsal ihtiyaçlar için özel çözümler.
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
                  : tier.name === 'KOBİ Paketi'
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
                  <button
                    type="button"
                    className="w-full rounded bg-accent-red py-3.5 font-body text-sm font-semibold uppercase tracking-wider text-white transition-all duration-200 hover:bg-accent-red-light hover:scale-[1.02]"
                  >
                    {tier.cta}
                  </button>
                ) : tier.ctaLink ? (
                  <Link
                    to={tier.ctaLink}
                    className="flex w-full items-center justify-center rounded border border-border-subtle bg-transparent py-3.5 font-body text-sm font-semibold uppercase tracking-wider text-text-primary transition-all duration-200 hover:border-accent-red hover:text-accent-red-light"
                  >
                    {tier.cta}
                  </Link>
                ) : (
                  <button
                    type="button"
                    className="flex w-full items-center justify-center rounded border border-border-subtle bg-transparent py-3.5 font-body text-sm font-semibold uppercase tracking-wider text-text-primary transition-all duration-200 hover:border-accent-red hover:text-accent-red-light"
                  >
                    {tier.cta}
                  </button>
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
                          : 'text-text-muted line-through opacity-60'
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
                    Ücretsiz
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
                      {row.ucretsiz}
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
            className="grid grid-cols-1 gap-6 md:grid-cols-3"
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
            <button
              type="button"
              className="inline-flex items-center justify-center rounded border border-border-subtle bg-transparent px-8 py-3.5 font-body text-sm font-semibold uppercase tracking-wider text-text-primary transition-all duration-200 hover:border-accent-red hover:text-accent-red-light"
            >
              KOBİ Teklifi Al
            </button>
          </div>
        </ScrollReveal>
      </section>
    </div>
  )
}
