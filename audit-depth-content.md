# OllamaTR — Content Deep Audit
**Agent:** T2
**Date:** 2026-05-26

## Per-page H1 + CTA scorecard

| Page | Current H1 | Primary CTA | H1 Score (1-5) | Suggested H1 |
|---|---|---|---|---|
| Home | YAPAY ZEKA, TÜRKÇE KONUŞSUN. | "Hemen Başla" -> /indir | 4 | Keep. Strong, memorable, ownable. Consider trimming the period. |
| Modeller | Türkçe-Optimize Yapay Zeka Modelleri | (none above fold; filter UI) | 2 | "100+ Türkçe Modeli Yerel Bilgisayarınızda Çalıştırın" — adds count + benefit |
| HangiModel | Hangi Model Size Uygun? | "Sihirbazı Başlat" | 3 | "Size Uygun Modeli 60 Saniyede Bulun" — adds time-to-value |
| Fiyatlandirma | Topluluk Edisyonu | "Bağış Yap" / "İndir" | 2 | "Tamamen Ücretsiz, Tamamen Açık Kaynak" — restates value; current H1 sounds like a SKU |
| Hakkimizda | Türkiye'nin AI Altyapısını İnşa Ediyoruz | (no primary CTA) | 4 | Keep. Aspirational; matches mission. |
| Indir | Yerel AI'nizi Kurun | OS-detected install button | 3 | "2 Dakikada Yerel AI Kurulumu" — quantified promise |
| Dokumantasyon | Türkçe Kaynaklar | Search bar | 2 | "OllamaTR Dokümantasyonu — Tamamen Türkçe" — keyword-rich, action-clear |
| KVKK | KVKK ve OllamaTR | "Aydınlatma Metni'ne Atla" | 3 | "Verileriniz Sizde Kalır — KVKK ve OllamaTR" — leads with benefit, not law code |
| Topluluk | Birlikte Büyüyoruz | "Discord'a Katıl" | 3 | "10.000+ Türk Geliştiriciyle Yerel AI Topluluğu" — adds proof + topic |
| CerezPolitikasi | Çerez Politikası | (none) | 4 | Keep — legal page, neutral title appropriate |

H1 semantics issue: Home `<h1>` is the only one with a true `aria-label`; all others render visible text but several pages (Fiyatlandirma, Topluluk, Hakkimizda) use `motion.h1` which renders an `h1` — good. Modeller and Indir wrap H1 in `motion.h1` too. No page has more than one H1. Pass.

## Brand voice findings

**Audit tone target:** formal "siz" (matches prior audits). Verdict: **mostly consistent**, with a handful of slips.

**Personality:** Currently mixed — engineered/technical (`font-mono` UPPERCASE micro-labels: "VERİ GİZLİLİĞİ", "DOKÜMANTASYON") combined with warmer body copy ("Birlikte Büyüyoruz", "Yerel, güvenli ve Türkçe-first..."). The visual code-terminal aesthetic implies developer-only, but the copy targets KOBİ + öğrenci + geliştirici. **Pick a lane:** lead with "developer-grade trust, KOBİ-accessible language."

**5 voice slips found:**

1. **Home.tsx:671-673** — CTA banner subtitle still reads: *"Pro tier ile gelişmiş özelliklere erişin."* This is a Community Edition leftover. Pro tier was removed.
2. **Home.tsx:691-696** — Bottom CTA button literally says **"Pro Planı İncele"** and links to `/fiyatlandirma`. The pricing page has no Pro Plan — it's the donation/community page. This is the most damaging voice/spec slip on the site.
3. **Home.tsx:453** — Stat label *"Kurumsal Entegrasyon"* (50+) clashes with the "no legal entity, no enterprise offering" community framing. Either remove this stat or rename to "Açık Kaynak Katkı".
4. **Home.tsx:578-580** — *"Tüm modeller yerel donanımda çalışır. İnternet bağlantısı gerektirmez, latency sıfır."* — "latency" is an unsoftened English jargon dropped into Turkish copy. Use "gecikmesiz" or "anında yanıt".
5. **HangiModel.tsx:714** — *"Hangi Model Size Uygun?"* mixes "siz" with informal "Size" capitalization in middle of sentence (correct Turkish would be lowercase "size"). Minor but flags inconsistent capitalization throughout headings.
6. **Indir.tsx:577** — *"Hâlâ Bekliyor musunuz?"* — slightly confrontational; better: "Daha Fazla Bekletmeyin" or "Kurulum 2 Dakika Sürer".

