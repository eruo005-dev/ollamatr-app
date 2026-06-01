# B10 — KOBİ Sales Motion: İlk 10 Sözleşme / 6 Ay

**Hedef:** Şirket kuruluşundan sonraki 6 ay içinde 10 KOBİ sözleşmesi.
**Ortalama sözleşme değeri:** 35.000 TL kurulum + 5.000 TL/ay bakım = İlk yıl ~95.000 TL/müşteri.
**6 aylık hedef ARR:** 10 × 95.000 = 950.000 TL (~30K USD).
**Stratejik amaç:** Referans tabanı oluşturmak, vertikal playbook'ları doğrulamak, Yıl-2'de 100 müşteriye ölçeklemenin önünü açmak.

---

## 1. ICP — Ideal Customer Profile

### Temel ICP Kriterleri (tüm sektörler için)
- **Çalışan sayısı:** 50–250 (mikro değil, kurumsal değil — sweet spot)
- **Karar yapısı:** Owner-led veya GM-led (CIO yok, ama BT sorumlusu var)
- **Coğrafya:** İstanbul, Ankara, İzmir, Bursa, Kocaeli, Antalya, Konya, Gaziantep (Tier-1 + Tier-2 sanayi şehirleri)
- **Dijital olgunluk:** ERP kullanıyor (Logo, Mikro, SAP B1, Netsis), e-fatura'da, en az 1 white-collar süreci dijital
- **Hassas veri:** Müşteri PII, finansal kayıt, sözleşme, sağlık verisi, hukuki belge — KVKK kapsamında
- **Ciro bandı:** 30M–500M TL (KOBİ tanımı içinde)
- **Tetikleyici sinyaller:** KVKK denetim deneyimi, veri sızıntısı haberi okumuş, ChatGPT'yi yasaklamış veya yasaklamayı düşünüyor

### Sektör 1: Lojistik & Nakliye (PRIORITE 1)

**Pain frame:** Sevkiyat belgeleri, müşteri sözleşmeleri, gümrük formları binlerce sayfa PDF. Operasyon ekibi belge arama, özetleme, müşteri sorularına yanıt için saatler harcıyor. ChatGPT'ye gümrük belgesi yüklemek = ticari sır + müşteri PII'si OpenAI'a gidiyor.

**Why local-AI now:**
- Gümrük belgeleri, konşimento, CMR — bunların hiçbiri OpenAI'a gidemez
- Türkçe + İngilizce + Almanca karışık belgeler → çok dilli yerel model
- Müşteri çağrı merkezi sorgularına 7/24 yanıt → yerel RAG ile sevkiyat bilgisi

**Budget signal:**
- ERP yatırımı yapmış (Logo Tiger, Mikro Jet) → BT bütçesi var
- Lojistik yazılım abonelikleri (Marlo, CargoSpace) → SaaS harcamasına alışık
- Yıllık BT bütçe: 500K–2M TL → bizim paket %5'i

**Hedef firmalar:** UTİKAD üyeleri (1500+ firma), ortalama 80 çalışan.

### Sektör 2: E-Ticaret (PRIORITE 1)

**Pain frame:** Müşteri destek ekibi günde 500+ ticket. Ürün soruları, iade, kargo. Trendyol/Hepsiburada satıcı paneli + WhatsApp + e-posta. Müşteri PII'si (adres, telefon, sipariş geçmişi) ChatGPT'ye gönderiliyor — KVKK ihlali.

**Why local-AI now:**
- 7/24 Türkçe müşteri yanıtı, müşteri PII'si firma içinde kalır
- Ürün açıklaması / SEO içerik üretimi (binlerce SKU)
- İade analizi: "Bu hafta neden iadeler arttı?" — yerel veri analizi

**Budget signal:**
- IdeaSoft, Ticimax, Shopify gibi platform abonelikleri (5K–20K TL/ay) → SaaS'a açık
- Pazaryeri komisyonu (Trendyol %20+) ödeyebiliyor → AI bütçesi var
- Reklam harcaması (Google Ads, Meta) 50K+ TL/ay → marjinal yatırım

**Hedef firmalar:** Trendyol Power Merchant'lar, Hepsiburada Premium Satıcılar — TOBB E-Ticaret Meclisi listesi.

### Sektör 3: Hukuk Büroları (PRIORITE 2 — Premium fiyat)

**Pain frame:** Avukatlar dilekçe taslağı, içtihat araması, sözleşme inceleme için saatler harcıyor. ChatGPT'ye müvekkil sözleşmesi yüklemek = avukatlık sırrı + KVKK ihlali. Baro etik kurulu nezdinde sorumluluk.

**Why local-AI now:**
- Müvekkil verileri **asla** dışarı çıkamaz — meslek sırrı yükümlülüğü
- Türk hukuk metinleri (kanun, içtihat, Resmi Gazete) yerel RAG
- Dilekçe taslağı, sözleşme özetleme, anlaşmazlık analizi

**Budget signal:**
- Lexpera / Kazancı abonelikleri (yıllık 15K–40K TL) → premium içerik öder
- Ortalama bürolarda ortak başına 80K–200K TL/yıl yazılım
- Premium fiyatlama mümkün: 50K–80K TL paket

**Hedef firmalar:** İstanbul Barosu 20+ avukatlı bürolar (yaklaşık 400 firma).

### Sektör 4: Sağlık (Klinik, Tanı Merkezi) (PRIORITE 2 — Regülasyon ağır)

**Pain frame:** Hasta verileri (özel nitelikli kişisel veri — KVKK Madde 6) ChatGPT'ye gönderilemez. Tıbbi rapor özetleme, anamnez kaydı, randevu yönetimi manuel.

**Why local-AI now:**
- Özel nitelikli veri **kesinlikle** yerel kalmalı (KVKK Madde 6, 6698 sayılı kanun)
- Sağlık Bakanlığı veri güvenliği denetimi (USS uyumu)
- Tıbbi terminoloji Türkçe yerel model

**Budget signal:**
- HBYS, LBYS yatırımı yapmış (Probel, Triodor) → kurumsal yazılım alışkanlığı
- Özel hastane / poliklinik → BT bütçesi 1M+ TL
- KVKK denetimine ağır maruz (Sağlık Bakanlığı + KVKK Kurulu)

**Hedef firmalar:** Özel poliklinikler, tanı merkezleri (görüntüleme, laboratuvar) — Sağlık Bakanlığı ÖSHKS listesi.

