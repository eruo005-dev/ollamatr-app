# OllamaTR — redesign-existing-projects Audit
**Agent:** R1 | **Date:** 2026-05-26 | **Build:** 57ba4d6 (post-strip)

## Scan
Vite + React 19 + React Router v7 SPA in `app/`, styled with Tailwind v3 + small CSS tokens (`bg-obsidian`, `accent-red`, `text-primary`). Motion stack: Framer Motion + GSAP/ScrollTrigger + Lenis + a custom `useScrollReveal` IntersectionObserver hook. Self-hosted Inter / Space Grotesk / JetBrains Mono via `@fontsource`. Icons: `lucide-react` (only). Commits 37dcaa5 + 57ba4d6 removed canvas particles, glow box-shadows, neon textShadows, 3D mouse-tilt, and neutered the source `staggerContainer`/`staggerChild` Framer variants — but the *call sites* still use `motion.div`, the *JSX* still passes `perspective: 1000px` on the Home model grid, `boxShadow: '0 0 40px ...'` on the Hangi-Model terminal wrapper, an `animate-ping` on the footer status dot, and a custom per-character `.hero-char` keyframe scatter on the Home H1. The DESIGN-READ dials (variance 4 / motion 3 / density 4) are violated in places the strip pass didn't reach.

## Diagnose — findings by category

### Typography
| File:line | Issue | Fix |
|---|---|---|
| `Home.tsx:146` | `HERO_TITLE = 'YAPAY ZEKA, TÜRKÇE KONUŞSUN.'` — all-caps H1, explicitly banned by DESIGN-READ | Sentence case: `'Yapay zeka, Türkçe konuşsun.'` |
| `Home.tsx:267, 386, 480, 586, 646` | Every section H2 is `uppercase` ("100+ TÜRKÇE-OPTİMİZE MODEL", "SİSTEMİN HAZIR MI?", "TÜRKİYE'NİN GELİŞTİRİCİLERİ GÜVENİYOR", "NEDEN OLLAMATR?", "TÜRKİYE'NİN AI DEVRİMİNE KATIL.") | Drop `uppercase` Tailwind utility on H2s, keep title case |
| `Hakkimizda.tsx:348, 394, 460`, `Fiyatlandirma.tsx:400, 462, 492`, `Topluluk.tsx:318, 380, 462, 521`, `KVKK.tsx:235, 326, 416` | Same all-caps H2 pattern across every page ("EKİP", "İLGİLİ EKOSİSTEM", "YOL HARİTASI", "BAĞLANTILAR", "KATKIDA BULUNANLAR", "ETKİNLİKLER", "KARŞILAŞTIRMA", "KVKK MADDE REFERANSLARI"…) | Strip `uppercase` from H2s site-wide; reserve uppercase for `<p>` micro-eyebrows only |
| `HangiModel.tsx:1332`, `Modeller.tsx:918`, `Fiyatlandirma.tsx`, `KVKK.tsx` | Eyebrows in caps ("MODEL SİHİRBAZI", "MODEL KATALOĞU", "DESTEK · BAĞIŞ", "HAKKIMIZDA") with `tracking-wider`/`tracking-[0.08em]` — acceptable per DESIGN-READ but inconsistent tracking values across pages | Standardize eyebrow tracking to one value (`tracking-[0.18em]`) |
| `Home.tsx:163-180` | Custom per-character `.hero-char` keyframe stagger on H1 (delay = `abs(idx-midpoint)*0.04 + 0.3`) — exactly the "AI demo reel" scatter banned by motion=3 | Replace with single fadeUp on the whole H1, or render static |
| Site-wide | Only weights 400/500/700 used. Space Grotesk only at 400/700. No 600 for the layered "eyebrow → H2 → body" rhythm | Introduce font-weight 600 on H2 and eyebrows for tighter hierarchy |
| `Home.tsx:191`, `Hakkimizda.tsx:285`, `Topluluk.tsx:302` | Hero subtitle `max-w-2xl`/`max-w-[600px]` — fine, but no `text-wrap: balance` on H1 | Add `text-wrap: balance` to all H1/H2 |
| `Home.tsx:545`, `Topluluk.tsx:84` | Stats and contributor counts render in proportional figures, not tabular | Add `font-variant-numeric: tabular-nums` (or `tabular-nums` utility) on all data-display numbers |
| `Modeller.tsx:135-150`, `Fiyatlandirma.tsx:286-298` | Card title + RAM badge baselines visibly drift (badge is `text-xs` next to `text-lg/xl` title in `items-start`) | Either align baseline or pin badge to top-right with `items-start justify-between` + explicit `mt-1` on the badge |

