# OllamaTR — Contributor Flywheel (B1 Design)
**Operator:** Jay (solo, no legal entity, Community Edition)
**Repo:** https://github.com/eruo005-dev/ollamatr-app
**Site:** https://ollamatr-app.vercel.app
**Date:** 2026-06-01
**Goal:** become the largest Türkçe-speaking Ollama community by becoming the easiest Türkçe OSS project to contribute to.

> **Operating principle.** The Türkçe AI ecosystem is small, named, and clustered around ~6 anchor accounts (Duygu Altınok, Stefan Schweter, Murat Karakaya, Trendyol AI, Cosmos/YTÜ, Deep Learning Türkiye). You do not need 1.000 contributors to win. You need ~30 named humans, and the flywheel below is engineered to land exactly that count in 12 months, paying ~25.000 TL / month worst case, ~0 TL best case.

---

## 1. Cold-start problem — the first 10 contributors

### 1a. The repo must look "alive enough to bother PR'ing" within 60 seconds

A first-time visitor decides whether to contribute in the time it takes to glance at `github.com/eruo005-dev/ollamatr-app`. Right now they see a Vite boilerplate README and a footer pointing to a dead `github.com/ollamatr` handle. Nobody PRs into that. Pre-requisites that **must ship before any outreach** (these are the "stop bleeding" items from `gap-community.md` — they are the floor, not the strategy):