### Sektör 5: Mali Müşavirlik & Muhasebe (PRIORITE 1 — Channel + Customer)

**Pain frame:** Mali müşavirler hem müşteri (kendileri kullanır) hem kanal (müşterilerine satar). E-fatura, e-defter, KDV beyanı dökümanları. Müşteri finansal verileri ChatGPT'ye gönderilemez (3568 sayılı kanun + KVKK).

**Why local-AI now:**
- Mali müşavirlik meslek sırrı (3568 sayılı kanun Madde 43)
- Müşteri portföyü 200+ → ölçek
- E-fatura/e-arşiv otomatik özetleme, vergi sorularına 7/24 yanıt

**Budget signal:**
- Luca, Mikro, Logo Mali Müşavir paketleri (15K–40K TL/yıl) → yazılım alışkanlığı
- TÜRMOB üyelik (110.000+ mali müşavir) → büyük TAM
- Premium büro 30K–60K TL paket öder

**Hedef firmalar:** TÜRMOB Top 500 büroları, İSMMMO üyesi 20+ kişilik bürolar.

---

## 2. Pitch Deck Outline (15 Slayt)

### Slide 1: KVKK Gerçeği
- **Başlık:** "ChatGPT'ye Veri Göndermek = KVKK İhlali"
- **Görsel:** Veri akış diagramı — Kullanıcı → ChatGPT → OpenAI (ABD sunucusu) → ⚠️ Yurt dışı veri aktarımı
- **Mesaj:** "KVKK Madde 9: Yurt dışına veri aktarımı sınırlıdır. OpenAI ile aktarım sözleşmesi imzalamayan firmalar ihlalde." (KVKK Kurulu 2024 kararı: Türk firmalarına 4 ayrı para cezası — toplam 8.5M TL)
- **Soru:** "Çalışanlarınız hangi verileri ChatGPT'ye gönderiyor, biliyor musunuz?"

### Slide 2: Çözüm — Yerel AI
- **Başlık:** "Yerel AI: Veriniz Bilgisayarınızdan Çıkmaz"
- **Görsel:** Sunucu odanız → Yerel AI → ✅ Veri firmada kalır
- **3 madde:**
  - İnternet kesilse bile çalışır
  - KVKK uyumu otomatik (yurt dışı aktarım yok)
  - OpenAI aboneliği yok (aylık gider sıfır)

### Slide 3: OllamaTR Nedir
- **Başlık:** "Türkiye'nin İlk Yerel AI Platformu"
- **3 bileşen:**
  - OllamaTR motoru (açık kaynak Ollama üzerinde Türkçe optimize)
  - TR Model Kataloğu (Trendyol-LLM, Cosmos, Hamza, Türkçe Llama)
  - Anahtar teslim kurulum + 12 ay destek

### Slide 4: Canlı Kurulum (DEMO)
- **Başlık:** "5 Dakikada Kurulum"
- **Demo:** Laptop'ta `ollama-tr install` komutu → Türkçe model indirme → İlk soru
- **Mesaj:** "Şirketinize gelir, kurar, eğitir, gideriz. Sizden teknik bilgi beklemeyiz."

### Slide 5: Türkçe Sohbet (DEMO)
- **Başlık:** "ChatGPT Kadar İyi Türkçe — Üstelik Sizin Veriniz"
- **Demo:** Yan yana karşılaştırma — aynı soru ChatGPT'de ve OllamaTR'de
- **Sorular:** "KDV beyannamesi nasıl hesaplanır?", "Bir e-ticaret iadesi e-postası yaz"

### Slide 6: KOBİ Kullanım Senaryosu 1 — Müşteri Destek
- **Başlık:** "Müşteri Sorusu → 3 Saniyede Yanıt"
- **Demo:** Sahte müşteri sorusu yükle → AI siparişi bulur, yanıt yazar
- **ROI:** "Günde 200 ticket × 5 dk = 16 saat. AI ile 4 saat. Yıllık tasarruf: 1 tam zamanlı eleman."

### Slide 7: KOBİ Kullanım Senaryosu 2 — Belge Özetleme
- **Başlık:** "100 Sayfalık Sözleşmeyi 30 Saniyede Özetle"
- **Demo:** PDF yükle → "Bu sözleşmede bizim için riskli maddeler neler?" → Yanıt
- **Mesaj:** "Avukatınızdan önce siz okuyun."

### Slide 8: TR Model Kataloğu
- **Başlık:** "Sektörünüze Özel Model"
- **Liste:**
  - Trendyol-LLM (e-ticaret)
  - Cosmos LLaMA (genel Türkçe)
  - Hamza Turkish LLM (resmi yazışma)
  - KanunGPT (hukuk — yol haritamızda)
  - SağlıkGPT (tıbbi — yol haritamızda)
- **Mesaj:** "Hepsi açık kaynak. Hepsi yerel. Hepsi bizim derlediğimiz katalogda."

### Slide 9: Vertikal Kullanım — Sektörünüz
- **Başlık:** [Müşterinin sektörüne göre özelleştir]
- **Lojistik için:** Gümrük belgesi özetleme, müşteri çağrı yanıtları
- **Hukuk için:** İçtihat araması, dilekçe taslağı
- **Sağlık için:** Anamnez kaydı, rapor özetleme
- **Mali müşavir için:** Vergi sorusu yanıtları, beyan özetleme

### Slide 10: Entegrasyonlar
- **Başlık:** "Mevcut Sistemlerinizle Çalışır"
- **Görsel:** OllamaTR — Logo / Mikro / SAP B1 / Netsis / e-fatura entegrasyon ikonları
- **Mesaj:** "ERP'nizi değiştirmeyiz. AI'yı ERP'nizin yanına koyarız."

### Slide 11: Anahtar Teslim Hizmet
- **Başlık:** "Siz İşinize Bakın, Kurulumu Biz Halledelim"
- **Paket içeriği:**
  - Donanım önerisi (sunucu spec, isteğe bağlı tedarik)
  - Kurulum (1 gün on-site)
  - Türkçe model seçimi + parametre ayarı
  - 2 günlük çalışan eğitimi (10 kişiye kadar)
  - 12 ay teknik destek (telefon + uzak bağlantı)

