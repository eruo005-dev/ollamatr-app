import { useState, useRef, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import {
  MessageSquare,
  Terminal,
  FileText,
  Database,
  Languages,
  Star,
  Zap,
  Cpu,
  Target,
  Globe,
  Award,
  Gauge,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  RotateCcw,
  ChevronRight,
  Sparkles,
  Search,
  Rocket,
  HelpCircle,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Link } from 'react-router'
import { MODELS, type Model, type UseCase } from '@/lib/models-data'

/* ------------------------------------------------------------------ */
/*  Data                                                              */
/* ------------------------------------------------------------------ */

interface UseCaseOption {
  id: string
  icon: LucideIcon
  title: string
  desc: string
}

interface RamOption {
  value: number
  label: string
}

interface SkillOption {
  id: string
  icon: LucideIcon
  title: string
  desc: string
}

interface PriorityOption {
  id: string
  icon: LucideIcon
}

/* ---- Wizard use-case → canonical UseCase taxonomy mapping ---- */
const WIZARD_USECASE_MAP: Record<string, UseCase[]> = {
  'Genel Sohbet & Asistan': ['Sohbet', 'Genel Amaçlı', 'Soru-Cevap'],
  'Kod Yazma & Teknik': ['Kod'],
  'İçerik Üretimi': ['Genel Amaçlı', 'Özetleme'],
  'Veri Analizi & SQL': ['Kod', 'Soru-Cevap'],
  'Çeviri & Özetleme': ['Çeviri', 'Özetleme'],
}

/* ---- Multilingual / translation-capable model heuristic ---- */
const MULTILINGUAL_TAGS = new Set([
  'Çok Dilli',
  'Çeviri',
  'Multilingual',
])

function isMultilingual(model: Model): boolean {
  if (model.useCases.includes('Çeviri')) return true
  return model.tags.some((t) => MULTILINGUAL_TAGS.has(t))
}

/* ---- Code-capable model heuristic ---- */
function isCodeCapable(model: Model): boolean {
  return model.useCases.includes('Kod')
}

const useCaseOptions: UseCaseOption[] = [
  {
    id: 'Genel Sohbet & Asistan',
    icon: MessageSquare,
    title: 'Genel Sohbet & Asistan',
    desc: 'Günlük sohbet ve genel yardımcı',
  },
  {
    id: 'Kod Yazma & Teknik',
    icon: Terminal,
    title: 'Kod Yazma & Teknik',
    desc: 'Kod üretimi, debugging, teknik yardım',
  },
  {
    id: 'İçerik Üretimi',
    icon: FileText,
    title: 'İçerik Üretimi',
    desc: 'Blog, makale, pazarlama metni',
  },
  {
    id: 'Veri Analizi & SQL',
    icon: Database,
    title: 'Veri Analizi & SQL',
    desc: 'Veri sorgulama ve analiz',
  },
  {
    id: 'Çeviri & Özetleme',
    icon: Languages,
    title: 'Çeviri & Özetleme',
    desc: 'Döküman çevirisi, metin özetleme',
  },
]

const ramOptions: RamOption[] = [
  { value: 8, label: '8GB ve altı' },
  { value: 16, label: '16GB' },
  { value: 32, label: '32GB' },
  { value: 64, label: '64GB+' },
  { value: 0, label: 'Bilmiyorum' },
]

const skillOptions: SkillOption[] = [
  {
    id: 'Yeni Başlayan',
    icon: Star,
    title: 'Yeni Başlayan',
    desc: 'Yeni başlıyorum, kolay kurulum istiyorum',
  },
  {
    id: 'Orta Seviye',
    icon: Zap,
    title: 'Orta Seviye',
    desc: 'Teknik bilgim var, ayarları yapabilirim',
  },
  {
    id: 'İleri Seviye',
    icon: Cpu,
    title: 'İleri Seviye',
    desc: 'Komut satırı ve yapılandırmaya hâkimim',
  },
  {
    id: 'Uzman',
    icon: Award,
    title: 'Uzman',
    desc: 'Uzmanım, en iyi performansı isterim',
  },
]

const priorityOptions: PriorityOption[] = [
  { id: 'Hız (düşük latency)', icon: Zap },
  { id: 'Doğruluk (en iyi cevaplar)', icon: Target },
  { id: 'Çok dilli (İngilizce + Türkçe)', icon: Globe },
  { id: 'Kod yeteneği', icon: Terminal },
  { id: 'Düşük kaynak tüketimi', icon: Gauge },
]

const MAX_PRIORITIES = 2

/* ------------------------------------------------------------------ */
/*  Matching Algorithm                                                */
/* ------------------------------------------------------------------ */

/* ---- Skill → expected RAM tier (heavier model for advanced users) ---- */
const SKILL_RAM_TARGET: Record<string, number> = {
  'Yeni Başlayan': 6,
  'Orta Seviye': 9,
  'İleri Seviye': 13,
  Uzman: 16,
}

/* ---- Qualitative match label (no false-precise percentage) ---- */
type MatchLevel = 'Güçlü uyum' | 'İyi uyum' | 'Kısmi uyum'

function matchLevelFromScore(score: number, maxScore: number): MatchLevel {
  if (maxScore <= 0) return 'Kısmi uyum'
  const ratio = score / maxScore
  if (ratio >= 0.75) return 'Güçlü uyum'
  if (ratio >= 0.5) return 'İyi uyum'
  return 'Kısmi uyum'
}

function findBestModel(
  wizardUseCase: string,
  ram: number,
  skill: string,
  priorities: string[]
): { best: Model; alternatives: Model[]; matchLevel: MatchLevel } {
  // Treat "Bilmiyorum" (0) as 16GB default for matching
  const effectiveRam = ram > 0 ? ram : 16

  // Canonical use cases mapped from the wizard question
  const targetUseCases = WIZARD_USECASE_MAP[wizardUseCase] ?? ['Genel Amaçlı']

  // Filter: RAM must fit, at least one canonical use case must match
  let candidates = MODELS.filter(
    (m) =>
      m.ramGB <= effectiveRam &&
      m.useCases.some((uc) => targetUseCases.includes(uc))
  )

  if (candidates.length === 0) {
    // Fallback: just RAM fit
    candidates = MODELS.filter((m) => m.ramGB <= effectiveRam)
    if (candidates.length === 0) {
      // Ultimate fallback: smallest commercial models
      candidates = MODELS.filter((m) => m.ramGB <= 8)
      if (candidates.length === 0) candidates = [MODELS[0]]
    }
  }

  const targetRam = SKILL_RAM_TARGET[skill] ?? 8

  // Score each candidate
  const scored = candidates.map((m) => {
    let score = 0

    // Use-case match strength (0-30): how many of the mapped canonical
    // use cases the model covers
    const ucOverlap = m.useCases.filter((uc) =>
      targetUseCases.includes(uc)
    ).length
    score += Math.min(30, ucOverlap * 15)

    // Skill ↔ model-size affinity (0-25): models whose ramGB is close to
    // the skill's target RAM tier (and still fits) score higher
    const cappedTarget = Math.min(targetRam, effectiveRam)
    const skillDelta = Math.abs(m.ramGB - cappedTarget)
    score += Math.max(0, 25 - skillDelta * 3)

    // Priority matches (0-30)
    if (priorities.length > 0) {
      let pScore = 0
      for (const p of priorities) {
        switch (p) {
          case 'Hız (düşük latency)':
            // Smaller models are faster
            pScore += m.ramGB <= 8 ? 15 : m.ramGB <= 12 ? 8 : 0
            break
          case 'Doğruluk (en iyi cevaplar)':
            // Larger models (more parameters ≈ more RAM) tend to give
            // stronger answers. Scored on real size, not invented ratings.
            pScore += m.ramGB >= 8 ? 15 : m.ramGB >= 6 ? 8 : 3
            break
          case 'Çok dilli (İngilizce + Türkçe)':
            pScore += isMultilingual(m) ? 15 : 0
            break
          case 'Kod yeteneği':
            pScore += isCodeCapable(m) ? 15 : 0
            break
          case 'Düşük kaynak tüketimi':
            pScore += m.ramGB < 8 ? 15 : m.ramGB <= 10 ? 8 : 0
            break
          default:
            break
        }
      }
      score += Math.min(30, (pScore / priorities.length) * 2)
    }

    // RAM efficiency bonus (0-15): reward using available RAM
    const ramUtilization = Math.min(1, m.ramGB / effectiveRam)
    score += ramUtilization * 15

    return { model: m, score }
  })

  // Theoretical maximum across the four real scoring components above:
  // use-case (30) + skill affinity (25) + priorities (30) + RAM efficiency (15).
  const MAX_SCORE = 100

  scored.sort((a, b) => b.score - a.score)

  const best = scored[0]?.model ?? MODELS[0]
  const alternatives: Model[] = scored
    .slice(1, 3)
    .map((s) => s.model)
    .filter((m) => m.id !== best.id)

  // Ensure we have 2 alternatives
  while (alternatives.length < 2) {
    const fallback = MODELS.find(
      (m) =>
        m.id !== best.id &&
        !alternatives.some((a) => a.id === m.id)
    )
    if (fallback) alternatives.push(fallback)
    else break
  }

  const matchLevel = matchLevelFromScore(scored[0]?.score ?? 0, MAX_SCORE)

  return { best, alternatives, matchLevel }
}

/* ------------------------------------------------------------------ */
/*  RAM Badge Color Helper                                            */
/* ------------------------------------------------------------------ */

function getRamColor(ram: number): string {
  if (ram < 8) return '#00E5A0'
  if (ram <= 16) return '#FFB800'
  return '#D91E36'
}

/* ---- prefers-reduced-motion check for interaction-driven tweens ---- */
function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/* ------------------------------------------------------------------ */
/*  Refs container type                                               */
/* ------------------------------------------------------------------ */

interface DomRefs {
  container: HTMLDivElement | null
  wizard: HTMLDivElement | null
  stepContent: HTMLDivElement | null
  loadingBar: HTMLDivElement | null
  loadingText: HTMLSpanElement | null
  resultCard: HTMLDivElement | null
  hero: HTMLElement | null
  nasil: HTMLElement | null
  cta: HTMLElement | null
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                    */
/* ------------------------------------------------------------------ */

export default function HangiModel() {
  const navigate = useNavigate()

  // Consolidated DOM refs in a single useRef object
  const domRefs = useRef<DomRefs>({
    container: null,
    wizard: null,
    stepContent: null,
    loadingBar: null,
    loadingText: null,
    resultCard: null,
    hero: null,
    nasil: null,
    cta: null,
  })

  // Scope refs for useGSAP — must be standalone refs for useGSAP scope
  const heroScope = useRef<HTMLElement>(null)
  const wizardScope = useRef<HTMLDivElement>(null)
  const nasilScope = useRef<HTMLElement>(null)
  const ctaScope = useRef<HTMLElement>(null)

  const [step, setStep] = useState(1)
  const [useCase, setUseCase] = useState('')
  const [ram, setRam] = useState<number | null>(null)
  const [skill, setSkill] = useState('')
  const [priorities, setPriorities] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{
    best: Model
    alternatives: Model[]
    matchLevel: MatchLevel
  } | null>(null)

  // Cancellation ref for async loading flow
  const cancelledRef = useRef(false)

  /* ---- Register GSAP plugins as a side effect, not at module load ---- */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
  }, [])

  /* ---- Unmount cancellation flag ---- */
  useEffect(() => {
    return () => {
      cancelledRef.current = true
    }
  }, [])

  /* ---- GSAP: Hero entrance (guarded for reduced motion) ---- */
  useGSAP(
    () => {
      if (!heroScope.current) return
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const els = heroScope.current!.querySelectorAll('.hero-animate')
        gsap.from(els, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'expo.out',
          delay: 0.2,
        })
      })
      return () => mm.revert()
    },
    { scope: heroScope }
  )

  /* ---- GSAP: Wizard entrance (guarded for reduced motion) ---- */
  useGSAP(
    () => {
      if (!wizardScope.current) return
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from(wizardScope.current!, {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: 'expo.out',
          delay: 0.5,
        })
      })
      return () => mm.revert()
    },
    { scope: wizardScope }
  )

  /* ---- GSAP: Nasıl Çalışır scroll (guarded for reduced motion) ---- */
  useGSAP(
    () => {
      if (!nasilScope.current) return
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const steps = nasilScope.current!.querySelectorAll('.process-step')
        gsap.from(steps, {
          y: 30,
          opacity: 0,
          scale: 0.8,
          duration: 0.5,
          stagger: 0.15,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: nasilScope.current,
            start: 'top 80%',
            once: true,
          },
        })
      })
      return () => mm.revert()
    },
    { scope: nasilScope }
  )

  /* ---- GSAP: CTA scroll (guarded for reduced motion) ---- */
  useGSAP(
    () => {
      if (!ctaScope.current) return
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from(ctaScope.current!.querySelectorAll('.cta-animate'), {
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: ctaScope.current,
            start: 'top 85%',
            once: true,
          },
        })
      })
      return () => mm.revert()
    },
    { scope: ctaScope }
  )

  /* ---- Step transition (guarded for reduced motion) ---- */
  const animateStepTransition = useCallback(
    (direction: 'forward' | 'backward', onComplete: () => void) => {
      const target = domRefs.current.stepContent
      if (!target) {
        onComplete()
        return
      }
      if (prefersReducedMotion()) {
        // No motion: advance immediately with the panel fully visible.
        gsap.set(target, { opacity: 1, x: 0 })
        onComplete()
        return
      }
      const tl = gsap.timeline({ onComplete })
      tl.to(target, {
        opacity: 0,
        x: direction === 'forward' ? -20 : 20,
        duration: 0.25,
        ease: 'power2.in',
      })
      tl.set(target, {
        x: direction === 'forward' ? 20 : -20,
      })
      tl.to(target, {
        opacity: 1,
        x: 0,
        duration: 0.35,
        ease: 'expo.out',
      })
    },
    []
  )

  /* ---- Loading animation (typewriter removed; bar guarded) ---- */
  const runLoadingAnimation = useCallback(() => {
    const bar = domRefs.current.loadingBar
    const textEl = domRefs.current.loadingText
    if (!bar || !textEl) return

    // Static label — no typewriter effect.
    textEl.textContent = 'Model seçiliyor…'

    if (prefersReducedMotion()) {
      // No motion: show the bar already full.
      gsap.set(bar, { width: '100%' })
      return
    }

    // Progress bar
    gsap.fromTo(
      bar,
      { width: '0%' },
      { width: '100%', duration: 1.5, ease: 'power2.inOut' }
    )
  }, [])

  /* ---- Result animation (guarded for reduced motion) ---- */
  const animateResult = useCallback(() => {
    const card = domRefs.current.resultCard
    if (!card) return
    // With reduced motion the card and alternatives render fully visible
    // without any entrance tween.
    if (prefersReducedMotion()) return

    gsap.from(card, {
      scale: 0.9,
      opacity: 0,
      duration: 0.5,
      ease: 'expo.out',
      delay: 0.1,
    })

    const altCards = card.querySelectorAll('.alt-card')
    gsap.from(altCards, {
      y: 20,
      opacity: 0,
      duration: 0.4,
      stagger: 0.1,
      ease: 'expo.out',
      delay: 0.4,
    })
  }, [])

  /* ---- Navigation ---- */
  const goForward = useCallback(() => {
    animateStepTransition('forward', () => setStep((s) => s + 1))
  }, [animateStepTransition])

  const goBackward = useCallback(() => {
    animateStepTransition('backward', () => setStep((s) => s - 1))
  }, [animateStepTransition])

  /* ---- Submit (async, cancellable) ---- */
  const handleStep4Submit = useCallback(() => {
    setIsLoading(true)
    setStep(5)

    const wait = (ms: number): Promise<void> =>
      new Promise((resolve) => setTimeout(resolve, ms))

    const run = async (): Promise<void> => {
      // Tick so DOM is ready for refs
      await wait(50)
      if (cancelledRef.current) return
      runLoadingAnimation()

      // Loading window
      await wait(1700)
      if (cancelledRef.current) return

      const res = findBestModel(useCase, ram ?? 16, skill, priorities)
      setResult(res)
      setIsLoading(false)

      // Allow DOM update before animating
      await wait(50)
      if (cancelledRef.current) return
      animateResult()
    }

    void run()
  }, [useCase, ram, skill, priorities, runLoadingAnimation, animateResult])

  const resetWizard = useCallback(() => {
    setUseCase('')
    setRam(null)
    setSkill('')
    setPriorities([])
    setResult(null)
    setIsLoading(false)
    setStep(1)
  }, [])

  /* ---- Priority toggle with max-2 enforcement ---- */
  const togglePriority = useCallback((id: string) => {
    setPriorities((prev) => {
      if (prev.includes(id)) {
        return prev.filter((p) => p !== id)
      }
      if (prev.length >= MAX_PRIORITIES) {
        // Refuse to add — max reached
        return prev
      }
      return [...prev, id]
    })
  }, [])

  /* ---- Keyboard support: ref-based, register ONCE on mount ---- */
  interface KeyboardState {
    step: number
    useCase: string
    ram: number | null
    skill: string
    priorities: string[]
    isLoading: boolean
    goForward: () => void
    handleStep4Submit: () => void
    resetWizard: () => void
  }

  const keyboardStateRef = useRef<KeyboardState>({
    step,
    useCase,
    ram,
    skill,
    priorities,
    isLoading,
    goForward,
    handleStep4Submit,
    resetWizard,
  })

  // Sync state into the ref each render — handler reads latest via ref
  useEffect(() => {
    keyboardStateRef.current = {
      step,
      useCase,
      ram,
      skill,
      priorities,
      isLoading,
      goForward,
      handleStep4Submit,
      resetWizard,
    }
  }, [
    step,
    useCase,
    ram,
    skill,
    priorities,
    isLoading,
    goForward,
    handleStep4Submit,
    resetWizard,
  ])

  // Register handler exactly ONCE
  useEffect(() => {
    const handler = (e: KeyboardEvent): void => {
      const s = keyboardStateRef.current

      if (s.step === 5 && !s.isLoading) {
        if (e.key === 'r' || e.key === 'R') s.resetWizard()
        return
      }

      // Numeric step-1 shortcut with bounds check
      if (s.step === 1 && /^[0-9]$/.test(e.key)) {
        const idx = parseInt(e.key, 10) - 1
        if (idx >= 0 && idx < useCaseOptions.length) {
          setUseCase(useCaseOptions[idx].id)
        }
        return
      }

      if (e.key === 'Enter') {
        if (s.step === 1 && s.useCase) s.goForward()
        else if (s.step === 2 && s.ram !== null) s.goForward()
        else if (s.step === 3 && s.skill) s.goForward()
        else if (s.step === 4 && s.priorities.length > 0)
          s.handleStep4Submit()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  /* ---------------------------------------------------------------- */
  /*  Render                                                          */
  /* ---------------------------------------------------------------- */

  return (
    <div
      ref={(el) => {
        domRefs.current.container = el
      }}
    >
      {/* ======== HERO SECTION ======== */}
      <section
        ref={(el) => {
          domRefs.current.hero = el
          heroScope.current = el
        }}
        className="relative bg-bg-obsidian px-6 pt-40 pb-20 lg:px-10"
      >
        <div className="mx-auto max-w-4xl text-center">
          <span className="hero-animate mb-4 inline-block font-body text-sm font-medium tracking-wide text-accent-red-light">
            MODEL SİHİRBAZI
          </span>
          <h1 className="hero-animate font-display text-4xl font-bold leading-tight tracking-tight text-text-primary md:text-5xl lg:text-[4rem]">
            Hangi Model Size Uygun?
          </h1>
          <p className="hero-animate mx-auto mt-6 max-w-2xl text-lg text-text-secondary">
            5 soruluk interaktif sihirbaz ile kullanım alanınıza, RAM
            miktarınıza ve tecrübe seviyenize en uygun modeli bulun.
          </p>
        </div>
      </section>

      {/* ======== TERMINAL WIZARD ======== */}
      <section className="bg-bg-charcoal px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-[800px]">
          <div
            ref={(el) => {
              domRefs.current.wizard = el
              wizardScope.current = el
            }}
            className="relative overflow-hidden rounded-xl border border-border-subtle p-6 md:p-12"
            style={{
              backgroundColor: '#0A0A0F',
            }}
          >
            {/* Terminal top bar */}
            <div className="mb-8 flex items-center gap-3 border-b border-border-subtle pb-4">
              <div className="flex items-center gap-2">
                <span className="inline-block h-3 w-3 rounded-full bg-[#FF5F56]" />
                <span className="inline-block h-3 w-3 rounded-full bg-[#FFBD2E]" />
                <span className="inline-block h-3 w-3 rounded-full bg-[#27C93F]" />
              </div>
              <span className="ml-4 font-mono text-xs tracking-wide text-text-muted">
                ollamatr-wizard
              </span>
              <span className="ml-auto font-mono text-xs text-text-muted">
                {step}/5
              </span>
            </div>

            {/* Progress indicator / stepper — progressbar semantics */}
            <div
              role="progressbar"
              aria-label="Sihirbaz ilerlemesi"
              aria-valuenow={step}
              aria-valuemin={1}
              aria-valuemax={5}
              aria-valuetext={`Adım ${step} / 5`}
              className="mb-8 flex items-center gap-2"
            >
              {[1, 2, 3, 4, 5].map((s) => (
                <div
                  key={s}
                  aria-hidden="true"
                  className="h-1 flex-1 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor:
                      s <= step
                        ? 'rgba(217, 30, 54, 0.8)'
                        : 'rgba(244, 244, 245, 0.08)',
                  }}
                />
              ))}
            </div>

            {/* Step content panel */}
            <div
              ref={(el) => {
                domRefs.current.stepContent = el
              }}
              aria-live="polite"
            >
              {/* ---- STEP 1: USE CASE ---- */}
              {step === 1 && (
                <div>
                  <h3 className="mb-2 font-display text-xl font-bold text-text-primary">
                    Modeli ne amaçla kullanacaksınız?
                  </h3>
                  <p className="mb-6 text-sm text-text-secondary">
                    Kullanım alanınıza en uygun modeli önermemiz için
                    seçim yapın.
                  </p>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {useCaseOptions.map((opt) => {
                      const Icon = opt.icon
                      const selected = useCase === opt.id
                      return (
                        <button
                          key={opt.id}
                          onClick={() => setUseCase(opt.id)}
                          aria-pressed={selected}
                          className="group relative flex flex-col items-start gap-3 rounded-lg border p-5 text-left transition-all duration-200"
                          style={{
                            backgroundColor: selected
                              ? 'rgba(217, 30, 54, 0.08)'
                              : 'var(--bg-surface)',
                            borderColor: selected
                              ? 'rgba(217, 30, 54, 0.8)'
                              : 'rgba(244, 244, 245, 0.08)',
                            borderLeftWidth: selected ? '3px' : '1px',
                            borderLeftColor: selected
                              ? 'var(--accent-red-deep)'
                              : 'transparent',
                          }}
                        >
                          <Icon
                            className="h-6 w-6 transition-colors"
                            style={{
                              color: selected
                                ? 'var(--accent-red-deep)'
                                : 'var(--text-secondary)',
                            }}
                          />
                          <div>
                            <div className="font-display text-sm font-bold text-text-primary">
                              {opt.title}
                            </div>
                            <div className="mt-1 text-xs text-text-secondary">
                              {opt.desc}
                            </div>
                          </div>
                        </button>
                      )
                    })}
                  </div>

                  <div className="mt-8 flex justify-end">
                    <button
                      onClick={goForward}
                      disabled={!useCase}
                      className="inline-flex items-center gap-2 rounded px-6 py-3 text-sm font-semibold tracking-wide text-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-40"
                      style={{
                        backgroundColor: useCase
                          ? 'var(--accent-red-deep)'
                          : 'rgba(244,244,245,0.1)',
                      }}
                    >
                      Devam Et
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* ---- STEP 2: RAM ---- */}
              {step === 2 && (
                <div>
                  <h3 className="mb-2 font-display text-xl font-bold text-text-primary">
                    Bilgisayarınızda ne kadar RAM var?
                  </h3>
                  <p className="mb-6 text-sm text-text-secondary">
                    Görev Yöneticisi&apos;ni (Ctrl+Shift+Esc) açarak
                    kontrol edebilirsiniz.
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {ramOptions.map((opt) => {
                      const selected = ram === opt.value
                      const isUnknown = opt.value === 0
                      const borderColor = isUnknown
                        ? 'var(--text-muted)'
                        : opt.value <= 8
                          ? '#00E5A0'
                          : opt.value <= 16
                            ? '#FFB800'
                            : '#D91E36'

                      return (
                        <button
                          key={opt.value}
                          onClick={() => setRam(opt.value)}
                          aria-pressed={selected}
                          className="relative rounded-lg border px-8 py-4 font-mono text-sm tracking-wide transition-colors duration-200"
                          style={{
                            backgroundColor: selected
                              ? 'var(--bg-surface)'
                              : 'transparent',
                            borderColor: selected
                              ? borderColor
                              : 'rgba(244, 244, 245, 0.08)',
                            color: selected
                              ? borderColor
                              : 'var(--text-secondary)',
                          }}
                        >
                          {opt.label}
                        </button>
                      )
                    })}
                  </div>

                  <div className="mt-4 flex items-center gap-2 rounded-lg border border-border-subtle bg-bg-surface p-3">
                    <HelpCircle className="h-4 w-4 flex-shrink-0 text-text-muted" />
                    <span className="text-xs text-text-secondary">
                      Bilgisayarınızda ne kadar RAM olduğunu bilmiyor
                      musunuz? Görev Yöneticisi &gt; Performans &gt;
                      Bellek sekmesinden kontrol edebilirsiniz.
                    </span>
                  </div>

                  <div className="mt-8 flex justify-between">
                    <button
                      onClick={goBackward}
                      className="inline-flex items-center gap-2 rounded border border-border-subtle px-5 py-2.5 text-sm font-medium text-text-primary transition-all duration-200 hover:border-accent-red hover:text-accent-red-light"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Geri
                    </button>
                    <button
                      onClick={goForward}
                      disabled={ram === null}
                      className="inline-flex items-center gap-2 rounded px-6 py-3 text-sm font-semibold tracking-wide text-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-40"
                      style={{
                        backgroundColor:
                          ram !== null
                            ? 'var(--accent-red-deep)'
                            : 'rgba(244,244,245,0.1)',
                      }}
                    >
                      Devam Et
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* ---- STEP 3: SKILL ---- */}
              {step === 3 && (
                <div>
                  <h3 className="mb-2 font-display text-xl font-bold text-text-primary">
                    Teknik tecrübeniz nedir?
                  </h3>
                  <p className="mb-6 text-sm text-text-secondary">
                    Size en uygun kurulum sürecini sunmamız için
                    seviyenizi seçin.
                  </p>

                  <div className="flex flex-col gap-3">
                    {skillOptions.map((opt) => {
                      const Icon = opt.icon
                      const selected = skill === opt.id
                      return (
                        <button
                          key={opt.id}
                          onClick={() => setSkill(opt.id)}
                          aria-pressed={selected}
                          className="group flex items-center gap-4 rounded-lg border p-5 text-left transition-all duration-200"
                          style={{
                            backgroundColor: selected
                              ? 'rgba(217, 30, 54, 0.08)'
                              : 'var(--bg-surface)',
                            borderColor: selected
                              ? 'rgba(217, 30, 54, 0.8)'
                              : 'rgba(244, 244, 245, 0.08)',
                            borderLeftWidth: selected ? '3px' : '1px',
                            borderLeftColor: selected
                              ? 'var(--accent-red-deep)'
                              : 'transparent',
                          }}
                        >
                          <div
                            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg"
                            style={{
                              backgroundColor: selected
                                ? 'rgba(217, 30, 54, 0.15)'
                                : 'rgba(244, 244, 245, 0.04)',
                            }}
                          >
                            <Icon
                              className="h-5 w-5"
                              style={{
                                color: selected
                                  ? 'var(--accent-red-deep)'
                                  : 'var(--text-secondary)',
                              }}
                            />
                          </div>
                          <div className="flex-1">
                            <div className="font-display text-sm font-bold text-text-primary">
                              {opt.title}
                            </div>
                            <div className="mt-0.5 text-xs text-text-secondary">
                              {opt.desc}
                            </div>
                          </div>
                          <ChevronRight
                            className="h-4 w-4 flex-shrink-0 transition-all"
                            style={{
                              color: selected
                                ? 'var(--accent-red-deep)'
                                : 'transparent',
                              transform: selected
                                ? 'translateX(0)'
                                : 'translateX(-4px)',
                              opacity: selected ? 1 : 0,
                            }}
                          />
                        </button>
                      )
                    })}
                  </div>

                  <div className="mt-8 flex justify-between">
                    <button
                      onClick={goBackward}
                      className="inline-flex items-center gap-2 rounded border border-border-subtle px-5 py-2.5 text-sm font-medium text-text-primary transition-all duration-200 hover:border-accent-red hover:text-accent-red-light"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Geri
                    </button>
                    <button
                      onClick={goForward}
                      disabled={!skill}
                      className="inline-flex items-center gap-2 rounded px-6 py-3 text-sm font-semibold tracking-wide text-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-40"
                      style={{
                        backgroundColor: skill
                          ? 'var(--accent-red-deep)'
                          : 'rgba(244,244,245,0.1)',
                      }}
                    >
                      Devam Et
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* ---- STEP 4: PRIORITIES (max 2) ---- */}
              {step === 4 && (
                <div>
                  <h3 className="mb-2 font-display text-xl font-bold text-text-primary">
                    Sizin için en önemli olan nedir?
                  </h3>
                  <p className="mb-6 text-sm text-text-secondary">
                    En fazla 2 öncelik seçebilirsiniz. Size en uygun
                    modeli belirlememize yardımcı olun.
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {priorityOptions.map((opt) => {
                      const Icon = opt.icon
                      const selected = priorities.includes(opt.id)
                      const maxReached =
                        priorities.length >= MAX_PRIORITIES && !selected
                      return (
                        <button
                          key={opt.id}
                          onClick={() => togglePriority(opt.id)}
                          disabled={maxReached}
                          aria-pressed={selected}
                          aria-disabled={maxReached}
                          className={`inline-flex items-center gap-2 rounded-lg border px-5 py-3 text-sm font-medium transition-all duration-200 ${
                            maxReached
                              ? 'opacity-50 cursor-not-allowed'
                              : ''
                          }`}
                          style={{
                            backgroundColor: selected
                              ? 'rgba(217, 30, 54, 0.15)'
                              : 'var(--bg-surface)',
                            borderColor: selected
                              ? 'rgba(217, 30, 54, 0.8)'
                              : 'rgba(244, 244, 245, 0.08)',
                            color: selected
                              ? 'var(--accent-red-light)'
                              : 'var(--text-secondary)',
                          }}
                        >
                          <Icon className="h-4 w-4" />
                          {opt.id}
                        </button>
                      )
                    })}
                  </div>

                  <div className="mt-6 flex items-center gap-2 text-xs text-text-muted">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>
                      {priorities.length} / {MAX_PRIORITIES} öncelik
                      seçildi
                    </span>
                  </div>

                  <div className="mt-8 flex justify-between">
                    <button
                      onClick={goBackward}
                      className="inline-flex items-center gap-2 rounded border border-border-subtle px-5 py-2.5 text-sm font-medium text-text-primary transition-all duration-200 hover:border-accent-red hover:text-accent-red-light"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Geri
                    </button>
                    <button
                      onClick={handleStep4Submit}
                      disabled={priorities.length === 0}
                      className="inline-flex items-center gap-2 rounded px-6 py-3 text-sm font-semibold tracking-wide text-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-40"
                      style={{
                        backgroundColor:
                          priorities.length > 0
                            ? 'var(--accent-red-deep)'
                            : 'rgba(244,244,245,0.1)',
                      }}
                    >
                      Sonuçları Gör
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* ---- STEP 5: RESULT ---- */}
              {step === 5 && (
                <div>
                  {isLoading && (
                    <div className="flex flex-col items-center justify-center py-12">
                      <div className="mb-6 h-1 w-64 overflow-hidden rounded-full bg-bg-surface">
                        <div
                          ref={(el) => {
                            domRefs.current.loadingBar = el
                          }}
                          className="h-full rounded-full"
                          style={{
                            backgroundColor: 'var(--accent-red-deep)',
                            width: '0%',
                          }}
                        />
                      </div>
                      <span
                        ref={(el) => {
                          domRefs.current.loadingText = el
                        }}
                        className="font-mono text-sm text-text-secondary"
                      />
                    </div>
                  )}

                  {!isLoading && result && (
                    <div
                      ref={(el) => {
                        domRefs.current.resultCard = el
                      }}
                    >
                      {/* Main result card */}
                      <div
                        className="relative overflow-hidden rounded-xl border p-6 md:p-8"
                        style={{
                          backgroundColor: 'var(--bg-charcoal)',
                          borderColor: 'rgba(217, 30, 54, 0.5)',
                          borderLeftWidth: '3px',
                          borderLeftColor: 'var(--accent-red-deep)',
                        }}
                      >
                        {/* Match badge */}
                        <div className="mb-4 flex items-center justify-between">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-red/10 px-3 py-1 font-mono text-xs text-accent-red-light">
                            <Sparkles className="h-3 w-3" />
                            {result.matchLevel} (tahmini)
                          </span>
                          <span
                            className="inline-flex items-center gap-1 rounded border px-2 py-0.5 font-mono text-xs"
                            style={{
                              color: getRamColor(result.best.ramGB),
                              borderColor: getRamColor(
                                result.best.ramGB
                              ),
                            }}
                          >
                            {result.best.ramGB}GB RAM
                          </span>
                        </div>

                        <h3 className="font-display text-2xl font-bold text-accent-red-light">
                          {result.best.name}
                        </h3>

                        <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                          {result.best.description}
                        </p>

                        {/* Key features */}
                        <div className="mt-5 flex flex-wrap gap-2">
                          {result.best.tags.slice(0, 3).map((t) => (
                            <span
                              key={t}
                              className="inline-flex items-center gap-1 rounded bg-bg-surface px-2.5 py-1 text-xs text-text-secondary"
                            >
                              <Zap className="h-3 w-3 text-accent-red-light" />
                              {t}
                            </span>
                          ))}
                          {result.best.useCases.map((uc) => (
                            <span
                              key={uc}
                              className="inline-flex items-center gap-1 rounded bg-bg-surface px-2.5 py-1 text-xs text-text-secondary"
                            >
                              <Target className="h-3 w-3 text-warn-yellow" />
                              {uc}
                            </span>
                          ))}
                        </div>

                        {/* License + attribution. Every catalog model is
                            commercial-use, so the result always shows the real
                            license + commercial badge — no non-commercial branch. */}
                        <div className="mt-5 rounded-md border border-border-subtle bg-bg-surface/60 px-3 py-2 font-mono text-[11px] leading-relaxed text-text-muted">
                          <div>
                            <span className="text-text-secondary">Lisans:</span>{' '}
                            {result.best.license}
                            <span className="ml-2 inline-flex items-center rounded bg-safe-green/10 px-1.5 py-0.5 text-[10px] tracking-wide text-safe-green">
                              Ticari kullanım
                            </span>
                          </div>
                          <div className="mt-1">{result.best.attribution}</div>
                        </div>

                        {/* Actions */}
                        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                          <a
                            href={`https://ollama.com/search?q=${encodeURIComponent(result.best.shortName)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 rounded bg-accent-red-deep px-6 py-3 text-sm font-semibold tracking-wide text-white transition-colors duration-200 hover:bg-[#A01528]"
                          >
                            <ArrowUpRight className="h-4 w-4" />
                            Ollama Hub'da Ara
                          </a>
                          <button
                            onClick={() => navigate('/modeller')}
                            className="inline-flex items-center justify-center gap-2 rounded border border-border-subtle px-6 py-3 text-sm font-medium text-text-primary transition-all duration-200 hover:border-accent-red hover:text-accent-red-light"
                          >
                            Katalogda Görüntüle
                            <ArrowRight className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      {/* Alternative models */}
                      <div className="mt-6">
                        <p className="mb-3 font-mono text-xs tracking-wide text-text-muted">
                          Alternatif Modeller
                        </p>
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                          {result.alternatives.map((alt) => (
                            <div
                              key={alt.id}
                              className="alt-card rounded-lg border border-border-subtle bg-bg-charcoal p-4 transition-all duration-200 hover:border-[rgba(217,30,54,0.3)]"
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-display text-sm font-bold text-text-primary">
                                  {alt.name}
                                </span>
                                <span
                                  className="font-mono text-xs"
                                  style={{
                                    color: getRamColor(alt.ramGB),
                                  }}
                                >
                                  {alt.ramGB}GB
                                </span>
                              </div>
                              <p className="mt-1 text-xs text-text-secondary line-clamp-2">
                                {alt.description}
                              </p>
                              <p className="mt-1.5 font-mono text-[10px] text-text-muted">
                                {alt.license}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Restart */}
                      <div className="mt-6 flex justify-center">
                        <button
                          onClick={resetWizard}
                          className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-accent-red-light"
                        >
                          <RotateCcw className="h-4 w-4" />
                          Baştan Başla
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ======== NASIL ÇALIŞIR? ======== */}
      <section
        ref={(el) => {
          domRefs.current.nasil = el
          nasilScope.current = el
        }}
        className="bg-bg-obsidian px-6 py-24 lg:px-10"
      >
        <div className="mx-auto max-w-[1000px]">
          <h2 className="mb-16 text-center font-display text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
            Sihirbaz nasıl çalışır?
          </h2>

          <div className="relative">
            {/* Connecting line (desktop) — scrubs with scroll */}
            <div className="absolute top-8 left-0 right-0 hidden h-px md:block">
              <div className="h-full w-full bg-border-subtle" />
              <div
                className="process-line-fill absolute left-0 top-0 h-full origin-left"
                style={{
                  width: '100%',
                  background:
                    'var(--accent-red-deep)',
                }}
              />
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-6">
              {[
                {
                  num: '01',
                  title: 'Soruları Yanıtla',
                  desc: '5 kısa soru ile ihtiyaçlarınızı belirleyin.',
                  icon: HelpCircle,
                },
                {
                  num: '02',
                  title: 'Analiz Et',
                  desc: 'Sistem kullanım alanınızı, RAM\'inizi ve tecrübenizi analiz eder.',
                  icon: Search,
                },
                {
                  num: '03',
                  title: 'Model Öner',
                  desc: `Katalogdaki ${MODELS.length} model arasından en uygununu seçer.`,
                  icon: Sparkles,
                },
                {
                  num: '04',
                  title: 'Hemen Başla',
                  desc: 'Tek tıkla indirin ve yerel AI\'nizi çalıştırın.',
                  icon: Rocket,
                },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.num}
                    className="process-step relative flex flex-col items-center text-center"
                  >
                    <div
                      className="relative z-10 mb-5 flex h-16 w-16 items-center justify-center rounded-full border-2"
                      style={{
                        borderColor: 'var(--accent-red-deep)',
                        backgroundColor: 'var(--bg-obsidian)',
                      }}
                    >
                      <span className="font-display text-lg font-bold text-accent-red-light">
                        {item.num}
                      </span>
                    </div>
                    <div className="mb-2 flex items-center gap-2">
                      <Icon className="h-4 w-4 text-accent-red-light" />
                      <span className="font-display text-sm font-bold text-text-primary">
                        {item.title}
                      </span>
                    </div>
                    <p className="max-w-[200px] text-xs leading-relaxed text-text-secondary">
                      {item.desc}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ======== CTA SECTION ======== */}
      <section
        ref={(el) => {
          domRefs.current.cta = el
          ctaScope.current = el
        }}
        className="bg-bg-charcoal px-6 py-24 lg:px-10"
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="cta-animate font-display text-2xl font-bold tracking-tight text-text-primary md:text-3xl">
            Hâlâ Kararsız mısınız?
          </h2>
          <p className="cta-animate mt-4 text-base text-text-secondary">
            Tüm modellerimizi inceleyin ve kendi kararınızı verin.
          </p>
          <div className="cta-animate mt-8">
            <Link
              to="/modeller"
              className="inline-flex items-center gap-2 rounded border border-border-subtle px-8 py-3.5 text-sm font-semibold tracking-wide text-text-primary transition-all duration-200 hover:border-accent-red hover:text-accent-red-light"
            >
              Tüm Modeller
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
