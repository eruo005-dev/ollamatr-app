# OllamaTR Super-Roadmap (6 Months, Solo Operator)

**Document owner:** S2 (Product Roadmap Architect)
**Horizon:** Jun 2026 — Nov 2026 (Q1 / Q2 / Q3 from "now")
**Operator profile:** 1 person, nights/weekends, no company, no funding, Vercel + GitHub free tiers, full-stack web + comfortable Rust + modest backend.

---

## 1. State of build (today, 2026-05-26)

**Shipped (production, on Vercel):**
- Marketing site `app/` — 10 routes: Home, Modeller, HangiModel (wizard), Indir, Fiyatlandirma (now donate flow), Dokumantasyon, Hakkimizda, Topluluk, KVKK, CerezPolitikasi.
- 12-model catalog with RAM badges, KVKK tags.
- "Hangi Model Bana Uygun?" recommendation wizard (working interactive flow).
- KVKK compliance pages (legal pass complete: `verify-community-legal.md` clean).
- Community Edition stripped of paid tiers (commit `7e249e0`), donate flow via GitHub Sponsors + Patreon.
- Build green (`production-readiness-cert.md`, `verify-community-build.md`).
- Vercel deploy via root `vercel.json`.

**Partial:**
- `installer/` — Vite+React+shadcn shell, **single page (`Home.tsx`)**, no router beyond `/`, no Tauri config, no Rust, no Ollama integration. Currently a UI mockup only.
- `installer-site/` — static prebuilt assets folder, single `index.html`, **not a real site** (looks like a dump from an earlier swarm run).
- Documentation page exists but is shallow (install guide stubs).

**Vision-only (not started):**
- Tauri Rust backend, `tauri.conf.json`, `Cargo.toml`.
- Ollama process management / WebUI bundling.
- Dashboard, RAM monitor, auto-updater.
- RAG starter kit, eval harness, prompt library, fine-tune lab, API gateway, VS Code ext, CLI, mobile PWA, Discord bot, n8n nodes, SDK, Docker images, Cloud.
- Per-model detail pages (catalog lists models but no `/modeller/:slug` deep pages).

---

## 2. Constraints (binding)

- **Time:** ~10–15 focused hrs/week (nights + 1 weekend day). Buffer for life: assume 40 weeks of real output in 6 months, not 26.
- **Money:** $0 budget. Hard caps: Apple Developer ($99/yr) is the only allowable paid line and only when shipping macOS notarized builds. Code-signing cert for Windows ($200–400) is **deferred** — accept SmartScreen warning v0.1.
- **Legal:** No company → no commercial transactions, no enterprise contracts, donations only (already in place).
- **Infra:** Vercel free (100 GB-hr bandwidth/mo), GitHub free (Pages, Releases, Actions 2000 min/mo).
- **Compute:** Operator's own machine. No GPU server. Anything needing GPU fine-tune → partner or delay.
- **Skill ceiling:** Rust is workable but slow → keep Rust surface area small. TypeScript/React is fast → push logic into the frontend where safe.

---

## 3. Roadmap structure (3 seasons × 2 months)

| Season | Theme | Anchor deliverable |
|---|---|---|
| **Q1 (Jun–Jul)** | Make the desktop bundle real | `ollamatr-installer-v0.1.exe` on GitHub Releases |
| **Q2 (Aug–Sep)** | Open the kitchen | RAG starter kit + prompt library + CLI |
| **Q3 (Oct–Nov)** | Show real users using it | 3 case studies + VS Code ext + Docker images |

The seasons are sequenced so each unblocks the next: you can't write case studies without users; you can't get users without an installer that works.

---

## 4. Month-by-month plan

### Month 1 — June 2026 — "Tauri scaffold + System check works"
- **Anchor:** Tauri 2.x project initialized in `installer/`, Rust backend boots, React frontend renders inside Tauri window, calls one IPC command (`get_system_info`) that returns OS/RAM/disk.
- Supporting: (a) `Cargo.toml` + `tauri.conf.json` checked in. (b) GitHub Actions workflow that builds Win + macOS + Linux artifacts. (c) Wire `installer/src/App.tsx` to a 3-screen flow stub (Welcome → SystemCheck → ModelSelection).
- **Success metric:** A `.msi` and `.dmg` artifact downloads from a GitHub Actions run and launches on real hardware.

