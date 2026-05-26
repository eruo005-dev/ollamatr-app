import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { Link } from 'react-router'
import {
  Search,
  ChevronDown,
  Download,
  X,
  Star,
  MemoryStick,
  ArrowRight,
  Wand2,
} from 'lucide-react'

/* ═══════════════════════════ TYPES ═══════════════════════════ */
interface Model {
  id: number
  name: string
  description: string
  ramGB: number
  useCase: string
  parameters: string
  downloads: number
  rating: number
  badge: string
  tags: string[]
}

type RamFilter = 'Tüm RAM' | '< 8GB (Düşük)' | '8-16GB (Orta)' | '16GB+ (Yüksek)'
type UseCaseFilter = 'Tümü' | 'Genel Amaçlı' | 'Kod' | 'Sohbet' | 'Soru-Cevap' | 'Çeviri' | 'Özetleme'
type SortOption = 'Popülerlik' | 'RAM (Düşük → Yüksek)' | 'RAM (Yüksek → Düşük)' | 'En Yeni'

/* ═══════════════════════════ MODEL DATA ═══════════════════════════ */
const models: Model[] = [
  { id: 1, name: 'Llama 3.1 Turkuaz 8B', description: 'Meta Llama 3.1 tabanlı, Türkçe metin üretimi için optimize edilmiş genel amaçlı model.', ramGB: 8, useCase: 'Genel Amaçlı', parameters: '8B', downloads: 15200, rating: 4.8, badge: 'En Popüler', tags: ['SOHBET', 'TÜRKÇE'] },
  { id: 2, name: 'Mistral TrFine 7B', description: 'Mistral mimarisi üzerine Türkçe corpus ile fine-tune edilmiş kompakt model.', ramGB: 7, useCase: 'Sohbet', parameters: '7B', downloads: 8900, rating: 4.6, badge: 'Hafif', tags: ['TÜRKÇE', 'METIN'] },
  { id: 3, name: 'CodeLlama TR 13B', description: 'Türkçe yorum satırları ve değişken isimleriyle eğitilmiş kod üretim modeli.', ramGB: 16, useCase: 'Kod', parameters: '13B', downloads: 6200, rating: 4.7, badge: 'Kod', tags: ['KOD', 'GELISTIRME'] },
  { id: 4, name: 'Llama 3.1 Turkuaz 70B', description: 'En gelişmiş Türkçe anlama ve muhakeme yetenekleri. Yoğun RAM gereksinimi.', ramGB: 48, useCase: 'Genel Amaçlı', parameters: '70B', downloads: 3100, rating: 4.9, badge: 'En Güçlü', tags: ['SOHBET', 'TÜRKÇE', 'GELISMIS'] },
  { id: 5, name: 'Phi-3 Mini TR 4B', description: 'Microsoft Phi-3 üzerine Türkçe adaptasyon. Düşük kaynakla mükemmel performans.', ramGB: 4, useCase: 'Genel Amaçlı', parameters: '3.8B', downloads: 11400, rating: 4.5, badge: 'Ultra Hafif', tags: ['HAFIF', 'HIZLI'] },
  { id: 6, name: 'Qwen2.5 TR 7B', description: 'Alibaba Qwen2.5 tabanlı, Türkçe ve İngilizce çift dilli model.', ramGB: 8, useCase: 'Çeviri', parameters: '7B', downloads: 7800, rating: 4.6, badge: 'Çift Dil', tags: ['ÇIFT-DIL', 'SOHBET'] },
  { id: 7, name: 'DeepSeek-R1 TR 14B', description: 'Mantıksal akıl yürütme ve problem çözme için Türkçe fine-tune edilmiş model.', ramGB: 16, useCase: 'Soru-Cevap', parameters: '14B', downloads: 4500, rating: 4.7, badge: 'Akıl Yürütme', tags: ['MATEMATIK', 'MANTIK'] },
  { id: 8, name: 'Gemma 2 TR 9B', description: 'Google Gemma 2 üzerine Türkçe akademik ve bilimsel metinlerle eğitilmiş.', ramGB: 10, useCase: 'Özetleme', parameters: '9B', downloads: 5600, rating: 4.5, badge: 'Akademik', tags: ['AKADEMIK', 'BILIM'] },
  { id: 9, name: 'LLaVA-TR 7B', description: 'Görüntü anlama ve Türkçe açıklama üretimi. Vizyon-görev modeli.', ramGB: 8, useCase: 'Sohbet', parameters: '7B', downloads: 3200, rating: 4.4, badge: 'Vizyon', tags: ['GORUNTU', 'VIZYON'] },
  { id: 10, name: 'Hukuk-BERT TR 1B', description: 'Türk hukuk metinleri üzerine uzmanlaşmış, sözleşme ve karar analizi.', ramGB: 2, useCase: 'Soru-Cevap', parameters: '1B', downloads: 2100, rating: 4.3, badge: 'Uzman', tags: ['HUKUK', 'UZMAN'] },
  { id: 11, name: 'SQLCoder TR 7B', description: 'Türkçe doğal dil sorgularını SQL\'e çeviren uzmanlaşmış model.', ramGB: 8, useCase: 'Kod', parameters: '7B', downloads: 3800, rating: 4.5, badge: 'SQL', tags: ['SQL', 'VERITABANI'] },
  { id: 12, name: 'Mixtral TR 47B', description: 'Mixture of Experts mimarisi. Türkçe için en gelişmiş açık modellerden biri.', ramGB: 32, useCase: 'Genel Amaçlı', parameters: '47B', downloads: 2800, rating: 4.8, badge: 'MoE', tags: ['MoE', 'GELISMIS'] },
]

