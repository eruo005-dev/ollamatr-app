# OllamaTR Production-Readiness Audit — KVKK COMPLIANCE
**Auditor:** Legal-1 (KVKK Compliance Reviewer)
**Reference:** 6698 Sayılı Kişisel Verilerin Korunması Kanunu (KVKK)
**Date:** 2026-05-26
**Scope:** `C:\Users\eruo0\Desktop\OllamaTR\app\` — marketing webapp (React/Vite/TS)

---

## Verdict

**NON-COMPLIANT** — must remediate before production launch.

OllamaTR's KVKK page is a *marketing artifact about the desktop product's compliance posture*, not a KVKK-compliant disclosure for the **website itself**. The site processes personal data (mailto contact channels, Google-Fonts-driven IP transfer abroad, future Pro/KOBİ onboarding implied by pricing), yet provides **none** of the mandatory Article 10 (Aydınlatma) elements for that processing, no cookie policy, no Veri Sorumlusu identity, and no VERBİS reference. The product-level "verileriniz cihazınızda kalır" promise is technically defensible for the desktop installer, but the **website overrides this with undisclosed third-party transfers** (Google Fonts → Google LLC, US). Several Article 11 rights are not enumerated on the KVKK page. The "UYUMLU" badge next to Madde 10 and Madde 11 in `KVKK.tsx` is **legally false advertising** in its current form.

---

## KVKK Article Map

| Article | Topic | Implementation Status | Severity if missing |
|---------|-------|----------------------|---------------------|
| Art. 3  | Tanımlar (Definitions) | N/A | — |
| Art. 4  | Genel İlkeler (Hukuka uygunluk / ölçülülük / sınırlı amaç) | Only implied via product copy; no written commitment | MAJOR |
| Art. 5  | İşleme Şartları (legal basis) | **NOT DECLARED** for any website data collection point (mailto, fonts, future Pro/KOBİ accounts) | **BLOCKER** |
| Art. 8  | Yurt İçi Aktarım | Not addressed | MINOR (no current sharing) |
| Art. 9  | Yurt Dışı Aktarım (Cross-border) | **UNDISCLOSED** — Google Fonts loads from `fonts.googleapis.com` / `fonts.gstatic.com` (US-based), transferring visitor IP to Google LLC | **BLOCKER** |
| Art. 10 | Aydınlatma Yükümlülüğü | **INCOMPLETE** — KVKK page describes the desktop product, not the website. Missing: Veri Sorumlusu identity, amaç, aktarım, yöntem, hukuki sebep | **BLOCKER** |
| Art. 11 | Veri Sahibi Hakları | **INCOMPLETE** — page text mentions "Kullanıcı tüm verilerini dilediği zaman silebilir" but does NOT enumerate the 8 statutory rights | **BLOCKER** |
| Art. 12 | Veri Güvenliği | Only described for the *desktop product*. Website security measures (TLS, access controls for `privacy@ollamatr.com`, etc.) not addressed | MAJOR |
| Art. 15 | Veri İhlali Bildirimi | Claimed "risk sıfır" (KVKK.tsx:78) — **demonstrably false** for the marketing site; ignores KVKK's strict 72-hour Kurul notification requirement | MAJOR |
| Çerez Politikası | Cookie Policy | **ABSENT** — no banner, no linked policy. Google Fonts may set cookies via referrer in some browser configurations | **BLOCKER** |
| VERBİS | Sicil Kaydı | **ABSENT** — no VERBİS number displayed. If OllamaTR sells Pro (149₺/ay) or KOBİ services in TR, it almost certainly meets the registration threshold | MAJOR |

---

## Findings

### F-01 [BLOCKER] No Veri Sorumlusu (Data Controller) identity disclosed — Art. 10(1)(a)
**Evidence:** `app/src/pages/KVKK.tsx` (full file). No mention of a legal entity (A.Ş. / Ltd. Şti.), MERSİS number, registered address, KEP, tax ID, or any commercial identifier.
**Footer** (`app/src/components/Footer.tsx:116`) lists only `© 2025 OllamaTR. Tüm hakları saklıdır.` with no legal entity behind it.
**Impact:** Without a named data controller, no data subject can exercise Art. 11 rights. The Kurum (KVKK authority) treats this as a per se Art. 10 violation. Sanction range: 47.300₺ – 9.464.000₺ (2025 tarife) per administrative fine.

### F-02 [BLOCKER] Yurt dışı aktarım (Google Fonts) undisclosed — Art. 9
**Evidence:** `app/index.html:10-12`
```
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk..." rel="stylesheet" />
```
Every page load transfers visitor IP + User-Agent + Referer to Google LLC (US). Under Art. 9, transfers to countries without a Kurum-approved adequacy decision (which the US **does not have**) require either (i) açık rıza, or (ii) BCR / a Kurum-approved undertaking. Neither exists.
**This directly contradicts the homepage promise** "Hiçbir prompt, yanıt veya kullanım verisi internete çıkmaz" (KVKK.tsx:256) — because the *website itself* leaks IP to a US controller on first byte.
**Remediation options:** (a) self-host the three font families (Space Grotesk, Inter, JetBrains Mono — all OFL/SIL licensed; trivial), (b) move to a Türkiye-hosted font CDN, or (c) add an explicit Art. 9 disclosure + cookie/consent gate. **Self-hosting is the only option that preserves the brand promise.**

### F-03 [BLOCKER] No Çerez (Cookie) Policy / banner
**Evidence:** No cookie banner component exists. `Grep` for `cookie|çerez` in `app/src/` returns zero matches (the only hits are `node_modules/cookie` and `react-router` internals). No `/cerez-politikasi` route exists in `app/src/App.tsx` (verified via the pages directory listing — only 9 pages, no cookie policy).
**Impact:** KVKK Kurul'un 2022 Çerez Rehberi requires: (i) categorization (zorunlu / fonksiyonel / performans / reklam), (ii) explicit consent for non-essential cookies BEFORE they are set, (iii) an accessible cookie policy page. Currently zero compliance.

### F-04 [BLOCKER] Aydınlatma Metni — mandatory elements missing
Checked against Art. 10 requirements:
- **(a) Veri Sorumlusu kimliği:** **MISSING** (see F-01)
- **(b) Kişisel verilerin hangi amaçla işleneceği:** **MISSING for the website**. KVKK.tsx Section 2 (`KVKK.tsx:243-269`) describes purposes for the *desktop product* (model çalıştırma). Says nothing about why the website collects email via mailto, why it loads remote fonts, why it will collect Pro signup data.
- **(c) Kime ve hangi amaçla aktarılabileceği:** **MISSING**. Google (fonts), future payment processor for 149₺/ay tier (Iyzico/PayTR/Stripe?), email provider for `privacy@ollamatr.com` / `iletisim@ollamatr.com` — none disclosed.
- **(d) Veri toplama yöntemi ve hukuki sebep:** **MISSING**. No mention of açık rıza vs. sözleşmenin kurulması vs. meşru menfaat for any processing activity.
- **(e) Art. 11 hakları:** **PARTIALLY PRESENT** (see F-05).

### F-05 [BLOCKER] Article 11 rights not enumerated
The KVKK page claims compliance (`KVKK.tsx:62-67`):
```
{ article: 'Madde 11', title: 'Veri sahibinin hakları',
  desc: 'Kullanıcı tüm verilerini dilediği zaman silebilir.', status: 'UYUMLU' }
