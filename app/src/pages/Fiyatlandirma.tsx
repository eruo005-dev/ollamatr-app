import { Link } from 'react-router'
import { Check, X, Clock, Info, Heart, ExternalLink } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
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

type FeatureStatus = 'included' | 'excluded' | 'coming-soon'

interface Feature {
  text: string
  status: FeatureStatus
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
  ctaHref?: string
  secondaryCta?: { label: string; href: string }
  featured?: boolean
  borderColor?: string
  comingSoon?: boolean
}

const tiers: Tier[] = [
  {
    name: 'Topluluk',
    label: 'TOPLULUK',
    price: 'Ücretsiz',
    period: 'açık kaynak',
    description: 'Bireysel kullanıcılar, hobiler, geliştiriciler',
    features: [
      { text: 'Özenle seçilmiş Türkçe modellere erişim', status: 'included' },
      { text: 'Yerel çalıştırma — verileriniz cihazınızda', status: 'included' },
      { text: 'Topluluk WebUI', status: 'included' },
      { text: 'Türkçe dokümantasyon', status: 'included' },
      { text: 'GitHub Issues üzerinden destek', status: 'included' },
      { text: 'MIT lisansı altında kaynak kod', status: 'included' },
    ],
    cta: 'GitHub\'da İncele',
    ctaStyle: 'ghost',
    ctaHref: 'https://github.com/eruo005-dev/ollamatr-app',
  },
  {
    name: 'Bağış',
    label: 'BAĞIŞ',
    price: 'Sen Belirle',
    period: 'tek seferlik / aylık',
    description: 'Projeyi sürdürmemize katkıda bulun',
    featured: true,
    borderColor: 'border-accent-red',
    features: [
      { text: 'Topluluk Edisyonundaki her şey', status: 'included' },
      { text: 'Açık geliştirme yol haritasını destekle', status: 'included' },
      { text: 'GitHub deposunda yıldız ver, katkı yap, issue aç', status: 'included' },
      { text: 'İsteğe bağlı: adın TEŞEKKÜRLER listesine eklenir', status: 'included' },
      { text: 'GitHub Sponsors / Patreon: yakında', status: 'coming-soon' },
    ],
    cta: "GitHub'da Destekle",
    ctaStyle: 'primary',
    ctaHref: 'https://github.com/eruo005-dev/ollamatr-app',
    secondaryCta: { label: "Telegram'a Katıl", href: 'https://t.me/+sK_c-yKLc4E0Y2I0' },
  },
  {
    name: 'Kurumsal',
    label: 'KURUMSAL · YAKINDA',
    price: 'Yakında',
    period: 'şirketleşme süreci',
    description: 'KOBİ ve kurumsal çözümler için planlanan paket',
    borderColor: 'border-[#FFB800]',
    comingSoon: true,
    features: [
      { text: 'Anahtar teslim KOBİ kurulumu', status: 'coming-soon' },
      { text: 'Özel model ince ayarı', status: 'coming-soon' },
      { text: '7/24 telefon desteği', status: 'coming-soon' },
      { text: 'SLA garantisi', status: 'coming-soon' },
      { text: 'KVKK danışmanlığı', status: 'coming-soon' },
    ],
    cta: 'Haberdar Et',
    ctaStyle: 'ghost',
    ctaHref: 'mailto:iletisim@ollamatr.com?subject=Kurumsal%20%C4%B0lgi',
  },
]

/* ------------------------------------------------------------------ */
/*  Comparison table data                                               */
/* ------------------------------------------------------------------ */

interface ComparisonRow {
  name: string
  topluluk: string
  bagis: string
  kurumsal: string
}

const comparisonFeatures: ComparisonRow[] = [
  { name: 'Özenle seçilmiş Türkçe modeller', topluluk: '✓', bagis: '✓', kurumsal: '✓' },
  { name: 'Yerel çalıştırma', topluluk: '✓', bagis: '✓', kurumsal: '✓' },
  { name: 'Topluluk desteği (Telegram / GitHub)', topluluk: '✓', bagis: '✓', kurumsal: '✓' },
  { name: 'Anahtar teslim kurulum', topluluk: '–', bagis: '–', kurumsal: 'Yakında' },
  { name: 'KVKK danışmanlığı', topluluk: '–', bagis: '–', kurumsal: 'Yakında' },
  { name: 'SLA garantisi', topluluk: '–', bagis: '–', kurumsal: 'Yakında' },
]

