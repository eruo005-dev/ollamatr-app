# OllamaTR — Codebase Deep Audit
**Agent:** T1
**Date:** 2026-05-26

## Verdict
**SHIPPABLE WITH FOLLOW-UP.** No new blockers. Fresh build is clean (0 npm prod vulns; 34s; chunked output) and surface fixes from prior audits hold. What follows is a deeper layer of follow-ups that prior audits did not surface: bundle-strategy tuning, telemetry, test infrastructure, CI pipeline, i18n readiness, and minor production debt (3 TODOs, placeholder content, OS-detection on Indir).

---

## Findings by category

### Bundle composition
Fresh `npm run build` output (gzipped):
- `index-Cvh5dSvf.js` — **124.52 KB gz / 387 KB raw** — the React + framer-motion + gsap + lenis + lucide-react + react-router vendor blob. This is the dominant cost on first-load.
- `index-Cg7-CNQY.js` — **45.52 KB gz / 114 KB raw** — looks like the shared app shell (Layout/Navbar/Footer/CookieBanner/ErrorBoundary + ScrollReveal wiring).
- `Fiyatlandirma-Cd4BHaTj.js` — **18.66 KB gz / 62 KB raw** — heaviest route; carries `@radix-ui/react-accordion` and three motion variants per tier.
- `KVKK` 9.13 KB gz, `HangiModel` 8.54 KB gz, `Modeller` 7.79 KB gz, `Home` 6.20 KB gz.
- `lenis-DQy71oTq.js` — **5.07 KB gz** — already a separate chunk thanks to dynamic `import('lenis')` in `app/src/components/Layout.tsx:24`. Good.
- CSS bundle 30.55 KB gz / 87 KB raw — Tailwind purge is working.

Recommendations:
1. **Split the vendor blob with a manualChunks strategy** in `app/vite.config.ts`. Right now `gsap`, `framer-motion`, `@radix-ui/react-accordion`, `react-router`, and `lucide-react` all collapse into one ~125 KB chunk. Splitting into `react-vendor` (react + react-dom + react-router), `motion` (framer-motion), `gsap` (gsap + ScrollTrigger + @gsap/react), and `icons` (lucide-react tree-shake remainder) would let routes that do not need `gsap` (every page except `HangiModel.tsx`) avoid downloading it. Estimated win on Home first-paint: ~25–35 KB gz.
2. **gsap is only used in `HangiModel.tsx`** (lines 3–4 import + 4 `useGSAP` blocks). It's currently pulled into the vendor chunk because it's a static import. Make `gsap`/`ScrollTrigger`/`useGSAP` dynamic in `HangiModel` (top-level `await import('gsap')` inside a useEffect) so only wizard visitors pay for it.
3. **framer-motion is used on 8 of 10 pages.** Keep it shared, but consider `LazyMotion` with `domAnimation` features in Layout to drop ~10 KB gz of the full feature bundle.
4. **Lenis is already lazy-loaded** (`app/src/components/Layout.tsx:23-37`). Could go further: skip Lenis entirely on mobile (`window.matchMedia('(pointer: coarse)')` → return early), saving 5 KB gz transfer on phones where smooth-scroll is already native.
5. **CSS — 87 KB raw is high for a single-locale brochure site.** Audit `app/src/index.css` for `@layer base` rules that ship for unused shadcn components (only `accordion` remains in `app/src/components/ui/`, per `ls`). Likely 15–25 KB of dead CSS tokens.

### Runtime perf
- Across `src/`, ~243 occurrences of `useEffect|useState|IntersectionObserver|requestAnimationFrame|motion.*` over 18 files. Highest per-file: `Indir.tsx` (53), `Topluluk.tsx` (30), `Modeller.tsx` (19).
- `Indir.tsx` carries ~12 distinct `motion.*` elements + 3 `whileInView` viewports in one route — at 18.81 KB raw it is heavy with animation primitives. Consider extracting to a single `<RevealOnScroll>` wrapper to reduce surface area.
- **rAF loops are properly cleaned up** in 3 of 3 cases: `Layout.tsx:38-42` (Lenis), `DataStreamCanvas.tsx:132-136`, and `Home.tsx:36` (count-up). DataStreamCanvas pauses on `visibilitychange` (lines 121–127) — good.
- **IntersectionObserver count:** the worst offender is `KVKK.tsx` — 7 `useScrollReveal` calls inside `KVKKHeavyContent` (lines 213–219). This was already mitigated with deferred mount (line 735–739), but consolidating to a single shared observer via a context would cut 6 observer instances on a single route.
- **Modeller `ModelGrid` ref-attachment pattern** (`Modeller.tsx:756-763`) sets `el.dataset.id` inside a ref callback on every render — fine functionally, but the IntersectionObserver is re-created whenever `gridModels` changes (line 721 dep). Pagination flip → observer churn. Acceptable for 9 cards/page, but flag for future scale.

