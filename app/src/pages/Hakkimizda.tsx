import { useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { fadeUp, staggerContainer, staggerChild } from '@/lib/animations'
import ScrollReveal from '@/components/ScrollReveal'

gsap.registerPlugin(ScrollTrigger)

/* ------------------------------------------------------------------ */
/*  Team data                                                           */
/* ------------------------------------------------------------------ */

interface TeamMember {
  name: string
  role: string
  bio: string
  initials: string
}

// TODO (KVKK Madde 10): Bir gerçek veri sorumlusu adı-soyadı, proje sahibi
// tarafından eklenmelidir. Aydınlatma yükümlülüğü için yasal veri sorumlusu
// kimliği zorunludur — buraya uydurma isim YAZILMAMALIDIR.
const teamMembers: TeamMember[] = [
  {
    name: 'OllamaTR topluluk projesi',
    role: 'Açık kaynak topluluk projesi',
    bio: 'OllamaTR yeni başlayan, kâr amacı gütmeyen bir açık kaynak topluluk projesidir. Sorular, katkı ve iletişim için iletisim@ollamatr.com adresinden veya GitHub deposu üzerinden bize ulaşabilirsiniz.',
    initials: '··',
  },
]

/* ------------------------------------------------------------------ */
/*  Partners data                                                       */
/* ------------------------------------------------------------------ */

interface Partner {
  name: string
  slug: string
}

const partners: Partner[] = []

/* ------------------------------------------------------------------ */
/*  Roadmap data                                                        */
/* ------------------------------------------------------------------ */

interface RoadmapItem {
  quarter: string
  title: string
  description: string
  status: 'completed' | 'in-progress' | 'planned'
  statusLabel: string
}

// Honest, forward-looking roadmap. No quarters with a fabricated shipped
// history and no false "Tamamlandı"/"Devam Ediyor" badges — every item is
// genuinely a plan, so all are "Planlandı".
const roadmapItems: RoadmapItem[] = [
  {
    quarter: 'Planlandı',
    title: 'Kuruluş & ilk beta',
    description: 'İlk Türkçe LLM beta sürümünün hazırlanması',
    status: 'planned',
    statusLabel: 'Planlandı',
  },
  {
    quarter: 'Planlandı',
    title: 'Genel kullanıma açılım',
    description: 'Ücretsiz katmanla genel kullanıma açılım',
    status: 'planned',
    statusLabel: 'Planlandı',
  },
  {
    quarter: 'Planlandı',
    title: 'GPU cluster desteği',
    description: 'Çoklu GPU üzerinde dağıtık çıkarım',
    status: 'planned',
    statusLabel: 'Planlandı',
  },
  {
    quarter: 'Planlandı',
    title: 'İnce ayar platformu',
    description: 'Topluluk odaklı Türkçe model ince ayarı',
    status: 'planned',
    statusLabel: 'Planlandı',
  },
  {
    quarter: 'Planlandı',
    title: 'Mobil SDK',
    description: 'iOS ve Android için yerel SDK',
    status: 'planned',
    statusLabel: 'Planlandı',
  },
  {
    quarter: 'Planlandı',
    title: 'Federal öğrenme',
    description: 'Veri paylaşmadan ortak model eğitimi',
    status: 'planned',
    statusLabel: 'Planlandı',
  },
]

function getStatusColor(status: RoadmapItem['status']) {
  switch (status) {
    case 'completed':
      return 'bg-safe-green'
    case 'in-progress':
      return 'bg-accent-red-deep'
    case 'planned':
      return 'bg-text-muted'
  }
}

function getStatusTextColor(status: RoadmapItem['status']) {
  switch (status) {
    case 'completed':
      return 'text-safe-green'
    case 'in-progress':
      return 'text-accent-red-light'
    case 'planned':
      return 'text-text-muted'
  }
}

/* ------------------------------------------------------------------ */
/*  RoadmapTimeline — GSAP ScrollTrigger isolated component            */
/* ------------------------------------------------------------------ */

function RoadmapTimeline({ items }: { items: RoadmapItem[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const lineFillRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useGSAP(
    () => {
      if (!containerRef.current || !lineFillRef.current) return

      // Respect prefers-reduced-motion (WCAG 2.3.3). Animations only run for
      // users who have NOT requested reduced motion; reduced-motion users see
      // the final, static state.
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Animate the red fill line with scroll
        gsap.fromTo(
          lineFillRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: 'top center',
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 70%',
              end: 'bottom 40%',
              scrub: 0.5,
            },
          }
        )

        // Animate each milestone item
        itemRefs.current.forEach((item) => {
          if (!item) return
          gsap.fromTo(
            item,
            { opacity: 0, x: -20 },
            {
              opacity: 1,
              x: 0,
              duration: 0.5,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none none',
              },
            }
          )
        })
      })
    },
    { scope: containerRef }
  )

  return (
    <div ref={containerRef} className="relative">
      {/* Timeline line */}
      <div
        ref={lineRef}
        className="absolute left-[22px] top-0 w-[2px] bg-border-subtle md:left-[26px]"
        style={{ height: '100%' }}
      />
      {/* Red fill line */}
      <div
        ref={lineFillRef}
        className="absolute left-[22px] top-0 w-[2px] bg-accent-red-deep md:left-[26px]"
        style={{ height: '100%', transformOrigin: 'top center' }}
      />

      <div className="flex flex-col gap-12">
        {items.map((item, idx) => (
          <div
            key={idx}
            ref={(el) => {
              itemRefs.current[idx] = el
            }}
            className="relative flex items-start gap-6 md:gap-8"
          >
            {/* Dot */}
            <div
              className={`relative z-10 mt-1.5 h-3 w-3 shrink-0 rounded-full ${getStatusColor(item.status)}`}
            />

            {/* Content */}
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-xs font-medium tracking-wide text-text-muted">
                  {item.quarter}
                </span>
                <span
                  className={`font-mono text-xs font-medium ${getStatusTextColor(item.status)}`}
                >
                  {item.statusLabel}
                </span>
              </div>
              <h3 className="mt-1 font-display text-base font-bold text-text-primary">
                {item.title}
              </h3>
              <p className="mt-1 font-body text-sm leading-relaxed text-text-secondary">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main component                                                      */
/* ------------------------------------------------------------------ */

export default function Hakkimizda() {
  const reduce = useReducedMotion()
  const hasPartners = partners.length > 0

  return (
    <div className="bg-bg-obsidian">
      {/* ========== HERO ========== */}
      <section className="px-6 pb-16 pt-40 lg:px-10 lg:pb-24 lg:pt-44">
        <div className="mx-auto max-w-4xl text-center">
          <motion.p
            className="mb-4 font-body text-sm font-medium tracking-wide text-accent-red-light"
            variants={fadeUp}
            initial={reduce ? false : 'hidden'}
            animate="visible"
            custom={0}
          >
            Hakkımızda
          </motion.p>
          <motion.h1
            className="font-display text-3xl font-bold leading-tight tracking-tight text-text-primary md:text-4xl lg:text-5xl"
            variants={fadeUp}
            initial={reduce ? false : 'hidden'}
            animate="visible"
            custom={1}
          >
            Türkiye&apos;nin AI altyapısını birlikte inşa etmek için yola çıktık
          </motion.h1>
          <motion.p
            className="mx-auto mt-6 max-w-3xl font-body text-lg leading-relaxed text-text-secondary"
            variants={fadeUp}
            initial={reduce ? false : 'hidden'}
            animate="visible"
            custom={2}
          >
            Yerel, güvenli ve Türkçe-first yapay zeka çözümleri için buradayız.
          </motion.p>
        </div>
      </section>

      {/* ========== MISSION + STORY ========== */}
      <section className="bg-bg-charcoal px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
          {/* Mission */}
          <motion.div
            initial={reduce ? false : { opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{
              duration: reduce ? 0 : 0.7,
              ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
            }}
          >
            <h2 className="font-display text-3xl font-bold text-text-primary lg:text-4xl">
              Misyonumuz
            </h2>
            <p className="mt-6 font-body text-lg leading-relaxed text-text-secondary">
              Türkiye&apos;deki her geliştiricinin, her KOBİ&apos;nin ve her
              öğrencinin yapay zeka teknolojisine yerel, güvenli ve anadilinde
              erişimini sağlamak. Verilerinizin sınırı ülke sınırınızı aşmasın —
              kendi sunucularınızda, kendi dilinizde, tam kontrolünüzde.
            </p>
          </motion.div>

          {/* Story */}
          <motion.div
            initial={reduce ? false : { opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{
              duration: reduce ? 0 : 0.7,
              delay: reduce ? 0 : 0.1,
              ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
            }}
          >
            <h2 className="font-display text-3xl font-bold text-text-primary lg:text-4xl">
              Hikayemiz
            </h2>
            <p className="mt-6 font-body text-lg leading-relaxed text-text-secondary">
              &ldquo;Neden Türkçe AI altyapısı yok?&rdquo; sorusuyla yola çıktık
              ve OllamaTR doğdu. Şu an yeni başlayan, açık kaynak bir topluluk
              projesiyiz ve birlikte büyüyoruz.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ========== TEAM ========== */}
      <section className="px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal>
            <h2 className="mb-12 text-center font-display text-3xl font-bold tracking-tight text-text-primary lg:text-4xl">
              Ekip
            </h2>
          </ScrollReveal>

          <motion.div
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
            variants={staggerContainer}
            initial={reduce ? false : 'hidden'}
            whileInView={reduce ? undefined : 'visible'}
            viewport={{ once: true, margin: '-50px' }}
          >
            {teamMembers.map((member, idx) => (
              <motion.div
                key={idx}
                variants={staggerChild}
                className="group rounded-lg border border-border-subtle bg-bg-charcoal p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent-red/30"
              >
                {/* Avatar */}
                <div
                  role="img"
                  aria-label={`${member.name} profil resmi`}
                  className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-bg-surface font-display text-lg font-bold text-accent-red-light"
                >
                  {member.initials}
                </div>

                <h3 className="font-display text-base font-bold text-text-primary">
                  {member.name}
                </h3>
                <p className="mt-1 font-body text-sm font-medium text-accent-red-light">
                  {member.role}
                </p>
                <p className="mt-2 font-body text-xs leading-relaxed text-text-secondary">
                  {member.bio}
                </p>
                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                  <a
                    href="mailto:iletisim@ollamatr.com"
                    className="font-body text-xs font-medium text-accent-red-light transition-colors hover:text-accent-red-light"
                  >
                    iletisim@ollamatr.com
                  </a>
                  <a
                    href="https://github.com/eruo005-dev/ollamatr-app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-xs font-medium text-accent-red-light transition-colors hover:text-accent-red-light"
                  >
                    GitHub deposu
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== PARTNERS ========== */}
      {/* Hidden until at least one real ecosystem partner exists — we don't
       * render a heading + disclaimer over an empty grid. */}
      {hasPartners && (
      <section className="bg-bg-charcoal px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <ScrollReveal>
            <h2 className="mb-4 font-display text-2xl font-bold tracking-tight text-text-primary">
              İlgili ekosistem
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="mb-6 font-body text-base text-text-secondary">
              Türkiye&apos;nin AI ekosistemine ilham veren kuruluşlar.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="mt-6 mb-12 text-center text-xs text-text-muted max-w-2xl mx-auto font-body">
              Bu kuruluşlarla OllamaTR projesinin resmi bir ortaklığı veya
              destek sözleşmesi bulunmamaktadır. Logolar, projemizi
              destekleyebilecek ekosistem üyelerini göstermek amacıyla
              bilgilendirme için kullanılmaktadır. Resmi iş birliklerimiz
              duyurulduğunda bu bölüm güncellenecektir.
            </p>
          </ScrollReveal>

          <motion.div
            className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-6"
            variants={staggerContainer}
            initial={reduce ? false : 'hidden'}
            whileInView={reduce ? undefined : 'visible'}
            viewport={{ once: true, margin: '-50px' }}
          >
            {partners.map((partner, idx) => (
              <motion.div
                key={idx}
                variants={staggerChild}
                className="group flex flex-col items-center gap-3"
              >
                <div className="flex max-h-10 items-center justify-center">
                  <img
                    src={`/partners/${partner.slug}.svg`}
                    alt={`${partner.name} logosu`}
                    loading="lazy"
                    className="max-h-10 w-auto transition-all duration-300 [filter:grayscale(100%)] hover:[filter:none] group-hover:[filter:none]"
                  />
                </div>
                <span className="text-center font-body text-xs text-text-muted transition-colors duration-300 group-hover:text-text-secondary">
                  {partner.name}
                </span>
              </motion.div>
            ))}
          </motion.div>

          <ScrollReveal delay={0.3}>
            <p className="mt-12 font-body text-sm text-text-muted">
              Ortaklık ve işbirliği için{' '}
              <a
                href="mailto:iletisim@ollamatr.com"
                className="text-accent-red-light transition-colors hover:text-accent-red-light"
              >
                iletisim@ollamatr.com
              </a>{' '}
              adresinden bize ulaşabilirsiniz.
            </p>
          </ScrollReveal>
        </div>
      </section>
      )}

      {/* ========== ROADMAP ========== */}
      <section className="px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-3xl">
          <ScrollReveal>
            <h2 className="mb-12 text-center font-display text-3xl font-bold tracking-tight text-text-primary">
              Yol haritası
            </h2>
          </ScrollReveal>

          <RoadmapTimeline items={roadmapItems} />
        </div>
      </section>

      {/* ========== BOTTOM CTA ========== */}
      <section className="bg-bg-charcoal px-6 py-24 lg:px-10 lg:py-32">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-text-primary lg:text-4xl">
            Bizimle Yol Almaya Hazır mısınız?
          </h2>
          <p className="mt-4 font-body text-lg text-text-secondary">
            Türkiye&apos;nin AI devriminin bir parçası olun.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="https://t.me/+sK_c-yKLc4E0Y2I0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded bg-accent-red-deep px-8 py-3.5 font-body text-sm font-semibold tracking-wide text-white transition-colors duration-200 hover:bg-[#A01528]"
            >
              Telegram'a Katıl
            </a>
            <a
              href="mailto:iletisim@ollamatr.com"
              className="inline-flex items-center justify-center rounded border border-border-subtle bg-transparent px-8 py-3.5 font-body text-sm font-semibold tracking-wide text-text-primary transition-all duration-200 hover:border-accent-red hover:text-accent-red-light"
            >
              İletişime Geçin
            </a>
          </div>
        </ScrollReveal>
      </section>
    </div>
  )
}
