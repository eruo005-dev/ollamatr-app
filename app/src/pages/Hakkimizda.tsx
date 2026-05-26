import { useRef } from 'react'
import { Link } from 'react-router'
import { motion, useInView } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

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
    transition: { staggerChildren: 0.1 },
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
/*  Scroll-reveal wrapper (Framer Motion)                              */
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
/*  Team data                                                           */
/* ------------------------------------------------------------------ */

const teamMembers = [
  {
    name: 'Efe Kaya',
    role: 'Kurucu & CEO',
    bio: 'AI ve sistem mimarisi tutkunu.',
    initials: 'EK',
  },
  {
    name: 'Zeynep Arslan',
    role: 'CTO',
    bio: 'Açık kaynak savunucusu, backend uzmanı.',
    initials: 'ZA',
  },
  {
    name: 'Burak Yılmaz',
    role: 'Baş Geliştirici',
    bio: 'Tauri ve Rust meraklısı.',
    initials: 'BY',
  },
  {
    name: 'Elif Demir',
    role: 'Ürün & Topluluk',
    bio: 'Geliştirici deneyimi tasarımcısı.',
    initials: 'ED',
  },
]

/* ------------------------------------------------------------------ */
/*  Partners data                                                       */
/* ------------------------------------------------------------------ */

const partners = [
  'Teknopark İstanbul',
  'İTÜ ARI Teknokent',
  'KOSGEB',
  'TÜBİTAK',
  'Türkiye Yapay Zeka Girişimi',
  'Yıldız Teknopark',
]

/* ------------------------------------------------------------------ */
/*  Roadmap data                                                        */
/* ------------------------------------------------------------------ */

interface RoadmapItem {
  quarter: string
  title: string
  status: 'completed' | 'in-progress' | 'planned'
  statusLabel: string
}

const roadmapItems: RoadmapItem[] = [
  {
    quarter: 'Q1 2024',
    title: 'Prototip & İlk 100 Kullanıcı',
    status: 'completed',
    statusLabel: 'Tamamlandı',
  },
  {
    quarter: 'Q2 2024',
    title: 'Model Kataloğu & Topluluk',
    status: 'completed',
    statusLabel: 'Tamamlandı',
  },
  {
    quarter: 'Q3 2024',
    title: 'Pro Tier & KVKK Modülü',
    status: 'in-progress',
    statusLabel: 'Devam Ediyor',
  },
  {
    quarter: 'Q4 2024',
    title: 'KOBİ Paketleri & Eğitim',
    status: 'planned',
    statusLabel: 'Planlandı',
  },
  {
    quarter: 'Q1 2025',
    title: 'OllamaTR Cloud — Türkiye\'de Barındırma',
    status: 'planned',
    statusLabel: 'Planlandı',
  },
  {
    quarter: 'Q2 2025',
    title: 'Özel Model Eğitim Platformu',
    status: 'planned',
    statusLabel: 'Planlandı',
  },
]

function getStatusColor(status: RoadmapItem['status']) {
  switch (status) {
    case 'completed':
      return 'bg-safe-green'
    case 'in-progress':
      return 'bg-accent-red'
    case 'planned':
      return 'bg-text-muted'
  }
}

