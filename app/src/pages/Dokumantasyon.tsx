import { useState, useMemo } from 'react'
import { Link } from 'react-router'
import { motion } from 'framer-motion'
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

const easeExpoOut = [0.16, 1, 0.3, 1] as [number, number, number, number]

/* ------------------------------------------------------------------ */
/*  Animation helpers                                                  */
/* ------------------------------------------------------------------ */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: easeExpoOut },
  }),
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeExpoOut } },
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const quickStartCards = [
  {
    icon: Download,
    title: 'İlk Kurulum',
    desc: "Windows, macOS veya Linux'a 2 dakikada kurulum. Adım adım rehber.",
    link: '#/dokumantasyon/ilk-kurulum',
    linkText: 'Başla →',
  },
  {
    icon: Play,
    title: 'İlk Modelinizi Çalıştırın',
    desc: "Llama-3-Turkish indirin, sohbet edin. Yerel AI'nin nasıl çalıştığını görün.",
    link: '#/dokumantasyon/ilk-model',
    linkText: 'Öğren →',
  },
  {
    icon: Code,
    title: 'API Entegrasyonu',
    desc: 'OpenAI uyumlu API ile kendi uygulamanıza entegre edin. Python, JS, cURL örnekleri.',
    link: '#/dokumantasyon/api',
    linkText: 'Keşfet →',
  },
]

const categories = [
  { icon: Download, title: 'Kurulum Rehberleri', desc: 'Windows, macOS, Linux kurulumları. GPU yapılandırması.', count: 12 },
  { icon: Box, title: 'Model Yönetimi', desc: 'İndirme, güncelleme, silme. Özel model ekleme.', count: 8 },
  { icon: Code2, title: 'API Referansı', desc: "Tüm endpoint'ler, parametreler, yanıt formatları.", count: 15 },
  { icon: Shield, title: 'KVKK & Gizlilik', desc: 'Veri gizliliği ayarları, KVKK uyumluluğu.', count: 6 },
  { icon: Wrench, title: 'Sorun Giderme', desc: 'Sık karşılaşılan hatalar ve çözümleri.', count: 10 },
  { icon: Cpu, title: 'İleri Seviye', desc: 'Özel model eğitimi, optimizasyon, katmanlı yapılandırma.', count: 7 },
]

