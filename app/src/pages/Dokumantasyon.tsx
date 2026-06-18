import { useState, useMemo } from 'react'
import { Link } from 'react-router'
import { motion, useReducedMotion } from 'framer-motion'
import {
  Download,
  Play,
  Code,
  Code2,
  Wrench,
  Search,
  ArrowRight,
  Box,
  Shield,
  Cpu,
  Users,
} from 'lucide-react'
import { easeExpoOut, fadeUp, staggerContainer, staggerChild } from '@/lib/animations'

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const quickStartCards = [
  {
    icon: Download,
    title: 'İlk Kurulum',
    desc: "Windows, macOS veya Linux'a 2 dakikada kurulum. Adım adım rehber.",
    linkText: 'Başla →',
  },
  {
    icon: Play,
    title: 'İlk Modelinizi Çalıştırın',
    desc: "Turkish-Llama 8B indirin, sohbet edin. Yerel AI'nin nasıl çalıştığını görün.",
    linkText: 'Öğren →',
  },
  {
    icon: Code,
    title: 'API Entegrasyonu',
    desc: 'OpenAI uyumlu API ile kendi uygulamanıza entegre edin. Python, JS, cURL örnekleri.',
    linkText: 'Keşfet →',
  },
]

const categories = [
  { icon: Download, title: 'Kurulum Rehberleri', desc: 'Windows, macOS, Linux kurulumları. GPU yapılandırması.' },
  { icon: Box, title: 'Model Yönetimi', desc: 'İndirme, güncelleme, silme. Özel model ekleme.' },
  { icon: Code2, title: 'API Referansı', desc: "Tüm endpoint'ler, parametreler, yanıt formatları." },
  { icon: Shield, title: 'KVKK & Gizlilik', desc: 'Veri gizliliği ayarları, KVKK uyumluluğu.' },
  { icon: Wrench, title: 'Sorun Giderme', desc: 'Sık karşılaşılan hatalar ve çözümleri.' },
  { icon: Cpu, title: 'İleri Seviye', desc: 'Özel model eğitimi, optimizasyon, katmanlı yapılandırma.' },
]

