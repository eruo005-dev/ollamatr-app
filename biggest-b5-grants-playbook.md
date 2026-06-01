# OllamaTR — Non-Dilutive Funding Playbook (B5)

**Operator:** Solo founder, TR-based, building Turkish-first local-AI distribution layer for Ollama
**Goal:** Stack non-dilutive grants to reach product-market fit without giving up equity
**Horizon:** 2026 cycle (TÜBİTAK + KOSGEB + Horizon Europe overlaps)
**Currency assumptions:** 1 EUR ≈ 36 TL, 1 USD ≈ 33 TL (Jun 2026 working rate)

> **Reality check upfront.** Every Turkish grant below requires either an active *limited şirket* (Ltd. Şti.) or *A.Ş.* — **şahıs şirketi (sole proprietorship) is ineligible for nearly all R&D programs**. The only exception is BIGG Stage-1 (the idea phase), which lets individuals apply but requires Ltd. Şti. incorporation within ~90 days of conditional approval. **Step 0 for OllamaTR: incorporate as Ltd. Şti. with NACE code 62.01 (computer programming) + 72.19 (R&D natural sciences).** Capital can be as low as 50K TL, registration ~7K TL all-in.

---

## 1. TÜBİTAK 1512 — BIGG (Bireysel Genç Girişim)

**The starter grant. This is where you begin.**

| Field | Detail |
|---|---|
| **Eligibility** | Individual founder, ≤45 years old, university graduate (any degree), no prior failed BIGG. Şahıs şirketi or pre-incorporation accepted at Stage 1. Must incorporate Ltd. Şti. before Stage 2 funds release. |
| **Application window** | 2 cohorts/year via "Uygulayıcı Kuruluşlar" (incubators like ITÜ ÇEKİRDEK, ODTÜ Teknokent, Kworks, Workup). Spring call typically Feb-Apr 2026, Fall call Aug-Oct 2026. |
| **Documents** | Business plan (TÜBİTAK template, ~40 pages), CV, transcript, value proposition canvas, MVP demo/screenshots, market validation evidence, financial projection (3-yr), IP declaration. |
| **Award probability** | Stage 1 → Stage 2 conversion: ~18-22% sector-wide. **AI infra with Turkish-language angle has a strong narrative; realistic 35-45% for OllamaTR if pitched via a strong incubator (ITÜ ÇEKİRDEK or Kworks).** |
| **Amount** | **200,000 TL hibe** (sermaye desteği) + up to **50,000 TL Ar-Ge gider desteği**. New 2026 amounts may push to 250K total. |
| **Timeline** | Stage-1 acceptance → 4 months mentoring → Stage-2 pitch → ~6 months from pitch to first cash. **Total 9-12 months apply-to-payment.** |
| **Strings** | IP stays with founder/company. 18-month execution period, 3 milestone reviews. Cannot take equity investment >50% during execution. Must report quarterly. Penalty for non-execution: refund + 1.5x faiz. |

**Verdict for OllamaTR:** *Mandatory first step.* Low downside, builds incubator relationship, unlocks credibility for everything else.

---

## 2. TÜBİTAK 1507 — KOBİ Ar-Ge Başlangıç

**The first "real" R&D grant after incorporation.**

