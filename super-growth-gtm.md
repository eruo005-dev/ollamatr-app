# OllamaTR — Super Growth & GTM Playbook
*S1 Strategist · 2026-05-26 · Path from community project to Turkish AI household name*

---

## 1. Brutal truth
OllamaTR is today a beautifully-designed marketing site with **no shipped product** behind it — the Tauri installer is barely scaffolded, the "10.000+ kullanıcı" testimonials are placeholder copy, and the only real artifact is a curated catalog of 12 Türkçe LLMs plus a 4-question wizard. What is genuinely working: clear Türkçe-first positioning, an honest Community Edition stance (Tüzel Kişilik Yok badge, KVKK page), and a defensible content moat in being the only Türkçe-indexed entry point for Ollama. The moat is **language + curation**, not technology — Ollama itself is upstream, so the durable asset is the Türkçe ecosystem layer: docs, model cards, KVKK templates, community. Lose that race and you become a wrapper; win it and you become the default.

## 2. Audience segmentation

| Persona | Profile | Core need | What converts him/her |
|---|---|---|---|
| **Bireysel geliştirici — Mehmet K., 28, freelance** | İstanbul, 16GB MacBook, Python + JS, ChatGPT Plus aboneliği var ama VPN sorunu yaşıyor | Türkçe çıktı kalitesi yüksek, ücretsiz, offline, müşteri verisini buluta göndermeme garantisi | Tek tık installer + "hangi model" wizard'ı + RAM uyarı sistemi |
| **Akademisyen — Doç. Dr. Ebru Ş., 41, NLP araştırmacısı** | Boğaziçi/İTÜ/ODTÜ, TÜBİTAK projesi yürütüyor, makaleler için Türkçe LLM benchmarkları arıyor | Reproducible model eval, citation-friendly model cards, lisans netliği, Türkçe NLP dataset bağlantıları | Model leaderboard + lisans tablosu + arXiv-stili model raporları |
| **KOBİ teknoloji lideri — Tolga D., 38, IT Müdürü, ~80 kişilik şirket** | Bursa/Konya/İzmir, KVKK denetimi geçirmiş, ChatGPT'yi yasaklamış, lokal AI istiyor ama Docker bilmiyor | KVKK-uyumlu kurulum, faturalı destek, SLA, anahtar teslim entegrasyon | "Yakında" Kurumsal paket waitlist + KVKK Aydınlatma Metni şablonu indir + vaka çalışmaları |
| **Öğrenci — Zeynep K., 22, lisans son sınıf** | ODTÜ/Hacettepe, bitirme projesi, ücretsiz GPU yok, ailesinin internet bağlantısı zayıf | Türkçe rehber, başlangıç tutorial, kampüste arkadaşlarına anlatabileceği basit anlatım, sertifika değeri | YouTube video serisi + Discord öğrenci kanalı + üniversite kulüpleri partnership |

## 3. Positioning + messaging matrix

| Persona | One-line message |
|---|---|
| Mehmet (freelance) | **"Müşteri verini buluta göndermeden, Türkçe AI çalıştır — 10 dakikada kurulum."** |
| Ebru (akademik) | **"Türkiye'nin Türkçe LLM ekosisteminin tek standardize edilmiş kataloğu — model kartları, benchmark'lar ve lisanslar açık."** |
| Tolga (KOBİ) | **"KVKK-uyumlu, on-prem, Türkçe AI altyapısı. Bulut yok, ihracat yok, denetim raporu hazır."** |
| Zeynep (öğrenci) | **"İlk Türkçe LLM'ini bugün çalıştır — Türkçe rehber, ücretsiz, kayıt yok."** |

## 4. Channel strategy — ranked by ROI for current stage

**Tier S (do first, weekly):** GitHub trending push · Reddit r/LocalLLaMA + r/Turkey · Discord organic · Blog SEO for TR keywords ("ollama türkçe", "lokal LLM", "KVKK yapay zeka")
**Tier A (compound monthly):** TR YouTube (MAYA, Erkan Erol, Pat-Pat AI) demo gönderimi · X/LinkedIn TR dev community · DevTR/Devnot guest post · University AI clubs (ITU YZ, Boğaziçi AI, ODTÜ Bilim Topluluğu)
**Tier B (quarterly):** Hacker News (one shot, when installer ships) · ProductHunt (timed with v1.0) · TR podcasts (Geek Lounge, Software Talks TR) · Newsletter sponsorship (Açık Akademi, Tech Buddy)
**Tier C (long-cycle, 6-12 ay):** BTK Akademi partnership · Kodluyoruz workshop track · Conference talks (Devnot, DevDays Türkiye, Yapay Zeka Zirvesi)