const popularArticles = [
  { title: "Windows'a OllamaTR Nasıl Kurulur?", readTime: '5 dk', category: 'Kurulum' },
  { title: 'Turkish-Llama 8B ile İlk Sohbetiniz', readTime: '3 dk', category: 'Hızlı Başlangıç' },
  { title: 'GPU Hızlandırma Nasıl Etkinleştirilir?', readTime: '4 dk', category: 'Yapılandırma' },
  { title: 'Kendi Modelinizde İnce Ayar Yapın', readTime: '8 dk', category: 'İleri' },
  { title: 'API ile Python Uygulaması Oluşturun', readTime: '6 dk', category: 'API' },
  { title: 'KVKK Uyumlu Kurulum Kontrol Listesi', readTime: '4 dk', category: 'KVKK' },
]

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function Dokumantasyon() {
  const [searchQuery, setSearchQuery] = useState('')
  const reduce = useReducedMotion()

  const filteredCategories = useMemo(
    () =>
      categories.filter(
        (c) =>
          c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.desc.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [searchQuery]
  )

  const filteredArticles = useMemo(
    () =>
      popularArticles.filter(
        (a) =>
          a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.category.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [searchQuery]
  )

  return (
    <div>
      {/* ============================================================ */}
      {/* SECTION 1 — Hero with search                                 */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden bg-bg-obsidian px-6 pt-40 pb-16 lg:px-10">
        {/* Background image with overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: 'url(/docs-hero.jpg)' }}
        />
        <div className="absolute inset-0 bg-bg-obsidian/85" />

        <div className="relative mx-auto max-w-7xl">
          <motion.span
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0 : 0.5, ease: easeExpoOut }}
            className="mb-4 inline-block font-body text-sm font-medium tracking-wide text-accent-red-light"
          >
            DOKÜMANTASYON
          </motion.span>
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : 0.1, ease: easeExpoOut }}
            className="font-display text-4xl font-bold leading-tight text-text-primary md:text-5xl lg:text-6xl"
          >
            Türkçe Kaynaklar
          </motion.h1>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : 0.22, ease: easeExpoOut }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-text-secondary"
          >
            OllamaTR'yi kurmaktan ilk modelinizi çalıştırmaya, API entegrasyonundan ileri
            yapılandırmaya kadar her şey.
          </motion.p>

          {/* Search bar */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: reduce ? 0 : 0.5, delay: reduce ? 0 : 0.6, ease: easeExpoOut }}
            className="mt-10 max-w-xl"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-text-muted" />
              <input
                type="text"
                placeholder="Dokümantasyonda ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-14 w-full rounded-lg border border-border-subtle bg-bg-surface pl-12 pr-4 font-body text-base text-text-primary outline-none transition-all duration-200 placeholder:text-text-muted focus:border-accent-red focus:ring-2 focus:ring-accent-red/50"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 2 — Quick Start Cards                                */}
      {/* ============================================================ */}
      <section className="bg-bg-charcoal px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <motion.h2
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: reduce ? 0 : 0.5, ease: easeExpoOut }}
            className="mb-10 font-display text-xl font-bold text-text-primary"
          >
            HIZLI BAŞLANGIÇ
          </motion.h2>

          <div className="grid gap-6 md:grid-cols-3">
            {quickStartCards.map((card, i) => (
              <motion.button
                key={card.title}
                type="button"
                aria-label={`${card.title} — Yakında`}
                title="Yakında"
                disabled
                custom={i}
                initial={reduce ? false : 'hidden'}
                whileInView={reduce ? undefined : 'visible'}
                viewport={{ once: true, margin: '-60px' }}
                variants={fadeUp}
                className="group block cursor-not-allowed rounded-lg border border-border-subtle bg-bg-charcoal p-6 text-left opacity-70 transition-all duration-200"
              >
                <card.icon className="h-8 w-8 text-accent-red-light" />
                <h3 className="mt-4 font-display text-lg font-bold text-text-primary">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">{card.desc}</p>
                <span className="mt-4 inline-block font-body text-sm font-medium text-accent-red-light">
                  {card.linkText}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 3 — Doc Categories                                   */}
      {/* ============================================================ */}
      <section className="bg-bg-obsidian px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <motion.h2
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: reduce ? 0 : 0.5, ease: easeExpoOut }}
            className="mb-12 font-display text-2xl font-bold text-text-primary"
          >
            KATEGORİLER
          </motion.h2>

          {filteredCategories.length > 0 ? (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
              {filteredCategories.map((cat, i) => (
                <motion.div
                  key={cat.title}
                  custom={i}
                  initial={reduce ? false : 'hidden'}
                  whileInView={reduce ? undefined : 'visible'}
                  viewport={{ once: true, margin: '-60px' }}
                  variants={fadeUp}
                  className="flex gap-4 rounded-lg border border-border-subtle bg-bg-charcoal p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent-red/30"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-red/10">
                    <cat.icon className="h-5 w-5 text-accent-red-light" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-text-primary">
                      {cat.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-text-secondary">{cat.desc}</p>
                    <span className="mt-2 inline-block rounded-full bg-accent-red/10 px-2 py-0.5 font-body text-xs font-medium text-accent-red-light">
                      Yakında
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-center text-text-muted">Sonuç bulunamadı.</p>
          )}
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 4 — Popular Articles                                 */}
      {/* ============================================================ */}
      <section className="bg-bg-charcoal px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-3xl">
          <motion.h2
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: reduce ? 0 : 0.5, ease: easeExpoOut }}
            className="mb-2 font-display text-xl font-bold text-text-primary"
          >
            HAZIRLANAN REHBERLER
          </motion.h2>
          <p className="mb-8 max-w-2xl font-body text-sm leading-relaxed text-text-muted">
            Bu rehberler hazırlanıyor. Şimdilik kurulum için{' '}
            <a href="https://ollama.com/download" target="_blank" rel="noopener noreferrer" className="text-accent-red-light underline-offset-2 hover:underline">resmi Ollama dokümantasyonunu</a>{' '}
            kullanabilir, soruların için Telegram topluluğuna katılabilirsin.
          </p>

          {filteredArticles.length > 0 ? (
            <div className="divide-y divide-border-subtle rounded-lg border border-border-subtle bg-bg-charcoal">
              {filteredArticles.map((article, i) => (
                <motion.button
                  key={article.title}
                  type="button"
                  aria-label={`${article.title} — Yakında`}
                  title="Yakında"
                  custom={i}
                  initial={reduce ? false : 'hidden'}
                  whileInView={reduce ? undefined : 'visible'}
                  viewport={{ once: true }}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.3, delay: i * 0.06, ease: easeExpoOut },
                    },
                  }}
                  className="group flex w-full items-center justify-between px-5 py-4 text-left transition-colors duration-200 hover:border-l-2 hover:border-l-accent-red hover:bg-[rgba(217,30,54,0.03)]"
                >
                  <div>
                    <h4 className="font-body text-base font-medium text-text-primary transition-colors group-hover:text-accent-red-light">
                      {article.title}
                    </h4>
                    <p className="mt-0.5 font-body text-xs text-text-muted">
                      {article.category} · Yakında
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-text-muted transition-all duration-200 group-hover:translate-x-1 group-hover:text-accent-red-light" />
                </motion.button>
              ))}
            </div>
          ) : (
            <p className="text-center text-text-muted">Sonuç bulunamadı.</p>
          )}
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 5 — Community CTA                                    */}
      {/* ============================================================ */}
      <section className="bg-bg-obsidian px-6 py-24 lg:px-10">
        <motion.div
          initial={reduce ? false : 'hidden'}
          whileInView={reduce ? undefined : 'visible'}
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mx-auto max-w-xl text-center"
        >
          <motion.div variants={staggerChild}>
            <Users className="mx-auto h-10 w-10 text-accent-red-light" />
          </motion.div>
          <motion.h2
            variants={staggerChild}
            className="mt-5 font-display text-2xl font-bold text-text-primary md:text-3xl"
          >
            Cevabı Bulamadınız mı?
          </motion.h2>
          <motion.p variants={staggerChild} className="mt-4 text-base leading-relaxed text-text-secondary">
            Topluluğumuza katılın ve diğer geliştiricilerden yardım alın.
          </motion.p>
          <motion.div
            variants={staggerChild}
            className="mt-8 flex flex-wrap justify-center gap-4"
          >
            <Link
              to="/topluluk"
              className="inline-flex items-center gap-2 rounded bg-accent-red-deep px-7 py-3.5 font-body text-sm font-semibold tracking-wide text-white transition-all duration-200 hover:scale-[1.02] hover:bg-[#A01528]"
            >
              Topluluğa Katıl →
            </Link>
            <a
              href="https://github.com/eruo005-dev/ollamatr-app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded border border-border-subtle px-7 py-3.5 font-body text-sm font-semibold tracking-wide text-text-primary transition-all duration-200 hover:border-accent-red hover:text-accent-red-light"
            >
              GitHub'da Sor
            </a>
          </motion.div>
          <motion.p variants={staggerChild} className="mt-6 text-sm text-text-muted">
            Topluluk{' '}
            <a
              href="https://t.me/+sK_c-yKLc4E0Y2I0"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-red-light underline-offset-2 hover:underline"
            >
              Telegram grubuna
            </a>{' '}
            katılarak sorularını paylaşabilirsin.
          </motion.p>
        </motion.div>
      </section>
    </div>
  )
}