| Field | Detail |
|---|---|
| **Eligibility** | KOBİ-status Ltd. Şti. or A.Ş. (≤249 employees, ≤500M TL revenue). **No şahıs şirketi.** First-time TÜBİTAK applicants only (max 2 lifetime 1507 awards per company). |
| **Application window** | Continuous (sürekli açık) since 2024, rolling review. Submit any time; results in 3-4 months. |
| **Documents** | AGY101 form (proje öneri formu, ~60 pages), iş paketleri (work packages), maliyet formu, kuruluş bilgileri, son 2 yıl mali tablo (if exists), AGY501 if revising. |
| **Award probability** | Sector-wide approval rate ~38-42%. **AI/LLM projects with clear technical novelty: 50-55%.** Weak spot: "is this really R&D vs. integration?" — must show algorithmic contribution, not just glue code. |
| **Amount** | Project budget up to **800,000 TL**, **75% hibe = up to 600,000 TL grant**. Plus 20% genel gider (overhead). |
| **Timeline** | Submit → 90-120 days to decision → first ön ödeme within 30 days of contract = **~5-6 months apply to first payment**. |
| **Strings** | IP belongs to company. Quarterly technical + financial reports. TÜBİTAK on-site audit at ~50% completion. Must employ ≥1 full-time researcher. R&D activities must occur in TR. No subcontracting >25% of budget. |

**Verdict for OllamaTR:** *Second filing, immediately after BIGG approval.* Frame it as "Türkçe yerel-LLM optimizasyon motoru" — quantization + KV-cache + Turkish tokenizer R&D.

---

## 3. TÜBİTAK 1505 — Üniversite-Sanayi İşbirliği

**Co-research with a university partner. Lowers your own cost burden.**

| Field | Detail |
|---|---|
| **Eligibility** | KOBİ + Turkish university (any) as co-applicant. Need a contracted academic Yürütücü (project lead) from the uni side. |
| **Application window** | Continuous, rolling. Avg 4-month decision. |
| **Documents** | Same as 1507 + university protocol agreement, academic CV, üniversite alt yüklenici sözleşmesi. |
| **Award probability** | ~45% (higher than 1507 because uni gatekeeping pre-filters weak proposals). |
| **Amount** | Up to **1,000,000 TL project**, **75% hibe (university portion up to 100%)**. Company pays 25% of company-side budget. |
| **Timeline** | 4-month review → contract → ~5-6 months to first payment. |
| **Strings** | IP split typically 70/30 in favor of company (negotiable). Joint publication rights. University takes overhead 15%. 24-month execution. |

**Verdict for OllamaTR:** *Year-2 play.* Pair with Boğaziçi NLP group, Sabancı VRG, ODTÜ KOVAN, or Hacettepe BIM. Use it for Turkish tokenizer research or RLHF dataset curation — academically defensible angles.

---

## 4. TÜBİTAK 1511 — Öncelikli Alanlar Ar-Ge (Yapay Zeka Stratejik Alan)

**The big one. Strategic priority area: AI is explicitly listed.**

| Field | Detail |
|---|---|
| **Eligibility** | KOBİ + Büyük Ölçekli. Project must align with a published "çağrı" (call) under the AI priority area. 2026 calls expected: "Türkçe Büyük Dil Modelleri", "Generatif YZ Uygulama Altyapısı", "Egemen YZ (Sovereign AI)". |
| **Application window** | Çağrı-based. Watch tubitak.gov.tr/tr/destekler/sanayi/ulusal-destek-programlari. 2026 AI calls likely Mar-May and Sep-Nov. |
| **Documents** | AGY311 form, detailed work packages, partner letters, technology readiness level (TRL) declaration, ulusal katma değer analysis, ihracat projeksiyonu. |
| **Award probability** | Hyper-competitive. **15-20% baseline, but Türkçe LLM angle aligns perfectly with 2026 Sovereign AI agenda → 25-30% realistic.** |
| **Amount** | KOBİ: project up to **2,500,000 TL, 75% hibe = 1,875,000 TL**. Büyük: 60% hibe. |
| **Timeline** | Çağrı open ~2 months → submit → 4-month review → 1-month contract → ~8 months total to first payment. |
| **Strings** | Strict çağrı-defined deliverables. Bi-monthly reports. National value-add KPIs (yerli kullanım, ihracat). IP belongs to company but TÜBİTAK retains kullanım hakkı for public sector use. |

**Verdict for OllamaTR:** *Apply once 1507 is approved.* Best framed as "Türkçe yerel LLM dağıtım altyapısı" tied to the Cumhurbaşkanlığı Dijital Dönüşüm Ofisi's Egemen YZ stratejisi.