### Color & Surfaces
| File:line | Issue | Fix |
|---|---|---|
| `HangiModel.tsx:735` | `boxShadow: '0 0 40px rgba(217, 30, 54, 0.1)'` on terminal wizard — surviving glow, DESIGN-READ explicitly bans glow box-shadows | Remove |
| `HangiModel.tsx:298-302, 815, 970, 1086, 1170-1172, 1188` | `getRamShadow()` still returns `0 0 12px rgba(...)` glows; selected option cards have `boxShadow: '0 0 20px rgba(217, 30, 54, 0.2)'`; result card has `0 0 30px rgba(217, 30, 54, 0.2)` | Replace all with bordered-card pattern: `border-l-3 border-l-accent-red` or solid `border-accent-red`; delete `getRamShadow` |
| `HangiModel.tsx:769-774, 1388` | Wizard progress dots and process-step circles use `boxShadow: '0 0 8px rgba(217, 30, 54, 0.4)'` / `0 0 20px rgba(...)` | Drop the box-shadow; rely on color alone (matches DESIGN-READ "static status dots") |
| `Hakkimizda.tsx:122-145` | Roadmap dot color logic reuses `bg-accent-red` for `in-progress` + `bg-safe-green` for completed + `bg-text-muted` for planned — fine, but the timeline line itself is `bg-accent-red` solid red and visually competes with the dots | Use `bg-accent-red/40` for the connecting line so dots read as discrete steps |
| `Modeller.tsx:333-337` | Modal backdrop `backgroundColor: 'rgba(10, 9, 12, 0.85)'` + `backdropFilter: blur(8px)` plus card border + shadow = glassmorphism on glassmorphism (banned) | Drop `backdropFilter`, raise backdrop opacity to 0.92 |
| `Modeller.tsx:347` | Modal `boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'` — pure-black generic shadow on a tinted surface | Use tinted shadow: `rgba(10, 9, 12, 0.6)` |
| `Home.tsx:153-158` | Empty `<div>` with `style={{ background: 'transparent' }}` left in hero — dead wrapper from the strip | Delete the empty overlay div |
| `Home.tsx:638-642` | CTA banner has `<div className="pointer-events-none absolute inset-0" aria-hidden="true" />` — also a dead post-strip wrapper | Delete |
| `Modeller.tsx:524-527`, `Navbar.tsx:25` | Two stacked `backdrop-filter: blur` layers: navbar (`blur(12px)`) + filter bar (`blur(12px)`) overlapping when filter bar sticks beneath navbar | Drop blur on the filter bar (it sits below an opaque navbar already) |
| `Hakkimizda.tsx:370`, `Topluluk.tsx:405-415`, `Topluluk.tsx:514` | Avatar initials are stat-style "AY", "DK", "EŞ" rings — single-letter color rings = a known AI-template tell. Topluluk uses a *rainbow* of 10 accent colors (purple, orange, teal, blue, red, green, yellow) which violates "one accent locked" | Strip the 10-color palette to: muted neutrals for the wall + `accent-red` for featured-3 |
| Site-wide | Background is `#0A090C` (obsidian) — fine — but no grain/noise overlay. Sections feel sterile, especially the long flat band between SocialProof and Features on Home | Add a single fixed grain SVG at ~3% opacity behind `main` |

