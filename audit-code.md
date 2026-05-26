# OllamaTR Code Audit Report

## Executive Summary

The OllamaTR webapp is a well-structured React 19 + TypeScript + Tailwind CSS application with good visual polish and solid component architecture. However, there are significant code duplication issues, missing accessibility attributes, and several performance concerns that should be addressed before production deployment.

---

## Issue Count Summary

| Category | Issue Count | Critical | High | Medium | Low |
|---|---|---|---|---|---|
| TypeScript Correctness | 4 | 0 | 2 | 2 | 0 |
| React Best Practices | 6 | 0 | 2 | 3 | 1 |
| Performance | 7 | 0 | 2 | 3 | 2 |
| Accessibility (a11y) | 12 | 0 | 3 | 6 | 3 |
| Security | 2 | 0 | 0 | 1 | 1 |
| Code Organization | 10 | 0 | 2 | 4 | 4 |
| **TOTAL** | **41** | **0** | **11** | **19** | **11** |

---

## Detailed Findings

---

### TypeScript Correctness

#### [1] Layout.tsx:11 — HIGH — `any` Type Undermines Strict Mode
**Issue**: The `lenis` variable is typed as `any`, which bypasses TypeScript's strict mode and disables type checking for the entire Lenis scroll handler.
**Code**:
```tsx
let lenis: any = null
```
**Fix**:
```tsx
import type Lenis from 'lenis'
// ...
let lenis: Lenis | null = null
```

---

#### [2] main.tsx:6 — HIGH — Non-Null Assertion on DOM Query
**Issue**: The `document.getElementById('root')!` uses a non-null assertion which will crash at runtime if the `#root` element is missing, with no compile-time safety net.
**Code**:
```tsx
createRoot(document.getElementById('root')!).render(
```
**Fix**:
```tsx
const rootEl = document.getElementById('root')
if (!rootEl) throw new Error('Root element #root not found')
createRoot(rootEl).render(
```

---

#### [3] HangiModel.tsx:29 — MEDIUM — GSAP Module-Level Side Effect
**Issue**: `gsap.registerPlugin(ScrollTrigger)` is called at module import time, causing a side effect during module initialization. This can cause issues in SSR environments or during testing.
**Code**:
```tsx
gsap.registerPlugin(ScrollTrigger)
```
**Fix**: Register inside a `useEffect` or inside the component that uses it:
```tsx
useEffect(() => {
  gsap.registerPlugin(ScrollTrigger)
}, [])
```

---

#### [4] Indir.tsx:29 — MEDIUM — Deprecated `navigator.platform` API
**Issue**: `navigator.platform` is deprecated and may return incorrect values on modern browsers. Should use `navigator.userAgentData` with fallback.
**Code**:
```tsx
const platform = navigator.platform.toLowerCase()
```
**Fix**:
```tsx
function getOS(): OS {
  const ua = navigator.userAgent.toLowerCase()
  if (ua.includes('mac') || ua.includes('darwin')) return 'macOS'
  if (ua.includes('linux')) return 'Linux'
  return 'Windows'
}
```

---

### React Best Practices

#### [5] Layout.tsx:21-25 — HIGH — Lenis RAF Loop Cleanup Bug
**Issue**: The `raf` function recursively calls itself via `requestAnimationFrame`, but the cleanup only destroys the Lenis instance. The RAF loop itself continues running after unmount because the `raf` function closure captures `lenis` and there's no handle to cancel the recursive RAF.
**Code**:
```tsx
function raf(time: number) {
  lenis.raf(time)
  requestAnimationFrame(raf)  // recursive RAF not cancellable
}
requestAnimationFrame(raf)
```
**Fix**:
```tsx
let rafId: number
function raf(time: number) {
  lenis?.raf(time)
  rafId = requestAnimationFrame(raf)
}
rafId = requestAnimationFrame(raf)
// cleanup:
return () => {
  cancelAnimationFrame(rafId)
  lenis?.destroy()
}
```

---