---

## 5. TÜBİTAK 2244 — Sanayi Doktora Programı

**Embed a PhD researcher in your company. Salary subsidized.**

| Field | Detail |
|---|---|
| **Eligibility** | KOBİ + university doctoral program + matched PhD candidate. Company must commit to 4-year employment of researcher. |
| **Application window** | Annual call, typically Sep-Nov for the following academic year. |
| **Documents** | Tripartite protocol (firm + uni + candidate), research plan, employment letter, candidate CV/transcripts. |
| **Award probability** | ~55% if all three parties have aligned interests. Bottleneck is finding a candidate. |
| **Amount** | **Monthly stipend ~25,000 TL × 48 months ≈ 1,200,000 TL** per researcher, fully subsidized. Company pays only social security. |
| **Timeline** | Call closes Nov → results Feb → academic enrollment Sep → researcher begins. **~12 months call-to-start.** |
| **Strings** | Researcher must publish thesis. IP from doctoral work: complex split — negotiate hard up-front. Researcher employed by company throughout. |

**Verdict for OllamaTR:** *Year 2-3 lever.* Use it to hire a Turkish-NLP PhD candidate cheaply. Massive long-term moat builder; pairs with 1505.

---

## 6. KOSGEB Ar-Ge, Ür-Ge ve İnovasyon Destek Programı

**The KOSGEB heavyweight. Best non-TÜBİTAK option for software R&D.**

| Field | Detail |
|---|---|
| **Eligibility** | KOSGEB-registered KOBİ (Ltd. or A.Ş.). Must complete KOSGEB veritabanı kaydı + işletme beyanı. |
| **Application window** | Continuous since 2023 revamp. KOBİ Bilgi Sistemi (KBS) over kosgeb.gov.tr. Decisions in 60-90 days. |
| **Documents** | Proje başvuru formu, iş-zaman planı, maliyet tablosu, teknik fizibilite, KOSGEB veritabanı kaydı, son yıl gelir tablosu, vergi/SGK borç yok yazısı. |
| **Award probability** | ~40-50% across software. KOSGEB is friendlier than TÜBİTAK to early-stage / non-deep-tech submissions. **AI infra projects: ~55%.** |
| **Amount** | **Up to 6,000,000 TL toplam destek** in 2026: ~3M TL hibe (geri ödemesiz) + ~3M TL geri ödemeli (interest-free, 24-month grace + 24-month payback). Sub-buckets: makine-teçhizat, personel, hizmet alımı, sınai mülkiyet. |
| **Timeline** | 60-90 days review → contract → ön ödeme within 45 days. **~4-5 months to first cash.** |
| **Strings** | 24-36 month execution. Quarterly KOSGEB raporu. On-site denetim. Personel desteğinden faydalanan kişi 24 ay altında istihdam zorunluluğu. IP fully retained. |

**Verdict for OllamaTR:** *Best ROI in the playbook. File this in parallel with TÜBİTAK 1507.* KOSGEB and TÜBİTAK can co-fund non-overlapping work packages, so you can effectively double-grant.

---

## 7. KOSGEB Girişimcilik Destek Programı (Yeni Girişimci)

**For brand-new companies (<2 years). Capital injection while you set up.**

| Field | Detail |
|---|---|
| **Eligibility** | New KOBİ <2 years old. Founder completed KOSGEB Uygulamalı Girişimcilik Eğitimi (free, 32 hours online). |
| **Application window** | Continuous, rolling 60-day review. |
| **Documents** | Eğitim sertifikası, iş planı (KOSGEB template), kuruluş evrakı, vergi levhası, SGK kaydı. |
| **Award probability** | ~65-75%. Easiest grant on this list. |
| **Amount** | **100,000 TL hibe** (kuruluş + performans + makine-teçhizat alt başlıklarına bölünmüş). Plus **100,000 TL faizsiz geri ödemeli kredi**. Higher tiers (genç/kadın/teknoloji girişimcisi) up to **160,000 TL hibe**. |
| **Timeline** | 60-90 days. ~3 months to first cash. |
| **Strings** | Maintain SGK insurance for founder ≥24 months. Performance KPIs (revenue + employment). Light-touch reporting. |

