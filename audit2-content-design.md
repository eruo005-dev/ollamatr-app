# OllamaTR Production-Readiness Audit — CONTENT + DESIGN
**Auditor:** Audit-C
**Date:** 2026-05-26

## Verdict
**PRODUCTION READY WITH CONDITIONS**

The post-swarm content is largely aligned with the design spec and earlier audit findings have been mostly resolved. The 12 canonical Turkish model names are correctly present in the new shared catalog (`src/lib/models-data.ts`). HangiModel wizard exposes 5 use cases, 5 RAM tiers (incl. "Bilmiyorum"), 4 skill levels, 5 priorities with max-2 enforcement. Fiyatlandirma now uses "Ücretsiz" / "0₺/ay" / "149₺/ay" / "25.000₺ — 60.000₺ tek seferlik kurulum" with ✓/✗ semantics, a 10-row comparison table, and the 5 design-specified FAQ items. Hakkimizda has the 4 spec'd team members (Ali Yılmaz / Deniz Kaya / Ebru Şahin / Can Özdemir), 6 partners including BİLGİ Yapay Zeka Merkezi, and the 6 spec'd roadmap milestones. KVKK Section 2 reads "VERİLERİNİZ SİZDE KALIR" and the secondary CTA is "Daha Fazla Bilgi". Topluluk H1 is "Birlikte Büyüyoruz", the three Mart/Nisan 2025 events are present with the 🟢/🟡 status badges, three featured top contributors (Mehmet K. Kod / Ayşe Y. Dökümantasyon / Burak T. Çeviri) appear above the avatar grid, and the previously-flagged "welcome" Anglicism has been replaced with "Her seviyeden geliştirici için hoş geldiniz". Home.tsx `STATUS_CONFIG` now carries full diacritics: BEKLENİYOR, YETERLİ, ÇALIŞABİLİR, DÜŞÜK, YETERSİZ. Numerals consistently use Turkish dot-thousand convention (10.000+, 25.000₺, 60.000₺). However, two genuine content defects and a few minor design-token deviations remain — see below.

## Per-page content alignment
| Page | Diacritics | Grammar | Design Spec | Tokens | Issues |
|------|-----------|---------|-------------|--------|--------|
| Home | ✗ (1) | ✓ | ✓ | ✓ | 1 |
| Modeller | ✓ | ✓ | ✓ (12 models) | ✓ | 0 |
| HangiModel | ✓ | ✓ | ✓ | ⚠ (own DB) | 1 |
| Fiyatlandirma | ✓ | ✓ | ✓ | ✓ | 0 |
| Hakkimizda | ✓ | ✗ (1) | ✓ | ✓ | 1 |
| Indir | ✓ | ✓ | ✓ | ✓ | 0 |
| Dokumantasyon | ✓ | ✓ | ✓ | ✓ (hover rgba(217,30,54,0.03) present) | 0 |
| KVKK | ✓ | ✓ | ✓ | ✓ | 0 |
| Topluluk | ✓ | ✓ | ✓ | ⚠ (brand-color hex) | 0 |

## Detailed findings

### [MAJOR] Home.tsx:483 — Missing dot on "NİN" suffix
`TÜRKİYE&apos;NIN GELİŞTİRİCİLERİ GÜVENİYOR` — the genitive suffix attached to "Türkiye" must be "NİN" (capital I-with-dot), not "NIN". This is the same diacritic bug the swarm fixed elsewhere (BEKLENİYOR etc.) but missed for this Social Proof H2. Section H2 is large-format display text and is a prominent miss.
- Fix: `TÜRKİYE&apos;NİN GELİŞTİRİCİLERİ GÜVENİYOR`

### [MAJOR] Hakkimizda.tsx:466 — Archaic verbal-noun suffix
`Bizimle Yol Almağa Hazır mısınız?` — the form `Almağa` is archaic (Ottoman-era spelling). Modern standard Turkish requires `Almaya`.
- Fix: `Bizimle Yol Almaya Hazır mısınız?`

