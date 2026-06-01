# B15 — Turkic Diaspora & Pan-Turkic Expansion Map

**Mandate:** Map OllamaTR's path from 85M Türkiye TAM → 200M+ Turkic-speaking TAM. This is a 5-year horizon document. Y1 is TR-only by design; everything below is *post-PMF* sequencing.

---

## 0. The Turkic Language Universe (TAM Reframe)

| Language | Speakers (M) | Script | Country Anchor | Status |
|---|---|---|---|---|
| Türkçe | ~85M | Latin | Türkiye + KKTC | OllamaTR home market |
| Özbekçe (Uzbek) | ~35M | Latin (transitioning from Cyrillic) | Özbekistan | Largest Turkic after TR |
| Azerbaycan dili (Azerice) | ~24M | Latin (AZ) / Arabic (IR) | Azerbaycan + İran Azerileri | Closest to TR |
| Kazakça (Kazakh) | ~14M | Latin (transitioning from Cyrillic by 2031) | Kazakistan | Mid-distance from TR |
| Uygurca | ~10-12M | Arabic-Uyghur | Doğu Türkistan + diaspora | Politically charged |
| Türkmence | ~7M | Latin | Türkmenistan | Closed economy |
| Tatarca | ~5M | Cyrillic | Tataristan (RF içinde) + diaspora | Russian-controlled |
| Kırgızca (Kyrgyz) | ~5M | Cyrillic | Kırgızistan | Mid-distance |
| Çuvaş, Yakut, Hakas, Karakalpak | ~3-4M total | Cyrillic | Russia Federation | Negligible TAM |

**Total Turkic speakers globally: ~190-200M**
**Reachable (open-internet, non-China, non-Russia-blocked) TAM: ~145M** (TR + AZ + UZ + KZ + KG + diaspora)

---

## 1. Top 5 Expansion Targets — Deep Dive

### 1.1 Azerbaycan dili (Azerice) — Priority #1

**Linguistic proximity to TR:** ~80-85% mutual intelligibility. The closest Turkic language to TR. An İstanbullu and a Bakülü can hold a casual conversation with minor friction. Vocabulary diverges on technical terms (Russian loans in AZ; Arabic/French in TR).

**Script:** Latin (Azerbaijan since 1991) — same alphabet family as TR with 3 extra letters (ə, q, x). Iranian Azeris use Perso-Arabic script (~16M of the 24M total; mostly offline for our purposes).

**AI ecosystem maturity:** Thin. Some work from Azerbaijan State Oil Academy, ADA University, and Baku Engineering University. ASAN xidmət (gov digital services) has done some NLP but it's procurement-driven. **No major foundation model has been trained natively on Azerice.**

**Existing models on HF / Ollama:**
- A few Azerbaijani BERT variants (`LocalDoc/TEMA-az`, sporadic community work)
- mBERT and XLM-R cover Azerice weakly
- **No native Ollama-distributed Azerice LLM as of mid-2026**
- Türkçe models (Trendyol, Kanarya, Cosmos, Hamza) work *partially* on Azerice due to proximity — this is OllamaTR's wedge

**Government + business sentiment:** Strongly pro-TR. "Bir millet, iki devlet" doctrine. TR-AZ economic ties booming post-Karabağ (2020). TRT Avaz, TIKA, Maarif Vakfı all active. **Russian influence in tech is declining; Turkish influence is rising.** Azerbaijan SOCAR + Azerbaycan Hava Yolları are TR partnership veterans.

**Partnership candidates:**
- ADA University (English-language, AI-forward)
- Azerbaijan Technical University
- INNOLAND incubator (Bakü)
- PASHA Holding (largest private group; would sponsor a "Bora.az" brand)
- ASAN xidmət (gov digital — slow but high-impact)

**Localization effort:** **LOW.** UI copy 90% reusable with find-replace + Azerice native review. Docs require a single bilingual technical writer (4-6 weeks). Models: ship TR models with "Azerice mode" disclaimer in Y2; commission native fine-tune in Y3.

**Why first:** Lowest CAC, warmest market, smallest linguistic delta, highest geopolitical tailwind. A "Bora Bakü Launch" is a press story.

---

### 1.2 Özbekçe (Uzbek) — Priority #2