### Month 2 — July 2026 — "It actually installs Ollama"
- **Anchor:** Rust backend can detect/install Ollama (bundle or fetch), spawn `ollama serve`, run `ollama pull <model>`, stream progress to frontend.
- Supporting: (a) KVKK consent screen (mirror the website copy, single source of truth). (b) Model selection wired to the existing 12-model catalog JSON. (c) Tauri updater configured against GitHub Releases.
- **Success metric:** Fresh Windows VM → run installer → 10 minutes later, Ollama is running with one chosen model, accessible at `localhost:11434`.

### Month 3 — August 2026 — "First-run dashboard"
- **Anchor:** Post-install desktop shell: installed-models list, RAM gauge, "model has update" pings, one-click open of bundled Open WebUI.
- Supporting: (a) Auto-launch on login (opt-in). (b) Quantization picker in install flow (Q4_K_M / Q5_K_M / Q8_0 with size + quality blurb). (c) Hardware compatibility detector reads VRAM and recommends models in the wizard.
- **Success metric:** v0.2 released; 100 GitHub Releases downloads; ≥10 GitHub stars on the installer repo.

### Month 4 — September 2026 — "Türkçe RAG you can copy-paste"
- **Anchor:** `ollamatr-rag-starter/` repo — Türkçe doc embeddings (BGE-m3 or e5-multilingual) + retrieval + Ollama call, runs against the local installer. README in TR.
- Supporting: (a) Prompt library v1 — 30+ curated TR prompts by use case (hukuk, e-ticaret, içerik), Markdown frontmatter, searchable on the marketing site. (b) Per-model detail pages on `/modeller/:slug` with benchmarks + sample prompts + RAM math. (c) CLI v0.1: `ollamatr install <model>`, `ollamatr chat`.
- **Success metric:** RAG repo + prompt library combined get 50 GitHub stars; 3 inbound PRs from the community.

### Month 5 — October 2026 — "Plug into the dev's workflow"
- **Anchor:** VS Code extension — chat panel that talks to local Ollama via `localhost:11434`, with TR system prompt presets from the prompt library.
- Supporting: (a) Docker compose + minimal K8s manifest for self-hosted Ollama + WebUI. (b) Blog/CMS on the marketing site (MDX-based, no DB) — publish first 3 TR posts. (c) Eval harness v0.1 — run 5 simple TR benchmarks (TR-MMLU subset, summarization) against installed models, output CSV.
- **Success metric:** VS Code ext: 200 marketplace installs in 30 days; first blog post: 1k unique TR visitors.

### Month 6 — November 2026 — "Proof it works for real people"
- **Anchor:** 3 published case studies (one KOBİ, one freelancer, one student) with before/after screenshots, model choices, KVKK posture. Filmed walkthroughs (Loom OK).
- Supporting: (a) Discord bot template repo. (b) `@ollamatr/client` Node SDK v0.1 (thin wrapper over `/api/chat`). (c) Submit installer to **winget** + **scoop** (free, no signing requirement beyond what we have).
- **Success metric:** 1000 cumulative installer downloads; case studies attract one inbound press / podcast mention.

---

## 5. Prioritized feature backlog (impact × inverse-effort)