### [MINOR] Cross-page model-name divergence — HangiModel still uses its own DB
`HangiModel.tsx:69-217` hardcodes a 12-entry `modelDatabase` (Phi-3 Mini TR 4B, Llama 3.1 Turkuaz 8B, Mistral TrFine 7B, CodeLlama TR 13B, …) that does NOT match the canonical 12 in `src/lib/models-data.ts` (Llama-3-Turkish-8B, Mistral-Turk-7B, Bora-7B, Trendyol-LLM-7B-v2, Kardesler-LLM-13B, Gemma-2-Turkish-9B, …). The wizard's recommendation will therefore point users to a model that does not exist in the Modeller catalog. The earlier content-audit's "Cross-cutting issue" flagged exactly this. Modeller imports from `models-data.ts`; HangiModel does not.
- Fix: Refactor HangiModel to consume `MODELS` from `@/lib/models-data` and adapt the matching algorithm to the canonical record shape. The Bora-7B, Trendyol, Kardesler, Turkish-Mistral-Instruct, Qwen2-Turkish, Command-R-Turkish, DeepSeek-Turkish entries are completely absent from the wizard.

### [MINOR] Hakkimizda mission body slightly amplifies spec
`Misyonumuz` body is correct in substance and adds the marketing line "Verilerinizin sınırı ülke sınırınızı aşmasın". Acceptable enhancement, not a defect — listed only for transparency.

### [INFO] HangiModel skill labels capitalisation
Skill levels show "Yeni Başlayan", "Orta Seviye", "İleri Seviye", "Uzman" (matches spec). No issue.

## Hardcoded hex colors found

All inline `#RRGGBB` literals in `app/src/pages/*.tsx` reviewed against intentional design exceptions:

| File:line | Hex | Context | Judgement |
|-----------|-----|---------|-----------|
| HangiModel.tsx:384-386, 979-982 | `#00E5A0` / `#FFB800` / `#D91E36` | RAM-tier color helper + Step 2 RAM button border | INTENTIONAL — these are the safe-green / warn-yellow / accent-red palette tokens used inline because Tailwind utility classes can't switch dynamically. Should ideally read from CSS vars but acceptable. |
| HangiModel.tsx:825 | `#0A0A0F` | Terminal wizard inner bg | OFF-PALETTE (palette has `#0A090C` for bg-obsidian and `#131217` for bg-charcoal — `#0A0A0F` is neither). Cosmetic, low severity. |
| HangiModel.tsx:832-834 | `#FF5F56` / `#FFBD2E` / `#27C93F` | Terminal traffic-light dots | INTENTIONAL per audit rules. |
| Home.tsx:161 | `#0A090C` | Hero gradient fade-to-obsidian | INTENTIONAL — matches `--bg-obsidian` token. Could use `var(--bg-obsidian)` for consistency. |
| Modeller.tsx:33-35, 824/828/832 | `#00E5A0` / `#FFB800` / `#D91E36` | RAM-tier helper + legend dots | INTENTIONAL palette colors (dynamic). |
| Modeller.tsx:806 | `#0A090C` | RAM bar overlay text color, `mixBlendMode: 'screen'` | INTENTIONAL — palette match. |
| Fiyatlandirma.tsx:86, 245 | `#FFB800` | KOBİ tier border | INTENTIONAL — `warn-yellow` palette token (not exposed as `border-warn-yellow` utility). |
| Topluluk.tsx:42-43, 51-52 | `#5865F2` (Discord blue) / `#0088cc` (Telegram blue) / variants | Platform card brand-hover colors | INTENTIONAL — third-party brand colors, off-palette by design. |
| Topluluk.tsx:114-123 | 10 hex tuples for `contributorColors` | Contributor avatar background palette | OFF-PALETTE — purple/orange/teal/etc. used as decorative variety. Acceptable since avatars are explicitly decorative, but consider standardising to design palette tokens. |

