# OllamaTR Production-Readiness Audit — TÜKETİCİ HUKUKU + MARKA / IP
**Auditor:** Legal-2
**References:** 6502 Sayılı Tüketici Kanunu (TKHK); Mesafeli Sözleşmeler Yönetmeliği; 6769 Sayılı Sınai Mülkiyet Kanunu (SMK); Ticari Reklam ve Haksız Ticari Uygulamalar Yönetmeliği; third-party model licenses (Meta Llama 3 Community License, Google Gemma Terms, Tongyi Qianwen, Cohere CC-BY-NC 4.0, Apache 2.0, MIT, DeepSeek License).
**Scope:** `C:\Users\eruo0\Desktop\OllamaTR\app\src\` (consumer-facing pages, footer, model catalog).
**Date:** 2026-05-26

---

## Verdict

**DO NOT SHIP** — multiple independent BLOCKERS in (i) mandatory pre-contract disclosure under TKHK / Mesafeli Sözleşmeler Yönetmeliği, (ii) third-party model licensing for the paid tiers (Command-R-Turkish-35B is CC-BY-NC and is included in "Tüm 100+ model erişimi" of the 25.000–60.000₺ KOBİ tier), and (iii) trademark / endorsement misuse risk for government and academic logos used without disclaimer.

The good news: the consumer-side fixes are paperwork (footer entries, an "İade ve Cayma" page, KDV labels, three short disclaimer sentences) and one license swap. The site can be cleared for launch within a single dev-day once Legal supplies the corporate fields.

---

## Executive summary

1. **Pricing page advertises prices (149₺/ay, 25.000–60.000₺) with no KDV dahil/hariç label and no Cayma Hakkı disclosure** — twin violations of TKHK m.48–m.49 and Mesafeli Sözleşmeler Yönetmeliği m.5. This is the single most exposed surface in the codebase.
2. **Footer (`app/src/components/Footer.tsx`) lacks every mandatory satıcı/sağlayıcı disclosure**: no şirket unvanı, no MERSIS no, no vergi no, no adres, no KEP, no çağrı merkezi, no telefon. The Turkish Ministry of Trade can issue an idari para cezası on this alone.
3. **`Command-R-Turkish-35B` is shipped in the 25.000–60.000₺ KOBİ catalog under "Tüm 100+ model erişimi"** but its underlying Cohere Command R license is CC-BY-NC 4.0 — non-commercial. Selling commercial access to it is a license violation regardless of whether the file is redistributed.
4. **Testimonials on Fiyatlandirma.tsx (Selin A. / Burak T. / Zeynep K.) are presented as real customer quotes** with company affiliations ("CTO, TeknoStart", "ODTÜ öğrencisi") and zero illustrative-only marker → haksız ticari uygulama (Ticari Reklam Yönetmeliği m.7).
5. **Six government / academic logos** (KOSGEB, TÜBİTAK, Teknopark İstanbul, İTÜ ARI Teknokent, BİLGİ YZ Merkezi, TYZİ) rendered with "EKOSİSTEM ORTAKLARIMIZ" heading and the line "Türkiye'nin AI ekosistemini birlikte büyütüyoruz" — implies an MoU / endorsement relationship. Without a signed protocol, this is trademark misuse + misleading endorsement.
6. **The "OllamaTR" wordmark** (`<span>Ollama</span><span>TR</span>` in Footer.tsx:30-31, repeated in Navbar) strongly implies a relationship with Ollama Inc. There is no trademark disclaimer anywhere in the codebase. Ollama Inc. owns "Ollama" as the brand of its inference runtime; appending a geographic suffix does not create a defensible separate mark under SMK m.5 / m.6.

---

## Part 1 — Consumer law conformance

### 1.1 Findings table

| # | Item | Required by | Present | Severity | Evidence |
|---|------|-------------|---------|----------|----------|
| 1 | KDV dahil/hariç labeling on every advertised price | TKHK m.54; Fiyat Etiketi Yönetmeliği m.4 | ✗ NO — "149₺/ay" and "25.000₺ — 60.000₺" appear bare | **BLOCKER** | Fiyatlandirma.tsx:60–61, 83–84 |
| 2 | 14 günlük cayma hakkı disclosure (distance sales of services to consumers) | Mesafeli Sözleşmeler Yön. m.5/1(g), m.9 | ✗ NO — never referenced | **BLOCKER** | grep on `cayma`, `14 gün`, `iade` → 0 hits |
| 3 | Sağlayıcı kimlik bilgileri (unvan, adres, MERSİS no, ticaret sicil no, vergi dairesi+no) | Mesafeli Sözleşmeler Yön. m.5/1(a); ETBİS Tebliği | ✗ MISSING | **BLOCKER** | Footer.tsx — no corporate block, only "© 2025 OllamaTR" |
| 4 | İletişim bilgileri: telefon, KEP, çağrı merkezi numarası | Mesafeli Sözleşmeler Yön. m.5/1(b); TKHK m.55 | ✗ MISSING — only `mailto:iletisim@ollamatr.com` | **MAJOR** | Hakkimizda.tsx:438, 479; Footer.tsx has no contact line |
| 5 | İade / şikâyet prosedürü ve Tüketici Hakem Heyeti / Tüketici Mahkemesi bilgisi | TKHK m.68; MSY m.5/1(j) | ✗ MISSING | **BLOCKER** | grep on `şikayet`, `hakem heyeti` → 0 hits |
| 6 | "10.000+ geliştirici" — substantiable user count | Ticari Reklam Yön. m.7 (ispat yükü reklamverende) | ✗ Not substantiated; product describes itself as just-launched 2024 + Q3 GPU support "Devam Ediyor" | **MAJOR** | Hakkimizda.tsx:339, Topluluk.tsx:308, Indir.tsx:571 |
| 7 | "5.234 Discord üye / 1.876 Telegram / 234 contributor / 456 forum konu" — substantiable | Ticari Reklam Yön. m.7 | ✗ Same — invented precision figures | MAJOR | Topluluk.tsx:40,49,58,67 |
| 8 | %99.9 SLA garantisi reklamı — must be backed by a published SLA document | Ticari Reklam Yön. m.7; TKHK m.61 | ✗ No SLA published, no service credit clause, no measurement window | **MAJOR** | Fiyatlandirma.tsx:96, 125 |
| 9 | Müşteri yorumları: gerçek müşteri mi, illüstratif mi? | Ticari Reklam Yön. m.7, m.13 (görüş/öneri); | ✗ Three fictional-looking testimonials with full role/company attribution and no "temsili" işareti | **MAJOR** | Fiyatlandirma.tsx:164–183 |
| 10 | ETBİS kaydı referansı (e-ticaret faaliyeti varsa) | E-Ticaret Kanunu m.6; ETBİS Tebliği | n/a — verify if abonelik satışı yapılacak | INFO | — |
| 11 | "Kredi kartı gerektirmez" iddiası — Ücretsiz tier için doğru ama Pro/KOBİ için yanıltıcı olabilir | Ticari Reklam Yön. m.7 | Bağlam yetersiz: cümle Ana CTA'da geçiyor ama Pro 149₺/ay bir kredi kartı zinciri gerektirir | MINOR | Fiyatlandirma.tsx:483–485 |
| 12 | Öğrenci indirimi (.edu.tr → %50, 75₺/ay) doğrulama mekanizması | Ticari Reklam Yön. m.7 | İddia var, doğrulama UI yok; statik metin | MINOR | Fiyatlandirma.tsx:150–152 |

### 1.2 What the law expects on the pricing surface

Under Mesafeli Sözleşmeler Yönetmeliği m.5, **before** the consumer is bound by a distance contract (i.e. before the "Pro'ya Geç" button can lawfully accept payment), the page must disclose, in clear and understandable form:

- Sağlayıcının adı, MERSIS, adres, telefon, KEP, varsa faks
- Sözleşme konusu hizmetin temel nitelikleri
- **Vergiler dahil toplam fiyat** (TKHK m.54; price etiquette rules)
- Ödeme, ifa, teslimat, performans
- Cayma hakkının kullanım şartları, süresi (14 gün) ve usulü; cayma hakkının kullanılamadığı haller — and the SaaS exception under MSY m.15(1)(ğ) needs to be expressly invoked if it is going to be relied on
- Şikayet ve uyuşmazlık çözümü (Tüketici Hakem Heyeti / Tüketici Mahkemesi parasal sınırlar)

None of the above is on the page today. Adding a single `/iade-ve-cayma` page plus four lines in the footer is enough to clear items 2, 3, 4, 5, 10. Items 1, 8, 9 are content edits on Fiyatlandirma.tsx.

### 1.3 Distance sales SaaS carve-out — handle deliberately

If the product strategy is to invoke the SaaS exception in MSY m.15(1)(ğ) ("elektronik ortamda anında ifa edilen hizmetler... tüketicinin onayı ile derhal ifaya başlanan"), then the Pro signup flow **must capture an explicit pre-consent checkbox** ("Hizmetin derhal ifasına onay veriyorum ve cayma hakkımı bu kapsamda kullanamayacağımı kabul ediyorum"), separately from the general T&C box. Otherwise the default 14-day right applies and consumers can request a refund within that window for any reason.

---

## Part 2 — Model licensing matrix

The 25.000–60.000₺ KOBİ tier advertises "Tüm 100+ model erişimi" (Fiyatlandirma.tsx:88) and the Pro tier advertises "100+" (Fiyatlandirma.tsx:116). Every model in the catalog must therefore be cleared for commercial redistribution.

| # | Model (file:line) | Stated upstream | Likely license | Commercial OK? | Attribution required? | Attribution present? | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | Llama-3-Turkish-8B (models-data.ts:48) | Meta Llama 3 | Meta Llama 3 Community License | ✓ (≤700M MAU) | YES — "Built with Meta Llama 3" + Acceptable Use Policy link | ✗ none | **MAJOR — add attribution** |
| 2 | Mistral-Turk-7B (models-data.ts:63) | Mistral | Apache 2.0 (if from mistral-7b-v0.1/0.2/0.3 base) | ✓ | LICENSE + NOTICE | ✗ none | MINOR |
| 3 | Bora-7B (models-data.ts:78) | Invented Turkish brand | Unknown — no upstream cited | ✗ Cannot verify | n/a | n/a | **MAJOR — sourcing question** |
| 4 | Trendyol-LLM-7B-v2 (models-data.ts:93) | Trendyol (real model) | Apache 2.0 | ✓ | LICENSE + NOTICE | ✗ none | MINOR |
| 5 | Kardesler-LLM-13B (models-data.ts:108) | Invented | Unknown | ✗ Cannot verify | n/a | n/a | **MAJOR — sourcing question** |
| 6 | Gemma-2-Turkish-9B (models-data.ts:123) | Google Gemma 2 | Gemma Terms of Use | ✓ with caveats | YES — Gemma Terms § 1.1: must propagate Gemma Terms + Prohibited Use Policy + display "Gemma" attribution | ✗ none | **BLOCKER — Gemma Terms compliance is non-negotiable** |
| 7 | Turkish-Mistral-Instruct-7B (models-data.ts:138) | Mistral | Apache 2.0 (base-dependent) | ✓ | LICENSE + NOTICE | ✗ none | MINOR |
| 8 | Phi-3-Turkish-Mini-4B (models-data.ts:153) | Microsoft Phi-3-Mini | MIT | ✓ | MIT notice | ✗ none | MINOR |
| 9 | Qwen2-Turkish-7B (models-data.ts:168) | Alibaba Qwen2 | Tongyi Qianwen License Agreement (Apache-like for Qwen2-7B specifically, but Qwen2-72B/MoE require Alibaba assent at >100M MAU) | ✓ at OllamaTR scale | YES — copy notice from upstream | ✗ none | **MAJOR — add attribution** |
| 10 | **Command-R-Turkish-35B (models-data.ts:183)** | Cohere Command R | **CC-BY-NC 4.0** (Cohere's open-weights release is explicitly NON-COMMERCIAL) | **✗ NO** | n/a — cannot be sold | n/a | **BLOCKER — remove from Pro/KOBİ commercial tiers OR procure a commercial license from Cohere** |
| 11 | DeepSeek-Turkish-7B (models-data.ts:198) | DeepSeek | DeepSeek License Agreement | ✓ generally; review § restricted use cases | YES — copy license text + use-based restrictions | ✗ none | MAJOR |
| 12 | SQLCoder-TR-7B (models-data.ts:213) | Defog SQLCoder | Version-dependent: SQLCoder-7B/15B are CC-BY-SA 4.0; SQLCoder-2 is Apache 2.0 | ⚠️ Verify which | If CC-BY-SA → ShareAlike obligation; if Apache → notice | ✗ none | **MAJOR — verify version + comply** |

### 2.1 The Command-R blocker, expanded

Cohere's Command R / Command R+ open-weights release on Hugging Face is explicitly licensed CC-BY-NC 4.0 (Creative Commons Attribution-NonCommercial 4.0). A Turkish fine-tune inherits the non-commercial clause. By placing Command-R-Turkish-35B inside a paid catalog ("Pro" 149₺/ay; "KOBİ" 25.000–60.000₺ kurulum + "Yıllık bakım sözleşmesi" Fiyatlandirma.tsx:97), OllamaTR offers commercial access to a non-commercially-licensed work. This is a copyright violation that Cohere can enforce under 5846 sayılı FSEK as well as the CC license terms.

**Required fix** — one of:
1. Remove Command-R-Turkish-35B from MODELS or filter it out of Pro/KOBİ tiers and label it "Ücretsiz, ticari olmayan kullanım" only.
2. Procure a commercial license from Cohere and publish that fact.

### 2.2 Bora / Kardeşler — verify sourcing

These two are described as Türkçe community models but the file gives no upstream pointer. If they are derived from a base model (which is overwhelmingly likely at 7B / 13B sizes), the base's license still attaches. **Action:** before launch, confirm the genealogy and add base-model attribution. If they are fabrications used as catalog filler, remove them — selling a tier on the basis of non-existent models would itself be aldatıcı reklam.

---

## Part 3 — Partner endorsement / trademark misuse

### 3.1 Section context

Hakkimizda.tsx:393–447 renders an "EKOSİSTEM ORTAKLARIMIZ" section with the strapline:

> "Türkiye'nin AI ekosistemini birlikte büyütüyoruz."

This is a direct claim of joint activity. Below it, six logos are loaded from `/partners/<slug>.svg`. There is no disclaimer (e.g., "destekçi", "potansiyel partner", "logoların kullanımı temsilidir"). The hover effect upgrades from grayscale to full color, further suggesting brand authorization.

### 3.2 Per-partner risk

| Partner | Nature of entity | Risk if no MoU | Severity |
|---------|-----------------|----------------|----------|
| **KOSGEB** | Devlet kurumu (KOBİ destek) — logo is a state emblem | Implies state endorsement of a private commercial service. Highest reputational and legal exposure. SMK ve Devlet armaları kullanımı — kamu kurumu logosu için yazılı izin şart. | **BLOCKER** |
| **TÜBİTAK** | Devlet araştırma kurumu — logo tescilli | Same — implies devlet desteği / scientific endorsement. | **BLOCKER** |
| **Teknopark İstanbul** | Kuruluş ortaklı (Savunma Sanayii Başkanlığı dahil) — tescilli marka | Implies tenancy / partnership; if OllamaTR is not registered there, this is yanıltıcı | **BLOCKER** |
| **İTÜ ARI Teknokent** | İTÜ + özel sektör — tescilli marka | Same | **BLOCKER** |
| **BİLGİ Yapay Zeka Merkezi** | Üniversite birimi — kurum markası | Implies academic affiliation | **BLOCKER** |
| **Türkiye Yapay Zeka İnisiyatifi (TYZİ)** | Sivil insiyatif / dernek | Implies network membership | **MAJOR** |

### 3.3 Required fix

Either (a) remove the section entirely until written permission exists from each entity, or (b) reduce the framing to "Çalıştığımız Ekosistem" / "Topluluk bağlantılarımız" and add a footnote: "Listede yer alan kurum logoları yalnızca topluluk üyeliği / lokasyon bilgisi amacıyla gösterilmiştir; resmi bir ortaklık veya destek beyanı ifade etmez." Even this fallback requires legal review for each logo's specific terms of use, and KOSGEB/TÜBİTAK logos almost certainly cannot be displayed without a signed protocol.

---

## Part 4 — "OllamaTR" name vs Ollama Inc. trademark

### 4.1 Facts

- The brand wordmark renders as `Ollama` (white) + `TR` (red) — Footer.tsx:30–31, repeated in Navbar.
- The package directory is named `OllamaTR`.
- The marketing copy on Home.tsx:237 explicitly positions the product as "Türkçe AI altyapısı".
- The product's namesake, Ollama Inc. ([ollama.com](https://ollama.com)), runs an inference runtime that is itself the obvious thing being "Turkish-ified" — the user-facing implication is "Ollama, but Turkish".
- No trademark disclaimer exists anywhere in the codebase (grep on `trademark|tescilli|Ollama Inc|disclaim` → 0 hits).

### 4.2 Legal analysis under SMK

Under 6769 sayılı Sınai Mülkiyet Kanunu m.6/1, a sign that is identical or confusingly similar to a prior mark covering identical/similar goods or services cannot be registered. Adding a geographic suffix (TR) to an existing brand has been consistently rejected by TÜRKPATENT as insufficient differentiation when the suffix is descriptive of geography.

Even if "Ollama" is not registered in Turkey by Ollama Inc., m.6/3 (well-known mark protection under Paris Convention art. 6bis) can extend protection if Ollama Inc. demonstrates global recognition in the relevant sector, which is plausible for an AI infrastructure brand with millions of users.

Two layered risks:
1. **Marka tecavüzü** (SMK m.29) — if Ollama Inc. registers in Turkey, OllamaTR's continued use is enjoinable and damages exposure runs from notice.
2. **Haksız rekabet** (TTK m.55) — even without trademark registration, the imitative get-up "yanılgıya yer veren bir biçimde başkasının emtiası, iş ürünleri… ile karıştırılan eylemler" is independently actionable. Web designerin "Ollama" kelimesini ayırıp "TR" eklemesi, karıştırma kastını kuvvetlendiren bir görsel seçimdir.

### 4.3 Recommended action

- **Pre-launch:** add a footer line: "OllamaTR, Ollama Inc.'in herhangi bir bağlı, lisanslı veya yetkili kuruluşu değildir. 'Ollama' kelimesi, Ollama Inc.'in ticari markasıdır ve bu sitede yalnızca uyumluluk/birlikte çalışabilirlik referansı amacıyla kullanılmıştır."
- **Short-term:** seek a written non-objection (or affirmative co-brand authorization) from Ollama Inc. or, more conservatively, rebrand to a non-conflicting mark.
- **TÜRKPATENT search:** before any seri marka başvurusu, check the registry for "Ollama" filings in Turkey to size up the priority date risk.

---

## Part 5 — Misleading advertising risk consolidated

### 5.1 Testimonials (Fiyatlandirma.tsx:164–183)

Three named "customers" with specific roles. The most exposed is "Selin A., CTO, TeknoStart" claiming "OllamaTR sayesinde KVKK denetiminden tek seferde geçtik" — a verifiable factual claim (KVKK denetimi geçme iddiası) that, if fictional, is per se aldatıcı reklam under Ticari Reklam Yön. m.7. Burak T.'s "100 çalışanlı şirketimizde 6 ayda kuruldu" likewise.

Two acceptable fixes: (a) replace with real testimonials and obtain signed release; or (b) clearly mark "Temsili müşteri yorumudur — gerçek müşteri verisi değildir" and abstract the company affiliations. The current rendering is not defensible.

### 5.2 Statistics

| Claim | File:line | Status | Required action |
|-------|-----------|--------|-----------------|
| "10.000+ kullanıcı, 100+ model" | Hakkimizda.tsx:339 | Unsubstantiated | Replace with real telemetry or remove |
| "10.000+ geliştirici" | Topluluk.tsx:308, Indir.tsx:571 | Unsubstantiated | Same |
| Discord 5.234 üye / Telegram 1.876 üye / GitHub 234 contributor / Forum 456 konu | Topluluk.tsx:40,49,58,67 | Suspiciously precise; almost certainly placeholder | Replace with live API counts or remove |
| Mehmet K. 247 / Ayşe Y. 156 / Burak T. 134 contributions | Topluluk.tsx:85–87 | Placeholder | Replace with real contributor data or remove |
| 4.7 / 4.5 / 4.6 model ratings, 24.5K / 19.2K / 21.7K downloads | models-data.ts (downloads, rating fields) | Placeholder values, no source | Either source from HF stats or mark "demo" |

### 5.3 SLA %99.9

Advertised as a KOBİ tier feature (Fiyatlandirma.tsx:96, 125). The product's own roadmap shows GPU cluster support as "Devam Ediyor" (Hakkimizda.tsx:99). A 99.9% availability commitment requires (a) infrastructure that demonstrably supports it, (b) a published SLA document defining the measurement window, exclusions, scheduled-maintenance carve-outs, (c) bir hizmet kredisi / cezai şart mechanism. None of these exist in the codebase. Either deliver the SLA document and link to it, or remove the percentage.

### 5.4 "Türkiye'de barındırma" / cloud roadmap

Not currently promised as a delivered feature (grep returns no such phrase). The KVKK page positions OllamaTR as **yerel donanım** (KVKK.tsx:118) — i.e. data stays on the user's own device. This is consistent and defensible **as long as marketing copy never promises a managed Türkiye-hosted cloud**. The current state is OK; flag for future copy reviews.

### 5.5 "Eski Hugging Face contributor" / "Önceden Trendyol AI ekibinde" — team bios

Hakkimizda.tsx:25–48 attaches specific past-employment claims to four named individuals. Two notes:
- These individuals must (a) exist and (b) consent to such public disclosure (KVKK m.5/6).
- The employment claims must be true; otherwise both the named individuals and the prior employers (Trendyol, Hugging Face, Getir, Peak Games, İTÜ, Boğaziçi) have causes of action.

Mark as **MAJOR** until verified.

---

## Mandatory pre-launch fixes (BLOCKERS)

1. **Remove `Command-R-Turkish-35B` from the catalog or fence it off as Ücretsiz-only with a "Ticari kullanım için geçerli değildir" tag** — currently it is sold as part of the 25.000–60.000₺ KOBİ tier in violation of CC-BY-NC 4.0.
2. **Add KDV labeling** on every advertised price (`149₺/ay (KDV dahil)` or `(KDV hariç)` consistently across Fiyatlandirma.tsx tiers and the comparison table).
3. **Create `/iade-ve-cayma` page** disclosing the 14-day cayma hakkı, the iade procedure, and the SaaS exception under MSY m.15(1)(ğ) if the product intends to rely on it. Add a checkbox in the Pro signup flow capturing explicit pre-consent.
4. **Add şirket bilgileri block to Footer.tsx**: ticaret unvanı, MERSIS no, vergi dairesi + no, açık adres, KEP, çağrı merkezi telefonu. Also add a link to `/iletisim` with a real-time contact channel (not just `mailto:`).
5. **Add "Şikayet ve uyuşmazlık çözümü"** subsection (in footer or KVKK page) referencing Tüketici Hakem Heyeti / Tüketici Mahkemesi yetki sınırları.
6. **Add Llama 3, Gemma, Qwen2, DeepSeek attribution notices** on the Modeller page (or a dedicated `/lisans-bildirimleri` page). Gemma is the highest-risk omission because Gemma Terms § 1.1 propagation is mandatory.
7. **Add a trademark disclaimer for Ollama Inc.** in the footer, as drafted in §4.3.
8. **Either remove or re-frame the "EKOSİSTEM ORTAKLARIMIZ" section.** Government and academic logos cannot be displayed without permission. KOSGEB/TÜBİTAK in particular require formal protocol.
9. **Mark testimonials on Fiyatlandirma.tsx as illustrative** ("Temsili müşteri yorumudur") OR replace with real, signed, dated testimonials.
10. **Either deliver the SLA document or remove the "%99.9 SLA garantisi" claim** from Fiyatlandirma.tsx:96, 125.
11. **Replace or remove unsubstantiated stats** ("10.000+ geliştirici", Discord/Telegram member counts, contributor leaderboards, model download/rating fields) with real telemetry or clearly-labeled demo data.
12. **Verify SQLCoder-TR-7B base version** and apply the correct license obligations (CC-BY-SA share-alike vs Apache 2.0 notice).

---

## Recommended pre-launch fixes (not strictly required to ship, but high-value)

1. **Add a `/lisans-bildirimleri` (License Notices) page** that consolidates per-model attribution. This is cleaner than scattering NOTICE files.
2. **Build a license-aware filter in models-data.ts**: introduce a `licenseClass: 'commercial-ok' | 'non-commercial' | 'requires-review'` field; have the Pro/KOBİ tier UIs filter to `commercial-ok` automatically. Prevents future Command-R-class regressions.
3. **Add an "Öğrenci doğrulama" gate** behind the .edu.tr discount instead of advertising it as automatic.
4. **Add a real `/iletisim` page** with at least: address, telefon, KEP, web form, çalışma saatleri. Eliminates the entire "mailto-only" class of complaints.
5. **Add a `/kullanim-sartlari` (T&C)** explicitly enumerating Pro/KOBİ payment cycle, otomatik yenileme, fiyat değişikliği bildirim yükümlülüğü, e-fatura prosedürü.
6. **Soft-launch the partner section** as "Çalıştığımız Topluluklar" without government logos until protocols are signed.
7. **TÜRKPATENT search for "Ollama"** classes 9 / 42 — sizing trademark exposure even if rebrand is not on the table.
8. **Replace fictional team bios with verified bios** + obtain KVKK m.5/6 written consent from each individual for processing of personal data (full name + employer history + photo) in publicly accessible context.

---

## Sign-off checklist

- [ ] KDV labeling explicit on every advertised price (Fiyatlandirma.tsx tier cards, comparison table, FAQ "75₺/ay" student line)
- [ ] Cayma hakkı + iade prosedürü page published and linked from footer + checkout
- [ ] Pre-consent checkbox for SaaS immediate-performance carve-out implemented in Pro signup
- [ ] MERSIS / şirket bilgileri / KEP / çağrı merkezi linked in footer
- [ ] Tüketici Hakem Heyeti / şikayet kanalı disclosed
- [ ] All paid-tier models verified as commercial-license-compatible
- [ ] Llama / Gemma / Qwen / DeepSeek attributions present on `/modeller` or `/lisans-bildirimleri`
- [ ] Command-R-Turkish-35B removed from paid tiers OR commercial license confirmed in writing
- [ ] Bora-7B and Kardesler-LLM-13B sourcing verified (or removed)
- [ ] SQLCoder-TR-7B base version confirmed and correct license applied
- [ ] Partner logos disclaimed or removed if no signed MoU
- [ ] Government logos (KOSGEB, TÜBİTAK) removed unless formal protocol is in place
- [ ] Testimonials marked "Temsili" or replaced with signed, real ones
- [ ] %99.9 SLA either backed by published SLA doc or removed
- [ ] Statistical claims (10.000+, 5.234 üye, 247 contributions etc.) substantiated or removed
- [ ] Ollama Inc. trademark disclaimer added to footer
- [ ] TÜRKPATENT priority search completed for the "Ollama" mark
- [ ] Team bios verified and KVKK consents obtained
- [ ] T&C (Kullanım Şartları) page published covering auto-renewal, price change notice, e-fatura

---

**End of audit.** Cross-references: Legal-1 (KVKK), Product-Verification (telemetry substantiation), Brand (trademark posture decision: disclaim vs rebrand).