/* ═══════════════════════════ UTILITY FUNCTIONS ═══════════════════════════ */
function getRamColorClass(ramGB: number): string {
  if (ramGB < 8) return 'text-safe-green'
  if (ramGB <= 16) return 'text-warn-yellow'
  return 'text-accent-red'
}

function getRamBgColor(ramGB: number): string {
  if (ramGB < 8) return '#00E5A0'
  if (ramGB <= 16) return '#FFB800'
  return '#D91E36'
}

/* ═══════════════════════════ HOOKS ═══════════════════════════ */
function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, visible }
}

/* ═══════════════════════════ FILTER HOOK ═══════════════════════════ */
function useModelFilters() {
  const [searchQuery, setSearchQuery] = useState('')
  const [ramFilter, setRamFilter] = useState<RamFilter>('Tüm RAM')
  const [useCaseFilter, setUseCaseFilter] = useState<UseCaseFilter>('Tümü')
  const [sortOption, setSortOption] = useState<SortOption>('Popülerlik')

  const filteredModels = useMemo(() => {
    let result = [...models]

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.description.toLowerCase().includes(q) ||
          m.tags.some((t) => t.toLowerCase().includes(q))
      )
    }

    // RAM filter
    if (ramFilter !== 'Tüm RAM') {
      result = result.filter((m) => {
        switch (ramFilter) {
          case '< 8GB (Düşük)': return m.ramGB < 8
          case '8-16GB (Orta)': return m.ramGB >= 8 && m.ramGB <= 16
          case '16GB+ (Yüksek)': return m.ramGB > 16
          default: return true
        }
      })
    }

    // Use case filter
    if (useCaseFilter !== 'Tümü') {
      result = result.filter((m) => m.useCase === useCaseFilter)
    }

    // Sort
    switch (sortOption) {
      case 'Popülerlik':
        result.sort((a, b) => b.downloads - a.downloads)
        break
      case 'En Yeni':
        result.sort((a, b) => b.id - a.id)
        break
      case 'RAM (Düşük → Yüksek)':
        result.sort((a, b) => a.ramGB - b.ramGB)
        break
      case 'RAM (Yüksek → Düşük)':
        result.sort((a, b) => b.ramGB - a.ramGB)
        break
    }

    return result
  }, [searchQuery, ramFilter, useCaseFilter, sortOption])

  return {
    searchQuery, setSearchQuery,
    ramFilter, setRamFilter,
    useCaseFilter, setUseCaseFilter,
    sortOption, setSortOption,
    filteredModels,
  }
}

/* ═══════════════════════════ 3D TILT CARD ═══════════════════════════ */
interface TiltCardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

