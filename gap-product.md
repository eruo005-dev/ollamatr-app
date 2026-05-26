# OllamaTR — Product Gap Hunt
**Agent:** G1
**Date:** 2026-05-26
**Compared against:** LM Studio, Open WebUI, Pinokio, Jan.ai, Continue.dev, Hugging Face, Ollama Hub

> Scope: read-only audit of `app/src/pages/*.tsx`, `app/src/lib/models-data.ts`, `installer/`, `plan.md`, `plan-phase2.md`.
> Verdict: OllamaTR is a **marketing-grade landing site** (10 routes, animated, Türkçe). It is **not yet a product**. There is no installer binary, no dashboard, no per-model page, no actual download — all CTAs link to a non-existent `github.com/ollamatr/installer/releases/latest` (`Indir.tsx:345`, `:588`). The wedge (Türkçe) is real, but every competitor (LM Studio, Jan, Pinokio) ships a working desktop binary on day one.

---

## Top 10 product gaps (ranked by impact × ease)

| # | Gap | Why it matters | Effort | Impact |
|---|-----|----------------|--------|--------|
| 1 | **No installer binary** — `Indir.tsx:345-350` opens a 404 GitHub release URL; `installer/` is a Vite mock with no Rust/Tauri code | Core promise of the brand ("Tauri tabanlı installer") is undelivered. LM Studio/Jan have native binaries. | L | high |
| 2 | **No per-model detail pages** — only modal popup (`Modeller.tsx:233-484`); no `/modeller/llama-3-turkish-8b` route in `App.tsx:31-52` | No SEO, no shareable links, no benchmarks/sample-prompts/quant pickers. HF Hub & Ollama Hub both have per-model pages. | M | high |
| 3 | **Catalog has 12 models, not 100+** (`models-data.ts:59`+) but copy claims "100+" on Home `Home.tsx:272`, `Indir.tsx:125`, HangiModel `HangiModel.tsx:1377` | Trust break on first click of `/modeller`. False advertising risk under TKHK Madde 61 (already flagged in legal audits). | S | high |
| 4 | **Fake social proof** — hardcoded "10.000+ İndirme / 5.000+ Aktif Kullanıcı / 50+ Kurumsal Entegrasyon" (`Home.tsx:449-454`), invented testimonials (`Home.tsx:456-475`), fake contributor names (`Topluluk.tsx:84-100`) | Same TKHK exposure as #3; real OSS projects show GitHub stars/npm counts. | S | high |
| 5 | **No dashboard** — `plan.md:13` lists "Dashboard — User portal for downloads, model management, usage stats" but no route exists | Returning-user value = 0. LM Studio/Jan have full chat+model-manager UIs. | L | high |
| 6 | **No quantization picker / variant chooser** — model card shows one ramGB number, no Q4_K_M vs Q8_0 vs Q5_K_M (`models-data.ts:24-40` schema lacks `quantizations` field) | Ollama's whole value-add is multi-quant. Without this OllamaTR is strictly less useful than `ollama pull llama3:8b-instruct-q4_K_M`. | M | high |
| 7 | **No real benchmarks** — `popularity` and `rating` are arbitrary integers (`models-data.ts:71-73`), no Türkçe-LLM evals (MMLU-TR, TruthfulQA-TR, Belebele-TR) | The only defensible Türkçe wedge is Türkçe benchmarks. Without them, "Türkçe-optimize" is a tag, not a claim. | M | high |
| 8 | **Wizard ignores hardware reality** — `HangiModel.tsx` asks user to read RAM from Task Manager (`:870-872`, `:923-926`); no GPU/VRAM detection, no quant suggestion based on detected hardware | LM Studio auto-detects GPU/RAM. Asking the user is a 2018-era UX. | M | med |
| 9 | **No prompt library / template gallery** — nothing for Türkçe-specific use cases (fatura analizi, hukuk özetleme, e-ticaret asistanı, müşteri hizmetleri) | This is the highest-leverage Türkçe wedge that competitors *cannot* easily clone. Currently zero coverage. | M | high |
| 10 | **Indir page is a mock** — checksum is `CHECKSUM_PLACEHOLDER` (`Indir.tsx:138-139`), installer-preview is a fallback rectangle (`Indir.tsx:230-261`), version "v1.2.0" is hardcoded (`Indir.tsx:358`) | Visitors who click "İndir" hit a 404. Bounce rate ≈ 100% on the only conversion page. | S | high |

