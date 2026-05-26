# OllamaTR Community Edition — Legal Re-Verify
**Verifier:** V1
**Build under review:** commit 7e249e0
**Date:** 2026-05-26

## Verdict
**CONDITIONALLY DEFENSIBLE (must close 2 items)**

The Community Edition conversion has successfully stripped the commercial tiers, replaced the "şirket / MERSİS / KEP" data-controller block with an individual-operator (gerçek kişi) pattern under KVKK Madde 3/1-ı, retired all misleading "KVKK UYUMLU / SERTİFİKALI" badges, rewritten the Aydınlatma Metni to reflect Madde 10 with all 8 Madde 11 rights enumerated, added a VERBİS Madde 16 + 2017/61 sayılı Karar muafiyet section, gated the non-commercial Command-R-Turkish-35B model with a CC-BY-NC 4.0 warning in the wizard, and preserved the Ollama Inc. trademark disclaimer (TR + EN) per SMK md.6. Two non-critical items must be closed before the operator can publicly launch under their real identity.

## Check matrix
| # | Check | Status | Evidence (file:line) |
|---|-------|--------|----------------------|
| A | KVKK Aydınlatma Metni complete | ✓ | `app/src/pages/KVKK.tsx:495-653` — sub-sections (a)-(e) all present; VERBİS muafiyet at L624-634 cites Madde 16 + 2017/61 sayılı Karar; brand-promise carve-out at L636-653 clarifies no paid service. No MERSİS/KEP remain. |
| B | Çerez Politikası honest | ⚠ partial | `app/src/pages/CerezPolitikasi.tsx:30-50` — Analitik & Pazarlama rows correctly say `(kullanılmıyor)`; Tercih row L55 correctly references `ollamatr-cookie-consent`. **BUT** L222-230 still contains a footnote `[TODO: Analitik sağlayıcı]` and `[TODO: Pazarlama sağlayıcı]` — these are forward-looking and labeled "etkinleştirildiğinde", so not actively misleading, but they are unresolved placeholders. |
| C | No false UYUMLU badges | ✓ | grep `UYUMLU\|KVKK SERTİFİKALI\|KVKK ONAYLI\|VERBİS KAYITLI` across `app/src/pages` → no matches. All previous "KVKK UYUMLU" stamps removed. |
| D | No commerce claims | ⚠ 1 leftover | grep `149\|25\.000\|KDV\|cayma\|Mesafeli\|Pro abonelik\|TKHK` across `app/src` returns no commerce claims on Fiyatlandirma — but **`app/src/pages/KVKK.tsx:108`** in the side-by-side comparison table still has `{ feature: 'Maliyet', ollamatr: 'Ücretsiz/149₺', cloud: '$20/ay+' }`. The `149₺` price label is a residual from the pre-Community pricing and contradicts the Topluluk Edisyonu "ücretsiz, satışta değildir" stance on the rest of the site. Should read `'Ücretsiz'` or `'Ücretsiz (Topluluk)'`. |
| E | Topluluk banner present | ✓ | `app/src/pages/Fiyatlandirma.tsx:222-245` — prominent banner with `role="status"`, `aria-label="Topluluk Projesi bilgisi"`, ACCENT-RED bordered, explicit "Topluluk Projesi" headline and "satışta değildir" inside the body copy. |
| F | Command-R non-commercial gated | ✓ | `app/src/lib/models-data.ts:236-238` — Command-R-Turkish-35B has `license: 'CC-BY-NC 4.0'`, `commercialUse: false`, attribution "Cohere Command-R — CC-BY-NC 4.0 (yalnızca araştırma)". `app/src/pages/HangiModel.tsx:1246-1257` — result card renders `border-warn-yellow/30 bg-warn-yellow/10` notice for any `!commercialUse` model with exact phrase "yalnızca araştırma ve kişisel kullanım içindir (CC-BY-NC 4.0). Ticari kullanım için lisans sahibinden izin gereklidir." |
| G | Ollama Inc. trademark notice | ✓ | `app/src/components/Footer.tsx:212-226` — both TR (`lang="tr"`) + EN (`lang="en"`) paragraphs present at footer bottom, with "Ollama Inc. firmasının tescilli markasıdır" / "not affiliated with, endorsed by, or sponsored by Ollama Inc." |
| H | Footer individual operator | ✓ | `app/src/components/Footer.tsx:23-28` — `LEGAL_INFO` array uses 4-line pattern (Veri Sorumlusu / İletişim / Proje Türü / GitHub); no MERSİS/KEP remain anywhere in `app/src`. Brand block L48-51 shows "Topluluk Projesi · Tüzel Kişilik Yok" badge. |
| I | Navbar "Destek" | ✓ | `app/src/components/Navbar.tsx:9` — `{ label: 'Destek', to: '/fiyatlandirma' }`. The 4th item in the NAV_LINKS array is correctly relabeled. |
| J | Third-party brand notice | ✓ | `app/src/components/Footer.tsx:189-191` — copyright line: "İçerikte yer alan üçüncü taraf model isimleri (Llama, Gemma, Mistral, Qwen, Phi-3, Command-R, DeepSeek, Trendyol vb.) ilgili sahiplerinin markalarıdır." |
| K | Remaining TODO placeholders | (3 items) | See dedicated section below. |