| # | Feature | Impact (1-5) | InvEffort (1-5) | Score | Tier |
|---|---|---|---|---|---|
| 1 | **Tauri installer** | 5 | 2 | **10** | NOW |
| 15 | Hardware compatibility detector | 4 | 4 | 16 | NOW (cheap, lives inside installer) |
| 16 | Quantization picker UI | 4 | 4 | 16 | NOW (inside installer) |
| 2 | Dashboard | 4 | 3 | 12 | NOW (extends installer) |
| 3 | Onboarding tutorial | 4 | 4 | 16 | NOW (inside installer) |
| 4 | Per-model detail pages | 4 | 4 | 16 | NEXT (SEO + trust) |
| 5 | RAG starter kit | 5 | 3 | 15 | NEXT |
| 7 | Prompt library | 4 | 5 | 20 | NEXT (highest ROI on the site) |
| 11 | CLI tool | 3 | 4 | 12 | NEXT |
| 10 | VS Code extension | 4 | 3 | 12 | LATER |
| 19 | Container images | 3 | 5 | 15 | LATER |
| 17 | Blog/CMS | 4 | 4 | 16 | LATER (compounding) |
| 6 | Eval harness | 3 | 3 | 9 | LATER |
| 13 | Discord bot template | 3 | 4 | 12 | LATER |
| 18 | SDK (`@ollamatr/client`) | 3 | 4 | 12 | LATER |
| 12 | Mobile PWA chat | 3 | 3 | 9 | DEFER |
| 14 | n8n / Make nodes | 3 | 3 | 9 | DEFER |
| 9 | API gateway | 4 | 2 | 8 | DEFER |
| 8 | Fine-tune lab UI | 5 | 1 | 5 | DEFER (needs compute partner) |
| 20 | OllamaTR Cloud | 5 | 1 | 5 | DEFER (needs company) |

---

## 6. Dependency graph

```
                    ┌─────────────────────┐
                    │ Marketing site (✓)  │
                    │ 12-model catalog (✓)│
                    └──────────┬──────────┘
                               │ feeds JSON
                               ▼
┌───────────────────────────────────────────────┐
│  [1] TAURI INSTALLER (Q1 anchor)              │
│  ├─ [15] HW detector                          │
│  ├─ [16] Quant picker                         │
│  ├─ [3]  Onboarding tutorial                  │
│  └─ [2]  Dashboard / RAM monitor              │
└──────┬──────────────────────┬─────────────────┘
       │ unblocks              │ unblocks
       ▼                       ▼
[11] CLI               [4] Per-model pages
       │                       │ + benchmarks
       │                       ▼
       │              [6] Eval harness
       │
       ▼
[5] RAG starter ────► [7] Prompt library
       │                       │
       ▼                       ▼
[10] VS Code ext       [17] Blog/CMS ──► Case studies
       │                       │
       ▼                       ▼
[18] SDK              [13] Discord bot, [14] n8n nodes
       │
       ▼
[19] Docker / K8s ──► [9] API gateway ──► [20] Cloud (company-gated)
                                          [8] Fine-tune lab (compute-gated)
                                          [12] Mobile PWA
```

The installer is the **single root dependency** for almost everything that builds trust. Without it, every other artifact is theory.

---

## 7. Build vs Partner vs Delay

| # | Feature | Decision | Why |
|---|---|---|---|
| 1 | Tauri installer | **BUILD** | Core moat. No one else does Türkçe-first. |
| 2 | Dashboard | **BUILD** | Lives inside installer; same codebase. |
| 3 | Onboarding tutorial | **BUILD** | Trivial in React. |
| 4 | Per-model detail pages | **BUILD** | Existing stack. |
| 5 | RAG starter kit | **BUILD** | Differentiator. Türkçe embeddings are the wedge. |
| 6 | Eval harness | **PARTNER** | Lean on `lm-evaluation-harness` + TR-MMLU. Don't reinvent. |
| 7 | Prompt library | **BUILD** | But seed from community PRs. |
| 8 | Fine-tune lab | **DELAY** | Until company + compute partner (Hugging Face Spaces? Modal? RunPod credits?). 12-month horizon. |
| 9 | API gateway | **DELAY** | No commercial intent yet. Revisit after Cloud decision. |
| 10 | VS Code ext | **BUILD** | One file + LSP-light. Great distribution channel. |
| 11 | CLI | **BUILD** | Rust binary you already have from Tauri. |
| 12 | Mobile PWA | **DELAY** | Q4 2026 earliest. Desktop-first audience. |
| 13 | Discord bot | **BUILD** (template only) | A repo, not a service. |
| 14 | n8n / Make nodes | **PARTNER** | Find a community contributor; offer to co-author. |
| 15 | HW detector | **BUILD** | Lives in installer. |
| 16 | Quant picker | **BUILD** | Lives in installer. |
| 17 | Blog/CMS | **BUILD** | MDX, no DB. Vercel handles it. |
| 18 | SDK | **BUILD** (thin) | Node first; Python later. |
| 19 | Containers | **BUILD** (thin) | Compose file + 1 Helm chart. |
| 20 | Cloud | **DELAY** | Hard-gated on incorporation + KVKK Veri Sorumlusu transfer. 2027. |

