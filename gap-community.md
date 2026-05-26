# OllamaTR — Community + Distribution Gap Hunt
**Agent:** G2
**Date:** 2026-05-26

OllamaTR markets itself as a "10.000+ geliştirici" topluluk projesi but has zero of the GitHub plumbing, owned social handles, real community surfaces, or referrable contributors that a credible Turkish OSS community needs. Every community link in the codebase points to URLs (`github.com/ollamatr`, `patreon.com/ollamatr`, `iletisim@ollamatr.dev`) that don't correspond to the actual repo (`github.com/eruo005-dev/ollamatr-app`) and are almost certainly unclaimed. The Topluluk and Hakkimizda pages are placeholder fiction. Below is the gap map and a sequenced fix list.

## Top 10 community gaps (ranked)
| # | Gap | Effort | Impact |
|---|-----|--------|--------|
| 1 | Repo handle mismatch: footer/donate/docs all link to `github.com/ollamatr` but real repo is `github.com/eruo005-dev/ollamatr-app` — every "GitHub" button is broken | S | Critical |
| 2 | No root README.md, LICENSE, CONTRIBUTING.md, CODE_OF_CONDUCT.md, SECURITY.md, .github/ — footer claims MIT license but no LICENSE file exists | M | Critical |
| 3 | Fake team (Ali Yılmaz "CEO", Deniz Kaya "CTO", ex-Trendyol/Getir/Peak claims) in `Hakkimizda.tsx` contradicts Community Edition pivot ("tüzel kişilik yok") and risks defamation/false-affiliation claims | S | Critical |
| 4 | Fake partners (KOSGEB, TÜBİTAK, Teknopark İstanbul, İTÜ ARI Teknokent) listed in `Hakkimizda.tsx` — using state-institution names without authorization is a takedown/legal risk | S | Critical |
| 5 | Fabricated metrics ("5.234 üye Discord", "1.876 Telegram", "234 contributor", "10.000+ geliştirici") with no real platforms behind them — destroys trust the moment a visitor clicks "Katıl" and lands on `/topluluk` again | S | Critical |
| 6 | No actual Discord/Telegram invite URLs (`discord.gg/...`, `t.me/...`) — `platforms` array in `Topluluk.tsx` has no `href` field at all | S | High |
| 7 | Fake events (Mart/Nisan 2025 dates are already 14 months in the past as of 2026-05-26) — stale Topluluk page signals abandoned project | S | High |
| 8 | Fake contributor wall (Ayşe K., Mehmet T., Deniz Y. — no GitHub handles, no avatars, no commit counts pulled from real `git log`) | M | High |
| 9 | No GitHub Sponsors / Patreon accounts actually claimed at `ollamatr` handle — Fiyatlandirma "Destekle" CTA goes to 404 | S | High |
| 10 | Zero discoverability footprint: not listed on awesome-llm, awesome-turkish-nlp, awesome-ollama; no HN/Reddit/LocalLLaMA post; no Wikipedia entry; default Vite README is the only README in the repo | M | High |

## By dimension

### GitHub repo hygiene
Evidence: `ls` of repo root shows only `app/`, `installer/`, `installer-site/`, audit `.md` files, and `vercel.json`. No `README.md`, `LICENSE`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`, `.github/` at root. The only README is `app/README.md` which is the **unmodified Vite + React + TypeScript boilerplate** — line 2: "This template provides a minimal setup to get React working in Vite". This is the single most damaging signal a developer sees when they land on the GitHub repo.

Missing:
- Root `README.md` with: 60-second pitch, screenshot/GIF, "Niye OllamaTR?", quickstart (3 commands), "Hangi modeli seçmeliyim?" link, contributor call-to-action, badge row (build, license, discord, stars).
- `LICENSE` file (footer claims MIT, repo has none — opens license-violation risk).
- `CONTRIBUTING.md` with dev setup, code style, PR checklist, "Türkçe katkı kabul edilir" note.
- `CODE_OF_CONDUCT.md` (Contributor Covenant 2.1 TR + EN).
- `SECURITY.md` with a real disclosure email (cannot be the unclaimed `iletisim@ollamatr.dev`).
- `.github/ISSUE_TEMPLATE/`: `bug_report.md`, `feature_request.md`, `model_request.md` (Türkçe model ekle), `documentation.md`.
- `.github/PULL_REQUEST_TEMPLATE.md`.
- `.github/FUNDING.yml` pointing to a verified Sponsors/Patreon handle.
- `.github/workflows/`: `ci.yml` (typecheck, lint, build), `deploy.yml` (already implicit via Vercel but no GH Action), maybe `lighthouse-ci.yml`.
- Labels: `good first issue`, `help wanted`, `documentation`, `türkçe-çeviri`, `model-ekleme`, `kvkk`.
- Repo About section: description, website `https://ollamatr-app.vercel.app`, topics: `turkish`, `ollama`, `llm`, `local-ai`, `kvkk`, `tr`, `yapay-zeka`.
- Social preview card (1280×640) — currently default GitHub avatar.

