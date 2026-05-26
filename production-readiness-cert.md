# OllamaTR — Production-Readiness Certification

**Date:** 2026-05-26
**Auditors:** 5-agent panel (Audit-A code, Audit-B UX/a11y, Audit-C content/design, Legal-1 KVKK, Legal-2 Tüketici Hukuku + Marka/IP)
**Build under review:** `b1aa710` on `main` (post 10-agent swarm)

---

## Verdict

> ❌ **NOT PRODUCTION READY — DO NOT SHIP**

The product is **technically shippable** but **legally non-compliant for the Turkish market** in its current form. Two independent legal reviews issued hard stop verdicts (KVKK: **NON-COMPLIANT**, Consumer/IP: **DO NOT SHIP**). Shipping today exposes the company to KDK fines (~9.4M₺ ceiling), Tüketici Hakem Heyeti complaints, Cohere copyright claim, and an Ollama Inc. trademark dispute.

Once the **launch blockers** below are closed, an upgrade to **CONDITIONALLY READY** is reasonable; full clean sign-off requires the technical conditions to also land.

---

## Per-auditor verdicts

| Auditor | Verdict | Report |
|---------|---------|--------|
| Audit-A · Code quality | ✅ Ready w/ conditions | [audit2-code.md](audit2-code.md) |
| Audit-B · UX + WCAG 2.1 AA | ⚠️ Ready w/ conditions | [audit2-ux-a11y.md](audit2-ux-a11y.md) |
| Audit-C · Content + design fidelity | ⚠️ Ready w/ conditions | [audit2-content-design.md](audit2-content-design.md) |
| Legal-1 · KVKK (6698) | ❌ **NON-COMPLIANT** | [legal-kvkk.md](legal-kvkk.md) |
| Legal-2 · Tüketici (6502) + Marka (6769) | ❌ **DO NOT SHIP** | [legal-tuketici-marka.md](legal-tuketici-marka.md) |

---

## 🛑 Launch blockers (must fix before any go-live)

### Legal — KVKK
1. **Self-host the 3 Google Fonts** in [app/index.html:10-12](app/index.html) — currently the only active *yurt dışı veri aktarımı*; first byte from a TR visitor leaks IP to Google Inc. (US) without any disclosure → KVKK Madde 9 violation + breaks the brand promise.
2. **Replace the marketing-style KVKK page with a real Aydınlatma Metni** — current [KVKK.tsx](app/src/pages/KVKK.tsx) shows "UYUMLU" badges for Madde 10/11 while implementing 0/5 disclosure elements and 1/8 data-subject rights. The badges are **false advertising** by themselves.
3. **Identify the Veri Sorumlusu** (legal entity name + MERSİS) — absent from `Footer.tsx`, KVKK page, and Hakkimizda.
4. **Add VERBİS reference** — Pro tier (149₺/ay) + KOBİ packages cross the registration threshold.
5. **Çerez Politikası page + cookie consent banner** — currently zero cookie disclosure infrastructure exists.

### Legal — Consumer law & IP
6. **Remove `Command-R-Turkish-35B` from commercial tiers** — license is **CC-BY-NC 4.0** (non-commercial). Currently bundled in Pro/KOBİ pricing in [Fiyatlandirma.tsx](app/src/pages/Fiyatlandirma.tsx) → copyright violation on the first KOBİ contract.
7. **Add KDV labeling** to every price (`149₺/ay KDV dahil`, `25.000₺—60.000₺ + KDV`, etc.) — TKHK Madde 54.
8. **Add Cayma Hakkı disclosure** (14-day right of withdrawal for distance subscriptions) — Mesafeli Sözleşmeler Yönetmeliği Madde 5; absent from the entire codebase.
9. **Add şirket / MERSIS / KEP / çağrı merkezi block** to `Footer.tsx` — TKHK Madde 48.
10. **Add Llama / Gemma / Qwen / Trendyol / DeepSeek attributions** to model cards (e.g., "Built with Meta Llama 3") — Meta Llama 3 Community License & Google Gemma Terms require this.
11. **Disclaim or remove the partner logos** in [Hakkimizda.tsx:393-447](app/src/pages/Hakkimizda.tsx) — KOSGEB / TÜBİTAK / Teknopark İstanbul / İTÜ ARI / BİLGİ / TYZİ rendered as confirmed partners without MOUs → SMK Madde 6 confusion-similarity exposure + TTK Madde 55 haksız rekabet.
12. **Resolve the "OllamaTR" wordmark vs Ollama Inc. trademark** — either a license, a descriptive-use disclaimer, or a rebrand. Currently the wordmark in `Footer.tsx:30-31` has zero trademark notice.