function TiltCard({ children, className = '', onClick }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg)')
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -5
    const rotateY = ((x - centerX) / centerX) * 5
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`)
  }, [])

  const handleMouseEnter = useCallback(() => setIsHovered(true), [])

  const handleMouseLeave = useCallback(() => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)')
    setIsHovered(false)
  }, [])

  return (
    <div
      ref={cardRef}
      className={className}
      style={{
        transform,
        transition: 'transform 0.15s ease-out, border-color 0.3s ease',
        borderColor: isHovered ? 'rgba(217, 30, 54, 0.5)' : 'rgba(244, 244, 245, 0.08)',
        boxShadow: isHovered ? '0 0 20px rgba(217, 30, 54, 0.15)' : 'none',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

/* ═══════════════════════════ MODEL CARD ═══════════════════════════ */
interface ModelCardProps {
  model: Model
  onSelect: (model: Model) => void
}

function ModelCard({ model, onSelect }: ModelCardProps) {
  return (
    <TiltCard
      className="cursor-pointer rounded-lg border border-border-subtle bg-bg-charcoal p-6 md:p-7"
      onClick={() => onSelect(model)}
    >
      {/* Top row: name + RAM badge */}
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-lg font-bold leading-tight text-text-primary md:text-xl">
          {model.name}
        </h3>
        <span
          className={`flex shrink-0 items-center gap-1 rounded bg-bg-surface px-2 py-1 font-mono text-xs uppercase tracking-wide ${getRamColorClass(model.ramGB)}`}
          style={{ border: '1px solid rgba(244, 244, 245, 0.08)' }}
        >
          <MemoryStick className="h-3 w-3" />
          {model.ramGB}GB
        </span>
      </div>

      {/* Description */}
      <p className="mt-3 line-clamp-2 font-body text-sm leading-relaxed text-text-secondary">
        {model.description}
      </p>

      {/* Tags */}
      <div className="mt-4 flex flex-wrap gap-2">
        {model.tags.map((tag) => (
          <span
            key={tag}
            className="rounded bg-bg-surface px-2 py-0.5 font-mono text-[10px] font-normal uppercase tracking-wider text-text-muted"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Rating + badge */}
      <div className="mt-4 flex items-center gap-2">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-3.5 w-3.5 ${i < Math.floor(model.rating) ? 'fill-warn-yellow text-warn-yellow' : 'text-text-muted'}`}
            />
          ))}
        </div>
        <span className="font-mono text-xs text-text-secondary">{model.rating}</span>
        {model.badge && (
          <span className="ml-auto font-mono text-[10px] uppercase tracking-wider text-accent-red-light">
            {model.badge}
          </span>
        )}
      </div>

      {/* Bottom row: download count + button */}
      <div className="mt-5 flex items-center justify-between border-t border-border-subtle pt-4">
        <span className="font-mono text-xs text-text-muted">
          {model.downloads.toLocaleString('tr-TR')} indirme
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onSelect(model)
          }}
          className="inline-flex items-center gap-1.5 rounded bg-accent-red px-4 py-2 font-body text-xs font-semibold uppercase tracking-wider text-white transition-all duration-200 hover:bg-accent-red-light hover:scale-[1.02]"
        >
          <Download className="h-3.5 w-3.5" />
          İndir
        </button>
      </div>
    </TiltCard>
  )
}

/* ═══════════════════════════ DETAIL MODAL ═══════════════════════════ */
interface DetailModalProps {
  model: Model | null
  onClose: () => void
}

