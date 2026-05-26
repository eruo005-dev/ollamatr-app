# OllamaTR Production-Readiness Audit — UX + A11y
**Auditor:** Audit-B
**Standard:** WCAG 2.1 Level AA
**Date:** 2026-05-26

## Verdict
**PRODUCTION READY WITH CONDITIONS**

The post-swarm codebase has materially improved a11y posture — ARIA semantics on the wizard stepper, modal focus-trap with focus restoration, keyboard activation via the shared `TiltCard`, `aria-pressed` on toggle groups, `aria-expanded`/`aria-controls` on the mobile menu, and the decorative canvas marked `aria-hidden`. However, three categories block a clean AA sign-off: (1) the `text-text-muted` token (#5A5A63) is used for body-size copy at a 3.01:1 ratio against `#0A090C`, failing WCAG 1.4.3; (2) five of nine pages render no `<h1>`, only an h2 hero, violating WCAG 1.3.1 / 2.4.6 heading-structure expectations; and (3) there is no skip-to-content link and no `prefers-reduced-motion` media query anywhere in the codebase, both of which are practical AA blockers for keyboard / vestibular-disorder users given the heavy GSAP + Lenis + tilt + canvas motion load. None of the issues are architectural; all are 1–2 hour fixes. Recommend addressing the three BLOCKER items before launch.

## Executive summary
Of the 11 most-relevant WCAG 2.1 AA success criteria, 7 are passing cleanly, 1 is partial (focus-visible is implemented only on the Modeller card and form inputs — not on most buttons/links sitewide, so it relies on UA defaults which are usable but inconsistent against the dark theme), and 3 are failing (1.4.3 contrast on `text-muted`, 1.3.1 heading hierarchy on 5/9 pages, plus the absence of skip-link + reduced-motion which spans 2.4.1 and 2.3.3). Color choices for accent-red (#D91E36) and the muted gray are the only token-level concerns; everything else can stay. There are zero `<img>` tags (all iconography is inline lucide SVG with parent labels), so 1.1.1 is trivially satisfied. The DetailModal in `Modeller.tsx` is a textbook implementation of focus trap + restore + Escape + Tab cycling and should be replicated for any future modals.

## WCAG 2.1 AA conformance matrix
| Criterion | Status | Evidence |
|-----------|--------|----------|
| 1.1.1 Non-text Content | PASS | DataStreamCanvas wrapper + canvas both `aria-hidden="true"` (`DataStreamCanvas.tsx:142,152`); zero `<img>` tags repo-wide; lucide icons are inline SVG inside buttons that supply text or `aria-label` (e.g. `Navbar.tsx:67`, `Modeller.tsx:191`). |
| 1.3.1 Info and Relationships | FAIL | Stepper uses `role="tablist"` / `role="tab"` / `aria-selected` (`HangiModel.tsx:846-868`) and panel is `role="tabpanel"` + `aria-live="polite"` (`HangiModel.tsx:876-878`). Form labels wrap selects (`Modeller.tsx:515-526`). BUT five pages have no `<h1>` (Indir, Hakkimizda, Topluluk, Dokumantasyon, Fiyatlandirma), so heading hierarchy starts at h2 — violates programmatic page structure. |
| 1.4.3 Contrast (Minimum) | FAIL | `text-text-muted` #5A5A63 → 3.01:1 against `#0A090C` — fails AA normal (4.5:1). Used for body-size copy: `Modeller.tsx:181` (download counts), `Modeller.tsx:422` (performance note paragraph, font-body text-sm), `HangiModel.tsx:1199-1204` (priority counter). Accent-red #D91E36 → 3.98:1, fails AA normal but is acceptable for large-text use only — verify each occurrence is large/bold. |
| 2.1.1 Keyboard | PASS | `TiltCard.tsx:56-66` handles Enter / Space / Spacebar; `Modeller.tsx:127-131` passes `role="button"` so `effectiveTabIndex` is 0; HangiModel registers a window keydown handler with 1-4 number-key shortcuts for step-1 and Enter for advance/submit (`HangiModel.tsx:753-781`); R key resets on step 5. Mobile menu is a real `<button>`. |
| 2.1.2 No Keyboard Trap | PASS | Focus trap inside `DetailModal` is correctly bounded: Escape closes (`Modeller.tsx:273`), Tab cycles within dialog (`Modeller.tsx:277-300`), Shift+Tab wraps backward, and focus is restored to the previously focused element on close via `previouslyFocusedRef` (`Modeller.tsx:252-266`). No traps detected outside this intentional one. |
| 2.4.1 Bypass Blocks | FAIL | No skip-to-content link anywhere in `Layout.tsx`; grep for `skip`/`sr-only` returns only shadcn internal labels, not a skip-nav. Users tabbing into the page must traverse the entire fixed navbar (logo + 5 nav links + CTA + hamburger) on every navigation. |
| 2.4.3 Focus Order | PASS | DOM order is logical on every page reviewed; the only override is the modal's intentional first-element focus (`Modeller.tsx:259-260`), which is correct. |
| 2.4.7 Focus Visible | PARTIAL | Explicit `focus-visible:ring-2 focus-visible:ring-accent-red` exists only on `Modeller.tsx:127` (the ModelCard). Form inputs in Modeller / Home / Dokumantasyon set `outline-none focus:border-accent-red`, which provides a 1px border color change but no ring — borderline visible on dark BG. Nav links, footer links, wizard buttons, pagination, CTAs have no explicit focus styles and inherit UA default (which on dark themes is a faint blue outline). Not WCAG-fatal because UA defaults satisfy the letter of 2.4.7, but inconsistent. |
| 2.3.3 Animation from Interactions | FAIL | Zero `prefers-reduced-motion` queries in `index.css` or any TSX file. The site runs Lenis smooth-scroll (`Layout.tsx:25-28`), 3D tilt with continuous mouse-driven transforms (`TiltCard.tsx:34-47`), GSAP timelines on every wizard step (`HangiModel.tsx:465-555`), a `setInterval` typewriter (`HangiModel.tsx:597-605`), a full-canvas data-stream animation, IntersectionObserver fade-ups (`Modeller.tsx:665-688`), and hero character splits (`index.css:67-83`). This is a serious vestibular risk. AAA-level criterion but expected at AA for sites this motion-heavy. |
| 3.2.1 On Focus | PASS | No unexpected context changes on focus anywhere in the audited code; selects open with native UI. |
| 3.3.2 Labels or Instructions | PASS | Modeller search input has `aria-label="Model ara"`, `aria-controls="model-grid"`, `aria-describedby="result-count"` (`Modeller.tsx:506-508`). Selects are wrapped in `<label>` (`Modeller.tsx:515-540`). Dokumantasyon search input has `aria-label` (per grep). RAM/skill picks in HangiModel have visible labels above buttons. |
| 4.1.2 Name, Role, Value | PASS | Wizard option buttons expose `aria-pressed` (`HangiModel.tsx:899, 988, 1065, 1170`); priority buttons additionally expose `aria-disabled` when max reached (`HangiModel.tsx:1171`); hamburger has `aria-expanded` + `aria-controls` (`Navbar.tsx:68-69`); dialog has `role="dialog"` + `aria-modal="true"` + `aria-labelledby` (`Modeller.tsx:330-332`); pagination uses `aria-current="page"` (`Modeller.tsx:608`); use-case filter group has `role="group"` + `aria-label` (`Modeller.tsx:544`). |
| 4.1.3 Status Messages | PASS | Result count is `aria-live="polite"` (`Modeller.tsx:566`); wizard step panel is `aria-live="polite"` (`HangiModel.tsx:878`); App loading fallback uses `sr-only` "Yükleniyor" (`App.tsx:25`). |

## Color contrast ratios (calculated)
All ratios computed against `bg-obsidian = #0A090C` using the WCAG 2.x relative-luminance formula:
- channel-linear: `c_lin = (c/255 ≤ 0.03928) ? (c/255)/12.92 : ((c/255 + 0.055)/1.055)^2.4`
- L = 0.2126·R_lin + 0.7152·G_lin + 0.0722·B_lin
- ratio = (L_light + 0.05) / (L_dark + 0.05)

Worked example — `#5A5A63 (text-muted)` on `#0A090C (obsidian)`:
- BG #0A090C: R=10,G=9,B=12 → all (c/255) ≤ 0.03928. R_lin=10/255/12.92=0.003035, G_lin=0.002732, B_lin=0.003642. **L_bg = 0.2126·0.003035 + 0.7152·0.002732 + 0.0722·0.003642 = 0.002862**.
- FG #5A5A63: R=90,G=90,B=99 → all (c/255) > 0.03928. R_lin=((90/255+0.055)/1.055)^2.4 = ((0.3529+0.055)/1.055)^2.4 = (0.3866)^2.4 ≈ 0.1075. G_lin = 0.1075. B_lin=((99/255+0.055)/1.055)^2.4 = (0.4201)^2.4 ≈ 0.1329.
- L_fg = 0.2126·0.1075 + 0.7152·0.1075 + 0.0722·0.1329 = 0.02286 + 0.07688 + 0.00960 ≈ 0.1093.
- Ratio = (0.1093 + 0.05) / (0.002862 + 0.05) = 0.1593 / 0.052862 ≈ **3.01 : 1** → fails AA normal (4.5), passes AA large (3.0) by a hair.

| Foreground | Background | Ratio | AA normal (≥4.5) | AA large (≥3) |
|------------|------------|-------|------------------|----------------|
| #F4F4F5 (text-primary) | #0A090C (obsidian) | 18.08 : 1 | PASS | PASS |
| #8A8A93 (text-secondary) | #0A090C | 5.81 : 1 | PASS | PASS |
| #5A5A63 (text-muted) | #0A090C | 3.01 : 1 | **FAIL** | PASS (marginal) |
| #D91E36 (accent-red) | #0A090C | 3.98 : 1 | **FAIL** | PASS |
| #00E5A0 (safe-green) | #0A090C | 12.03 : 1 | PASS | PASS |
| #FFB800 (warn-yellow) | #0A090C | 11.59 : 1 | PASS | PASS |

## Detailed findings

### BLOCKER

**B1. `text-text-muted` (#5A5A63) used for body-size copy at 3.01:1 — fails WCAG 1.4.3.**
The token is only safe for large text (≥18px regular / ≥14px bold). It is used for normal-size body copy in multiple places:
- `app/src/pages/Modeller.tsx:181` — `font-mono text-xs` ("X indirme" download counts on every card).
- `app/src/pages/Modeller.tsx:422` — `font-body text-sm leading-relaxed text-text-muted` ("Bu model {N}GB RAM gerektirir. GPU hızlandırma önerilir…" performance note in the detail modal — a multi-sentence paragraph at 14px).
- `app/src/pages/HangiModel.tsx:1199` — priority-count text in a non-uppercase context.
- `app/src/components/Footer.tsx:115,123,133` — copyright, GitHub link, and "Tüm Sistemler Çalışıyor" at `text-xs` (12px).

Fix: either darken the muted token to ~#9A9AA3 (would yield ~7:1) or restrict usage to genuinely large/bold contexts. Cheapest fix is to swap `text-text-muted` → `text-text-secondary` for any sub-18px non-bold paragraph.

**B2. Missing `<h1>` on 5 of 9 pages — fails WCAG 1.3.1 / 2.4.6.**
Verified by grepping `<h1` across `app/src/pages/`:
- `Indir.tsx` — only `<h2>` and `<h3>`. Largest text is rendered as h2 (`Indir.tsx:567`).
- `Hakkimizda.tsx` — only `<h2>` and `<h3>` (e.g. `Hakkimizda.tsx:311,333`).
- `Topluluk.tsx` — only h2/h3 (e.g. `Topluluk.tsx:318,380`).
- `Dokumantasyon.tsx` — only h3 (`Dokumantasyon.tsx:179,223`).
- `Fiyatlandirma.tsx` — only h2 (`Fiyatlandirma.tsx:344,406,436,479`).

Screen-reader users navigating by heading will land on h2 with no implicit page title; assistive tech will report "Heading level 2" as the document start. Fix: promote the hero/page title on each of these five pages to `<h1>`.

**B3. No skip-to-content link — fails WCAG 2.4.1.**
`Layout.tsx:44-50` renders `<Navbar /><main>{children}</main><Footer />` with no skip-nav anchor. Hamburger + 5 nav links + CTA = 7 tab stops before content on every page. Fix: add a single visually-hidden link before the navbar that becomes visible on focus, e.g. `<a href="#main" className="sr-only focus:not-sr-only ...">İçeriğe geç</a>` and `<main id="main" tabIndex={-1}>`.

### MAJOR

**M1. No `prefers-reduced-motion` accommodation anywhere — recommended at AA, required for this animation profile (WCAG 2.3.3 AAA).**
Verified `grep -r prefers-reduced-motion app/src` → 0 matches. The site runs concurrently: Lenis smooth-scroll (`Layout.tsx:11-42`), continuous mouse-tilt 3D transforms (`TiltCard.tsx:34-47`), GSAP ScrollTrigger / scrub timelines (`HangiModel.tsx:496-555`), per-card IntersectionObserver fade-up with staggered delays (`Modeller.tsx:665-688, 730-736`), full-screen `DataStreamCanvas`, hero character-split animation (`index.css:79-83`), and a typewriter `setInterval` (`HangiModel.tsx:597-605`). This is a known vestibular-disorder trigger profile. Fix: wrap `index.css` keyframes in `@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; ... } }` and add an early-return in `TiltCard` + GSAP `gsap.ticker` guard against `window.matchMedia('(prefers-reduced-motion: reduce)').matches`.

**M2. Focus-visible styles missing on most interactive elements — UA-default fallback is inconsistent against the dark theme.**
Explicit `focus-visible:ring-*` is set only on the Modeller `ModelCard` (`Modeller.tsx:127`). Nav links (`Navbar.tsx:36-51, 83-104`), footer links (`Footer.tsx:46-51, 64-69, 86-91, 102-107, 119-126`), all wizard buttons (`HangiModel.tsx:896, 985, 1062, 1166`), CTA buttons, and pagination buttons (`Modeller.tsx:590-628`) have no focus styling. Some inputs use `focus:border-accent-red` which is a 3.98:1 indicator — visible but not "thick" enough to easily spot. Fix: add a global `focus-visible:ring-2 focus-visible:ring-accent-red focus-visible:ring-offset-2 focus-visible:ring-offset-bg-obsidian` rule to a base layer, or apply per-component.

**M3. `accent-red` #D91E36 at 3.98:1 — passes AA only for large text.**
This affects: active nav-link label (`Navbar.tsx:42`), use-case filter active pill text (`Modeller.tsx:555`), pagination active page number (`Modeller.tsx:611`), the "%X popülerlik" label (`Modeller.tsx:175` — `text-[10px]` — clearly small, fails AA), accent-red headings and badges on HangiModel result card. All headings ≥18px in size meet AA-large. The 10–12px uppercase labels do not.

### MINOR

**m1. Some buttons rely on icon + uppercase label only at `text-xs` (12px).** Mostly acceptable because the labels are text not icon-only, and ratios pass when token is text-primary, but the visual hierarchy makes them easy to miss for low-vision users. Recommend keeping CTA labels at ≥14px.

**m2. Wizard step `aria-live="polite"` (`HangiModel.tsx:878`) announces the entire step on every transition.** This is verbose but technically correct; consider `role="region"` + targeted live announcement of just the step title.

**m3. Tap-target audit.** Most CTA buttons use `py-3` or `py-3.5` (24–28px vertical padding + font line-height ≈ 44–48px) which satisfies the 44×44 target. Mobile hamburger uses `p-2` on a 24px icon → 40×40px — slightly under target. Footer/Navbar text links at default sizing are not 44px-tall; this is WCAG 2.5.5 AAA, not AA, but worth flagging.

**m4. `boxShadow: 0 0 8px ${ramHex}25` etc. uses a custom HSL/hex alpha** (`Modeller.tsx:359, etc.`) — not an a11y issue, but means glow color is dependent on `ramHex` rather than a token; could drift.

**m5. Stepper visual-only.** The `role="tablist"`/`role="tab"` markers in HangiModel (`HangiModel.tsx:850-868`) are read-only progress indicators — they're not clickable to navigate between steps. Using `role="tab"` implies clickable tablist semantics. Consider `role="progressbar"` + `aria-valuenow={step}` + `aria-valuemax={5}` instead, which is closer to the actual UX.

**m6. Pagination link list is in a `<nav aria-label="Sayfa gezinmesi">`** (`Modeller.tsx:586-589`) — good — but the page buttons are real `<button>`s rather than `<a>`s, so URL/back-button does not reflect page. Not an a11y blocker, but a UX gap.

**m7. The TiltCard handles "Spacebar" key string** (`TiltCard.tsx:60`) — that's the legacy IE key string. Modern browsers report `" "` (space). The current code already handles both `' '` and `'Spacebar'`, so this is fine; just calling it out as defensive.

**m8. Empty-state h3 without h2/h1 context.** `Modeller.tsx:927` `EmptyState` renders an h3 inside a section without an intermediate h2. Minor — the page h1 + filter-bar context covers it.

## Risk-ranked top 5
1. **Color-contrast failure on `text-text-muted` for body copy (B1).** Highest impact, lowest effort. One token tweak (#5A5A63 → ~#9A9AA3) or a search-and-replace from `text-text-muted` to `text-text-secondary` on the 5–6 paragraph-size usages instantly closes the WCAG 1.4.3 violation.
2. **Missing `<h1>` on 5 of 9 pages (B2).** Screen-reader users and SEO both suffer. Mechanical fix — promote the hero heading to h1 in `Indir.tsx`, `Hakkimizda.tsx`, `Topluluk.tsx`, `Dokumantasyon.tsx`, `Fiyatlandirma.tsx`.
3. **No `prefers-reduced-motion` accommodation despite very heavy motion stack (M1).** The risk is vestibular-disorder users will literally be unable to use the site. The fix is a single CSS block + a `matchMedia` check in `TiltCard` and the GSAP setup.
4. **No skip-to-content link (B3).** Easy fix, real benefit for screen-reader and keyboard users.
5. **Focus-visible inconsistency sitewide (M2).** Add a single base-layer rule and the entire UI gains a coherent focus indicator.

## Sign-off checklist
- [x] Keyboard navigation complete (Tab, Enter, Esc, arrow keys where applicable) — Esc closes modal, Enter advances wizard, 1-4 jumps to use-case, R resets results, Tab cycles within modal.
- [x] Focus trap in modals (capture + restore) — `Modeller.tsx:222-304` (DetailModal).
- [x] Screen reader semantics validated (tablist/tabpanel/aria-pressed/aria-live) — `HangiModel.tsx:846-878`, `Modeller.tsx:544-568`.
- [ ] WCAG AA contrast verified for all token combos — **fails for `#5A5A63` body text (3.01:1) and `#D91E36` on small labels (3.98:1)**.
- [ ] `prefers-reduced-motion` respected — **absent from codebase**.
- [x] All images have alt — no `<img>` tags exist; all icons are lucide SVG inside labeled parents.
- [x] No focus traps outside modals — verified.
- [ ] Skip-to-content link present — **missing from `Layout.tsx`**.
- [~] Mobile target sizes ≥ 44px — CTAs pass; hamburger is 40×40px; text links inherit default sizing.
- [ ] Every page starts with `<h1>` — **fails on 5 of 9 pages** (Indir, Hakkimizda, Topluluk, Dokumantasyon, Fiyatlandirma).
- [~] Focus-visible styles applied site-wide — **only present on Modeller card and form inputs**; nav, footer, wizard buttons inherit UA default.
