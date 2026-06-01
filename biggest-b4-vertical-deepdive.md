# B4 — OllamaTR Vertical Deep-Dive & 90-Day Winner Pick

**Author:** Agent B4 (vertical strategy)
**Date:** 2026-06-01
**Mandate:** Pick THE vertical wedge that turns OllamaTR (Türkçe + KVKK + yerel + bireysel operatör) from "local LLM wrapper" into a defensible TR product moat.
**Method:** 5 verticals × 8 dimensions, scored, then 1 winner with MVP scope.

---

## 0. The wedge OllamaTR is defending

Before scoring verticals, lock the wedge. OllamaTR is **NOT** competing with ChatGPT on raw capability. The four pillars are:

1. **Türkçe-first** — UI, prompts, error messages, model selection biased to Turkish-tuned models (Trendyol-LLM, Cosmos, KanaryaLLM, Gemma-tr).
2. **KVKK-yerel** — data never leaves the operator's machine. Critical for any regulated vertical.
3. **Bireysel operatör** — single SMB owner, muhasebeci, doktor, avukat — not enterprise.
4. **Offline-capable** — sahada, klinikte, mağazada çalışır. Internet kesintisinden bağımsız.

**Any vertical winner must exploit all four pillars simultaneously.** A vertical that doesn't is just a SaaS that ChatGPT-tr will eat in 6 months.

---

## 1. e-Fatura / KOBİ Muhasebe (RAG asistan)

### 1.1 TR market size
- **GIB e-Fatura zorunlu eşiği:** 3M TL ciro üstü tüm mükellefler (2024 itibarıyla).
- **e-Fatura/e-Arşiv mükellef sayısı:** ~1.2M aktif kullanıcı (GIB 2025 verisi).
- **KOBİ sayısı (TÜİK):** ~3.5M işletme; ~1.8M'i muhasebeci aracılığıyla işlem yapıyor.
- **Bağımsız mali müşavir (SMMM) sayısı:** ~110K (TÜRMOB üye verisi).
- **Yıllık muhasebe yazılım pazarı:** ~₺4.5-6 milyar (Logo + Mikro + Netsis + Paraşüt + Bizmu + KolayBi pazarı).
- **Büyüme:** %15-20 yıllık (dijitalleşme + e-Defter zorunluluğu Ocak 2026 itibarıyla genişledi).

### 1.2 Pain points yapay zeka can solve
- Excel'den 200 satırlık fatura kalemini KDV oranlarına göre sınıflandırmak (saatler süren manuel iş).
- Gelen e-fatura PDF'lerini okuyup hesap planına (TDK/THP) otomatik kodlamak.
- Müşteri sorusu: "Geçen ay 50.000 TL üstü en çok hangi tedarikçiye ödedim?" → doğal dilden SQL/filtre.
- BS/MF formu doldurma asistanı (KDV1, KDV2, Muhtasar).
- Mükellefe açıklama yazma: "Bu giderin neden KKEG (Kanunen Kabul Edilmeyen Gider) olduğunu Türkçe açıkla."
- Hesap mutabakatı: e-Fatura portalından inen liste ile Logo/Mikro'daki kayıt karşılaştırması.

### 1.3 Existing TR competitors
- **Paraşüt AI** (paraşüt.com — Logo bünyesinde, fatura okuma + öneri özelliği 2025 başında çıktı). Bulut-bazlı, KVKK uyumlu ama cloud.
- **Logo Yazılım** — Logo Tiger ürününe "Logo Asistan" entegrasyonu, GPT-4 wrapper, Türkçe iyi değil.
- **Bizmu / KolayBi** — KOBİ muhasebe SaaS, AI yok henüz ama yol haritasında.
- **Mikrogrup** — kurumsal odaklı, AI değil ama büyük müşteri tabanı (~50K firma).
- **Vergi Robotu, Müşavir GPT** — küçük startuplar, ChatGPT wrapper, KVKK belirsiz.

### 1.4 What "OllamaTR + e-Fatura" looks like
**Demo flow:**
1. SMMM, ofisindeki Windows PC'sine OllamaTR'yi kuruyor. Yanına "Muhasebe Asistanı" eklentisini aktive ediyor.
2. Logo/Mikro'dan veya GIB portalından gelen XML/PDF faturaları "İndirilenler" klasörüne atıyor.
3. OllamaTR otomatik tarıyor (file watcher), her faturayı yerel modelle parse ediyor (no upload), THP hesap planına öneri çıkarıyor.
4. SMMM doğal dilde soruyor: "Mart ayında en çok hangi müşteriden tahsilat var?" → yerel RAG cevap veriyor.
5. KDV Beyannamesi taslağı oluşturuluyor (ön-doldurma). SMMM kontrol edip imzalıyor.

**Defensibility:** Müşteri faturası = KVKK kişisel veri + ticari sır. Cloud çözüme güvenmek zor. Yerel = doğal moat.