```
But of the **8 mandatory rights**, only #6 (silme) is addressed. Missing enumeration:
1. İşlenip işlenmediğini öğrenme — NOT LISTED
2. İşlenmişse bilgi talep etme — NOT LISTED
3. İşlenme amacını ve amacına uygun kullanıldığını öğrenme — NOT LISTED
4. Aktarıldığı 3. kişileri bilme — NOT LISTED
5. Düzeltme — NOT LISTED
6. Silme / yok etme / anonim hale getirme — partially addressed (only for desktop product)
7. Aktarılan 3. kişilere bildirilmesini isteme — NOT LISTED
8. Otomatik karar itirazı + zarar tazmini — NOT LISTED

The "UYUMLU" badge for Madde 11 is **factually false** and constitutes a misleading commercial practice under Türk Ticaret Kanunu Md. 55 (haksız rekabet).

### F-06 [MAJOR] Pro tier (149₺/ay) and KOBİ packages — no processing model declared
**Evidence:** `app/src/pages/Fiyatlandirma.tsx:58-79` (Pro, recurring billing implied: "API rate limit: 10.000/gün", "Çoklu kullanıcı yönetimi", "Türkçe destek (e-posta)", "Pro aboneliğimi nasıl iptal ederim?" FAQ at line 134).
Pro tier requires: account, billing (payment processor = 3rd party data controller/processor), API key issuance, usage logs. **Every one of these is personal data processing under KVKK Art. 3.** The KVKK page's blanket claim "Hiçbir veri sunucularımıza gönderilmez" (`KVKK.tsx:249`) is **inconsistent with the Pro product offering**.
**Required carve-out language is absent.** Recommended pattern:
> "Ürünün masaüstü bileşeni tüm AI işlemlerini yerelde gerçekleştirir. Pro ve KOBİ planlarında yalnızca hesap yönetimi, faturalandırma ve destek talepleri için zorunlu kişisel veriler [X şirketi] tarafından işlenir; modele iletilen prompt ve yanıt içerikleri hiçbir koşulda sunucularımıza iletilmez."

### F-07 [MAJOR] Madde 15 ("veri ihlali riski sıfır") — overreaching claim
**Evidence:** `KVKK.tsx:77` — `desc: 'Yerel işleme nedeniyle veri ihlali riski sıfır.', status: 'UYUMLU'`
The Kurul does not accept "risk sıfır" claims; under Art. 12(5), any data controller must have a documented ihlal müdahale planı even if processing is minimal. For the website (with email contact points and Google Fonts), risk is **not** zero. Recommend reword: "Yerel işleme veri ihlali riskini önemli ölçüde azaltır" + add a documented breach response process.

### F-08 [MAJOR] VERBİS Sicil Kaydı not referenced
**Evidence:** No mention of VERBİS in any source file under `app/src/`.
**Analysis:** Per Kurul tebliği, exemption thresholds are: <50 yıllık çalışan AND <25M TL yıllık bilanço AND core activity not "kişisel veri işleme". A company selling 149₺/ay subscriptions + 25.000₺-60.000₺ KOBİ packages with "Çoklu kullanıcı yönetimi" and "Müşteri yorumları" (Fiyatlandirma.tsx:165-183, mentions "CTO, TeknoStart", "IT Direktörü, Lojistik A.Ş.") is processing customer data **as a core activity**. **VERBİS registration is almost certainly mandatory** and the registration number must be publicly verifiable. Absence may indicate either: (a) unregistered operation (non-compliance), or (b) registered but undisclosed.

### F-09 [MAJOR] mailto: channels without aydınlatma
**Evidence:**
- `app/src/pages/KVKK.tsx:502` — `href="mailto:privacy@ollamatr.com"`
- `app/src/pages/Hakkimizda.tsx:438` — `href="mailto:iletisim@ollamatr.com"`
- `app/src/pages/Hakkimizda.tsx:479` — same
When a data subject emails these addresses, KVKK Art. 10 obligation triggers AT the point of collection. There is no pre-contact aydınlatma, no İlgili Kişi Başvuru Formu (KVKK Art. 13 requires controllers to maintain a başvuru süreci).

### F-10 [MAJOR] Misleading "Madde 4/2" entry
**Evidence:** `KVKK.tsx:51-54`
```
article: 'Madde 4/2',
title: "Veri işleme faaliyetinin yurt içinde gerçekleştirilmesi"
```
KVKK Madde 4/2 is the *Genel İlkeler* sub-clause (hukuka ve dürüstlük kurallarına uygun olma, doğru ve güncel olma, belirli açık meşru amaçlar, ölçülü olma, mevzuatta öngörülen süre kadar muhafaza). **It does NOT codify "veri işlemenin yurt içinde gerçekleştirilmesi"** — that's not a KVKK requirement at all (Art. 9 governs transfer, not location of primary processing). The entry **misrepresents the statute** and could be used as evidence of misleading consumer information under Tüketicinin Korunması Hakkında Kanun Md. 61.

### F-11 [MINOR] "Roadmap conflict" — no Cloud product currently listed, but Federal Learning Q2 2025 needs framing
**Evidence:** `app/src/pages/Hakkimizda.tsx:80-119` — roadmap shows:
- Q1 2025: Mobile SDK
- Q2 2025: Federal Öğrenme — "Veri paylaşmadan ortak model eğitimi"

No "OllamaTR Cloud — Türkiye'de Barındırma" item was found in the codebase (the audit brief mentioned it as a hypothetical; **it is not in the current code**). However, **Federal Learning involves model parameter exchange** which under aggressive Kurul interpretation could constitute kişisel veri işleme. When this ships, the KVKK page must be updated.

### F-12 [MINOR] Footer copyright year stale next to "2026" date context
**Evidence:** `Footer.tsx:116` — `© 2025 OllamaTR`. Today is 2026-05-26. Minor but signals stale legal review cycle. Update to "© 2025–2026 OllamaTR".

---

### Aydınlatma Metni completeness
- (a) Veri Sorumlusu: **MISSING**
- (b) Amaç (website-level): **MISSING**
- (c) Aktarım: **MISSING** (Google Fonts, payment processor, email provider all undisclosed)
- (d) Yöntem + hukuki sebep: **MISSING**
- (e) Art. 11 hakları: **INCOMPLETE** (1 of 8 mentioned)

### Cross-border transfers
- Google Fonts (fonts.googleapis.com, fonts.gstatic.com → Google LLC, US): **UNDECLARED — BLOCKER**
- GitHub link (`https://github.com/ollamatr`, Footer.tsx:84) and partner SVGs (`/partners/*.svg`, served from origin): GitHub is an external link click, lower risk, but click event itself causes a redirect — recommend `rel="noopener"` review (already set) and disclosure.
- No analytics (Google Analytics, Plausible, Hotjar, Mixpanel, Sentry) detected — **good** (verified by grepping for `gtag|analytics|plausible|hotjar|mixpanel|sentry` — zero matches in `app/src/`).
- No font self-hosting, no CDN for Tailwind/React (Vite bundles locally — verified).

