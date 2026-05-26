# OllamaTR Production-Readiness Audit — CODE
**Auditor:** Audit-A (post-swarm verification)
**Date:** 2026-05-26
**Scope:** `app/` source + build artifacts

## Verdict
**PRODUCTION READY WITH CONDITIONS**

The code is technically shippable today. TypeScript, ESLint, and the production build are all 100% clean, every route is lazy-loaded, all effects clean up properly, and there are zero `any`, `@ts-ignore`, `dangerouslySetInnerHTML`, `eval`, hardcoded-secret, or runtime-CVE issues. However, the project carries roughly **8 MB of unused production dependencies** (43 of 44 shadcn/ui files are dead code; ~21 Radix packages plus `react-hook-form`, `zod`, `sonner`, `date-fns`, `@hookform/resolvers`, `react-resizable-panels` are not referenced by any page), there are **2 dead `href="#"` placeholders in `Indir.tsx`** that should be real download links or `<button>`s before launch, and one **duplicate `useScrollReveal` definition in `KVKK.tsx`** that bypasses the shared hook. None block release on a "soft launch" basis, but the unused deps in particular should be pruned in a tree-shake/dead-code pass to drop install size and supply-chain surface area.

## Summary table
| Category | Pass | Issues found | Severity |
|----------|------|--------------|----------|
| TypeScript hygiene | ✓ | 0 | — |
| React 19 patterns | ✓ | 0 | — |
| Performance / bundle | ✓ | 1 (`index-DG_S61gz.js` = 79 KB gz) | Low |
| Security (runtime) | ✓ | 2 placeholder `href="#"` | Low |
| Security (CVEs) | ✓ | 9 devDep advisories, 0 runtime | Info |
| Code organization | ✗ | Duplicate hook in KVKK + 43 orphan UI files + 6 unused deps | Medium |
| Build correctness | ✓ | 0 | — |

## Build & lint results

### `npx tsc -b --noEmit` (run twice including `--force`)
```
EXIT: 0
```
No diagnostics emitted. `strict`, `noUnusedLocals`, `noUnusedParameters`, `verbatimModuleSyntax`, `noFallthroughCasesInSwitch`, `noUncheckedSideEffectImports`, `erasableSyntaxOnly` are all enabled in `tsconfig.app.json` and all pass.

### `npm run lint` (eslint .)
```
> my-app@0.0.0 lint
> eslint .
EXIT: 0
```
Zero warnings, zero errors. Config (`eslint.config.js`) uses `js.recommended`, `tseslint.recommended`, `eslint-plugin-react-hooks` (flat/recommended), and `eslint-plugin-react-refresh/vite`.

### `npm run build` (`tsc -b && vite build`)
```
2157 modules transformed
✓ built in 15.10s
EXIT: 0
```
Single Tailwind warning unrelated to code: `The class duration-[400ms] is ambiguous` — cosmetic, does not fail the build.

### `npm audit` (devDependencies only)
```
9 vulnerabilities (3 moderate, 6 high, 0 critical)
```
**All 9 advisories are in devDependencies** — `@babel/plugin-transform-modules-systemjs`, `ajv`, `brace-expansion`, `flatted`, `minimatch`, `picomatch`, `postcss`, `rollup`, `vite`. None of these ship in the production bundle. Running `npm audit fix` is safe and resolves all 9 without breaking changes.

## Bundle analysis

Total dist size on disk (assets + html + JPGs): ~1.05 MB
Total JS (uncompressed / gzipped): **~728 KB / ~243 KB**
CSS: **79.35 KB / 13.86 KB gz**

