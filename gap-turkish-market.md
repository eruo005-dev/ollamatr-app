# OllamaTR — Turkish-Market Gap Hunt
**Agent:** G3
**Date:** 2026-05-26

## Top 10 TR-market gaps (ranked)

1. **No `.tr` / `.com.tr` domain** — `ollamatr-app.vercel.app` is a free-tier subdomain. To Turks this signals "hobby project / not serious." `ollamatr.com.tr` is table stakes for trust, KVKK pitching, and KOBİ B2B outreach.
2. **No SEO scaffolding at all** — `app/public/` ships favicon + jpgs but **no `robots.txt`, no `sitemap.xml`, no Schema.org JSON-LD**. `index.html` has one `<meta description>` and one `og:image`; no `og:title`, no `og:url`, no Twitter card, no canonical, no `<link rel="alternate" hreflang>`. We are invisible to Google TR.
3. **Email infrastructure is a placeholder** — `iletisim@ollamatr.dev` appears in legal pages with no MX. KVKK Veri Sorumlusu kontağı yasal olarak çalışabilir olmalı; ulaşılmayan adres müeyyide riski.
4. **No vertical playbooks** — site is generic ("100+ Türkçe model"). Türk pazarının para harcadığı 4 dikey (KOBİ muhasebe + e-Fatura, e-ticaret ürün/iade, hukuk/Resmi Gazete, sağlık reçete OCR) için tek satır içerik yok. Bu, "ChatGPT Türkçe alternatifi" mesajından çok daha satılabilir.
5. **Data-residency disclosure missing** — site is served from Vercel (Frankfurt edge). For a brand whose entire pitch is "KVKK-uyumlu, veri yurtdışına çıkmaz," this is a credibility bomb. Bir KVKK aydınlatma satırı + bir TR-DC roadmap kalemi gerekiyor.
6. **Hakkımızda iddia ettiği partnerler gerçek değil** — `partner-logos.jpg` ve `Hakkimizda.tsx` Teknopark / akademik partner görselleri içeriyor. Müeyyide riski + ICY (itibar) riski; ya gerçekleştir ya kaldır.
7. **Türk AI ekosistemi haritada yok** — Trendyol-LLM, KUIS AI Lab (Koç), İTÜ AI, Boğaziçi NLP, HuggingFace TR community — hiçbirine atıf, link, model katalog girişi yok. "Türkiye'nin yerel AI'si" diyorsan Türkiye'nin var olan oyuncularını tanı.
8. **TR keyword stratejisi yok** — "Türkçe yapay zeka", "yerel LLM", "KVKK uyumlu AI", "ChatGPT alternatifi Türkçe" gibi yüksek-niyetli aramalar için landing-page veya blog yok. Tek sayfa Home + Fiyatlandırma + Modeller, hiçbiri keyword'a optimize değil.
9. **Ödeme altyapısı sıfır** — community-edition'a uygun (bağış GitHub Sponsors + Patreon) ama TR donörler bunları **kullanamıyor**. iyzico / PayTR / Param entegrasyonu yok; Patreon TL hesap çekme zor. "Kredi kartım çalışmadı" friction = %0 dönüşüm.
10. **Telaffuz + marka kimliği belirsiz** — "Ollama-TR" mı "Ollamatr" mı? Türkçe okuyucu refleksi ikincisine kayar ("ol-la-matr"). Footer'da veya logo altında subtle "/ olla·ma·tr /" telaffuz hint'i yok.

---

## By dimension

