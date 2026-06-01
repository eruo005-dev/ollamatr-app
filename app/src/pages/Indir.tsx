import { useState, useEffect, useMemo, useRef } from 'react'
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
  Copy,
  Check,
} from 'lucide-react'
import { easeExpoOut, fadeUp, staggerContainer, staggerChild } from '@/lib/animations'
import { useScrollReveal } from '@/hooks/useScrollReveal'

type OS = 'Windows' | 'macOS' | 'Linux'

/* ------------------------------------------------------------------ */
/*  OS Detection (userAgent-based)                                     */
/* ------------------------------------------------------------------ */
function detectOS(): OS {
  const ua = navigator.userAgent.toLowerCase()
  if (ua.includes('mac') || ua.includes('darwin')) return 'macOS'
  if (ua.includes('linux') || ua.includes('x11')) return 'Linux'
  return 'Windows'
}

function useDetectedOS(): OS {
  const [os] = useState<OS>(() => detectOS())
  return os
}

/* ------------------------------------------------------------------ */
/*  Count-up hook                                                      */
/* ------------------------------------------------------------------ */
function useCountUp(target: number, active: boolean, durationMs = 300): number {
  const [value, setValue] = useState(0)
  const startRef = useRef<number | null>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (!active) return
    startRef.current = null

    const tick = (ts: number) => {
      if (startRef.current === null) startRef.current = ts
      const elapsed = ts - startRef.current
      const progress = Math.min(1, elapsed / durationMs)
      setValue(Math.round(progress * target))
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [active, target, durationMs])

  return value
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const steps = [
  {
    num: 1,
    title: 'İndirin',
    desc: "180 MB'lık installer'ı tek tıkla indirin.",
    icon: Download,
  },
  {
    num: 2,
    title: 'Kurun',
    desc: 'Sihirbazı takip edin. Ollama, Open WebUI ve Türkçe modeller otomatik yüklenir.',
    icon: Settings,
  },
  {
    num: 3,
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

// TODO: replace with actual build artifact hash
const CHECKSUM_PLACEHOLDER =
  'a1b2c3d4e5f6789abcdef0123456789abcdef0123456789abcdef0123456789'

/* ------------------------------------------------------------------ */
/*  Step row — own scroll-reveal + count-up                            */
/* ------------------------------------------------------------------ */
interface StepRowProps {
  num: number
  title: string
  desc: string
  icon: typeof Download
  index: number
}

function StepRow({ num, title, desc, icon: Icon, index }: StepRowProps) {
  const { ref, visible } = useScrollReveal<HTMLDivElement>(0.4)
  const count = useCountUp(num, visible, 300)
  const display = count.toString().padStart(2, '0')

  return (
    <motion.div
      ref={ref}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={fadeUp}
      className={`flex gap-6 border-l pl-6 transition-colors duration-[400ms] ${
        visible ? 'border-accent-red' : 'border-border-subtle'
      }`}
    >
      <span className="shrink-0 pt-1 font-display text-2xl font-bold text-accent-red tabular-nums">
        {display}
      </span>
      <div>
        <div className="mb-1 flex items-center gap-3">
          <Icon className="h-5 w-5 text-text-secondary" />
          <h3 className="font-display text-xl font-bold text-text-primary">{title}</h3>
        </div>
        <p className="text-base leading-relaxed text-text-secondary">{desc}</p>
      </div>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  Checksum block — expandable + copy                                 */
/* ------------------------------------------------------------------ */
function ChecksumBlock({ hash }: { hash: string }) {
  const [expanded, setExpanded] = useState(false)
  const [copied, setCopied] = useState(false)

  const short = `${hash.slice(0, 16)}...`

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(hash)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      /* clipboard unavailable — silent */
    }
  }

  return (
    <div className="mt-4 flex flex-wrap items-center gap-2 font-mono text-[0.625rem] text-text-muted">
      <span className="break-all">
        SHA256: {expanded ? hash : short}
      </span>
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="rounded border border-border-subtle px-2 py-0.5 text-text-secondary transition-colors duration-200 hover:border-accent-red hover:text-accent-red-light"
      >
        {expanded ? 'Gizle' : "Tam hash'i göster"}
      </button>
      <button
        type="button"
        onClick={onCopy}
        aria-label="Hash'i kopyala"
        className="inline-flex items-center gap-1 rounded border border-border-subtle px-2 py-0.5 text-text-secondary transition-colors duration-200 hover:border-accent-red hover:text-accent-red-light"
      >
        {copied ? <Check className="h-3 w-3 text-safe-green" /> : <Copy className="h-3 w-3" />}
        {copied ? 'Kopyalandı' : 'Kopyala'}
      </button>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Installer preview — image with mock fallback                       */
/* ------------------------------------------------------------------ */
function InstallerPreview() {
  const [imgFailed, setImgFailed] = useState(false)

  if (imgFailed) {
    return (
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
          <p className="mt-2 text-sm text-text-secondary">Kuruluma Hoş Geldiniz</p>
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
    )
  }

  return (
    <img
      src="/installer-preview.png"
      alt="OllamaTR installer screenshot"
      loading="lazy"
      onError={() => setImgFailed(true)}
      className="block w-full rounded"
    />
  )
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function Indir() {
  const detectedOS = useDetectedOS()

  const otherOS = useMemo<OS[]>(
    () => (['Windows', 'macOS', 'Linux'] as OS[]).filter((o) => o !== detectedOS),
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
              variants={staggerChild}
              className="mb-4 inline-flex items-center gap-2 rounded bg-bg-surface px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-text-muted"
            >
              <Monitor className="h-3.5 w-3.5" />
              SİSTEMİNİZ: {detectedOS} tespit edildi
            </motion.div>

            {/* TODO: replace external URL when real installer ships */}
            <motion.button
              variants={staggerChild}
              type="button"
              onClick={() => {
                window.open(
                  'https://github.com/ollamatr/installer/releases/latest',
                  '_blank',
                  'noopener,noreferrer'
                )
              }}
              aria-label="OllamaTR installer indir"
              className="group flex items-center gap-4 rounded bg-accent-red px-8 py-5 text-left text-white transition-all duration-200 hover:scale-[1.02] hover:bg-accent-red-light"
            >
              <Download className="h-8 w-8 shrink-0" />
              <div>
                <div className="font-display text-xl font-bold">OllamaTR İndir</div>
                <div className="mt-0.5 font-body text-xs text-white/70">
                  v1.2.0 — 180 MB — Ücretsiz
                </div>
              </div>
            </motion.button>

            {/* Secondary OS buttons */}
            <motion.div variants={staggerChild} className="mt-6 flex flex-wrap gap-3">
              {otherOS.map((o) => (
                <button
                  key={o}
                  type="button"
                  className="rounded border border-border-subtle bg-transparent px-4 py-2 font-body text-sm font-medium text-text-primary transition-colors duration-200 hover:border-accent-red hover:text-accent-red-light"
                >
                  {o}
                </button>
              ))}
            </motion.div>

            {/* Checksum */}
            <motion.div variants={staggerChild}>
              <ChecksumBlock hash={CHECKSUM_PLACEHOLDER} />
            </motion.div>
          </motion.div>

          {/* Right — Installer preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: easeExpoOut }}
            className="rounded-lg border border-border-subtle bg-bg-surface p-8"
          >
            <InstallerPreview />
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
              <StepRow
                key={step.num}
                num={step.num}
                title={step.title}
                desc={step.desc}
                icon={step.icon}
                index={i}
              />
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
              'none',
          }}
        />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="relative mx-auto max-w-2xl text-center"
        >
          <motion.div variants={staggerChild}>
            <Shield className="mx-auto h-12 w-12 text-safe-green" />
          </motion.div>
          <motion.h3
            variants={staggerChild}
            className="mt-6 font-display text-2xl font-bold text-text-primary"
          >
            KVKK Uyumlu — Verileriniz Sizde Kalır
          </motion.h3>
          <motion.p variants={staggerChild} className="mt-4 text-base leading-relaxed text-text-secondary">
            Tüm model çalıştırma yerel donanımda gerçekleşir. Hiçbir veri sunucularımıza gönderilmez.
            KVKK kapsamında tam uyumlu.
          </motion.p>
          <motion.div variants={staggerChild} className="mt-8 flex flex-wrap justify-center gap-3">
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
          <motion.div variants={staggerChild} className="mt-8">
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
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">{item.desc}</p>
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
            {/* TODO: replace external URL when real installer ships */}
            <button
              type="button"
              onClick={() => {
                window.open(
                  'https://github.com/ollamatr/installer/releases/latest',
                  '_blank',
                  'noopener,noreferrer'
                )
              }}
              aria-label="OllamaTR installer indir"
              className="inline-flex items-center gap-2 rounded bg-accent-red px-7 py-3.5 font-body text-sm font-semibold uppercase tracking-wider text-white transition-all duration-200 hover:scale-[1.02] hover:bg-accent-red-light"
            >
              <Download className="h-4 w-4" />
              Hemen İndir
            </button>
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