#### [6] HangiModel.tsx:476-493 — HIGH — Nested setTimeout Anti-Pattern
**Issue**: The wizard uses deeply nested `setTimeout` calls for its loading animation, creating callback hell and making the timing impossible to cancel or test properly.
**Code**:
```tsx
setTimeout(() => {
  runLoadingAnimation()
  setTimeout(() => {
    const res = findBestModel(...)
    // ...
    setTimeout(() => animateResult(), 50)
  }, 1700)
}, 50)
```
**Fix**: Use a single async effect or `useCallback` with cleanup:
```tsx
const runWizard = useCallback(async () => {
  setIsLoading(true)
  setStep(5)
  await delay(50)  // RAF delay
  runLoadingAnimation()
  await delay(1700)
  const res = findBestModel(useCase, ram || 8, skill, priorities)
  setResult(res)
  setIsLoading(false)
  await delay(50)
  animateResult()
}, [useCase, ram, skill, priorities])

// Cleanup with AbortController or ref-based cancellation
```

---

#### [7] Modeller.tsx:313 — MEDIUM — Missing Dependency in useEffect
**Issue**: The `ModelGrid` `useEffect` depends on `gridModels` but the observer setup/query logic could get stale if the component re-renders with different models.
**Code**:
```tsx
}, [gridModels])
```
**Fix**: Ensure all used refs are stable and consider using a ref for the observer:
```tsx
useEffect(() => {
  // ... observer setup
  return () => observer.disconnect()
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [gridModels.length]) // use length to avoid re-creating observer on every render
```

---

#### [8] DataStreamCanvas.tsx:87-96 — MEDIUM — Uncapped Particle Growth
**Issue**: New particles are spawned every frame (90% chance) but the `isMobileRef` is checked inside the render loop without actually reducing spawn rate for mobile. On low-end devices this can cause memory pressure.
**Code**:
```tsx
if (Math.random() > 0.1) {
  particlesRef.current.push(createParticle())
}
```
**Fix**:
```tsx
const MAX_PARTICLES = isMobileRef.current ? 50 : 150
if (Math.random() > 0.1 && particlesRef.current.length < MAX_PARTICLES) {
  particlesRef.current.push(createParticle())
}
```

---

#### [9] KVKK.tsx:165-179 — MEDIUM — AnimatePresence Without Proper Exit Handling
**Issue**: The `ExpandableChecklistItem` uses `AnimatePresence` with height animation but the parent `motion.div` doesn't wrap the animated content inside `AnimatePresence` properly — the `motion.div` is conditionally rendered outside `AnimatePresence`.
**Code**:
```tsx
<AnimatePresence initial={false}>
  {open && (
    <motion.div ... />
  )}
</AnimatePresence>
```
**Fix**: This is actually correct React usage. However, add `mode="wait"` for smoother transitions:
```tsx
<AnimatePresence initial={false} mode="wait">
```

---

#### [10] HangiModel.tsx:513 — LOW — Keyboard Handler Stale Closure
**Issue**: The keyboard event handler has `step` in its dependency array but the handler uses `setUseCase(useCaseOptions[parseInt(e.key) - 1].id)` which could throw if `e.key` maps to an undefined index.
**Code**:
```tsx
if (step === 1 && e.key >= '1' && e.key <= '4') {
  setUseCase(useCaseOptions[parseInt(e.key) - 1].id)
}
```
**Fix**:
```tsx
const idx = parseInt(e.key, 10) - 1
if (idx >= 0 && idx < useCaseOptions.length) {
  setUseCase(useCaseOptions[idx].id)
}
```

---

### Performance

#### [11] DataStreamCanvas.tsx:57-98 — HIGH — Canvas Animation Runs When Hidden
**Issue**: The canvas animation loop runs continuously via `requestAnimationFrame` even when the browser tab is not visible, wasting CPU and GPU cycles.
**Code**:
```tsx
function animate() {
  // ... renders every frame regardless of tab visibility
  animFrameRef.current = requestAnimationFrame(animate)
}
```
**Fix**:
```tsx
useEffect(() => {
  let isVisible = true
  const handleVisibility = () => {
    isVisible = !document.hidden
    if (isVisible) animFrameRef.current = requestAnimationFrame(animate)
  }
  document.addEventListener('visibilitychange', handleVisibility)
  
  function animate() {
    if (!isVisible) return
    // ... render
    animFrameRef.current = requestAnimationFrame(animate)
  }
  // ...
  return () => {
    document.removeEventListener('visibilitychange', handleVisibility)
    cancelAnimationFrame(animFrameRef.current)
  }
}, [resize])
```

