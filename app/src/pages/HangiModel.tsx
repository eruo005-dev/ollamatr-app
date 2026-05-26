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
  Download,
  RotateCcw,
  ChevronRight,
  Sparkles,
  Search,
  Rocket,
  HelpCircle,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Link } from 'react-router'

/* ------------------------------------------------------------------ */
/*  Data                                                              */
/* ------------------------------------------------------------------ */

interface ModelData {
  name: string
  ram: number
  useCases: string[]
  skill: string
  priorityMatch: string[]
  description: string
}

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

const modelDatabase: ModelData[] = [
  {
    name: 'Phi-3 Mini TR 4B',
    ram: 4,
    useCases: ['Genel Sohbet & Asistan', 'Çeviri & Özetleme'],
    skill: 'Yeni Başlayan',
    priorityMatch: [
      'Hız (düşük latency)',
      'Düşük kaynak tüketimi',
    ],
    description:
      "Düşük RAM ile harika performans. Microsoft'un kompakt modeli Türkçe'ye uyarlandı.",
  },
  {
    name: 'Llama 3.1 Turkuaz 8B',
    ram: 8,
    useCases: ['Genel Sohbet & Asistan', 'İçerik Üretimi'],
    skill: 'Orta Seviye',
    priorityMatch: [
      'Çok dilli (İngilizce + Türkçe)',
      'Doğruluk (en iyi cevaplar)',
    ],
    description:
      'Türkçe metin üretiminin kralı. Meta\'nın güçlü modeli Türkçe için optimize edildi.',
  },
  {
    name: 'Mistral TrFine 7B',
    ram: 7,
    useCases: ['Genel Sohbet & Asistan', 'Çeviri & Özetleme'],
    skill: 'Orta Seviye',
    priorityMatch: [
      'Hız (düşük latency)',
      'Çok dilli (İngilizce + Türkçe)',
    ],
    description: 'Hızlı ve verimli. Mistral mimarisi Türkçe corpus ile buluştu.',
  },
  {
    name: 'CodeLlama TR 13B',
    ram: 16,
    useCases: ['Kod Yazma & Teknik'],
    skill: 'İleri Seviye',
    priorityMatch: [
      'Doğruluk (en iyi cevaplar)',
      'Kod yeteneği',
    ],
    description:
      'Türkçe yorumlar ve değişken isimleriyle eğitilmiş kod üretim uzmanı.',
  },
  {
    name: 'DeepSeek-R1 TR 14B',
    ram: 16,
    useCases: ['Kod Yazma & Teknik', 'Veri Analizi & SQL'],
    skill: 'İleri Seviye',
    priorityMatch: [
      'Doğruluk (en iyi cevaplar)',
      'Kod yeteneği',
      'Çok dilli (İngilizce + Türkçe)',
    ],
    description: 'Mantıksal akıl yürütme ve problem çözme dehası.',
  },
  {
    name: 'Llama 3.1 Turkuaz 70B',
    ram: 48,
    useCases: [
      'Genel Sohbet & Asistan',
      'İçerik Üretimi',
      'Çeviri & Özetleme',
    ],
    skill: 'Uzman',
    priorityMatch: [
      'Doğruluk (en iyi cevaplar)',
      'Çok dilli (İngilizce + Türkçe)',
    ],
    description: 'En gelişmiş Türkçe model. Mükemmel anlama ve üretim kalitesi.',
  },
  {
    name: 'Qwen2.5 TR 7B',
    ram: 8,
    useCases: ['Genel Sohbet & Asistan', 'İçerik Üretimi'],
    skill: 'Orta Seviye',
    priorityMatch: [
      'Çok dilli (İngilizce + Türkçe)',
      'Hız (düşük latency)',
    ],
    description:
      "Türkçe ve İngilizce çift dilli performans. Alibaba'nın güçlü modeli.",
  },
  {
    name: 'LLaVA-TR 7B',
    ram: 8,
    useCases: ['İçerik Üretimi'],
    skill: 'Orta Seviye',
    priorityMatch: ['Doğruluk (en iyi cevaplar)'],
    description:
      'Görüntüleri anlayıp Türkçe açıklama üretebilen vizyon modeli.',
  },
  {
    name: 'Gemma 2 TR 9B',
    ram: 10,
    useCases: ['İçerik Üretimi', 'Çeviri & Özetleme'],
    skill: 'Orta Seviye',
    priorityMatch: [
      'Doğruluk (en iyi cevaplar)',
      'Çok dilli (İngilizce + Türkçe)',
    ],
    description:
      'Google Gemma 2 üzerine Türkçe akademik ve bilimsel metinlerle eğitilmiş model.',
  },
  {
    name: 'Hukuk-BERT TR 1B',
    ram: 2,
    useCases: ['İçerik Üretimi'],
    skill: 'Yeni Başlayan',
    priorityMatch: [
      'Hız (düşük latency)',
      'Düşük kaynak tüketimi',
    ],
    description:
      'Türk hukuk metinleri üzerine uzmanlaşmış, sözleşme ve karar analizi modeli.',
  },
  {
    name: 'SQLCoder TR 7B',
    ram: 8,
    useCases: ['Veri Analizi & SQL', 'Kod Yazma & Teknik'],
    skill: 'Orta Seviye',
    priorityMatch: [
      'Doğruluk (en iyi cevaplar)',
      'Kod yeteneği',
    ],
    description:
      'Türkçe doğal dil sorgularını SQL\'e çeviren uzmanlaşmış model.',
  },
  {
    name: 'Mixtral TR 47B',
    ram: 32,
    useCases: [
      'Genel Sohbet & Asistan',
      'İçerik Üretimi',
      'Veri Analizi & SQL',
    ],
    skill: 'Uzman',
    priorityMatch: [
      'Doğruluk (en iyi cevaplar)',
      'Çok dilli (İngilizce + Türkçe)',
    ],
    description:
      'Mixture of Experts mimarisi. Türkçe için en gelişmiş açık modellerden biri.',
  },
]

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