/* ------------------------------------------------------------------ */
/*  FAQ data                                                            */
/* ------------------------------------------------------------------ */

const faqItems = [
  {
    question: "OllamaTR'yi şirketim için ticari olarak kullanabilir miyim?",
    answer:
      'Topluluk Edisyonu MIT lisansı altında ticari kullanıma açıktır. Ancak şu anda biz herhangi bir ticari hizmet satmıyoruz; OllamaTR henüz bir tüzel kişiliğe (şirket) sahip değildir. Yardım almak için topluluk Telegram ve GitHub kanallarına katılabilirsiniz.',
  },
  {
    question: 'Bağış yapanlar özel destek alır mı?',
    answer:
      'Hayır. Bağış tamamen gönüllüdür ve hiçbir ek hizmet sağlamaz. Tüm kullanıcılar aynı topluluk desteğine erişir. Bağış, projenin sürdürülebilirliğine katkıda bulunur.',
  },
  {
    question: 'OllamaTR ne zaman ticari sürüm çıkarır?',
    answer:
      'Yeterli talep ve şirketleşme süreci tamamlandığında. Henüz somut bir tarih yok. Haberdar olmak için iletisim@ollamatr.com adresine e-posta atabilirsiniz.',
  },
  {
    question: 'Modelleri ticari ürünümde kullanabilir miyim?',
    answer:
      'Modelin lisansına bağlıdır. Modeller sayfasındaki her modelin lisansı belirtilmiştir. Örneğin Command-R-Turkish-35B gibi CC-BY-NC lisanslı modeller ticari kullanım için uygun değildir; Llama, Gemma, Mistral, Qwen ve Phi-3 türevleri ise atıf koşullarıyla ticari kullanıma açıktır.',
  },
  {
    question: 'Veri gizliliği nasıl sağlanıyor?',
    answer:
      'OllamaTR tamamen yerel çalışır. Hiçbir veri sunucularımıza gönderilmez (zaten paylaşılan bir sunucumuz yoktur). Detaylar için /kvkk sayfasını ve /cerez-politikasi sayfasını inceleyebilirsiniz.',
  },
]

/* ------------------------------------------------------------------ */
/*  Main component                                                      */
/* ------------------------------------------------------------------ */