**No truly stray off-palette hex colors found.** All exceptions are either dynamic palette tokens, third-party brand colors, or the decorative contributor avatar set.

## Spacing / padding consistency
- `lg:py-[120px]` (the design-spec 120px section padding) is used on **Home.tsx only** (4 sections). Fiyatlandirma, Hakkimizda, Topluluk, Indir, KVKK, Dokumantasyon mostly use `lg:py-24`, `lg:py-28`, `lg:py-32` — visually close to 120px but inconsistent with Home. This was already noted as LOW in `audit-design.md` and remains LOW. Not a blocker.

## Border-radius consistency (sampled)
- Badges: `rounded-sm` (2px) — Modeller RAM badge L138, model card tags L156, filter pills L553, pagination buttons L609. ✓ Matches design (2px).
- Cards: `rounded-lg` (8px) — Modeller card L127, KVKK trust pillar L146, Indir OS req L440, Hakkimizda team card L366. ✓
- Modals: `rounded-xl` (12px) — Modeller DetailModal L333, HangiModel wizard container L823. ✓

## Brand voice (KVKK marketing) consistency
- "Verileriniz cihazınızda kalır" / "Verileriniz sizde kalır" repeated consistently on Home (Feature card L555-556), KVKK Section 2 H2 L243, KVKK Section 6 hero, Indir Section 5 H3 L491. ✓
- No conflicting "bulut" / "cloud-based" claims found. The only "bulut" mentions are in the KVKK comparison table contrasting OllamaTR against Bulut AI (ChatGPT). ✓
- Tone consistently formal "siz/-nız" throughout marketing copy. No "sen" code-switching found in samples.

## Risk-ranked top 5
1. **HangiModel ↔ Modeller model-name divergence** — a real user-journey defect. Wizard recommends models the catalog doesn't have. (MINOR severity by content rules, MAJOR severity by UX impact — flag this to Audit-B too.)
2. **TÜRKİYE'NIN diacritic miss** on Home Social Proof H2 — high visibility, easy fix.
3. **"Yol Almağa" archaic suffix** on Hakkimizda bottom CTA — small but jarring to native readers.
4. **HangiModel.tsx:825 `#0A0A0F`** off-palette background — cosmetic; should use `var(--bg-obsidian)` or `var(--bg-charcoal)`.
5. **Section padding inconsistency** — Home uses `lg:py-[120px]`, other pages use 96/112/128px. Visual rhythm jitter across pages.

## Sign-off checklist
- [ ] All Turkish diacritics correct *(1 miss: Home L483)*
- [x] No Anglicisms in copy *("welcome" removed; technical loanwords "fine-tune", "issue", "PR" acceptable per content-audit conventions)*
- [x] All 12 canonical model names present in `src/lib/models-data.ts` and on Modeller catalog
- [x] Pricing matches design (Ücretsiz 0₺/ay, Pro 149₺/ay, KOBİ 25.000₺ — 60.000₺ tek seferlik kurulum)
- [x] Design tokens used (no off-palette hex apart from intentional exceptions + 1 minor `#0A0A0F` slip)
- [x] Brand voice consistent ("veriler cihazınızda" promise repeated; no contradictory cloud claims)
- [ ] Model data shared across Modeller + HangiModel *(refactor pending)*
- [ ] Section padding harmonised to `lg:py-[120px]` *(Home only)*

---

### Files relevant to remediation
- `C:\Users\eruo0\Desktop\OllamaTR\app\src\pages\Home.tsx` (L483 diacritic)
- `C:\Users\eruo0\Desktop\OllamaTR\app\src\pages\Hakkimizda.tsx` (L466 archaic suffix)
- `C:\Users\eruo0\Desktop\OllamaTR\app\src\pages\HangiModel.tsx` (L69-217 hardcoded modelDatabase, L825 off-palette hex)
- `C:\Users\eruo0\Desktop\OllamaTR\app\src\lib\models-data.ts` (canonical source; should be imported by HangiModel)