### Brand / domain / identity
- **Domain**: Sadece `ollamatr-app.vercel.app`. Resmî bir TR markası için bu zayıf. Bkz. satın-alma listesi aşağıda.
- **Logo / favicon**: `favicon.svg` 273 byte (muhtemelen monokrom O harfi). Türk kültürel referansı yok. Önerilen: subtle hilal arc'ı O harfinin sol üst kavisinde gizli, ya da 16 yıldız motifi loader animasyonu. **Aşırıya kaçma** — Türk-bayrak-vibe ucuz görünür, "Made in Turkey AI" daha çok tipografi + renk paleti (lacivert + bakır/turkuaz) ile yapılır, kırmızı-beyaz değil.
- **Telaffuz**: Footer'a `<small lang="tr">/ ol·la·ma·tr / Ollama + TR</small>` ekle. Yabancı misafirler "TR" suffix'ini kaçırıyor; yerli okuyucu Ollama'yı bilmiyor.
- **Email**: iletisim@ollamatr.com.tr → Zoho Mail / Yandex 360 (TR vergisi yok, ücretsiz tier) veya Google Workspace TR (49₺/kullanıcı/ay). MX + SPF + DKIM kayıtları **gün 1**.
- **Pronunciation**: "Ollamatr" tek kelime daha akılda kalır. Marka rehberinde sabitle.