function findBestModel(
  useCase: string,
  ram: number,
  skill: string,
  priorities: string[]
): { best: ModelData; alternatives: ModelData[]; matchPercent: number } {
  // Treat "Bilmiyorum" (0) as 16GB default for matching
  const effectiveRam = ram > 0 ? ram : 16

  // Filter: RAM must fit, useCase must match
  let candidates = modelDatabase.filter(
    (m) => m.ram <= effectiveRam && m.useCases.includes(useCase)
  )

  if (candidates.length === 0) {
    // Fallback: just RAM fit
    candidates = modelDatabase.filter((m) => m.ram <= effectiveRam)
    if (candidates.length === 0) {
      // Ultimate fallback: smallest models
      candidates = modelDatabase.filter((m) => m.ram <= 8)
      if (candidates.length === 0) candidates = [modelDatabase[0]]
    }
  }

  // Score each candidate
  const scored = candidates.map((m) => {
    let score = 0
    // Skill match (0-30) — 4-tier mapping
    const skillLevels: Record<string, number> = {
      'Yeni Başlayan': 1,
      'Orta Seviye': 2,
      'İleri Seviye': 3,
      Uzman: 4,
    }
    const userSkill = skillLevels[skill] || 1
    const modelSkill = skillLevels[m.skill] || 1
    score += 30 - Math.abs(userSkill - modelSkill) * 8

    // Priority matches (0-50)
    const priorityMatches = priorities.filter((p) =>
      m.priorityMatch.includes(p)
    ).length
    score += (priorityMatches / Math.max(priorities.length, 1)) * 50

    // RAM efficiency bonus (0-20)
    const ramUtilization = m.ram / effectiveRam
    score += ramUtilization * 20

    return { model: m, score }
  })

  scored.sort((a, b) => b.score - a.score)

  const best = scored[0]?.model || modelDatabase[0]
  const alternatives = scored
    .slice(1, 3)
    .map((s) => s.model)
    .filter((m) => m.name !== best.name)

  // Ensure we have 2 alternatives
  while (alternatives.length < 2) {
    const fallback = modelDatabase.find(
      (m) =>
        m.name !== best.name &&
        !alternatives.some((a) => a.name === m.name)
    )
    if (fallback) alternatives.push(fallback)
    else break
  }

  const matchPercent = Math.min(
    99,
    Math.round(scored[0]?.score || 85)
  )

  return { best, alternatives, matchPercent }
}