**Verdict for OllamaTR:** *File on Day 1 of Ltd. Şti. incorporation.* Free money, fast, near-certain. Use the 32-hour training period to write your TÜBİTAK 1507 proposal in parallel.

---

## 8. Sanayi ve Teknoloji Bakanlığı — Teknogirişim Sermaye Desteği (Teknoyatırım)

**Note: The classic "Teknogirişim 100K" was merged into TÜBİTAK 1512 BIGG in 2018. The current heir is the Bakanlık's Teknoyatırım Destek Programı.**

| Field | Detail |
|---|---|
| **Eligibility** | KOBİ producing a domestically-developed technology product (öncelikli teknoloji alanları listesi includes AI/YZ). Must have a TÜBİTAK or KOSGEB R&D project completion document (so this is a downstream commercialization grant). |
| **Application window** | Annual call, typically Q2 2026. |
| **Documents** | R&D completion belgesi, üretim planı, makine-teçhizat listesi, yerli katkı oranı belgesi, ihracat planı. |
| **Award probability** | ~30%. Demands proof you already finished an R&D project. |
| **Amount** | **Up to 5,000,000 TL hibe** + up to 1,000,000 TL faizsiz kredi for machinery + commercialization. |
| **Timeline** | Call → submit → 5-month review → first payment. ~9 months. |
| **Strings** | 36-month execution. Yerli üretim taahhüdü. Quarterly Bakanlık raporu. IP fully retained. |

**Verdict for OllamaTR:** *Year-3 graduation grant.* Stack on top of completed 1507/1511. Software doesn't fit "makine-teçhizat" well, but you can budget GPU clusters as production infrastructure.

---

## 9. Horizon Europe — EIC Accelerator

**The crown jewel. Deep-tech only. Brutal but life-changing.**

| Field | Detail |
|---|---|
| **Eligibility** | SME (Ltd./A.Ş.) registered in TR (TR is Horizon Europe associated country — ✅ eligible since 2021). Deep-tech with high-impact innovation. Must show TRL 5-6 entering, TRL 8 exiting. |
| **Application window** | 2026 cutoffs (confirmed pattern): Mar 12, Jun 18, Oct 8. Step-1 (short pitch) rolling/continuous. |
| **Documents** | Step 1: 5-page short application + 3-min video pitch. Step 2: full business plan (~50 pages), pitch deck, financial model. Step 3: in-person jury interview in Brussels. |
| **Award probability** | **Step 1 → 2: ~30%. Step 2 → 3: ~10%. Step 3 → award: ~50%. Overall ~1.5-3%.** TR applicants have not yet won an EIC Accelerator as of 2025 — first TR win is plausible 2026-2027. |
| **Amount** | **Grant: €0.5M – €2.5M (up to 70% of project cost) + Equity component €0.5M – €15M via EIC Fund.** Can take grant-only. |
| **Timeline** | Step 1 result 4 weeks. Step 2 result 9-12 weeks. Step 3 jury 6-8 weeks. Contract 8 weeks. **Total 10-14 months apply to first payment.** |
| **Strings** | DoA (Description of Action) milestones. Quarterly + annual financial reports. EIC ownership of grant deliverables open under Horizon IP rules (company keeps IP, EU has license for non-commercial). Equity component: dilutive (only if you take it). |

**Verdict for OllamaTR:** *Year 2 moonshot once you have TÜBİTAK traction.* Pitch angle: "First sovereign LLM distribution layer for a NATO-aligned non-English language — defensible vs. OpenAI/Anthropic API dependence". Get a strong EU consultant (~€20K success fee).