---

## 8. Tauri installer — concrete spec (the killer feature)

**Stack**
- Tauri 2.x (stable as of mid-2025), React 19 + TS frontend (reuse `installer/`), Rust 1.75+ backend.
- IPC commands (Rust → TS): `get_system_info`, `check_ollama`, `install_ollama`, `start_ollama`, `pull_model`, `list_models`, `delete_model`, `get_gpu_info`.
- Bundled binaries: ship Ollama as a Tauri "sidecar" on Win + Linux; on macOS prefer Homebrew detection then fall back to download. Open WebUI launched as second sidecar (Python embedded via `pyoxidizer` is too heavy → instead **link out** to a local Docker or pip path, document trade-off).

**Screens** (Tauri window, 900×640, dark/light)
1. **Welcome** — brand splash, version, "Yeni misin?" link to `/dokumantasyon`.
2. **System check** — OS, RAM (warn <8 GB), disk (warn <20 GB free), GPU + VRAM via `nvidia-smi` / `system_profiler` / `vulkaninfo`. Block install if RAM < 4 GB.
3. **KVKK consent** — copy mirrored from `/kvkk` page (single source of truth via shared JSON). Explicit checkbox. Stored in `~/.ollamatr/consent.json`.
4. **Model selection** — driven by `app/src/data/models.json` (extract from existing Modeller page into shared JSON). Filter by detected RAM. Quantization picker per model.
5. **Install progress** — real-time stdout from `ollama pull`, ETA, cancel button.
6. **First-run config** — port (default 11434), auto-start on login (opt-in), Open WebUI bookmark, notification on update.
7. **Main app shell** (post-install) — sidebar (Modeller, Sohbet, Ayarlar), models list, RAM gauge, "Open WebUI" button.

**Distribution**
- **GitHub Releases** — primary (free, no signing required, accept SmartScreen on Win).
- **winget** — submit manifest after v0.2 (free, MS-hosted, requires HTTPS download).
- **scoop** — own bucket repo `ollamatr/scoop-bucket`, frictionless for power users.
- **Homebrew tap** — `brew install ollamatr/tap/ollamatr` after v0.3 (need notarized .dmg → $99 Apple Dev account).
- **Auto-updater** — Tauri's built-in updater, signed with self-managed key, manifest hosted on GitHub Pages.

**Estimated build time (part-time)**
- Weeks 1–2: scaffold, IPC, system check, CI pipeline.
- Weeks 3–4: Ollama install + pull + progress, KVKK screen, model selection wired.
- Weeks 5–6: dashboard, updater, packaging for all 3 OS, first release tag `v0.1.0`.
- **Total: 4–6 weeks** for v0.1 matches expectation. v0.2 (dashboard polish + quant picker + HW detector) lands end of Month 3.

---

## 9. Anti-roadmap (explicit non-goals)

Not building in the next 6 months, and why:

- **Mobile native (iOS/Android)** — desktop is where local LLMs live; Ollama doesn't run on mobile. PWA hits remote endpoints, premature without an API gateway. Defer to 2027.
- **Enterprise dashboard / SSO / RBAC** — no company → no enterprise customers. Building admin features for nobody.
- **Fine-tune compute service** — single biggest infra cost (~$1.5/hr A100); will burn the whole budget in 3 days. Requires partner or paying customers first.
- **Marketplace for models** — Hugging Face owns this. We're a curator, not a host. Curating 12 → 50 models is the real win.
- **Paid SaaS billing / Stripe integration** — no company means no merchant of record, no KDV invoices. Donate-only is the right Community Edition posture (already done).
- **Multi-language support beyond TR** — Türkçe-first is the entire wedge.
- **A custom-trained TR foundation model** — that's a $5M project, not a weekend.

