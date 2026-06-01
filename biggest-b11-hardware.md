# B11 — Hardware Partnership Map for OllamaTR

**Mandate:** Map realistic hardware + compute partnerships that bundle OllamaTR as the default Turkish local-LLM stack on Turkish-OEM devices and Turkish datacenters. Goal: "Ollama-ready" / "OllamaTR Inside" SKUs.

**Scope:** 12 partner targets, ranked by realism. Each scored on partner-pain, OllamaTR-give, deal shape, timeline, risk. Closes with a TR compute-supply reality check (the H100 gap) and a 2026-2027 path.

---

## 1. Casper — Türkiye's #1 home-grown laptop OEM

**Who:** Casper Bilgisayar Sistemleri A.Ş. Istanbul-assembled laptops since 1991. Excalibur gaming line (G770/G870/G911) ships RTX 4060 / 4070 / 4080 SKUs. Nirvana business line. Sells through Teknosa, MediaMarkt, Vatan, casper.com.tr, and direct B2B to MEB (Ministry of Education) tablet tenders.

**Their pain:**
- Margin pressure from Monster Notebook (also TR) and grey-market MSI/ASUS imports.
- "AI laptop" category exploding globally (Copilot+ PC, Apple M-series neural) and Casper has no software story — they ship Windows + a wallpaper.
- MEB / EBA tablet tender wants a "millî AI" angle; Casper currently has none.

**Their opportunity:** Be the first Turkish laptop with a pre-installed Turkish LLM. "Casper Excalibur AI — Türkçe yapay zeka, bulut yok, veri Türkiye'de kalır" is a billboard headline.

**What OllamaTR brings:**
- TR brand + KVKK-clean story (verified by legal-kvkk.md in this repo).
- Pre-tuned model picker (qwen2.5:7b for 16GB SKUs, llama3.1:8b-q4 for 8GB, gemma2:2b for 4GB Nirvana).
- Co-branded onboarding wizard (already built — see app/ wizard flow).
- Community channel (Discord/Telegram) for end-user support — Casper saves on tier-1 calls.

**Deal structure:**
- **Year 1 (no money):** OllamaTR ships free pre-install on 1 SKU (Excalibur G770 RTX 4060). Casper does co-marketing ("Yerli AI ile geliyor"). OllamaTR gets logo on box + Casper case study.
- **Year 2 (rev share):** Premium "AI Pro" tier inside OllamaTR (advanced models, voice, RAG over local docs) — 30/70 Casper/OllamaTR split on upsell.
- **Year 3 (OEM license):** Per-unit license ($2-5/unit) on all AI-branded SKUs.

**Contact path:** Casper VP Product → introduction via Endeavor Türkiye or TOBB Yazılım Meclisi. Casper's marketing team is reachable; product team is gatekept by Altan İpek (founder). Cold path: LinkedIn → Mert Erkal (CMO bench) → product. Warm path: Bilkent Cyberpark mafia (see #9).

**Timeline:** 6 months to pilot SKU. 12 months to second SKU + co-marketed launch. 18 months to OEM license if Year-1 metrics land.

**Realistic? YES — highest-realism partner on this list.** Casper is a Turkish OEM that needs a Turkish AI story and has no in-house alternative. Their only competitor (Monster) has the same gap. First-mover lock-in window is open through ~Q2 2027.

**Risk:**
- Casper's MEB tender dependency means they'll demand a kamu (public-sector) angle, which forces KVKK Madde 6 hardening earlier than OllamaTR's roadmap.
- Casper might insist on exclusivity — refuse anything broader than "Turkish laptop OEM exclusivity for 12 months."
- Windows + Ollama install footprint must stay under 8GB to not eat the SSD budget on entry SKUs.

---

## 2. Vestel — Türkiye's consumer-electronics giant

**Who:** Vestel Elektronik (Manisa OSB). Largest TV maker in Europe by volume (OEM-supplies Toshiba, JVC, Hitachi badges across EU). Vestel-branded TVs, beyaz eşya, EV chargers. Recent push into "Vestel Akıllı" (smart home), "Vestel Venus" mobile (mostly dormant), and a stated AI-strategy via Zorlu Holding's tech arm.

