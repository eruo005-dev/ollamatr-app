# How OllamaTR Becomes the Biggest Ollama Community in Turkey

**Master synthesis of 15 native superagents** — contributor flywheel · academic · content · vertical · grants · founder brand · upstream · HF-TR · IP · sales · hardware · evals · mobile · conferences · diaspora.
**Date:** 2026-05-26.
**Note on orchestration:** Per the operator's CLAUDE.md guard (verified 2026-05-31), this entire 15-agent run executed on native Claude. B14 hit a tampered Claudestore response mid-run and correctly escalated to native rather than fall through to ecomagent. Guard worked as designed.

---

## TL;DR

The 15-agent panel converged hard on a single thesis: **OllamaTR can credibly own the Türkçe local-AI category in 12-18 months IF — and only if — three foundational moves happen in Week 1.** Every report — vertical strategy, eval moat, academic, hardware, grants, sales — assumes these three are done. Without them, all downstream work is built on sand.

The three Week-1 prerequisites:
1. **Incorporate as Ltd. Şti.** (NACE 62.01 + 72.19) — gates ~₺3.5-4M of non-dilutive funding [B5]
2. **File TÜRKPATENT marka in classes 9 + 42** + claim 11 social handles + buy 8 TLDs — Ollama Inc. trademark policy is now publicly documented as "we ask developers to use a different name" [B7, B9]
3. **Land the first 3 Ollama upstream PRs** (Turkish char preservation + community-models doc + unicode canonicalization) — establishes "trusted upstream contributor" status BEFORE the trademark conversation [B7]

Once those land, the 12-month plan is execution. Y1 budget: **~₺3.5M revenue + grants** against **~₺350K total spend** (incorporation + IP + content + events + tooling).

---

## The convergent thesis

Every agent independently arrived at the same set of high-conviction beliefs:

| Belief | Evidence agents converged from |
|--------|-------------------------------|
| **The wedge is not "Ollama for Türkçe" — it's "sovereign Türkçe AI builder"** | B6 (founder brand), B7 (upstream), B15 (Turkic diaspora) |
| **e-Fatura / KOBİ Muhasebe RAG is the right first vertical** — not Hukuk (TAM trap), not Sağlık (Madde 6 moat but 9mo R&D) | B4 vertical analysis |
| **VUK Madde 5 (vergi mahremiyeti) is the same "cloud rakipler giremez" moat that Madde 6 gives Sağlık** — without the medical-device blocker | B4 |
| **Distribution is academic + KOBİ — not LinkedIn shouting** | B2 (10 labs, 6 MOUs), B10 (mali müşavir channel), B14 (Devnot + Kodluyoruz) |
| **Ollama Inc. trademark is existential and being-on-the-clock** — file TÜRKPATENT this week | B7 (issue #12285 verbatim policy), B9 (rebrand Plan-B at 23/25 score) |
| **The eval harness IS the moat** — uncopiable, press-friendly, academic-anchored | B12 (TR-KVKK-Refusal + TR-Dialect) |
| **The brand survives the name change** — Bora AI is pre-scored at 23/25 | B9, B15 |
| **Skip mobile for 90 days** — finish Tauri desktop, then PWA bridge | B13 |
| **Hardware play is NPU laptops, not datacenters** — TR has no H100 at scale until ~2029 | B11 |
| **Y2 expansion is Azerbaycan, not English** — closest language, post-Karabağ tailwind, +24M TAM | B15 |

---

## The 90-day single thread

S2's prior conclusion ("ship the Tauri installer") stands. But the 15-agent panel sharpens it:

**Days 1-7: Foundation week (concurrent, all critical-path)**
- Mon: 11-platform social handle blitz (3 hrs, free) [B9]
- Tue-Wed: TÜRKPATENT marka filing classes 9+42 via Moroğlu Arseven (~₺20K, 10-14 mo tescil) [B9]
- Wed: Incorporate as Ltd. Şti. + İSMMMO for accountant onboarding [B5]
- Thu: Buy 8 must-have TLDs (~₺8.4K/yr) [B9]
- Fri: Email Michael Chiang at `michael@ollama.com` for coexistence framework (don't ask, propose) [B7]

**Weeks 2-12: Three parallel tracks**

**Track A — Real product (S2's pick stays)**
- Tauri installer v0.2 target — first downloadable thing
- Week 1-2: Tauri 2 scaffold, IPC, frontend wiring
- Week 3-4: System probe (OS/RAM/disk/GPU, Türkçe error messages)
- Week 5-6: Model download flow + KVKK consent gate
- Week 7-8: First-run wizard (reuses HangiModel logic)
- Week 9-10: Open WebUI auto-launch
- Week 11-12: macOS notarization ($99/yr) + GitHub Releases auto-update

**Track B — Upstream credibility (B7)**
- Week 2: PR #1 — `runner: preserve multi-byte Turkish chars` (~150 LoC, near-certain merge)
- Week 5: PR #2 — `docs: community-models-turkish.mdx` (Trendyol-LLM, KOCDigital, Cosmos-LLaMA, YTUCE catalog)
- Week 9: PR #3 — `types/model: unicode canonicalization` (~80 LoC)
- Goal: 3 merged PRs + `jmorganca` / `mxyng` recognition BEFORE trademark conversation matures

**Track C — Eval harness Phase 1 (B12)**
- Week 1-4: assemble existing public benchmarks (MMLU-TR, Hellaswag-TR, BELEBELE-TR, MT-Bench-TR, GSM8K-TR) into unified runner
- Week 5-8: nightly runs across catalog at `ollamatr.com.tr/bench`
- Week 9-12: launch with HF Türkiye co-promotion (B8 ask delivers blog post)

**Days 90 retrospective check:**
- 1 downloadable installer
- 3 upstream PRs merged
- Public eval leaderboard live
- TÜRKPATENT marka filed + Ltd. Şti. registered
- 5 mali müşavir partners signed (B10) [if sales motion starts Day 60]
- BIGG + KOSGEB applications submitted (B5)

---

## Year-1 budget rollup

| Category | Spend | Source |
|----------|-------|--------|
| **Incorporation + ongoing accounting** | ₺40K | B5 |
| **TÜRKPATENT marka + 8 domains + IP retainer (Moroğlu Arseven)** | ₺86-92K | B9 |
| **Content engine (Y1)** | ₺120K (~$3.75K) | B3 |
| **Inaugural TR Yerel Yapay Zeka Buluşması (Aralık 2026, İTÜ ARI)** | ~₺100K (3 sponsors cover) | B14 |
| **Conference speaker fees + travel (5 events)** | ~₺30K | B14 |
| **Newsletter media spend (Devnot + Pat Pat + Open Source TR)** | ≤₺30K | B14 |
| **Eval harness compute (~500 H100-hours nightly nominal)** | ~₺50K (negotiate Cohere/Anthropic compute donation) | B12 |
| **Sales tools + LinkedIn Sales Nav + CRM** | ₺25K | B10 |
| **Bounty pool (12 months @ 750-1500 TL/page docs translation + good-first-issue payouts)** | ~₺60K | B1 |
| **TOTAL spend** | **~₺350K** | — |

**Revenue inflows (target Y1):**

| Stream | Amount | Notes |
|--------|--------|-------|
| **KOSGEB Ar-Ge + İnovasyon** | up to ₺6M hibe+kredi | ~55% odds [B5] |
| **TÜBİTAK 1512 BIGG** | ₺250K | ~40% odds, gateway |
| **TÜBİTAK 1507** | ₺600K | ~50% odds, stackable |
| **e-Fatura vertical SaaS** | ₺180K ARR (100 SMMM × ₺1,799) | 90-day target [B4] |
| **First 10 KOBİ contracts** | ₺250K-600K (10 × ₺25-60K kurulum) | 6-mo post-incorporation [B10] |
| **Risk-adjusted Y1** | **~₺2.5M-3.5M** | conservative |

Net: **~₺2.2M-3.2M positive** in Y1 if execution holds. That's a venture-backed startup's worth of runway, fully bootstrapped via grants + first contracts.

---

## The 12-month execution calendar

| Month | Anchor | Track A (Product) | Track B (Brand/Community) | Track C (Revenue) |
|-------|--------|-------------------|---------------------------|---------------------|
| **M1** | Foundation | Tauri scaffold | TÜRKPATENT filed, social handles claimed, 3 governance files shipped, 30 "good first issue" tickets | Ltd. Şti. registered, İSMMMO accountant onboarded, BIGG application drafted |
| **M2** | First Code | System probe + KVKK gate | Upstream PR #1 (Turkish chars) submitted, Anchor DMs to Duygu Altınok + agmmnn + Stefan Schweter | KOSGEB Ar-Ge submitted, first mali müşavir partner outreach (TÜRMOB Top 10) |
| **M3** | First Voice | Model download flow | Devnot Day talk submission, podcast guest #1 (Geek Lounge), YouTube channel launch | TÜBİTAK 1507 submission, first 3 mali müşavir partner contracts signed |
| **M4** | First Users | First-run wizard + Open WebUI launcher | Upstream PR #2 (community-models doc), HF Türkiye outreach email to Merve Noyan | First 5 KOBİ pilots (₺15K each), first inbound demo requests |
| **M5** | Eval moat | Code signing, GitHub Releases | Eval harness Phase 1 launch + HF co-promotion blog | First 3 KOBİ contracts closed (₺75K rev), 30K LinkedIn impressions |
| **M6** | İTÜ Summit | Tauri installer v0.2 ships | İTÜ AI Summit talk + Boğaziçi NLP MOU + 5 academic interns onboarded | KOSGEB hibe decision (target: positive), Çerçeve sözleşmesi v1 |
| **M7** | TR Yerel scale | Per-model pages + benchmark integration | Founder podcast launches ("Yerel"), upstream PR #3 merged | Mali müşavir channel expansion (15 partner offices), pilot → contract conversion %65 |
| **M8** | Vertical launch | e-Fatura RAG vertical product | Trade press hit: "İlk açık TR LLM benchmark" | e-Fatura SaaS GA, target 100 SMMM signups → ₺180K ARR run rate |
| **M9** | KOBİ scale | API gateway + dashboard | Devnot Day talk delivered (200+ attendees), HF blog co-authored | 10th KOBİ contract closed (₺250K-600K cumulative rev) |
| **M10** | Academic anchor | RAG kit + prompt library | TÜBİTAK 1505 application with İTÜ co-PI (eval harness as backbone) | First TR LLM benchmark workshop submission to EMNLP TR |
| **M11** | PWA mobile | PWA chat client beta (`chat.ollamatr.com.tr`) | Conference sponsorship: 1 mid-tier event (Devnot or DevDays) | Q3 hukuk vertical pilot starts (3 hukuk büroları) |
| **M12** | TR Yerel Buluşma | Annual roadmap retrospective + v1.0 candidate | **TR Yerel Yapay Zeka Buluşması (İTÜ ARI, 150 attendees)** | Q1 2027 plan: Azerbaycan beta, Casper OEM kickoff, Plan-B brand readiness check |

---

## The 4-phase household-name path (updated from S3)

| Phase | Window | Anchor product moves | Anchor brand moves | Anchor revenue moves |
|-------|--------|---------------------|---------------------|----------------------|
| **1: Hobby that LOOKS pro** | 0-3 mo | Tauri installer v0.2, 3 upstream PRs, eval harness Phase 1 | TÜRKPATENT filed, 11 handles claimed, social media boot, "sovereign TR AI" framing | First grants in pipeline, Ltd. Şti. live |
| **2: Tools devs choose first** | 3-6 mo | Per-model pages, benchmark integration, RAG kit | Devnot Day talk, HF blog co-authored, Bora mascot launch, mahalli ağız eval viral hit | KOSGEB hibe + first mali müşavir contracts |
| **3: Name KOBİ owners ask about** | 6-12 mo | e-Fatura vertical SaaS, KOBİ dashboard, API gateway | Annual TR Yerel Yapay Zeka Buluşması (150 ppl), first case studies, Casper OEM convo | ₺3M+ rev, 10+ KOBİ contracts, 100+ SMMM users |
| **4: "Turkish AI = OllamaTR"** | 12-24 mo | Bora-prefixed sub-brands (Bora installer, Anadolu Bulut, Fırın fine-tune), Azerbaycan beta, Casper "AI SKU" launch | National press, podcast-tour completion, sponsored hackathons in 3 cities, ASELSAN/HAVELSAN conversation (if politically safe) | ₺15M+ rev, 50+ KOBİ contracts, first international (AZ) revenue |

---

## Consolidated risk register

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|-----------|
| **Ollama Inc. sends C&D forcing rebrand** | High (issue #12285 verbatim policy) | Brand equity loss | (a) File TÜRKPATENT this week to argue prior use, (b) propose coexistence first as upstream contributor, (c) Plan-B "Bora AI" pre-scored 23/25, pre-reserve domains [B7+B9] |
| **TÜBİTAK / KOSGEB grant rejection** | ~45-55% per grant | Loss of ₺250K-6M | Apply 4 in parallel (BIGG + 1507 + KOSGEB Ar-Ge + EIC); incorporate as Ltd. Şti. before application (gates eligibility) [B5] |
| **Solo founder burnout** | Medium-High | Project death | First contributor hire by M6 (eval lead role); Holopin badges + 48hr SLA flywheel for OSS volunteers; mali müşavir channel reduces personal sales burden [B1, B6] |
| **Competitor launches in TR market** | Medium (LM Studio TR / Jan TR / domestic clone) | Market share dilution | The Türkçe + KVKK + sovereign + named-operator quad-moat is hard to clone. Move fast on eval harness — first-mover lock-in. [B12, S3] |
| **KVKK Kurulu enforcement against the operator** | Low (community project + clean Aydınlatma Metni) | Fine up to ~9.4M TL + reputation | Already mitigated in current codebase. Annual KVKK audit reminder. [Legal-1] |
| **Mali müşavir channel doesn't activate** | Medium | KOBİ pipeline collapses | Pivot to direct LinkedIn outbound (B10 backup) + e-Fatura SaaS direct sales |
| **Trademark "well-known mark" oppostion by Ollama Inc.** | Medium (m.6/3 well-known argument) | TÜRKPATENT denial | Plan-B Bora AI ready, retainer Moroğlu Arseven primary for defense [B9] |
| **Eval harness gets out-competed by HF TR or Trendyol** | Low-Medium | Lose moat | Move fast (Phase 1 in 30 days), get academic co-PI lock-in (M3), submit to EMNLP TR workshop M10 [B12] |
| **Casper / hardware OEM partnership stalls** | Medium-High (TR OEM relationships are slow) | Y3 revenue ceiling | Default to NPU laptop reference build + direct-to-consumer marketing; revisit OEM Y2 [B11] |
| **Azerbaycan expansion blocked by Turkic-political complications** | Low-Medium | Y2 international revenue delayed | Lead with sovereignty framing not Pan-Turkic rhetoric [B15] |

---

## Top 10 highest-leverage actions ranked

Synthesized from 15 reports, ranked by (impact × ease × time-to-execute):

1. **Week 1 foundation bundle** — TÜRKPATENT filing + 11 handles + 8 domains + Ltd. Şti. registration + Ollama Inc. outreach email. Cost: ~₺28K + 5 days. Unlocks everything downstream. [B5, B7, B9]
2. **Ship Tauri installer v0.2 in 12 weeks** — converts marketing site into real product, fixes 404 download CTA, enables every downstream play. [S2 + B7]
3. **Land Ollama upstream PR #1 (Turkish chars) in 30 days** — near-certain merge, establishes "trusted contributor" before trademark talk. [B7]
4. **Sign 5 mali müşavir partners by M3** — converts ₺0 marketing budget into 250+ KOBİ pipeline. [B10]
5. **Launch eval harness Phase 1 at `ollamatr.com.tr/bench`** in 30 days — uncopiable moat, press magnet, academic anchor. [B12]
6. **Send the Merve Noyan / HF Türkiye partnership email** with the 3 specific offers (KVKK metadata, TR docs translation, one-tap installer for HF models). [B8]
7. **Apply for BIGG + KOSGEB + TÜBİTAK 1507 in M1-M3** — stack ₺3M+ non-dilutive runway. [B5]
8. **Recruit first 6 contributor anchors** via warm DMs to Duygu Altınok + agmmnn + Stefan Schweter + Murat Karakaya + kesimeg — 6 anchor endorsements buy the next 100. [B1]
9. **Ship the e-Fatura RAG vertical as 4-week MVP by M5** — first real revenue, ₺180K ARR target in 90 days. [B4]
10. **Sign first academic MOU (İTÜ NLP or Boğaziçi NLP) by M6** — academic credibility unlock + paper byline pipeline. [B2]

---

## What to do EXPLICITLY NOT to do (consolidated red lines)

- **Don't open a `README.tr.md` PR upstream** — Chinese README PR #14871 stalled 2.5mo silently. Localization PRs are silently rejected, not visibly declined. [B7]
- **Don't propose `OLLAMA_LANG=tr` env var to Ollama** — CONTRIBUTING.md explicitly says new env vars are "harder to maintain." Defer 12+ months and ship in OllamaTR wrapper. [B7]
- **Don't sponsor Yapay Zeka Zirvesi** — ₺75K floor blows the entire ₺80K event budget. Speak-only. [B14]
- **Don't submit TechCrunch Disrupt 2026** — ineligible (no entity, no rev). Document only. [B14]
- **Don't pursue ASELSAN / Baykar** in Y1 — political risk > revenue. Document as Y3 option. [B11]
- **Don't expand to English in Y2** — dilutes "sovereign Türkçe AI" brand. Azerbaycan first. [B15]
- **Don't open Sağlık (medical) vertical in Y1** — needs Whisper-tr fine-tune + MDR cihaz statüsü grey area (9-12mo R&D). Defer to Y2 with funded fine-tune. [B4]
- **Don't list ASELSAN / KOSGEB / TÜBİTAK / Teknopark İstanbul as "partners"** anywhere on the site without an actual MOU — already in production-readiness fix history. The new partner list is empty + honest. [G2, R1]
- **Don't launch mobile app in Y1** — distracts from Tauri desktop. Y2 PWA, Y3 native Android. [B13]
- **Don't sell perpetual licenses to KOBİ** — sub model preserves recurring revenue and upgrade path. [B10]

---

## The single sentence

> *OllamaTR becomes the biggest Ollama community in Turkey by being the only entity that is simultaneously (1) a trusted Ollama upstream contributor with merged PRs, (2) the operator of Türkçe LLM-Bench, (3) Türkiye's KVKK-Madde-5-defensible KOBİ AI install partner via mali müşavirler, (4) the academic distribution arm for 6+ TR NLP labs, and (5) the named gerçek-kişi Veri Sorumlusu under KVKK — a quintuple-moat no foreign competitor can copy and no domestic competitor has assembled.*

That's the strategic position. The 15 reports below tell you exactly how to assemble each piece.

---

## Reading order if you only have 30 minutes

1. **This document** (10 min)
2. **[biggest-b5-grants-playbook.md](biggest-b5-grants-playbook.md)** — the ₺3.5M funding unlock, gated on Ltd. Şti. (5 min)
3. **[biggest-b7-ollama-upstream.md](biggest-b7-ollama-upstream.md)** — trademark policy + the 3 PRs that buy you a seat at Ollama Inc.'s table (5 min)
4. **[biggest-b9-ip-moat.md](biggest-b9-ip-moat.md)** — Week 1 IP action plan (5 min)
5. **[biggest-b4-vertical-deepdive.md](biggest-b4-vertical-deepdive.md)** — why e-Fatura is the right first vertical (5 min)

If you have another hour: **B12 (Eval)** → **B10 (KOBİ sales)** → **B2 (Academic)** → **B6 (Founder brand)**.

If you have another 90 minutes: **B1 (Contributor flywheel)** → **B3 (Content)** → **B8 (HF)** → **B14 (Conferences)** → **B11 (Hardware)** → **B13 (Mobile)** → **B15 (Turkic diaspora)**.

---

## Full report index

| # | Report | One-line takeaway |
|---|--------|-------------------|
| B1 | [Contributor flywheel](biggest-b1-contributor-flywheel.md) | 5 named anchor DMs + Türkçe docs translation bounty (750-1500 TL/page) + 48hr SLA → 10→100 contributor path |
| B2 | [Academic playbook](biggest-b2-academic-playbook.md) | 70/30 revenue + byline-shared distribution with 10 labs; 6 MOUs / 12 interns / 3 paid pilots target |
| B3 | [Content engine](biggest-b3-content-engine.md) | Weekly YouTube + monthly podcast + own "Yerel" podcast M6 launch; ₺120K Y1 budget |
| B4 | [Vertical deep-dive](biggest-b4-vertical-deepdive.md) | **WINNER: e-Fatura/SMMM RAG**. ₺180K ARR / 90 days target |
| B5 | [Grants playbook](biggest-b5-grants-playbook.md) | KOSGEB + BIGG + 1507 stack = ~₺3.5-4M non-dilutive. **GATING: Ltd. Şti.** |
| B6 | [Founder brand OS](biggest-b6-founder-brand.md) | "Sovereign TR AI builder" framing. LinkedIn for revenue / X for credibility / self-hosted blog for sovereignty |
| B7 | [Ollama upstream](biggest-b7-ollama-upstream.md) | 3 PRs (Turkish chars + community-models doc + unicode) before trademark talk |
| B8 | [Hugging Face partnership](biggest-b8-huggingface-partnership.md) | Merve Noyan email: KVKK metadata + TR docs + one-tap installer → HF blog + collection + logo |
| B9 | [TÜRKPATENT IP moat](biggest-b9-ip-moat.md) | Week 1: marka classes 9+42 + 11 handles + 8 domains + Moroğlu Arseven retainer |
| B10 | [KOBİ sales motion](biggest-b10-kobi-sales.md) | Mali müşavir channel + 30-day pilot + LinkedIn outbound = 10 contracts / 6 months |
| B11 | [Hardware partnerships](biggest-b11-hardware.md) | Casper NPU laptops + TT-Cloud + Vargonen quick-wins; skip ASELSAN |
| B12 | [Eval harness](biggest-b12-eval-harness.md) | TR-KVKK-Refusal + TR-Dialect + unified runner = canonical TR LLM scoreboard |
| B13 | [Mobile + offline](biggest-b13-mobile-offline.md) | Skip 90d → PWA M4-6 → Cloud-TR M6-9 → Android Y2 → iOS Y2.5 |
| B14 | [Conferences + newsletters](biggest-b14-conferences-newsletters.md) | Devnot + DevDays + Kodluyoruz triad; Yapay Zeka Zirvesi too expensive |
| B15 | [Turkic diaspora](biggest-b15-turkic-diaspora.md) | Bora AI master brand Y2 + Azerbaycan first via ADA/PASHA + Kazakistan via ISSAI co-brand |

---

*Generated by the 15-agent native superagent panel. Each report cited above is on disk and pushed to GitHub.*