**Technical density:** Spikes on Indir (Tauri, Docker, installer terms appear w/o tooltip), Dokumantasyon (API, fine-tune jargon), Home RAM calculator ("Sınırda: Düşük Performans" — assumes user knows what bottleneck means). For KOBİ owner persona this is over-the-line — add a one-line plain-Turkish gloss for each jargon term on first appearance.

**Sentence length:** Most copy is 18-32 words/sentence — borderline long for AA reading level. Hakkimizda mission statement (line 314-319) is one 38-word sentence; should be split.

## USP & positioning analysis

**Current implicit USP** (assembled from hero + problem + features sections):
> "OllamaTR, 100'den fazla Türkçe-uyumlu yapay zeka modelini tek tıkla bilgisayarınıza getirir. Ücretsiz, açık kaynak ve %100 veri gizliliği garantisiyle."

This is above the fold on Home. **Good.** It already differentiates on three axes (Türkçe-first, local-first, free/open-source).

**What it doesn't say** that competitors (Ollama, LM Studio, Jan) can't say:
- Turkish docs + Turkish UI + Turkish-tuned models in one bundle
- KVKK-aware framing
- Türkçe topluluk (Discord/GitHub in Turkish)

**Differentiation from "yet another local AI tool":** Decent. The KVKK angle and the Turkish-tuned model catalog are real moats. But the homepage never names a competitor, never says "Ollama vs OllamaTR" — which is the #1 question a technical user has. Add a small "OllamaTR vs Ollama" mini-section.

**Turkish cultural cues observed:**
- "Türkiye'nin AI Altyapısını İnşa Ediyoruz" — vatansever/nation-building tone (Hakkimizda)
- "KOBİ" used as primary audience marker — KOBİ-friendly tonu present
- KVKK as a feature, not a chore — devlet-uyumlu/regulatory-aware tonu present
- **Missing:** siyaset-uzak explicit framing (no "tarafsız" line); akademik tonu mostly absent (no university partnerships, no thesis-friendly framing)

**Bayrak/renk hikayesi:** Brand uses crimson `#D91E36` + dark obsidian. Reads as Türk-bayrağı-kırmızısı + tech-noir, but **nowhere on the site is this connection stated.** Adding a one-liner in About ("Kırmızımız tesadüf değil") would warm the brand.

## SEO meta tag inventory

