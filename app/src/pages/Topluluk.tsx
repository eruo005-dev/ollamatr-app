import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  Send,
  MessageCircle,
  Github,
  Users,
  ChevronRight,
  MessageSquare,
  Clock,
} from 'lucide-react'

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

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.02,
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
}

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
/*  Platform data                                                       */
/* ------------------------------------------------------------------ */

const platforms = [
  {
    icon: Send,
    name: 'Telegram',
    subtitle: 'Yapay Zeka Türkiye',
    members: '5.200+ üye',
    description: 'Anlık sohbet, hızlı yardım, duyurular',
    color: 'hover:border-[#0088cc]/40 hover:shadow-[0_0_20px_rgba(0,136,204,0.1)]',
    buttonColor: 'hover:text-[#0088cc] hover:border-[#0088cc]',
  },
  {
    icon: MessageCircle,
    name: 'Discord',
    subtitle: 'Discord Sunucusu',
    members: '1.800+ üye',
    description: 'Teknik tartışma, sesli kanallar, etkinlikler',
    color: 'hover:border-[#5865F2]/40 hover:shadow-[0_0_20px_rgba(88,101,242,0.1)]',
    buttonColor: 'hover:text-[#5865F2] hover:border-[#5865F2]',
  },
  {
    icon: Github,
    name: 'GitHub',
    subtitle: 'Açık Kaynak',
    members: '800+ yıldız',
    description: 'Açık kaynak katkı, issue takibi, PR\'lar',
    color: 'hover:border-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]',
    buttonColor: 'hover:text-white hover:border-white',
  },
  {
    icon: Users,
    name: 'Forum',
    subtitle: 'btt.community',
    members: '500+ konu',
    description: 'Derinlemesine tartışma, rehberler, showcase',
    color: 'hover:border-accent-red/40 hover:shadow-glow-red',
    buttonColor: 'hover:text-accent-red hover:border-accent-red',
  },
]

/* ------------------------------------------------------------------ */
/*  Contributor data                                                    */
/* ------------------------------------------------------------------ */

const contributors = [
  'Ayşe K.',
  'Mehmet T.',
  'Deniz Y.',
  'Cem B.',
  'Seda A.',
  'Kaan D.',
  'Nil E.',
  'Onur F.',
  'Pınar G.',
  'Can H.',
  'Ece I.',
  'Umut J.',
  'Gizem K.',
  'Tolga L.',
  'Naz M.',
  'Emre N.',
  'Buse O.',
  'Yasin P.',
  'İrem R.',
  'Furkan S.',
]

const contributorColors = [
  'bg-[#D91E36]/20 text-[#FF3B5C]',
  'bg-[#0088cc]/20 text-[#00aaff]',
  'bg-[#00E5A0]/20 text-[#00E5A0]',
  'bg-[#FFB800]/20 text-[#FFB800]',
  'bg-[#9b59b6]/20 text-[#bb79d6]',
  'bg-[#e67e22]/20 text-[#ff9e42]',
  'bg-[#1abc9c]/20 text-[#3bdcc9]',
  'bg-[#3498db]/20 text-[#54b8fb]',
  'bg-[#e74c3c]/20 text-[#ff6c5c]',
  'bg-[#2ecc71]/20 text-[#4cec91]',
]

/* ------------------------------------------------------------------ */
/*  Events data                                                         */
/* ------------------------------------------------------------------ */

const events = [
  {
    title: 'OllamaTR Workshop: İlk Modelinizi Çalıştırın',
    date: '15 Haziran 2025, Online',
    type: 'Başlangıç seviye',
    typeColor: 'bg-safe-green/10 text-safe-green',
  },
  {
    title: 'Türkçe AI Hackathon',
    date: '22-23 Haziran 2025, İstanbul',
    type: 'Yarışma',
    typeColor: 'bg-warn-yellow/10 text-warn-yellow',
  },
  {
    title: 'KVKK & AI Semineri',
    date: '5 Temmuz 2025, Online',
    type: 'Seminer',
    typeColor: 'bg-accent-red/10 text-accent-red',
  },
]

/* ------------------------------------------------------------------ */
/*  Forum highlights data                                               */
/* ------------------------------------------------------------------ */