### Month 1 week-by-week
- **Week 1:** Ship installer v0.1 (alpha to 20 friendly testers). Publish GitHub README in Türkçe+EN. Open Discord with 5 channels. Post r/LocalLLaMA "I built a Turkish localization layer for Ollama".
- **Week 2:** Blog post #1 ("Türkiye'de Lokal AI Neden Önemli — KVKK Cephesi"). Submit to r/Turkey + LinkedIn TR groups. DM 10 TR dev YouTubers with demo video.
- **Week 3:** Reach out to 3 university AI clubs (ITU, Boğaziçi, ODTÜ) — offer a 30-min workshop. Publish "Hangi Türkçe LLM En İyi?" benchmark post.
- **Week 4:** First Discord AMA. Pitch DevTR for guest post. Begin Patreon/Sponsors campaign with first 50 supporters target.

## 5. Content engine

- **Cadence:** 2 blog posts/week + 1 YouTube short/week + 3 X threads/week + 1 deep-dive monthly
- **Where:** Primary on `/blog` (SEO juice goes to ollamatr-app.vercel.app), syndicate to dev.to TR tag, Medium TR with canonical link, Substack newsletter monthly digest
- **Pillars:** (1) Tutorials, (2) Model deep-dives, (3) KVKK/legal explainers, (4) Case studies, (5) Behind-the-scenes/dev log

### 30 article ideas
1. Ollama Türkçe Kurulum Rehberi (Windows/Mac/Linux)
2. Llama-3-Turkish-8B vs Mistral-Turk-7B: Hangisi Daha İyi?
3. Trendyol-LLM-7B-v2 ile Müşteri Servisi Bot'u Nasıl Kurulur
4. 8GB RAM'lik Laptop'ta Türkçe LLM Çalıştırma
5. KVKK Uyumlu RAG Mimarisi — Adım Adım
6. Cohere Aya 23 Türkçe Performans Analizi
7. Türkçe Embedding Modelleri Karşılaştırması
8. Open WebUI Türkçe Arayüz Kurulumu
9. Apple Silicon (M2/M3) için En Hızlı Türkçe Modeller
10. Fine-tune 101: Kendi Türkçe LLM'inizi Eğitin
11. KOBİ'ler için 5 Lokal AI Use Case
12. ChatGPT vs Lokal LLM — Maliyet Hesabı (TL)
13. Türkçe LLM Lisansları: Hangisi Ticari Kullanıma Açık?
14. "Aydınlatma Metni" AI Bot'a Nasıl Yazılır
15. Ollama API ile Python Entegrasyonu — Türkçe Örnekler
16. Bora-7B vs Kardesler-LLM: Hangi Türkçe-Native Model?
17. Üniversite Bitirme Projesi: Yerel LLM ile Soru-Cevap Sistemi
18. ITU AI Lab ile Söyleşi (mülakat formatı)
19. GPU Olmadan Türkçe LLM Çalıştırmak Mümkün mü?
20. Top 10 Türkçe Prompt Engineering Tüyosu
21. Hugging Face TR Topluluğu: Kim Kimdir?
22. Yerel LLM ile Türkçe E-Fatura Okuma
23. Devlet Kurumları için AI: KVKK + Veri Egemenliği
24. Ollama'da Hız Optimizasyonu — quantization rehberi
25. Whisper Türkçe + Ollama ile Sesli Asistan
26. Tauri ile Cross-Platform AI Installer (dev log)
27. OllamaTR Roadmap — Topluluktan Gelen Talepler
28. 100K Türkçe Token Üretmek Kaç Lira?
29. Akademisyenler için OllamaTR — Reproducibility Kit
30. "Şirketleştik" — Topluluktan Anonim Şirkete Yolculuk (PR moment)

## 6. Community moderation strategy