### Error boundary coverage
- Single boundary in `App.tsx:34` wraps all routes. `KVKK.tsx:802` adds a second boundary around heavy below-fold content — the only per-page isolation.
- **Missing:** boundaries around `DataStreamCanvas` (a render error in the rAF loop bubbles to the route boundary and blanks the whole page), the `DetailModal` in `Modeller.tsx`, and the `HangiModel` wizard.
- **No telemetry on `componentDidCatch`** — `ErrorBoundary.tsx:24-26` only `console.error`s. In production this means no error visibility. Recommend Sentry (~10 KB gz) or a minimal `navigator.sendBeacon('/api/err', JSON.stringify({ message, stack }))` endpoint via Vercel.
- **Reset story is reload-only** (`ErrorBoundary.tsx:28-30`). For route-level boundaries a "retry" that resets `state.hasError` and re-renders children would be friendlier than a full reload.

### State management
- All state local-`useState`. No global store. Today's only cross-cutting datum is cookie consent (`app/src/components/CookieBanner.tsx:14` — `STORAGE_KEY = 'ollamatr-cookie-consent'`). It is **written but never read downstream** — analytics/marketing consent flags currently have no consumer.
- That means the categories UI is decorative until something actually gates on `readConsent().analytics`. When analytics lands, factor `readConsent()` into a `ConsentContext` so DataStreamCanvas (potential perf telemetry), future Plausible/Umami, etc. can subscribe.
- Wizard inputs in `HangiModel.tsx` (useCase / ram / skill / priorities) are lost on navigation. A `sessionStorage` shim would let users navigate to `/modeller` mid-wizard and return without re-answering.
- `keyboardStateRef` pattern in `HangiModel.tsx:624-690` works but is a code smell — every state change mutates the ref in one effect, and a second effect registers a single listener. A simpler refactor: useEvent-style stable callback (or just include all state in the deps of the keydown effect; the cost of re-attach is negligible).

### Form a11y deep-dive
- **Modeller search** (`Modeller.tsx:534-543`): has `aria-label`, `aria-controls="model-grid"`, `aria-describedby="result-count"`, live region on count. Good.
- **HangiModel wizard buttons** (steps 1–4): use `aria-pressed` on selection chips, `role="tablist"`/`role="tab"`/`aria-selected` on the stepper (`HangiModel.tsx:755-777`), `aria-live="polite"` on the step panel. Good.
- **Missing aria-invalid** anywhere — Home's RAM Calculator (`Home.tsx:405-433`) has no error state at all; out-of-range inputs silently render "BEKLENİYOR". Wire `aria-invalid={status==='danger'}` + `aria-describedby` to the status badge.
- **CookieBanner toggles** (`CookieBanner.tsx:198-241`): labelled, fieldset wrapped, focus-ring set. Good. The "Tercihlerimi Kaydet" button does not announce that preferences were saved — consider an `aria-live` confirmation.
- **No labels on selects in Modeller FilterBar** — they are wrapped in `<label>` (`Modeller.tsx:548-572`), but the label text is inside a `<span>` not associated with `htmlFor`. Most ATs still announce it via the wrapping `<label>`, but explicit `id`/`htmlFor` pairs would be more robust.