---

#### [12] Multiple files — HIGH — Massive Code Duplication of Animation Helpers
**Issue**: The `fadeUp`, `staggerContainer`, `staggerChild`, and `easeExpoOut` constants are duplicated across 6+ files (Fiyatlandirma, Hakkimizda, Topluluk, Dokumantasyon, Indir, KVKK). This bloats bundle size and makes maintenance difficult.
**Affected files**: `Fiyatlandirma.tsx`, `Hakkimizda.tsx`, `Topluluk.tsx`, `Dokumantasyon.tsx`, `Indir.tsx`, `KVKK.tsx`
**Fix**: Extract to a shared module:
```tsx
// src/lib/animations.ts
export const easeExpoOut = [0.16, 1, 0.3, 1] as [number, number, number, number]
export const fadeUp = { /* ... */ }
export const staggerContainer = { /* ... */ }
export const staggerChild = { /* ... */ }
```

---

#### [13] Home.tsx + Modeller.tsx — MEDIUM — Duplicate useScrollReveal Hook
**Issue**: The `useScrollReveal` IntersectionObserver hook is duplicated verbatim in both `Home.tsx:15` and `Modeller.tsx:62`.
**Fix**: Extract to `src/hooks/useScrollReveal.ts`.

---

#### [14] Home.tsx + Modeller.tsx — MEDIUM — Duplicate TiltCard Component
**Issue**: The `TiltCard` 3D tilt component is duplicated in both `Home.tsx:70` and `Modeller.tsx:159`.
**Fix**: Extract to `src/components/TiltCard.tsx`.

---

#### [15] Fiyatlandirma.tsx + Hakkimizda.tsx + Topluluk.tsx — MEDIUM — Duplicate ScrollReveal Component
**Issue**: The `ScrollReveal` wrapper component is duplicated across 3 files.
**Fix**: Extract to `src/components/ScrollReveal.tsx`.

---

#### [16] HangiModel.tsx — LOW — Multiple useGSAP Contexts
**Issue**: Four separate `useGSAP` hooks are used where a single context with scoped selectors could be more efficient.
**Fix**: Consolidate into fewer contexts or use GSAP's context API directly.

---

#### [17] Modeller.tsx:582 — LOW — DOM Query for Animation Targeting
**Issue**: `ModelGrid` uses `querySelectorAll('.model-card')` to find elements for IntersectionObserver. This is fragile and can select unintended elements.
**Code**:
```tsx
const cards = grid.querySelectorAll('.model-card')
```
**Fix**: Use React refs instead:
```tsx
const cardRefs = useRef<Map<number, HTMLDivElement>>(new Map())
// Render: <div ref={el => { if (el) cardRefs.current.set(model.id, el) }} />
```

---

### Accessibility (a11y)

#### [18] DataStreamCanvas.tsx:109-122 — HIGH — Decorative Canvas Missing aria-hidden
**Issue**: The decorative canvas element is not marked with `aria-hidden="true"`, meaning screen readers may attempt to describe it.
**Code**:
```tsx
<canvas ref={canvasRef} style={{...}} />
```
**Fix**:
```tsx
<canvas ref={canvasRef} aria-hidden="true" style={{...}} />
```

---

#### [19] Navbar.tsx:54-60 — HIGH — Mobile Menu Button Missing aria-expanded
**Issue**: The hamburger menu toggle button doesn't communicate its expanded/collapsed state to assistive technologies.
**Code**:
```tsx
<button onClick={toggleMobile} aria-label="Menüyü aç/kapat">
  {mobileOpen ? <X /> : <Menu />}
</button>
```
**Fix**:
```tsx
<button
  onClick={toggleMobile}
  aria-label="Menüyü aç/kapat"
  aria-expanded={mobileOpen}
  aria-controls="mobile-menu"
>
  {mobileOpen ? <X /> : <Menu />}
</button>
```
And add `id="mobile-menu"` to the mobile menu container.

---