const popularArticles = [
  { title: "Windows'a OllamaTR Nasıl Kurulur?", readTime: '5 dk', category: 'Kurulum' },
  { title: 'Llama-3-Turkish ile İlk Sohbetiniz', readTime: '3 dk', category: 'Hızlı Başlangıç' },
  { title: 'GPU Hızlandırma Nasıl Etkinleştirilir?', readTime: '4 dk', category: 'Yapılandırma' },
  { title: 'Kendi Modelinizi Fine-Tune Edin', readTime: '8 dk', category: 'İleri' },
  { title: 'API ile Python Uygulaması Oluşturun', readTime: '6 dk', category: 'API' },
  { title: 'KVKK Uyumlu Kurulum Kontrol Listesi', readTime: '4 dk', category: 'KVKK' },
]

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function Dokumantasyon() {
  const [searchQuery, setSearchQuery] = useState('')

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
        <div className="absolute inset-0 bg-gradient-to-b from-bg-obsidian/60 via-bg-obsidian/80 to-bg-obsidian" />

        <div className="relative mx-auto max-w-7xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeExpoOut }}
            className="mb-4 inline-block font-body text-sm font-medium uppercase tracking-wider text-accent-red"
          >
            DOKÜMANTASYON
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: easeExpoOut }}
            className="font-display text-4xl font-bold leading-tight text-text-primary md:text-5xl lg:text-6xl"
          >
            Türkçe Kaynaklar
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22, ease: easeExpoOut }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-text-secondary"
          >
            OllamaTR'yi kurmaktan ilk modelinizi çalıştırmaya, API entegrasyonundan ileri
            yapılandırmaya kadar her şey.
          </motion.p>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6, ease: easeExpoOut }}
            className="mt-10 max-w-xl"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-text-muted" />
              <input
                type="text"
                placeholder="Dokümantasyonda ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-14 w-full rounded-lg border border-border-subtle bg-bg-surface pl-12 pr-4 font-body text-base text-text-primary outline-none transition-all duration-200 placeholder:text-text-muted focus:border-accent-red focus:shadow-[0_0_12px_rgba(217,30,54,0.2)]"
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: easeExpoOut }}
            className="mb-10 font-display text-xl font-bold text-text-primary"
          >
            HIZLI BAŞLANGIÇ
          </motion.h2>

          <div className="grid gap-6 md:grid-cols-3">
            {quickStartCards.map((card, i) => (
              <motion.a
                key={card.title}
                href={card.link}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                variants={fadeUp}
                className="group block rounded-lg border border-border-subtle bg-bg-charcoal p-6 transition-all duration-200 hover:-translate-y-1 hover:border-accent-red/40"
              >
                <card.icon className="h-8 w-8 text-accent-red" />
                <h3 className="mt-4 font-display text-lg font-bold text-text-primary">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {card.desc}
                </p>
                <span className="mt-4 inline-block font-body text-sm font-medium text-accent-red transition-transform duration-200 group-hover:translate-x-1">
                  {card.linkText}
                </span>
              </motion.a>
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: easeExpoOut }}
            className="mb-12 font-display text-2xl font-bold text-text-primary"
          >
            KATEGORİLER
          </motion.h2>

          {filteredCategories.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCategories.map((cat, i) => (
                <motion.div
                  key={cat.title}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  variants={fadeUp}
                  className="flex gap-4 rounded-lg border border-border-subtle bg-bg-charcoal p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent-red/30"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-red/10">
                    <cat.icon className="h-5 w-5 text-accent-red" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-text-primary">
                      {cat.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-text-secondary">
                      {cat.desc}
                    </p>
                    <span className="mt-2 inline-block font-body text-xs font-medium text-text-muted">
                      {cat.count} makale
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: easeExpoOut }}
            className="mb-8 font-display text-xl font-bold text-text-primary"
          >
            POPÜLER MAKALELER
          </motion.h2>

          {filteredArticles.length > 0 ? (
            <div className="divide-y divide-border-subtle rounded-lg border border-border-subtle bg-bg-charcoal">
              {filteredArticles.map((article, i) => (
                <motion.a
                  key={article.title}
                  href="#"
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.3, delay: i * 0.06, ease: easeExpoOut },
                    },
                  }}
                  className="group flex items-center justify-between px-5 py-4 transition-all duration-200 hover:border-l-2 hover:border-l-accent-red hover:bg-[rgba(217,30,54,0.03)]"
                >
                  <div>
                    <h4 className="font-body text-base font-medium text-text-primary transition-colors group-hover:text-accent-red-light">
                      {article.title}
                    </h4>
                    <p className="mt-0.5 font-body text-xs text-text-muted">
                      {article.readTime} okuma — {article.category}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-text-muted transition-all duration-200 group-hover:translate-x-1 group-hover:text-accent-red" />
                </motion.a>
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
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mx-auto max-w-xl text-center"
        >
          <motion.div variants={staggerItem}>
            <Users className="mx-auto h-10 w-10 text-accent-red" />
          </motion.div>
          <motion.h2
            variants={staggerItem}
            className="mt-5 font-display text-2xl font-bold text-text-primary md:text-3xl"
          >
            Cevabı Bulamadınız mı?
          </motion.h2>
          <motion.p variants={staggerItem} className="mt-4 text-base leading-relaxed text-text-secondary">
            Topluluğumuza katılın ve diğer geliştiricilerden yardım alın.
          </motion.p>
          <motion.div
            variants={staggerItem}
            className="mt-8 flex flex-wrap justify-center gap-4"
          >
            <Link
              to="/topluluk"
              className="inline-flex items-center gap-2 rounded bg-accent-red px-7 py-3.5 font-body text-sm font-semibold uppercase tracking-wider text-white transition-all duration-200 hover:scale-[1.02] hover:bg-accent-red-light"
            >
              Topluluğa Katıl →
            </Link>
            <a
              href="https://github.com/ollamatr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded border border-border-subtle px-7 py-3.5 font-body text-sm font-semibold uppercase tracking-wider text-text-primary transition-all duration-200 hover:border-accent-red hover:text-accent-red-light"
            >
              GitHub'da Sor
            </a>
          </motion.div>
          <motion.p variants={staggerItem} className="mt-6 text-sm text-text-muted">
            Telegram grubumuzda 5.000+ geliştirici seni bekliyor.
          </motion.p>
        </motion.div>
      </section>
    </div>
  )
}