## Findings

### F1 — `[TODO: Analitik sağlayıcı]` / `[TODO: Pazarlama sağlayıcı]` footnotes still in Çerez Politikası (CONDITIONAL-LAUNCH BLOCKER, low severity)
`app/src/pages/CerezPolitikasi.tsx:222-230` renders two `[TODO: ...]` strings in the visible footnote under the cookie table. These are framed prospectively ("etkinleştirildiğinde bu alana eklenecektir"), so they do not currently misrepresent any active processing — but they ARE visible to end users and TODO placeholders should never ship to production. **Recommended fix:** either remove the entire footnote paragraph (since the rows themselves already say `(kullanılmıyor)`), or replace with neutral text such as "Bu kategoriler ileride etkinleştirilirse sağlayıcı bilgisi bu sayfaya eklenecektir."

### F2 — `Ücretsiz/149₺` leftover in KVKK comparison table (LAUNCH BLOCKER, medium severity)
`app/src/pages/KVKK.tsx:108` in the `comparisonRows` array still references the old `149₺` Pro tier in the cost cell. This contradicts the rest of the site (Fiyatlandirma banner: "satışta değildir"; Footer: "Tüzel Kişilik Yok"; FAQ: "biz herhangi bir ticari hizmet satmıyoruz") and could expose the operator to a TKHK-style "yanıltıcı ticari uygulama" claim if a reader concludes a 149₺ tier is being offered. **Recommended fix:** change to `ollamatr: 'Ücretsiz'`.

### F3 — `[Operatör İsim Soyisim]` placeholder (EXPECTED FILL-IN, not a blocker)
The bracketed placeholder appears intentionally in two locations as a fill-in for the real operator name. This is correctly designed as a single-source string the operator replaces before launch. Not a defect in the conversion — but it MUST be filled before the operator publishes under a real identity, because KVKK Madde 10 requires the data-controller's actual identity to be disclosed.

## Remaining TODO fill-ins for the operator

| Placeholder | Location | What to fill |
|---|---|---|
| `[Operatör İsim Soyisim]` | `app/src/pages/KVKK.tsx:506` — Aydınlatma Metni (a) Veri Sorumlusu | Operator's real legal name (Ad Soyad). Required by KVKK md.10 before launch. |
| `[Operatör İsim Soyisim]` | `app/src/components/Footer.tsx:24` — `LEGAL_INFO` array | Same real name as above; appears in the footer Yasal Bilgiler block on every page. |
| `[TODO: Analitik sağlayıcı]` | `app/src/pages/CerezPolitikasi.tsx:224` — cookie footnote | Either delete the paragraph or fill with the real provider name IF/WHEN analytics is activated. Today the row above says `(kullanılmıyor)` so the cleanest fix is to remove the orphan footnote. |
| `[TODO: Pazarlama sağlayıcı]` | `app/src/pages/CerezPolitikasi.tsx:228` — cookie footnote | Same treatment as analytics — delete or fill when actually deployed. |

The `iletisim@ollamatr.dev` and `privacy@ollamatr.com` mailboxes referenced throughout (Aydınlatma Metni, Footer, Çerez Politikası CTA, Fiyatlandirma FAQ) are also operator-controlled and should be verified to exist + be monitored before launch — KVKK md.13 requires response within 30 days.

## Sign-off
- [x] KVKK Aydınlatma Metni Article 10 elements all present (Veri Sorumlusu / İşleme Amaçları / Aktarılan Taraflar / Yöntem ve Hukuki Sebep / Art.11 Rights)
- [x] All 8 Article 11 rights enumerated (`KVKK.tsx:120-129`, rendered at `:606-610`)
- [x] No misleading UYUMLU / KVKK SERTİFİKALI badges
- [ ] No commerce claims active (KDV, cayma, Pro/KOBİ pricing) — **1 leftover: KVKK.tsx:108 `Ücretsiz/149₺`**
- [x] Topluluk Projesi banner visible (`Fiyatlandirma.tsx:222-245`)
- [x] Non-commercial model warning shown in wizard (`HangiModel.tsx:1252-1257`)
- [x] Ollama Inc. trademark disclaimer present (TR + EN) (`Footer.tsx:212-226`)
- [x] Footer uses individual operator pattern (`Footer.tsx:23-28`)
- [ ] Çerez Politikası matches reality — **2 leftover `[TODO:]` footnote placeholders at `CerezPolitikasi.tsx:222-230`**
