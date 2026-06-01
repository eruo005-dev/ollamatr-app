# B12 — OllamaTR-Bench: The TR-LLM Evaluation Authority Play

> **Thesis.** Whoever owns the benchmark owns the narrative. Today, Turkish LLM releases ship with cherry-picked numbers because there is no canonical, open, nightly-run TR evaluation harness. OllamaTR is uniquely positioned to fill this vacuum — we already run every TR-capable model nightly via the catalog, so the marginal cost of running an eval suite on top is near-zero. Ship `OllamaTR-Bench` and every TR LLM press release for the next five years will quote our number.

---

## 1. Existing TR-LLM Benchmarks — Landscape Map

| Benchmark | What it tests | Maintainer / Origin | How it's used | Gap |
|---|---|---|---|---|
| **Turkish-MMLU** | 57 academic subjects (math, history, law, medicine) translated/adapted from MMLU | Community ports on HF Hub (e.g. `malhajar/mmlu_tr-v0.2`, `AYueksel/TurkishMMLU`); no single canonical owner | Quoted in nearly every TR-LLM release (Trendyol LLM, KUIS-AI, Cosmos) | Translation artifacts; no native TR cultural items; multiple incompatible forks |
| **Turkish-MT-Bench** | Multi-turn dialogue quality, judged by GPT-4 | KUIS-AI Lab fork of LMSys MT-Bench | Used for chat-tuning comparisons | GPT-4 judge bias toward English-style answers; only ~80 prompts |
| **TruthfulQA-TR** | Resistance to common TR misconceptions | Community translation; partial | Rarely cited | Direct translation misses TR-specific misconceptions (urban legends, folk medicine) |
| **BELEBELE-TR** | Reading comprehension across 122 langs incl. TR | Meta AI (Bandarkar et al., 2023) | Cross-lingual baselines | Only 900 questions; multiple-choice only; not TR-native authored |
| **GLUE-TR / XGLUE-TR** | NLU tasks (NLI, paraphrase, sentiment) | XGLUE (Microsoft); some community TR ports | Pre-instruct era; mostly obsolete for chat LLMs | Doesn't test generation; pre-LLM design |
| **Exam-style: YKS / LGS / YÖK** | Real Turkish university & high-school entrance exams | ÖSYM (state) — no official LLM benchmark; community scrapes | Powerful PR ("LLM YKS'yi çözdü") | Copyright-grey; ÖSYM doesn't release ground truth machine-readable |
| **Hellaswag-TR** | Commonsense sentence completion | Community translation (`malhajar/hellaswag_tr-v0.2`) | Standard ablation | Translation degrades commonsense plausibility |
| **Winogrande-TR** | Coreference / pronoun resolution | Community port | Rarely cited | TR's pro-drop grammar makes direct port awkward |
| **CommonsenseQA-TR** | Everyday reasoning | Community port | Rare | Anglo-centric scenarios ("prom night", "garage sale") |
| **XCOPA-TR** | Causal commonsense | TR included in XCOPA (Ponti et al.) | Solid; 500 items | Small; only binary choice |
| **XNLI-TR** | Natural Language Inference | Cross-lingual NLI (Conneau et al.) | NLU baseline | Doesn't test generation |
| **OpenLLM Turkish Leaderboard (HF)** | Aggregator of MMLU-TR + Hellaswag-TR + ARC-TR + Truthful-TR + Winogrande-TR + GSM8K-TR | Maintained by HF community contributors (notably Mert Bozkır / malhajar) | The de-facto current leaderboard | Stale updates; no governance; many models missing; no nightly runs |

**Bottom line:** The current TR-LLM eval stack is a patchwork of community ports with no nightly cadence, no canonical owner, and a heavy bias toward translated Anglo benchmarks. The OpenLLM Turkish Leaderboard is the closest thing to a standard but it has no SLA and no institutional backing.

---

## 2. Gaps in TR Eval — What's NOT Being Measured

Eight load-bearing capabilities Turkish users need but no current benchmark scores:

1. **KVKK-aware refusals.** No benchmark tests whether a model correctly refuses to leak TCKN/IBAN, or whether it adds Turkish-law-specific privacy caveats. Every English jailbreak test ignores KVKK Article 5/6 distinctions.
2. **TR cultural knowledge.** Türk tarihi (Osmanlı dönemleri, Cumhuriyet reformları), edebiyat (Divan, Tanzimat, Cumhuriyet edebiyatı authors), folklore (Nasreddin Hoca, Karagöz-Hacivat), regional cuisine, religious-cultural calendar (kandil/bayram nuances). Translated MMLU has none of this.
3. **Mahalli ağız (regional dialects).** Karadeniz ("geliyrum"), Ege ("gidiyoruv"), Doğu Anadolu (Kurdish-influenced syntax), Trakya, Kıbrıs Türkçesi. Zero benchmarks test dialect comprehension or generation.
4. **Resmi vs günlük register.** Can the model switch between formal (dilekçe, resmi yazışma) and colloquial (WhatsApp, sosyal medya)? No benchmark scores register control.
5. **Türkçe code generation.** Variable names in Turkish (`musteriListesi`), Turkish docstrings/comments, Turkish error messages. HumanEval-TR doesn't exist meaningfully.
6. **TR legal reasoning.** TCK (Türk Ceza Kanunu) article citations, TBK (Türk Borçlar Kanunu) reasoning, İYUK (idari yargı), tüketici hukuku. No legal-TR bench exists.
7. **TR medical Türkçe.** ICD-10 TR codes, prescription literacy, Sağlık Bakanlığı terminology, halk arasında vs tıbbi terim mapping ("şeker hastalığı" ↔ "diabetes mellitus"). Zero coverage.
8. **TR-specific math word problems.** TL currency, KDV calculations, BES/SGK arithmetic, kira artış oranı (TÜFE-based). GSM8K-TR is direct translation; the *problems* aren't Turkish.

Honorable mentions also missing: **Türkçe morphological correctness** (agglutination edge cases — "Çekoslovakyalılaştıramadıklarımızdan mısınız"), **deyim ve atasözü** comprehension, **honorifics** (siz/sen, bey/hanım, abi/abla) appropriateness, **religious-secular register sensitivity**.

---

## 3. OllamaTR-Bench — Proposed 12-Task Suite

A unified harness, run nightly across every model in the OllamaTR catalog, published openly at `ollamatr.com.tr/bench`.

| # | Task | Source | Type | Size target |
|---|---|---|---|---|
| 1 | **TR-MMLU-Pro** | Curated merge of best Turkish-MMLU forks + native TR-authored items | MCQ, 57 subjects | 14k items |
| 2 | **TR-MT-Bench-v2** | Extended MT-Bench with TR-native multi-turn prompts, judged by an ensemble (GPT-4o + Claude + a TR-tuned local judge) | Open-ended, 2-turn | 200 prompts |
| 3 | **TR-Culture** *(net new)* | Türk tarihi + edebiyat + folklore + bayram/kandil + cuisine + coğrafya | MCQ + short-answer | 2,000 items |
| 4 | **TR-Dialect** *(net new)* | Karadeniz / Ege / Doğu / Trakya / Kıbrıs translation + comprehension | Parallel sentences | 1,500 pairs |
| 5 | **TR-Register** *(net new)* | Convert resmi ↔ günlük; dilekçe vs WhatsApp; judged by rubric | Generation | 500 prompts |
| 6 | **TR-Code** *(net new)* | HumanEval-style with Türkçe variable names + comments + error messages | Code execution | 300 problems |
| 7 | **TR-Legal** *(net new)* | TCK/TBK/İYUK citation + reasoning; vetted by hukuk fakültesi | MCQ + open citation | 800 items |
| 8 | **TR-Medical** *(net new)* | Sağlık Bakanlığı terminology, ICD-10 TR, halk-tıbbi mapping; vetted by tıp fakültesi | MCQ + short-answer | 600 items |
| 9 | **TR-KVKK-Refusal** *(net new — flagship)* | KVKK-grounded refusal & redaction tests (TCKN/IBAN/sağlık verisi/biyometrik) with Turkish-law rationale grading | Generation + rubric | 400 prompts |
| 10 | **TR-Math-Local** | GSM8K-style but TL, KDV, kira artışı, BES, SGK problems | Numeric | 1,000 problems |
| 11 | **TR-Morph** *(net new)* | Agglutination correctness, ek-fiil, ünlü uyumu edge cases | Generation + parse | 1,200 items |
| 12 | **TR-Safety-Local** | Turkish-context harms: 1923+ history sensitivities, religious-secular balance, political-neutrality, terör-örgütü taxonomy alignment with TR law | Refusal + nuance | 500 prompts |