**Linguistic proximity to TR:** ~55-65% partial intelligibility. Karluk branch (TR is Oğuz). Grammar similar; vocabulary differs sharply. A TR speaker understands Özbek headlines but not casual speech. **Higher than Spanish↔Italian, lower than AZ↔TR.**

**Script:** Officially transitioning from Cyrillic → Latin (decree pushed to 2030). Both scripts in active use. Younger users: Latin. Government/older: Cyrillic. **OllamaTR site must ship both.**

**AI ecosystem maturity:** Growing fast. IT Park Tashkent. Inha University Tashkent. Several Uzbek startups working on STT/TTS (national priority due to bureaucratic digitization). **More mature than Azerice ecosystem in absolute volume but less aligned with TR tooling.**

**Existing models on HF / Ollama:**
- `tahrirchi/tahrirchi-bert-base` (Uzbek BERT, decent)
- `behbudiy/Llama-3.1-8B-Uzbek` (community fine-tune)
- Some Mistral-Uzbek work
- **More native Uzbek LLM work than Azerice — but fragmented, not productionized.**

**Government + business sentiment:** Mirziyoyev era opened to foreign tech. TR ties strong (TIKA, Türk Hava Yolları as major employer). Russia still dominant in business Russian. **China presence growing via BRI.** OllamaTR enters as the *non-Russian, non-Chinese* alternative — a real positioning play.

**Partnership candidates:**
- IT Park Tashkent (state incubator)
- Inha University Tashkent (Korean-funded; tech-strong)
- Uzbekistan AI Association (forming)
- Uzum (local super-app; potential B2B customer)
- Türk Hava Yolları Taşkent office (already a TR business beachhead)

**Localization effort:** **MEDIUM-HIGH.** Two scripts, bigger linguistic delta, needs native Özbek copywriter (not just translator). Models: cannot ship "TR-with-Özbek-mode" — need real fine-tune. **Budget: $40-60K for Y3 model commission via academic partner.**

---

### 1.3 Kazakça (Kazakh) — Priority #3

**Linguistic proximity to TR:** ~40-50%. Kıpçak branch. Significant divergence. TR speaker recognizes ~30% of words. Closer to Kırgızca than to TR.

**Script:** Government decreed Latin transition by 2031 (slipping). Currently Cyrillic-dominant. Younger Kazakhs increasingly bilingual EN+KZ.

**AI ecosystem maturity:** **Strongest in Central Asia.** Astana Hub. Nazarbayev University (research-grade). Kolesa Group. KazAI initiatives. Government has explicit AI strategy with budget. **Kazakhstan has more AI capital deployed than TR per capita in some segments.**

**Existing models on HF / Ollama:**
- `issai/LLama-3.1-KazLLM-1.0-8B` (Nazarbayev University; the most mature non-TR Turkic LLM)
- `kz-transformers/kaz-roberta-conversational`
- Whisper-Kazakh fine-tunes available
- **Best-resourced non-TR Turkic AI ecosystem.**