### Cookie policy
- Banner: **ABSENT**
- Linked policy page: **ABSENT**
- Categorization (zorunlu/fonksiyonel/performans/reklam): **ABSENT**

### Brand promise vs. technical reality
- **"Verileriniz cihazınızda kalır"** (KVKK.tsx:243): defensible for the desktop product (Ollama runs locally), **NOT defensible for the website** in its current state because Google Fonts exfiltrates visitor IP on every page load.
- **"Hiçbir veri sunucularımıza gönderilmez"** (KVKK.tsx:249): true for prompts/responses but **breaks** for:
  - Pro account creation (149₺/ay tier — Fiyatlandirma.tsx:58-79)
  - Payment processing (subscription billing — implied by line 134 FAQ "Pro aboneliğimi nasıl iptal ederim?")
  - mailto: contacts to privacy@ / iletisim@ollamatr.com
  - Newsletter / partnership inquiries (Hakkimizda.tsx:434-444)
  These need an explicit carve-out: *"Yukarıdaki taahhüt, ürünün masaüstü AI işleme bileşenini kapsar. Hesap, fatura ve iletişim verileri ayrıca [linked policy] altında işlenir."*
- **No "OllamaTR Cloud" exists yet** in the codebase, so no carve-out is currently mandatory for Cloud — but the Federal Öğrenme (Q2 2025) feature needs its own pre-launch KVKK assessment.