### SEO + search visibility
- **Google Search Console**: kurulu değil. `webmaster-google.html` veya DNS-TXT doğrulama eklenmemiş.
- **Yandex Webmaster**: TR pazarında Yandex %2-3 ama bedava trafik, ekle.
- **robots.txt**: yok. Oluştur: `User-agent: * / Allow: / / Sitemap: https://ollamatr.com.tr/sitemap.xml`.
- **sitemap.xml**: yok. 10 route var (Home, Indir, Modeller, HangiModel, Fiyatlandirma, Dokumantasyon, Topluluk, Hakkimizda, KVKK, CerezPolitikasi) — hepsini statik sitemap'e koy, `lastmod` ile.
- **Schema.org JSON-LD** (`index.html` head'ine):
  - `SoftwareApplication` (OllamaTR, applicationCategory: DeveloperApplication, operatingSystem: Windows/macOS/Linux, offers.price: 0)
  - `Organization` (name, url, sameAs: [github, twitter, mastodon TR])
  - `FAQPage` (Dokümantasyon SSS'den)
- **Meta tag eksikleri** (index.html): `og:title`, `og:description`, `og:url`, `og:type`, `og:locale=tr_TR`, `twitter:card`, `twitter:site`, `canonical`. Hepsi tek seferlik PR.
- **hreflang**: İngilizce versiyon geldiğinde `<link rel="alternate" hreflang="tr-TR">` + `hreflang="en"` + `hreflang="x-default"`. Şimdi henüz değil ama plan dokümante edilmeli.
- **Hedef anahtar kelimeler (aylık aratma tahminleri)**: "Türkçe yapay zeka" (~8-12K), "yerel llm" (~1-2K), "ChatGPT alternatifi Türkçe" (~5K), "KVKK uyumlu AI" (~500 ama ULTRA niyetli), "Ollama Türkiye" (~300, brand defensive), "yapay zeka offline" (~2K). Her biri için landing veya blog yazısı.
- **TR Wikipedia**: "Ollama (yazılım)" maddesi yok; "Yerel büyük dil modeli" maddesi de yok. İkisini de oluştur — kalıcı backlink + otorite sinyali.

### Turkish vertical use cases (untapped)
Mevcut site dikey vurgulamıyor. **Her dikey = bir landing + bir blog yazısı + bir model konfigi**:
- **KOBİ Muhasebe + e-Fatura**: e-Fatura/e-Arşiv XML → kategori sınıflandırma, KDV özeti, Paraşüt/Logo/Mikro export uyumu. Bu **en hızlı para** — 3.5M KOBİ + e-fatura zorunluluğu. Önerilen model: Qwen2.5-7B fine-tune + JSON output.
- **Hukuk**: Resmi Gazete RSS arama + özetleme, sözleşme klozu tarama, Yargıtay/Danıştay karar özeti. İTÜ + Trendyol son aylarda hukuki TR-LLM açıkladı — onlara atıf yap, *katalogla*, "OllamaTR ile yerel çalıştır" yardımı sun.
- **Sağlık**: Reçete OCR + anti-hallüsinasyon, doktor notu transkripsiyon. **KVKK Madde 6 hassas veri = bulut illegal pratikte** → "yerel çalışır" satış argümanı **rekabetsiz**. Hastane CIO'sunun rüyası.
- **e-Ticaret**: Trendyol/Hepsiburada/n11 ürün açıklaması üretici, müşteri yorumu sentiment, iade nedeni sınıflandırması. Mağaza başına 50K+ SKU'lu KOBİ'ler için.
- **Kamu / e-Devlet**: e-Devlet metinlerini sade dile çevirme, dilekçe taslakları. Vatandaş-yüzlü ücretsiz tool — basın için iyi PR.
- **Eğitim**: YÖK tez tarama (PDF → soru-cevap), MEB ders materyali, ÖSYM soru analizi. Üniversite kütüphaneleri için kurumsal lisans (community-edition'dan ayrı).
- **Medya**: AA/İHA/DHA RSS → günlük brifing, gazeteci için kaynak özetleme.
- **Bankacılık / Finans**: BDDK regülasyonu bulut AI'yı zorlaştırıyor → yerel AI yegane uyumlu seçenek. Devlet bankaları (Ziraat, Halkbank, Vakıfbank) için sales motion.

### Payments + monetization
- **iyzico** veya **PayTR**: TR kartı kabulu için zorunlu; community-edition'da "Kahve ısmarla" tek-tıklı 30₺/60₺/120₺.
- **Param / Papara**: gençlik segmenti.
- **Stripe Türkiye**: 2024 sonu açıldı, döviz bazlı abonelik için en temiz.
- **Apple Pay / Google Pay**: iyzico üzerinden zaten gelir.
- **e-Fatura sağlayıcı**: Paraşüt (en startup-dostu), Logo, Foriba. Şirket kurulduğunda Paraşüt + iyzico standart kombo.
- **Şirket kuruluşu**: Şahıs şirketi 3-5K₺ (en hızlı, vergisel dezavantaj yıllık <500K ciroya kadar küçük), Limited 15-30K₺ (yatırım/grant alacaksan zorunlu). KOSGEB BIGG / TÜBİTAK 1512 başvurularında Limited.

### Hosting (data residency)
- **Mevcut**: Vercel (Frankfurt). Statik site için KVKK gri-alan (kişisel veri toplamıyorsa OK, ama "veri sorumlusu" konumlanırken Aydınlatma Metni'ne yazılmalı).
- **TR-içi seçenekler**:
  - **Türk Telekom Bulutu / TT-Cloud**: kurumsal, BTK uyumlu, pahalı.
  - **Turkcell Veri Merkezi (İzmir/İstanbul)**: orta segment.
  - **Vargonen, Vbt, AtlasCloud**: KOBİ/startup uygun, aylık 200-800₺ VPS.
  - **Azure Türkiye North (İstanbul, 2024 launch)**: KVKK-uyumlu hyperscale; managed servisler için temiz.
  - **AWS Frankfurt**: KVKK için gri ama KVKK Kurul kararıyla AB GDPR yeterli koruma sayıldığı için çoğunlukla kabul edilir.
- **Öneri**: Marketing/landing Vercel'de kal (hız), API/back-end gerektiğinde Azure TR North veya Vargonen TR VPS. Aydınlatma Metni'nde "site barındırma Vercel Inc. (Frankfurt) tarafından yapılmakta olup yalnızca anonim ziyaret istatistikleri işlenmektedir" satırı **bugün** eklenmeli.

### Compliance + grants
- **BTK Yer Sağlayıcı Kaydı**: ticarileştirme olunca zorunlu (5651 Sayılı Kanun). Şahıs şirketi için bile.
- **KVKK VERBİS**: yıllık ciro 25M₺ altı / çalışan 50 altı muafiyet kapsamında ama 2026 düzenlemesini kontrol et. Hassas veri işleniyorsa muafiyet yok.
- **ETBİS** (Elektronik Ticaret Bilgi Sistemi): e-ticaret kapsamı varsa.
- **Grant fırsatları**:
  - **TÜBİTAK 1512 BIGG**: 200K₺ erken aşama hibe, AI proje uygun, başvuru çağrı dönemleri Mart/Eylül.
  - **KOSGEB Ar-Ge Destek**: 1.5M₺ tavan.
  - **TEYDEB 1501/1507**: KOBİ Ar-Ge.
  - **Teknopark**: %100 Ar-Ge gelir vergisi muafiyeti + SGK desteği. Şu an Hakkımızda partner iddiası **gerçek değil**, ya gerçekleştir ya kaldır (legal risk).
  - **DigitalEurope / Horizon Europe**: TR de program ülkesi, AB AI fonu açık.

### Developer ecosystem
- **Kodluyoruz**: ücretsiz bootcamp ağı — partner olarak "AI bootcamp modülü" sponsorla, OllamaTR brand awareness for free.
- **Patika.dev**: workshop sponsorluğu + iş ilanı placement.
- **BTK Akademi**: devlet platformu, "OllamaTR ile yerel AI" kursu = devlet otoritesi sinyali.
- **Turkcell Geleceği Yazanlar**: blog content placement.
- **Devnot.com, webrazzi.com, Medium TR**: 5 yazı / 6 ay = "Türkiye'de AI deyince OllamaTR" mindshare.
- **Podcasts**: Geek-Lounge, Software Talks TR — kurucu konuk yayını.
- **TR GitHub topluluğu**: `awesome-turkish-nlp` repo'larına PR; `transformers-tr` watch.

### TR AI players (cooperate or differentiate)
- **Trendyol AI Lab**: OpenSource LLM'leri var (Trendyol-LLM-7B-Chat-v1, vs.) — `models-data.ts`'e ekle, "Trendyol modeli OllamaTR'de tek tık" → onlar paylaşır, sen mindshare alırsın.
- **KUIS AI Lab (Koç) + İTÜ AI + Boğaziçi NLP**: akademik atıf + öğrenci elçi programı. Demoları onların campus'larında.
- **Hugging Face TR community**: Discord + Twitter — model katalog cross-linking.
- **DataTalks.club TR**: konuşmacı placement.
- **Differentiate from**: ChatGPT TR (bulut, KVKK gri), Claude TR (bulut), Aselsan/Havelsan defense AI (kapalı, halka açık değil). OllamaTR pozisyonu: **"sivil, açık, yerel, KVKK-temiz"** üçgeninin tek köşesi.

---

## Recommended TR domain purchases (ranked, TL)

| Sıra | Domain | Tahmini Maliyet/Yıl | Nerede |
|------|--------|----------------------|--------|
| 1 | `ollamatr.com.tr` | 65-90₺ (NIC.TR resmi) | nic.tr / isimtescil / natro |
| 2 | `ollamatr.com` | ~350₺ ($10-12) | porkbun / cloudflare |
| 3 | `ollamatr.tr` | 800-1500₺ (yeni .tr TLD 2023) | tld.tr akredite registrar |
| 4 | `ollamatr.dev` | ~550₺ ($15) | cloudflare/google domains | (mevcut email referansı koruyor)
| 5 | `ollamatr.ai` | 2500-3500₺ ($70-90) | porkbun/namecheap |
| 6 | `ollama-tr.com` (defensive) | 350₺ | porkbun |
| 7 | `ollamatr.org` (community-edition için ideal) | 550₺ | cloudflare |

**Minimum bugün al**: `ollamatr.com.tr` + `ollamatr.com` + `ollamatr.org`. Toplam ~1000₺/yıl. Geri kalan defensif, ilerde.

---

## Top 5 actions in first 30 days
1. **Domain + email**: `ollamatr.com.tr` satın al, Zoho Mail bağla, `iletisim@`, `kvkk@`, `destek@` aliasları. KVKK ve Çerez sayfalarındaki `iletisim@ollamatr.dev` referanslarını güncelle.
2. **SEO scaffolding PR**: `robots.txt`, `sitemap.xml`, `index.html`'a full OG/Twitter/canonical meta + Schema.org JSON-LD (SoftwareApplication + Organization). Tek commit.
3. **Google Search Console + Yandex Webmaster** doğrulama (DNS TXT) + sitemap submit.
4. **Hakkımızda partner görsellerini temizle** (legal risk). Yerine "Topluluk Destekçileri" başlığı altında GitHub kontribütörleri, gerçek HuggingFace TR komünite linkleri.
5. **Data-residency disclosure**: KVKK Aydınlatma Metni'ne "site hosting Vercel Inc. Frankfurt" satırı + Yol Haritası sayfasına "TR-DC migration Q3" kalemi.

## Top 5 actions in first 90 days
1. **Vertical landing pages**: `/kullanim/kobi-muhasebe`, `/kullanim/hukuk`, `/kullanim/saglik`, `/kullanim/e-ticaret`. Her biri 800-1200 kelime + 1 demo video + 3 SSS (Schema.org FAQPage). KVKK Madde 6 hassas veri argümanını sağlık sayfasında kullan.
2. **Trendyol-LLM + Türkçe model kataloğu** (`models-data.ts`'e ekle): Trendyol-LLM, Cosmos-LLaMa (Boğaziçi), Turkcell LLM, Kanarya (Bilkent), Mukayese (Hacettepe). Her birine kısa Türkçe açıklama + akademi atfı.
3. **TR Wikipedia maddeleri**: "Ollama (yazılım)" + "Yerel büyük dil modeli" oluştur (içerik kontribütör, dış kaynaklarla).
4. **3 blog yazısı** (Devnot / Medium TR / webrazzi misafir yazısı): "KVKK uyumlu yapay zeka nasıl?", "ChatGPT yerine yerel LLM: pratik rehber", "KOBİ'ler için e-Fatura + AI: 5 dakikada başla."
5. **Şirket kuruluş kararı** (şahıs vs Limited) + iyzico/PayTR merchant başvuru + Paraşüt entegrasyon. Bağış akışı TR kartlarıyla çalışır hale gelsin.

---

## "Made in Turkey AI" — what makes that a brand
Üç şey, sırasıyla:

1. **Veri toprağı**: ana mesaj "veriniz bilgisayarınızdan çıkmaz." KVKK uyumu *sonuç* değil, *yan ürün*. Bu mesaj sağlık, hukuk, banka, kamu — TR'nin en zengin alıcılarının dilinden konuşur. Vercel/Frankfurt detayı şeffafça açıklanır; bulutsuz çalışan **gerçek değer** (Ollama CLI + yerel modeller) ana ürün olarak konuşulur.

2. **Türk üreticiye saygı**: kataloğun Trendyol, Koç, Boğaziçi, İTÜ, Bilkent, Hacettepe'nin gerçek modellerini *taşır*, *atıflar*, *yüceltir*. Bu "Türkiye'nin yerel AI'si" iddiasının tek dürüst yoludur. Rakipsiz oyun: yerli akademinin önemli bir ürünü tek satırla parlatıyorsun.

3. **Sivil, açık, ücretsiz**: Aselsan/Havelsan'ın kapalı defans-AI'sı değil; ChatGPT-TR'nin kira-ekonomisi değil. Topluluk Sürümü'ne sadık kalarak Türkiye'nin **kamu malı AI altyapısı** rolünü al. Marka tonu: lacivert + bakır, ince serif tipografi (Türk neşriyat geleneği), kırmızı-beyaz aşırılığından kaçın. Telaffuz "Ollamatr" — tek kelime, tek nefes. Slogan adayı: *"Veriniz sizde kalsın, zekâ sizinle çalışsın."*