**Government + business sentiment:** **Mixed for OllamaTR.** Kazakhstan plays both sides — Russia ties deep, China BRI deep, EU/US courted. TR ties present but not dominant. Pan-Turkic doctrine viewed warily by Astana (doesn't want to anger Moscow). **Bora.kz needs careful positioning: "AI sovereignty tool" not "Pan-Turkic brotherhood."**

**Partnership candidates:**
- ISSAI (Institute for Smart Systems and AI, Nazarbayev University) — *the obvious partner*
- Astana Hub
- Kaspi.kz (largest fintech; potential enterprise customer)
- BTS Digital

**Localization effort:** **HIGH.** Real translation work, both scripts, significant model delta. **But** ISSAI has done the hard work already — partnership-led entry is feasible.

**Strategic note:** Kazakhstan may want to *partner as peers* not *receive Turkish tech*. Co-branding with ISSAI is smarter than "Bora.kz powered by OllamaTR."

---

### 1.4 Türkmence (Turkmen) — Priority #4 (deprioritized)

**Linguistic proximity to TR:** ~70%. Oğuz branch (same as TR and AZ). Should be closer than Azerice on paper but the country's isolation has frozen the language register.

**Script:** Latin (since 1993).

**AI ecosystem maturity:** **Essentially zero.** Closed economy. Internet heavily restricted. No academic AI presence visible to the West.

**Existing models:** None of consequence.

**Government + business sentiment:** Authoritarian. Closed. Not a real market for a B2C/B2SMB AI product in Y1-Y5. **Skip until political opening.**

---

### 1.5 Kırgızca (Kyrgyz) — Priority #5

**Linguistic proximity to TR:** ~40%. Kıpçak branch. Closer to Kazakça than TR.

**Script:** Cyrillic.

**AI ecosystem maturity:** Small but real. American University of Central Asia (Bishkek) has CS programs. Some startups.

**Existing models:** Sparse. mBERT coverage. Some community work.

**Government + business sentiment:** Most TR-friendly Central Asian government. Bishkek hosts Manas Üniversitesi (TR-KG joint state university). Active TIKA presence.

**Why #5 not higher:** TAM too small (5M) to justify standalone investment. **Bundle with KZ as "Bora Orta Asya" combined launch.**

---

## 2. Turkic Diaspora Map (TR + EU + US)

### 2.1 Europe (priority diaspora)

| Country | Turkish-origin pop | Notes |
|---|---|---|
| Germany | 3.0M+ | Largest. 2nd/3rd gen. Heritage-language anxiety high. DİTİB network strong. |
| France | 700K | Concentrated Strasbourg/Lyon. CCMTF mosque federation. |
| Netherlands | 500K | High civic integration. Diyanet NL active. |
| Austria | 350K | Vienna/Linz. Tense politics around Türkçe. |
| Belgium | 250K | Gent/Antwerp clusters. |
| UK | 500K (incl. KKTC + mainland) | London-heavy. Different profile: more business migration than Gastarbeiter. |
| Switzerland | 130K | Zurich/Basel. |
| Sweden | 150K | Stockholm. Assyrian-Süryani mix complicates. |

**Total EU Turkish diaspora: ~5.5M.** This is bigger than Norway's entire population. It is a real market.

### 2.2 Why diaspora cares about a TR AI tool

1. **Heritage language preservation.** 3rd-generation kids in Berlin speak Almanca > Türkçe. Parents want a Türkçe AI tutor. OllamaTR + Türkçe voice mode = "Çocuğumla Türkçe konuşan AI."
2. **KOBİ ties to TR market.** ~50K diaspora-owned businesses trade with TR. They need TR-language contract review, supplier emails, KDV/fatura help. OllamaTR runs local → KVKK + GDPR both satisfied.
3. **Bureaucracy.** Almanya'da yaşayan TR vatandaşları deal with Aufenthaltstitel + nüfus + askerlik + emeklilik translation hell. OllamaTR as a "translator that understands both sides."
4. **Identity / pride.** A Turkish-made AI tool that works in Berlin is a status object for the 25-40 yaş Türkiyeli kesim. **Soft power product.**

### 2.3 How to reach diaspora

- **DİTİB / Diyanet networks** — 900+ mosques in Germany alone. One-time digital literacy event per mosque = 200K reach in a quarter.
- **YTB (T.C. Cumhurbaşkanlığı Yurtdışı Türkler ve Akraba Topluluklar Başkanlığı)** — official diaspora outreach arm. Has budget for "Türkçe yaşatma" projects. **Direct application possible.**
- **Diaspora media**: Türkische Allgemeine Zeitung, Sabah Avrupa, Hürriyet Almanya, NTV Avrupa. Cheap CPMs, high trust.
- **Diaspora YouTubers**: Almanya'da Türk kanalları (Ruhi Çenet diaspora content, Almanyalı abi/abla format).
- **TR consulates** — Berlin, Köln, Düsseldorf, Frankfurt, München. Can host "OllamaTR ile Türkçe AI" demo nights.
- **Üniversite Türk Öğrenci Dernekleri** — every major EU üni has one. 200+ chapters.

### 2.4 Special diaspora segments

- **Kıbrıs Türkleri (KKTC + UK + AU)**: ~300K. Native TR speakers. Should be treated as core TR market not diaspora.
- **Bulgaristan Türkleri**: ~600K. Many bilingual. Cross-border KOBİ activity with TR.
- **Yunanistan Batı Trakya Türkleri**: ~120K. Politically sensitive — handle as "Türkçe konuşan AB vatandaşları" not "azınlık."
- **Ahıska Türkleri**: ~500K diaspora across TR + KZ + US (Ohio cluster). Highly TR-loyal. Small but symbolically important.
- **Kırım Tatarları**: ~250K in TR, ~250K in Ukraine/diaspora. Tatarca-Türkçe bilingual. Political resonance post-2014/2022.
- **US Turkish diaspora**: ~500K (NYC, NJ, Houston, Chicago). Higher income. Different need profile — primarily KOBİ/professional, not heritage.

---

## 3. Strategic Brand Question: Is "OllamaTR" the Right Name?

**The problem:** "TR" is unambiguously Türkiye. A user in Bakü, Aşkabat, or Almatı reading "OllamaTR" gets a clear signal: *bu Türkiye için yapılmış, bizim için değil.*

This is **fatal for pan-Turkic expansion.** The brand telegraphs exclusion.

### 3.1 Three options

**Option A — Sub-brand per country**
- OllamaTR stays TR.
- New brands: OllamaAZ, OllamaUZ, OllamaKZ.
- *Problem:* dilutes everything. Five marketing budgets. Five SEO efforts. Five communities. **Reject.**

**Option B — Master brand "Bora AI" with country variants**
- Bora.ai is the umbrella.
- Bora.tr, Bora.az, Bora.kz, Bora.uz are localized portals sharing core infrastructure.
- OllamaTR becomes the *legacy/launch* product name, retained for TR market goodwill.
- *Advantage:* One brand, multi-country. Maps to how Yandex / Kaspersky / Telegram operate.
- *Risk:* "Bora" must be checked for negative connotations in each Turkic language (quick check: "bora" = storm/squall in TR, neutral-to-positive in AZ/UZ/KZ).

**Option C — Pan-Turkic name from day-one rebrand**
- Examples: Türkü AI, Tengri AI, Boz AI, Kut AI, Yurt AI.
- *Advantage:* Pan-Turkic resonance baked in.
- *Risk:* Loses TR brand equity already built. Tengri/Kut have pre-Islamic/Şamanist overtones that may polarize religious TR audiences.

### 3.2 Recommendation

**Option B + delayed activation.** Year 1: OllamaTR remains the only brand. Year 2 Q1: register Bora.ai and country TLDs defensively. Year 2 Q3 (Azerice beta launch): introduce "OllamaTR — Bora Ailesinin Bir Üyesi" co-branding. Year 3: Bora becomes master, OllamaTR becomes the TR product within it. **The transition mirrors how Google launched then absorbed YouTube — but in reverse: OllamaTR is the loved product, Bora is the corporate parent that emerges to expand the family.**

---

## 4. Sequencing (5-Year Plan)

### Year 1 — TR only. No dilution.
Focus: 1M TR users, KOBİ revenue, KVKK trust. **Do not say the word "Pan-Turkic" in public.**

### Year 2
- **Q1:** Defensive domain registration (Bora.ai + .tr/.az/.uz/.kz). Begin Azerice corpus collection via academic partner.
- **Q3:** **Azerbaycan beta launch.** Bakü demo event. ADA University partnership. Co-branding with PASHA. Target: 50K AZ users by Y2 close. +24M to TAM (5.5M reachable urban).

### Year 3
- **Q1:** Özbekistan launch. IT Park Tashkent partnership. Dual-script (Latin + Kiril) UI. Commission native Özbekçe fine-tune via Inha University or behbudiy collaboration.
- **Q3:** Kazakistan launch *as co-brand with ISSAI*. Bora.kz powered by KazLLM. Different commercial model: Astana Hub revenue share.

### Year 4
- **Q1:** Kırgızistan + Türkmenistan (if opened) bundled as "Bora Orta Asya."
- **Q2:** Major EU diaspora push — Almanya/Hollanda/Avusturya. YTB partnership. DİTİB digital literacy program.
- **Q3:** US diaspora B2B focus (NJ/NY KOBİ).

### Year 5
- Tatarca / Uygurca via diaspora only (mainland politically blocked).
- Bora is now a 145M-reachable-TAM brand.
- OllamaTR is the TR product within Bora.
- Revenue diversification: 60% TR / 25% AZ+UZ+KZ / 15% diaspora.

---

## 5. Geopolitics Caveat — Türk Devletleri Teşkilatı

**Upside:** The Organization of Turkic States (TDT) has explicit digitization/AI cooperation language in its 2022+ communiques. A Turkish-built, pan-Turkic AI tool aligns perfectly. Possible funding via Türk Yatırım Fonu (Turkic Investment Fund, $500M+ committed 2024). Endorsement from the body would unlock ministerial doors in 5 capitals.

**Downside / risk register:**
1. **Russia.** TDT alignment is read in Moscow as anti-Russian. Tataristan and Yakutistan are inside RF. Visible association may block any Tatarca/Yakutça work and could trigger Russian-side restrictions on Bora.kz operations.
2. **China.** Uygurca work is a third-rail. Even private OllamaTR Uygurca fine-tuning could be framed by Beijing as separatist. **Document position: Uygurca work, if any, happens via diaspora communities outside CN jurisdiction, never inside.**
3. **TR domestic politics.** Pan-Turkic rhetoric is associated with MHP / Ülkücü movement. Excessive "Turan AI" framing may alienate CHP-leaning urban tech audiences. **Brand should stay practical-commercial ("the best AI for Türkçe-speaking businesses across Eurasia") not ideological ("Turan'ın yapay zekası").**
4. **AB sürtüşmesi.** TR-EU tensions could make YTB partnership a PR liability in Germany. **Diaspora outreach should lead with civil society (mosques, schools, kültür dernekleri) not state bodies.**

**Operating principle:** Build for the *opportunity* (commercial pan-Turkic market) while *de-risking* the politics (no flags, no Turan maps, no anti-Russian rhetoric, no Uygurca activism). Quiet competence. Let the product do the politics.

---

## 6. Compute & Model Reality

**Brutal truth:** Outside TR and KZ, native Turkic LLMs are scarce and weak.

| Language | Best available open model (2026) | Production-ready? |
|---|---|---|
| Türkçe | Trendyol-LLM-7B, Cosmos LLaMA-8B, Kanarya | Yes |
| Kazakça | KazLLM-1.0-8B (Nazarbayev / ISSAI) | Mostly |
| Azerice | None natively; TR models partially work | No — wedge opportunity |
| Özbekçe | behbudiy/Llama-3.1-8B-Uzbek, tahrirchi BERT | Partial |
| Türkmence | None | No |
| Kırgızca | None of substance | No |
| Tatarca | mBERT-grade only | No |
| Uygurca | Sparse research artifacts | No |

**Implication:** OllamaTR cannot simply "ship in 5 languages" — it must **commission fine-tunes** for AZ/UZ at minimum. Budget required:

- **Azerice fine-tune** (Y2): $30-50K via academic co-funding + Azerbaijan State Oil Fund grant possibility. Base model: Llama 3.1 8B or Qwen 2.5 7B. Corpus: scrape AZ news + Wikipedia + parliamentary records + crowdsourced.
- **Özbekçe fine-tune** (Y3): $50-80K. More corpus work needed (dual-script handling).
- **Kazakça**: License/partner with ISSAI's KazLLM. No fine-tune cost; revenue share instead.
- **Türkmence, Kırgızca, Tatarca, Uygurca**: Defer to Y5 or community contribution model.

**Compute strategy:** All fine-tuning on rented A100/H100 (AWS Sagemaker, Lambda Labs). No on-prem GPU investment in Y2-Y3. If TÜBİTAK or TDT grant lands, move to dedicated cluster in Y4.

---

## SUMMARY — Top 3 Turkic Moves

OllamaTR's path to a 145M-reachable Turkic TAM hinges on three moves: (1) **rebrand under a master "Bora AI" architecture starting Y2** so country variants (Bora.tr / Bora.az / Bora.uz) inherit shared infrastructure without telegraphing Turkish-only exclusion, (2) **enter Azerbaycan in Y2 Q3 as the first non-TR market** because the linguistic delta is smallest (~80% intelligibility, shared Latin script), the political tailwind is strongest (post-Karabağ TR-AZ alignment), and a $30-50K fine-tune via ADA University or PASHA Holding partnership unlocks +24M TAM at the lowest CAC of any expansion, and (3) **partner-led entry into Kazakistan in Y3 via ISSAI co-branding** rather than direct expansion, because KazLLM is the only mature non-TR Turkic LLM and Astana's geopolitical balancing act between Moscow/Beijing/Ankara means a co-built product reads as "AI sovereignty tool" instead of "Turkish soft power" — a positioning that also de-risks the Türk Devletleri Teşkilatı angle by letting the product do the politics quietly while keeping Pan-Turkic rhetoric out of all public-facing materials.

STOP.
