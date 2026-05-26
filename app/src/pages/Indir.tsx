import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router'
import { motion } from 'framer-motion'
import {
  Download,
  Settings,
  Rocket,
  Shield,
  Cpu,
  Globe,
  BookOpen,
  Zap,
  CheckCircle2,
  Monitor,
  Apple,

} from 'lucide-react'

type OS = 'Windows' | 'macOS' | 'Linux'

const easeExpoOut = [0.16, 1, 0.3, 1] as [number, number, number, number]

/* ------------------------------------------------------------------ */
/*  OS Detection                                                       */
/* ------------------------------------------------------------------ */
function useDetectedOS(): OS {
  const [os, setOs] = useState<OS>('Windows')
  useEffect(() => {
    const platform = navigator.platform.toLowerCase()
    if (platform.includes('mac') || platform.includes('darwin')) setOs('macOS')
    else if (platform.includes('linux')) setOs('Linux')
    else setOs('Windows')
  }, [])
  return os
}

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
const steps = [
  {
    num: '01',
    title: 'İndirin',
    desc: "180 MB'lık installer'ı tek tıkla indirin.",
    icon: Download,
  },
  {
    num: '02',
    title: 'Kurun',
    desc: 'Sihirbazı takip edin. Ollama, Open WebUI ve Türkçe modeller otomatik yüklenir.',
    icon: Settings,
  },
  {
    num: '03',
    title: 'Sohbet Edin',
    desc: "Tarayıcınızda localhost:3000'e gidin ve ilk Türkçe sohbetinizi başlatın.",
    icon: Rocket,
  },
]

const osRequirements = [
  {
    name: 'Windows' as OS,
    icon: Monitor,
    ram: '8GB minimum, 16GB önerilen',
    disk: '10GB boş alan',
    version: 'Windows 10+',
    internet: 'İlk kurulum için gerekli',
  },
  {
    name: 'macOS' as OS,
    icon: Apple,
    ram: '8GB minimum, 16GB önerilen',
    disk: '10GB boş alan',
    version: 'macOS 12+',
    internet: 'İlk kurulum için gerekli',
  },
  {
    name: 'Linux' as OS,
    icon: Cpu,
    ram: '8GB minimum, 16GB önerilen',
    disk: '10GB boş alan',
    version: 'Ubuntu 20.04+',
    internet: 'İlk kurulum için gerekli',
  },
]

const includedItems = [
  { icon: Cpu, title: 'Ollama Runtime', desc: 'Yerel LLM çalıştırma motoru. Otomatik kurulum.' },
  { icon: Globe, title: 'Open WebUI', desc: 'Türkçe arayüzlü chat platformu. Tarayıcıdan erişim.' },
  { icon: BookOpen, title: 'Türkçe Model Kataloğu', desc: '50+ Türkçe fine-tune model önceden yapılandırılmış.' },
  { icon: Shield, title: 'KVKK Yapılandırması', desc: 'GDPR/KVKK uyumlu varsayılan ayarlar.' },
  { icon: Zap, title: 'GPU Hızlandırma', desc: 'NVIDIA/AMD GPU otomatik algılama ve optimizasyon.' },
  { icon: Settings, title: 'Otomatik Güncelleme', desc: 'Yeni model ve özellikler otomatik indirilir.' },
]