---

## 10. Horizon Europe — Cluster 4 (Digital, Industry & Space) — Trustworthy AI calls

**The collaborative track. Big consortium, smaller individual share.**

| Field | Detail |
|---|---|
| **Eligibility** | Consortium of ≥3 partners from ≥3 EU/associated countries. TR-based SME qualifies as one partner. Must align with a published Cluster 4 work programme call (HORIZON-CL4-2026-HUMAN-XX-XX). |
| **Application window** | Annual work programme published Dec; calls open Jan-Apr; deadlines Mar-Sep 2026. Watch ec.europa.eu/info/funding-tenders. |
| **Documents** | Full proposal (Part A admin + Part B technical ~70 pages), consortium agreement, letters of support, ethics annex, gender equality plan. |
| **Award probability** | 12-18% for well-formed consortia. Higher if you ride on an existing consortium's coattails as the "SME partner". |
| **Amount** | **Total call budget €5M-€50M, split across consortium. Individual SME share typically €300K-€800K, 100% funded for non-profit RIA / 70% for IA.** |
| **Timeline** | Submit → 5-month evaluation → 3-month GA negotiation → first prefinancing within 30 days = **~9-10 months**. |
| **Strings** | Consortium agreement governs IP (typically background-IP retained, foreground-IP joint). Heavy reporting (every 18 months). Coordinator handles most admin if you're a participant. |

**Verdict for OllamaTR:** *Plug-in opportunity, not lead opportunity.* Find an existing EU AI consortium (look at past CL4 winners on CORDIS) and offer yourself as "Turkish-language sovereign AI" partner. Low effort, decent money, EU credibility.

---

## 11. Cumhurbaşkanlığı Dijital Dönüşüm Ofisi — MetaverseTürkiye / Egemen YZ Programları

**The newest, least documented, potentially the biggest political tailwind.**

| Field | Detail |
|---|---|
| **Eligibility** | TR-based legal entity (Ltd./A.Ş./vakıf). Project must align with Ulusal YZ Stratejisi 2024-2028 priorities (egemen modeller, kamu kullanımı, Türkçe veri kümeleri). |
| **Application window** | 2026 cycle expected Q2 announcement. Pilot programs ran 2024-2025 via direct ministerial assignment; open-call program rolling out 2026. Monitor cbddo.gov.tr. |
| **Documents** | Stratejiyle uyum beyanı, teknik mimari, veri yönetişimi planı, KVKK uyum belgesi, milli güvenlik açıklaması. Less standardized than TÜBİTAK. |
| **Award probability** | Unknown — too new. Anecdotally connection-driven; cold submissions <10%. Warm submissions via Sanayi Bakanlığı or TÜBİTAK referral ~40%. |
| **Amount** | Reported range **500K – 10M TL** depending on stratejik kritiklik. Top tier (kamu kullanımı taahhüdü) much higher. |
| **Timeline** | Opaque. 3-9 months reported. |
| **Strings** | Government-use license probable. Veri yerelleştirme zorunluluğu. Possible kamu satın alma garantisi as upside. |

**Verdict for OllamaTR:** *Strategic, not financial.* Apply for the political flag and government procurement door — the cash may be modest but the "officially endorsed Türkçe LLM altyapısı" stamp is priceless.

---

## 12. Ulusal Yapay Zeka Stratejisi (UYZS) 2024-2028 — Referenced Funds

The UYZS doesn't have its own grant line — it *coordinates* existing funds. Specifically tagged for AI:

- **TÜBİTAK 1004 — Mükemmeliyet Merkezi** (Centers of Excellence): consortium-only, 5-year, up to 25M TL. Mostly for universities; SME spoke role possible.
- **TÜBİTAK ARDEB 1001** (Bilimsel ve Teknolojik Araştırma): academic-led, but company subcontract slot up to 360K TL.
- **Sanayi Bakanlığı Yazılım Destekleri**: limited but real for "milli yazılım ürünü" certification (5K-50K TL marketing budget).
- **HAVELSAN/ASELSAN/TÜBİTAK BİLGEM bidirectional procurement**: not grants, but offset-style purchase contracts for "yerli YZ" — worth scanning STM A.Ş. and Savunma Sanayii Başkanlığı tenders.

**Verdict for OllamaTR:** *Treat UYZS as a positioning narrative, not a budget line.* Cite it in every other application as proof of strategic alignment.

---

## Recommended Sequence (12-month roll-out)

### Month 0 — Incorporation Sprint (Week 1-3)
1. Incorporate **Ltd. Şti.**, NACE 62.01 + 72.19, ~50K TL capital.
2. Register with **KOSGEB veritabanı**.
3. Founder completes **KOSGEB Uygulamalı Girişimcilik Eğitimi** (32h, free, online).
4. Open vergi dairesi, SGK işyeri açılış.

### Month 1-2 — File the Easy Wins
- **TÜBİTAK 1512 BIGG** Stage-1 via ITÜ ÇEKİRDEK or Kworks (whichever cohort opens first).
- **KOSGEB Yeni Girişimci** 100K TL hibe — file immediately on eğitim completion.

**Expected cash by Month 5: ~250-300K TL.**

### Month 3-6 — Second Wave (the meaty ones)
- **TÜBİTAK 1507** — file in parallel with BIGG Stage-2 prep. Frame as Türkçe-LLM optimization R&D.
- **KOSGEB Ar-Ge & İnovasyon** — file 30 days after 1507 submission (different work packages, no overlap).
- **BIGG Stage-2** pitch — happens around Month 5-6.

**Expected cash by Month 10: BIGG 200K + 1507 first ön ödeme 180K + KOSGEB 300K ≈ 680K TL non-dilutive.**

### Month 7-12 — Strategic Layer
- **TÜBİTAK 1511 AI çağrısı** — file the moment the Türkçe LLM or Egemen YZ call drops.
- **EIC Accelerator Step 1** — file as a stretch, low-cost (5 pages + video). Treat as free option value.
- **Dijital Dönüşüm Ofisi outreach** — schedule meetings, not formal application yet.

### Year 2 — Scale-Up
- **TÜBİTAK 1505** with Boğaziçi/ODTÜ/Sabancı NLP partner.
- **TÜBİTAK 2244** to embed a PhD researcher.
- **EIC Accelerator Step 2** if Step 1 passed.
- **Horizon CL4 consortium plug-in**.

### Year 3 — Graduation
- **Sanayi Bakanlığı Teknoyatırım** (commercialization).
- **Cumhurbaşkanlığı Egemen YZ** strategic project.

---

## 15-Slide Pitch Deck Skeleton (Grant-Adaptable)

Designed to be reordered/retitled for TÜBİTAK / KOSGEB / EIC by swapping section 4 (technical depth), 9 (market), and 13 (KPIs).