| Chunk | Size | Gzip | Note |
|------|------|------|------|
| `index-DG_S61gz.js` (React + router + framer-motion runtime) | 248.23 KB | **79.01 KB** | Largest entry; expected for React 19 + Framer Motion + react-router 7 |
| `animations-7ndrYDr3.js` (GSAP + ScrollTrigger) | 122.95 KB | 40.19 KB | Loaded only by HangiModel + Hakkimizda |
| `index-BviS-IM6.js` (Framer Motion `<motion>` runtime) | 114.78 KB | 45.52 KB | Auto-split by Vite |
| `Fiyatlandirma` | 57.55 KB | 17.44 KB | Largest route; uses accordion + lots of motion |
| `Modeller` | 35.08 KB | 9.26 KB | |
| `HangiModel` | 34.71 KB | 8.70 KB | Wizard logic + GSAP scope |
| `Home` | 22.59 KB | 6.10 KB | |
| `KVKK` | 18.64 KB | 5.22 KB | |
| `Indir` | 18.47 KB | 4.95 KB | |
| `lenis` (smooth scroll, lazy) | 17.70 KB | 5.07 KB | Async import in Layout |
| `Topluluk` | 17.16 KB | 4.58 KB | |
| `Hakkimizda` | 13.44 KB | 3.86 KB | |
| `Dokumantasyon` | 13.07 KB | 3.81 KB | |
| Shared (TiltCard, ScrollReveal, useScrollReveal, ErrorBoundary) | < 4 KB each | < 1 KB each | Properly extracted shared chunks |
| 15 individual lucide icons | < 1 KB each | < 0.5 KB each | Tree-shaken correctly |

**All 9 routes have dedicated chunks.** All 9 are lazy-loaded via `React.lazy` in `src/App.tsx` lines 7-15. `Layout`, `Navbar`, `Footer`, `ErrorBoundary`, `DataStreamCanvas` are in the eager bundle (correct — they render on every page).

The largest gzipped chunk that the user always downloads is the vendor entry at **~79 KB gz**, which is reasonable for a React 19 + Framer Motion + react-router 7 app and well below the 200 KB "first-paint budget" rule of thumb.

## Detailed findings

