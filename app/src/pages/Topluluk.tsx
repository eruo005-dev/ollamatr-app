import { motion } from 'framer-motion'
import { Send, MessageCircle, Github, Users, ChevronRight } from 'lucide-react'
import { fadeUp, staggerContainer, staggerChild } from '@/lib/animations'
import ScrollReveal from '@/components/ScrollReveal'

/* ------------------------------------------------------------------ */
/*  Real, verifiable links                                              */
/* ------------------------------------------------------------------ */

const TELEGRAM_URL = 'https://t.me/+sK_c-yKLc4E0Y2I0'
const GITHUB_URL = 'https://github.com/eruo005-dev/ollamatr-app'

/* ------------------------------------------------------------------ */
/*  Platform data — only real platforms.                                */
/*  Telegram + GitHub are live; Discord + Forum are honestly "Yakında". */
/* ------------------------------------------------------------------ */

const platforms = [
  {
    icon: Send,
    name: 'Telegram',
    subtitle: 'OllamaTR Topluluğu',
    members: 'Davet ile katılım',
    description: 'Anlık sohbet, hızlı yardım, duyurular',
    href: TELEGRAM_URL,
    color: 'hover:border-[#0088cc]/40',
    buttonColor: 'hover:text-[#0088cc] hover:border-[#0088cc]',
  },
  {
    icon: Github,
    name: 'GitHub',
    subtitle: 'Açık Kaynak',
    members: 'Yeni başlıyor',
    description: "Açık kaynak katkı, issue takibi, PR'lar",
    href: GITHUB_URL,
    color: 'hover:border-white/20',
    buttonColor: 'hover:text-white hover:border-white',
  },
  {
    icon: MessageCircle,
    name: 'Discord',
    subtitle: 'Yakında',
    members: 'Açılış sırasında',
    description: 'Teknik tartışma, sesli kanallar, etkinlikler',
    href: null,
    color: 'hover:border-[#5865F2]/40',
    buttonColor: 'hover:text-[#5865F2] hover:border-[#5865F2]',
  },
  {
    icon: Users,
    name: 'Forum',
    subtitle: 'Yakında',
    members: 'Açılış sırasında',
    description: 'Derinlemesine tartışma, rehberler, showcase',
    href: null,
    color: 'hover:border-accent-red/40',
    buttonColor: 'hover:text-accent-red-light hover:border-accent-red',
  },
]

/* ------------------------------------------------------------------ */
/*  Main component                                                      */
/* ------------------------------------------------------------------ */