const trustPoints = [
  'Sunucuya veri gitmez',
  'KVKK tam uyumlu',
  'Ağ bağlantısı gerekmez',
]

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function Indir() {
  const detectedOS = useDetectedOS()

  const otherOS = useMemo<OS[]>(
    () => ['Windows', 'macOS', 'Linux'].filter((o) => o !== detectedOS) as OS[],
    [detectedOS]
  )

  return (
    <div>
      {/* ============================================================ */}
      {/* SECTION 1 — Page Header                                      */}
      {/* ============================================================ */}
      <section className="bg-bg-obsidian px-6 pt-40 pb-16 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeExpoOut }}
            className="mb-4 inline-block font-body text-sm font-medium uppercase tracking-wider text-accent-red"
          >
            İNDİR
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: easeExpoOut }}
            className="font-display text-4xl font-bold leading-tight text-text-primary md:text-5xl lg:text-6xl"
          >
            Yerel AI'nizi Kurun
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22, ease: easeExpoOut }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-text-secondary"
          >
            Tauri tabanlı installer ile Ollama + Open WebUI + Türkçe modeller tek pakette.
            Docker bilgisi gerektirmez. 2 dakikada hazır.
          </motion.p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 2 — Download Hero                                    */}
      {/* ============================================================ */}
      <section className="bg-bg-charcoal px-6 py-20 lg:px-10">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          {/* Left */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
          >
            <motion.div
              variants={staggerItem}
              className="mb-4 inline-flex items-center gap-2 rounded bg-bg-surface px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-text-muted"
            >
              <Monitor className="h-3.5 w-3.5" />
              SİSTEMİNİZ: {detectedOS} tespit edildi
            </motion.div>

            <motion.a
              variants={staggerItem}
              href="#"
              className="group flex items-center gap-4 rounded bg-accent-red px-8 py-5 text-white transition-all duration-200 hover:scale-[1.02] hover:bg-accent-red-light"
            >
              <Download className="h-8 w-8 shrink-0" />
              <div>
                <div className="font-display text-xl font-bold">
                  OllamaTR İndir
                </div>
                <div className="mt-0.5 font-body text-xs text-white/70">
                  v1.2.0 — 180 MB — Ücretsiz
                </div>
              </div>
            </motion.a>

            {/* Secondary OS buttons */}
            <motion.div variants={staggerItem} className="mt-6 flex flex-wrap gap-3">
              {otherOS.map((o) => (
                <button
                  key={o}
                  className="rounded border border-border-subtle bg-transparent px-4 py-2 font-body text-sm font-medium text-text-primary transition-colors duration-200 hover:border-accent-red hover:text-accent-red-light"
                >
                  {o}
                </button>
              ))}
            </motion.div>

            {/* Checksum */}
            <motion.p
              variants={staggerItem}
              className="mt-4 break-all font-mono text-[0.625rem] text-text-muted"
            >
              SHA256: a1b2c3d4e5f6789abcdef0123456789abcdef0123456789abcdef0123456789
            </motion.p>
          </motion.div>

          {/* Right — Installer preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: easeExpoOut }}
            className="rounded-lg border border-border-subtle bg-bg-surface p-8"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-accent-red" />
                <div className="h-3 w-3 rounded-full bg-warn-yellow" />
                <div className="h-3 w-3 rounded-full bg-safe-green" />
              </div>
              <div className="rounded border border-border-subtle bg-bg-obsidian p-6">
                <h3 className="font-display text-lg font-bold text-text-primary">
                  OllamaTR Kurulum Sihirbazı
                </h3>
                <p className="mt-2 text-sm text-text-secondary">
                  Kuruluma Hoş Geldiniz
                </p>
                <div className="mt-4 space-y-2">
                  <div className="h-2 w-full rounded bg-bg-charcoal" />
                  <div className="h-2 w-3/4 rounded bg-bg-charcoal" />
                </div>
                <div className="mt-4 flex gap-2">
                  <span className="inline-block rounded bg-accent-red px-3 py-1.5 font-body text-xs font-semibold text-white">
                    İleri
                  </span>
                  <span className="inline-block rounded border border-border-subtle px-3 py-1.5 font-body text-xs text-text-secondary">
                    İptal
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 3 — Installation Steps                               */}
      {/* ============================================================ */}
      <section className="bg-bg-obsidian px-6 py-28 lg:px-10">
        <div className="mx-auto max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: easeExpoOut }}
            className="mb-16 text-center font-display text-3xl font-bold text-text-primary md:text-4xl"
          >
            3 ADIMDA HAZIR
          </motion.h2>

          <div className="space-y-12">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                variants={fadeUp}
                className="flex gap-6 border-l border-border-subtle pl-6 transition-colors duration-500 hover:border-accent-red"
              >
                <span className="shrink-0 pt-1 font-display text-2xl font-bold text-accent-red">
                  {step.num}
                </span>
                <div>
                  <div className="mb-1 flex items-center gap-3">
                    <step.icon className="h-5 w-5 text-text-secondary" />
                    <h3 className="font-display text-xl font-bold text-text-primary">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-base leading-relaxed text-text-secondary">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 4 — System Requirements                              */}
      {/* ============================================================ */}
      <section className="bg-bg-charcoal px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: easeExpoOut }}
            className="mb-12 text-center font-display text-2xl font-bold text-text-primary md:text-3xl"
          >
            SİSTEM GEREKSİNİMLERİ
          </motion.h2>

          <div className="grid gap-6 md:grid-cols-3">
            {osRequirements.map((os, i) => (
              <motion.div
                key={os.name}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                variants={fadeUp}
                className="rounded-lg border border-border-subtle bg-bg-obsidian p-6"
              >
                <div className="mb-4 flex items-center gap-3">
                  <os.icon className="h-6 w-6 text-accent-red" />
                  <h3 className="font-display text-base font-bold text-text-primary">
                    {os.name}
                  </h3>
                </div>
                <div className="space-y-3 border-t border-border-subtle pt-4">
                  {[
                    `RAM: ${os.ram}`,
                    `Disk: ${os.disk}`,
                    `İşletim Sistemi: ${os.version}`,
                    `İnternet: ${os.internet}`,
                  ].map((line) => (
                    <p key={line} className="text-sm leading-relaxed text-text-secondary">
                      {line}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 5 — KVKK Trust Banner                                */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden bg-bg-obsidian px-6 py-20 lg:px-10">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(0, 229, 160, 0.06) 0%, transparent 70%)',
          }}
        />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="relative mx-auto max-w-2xl text-center"
        >
          <motion.div variants={staggerItem}>
            <Shield className="mx-auto h-12 w-12 text-safe-green" />
          </motion.div>
          <motion.h3
            variants={staggerItem}
            className="mt-6 font-display text-2xl font-bold text-text-primary"
          >
            KVKK Uyumlu — Verileriniz Sizde Kalır
          </motion.h3>
          <motion.p variants={staggerItem} className="mt-4 text-base leading-relaxed text-text-secondary">
            Tüm model çalıştırma yerel donanımda gerçekleşir. Hiçbir veri sunucularımıza gönderilmez.
            KVKK kapsamında tam uyumlu.
          </motion.p>
          <motion.div variants={staggerItem} className="mt-8 flex flex-wrap justify-center gap-3">
            {trustPoints.map((pt) => (
              <span
                key={pt}
                className="inline-flex items-center gap-1.5 rounded-full bg-bg-surface px-3 py-1.5 font-body text-sm text-text-secondary"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-safe-green" />
                {pt}
              </span>
            ))}
          </motion.div>
          <motion.div variants={staggerItem} className="mt-8">
            <Link
              to="/kvkk"
              className="inline-flex items-center gap-2 rounded border border-border-subtle px-5 py-2.5 font-body text-sm font-medium text-text-primary transition-colors duration-200 hover:border-accent-red hover:text-accent-red-light"
            >
              KVKK Detayları →
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 6 — What's Included                                  */}
      {/* ============================================================ */}
      <section className="bg-bg-charcoal px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: easeExpoOut }}
            className="mb-12 text-center font-display text-2xl font-bold text-text-primary md:text-3xl"
          >
            PAKETTE NELER VAR?
          </motion.h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {includedItems.map((item, i) => (
              <motion.div
                key={item.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                variants={fadeUp}
                className="rounded-lg border border-border-subtle bg-bg-obsidian p-6 transition-all duration-200 hover:-translate-y-1 hover:border-accent-red/40"
              >
                <item.icon className="h-8 w-8 text-accent-red" />
                <h3 className="mt-4 font-display text-base font-bold text-text-primary">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 7 — CTA                                              */}
      {/* ============================================================ */}
      <section className="bg-bg-obsidian px-6 py-28 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: easeExpoOut }}
          className="mx-auto max-w-xl text-center"
        >
          <h2 className="font-display text-3xl font-bold text-text-primary md:text-4xl">
            Hâlâ Bekliyor musunuz?
          </h2>
          <p className="mt-4 text-lg text-text-secondary">
            10.000+ geliştirici yerel AI'ye geçti. Siz de aramıza katılın.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded bg-accent-red px-7 py-3.5 font-body text-sm font-semibold uppercase tracking-wider text-white transition-all duration-200 hover:scale-[1.02] hover:bg-accent-red-light"
            >
              <Download className="h-4 w-4" />
              Hemen İndir
            </a>
            <Link
              to="/dokumantasyon"
              className="inline-flex items-center gap-2 rounded border border-border-subtle px-7 py-3.5 font-body text-sm font-semibold uppercase tracking-wider text-text-primary transition-all duration-200 hover:border-accent-red hover:text-accent-red-light"
            >
              Dokümantasyon
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