1. Move/rename repo to a clean `OllamaTR/ollamatr` org so the handle in the footer matches the repo.
2. Root `README.md` in Türkçe with 30-second GIF, 3-line pitch, `npm install && npm run dev` quickstart, badge row, **"İlk katkını yap →" linking to a tagged issue with first-timers-only label**.
3. Root `LICENSE` (MIT), `CONTRIBUTING.md` (Türkçe), `CODE_OF_CONDUCT.md` (Contributor Covenant 2.1 TR), `SECURITY.md` with a real disclosure email.
4. `.github/ISSUE_TEMPLATE/{bug.yml, feature.yml, model_request.yml, turkish_translation.yml, kvkk_question.yml}` and `PULL_REQUEST_TEMPLATE.md` in Türkçe.
5. 25 pre-seeded `good first issue` tickets and 5 `first-timers-only` tickets (more on shape below).
6. GitHub Discussions enabled with categories: `Tanışma`, `Soru-Cevap`, `Türkçe Modeller`, `Donanım`, `Showcase`, `KVKK`, `Katkı`.
7. `all-contributors` bot configured so any merged PR auto-adds the contributor to README and `/tesekkurler` (which Fiyatlandırma already promises but doesn't exist yet).

Cost: 1 weekend of Jay's time. This is the gate. **No outreach until these are done — you will burn first impressions on people whose attention you only get once.**

### 1b. What "good first issue" looks like for a Türkçe community

Universal industry research is clear: tag ~25% of issues `good first issue`, projects gain ~13% more contributors (Source: daily.dev OSS onboarding study). For a Türkçe-first community, the labelled issue has a specific anatomy:

| Property | Requirement |
|---|---|
| **Title language** | Türkçe (`docs: KVKK SSS sayfasına model-veri-saklanma sorusu ekle`), with EN translation in body for crawlability. |
| **Body sections** | `## Ne yapılacak`, `## Neden`, `## Dosya yolu`, `## Beklenen sonuç`, `## Ekran görüntüsü/örnek`, `## Yardım`. |
| **Mentor handle** | Every GFI issue lists a "Mentor: @jay (Discord: jay#xxxx)" line. SLA: first reply ≤ 24h. |
| **Scope** | Single file, ≤ 50 LoC change, no architectural decisions, no review of >1 reviewer's taste. |
| **Done definition** | Bulletproof checklist (`- [ ] tsc geçti`, `- [ ] npm run build geçti`, `- [ ] ekran görüntüsü PR'a eklendi`). |
| **Decoupling** | Issue cannot depend on other open issues. If it does, split or block. |
| **Labels** | `good first issue` + one of (`docs`, `türkçe-çeviri`, `model-kartı`, `kvkk`, `a11y`, `ui-polish`, `model-ekleme`). |

#### The opening 30-issue backlog (concrete, ready to file)

**Türkçe çeviri (10 issues, perfect for non-coders — onramp for tech writers):**
1. Translate `app/README.md` boilerplate to Türkçe
2. Translate the 5 Ollama upstream docs pages most-needed in Türkçe (covered in §7)
3. Glossary file: `docs/glossary.tr.md` — "embedding", "inference", "quantization", "context window" TR karşılıkları
4. KVKK SSS: 5 Türkçe Q&A entries
5. Türkçe README emoji + screenshot polish

**Model kartları (8 issues — onramp for ML practitioners):**
6. Add `models/trendyol-llm-7b.md` card with TR-MMLU score, GGUF link, sample prompt
7. Same for `Trendyol-LLM-Asure-12B`
8. Same for `Cosmos-Turkish-Llama-8b`
9. Same for `Kumru-2B`
10. Same for `Hamza-xlarge`
11. Same for `Turkcell-LLM-7b-v1`
12. Same for `Kanarya-2b`
13. Same for `BERTurk` (encoder card — different template)

**UI/a11y polish (7 issues — onramp for frontend devs):**
14. Add focus-visible ring to `WizardButton.tsx`
15. Replace `aria-label="kart"` with semantic label on 3 cards
16. Add Türkçe `<html lang="tr">` and check it ships
17. Convert 1 absolute-positioned hero badge to flex (mobile <360px breakage)
18. Add `prefers-reduced-motion` guard to `Reveal.tsx`
19. Localize `aria-current="page"` semantics for nav
20. Fix 1 contrast failure on dark-mode subtle text

**KVKK / hukuk (3 issues — onramp for hukuk/compliance people):**
21. Add Article 5 KVKK exemption table to `KVKK.tsx`
22. Add Türkçe summary card for "veri yurt dışına çıkmıyor — yerel inference" claim
23. Add KVKK incident-response checklist to docs

**Tooling / DX (2 issues — onramp for senior devs to build credibility):**
24. Add GitHub Action: typecheck + lint + build on PR
25. Add `lighthouse-ci.yml` budget for `/` and `/indir`

**First-timers-only (5 issues — explicit "you must be new to OSS"):**
26. Fix typo in `Topluluk.tsx` (find a real one before filing)
27. Add 1 missing alt-text on hero image
28. Update copyright year in footer
29. Add yourself to `CONTRIBUTORS.md` (the meta-PR — most successful onboarding hack in OSS)
30. Add a Discord/X badge to README

### 1c. Who the first 10 are — exact outreach sequence

The first 10 contributors are not random. They are people whose existing public output already proves they would say yes to a 1-line ask. Outreach is **named DM only**, never broadcast. Sequence over 14 days:

- **Day 1-2:** DM 3 Türkçe NLP educators (Murat Karakaya, Duygu Altınok, Cahid Arda Öz) with: "Yeni bir TR-odaklı Ollama wrapper'ı OSS olarak açtım, ilk PR'ları kabul ediyorum. Bir model kartı ya da çeviri PR'ı atar mısın, contributor wall'a koymak istiyorum." Even 1 of 3 = win.
- **Day 3-4:** Post in `Deep Learning Türkiye` Telegram and `Türkiye Yapay Zeka İnisiyatifi` Slack with **3 specific GFI issue links**, not a generic "katkıda bulunun" plea. Specific issues convert ~10x.
- **Day 5-7:** DM 5 ITU/ODTÜ/Boğaziçi AI club presidents with a "Kulübünüz için 'ilk OSS PR'ım' workshop'u yapmak ister misiniz, materyali ben hazırlarım" offer. The workshop ships ~5 PRs in one evening.
- **Day 8-10:** Reddit `r/Turkey` and `r/LocalLLaMA` (separate threads, different angles — "Türkçe LLM ile yerel asistan" for r/Turkey, "Turkish-localized Ollama UI with KVKK model picker" for r/LocalLLaMA).
- **Day 11-14:** Cross-post the 3 best merged PRs on X tagging the contributor. Public recognition recruits the next wave.

**Target: 10 merged PRs from ≥ 7 distinct contributors by day 14.** If you hit this, you are out of cold-start. If you don't, the README, the issue quality, or the response time is wrong — diagnose before doing more outreach.

---

## 2. Hacktoberfest 2026 plan

### 2a. Dates and rules (2026)

- **Window:** 1 October – 31 October 2026 (DigitalOcean has confirmed the format continues; ICCS Cambridge announced their participation with the 1–31 October window already).
- **DigitalOcean kick-off:** 1 October 2026 (details TBC by DO).
- **Contributor target:** 6 merged PRs to repos with `hacktoberfest` topic. Rewards: Holopin digital badges (up to 4) for participants who get at least 1 PR merged.
- **Maintainer requirements:** add `hacktoberfest` topic to repo, label issues `hacktoberfest` + `good first issue` + `help wanted`, accept PRs with merge / "hacktoberfest-accepted" label / approving review.

### 2b. Pre-October prep timeline (mandatory)

| Date | Action |
|---|---|
| **June 2026 (now)** | Cold-start §1 complete. Repo legitimate. 10 first contributors locked. |
| **July 2026** | Backlog grown to 60 issues (30 already filed + 30 more). 20 must be `hacktoberfest`-suitable (≤ 50 LoC, Türkçe-friendly). |
| **August 2026** | Documentation translation track (§7) producing ≥ 4 PRs/week — proves the contributor pipeline scales. |
| **September 15** | Add `hacktoberfest` repo topic. Pin a `[HACKTOBERFEST 2026 — Buradan Başla]` Discussion thread with a curated list of 25 ready issues. Banner the site `/topluluk` page. |
| **September 22** | Email/DM existing contributors: "Eylül sonunda Hacktoberfest başlıyor, listede senin için ayırdığım 1 issue var" (named ask, specific issue link). |
| **October 1** | Tweet + Discord + Telegram announce. Promise: every merged PR → contributor wall + Discord role `Hacktoberfest 2026`. |
| **October 5, 15, 25** | Three "katkı saati" voice calls on Discord — pair-program on open Hacktoberfest issues live. |
| **October 31** | Close window. Send personal thank-you DM + an OllamaTR sticker pack (physical, posted to Türkiye addresses, see §5). |

### 2c. Label scheme (Hacktoberfest-compatible)

```
hacktoberfest         — opt-in, this issue counts toward Hacktoberfest
hacktoberfest-accepted — apply to merged PRs to count toward contributor's 6
good first issue       — beginner, any time
first-timers-only      — beginner AND first-OSS-PR-ever
help wanted            — maintainer wants help but not necessarily beginner
spam                   — close+lock auto-pulled to keep DO bot happy
invalid                — same; for AI-slop PRs
türkçe-çeviri          — translation work
model-ekleme           — add a TR LLM model card
kvkk                   — Turkish data protection work
docs                   — documentation
ui-polish              — small UI improvements
a11y                   — accessibility fixes
```

`spam` and `invalid` are non-negotiable — DO requires them or the repo is unlisted. AI-generated PR slop is the #1 risk that destroys a maintainer's October.

### 2d. Prizes (realistic for a no-budget solo project)

| Tier | Prize | Cost |
|---|---|---|
| 1 merged PR | Holopin badge (DO covers) + `/tesekkurler` page entry | 0 TL |
| 2 merged PRs | OllamaTR sticker pack (3 stickers, mailed) | ~50 TL each (cargo dahil) |
| 4 merged PRs | OllamaTR T-shirt (print-on-demand via teerex.com.tr or kalemoda) | ~250 TL each |
| Most impactful PR (judged) | 2.500 TL hediye kart (Hepsiburada / Trendyol — paid via Papara / IBAN, see §4) | 2.500 TL |
| Top 3 contributors | Spot in a 2027 "OllamaTR ile yola çıkanlar" blog post + 1-hour 1:1 with Jay | 0 TL |

**Total worst-case October spend: ~15.000 TL** (assuming 30 sticker packs, 10 t-shirts, 1 hediye kart). This is the entire annual prize budget for the flywheel.

### 2e. What to submit pre-October (OllamaTR's own contributions)

To recruit, the maintainer also contributes. Before Sep 30, Jay submits PRs to:
- `agmmnn/turkish-nlp-resources` — add OllamaTR to the LLM Tools list.
- `kesimeg/awesome-turkish-language-models` — add OllamaTR.
- `nanelimon-organization/TurkishNLPGuide` — Türkçe rehbere ekleme.
- `ollama/ollama` upstream — TR docs PR (high credibility move).
- `Helsinki-NLP/Opus-MT` — Turkish model evaluation contribution.

These 5 outbound PRs cost ~2 days but yield permanent backlinks from established Türkçe NLP repos. They also model contribution behavior for the community.

---

## 3. GSoC alternative for Türkiye

### 3a. Reality check on what exists

| Program | Status for OllamaTR | Verdict |
|---|---|---|
| **Google Summer of Code (GSoC) 2026** | Requires OSI-listed mentor org with ≥ 2 years history. OllamaTR fails the 2-year bar in 2026. Apply 2028. | Defer to 2028 |
| **Outreachy** | Same 2-year + community-size requirement. | Defer to 2028 |
| **LFX Mentorship (Linux Foundation)** | Requires CNCF/LF project status. Not applicable. | Skip |
| **TÜBİTAK 2237-A Bilimsel Eğitim Etkinlikleri** | Funds *training events*, not students. Could fund a 1-week "Yerel LLM ve Türkçe NLP yaz okulu" if a university faculty member is the PI. Requires academic co-applicant. 2026/1 çağrı already open. | **Apply via partner** |
| **TÜBİTAK 2204-A Lise / 2204-B Ortaokul Araştırma Projeleri Yarışması** | For students themselves. We become a project mentor / topic provider, not the applicant. | **Position as topic provider** |
| **TÜBİTAK 2209-A Üniversite Öğrencileri Araştırma Projeleri Destek Programı** | Funds 1 üniversite öğrencisi proje (~12.000 TL). They can use OllamaTR as the OSS substrate for the project. | **Position as substrate** |
| **TÜBİTAK 2209-B Sanayiye Yönelik Lisans Bitirme Tezi** | Same, but for industry-aligned bitirme tezleri. We become the "sanayi" partner via informal letter. | **Position as substrate** |
| **BTK Akademi yarışmaları (yıllık)** | Free distribution channel, no funding. | Co-host workshop |
| **Türkiye Açık Kaynak Platformu** | Industry body, not a funding program. Speaking slot available. | Speaking slot |
| **Kodluyoruz açık kaynak track** | Their bootcampers need real OSS projects to contribute to as bitirme. | **Position as substrate** |
| **Run our own: "OllamaTR Yaz Okulu"** | 4-week part-time program, 8 mentees, ~1.500 TL stipend each + certificate. Total cost ~12.000 TL. | **Yes, run in 2027 summer** |

### 3b. Recommended stack (2026 → 2028)

**2026 (now → end of year):**
- File TÜBİTAK 2237-A through a friendly faculty (Murat Karakaya at TED Üniversitesi is a plausible PI given his existing public AI education work — start the conversation now).
- Post a public "OllamaTR projeniz için bitirme tezi konusu olur" page targeted at 2209-A/B applicants — list 10 thesis-shaped problems (RAG over Turkish legal corpora, fine-tune evaluation harness for Türkçe, KVKK-compliant model audit tool, etc.).
- Co-run 1 workshop with Kodluyoruz or BTK Akademi.

**2027 summer:**
- Launch **"OllamaTR Yaz Okulu"** as own program (mirroring Outreachy structure but smaller, all-Türkçe). 4 weeks, 8 students, paired mentors, weekly demo. 1.500 TL stipend per student is funded by §4 bounty pool surplus + (if achieved) GitHub Sponsors revenue.

**2028:**
- Apply to GSoC and Outreachy now that the project has 2 years of history.
- By then the Yaz Okulu has produced ~16 alumni, which is the contributor pipeline GSoC reviewers look for.

---

## 4. Bounty system

### 4a. Sizing for the Turkish market

Industry data: Algora's awarded bounties averaged ~$110-194 each (Source: Algora launch posts, Oct 2023 disclosure). Typical OSS tiers: small $50-100, medium $100-500, large $500+.

For Türkiye, where senior dev market rate is ~70-100k TL/ay and junior dev ~25-40k TL/ay, the equivalent "feel meaningful" bounty is **lower in USD terms but higher in TL terms** because of FX and PPP:

| Tier | TL range | USD equiv (~33 TL/$) | Time-fit | Examples |
|---|---|---|---|---|
| **Mikro** | 250-500 TL | $7-15 | <1 saat | Typo, alt-text, copyright year |
| **Küçük** | 750-1.500 TL | $22-45 | 1-3 saat | Model card, doc translation page, single UI polish |
| **Orta** | 2.000-5.000 TL | $60-150 | 1-2 gün | Multi-page doc translation, GitHub Action, KVKK compliance feature |
| **Büyük** | 7.500-15.000 TL | $225-450 | 3-7 gün | New end-to-end feature (Türkçe model auto-detect, bench harness) |
| **Mega** | 20.000+ TL | $600+ | 1-3 hafta | Multi-month roadmap items (do not bounty — hire) |

### 4b. What is bountyable vs hostile to bounty

**Bountyable (well-scoped, no taste fights):**
- Documentation translation (mechanical, verifiable)
- Model card additions (template-driven)
- Bug fixes with reproducible test
- Single-component UI fixes with screenshot proof
- GitHub Action / CI work
- Test coverage for a named module
- Localization / Türkçe glossary work
- KVKK compliance feature with statutory citation

**Hostile to bounty (creates conflict, drives quality down):**
- Design decisions ("re-skin the wizard"). Bounties produce 5 mediocre attempts, not 1 good design. Fund a designer hourly instead.
- Architecture choices ("pick a state library"). Should be maintainer's call, debated in RFC.
- "Polish" or "make it feel professional" — unfalsifiable.
- Anything requiring product taste or user research.
- Anything where the maintainer hasn't done the spec work first. Vague bounties produce slop and grudges.
- AI-content / SEO writing for the marketing site — invites AI-slop submissions that take longer to triage than write.
- Issues without a clear "done" definition.

**Rule of thumb:** if you cannot review the PR in ≤ 20 minutes, it should not be a bounty.

### 4c. Payout rails (Türkiye reality)

The hard problem. Algora/Polar both use Stripe Connect, which works for Turkish contributors but settles in USD via Stripe → Wise/bank → TRY (3-5% in friction + KDV ambiguity for the contributor). For a TR-resident-to-TR-resident OSS payment, faster rails exist:

| Rail | Pros | Cons | Use when |
|---|---|---|---|
| **Papara** | Instant, free, TRY-native, no bank account needed | 18-yaş üstü, TC kimlik required for above-limits | Default for ≤ 5.000 TL TR-to-TR |
| **IBAN havale (EFT/FAST)** | Free, instant via FAST | Asks for ad-soyad-IBAN | Default for > 5.000 TL TR-to-TR |
| **Wise** | Good FX, multi-currency | Higher friction, ID verification | Non-TR contributors only |
| **Algora platform** | Auto-escrow, public bounty page, recruits flywheel | 9% platform fee, Stripe friction in TL | Use as the *board* (visibility), pay off-platform when both parties are TR |
| **GitHub Sponsors → OllamaTR org → forward** | Public transparency | Slow setup, requires verified org | Not until 2027 when project has revenue track |

**Recommended model:** Maintain an Algora board for visibility (lists open bounties on a clean public URL). When the winning PR's author is TR-resident, pay direct via Papara/IBAN and close the Algora bounty manually. When non-TR, pay through Algora/Stripe rails. Save the 9% on TR-TR transactions, which will be ~80% of all bounty traffic.

**Compliance note:** for TR-to-TR amounts > 7.000 TL, the recipient owes serbest meslek vergisi unless they invoice via şahıs şirketi. Keep individual bounties ≤ 5.000 TL to stay below MASAK reporting thresholds and below typical tax-thinking levels for hobbyist contributors. Document the payment as "ödül" (prize) not "ücret" (wages) on the transfer note — different tax treatment.

### 4d. Annual bounty budget proposal

| Line item | TL/year | Notes |
|---|---|---|
| 20 mikro bounties × 400 TL | 8.000 | 1 per 2.5 weeks |
| 15 küçük × 1.200 TL | 18.000 | 1 per 3.5 weeks |
| 6 orta × 3.500 TL | 21.000 | 1 per 2 months |
| 2 büyük × 12.000 TL | 24.000 | Quarterly headline bounty |
| Hacktoberfest mega prize | 2.500 | §2d |
| Sticker / t-shirt fulfilment | 15.000 | §2d |
| **Total** | **88.500 TL/yıl** | ~7.400 TL/ay |

This is funded by: (a) Jay's own pocket until €500/month in GitHub Sponsors, (b) corporate sponsorship from 1 TR AI vendor (Trendyol, Hepsiburada, Yapay Zeka Mühendisliği AŞ vb.) for the Hacktoberfest+mega line. **88k TL/yıl is the cost of recruiting ~50 PRs and 20 named contributors per year — cheaper than 1 month of a junior dev salary.**

---

## 5. Recognition surface

The contributor wall is the single highest-leverage UX surface in the entire flywheel. Promised at `/tesekkurler` (Fiyatlandırma page references it) but does not yet exist. Build:

### 5a. `/tesekkurler` page anatomy

Required sections in order:
1. **Hero**: "OllamaTR'yi mümkün kılanlar" + commit count, contributor count, PR count (pulled live from GH API, not hard-coded).
2. **Contributor wall (real)** — `all-contributors-cli` rendered grid: avatar, real GH handle (links to profile), contribution emoji legend (💻 kod, 📖 docs, 🌍 çeviri, 🎨 tasarım, 💡 fikir, 🐛 bug). Auto-generated by `all-contributors` bot on every merge.
3. **Founding 50 wall** — first 50 contributors get a permanent "Kurucu" rozeti (gold border). Scarcity creates pull.
4. **Bounty leaderboard** — top 10 by TL earned (only if they opt-in). Public proof bounty payouts are real.
5. **Mentor wall** — separate from contributors. People who answered ≥ 10 issues / Discord questions / reviewed ≥ 5 PRs in a quarter.
6. **Konferans / yayın teşekkürleri** — "OllamaTR'yi sahnede konuşanlar / yazanlar" with link to talk/blog.
7. **Şirket sponsorları** (when applicable, never fake).

### 5b. OBD-style badges (the secret weapon)

OBD-style means **Open Badge Decentralized**: each badge is a verifiable claim (Holopin compatible). Tiers:

- **İlk PR rozeti** (auto, 1 merged PR) — Holopin handles via Hacktoberfest infra
- **Türkçe Çeviri rozeti** (auto, ≥ 3 translation PRs)
- **Model Avcısı rozeti** (auto, ≥ 3 model card PRs)
- **Hata Avcısı rozeti** (auto, ≥ 3 bug-fix PRs with reproducer)
- **KVKK Bekçisi rozeti** (manual, KVKK content reviewer)
- **Mentor rozeti** (manual, mentor for ≥ 1 GFI)
- **Kurucu rozeti** (manual, first 50)
- **Konuşmacı rozeti** (manual, gave a public talk about OllamaTR)
- **Yıl Kıdemli rozeti** (auto, 1 yıl boyunca aktif)
- **Triager rozeti** (manual, see §8 ladder)
- **Maintainer rozeti** (manual, see §8 ladder)

Critical: **badges are useless unless shown somewhere external to the project**. The contributor's GitHub README via Holopin embed is where the badge actually creates value (it shows up on their professional surface for free). This is what makes contributors come back.

### 5c. Konferans shoutouts

When Jay speaks at devnot, BTK Akademi, Devs Türkiye, Kodluyoruz, BAUtech, Yapay Zeka Zirvesi:
- Top 5 contributors by name on the closing slide.
- Quote one contributor verbatim.
- "Bir sonraki katkıyı sen yap" QR → goes to a `good-first-issue` filtered list, not the repo root.

Cost: 30 seconds of stage time. Effect: every named contributor told their network they were shouted out on stage. That's recruitment.

### 5d. Quarterly "OllamaTR'nin Yüzleri" post

Every 3 months, a blog post (cross-posted to dev.to TR + Medium TR + Substack) profiling 3 contributors with their real bio, contribution count, and a 200-word Q&A. This is **free for OllamaTR, career-positive for the contributor**, which is the exchange that makes the flywheel spin.

---

## 6. Mentorship pipeline

### 6a. The matching mechanism

Goal: every new contributor has a named mentor within 7 days of their first interaction (issue, PR, Discord intro).

| Tier | Mentor | Mentee | Cadence |
|---|---|---|---|
| **Tier 1: Founder mentorship** | Jay | First 10 contributors | Async, 24h reply SLA on all touches |
| **Tier 2: Senior-to-Junior** | "Maintainer" (§8) | Tier-3 ladder members | Async via Discord DM + weekly check-in |
| **Tier 3: Peer-to-peer** | "Triager" (§8) | New contributor | Issue-by-issue Q&A |

### 6b. Office hours

- **Aylık "Sor Bana" canlı yayın** — 1st Saturday of every month, 21:00-22:00 TRT, Discord voice + YouTube live mirror. Jay + 1 maintainer answer any question. Recording posted to Türkçe AI YouTube list.
- **Haftalık "Katkı Saati"** — Saturday 14:00-15:00 TRT, Discord voice. Pair-programming on an open GFI. Anyone can join. Max 8 people. Sign-up via Discord thread reaction.
- **Hacktoberfest sırasında üç ek katkı saati** (§2b).

### 6c. Code-review SLA promise (public, on CONTRIBUTING.md)

```
PR ilk yanıt: 48 saat içinde (Hacktoberfest: 24 saat)
PR review tur süresi: 7 gün içinde (review veya merge)
İlk-Katkı PR'ları: 24 saat içinde mentor atanır
Issue ilk yanıt: 72 saat içinde
Güvenlik açığı: 24 saat içinde (SECURITY.md)
```

Missing SLA is the #1 reason contributors don't come back. **Publicly promised SLA + a public missed-SLA log is the trust-building move.** Add a `/sla` page or a section in `/tesekkurler` showing average response time per month, pulled from GH API.

### 6d. Mentor incentives

Mentors are unpaid in money but paid in:
- **Mentor rozeti** (§5b) + permanent slot on the Mentor wall
- **Reverse mentorship credit** — Jay personally writes them a LinkedIn recommendation after 5 mentee successes
- **First refusal** on paid contract work that comes through OllamaTR partnerships (e.g., a sponsor wants Türkçe LLM consulting — first ask the mentor pool)
- **Conference speaking slot opportunities** that OllamaTR receives but Jay can't take

---

## 7. Documentation gap as contributor onramp

This is the highest-volume contributor channel for a non-English project. Ollama upstream docs are English. Türkçe translation is mechanical, paralleliable, low-conflict — perfect for scaling contributors.

### 7a. Translation track structure

Setup:
1. Fork-style `docs/tr/` directory mirroring upstream `ollama/ollama/docs/` paths.
2. Each Türkçe page has YAML frontmatter: `upstream_path`, `upstream_commit_hash`, `translator`, `last_review_date`.
3. CI job: `scripts/check-translation-drift.ts` — if upstream commit > 30 days newer than `upstream_commit_hash`, file an issue auto-labelled `türkçe-çeviri` + `drift`.
4. Glossary in `docs/tr/glossary.md` — bağlayıcı: "embedding → gömme", "fine-tune → ince ayar", "quantization → niceleme", "context window → bağlam penceresi", "inference → çıkarım". Translator must follow glossary or override with reasoning in PR.
5. Style guide in `docs/tr/style.md` — sen/siz, "GitHub" vs "Github" capitalization, code-fence Türkçe-yorum policy.

### 7b. Upstream pages to translate first (priority order)

1. `README.md` (Ollama landing) — highest external traffic
2. `docs/import.md` (model import) — most-asked Türkçe forum question
3. `docs/modelfile.md` — critical for "Türkçe sistem prompt'u nasıl yazılır"
4. `docs/api.md` — Türkçe API rehberi unlocks Türkçe dev integrators
5. `docs/openai.md` (OpenAI compatibility) — high-traffic from Türkçe ChatGPT migrants
6. `docs/gpu.md` — hardware threads dominate Türkçe Reddit
7. `docs/troubleshooting.md` — long-tail SEO win
8. `docs/development.md` — recruits contributors who become OllamaTR contributors

### 7c. Why this is the perfect onramp

- **Atomic:** 1 page = 1 PR. No coordination required.
- **Verifiable:** reviewer compares to upstream + glossary; no taste fight.
- **Türkçe-native skill:** non-coders (Türkçe öğretmenleri, çevirmenler, tech writers) can contribute. The contributor population is 10x larger than the dev-only population.
- **SEO compounding:** every translated page is a permanent search-traffic asset for OllamaTR.
- **Upstream goodwill:** Jay maintains a friendly relationship with `ollama/ollama` by occasionally upstreaming TR-specific fixes (e.g., Turkish tokenizer edge cases, Türkçe model card link in registry).
- **Bounty-friendly:** each translation page = 750-1.500 TL (§4b küçük tier). Predictable, fair, no scope drift.

### 7d. Long-term: Türkçe Ollama dokümantasyon sitesi

Target end of 2027: `docs.ollamatr.dev` (Docusaurus) hosting the fully translated Türkçe Ollama docs + OllamaTR-specific extensions. Becomes the canonical Türkçe resource. SEO wins on "ollama türkçe", "yerel llm türkçe kurulum", "modelfile türkçe örnek". This is what locks in market leadership — when someone Googles "ollama nasıl kurulur Türkçe", OllamaTR's docs are the answer, not Ollama upstream.

---

## 8. Contributor ladder

Inspired by Kubernetes / Rust / Astro ladders, scaled down for a project of OllamaTR's size.

### 8a. Tiers

| Tier | Title | How you get there | What you can do | Voting rights |
|---|---|---|---|---|
| 1 | **Üye** (Member) | Join Discord + ≥ 1 merged PR (any size) | Open issues, comment on PRs, vote in "topluluk istek" polls | 1 vote in feature/UX polls |
| 2 | **Triager** (Triajer) | ≥ 5 merged PRs OR ≥ 25 issues triaged/labeled | Apply labels, close duplicates, request changes on PRs, lead a Katkı Saati | 1 vote in roadmap polls + can second a maintainer nomination |
| 3 | **Maintainer** (Bakımcı) | Nominated by an existing maintainer + seconded by a triager + ≥ 3 months active + ≥ 20 merged PRs OR ≥ 10 PR reviews + Code of Conduct attestation | Merge PRs in their domain (docs / UI / models / KVKK), close issues, propose RFCs, mentor formally, sign releases | 1 vote in maintainer-only decisions (RFC approval, ladder promotions, governance changes) |
| 4 | **Steward** | Maintainer for ≥ 1 year + carries a domain (docs lead, KVKK lead, models lead) | Full repo write access, can call governance votes, public face of the project | Tie-break vote in maintainer council |

### 8b. Required actions per tier (concrete monthly minimums)

| Tier | Monthly minimum to retain status |
|---|---|
| Üye | None. Status is permanent. |
| Triager | 5 issue triage actions OR 1 merged PR. 2 missed months → demote to Üye. Easy re-promote. |
| Maintainer | 2 PR reviews OR 1 merged feature PR OR attendance at the aylık "Sor Bana". 3 missed months → "emeritus" (no demotion shame, just removed from active rotation). |
| Steward | Run their domain's quarterly review. 1 quarter missed → maintainer council nominates replacement. |

### 8c. Governance file

`GOVERNANCE.md` in repo root specifies:
- The ladder above (canonical)
- Maintainer council = all Tier 3 + Tier 4
- Decisions: lazy consensus (no objection in 72h = pass). Contested decisions: maintainer vote, simple majority.
- Code of Conduct enforcement: 3-person rotating panel, decisions logged in private repo, summary published quarterly.
- Maintainer ejection: nominated by 2 maintainers, decided by maintainer council ⅔ majority. CoC violations: same panel, decisions binding.
- **BDFL clause (temporary).** Until there are ≥ 3 Tier-3 maintainers other than Jay, Jay retains a unilateral veto on architecture and security decisions. This sunsets automatically when ladder is full.

### 8d. Public ladder page

Render the ladder live at `/topluluk/merdiven` showing current count at each tier, named members, and "next promotion candidates" (publicly visible — creates aspirational pull). This is the legible career path that converts hobbyist contributors into long-term maintainers.

---

## 9. Named first-contributor candidates (30 humans)

Research compiled from public GitHub, X, LinkedIn, HF, and academic profile signals. Each row lists the person, why they fit, which §1c task to ask them to do, and which channel to reach them on. All names appear in public Türkçe NLP / AI ecosystem material cited above — none is private speculation.

> Use this as a CRM. Each row is a named DM. Personalize the ask. Track replies in a private sheet.

### Tier A — anchor names (DM personally, week 1)

| # | Name | Public handle | Why they fit | Suggested first ask | Channel |
|---|---|---|---|---|---|
| 1 | **Duygu Altınok** | `DuyguA` (GitHub), Google Developer Expert, Mastering spaCy author, turkish-nlp-suite maintainer | THE Türkçe NLP maintainer. Already maintains the spaCy TR stack. If she stars OllamaTR, the entire ecosystem notices. | Review the `docs/tr/glossary.md` glossary PR + give a quote we publish on `/tesekkurler`. Then ask for a model-card PR for `tr_core_news_trf`. | LinkedIn DM + DataTalks.Club referral path |
| 2 | **Stefan Schweter** | `stefan-it` (GitHub), BERTurk creator | Foreign Türkçe-NLP maintainer with massive credibility (BERTurk = the encoder for TR). Asking him to review the BERTurk model card legitimizes the model-card track. | Review issue #X (BERTurk model card). | GitHub issue mention |
| 3 | **Murat Karakaya** | `kmkarakaya`, `Murat-Karakaya`, "Murat Karakaya Akademi" YouTube, Prof. Dr. at TED Üniversitesi | Türkçe AI educator with both Türkçe and English audiences. Plausible TÜBİTAK 2237-A PI (§3). One YouTube mention = ~1000 visitors. | Co-author a "Yerel LLM Türkçe rehber" YouTube video. Also: explore 2237-A. | LinkedIn DM, follow up email via TED Üniv |
| 4 | **Emrecan Acıkgöz** | `emrecanacikgoz` (GitHub), "Bridging the Bosphorus" / Hamza LLM author | Built the Hamza Türkçe LLM series scientifically. Academic credibility. | Review the Hamza-xlarge model card PR. | GitHub mention + paper email |
| 5 | **Ahmet Mert Aydın (agmmnn)** | `agmmnn` (GitHub), `turkish-nlp-resources` maintainer | He maintains *the* Türkçe NLP resource list. Getting OllamaTR added to that list = permanent backlink. He merges curation PRs. | Open a PR to `turkish-nlp-resources` adding OllamaTR. Then ask him to add a "tools" entry. | GitHub PR |
| 6 | **Mesut Kesimoğlu (kesimeg)** | `kesimeg` (GitHub), `awesome-turkish-language-models` maintainer | Same logic as #5, different list. | PR to `awesome-turkish-language-models` adding OllamaTR. | GitHub PR |
| 7 | **Eren Gölge** | `erogol` (GitHub), Coqui TTS founder | The reference for "single named TR OSS operator who succeeded". His endorsement = social proof + technical credibility. | Ask for a 1-line quote on `/tesekkurler` or `/hakkimizda`. Don't ask for code; his time is too valuable. | X DM or GitHub Discussion mention |
| 8 | **Kemal Oflazer** | CMU Qatar faculty page | Senior Türkçe NLP academic. A 2-line endorsement legitimizes the academic angle. | Ask for the Foreword to a `docs/tr/about-turkish-nlp.md` page. | Email via CMU |

### Tier B — model-card and translation specialists (DM week 2-3)

| # | Name | Public handle | Why they fit | Suggested first ask | Channel |
|---|---|---|---|---|---|
| 9 | **Okan Çiftçi** | `okanvk` (LinkedIn), Trendyol LLM team | Public co-announcer of Trendyol-LLM. Could PR the Trendyol model card himself. | Trendyol-LLM-8B-T1 model card PR. | LinkedIn DM |
| 10 | **Emre Tolga Ayan** | LinkedIn, Trendyol LLM team | Same. | Trendyol-LLM-Asure-12B card. | LinkedIn DM |
| 11 | **arift** | Hugging Face user (Trendyol-LLM-Asure-12B publisher) | Active Trendyol LLM contributor on HF. | Asure-12B card review. | HF profile message |
| 12 | **Arda Yüksel** | `ArdaYueksel` (GitHub), TurkishMMLU author | Maintains the benchmark every TR LLM is judged by. Adding TurkishMMLU benchmark scores to OllamaTR model cards needs his blessing. | Review benchmark-display PR. | GitHub mention |
| 13 | **Cosmos Yapay Zeka Araştırma Grubu (YTÜ)** | Yıldız Teknik Üniversitesi research group, Türkçe-e5-Large publisher | Active TR embedding model team. | Türkçe-e5-Large model card + a benchmark page entry. | Email via YTÜ faculty |
| 14 | **Asim Sinan** | `asimsinan` (GitHub), `LLM-Research/Turkiye.md` author | He maintains an LLM-research repo with TR content. Cross-link target. | PR adding OllamaTR to his Turkiye.md. | GitHub PR |
| 15 | **nanelimon-organization (TurkishNLPGuide)** | `nanelimon-organization` GitHub org | Maintains a Türkçe NLP guide. | Add OllamaTR to the guide. | GitHub PR |
| 16 | **Ogulcan Aydoğan** | `ogulcanaydogan` (GitHub), "Turkish-LLM" 7B/14B project | Open-sourced Türkçe LLM with GGUF for Ollama. Natural collaborator — his model should ship in OllamaTR's curated list. | Ask for a model card + a "deploy ile OllamaTR" demo. | GitHub issue mention |
| 17 | **WiroAI team** | `WiroAI` HF org (wiroai-turkish-llm-9b) | Wiro shipped a Türkçe-fine-tuned 9B. Listed maintainer would PR the card. | Wiroai model card PR. | HF + GitHub |

### Tier C — community / educator / student onramps (week 3-6)

| # | Name | Public handle | Why they fit | Suggested first ask | Channel |
|---|---|---|---|---|---|
| 18 | **Deep Learning Türkiye admin team** | DLTR Medium + Telegram + GitHub org | They translate AI papers to Türkçe as their flagship activity. Perfect alignment. | Cross-post an OllamaTR launch article on DLTR Medium. | DLTR Telegram admin DM |
| 19 | **Türkiye Yapay Zeka İnisiyatifi (TRAI)** | turkiye.ai admins | Industry body. Their "Türkiye AI girişimleri haritası" should list OllamaTR. | Submission form / email to add OllamaTR. Speaking slot follow-up. | turkiye.ai contact form |
| 20 | **GDG Istanbul / Ankara ML lead** | Google Developer Groups TR | They run monthly ML meetups. Speaking slot = 50 devs in one evening. | "OSS Ollama wrapper for Türkçe" 20-minute talk pitch. | gdg.community.dev profile DMs |
| 21 | **ITU AI Club (board)** | itu.edu.tr club page, IG `@ituyzk` | Run hackathons and workshops. Section §1c day 5-7 fits exactly here. | Co-host "İlk OSS PR'ım" workshop. | Club Instagram/email |
| 22 | **ODTÜ AI Society** | metu.edu.tr / Discord | Same. | Same. | Email/Discord |
| 23 | **Boğaziçi AI Society** | boun.edu.tr | Same. | Same. | Email |
| 24 | **Bilkent AI** | bilkent.edu.tr | Same. | Same. | Email |
| 25 | **Kodluyoruz açık kaynak track lead** | kodluyoruz.org admin | Run paid bootcamps; bootcampers need real bitirme projects. | Position OllamaTR as a bitirme substrate (§3). | Form on kodluyoruz.org |

### Tier D — tech writers / content creators (week 4-8)

| # | Name | Public handle | Why they fit | Suggested first ask | Channel |
|---|---|---|---|---|---|
| 26 | **devnot.com editör ekibi** | devnot.com submissions | Türkçe tech writing platform with strong SEO. | "Yerel LLM ile Türkçe asistan" article submission. | devnot.com submission form |
| 27 | **Webrazzi editor (AI vertical)** | webrazzi.com — they already cover Türkçe AI models | They covered Trendyol-LLM, Cosmos. OllamaTR is a natural follow-up story. | Press email when v1.0 ships (post-cold-start). | webrazzi editorial email |
| 28 | **Burak Su** | Substack, Kroppa Digital partner | TR Substack AI/tech writer with audience. | Newsletter mention swap. | Substack DM |
| 29 | **Atılım Dijital, Masqot blog yazarları** | Both publish Türkçe AI tooling articles | Distribution. | Pitch a guest post or a tool-roundup inclusion. | Email |
| 30 | **Türkiye Açık Kaynak Platformu speaker pool** | turkiyeacikkaynakplatformu.com | They run "Açık Seminer" sessions. | Speaker slot pitch. | Platform contact form |

### How to use this list (operational rules)

- **One named DM per day. No mass mail.** Personalize every message. Acknowledge their specific recent work.
- **Always ask for one small, specific thing.** Not "join the community" — "review issue #47, it's about your BERTurk model card."
- **Track in a private sheet:** name, contacted date, response, follow-up date, asked-for, delivered. Re-ask in 30 days if no reply, then move on.
- **The list is private.** Do not publish it. Publishing the target list reads as cynical. Talk only about the people who *say yes* (on `/tesekkurler`).

---

## Summary — top 3 highest-impact flywheel moves

The single highest-leverage move is to **ship the 5 governance files + 30 named `good first issue` tickets + functional `/tesekkurler` + `all-contributors` bot before any outreach**, then immediately spend Week 1 on Tier-A named DMs (Duygu Altınok, Stefan Schweter, Murat Karakaya, agmmnn, kesimeg) asking each for one tiny verifiable PR or curation-list inclusion — because in a small, named Türkçe-NLP ecosystem, 6 anchor endorsements buy the next 100 contributors organically. Second, **stand up the Ollama upstream docs Türkçe translation track** (§7) as the always-on contributor onramp: it is mechanical, parallelizable, paying 750-1.500 TL/page via Papara/IBAN (§4), produces permanent SEO assets, and converts non-coders (öğretmenler, çevirmenler) into the population that the ladder (§8) graduates into Triagers and Maintainers — this is what gets the contributor count from 10 → 100. Third, **publicly commit to and instrument the 48-hour PR response SLA** with a live `/sla` page pulled from GH API, and pair it with a permanent contributor wall, OBD/Holopin badges shown on contributors' own GitHub READMEs (§5b), and quarterly "OllamaTR'nin Yüzleri" profile posts — because contributors return when contributing is career-positive for them, not just for the project.

**STOP.**