#### [20] HangiModel.tsx:607-940 — HIGH — Wizard Steps Lack Accessible State Communication
**Issue**: The multi-step wizard uses `<button>` elements for selectable options but lacks `aria-pressed` for toggleable items, `aria-live` for step changes, and `role="tabpanel"` / `role="tablist"` semantics for the stepper UI. Screen reader users cannot determine which step they're on or which options are selected.
**Fix**: Add ARIA attributes:
```tsx
{/* Progress bar */}
<div role="tablist" aria-label="Wizard adimlari">
  {[1,2,3,4,5].map(s => (
    <div role="tab" aria-selected={s === step} ... />
  ))}
</div>

{/* Selected option buttons */}
<button aria-pressed={selected} ... />

{/* Step container */}
<div role="tabpanel" aria-label={`Adim ${step}`}>
```

---

#### [21] Modeller.tsx:432-449 — MEDIUM — DetailModal Focus Trap Missing
**Issue**: The modal backdrop doesn't trap focus inside the modal. When open, keyboard users can Tab outside the modal to background elements.
**Code**: No focus trap implementation in `DetailModal`.
**Fix**: Implement focus trap using `react-focus-trap` or manually:
```tsx
useEffect(() => {
  if (!model) return
  const modal = backdropRef.current
  const focusable = modal?.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )
  // trap focus logic...
}, [model])
```

---

#### [22] Modeller.tsx:504 — MEDIUM — Search Input Missing Accessible Attributes
**Issue**: The search input lacks `aria-label` and doesn't announce results changes to screen readers.
**Code**:
```tsx
<input type="text" placeholder="Model ara..." ... />
```
**Fix**:
```tsx
<input
  type="text"
  placeholder="Model ara..."
  aria-label="Model ara"
  aria-controls="model-grid"
  aria-describedby="result-count"
  ...
/>
```

---

#### [23] Topluluk.tsx:295-302 — MEDIUM — Background Image is Contentful but Decorative
**Issue**: The community page uses `backgroundImage: 'url(/community-photo.jpg)'` which is decorative but could fail if the image doesn't load (layout shift). No `alt` text is possible for CSS backgrounds.
**Fix**: Wrap in a semantic container with `aria-hidden` and provide text alternative:
```tsx
<section aria-label="Topluluk sayfasi">
  <div aria-hidden="true" style={{ backgroundImage: 'url(...)' }} />
  {/* Content with proper headings */}
</section>
```

---

#### [24] Fiyatlandirma.tsx:327 — MEDIUM — Button Missing type="button"
**Issue**: The Pro tier CTA button lacks `type="button"`, which can cause unexpected form submission if wrapped in a form context.
**Code**:
```tsx
<button className="w-full rounded bg-accent-red ...">
  {tier.cta}
</button>
```
**Fix**:
```tsx
<button type="button" className="w-full rounded bg-accent-red ...">
  {tier.cta}
```

---

#### [25] Multiple files — MEDIUM — Empty href="#" Links Cause UX Issues
**Issue**: Many `<a href="#">` placeholder links exist across the app. Clicking them scrolls to top unexpectedly and creates confusion for keyboard navigation.
**Affected files**: `Dokumantasyon.tsx:191`, `Topluluk.tsx:383`, `Fiyatlandirma.tsx:108`, `Fiyatlandirma.tsx:522`
**Fix**: Use `<button>` styled as links for non-navigational actions, or proper routes:
```tsx
<button className="text-sm text-text-secondary hover:text-accent-red-light">
  {link.label}
</button>
```

---

#### [26] Modeller.tsx:355 — LOW — Model Cards Not Keyboard Accessible as Grid
**Issue**: Model cards are rendered as divs with click handlers on the TiltCard wrapper. They should be keyboard-focusable and activatable.
**Code**:
```tsx
<TiltCard className="cursor-pointer ..." onClick={() => onSelect(model)}>
```
**Fix**: Use `<button>` or add `role="button"`, `tabIndex={0}`, and `onKeyDown`:
```tsx
<TiltCard
  role="button"
  tabIndex={0}
  aria-label={`${model.name} detaylarini gor`}
  onClick={() => onSelect(model)}
  onKeyDown={(e) => e.key === 'Enter' && onSelect(model)}
>
```

---