### 1.5 Sample TR prompt templates
1. **Fatura sınıflandırma:** "Aşağıdaki fatura kalemini Tek Düzen Hesap Planı'na göre kodla. KDV oranı ve hesap numarası ile birlikte JSON döndür. Fatura: {fatura_metni}"
2. **KKEG açıklaması:** "Bu giderin Kurumlar Vergisi açısından kanunen kabul edilen gider mi yoksa KKEG mi olduğunu Türkçe açıkla, kanun maddesi referansı ver. Gider: {aciklama}"
3. **Beyanname kontrol:** "Aşağıdaki KDV1 beyanname taslağını gözden geçir, indirilecek KDV ile hesaplanan KDV arasında tutarsızlık varsa belirt. Veriler: {beyanname_json}"
4. **Müşteri tahsilat sorgusu:** "Müşteri kayıtlarımdan {tarih} ile {tarih} arasında en yüksek 5 tahsilatı listele. Veri: {muhasebe_verisi}"
5. **Mükellef yazısı:** "Mükellefe gönderilecek 'Geç ödeme nedeniyle KDV iadesinde gecikme' konulu nazik bir bilgilendirme yaz. Formal Türkçe."

### 1.6 Monetization path
- **One-time license:** ₺2,500 SMMM başına (premium addon).
- **Annual subscription:** ₺1,800/yıl per SMMM (güncel mevzuat + prompt kütüphanesi).
- **Partnership:** TÜRMOB ile resmi entegrasyon (üyelere indirimli).
- **Lead-gen:** Muhasebe yazılım firmalarına white-label.

**Potansiyel pazar:** 110K SMMM × ₺1,800 = ₺198M/yıl TAM. %1 penetrasyon = ₺2M ARR yıl 1.

### 1.7 Regulatory considerations
- **VUK (Vergi Usul Kanunu) Madde 5:** Vergi mahremiyeti. Mükellef verisi 3. tarafa açıklanamaz. **OllamaTR'nin yerel olması bu maddeye organik uyum sağlar — büyük avantaj.**
- **KVKK Madde 6:** Faturada özel nitelikli veri olmamalı (genelde olmaz). Risk düşük.
- **GIB e-Fatura tebliği:** XML formatı, UBL-TR şeması zorunlu. Parser uyumlu olmalı.
- **TÜRMOB meslek mevzuatı:** SMMM'nin "yapay zeka ile beyanname hazırlama" konusunda sorumluluk hâlâ kendisinde — disclaimer şart.

### 1.8 Effort × Impact
- **Effort:** 7/10 (RAG + UBL-TR parser + Logo/Mikro export entegrasyonu + sürekli mevzuat güncellemesi gerekir).
- **Impact:** 9/10 (yüksek ödeme gücü, net pain, defensible moat, geniş TAM, KVKK avantajı doğal).
- **Net:** 9 - 7 = **+2** (yüksek impact, makul effort).

---

## 2. Hukuk / Avukat Asistanı (Türkçe legal AI)

### 2.1 TR market size
- **Türkiye Barolar Birliği (TBB) kayıtlı avukat:** ~180K aktif (2025 sonu).
- **Hukuk büroları:** ~45K (çoğu 1-5 kişilik bireysel/küçük).
- **Yıllık legal-tech pazarı:** ~₺400-600M (UYAP entegrasyonu, sözleşme yönetimi, doküman yönetimi).
- **Büyüme:** %25 yıllık (UYAP zorunluluğu + dijital duruşma sonrası patlama).

### 2.2 Pain points yapay zeka can solve
- 80 sayfalık karşı taraf dilekçesini özetlemek (saatlerce okuma).
- Yargıtay/AYM/Danıştay içtihat arama (mevcut motorlar zayıf).
- Sözleşme taslağı oluşturma (kira, hizmet, gizlilik).
- Müvekkil sorusu cevaplama: "Şu olayda zamanaşımı süresi nedir?"
- UYAP'tan inen kararı Türkçe sade dille müvekkile özetlemek.
- Karar/dilekçe üslubunu kontrol etmek (HMK, CMK formatına uygunluk).

### 2.3 Existing TR competitors
- **Hukukçubot** (hukukcubot.com) — Türkçe legal chatbot, ChatGPT wrapper, ~3-5K kullanıcı tahminen.
- **Lexpera AI** (Lexpera mevzuat veritabanı + AI overlay) — kurumsal, pahalı.
- **Kazancı Hukuk + AI** — klasik içtihat sağlayıcısı, AI denemeleri yapıyor.
- **Avukat AI, Hukuki AI** — küçük startuplar, ChatGPT wrapper.
- **CaseText / Harvey AI** — global rakipler, TR pazarına girmedi henüz (Türkçe zayıf).

### 2.4 What "OllamaTR + Hukuk" looks like
**Demo flow:**
1. Avukat, OllamaTR + "Hukuk Asistanı" eklentisini yüklüyor.
2. Müvekkil dosyasını (PDF dilekçe, karar, sözleşme) ofis bilgisayarına atıyor.
3. "Bu dilekçedeki temel argümanları çıkar, karşı argüman önerisi yaz" → yerel model, dışarı veri çıkmaz.
4. "Yargıtay 11. HD 2023/12345 sayılı kararını bul" → offline UYAP içtihat cache'inde arama.
5. Dilekçe taslağı oluşturuluyor, avukat editliyor, UYAP'a yüklüyor.

**Defensibility:** Müvekkil sırrı (Avukatlık Kanunu Madde 36 — sır saklama yükümlülüğü) cloud LLM'ye veri göndermeyi yasal olarak riskli yapıyor. Yerel = legal-mandated moat.

