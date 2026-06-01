# B7 — Ollama Upstream Contribution Strategy

**Mission:** Get OllamaTR's Türkçe-specific work merged into `github.com/ollama/ollama` upstream so that "Turkish support" and "Türkçe distribution" become indistinguishable from OllamaTR itself. If we are the canonical author of every TR-relevant line of upstream code, no rival can credibly fork "TurkOllama" or "Ollama-TR-Official". The PRs are the moat.

**Reality check (set expectations up front):** Ollama Inc. is a 58-person YC-backed (W21) Palo Alto company, ~173k stars, ~16k forks, ~3,300 open issues, MIT-licensed. Founders are **Jeffrey Morgan (CEO, `jmorganca`)** and **Michael Chiang (`mchiang0610`)**, CTO is **Patrick Devine (`pdevine`)**. The de facto PR-merging maintainers are **`mxyng` (1,289 commits)**, **`jmorganca` (906)**, **`dhiltgen` (862)**, then `BruceMacD`, `jessegross`, `pdevine`, `ParthSareen`. The contribution culture is small-PR-friendly for bug fixes and llama.cpp/MLX runner work, but explicitly **hostile** to new env vars, new features, and large doc additions (their own [CONTRIBUTING.md](https://github.com/ollama/ollama/blob/main/CONTRIBUTING.md) says: *"New features … add surface area … harder to maintain"*, *"large documentation additions can be hard to maintain over time"*). All non-trivial work must be **discussed in an issue first** before a PR is opened. Their public Discord is the channel where founders weigh in.

Three load-bearing data points that frame everything below:

1. **PR #14871 "docs: add Chinese translation (README.zh.md)"** — opened 2026-03-16 by `JasonYeYuhe`. **Still open, no maintainer review after ~2.5 months.** Only review is from another community contributor (`guicybercode`) flagging "content drift risk." This is exactly what a hypothetical `README.tr.md` PR would look like. Status: **maintainers are not engaging with translation work.**
2. **PR #14938 "docs: add multilingual quick-start README"** — opened 2026-03-18 by `guicybercode`. **Still open, zero comments, zero review.** Bundles PT-BR / KO / ZH / JA / FR / ES / IT / TH quick-starts. Same fate. **Localization PRs are silently ignored**, not rejected.
3. **Issue #12285 "How to use the Ollama trademark"** — closed 2025-09-15 by Michael Chiang himself with this verbatim policy: *"Ollama owns the copyright and trademark associated. **To prevent confusion, we ask developers to use a different name**, and talk about the tools / projects being able to connect with Ollama."* This is on the public record. **"OllamaTR" is, by their stated policy, a name they will object to.** Mitigation strategy is the entire bottom half of this doc.

---

## 1. Ollama codebase and contribution culture — what we're dealing with

### Repo health
- 173k stars, 16k forks, 3,289 open issues, daily commits, MIT license.
- Go runtime (`cmd/`, `server/`, `runner/`, `llm/`), with a vendored `llama.cpp` and an MLX runner. Recent activity (May 2026) is dominated by Gemma 4, Kimi-K2.5, GLM-5, MiniMax model support, MLX/PagedAttention performance, and the `launch:` and `codex:` desktop-app commands.
- The new `cmd/launch/`, `cmd/tui/`, and `app/` directories tell us the org has **already started building first-run / desktop UX surfaces** — the wizard locale story (proposal #4 below) lands in active code, not in greenfield.

### Who actually reviews PRs
| Maintainer | Role | Approach |
|---|---|---|
| `mxyng` | Top committer (1,289), runtime & registry | Tactical, merges bug fixes, terse |
| `jmorganca` | Co-founder / CEO | Strategic, tags himself on model-add issues, picks up high-visibility work |
| `dhiltgen` | GPU / mlx / build | Reviews infra + perf PRs |
| `pdevine` | CTO, model conversion | Reviews tokenizer / GGUF / convert PRs |
| `BruceMacD` | Tooling, codex | Reviews app + tool PRs |
| `mchiang0610` | Co-founder / community | Handles trademark / partnerships, low PR volume (58 commits) |

**Implication:** TR tokenizer bug fixes route through `mxyng` / `pdevine`. Trademark / branding asks route through `mchiang0610` direct email (`michael@ollama.com` — given publicly in #12285). Strategic Turkish-market positioning routes through `jmorganca` via Discord or a high-quality issue thread he tags himself into.

### Stance on locale, language, and i18n
- **No `OLLAMA_LANG` env var exists**, no locale plumbing anywhere in `cmd/` or `envconfig/`.
- CLI strings are hard-coded English in `cmd/interactive.go` and `cmd/cmd.go` (`/show`, `/set`, `/bye`, etc.).
- No `i18n` directory, no message catalog, no `.po` files.
- All translation PRs (Chinese, multilingual quick-start) are **open and stalled**. There is no merged precedent for a non-English doc file.
- BUT: there IS a real Unicode-bug history (issue #15278 German Umlauts gemma4, #15234 French accents — Turkish was explicitly mentioned in the thread by `oceancholic`: *"Same with Turkish characters … ollama itself dropping the characters"*). And there's logprobs UTF-8 work (#13497, #13500, #14692). **The maintainers DO take encoding correctness PRs seriously when framed as a bug, not a feature.**

### What gets merged fast
- Single-package bug fixes (`<package>: <short description>` commit format)
- Model-add work (architecture support, convert/quantize)
- Performance fixes with benchmarks
- Small, well-tested PRs from known contributors (rick-github, gabe-l-hart pattern)

### What gets silently ignored
- New env vars
- New CLI features
- Localized docs
- Multi-language READMEs
- "User experience" proposals without a bug attached

---

## 2. Türkçe-specific upstream PR catalog (seven candidates, ranked)

### PR-1: **UTF-8 / Turkish tokenizer correctness fix** ⭐ HIGHEST PROBABILITY OF MERGE

**Pitch framing:** "fix(runner): preserve multi-byte Turkish characters (İ ı ş ğ ç ö ü) in token stream output" — framed as a **bug fix** continuing the German/French/Polish/Norwegian Umlaut work already done in v0.20.0. Reference issue #15234 directly. Reference `oceancholic`'s comment confirming Turkish is broken.

**Concrete scope:**
- Reproduce on `gemma4`, `qwen3`, `llama3.x` with sentences containing `İSTANBUL`, `ışık`, `şöyle`, `ağaç`, `büyük`.
- Locate the byte-boundary drop. From issue #13497 / PR #13500 we know the runner uses U+FFFD replacement for partial UTF-8 — there's a fix path already in flight.
- Add **regression tests** in `runner/` covering the 7-character TR set + Azerbaijani extensions (ə) for bonus.
- Probable surface: 50-200 LOC, mostly tests.

| Field | Value |
|---|---|
| Effort | 3-5 days (1 dev) |
| LoC | ~150 (heavy on tests) |
| PR strategy | One incremental PR, link to merged Polish-fix v0.20.0 commit |
| Stakeholder risk | **Very low** — pure bug fix, has a closed precedent (#15278) |
| Reviewer to tag | `mxyng`, `pdevine` |
| If merged | Release-notes credit *"Fix: preserve Turkish characters (thanks @ollamatr)"* — first piece of canonical evidence. We blog it. Hürriyet / Webrazzi pickup. |
| If rejected | Vanishingly unlikely. Plan B = land it in our installer wrapper as a post-processing step, ship as "Türkçe Düzeltici" feature in OllamaTR. |

### PR-2: **Unicode-aware case-folding in model name validation (Turkish dotless-i)** ⭐ HIGH

**Pitch framing:** "types/model: use unicode-aware lowercasing for namespace validation (fixes Turkish locale dotless-i collision)". The current `types/model/name.go` uses byte-level `isAlphanumericOrUnderscore` — fine for ASCII namespaces, but if a Turkish user has `LC_ALL=tr_TR.UTF-8` and types `ISTANBUL/llama3`, Go's `strings.ToLower` under the Turkish locale folds `I → ı`, not `i`, breaking the manifest lookup. This is a real, demonstrable bug.

**Concrete scope:**
- Audit `types/model/name.go`, `server/manifest.go` for any `ToLower`/`ToUpper`.
- Pin to `golang.org/x/text/cases.Fold` with explicit `language.English` tag for namespace canonicalization (or use `strings.ToLowerSpecial(unicode.TurkishCase, …)` correctly).
- Test with `İSTANBUL`, `Iı`, `LLAMA3.2` round-trip.

| Field | Value |
|---|---|
| Effort | 2-3 days |
| LoC | ~80 |
| PR strategy | One small PR + repro test |
| Stakeholder risk | **Low** — but `mxyng` owns this code and is terse; needs an issue first |
| Reviewer to tag | `mxyng`, `bmizerany` |
| If merged | Niche but technical-cred win. *"OllamaTR fixed Turkish-locale namespace bug nobody else noticed"* — credibility with the dev community. |
| If rejected | Patch in our distribution. Open-source the patch as a standalone `ollama-tr-locale-patch` repo. |

### PR-3: **Türkçe Hugging Face model catalog page on ollama.com/docs** ⭐ HIGH

**Pitch framing:** Skip the README translation trap. Instead, propose a new file `docs/community-models-turkish.mdx` modeled after the existing `docs/integrations/` pattern. It catalogs **Trendyol-LLM**, **KOCDigital-LLM**, **Cosmos-LLaMA**, **Hamza**, **YTUCE-LLM**, **TurkLLaMa**, etc., with `ollama run hf.co/...` commands. Pure docs, additive, low-risk.

**Concrete scope:**
- One new MDX file under `docs/` listing 10-20 reputable Turkish-fine-tune GGUFs already on HF with one-liner `ollama run hf.co/{username}/{repo}` commands.
- One sentence in main `README.md` "Community Integrations" section linking to it.

| Field | Value |
|---|---|
| Effort | 1-2 days (mostly curation) |
| LoC | 0 Go, ~300 lines markdown |
| PR strategy | Single PR, frame as parallel to existing `docs/integrations/` |
| Stakeholder risk | **Medium** — CONTRIBUTING.md warns against "large doc additions", but this is a single curated file, not a translation. Risk it's silently ignored like #14871. |
| Reviewer to tag | `jmorganca` (he merges README/doc PRs himself — see #9671, #8350, #7975) |
| If merged | OllamaTR is named in the upstream docs. **Permanent positioning.** Every Google search "Türkçe Ollama modeli" hits an ollama.com page we authored. |
| If rejected | Self-host as `docs.ollamatr.org/topluluk-modelleri` and submit as an "Integration" link in the existing list — that route IS regularly merged. |

### PR-4: **First-run wizard locale auto-detect** — DO NOT ATTEMPT AS UPSTREAM

**Why not:** This is the OllamaTR product. Submitting it upstream means giving away our differentiator. Also, CONTRIBUTING.md explicitly warns: *"New features (e.g. API fields, environment variables) add surface area to Ollama and make it harder to maintain"*. The desktop app team (`ParthSareen`, `hoyyeva`, `BruceMacD`) is actively iterating on the `cmd/launch` UX in May 2026 — they won't accept an outsider's locale-detection PR while they're mid-refactor.

**Strategy instead:** Ship locale auto-detect in the **OllamaTR installer/wrapper**. When (not if) Ollama Inc. eventually adds i18n themselves, we already have 6-12 months of UX research and Turkish user data to contribute as the "locale partner of record".

### PR-5: **`OLLAMA_LANG=tr` environment variable for CLI message localization** — DEFER 12+ MONTHS

**Why defer:** Requires upfront agreement from maintainers on an i18n architecture (catalog format, fallback chain, contribution model for translators). The "hard to maintain" objection in CONTRIBUTING.md applies in full. Zero existing precedent. Adding `OLLAMA_LANG` without first establishing a 5-language baseline is asking maintainers to commit to forever-maintenance for one user community.

**Pre-requisite path:**
1. Land PR-1 (tokenizer fix) → build credibility
2. Land PR-2 (locale-safe namespace) → demonstrate UTF-8 / locale rigor
3. Land PR-3 (TR community models doc) → become the visible TR voice
4. Open an **issue** (not PR) proposing i18n architecture, co-signed by Chinese / Japanese / Korean community contributors. Only after explicit maintainer green-light, open the PR.

If they bless it: lead the work as `cmd/i18n/` author. If they don't: ship CLI Türkçe in our wrapper via `ollama` binary stdout capture + sed replace (already exists as a pattern in zsh/powershell wrappers).

### PR-6: **Turkish error messages catalog** — BUNDLE WITH PR-5

Same dependency chain as PR-5. Don't try to land just-error-messages; maintainers will reject as half-an-i18n-effort.

### PR-7: **Model card schema with RAM / dil / lisans Turkish display** — DO NOT UPSTREAM

The model card format is owned by ollama.com (registry), not the runtime. We will never get write access to the registry rendering pipeline. Ship this exclusively in our installer/site.

### PR-8 (BONUS, found during research): **HuggingFace `hf.co/turkcell/...`, `hf.co/trendyol/...` quantization recommendations**

Trendyol and Turkcell have GGUF repos on HF. Many are missing Ollama-template files (the `Modelfile` Go template). We can:
- Open PRs on **their** HF repos adding correct Ollama templates → become known in TR enterprise AI
- Open one PR on `ollama/ollama` docs `docs/import.mdx` adding a section *"Importing Turkish community models"* with worked examples → upstream credit, very low risk

Effort 1-2 days, LoC ~150 docs. Reviewer: `jmorganca`. Risk: Low. This is the **second-fastest** upstream credit after PR-1.

---

## 3. Existing Ollama tickets we should engage with (live, today)

These are open issues where a single high-quality comment from `@ollamatr` (or a personal account contributing in OllamaTR's name) plants the flag publicly.

| Issue/PR | Title | Action |
|---|---|---|
| **#15234** | gemma4:e4b drops accented/Unicode characters … (Turkish flagged in-thread) | **Top priority.** Post a clean, structured repro with 5 Turkish test sentences, link to PR-1 once ready. Tag `@oceancholic` (the original TR commenter) — instant ally. |
| **#14475** | Output redirected to a file in PowerShell has encoding issues | TR users overwhelmingly run on Windows (gap-turkish-market.md observation). Reproduce with İSTANBUL, propose chcp 65001 / UTF-8 BOM fix. |
| **#14230** | fix(server): truncation loop for embeddings (mentions Turkish explicitly) | Author `@BurakBebek1` is a Turkish-name contributor. **Reach out, offer to co-maintain.** This is potentially our first TR-community ally inside the upstream contributor pool. |
| **#14871** | docs: add Chinese translation README.zh.md | Post a supportive comment + offer to be the Türkçe counterpart IF they adopt a translations directory. **Don't open the TR README PR yet** — wait for the Chinese one to either merge or get a maintainer's i18n direction. |
| **#14938** | docs: add multilingual quick-start README | Same — offer to add Türkçe quick-start to `@guicybercode`'s file. Lower risk than a standalone PR. |
| **#13497, #13500, #14692** | logprobs UTF-8 partial-byte handling | Adjacent to PR-1 scope. Review the open PRs, post a substantive comment with TR test cases. |
| **#14319** | Request to add SARVAM (Indian model) | **Read this thread carefully — it's the exact analog.** Pattern: community member asks, `rick-github` does the heavy lifting, `jmorganca` is silently absent, model eventually ships in 0.30.0 with quirks. **Lesson: for Türkçe models we do the work ourselves under our HF namespace and ask Ollama to add to docs, NOT registry.** |

---

## 4. Stakeholder relationship strategy

### Approaching Jeffrey Morgan (`jmorganca` / Twitter `@jmorganca`)
- Engineer, ex-Docker, ex-Kitematic, Waterloo SE. Cares about: technical correctness, performance, developer experience, model launch coordination.
- **Do:** Submit clean Go PRs, write tight commit messages, reference his own merged PRs as style guide, ping him only when there's signal (model launches, real bugs).
- **Don't:** Pitch market opportunity, send "Turkey is 85M people" decks, ask for partnership before contributing code. He's an engineer-founder; technical evidence first, business second.
- **Channel:** GitHub issues he's already tagged in. Avoid cold DM until we have 2-3 merged PRs.

### Approaching Michael Chiang (`mchiang0610` / `michael@ollama.com`)
- Co-founder, community / partnerships / developer relations. Public-facing. Speaks at All Things Open. Manages the trademark policy directly (per issue #12285).
- **Do:** Email him AFTER PR-1 lands, subject line *"OllamaTR — Türkçe distribution & upstream contribution roadmap"*. Lead with merged-PR credit. Then introduce the trademark question (see §6).
- **Don't:** Lead with the name question. Lead with our contribution track record.
- **Channel:** Email + LinkedIn. Slack/Discord for low-stakes intros.

### Approaching Patrick Devine (`pdevine`)
- CTO, owns model conversion / tokenizer / GGUF. The technical reviewer for PR-1, PR-2, and any Turkish tokenizer work.
- **Do:** Substantive technical PRs with regression tests. Reference llama.cpp upstream when relevant.
- **Don't:** Ping him on docs or branding issues.

### Approaching `mxyng`
- Top committer, terse, fast merges. Owns `types/model/`, registry plumbing.
- **Do:** Tiny, surgical PRs. Don't over-explain. Include tests.
- **Don't:** Submit large PRs without an issue first.

### Conferences where they show up
- **All Things Open** (Raleigh, NC, October) — Michael Chiang spoke 2024, likely again 2025/2026. **Highest-value conference for in-person intro.**
- **YC Demo Day / YC events** — Jeffrey via W21 batch network. Need a YC-connected intro.
- **AI Engineer Summit (San Francisco)** — Ollama team presence likely.
- **ODSC (Open Data Science Conference)** — `ParthSareen` (Ollama engineer) spoke on the ODSC podcast in 2026. Lower-stakes intro channel.
- **GitHub Universe** — possible.
- **No European/Turkish presence** as of this research. Türkiye-focused conferences (BTK Türkiye Açık Kaynak Konferansı, Bilkent CS Days) are net-new exposure for them — **inviting them to Istanbul is a credible move once we have 2+ merged PRs**.

### What NOT to do (red lines)
1. **Don't name-drop the brand "OllamaTR" in technical PRs.** Author the PRs under personal/founder GitHub accounts. Branding pollution kills review velocity. Save brand mentions for blog posts after merge.
2. **Don't ask for partnership before contributing.** The Sarvam thread (#14319) shows what happens — `jmorganca` is silent, community does the work anyway. Earn standing first.
3. **Don't open a `README.tr.md` PR right now.** It will sit stale like #14871. Wait for a maintainer to publicly bless an i18n direction, OR ride PR #14938 as a sub-contribution.
4. **Don't push back publicly on trademark concerns.** Take that conversation private (see §6).
5. **Don't fork antagonistically.** A visible "Türk Ollama" fork before any upstream contribution attempt would burn bridges permanently. Contribute first, fork only if rebuffed.

---

## 5. Trademark conversation — the named risk

### What we know (verbatim from public record)
Michael Chiang, GitHub issue #12285, 2025-09-15:
> *"Ollama owns the copyright and trademark associated. To prevent confusion, we ask developers to use a different name, and talk about the tools / projects being able to connect with Ollama. Feel free to ping me at michael@ollama.com"*

This is the **stated policy.** The name "OllamaTR" is, by their public framing, exactly the kind of name they ask developers not to use. We have to assume this conversation is coming.

### The concrete risk
- C&D letter from Ollama Inc.'s legal asking us to rename
- Domain/social-handle takedown via UDRP-style complaint on `ollamatr.com`
- App store / package registry takedown if we ship a Türkçe binary called `ollama-tr`
- Loss of "official-ish" positioning in Turkish media if rebranded mid-launch
- Worst case: rename to "Ollamatr" → "Türk LLM Kurulumu" / generic name, lose 6-12 months of SEO

### The mitigation playbook (combined: contribute first, then ask)

**Phase A — Build standing (months 0-4):** Land PR-1 (tokenizer fix), PR-3 (community models doc), PR-8 (HF integration docs). Three named contributions to upstream `ollama/ollama` is a real, defensible posture: *"We are not a clone — we are upstream contributors and the canonical Türkçe entry point."*

**Phase B — Open the conversation (month 4-5):** Email Michael Chiang at `michael@ollama.com`. Subject: *"Türkçe Ollama distribution — alignment & descriptive use"*. Lead with merged-PR list. Frame:
1. *"We've been the team contributing TR-specific upstream work (links to merged PRs)."*
2. *"We distribute and support Ollama for the Turkish-speaking market — we use the name `OllamaTR` descriptively (Ollama + 2-letter ISO country code TR, the same shape as `Ubuntu UK`, `Mozilla Türkiye`, `WordPress.tr`)."*
3. *"We'd like to align on a descriptive-use license / community-distribution status. Open to renaming the binary distribution if needed, but we'd like to keep the project name for community continuity."*
4. *"We are happy to add a clear "Unofficial community distribution — not affiliated with Ollama Inc." disclaimer in our README, on the site, and in the installer."*

**Likely outcomes:**
- **Best (30%):** Verbal "OK with disclaimer + descriptive use" — no formal license but no objection. Document the email exchange. Add the disclaimer. Proceed.
- **Middle (50%):** Request rename of *binary* (e.g. `tr-llm-host` or `Türkmodel`) but tolerate the *organization/project* name "OllamaTR" with disclaimer. **Acceptable. Plan for this.**
- **Worst (20%):** Full C&D, must rename everything. Plan B: rebrand to "Türkmodel" / "Yerli LLM" / "Anadolu Ollama yok, Türkmodel var", port all SEO via redirects. Painful but survivable if executed in <30 days.

### What NOT to do on trademark
- Don't ignore it and hope. Their legal will catch up at scale (>10k installs / press coverage).
- Don't apply for "OllamaTR" as a Turkish trademark — that's the most antagonistic possible move, it WILL trigger international opposition, and you can't trademark another company's mark with a 2-letter suffix in any major jurisdiction.
- Don't claim affiliation. Disclaim early, disclaim often.
- Don't go silent if they reach out. Respond in <72 hours, professionally, with the merged-PR list attached.

### The asymmetric upside of contribution-first
Every merged PR is **legal armor**. *"We're the team upstream trusts with Turkish-character handling"* is a vastly stronger negotiating position than *"we have a Turkish website"*. The PRs cost us $5-15k of engineering. The brand is worth $X00k+ of media value if it sticks. The math is obvious.

---

## TOP-3 UPSTREAM PRs TO ATTEMPT (one-paragraph summary)

**(1) `runner: preserve multi-byte Turkish characters (İ ı ş ğ ç ö ü)`** — pure bug fix riding the German/French/Polish/Norwegian Umlaut precedent already merged in v0.20.0; explicit Turkish complaint exists in issue #15234 thread; ~150 LoC mostly tests; reviewed by `mxyng`/`pdevine`; near-certain to merge; gives us release-notes credit and the first piece of "OllamaTR upstream" evidence. **(2) `docs: add docs/community-models-turkish.mdx`** — additive, single new MDX file cataloging Trendyol-LLM, KOCDigital-LLM, Cosmos-LLaMA, YTUCE-LLM, etc. with `ollama run hf.co/...` commands; reviewed by `jmorganca` who merges README/doc PRs personally; gives us a permanent ollama.com URL we authored. **(3) `types/model: use unicode-aware canonicalization for namespace validation (Turkish dotless-i)`** — small surgical fix to `types/model/name.go` to use `language.English`-pinned case-folding so `İSTANBUL/llama3` works under `LC_ALL=tr_TR.UTF-8`; ~80 LoC; technical credibility win with `mxyng`. Land these three within 90 days and we have a defensible "canonical TR maintainer" story BEFORE we have the trademark conversation with Michael Chiang. STOP.