---

## Mandatory pre-launch fixes

1. **Self-host the Google Fonts** (Space Grotesk, Inter, JetBrains Mono) — eliminate the only currently-active yurt dışı aktarım. Modify `app/index.html:10-12` to reference local font files in `app/public/fonts/`. This is the single most impactful fix and preserves the brand promise.

2. **Add a real Aydınlatma Metni** — new route `/aydinlatma-metni` (or extend `KVKK.tsx`) with ALL Article 10 elements: Veri Sorumlusu legal name + MERSİS + address + KEP, processing purposes (website + Pro + KOBİ), recipients (payment processor, email service, hosting provider), legal basis per processing activity, and explicit enumeration of all 8 Art. 11 rights.

3. **Identify the Veri Sorumlusu legal entity** publicly. Required in Aydınlatma Metni AND Footer. Without this, every other fix is window-dressing.

4. **Add Çerez Politikası + cookie banner** with category-level consent (zorunlu / analitik / pazarlama). Even after self-hosting fonts, KVKK Kurul'un Çerez Rehberi requires a policy page.

5. **Add VERBİS registration number** to Footer or KVKK page (or, if exempt, document the exemption basis publicly — `tam tüzel kişiliği olan vakıf, dernek, sendika` etc.). For a commercial offering at 149₺/ay + KOBİ packages, exemption is unlikely.