function getStatusTextColor(status: RoadmapItem['status']) {
  switch (status) {
    case 'completed':
      return 'text-safe-green'
    case 'in-progress':
      return 'text-accent-red'
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
        className="absolute left-[22px] top-0 w-[2px] bg-accent-red md:left-[26px]"
        style={{ height: '100%', transformOrigin: 'top center' }}
      />

      <div className="flex flex-col gap-12">
        {items.map((item, idx) => (
          <div
            key={idx}
            ref={(el) => { itemRefs.current[idx] = el }}
            className="relative flex items-start gap-6 md:gap-8"
          >
            {/* Dot */}
            <div
              className={`relative z-10 mt-1.5 h-3 w-3 shrink-0 rounded-full ${getStatusColor(item.status)} ${
                item.status === 'in-progress' ? 'animate-pulse' : ''
              }`}
            />

            {/* Content */}
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-xs font-medium uppercase tracking-wider text-text-muted">
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
            HAKKIMIZDA
          </motion.p>
          <motion.h1
            className="font-display text-3xl font-bold leading-tight tracking-tight text-text-primary md:text-4xl lg:text-5xl"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            Türkiye&apos;nin AI Altyapısını İnşa Ediyoruz
          </motion.h1>
          <motion.p
            className="mx-auto mt-6 max-w-3xl font-body text-lg leading-relaxed text-text-secondary"
            variants={fadeUp}
            initial="hidden"
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
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
            }}
          >
            <h2 className="font-display text-3xl font-bold text-text-primary lg:text-4xl">
              Misyonumuz
            </h2>
            <p className="mt-6 font-body text-lg leading-relaxed text-text-secondary">
              Türkiye&apos;deki her geliştiricinin, her KOBİ&apos;nin ve her
              öğrencinin yapay zeka teknolojisine yerel, güvenli ve anadilinde
              erişimini sağlamak.
            </p>
          </motion.div>

          {/* Story */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{
              duration: 0.7,
              delay: 0.1,
              ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
            }}
          >
            <h2 className="font-display text-3xl font-bold text-text-primary lg:text-4xl">
              Hikayemiz
            </h2>
            <p className="mt-6 font-body text-lg leading-relaxed text-text-secondary">
              2024&apos;te bir grup Türk geliştirici, &ldquo;Neden Türkçe AI
              altyapısı yok?&rdquo; sorusuyla yola çıktı. OllamaTR doğdu. Bugün
              10.000+ kullanıcı, 100+ model ve büyüyen bir ekosistemle yola
              devam ediyoruz.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ========== TEAM ========== */}
      <section className="px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal>
            <h2 className="mb-12 text-center font-display text-3xl font-bold uppercase tracking-wide text-text-primary lg:text-4xl">
              EKİP
            </h2>
          </ScrollReveal>

          <motion.div
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {teamMembers.map((member, idx) => (
              <motion.div
                key={idx}
                variants={staggerChild}
                className="group rounded-lg border border-border-subtle bg-bg-charcoal p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent-red/30"
              >
                {/* Avatar */}
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-bg-surface font-display text-lg font-bold text-accent-red">
                  {member.initials}
                </div>

                <h3 className="font-display text-base font-bold text-text-primary">
                  {member.name}
                </h3>
                <p className="mt-1 font-body text-sm font-medium text-accent-red">
                  {member.role}
                </p>
                <p className="mt-2 font-body text-xs leading-relaxed text-text-secondary line-clamp-2">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== PARTNERS ========== */}
      <section className="bg-bg-charcoal px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <ScrollReveal>
            <h2 className="mb-4 font-display text-2xl font-bold uppercase tracking-wide text-text-primary">
              EKOSİSTEM ORTAKLARIMIZ
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="mb-12 font-body text-base text-text-secondary">
              Türkiye&apos;nin AI ekosistemini birlikte büyütüyoruz.
            </p>
          </ScrollReveal>

          <motion.div
            className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {partners.map((partner, idx) => (
              <motion.div
                key={idx}
                variants={staggerChild}
                className="group flex flex-col items-center gap-3"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-bg-surface transition-all duration-300 group-hover:bg-bg-obsidian">
                  <span className="font-display text-xs font-bold text-text-secondary transition-colors duration-300 group-hover:text-accent-red">
                    {partner
                      .split(' ')
                      .map((w) => w[0])
                      .join('')
                      .slice(0, 3)}
                  </span>
                </div>
                <span className="text-center font-body text-xs text-text-muted transition-colors duration-300 group-hover:text-text-secondary">
                  {partner}
                </span>
              </motion.div>
            ))}
          </motion.div>

          <ScrollReveal delay={0.3}>
            <p className="mt-12 font-body text-sm text-text-muted">
              Ortaklık ve işbirliği için{' '}
              <a
                href="mailto:iletisim@ollamatr.com"
                className="text-accent-red-light transition-colors hover:text-accent-red"
              >
                iletisim@ollamatr.com
              </a>{' '}
              adresinden bize ulaşabilirsiniz.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ========== ROADMAP ========== */}
      <section className="px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-3xl">
          <ScrollReveal>
            <h2 className="mb-12 text-center font-display text-3xl font-bold uppercase tracking-wide text-text-primary">
              YOL HARİTASI
            </h2>
          </ScrollReveal>

          <RoadmapTimeline items={roadmapItems} />
        </div>
      </section>

      {/* ========== BOTTOM CTA ========== */}
      <section className="bg-bg-charcoal px-6 py-24 lg:px-10 lg:py-32">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-text-primary lg:text-4xl">
            Bizimle Yol Almağa Hazır mısınız?
          </h2>
          <p className="mt-4 font-body text-lg text-text-secondary">
            Türkiye&apos;nin AI devriminin bir parçası olun.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/indir"
              className="inline-flex items-center justify-center rounded bg-accent-red px-8 py-3.5 font-body text-sm font-semibold uppercase tracking-wider text-white transition-all duration-200 hover:bg-accent-red-light hover:scale-[1.02]"
            >
              Hemen İndir
            </Link>
            <a
              href="mailto:iletisim@ollamatr.com"
              className="inline-flex items-center justify-center rounded border border-border-subtle bg-transparent px-8 py-3.5 font-body text-sm font-semibold uppercase tracking-wider text-text-primary transition-all duration-200 hover:border-accent-red hover:text-accent-red-light"
            >
              İletişime Geçin
            </a>
          </div>
        </ScrollReveal>
      </section>
    </div>
  )
}