### Slide 12: Yatırım
- **Başlık:** "Şeffaf Fiyatlama"
- **Tek paket:** 35.000 TL kurulum + 5.000 TL/ay bakım
- **Karşılaştırma:**
  - ChatGPT Team: 30 USD/kullanıcı/ay × 20 kişi = 600 USD/ay ≈ 20.000 TL/ay (üstelik KVKK ihlali)
  - Microsoft Copilot: 30 USD/kullanıcı/ay (aynı sorun)
  - **OllamaTR: 5.000 TL/ay sabit, sınırsız kullanıcı, KVKK uyumlu**
- **Geri ödeme süresi:** 4–8 ay

### Slide 13: ROI Hesabı
- **Başlık:** "Sizin Sayılarınız"
- **3 satırlı hesap (interaktif slayt):**
  1. Çalışan sayısı × günlük AI tasarrufu (45 dk varsayım) × saat ücreti
  2. Yıllık tasarruf: ortalama 80 çalışanlı firma için ~450.000 TL/yıl
  3. Bizim maliyet: 95.000 TL ilk yıl → Net kazanç: 355.000 TL
- **KVKK ceza riski:** Bonus — bir denetim cezasından kurtulmak paketi 100× karşılar

### Slide 14: Referanslar
- **Başlık:** "Bizden Önce Onlar Söylesin"
- **(İlk 6 ay için):** Pilot müşteriler + Logo, Mikro, OllamaTR teknik partnerleri
- **(Ay 6+):** Gerçek müşteri vaka çalışmaları (logo, isim, ROI)
- **Plan:** İlk 3 müşteriye %30 indirim karşılığında "case study katılımı" zorunlu

### Slide 15: Sıradaki Adım
- **Başlık:** "İki Seçenek"
- **A) Ücretsiz Yerinde Demo:** 90 dakika, ekibinizle, sizin verilerinizle (anonimleştirilmiş)
- **B) 30 Günlük Pilot:** 15.000 TL pilot bedeli, kararınız olumsuzsa iade. Olumlusa kurulum bedeline saydırılır.
- **CTA:** "Bu hafta hangi gün uygun?"

---

## 3. Demo Script (20 Dakika)

### Dakika 0–2: Açılış (Slide 1)
- **Söz:** "Geçen yıl KVKK Kurulu 4 firmaya ChatGPT kullanımı için ceza kesti — toplam 8.5 milyon lira. Bugün size aynı işi yapan, ama veriyi firmanızdan çıkarmayan bir alternatifi göstereceğim."
- **Soru:** "Şu an çalışanlarınız ChatGPT kullanıyor mu? Hangi verilerle?"
- **Amaç:** Yara açmak. Müşteri "evet biliyoruz, endişeliyiz" dediğinde satış %60 yapılmış demektir.

### Dakika 2–4: Çözüm Çerçevesi (Slide 2–3)
- **Söz:** "Yerel AI üç kelime: Veriniz. Firmanızda. Kalır."
- **Görsel destek:** İnternet kablosunu fiziksel olarak çek (laptop hala çalışır)
- **Mesaj:** "İnternet kesilse bile çalışır. Bu Anadolu fabrikası için kritik."

### Dakika 4–8: Canlı Kurulum Demosu (Slide 4–5)
- **Açıklama:** Önceden hazırlanmış temiz Windows laptop'ta:
  ```
  > ollama-tr install
  [İndiriliyor: Trendyol-LLM-7B... ✓]
  [Türkçe modeli yapılandırılıyor... ✓]
  [Yerel sunucu başlatıldı: localhost:11434]
  ```