**Aggregate score:** weighted geometric mean (geomean penalizes one-trick models). Sub-scores published per task. Per-quantization runs (Q4_K_M, Q5_K_M, Q8_0, FP16) so users can see the quality-VRAM tradeoff — a unique angle no other leaderboard offers because no one else runs nightly local-quantized evals at scale.

**Open leaderboard:** `ollamatr.com.tr/bench` — auto-updating, public methodology, every prompt + every generation downloadable as JSONL, MIT-licensed where source licenses permit.

**Methodology paper:** versioned (v0.1 launch → v1.0 paper) on arXiv, ACL Anthology submission for the workshop track.

---

## 4. Effort to Ship — Three Phases

### Phase 1 — Unified Runner (1 month, mostly assembly)
- Fork `lm-evaluation-harness` (EleutherAI) as base.
- Plug in all existing public TR benchmarks (MMLU-TR, Hellaswag-TR, ARC-TR, TruthfulQA-TR, Winogrande-TR, BELEBELE-TR, XNLI-TR, XCOPA-TR, GSM8K-TR).
- Wire to Ollama backend so we run against `ollama serve` directly (matches what users actually run).
- Nightly cron → push results to `bench/results/YYYY-MM-DD.json` + render to leaderboard page.
- **Deliverable:** v0.1 leaderboard live with ~8 existing tasks, 12 catalog models scored. Press-ready.

### Phase 2 — Three Net-New Tasks (3 months)
Pick the three highest-leverage net-new tasks for maximum narrative impact:
1. **TR-KVKK-Refusal** — flagship; legally distinctive; no one can copy without TR-law expertise.
2. **TR-Dialect** — viral PR potential ("hangi LLM Karadeniz Türkçesi anlıyor?"); ties to TR identity.
3. **TR-Legal** — credentials academic partners; opens funding doors.

Each task: ~400-1,500 items, 2 annotator passes, IAA (inter-annotator agreement) target ≥0.75 Krippendorff's alpha, dataset card + datasheet (Gebru et al. format), released on HF Hub under CC-BY-SA-4.0 where possible.

### Phase 3 — Academic Validation (6 months total)
- Methodology paper: aim for **EMNLP / EACL Turkish NLP workshop** (annual; growing) or **LREC-COLING** (data/resources venue, perfect fit).
- Pre-print to arXiv + Türkçe summary post.
- Apply to **TÜBİTAK ULAKBİM** for archival hosting / DOI assignment.
- Submit to **ELRA catalogue** for European resource discoverability.
- Workshop talk → recruiting magnet for the next round of annotators.

---

## 5. Strategic Value — Why This Is Uncopiable Moat