6. **Remove or qualify the "UYUMLU" badges** on Madde 10 and Madde 11 in `KVKK.tsx:57-67` until items 1-5 are actually shipped. Current state = false advertising.

7. **Add Pro/KOBİ carve-out** to "Hiçbir veri sunucularımıza gönderilmez" claim (`KVKK.tsx:249`) before Pro signup flow ships.

8. **Fix Madde 4/2 mischaracterization** (`KVKK.tsx:52-53`). Either remove or rewrite to reflect the actual content of KVKK Art. 4/2 (general principles).

## Recommended pre-launch fixes

1. Soften "veri ihlali riski sıfır" claim (`KVKK.tsx:77`) and document a real ihlal müdahale planı per Art. 12(5).
2. Publish an İlgili Kişi Başvuru Formu (downloadable PDF or web form) per Art. 13 — referenced from Aydınlatma Metni.
3. Update footer copyright to "© 2025–2026 OllamaTR" (`Footer.tsx:116`).
4. Add `lang="tr"` validation on the Aydınlatma Metni (already correct in `index.html:2`).
5. Pre-launch KVKK assessment for Federal Öğrenme (Q2 2025) — anonymization vs. pseudonymization for model parameter exchange.
6. Document data minimization for Pro signup — request *only* email + password + billing data, no marketing-purpose optional fields without separate açık rıza.

---

## Sign-off

- [ ] All Art. 10 Aydınlatma elements present
- [ ] All 8 Art. 11 rights enumerated
- [ ] Yurt dışı aktarım (Google Fonts) eliminated by self-hosting **OR** disclosed under Art. 9 with valid legal basis
- [ ] Çerez politikası page in place + consent banner gating non-essential cookies
- [ ] VERBİS registration referenced (or exemption documented)
- [ ] Pro/KOBİ tier carve-out explicit in "veriler sunucularımıza gönderilmez" claim
- [ ] Veri Sorumlusu legal entity (A.Ş./Ltd. + MERSİS + address + KEP) listed
- [ ] "UYUMLU" status badges removed until backing legal text actually exists
- [ ] Madde 4/2 mischaracterization fixed
- [ ] İhlal müdahale planı documented internally per Art. 12(5)

**Until items 1-8 of "Mandatory pre-launch fixes" are completed, this site MUST NOT go to production in its current state.** The combination of (a) commercial offering at 149₺/ay, (b) "KVKK Tam Uyum" headline marketing, and (c) zero implementation of Art. 10 obligations creates concurrent exposure to: KVKK Kurul fines (up to ~9.4M₺), Türk Ticaret Kanunu Md. 55 haksız rekabet claims by competitors, and Tüketicinin Korunması Hakkında Kanun Md. 61 misleading advertising sanctions.