- **Süre:** Kurulum 90 saniye (cache'lenmiş)
- **Sonra:** İlk Türkçe sohbet — "Merhaba, KDV beyannamesi son tarih ne zaman?"
- **KVKK vurgusu:** "Bu sohbet hiçbir yere gitmedi. Wireshark'ı açabilirim, ağ trafiği sıfır."

### Dakika 8–12: KOBİ Kullanım Senaryoları (Slide 6–7)

**Prompt 1 (Müşteri Destek):**
```
Müşteri yazdı: "Geçen hafta sipariş ettim TR12345 numaralı,
hala gelmedi, ne zaman gelir? Para iadesi istiyorum."
- Müşteri tonuna uygun, kibar bir yanıt yaz.
- Kargo durumunu sorgulayacağımızı belirt.
- Para iadesi prosedürünü açıkla.
```
**Vurgu:** "Müşteri adı, sipariş numarası — hepsi sizde kaldı. ChatGPT'ye gönderseydiniz OpenAI'ın sunucusunda."

**Prompt 2 (Belge Özetleme):**
- 30 sayfalık örnek tedarik sözleşmesi PDF yükle (Türkçe, gerçek bir şablon)
- Soru: "Bu sözleşmede bize karşı dengesiz olan 3 madde nedir?"
- **Vurgu:** "Sözleşmeniz firmanızdan çıkmadı. Ticari sırrınız korunur."

### Dakika 12–15: Sektör-Spesifik Senaryo (Slide 8–10)
- **Müşteri lojistik ise:** Sahte gümrük beyannamesi yükle, özet iste
- **Müşteri hukuk ise:** Sahte dilekçe taslağı, "bu davaya emsal Yargıtay kararı var mı?" (yerel RAG ile)
- **Müşteri mali müşavir ise:** "2026 KDV oran değişikliği müşterilerime nasıl etkiler? Bir bilgi e-postası yaz."

### Dakika 15–17: Yatırım & ROI (Slide 11–13)
- Müşterinin çalışan sayısını sor → ROI hesap makinesinde canlı hesapla
- **Söz:** "Bu paketi 4–8 ayda geri kazanırsınız. KVKK denetim cezasından korunmak bonus."

### Dakika 17–19: İtiraz Karşılama
**Sık itirazlar ve yanıtlar:**

- *"ChatGPT zaten KVKK uyumu için anlaşma yaptı, gerek yok."*
  → "OpenAI Veri İşleme Anlaşması yapıyor ama yurt dışı aktarım KVKK Madde 9'a göre Kurul izni gerektirir. Kurul izninizi gördünüz mü?"

- *"Bizim donanımımız yetmez."*
  → "32GB RAM ve modern bir işlemci yeterli. 50 çalışanlı firmada zaten var olan bir sunucu işi görür. Gerekirse donanım önerisi de dahil paketimize."

- *"Kalite ChatGPT kadar iyi mi?"*
  → "Türkçe için Trendyol-LLM testlerinde GPT-3.5 seviyesinde, bazı görevlerde GPT-4. Sizin görevlerinizde yan yana koyalım, karar verin."

- *"Çalışanlarımız öğrenebilir mi?"*
  → "2 günlük eğitim dahil. Arayüz ChatGPT ile aynı: yaz, soru sor. Mama lazımken biz uzaktan bağlanırız."

### Dakika 19–20: Kapanış (Slide 15)
- **Söz:** "İki seçenek var: yerinde demo veya 30 günlük pilot. Pilot için tek koşulum: ekibinizden 2 kişi gerçekten kullansın, sonra bana 'değer mi?' deyin. Bu hafta perşembe veya cuma müsait misiniz?"
- **Takvim aç, hemen randevu al.**

---

## 4. Pricing Experiments — A/B Test Planı

### Paket A: Tek Seferlik + Bakım (Önerilen başlangıç)
- **Yapı:** 35.000 TL kurulum + 5.000 TL/ay bakım (12 ay taahhüt)
- **Toplam Y1:** 95.000 TL
- **Hedef:** Geleneksel KOBİ alıcı zihniyetine uygun (CAPEX + OPEX karışımı, ERP gibi)
- **Beklenen kapanış oranı:** %25 (kalifiye demo → sözleşme)

### Paket B: Subscription Only
- **Yapı:** 9.500 TL/ay (taahhütsüz) veya 7.500 TL/ay (12 ay taahhüt)
- **Toplam Y1:** 90.000–114.000 TL
- **Hedef:** SaaS'a alışık e-ticaret / dijital ileri KOBİ
- **Beklenen kapanış oranı:** %30 (giriş engeli düşük)
- **Risk:** Churn — ilk 3 ayda iptal edilirse maliyet karşılanamaz

### Paket C: Perpetual + Destek
- **Yapı:** 120.000 TL ömür boyu lisans + 18.000 TL/yıl destek (opsiyonel)
- **Toplam Y1:** 138.000 TL (destek ile)
- **Hedef:** "Abonelik istemem, satın alırım" zihniyetli geleneksel patron (sanayi, lojistik)
- **Beklenen kapanış oranı:** %15 (yüksek ön ödeme engeli)
- **Avantaj:** Tek seferde nakit akışı güçlü

### A/B Test Plan
- **Periyod:** Ay 1–3 (ilk 30 demo)
- **Atama:** Demo sırasında sektöre göre öncelik:
  - E-ticaret → B sun, A geri çekme
  - Lojistik/Sanayi → C sun, A geri çekme
  - Hukuk/Mali müşavir → A sun, B alternatif
- **Metrikler:**
  - Demo → Sözleşme dönüşüm oranı
  - Ortalama sözleşme değeri (ACV)
  - 6 ay sonra churn / yenileme oranı
  - Müşteri NPS
- **Karar:** Ay 4'te kazanan paketi varsayılan yap. İkinciyi opsiyon olarak tut.

### Pilot Fiyat
- **30 günlük pilot:** 15.000 TL (kurulum bedeline saydırılabilir)
- **Amaç:** Risk azaltma — patron "deneyelim, beğenirsek devam" diyebilsin
- **Beklenen pilot → sözleşme:** %65

---

## 5. Channel Partners — Kanal Ortakları

### Kanal 1: Mali Müşavirler (e-fatura ekosistemi)
- **Neden:** TÜRMOB üyesi 110.000 mali müşavir; her biri 50–500 KOBİ müşterisine sahip. Tek mali müşavir kapısı = 100 KOBİ kapısı.
- **Komisyon modeli:** %15 kurulum bedelinden + %10 ilk yıl bakım (life-of-customer 12 ay)
- **Pitch:** "Müşterinize KVKK uyumlu çözüm sunarak danışmanlık alanınızı genişletin. Komisyon kazanın."
- **Hedef partnerler (Ay 1–3):**
  - İSMMMO (İstanbul) — kurumsal işbirliği teklifi
  - Top 50 mali müşavir bürosu (200+ müşteri portföyü)
  - Luca, Mikro mali müşavir paketleri kullanan bürolar
- **Aktivasyon:** "Mali Müşavir Partner Sertifikası" — yarım gün eğitim, demo seti, white-label sunum hakkı

### Kanal 2: SAP Türkiye Entegrasyon Partnerleri
- **Neden:** SAP Business One TR'de KOBİ pazarına satılıyor. SAP partnerleri yıllık 50–100 KOBİ kurulumu yapıyor.
- **Komisyon modeli:** %20 kurulum + ilk yıl bakım payı pazarlık
- **Pitch:** "SAP B1 kurulumu sırasında AI eklentisi olarak sun. Müşteri için tek tedarikçi, sizin için ek gelir."
- **Hedef partnerler:** detaysoft, NTT DATA Business Solutions Türkiye, Mass Bilişim, Quadra Mavi
- **Entegrasyon vaadi:** OllamaTR ↔ SAP B1 connector — Q2 yol haritasında

### Kanal 3: Logo / Mikro / Paraşüt / Foriba / Edoksis OEM
- **Neden:** ERP / e-fatura platformları "AI özelliği" arıyor. OllamaTR'yi OEM olarak entegre edebilirler.
- **İş modeli:** Platform yıllık lisans öder (300K–1M TL) → kendi müşterilerine AI özelliği olarak sunar
- **Hedef sıra:**
  1. **Paraşüt** (en açık fikirli, modern stack) — Ay 2 hedefi
  2. **Logo Yazılım** (en büyük TAM ama uzun satış döngüsü) — Ay 4 hedefi
  3. **Foriba/Edoksis** (e-fatura nicheleri) — Ay 3 hedefi
  4. **Mikro Yazılım** (geleneksel, yavaş hareket eder) — Ay 6 hedefi
- **Pitch açılışı:** "Müşterileriniz ChatGPT'ye veri gönderiyor — KVKK uyum riski size geri yansıyor. Yerleşik AI ile sorunu çözelim."

### Kanal 4: KOSGEB Destek Danışmanları
- **Neden:** KOSGEB "İşletme Geliştirme Destek Programı" kapsamında dijital dönüşüm projelerine 70% hibe veriyor (üst limit 200K TL). Bizim 95K TL paketimiz tam kapsamda.
- **Komisyon modeli:** %10 (referans komisyonu)
- **Pitch:** "Müşterinizin AI projesi olarak sunun, KOSGEB hibesinden 67K TL geri alın. Müşteri net 28K TL öder."
- **Hedef:** KOSGEB Akredite Danışmanlar listesi (yaklaşık 2.000 kişi)
- **Materyal:** "KOSGEB AI Hibe Başvuru Kiti" — şablon proje dosyası

### Kanal 5: Teknopark Danışmanları
- **Neden:** Teknopark firmaları kendi KOBİ müşterilerine teknoloji satıyor. AR-GE merkezleri AI'ı arıyor.
- **Hedef Teknoparklar:** İTÜ ARI, ODTÜ Teknokent, Bilkent Cyberpark, Yıldız Teknopark
- **Pitch:** "Bizim ürünümüzü teknopark portföyünüze ekleyin. Birlikte AR-GE projeleri yapalım."
- **Komisyon:** %15 + ortak AR-GE proje hakları

### Channel Pipeline (6 Ay)
| Ay | Hedef |
|---|---|
| 1 | 5 mali müşavir partner imzala, eğit |
| 2 | Paraşüt görüşme açılışı, 3 SAP partner sertifikası |
| 3 | İlk kanal-üretilen sözleşme (hedef: 1) |
| 4 | KOSGEB pilot başvurusu (3 müşteri ile) |
| 5 | OEM ilk POC (Paraşüt veya Foriba) |
| 6 | Kanal kaynaklı sözleşme oranı %30 olsun |

---

## 6. Outbound Playbook

### Hedef: LinkedIn'de KOBİ patronuna ulaşma

**Pre-work (her hedef için):**
- LinkedIn profili incele: yıllık ciro, çalışan sayısı, son post'lar
- KVKK ihlali mi yaşamış? (Google: "[firma adı] KVKK ceza")
- ERP'si ne? (Logo / Mikro / SAP — sektör belirler)
- ChatGPT'yi yasakladı mı? (LinkedIn post arama)

### Adım 1: LinkedIn Connection Request

**Mesaj (300 karakter sınırı):**
> Merhaba [İsim] Bey/Hanım, [şirket]'in dijital dönüşüm yaklaşımınızı takip ediyorum. KVKK'ya uyumlu yerel AI üzerine çalışıyoruz — Türk KOBİ'lere özel. Bağlantı kurabilir miyiz?

### Adım 2: 1. Mesaj (Bağlantı kabulünden 2 gün sonra)

**E-posta (LinkedIn InMail + iş e-postası):**

> **Konu:** Çalışanlarınız ChatGPT'ye hangi verileri gönderiyor?
>
> Sayın [Ünvan] [Soyad],
>
> Geçen yıl KVKK Kurulu, ChatGPT'ye müşteri verisi gönderdikleri için Türk şirketlere 4 ayrı para cezası kesti — toplam 8.5 milyon lira.
>
> [Şirket adı] gibi [çalışan sayısı] kişilik bir [sektör] firmasında, sözleşme özetleme, müşteri yanıtı, belge analizi gibi işler için ChatGPT kullanımı yaygındır. Sorun: bu veriler OpenAI sunucularına gidiyor — KVKK Madde 9 ihlali.
>
> Biz, OllamaTR olarak, **veriniz hiç firmanızdan çıkmadan** ChatGPT seviyesinde yardım edebilen bir yerel AI platformu kurduk. Türkçe optimize. Anahtar teslim kurulum. KOSGEB hibe kapsamında.
>
> 30 dakikalık bir demo için müsait olduğunuz bir zaman önerebilir misiniz? Demo'yu yerinizde de yapabiliriz, online da. Sonrasında sıfır taahhüt — sadece bilgi almış olursunuz.
>
> Saygılarımla,
> [İsim]
> [Ünvan], OllamaTR
> [Telefon] · [E-posta]
> [LinkedIn link]
>
> **P.S.** Eğer "biz ChatGPT'yi yasakladık" diyorsanız — çalışanlarınızın %80'i hala kullanıyor olabilir. Anlık VPN ile. Sizin haberiniz olmadan. Bu da KVKK denetiminde sizin sorumluluğunuz.

### Adım 3: Follow-up Cadence

| Gün | Kanal | İçerik |
|-----|-------|--------|
| 0 | LinkedIn + E-posta | Açılış mesajı (yukarıda) |
| 4 | LinkedIn | "Geçen mesajım gözden kaçmış olabilir, kısa bir hatırlatma: [KVKK örnek vaka linki]" |
| 8 | E-posta | Değer içerik — "5 dk okuma: [Sektör] için Yerel AI ROI hesabı [PDF]" |
| 14 | Telefon | Doğrudan arama — kabul eden patrona en yüksek dönüşüm |
| 21 | LinkedIn | Vaka çalışması paylaşımı (referans olduğunda) |
| 35 | E-posta | "Bir sonraki çeyrek için listeden çıkarıyorum — son fırsat, demo?" |
| 90 | E-posta | "3 ay önce konuşmuştuk, durumunuz değişti mi?" |

### Conversion Rate Beklentisi

| Adım | Sayı | Oran |
|------|------|------|
| LinkedIn bağlantı isteği | 500/ay | — |
| Bağlantı kabul | 200 | 40% |
| 1. mesaja yanıt | 30 | 15% |
| Demo planlanan | 15 | 7.5% |
| Demo'ya çıkan | 12 | 6% |
| Pilot/sözleşme | 3 | 1.5% |

**Hedef:** Outbound ile aylık 3 sözleşme (10 sözleşmenin 6'sı outbound'dan).

### Hedef Liste Kaynakları
- LinkedIn Sales Navigator (zorunlu — 50 USD/ay)
- TOBB Sanayi Sicil veritabanı
- UTİKAD üye listesi (lojistik)
- TÜRMOB üye listesi (mali müşavir — channel için)
- KOSGEB destekli firma listesi (kamu açık)

---

## 7. Inbound Playbook

### Site CTA Stratejisi

**Ana sayfa hero CTA:**
- Birincil: "30 Dakikalık Ücretsiz Demo Talep Et" (büyük, kontrast renkli buton)
- İkincil: "KOSGEB Hibe Uygunluğunu Kontrol Et" (link, yumuşak CTA)

**Sayfa bazlı CTA'lar:**
- Sektör sayfaları (/lojistik, /e-ticaret, /hukuk, /saglik, /muhasebe): "Sektörüm için Demo Talep Et" (sektör verisi pre-fill)
- KVKK sayfası: "KVKK Risk Analizi PDF İndir" (e-posta yakalama)
- Fiyat sayfası: "Şirketim için ROI Hesapla" (interaktif hesap makinesi → sonuçta demo CTA)

### Demo Talep Formu

**Alanlar (zorunlu yıldızlı):**
- Ad Soyad *
- Firma Adı *
- Ünvan * (dropdown: Yönetim Kurulu / GM / BT Müdürü / Operasyon Müdürü / Diğer)
- Şirket Çalışan Sayısı * (dropdown: <50, 50-100, 100-250, 250+)
- Sektör * (dropdown — ICP sektörler önce)
- Telefon *
- E-posta * (kurumsal e-posta validasyonu — gmail/hotmail reddet)
- "En çok ne için kullanmayı düşünüyorsunuz?" (kısa metin)
- "Tercih ettiğiniz iletişim zamanı" (sabah/öğleden sonra/esnek)

**Form sonrası:**
- Anlık takvim widget'ı (Calendly) — 30 dk demo slot seç
- Otomatik e-posta: "Demo öncesi 5 dakikalık hazırlık videosu" linki

### Lead Scoring (0–100 puan)

| Kriter | Puan |
|--------|------|
| ICP sektör (5 hedef sektör) | +30 |
| Çalışan sayısı 50–250 | +20 |
| Ünvan: Patron / GM / Yön. Kurulu | +25 |
| Kurumsal e-posta domain | +10 |
| Demo notu KVKK / veri gizliliği bahsediyor | +15 |
| KOSGEB hibe sorusu | +10 |
| Pilot ilgilenir notu | +20 |
| **MQL eşiği** | **60+** |
| **SQL eşiği** | **80+** |

**MQL akış:** Otomatik nurturing e-posta dizisi (haftada 1, 6 hafta)
**SQL akış:** 24 saat içinde satış ekibinden kişisel arama

### Follow-up SLA

| Eylem | SLA |
|-------|-----|
| Demo formu doldurma → 1. yanıt | **24 saat** (mesai saatleri) |
| Demo formu doldurma → Demo planlanması | 48 saat |
| Demo tamamlanma → Teklif gönderme | 5 iş günü |
| Teklif → Takip araması | 7 gün |
| Pilot teklif → Sözleşme | 21 gün |

**İçsel taahhüt:** Hiçbir lead 24 saatten fazla yanıtsız kalmasın. Slack alarm bağlanmalı.

### Inbound Beklentisi (Ay 1–6)

| Ay | Site trafiği | Demo talep | Demo'ya çıkan | Sözleşme |
|----|--------------|------------|---------------|----------|
| 1 | 500 | 5 | 3 | 0 |
| 2 | 1.500 | 12 | 8 | 1 |
| 3 | 3.000 | 20 | 14 | 1 |
| 4 | 5.000 | 30 | 20 | 1 |
| 5 | 7.000 | 40 | 28 | 1 |
| 6 | 10.000 | 50 | 35 | 2 |
| **Toplam** | | **157** | **108** | **6 sözleşme** |

**Hedef:** Inbound ile 6 ayda 6 sözleşme (outbound 3 + channel 1 = toplam 10).

---

## 8. Sözleşme Şablonu (Outline — Avukat tarafından finalize edilecek)

> **NOT:** Bu outline'dır. Avukat (tercihen ticaret hukuku + KVKK uzmanı) tarafından finalize edilmesi şarttır. Türk Borçlar Kanunu, KVKK, ve 5651 sayılı kanun uyumluluğu doğrulanmalıdır.

### Bölüm 1: Ön Bilgiler
- Taraflar (Tedarikçi: [Şirket Adı], Müşteri: [Müşteri Şirket])
- Tanımlar (Yazılım, Hizmet, Süre, KVKK ilgili tanımlar)
- Konu ve Kapsam

### Bölüm 2: Hizmet Kapsamı
- 2.1. Yazılım Kurulumu
  - Tek seferlik on-site veya remote kurulum
  - Donanım gereksinimleri (ek)
  - Türkçe model yüklemesi
- 2.2. Eğitim
  - 2 günlük çalışan eğitimi (azami 10 kişi)
  - Dokümantasyon Türkçe
- 2.3. Bakım ve Destek (12 ay)
  - Yazılım güncellemesi (3 ayda bir)
  - Telefon destek (mesai saatleri)
  - Uzak bağlantı destek (kritik sorunlar)
  - SLA: Bkz. Ek-1

### Bölüm 3: Bedel ve Ödeme
- Kurulum bedeli: 35.000 TL (+KDV)
- Aylık bakım: 5.000 TL/ay (+KDV) — 12 ay taahhüt
- Ödeme: Kurulum %50 imza, %50 teslim. Aylık bakım: ay başında.
- Geç ödeme: Aylık %2 gecikme faizi
- KDV: %20 (yürürlükteki oran)

### Bölüm 4: Süre ve Fesih
- Süre: 12 ay (kurulum tarihinden itibaren)
- Otomatik yenileme: 12 ay daha (taraflardan biri 30 gün öncesinde feshetmedikçe)
- Erken fesih: Müşteri tarafından sebepsiz feshi için kalan ayların %50'si tazminat
- Karşılıklı fesih nedenleri

### Bölüm 5: Garanti ve Sorumluluk
- Kurulum garantisi: 30 gün
- Çalışma garantisi: SLA'da tanımlı (Ek-1)
- Sorumluluk sınırı: Toplam ödenen yıllık bedel (95.000 TL üst limit)
- Mücbir sebep maddesi
- KVKK ve veri güvenliği — Tedarikçi yükümlülükleri (sınırlı)

### Bölüm 6: Fikri Mülkiyet
- Yazılım sahipliği Tedarikçide
- Müşteriye kullanım lisansı (münhasır olmayan, devredilemez)
- Müşteri verileri Müşteriye ait — Tedarikçi erişmez (yerel kurulum gereği)
- Açık kaynak model lisansları (Trendyol-LLM Apache 2.0 vb.) müşteriye iletilir

### Bölüm 7: Gizlilik
- Karşılıklı gizlilik (NDA niteliğinde)
- Süre: Sözleşme + 3 yıl

### Bölüm 8: KVKK ve Veri Güvenliği
- Tedarikçi'nin VERBİS kaydı
- Veri işleyen sıfatı: Tedarikçi (sınırlı kapsam — sadece destek anında)
- Veri sorumlusu: Müşteri
- Yetkili kişiler ve iletişim
- **Ek-2: Aydınlatma Metni ve Açık Rıza şablonu**

### Bölüm 9: Diğer Hükümler
- Uygulanacak hukuk: Türk Hukuku
- Yetkili mahkeme: [İstanbul] mahkemeleri
- Tebligat adresleri
- İmza yetkileri

### Ek-1: SLA (Service Level Agreement)
- **Uptime:** Yerel kurulum olduğu için Müşteri donanımına bağlı (Müşteri sorumluluğu)
- **Destek yanıt süresi:**
  - Kritik (sistem durdu): 4 saat
  - Yüksek (önemli özellik çalışmıyor): 1 iş günü
  - Orta: 2 iş günü
  - Düşük: 5 iş günü
- **Çözüm süresi hedefleri:**
  - Kritik: 24 saat
  - Yüksek: 3 iş günü
- **Penaltı:** SLA ihlali aylık 1 ücretsiz aya kadar (üst limit)

### Ek-2: KVKK Aydınlatma Metni Eki
- 6698 sayılı KVKK kapsamında işlenen kişisel veri tipleri
- İşleme amacı (destek hizmeti sağlama)
- Saklama süresi (sözleşme + 3 yıl)
- İlgili kişi hakları (KVKK Madde 11)
- VERBİS bilgileri

### Ek-3: Donanım Spesifikasyonu (Önerilen)
- Minimum sunucu / iş istasyonu spesifikasyonu
- Önerilen konfigürasyon (10 kullanıcıya kadar / 50 kullanıcı / 250 kullanıcı)

> **Avukat notu:** Bu sözleşme hazırlanırken aşağıdaki hususlar mutlaka kontrol edilmelidir:
> 1. 6502 sayılı Tüketicinin Korunması — KOBİ tacir sayılır mı?
> 2. 6098 sayılı TBK Madde 27 (genel işlem koşulları)
> 3. KVKK Veri İşleyen Sözleşmesi gerekli mi (Madde 12)
> 4. Açık kaynak yazılım lisans iletim yükümlülüğü
> 5. Vergi (KDV, stopaj) yapısı doğru mu

---

## 9. Onboarding Süreci — İlk 30 Gün

### Hafta 1: Kurulum (Gün 1–5)

**Gün 1: Kick-off Toplantısı (1.5 saat)**
- Katılımcılar: Müşteri patron + BT sorumlusu + 1–2 power user + Tedarikçi proje yöneticisi
- Gündem:
  - Kullanım hedefleri net belirleme (top 3 use case)
  - Donanım durumu doğrulama
  - Sektör-spesifik model seçimi
  - Eğitim takvimi
  - Başarı kriterleri tanımı (30/60/90 gün)
- Çıktı: Onboarding Plan dokümanı (imzalı)

**Gün 2: Donanım Hazırlık (yerinde veya remote)**
- Sunucu / iş istasyonu spesifikasyon doğrulama
- İşletim sistemi hazırlığı
- Ağ ve güvenlik duvarı kuralları
- Backup stratejisi

**Gün 3: Yazılım Kurulumu (on-site)**
- OllamaTR motoru kurulumu
- Türkçe model indirme ve doğrulama
- Web arayüzü kurulumu
- Kullanıcı hesapları oluşturma
- Test sorgu battery (50 prompt)

**Gün 4: Entegrasyonlar**
- ERP bağlantısı (Logo / Mikro / SAP) — varsa
- E-fatura sistemi bağlantısı — varsa
- Müşteri belge depo bağlantısı (RAG için)
- Yetki ve erişim ayarları

**Gün 5: Pre-Go-Live Test**
- BT sorumlusu ile end-to-end test
- 3 senaryo: Müşteri destek, belge özetleme, sektör-spesifik use case
- Bug fix
- Go-live onayı

### Hafta 2–3: Eğitim (Gün 6–15)

**Gün 6–7: Power User Eğitimi (8 saat — 2 yarım gün)**
- Katılımcılar: 2–4 power user (her departmandan 1)
- İçerik:
  - AI nedir, ne yapar, ne yapamaz
  - Prompt engineering temelleri (Türkçe)
  - Use case'lere göre prompt şablonları
  - Belge yükleme ve RAG kullanımı
  - Sınırlamalar ve hata yönetimi
- Çıktı: Her kullanıcı 5 günlük "homework" — kendi işlerinde 10 prompt deneyecek

**Gün 8–10: Genel Çalışan Eğitimi (4 saat — 1 yarım gün, gruplar halinde)**
- Katılımcılar: Geri kalan ekip (max 10 kişi/grup)
- İçerik:
  - Arayüz tanıtımı
  - Günlük 5 use case
  - "Yasak" davranışlar (örn: müşteri PII'sini başka yerlere kopyalama)
  - Soru-cevap

**Gün 11–14: Power User Pekişme**
- Günlük 1 saatlik açık ofis saati (Tedarikçi uzaktan)
- Power user'lar gerçek işlerinde dener, soruları sorar
- Kullanım istatistikleri toplama başlar

**Gün 15: 2 Haftalık Review**
- Toplantı: Patron + BT + power user
- Metrikler: Kullanım sayısı, en sık prompt'lar, sorunlar
- Eylem maddesi: Sonraki 2 hafta için iyileştirmeler

### Hafta 3–4: Takip ve Optimizasyon (Gün 16–30)

**Gün 16–25: Hipercare Dönemi**
- Günlük 30 dk Tedarikçi-Müşteri sync
- Slack/WhatsApp grup — anlık destek
- Yeni prompt şablonu önerileri (sektöre göre)
- Performans tuning (model parametreleri, RAG iyileştirmesi)

**Gün 26–29: Gözlem**
- Tedarikçi geri çekilir, müşteri kendi başına yönetir
- Kullanım analitiği toplanır
- "Stuck" alanlar tespit edilir

**Gün 30: Birinci Ay Review**
- Toplantı: Patron + BT + power user
- Sunum: 30 günlük kullanım raporu
  - Toplam soru sayısı
  - En aktif kullanıcılar / departmanlar
  - En sık use case'ler
  - Tahmini tasarruf saati
  - Tahmini ROI başlangıcı
- 90-gün hedefleri tazelenmesi
- Geri bildirim toplama
- **NPS sorusu:** "0–10 arası, başka bir KOBİ'ye OllamaTR'yi tavsiye eder misiniz?"

### Başarı Kriterleri (30 günde)
- Power user'ların %100'ü haftada en az 10 prompt yazıyor
- Genel çalışanların %50'si haftada en az 3 prompt yazıyor
- Top 3 use case'in en az 2'sinde aktif kullanım
- NPS ≥ 7
- Patron "evet, devam ediyoruz" diyor

---

## 10. Müşteri Yaşam Döngüsü

### Faz 1: İlk 90 Gün (Sözleşme imza sonrası)
- **Hedef:** Aktif kullanım alışkanlığı oluştur, ilk ROI'yi kanıtla
- **Eylemler:**
  - 30. gün, 60. gün, 90. gün check-in toplantıları
  - Aylık kullanım raporu (otomatik)
  - 60. günde "yeni use case workshop" — kullanılmayan use case'leri aktif et
  - 90. günde **referans iste** (yazılı vaka çalışması için)

### Faz 2: Ay 4–11 (Olgun Kullanım)
- **Hedef:** Genişleme, yeniden satın alma sinyali al
- **Eylemler:**
  - Üç aylık business review (QBR) toplantıları
  - Upsell sondajları (aşağıda)
  - Müşteri NPS anketi (her 6 ayda)
  - Yenileme öncesi 60-gün uyarı sistemi

### Faz 3: Ay 11–12 (Yenileme Penceresi)
- **Hedef:** %85 yenileme oranı
- **Eylemler:**
  - 60. günde patron'a yenileme toplantısı talep et
  - 12 aylık ROI raporu sun (somut sayılar)
  - %5 sadakat indirimi sun (yıl 2 için)
  - 3 yıllık taahhüt %15 indirim alternatifi
  - Yenileme + upsell tek paket

### Upsell Fırsatları

**Upsell 1: Özel Model Fine-Tune (Premium)**
- **Ne:** Müşterinin kendi belgeleri / e-postaları üzerinde model fine-tuning
- **Fiyat:** 50.000–150.000 TL (one-time) + 3.000 TL/ay (model bakım)
- **Hedef:** Hukuk büroları, mali müşavirler, hastaneler — yüksek özelleşme ihtiyacı
- **Satış zamanı:** Ay 6+ (ilk değer kanıtlandıktan sonra)

**Upsell 2: Ek Kullanıcı Lisansı**
- **Ne:** Standart paket 50 kullanıcıya kadar. Üstü için ek paket.
- **Fiyat:** 1.500 TL/ay/50 ek kullanıcı (grup indirimi)
- **Hedef:** 100+ çalışanlı müşteriler

**Upsell 3: Sektör Eklentileri**
- **Ne:** Lojistik için gümrük belgesi parser, hukuk için içtihat veritabanı entegrasyonu vb.
- **Fiyat:** 15.000–30.000 TL (one-time) + dahili bakım
- **Hedef:** Sektör-spesifik müşteriler

**Upsell 4: Donanım Yenileme**
- **Ne:** 2. yılda daha güçlü sunucu (büyüyen kullanım için)
- **Fiyat:** Donanım maliyeti + 10.000 TL kurulum
- **Hedef:** Hızlı büyüyen müşteriler

**Upsell 5: Eğitim Tazeleme**
- **Ne:** Yıllık 1 günlük "advanced prompt engineering" eğitimi
- **Fiyat:** 8.000 TL/yıl (sözleşmeye ek olarak)
- **Hedef:** Tüm aktif müşteriler

### Referans Programı

**Yapı:**
- Müşteri yeni müşteri getirir → İmzalanan sözleşmenin %10'u referans veren müşteriye kredi olarak işlenir (bakım faturasından düşülür)
- Tavsiye edilen müşteri %5 indirim alır
- Üst limit: Yıllık 3 başarılı referans (üstü için para ödeme opsiyonel)

**Aktivasyon:**
- 90. günde patrona "kimi tanıyorsunuz?" sorusunu sor
- LinkedIn'den otomatik öneri: müşterinin 2. derece bağlantıları içinde ICP'ye uyanlar
- Yıllık "Müşteri Buluşması" — referans ortamı yarat

### Müşteri Kaybı (Churn) Sinyalleri ve Müdahale

**Sinyaller:**
- Aylık aktif kullanıcı %50'den az
- Destek bilet sayısı sıfıra düştü (kullanmıyorlar)
- BT sorumlusu işten ayrıldı
- Patron 2 QBR'ı arka arkaya kaçırdı

**Müdahale:**
- 30 gün içinde yerinde toplantı
- "Re-engagement" workshop (yeni use case'ler)
- Geri kazanma indirimi (6 ay %20)
- Son çare: Pause sözleşme (3 ay) opsiyonu

---

## ÖZET — İlk 3 Satış Hamlesi (Tek Paragraf)

**İlk 90 günün satış hamleleri:** (1) **Mali müşavir kanalını açmak** — Hafta 1–4'te İSMMMO ve Top 50 mali müşavir bürosuyla "Partner Sertifika Programı" başlat; her mali müşavir 50–500 KOBİ kapısı, %15 komisyonla biz kapı açma maliyetini sıfıra çekeriz, ilk 5 partner Ay 1 sonu imzalı olmalı. (2) **Hedefli outbound LinkedIn kampanyası** — Lojistik (UTİKAD üyeleri), e-ticaret (Trendyol Power Merchant), mali müşavirlik (TÜRMOB Top 500) sektörlerinde haftalık 100 patronla bağlantı + KVKK-temalı açılış mesajı, Ay 1'de 15 demo / Ay 2'de 25 demo hedefi, %1.5 dönüşüm ile aylık 3 sözleşmeye yol açar. (3) **30 Günlük Pilot Programı'nı standart kapanış aracı yapmak** — 15.000 TL düşük taahhütle başla, kurulum bedeline saydırılabilir, "değer mi?" cevabı patrondan gelir, pilot → tam sözleşme dönüşüm %65 hedefi; bu üç hamle birlikte 6 ayda 10 sözleşme hedefinin 7'sini outbound+pilot, 1'ini kanal, 2'sini inbound üzerinden teslim eder. STOP.