### Community surfaces
Evidence: `Topluluk.tsx` lines 35-72 list Discord/Telegram/GitHub/Forum with no `href` properties. Footer Discord/Telegram links route to `/topluluk` (internal page), not external invites.

Missing: real Discord server with categorized channels (`#duyurular`, `#yardım`, `#model-tartışma`, `#fine-tune`, `#kvkk-soru`, `#showcase`, `#katkı`); real Telegram (`t.me/ollamatr_tr` or similar — verify availability); GitHub Discussions enabled (Q&A, Show & Tell, Ideas, Türkçe Modeller, Donanım categories). The `btt.community` forum reference in Topluluk line 67 looks invented. Office hours / aylık topluluk çağrısı yok.

### Content engine
No blog, no newsletter, no YouTube channel, no podcast. There is a `/dokumantasyon` page in the app but no developer-facing docs site (`docs.ollamatr.dev`). No appearance/CFP track for Devnot, Devs Türkiye, Yapay Zeka Zirvesi, Kodluyoruz, BTK Akademi. The "Türkçe NLP Hackathon" listed in `Topluluk.tsx` line 163 (5-6 Nisan 2025) is fictional and past.

### Social presence
No `@ollamatr` X/Bluesky/LinkedIn handles referenced anywhere in code (Grep on those domains returns zero). No Reddit posting strategy. No mention in TR tech newsletters. The X-handle availability needs to be checked and claimed immediately — squatter risk grows daily.

### Influencer & developer outreach
No outreach kit, no press page, no `partnerships@` route. Hakkimizda.tsx lists KOSGEB/TÜBİTAK/Teknopark/İTÜ/BİLGİ/Türkiye YZI as "partners" — none of these are real (and listing state institutions falsely is a SMK/defamation hazard). No founder DMs/intros logged to Trendyol AI, Hepsiburada AI, Peak, Getir, n11data, Eren Gölge (TTS), Erkan Erol, ITU AI Club, ODTÜ AI, Boğaziçi AI, Bilkent AI.

### Contributor experience
No issues exist on the repo (it's a solo dev's monorepo). No "good first issue" backlog. No Hacktoberfest registration. The Topluluk page promises a contributor wall (lines 84-111) but uses fabricated names with no GitHub linkage. The Fiyatlandirma "TEŞEKKÜRLER" promise (mentioned in pricing) has no corresponding `/tesekkurler` page in routes. No `all-contributors` bot config. No translation contribution path.

### Hackathons & events
All three events on Topluluk.tsx (lines 141-172) are fictional and dated 2025 — already in the past. No actual BTK Akademi, Teknofest, Türkçe AI Hackathon, KOSGEB Girişimcilik event. No sponsor pipeline.

### Discoverability
Not listed on: `awesome-llm`, `awesome-ollama`, `awesome-turkish-nlp`, `awesome-selfhosted`, `awesome-local-ai`. No Wikipedia entry (TR or EN). No ProductHunt launch. No HN "Show HN: Turkish-tuned Ollama wrapper" submission. No DEV.to / Medium org page. No `r/LocalLLaMA` thread referencing the project. No backlinks from Türkçe NLP blogs or `dev.tr`.