### i18n readiness
- **All UI strings inline in JSX as Turkish literals.** No i18n library, no extraction.
- Switching to bilingual (TR/EN) would require touching ~all 10 pages plus Footer/Navbar. Recommend `react-i18next` or `lingui` with a TypeScript-typed message catalog. ~40–60 hours one-time extraction work for the current footprint.
- **Critical caveat:** `app/src/pages/KVKK.tsx:506` contains `[Operatör İsim Soyisim]` — a placeholder that looks like a translation key but is actual rendered content. Same file has untranslatable legal text by design (Turkish-only KVKK law). i18n strategy must support **route-locked locales**: KVKK and Çerez Politikası stay TR; Home/Modeller/HangiModel/Indir/Fiyatlandirma/Hakkimizda/Topluluk become bilingual.
- Date formatting: `Modeller.tsx:395` uses `toLocaleDateString('tr-TR')` hard-coded — convert to `navigator.language` or i18n locale-aware once enabled.

### Type safety
- One `unknown` cast in the codebase: `CookieBanner.tsx:54` — `JSON.parse(raw)` typed as `unknown`, then narrowed via `'necessary' in parsed && 'timestamp' in parsed`. **Correct usage**, but the narrowing does not actually validate that `analytics/marketing/preferences` are booleans or that `timestamp` is a string. A zod schema or hand-rolled type guard would be safer.
- **No `as any`, no `dangerouslySetInnerHTML`, no `eval`** anywhere in `src/`. Excellent.
- `Model`, `UseCase`, `RamBucket`, `ModelLicense` in `app/src/lib/models-data.ts:3-22` are well-typed string-union types. Exhaustive checks would be improved by:
  - `Modeller.tsx:89-102` (sort switch) — add a `default: const _exhaustive: never = sortOption` to catch new SortOption values.
  - `HangiModel.tsx:62-68` (WIZARD_USECASE_MAP) — typed as `Record<string, UseCase[]>` so the key is `string` (lossy). Tighter: derive a `WizardUseCase` literal-union type and use that as the key.
- `getCategoryValue`/`setCategory` in `CookieBanner.tsx:107-117` use sequential `if` rather than a discriminated lookup — fine, but a `Record<CategoryKey, [getter, setter]>` would be cleaner.

### Test coverage
- **0 unit tests, 0 e2e, 0 visual regression.** No `vitest`, no `playwright`, no `@testing-library` in `package.json`.
- Recommended minimum viable test plan (5 critical paths):
  1. **Vitest + RTL** — `findBestModel` in `HangiModel.tsx:177-286` is pure and unit-testable. Snapshot the (useCase × ram × skill × priorities) → best.id matrix to catch matching-algorithm regressions.
  2. **Vitest** — `useModelFilters` in `Modeller.tsx:59-114` — assert filter+search+sort interactions across the 12-model fixture.
  3. **Vitest** — `parseDownloadsNumber` in `Modeller.tsx:48-56` — 6-line function, trivial to lock down.
  4. **RTL** — `CookieBanner` render → click "Hepsini Kabul Et" → assert `localStorage.ollamatr-cookie-consent` JSON has all three flags true and a valid ISO timestamp.
  5. **Playwright e2e** — single smoke: visit `/`, click "Hemen Başla", assert URL is `/#/indir`, assert "OllamaTR İndir" button present, assert OS auto-detection chip rendered.

### CI/CD
- **No `.github/workflows/` directory exists.** Verified via `ls -la` on repo root.
- Deploys are via Vercel auto-deploy on push (per recent commits `e511a7f`, `5871d99`). PR builds currently rely on Vercel's preview deploy — which is fine, but does not gate on `tsc -b` failure, lint, or test results separately. A failing TypeScript compile would still deploy a preview.
- Recommend a minimal `.github/workflows/ci.yml`: matrix on Node 20.x, steps = `npm ci` → `npm run lint` → `npm run build`. Add a test step once tests exist.
- **No Dependabot / Renovate.** Given the React 19, framer-motion 12, gsap 3 versions in use, monthly dependency drift will accumulate. A `.github/dependabot.yml` with weekly schedule and grouped updates would close this.

