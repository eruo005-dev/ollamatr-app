# OllamaTR — To Be a Turkish AI Household Community Name

**Master synthesis of 9 audit agents** (3 gap hunters · 3 deep auditors · 3 strategic super agents)
**Date:** 2026-05-26
**Build under review:** `e511a7f` on `main`, live at https://ollamatr-app.vercel.app

---

## TL;DR

OllamaTR ships a **beautiful, polished marketing site for a product that does not yet exist**. Every agent — from the product gap hunter to the brand strategist — surfaced the same gap: the front of house is at 80% finish, the kitchen is empty, and a lot of the décor on the walls is faked. The path to becoming a Turkish AI household name is clear and converges across all 9 reports: **demolish the fabrications, ship one real thing (the Tauri installer), claim the brand legally, and start telling a uniquely Turkish story.**

Verdict: **strong wedge, very real opportunity, but 90 days of unglamorous repair work between here and the first growth push.**

---

## P0 — Stop-the-bleeding (this week)

These are the things that block launch *and* create legal liability the longer they stay live:

| # | Item | Source | File:line |
|---|------|--------|-----------|
| 1 | Delete fake team in Hakkimizda (Ali Yılmaz, Deniz Kaya, Ebru Şahin, Can Özdemir) — none real, "ex-Trendyol/HF/Getir" claims | G2, T1, T2 | `Hakkimizda.tsx:83-108` |
| 2 | Delete fake partner logos (KOSGEB, TÜBİTAK, Teknopark İst., İTÜ ARI, BİLGİ, TYZİ) — false association with state institutions | G2, G3, Legal-2 | `Hakkimizda.tsx:393-447` |
| 3 | Delete fake stats (10.000+ geliştirici, 5.234 Discord üye, 234 contributor, 20 named contributor avatars) | G1, G2, T1, T2 | `Topluluk.tsx:99-136`, `Home.tsx` STATS |
| 4 | Delete fake testimonials (Selin A./Burak T./Zeynep K. with real-looking names + titles) | G1, T1, T2 | `Fiyatlandirma.tsx`, `Home.tsx` TESTIMONIALS |
| 5 | Delete past-dated fake events (15 Mart / 22 Mart / 5-6 Nisan 2025 — 14 months stale) | G2 | `Topluluk.tsx:182-201` |
| 6 | Fix "100+ model" claim — catalog has 12 | G1 | Home, Indir, HangiModel copy |
| 7 | Remove leftover "Pro tier ile gelişmiş özelliklere erişin" + "Pro Planı İncele" CTA on Home | T2 | `Home.tsx` CTA banner |
| 8 | Indir.tsx download CTAs point to `github.com/ollamatr/installer/releases/latest` → 404 | G1, T1 | `Indir.tsx:340, 575` |
| 9 | Fix broken link graph — every Discord / Telegram / Patreon / GitHub Sponsors / `iletisim@ollamatr.dev` href points to unclaimed handles | G2 | `Topluluk.tsx`, `Footer.tsx`, `Fiyatlandirma.tsx` |
| 10 | Replace `[Operatör İsim Soyisim]` placeholder with real name (or honest pseudonym + disclosed pseudonym practice) | T1, T2, V1 | `KVKK.tsx:506`, `Footer.tsx:24` |
| 11 | Unify email domain — currently `@ollamatr.com` / `@ollamatr.dev` / `privacy@ollamatr.com` mixed across pages | T3 | KVKK + Fiyatlandirma + Footer |

**Time:** ~2-4 hours, one PR. **Cost of not doing:** TKHK Madde 61 (misleading advertising), defamation risk from claimed partners, KVKK trust hit, takedown risk from named-person testimonials. All 9 agents flagged this category as the single biggest credibility hole.

---

## P1 — Foundation (next 2 weeks)

### Brand + legal protection