const forumHighlights = [
  {
    title: 'Llama 3.1 Turkuaz ile en iyi prompt şablonları',
    replies: 42,
    time: '3 saat önce',
  },
  {
    title: '8GB RAM ile hangi modeller çalışır? Pratik rehber',
    replies: 28,
    time: '5 saat önce',
  },
  {
    title: 'Kendi verimle fine-tune deneyimlerim',
    replies: 35,
    time: '1 gün önce',
  },
  {
    title: 'OllamaTR + Next.js entegrasyonu',
    replies: 19,
    time: '1 gün önce',
  },
  {
    title: 'KVKK uyumlu RAG sistemi nasıl kurulur?',
    replies: 15,
    time: '2 gün önce',
  },
]

/* ------------------------------------------------------------------ */
/*  Contributor avatar tooltip component                                */
/* ------------------------------------------------------------------ */

function ContributorAvatar({
  name,
  colorClass,
  index,
}: {
  name: string
  colorClass: string
  index: number
}) {
  const [isHovered, setIsHovered] = useState(false)
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')

  return (
    <motion.div
      className="relative flex cursor-default flex-col items-center"
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={index}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-full ${colorClass} transition-transform duration-200 hover:scale-110`}
      >
        <span className="font-mono text-xs font-bold">{initials}</span>
      </div>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="absolute -bottom-8 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded bg-bg-surface px-2 py-1 font-body text-xs text-text-primary shadow-lg"
          >
            {name}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main component                                                      */
/* ------------------------------------------------------------------ */

export default function Topluluk() {
  return (
    <div className="bg-bg-obsidian">
      {/* ========== HERO with background image ========== */}
      <section className="relative px-6 pb-16 pt-40 lg:px-10 lg:pb-24 lg:pt-44">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/community-photo.jpg)' }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-bg-obsidian/80" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <motion.p
            className="mb-4 font-body text-sm font-medium uppercase tracking-wider text-accent-red"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            TOPLULUK
          </motion.p>
          <motion.h1
            className="font-display text-4xl font-bold leading-tight tracking-tight text-text-primary lg:text-5xl"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            Topluluğa Katıl
          </motion.h1>
          <motion.p
            className="mx-auto mt-6 max-w-2xl font-body text-lg leading-relaxed text-text-secondary"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            5.000+ Türk geliştirici ile yapay zekayı birlikte keşfedin.
          </motion.p>
        </div>
      </section>

      {/* ========== PLATFORM CARDS ========== */}
      <section className="bg-bg-charcoal px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal>
            <h2 className="mb-10 font-display text-xl font-bold uppercase tracking-wide text-text-primary">
              BAĞLANTILAR
            </h2>
          </ScrollReveal>

          <motion.div
            className="grid grid-cols-1 gap-6 sm:grid-cols-2"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {platforms.map((platform, idx) => {
              const Icon = platform.icon
              return (
                <motion.div
                  key={idx}
                  variants={staggerChild}
                  className={`group flex flex-col rounded-lg border border-border-subtle bg-bg-charcoal p-8 transition-all duration-300 hover:-translate-y-0.5 ${platform.color}`}
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-bg-surface">
                    <Icon className="h-6 w-6 text-text-primary" />
                  </div>

                  <h3 className="font-display text-lg font-bold text-text-primary">
                    {platform.name}
                    {platform.subtitle && (
                      <span className="text-text-secondary">
                        {' '}
                        — {platform.subtitle}
                      </span>
                    )}
                  </h3>

                  <p className="mt-2 font-body text-sm text-text-secondary">
                    {platform.description}
                  </p>

                  <p className="mt-3 font-mono text-xs text-text-muted">
                    {platform.members}
                  </p>

                  <div className="mt-6">
                    <a
                      href="#"
                      className={`inline-flex items-center gap-1.5 rounded border border-border-subtle bg-transparent px-5 py-2.5 font-body text-sm font-medium text-text-primary transition-all duration-200 ${platform.buttonColor}`}
                    >
                      Katıl
                      <ChevronRight className="h-4 w-4" />
                    </a>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* ========== CONTRIBUTOR WALL ========== */}
      <section className="px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <h2 className="mb-3 text-center font-display text-2xl font-bold uppercase tracking-wide text-text-primary">
              KATKIDA BULUNANLAR
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="mb-10 text-center font-body text-base text-text-secondary">
              Açık kaynak projemize kod, dökümantasyon ve çeviri ile katkıda
              bulunan topluluk üyelerimiz.
            </p>
          </ScrollReveal>

          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {contributors.map((name, idx) => (
              <ContributorAvatar
                key={idx}
                name={name}
                colorClass={contributorColors[idx % contributorColors.length]}
                index={idx}
              />
            ))}
          </motion.div>

          <ScrollReveal delay={0.3} className="mt-10 text-center">
            <a
              href="#"
              className="inline-flex items-center gap-2 font-body text-sm font-medium text-accent-red transition-colors hover:text-accent-red-light"
            >
              <ChevronRight className="h-4 w-4" />
              Sen de katkıda bulun!
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* ========== UPCOMING EVENTS ========== */}
      <section className="bg-bg-charcoal px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <h2 className="mb-10 font-display text-2xl font-bold uppercase tracking-wide text-text-primary">
              ETKİNLİKLER
            </h2>
          </ScrollReveal>

          <motion.div
            className="flex flex-col gap-0"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {events.map((event, idx) => (
              <motion.div
                key={idx}
                variants={staggerChild}
                className="flex flex-col gap-4 border-b border-border-subtle py-6 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded bg-bg-surface px-3 py-1 font-mono text-xs text-text-secondary">
                      {event.date}
                    </span>
                    <span
                      className={`rounded px-3 py-1 font-body text-xs font-medium ${event.typeColor}`}
                    >
                      {event.type}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-base font-bold text-text-primary">
                    {event.title}
                  </h3>
                </div>
                <a
                  href="#"
                  className="inline-flex items-center gap-1.5 shrink-0 font-body text-sm font-medium text-accent-red transition-colors hover:text-accent-red-light"
                >
                  Detaylar
                  <ChevronRight className="h-4 w-4" />
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== FORUM HIGHLIGHTS ========== */}
      <section className="px-6 py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-3xl">
          <ScrollReveal>
            <h2 className="mb-8 font-display text-xl font-bold uppercase tracking-wide text-text-primary">
              FORUM&apos;DAN BAŞLIKLAR
            </h2>
          </ScrollReveal>

          <motion.div
            className="flex flex-col"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {forumHighlights.map((topic, idx) => (
              <motion.a
                key={idx}
                href="#"
                variants={staggerChild}
                className="group flex flex-col gap-2 border-b border-border-subtle py-5 transition-all duration-200 hover:border-l-2 hover:border-l-accent-red hover:pl-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <MessageSquare className="h-4 w-4 shrink-0 text-text-muted" />
                  <span className="truncate font-body text-sm text-text-primary transition-colors group-hover:text-accent-red-light">
                    {topic.title}
                  </span>
                </div>
                <div className="flex shrink-0 items-center gap-4 pl-7 sm:pl-0">
                  <span className="font-body text-xs text-text-muted">
                    {topic.replies} yanıt
                  </span>
                  <span className="flex items-center gap-1 font-body text-xs text-text-muted">
                    <Clock className="h-3 w-3" />
                    {topic.time}
                  </span>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== BOTTOM CTA ========== */}
      <section className="bg-bg-charcoal px-6 py-24 lg:px-10 lg:py-32">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-text-primary lg:text-4xl">
            Birlikte daha güçlüyüz.
          </h2>
          <p className="mt-4 font-body text-lg text-text-secondary">
            Her seviyeden geliştirici welcome. Sorular sormaktan, projeler
            paylaşmaktan çekinmeyin.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#"
              className="inline-flex items-center justify-center rounded bg-accent-red px-8 py-3.5 font-body text-sm font-semibold uppercase tracking-wider text-white transition-all duration-200 hover:bg-accent-red-light hover:scale-[1.02]"
            >
              <Send className="mr-2 h-4 w-4" />
              Topluluğa Katıl
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center rounded border border-border-subtle bg-transparent px-8 py-3.5 font-body text-sm font-semibold uppercase tracking-wider text-text-primary transition-all duration-200 hover:border-accent-red hover:text-accent-red-light"
            >
              <Github className="mr-2 h-4 w-4" />
              GitHub&apos;da Keşfet
            </a>
          </div>
        </ScrollReveal>
      </section>
    </div>
  )
}