export default function Topluluk() {
  return (
    <section aria-label="Topluluk sayfası" className="bg-bg-obsidian">
      {/* ========== HERO with background image ========== */}
      <section className="relative px-6 pb-16 pt-40 lg:px-10 lg:pb-24 lg:pt-44">
        {/* Background image */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/community-photo.jpg)' }}
        />
        {/* Dark overlay */}
        <div aria-hidden="true" className="absolute inset-0 bg-bg-obsidian/80" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <motion.p
            className="mb-4 font-body text-sm font-medium uppercase tracking-wider text-accent-red-light"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            Topluluk
          </motion.p>
          <motion.h1
            className="font-display text-4xl font-bold leading-tight tracking-tight text-text-primary lg:text-5xl"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            Birlikte büyüyoruz
          </motion.h1>
          <motion.p
            className="mx-auto mt-6 max-w-2xl font-body text-lg leading-relaxed text-text-secondary"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            OllamaTR yeni başlayan, açık kaynak bir topluluk projesi. Türkçe yapay
            zekayı birlikte inşa etmek için Telegram ve GitHub üzerinden aramıza
            katıl.
          </motion.p>
          <motion.div
            className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
          >
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded bg-accent-red-deep px-8 py-3.5 font-body text-sm font-semibold uppercase tracking-wider text-white transition-all duration-200 hover:bg-accent-red-light hover:scale-[1.02]"
            >
              <Send className="h-4 w-4" />
              Telegram'a katıl
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded border border-border-subtle bg-transparent px-8 py-3.5 font-body text-sm font-semibold uppercase tracking-wider text-text-primary transition-all duration-200 hover:border-accent-red hover:text-accent-red-light"
            >
              <Github className="h-4 w-4" />
              GitHub'da keşfet
            </a>
          </motion.div>
        </div>
      </section>

      {/* ========== PLATFORM CARDS ========== */}
      <section className="bg-bg-charcoal px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal>
            <h2 className="mb-10 font-display text-xl font-bold tracking-wide text-text-primary">
              Bağlantılar
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
                    {platform.href ? (
                      <a
                        href={platform.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex min-h-[44px] items-center gap-1.5 rounded border border-border-subtle bg-transparent px-5 py-2.5 font-body text-sm font-medium text-text-primary transition-all duration-200 ${platform.buttonColor}`}
                      >
                        Katıl
                        <ChevronRight className="h-4 w-4" />
                      </a>
                    ) : (
                      <span
                        className="inline-flex min-h-[44px] cursor-not-allowed items-center gap-1.5 rounded border border-border-subtle bg-transparent px-5 py-2.5 font-body text-sm font-medium text-text-muted opacity-70"
                        aria-disabled="true"
                        title="Yakında"
                      >
                        Yakında
                      </span>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* ========== CONTRIBUTORS — honest empty state ========== */}
      <section className="px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <ScrollReveal>
            <h2 className="mb-3 font-display text-2xl font-bold tracking-wide text-text-primary">
              Katkıda bulunanlar
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="mb-8 font-body text-base leading-relaxed text-text-secondary">
              Topluluk yeni başlıyor — ilk katkıyı sen yap. Açık kaynak depomuza
              kod, dökümantasyon veya çeviri ile katkıda bulunabilirsin.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded border border-border-subtle bg-transparent px-6 py-3 font-body text-sm font-medium text-text-primary transition-all duration-200 hover:border-accent-red hover:text-accent-red-light"
            >
              <Github className="h-4 w-4" />
              GitHub'da katkıda bulun
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* ========== EVENTS — honest empty state ========== */}
      <section className="bg-bg-charcoal px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <ScrollReveal>
            <h2 className="mb-3 font-display text-2xl font-bold tracking-wide text-text-primary">
              Etkinlikler
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="mb-8 font-body text-base leading-relaxed text-text-secondary">
              Henüz planlanmış bir etkinlik yok. Etkinlikleri ilk öğrenenlerden
              olmak için Telegram kanalımıza katıl.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded border border-border-subtle bg-transparent px-6 py-3 font-body text-sm font-medium text-text-primary transition-all duration-200 hover:border-accent-red hover:text-accent-red-light"
            >
              <Send className="h-4 w-4" />
              Telegram'da duyuruları takip et
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* ========== FORUM — honest "Yakında" empty state ========== */}
      <section className="px-6 py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <ScrollReveal>
            <h2 className="mb-3 font-display text-xl font-bold tracking-wide text-text-primary">
              Forum
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="font-body text-base leading-relaxed text-text-secondary">
              Forum yakında açılacak. O zamana kadar sohbet ve sorular için
              Telegram kanalımızdayız.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ========== BOTTOM CTA ========== */}
      <section className="bg-bg-charcoal px-6 py-24 lg:px-10 lg:py-32">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-text-primary lg:text-4xl">
            Aramıza katılın
          </h2>
          <p className="mt-4 font-body text-lg text-text-secondary">
            Her seviyeden geliştirici için hoş geldiniz. Sorular sormaktan,
            projeler paylaşmaktan çekinmeyin.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded bg-accent-red-deep px-8 py-3.5 font-body text-sm font-semibold uppercase tracking-wider text-white transition-all duration-200 hover:bg-accent-red-light hover:scale-[1.02]"
            >
              <Send className="mr-2 h-4 w-4" />
              Topluluğa katıl
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded border border-border-subtle bg-transparent px-8 py-3.5 font-body text-sm font-semibold uppercase tracking-wider text-text-primary transition-all duration-200 hover:border-accent-red hover:text-accent-red-light"
            >
              <Github className="mr-2 h-4 w-4" />
              GitHub'da keşfet
            </a>
          </div>
        </ScrollReveal>
      </section>
    </section>
  )
}