### Code organization — Medium — orphan shadcn/ui components
**Files:** 43 of 44 files under `app/src/components/ui/` are never imported by any page or top-level component.
**Issue:** Only `accordion.tsx` is consumed (by `Fiyatlandirma.tsx` line 10). The other 43 (`alert-dialog`, `alert`, `aspect-ratio`, `avatar`, `badge`, `breadcrumb`, `button`, `button-group`, `card`, `checkbox`, `collapsible`, `context-menu`, `dialog`, `dropdown-menu`, `empty`, `field`, `form`, `hover-card`, `input`, `input-group`, `item`, `kbd`, `label`, `menubar`, `navigation-menu`, `pagination`, `popover`, `progress`, `radio-group`, `resizable`, `scroll-area`, `select`, `separator`, `sheet`, `skeleton`, `slider`, `spinner`, `switch`, `table`, `tabs`, `textarea`, `toggle`, `toggle-group`, `tooltip`) are orphan files. Verified by `grep -r "from .@/components/ui/" app/src` — only `accordion` shows up outside `components/ui/`. Vite tree-shakes them out of the build (they don't appear in `dist/assets/`), so they don't bloat the runtime — but they bloat the source tree, the install size, and the supply-chain surface.
**Recommended fix:** Delete the 43 unused files. Then run `npm uninstall` for the now-orphaned packages — see next finding.

### Code organization — Medium — unused production dependencies
**File:** `app/package.json`
**Issue:** After deleting the orphan UI files, these `dependencies` (not `devDependencies`) have **zero remaining imports** in `src/`:
- `@hookform/resolvers`, `react-hook-form` — only used by `components/ui/form.tsx`
- `zod` — never imported anywhere
- `sonner` — never imported anywhere
- `date-fns` — never imported anywhere
- `react-resizable-panels` — only used by `components/ui/resizable.tsx`
- 21 Radix packages (everything except `@radix-ui/react-accordion`) — only used by the orphan UI files

Conservatively this is ~25 packages × ~50–300 KB each in `node_modules`, so on the order of 5–10 MB of install footprint and a comparable supply-chain surface area that gets `npm audit`-ed on every install.
**Recommended fix:** Delete the orphan UI files (above finding), then `npm uninstall @hookform/resolvers react-hook-form zod sonner date-fns react-resizable-panels` and every `@radix-ui/react-*` except `@radix-ui/react-accordion`. Re-run `npm run build` to confirm nothing breaks.

### Code organization — Low — duplicate `useScrollReveal` in KVKK.tsx
**File:** `app/src/pages/KVKK.tsx:23-44`
**Issue:** KVKK defines a private `useScrollReveal` that is byte-identical in behavior to `app/src/hooks/useScrollReveal.ts`. The 10-agent refactor extracted the hook for sharing across pages (Home, Modeller, Indir all use the shared one), but KVKK was missed.
**Recommended fix:** Replace lines 23-44 with `import { useScrollReveal } from '@/hooks/useScrollReveal'`. No behavioral change; saves ~25 lines and a few hundred bytes of duplicate emitted code.

### Security — Low — placeholder `href="#"` in Indir.tsx
**Files:**
- `app/src/pages/Indir.tsx:342` — primary "OllamaTR İndir" download CTA on the main download page
- `app/src/pages/Indir.tsx:575` — "Hemen İndir" CTA in the bottom call-to-action section

**Issue:** Both are `<a href="#">` placeholders, not real download URLs. On click they will jump to top-of-page (or do nothing under HashRouter) instead of starting a download. They were missed in the swarm's `href="#"` purge. These are the two highest-conversion buttons on the marketing site.
**Recommended fix:** Wire them to the real GitHub release asset URLs (e.g. `https://github.com/ollamatr/.../releases/latest/download/OllamaTR-Setup-1.2.0.exe`), with the URL selected from `detectedOS` so the primary button matches the user's platform. Add `download` and `rel="noopener noreferrer"` attributes.

### Performance — Info — DataStreamCanvas mobile fallback verified
**File:** `app/src/components/DataStreamCanvas.tsx`
- Mobile detection via `useSyncExternalStore` (lines 18-25) — correct React 19 pattern, no setState during render.
- `isMobileRef` mirrors the value for use inside the canvas closure (lines 27-28).
- On mobile, the effect early-returns with a cleanup that removes the resize listener (lines 47-51), and the component returns a static gradient `<div>` instead of a canvas (lines 139-147).
- `visibilitychange` listener pauses RAF when tab is hidden (lines 121-128).
- All listeners + RAF cancelled in cleanup (lines 132-136).
- Particle count capped at 50/150 to prevent unbounded growth (line 106).

No issue. Clean implementation.

### Performance — Info — Effect cleanup audit (all observers/timers/listeners)
Audited every `useEffect` / `useGSAP` in:
- `App.tsx` — n/a
- `Layout.tsx` — RAF + Lenis destroy in cleanup ✓ (lines 37-41)
- `DataStreamCanvas.tsx` — RAF + listeners + visibility ✓ (above)
- `Navbar.tsx` — no effects
- `Footer.tsx` — no effects
- `ErrorBoundary.tsx` — no effects
- `TiltCard.tsx` — no effects, refs-only
- `ScrollReveal.tsx` — uses framer-motion's `useInView`, auto-managed
- `useScrollReveal.ts` — `observer.disconnect()` in cleanup ✓ (line 24)
- `use-mobile.ts` — `removeEventListener` in cleanup ✓ (line 15)
- `Home.tsx` — `useCountUp`: `cancelAnimationFrame` in cleanup ✓ (line 36)
- `Modeller.tsx` — IntersectionObserver disconnect ✓ (line 687), focus-trap keydown cleanup ✓ (line 303), matchMedia cleanup ✓ (line 661), body overflow restored ✓ (line 243), focus restoration ✓ (line 265), modal `setTimeout` cleared ✓ (line 263)
- `HangiModel.tsx` — `cancelledRef` pattern for async cancellation ✓ (line 460), keyboard listener cleanup ✓ (line 780), GSAP ScrollTrigger handled by `useGSAP` scope
- `Indir.tsx` — RAF cancel in cleanup ✓ (line 64), `setTimeout` for `copied` flag (line 196) is fire-and-forget but harmless because the same effect closure can't accumulate
- `KVKK.tsx` — IntersectionObserver disconnect ✓ (line 40), deferred-mount `setTimeout` cleared ✓ (line 533)
- `Topluluk.tsx`, `Fiyatlandirma.tsx`, `Hakkimizda.tsx`, `Dokumantasyon.tsx` — no raw effects, only Framer Motion / ScrollReveal which self-manage

**No leak found.**

### React 19 patterns — Info — derive-during-render in Modeller.tsx
**File:** `app/src/pages/Modeller.tsx:649-652`
```tsx
if (prevGridModels !== gridModels) {
  setPrevGridModels(gridModels)
  setVisibleCards(new Set())
}
```
This is the documented React 19 "derive state during render with previous-state comparison" pattern, used to reset entrance animations when the parent's filter inputs change. The setState calls are guarded by a comparison, so React batches them and re-renders without an effect round-trip. Correct usage, no issue.

### Security — Info — no dangerous patterns
- `dangerouslySetInnerHTML`: **0 occurrences**
- `eval(`: **0 occurrences**
- `new Function(`: **0 occurrences**
- Hardcoded API keys / tokens: **0 occurrences** (only match for "secret/password/token/bearer" was a JSDoc string in `ErrorBoundary.tsx`)
- `target="_blank"` without `rel="noopener noreferrer"`: external GitHub links in `Footer.tsx` (lines 87, 122) correctly use `rel="noopener noreferrer"` ✓
- No CSP `<meta>` tag in `index.html` — acceptable for a static SPA, but adding one would harden against unforeseen XSS. Not a blocker.

### TypeScript hygiene — Info — verified clean
- `: any` / `as any` / `<any>` / `any[]`: **0 occurrences**
- `@ts-ignore` / `@ts-expect-error` / `@ts-nocheck`: **0 occurrences**
- `eslint-disable*` comments: **0 occurrences** in `src/`
- `verbatimModuleSyntax: true` compliance: all type-only imports use `import type` — verified via successful `tsc -b` with the flag enabled
- Path alias `@/*` is wired in both `tsconfig.app.json` and `vite.config.ts`

## Risk-ranked top 5 remaining concerns

1. **`href="#"` on the two primary download CTAs in `Indir.tsx`** (lines 342, 575). Marketing site launches with a broken "Download" button on the download page. **Highest priority.**
2. **43 orphan shadcn/ui files + ~25 unused dependencies.** Doesn't affect runtime bundle (Vite tree-shakes), but bloats install footprint by ~5–10 MB and brings every transitive Radix CVE into `npm audit`. Cleanup is a low-risk, high-payoff pre-launch task.
3. **Duplicate `useScrollReveal` in `KVKK.tsx:23-44`.** Cosmetic dead code post-refactor; replace with `import { useScrollReveal } from '@/hooks/useScrollReveal'`.
4. **9 high/moderate `npm audit` advisories in devDependencies** (Vite 7.0–7.3.1, Rollup 4, Babel transform plugin, postcss, etc.). Zero runtime impact, but worth running `npm audit fix` before tagging a release to keep the CI clean.
5. **No Content-Security-Policy `<meta>`** in `dist/index.html`. Not required, but a `default-src 'self'; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src fonts.gstatic.com; img-src 'self' data:; script-src 'self'` meta tag would harden the static deploy against any future XSS bug.

## Sign-off checklist
- [x] TS clean (`tsc -b --noEmit` exit 0, no `any`/`@ts-ignore`/`eslint-disable`)
- [x] Lint clean (`npm run lint` exit 0, zero warnings)
- [x] Build succeeds (`npm run build` exit 0, 15.10s, 2157 modules)
- [x] No critical CVEs (0 critical, 9 dev-only advisories)
- [x] All 9 routes lazy-loaded (verified `App.tsx` + 9 chunks in `dist/assets/`)
- [ ] No orphan UI files (43 unused shadcn/ui files remain — Medium severity, non-blocking)
- [ ] No dead `href="#"` (2 remain on `Indir.tsx` — should fix before launch)
- [x] All effects clean up RAF/timers/listeners/observers (verified file by file)
- [x] DataStreamCanvas paused on hidden tab + mobile fallback present
- [x] No `dangerouslySetInnerHTML` / `eval` / hardcoded secrets
- [x] Shared modules used consistently (one exception: `KVKK.tsx` duplicate hook)
- [x] `dist/index.html` references all assets correctly