function DetailModal({ model, onClose }: DetailModalProps) {
  const backdropRef = useRef<HTMLDivElement>(null)
  const [isClosing, setIsClosing] = useState(false)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    if (model) {
      setIsClosing(false)
      setShowContent(true)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [model])

  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape' && model) handleClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [model])

  const handleClose = useCallback(() => {
    setIsClosing(true)
    setShowContent(false)
    setTimeout(() => {
      onClose()
      setIsClosing(false)
    }, 250)
  }, [onClose])

  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === backdropRef.current) handleClose()
  }, [handleClose])

  if (!model) return null

  const ramColor = getRamColorClass(model.ramGB)
  const ramHex = getRamBgColor(model.ramGB)

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      style={{
        backgroundColor: 'rgba(10, 9, 12, 0.85)',
        backdropFilter: 'blur(8px)',
        opacity: showContent ? 1 : 0,
        transition: 'opacity 0.2s ease',
      }}
      onClick={handleBackdropClick}
    >
      <div
        className="relative w-full max-w-2xl rounded-xl border border-border-subtle bg-bg-charcoal p-8 md:p-12"
        style={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          transform: showContent && !isClosing ? 'scale(1)' : 'scale(0.9)',
          opacity: showContent && !isClosing ? 1 : 0,
          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded p-2 text-text-secondary transition-colors hover:text-accent-red md:right-6 md:top-6"
          aria-label="Kapat"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="flex flex-wrap items-start gap-4">
          <h2 className="font-display text-2xl font-bold text-text-primary md:text-3xl">
            {model.name}
          </h2>
          <span
            className={`flex items-center gap-1 rounded bg-bg-surface px-3 py-1.5 font-mono text-xs uppercase tracking-wide ${ramColor}`}
            style={{ border: `1px solid ${ramHex}40`, boxShadow: `0 0 8px ${ramHex}25` }}
          >
            <MemoryStick className="h-3.5 w-3.5" />
            {model.ramGB}GB RAM
          </span>
        </div>

        {/* Badge */}
        {model.badge && (
          <span className="mt-3 inline-block font-mono text-xs uppercase tracking-wider text-accent-red-light">
            {model.badge}
          </span>
        )}

        {/* Description */}
        <p className="mt-4 font-body text-base leading-relaxed text-text-secondary">
          {model.description}
        </p>

        {/* Specs grid */}
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
          <SpecItem label="Parametreler" value={model.parameters} />
          <SpecItem label="RAM Gereksinimi" value={`${model.ramGB}GB`} color={ramHex} />
          <SpecItem label="Kullanım Alanı" value={model.useCase} />
          <SpecItem label="İndirmeler" value={model.downloads.toLocaleString('tr-TR')} />
          <SpecItem label="Değerlendirme" value={`${model.rating} / 5`} />
          <SpecItem label="Lisans" value="Apache 2.0" />
        </div>

        {/* Rating stars */}
        <div className="mt-6 flex items-center gap-3">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${i < Math.floor(model.rating) ? 'fill-warn-yellow text-warn-yellow' : 'text-text-muted'}`}
              />
            ))}
          </div>
          <span className="font-mono text-sm text-text-secondary">{model.rating} / 5.0</span>
        </div>

        {/* Tags */}
        <div className="mt-6 flex flex-wrap gap-2">
          {model.tags.map((tag) => (
            <span
              key={tag}
              className="rounded border border-border-subtle bg-bg-surface px-3 py-1 font-mono text-xs uppercase tracking-wider text-text-secondary"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Performance note */}
        <p className="mt-6 font-body text-sm leading-relaxed text-text-muted">
          Bu model {model.ramGB}GB RAM gerektirir. GPU hızlandırma önerilir. OllamaTR ile tek komutla indirin ve çalıştırın.
        </p>

        {/* Action buttons */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button className="inline-flex items-center justify-center gap-2 rounded bg-accent-red px-6 py-3.5 font-body text-sm font-semibold uppercase tracking-wider text-white transition-all duration-200 hover:bg-accent-red-light hover:scale-[1.02]">
            <Download className="h-4 w-4" />
            Modeli İndir
          </button>
          <Link
            to="/hangi-model"
            className="inline-flex items-center justify-center gap-2 rounded border border-border-subtle px-6 py-3.5 font-body text-sm font-semibold uppercase tracking-wider text-text-primary transition-all duration-200 hover:border-accent-red hover:text-accent-red-light"
            onClick={handleClose}
          >
            <Wand2 className="h-4 w-4" />
            Hangi Model Sihirbazı
          </Link>
          <button
            onClick={handleClose}
            className="inline-flex items-center justify-center gap-2 rounded border border-border-subtle px-6 py-3.5 font-body text-sm font-semibold uppercase tracking-wider text-text-secondary transition-all duration-200 hover:border-accent-red hover:text-accent-red-light sm:ml-auto"
          >
            <X className="h-4 w-4" />
            Kapat
          </button>
        </div>
      </div>
    </div>
  )
}

function SpecItem({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="rounded bg-bg-surface p-3" style={{ border: '1px solid rgba(244, 244, 245, 0.08)' }}>
      <p className="font-mono text-[10px] uppercase tracking-wider text-text-muted">{label}</p>
      <p className="mt-1 font-body text-sm font-medium text-text-primary" style={color ? { color } : undefined}>
        {value}
      </p>
    </div>
  )
}

/* ═══════════════════════════ FILTER BAR ═══════════════════════════ */
interface FilterBarProps {
  searchQuery: string
  setSearchQuery: (v: string) => void
  ramFilter: RamFilter
  setRamFilter: (v: RamFilter) => void
  useCaseFilter: UseCaseFilter
  setUseCaseFilter: (v: UseCaseFilter) => void
  sortOption: SortOption
  setSortOption: (v: SortOption) => void
  resultCount: number
}

const RAM_OPTIONS: RamFilter[] = ['Tüm RAM', '< 8GB (Düşük)', '8-16GB (Orta)', '16GB+ (Yüksek)']
const USE_CASE_OPTIONS: UseCaseFilter[] = ['Tümü', 'Genel Amaçlı', 'Kod', 'Sohbet', 'Soru-Cevap', 'Çeviri', 'Özetleme']
const SORT_OPTIONS: SortOption[] = ['Popülerlik', 'RAM (Düşük → Yüksek)', 'RAM (Yüksek → Düşük)', 'En Yeni']

function FilterBar({
  searchQuery, setSearchQuery,
  ramFilter, setRamFilter,
  useCaseFilter, setUseCaseFilter,
  sortOption, setSortOption,
  resultCount,
}: FilterBarProps) {
  return (
    <div
      className="sticky top-16 z-40 border-b border-border-subtle"
      style={{
        backgroundColor: 'rgba(19, 18, 23, 0.9)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <div className="mx-auto max-w-7xl px-6 py-4 lg:px-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Search */}
          <div className="relative flex-1 lg:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Model ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded border border-border-subtle bg-bg-surface py-2.5 pl-10 pr-4 font-body text-sm text-text-primary placeholder-text-muted outline-none transition-colors focus:border-accent-red"
            />
          </div>

          {/* Filters row */}
          <div className="flex flex-wrap items-center gap-3">
            {/* RAM Filter */}
            <div className="relative">
              <select
                value={ramFilter}
                onChange={(e) => setRamFilter(e.target.value as RamFilter)}
                className="appearance-none rounded border border-border-subtle bg-bg-surface py-2.5 pl-4 pr-10 font-body text-sm text-text-primary outline-none transition-colors focus:border-accent-red cursor-pointer"
              >
                {RAM_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
            </div>

            {/* Use Case Filter */}
            <div className="relative">
              <select
                value={useCaseFilter}
                onChange={(e) => setUseCaseFilter(e.target.value as UseCaseFilter)}
                className="appearance-none rounded border border-border-subtle bg-bg-surface py-2.5 pl-4 pr-10 font-body text-sm text-text-primary outline-none transition-colors focus:border-accent-red cursor-pointer"
              >
                {USE_CASE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                className="appearance-none rounded border border-border-subtle bg-bg-surface py-2.5 pl-4 pr-10 font-body text-sm text-text-primary outline-none transition-colors focus:border-accent-red cursor-pointer"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
            </div>
          </div>
        </div>

        {/* Result count */}
        <p className="mt-3 font-mono text-xs text-text-muted">
          {resultCount} model gösteriliyor
        </p>
      </div>
    </div>
  )
}

/* ═══════════════════════════ 3D PERSPECTIVE GRID ═══════════════════════════ */
interface ModelGridProps {
  models: Model[]
  onSelect: (model: Model) => void
}

function ModelGrid({ models: gridModels, onSelect }: ModelGridProps) {
  const gridRef = useRef<HTMLDivElement>(null)
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set())

  // Reset visible cards when filters change so newly visible cards get entrance animations
  useEffect(() => {
    setVisibleCards(new Set())
  }, [gridModels])

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return

    const cards = grid.querySelectorAll('.model-card')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = Number(entry.target.getAttribute('data-id'))
            setVisibleCards((prev) => new Set(prev).add(id))
          }
        })
      },
      { threshold: 0.15 }
    )

    cards.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [gridModels])

  // Group into rows of 3 for 3D perspective effect
  const rows: Model[][] = []
  for (let i = 0; i < gridModels.length; i += 3) {
    rows.push(gridModels.slice(i, i + 3))
  }

  return (
    <div
      ref={gridRef}
      className="mx-auto max-w-7xl px-6 lg:px-10"
      style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
    >
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="grid-row hidden md:grid"
          style={{
            transform: `rotateY(${rowIndex % 2 === 0 ? '-3deg' : '3deg'})`,
            transformStyle: 'preserve-3d',
            marginBottom: '24px',
          }}
        >
          <div className="grid grid-cols-3 gap-6">
            {row.map((model, colIndex) => {
              const globalIndex = rowIndex * 3 + colIndex
              const isVisible = visibleCards.has(model.id)
              return (
                <div
                  key={model.id}
                  className="model-card"
                  data-id={model.id}
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
                    transition: `opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${globalIndex * 0.06}s, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${globalIndex * 0.06}s`,
                  }}
                >
                  <ModelCard model={model} onSelect={onSelect} />
                </div>
              )
            })}
          </div>
        </div>
      ))}

      {/* Tablet: 2 columns */}
      <div className="hidden grid-cols-2 gap-6 sm:grid md:hidden">
        {gridModels.map((model, index) => {
          const isVisible = visibleCards.has(model.id)
          return (
            <div
              key={model.id}
              className="model-card"
              data-id={model.id}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
                transition: `opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.06}s, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.06}s`,
              }}
            >
              <ModelCard model={model} onSelect={onSelect} />
            </div>
          )
        })}
      </div>

      {/* Mobile: 1 column */}
      <div className="grid grid-cols-1 gap-6 sm:hidden">
        {gridModels.map((model, index) => {
          const isVisible = visibleCards.has(model.id)
          return (
            <div
              key={model.id}
              className="model-card"
              data-id={model.id}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
                transition: `opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.06}s, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.06}s`,
              }}
            >
              <ModelCard model={model} onSelect={onSelect} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ═══════════════════════════ RAM COMPARISON ═══════════════════════════ */
function RamComparison({ models: comparisonModels }: { models: Model[] }) {
  const { ref, visible } = useScrollReveal(0.1)

  if (comparisonModels.length === 0) return null

  const maxRam = Math.max(...comparisonModels.map((m) => m.ramGB))

  return (
    <section ref={ref} className="bg-bg-charcoal py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <h2 className="text-center font-display text-2xl font-bold uppercase tracking-tight text-text-primary md:text-3xl">
            RAM Gereksinimleri Karşılaştırması
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center font-body text-base text-text-secondary">
            Filtrelenen modellerin RAM gereksinimleri. Sisteminizdeki RAM miktarına göre uygun modeli seçin.
          </p>
        </div>

        <div
          className="mt-12 space-y-4"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
          }}
        >
          {comparisonModels.map((model, index) => {
            const barColor = getRamBgColor(model.ramGB)
            const widthPercent = maxRam > 0 ? (model.ramGB / maxRam) * 100 : 0

            return (
              <div
                key={model.id}
                className="flex items-center gap-4"
              >
                <span className="w-32 shrink-0 truncate text-right font-mono text-xs text-text-secondary md:w-40 md:text-sm">
                  {model.name}
                </span>
                <div className="relative h-8 flex-1 overflow-hidden rounded bg-bg-surface" style={{ border: '1px solid rgba(244, 244, 245, 0.08)' }}>
                  <div
                    className="absolute left-0 top-0 h-full rounded transition-all duration-700"
                    style={{
                      width: visible ? `${Math.max(widthPercent, 4)}%` : '0%',
                      backgroundColor: barColor,
                      opacity: 0.85,
                      transitionDelay: `${index * 0.04}s`,
                      transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  />
                  <span className="absolute inset-0 flex items-center pl-3 font-mono text-xs font-bold" style={{ color: '#0A090C', mixBlendMode: 'screen' }}>
                    {model.ramGB}GB
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Legend */}
        <div
          className="mt-8 flex flex-wrap items-center justify-center gap-6"
          style={{
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.6s ease 0.5s',
          }}
        >
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full" style={{ backgroundColor: '#00E5A0' }} />
            <span className="font-mono text-xs text-text-secondary">{'< 8GB (Düşük)'}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full" style={{ backgroundColor: '#FFB800' }} />
            <span className="font-mono text-xs text-text-secondary">8-16GB (Orta)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full" style={{ backgroundColor: '#D91E36' }} />
            <span className="font-mono text-xs text-text-secondary">{'16GB+ (Yüksek)'}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════ CTA SECTION ═══════════════════════════ */
function CTASection() {
  const { ref, visible } = useScrollReveal()

  return (
    <section ref={ref} className="bg-bg-obsidian py-24 md:py-32">
      <div
        className="mx-auto max-w-xl px-6 text-center lg:px-10"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <h2 className="font-display text-2xl font-bold text-text-primary md:text-3xl">
          Modelinizi Bulamadınız mı?
        </h2>
        <p className="mt-4 font-body text-lg text-text-secondary">
          Hangi Model? sihirbazımız size en uygun modeli önerir.
        </p>
        <Link
          to="/hangi-model"
          className="mt-8 inline-flex items-center gap-2 rounded bg-accent-red px-7 py-3.5 font-body text-sm font-semibold uppercase tracking-wider text-white transition-all duration-200 hover:bg-accent-red-light hover:scale-[1.02]"
        >
          <Wand2 className="h-4 w-4" />
          Wizard&apos;ı Kullan
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  )
}

/* ═══════════════════════════ PAGE HEADER ═══════════════════════════ */
function PageHeader() {
  return (
    <section className="relative bg-bg-obsidian pt-32 pb-16 md:pt-40 md:pb-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <p
          className="font-body text-sm font-medium uppercase tracking-[0.08em] text-accent-red"
          style={{
            animation: 'fadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both',
          }}
        >
          MODEL KATALOĞU
        </p>
        <h1
          className="mt-3 font-display text-3xl font-bold text-text-primary md:text-4xl lg:text-[4rem] lg:leading-tight"
          style={{
            animation: 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both',
            letterSpacing: '-0.01em',
          }}
        >
          Türkçe-Optimize Yapay Zeka Modelleri
        </h1>
        <p
          className="mt-5 max-w-xl font-body text-base leading-relaxed text-text-secondary md:text-lg"
          style={{
            animation: 'fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both',
          }}
        >
          100&apos;den fazla Türkçe fine-tune edilmiş model arasından ihtiyacınıza en uygun olanı bulun. RAM gereksinimleri, kullanım alanları ve performans metrikleriyle birlikte.
        </p>
      </div>

      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}

/* ═══════════════════════════ EMPTY STATE ═══════════════════════════ */
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <Search className="h-12 w-12 text-text-muted" />
      <h3 className="mt-4 font-display text-lg font-bold text-text-primary">
        Sonuç bulunamadı
      </h3>
      <p className="mt-2 max-w-sm font-body text-sm text-text-secondary">
        Filtrelerinizi değiştirmeyi veya farklı bir arama terimi denemeyi deneyin.
      </p>
    </div>
  )
}

/* ═══════════════════════════ MAIN PAGE ═══════════════════════════ */
export default function Modeller() {
  const [selectedModel, setSelectedModel] = useState<Model | null>(null)

  const {
    searchQuery, setSearchQuery,
    ramFilter, setRamFilter,
    useCaseFilter, setUseCaseFilter,
    sortOption, setSortOption,
    filteredModels,
  } = useModelFilters()

  const handleSelectModel = useCallback((model: Model) => {
    setSelectedModel(model)
  }, [])

  const handleCloseModal = useCallback(() => {
    setSelectedModel(null)
  }, [])

  return (
    <div className="relative">
      {/* Page Header */}
      <PageHeader />

      {/* Filter Bar */}
      <FilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        ramFilter={ramFilter}
        setRamFilter={setRamFilter}
        useCaseFilter={useCaseFilter}
        setUseCaseFilter={setUseCaseFilter}
        sortOption={sortOption}
        setSortOption={setSortOption}
        resultCount={filteredModels.length}
      />

      {/* 3D Model Grid */}
      <section className="bg-bg-obsidian py-16 md:py-20">
        {filteredModels.length > 0 ? (
          <ModelGrid models={filteredModels} onSelect={handleSelectModel} />
        ) : (
          <EmptyState />
        )}
      </section>

      {/* RAM Comparison */}
      {filteredModels.length > 0 ? (
        <RamComparison models={filteredModels} />
      ) : (
        <section className="bg-bg-charcoal py-20 md:py-28">
          <div className="mx-auto max-w-5xl px-6 text-center lg:px-10">
            <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-text-primary md:text-3xl">
              RAM Gereksinimleri Karşılaştırması
            </h2>
            <p className="mx-auto mt-4 max-w-xl font-body text-base text-text-secondary">
              Filtrelenen model bulunamadığı için karşılaştırma gösterilemiyor.
            </p>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <CTASection />

      {/* Detail Modal */}
      <DetailModal model={selectedModel} onClose={handleCloseModal} />
    </div>
  )
}