### Code docs
- **Sparse JSDoc.** `ErrorBoundary.tsx:1` has a one-liner. `models-data.ts:1` has one. `KVKK.tsx:725-734` has a substantial comment explaining the deferred-mount workaround. Everything else relies on section banner comments (`/* ═══ FILTER HOOK ═══ */`) which are useful for skim-reading but do not survive to TypeDoc/JSDoc tooling.
- Recommend a top-of-file JSDoc block on every component in `src/components/` and every page in `src/pages/` covering: purpose, primary deps, side effects (localStorage, animations, observers), and "do not import in" notes for code-split boundaries.
- Public exports from `src/lib/`: `models-data.ts` exports `MODELS`, `COMMERCIAL_MODELS`, `NON_COMMERCIAL_MODELS`, `USE_CASES`, `RAM_BUCKETS`, `getRamBucket`. Only `MODELS` is documented in the file header. The two derived constants (`COMMERCIAL_MODELS`/`NON_COMMERCIAL_MODELS` at lines 278-279) have no callers in `src/` (grep produced 0 hits) — dead exports.

### Dead code
- `app/info.md` (lines 1–30) is the scaffolded boilerplate from the `create-vite` + shadcn setup template. References 40+ shadcn components no longer in the project (only `accordion.tsx` remains in `app/src/components/ui/`). Safe to delete.
- `app/README.md` likely the same (not opened, but it's the Vite default until proven otherwise).
- `app/src/lib/models-data.ts:278-279` — `COMMERCIAL_MODELS` and `NON_COMMERCIAL_MODELS` are unused.
- `app/src/lib/models-data.ts:42-51` — `USE_CASES` and `RAM_BUCKETS` exports verified-unused (no import references in src/).
- `public/team-avatar-placeholder.jpg`, `public/partner-logos.jpg` — check usage; Hakkimizda almost certainly only uses one.

### Security hardening
- `npm audit --omit=dev`: **0 vulnerabilities.** Confirmed in fresh run.
- No `dangerouslySetInnerHTML`, no `eval`, no `Function()` constructor. Confirmed via grep.
- External `window.open` calls properly use `'noopener,noreferrer'` (e.g. `Indir.tsx:347-349`, `Fiyatlandirma.tsx:311`). Good.
- `<a target="_blank" rel="noopener noreferrer">` correctly applied on all GitHub/Patreon links.
- **No user-controlled URL construction** in the codebase — Modeller search builds no URLs, only filters in-memory. No path-traversal surface.
- **mailto: links don't validate user input** (no contact form yet) so no XSS surface.
- **Missing security headers:** `vercel.json` at root + `app/vercel.json` should set `Content-Security-Policy`, `X-Content-Type-Options: nosniff`, `Strict-Transport-Security`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`. Without these the site ships with Vercel defaults only.

### Build determinism
- `package-lock.json` committed. Good.
- **No `engines` field** in `package.json` — anyone with Node 18 or Node 22 builds the same lockfile. `engines: { node: ">=20.0.0", npm: ">=10.0.0" }` would document the contract.
- **No `.nvmrc`, no `.tool-versions`, no `volta` config.** Recommend committing `.nvmrc` with `20` (Node version used by Vercel and per `info.md:1`).
- **Vite content-hashes all assets** — chunk filenames embed an 8-char hash. Reproducible across builds for the same input. Good.
- **Source maps in prod:** `npm run build` output shows NO `.map` files in `dist/assets/` (verified via `ls` filter — empty). Vite's default is to not emit source maps in prod, and that default is in effect. Good for security (no internal structure exposed).
- `app/vite.config.ts:9` includes `inspectAttr()` plugin (`plugin-inspect-react-code`) — this is a dev-time React inspector tool. Verify it does NOT inject attributes into prod builds. Risk: leaking file paths/line numbers as `data-inspect-*` attributes in shipped HTML. Recommend `if (process.env.NODE_ENV !== 'production') plugins.push(inspectAttr())` or pin the plugin to `apply: 'serve'`.

### Production debt (not flagged in prior audits)
- `app/src/pages/Indir.tsx:137` — `CHECKSUM_PLACEHOLDER = 'a1b2c3d4...'` is rendered to users. They see a fake SHA256.
- `app/src/pages/Indir.tsx:340` and `:583` — both download buttons open `https://github.com/ollamatr/installer/releases/latest` which 404s today (the org/repo does not exist per current state). User clicks "İndir" → GitHub 404.
- `app/src/pages/KVKK.tsx:506` — `[Operatör İsim Soyisim]` placeholder rendered as legal Veri Sorumlusu name. This is a **legal-content bug**, not just a content placeholder, because KVKK Madde 10 disclosure must name a specific veri sorumlusu.
- `app/src/pages/Home.tsx:450-453` — STATS array uses fabricated numbers (`10000+ İndirme`, `5000+ Aktif Kullanıcı`, `50+ Kurumsal Entegrasyon`). For a brand-new repo with no installer shipped, these are misleading social proof. Either flag as illustrative or remove.
- `app/src/pages/Home.tsx:456-475` — TESTIMONIALS are fictional ("Ahmet Y. — KOBİ IT Yöneticisi" etc.). Same risk class.

---

## Top 10 follow-ups (prioritized impact × effort)

1. **[H/L]** Replace `Indir.tsx` checksum placeholder + dead release URL + add disabled state until v1.0.0 ships (or hide download button entirely).
2. **[H/L]** Fill `[Operatör İsim Soyisim]` in `KVKK.tsx:506` with a real name. Legal exposure until done.
3. **[H/L]** Remove/flag fake STATS + TESTIMONIALS on `Home.tsx`. Brand-truth issue.
4. **[H/M]** Add `manualChunks` config to `vite.config.ts`: split gsap (HangiModel-only), framer-motion, react-vendor. Cut Home first-paint by ~25–35 KB gz.
5. **[H/M]** Verify `plugin-inspect-react-code` is dev-only; gate it with `apply: 'serve'` in `vite.config.ts`.
6. **[M/L]** Add `.github/workflows/ci.yml` (lint + tsc + build on PR) and `.github/dependabot.yml` (weekly).
7. **[M/L]** Wire Sentry (or sendBeacon endpoint) into `ErrorBoundary.componentDidCatch`. Currently blind to prod errors.
8. **[M/M]** Vitest + RTL setup with the 5-path test plan above. `findBestModel` first.
9. **[M/M]** Add `engines.node`, `.nvmrc`, and security headers to `vercel.json` (CSP, HSTS, Referrer-Policy, Permissions-Policy).
10. **[L/L]** Delete `info.md`, prune `COMMERCIAL_MODELS`/`NON_COMMERCIAL_MODELS`/`USE_CASES`/`RAM_BUCKETS` dead exports, audit `index.css` for orphan shadcn token rules.

---

## Cumulative cost-of-not-doing

1. **Checksum/release URL:** every visitor who clicks "İndir" today hits a 404. Bounce on the conversion-critical CTA — pure funnel kill.
2. **KVKK operator placeholder:** rendered as legal disclosure; in an enforcement action could be cited as defective Madde 10 aydınlatma. Concrete legal risk.
3. **Fake testimonials:** rotating community visitors can do a 5-minute Google search and find no "Ahmet Y. KOBİ IT Yöneticisi" exists. Trust damage compounds with audience growth.
4. **Single 125 KB vendor blob:** every route pays for gsap even when only HangiModel uses it. LCP penalty on Home and on every social-share landing. Slower first impressions = worse organic conversion.
5. **inspectAttr in prod:** if it leaks data-inspect-* attributes, it exposes source file paths and component names in shipped HTML — a low-grade information disclosure that also bloats DOM.
6. **No CI:** type errors and lint failures slip into Vercel previews. The team will eventually merge a broken build because they trusted "Vercel said it deployed."
7. **No error telemetry:** prod crashes are invisible. Users hit the fallback card and silently leave. You won't know which routes regress until churn shows up in analytics you also don't have yet.
8. **No tests:** the matching algorithm in `findBestModel` is the user-facing brain of the wizard. One copy-paste regression in `priorityOptions` IDs vs the `switch` cases (e.g. renaming "Hız (düşük latency)") silently breaks scoring. No safety net.
9. **No `engines`/`.nvmrc` + no security headers:** future contributor on Node 22 + esbuild quirks could ship a subtly different bundle; missing CSP leaves XSS posture entirely on framework defaults (Vite escapes JSX, but a future contributor sprinkling `dangerouslySetInnerHTML` would have no header-level mitigation).
10. **Boilerplate `info.md` + dead exports:** cosmetic only — code review noise and ~1 KB of dead JS. Cheap to clean.