1. **Every new TR LLM release needs an OllamaTR-Bench score.** Once two or three flagship releases (next Trendyol LLM, next KUIS model, next Cosmos) cite our number, it becomes table stakes. We become the BLEU/MMLU of Turkish LLMs.
2. **Press narrative:** "Türkiye'nin ilk açık, gece-gündüz çalışan TR-LLM benchmark'ı." Single sentence headline-ready. Reuters, Anadolu Ajansı, Webrazzi, BTHaber, Webtekno — all will run this with minimal effort because there's no equivalent.
3. **Academic bylines** for the team plus a citable arXiv/ACL paper. Recruits ML-academic talent who care about publication record. Founder-team credibility leap.
4. **Funding magnet.** TÜBİTAK 1505 (üniversite-sanayi işbirliği) and TÜBİTAK 1511 (öncelikli alanlar — AI is one) explicitly fund evaluation infrastructure. Eligible if we have an academic co-PI from İTÜ or Boğaziçi.
5. **Defensive moat.** Once entrenched, displacement requires either (a) buying us out, (b) waiting for us to abandon it, or (c) running a parallel benchmark for 2+ years to build credibility. Network effects of citation are exponential; first-mover advantage compounds.
6. **Bilateral leverage.** Vendor wants higher score → opens a dialogue with us → product partnerships. Vendor disputes our methodology → public debate happens on our domain → we are the authority being addressed.
7. **Pricing power for the broader business.** "Türkiye'nin LLM otoritesi" justifies enterprise pricing on every adjacent product (managed inference, KVKK-compliance reviews, model selection consulting).

---

## 6. Required Resources

**Compute**
- ~500 H100-GPU-hours nightly across the catalog (≈12 models × 4 quantizations × full suite).
- At spot rates (~$2/h H100) ≈ **$1,000/night = ~$30k/month**. At reserved or partner-donated rates, ~$10k/month is plausible.
- Realistic optimization: run full suite weekly, run a fast "smoke" suite nightly (top-3 tasks, 1 quantization). Cuts cost ~5×.

**Storage**
- ~50 GB benchmark data + generations + judge outputs. Trivial. S3-class or Cloudflare R2 (~$2/month for storage; egress free on R2).

**People**
- **1 ML engineer, 3 months part-time** for Phase 1+2 build (harness fork, task adapters, nightly cron, leaderboard frontend hooks).
- **10-20 native TR annotators** for Phase 2 net-new tasks. Best route: paid student program with İTÜ / Boğaziçi / Bilkent / ODTÜ Türkoloji + Hukuk + Tıp fakülteleri. Budget ~₺150-200/hour × ~400 hours = **~₺60-80k** ($2-3k) for the three flagship tasks.
- **2 domain reviewers** (1 hukuk fakültesi öğretim üyesi, 1 tıp fakültesi öğretim üyesi) — paid honorarium + co-authorship on methodology paper. ~$1-2k each.
- **Academic co-PI** for the paper (one tenured TR-NLP academic) — no cash; co-authorship + grant share.

**Total cash burn estimate to ship v1.0 (6 months):** **$25-50k** depending on compute deal. Borderline trivial vs strategic payoff.

---

## 7. Partnership Candidates

| Partner | Ask | What they get | Probability |
|---|---|---|---|
| **Hugging Face Türkiye** | Leaderboard mirror on HF Spaces; HF Datasets hosting | Discoverability, content for TR community | **High** — HF actively wants TR community presence |
| **Trendyol AI Lab** | Prompt contributions for TR-Culture and TR-Legal; consume our scores | First-mover credit on the leaderboard; methodology input | **High** — they already publish open TR models; aligned incentives |
| **KUIS AI Lab (Koç)** | TR-MT-Bench-v2 co-authorship; potential to consume their existing infra | Methodology paper byline; continued relevance of their MT-Bench work | **Medium** — academic credit is the currency |
| **İTÜ Yapay Zeka ve Veri Mühendisliği** | Academic co-PI, annotator student program | Bylines, grant share, student opportunities | **High** — TÜBİTAK grants need university partner |
| **Boğaziçi CMPE NLP Group** | Validation, paper co-author | Same as İTÜ | **Medium-High** |
| **Cohere For AI** | Free compute credits for nightly runs | Community goodwill; their TR efforts (Aya) get benchmarked | **Medium** — they fund community research grants |
| **Anthropic / Claude** | Compute credits + model access for judge calls | Their TR positioning; potential workshop sponsorship | **Low-Medium** — worth asking, low cost to ask |
| **Google DeepMind** | Gemma TR evals; TRC TPU credits | Gemma adoption metric | **Low-Medium** — TRC has granted TPUs for less |
| **TÜBİTAK ULAKBİM** | Archival hosting, DOI assignment, possibly mirror | National scientific infrastructure mandate | **Medium** — slow but real |
| **ÖSYM** *(stretch)* | Sanctioned subset of past YKS items for exam-style task | National PR ("ÖSYM-onaylı LLM testi") | **Low** — bureaucratic, but the upside is enormous |
| **Adalet Bakanlığı UYAP** *(stretch)* | Anonymized legal text for TR-Legal | Defensible benchmark; government endorsement | **Low** — long shot but worth a letter |