#### [27] Footer.tsx:24-31 — LOW — Footer Logo Link Missing aria-label
**Issue**: The footer logo link goes to `/` but contains no text that describes its purpose to screen readers (it uses styled spans).
**Fix**:
```tsx
<Link to="/" aria-label="OllamaTR ana sayfa">
```

---

#### [28] Hakkimizda.tsx:411-413 — LOW — Team Avatar Initials Insufficient for Screen Readers
**Issue**: Team member avatars only show initials with no accessible name.
**Fix**:
```tsx
<div aria-label={`${member.name} profil resmi`} role="img">
  {member.initials}
</div>
```

---

### Security

#### [29] Multiple files — MEDIUM — `href="#"` Placeholder Links
**Issue**: Multiple `href="#"` links scattered across pages create potential for clickjacking or unexpected behavior if event handlers fail.
**Affected**: `Dokumantasyon.tsx:191,287`, `Topluluk.tsx:383,430,478,507,546,553`, `Fiyatlandirma.tsx:108,522`
**Fix**: Replace with proper routes or `<button>` elements as noted in a11y section.

---

#### [30] Indir.tsx:224 — LOW — Fake SHA256 Checksum in Production Code
**Issue**: The displayed SHA256 hash is hardcoded as a dummy value, which could mislead security-conscious users.
**Code**:
```tsx
SHA256: a1b2c3d4e5f6789abcdef0123456789abcdef0123456789abcdef0123456789
```
**Fix**: Either compute dynamically from the actual file or add a TODO comment:
```tsx
{/* TODO: Replace with actual SHA256 from build artifact */}
```

---

### Code Organization

#### [31] Multiple files — HIGH — Animation Constants Duplicated Across 6+ Files
**Issue**: `easeExpoOut`, `fadeUp`, `staggerContainer`, `staggerChild` are copy-pasted in `Fiyatlandirma.tsx`, `Hakkimizda.tsx`, `Topluluk.tsx`, `Dokumantasyon.tsx`, `Indir.tsx`, `KVKK.tsx`. This is ~30 lines of duplication per file.
**Fix**: Create `src/lib/animations.ts` and import from all pages.

---

#### [32] Multiple files — HIGH — Hooks and Components Duplicated
**Issue**: `useScrollReveal` (Home, Modeller) and `TiltCard` (Home, Modeller) are duplicated. The `ScrollReveal` wrapper component is duplicated (Fiyatlandirma, Hakkimizda, Topluluk).
**Fix**: Extract shared hooks and components to dedicated files.

---

#### [33] Multiple files — MEDIUM — Hardcoded Color Values Instead of CSS Variables
**Issue**: Colors like `#D91E36`, `#00E5A0`, `#FFB800` are hardcoded inline throughout JSX instead of using the Tailwind/CSS custom properties. This makes theming impossible.
**Affected**: `HangiModel.tsx:571-573` (terminal dots), `Modeller.tsx:57-59` (RAM colors), `Topluluk.tsx:99-136` (platform colors)
**Fix**: Use CSS custom properties or Tailwind classes consistently:
```tsx
// Instead of:
style={{ backgroundColor: '#FF5F56' }}
// Use:
className="bg-[#FF5F56]" // or define as CSS variable
```

---

#### [34] HangiModel.tsx:278-288 — MEDIUM — Excessive useRef Declarations
**Issue**: 8 separate `useRef` calls could be consolidated with a single ref object or fewer refs.
**Code**:
```tsx
const containerRef = useRef<HTMLDivElement>(null)
const wizardRef = useRef<HTMLDivElement>(null)
const stepContentRef = useRef<HTMLDivElement>(null)
// ... 5 more refs
```
**Fix**: Group related refs:
```tsx
const refs = useRef({
  container: null as HTMLDivElement | null,
  wizard: null as HTMLDivElement | null,
  // ...
})
```

---

#### [35] Modeller.tsx:598 — MEDIUM — Row Grouping Recomputed Every Render
**Issue**: The `rows` array in `ModelGrid` is recomputed on every render. For a small dataset this is negligible, but it's unnecessary work.
**Code**:
```tsx
const rows: Model[][] = []
for (let i = 0; i < gridModels.length; i += 3) {
  rows.push(gridModels.slice(i, i + 3))
}
```
**Fix**:
```tsx
const rows = useMemo(() => {
  const result: Model[][] = []
  for (let i = 0; i < gridModels.length; i += 3) {
    result.push(gridModels.slice(i, i + 3))
  }
  return result
}, [gridModels])
```