## Top 5 actions in first 30 days
1. **Claim handles, fix the link graph.** Register `@ollamatr` on GitHub (org or rename repo), X, Bluesky, LinkedIn, Discord (vanity), Telegram, Patreon, GitHub Sponsors, `ollamatr.dev` mailbox (or switch all references to a domain you actually own). Then `Find → Replace` `github.com/ollamatr` to the real org/repo across `Footer.tsx`, `Dokumantasyon.tsx`, `Indir.tsx`, `Fiyatlandirma.tsx`, `KVKK.tsx`. This is a 1-hour fix that unbreaks 8 dead CTAs.
2. **Write a real root `README.md`** with screenshot, 3-line pitch, quickstart, link to live site, badge row, "Katkıda Bulun" section, license callout. Replace the Vite boilerplate in `app/README.md` too.
3. **Drop the fiction.** Delete fake team (Hakkimizda.tsx lines 23-48), fake partners (lines 59-66), fake metrics in Topluluk hero ("10.000+", "5.234 üye"), fake events (lines 141-172), fake contributor wall (lines 84-111), fake forum highlights. Replace with honest "Yeni başlıyoruz — ilk katkıyı sen yap" empty states. Continuing to ship fabricated KOSGEB/TÜBİTAK partnerships is a legal liability that dwarfs every UX gap on this list.
4. **Add the six governance files** at repo root: `LICENSE` (MIT), `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md` (Contributor Covenant TR), `SECURITY.md`, `.github/ISSUE_TEMPLATE/{bug,feature,model_request}.yml`, `.github/PULL_REQUEST_TEMPLATE.md`, `.github/FUNDING.yml`.
5. **Open GitHub Discussions + seed 15 "good first issue" tickets** (add model card, translate doc page, write KVKK FAQ entry, add screenshot of install on Mac M2, etc.). Without a backlog, the "Sen de katkıda bulun!" button on Topluluk has nowhere to send people.

## Top 5 actions in first 90 days
1. **Launch on r/LocalLLaMA, HN, dev.to, ProductHunt** with a "Show: Turkish-localized Ollama installer with KVKK-aware model picker" post. Coordinate with 1 Türkçe AI influencer (Eren Gölge / Trendyol AI / ITU AI Club) for amplification on the same day.
2. **Get listed** on `awesome-ollama`, `awesome-llm`, `awesome-turkish-nlp` via PR. Create stub Wikipedia entry under "Türkçe yapay zeka araçları" with refs.
3. **Spin up real Discord** with channel structure above, post weekly "model haftası" deep-dive (Trendyol-LLM, Cosmos-1, Turkcell-LLM, Kanarya, etc.), invite 3 Türkçe NLP researchers as mods, run first monthly community call on Twitch/YouTube.
4. **First real hackathon partnership**: co-sponsor with BTK Akademi, Kodluyoruz, or an ITU/ODTÜ/Boğaziçi AI club. Even a 30-person workshop generates more legitimate community proof than the entire current Topluluk page.
5. **Newsletter (Buttondown or Substack)** — monthly Türkçe AI bülteni: new models, fine-tune ipuçları, KVKK rehberi, contributor spotlight. Cross-post to dev.to TR tag for discoverability.

## Where Turkish OSS projects went viral — lessons
- **Trendyol-LLM**: shipped concrete benchmarks (TR-MMLU, Belebele-TR) on HuggingFace with weights + paper + GGUF quants on day one. Lesson: ship downloadable artifacts with measurable Türkçe metrics, not marketing pages.
- **ML Türkiye / Türkiye AI**: Telegram-first community (~30k members) built by one curator posting daily English-paper TR-translation threads. Lesson: a single human posting consistently in TR beats a fancy "topluluk hub" page with zero pulse.
- **Kodluyoruz**: scaled by becoming the host of *other* people's events (BTK Akademi, university clubs, corporate AI bootcamps). Lesson: be the venue, not the speaker — co-brand on existing TR developer education traffic.
- **dev.tr / Devnot**: grew through Türkçe-only technical writing with strong SEO on "X nasıl yapılır" queries. Lesson: own `ollama türkçe kurulum`, `yerel llm türkçe`, `kvkk uyumlu yapay zeka` SERPs with real long-form Türkçe docs before paid distribution.
- **Eren Gölge / Coqui TTS**: stayed credible by being one named maintainer with a clear GitHub profile + Twitter, not a fake "company". Lesson: a single named operator with a real face beats a fictional 4-person C-suite.

**Evidence files cited:** `app/src/pages/Topluluk.tsx:35-210`, `app/src/pages/Hakkimizda.tsx:23-66`, `app/src/components/Footer.tsx:23-28,99-124,193-200`, `app/src/pages/Fiyatlandirma.tsx:78-79,550`, `app/src/pages/Indir.tsx:346,588`, `app/src/pages/KVKK.tsx:521-526`, `app/src/pages/Dokumantasyon.tsx:329`, repo root `ls` (no README/LICENSE/CONTRIBUTING/.github), `app/README.md` (default Vite template), `git remote -v` → `eruo005-dev/ollamatr-app`.