| # | Action | Owner | Cost |
|---|--------|-------|------|
| 12 | **File TÜRKPATENT for "OllamaTR" wordmark** in class 9 (software) + class 42 (services). Existential risk — Ollama Inc. could force rebrand otherwise. | S1, S3 | ~700 TL gov fee + ~2500 TL avukat = ~3.2K TL |
| 13 | **Open low-key dialog with Ollama Inc.** Request explicit license OR a "compatible-with" descriptive-use blessing. If denied, plan rebrand to **"Bora AI"** or **"Yapı"** (S3 candidates). | S1, S3 | Free, ~1 day of writing |
| 14 | **Buy domains** — `ollamatr.com.tr` (~150 TL/yr, NIC.TR), `ollamatr.com` (~$13/yr), `ollamatr.dev` (~$13/yr), `bora.ai` if available. Total ~1.5K TL/yr. | G3 | ~1500 TL |
| 15 | **Claim social handles** — `@ollamatr` on GitHub (currently unclaimed), X, Bluesky, YouTube, LinkedIn, Reddit `r/ollamatr`. Free, hours. | G2 | Free |
| 16 | **Set up real email infra** — Zoho Mail Free Plan on `ollamatr.com.tr` for `iletisim@`, `privacy@`, `support@`. Configure MX + SPF + DKIM + DMARC. | G3, T3 | Free Zoho tier |

### Repo hygiene

| # | Action | Owner |
|---|--------|-------|
| 17 | Write root `README.md` with hero + install + screenshots + contributor link (replace Vite boilerplate at `app/README.md`) | G2 |
| 18 | Add `LICENSE` (MIT) at repo root — currently claimed in footer but file doesn't exist | G2 |
| 19 | Add `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md` (Contributor Covenant), `SECURITY.md`, `.github/ISSUE_TEMPLATE/`, `.github/PULL_REQUEST_TEMPLATE.md`, `.github/FUNDING.yml` | G2 |
| 20 | Add `.github/workflows/ci.yml` — lint + typecheck + build on PR | T1 |
| 21 | Label 10-20 "good first issue" / "help wanted" for community onboarding | G2 |
| 22 | Add `.nvmrc` + `engines` field in `package.json` (Node 20 LTS) | T1 |

### Security headers (1 commit)

| # | Action | Cost |
|---|--------|------|
| 23 | Add `vercel.json` `headers` block: CSP, X-Frame-Options=DENY, X-Content-Type-Options=nosniff, Referrer-Policy=strict-origin-when-cross-origin, Permissions-Policy, COOP/CORP. Bumps securityheaders.com from F to A. | 30 min |
| 24 | Add SPA fallback rewrite in `vercel.json` — `/(.*) → /index.html` so direct-nav routes don't 404 | 5 min |
| 25 | Gate `vite-plugin-inspect-react-code` to dev only in `vite.config.ts:9` — currently risks shipping inspector attrs to prod | 5 min |
| 26 | Bundle: extract GSAP to its own manual chunk (HangiModel-only dependency) — 25-35KB gz win on Home/Modeller/Fiyatlandirma | 1 hour |

---

## P2 — Real product (90-day single thread)

**S2's pick, echoed by S1 and G1: ship the Tauri installer to v0.2 in 90 days. Nothing else.**

Currently `installer/` is a Vite mock with one Home.tsx, no Rust, no Tauri config. Every CTA on the marketing site that says "İndir" currently funnels to Ollama's upstream install instructions — which is **both a measurement leak and a trust leak**. The installer is also the only feature where "Türkçe-first" creates defensible product surface (KVKK consent flow baked in, TR error messages, RAM-aware TR model recommendations).

### 90-day plan

| Week | Anchor | Output |
|------|--------|--------|
| 1-2 | Tauri 2 scaffold | Rust backend boots, IPC tested, React frontend wired |
| 3-4 | System probe | OS / RAM / disk / GPU VRAM autodetect Turkish-localized error messages |
| 5-6 | Model download flow | Pulls from Ollama registry, progress UI, resume support, KVKK consent gate |
| 7-8 | First-run wizard | Reuses HangiModel logic in Tauri context, picks 1-3 starter models |
| 9-10 | Open WebUI launcher | Auto-installs + configures Open WebUI on `localhost:3000`, opens browser |
| 11-12 | Signing + release | macOS notarization ($99/yr Apple Developer), Windows code-signing (or accept SmartScreen warning v0.1), GitHub Releases auto-update channel |

**v0.2 acceptance criteria:** Windows 10+, macOS 12+, Ubuntu 20.04+ installers ship from GitHub Releases. 50+ real downloads in 30 days post-launch.

### Anti-roadmap (don't build in 90 days)