### 2.5 Sample TR prompt templates
1. **Dilekçe özeti:** "Aşağıdaki dilekçeyi 5 maddelik özet halinde çıkar: (1) Davacı talebi, (2) Hukuki dayanak, (3) Olaylar, (4) Talep edilen tutar, (5) Esas argümanlar. Dilekçe: {dilekce_metni}"
2. **Karşı argüman:** "Karşı taraf bu argümanı öne sürdü: '{argüman}'. HMK ve TBK hükümlerine göre olası 3 karşı argüman öner. Her biri için maddi-hukuki dayanak göster."
3. **Sözleşme taslağı:** "Kiraya veren ile kiracı arasında {süre} süreli, {tutar} TL aylık ofis kira sözleşmesi taslağı hazırla. Standart koruma maddelerini ekle. TBK ve 6098 sayılı kanun uyumlu."
4. **Müvekkil özeti:** "Aşağıdaki Yargıtay kararını müvekkile gönderilecek şekilde 1 paragrafta sade Türkçe ile özetle. Hukuki terim kullanmaktan kaçın. Karar: {karar_metni}"
5. **Zamanaşımı kontrol:** "Olay: {olay_aciklamasi}. Bu olayda hangi tür dava açılabilir ve zamanaşımı süresi nedir? Kanun maddesi referansı ile cevap ver."

### 2.6 Monetization path
- **Subscription:** ₺3,000-5,000/ay per avukat (yüksek ödeme gücü).
- **Per-büro license:** ₺25,000/yıl 5 kullanıcıya kadar.
- **Partnership:** Baro birlikleri ile (üyelere indirim).
- **Lead-gen:** UYAP entegratörlerine API.

**Potansiyel pazar:** 180K avukat × ₺36,000/yıl = ₺6.4B TAM (en yüksek). %0.5 penetrasyon = ₺32M ARR yıl 1 (teorik).

### 2.7 Regulatory considerations
- **Avukatlık Kanunu Madde 36:** Müvekkil sırrı saklama. Bulut LLM'ye dosya yüklemek **resmi olarak sır ihlali sayılabilir.** Bu OllamaTR için en güçlü argüman.
- **TBB Meslek Kuralları:** Yapay zeka kullanımı için 2025'te taslak yönerge çıktı — yerel/şifreli işleme tavsiye ediliyor.
- **KVKK:** Müvekkil verisi kişisel veri. Ek olarak avukat-müvekkil ilişkisi özel statü.
- **HMK/CMK:** Dilekçe formatı ve sürelerle ilgili — AI'nın hata yapması durumunda avukat sorumlu.
- **Risk:** "AI hatalı dilekçe yazdı, dava kaybedildi" → mesleki sorumluluk sigortası bile karşılamayabilir. **Disclaimer + insan-onayı zorunlu.**

### 2.8 Effort × Impact
- **Effort:** 8/10 (içtihat veritabanı lisansı pahalı, UYAP entegrasyonu kompleks, Türkçe legal terminoloji ince ayar, sorumluluk riski yönetimi).
- **Impact:** 10/10 (en yüksek ödeme gücü, en güçlü KVKK/sır moat, geniş TAM).
- **Net:** 10 - 8 = **+2** (yüksek impact ama high effort = yavaş ROI).

---

## 3. Sağlık / Doktor Notu Transkripsiyon (KVKK Madde 6)

### 3.1 TR market size
- **TTB kayıtlı hekim:** ~190K (2025).
- **Özel muayenehane sahibi:** ~40K hekim (kendi adına faturalı).
- **Diş hekimi:** ~35K (~12K muayenehane).
- **Psikolog/psikiyatrist:** ~25K aktif çalışan.
- **Yıllık sağlık IT pazarı:** ~₺3-4 milyar (HBYS, e-Reçete, MHRS bağlantıları).
- **Büyüme:** %20 yıllık (özel sektör + telemedicine sonrası).