---

## By category

### Catalog UX
- No dedicated `/modeller/:slug` route; only modal (`Modeller.tsx:233`).
- No "similar models" recommendations — algorithm in `HangiModel.tsx:209-282` exists but isn't exposed on cards.
- No comparison sidebar (pick 2-3 models, compare side-by-side).
- No embed widget (`<iframe>` of a model card for blogs/docs).
- No versioning — `releasedAt` exists but no `v1.0` / `v1.1` history.
- No download-progress UI / no resume support (because no real download).
- No quantization picker — schema (`models-data.ts:24-40`) has no `quantizations[]`.
- No "RAM-optimized variant" suggestions (e.g. "your 8GB → try Q4_K_M of this 13B").
- No sample prompts per model (Ollama Hub shows these).

### Discovery & search
- Search is substring-only over name/desc/tags (`Modeller.tsx:68-78`); no semantic search.
- No leaderboards (per-domain Türkçe winners).
- No trending / "recently updated" / "most downloaded this week" feed.
- No Türkçe-LLM eval tables (TruthfulQA-TR, MMLU-TR, BoolQ-TR, BELEBELE-TR).
- "Popularity" is a static integer (`models-data.ts:71`), not real telemetry.

### Install flow
- **No Tauri installer** — `installer/` directory has no `tauri.conf.json`, no `Cargo.toml`, no `src-tauri/`. Just a Vite project with `App.css`, `App.tsx`, components folder. `plan-phase2.md:19-37` explicitly admits "Rust/cargo is unavailable in sandbox".
- No one-line shell installer (`curl ... | sh`).
- No winget / brew / apt / chocolatey package.
- No Docker compose file in repo root.
- No devcontainer.json.
- No K8s manifest / Helm chart.

### Wizard depth
- Only 4 functional questions + 1 result screen (`HangiModel.tsx:790-1140`).
- No GPU/VRAM auto-probe — user types RAM manually.
- No "try in browser" via WebLLM / transformers.js for tiny demos.
- No A/B mode (run prompt against 2 models, vote).
- No dataset-driven recs (upload your prompts, suggest model).

### Tooling
- No prompt library / template gallery (Türkçe verticals untouched).
- No RAG starter kit.
- No fine-tune lab UI — `plan.md:18` lists it as Phase 2 but nothing exists.
- No eval harness (run MMLU-TR locally).
- No agent recipes (LangChain/CrewAI/Continue templates).
- API page mentions "OpenAI uyumlu API" (`Dokumantasyon.tsx:36-40`) but no actual reference docs route.

### Dashboard
- **Entirely missing.** No `/dashboard`, `/app`, `/portal` in `App.tsx:31-52`.
- No installed-models view.
- No usage stats / token counters.
- No model-update feed.
- No config backup/restore.
- No auth (and CE has no users to auth, but local-only profile would still help).