### Layout
| File:line | Issue | Fix |
|---|---|---|
| `Home.tsx:280-321` | Two-row 3-column grid with `perspective: 1000px` + `rotateY(-3deg)`/`+3deg` — this is exactly the "3 equal card columns" cliché *plus* the gimmicky 3D tilt | Flatten to a single asymmetric/zigzag grid OR 2-column staggered; remove `perspective` and `rotateY` |
| `Modeller.tsx:732-779` | Same row-of-3 `rotateY(-3deg)/+3deg` perspective in the Modeller grid | Flatten; remove `perspective: 1000px` |
| `Home.tsx:153` | Hero is `min-h-[100dvh]` ✓ (good, fixed already) but flexbox center has no max-w wrapper around the section's bg — fine, but on ultra-wide it looks centered-in-a-void | Add a faint left-aligned label or shift content `text-left` on `lg:` |
| `Fiyatlandirma.tsx:250-256` | Classic 3-tier pricing tower with the middle scaled `md:scale-[1.02]` — the canonical "pricing 3 towers" pattern | Highlight middle with border + label badge only; remove the `scale-[1.02]` (use surface elevation not size) |
| `Fiyatlandirma.tsx:365` | Feature list starts at variable Y offsets between tiers because tier descriptions and CTA-secondary differ in height | Pin feature `<ul>` to a fixed `mt-` from a shared anchor (e.g. give CTA block a `min-h-[140px]`) |
| `Home.tsx:506`, `Fiyatlandirma.tsx:504`, `Hakkimizda.tsx:354` | 3-card testimonial / partner / team rows — `grid-cols-3` everywhere | Vary at least one of them: testimonials → masonry or single-rotating; team → 2x2 with bios visible (4 members fits 2×2 better than 1×4) |
| `Hakkimizda.tsx:354` | Team row is `lg:grid-cols-4` cramming 4 cards with 3-line bios — typographic claustrophobia at lg breakpoint | Switch to `lg:grid-cols-2` with wider bio columns |
| `Modeller.tsx:192-218` | Card has "Detaylar" + "İndir" buttons + footer with download count — too dense; CTA row competes with star rating row above | Remove the `Detaylar` button (whole card is already `role="button"` clickable); keep only the primary `İndir` |
| `Modeller.tsx:826` | RAM comparison bar labels overlap the bar fill on small widths — `mixBlendMode: 'screen'` is a fragile fix | Move RAM label outside the bar (to the right) on `<md` |
| `Topluluk.tsx:336` | Platform card `hover:-translate-y-0.5` while also `transition-all duration-300` — micro-lift hover is fine per DESIGN-READ but the duration is 300ms (DESIGN-READ specifies 200ms) | Standardize to `duration-200` |
| `Hakkimizda.tsx:364` | Team card has `hover:-translate-y-1` (4px) — same duration drift, same anti-motion-3 lift magnitude | Reduce to `-translate-y-0.5` (2px) or remove |