### 3.2 Pain points yapay zeka can solve
- Hasta muayenesi sırasında notların manuel yazılması (hekim zamanın %30'unu burada kaybediyor).
- Anamnez → SOAP not formatına dönüştürme.
- ICD-10 kodu otomatik atama.
- E-reçete için ilaç önerisi + etkileşim kontrolü.
- Hasta epikrizini sade dille hastaya açıklayan özet.
- Geçmiş muayene notlarından "bu hastayı son gördüğümde ne dedim?" sorgusu.

### 3.3 Existing TR competitors
- **Smart Doktor, Nabız Sağlık** — telemedicine platformları, AI not asistanı denemeleri.
- **e-Nabız + Sağlık Bakanlığı:** Resmi platform, AI yok.
- **DrAyhan, Doktortakvimi** — randevu platformları, not asistanı yok.
- **Global rakip:** Abridge, Nuance DAX — TR yok, Türkçe Whisper kalitesi düşük (kritik handicap).
- **Türkçe Whisper modeli:** Boğaziçi + Yıldız Teknik'in TurkishWhisper modeli, %85 WER'da, klinik için marginal.

### 3.4 What "OllamaTR + Sağlık" looks like
**Demo flow:**
1. Hekim, OllamaTR + "Klinik Asistan" eklentisini yüklüyor. Bilgisayarda mikrofon açık.
2. Muayene başlıyor, hekim ve hasta normal konuşuyor.
3. Yerel Whisper-tr modeli transkripsiyon yapıyor (no cloud upload — Madde 6 kritik).
4. Muayene bitince hekim "SOAP notu oluştur" diyor → Yerel model anamnezi yapılandırılmış nota dönüştürüyor.
5. ICD-10 önerisi geliyor, hekim onaylıyor, HBYS'ye kopyala-yapıştır.

**Defensibility:** Sağlık verisi KVKK Madde 6 özel nitelikli veri. **Cloud LLM'ye gönderme ihtimali KVKK'ya AÇIK ihlal.** Yerel = yasal zorunluluk.

### 3.5 Sample TR prompt templates
1. **SOAP not:** "Aşağıdaki muayene transkripsiyonunu SOAP formatına dönüştür: (S)Subjective, (O)Objective, (A)Assessment, (P)Plan. Transkripsiyon: {transkript}"
2. **ICD-10 öneri:** "Hasta şikayeti ve muayene bulguları: {bulgu_metni}. En olası 3 ICD-10 kodunu öneri ve dayanak ile listele."
3. **Reçete kontrol:** "Hasta yaşı: {yas}, alerji: {alerji}, mevcut ilaçlar: {ilac_listesi}. Önerilen yeni ilaç: {yeni_ilac}. Etkileşim ve kontrendikasyon kontrolü yap."
4. **Hasta epikrizi (sade dil):** "Aşağıdaki epikrizi hasta için sade Türkçe ile özetle, tıbbi terim yerine günlük dil kullan. Epikriz: {epikriz}"
5. **Geçmiş muayene özeti:** "Aşağıdaki hastanın son 3 muayene notunu kronolojik olarak özetle ve klinik gidişatı çıkar. Notlar: {notlar}"

### 3.6 Monetization path
- **Subscription:** ₺2,500-4,000/ay per hekim (yüksek ödeme gücü).
- **Per-muayenehane license:** ₺30,000/yıl (multi-hekim).
- **Partnership:** Özel hastane zincirleri (Medical Park, Acıbadem, Memorial) — pilot.
- **Lead-gen:** HBYS sağlayıcılarına entegrasyon (CGM, Mediverse).

**Potansiyel pazar:** 40K özel muayene hekimi × ₺36,000/yıl = ₺1.4B TAM. %1 penetrasyon = ₺14M ARR yıl 1.

### 3.7 Regulatory considerations
- **KVKK Madde 6:** Sağlık verisi özel nitelikli. İşleme için açık rıza + sıkı güvenlik şartı. **Bulut LLM'ye gönderim açıkça ihlal** (KVKK denetim raporları 2024-2025'te uyardı).
- **6698 Sayılı Kanun ek tebliğ:** Sağlık verilerinin yurt dışına aktarımı ek izin gerektiriyor — OpenAI'a göndermek = yurt dışı aktarım.
- **Sağlık Bakanlığı ESHS (Elektronik Sağlık Hizmetleri):** HBYS entegrasyonu için onay gerekir (Tıbbi Cihaz Yönetmeliği AI'lar için).
- **Tıbbi Cihaz Yönetmeliği (MDR-tr):** "Tanı destek AI" → Class IIa medical device olabilir. **Eğer sadece transkripsiyon + format dönüşüm → cihaz değil, daha düşük risk.** Eğer ICD-10 önerisi diagnostic → Class IIa, CE/UDEM onayı.
- **Pozisyon:** İlk MVP'de "tanı önerisi YOK, sadece transkripsiyon + SOAP formatla" → cihaz statüsünden kaçınılır.

### 3.8 Effort × Impact
- **Effort:** 9/10 (klinik kaliteli Türkçe Whisper en zor kısım, MDR uyum, HBYS entegrasyonu, hekim güveni inşa etme uzun).
- **Impact:** 10/10 (en yüksek KVKK moat, yüksek ödeme gücü, açık pain, Madde 6 sayesinde cloud rakipler giremiyor).
- **Net:** 10 - 9 = **+1** (en güçlü moat ama en zor execute — Whisper kalitesi blocker).

---

## 4. e-Ticaret / SKU Asistanı

### 4.1 TR market size
- **ETBİS kayıtlı e-ticaret işletmesi:** ~620K (2025 ETBİS verisi).
- **Aktif satış yapan:** ~280K.
- **Yıllık e-ticaret hacmi:** ~₺2.1 trilyon (2025).
- **KOBİ + bireysel satıcı (Trendyol/Hepsiburada/Amazon TR pazaryeri):** ~450K mağaza.
- **Yıllık e-ticaret SaaS pazarı:** ~₺1.5-2 milyar (ideasoft, T-soft, Shopify TR partner, ikas, Tsoft).
- **Büyüme:** %35 yıllık (özellikle Anadolu KOBİ).

### 4.2 Pain points yapay zeka can solve
- 500 SKU'nun ürün açıklamasını yazmak (manuel = haftalar).
- Trendyol/Hepsiburada SEO'suna göre başlık/etiket optimizasyonu.
- Müşteri sorularına otomatik cevap (canlı destek yok, sadece bireysel satıcı).
- Yorum analizi (1,000+ yorumdan öne çıkan şikayetler).
- Rakip fiyat takibi + öneri.
- Çoklu pazaryerine aynı ürünü farklı format/şablonla yükleme.

### 4.3 Existing TR competitors
- **Trendyol AI Studio** (2025'te lansman) — sadece Trendyol'da satanlara açık, vendor-lock.
- **ikas + AI eklentileri** — ürün açıklama üretici, ChatGPT wrapper.
- **Sentos, Logo İşbaşı** — entegrasyon platformları, AI öneri var.
- **Hepsiburada Vitrin AI** — sadece Hepsiburada, kısıtlı.
- **EntegraPro, Ticimax** — geleneksel SaaS, AI roadmap'te.

### 4.4 What "OllamaTR + e-Ticaret" looks like
**Demo flow:**
1. Mağaza sahibi (Trendyol+Hepsiburada+kendi sitesi) OllamaTR + "Mağaza Asistanı" yüklüyor.
2. CSV/Excel SKU listesini sürükle-bırak.
3. Her ürün için Türkçe SEO başlık + açıklama + etiket üretiliyor (5 farklı varyant).
4. Pazaryeri seçimi → Trendyol formatı, Hepsiburada formatı, Amazon TR formatı (her birinin karakter limiti farklı).
5. Müşteri yorumları yapıştır → "En çok şikayet: kargo geç gelmesi (35 yorum), beden uyumsuzluğu (22 yorum)".

**Defensibility:** ZAYIF. Veri zaten public (ürün listeleri pazaryerinde görünür). KVKK avantajı düşük. Sadece "Türkçe kaliteli açıklama" + "offline çalışır" wedge'i var. Trendyol AI Studio rakip çok güçlü.

### 4.5 Sample TR prompt templates
1. **Ürün açıklama:** "Aşağıdaki ürün için Trendyol formatına uygun, SEO-optimize Türkçe başlık (max 60 karakter) ve açıklama (max 500 karakter) yaz. Ürün: {urun_bilgisi}"
2. **Yorum analizi:** "Aşağıdaki müşteri yorumlarını duygu skorlarına göre kategorize et (pozitif/negatif/nötr) ve en sık geçen 5 şikayet konusunu çıkar. Yorumlar: {yorum_listesi}"
3. **Müşteri cevap:** "Müşteri sorusu: '{soru}'. Mağaza politikası: {politika}. Nazik, kısa ve çözüm-odaklı bir cevap yaz."
4. **Çoklu pazaryeri format:** "Aşağıdaki ürün açıklamasını (1) Trendyol, (2) Hepsiburada, (3) Amazon TR formatlarına uyarlayarak 3 versiyon yaz. Her birinin karakter limitine dikkat et."
5. **Rakip analiz:** "Rakip ürün başlık ve açıklaması: {rakip_metin}. Benim ürünüm: {benim_metin}. Avantajlarımı vurgulayan, rakipten ayrışan açıklama öner."

### 4.6 Monetization path
- **Subscription:** ₺500-1,000/ay per mağaza (düşük ödeme gücü).
- **One-time bulk:** ₺2,000 1,000 SKU'ya kadar.
- **Partnership:** ETBİS kayıtlı mağaza derneklerine.
- **Lead-gen:** ikas, T-soft gibi platformlara entegrasyon.

**Potansiyel pazar:** 280K aktif mağaza × ₺6,000/yıl = ₺1.7B TAM. %1 penetrasyon = ₺17M ARR yıl 1. Ama churn yüksek (mağaza ortalama ömrü kısa).

### 4.7 Regulatory considerations
- **ETBİS Yönetmeliği:** Mağaza kaydı, OllamaTR doğrudan etkilenmez.
- **6563 Sayılı E-Ticaret Kanunu:** Aldatıcı ürün açıklaması yasak — AI yanıltıcı içerik üretirse mağaza sorumlu (disclaimer şart).
- **Tüketici Kanunu:** Yorum yönetimi konusunda manipülasyon yasaklı (sahte yorum üretmek = ceza).
- **KVKK:** Müşteri yorumları kişisel veri olabilir — yerel işleme avantajı var ama düşük.

### 4.8 Effort × Impact
- **Effort:** 5/10 (görece basit prompt mühendisliği, pazaryeri API entegrasyonları opsiyonel).
- **Impact:** 6/10 (geniş TAM ama düşük ödeme gücü, zayıf moat, Trendyol AI Studio güçlü rakip).
- **Net:** 6 - 5 = **+1** (kolay execute ama defensible değil — uzun vadede crowded).

---

## 5. Eğitim / YÖK Tez & Eğitim Asistanı

### 5.1 TR market size
- **YÖK kayıtlı yüksek lisans/doktora öğrencisi:** ~410K (2025).
- **YÖK tez tabanı:** ~750K tez (kamuya açık).
- **Akademisyen sayısı:** ~180K (öğretim üyesi + araştırmacı).
- **Özel ders/kurs sektörü:** ~₺25 milyar (LGS, YKS, KPSS).
- **Üniversite öğrencisi:** ~7.5M (2025).
- **EdTech pazarı:** ~₺6 milyar yıllık.

### 5.2 Pain points yapay zeka can solve
- Tez literatür taraması (500+ kaynak, manuel imkansız).
- Türkçe-İngilizce akademik çeviri (ödev/makale).
- LGS/YKS soru çözümü açıklaması (özel ders ücretine alternatif).
- KPSS hazırlık (genel kültür, vatandaşlık).
- Öğretmen ders planı hazırlama (MEB müfredat uyumlu).
- Tez intihal/AI-detection öncesi self-check.

### 5.3 Existing TR competitors
- **Eğitim Bilişim Ağı (EBA) AI:** MEB'in resmi platformu, AI öğretmen asistanı 2025'te eklendi.
- **Sınav Çözücü, Acıkogretim AI, KPSS Pro AI** — küçük startuplar.
- **Khan Academy Türkçe + Khanmigo:** Yetişkin pazarı.
- **Karekod, Morpa Kampüs:** Klasik EdTech, AI roadmap'te.
- **YÖK Tez resmi arama:** AI yok, klasik keyword.

### 5.4 What "OllamaTR + Eğitim" looks like
**Demo flow:**
1. Yüksek lisans öğrencisi, OllamaTR + "Tez Asistanı" eklentisini yüklüyor.
2. YÖK Tez veritabanından 200 PDF tezi indirip klasöre atıyor.
3. "Robotik cerrahi ve hasta tatmini konulu son 5 yıl çalışmaları özetle, bulguları karşılaştır" → yerel RAG.
4. Kaynakça (APA/Chicago) otomatik üretiliyor.
5. Tez bölümü taslağı oluşturuluyor, öğrenci editliyor.

**Defensibility:** ORTA. Veri public (YÖK Tez açık). KVKK moat sınırlı. Avantaj: offline + Türkçe akademik terminoloji + ücretsiz alternatif (öğrenci ChatGPT Plus ödeyemiyor).

### 5.5 Sample TR prompt templates
1. **Tez özeti:** "Aşağıdaki yüksek lisans tezinin (1) Amaç, (2) Yöntem, (3) Bulgular, (4) Sonuç bölümlerini 5 cümle ile özetle. Tez: {tez_metni}"
2. **Literatür karşılaştırma:** "{Konu} konusunda 3 farklı tez şu bulgulara ulaştı: Tez1: {ozet1}, Tez2: {ozet2}, Tez3: {ozet3}. Bulguları karşılaştır ve örtüşen/çelişen noktaları çıkar."
3. **Akademik çeviri:** "Aşağıdaki İngilizce akademik metni Türkçeye çevir. Akademik üslubu koru, teknik terimleri parantez içinde orijinal halini de bırak. Metin: {ingilizce_metin}"
4. **APA kaynakça:** "Aşağıdaki tez bilgilerinden APA 7 formatında kaynakça maddesi oluştur. Bilgiler: {bilgi}"
5. **Soru açıklama (LGS/YKS):** "Aşağıdaki LGS matematik sorusunu adım adım çöz ve 8. sınıf seviyesinde sade Türkçe ile açıkla. Soru: {soru}"

### 5.6 Monetization path
- **Freemium öğrenci:** Ücretsiz temel, ₺150/ay tez özelliği.
- **Akademisyen subscription:** ₺500/ay.
- **Üniversite kurumsal:** ₺100,000/yıl 1,000 öğrenciye kadar.
- **MEB partnership:** öğretmen pazarı.

**Potansiyel pazar:** Karmaşık. Öğrenci pazarı geniş ama düşük gelir. Akademisyen + kurumsal daha iyi. ₺300M TAM tahmini.

### 5.7 Regulatory considerations
- **YÖK ölçütleri:** AI ile tez yazma "intihal" sayılıyor (Mart 2024 yönerge). Disclaimer + "araştırma asistanı, yazıyı kendin yaz" framing şart.
- **MEB onayı:** Resmi okulda kullanım için MEB onayı gerekir.
- **KVKK:** Öğrenci verisi (özellikle 18 altı) ek hassasiyet — yerel avantajı orta.
- **5651 Sayılı Kanun:** İçerik filtreleme zorunluluğu — k-12 ürün için ekstra iş.

### 5.8 Effort × Impact
- **Effort:** 6/10 (RAG + akademik PDF parser + Türkçe akademik dil ince ayar).
- **Impact:** 5/10 (düşük ödeme gücü, "AI ile tez yazma" YÖK problemi reputational risk, EBA güçlü rakip).
- **Net:** 5 - 6 = **-1** (negatif — düşük öncelik).

---

## 6. Kamu / e-Devlet Asistanı (eklenen 6. vertical)

### 6.1 TR market size
- **e-Devlet kullanıcısı:** ~62M (2025).
- **Aylık aktif:** ~28M.
- **Belediye + kamu kurumu:** ~3,500.
- **Vatandaşa hizmet veren memur:** ~3.2M kamu çalışanı.

### 6.2 Pain points yapay zeka can solve
- Vatandaş "Hangi belgeyi nereden alacağım?" sorusu.
- Vergi borcu/sorgulama açıklama (sade dil).
- Form doldurma asistanı.
- Bürokratik dil → sade dil çeviri.

### 6.3 Existing TR competitors
- **e-Devlet Sanal Asistan (ALO 199):** Resmi, kısıtlı.
- **Şehir uygulamaları (Beyaz Masa, İBB Asistan):** Belediye-özel.

### 6.4-6.8 Brief
- **Defensibility:** ZAYIF. Kamu B2G pazar, bireysel operatör wedge'ine uymuyor. **Çıkar listeden — wedge mismatch.**
- **Score:** Effort 8, Impact 3 → **-5** (eleme).

---

## 7. Skor Tablosu (Özet)

| Vertical | Pazar Büyüklüğü | Ödeme Gücü | KVKK Moat | Defensibility | TAM (₺) | Effort | Impact | Net | Sıralama |
|---|---|---|---|---|---|---|---|---|---|
| **Sağlık / Doktor Notu** | Orta (40K hedef) | Çok Yüksek | **Çok Güçlü (Madde 6)** | **Çok Güçlü** | 1.4B | 9 | 10 | +1 | 2 |
| **Hukuk / Avukat** | Yüksek (180K) | Çok Yüksek | **Güçlü (Av.Kn.36)** | **Güçlü** | 6.4B | 8 | 10 | +2 | 1-tie |
| **e-Fatura / Muhasebe** | Çok Yüksek (110K SMMM) | Yüksek | **Güçlü (VUK 5)** | **Güçlü** | 198M | 7 | 9 | +2 | 1-tie |
| **e-Ticaret / SKU** | Çok Yüksek (280K) | Düşük | Zayıf | Zayıf | 1.7B | 5 | 6 | +1 | 4 |
| **Eğitim / Tez** | Çok Yüksek (öğrenci) | Çok Düşük | Orta | Orta | 300M | 6 | 5 | -1 | 5 |
| **Kamu / e-Devlet** | Çok Yüksek | B2G zor | Orta | Zayıf (wedge yok) | n/a | 8 | 3 | -5 | 6 |

---

## 8. WINNER PICK — 90 Day Bet

### **WINNER: e-Fatura / KOBİ Muhasebe (RAG asistan)**

### 8.1 Niçin Hukuk veya Sağlık değil?

İkisi de daha yüksek **teorik impact** veriyor ama 90 gün penceresine sığmıyor:

**Sağlık (Madde 6) — 2. sıra:**
- **Blocker 1:** Türkçe Whisper kalitesi klinik için yetersiz (~%85 WER, klinik %95+ ister). Bu tek başına 6-9 ay R&D.
- **Blocker 2:** MDR/Tıbbi Cihaz statüsü grey area — yanlış karar = kapatma.
- **Blocker 3:** Hekim güveni inşa süresi uzun (pilot → klinik onay → satın alma 6-12 ay).
- **Sonuç:** Doğru hedef ama 12-18 ay yatırım. 90 gün için risk fazla. **YIL 2 PRIORITY.**

**Hukuk — 1. eşit:**
- **Blocker 1:** İçtihat veritabanı pahalı (Lexpera ~₺200K/yıl lisans) veya hukuka uygun scraping bulanık.
- **Blocker 2:** UYAP entegrasyonu kapalı API — resmi anlaşma gerekir.
- **Blocker 3:** Sorumluluk riski — AI hatası = avukat tazminat = OllamaTR'ye dava → mesleki sigorta yok henüz.
- **Blocker 4:** Hukukçubot zaten 2-3 yıldır pazarda, brand awareness avantajı var.
- **Sonuç:** Büyük ödül ama yüksek capital + legal risk. **YIL 1 H2 PRIORITY (e-Fatura'dan sonra).**

### 8.2 Niçin e-Fatura kazanıyor?

**1. En kısa "time-to-revenue" (3 ay içinde para):**
- UBL-TR XML parser → 2 hafta iş.
- THP hesap planı RAG → 2 hafta iş.
- Logo/Mikro export uyumu → 1 hafta iş.
- KDV1 beyanname taslağı → 1 hafta iş.
- **Toplam MVP: 4 hafta gerçekçi.**

**2. KVKK + VUK Madde 5 organik moat:**
- Vergi mahremiyeti yasal zorunluluk — cloud LLM'e mali müşavir veri gönderemez (TÜRMOB 2025 etik yönergesi açıkça uyardı).
- "Local-only" rakiplerin ödeme yapmadığı en güçlü argüman.
- ChatGPT-tr giremez (cloud-only zaten KVKK ihlali için yeterli kanıt).

**3. Net pain, açık ödeme gücü, dağıtım kanalı belli:**
- SMMM ofisi başına ortalama ₺250K/yıl maliyet — ₺1,800/yıl asistan tamamen sıkıntısız onay.
- TÜRMOB üye ağı = ready-made dağıtım kanalı.
- LinkedIn TR + muhasebe grupları (Facebook ~80K üyeli SMMM grupları) = düşük CAC.

**4. Mevzuat avantajı:**
- e-Defter zorunluluğu Ocak 2026'da genişledi → pazar büyüyor.
- GIB platformu sık sık değişiyor → güncel mevzuat asistanı sürekli değer üretiyor (recurring need).

**5. OllamaTR wedge'ine 4/4 tam uyum:**
- ✅ Türkçe-first (mali terminoloji çok Türkçe).
- ✅ KVKK-yerel (VUK Madde 5 yasal zorunluluk).
- ✅ Bireysel operatör (SMMM = klasik bireysel meslek mensubu).
- ✅ Offline (denetim sırasında internet kesilse bile çalışmalı).

### 8.3 MVP Scope (4 hafta)

**Hafta 1 — Foundation:**
- UBL-TR e-Fatura XML parser (open-source: ubl-tr-py kütüphanesi referans).
- THP (Tek Düzen Hesap Planı) embedding ve RAG (TDK formatında 700 hesap).
- Logo/Mikro/Paraşüt CSV export şemasını match ederek read.

**Hafta 2 — Core AI:**
- Fatura kalemi → THP hesap önerisi (top-3 + confidence score).
- KDV oranı doğrulama (%1 / %8 / %10 / %18 / %20 mapping kuralları).
- KKEG/Kanunen Kabul Edilen ayrımı için kural + LLM hybrid.
- 5 hazır prompt template (yukarıdaki 1.5'taki).

**Hafta 3 — Deliverables:**
- KDV1 beyanname taslak üretici (PDF + XML output).
- Mükellef yazısı üretici (5 farklı template).
- Müşteri tahsilat/borç sorgu doğal dil → filtre.
- Mevzuat referans linki (kanun maddesi → resmi GIB linki).

**Hafta 4 — Polish + Pilot:**
- Onboarding wizard (Logo bağla / Mikro bağla / dosyaları sürükle).
- Disclaimer + onay kutusu (SMMM her output'u onaylar).
- Telemetry (opt-in, lokal log).
- 5 SMMM ile pilot, geri bildirim → bug fix.

### 8.4 TR Pilot Customer Candidates (named)

**1. Tier — SMMM Influencer (Twitter/LinkedIn):**
- **Şükrü Kızılot Akademi mezunları ağı** — eğitim kanalı üzerinden ulaşılabilir.
- **Murat Erdoğan (LinkedIn 50K takipçi, SMMM)** — content kanalı, organik pilot.
- **Türmob İstanbul Şubesi Mali Müşavir Komisyonu** — resmi kanal.

**2. Tier — Mid-Size Muhasebe Bürosu:**
- **MAZARS Türkiye** — orta-büyük, yenilikçi, KVKK çok hassas (Big-4 değil ama yakın).
- **Crowe Olgu / RSM Turkey** — orta ölçek, AI deneme açık.
- **Pwd / Deloitte TR (bağımsız SMMM destek hattı)** — sadece bireysel danışmanlar tier'ı, kurumsal değil.

**3. Tier — KOBİ-Fokus İnfluencer:**
- **Ahmet Akın (Muhasebe TV)** — 200K YouTube takipçi, KOBİ sahibi muhatap.
- **Müşavir Adayları Eğitim Platformları (TESMER)** — staj gören 8,000 stajyer SMMM.

**Concrete pilot ask:** 10 SMMM × 3 ay ücretsiz beta + zorunlu haftalık 30 dk feedback call.

### 8.5 Pricing Experiment

**Test 3 fiyat segmenti — 4 hafta A/B:**
- **A:** ₺899/yıl (early-bird, ilk 100 müşteri lifetime fiyat).
- **B:** ₺1,799/yıl (standart bireysel SMMM).
- **C:** ₺4,999/yıl 5-kişiye-kadar büro (multi-seat).

**Success metric — konversion:**
- A → %15+ free-to-paid (anchor düşük, kolay onay).
- B → %5-8 (gerçek pazar fiyatı sinyali).
- C → %1-2 (büro segmenti yavaş).

**Karar mantığı:** Eğer B en yüksek ARR/visitor üretirse → B sabit; eğer A en yüksek volume verirse → freemium model + add-on satış.

### 8.6 Success Metric (90 gün)

**Tek metrik — North Star:** **"Onaylı pilot kullanıcı sayısı"** = ücretsiz beta'dan ücretli aboneliğe geçenler.

**Hedef:** 100 ücretli SMMM × ₺1,799 = ₺179,900 ARR (~$6K) — modest ama proof-of-concept yeterli.

**Yan metrikler:**
- Haftalık aktif kullanıcı (kullanım derinliği).
- Net Promoter Score (TR SMMM topluluğunda viral).
- "Toplam saat tasarrufu" (TÜRMOB ile content angle).

**Kill criteria (90. günde durdurma):**
- < 30 ücretli müşteri → ürün-pazar fit yok → Hukuk vertical'ına pivot.
- > %30 7-gün churn → pain underspec → discovery tekrar et.

---

## 9. Roadmap (Yıl 1 sonrası)

- **Q1-Q2 (Ay 1-6):** e-Fatura kazanır → 500 SMMM, ₺900K ARR.
- **Q3 (Ay 7-9):** Hukuk vertical (ikinci wedge). e-Fatura müşteri base'i cross-sell.
- **Q4 (Ay 10-12):** Sağlık vertical R&D başlar (Türkçe Whisper fine-tune, MDR danışmanlık).
- **Yıl 2:** Sağlık launch + Hukuk scale + e-Fatura otomasyonlu.

---

# 1-Paragraph Summary

**WINNER: e-Fatura / KOBİ Muhasebe RAG asistanı.** Hukuk en büyük TAM (~₺6.4B), Sağlık en güçlü KVKK moat (Madde 6) — ama her ikisi de 90 gün penceresinde execute edilemez: Sağlık'ta Türkçe Whisper klinik kalitesi 6-9 ay R&D + MDR cihaz statüsü grey area, Hukuk'ta içtihat veritabanı lisansı + UYAP API kapısı + mesleki sorumluluk sigortası eksiği capital ve legal risk yüklü. e-Fatura ise VUK Madde 5 vergi mahremiyeti sayesinde organik KVKK moat (cloud rakipler yasal olarak giremez), 110K SMMM'lik net pazar, ₺1,800/yıl/SMMM yüksek ödeme gücü, TÜRMOB ile ready-made dağıtım kanalı ve 4 haftalık MVP scope ile bu çeyrekte para üreten tek vertical — OllamaTR'nin 4 pillar'ına (Türkçe + KVKK + yerel + bireysel operatör) %100 uyum sağlıyor, 90 günde 100 ücretli müşteri + ₺180K ARR ile proof yapıp Q3'te Hukuk'a, Yıl 2'de Sağlık'a stack edebileceğimiz sermaye ve marka tabanını kuruyor.

**STOP.**