- Mobile native apps
- OllamaTR Cloud (needs company)
- Fine-Tune Lab (compute partner gated)
- Enterprise dashboard
- Marketplace for models (don't compete with HF)

---

## P3 — Differentiation (sharpen over 60 days)

S3's three brand actions (all parallel, all under 4 weeks):

### 1. Real logo
Commission a wordmark with a **lale (tulip) crossed with a `>` prompt symbol**. Replace the text-only "Ollama" + "TR" badge — the badge is currently the ONLY Türkçe signal in the entire visual system.

### 2. **Bora the mascot**
Bora-7B is already in your model catalog. Promote the name to the brand level:
- **Bora** = the installer mascot (warm, KOBİ-friendly face)
- **Bora Yükleyici** = the installer's branded name
- **Anadolu Bulut** = the future cloud product
- **Fırın** = the future fine-tune lab (culturally resonant kelime — kiln, oven, bake)
- Bora becomes the Discord avatar, README badge, GitHub social card

### 3. Tagline lock + hero re-mood
- **Tagline:** **"Yapay zeka, Türkçe konuşsun."** (used everywhere — footer, README, social bios, GitHub repo description)
- **Hero canvas:** Replace the generic red data-stream with **kilim-warp** or **ebru-dispersion** motion. Same kinetic energy, instantly Turkish. Use Turkish folk-art palettes (turkuaz, kırmızı, antika).

### Killer differentiation claim (S3)
> *OllamaTR is the only AI stack that speaks Türkçe natively, runs on the user's own laptop, AND is legally accountable to a named Turkish individual under KVKK — a trio that LM Studio, Jan, Open WebUI, Trendyol-LLM, and ChatGPT/Claude each fail on at least one axis.*

The "named bireysel operatör" line — currently a TODO placeholder — is your moat once you put your real name behind it.

---

## P4 — Growth playbook (S1, 90-day Türkçe distribution)

### Channel ROI ranking for OllamaTR's stage (S1's picks)

| Rank | Channel | Why it fits NOW |
|------|---------|-----------------|
| 1 | **Türkçe SEO content engine** | Lowest cost, highest compound. Five anchor keywords: "ollama türkçe", "lokal LLM", "KVKK yapay zeka", "ücretsiz Türkçe yapay zeka", "ChatGPT alternatifi Türkçe". |
| 2 | **3 üniversite AI kulübü workshop serisi** | İTÜ AI / Boğaziçi NLP / ODTÜ AI — one monthly session. ~30-50 students per event = high-leverage early adopters + word of mouth. |
| 3 | **GitHub trending push + Hacker News submission** | Time the launch (after P0+P1+P2 land). One shot per release. |
| 4 | **One marquee partnership stamp** | Trendyol AI Lab (their model is already in your catalog — co-author the model card) OR Hugging Face TR chapter (Merve Noyan). 10x credibility boost. |
| 5 | **TR podcasts + dev YouTube** | Geek Lounge, Software Talks TR, MAYA, Erkan Erol, Pat-Pat AI — guest appearances. |
| 6 | **TÜBİTAK 1512 BIGG grant** | Requires şirket — but the founder profile + pitch deck is buildable now. ~150K TL non-dilutive funding for a Türkçe AI startup is realistic. |

### 4-phase household-name path (S3)

| Phase | Window | Brand action | Distribution action | Product action |
|-------|--------|--------------|---------------------|----------------|
| 1: Hobby that LOOKS pro | months 0-3 | Logo + Bora + tagline | 3 üni workshops | Tauri installer v0.2 |
| 2: Tools devs choose first | months 3-6 | Blog cadence (1/wk) | HN + ProductHunt timed launch | Per-model pages + benchmarks |
| 3: Name KOBİ owners ask about | months 6-12 | 1st case study published | TÜBİTAK BIGG funded | KOBİ vertical pages (e-Fatura, hukuk, sağlık) |
| 4: "Turkish AI = OllamaTR" | months 12-24 | TV/podcast hits | 10+ universities + 3 conferences | OllamaTR Cloud + Pro tier (post-Ltd. Şti.) |

---

## P5 — Vertical TR moat (G3's untapped pillars)

These are TR-specific verticals nobody is serving well. Each is a landing page + a starter recipe + a model recommendation — modular content that compounds for SEO and serves real KOBİ pain:

| Vertical | Hook | Why it wins in TR |
|----------|------|-------------------|
| **e-Fatura analizi** | Drop a PDF → JSON + KDV özeti | Logo / Mikro / Paraşüt / Foriba integration. KOBİ pain. |
| **Hukuk** | Resmi Gazete arama + sözleşme tarama | Trendyol-LLM + ITU initiatives already in market — partner or differentiate. |
| **Sağlık (KVKK Madde 6)** | Doktor notu transkripsiyon + reçete OCR | Hassas veri = yerel çalışma KRİTİK satış argümanı. Highest-paying vertical. |
| **e-ticaret** | Ürün açıklama + müşteri yorumu sentiment | Trendyol / Hepsiburada SKU asistanı. Massive Turkish SMB tail. |
| **e-Devlet sade dil** | Dilekçe yazımı + e-Devlet açıklama özetleme | Universal vatandaş pain. PR-friendly. |

Each vertical = 1 landing page + 1 prompt template + 1 GitHub repo with starter code. ~1 vertical per month after installer ships.

---

## The 7 truths the audit converged on

1. **The product doesn't exist yet.** The site sells a future. (G1, S1, S2, T1)
2. **The fabrications are a legal and brand liability.** Delete fast. (G2, G3, T1, T2, V1)
3. **The trademark situation is existential.** File TÜRKPATENT this week. (S1, S3)
4. **The Tauri installer is the single bottleneck.** All other roadmap items downstream of it. (S2, G1, S1)
5. **The Türkçe wedge is real and uncontested.** "KVKK + Türkçe + yerel + bireysel operatör" is a moat nobody else has. (S3, G3, Legal-1)
6. **Brand visual identity is too generic.** Need logo, mascot (Bora), tagline ("Yapay zeka, Türkçe konuşsun."), Turkish-cultural hero motif. (S3)
7. **Distribution = Türkçe SEO + üniversiteler + 1 marquee partnership stamp.** Not Twitter shouting. (S1, G2)

---

## The 30-day action sprint

Concrete to-do list, in order. Each item is one PR or one external task.

```
WEEK 1 — Stop the bleeding (P0 #1-11)
[ ] Delete fake team / partners / stats / testimonials / events
[ ] Fix Home CTA banner (remove Pro reference)
[ ] Fix Indir.tsx download CTAs (link to real GH release OR show "coming soon" honestly)
[ ] Fix all broken hrefs (Discord / Telegram / Patreon)
[ ] Replace [Operatör İsim Soyisim] with real name
[ ] Unify email domain to @ollamatr.com.tr (after domain purchase)

WEEK 2 — Foundation (P1 #12-26)
[ ] Buy ollamatr.com.tr + .com + .dev (NIC.TR + Cloudflare)
[ ] Claim social handles (GitHub, X, Bluesky, YouTube, LinkedIn)
[ ] Set up Zoho Mail + DNS records
[ ] File TÜRKPATENT for "OllamaTR" wordmark
[ ] Email Ollama Inc. (legal@ollama.com) re: descriptive use
[ ] Add LICENSE, README, CONTRIBUTING, CoC, SECURITY, .github/ scaffolding
[ ] Add vercel.json headers block + SPA rewrite
[ ] Gate vite-plugin-inspect-react-code to dev only
[ ] Bundle: GSAP manual chunk

WEEK 3 — Brand sharpening (P3)
[ ] Commission logo (Fiverr / Dribbble — budget ~5K TL for 3 rounds)
[ ] Sketch Bora mascot (could be illustrated by same designer)
[ ] Lock tagline "Yapay zeka, Türkçe konuşsun." everywhere
[ ] Replace data-stream hero with kilim/ebru motif (CSS-only proof of concept, can ship even before logo)

WEEK 4 — Tauri installer kickoff (P2 week 1-2)
[ ] cd installer && cargo init src-tauri/
[ ] Wire React frontend (already exists) to Rust backend via IPC
[ ] First runnable Windows .exe / macOS .dmg / Linux AppImage
[ ] Push to GitHub Releases as v0.0.1-alpha (private until v0.2 polished)
```

---

## What you'll know once these 30 days land

- A site that doesn't lie about what it is
- A legal moat (TÜRKPATENT) around the name
- A real downloadable thing (alpha installer)
- A brand identity that's instantly Turkish, not generic
- Repo hygiene that lets the first real contributor onboard in 10 minutes
- Security headers that pass any auditor's checklist

That's the launchpad. Then the 60-day push (P2 install polish + P3 vertical landing pages + P4 üniversite tour) starts the actual growth flywheel.

---

## Reading order if you only have 20 minutes

1. **This document** (10 min)
2. `super-roadmap.md` — the 90-day single-thread argument (5 min)
3. `super-brand-identity.md` — the Bora + tagline pitch (5 min)

If you have 60 minutes more, read in order: `super-growth-gtm.md`, `gap-product.md`, `gap-community.md`, `gap-turkish-market.md`, `audit-depth-content.md`, `audit-depth-code.md`, `audit-depth-security.md`.

---

*Generated by the 9-agent household-name audit panel.*