| # | Slide | TÜBİTAK angle | KOSGEB angle | EIC angle |
|---|---|---|---|---|
| 1 | **Cover** — OllamaTR, tagline, founder, date | Same | Same | Same |
| 2 | **Problem** — TR users locked out of useful LLMs (API cost in USD, latency, KVKK, no Türkçe) | Yerli ihtiyaç + dışa bağımlılık | Pazar boşluğu + KOBİ kullanımı | Sovereign-AI dependence on US |
| 3 | **Solution** — Türkçe-first local Ollama distribution + tooling | Teknolojik çözüm | Ticari ürün | Deep-tech innovation |
| 4 | **Technical innovation** — Türkçe tokenizer optimization, GGUF quant for low-VRAM, KV-cache tuning | **Ar-Ge novelty (TRL 4→7)** | Ürün geliştirme | TRL 5→8 + IP |
| 5 | **Product demo** — screenshots, MVP metrics | Prototip durumu | Çalışan ürün | Validated MVP |
| 6 | **How it works** — architecture diagram | İş paketleri haritası | İş akışı | System architecture |
| 7 | **Market size** — TR LLM users (~8M+), TAM/SAM/SOM | Yerli pazar büyüklüğü | KOBİ pazarı | TAM €100M+ EU sovereign-AI |
| 8 | **Why now** — UYZS 2024-2028, KVKK enforcement, AB Yapay Zeka Yasası, GPU price drop | Stratejik uyum | Pazar zamanlaması | EU AI Act + sovereignty |
| 9 | **Business model** — open core + paid enterprise + KOBİ SaaS tier | Ticarileşme planı | Gelir modeli | Scale + €100M ARR path |
| 10 | **Traction** — downloads, GitHub stars, Discord users, pilots | İlk çıktılar | Müşteri sayıları | Revenue + LOIs |
| 11 | **Competition** — Ollama upstream, OpenAI Türkçe, Hugging Face | Rekabet avantajı | Diferansiyasyon | Defensible moat |
| 12 | **Team** — founder bio, advisors, planned hires | Yürütücü ve ekip | İnsan kaynağı | World-class team |
| 13 | **Roadmap & KPIs** — 12/24/36-month milestones | **İş paketleri + ara çıktılar** | İş-zaman planı | DoA milestones |
| 14 | **Use of funds** — line items mapped to grant categories | Maliyet tablosu | Bütçe dağılımı | Budget by WP |
| 15 | **Ask & contact** — exact grant amount, expected outcomes, founder contact | Talep edilen destek | Talep edilen hibe | Grant + equity ask |

**Build once in Slidev or Tome, export per-grant in EN + TR.**

---

## Total Realistic 24-Month Stack (Conservative Scenario)

| Grant | Probability | Conservative Take | Expected Value |
|---|---|---|---|
| KOSGEB Yeni Girişimci | 70% | 100K TL | 70K |
| BIGG | 40% | 250K TL | 100K |
| TÜBİTAK 1507 | 50% | 600K TL | 300K |
| KOSGEB Ar-Ge İnovasyon | 55% | 3M TL hibe + 3M kredi | 1.65M hibe + 1.65M kredi |
| TÜBİTAK 1511 | 25% | 1.875M TL | 470K |
| EIC Accelerator Step 1 | 30% (to Step 2) | — | option value |
| **Total expected non-dilutive** | | **~2.59M TL hibe + 1.65M TL faizsiz kredi ≈ 4.24M TL** | ≈ €117K |

**Aggressive scenario (everything lands): ~5.8M TL hibe + 3M kredi ≈ 8.8M TL ≈ €245K** within 24 months, zero equity given up.

---

## Top-3 by ROI — One-Paragraph Summary

For OllamaTR's solo-founder, AI-infra profile, the highest-ROI stack is **(1) KOSGEB Ar-Ge & İnovasyon Destek Programı** — best risk-adjusted return at ~55% odds for up to 6M TL combined hibe+kredi in 4-5 months, with the loosest "is this R&D?" gate of any program here; **(2) TÜBİTAK 1512 BIGG** — gateway grant at ~40% odds for 250K TL with the incubator credibility that unlocks every later filing, and the lowest paperwork burden because the incubator carries you; **(3) TÜBİTAK 1507** — the leverage move at ~50% odds for 600K TL, perfectly framed as Türkçe-LLM R&D and stackable on top of #1 and #2 with non-overlapping work packages. File KOSGEB Yeni Girişimci on Day 1 as a free warm-up, then attack BIGG and KOSGEB Ar-Ge in parallel during Months 1-3, then layer 1507 in Month 4 — this sequence realistically delivers ~3.5-4M TL non-dilutive within 12 months while preserving the EIC Accelerator and TÜBİTAK 1511 as Year-2 moonshots.

**STOP.**