### Onboarding
- No first-run tutorial — Indir.tsx steps (`:74-93`) are aspirational ("İndirin, Kurun, Sohbet Edin") but no working app to tour.
- No embedded interactive walkthrough.
- No "your first prompt" guided flow.
- No video tutorials referenced (Dokümantasyon mentions but doesn't link).

### Integrations
- **Zero integrations shipped.**
- No VS Code extension.
- No Cursor / Windsurf rule files.
- No Continue.dev `config.json` snippet.
- No n8n custom node.
- No Slack / Discord bot template.
- No Make.com / Zapier connector.
- No Raycast extension.
- No Obsidian plugin.

### Trust signals
- Stats are hardcoded fiction (`Home.tsx:449-454`).
- Testimonials are invented (`Home.tsx:456-475`).
- Contributors are invented (`Topluluk.tsx:84-100`).
- No GitHub stars badge live-pulled.
- No npm/PyPI install count.
- No real case studies / blog posts.
- No "see what others picked" social proof.
- No press logos (partner-logos.jpg is a generic placeholder image).
- No security audit report linked.

### Mobile / offline
- Web app is mobile-responsive (verified across `Home.tsx`, `Modeller.tsx`), but the runtime is desktop-only.
- No iOS/Android client — even a thin chat UI hitting a remote Ollama server would unlock a huge demographic.
- No "scan QR to connect phone to your local Ollama" flow (Jan.ai has experimented here).
- No PWA manifest (`app/public/` has no `manifest.json`).

### Localization
- All UI Türkçe (verified). Strong wedge.
- No Kürtçe (Kurmanji/Sorani) UI — meaningful for SE Türkiye + diaspora.
- No Azerice — natural extension, ~10M speakers, near-identical grammar.
- No Arapça — Türkiye has ~4M Arabic speakers + diaspora reach.
- Translation tooling itself (a `i18n.json`-driven approach) is absent — copy is hard-coded throughout `.tsx` files, making future localization a rewrite.

### APIs & SDKs
- No public API.
- No model-recommender as JSON endpoint (the algorithm exists in `HangiModel.tsx:177-286` but is client-only).
- No catalog API (`models-data.ts` is a TS file, not served as JSON).
- No badge generator (`![ollamatr-compatible](https://ollamatr.app/badge/llama-3-turkish-8b.svg)`).
- No embeddable model card widget.
- No OpenAPI spec for the imagined Ollama proxy.

---

## Top 5 actions if I had 30 days

1. **Ship a real installer (or kill the claim).** Either build a thin Tauri shell that wraps `ollama install` + Open WebUI on Win/Mac/Linux, OR replace `Indir.tsx` with an honest "Türkçe model rehberi + `ollama pull` komutları" page. The current 404 is the single biggest credibility leak.
2. **Per-model pages + real benchmarks.** Add `/modeller/:slug` route, populate with sample prompts, real download counts (scrape Ollama Hub API), and Türkçe MMLU/TruthfulQA scores. This is the Türkçe wedge made defensible.
3. **Türkçe prompt library.** 50 templates across `fatura analizi`, `hukuk özetleme`, `e-ticaret cevap`, `müşteri hizmetleri`, `KOBİ raporlama`. Each is a copy-pasteable prompt + recommended model + sample output. No competitor has this.
4. **Replace fake social proof with real data.** Live GitHub stars badge, real contributor list from `git log`, real download counts (or remove the numbers). Closes the TKHK Madde 61 exposure already noted in legal audits.
5. **Quantization picker + GPU detection.** Add `quantizations: {q4_K_M, q5_K_M, q8_0}` to the `Model` schema, expose in catalog. In `HangiModel`, use `navigator.gpu` / WebGPU adapter info + `navigator.deviceMemory` to auto-fill the RAM step instead of asking the user.

---

## What competitors do that OllamaTR doesn't

| Capability | LM Studio | Jan.ai | Open WebUI | Ollama Hub | Continue.dev | OllamaTR |
|---|---|---|---|---|---|---|
| Native desktop binary | ✅ | ✅ | n/a (web) | n/a | n/a | ❌ (404) |
| Per-model pages w/ samples | ✅ | ✅ | ✅ | ✅ | n/a | ❌ |
| Quantization picker | ✅ | ✅ | ✅ | ✅ | n/a | ❌ |
| Auto GPU/VRAM detect | ✅ | ✅ | partial | n/a | n/a | ❌ |
| Chat UI / dashboard | ✅ | ✅ | ✅ (core) | ❌ | ✅ (IDE) | ❌ |
| IDE integration | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| Prompt library | partial | ✅ | ✅ | ❌ | ✅ | ❌ |
| Public catalog API | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| Mobile companion | ❌ | beta | community | ❌ | ❌ | ❌ |
| Real download counts | ✅ | ✅ | n/a | ✅ | n/a | ❌ (fabricated) |
| Türkçe-first UI | ❌ | ❌ | partial | ❌ | ❌ | ✅ (wedge) |
| Türkçe LLM benchmarks | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ (opportunity) |
| Türkçe prompt vertical | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ (opportunity) |

**The white space:** Türkçe-first UI + Türkçe benchmarks + Türkçe prompt verticals + KVKK-compliant local stack. Nobody else competes here. But none of those three "Türkçe wedge" deliverables exist yet — only the UI shell does.