---

## ⚠️ Sign-off conditions (close before clean AA)

### Accessibility (Audit-B)
- **WCAG 1.4.3 contrast fail:** `text-text-muted` (#5A5A63) on `bg-obsidian` (#0A090C) = **3.01:1** — needs ≥ 4.5:1. Used at Modeller.tsx:181/422 and across Footer. Bump to ≥ #8A8A93 or restrict to large-text contexts only.
- **No `<h1>` on 5/9 pages** (Indir, Hakkimizda, Topluluk, Dokumantasyon, Fiyatlandirma) — document outline starts at h2 → WCAG 1.3.1 / 2.4.6 fail.
- **No `prefers-reduced-motion` accommodation** + **no skip-to-content link** in [Layout.tsx](app/src/components/Layout.tsx) — vestibular-risk + keyboard-bypass gap given Lenis + GSAP + canvas + tilt + IO fades.

### Content (Audit-C)
- [HangiModel.tsx:69-217](app/src/pages/HangiModel.tsx) still hardcodes its own non-canonical `modelDatabase` ("Llama 3.1 Turkuaz 8B" etc.) — the wizard recommends models the Modeller catalog doesn't have. Switch to `@/lib/models-data`.
- [Home.tsx:483](app/src/pages/Home.tsx): `TÜRKİYE'NIN` → `TÜRKİYE'NİN` (missing dot on İ).
- [Hakkimizda.tsx:466](app/src/pages/Hakkimizda.tsx): `Almağa` → `Almaya` (archaic → modern Turkish).

### Code (Audit-A)
- Two **dead** `href="#"` placeholders in [Indir.tsx:342, 575](app/src/pages/Indir.tsx) — the primary "İndir" download CTAs do nothing on click.
- Duplicate `useScrollReveal` in [KVKK.tsx:23-44](app/src/pages/KVKK.tsx) bypasses the shared hook.
- 43 orphan shadcn UI files + ~25 unused production deps still in `package.json` (vite tree-shakes from runtime, but supply-chain surface remains).

---

## ✅ What the swarm got right

- All 9 routes are lazy-loaded; gzipped initial bundle ~79KB
- `tsc -b` and `eslint .` both exit 0 — zero `any`, zero `@ts-ignore`, zero `dangerouslySetInnerHTML`, zero hardcoded secrets
- All 12 canonical Turkish model names live in shared `src/lib/models-data.ts`
- HangiModel wizard rebuilt with proper ARIA (`tablist` / `tab` / `aria-pressed` / `aria-disabled`) and max-2 enforcement
- DetailModal focus trap captures + restores focus correctly
- DataStreamCanvas pauses on `visibilitychange`, caps particles, falls back to gradient on mobile
- Lenis cleanup + RAF cancellation correct; no animation/observer leaks
- KVKK page no longer times out (deferred-mount + ErrorBoundary)
- Turkish content is largely diacritic-correct; "welcome" Anglicism removed; pricing aligns to design

---

## Path to "PRODUCTION READY"

| Phase | Effort | Owner | Output |
|-------|--------|-------|--------|
| P1 — Close 12 legal blockers above | ~2-3 day | Legal + 1 eng | Defensible under KVKK / TKHK / SMK |
| P2 — Close UX/Content/Code conditions | ~1 day | 1 eng | Clean WCAG AA + canonical wizard data |
| P3 — Re-run the 5-agent audit | ~30 min | This panel | Sign-off certificate |

**Recommendation:** spin a 2nd 10-agent swarm targeted at the 12 launch blockers, then re-certify.

---

*Generated by the 5-agent production-readiness audit panel.*