**Discord channel structure:**
- `#duyurular` (read-only, releases + blog)
- `#başlangıç` (kurulum yardım)
- `#model-tartışma` (kanal başına popular model)
- `#kvkk-hukuk` (legal Q&A — disclaimers mandatory)
- `#donanım` (RAM/GPU advice)
- `#proje-vitrini` (build showcase)
- `#kobi-vitrin` (B2B use cases)
- `#akademik` (research/papers)
- `#meta` (mod feedback)
- Sesli: `#workshop-salonu`, `#kahve-molası`

**Moderator recruitment:** İlk 6 ay 5 gönüllü mod (yarısı akademik, yarısı geliştirici). Compensation: GitHub Sponsors mütevazi kupon + name in `THANKS.md`. Aylık 30-dak sync.

**Rules / CoC:** Contributor Covenant v2.1 Türkçe çeviri olarak adapte et. Yasak: paid model recommendations as own, doxxing, KVKK-sensitive müşteri verisi paylaşma.

**Spam:** AutoMod + Wick bot, ilk 48 saat yeni üye link atamaz, captcha verification açık.

**Dil politikası:** Türkçe birincil, İngilizce hoş karşılanır. Kod ve hata mesajları İngilizce, açıklamalar Türkçe — bilingual by design.

## 7. Brand voice playbook

- **Tone words:** netto · cesur · meraklı · şefkatli · şeffaf
- **Forbidden phrases:** "devrim niteliğinde", "AI-powered" (yapay zeka destekli demeyin, ne yaptığını söyleyin), "world-class" (Türkçe karşılığı yok zaten), "synergy", "ezber bozan"
- **Signature openers:** "Kısa cevap:" · "Önce şunu söyleyeyim —" · "Topluluktan gelen soru:"
- **Signature closers:** "Sorular için Discord'a bekleriz." · "Açık kaynak — PR açın, konuşalım." · "Veriniz yine sizde."
- **Emoji policy:** Status emojileri OK (🟢🟡🔴), karakter emojisi yok. README'de en fazla 3.
- **Capitalization:** Display başlıklar UPPERCASE (uppercase Türkçe karakterleri doğru: İ Ş Ğ Ü Ö Ç). Body cümle yapısı. "Türkçe" her zaman büyük T. "OllamaTR" daima tek kelime, T büyük R büyük.

## 8. OSS sustainability funding

**GitHub Sponsors hedefleri:**
- Y1: 50 sponsor × ortalama 25₺/ay = **1.250₺/ay** (sürdürülebilirlik için yeterli değil ama sinyal)
- Y2: 200 sponsor × 35₺/ay + 5 kurumsal × 500₺/ay = **9.500₺/ay** (yarı zamanlı bir maintainer geçindirir)

**Patreon tiers (Türk Lirası eşdeğeri):**
- Destekçi (50₺): isim listede + Discord rozeti
- Topluluk Üyesi (150₺): aylık AMA erken erişim + sponsor-only blog post
- Kurum Sponsoru (1500₺): logo footer'da + 2 saat danışmanlık kredisi (şirketleştikten sonra)

**Grant pipeline (öncelik sırasıyla):**
- **TÜBİTAK 1512 BiGG** (2. aşama 600K₺) — şirketleşince başvur, Türkçe NLP altyapısı angle
- **KOSGEB AR-GE İnovasyon** — KOBİ paketi için ürün geliştirme desteği
- **BTK Akademi içerik sponsorluğu** — Türkçe AI eğitim modülü
- **Türkiye İş Bankası Maximum Genç** — küçük başlangıç desteği
- **Horizon Europe — Digital Europe Programme** — TR ortağıyla AI infrastructure çağrısı
- **EuroHPC JU Access Calls** — compute donation (ücretsiz GPU saatleri)

**Compute partnerships:** HF Inference Endpoints sponsored access başvur. Cohere TR (varsa) — Aya 23 modelin Türkçe lansman partneri ol. RunPod / Vast.ai — referral cuts.

## 9. When/how to incorporate (şirketleşme)