**Their pain:**
- TV margins gutted by Chinese (Hisense, TCL, Xiaomi). Pure-hardware play dying.
- Need a software / services layer to defend ASP. Tried "Vestel Smart Center" — flopped.
- EU pressure on data sovereignty (Vestel ships into Germany/UK at scale) — KVKK-equivalent GDPR compliance is a board-level topic.
- Vestel R&D in Manisa has ~1,500 engineers but no LLM stack.

**Their opportunity:** Edge LLM in a TV / set-top box / smart appliance for non-cloud voice control. "Vestel TV ile konuş — internetin kapalıyken bile çalışır." Particularly relevant for EU markets where "no data leaves device" is a sellable feature.

**What OllamaTR brings:**
- ARM-optimized small models (gemma2:2b, qwen2.5:1.5b) — Vestel TVs run ARM SoCs (Realtek RTD2871, Amlogic). OllamaTR has the curation work; Vestel has the hardware integration team.
- Turkish + English + German + Arabic language coverage (matches Vestel's export geography).
- Privacy story that ships into EU.

**Deal structure:**
- **R&D phase (6 months):** Joint PoC on one Vestel TV reference board. Vestel funds 1 engineer; OllamaTR provides model + runtime tuning. No money exchanged.
- **OEM license (Year 2+):** Per-unit license on smart TVs that ship the LLM-voice feature. $0.50-1.50/unit at Vestel volume (~10M TVs/yr) is meaningful ARR.
- **Vestel Soft revenue share:** If LLM enables subscription services (smart-home automation, recommendation), 15-20% rev share.

**Contact path:** Vestel R&D Genel Müdür Yardımcısı (Cengiz Ultav-era contacts still active). Path via Zorlu Holding's tech advisor circuit. TOBB or Manisa Sanayi Odası is the official path. ITU-ARI Teknokent is the warm path (Vestel has a presence there).

**Timeline:** 12 months to PoC. 18 months to one shipping SKU (likely a flagship 4K TV). 24 months to OEM rollout if PoC lands. Slower than Casper because Vestel's hardware cycles are long.

**Realistic? YES — but slow.** Vestel is the highest *ceiling* partner (10M+ TVs/yr) but slowest *velocity* (TV firmware cycles, EU compliance reviews). Treat as a long bet.

**Risk:**
- Vestel may try to white-label OllamaTR as "Vestel AI" with no co-branding — must hold the line on logo placement.
- Realtek/Amlogic SoCs are weak; PoC may fail on perf grounds. Need fallback plan (external NPU module).
- Politically connected (Zorlu Holding) — partnership terms will be hardball.

---

## 3. Türk Telekom Bulutu (TT-Cloud / TTCloud) — TR's #1 telco DC

**Who:** Türk Telekom's cloud arm. Datacenters in Ankara (Gölbaşı), Istanbul, İzmir. T3-certified. Hosts kamu (public sector) workloads under KVKK Madde 6 conditions. Has GPU SKUs (limited — mostly T4 / A100 PCIe, not H100 at scale).

**Their pain:**
- Losing enterprise workload to AWS Frankfurt / Azure West Europe despite KVKK rhetoric.
- "Millî bulut" narrative is strong politically but commercially they're a thin orchestration layer over commodity hypervisors.
- No native AI/LLM product. Customers asking "where's your OpenAI competitor?" and TT-Cloud has nothing.

**Their opportunity:** Be the *managed Ollama* of Türkiye. "OllamaTR Cloud — Türkiye'de barınan, KVKK-uyumlu, Türk Telekom altyapısı." Sells to: KOBİ (SMB), finance (BDDK requires data-in-TR), healthcare (KVKK Madde 6 sensitive data), kamu.

**What OllamaTR brings:**
- The brand. TT-Cloud has zero AI brand equity; OllamaTR's Turkish-community story is exactly what TT-Cloud's marketing needs.
- Pre-built model catalog + Turkish-tuned configs.
- KVKK-clean legal copy (already written — see legal-kvkk.md).

**Deal structure:**
- **OllamaTR Cloud powered by Türk Telekom:** White-label managed Ollama. TT-Cloud provides infra (GPU, network, T3 DC). OllamaTR provides product, brand, support.
- **Rev share:** 60/40 TT-Cloud/OllamaTR on hosted-LLM subscriptions (TT-Cloud takes more because they carry the infra capex).
- **Joint sales:** TT-Cloud's enterprise sales team sells OllamaTR Cloud as an add-on to existing TT-Cloud contracts.

**Contact path:** TT-Cloud Genel Müdür → introduction via BTK (Bilgi Teknolojileri ve İletişim Kurumu) network or TÜBİTAK BİLGEM. Türk Telekom is privatized but politically supervised; the right intro is via a Cumhurbaşkanlığı Dijital Dönüşüm Ofisi (CBDDO) advisor.

**Timeline:** 12 months. TT-Cloud is bureaucratic but motivated — they need an AI story for 2027 budget cycle. Pilot in 6 months, commercial launch in 12.

**Realistic? YES — high realism, medium velocity.** TT-Cloud is the obvious partner for the managed-cloud angle. Their political mandate aligns.

**Risk:**
- TT-Cloud's GPU inventory is thin; they may not be able to serve the demand if it lands.
- Procurement is slow (KIK / 4734 logic creeps in even on private deals).
- TT-Cloud may want exclusivity, which would block Vodafone / Turkcell deals. Negotiate carve-outs.

---

## 4. Vodafone Bulut (Vodafone İdea / Vodafone Business TR)

**Who:** Vodafone Türkiye's cloud arm. DCs in Istanbul. Smaller than TT-Cloud, more enterprise-focused. Strong in finance and retail verticals (Yapı Kredi, Migros relationships).

**Their pain:** Same as TT-Cloud but worse — they're #2 in the "millî bulut" narrative and the political tailwind goes to Türk Telekom. They need a differentiator.

**Their opportunity:** Same play as TT-Cloud but positioned to *private-sector enterprise* rather than kamu. "Vodafone Business + OllamaTR" targets BDDK-regulated banks and KVKK-sensitive retail.

**What OllamaTR brings:** Same as TT-Cloud, plus Vodafone gets the differentiator advantage of being able to say "we beat TT-Cloud to the Turkish-LLM cloud."

**Deal structure:**
- Non-exclusive managed-Ollama partnership.
- 55/45 Vodafone/OllamaTR (slightly better OllamaTR cut than TT-Cloud because Vodafone needs the win more).
- Co-marketing budget from Vodafone Business — they have real marketing dollars.

**Contact path:** Vodafone Business Türkiye Genel Müdürü → reachable via Endeavor / TUSIAD network. Faster than TT-Cloud.

**Timeline:** 9-12 months. Faster than TT-Cloud because Vodafone is more commercial.

**Realistic? YES.** Pursue in parallel with TT-Cloud. Whoever moves first gets the better deal; if both close, OllamaTR wins twice.

**Risk:**
- Vodafone Türkiye's strategic priorities shift with Vodafone Group HQ in Newbury (UK) — partnerships can get deprioritized at parent-co budget cycles.
- Smaller GPU inventory than TT-Cloud.

---

## 5. Turkcell Veri Merkezi (Turkcell Data Center)

**Who:** Turkcell's DC arm. DCs in Gebze, İzmir, Ankara. T3+ certifications. "Lifecell Cloud" was the brand at one point. Hosts Turkcell's own AI workloads (BiP, GAİN, Yaani).

**Their pain:** Turkcell has *its own* AI ambitions (BiP AI assistant, Yaani Premium AI). Less hungry for a partnership — more risk of "we'll build it ourselves."

**Their opportunity:** They've *tried* to build it themselves and the BiP AI assistant is mediocre. A productized OllamaTR could short-circuit their internal team's roadmap.

**What OllamaTR brings:** Speed-to-market vs. their internal effort.

**Deal structure:**
- This is a tougher sell — Turkcell will either acquire (unlikely at OllamaTR's stage) or build (more likely). Best play: OEM the OllamaTR runtime *inside* Turkcell products (BiP, GAİN) as a quiet infrastructure partner.
- Per-API-call licensing, no co-branding (Turkcell won't share the brand).

**Contact path:** Turkcell Teknoloji A.Ş. — runs the R&D. Path via Koç Holding / TÜSİAD network or Maltepe Plaza tech leadership.

**Timeline:** 18-24 months. Turkcell's internal NIH (not-invented-here) bias is the highest of the three telcos.

**Realistic? CONDITIONAL — only if positioned as infrastructure, not product.** Don't pitch a co-branded cloud; pitch a runtime license.

**Risk:**
- Highest "they'll build it themselves" risk on the list.
- Turkcell's procurement is slow even for vendor deals.
- Brand dilution risk if you accept their no-co-brand terms.

---

## 6. AtlasCloud, Vargonen, VBT — Mid-tier TR cloud players

**Who:**
- **AtlasCloud** — Boutique TR cloud. KVKK-positioned. Smaller GPU inventory but flexible.
- **Vargonen** — Çorlu-based DC. Strong on bare-metal and dedicated hosting. Less GPU presence.
- **VBT (Veri Bilim Teknoloji) / Veripark-adjacent** — boutique cloud + consulting. Often layered on top of TT-Cloud / AWS.

**Their pain:** Squeezed between TT-Cloud (scale) and hyperscalers (everything else). Need a differentiator. KVKK-AI is exactly that.

**Their opportunity:** Be the *first* managed-Ollama in TR — easier to move than TT-Cloud. Lower-friction partnership for OllamaTR's MVP phase.

**What OllamaTR brings:** Brand, product, end-user demand.

**Deal structure:**
- **Reference architecture partnership.** OllamaTR publishes "deploy on AtlasCloud" / "deploy on Vargonen" guides. Affiliate-style referral fee (10-15% of first-year revenue from referred customers).
- **No exclusivity.** OllamaTR stays multi-cloud.
- Compute credits to OllamaTR's own dev/community needs (~$5-20K/yr in-kind).

**Contact path:** Direct outreach — these are small teams, founders reachable on LinkedIn. AtlasCloud founder is active in TR cloud-community Slack groups.

**Timeline:** 3-6 months. Fastest partnership velocity on this entire list.

**Realistic? YES — START HERE.** These are the partnerships that get done in Q1 and prove the model before approaching TT-Cloud / Vodafone / Turkcell.

**Risk:**
- Mid-tier cloud reliability concerns (smaller incident-response teams).
- May not scale if OllamaTR Cloud demand spikes.
- Reputation risk if one of them has a public outage on day-2.

---

## 7. ASELSAN — TR defense AI

**Who:** State-owned defense electronics. ~10K engineers. AI division does ISR (intelligence, surveillance, reconnaissance), targeting, sensor fusion. Procurement gates: NATO clearance, T.C. Savunma Sanayii Başkanlığı (SSB) approval.

**Their pain:** US/European AI exports restricted under ITAR-adjacent rules. Need indigenous AI stack.

**Their opportunity:** OllamaTR as a *civilian* foundation for an air-gapped, classified-network local-LLM deployment.

**What OllamaTR brings:** Civilian-licensed (Apache-2 / MIT compatible) stack with no US-export footprint on the wrapper layer (underlying models still have license terms but the orchestration layer is clean).

**Deal structure:**
- This is **not** a commercial deal. It's a strategic-government-vendor relationship.
- Procurement via SSB / KIK with multi-year framework agreement.
- Custom hardened build delivered under contract.

**Contact path:** SSB tedarik kanalları. Not direct.

**Timeline:** 24+ months. Defense procurement cycles are years.

**Realistic? FUTURE OPTION.** Document, monitor, but do not pursue actively in 2026-2027. The KVKK Madde 6 / classified-data overhead and the political-exposure risk (anything Bayraktar-adjacent has international press attention) outweighs the revenue.

**Risk:**
- Political exposure (international press scrutiny).
- Sanctions/export-control entanglement for any non-TR co-founders or investors.
- Lock-in to a single-customer dependency.
- Brand reputation impact in commercial / open-source community.

**Verdict:** Park it. Revisit when OllamaTR has commercial scale and can absorb the political tail risk.

---

## 8. AYESAŞ / HAVELSAN — Kamu (public sector) AI

**Who:**
- **HAVELSAN** — state-owned C4ISR + simulation + e-government software. Hosts kamu workloads. Has an "AI Factory" initiative.
- **AYESAŞ** — ASELSAN subsidiary for avionics + display systems.

**Their pain:** HAVELSAN runs much of e-Devlet adjacent infrastructure and has been told to add AI to everything. They have neither the talent nor the model.

**Their opportunity:** OllamaTR as the LLM layer underneath HAVELSAN's e-government and kamu-cloud offerings.

**What OllamaTR brings:** Product + brand + Turkish-community credibility (which kamu cares about because politicians cite GitHub stars in budget defenses).

**Deal structure:**
- **Government RFP path.** HAVELSAN posts a tender for an "indigenous LLM platform"; OllamaTR responds as prime or sub.
- **Framework agreement** (çerçeve anlaşma) at SSB / Cumhurbaşkanlığı Dijital Dönüşüm Ofisi (CBDDO) level. Multi-year, multi-agency utilization.
- License + services revenue. Defense-style pricing (high per-seat, low volume).

**Contact path:** HAVELSAN's AI Factory team → via CBDDO advisor network or TÜBİTAK BİLGEM cross-pollination. Slow but well-defined path.

**Timeline:** 18-24 months to first signed RFP. 6-9 months of relationship-building before any RFP is even posted.

**Realistic? CONDITIONAL — yes if OllamaTR has KVKK Madde 6 hardening done by Year 2.** Without that, HAVELSAN can't deploy on classified networks and the deal collapses.

**Risk:**
- Same political-exposure tail as ASELSAN (lower, but present).
- Heavy compliance overhead (KVKK Madde 6, ISO 27001, KAYS/KAMUNET integration).
- Payment cycles are 12-18 months past delivery — cashflow burden.

---

## 9. Bilkent Cyberpark / Teknopark İstanbul / ITU-ARI Teknokent

**Who:** Technoparks. Tax-advantaged R&D zones. Bilkent Cyberpark (Ankara, 400+ companies), Teknopark İstanbul (Pendik, ASELSAN-anchored), ITU-ARI Teknokent (Maslak / Ayazağa).

**Their pain:** Need to fill their incubator slots with credible AI startups. Most of what they get is e-commerce SaaS clones.

**Their opportunity:** Not a hardware partnership in the literal sense, but the *gateway* to:
- Compute credits via affiliated startups (Teknopark startups get TÜBİTAK 1512 / 1507 grants → can sponsor compute).
- Casper / Vestel / TT-Cloud introductions (technopark networks overlap with these OEM R&D teams).
- KOSGEB / TÜBİTAK funding referrals.

**What OllamaTR brings:** A credible TR-AI flagship resident that the technopark can put on its homepage. Pitch deck, demo days, "yerli AI başarı hikayesi" PR.

**Deal structure:**
- **OllamaTR establishes a presence (legal entity address) inside one technopark.** Tax advantages on R&D salaries (50%+ income tax exemption for R&D personnel — this is real money).
- Technopark provides intro letters, demo day slots, government-grant application support.
- No revenue exchange in either direction.

**Contact path:** Direct application. Bilkent Cyberpark accepts AI startups fast; Teknopark İstanbul slower (ASELSAN-gated).

**Timeline:** 3-6 months for entity setup + tenancy.

**Realistic? YES — DO THIS REGARDLESS.** This isn't really a "partnership," it's infrastructure for everything else on this list. Bilkent or ITU-ARI both work; Teknopark İstanbul only if defense angle is later pursued.

**Risk:**
- Tax-advantage rules change with government priorities.
- Some technoparks require Turkish-citizen majority shareholding — check OllamaTR's cap table.

---

## 10. Baykar / Bayraktar Defence

**Who:** Baykar Teknoloji. UAV manufacturer (TB2, Akıncı, Kızılelma). AI division working on autonomous targeting + sensor fusion. Politically the most exposed company in TR tech.

**Their pain:** Same as ASELSAN — indigenous AI stack required for export-controlled use cases.

**Their opportunity:** OllamaTR as a local-LLM for ground-station operator interfaces, doctrine assistants, post-mission analysis tooling.

**Deal structure:** Same shape as ASELSAN. Procurement-led, classified, custom-build.

**Realistic? FUTURE OPTION — SAME AS ASELSAN.** Park it. Higher political-exposure risk than ASELSAN because Baykar has international press attention (Ukraine, Libya, etc.).

**Risk:**
- International press scrutiny of any supplier.
- Sanctions exposure for non-TR cap-table participants.
- Reputational damage in open-source community (where Ollama upstream lives).
- Single-customer dependency.

**Verdict:** Document, do not pursue.

---

## 11. Trendyol / Hepsiburada / n11 — Distribution channels

**Who:** TR's e-commerce big three. Trendyol (Alibaba-backed, dominant), Hepsiburada (publicly listed, recovering), n11 (Doğuş Group, smaller).

**Their pain:** Margin compression. Need traffic-driving differentiated SKUs. "AI laptop" category is searched but under-supplied with TR-branded options.

**Their opportunity:** Become the exclusive launch channel for "OllamaTR-certified" Casper/Monster SKUs. Sponsored landing pages, dedicated category ("Yapay Zeka Bilgisayarları — Türk yapımı").

**What OllamaTR brings:** Category creation + co-marketing + a story their content team can run.

**Deal structure:**
- **Co-marketing partnership** with the OEM (Casper) — Trendyol gets exclusive launch window (4-6 weeks) on an OllamaTR-bundled SKU.
- Sponsored placement on Trendyol homepage.
- Affiliate revenue share to OllamaTR on premium-tier upsell (5-10%).

**Contact path:** Trendyol Category Manager (electronics). Reachable via existing Casper / Monster relationships — the OEM brings OllamaTR into the meeting.

**Timeline:** Couples to Casper timeline. Once Casper SKU is real, Trendyol negotiation takes 4-6 weeks.

**Realistic? YES — but downstream of Casper.** No point talking to Trendyol until there's a SKU to sell.

**Risk:**
- Trendyol's Alibaba ownership creates a potential data-sovereignty messaging conflict — handle carefully.
- E-commerce promo cycles are short; first weeks matter disproportionately.

---

## 12. Migros / BIM / A101 — TR retail for "AI in a box"

**Who:** Turkish grocery + general retail. Migros (Anadolu Endüstri), BIM (publicly listed, hard-discount), A101 (private, hard-discount). Sell electronics in their "non-food" rotations — BIM and A101 famously sell laptops, tablets, robot vacuums on Wednesday specials.

**Their pain:** Their non-food rotations are a margin opportunity but they don't have differentiated SKUs. Currently selling commodity Chinese tablets that get returned.

**Their opportunity:** "OllamaTR AI Mini" — a sub-$500 mini-PC (Intel N100 or AMD Ryzen 5 5500U class) with OllamaTR pre-installed and a Casper or Monster badge. Sold via BIM/A101 Wednesday rotation. Positioned as "KOBİ için yapay zeka kutusu" (AI box for SMBs) — a category that doesn't exist in TR retail today.

**What OllamaTR brings:** A SKU concept the retailers can't invent themselves. Brand. Pre-installed product. Customer support via OllamaTR community channels (offloads retailer's return desk).

**Deal structure:**
- **Three-way deal:** OEM (Casper or a smaller assembler like Quadro / Exper) + OllamaTR + Retailer (BIM/A101/Migros).
- OEM ships hardware at razor margin. OllamaTR licenses runtime. Retailer takes volume markup. OllamaTR gets per-unit license ($3-8/unit) + upsell on premium tier.
- Hard-discount channels demand low SKU cost (<$400 retail).

**Contact path:** BIM and A101 buyers are notoriously gatekept and demand volume commitments. Migros easier (more flexible category buyers). Path: OEM (Casper) brings the SKU and OllamaTR rides along.

**Timeline:** 12-18 months. Hard-discount procurement cycles are quarterly; first sell-in requires 6 months of relationship.

**Realistic? CONDITIONAL — yes if mini-PC SKU lands at <$400 BoM.** This is the big-volume long-tail play. If it works, it puts OllamaTR in millions of TR households at retail.

**Risk:**
- Hard-discount channels are brutal on margin and returns.
- If the device underperforms on entry-level CPUs, return rates kill the partnership.
- Migros/BIM/A101 will not pay co-marketing — pure SKU economics.

---

## TR LLM Compute Reality — The H100 Gap

**The hard truth:** As of 2026, Türkiye has **no NVIDIA H100 datacenter at scale**. None of TT-Cloud, Vodafone, Turkcell currently operates a multi-thousand-H100 cluster comparable to what hyperscalers run in Frankfurt or Dublin. What exists in TR:

- **TT-Cloud:** A few hundred A100 / H100 PCIe (not SXM, much lower interconnect bandwidth). Suitable for inference, not large-scale training.
- **TÜBİTAK ULAKBİM TRUBA (TR-Grid):** Academic compute. Mixed V100 / A100. Not commercial-grade SLA.
- **TÜBİTAK BİLGEM:** Limited internal cluster, not commercially available.
- **Defense (ASELSAN/HAVELSAN):** Internal clusters, never accessible to civilian workloads.
- **Universities (ITU, METU, Bilkent):** Small clusters, V100/A100, research-only.

**Who fills the gap?**

1. **Inference-only path (2026):** Use existing TR A100/H100-PCIe inventory at TT-Cloud / Vodafone for *inference of small models* (qwen2.5:7b through 32b, llama3.1:70b at 4-bit). This is exactly OllamaTR's sweet spot — these models fit on A100 80GB and even A100 40GB at 4-bit quantization. **OllamaTR does not need TR-based training infrastructure; it needs TR-based inference. The infrastructure exists today for the small-to-medium model tier.**

2. **Cross-border training (2026-2027):** Training of any new TR-tuned model happens in Frankfurt (AWS / Lambda / CoreWeave) or US (Lambda / Together). KVKK is fine here as long as the training data is open / non-personal. OllamaTR's model curation work is mostly cross-border; only the *deployment* must be in TR.

3. **Sovereign GPU buildout (2027+):** Türkiye has announced intent (CBDDO + SSB) to build a "millî AI veri merkezi" by 2028. Realistic delivery is 2029+. OllamaTR should *not* depend on this. Position to be the natural software stack *when* it lands, but don't bet the business on it.

4. **NPU at the edge as the unlock (2026-2027):** Intel Lunar Lake (38 TOPS NPU), AMD Ryzen AI 300 (50 TOPS), Apple M-series — these run 7B-class models at usable speeds *without datacenter compute at all*. **Casper / Vestel SKUs shipping Lunar Lake or Ryzen AI in 2026-2027 give OllamaTR a zero-cloud-compute distribution path.** This is the most under-priced opportunity on the entire list.

**The realistic 2026-2027 compute path for OllamaTR:**

- **Inference at the edge:** Lean into Casper / Vestel NPU SKUs. Zero datacenter dependency, infinite scalability (every laptop is its own server), perfect KVKK story (data never leaves device).
- **Inference in TR cloud:** Partner with TT-Cloud / Vodafone / AtlasCloud for the *managed* tier (SMBs that want hosted but TR-based). Their existing A100 inventory is sufficient through 2027 for OllamaTR's expected scale.
- **Training abroad, deploy at home:** All model fine-tuning happens on hyperscalers (Frankfurt). Distilled / quantized artifacts ship to TR. Legal-clean because training data is open.
- **Avoid the H100 sovereignty trap:** Do not promise "all training in TR" — it's not deliverable until 2029+ and it's not what users actually need. KVKK applies to *data*, not to training infrastructure.

---

## Top-3 Hardware Bets — One-Paragraph Summary

OllamaTR's top-3 hardware bets, in priority order: **(1) Casper** — Türkiye's #1 laptop OEM has a glaring "no AI software story" gap and is reachable in 6 months for a co-branded "Casper AI" SKU with pre-installed OllamaTR; first-mover lock-in window closes by Q2 2027 so move now. **(2) Türk Telekom Bulutu (TT-Cloud)** for "OllamaTR Cloud powered by TT-Cloud" managed-Ollama partnership — they have the political mandate, the DC footprint, and zero AI brand equity to defend, making OllamaTR the obvious vehicle for their "millî AI" narrative; pursue Vodafone Bulut in parallel as both leverage and fallback. **(3) AtlasCloud / Vargonen / VBT** as Q1 quick-win partnerships to prove the managed-Ollama model in 3-6 months before approaching TT-Cloud, plus parallel **Bilkent Cyberpark / ITU-ARI Teknokent** residency for R&D tax advantage and warm intros into Casper / Vestel / TT-Cloud product teams. Skip ASELSAN/Baykar (political risk outweighs revenue at OllamaTR's stage); treat Vestel as a 24-month long bet (highest ceiling, slowest velocity); treat Trendyol/Hepsiburada/BIM as downstream channels that only activate after Casper SKU exists. The deepest under-priced opportunity across this entire map is **NPU-equipped 2026-2027 laptops (Intel Lunar Lake, AMD Ryzen AI 300) shipping in Casper SKUs** — that combination lets OllamaTR sidestep the entire TR H100-datacenter gap with a zero-cloud, perfect-KVKK edge-inference distribution model that no competitor can match.

**STOP.**