---

## 10. Metrics that matter

| Milestone | Headline metric | Floor | Stretch |
|---|---|---|---|
| M2 — Installer v0.1 | GitHub Releases downloads | 100 | 500 |
| M3 — Installer v0.2 | Weekly active installs (telemetry opt-in) | 50 | 200 |
| M4 — RAG kit + library | GitHub stars on `ollamatr` org | 200 | 1000 |
| M5 — VS Code ext | Marketplace installs | 200 | 1500 |
| M6 — Case studies | Cumulative installer downloads | 1000 | 5000 |
| M6 — Site | Monthly unique TR visitors | 3000 | 15000 |
| Always-on | Community PRs merged | 5/mo | 20/mo |
| Always-on | Time to "first chat" after download (UX) | < 10 min | < 5 min |

Telemetry must be **opt-in** and KVKK-disclosed. Default: count downloads only.

---

## 11. Top 3 risks per quarter

**Q1 (Installer build)**
1. **Microsoft SmartScreen warning** scares off first 80% of Windows users. Mitigation: prominent install guide showing "More info → Run anyway"; document on `/indir`. Reserve $200–400 for OV cert in Q3 if downloads justify.
2. **Apple notarization** — $99/yr. Mitigation: budget it; without it, macOS users see Gatekeeper block. Q2 spend.
3. **Tauri 2.x rough edges on Linux AppImage** — Mitigation: ship `.deb` first, `.AppImage` second.

**Q2 (Open the kitchen)**
1. **RAG kit looks like every other RAG kit** — Mitigation: lean hard on TR-specific embeddings + a real KOBİ document corpus (e.g., sample faturalar) so it's visibly Türkçe-first.
2. **Prompt library quality drift** — Mitigation: a single CODEOWNERS reviewer (you); strict frontmatter schema; no merge without a tested example output.
3. **VS Code marketplace policy review** delay — Mitigation: submit early (Month 5 Week 1), have backup `.vsix` direct-download.

**Q3 (Show real users)**
1. **Case study sourcing** — no users → no studies. Mitigation: pre-seed by Month 4 — DM 20 Turkish AI/dev twitter accounts, offer free 1:1 setup help in exchange for a write-up.
2. **ScrollLock / scope creep** — the biggest risk overall. Mitigation: this document is the gate. Every new idea goes to a `someday.md`, not the active sprint.
3. **Operator burnout** — solo + nights. Mitigation: 1 week off after each season ends. No exceptions.

---

## 12. Recommended single-thread focus (next 90 days)

**Ship the Tauri installer to v0.2 with a working dashboard.** Nothing else. Specifically: a downloadable `.msi`, `.dmg`, and `.deb` on GitHub Releases that, on a fresh machine, gets a Türkçe-speaking user from "I clicked download" to "I'm chatting with a Turkish-fluent LLM that runs on my laptop" in under 10 minutes — including KVKK consent, hardware check, model selection with quantization picker, install progress, and a post-install dashboard showing installed models and RAM.

**Defense.** The marketing site is already a strong asset — it ranks, it teaches, it converts. But every CTA on it currently points at **Ollama's own install instructions**. That is a leak. The single biggest leverage in the next 90 days is converting that traffic into actual installs we can measure, support, and write about. Every other roadmap item — RAG kit, prompt library, VS Code ext, case studies, eventually Cloud — depends on having real users running our binary on their machines. Without it, we are a content site that sends people to upstream. With it, we are infrastructure with a content moat. The installer is also the only feature where "Türkçe-first" creates a defensible product surface (KVKK consent flow, TR error messages, TR model recommendations baked in). Everything else is a wrapper around code anyone could write. Ship the installer.

---

*End of roadmap. ~2400 words.*