`app/index.html` contents (lines 1-15):
- `<title>` = "OllamaTR - Turkiye'nin Yerel AI'si" — **missing Turkish diacritics in the literal HTML file** (Turkiye should be Türkiye, AI'si fine). Wait — file lacks them; this affects search snippets. Confirmed gap.
- `<meta name="description">` = 156 chars, decent — also missing diacritics ("Turkce", "tikla", "Ucretsiz", "acik", "gizliligi").
- `<meta property="og:image">` = `/og-image.jpg` — file exists at `app/public/og-image.jpg` (147KB).
- **Missing:** `og:title`, `og:description`, `og:url`, `og:type`, `og:site_name`, `og:locale=tr_TR`
- **Missing entirely:** all `twitter:*` cards (twitter:card, twitter:title, twitter:description, twitter:image)
- **Missing:** `<link rel="canonical">`
- **Missing:** `<meta name="theme-color">`
- **Missing:** `robots.txt`, `sitemap.xml` — neither file present in `/public/`

**SPA limitation:** SvelteKit/Vite SPA — Google does index JS-rendered content now, but per-route meta requires `react-helmet-async` or migration to a metaframework (Next.js, Remix, Astro). For an audience that includes share-via-link (LinkedIn KOBI owners), per-route OG is critical.

## Suggested per-route meta descriptions (≤160 chars each)

| Route | Suggested description |
|---|---|
| / | OllamaTR: 100+ Türkçe-optimize yapay zeka modeli, tek tıkla yerel kurulum. KVKK-uyumlu, ücretsiz, açık kaynak. Verileriniz bilgisayarınızdan çıkmaz. |
| /modeller | Llama, Mistral, Gemma, Qwen ve Trendyol-LLM dahil 100+ Türkçe fine-tune modeli karşılaştırın. RAM gereksinimleri, kullanım alanları ve indirme linkleri. |
| /hangi-model | 60 saniyede size uygun Türkçe AI modelini bulun. RAM, kullanım amacı ve donanımınıza göre öneri sunan ücretsiz sihirbaz. |
| /fiyatlandirma | OllamaTR Topluluk Edisyonu: tüm özellikler kalıcı olarak ücretsiz. Açık kaynak, MIT lisanslı, ticari kullanıma uygun. Bağışlar gönüllüdür. |
| /hakkimizda | OllamaTR'nin hikayesi: Türkiye'nin yerel AI altyapısını inşa eden topluluk projesi. Misyon, ekip, değerler ve yol haritası. |
| /indir | OllamaTR'yi 2 dakikada kurun: macOS, Windows ve Linux için tek tık installer. Ollama + Open WebUI + Türkçe modeller tek pakette. |
| /dokumantasyon | OllamaTR Türkçe dokümantasyonu: kurulumdan API entegrasyonuna, model seçiminden ince ayarlara kadar her şey adım adım. |
| /kvkk | OllamaTR ve KVKK uyumluluğu: tüm AI işlemleri yerel donanımınızda. Veri sunucularımıza gönderilmez. 6698 Madde 10 aydınlatma metni. |
| /topluluk | 10.000+ Türk geliştirici, KOBİ ve öğrenciden oluşan OllamaTR topluluğu. Discord, GitHub ve etkinliklerle yerel AI'yı birlikte inşa ediyoruz. |
| /cerez-politikasi | OllamaTR web sitesi çerez politikası. KVKK Kurulu 2022 Çerez Rehberi'ne uygun. Zorunlu, performans ve tercih çerezleri açıklamaları. |

## FAQ gap list

- **Fiyatlandirma:** 5 FAQs present, all commerce/licensing focused. **Adequate for that page**, but the questions audience asks before pricing are missing site-wide.
- **Topluluk:** No FAQ section.
- **Hakkimizda:** No FAQ section.
- **HangiModel:** No FAQ despite being literally a Q-format page.
- **Indir:** No FAQ. Should have: "Kurulum başarısız oldu, ne yapmalıyım?", "Antivirüs uyarısı veriyor, güvenli mi?", "Internet bağlantısı yokken çalışır mı?"

**Top 8 missing Turkish AI questions** the site doesn't answer:
1. Türkçe LLM ne kadar iyi performans gösteriyor? (vs GPT-4 Türkçe karşılaştırması)
2. Mac M1/M2/M3'te hangi modeller en iyi çalışır?
3. RAM yetersiz olduğunda model çalışır mı, yoksa hata mı verir?
4. Ollama nedir, OllamaTR'den farkı ne? (en kritik soru)
5. Tek bir modelin diski ne kadar yer kaplar?
6. GPU şart mı? CPU-only çalışır mı?
7. Modeli güncellemek için ne yapmalıyım?
8. Şirketimde 50 kişi kullanırsa lisans gerekir mi?

## Microcopy gaps

- **Empty state (Modeller):** "Sonuç bulunamadı / Filtrelerinizi değiştirmeyi veya farklı bir arama terimi denemeyi deneyin." — "denemeyi deneyin" tautological. Fix: "Filtreleri sıfırlayın veya farklı bir terim arayın."
- **RAM calculator status strings** (Home): All uppercase font-mono. "SINIRDA: DÜŞÜK PERFORMANS" — what does the user do next? Add an action: "→ Daha küçük bir model deneyin" link.
- **Loading states:** Not surveyed in this audit (need to grep for `Loading|Yükleniyor|spinner`) — recommend a follow-up. Default browser spinners likely.
- **Error states:** No global error boundary copy reviewed; check for "Bir şeyler ters gitti" generic fallbacks.
- **Button verbs:** Inconsistent — "Hemen Başla", "Ücretsiz İndir", "Pro Planı İncele" (bug), "Sihirbazı Başlat", "Discord'a Katıl". Generally action-oriented. Good.
- **OS detection chip** ("SİSTEMİNİZ: macOS tespit edildi") — friendly. Good microcopy moment.

## Asset inventory

`/public/` contains 7 files, 569KB total:
- favicon.svg (273B)
- og-image.jpg (147KB)
- community-photo.jpg (167KB) — used as Topluluk hero
- docs-hero.jpg (58KB) — used as Dokumantasyon hero
- partner-logos.jpg (106KB)
- team-avatar-placeholder.jpg (57KB)
- wizard-bg.jpg (26KB)

**Findings:**
- **No WebP / AVIF.** All raster assets are JPEG. Converting og-image, community-photo, partner-logos to WebP/AVIF would halve weight (~250KB savings).
- **No favicon.ico fallback.** Only SVG — old browsers + many social embedders need .ico.
- **No apple-touch-icon.** iOS share sheets will use the JPEG OG image instead of a proper square icon.
- **No per-page hero images for Home, Modeller, HangiModel, Fiyatlandirma, Hakkimizda, Indir, KVKK, CerezPolitikasi.** They use CSS gradients + canvas effects.
- **Hero is canvas-only on Home** (`DataStreamCanvas`) — no LCP image, which means LCP element is likely the H1 text. That's fine but ensure font-display:swap is set.
- **No favicon variants** for dark/light mode.
- **og-image.jpg** at 147KB is borderline heavy — target ≤100KB for share previews.

## Cultural cues — opportunities

1. **Türk bayrağı renkleri** — palette uses crimson #D91E36 deliberately but never tells the story. One line on About: "Logomuzun kırmızısı tesadüf değil — Türkiye'nin yerel AI'sıyız."
2. **"İstanbul'dan" or "Anadolu'dan" geographic anchor missing** — site is location-agnostic. Adding a city tag in footer ("İstanbul, Türkiye" / "Anadolu'dan dünyaya") adds warmth without nationalism.
3. **Akademik tonu** — Boğaziçi/ODTÜ/İTÜ logoları yok. Even a "Açık kaynak topluluk üniversite katkılarına açıktır" line in About would broaden positioning.
4. **Devlet-uyumlu vs siyaset-uzak balance** — KVKK references are good; explicit "siyasi/dini bağımsız" or "tarafsız topluluk" line missing from Hakkimizda/Topluluk values section.
5. **Idiomatic Turkish vs literal translations:** Mostly natural. One issue: "Türkçe-first" (Hakkimizda) is Anglicism. Use "Türkçe-öncelikli" or "önce Türkçe".
6. **"Welcome" Anglicism:** Already fixed per prior audit. **Spot check:** No remaining instances of "Welcome", "Hello", "Hi" found in src/ via grep. Pass.

## Top 10 content improvements (priority order)

1. **Fix Home.tsx:671-696 — remove "Pro tier" subtitle + "Pro Planı İncele" button.** Replace with "Topluluğa Katıl" → /topluluk. **Critical** (broken promise on highest-traffic CTA).
2. **Rename "Kurumsal Entegrasyon" stat (Home.tsx:453)** to align with Community Edition (e.g., "GitHub Katkıcı" or remove).
3. **Add per-route meta tags** via `react-helmet-async`. Use the table above as source.
4. **Add `robots.txt` + `sitemap.xml`** to `/public/`. Auto-generate sitemap with vite-plugin-sitemap.
5. **Fix `index.html` diacritics** — "Turkiye" → "Türkiye", "Turkce" → "Türkçe" etc. in title + description. Search snippets currently show mojibake-prone text.
6. **Add og:title, og:description, og:url, og:type=website, og:site_name, og:locale=tr_TR, twitter:card=summary_large_image** to index.html as global defaults.
7. **Add "OllamaTR vs Ollama" mini-section** to Home or Hakkimizda — answers the #1 user question and clarifies positioning.
8. **Add 5 missing FAQs** to Indir (install troubleshooting) + 5 to HangiModel (model selection).
9. **Convert images to WebP/AVIF** + add apple-touch-icon + favicon.ico fallback.
10. **Soften technical density** — add plain-Turkish glosses to "Tauri", "Docker", "fine-tune", "latency", "fine-tune" on first mention per page.

## A killer 1-sentence pitch I'd recommend

> **OllamaTR, 100+ Türkçe-uyumlu yapay zeka modelini tek tıkla bilgisayarınıza kurar — verileriniz bilgisayarınızdan çıkmadan, internet bile gerekmeden, tamamen ücretsiz.**

Why this works: leads with proof (100+), promises action (tek tıkla), names the moat in one breath (yerel + offline + free), uses only one piece of jargon ("yapay zeka model"), and ends on the strongest word ("ücretsiz") which is the disqualifier-killer for KOBİ readers. 28 words, fits in a meta description, reads aloud in 6 seconds.