/* ------------------------------------------------------------------ */
/*  RAM Badge Color Helper                                            */
/* ------------------------------------------------------------------ */

function getRamColor(ram: number): string {
  if (ram < 8) return '#00E5A0'
  if (ram <= 16) return '#FFB800'
  return '#D91E36'
}

function getRamShadow(ram: number): string {
  if (ram < 8) return '0 0 12px rgba(0, 229, 160, 0.3)'
  if (ram <= 16) return '0 0 12px rgba(255, 184, 0, 0.3)'
  return '0 0 12px rgba(217, 30, 54, 0.3)'
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
    best: ModelData
    alternatives: ModelData[]
    matchPercent: number
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

  /* ---- GSAP: Hero entrance ---- */
  useGSAP(
    () => {
      if (!heroScope.current) return
      const els = heroScope.current.querySelectorAll('.hero-animate')
      gsap.from(els, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'expo.out',
        delay: 0.2,
      })
    },
    { scope: heroScope }
  )

  /* ---- GSAP: Wizard entrance ---- */
  useGSAP(
    () => {
      if (!wizardScope.current) return
      gsap.from(wizardScope.current, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'expo.out',
        delay: 0.5,
      })
    },
    { scope: wizardScope }
  )

  /* ---- GSAP: Nasıl Çalışır scroll ---- */
  useGSAP(
    () => {
      if (!nasilScope.current) return
      const steps = nasilScope.current.querySelectorAll('.process-step')
      const line = nasilScope.current.querySelector('.process-line-fill')

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

      if (line) {
        // scrub: true → line fills progressively with scroll position
        gsap.fromTo(
          line,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: nasilScope.current,
              start: 'top 85%',
              end: 'bottom 60%',
              scrub: true,
            },
          }
        )
      }
    },
    { scope: nasilScope }
  )

  /* ---- GSAP: CTA scroll ---- */
  useGSAP(
    () => {
      if (!ctaScope.current) return
      gsap.from(ctaScope.current.querySelectorAll('.cta-animate'), {
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
    },
    { scope: ctaScope }
  )

  /* ---- Step transition ---- */
  const animateStepTransition = useCallback(
    (direction: 'forward' | 'backward', onComplete: () => void) => {
      const target = domRefs.current.stepContent
      if (!target) {
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

  /* ---- Loading animation ---- */
  const runLoadingAnimation = useCallback(() => {
    const bar = domRefs.current.loadingBar
    const textEl = domRefs.current.loadingText
    if (!bar || !textEl) return

    const loadingText = 'Modeliniz analiz ediliyor...'
    textEl.textContent = ''

    // Typewriter effect
    let charIndex = 0
    const typeInterval = setInterval(() => {
      const current = domRefs.current.loadingText
      if (charIndex < loadingText.length && current) {
        current.textContent += loadingText[charIndex]
        charIndex++
      } else {
        clearInterval(typeInterval)
      }
    }, 40)

    // Progress bar
    gsap.fromTo(
      bar,
      { width: '0%' },
      { width: '100%', duration: 1.5, ease: 'power2.inOut' }
    )
  }, [])

  /* ---- Result animation ---- */
  const animateResult = useCallback(() => {
    const card = domRefs.current.resultCard
    if (!card) return
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
          <span className="hero-animate mb-4 inline-block font-body text-sm font-medium uppercase tracking-wider text-accent-red">
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
            className="relative overflow-hidden rounded-xl border border-[rgba(217,30,54,0.3)] p-6 md:p-12"
            style={{
              backgroundColor: '#0A0A0F',
              boxShadow: '0 0 40px rgba(217, 30, 54, 0.1)',
            }}
          >
            {/* Terminal top bar */}
            <div className="mb-8 flex items-center gap-3 border-b border-border-subtle pb-4">
              <div className="flex items-center gap-2">
                <span className="inline-block h-3 w-3 rounded-full bg-[#FF5F56]" />
                <span className="inline-block h-3 w-3 rounded-full bg-[#FFBD2E]" />
                <span className="inline-block h-3 w-3 rounded-full bg-[#27C93F]" />
              </div>
              <span className="ml-4 font-mono text-xs uppercase tracking-wider text-text-muted">
                ollamatr-wizard
              </span>
              <span className="ml-auto font-mono text-xs text-text-muted">
                {step}/5
              </span>
            </div>

            {/* Progress indicator / stepper — tablist semantics */}
            <div
              role="tablist"
              aria-label="Sihirbaz adımları"
              className="mb-8 flex items-center gap-2"
            >
              {[1, 2, 3, 4, 5].map((s) => (
                <div
                  key={s}
                  role="tab"
                  aria-selected={step === s}
                  aria-label={`Adım ${s}`}
                  className="h-1 flex-1 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor:
                      s <= step
                        ? 'rgba(217, 30, 54, 0.8)'
                        : 'rgba(244, 244, 245, 0.08)',
                    boxShadow:
                      s <= step
                        ? '0 0 8px rgba(217, 30, 54, 0.4)'
                        : 'none',
                  }}
                />
              ))}
            </div>

            {/* Step content panel */}
            <div
              ref={(el) => {
                domRefs.current.stepContent = el
              }}
              role="tabpanel"
              aria-label={`Adım ${step}`}
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
                            backgroundColor: 'var(--bg-surface)',
                            borderColor: selected
                              ? 'rgba(217, 30, 54, 0.8)'
                              : 'rgba(244, 244, 245, 0.08)',
                            boxShadow: selected
                              ? '0 0 20px rgba(217, 30, 54, 0.2)'
                              : 'none',
                            borderLeftWidth: selected ? '3px' : '1px',
                            borderLeftColor: selected
                              ? 'var(--accent-red)'
                              : 'transparent',
                          }}
                        >
                          <Icon
                            className="h-6 w-6 transition-colors"
                            style={{
                              color: selected
                                ? 'var(--accent-red)'
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
                      className="inline-flex items-center gap-2 rounded px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-40"
                      style={{
                        backgroundColor: useCase
                          ? 'var(--accent-red)'
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
                      const glowColor = isUnknown
                        ? 'rgba(244, 244, 245, 0.15)'
                        : opt.value <= 8
                          ? 'rgba(0, 229, 160, 0.3)'
                          : opt.value <= 16
                            ? 'rgba(255, 184, 0, 0.3)'
                            : 'rgba(217, 30, 54, 0.3)'
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
                          className="relative rounded-lg border px-8 py-4 font-mono text-sm uppercase tracking-wider transition-all duration-200"
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
                            boxShadow: selected
                              ? `0 0 20px ${glowColor}`
                              : 'none',
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
                      className="inline-flex items-center gap-2 rounded px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-40"
                      style={{
                        backgroundColor:
                          ram !== null
                            ? 'var(--accent-red)'
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
                            backgroundColor: 'var(--bg-surface)',
                            borderColor: selected
                              ? 'rgba(217, 30, 54, 0.8)'
                              : 'rgba(244, 244, 245, 0.08)',
                            boxShadow: selected
                              ? '0 0 20px rgba(217, 30, 54, 0.2)'
                              : 'none',
                            borderLeftWidth: selected ? '3px' : '1px',
                            borderLeftColor: selected
                              ? 'var(--accent-red)'
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
                                  ? 'var(--accent-red)'
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
                                ? 'var(--accent-red)'
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
                      className="inline-flex items-center gap-2 rounded px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-40"
                      style={{
                        backgroundColor: skill
                          ? 'var(--accent-red)'
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
                            boxShadow: selected
                              ? '0 0 12px rgba(217, 30, 54, 0.2)'
                              : 'none',
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
                      className="inline-flex items-center gap-2 rounded px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-40"
                      style={{
                        backgroundColor:
                          priorities.length > 0
                            ? 'var(--accent-red)'
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
                            backgroundColor: 'var(--accent-red)',
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
                          boxShadow:
                            '0 0 30px rgba(217, 30, 54, 0.2)',
                        }}
                      >
                        {/* Match badge */}
                        <div className="mb-4 flex items-center justify-between">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-red/10 px-3 py-1 font-mono text-xs text-accent-red-light">
                            <Sparkles className="h-3 w-3" />
                            %{result.matchPercent} Eşleşme
                          </span>
                          <span
                            className="inline-flex items-center gap-1 rounded border px-2 py-0.5 font-mono text-xs uppercase"
                            style={{
                              color: getRamColor(result.best.ram),
                              borderColor: getRamColor(
                                result.best.ram
                              ),
                              boxShadow: getRamShadow(
                                result.best.ram
                              ),
                            }}
                          >
                            {result.best.ram}GB RAM
                          </span>
                        </div>

                        <h3 className="font-display text-2xl font-bold text-accent-red">
                          {result.best.name}
                        </h3>

                        <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                          {result.best.description}
                        </p>

                        {/* Key features */}
                        <div className="mt-5 flex flex-wrap gap-2">
                          {result.best.priorityMatch.map(
                            (p) => (
                              <span
                                key={p}
                                className="inline-flex items-center gap-1 rounded bg-bg-surface px-2.5 py-1 text-xs text-text-secondary"
                              >
                                <Zap className="h-3 w-3 text-accent-red" />
                                {p}
                              </span>
                            )
                          )}
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

                        {/* Actions */}
                        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                          <button
                            onClick={() => navigate('/indir')}
                            className="inline-flex items-center justify-center gap-2 rounded bg-accent-red px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-all duration-200 hover:bg-accent-red-light hover:scale-[1.02]"
                          >
                            <Download className="h-4 w-4" />
                            Modeli İndir
                          </button>
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
                        <p className="mb-3 font-mono text-xs uppercase tracking-wider text-text-muted">
                          Alternatif Modeller
                        </p>
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                          {result.alternatives.map((alt) => (
                            <div
                              key={alt.name}
                              className="alt-card rounded-lg border border-border-subtle bg-bg-charcoal p-4 transition-all duration-200 hover:border-[rgba(217,30,54,0.3)]"
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-display text-sm font-bold text-text-primary">
                                  {alt.name}
                                </span>
                                <span
                                  className="font-mono text-xs"
                                  style={{
                                    color: getRamColor(alt.ram),
                                  }}
                                >
                                  {alt.ram}GB
                                </span>
                              </div>
                              <p className="mt-1 text-xs text-text-secondary line-clamp-2">
                                {alt.description}
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
            SİHİRBAZ NASIL ÇALIŞIR?
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
                    'linear-gradient(90deg, var(--accent-red) 0%, rgba(217,30,54,0.3) 100%)',
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
                  desc: 'Katalogdaki 100+ model arasından en uygununu seçer.',
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
                        borderColor: 'var(--accent-red)',
                        backgroundColor: 'var(--bg-obsidian)',
                        boxShadow:
                          '0 0 20px rgba(217, 30, 54, 0.2)',
                      }}
                    >
                      <span className="font-display text-lg font-bold text-accent-red">
                        {item.num}
                      </span>
                    </div>
                    <div className="mb-2 flex items-center gap-2">
                      <Icon className="h-4 w-4 text-accent-red" />
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
              className="inline-flex items-center gap-2 rounded border border-border-subtle px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-text-primary transition-all duration-200 hover:border-accent-red hover:text-accent-red-light"
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