export default function Fiyatlandirma() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="bg-bg-obsidian">
      {/* ========== HERO ========== */}
      <section className="px-6 pb-16 pt-40 lg:px-10 lg:pb-24 lg:pt-44">
        <div className="mx-auto max-w-4xl text-center">
          <motion.p
            className="mb-4 font-body text-sm font-medium uppercase tracking-wider text-accent-red-light"
            variants={fadeUp}
            initial={prefersReducedMotion ? false : 'hidden'}
            animate="visible"
            custom={0}
          >
            Destek · Bağış
          </motion.p>
          <motion.h1
            className="font-display text-4xl font-bold leading-tight tracking-tight text-text-primary lg:text-5xl"
            variants={fadeUp}
            initial={prefersReducedMotion ? false : 'hidden'}
            animate="visible"
            custom={1}
          >
            Topluluk Edisyonu
          </motion.h1>
          <motion.p
            className="mx-auto mt-6 max-w-2xl font-body text-lg leading-relaxed text-text-secondary"
            variants={fadeUp}
            initial={prefersReducedMotion ? false : 'hidden'}
            animate="visible"
            custom={2}
          >
            OllamaTR şu anda bir topluluk projesidir. Tüm özellikler ücretsiz ve
            açık kaynaklıdır. Ticari hizmetler için şirketleşme sürecindeyiz.
          </motion.p>
        </div>
      </section>

      {/* ========== TOPLULUK BANNER ========== */}
      <section className="px-6 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <div
            role="status"
            aria-label="Topluluk Projesi bilgisi"
            className="rounded-lg border border-accent-red/30 bg-accent-red/10 p-4 md:p-5"
          >
            <div className="flex items-start gap-3">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-accent-red-light" />
              <p className="font-mono text-xs leading-relaxed text-text-secondary md:text-sm">
                <span className="font-semibold uppercase tracking-wider text-accent-red-light">
                  Topluluk Projesi
                </span>{' '}
                — OllamaTR şu anda topluluk tarafından geliştirilen, kâr amacı
                gütmeyen bir açık kaynak girişimidir. Hiçbir kurum tarafından
                desteklenmemekte ve resmi bir tüzel kişiliği bulunmamaktadır.
                Ticari abonelik veya KOBİ paketleri şu anda{' '}
                <strong className="text-text-primary">satışta değildir</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== PRICING TIERS ========== */}
      <section className="bg-bg-charcoal px-6 py-24 lg:px-10 lg:py-32">
        <motion.div
          className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3"
          variants={staggerContainer}
          initial={prefersReducedMotion ? false : 'hidden'}
          whileInView={prefersReducedMotion ? undefined : 'visible'}
          viewport={{ once: true, margin: '-100px' }}
        >
          {tiers.map((tier) => (
            <motion.div
              key={tier.name}
              variants={staggerChild}
              className={`relative flex flex-col rounded-lg border p-8 transition-all duration-300 ${
                tier.featured
                  ? 'border-accent-red md:scale-[1.02]'
                  : tier.comingSoon
                    ? 'border-[#FFB800]/40'
                    : 'border-border-subtle'
              } bg-bg-charcoal`}
            >
              {/* Featured badge */}
              {tier.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded bg-accent-red-deep px-3 py-1 font-body text-xs font-semibold uppercase tracking-wider text-white">
                  DESTEKLE
                </span>
              )}

              {/* Tier label */}
              <p
                className={`mb-3 font-body text-xs font-medium uppercase tracking-wider ${
                  tier.featured ? 'text-accent-red-light' : 'text-text-muted'
                }`}
              >
                {tier.label}
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-1">
                <span
                  className={`font-display text-4xl font-bold ${
                    tier.featured ? 'text-accent-red-light' : 'text-text-primary'
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
              <div className="mt-6 flex flex-col gap-2">
                {tier.ctaStyle === 'primary' && tier.ctaHref ? (
                  <a
                    href={tier.ctaHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded bg-accent-red-deep py-3.5 font-body text-sm font-semibold uppercase tracking-wider text-white transition-all duration-200 hover:bg-[#A01528] hover:scale-[1.02]"
                  >
                    <Heart className="h-4 w-4" />
                    {tier.cta}
                    <ExternalLink className="h-3 w-3 opacity-70" />
                  </a>
                ) : tier.ctaLink ? (
                  <Link
                    to={tier.ctaLink}
                    className="flex w-full items-center justify-center rounded border border-border-subtle bg-transparent py-3.5 font-body text-sm font-semibold uppercase tracking-wider text-text-primary transition-all duration-200 hover:border-accent-red hover:text-accent-red-light"
                  >
                    {tier.cta}
                  </Link>
                ) : tier.ctaHref ? (
                  <a
                    href={tier.ctaHref}
                    target={tier.ctaHref.startsWith('mailto:') ? undefined : '_blank'}
                    rel={tier.ctaHref.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                    className="flex w-full items-center justify-center rounded border border-border-subtle bg-transparent py-3.5 font-body text-sm font-semibold uppercase tracking-wider text-text-primary transition-all duration-200 hover:border-accent-red hover:text-accent-red-light"
                  >
                    {tier.cta}
                  </a>
                ) : (
                  <button
                    type="button"
                    className="flex w-full items-center justify-center rounded border border-border-subtle bg-transparent py-3.5 font-body text-sm font-semibold uppercase tracking-wider text-text-primary transition-all duration-200 hover:border-accent-red hover:text-accent-red-light"
                  >
                    {tier.cta}
                  </button>
                )}
                {tier.secondaryCta && (
                  <a
                    href={tier.secondaryCta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded border border-border-subtle bg-transparent py-2.5 font-body text-xs font-semibold uppercase tracking-wider text-text-secondary transition-all duration-200 hover:border-accent-red hover:text-accent-red-light"
                  >
                    {tier.secondaryCta.label}
                    <ExternalLink className="h-3 w-3 opacity-70" />
                  </a>
                )}
              </div>

              {/* Kurumsal tier: yakında note */}
              {tier.comingSoon && (
                <p className="mt-3 font-body text-xs leading-relaxed text-text-muted">
                  Şirketleşme sürecimiz tamamlandığında bu paket aktif olacak.
                  İlgilenirseniz e-posta ile haberdar edilmek istediğinizi
                  belirtmeniz yeterli.
                </p>
              )}

              {/* Features */}
              <ul className="mt-8 flex flex-col gap-3">
                {tier.features.map((feature, fIdx) => (
                  <li
                    key={fIdx}
                    className="flex items-start gap-3 font-body text-sm"
                  >
                    {feature.status === 'included' ? (
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-safe-green" />
                    ) : feature.status === 'coming-soon' ? (
                      <Clock className="mt-0.5 h-4 w-4 shrink-0 text-warn-yellow" />
                    ) : (
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-text-muted" />
                    )}
                    <span
                      className={
                        feature.status === 'included'
                          ? 'text-text-primary'
                          : feature.status === 'coming-soon'
                            ? 'text-text-secondary'
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
          <h2 className="mb-10 text-center font-display text-2xl font-bold tracking-tight text-text-primary">
            Özellik karşılaştırması
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
                    Topluluk
                  </th>
                  <th className="sticky top-0 bg-bg-obsidian px-4 py-4 text-center font-body text-sm font-semibold text-accent-red-light">
                    Bağış
                  </th>
                  <th className="sticky top-0 bg-bg-obsidian px-4 py-4 text-center font-body text-sm font-medium text-text-secondary">
                    Kurumsal (Yakında)
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((row, idx) => (
                  <tr
                    key={idx}
                    className={`border-b border-border-subtle transition-colors duration-200 hover:bg-[rgba(244,244,245,0.04)] focus-within:bg-[rgba(244,244,245,0.04)] ${
                      idx % 2 === 0
                        ? 'bg-transparent'
                        : 'bg-[rgba(244,244,245,0.02)]'
                    }`}
                  >
                    <td className="py-4 pr-6 font-body text-sm font-medium text-text-primary">
                      {row.name}
                    </td>
                    <td className="px-4 py-4 text-center font-body text-sm text-text-secondary">
                      {row.topluluk}
                    </td>
                    <td className="border-l border-r border-accent-red/10 bg-accent-red/[0.03] px-4 py-4 text-center font-body text-sm font-medium text-text-primary">
                      {row.bagis}
                    </td>
                    <td className="px-4 py-4 text-center font-body text-sm text-text-secondary">
                      {row.kurumsal}
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
            <h2 className="mb-10 text-center font-display text-2xl font-bold tracking-tight text-text-primary">
              Sık sorulan sorular
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

      {/* ========== COMMUNITY REVIEWS — honest empty state ==========
       * The fabricated testimonials ("Selin A.", "Burak T.", "Zeynep K.")
       * were removed: no real user quotes exist yet. When the community
       * grows and real, attributable reviews come in, a section can return
       * here with live data only.
       */}
      <section className="px-6 py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-body text-sm leading-relaxed text-text-secondary">
            Gerçek kullanıcı yorumları topluluk büyüdükçe burada eklenecek.
          </p>
        </div>
      </section>

      {/* ========== BOTTOM CTA ========== */}
      <section className="bg-bg-charcoal px-6 py-24 lg:px-10 lg:py-32">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-text-primary lg:text-4xl">
            Hemen Başla
          </h2>
          <p className="mt-4 font-body text-lg text-text-secondary">
            Tamamen ücretsiz, açık kaynak. Kredi kartı, hesap veya kayıt
            gerekmez. Bağış tamamen gönüllüdür.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="https://t.me/+sK_c-yKLc4E0Y2I0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded bg-accent-red-deep px-8 py-3.5 font-body text-sm font-semibold uppercase tracking-wider text-white transition-colors duration-200 hover:bg-[#A01528]"
            >
              Telegram'a Katıl
            </a>
            <a
              href="https://github.com/eruo005-dev/ollamatr-app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded border border-border-subtle bg-transparent px-8 py-3.5 font-body text-sm font-semibold uppercase tracking-wider text-text-primary transition-all duration-200 hover:border-accent-red hover:text-accent-red-light"
            >
              <Heart className="h-4 w-4" />
              GitHub'da Destekle
            </a>
          </div>
        </ScrollReveal>
      </section>
    </div>
  )
}