### Interactivity & States
| File:line | Issue | Fix |
|---|---|---|
| `Footer.tsx:202-206` | `<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-safe-green opacity-75" />` — an infinite-loop pulse on the "Tüm Sistemler Çalışıyor" dot. **DESIGN-READ explicitly bans animate-pulse/ping on small status dots** | Remove `animate-ping`, keep solid dot |
| `Fiyatlandirma.tsx:335-340` | "Haberdar Et" CTA falls through to a `<button>` that does nothing (no `onClick`, no `href`) when `ctaHref` and `ctaLink` are both undefined — dead button | The "Kurumsal" tier already has `mailto:` href so this fallback never triggers — delete the dead fallback `<button>` branch |
| `Topluluk.tsx:362-368`, `Topluluk.tsx:447-453`, `Topluluk.tsx:504-510`, `Topluluk.tsx:570-585` | "Katıl" buttons on platform cards, "Sen de katkıda bulun!" CTA, "Detaylar" on events, "Topluluğa Katıl" / "GitHub'da Keşfet" bottom CTAs — **all are `<button type="button">` with no onClick / no href** → dead buttons | Replace with `<a href="https://discord.gg/...">` / `<a href="https://t.me/...">` real platform links, or visually disable |
| `Modeller.tsx:461-464` | "Modeli İndir" button in detail modal — no `onClick`, no link, no handler → dead | Wire to `/indir` or model download URL |
| `Modeller.tsx:534-543` | Search input has no clear button (X icon) when query is non-empty | Add inline clear-X button (visible when `searchQuery !== ''`) |
| `Modeller.tsx:599` | `aria-live="polite"` on result count ✓ — but EMPTY-state (line 956-967) is just an icon + text; no "Reset filters" affordance | Add "Filtreleri Sıfırla" button in EmptyState that clears all filters |
| `Modeller.tsx` | No loading-skeleton state — fine here because `MODELS` is static, but the dynamic filter transition has no perceptible "is computing" feedback. Acceptable; flag as omission only |
| `HangiModel.tsx:687` | Keyboard handler listens for `r/R` to reset on step 5, plus `Enter` to advance — undocumented anywhere in UI | Add a tiny `font-mono text-xs text-text-muted` hint below the terminal bar: "Enter: ilerle · R: baştan başla" |
| `Home.tsx:204-216`, every "Hemen Başla" / "Ücretsiz İndir" / "Pro Planı İncele" CTA | `to="/indir"` — but `/indir` route may not have a real download (Tauri installer). Need to verify; if the route renders a placeholder, mark | Verify `/indir` resolves; if not, add a "Yakında" badge to the CTA |
| Site-wide | No `:focus-visible` rings on the bespoke buttons that override default outline with `outline-none` (HangiModel wizard option buttons use only `aria-pressed` + border color) | Add `focus-visible:ring-2 focus-visible:ring-accent-red focus-visible:ring-offset-2 focus-visible:ring-offset-bg-obsidian` to all custom button surfaces |
| `Navbar.tsx:48` | Active-link underline is `block h-0.5 w-full` *below* the label — but parent `<Link>` is `inline` so the underline can wrap to next line on narrow widths | Make parent `inline-block` or use `border-b-2` instead |