**Recommended opening sequence:** HF Türkiye (week 1) → İTÜ academic co-PI (week 2) → Trendyol AI Lab (week 3) → Cohere For AI compute grant (month 2) → TÜBİTAK 1505 application (month 4 with academic partner secured).

---

## 8. Risks & Mitigations

| Risk | Mitigation |
|---|---|
| **Benchmark contamination** (models train on our test set) | Hold out 20% private split; rotate quarterly; canary strings; report contamination probability |
| **Judge model bias** (GPT-4 prefers English-style answers) | Ensemble judges + TR-tuned judge + human spot-check 5% |
| **Annotator disagreement** on cultural items | Pre-register adjudication protocol; report IAA per task; release disagreements as a sub-leaderboard |
| **Vendor disputes our scores** | Open data, open code, reproducible runs; offer a 1-week embargo window before publishing a new model's score |
| **Copyright on exam items (YKS/LGS)** | Use only post-release, publicly archived items; lean on TR-native authored items for the rest |
| **One competitor forks and out-runs us** | First-mover entrenchment; institutional partners signal canonical; nightly cadence raises barrier |
| **Compute cost blowout** | Tiered cadence (nightly smoke + weekly full); pursue donated compute early |

---

## 9. 30-Day Sprint Plan (if green-lit today)

- **Week 1.** Fork lm-evaluation-harness, wire Ollama backend, ingest 4 existing tasks (MMLU-TR, Hellaswag-TR, ARC-TR, GSM8K-TR), get first numbers on 3 catalog models. Reach out to HF Türkiye + 1 academic.
- **Week 2.** Add 4 more tasks, full catalog (12 models), build the leaderboard page route on `ollamatr.com.tr/bench`. Draft methodology v0.1 markdown.
- **Week 3.** Nightly cron stable. Public soft launch to TR ML Twitter / LinkedIn / r/TurkishAI. Solicit feedback. Begin annotator recruitment for Phase 2 tasks.
- **Week 4.** Press kit: "İlk açık, gece-gündüz çalışan TR LLM benchmark'ı." Pitch Webrazzi, BTHaber, Webtekno, Anadolu Ajansı. File TÜBİTAK 1505 expression of interest with academic partner.

---

## Summary — Top 3 Benchmark Wins

**OllamaTR-Bench is a sub-$50k, six-month bet that converts our nightly catalog runs into the canonical Turkish LLM scoreboard.** The three highest-leverage wins are (1) **TR-KVKK-Refusal** — a legally distinctive task no foreign lab can copy without Turkish-law expertise, making us the only credible KVKK-aware LLM authority; (2) **TR-Dialect (mahalli ağız)** — viral, identity-charged, and zero competitive coverage today, instantly press-worthy ("hangi LLM Karadeniz Türkçesi anlıyor?"); and (3) a **unified nightly runner across the existing patchwork** (MMLU-TR, Hellaswag-TR, BELEBELE-TR, MT-Bench-TR, GSM8K-TR) hosted at `ollamatr.com.tr/bench` — which alone makes us the de-facto reference point because the current OpenLLM Turkish Leaderboard has no SLA. Ship Phase 1 in 30 days, secure HF Türkiye + an İTÜ/Boğaziçi co-PI in 60, file TÜBİTAK 1505 in 120, and submit the methodology paper to the EMNLP Turkish NLP workshop in 180 — and every TR LLM press release after that quotes our number.