**Trigger events (any of):**
- 1.000 GitHub stars + 5.000 unique downloads
- İlk 5 ciddi B2B inquiry (kobi waitlist'ten)
- 5.000₺/ay sustained Sponsors+Patreon MRR
- İlk fatura kesilebilir hizmet talebi (workshop, danışmanlık)

**Path:**
1. **Şahıs şirketi** (~3 hafta, ~3.000₺/ay): hızlı, KDV mukellefiyeti, stopaj sistemi basit. İlk faturayı kes, dene.
2. **Limited Şirketi (Ltd. Şti.)** (~1.5 ay, ~15.000₺ kuruluş + 6-8K₺/ay sabit gider): yatırımcı görüşmesi açılınca, "OllamaTR Bilgi Teknolojileri Ltd. Şti." Kurumlar vergisi %25, sigorta + mali müşavir + ofis adresi.
3. **A.Ş.** — ancak Series A veya 50+ kurumsal müşteri varken. Şu an alakasız.

**Vergi:** Şahıs'ta gelir vergisi dilimli + stopaj %20 (yazılım hizmeti). Ltd.'de KDV %20 + kurumlar vergisi %25. Yazılım istisnası teknoparkta %0 kurumlar (5+ yıl) — **bu yüzden İTÜ ARI Teknokent veya Bilkent Cyberpark'a yerleşmek altın değerinde**.

**Muhasebeci:** 750-1.500₺/ay aralığı normaldir. Yazılım sektörüne özel SMMM seç (e-arşiv, KDV iadesi tecrübesi olan).

## 10. Partnership pipeline

| Partner | Contact path | Offer | Ask |
|---|---|---|---|
| **Trendyol AI Lab** | LinkedIn → Tolga Kurtuluş (eski Trendyol AI), Devnot etkinlikleri | Trendyol-LLM-7B-v2'yi katalogda öne çıkar + co-authored model card | Co-marketing, model güncelleme önce-haberi |
| **ITU AI Lab / Boğaziçi NLP / Koç KUIS** | Akademik e-posta, Yapay Zeka Zirvesi standı, Doç. Dr. Reyyan Yeniterzi (Sabancı), Prof. Tunga Güngör (Boğaziçi) | Reproducibility Kit + öğrenci hibesi (1.000₺ × 3) | "Academic Partner" rozeti + paper citation |
| **Hugging Face TR chapter** | Discord + meeting via Merve Noyan (HF Türk) | Topluluk modellerini HF'de mirror'la + Türkçe model leaderboard barındır | HF Spaces ücretsiz quota, blog cross-post |
| **Kodluyoruz** | İnsan kaynakları@kodluyoruz.org + Sarp Kaya LinkedIn | Ücretsiz Türkçe AI bootcamp modülü (8 saat) | 200+ bootcamper'a OllamaTR demo dağıtımı |
| **BTK Akademi** | btkakademi.gov.tr içerik kurulu başvuru formu | Türkçe Lokal AI 6-haftalık kurs içeriği | Kamu görünürlüğü + sertifika programına link |
| **KOSGEB** | İl müdürlüğü randevu + KOBİ Destek Programları başvuru | KOBİ'lere ücretsiz değerlendirme raporu | KOBİ tavsiye listesi + AR-GE hibe danışmanlığı |
| **TÜBİTAK BİLGEM** | TÜBİTAK Konferansları + iletişim formu | KamuNet uyumlu Türkçe LLM altyapı PoC | Kamu sözleşmesi (uzun vade) |

## 11. Risk register

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| **Ollama Inc. trademark itirazı** ("OllamaTR" ismi) | Yüksek | Kritik | (a) USPTO/TÜRKPATENT Ollama mark araştırması bugün yap; (b) "OllamaTR" yerine "OllaTR" veya "TürkçeLLM" yedek ismi rezerve et; (c) Ollama'ya direkt iletişim — "Turkish community localization" olarak konumlandır, lisans/MoU iste |
| **Solo operatör burn-out** | Yüksek | Yüksek | İlk 6 ayda 2 co-maintainer recruit (Discord'dan en aktif 2 katkıcı), haftalık 1 gün "kapalı gün" |
| **Rakip — LM Studio TR, Jan.ai TR** | Orta | Orta | TR-native moat: KVKK templates, Türkçe model curation, partnership stacking. Hızlı hareket et. |
| **KVKK enforcement against community project** | Düşük (analytics yok, log yok) | Orta | KVKK page güncel tut, Vercel access log retention politikası belgelendir, iletişim e-postası ayrı VERBİS kayıdı düşün |
| **Momentum kaybı (3-6 ay sessizlik)** | Orta | Yüksek | "Public build log" — haftalık dev log zorunluluğu, takvim block'lu |
| **Türkçe LLM kalitesi yetersiz (modellerin kendisi)** | Yüksek (gerçek) | Yüksek | Açık iletişim: kullanım kılavuzunda "henüz GPT-4 seviyesinde değil" disclaimer; benchmark sayfasında olduğu gibi göster |
| **Vercel/altyapı maliyeti şişer** | Düşük | Düşük | Free tier yeterli; Sponsor'lar kesinlikle bu maliyeti karşılar |

## 12. 6-month milestone map

| Ay | Anchor | Metric 1 | Metric 2 | Metric 3 |
|---|---|---|---|---|
| **M1** | Installer v0.1 alpha + Discord launch | 100 GitHub stars | 50 Discord üye | 1.000 site ziyaret |
| **M2** | Content engine ignite (8 blog post) | 500 GitHub stars | 250 Discord | 10 Sponsors |
| **M3** | İlk üniversite workshop'u (ITU veya ODTÜ) | 1.000 stars | 50 Patreon supporter | 1. b2b inquiry |
| **M4** | Tauri installer v1.0 → HN/PH launch | 3.000 stars (HN spike) | 5.000 cumulative download | 25 Sponsors |
| **M5** | Şahıs şirketi kuruluş + ilk faturalı iş (workshop/danışmanlık) | İlk 10.000₺ revenue | 1.000 Discord | TR YT featured (1 channel) |
| **M6** | Yapay Zeka Zirvesi konuşması + partnership announcement (1 of: Trendyol/HF/Kodluyoruz) | 5.000 stars | 5.000₺/ay MRR | TÜBİTAK 1512 başvuru |

## 13. Top 10 highest-leverage growth actions

1. **TÜRKPATENT marka başvurusu (1 hafta içinde)** — "OllamaTR" sınıf 9+42 başvuru, paralel olarak Ollama Inc. ile MoU dene
2. **Tauri installer v0.1 alpha çıkar (4 hafta)** — site şu an boş vaat, ürünsüz büyüme tavanı 1K star
3. **r/LocalLLaMA + HN duo-launch** — installer ship ettiğinde tek atış, başlık: "Built a Turkish localization layer for Ollama with KVKK templates"
4. **Blog SEO kapma — top 5 anahtar kelime için 2.000 kelimelik makaleler:** "ollama türkçe", "lokal LLM", "KVKK yapay zeka", "ChatGPT alternatifi türkçe", "fine-tune türkçe"
5. **3 üniversite AI kulübü ile aylık workshop seri** — talent funnel + her oturumda 20-50 Discord üye
6. **Trendyol AI Lab co-marketing** — kataloğunda zaten Trendyol-LLM var, model card'ı co-author'la, ikisi de tweet'lesin
7. **"Hangi Model?" wizard'ı email gate'le** — 4 soru sonunda öneri + email opt-in = newsletter listesi build
8. **YouTube TR 3 büyük kanala demo gönder** — MAYA + Erkan Erol + Pat-Pat AI, exclusive 1 hafta erken erişim ile teklif et
9. **KVKK-uyumlu RAG template'i ücretsiz repo olarak yayınla** — KOBİ leadgen mıknatısı, "indirmek için email" gate'i
10. **6. ay'da şahıs şirketi aç, ilk faturayı kes** — psikolojik eşik, hibe başvuru hakkı, kurumsal müşteri güveni

---

*Top-3 büyüme bahsi: (1) önce ürün — Tauri installer alpha 4 haftada, çünkü siteyi ürünsüz büyütmek tavansız; (2) Türkçe SEO + üniversite kulüpleri kombinasyonu — düşük maliyetli, yüksek kalıcı funnel; (3) Trendyol AI Lab veya Hugging Face TR partnership'i — birinin "stamp"i ile akademik + medya etkisi compound olur. Marka tescili ve Ollama Inc. iletişimi paralelde, çünkü isim kaybetmek tüm bunları silebilir.*