### Content (post-strip residue)
| File:line | Issue | Fix |
|---|---|---|
| `Home.tsx:445-450` | Fake round stats: `10000+ İndirme`, `100+ Model`, `5000+ Aktif Kullanıcı`, `50+ Kurumsal Entegrasyon`. All round, all invented; "Kurumsal Entegrasyon" outright contradicts Fiyatlandirma's "Kurumsal · YAKINDA" tier | Either remove the stats block entirely (the page is fine without it for a community OSS) or replace with verifiable GitHub-derived numbers: stars, forks, contributors, releases (organic, messy: "1.247 GitHub stars · 23 contributors · v0.4.2") |
| `Home.tsx:452-471` | Generic testimonials with generic anonymized names (Ahmet Y., Elif K., Mehmet D.) + invented quotes (`%40 müşteri memnuniyeti artışı`) — these are not real and read as the most generic AI-template testimonial set | Replace with real GitHub issue quotes, real Discord screenshots, OR drop the whole testimonial block (a Topluluk OSS doesn't need 3-card testimonials on the homepage) |
| `Hakkimizda.tsx:23-48` | Team members: **Ali Yılmaz** (Kurucu & CEO), **Deniz Kaya** (CTO), **Ebru Şahin** (ML Lead), **Can Özdemir** (Head of Product) — these are the Turkish equivalent of "John Doe / Jane Smith". Plus invented credentials ("Önceden Trendyol AI ekibinde", "eski Hugging Face contributor", "Boğaziçi misafir araştırmacı", "Peak Games ürün direktörü") | Either real names with real GitHub handles, OR remove the section entirely and replace with "Topluluk Tarafından Geliştirilmiştir → contributors graph from GitHub". The CEO/CTO titles also contradict KVKK page's "şu anda bir tüzel kişiliğe sahip değildir" |
| `Hakkimizda.tsx:59-66` | Partners list: Teknopark İstanbul, KOSGEB, TÜBİTAK, İTÜ ARI, BİLGİ, Türkiye YZİ — invented. The disclaimer at line 403-410 admits "Bu kuruluşlarla resmi bir ortaklığı yoktur" — but the partner *logos* are still shown, which is misleading and a trademark risk (and contradicts the "trust-first" DESIGN-READ posture) | Delete the partner section entirely; replace with a single "Ekosistemde Yerimiz" paragraph if needed |
| `Hakkimizda.tsx:283`, `Hakkimizda.tsx:336-339` | "Türkiye'nin AI Altyapısını İnşa Ediyoruz" + "Bugün 10.000+ kullanıcı, 100+ model" — same invented numbers, plus the AI-cliché "altyapısını inşa" framing | Soften to: "Türkçe AI için bir topluluk girişimi." Drop the 10.000+ figure (or use real GitHub numbers) |
| `Topluluk.tsx:42, 51, 60, 69` | Platform member counts: "5.234 üye" (Discord), "1.876 üye" (Telegram), "234 contributor" (GitHub), "456 konu" (Forum). These look organic — but they're hardcoded so they will always be wrong | Either pull live counts or drop the count line entirely |
| `Topluluk.tsx:84-88` | Featured contributors: Mehmet K. (247 Kod), Ayşe Y. (156 Dökümantasyon), Burak T. (134 Çeviri) — invented. Same problem as Hakkimizda team | Real GitHub contributors via API, or remove |
| `Topluluk.tsx:90-111` | 20 contributor avatars (`'Ayşe K.', 'Mehmet T.', 'Deniz Y.'`…) all initials-circles in 10 random colors. Stock "diverse team" pattern | Real GitHub avatars or remove entirely |
| `Topluluk.tsx:141-172` | Events: "Türkçe LLM Workshop'u — 15 Mart 2025 — Teknopark İstanbul", "KOBİ AI Eğitimi", "Türkçe NLP Hackathon" — invented future events, will rot | Either link to a real lu.ma / eventbrite, or replace with a calendar/iCal subscription block |
| `Topluluk.tsx:184-210` | Forum highlights with hardcoded reply counts — same rot risk | Use a "Latest from GitHub Discussions" embed, or drop |
| `Fiyatlandirma.tsx:158-176` | Testimonials: Selin A. (İndie geliştirici), Burak T. (Açık kaynak gönüllüsü), Zeynep K. (ODTÜ öğrencisi) — same invented-quote pattern. Section heading is "MÜŞTERİ YORUMLARI" — but the project has no müşteri (the page itself says "Şu anda satışı yapılan ücretli bir hizmet bulunmamaktadır") | Rename section to "TOPLULUK YORUMLARI" minimally; or drop testimonials entirely on a free-only page |
| `Home.tsx:653` | CTA H2: "TÜRKİYE'NİN AI DEVRİMİNE KATIL." — "AI devrimi" is the textbook AI-cliché (≈"Unleash your potential") banned by SKILL.md content rules | Replace with something specific: "Yerel ve Türkçe. Şimdi indir." |
| `Home.tsx:194-197` | Hero subtitle: "100'den fazla Türkçe-uyumlu yapay zeka modelini tek tıkla bilgisayarınıza getirir" — claim "100+" appears 3 times across the page; if `MODELS_DATA` actually has 100, fine, otherwise inflated | Verify count in `models-data.ts`, write the actual number |
| `Hakkimizda.tsx:473` | "Bizimle Yol Almaya Hazır mısınız?" + "Türkiye'nin AI devriminin bir parçası olun" — same "devrim" cliché | Rewrite plainly |
| `Topluluk.tsx:299` | Hero H1: "Birlikte Büyüyoruz" — generic "we grow together" | Either make it specific ("234 katılımcı, 1 amaç: Türkçe AI") or keep but soften |

### Component Patterns
| File:line | Issue | Fix |
|---|---|---|
| `Modeller.tsx:122-222` | Model card: border + bg + 4 inner sections (header, desc, attribution, tags, rating, footer-with-2-buttons) → archetype "generic card" | Trim to 3 zones: identity (name + RAM), reason (desc + tags), action (single İndir). Pull license/rating to detail modal only |
| `Fiyatlandirma.tsx:248-395` | 3-tier pricing table is the textbook "3 towers + middle highlighted" pattern | Already partially mitigated (middle tier uses `scale-[1.02]`); but for a project that doesn't actually sell tiers, the whole 3-card pattern is wrong. Consider 2 cards (Topluluk + Bağış) + a single "Kurumsal yakında" inline strip |
| `Fiyatlandirma.tsx:458-486` | FAQ uses Radix Accordion — DESIGN-READ allows it (accordion expand listed in "Kept"). Fine. But 5 questions all collapsed by default = friction | Open first item by default (`defaultValue="item-0"`) |
| `Fiyatlandirma.tsx:488-530` | 3-card testimonial grid with `_.charAt(0)` initials circles — the exact "3-card carousel testimonials with dots" cliché (minus dots) | Drop the testimonial section on a paywall-less pricing page |
| `Footer.tsx:30-127` | Classic 4-column footer link farm (Brand / Quick Links / Resources / Connect) | Simplify to: Brand + Yasal/Legal + GitHub. Quick Links and Resources both repeat the same destinations |
| `Hakkimizda.tsx:367-373`, `Topluluk.tsx:405-414`, `Fiyatlandirma.tsx:513-516` | Avatar circles everywhere (initial-rings) | Switch to squircles (`rounded-lg` not `rounded-full`) for the contributor wall — distinguishes "code people" from "team people" |
| `Modeller.tsx:328-484` | DetailModal is a centered modal with backdrop blur. For a model card → could be a slide-over panel from the right | Slide-over panel (drawer) instead of modal — feels more "catalog browse" than "popup overlay" |
| `Home.tsx:183-188` | Status pill: `rounded-full border border-safe-green/30 bg-safe-green/10` + pulsing dot pattern. Pill-shaped "Beta" badge cliché (here labeled "Topluluk Edisyonu") | Try square corners on the pill: `rounded-sm` |

### Iconography
| File:line | Issue | Fix |
|---|---|---|
| All pages | `lucide-react` only — DESIGN-READ acknowledges this and accepts it as out-of-scope. No action |
| `HangiModel.tsx:8-28` | 18 distinct Lucide icons imported; some are cliché-mapped: `Rocket` for "Hemen Başla" step 04, `Shield` for KVKK, `Sparkles` for "Eşleşme" badge | Swap `Rocket → Play`, `Sparkles → Check`, `Shield` is fine for security |
| `index.html:8` | `<link rel="icon" type="image/svg+xml" href="/favicon.svg" />` — single favicon, no `apple-touch-icon`, no `manifest`, no 16/32 png fallback | Add `apple-touch-icon`, dark/light scheme media query, and a 32×32 PNG fallback for Safari |
| `Modeller.tsx:178-183`, `KVKK.tsx:256` | Star icons via `Star` Lucide with `fill-warn-yellow` + `text-warn-yellow` paired — works but stroke widths inconsistent with adjacent `MemoryStick` and `Download` (Lucide default 2px, fill version reads heavier) | Standardize all icon `className` to include `strokeWidth={1.75}` for visual consistency, OR accept the contrast |

### Strategic Omissions
| File:line | Issue | Fix |
|---|---|---|
| Site-wide | No custom `/404` page declared in router | Add `<Route path="*" element={<NotFound />} />` with a branded 404 (link to Home + Modeller + Topluluk) |
| Site-wide | No "back" navigation pattern on `KVKK`, `Hakkimizda`, `Fiyatlandirma` long-form pages (browser back works, but no in-page "← Geri" affordance at the top) | Add a sticky breadcrumb on detail pages: `Ana Sayfa / KVKK` |
| `Modeller.tsx:534-544` | Search input has no debounce (filtering on every keystroke against the full MODELS list) — works for static data, will not scale | Add `useDeferredValue` or 200ms debounce |
| `Layout.tsx:47-52` | Skip-to-content ✓ implemented |
| `Layout.tsx:55` | Cookie banner ✓ rendered |
| Site-wide | No form validation visible — but there are no real forms on the audited pages (only RAM calculator inputs, which use `type="number"` `min/max`). Acceptable for now |
| `index.html` | Meta title contains `Turkiye'nin` (ASCII apostrophe + no Turkish chars) — the rest of the site is full UTF-8 Turkish | Restore Turkish chars: `Türkiye'nin Yerel AI'si` |
| `index.html:9` | OG image `<meta property="og:image" content="/og-image.jpg" />` — but no `og:title`, `og:description`, `og:url`, `og:type`, no Twitter card meta | Add `og:title`, `og:description`, `og:url`, `og:type=website`, `og:locale=tr_TR`, `twitter:card=summary_large_image`, `twitter:title`, `twitter:description`, `twitter:image` |
| `index.html` | No `<meta name="theme-color">` (mobile browser chrome stays default) | Add `<meta name="theme-color" content="#0A090C">` |
| `index.html` | No `<link rel="canonical">` on the SPA shell | Add canonical pointing to https://ollamatr-app.vercel.app/ |

## Fix priority (per skill's order)

1. **Font swap** — skip. Already on Space Grotesk + Inter + JetBrains Mono per DESIGN-READ. Risk LOW · priority N/A.
2. **Color cleanup** — strip residual glow box-shadows in HangiModel (terminal wrapper, option cards, result card, process dots, RAM shadows), `animate-ping` in footer, the 10-color contributor rainbow in Topluluk, dead transparent overlay divs in Home. Risk **LOW** · priority **HIGH** (this is the DESIGN-READ cleanup the strip pass missed).
3. **Hover/active states** — standardize transition durations to 200ms site-wide, reduce hover-lift magnitudes from `-translate-y-1` to `-translate-y-0.5`, add `focus-visible` rings on bespoke buttons. Risk **LOW** · priority **HIGH**.
4. **Layout & spacing** — flatten 3D perspective grids on Home + Modeller; collapse 4-tier-team-row to 2x2; collapse 3-tier pricing to 2-tier+inline. Risk **MEDIUM** · priority **MEDIUM**.
5. **Replace generic components** — Modeller modal → slide-over drawer; testimonials → single rotating quote OR delete; footer link farm → 3 sections not 4. Risk **MEDIUM** · priority **MEDIUM**.
6. **Loading/empty/error states** — add "Filtreleri Sıfırla" button to Modeller EmptyState; wire up the dead Topluluk + Modeller modal buttons (or visibly disable); add `/404` page; keyboard-shortcut hint in HangiModel. Risk **LOW** · priority **HIGH**.
7. **Typography polish** — strip `uppercase` on every site-wide H2; restore Turkish chars in `<title>`; introduce font-weight 600; add `text-wrap: balance` on H1/H2; tabular-nums on stats; sentence-case the hero H1; replace per-char `.hero-char` scatter with single fade. Risk **LOW** · priority **HIGH**.

## Top 10 highest-impact, lowest-risk fixes (ranked)

1. **Drop all `uppercase` Tailwind utility from H2/H1 site-wide.** One regex, ~15 files, instant "less AI-template" read. The H1 `'YAPAY ZEKA, TÜRKÇE KONUŞSUN.'` → `'Yapay zeka, Türkçe konuşsun.'` alone is the single biggest visual shift.
2. **Remove `animate-ping` from Footer status dot** (Footer.tsx:204). DESIGN-READ explicitly bans it. One-line delete.
3. **Strip residual glow `boxShadow`s in HangiModel.tsx** (lines 735, 773, 815, 970, 1086, 1170-1172, 1188, 1389) + delete `getRamShadow()`. ~20 lines, all in one file, no JSX restructure.
4. **Replace fake stats + invented testimonials on Home.tsx** with real numbers (or remove the SocialProofSection entirely). Kills the "AI-template homepage" feel in one section.
5. **Rename Hakkimizda team to real GitHub contributors (or delete the team section).** The "Ali Yılmaz / Deniz Kaya / Ebru Şahin / Can Özdemir" lineup is the Turkish "John Doe" — also contradicts the KVKK page's "no legal entity" claim.
6. **Delete the partner-logo wall** in Hakkimizda.tsx (Teknopark / KOSGEB / TÜBİTAK etc.) — the disclaimer admits they aren't partners, so showing the logos is misleading + a trademark risk.
7. **Flatten the 3D perspective grid on Home + Modeller** (`perspective: 1000px` + `rotateY(±3deg)`). One file change per page, makes the page feel 3 tiers less "demo reel".
8. **Wire up or visibly disable the 6 dead buttons in Topluluk.tsx** (Katıl ×4, "Sen de katkıda bulun!", "Topluluğa Katıl" / "GitHub'da Keşfet"). They're shipping fake CTAs.
9. **Fix `index.html` meta**: restore Turkish chars in `<title>`, add full OG suite (`og:title`, `og:description`, `og:url`, `og:type`, `og:locale`, twitter cards), add `theme-color`, add canonical. ~10 lines, zero risk.
10. **Replace Home hero per-char `.hero-char` scatter animation with a single fadeUp** (Home.tsx:148-180). The per-char delay scatter reads as "AI demo reel" and is the loudest motion-violation remaining on the page.

## What NOT to do (taste-skill MOTION_INTENSITY: 3 lock)

The audit pattern would normally suggest these "upgrade techniques" — **do NOT apply them here**:

- ❌ **Variable-font animation on scroll** (DESIGN-READ §Anti-Default: infinite-loop micro-animations of any kind)
- ❌ **Outlined-to-fill text reveals** (banned: "Cascading Framer-Motion stagger fade-ups across every section")
- ❌ **Text mask reveals with video behind** (way over variance=4 budget)
- ❌ **Smooth scroll with inertia** — Lenis is already passively integrated; do **not** add a heavier cinematic momentum curve
- ❌ **Staggered entry on every section** — the source primitives `staggerContainer`/`staggerChild` were *neutered* in `lib/animations.ts` for this exact reason; do not re-introduce timed cascades via inline `style.transition` (which several call-sites still do — leave the existing ones, but do not add more)
- ❌ **Spring physics** on hover (banned by motion=3; use the existing 200ms ease)
- ❌ **Scroll-driven SVG draw-on reveals** (Hakkimizda roadmap timeline already pushes the budget with GSAP scroll-scrubbed `scaleY` — do not extend the pattern to other pages)
- ❌ **Spotlight-cursor card borders** (banned: glow box-shadows)
- ❌ **Parallax card stacks / split-screen scroll** (variance=4 is symmetry-leaning, not Awwwards-experimental)
- ❌ **True glassmorphism with inner border + inner shadow** (banned: glassmorphism on glassmorphism)
- ❌ **Light-mode toggle** (project is dark-only by design; adding sun/moon would itself violate DESIGN-READ §Component Patterns)
- ❌ **Switching from Lucide to Phosphor/Heroicons** (DESIGN-READ: "a swap is out of scope")
- ❌ **Adding a new accent color** beyond `accent-red` — the Color Consistency Lock holds. If the contributor wall feels monotone after stripping the rainbow, use *weight + size*, not a second hue.

The point of motion=3 / variance=4 is restraint. Most "premium polish" upgrades suggested by the skill audit are the wrong move for a *trust-first community OSS landing* — they read as marketing-page sheen, not the named-operator KVKK accountability the brand is selling.