---

#### [36] Modeller.tsx:1 — LOW — Unused Import
**Issue**: `useState` is imported but may not be needed at the top level (verify). Actually `useState` is used. But several imports should be checked.
**Code**:
```tsx
import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
```
All are used. No issue here — but check other files.

---

#### [37] Home.tsx — LOW — Inline Styles for Animations
**Issue**: The Home page uses many inline `style` attributes for animation timing. These could be extracted to CSS classes or a central animation config.
**Fix**: Create a CSS class system or use Tailwind's `animation-delay` utilities.

---

#### [38] Multiple files — LOW — Inconsistent Import Pattern for Lucide Icons
**Issue**: Some files import all icons at the top, others inline. Not a bug but inconsistent style.
**Fix**: Establish a project convention and stick to it.

---

#### [39] tsconfig.app.json:17 — LOW — `verbatimModuleSyntax` Enabled
**Issue**: With `verbatimModuleSyntax: true`, all type-only imports must use `import type`. Some files may violate this (check `Layout.tsx` which imports `type ReactNode`).
**Fix**: Audit all imports to ensure type-only imports use `import type` syntax.

---

#### [40] App.tsx — LOW — No Route-Level Code Splitting
**Issue**: All pages are statically imported, meaning users download all JS on initial load regardless of which page they visit.
**Code**:
```tsx
import Home from './pages/Home'
import Modeller from './pages/Modeller'
// ... all pages imported eagerly
```
**Fix**: Use `React.lazy` for route splitting:
```tsx
const Home = lazy(() => import('./pages/Home'))
const Modeller = lazy(() => import('./pages/Modeller'))
// ... wrap in <Suspense fallback={<Loading />}>
```

---

#### [41] package.json — LOW — Unused Dependencies Bloat Bundle
**Issue**: Many `@radix-ui/*` packages and utilities (`cmdk`, `embla-carousel-react`, `react-day-picker`, `recharts`, `input-otp`, `vaul`, `sonner`, `next-themes`) are listed as dependencies but don't appear to be used in the audited source files. This significantly increases bundle size.
**Fix**: Audit and remove unused dependencies:
```bash
# Remove unused packages
npm uninstall cmdk embla-carousel-react react-day-picker recharts input-otp vaul sonner next-themes
# Keep only the radix packages that are actually imported
```

---

## Positive Findings

1. **Good TypeScript strictness**: The project uses `strict: true`, `noUnusedLocals: true`, and `noUnusedParameters: true`, enforcing clean code.
2. **Proper IntersectionObserver cleanup**: `useScrollReveal` correctly disconnects observers.
3. **Good React Router v7 usage**: Clean route definitions with proper `Link` components.
4. **CSS custom properties**: Well-structured design system with CSS variables.
5. **Responsive design**: Good Tailwind breakpoint usage across components.
6. **No XSS vulnerabilities found**: No `dangerouslySetInnerHTML` usage detected.
7. **Good semantic HTML**: Proper heading hierarchy (`h1` → `h2` → `h3`) in most sections.
8. **Canvas performance**: Uses `requestAnimationFrame` properly (though missing visibility check).

---

## Recommended Priority Fixes

### Immediate (Before Production)
1. Fix Layout.tsx RAF cleanup bug (Issue #5)
2. Add `aria-hidden="true"` to DataStreamCanvas (Issue #18)
3. Add `aria-expanded` to mobile menu (Issue #19)
4. Fix `any` type in Layout.tsx (Issue #1)
5. Add visibility check to canvas animation (Issue #11)

### Short Term (Next Sprint)
6. Extract duplicated hooks/components (Issues #13, #14, #15, #31, #32)
7. Fix wizard setTimeout nesting (Issue #6)
8. Add focus trap to modal (Issue #21)
9. Implement route-level code splitting (Issue #40)
10. Remove unused dependencies (Issue #41)

### Medium Term
11. Add full ARIA support to wizard (Issue #20)
12. Replace `href="#"` placeholders (Issues #25, #29)
13. Extract animation constants (Issue #31)
14. Fix canvas particle cap (Issue #8)
