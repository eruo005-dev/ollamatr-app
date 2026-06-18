import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { Link } from 'react-router'
import {
  Search,
  Download,
  X,
  MemoryStick,
  ArrowRight,
  Wand2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { MODELS, type Model, type RamBucket, type UseCase } from '@/lib/models-data'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { TiltCard } from '@/components/TiltCard'

/* ═══════════════════════════ TYPES ═══════════════════════════ */
type RamFilter = 'Tüm RAM' | '< 8GB (Düşük)' | '8-16GB (Orta)' | '16GB+ (Yüksek)'
type UseCaseFilter = 'Tümü' | UseCase
type SortOption = 'İsim (A → Z)' | 'RAM (Düşük → Yüksek)' | 'RAM (Yüksek → Düşük)'

const PAGE_SIZE = 9

/* ═══════════════════════════ UTILITY FUNCTIONS ═══════════════════════════ */
function getRamColorClass(ramGB: number): string {
  if (ramGB < 8) return 'text-safe-green'
  if (ramGB <= 16) return 'text-warn-yellow'
  return 'text-accent-red-light'
}

function getRamBgColor(ramGB: number): string {
  if (ramGB < 8) return '#00E5A0'
  if (ramGB <= 16) return '#FFB800'
  return '#D91E36'
}

function ramFilterToBucket(filter: RamFilter): RamBucket | null {
  switch (filter) {
    case '< 8GB (Düşük)': return '< 8GB'
    case '8-16GB (Orta)': return '8-16GB'
    case '16GB+ (Yüksek)': return '16GB+'
    default: return null
  }
}

/* ═══════════════════════════ FILTER HOOK ═══════════════════════════ */
function useModelFilters() {
  const [searchQuery, setSearchQuery] = useState('')
  const [ramFilter, setRamFilter] = useState<RamFilter>('Tüm RAM')
  const [useCaseFilter, setUseCaseFilter] = useState<UseCaseFilter>('Tümü')
  const [sortOption, setSortOption] = useState<SortOption>('İsim (A → Z)')

  const filteredModels = useMemo(() => {
    let result = [...MODELS]

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.shortName.toLowerCase().includes(q) ||
          m.description.toLowerCase().includes(q) ||
          m.tags.some((t) => t.toLowerCase().includes(q)) ||
          m.useCases.some((u) => u.toLowerCase().includes(q))
      )
    }

    const bucket = ramFilterToBucket(ramFilter)
    if (bucket) {
      result = result.filter((m) => m.ramBucket === bucket)
    }

    if (useCaseFilter !== 'Tümü') {
      result = result.filter((m) => m.useCases.includes(useCaseFilter))
    }

    switch (sortOption) {
      case 'İsim (A → Z)':
        result.sort((a, b) => a.name.localeCompare(b.name, 'tr'))
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

/* ═══════════════════════════ MODEL CARD ═══════════════════════════ */
interface ModelCardProps {
  model: Model
  onSelect: (model: Model) => void
}

function ModelCard({ model, onSelect }: ModelCardProps) {
  return (
    <TiltCard
      className="cursor-pointer rounded-lg border border-border-subtle bg-bg-charcoal p-6 md:p-7 outline-none focus-visible:ring-2 focus-visible:ring-accent-red"
      onClick={() => onSelect(model)}
      role="button"
      aria-label={`${model.name} detaylarını gör`}
    >
      {/* Top row: name + RAM badge */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-col gap-1.5">
          <h3 className="font-display text-lg font-bold leading-tight text-text-primary md:text-xl">
            {model.name}
          </h3>
          {!model.commercialUse && (
            <span className="inline-flex w-fit items-center rounded-sm border border-warn-yellow/30 bg-warn-yellow/15 px-2 py-0.5 font-mono text-xs uppercase text-warn-yellow">
              Ticari Olmayan
            </span>
          )}
        </div>
        <span
          className={`flex shrink-0 items-center gap-1 rounded-sm bg-bg-surface px-2 py-1 font-mono text-xs uppercase tracking-wide ${getRamColorClass(model.ramGB)}`}
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

      {/* Attribution */}
      <p className="mt-2 font-mono text-xs text-text-muted">
        {model.attribution}
      </p>

      {/* Tags */}
      <div className="mt-4 flex flex-wrap gap-2">
        {model.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-sm bg-bg-surface px-2 py-0.5 font-mono text-[10px] font-normal tracking-wider text-text-muted"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Source repo (verifiable) */}
      <p className="mt-4 truncate font-mono text-[10px] text-text-muted">
        Kaynak: {model.source}
      </p>

      {/* Bottom row: actions */}
      <div className="mt-5 flex items-center justify-end gap-2 border-t border-border-subtle pt-4">
        <button
          onClick={(e) => {
            e.stopPropagation()
            onSelect(model)
          }}
          className="inline-flex items-center gap-1.5 rounded-sm border border-border-subtle px-3 py-2 font-body text-xs font-semibold uppercase tracking-wider text-text-primary transition-all duration-200 hover:border-accent-red hover:text-accent-red-light"
          aria-label={`${model.name} detaylarını aç`}
        >
          Detaylar
          <ArrowRight className="h-3 w-3" />
        </button>
        <a
          href={`https://ollama.com/search?q=${encodeURIComponent(model.shortName)}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1.5 rounded-sm bg-accent-red-deep px-4 py-2 font-body text-xs font-semibold uppercase tracking-wider text-white transition-all duration-200 hover:bg-[#A01528]"
          aria-label={`${model.name} için Ollama Hub'da ara`}
        >
          <Download className="h-3.5 w-3.5" />
          İndir
        </a>
      </div>
    </TiltCard>
  )
}

/* ═══════════════════════════ DETAIL MODAL ═══════════════════════════ */
interface DetailModalProps {
  model: Model | null
  onClose: () => void
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

function DetailModal({ model, onClose }: DetailModalProps) {
  const backdropRef = useRef<HTMLDivElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const previouslyFocusedRef = useRef<HTMLElement | null>(null)
  const [isClosing, setIsClosing] = useState(false)
  const [showContent, setShowContent] = useState(false)

  const handleClose = useCallback(() => {
    setIsClosing(true)
    setShowContent(false)
    setTimeout(() => {
      onClose()
      setIsClosing(false)
    }, 250)
  }, [onClose])

  /* Body overflow lock — store previous value and restore on cleanup. */
  useEffect(() => {
    if (!model) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [model])

  /* Open animation + focus management. */
  useEffect(() => {
    if (!model) return
    setIsClosing(false)
    setShowContent(true)
    previouslyFocusedRef.current = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null
    // Focus first focusable element after the dialog mounts.
    const t = window.setTimeout(() => {
      const dialog = dialogRef.current
      if (!dialog) return
      const focusables = dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      focusables[0]?.focus()
    }, 0)
    return () => {
      window.clearTimeout(t)
      // Restore focus to whatever was focused before opening.
      previouslyFocusedRef.current?.focus?.()
    }
  }, [model])

  /* Escape + Tab focus trap. */
  useEffect(() => {
    if (!model) return
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        handleClose()
        return
      }
      if (e.key !== 'Tab') return
      const dialog = dialogRef.current
      if (!dialog) return
      const focusables = Array.from(
        dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      ).filter((el) => !el.hasAttribute('disabled'))
      if (focusables.length === 0) {
        e.preventDefault()
        return
      }
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      const active = document.activeElement as HTMLElement | null
      if (e.shiftKey) {
        if (active === first || !dialog.contains(active)) {
          e.preventDefault()
          last.focus()
        }
      } else {
        if (active === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [model, handleClose])

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
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="model-detail-title"
        className="relative w-full max-w-2xl rounded-xl border border-border-subtle bg-bg-charcoal p-8 md:p-12"
        style={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          transform: showContent && !isClosing ? 'scale(1)' : 'scale(0.9)',
          opacity: showContent && !isClosing ? 1 : 0,
          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded p-2 text-text-secondary transition-colors hover:text-accent-red-light md:right-6 md:top-6"
          aria-label="Kapat"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="flex flex-wrap items-start gap-4">
          <h2 id="model-detail-title" className="font-display text-2xl font-bold text-text-primary md:text-3xl">
            {model.name}
          </h2>
          {!model.commercialUse && (
            <span className="inline-flex items-center rounded-sm border border-warn-yellow/30 bg-warn-yellow/15 px-2 py-0.5 font-mono text-xs uppercase text-warn-yellow">
              Ticari Olmayan
            </span>
          )}
          <span
            className={`flex items-center gap-1 rounded-sm bg-bg-surface px-3 py-1.5 font-mono text-xs uppercase tracking-wide ${ramColor}`}
            style={{ border: `1px solid ${ramHex}40` }}
          >
            <MemoryStick className="h-3.5 w-3.5" />
            {model.ramGB}GB RAM
          </span>
        </div>

        {/* Description */}
        <p className="mt-4 font-body text-base leading-relaxed text-text-secondary">
          {model.description}
        </p>

        {/* Specs grid */}
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
          <SpecItem label="Kısa Ad" value={model.shortName} />
          <SpecItem label="RAM (tahmini)" value={`~${model.ramGB}GB`} color={ramHex} />
          <SpecItem label="RAM Sınıfı" value={model.ramBucket} />
          <SpecItem label="Kaynak (HF)" value={model.source} />
        </div>

        {/* Use cases */}
        <div className="mt-6">
          <p className="font-mono text-[10px] uppercase tracking-wider text-text-muted">Kullanım Alanları</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {model.useCases.map((uc) => (
              <span
                key={uc}
                className="rounded-sm border border-border-subtle bg-bg-surface px-3 py-1 font-mono text-xs tracking-wider text-text-secondary"
              >
                {uc}
              </span>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="mt-6 flex flex-wrap gap-2">
          {model.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-sm border border-border-subtle bg-bg-surface px-3 py-1 font-mono text-xs tracking-wider text-text-secondary"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* License section */}
        <div className="mt-6 rounded-sm border border-border-subtle bg-bg-surface p-4">
          <p className="font-mono text-[10px] uppercase tracking-wider text-text-muted">Lisans</p>
          <p className="mt-1 font-body text-sm font-semibold text-text-primary">
            {model.license}
            {!model.commercialUse && (
              <span className="ml-2 inline-flex items-center rounded-sm border border-warn-yellow/30 bg-warn-yellow/15 px-2 py-0.5 font-mono text-[10px] uppercase text-warn-yellow">
                Ticari Olmayan
              </span>
            )}
          </p>
          <p className="mt-2 font-body text-xs leading-relaxed text-text-secondary">
            {model.attribution}
          </p>
        </div>

        {/* Performance note */}
        <p className="mt-6 font-body text-sm leading-relaxed text-text-muted">
          Bu model yaklaşık {model.ramGB}GB RAM gerektirir (~Q4 quant tahmini). GPU hızlandırma önerilir. OllamaTR ile tek komutla indirin ve çalıştırın.
        </p>

        {/* Action buttons */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={`https://ollama.com/search?q=${encodeURIComponent(model.shortName)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-sm bg-accent-red-deep px-6 py-3.5 font-body text-sm font-semibold uppercase tracking-wider text-white transition-all duration-200 hover:bg-[#A01528]"
          >
            <Download className="h-4 w-4" />
            Modeli İndir
          </a>
          <Link
            to="/hangi-model"
            className="inline-flex items-center justify-center gap-2 rounded-sm border border-border-subtle px-6 py-3.5 font-body text-sm font-semibold uppercase tracking-wider text-text-primary transition-all duration-200 hover:border-accent-red hover:text-accent-red-light"
            onClick={handleClose}
          >
            <Wand2 className="h-4 w-4" />
            Hangi Model Sihirbazı
          </Link>
          <button
            onClick={handleClose}
            className="inline-flex items-center justify-center gap-2 rounded-sm border border-border-subtle px-6 py-3.5 font-body text-sm font-semibold uppercase tracking-wider text-text-secondary transition-all duration-200 hover:border-accent-red hover:text-accent-red-light sm:ml-auto"
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
    <div className="rounded-sm bg-bg-surface p-3" style={{ border: '1px solid rgba(244, 244, 245, 0.08)' }}>
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
const SORT_OPTIONS: SortOption[] = ['İsim (A → Z)', 'RAM (Düşük → Yüksek)', 'RAM (Yüksek → Düşük)']

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
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          {/* Search */}
          <div className="relative flex-1 lg:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Model ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Model ara"
              aria-controls="model-grid"
              aria-describedby="result-count"
              className="w-full rounded-sm border border-border-subtle bg-bg-surface py-2.5 pl-10 pr-4 font-body text-sm text-text-primary placeholder-text-muted outline-none transition-colors focus:border-accent-red"
            />
          </div>

          {/* RAM + Sort dropdowns */}
          <div className="flex flex-wrap items-center gap-3">
            <label className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-text-muted">
              <span>RAM</span>
              <select
                value={ramFilter}
                onChange={(e) => setRamFilter(e.target.value as RamFilter)}
                className="appearance-none rounded-sm border border-border-subtle bg-bg-surface py-2 pl-3 pr-3 font-body text-sm normal-case text-text-primary outline-none transition-colors focus:border-accent-red cursor-pointer"
              >
                {RAM_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </label>

            <label className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-text-muted">
              <span>Sırala</span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                className="appearance-none rounded-sm border border-border-subtle bg-bg-surface py-2 pl-3 pr-3 font-body text-sm normal-case text-text-primary outline-none transition-colors focus:border-accent-red cursor-pointer"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {/* Use case pill toggle group */}
        <div className="mt-4 flex flex-wrap items-center gap-2" role="group" aria-label="Kullanım alanı filtresi">
          {USE_CASE_OPTIONS.map((opt) => {
            const active = useCaseFilter === opt
            return (
              <button
                key={opt}
                type="button"
                onClick={() => setUseCaseFilter(opt)}
                aria-pressed={active}
                className={`rounded-sm px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors ${
                  active
                    ? 'border border-accent-red text-accent-red-light'
                    : 'border border-border-subtle text-text-secondary hover:border-accent-red-light hover:text-text-primary'
                }`}
              >
                {opt}
              </button>
            )
          })}
        </div>

        {/* Result count */}
        <p id="result-count" className="mt-3 font-mono text-xs text-text-muted" aria-live="polite">
          {resultCount} model gösteriliyor
        </p>
      </div>
    </div>
  )
}

/* ═══════════════════════════ PAGINATION ═══════════════════════════ */
interface PaginationProps {
  page: number
  pageCount: number
  onChange: (page: number) => void
}

function Pagination({ page, pageCount, onChange }: PaginationProps) {
  if (pageCount <= 1) return null
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1)

  return (
    <nav
      className="mx-auto mt-12 flex max-w-7xl flex-wrap items-center justify-center gap-2 px-6 lg:px-10"
      aria-label="Sayfa gezinmesi"
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="inline-flex items-center gap-1.5 rounded-sm border border-border-subtle px-4 py-2 font-mono text-xs uppercase tracking-wider text-text-primary transition-colors hover:border-accent-red hover:text-accent-red-light disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-border-subtle disabled:hover:text-text-primary"
      >
        <ChevronLeft className="h-3.5 w-3.5" />
        Önceki
      </button>

      <div className="flex flex-wrap items-center gap-1.5">
        {pages.map((p) => {
          const active = p === page
          return (
            <button
              key={p}
              type="button"
              onClick={() => onChange(p)}
              aria-current={active ? 'page' : undefined}
              className={`min-w-9 rounded-sm px-3 py-1.5 font-mono text-xs transition-colors ${
                active
                  ? 'border border-accent-red text-accent-red-light'
                  : 'border border-border-subtle text-text-secondary hover:border-accent-red-light hover:text-text-primary'
              }`}
            >
              {p}
            </button>
          )
        })}
      </div>

      <button
        type="button"
        onClick={() => onChange(Math.min(pageCount, page + 1))}
        disabled={page === pageCount}
        className="inline-flex items-center gap-1.5 rounded-sm border border-border-subtle px-4 py-2 font-mono text-xs uppercase tracking-wider text-text-primary transition-colors hover:border-accent-red hover:text-accent-red-light disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-border-subtle disabled:hover:text-text-primary"
      >
        Sonraki
        <ChevronRight className="h-3.5 w-3.5" />
      </button>
    </nav>
  )
}

/* ═══════════════════════════ MODEL GRID ═══════════════════════════ */
interface ModelGridProps {
  models: Model[]
  onSelect: (model: Model) => void
}

function ModelGrid({ models: gridModels, onSelect }: ModelGridProps) {
  const cardRefs = useRef<Map<number, HTMLElement>>(new Map())
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set())
  const [prevGridModels, setPrevGridModels] = useState(gridModels)

  // Reset visible-card entrance animations when filter inputs change.
  // React docs: derived-state-on-input-change is computed during render,
  // not in an effect, to avoid cascading renders.
  if (prevGridModels !== gridModels) {
    setPrevGridModels(gridModels)
    setVisibleCards(new Set())
  }

  // Respect prefers-reduced-motion: if reduced, mark every card visible up front
  // so the grid renders fully without entrance transitions.
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  // Observe whichever cards are currently mounted via refs.
  useEffect(() => {
    if (prefersReducedMotion) {
      setVisibleCards(new Set(gridModels.map((m) => m.id)))
      return
    }
    const elements = Array.from(cardRefs.current.entries())
    if (elements.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = Number((entry.target as HTMLElement).dataset.id)
            if (!Number.isNaN(id)) {
              setVisibleCards((prev) => {
                if (prev.has(id)) return prev
                const next = new Set(prev)
                next.add(id)
                return next
              })
            }
          }
        })
      },
      { threshold: 0.15 }
    )
    elements.forEach(([, el]) => observer.observe(el))
    return () => observer.disconnect()
  }, [gridModels, prefersReducedMotion])

  return (
    <div
      id="model-grid"
      className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 sm:grid-cols-2 lg:grid-cols-3 lg:px-10"
    >
      {gridModels.map((model, index) => {
        const isVisible = prefersReducedMotion || visibleCards.has(model.id)
        return (
          <div
            key={model.id}
            ref={(el) => {
              if (el) {
                el.dataset.id = String(model.id)
                cardRefs.current.set(model.id, el)
              } else {
                cardRefs.current.delete(model.id)
              }
            }}
            className="model-card"
            style={
              prefersReducedMotion
                ? undefined
                : {
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
                    transition: `opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.06}s, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.06}s`,
                  }
            }
          >
            <ModelCard model={model} onSelect={onSelect} />
          </div>
        )
      })}
    </div>
  )
}

/* ═══════════════════════════ RAM COMPARISON ═══════════════════════════ */
function RamComparison({ models: comparisonModels }: { models: Model[] }) {
  const { ref, visible } = useScrollReveal<HTMLElement>(0.1)

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
          <h2 className="text-center font-display text-2xl font-bold tracking-tight text-text-primary md:text-3xl">
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
                <div className="relative h-8 flex-1 overflow-hidden rounded-sm bg-bg-surface" style={{ border: '1px solid rgba(244, 244, 245, 0.08)' }}>
                  <div
                    className="absolute left-0 top-0 h-full rounded-sm transition-all duration-700"
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
  const { ref, visible } = useScrollReveal<HTMLElement>()

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
          className="mt-8 inline-flex items-center gap-2 rounded-sm bg-accent-red-deep px-7 py-3.5 font-body text-sm font-semibold uppercase tracking-wider text-white transition-all duration-200 hover:bg-[#A01528] hover:scale-[1.02]"
        >
          <Wand2 className="h-4 w-4" />
          Sihirbazı Kullan
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
          className="font-body text-sm font-medium uppercase tracking-[0.08em] text-accent-red-light"
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
          Türkçe-Optimize Edilmiş Yapay Zeka Modelleri
        </h1>
        <p
          className="mt-5 max-w-xl font-body text-base leading-relaxed text-text-secondary md:text-lg"
          style={{
            animation: 'fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both',
          }}
        >
          Türkçe için eğitilmiş, gerçek ve doğrulanmış model kataloğumuzdan ihtiyacınıza en uygun olanı bulun. Tahmini RAM gereksinimleri, kullanım alanları ve kaynak depoları ile birlikte.
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
  const [page, setPage] = useState(1)

  const {
    searchQuery, setSearchQuery,
    ramFilter, setRamFilter,
    useCaseFilter, setUseCaseFilter,
    sortOption, setSortOption,
    filteredModels,
  } = useModelFilters()

  // Reset to page 1 whenever filters change. React 19 "derive during render" pattern.
  const [lastFilter, setLastFilter] = useState(filteredModels)
  if (lastFilter !== filteredModels) {
    setLastFilter(filteredModels)
    setPage(1)
  }

  const pageCount = Math.max(1, Math.ceil(filteredModels.length / PAGE_SIZE))
  const currentPage = Math.min(page, pageCount)
  const pagedModels = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE
    return filteredModels.slice(start, start + PAGE_SIZE)
  }, [filteredModels, currentPage])

  const handleSelectModel = useCallback((model: Model) => {
    setSelectedModel(model)
  }, [])

  const handleCloseModal = useCallback(() => {
    setSelectedModel(null)
  }, [])

  return (
    <div className="relative">
      <PageHeader />

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

      <section className="bg-bg-obsidian py-16 md:py-20">
        {filteredModels.length > 0 ? (
          <>
            <ModelGrid models={pagedModels} onSelect={handleSelectModel} />
            <Pagination page={currentPage} pageCount={pageCount} onChange={setPage} />
          </>
        ) : (
          <EmptyState />
        )}
      </section>

      {filteredModels.length > 0 && <RamComparison models={filteredModels} />}

      <CTASection />

      <DetailModal model={selectedModel} onClose={handleCloseModal} />
    </div>
  )
}
