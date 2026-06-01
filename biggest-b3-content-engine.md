# B3 — OllamaTR YouTube + Podcast Content Engine

**Mission:** Organic discovery of OllamaTR through Türkçe video and audio. Become the default Turkish reference for running local LLMs — own the search "yerel yapay zeka Türkçe", "Ollama Türkçe kurulum", "KVKK uyumlu yapay zeka", and the YouTube algorithm around them. 18-month horizon to reach 25K subs + 50K monthly podcast listens, fully Türkçe.

---

## 1. YouTube Channel Architecture

### Channel name
**`OllamaTR`** (primary handle: `@ollamatr`)
- Display: **"OllamaTR — Yerel Yapay Zekâ Türkçe"**
- Tagline under "About": *"Veriniz cihazınızda kalır. Türkçe, açık kaynak, ücretsiz."*

### Branding system
- **Channel banner:** Matte black background, terminal cursor blinking on the left ("$ ollama run"), İstanbul silhouette etched in low-contrast right side. No glow, no neon (consistent with `DESIGN-READ.md` — variance 4 / motion 3 / density 4).
- **Avatar:** Lowercase `o` lockup in IBM Plex Mono, off-white on black. Recognizable at 24px.
- **End screen:** Static card — no spinning subscribe button. "Bir sonraki video" + "Kanala abone ol" in plain text.
- **Lower-thirds:** Single line, white text on 60% black bar, IBM Plex Sans. No animated swoops.
- **Music:** Selçuk Artut-style minimal ambient or open-license Anatolian electronica (Kerim Tekin remixes, Mavi Gri instrumentals). Never royalty-free epic trailer music.

### Thumbnail formula (anti-MrBeast Türk)
Three rules. Break one = scrap thumbnail.
1. **One word, one number, one face.** Example: `LLAMA 3 — TÜRKÇE 7B`. Number in IBM Plex Mono 220pt. Word in IBM Plex Sans Bold 140pt.
2. **No shocked expressions, no red arrows, no circled UI elements.** Face is calm, looking slightly off-camera. Crop tight (forehead cut).
3. **One accent color per video.** Pulled from the `super-brand-identity.md` Anatolian palette (kilim red `#A93226`, çini blue `#1B4F72`, bakır `#7B3F00`). Never combined.

This signals "serious nerd reference channel" not "engagement-bait techbro" — which is the entire B3 thesis.

### Title formula
**`[Concrete claim] — [Concrete artifact in TR]`**

Examples:
- ✅ `8GB RAM'de çalışan Türkçe LLM — Llama 3 8B kurulumu`
- ✅ `KVKK'ya tam uyumlu yapay zekâ — 12 dakikada kurulum`
- ❌ `BU YAPAY ZEKAYI HERKES KAÇIRDI 🤯` (banned)

Every title must contain either: a model name, a hardware spec, a Türkçe noun phrase that someone would actually search, or a specific timebox ("12 dakikada", "1 saatte", "1 hafta").

### Posting cadence
- **Year 1 (months 1–12):** 1 long-form video / week (Pazar 20:00 TRT), 3 shorts / week (Sal–Per–Cum 19:00).
- **Year 2:** 2 long-form / week + 1 podcast episode / week + daily shorts during launches.
- **Anchor day:** Sunday evening. This is when Turkish developer Twitter is most awake and when family-dinner-recovered devs scroll YouTube.

### Season structure
Run YouTube in **6 thematic seasons of 8–10 episodes**, like a TV show. Each season has a season trailer (60s), an opener video, and a finale recap. This gives binge-watchable playlists and a clear narrative for press ("3. sezonumuzda KVKK'yı işliyoruz").

| Season | Theme | Episodes | When |
|---|---|---|---|
| S01 — Başlangıç | Installer + first model | E01–E08 | Ay 1–2 |
| S02 — Modeller | TR-tuned model deep-dives | E09–E16 | Ay 3–4 |
| S03 — KVKK & Hukuk | Legal compliance arc | E17–E24 | Ay 5–6 |
| S04 — Yaşam Deneyi | "Bir hafta sadece OllamaTR" | E25–E32 | Ay 7–8 |
| S05 — Kurucular | TR AI founder interviews | E33–E42 | Ay 9–10 |
| S06 — Kurumsal | KOBİ ve enterprise vakaları | E43–E50 | Ay 11–12 |

---

## 2. 50-Episode Plan

> Each entry: **Title** — **Hook (first 8 seconds spoken)** — **3-sentence outline**

### Season 01 — Başlangıç (E01–E08)

**E01 — `OllamaTR nedir? 90 saniyede açıklıyorum`**
Hook: *"ChatGPT'ye yazdığınız her şey OpenAI'nin sunucusunda. Bunu Türkiye'de kabul edilemez bulduk."*
Outline: Açılış manifestosu — neden Ollama, neden Türkçe wrapper, neden KVKK. Tek bir ekran görüntüsü ile kurulum gösterilir, terminale tek komut. Bir sonraki bölüm için soru: "Hangi modeli kullanmalısınız?"

**E02 — `Windows'a OllamaTR kurulumu — sıfırdan tek tıkla`**
Hook: *"Komut satırı bilmiyorsanız, bu video sizin için."*
Outline: Installer'ın grafik versiyonunu A'dan Z'ye gösterir, indir, çift tıkla, "Türkçe model indir" seçeneği. Ortalama izleyici 12 dakikada kuruluma kadar gider. Bitirme: "Mac kullanıyorsanız sıradaki video."

**E03 — `Mac (M1/M2/M3) için OllamaTR — Metal GPU hızı`**
Hook: *"Apple Silicon, yerel LLM için dünyanın en iyi tüketici donanımı. Test ettik."*
Outline: M2 Air 8GB vs M3 Pro 18GB karşılaştırması. tokens/sec ölçümü, ısınma testi, batarya etkisi. Çıkarım: "16GB altı için 7B, üstü için 13B" net tavsiyesi.

**E04 — `Linux (Ubuntu, Fedora, Arch) — OllamaTR sistem servisi olarak`**
Hook: *"Sunucunuzda mı çalıştıracaksınız? systemd ile boot'ta otomatik."*
Outline: `systemctl enable ollamatr` örneği, ufw firewall ayarı, nginx reverse proxy. Hedef: kişisel sunucusu olan TR developer. Final: "1 KOBİ'de tek sunucudan 10 kişi nasıl kullanır?" (S06 teaser).

**E05 — `Hangi RAM'e hangi model? Tam tablo`**
Hook: *"4GB, 8GB, 16GB, 32GB — her birine net cevap."*
Outline: Q4_K_M kuantizasyon mantığı sade dille, 8 modelin gerçek RAM tüketimi tabloda. İzleyici videodan sonra bilgisayarına bakıp doğru modeli seçebilir. CTA: "RAM'ini yorum at, sana özel öner."

**E06 — `İlk Türkçe sohbet — "Merhaba" demekten öteye`**
Hook: *"Modele 'merhaba' diyince çalıştığını sanırsınız. Asıl test bu değil."*
Outline: Türkçe çekim ekleri, deyim anlama, argo, bölgesel ağız (Karadeniz, Ege) testleri. Hangi modelin gerçekten Türkçe "düşündüğü"nü gösterir. Cevap: hiçbiri tam değil — S02 başlığına geçiş.

**E07 — `Komut satırından korkma — temel 7 komut`**
Hook: *"Terminal görünce kapatıyor musunuz? 5 dakika sonra rahatlayacaksınız."*
Outline: `ollamatr list`, `pull`, `run`, `rm`, `ps`, `cp`, `show` — yedi komut, her biri 30 saniye. Senaryo: "Bilgisayarımda hangi modeller var, hangisini silebilirim?" Bonus: tab-completion kurulumu.

**E08 — `S01 Finali: Kurulum yapan 1000 kişiye neler sordular?`**
Hook: *"Beta'da 1000 kullanıcımız oldu. En çok takıldıkları 5 yer."*
Outline: Discord ve GitHub Issues taraması, en sık 5 sorun (CUDA, ModelOf disk, Türkçe karakter encoding, firewall, Windows Defender false-positive). Her birine çözüm. S02 trailer: "Sırada modeller."

### Season 02 — Modeller (E09–E16)

**E09 — `S02 açılışı: Türkçe LLM ekosisteminin tam haritası`**
Hook: *"Türkçe konuşan 23 model var. Hepsini test ettik. 4'ü gerçekten iyi."*
Outline: Trendyol-LLM, Cosmos, Kanarya, Turkcell-LLM, KUIS-AI, Comencement-TR — kim kimi fine-tune'lamış, ne zaman, hangi veriyle. Görsel: bir soy ağacı. Sezon yol haritası.

**E10 — `Llama-3-Turkish vs Mistral-Turk — gerçek testi`**
Hook: *"İki modeli aynı 30 göreve verdik. Sonuç beklediğimiz gibi değildi."*
Outline: Özetleme, kod yazma, KVKK metni yorumlama, şiir, mizah, etik dilemma. Puanlama TRT haber spikeri + bir yazılımcı + bir avukat tarafından. Net kazanan + nerede.

**E11 — `Trendyol LLM 7B — e-ticaret için yaratılmış model`**
Hook: *"Trendyol'un açık modelini ürün açıklamaları için test ettik. KOBİ'ler için altın."*
Outline: Ürün başlığı → SEO açıklama, müşteri yorumu → sentiment, soru → cevap üretimi. Gerçek bir Etsy satıcısı ile canlı senaryo. KOBİ entegrasyon teaser'ı (S06).

**E12 — `Cosmos-LLaVA — Türkçe görsel anlayan tek model`**
Hook: *"Ekran görüntüsü atıyorum, Türkçe anlatıyor. Erişilebilirlik için devrim."*
Outline: Görme engelli kullanıcı için ekran tanımlama senaryosu. Belge OCR'sız çevirisi. Sınır: el yazısı henüz zayıf. Nereden indirilir, kaç GB.

**E13 — `Kanarya 2.5B — telefonda çalışan Türkçe LLM`**
Hook: *"Termux ile Android'de çalıştırdım. Pinokio değil, gerçek."*
Outline: Pixel 7 ve Galaxy S23 üzerinde kurulum. tokens/sec, ısı, batarya. Use case: havaalanı, uçak, dağ — internet yokken Türkçe asistan.

**E14 — `Kod modelleri — DeepSeek-Coder vs CodeLlama Türkçe yorumları`**
Hook: *"Yorum satırını Türkçe yazıyorum, kod çıkıyor. Hangisi daha iyi anlıyor?"*
Outline: 10 algoritma sorusu Türkçe yorumla. Bonus: Türkçe değişken adlarıyla (`musteriListesi`) kod yazma testi. Sürpriz: bir model Türkçe'yi diğerinden ciddi anlamda iyi yorumluyor.

**E15 — `Gömme modelleri (embedding) — Türkçe RAG için en iyisi`**
Hook: *"RAG yapacaksanız bu video kritik. Yanlış embed = yanlış cevap."*
Outline: bge-m3, multilingual-e5, jina-v3 Türkçe semantic search testi. 1000 KVKK maddesi üzerinden sorguda hangisi doğru maddeyi getiriyor. Net tavsiye + Ollama'ya nasıl yüklenir.

**E16 — `S02 Finali: Türkçe LLM açıklarına dair gerçek konuşma`**
Hook: *"Övdüğümüz modeller hâlâ İngilizce'nin yarısı kadar iyi. Niye?"*
Outline: Türkçe veri seti sorunu, RLHF eksikliği, akademik fonlama. Eren Gölge (Coqui) cameo (15sn röportaj klibi). "Bu yüzden S03'te hukuka geçiyoruz — çünkü kurumsal benimseme orada başlar."

### Season 03 — KVKK & Hukuk (E17–E24)

**E17 — `KVKK 101 — yapay zeka kullanan herkesin bilmesi gerekenler`**
Hook: *"Avukat değilim, ama danışmana 8000 TL ödediğimi öğrendiğinizde memnun olacaksınız."*
Outline: 6698 sayılı Kanun sade dille, AVRSiS kayıt zorunluluğu, "açık rıza" nedir. Tüm video Av. [LegalKVKK doc'tan adı çekilen ortak] eşliğinde çekilir. Ücretsiz indirilebilir KVKK kontrol listesi.

**E18 — `ChatGPT vs OllamaTR — KVKK avukatı karar veriyor`**
Hook: *"İki sistemi bir veri koruma avukatına gösterdik. Hangisini onayladı?"*
Outline: Aynı senaryo (hasta dosyası özetleme) iki sistemde. Avukat hangi durumda Aydınlatma Metni gerekir, hangi durumda gerekmez, açıklıyor. Çıktı: ücretsiz Aydınlatma Metni şablonu.

**E19 — `Hekim için yerel LLM — hasta dosyaları cihazda kalır`**
Hook: *"Bir özel hastanenin baş hekimiyle çekiyorum bu videoyu."*
Outline: Anonim hasta epikrizi özetleme, tetkik yorumu, ilaç etkileşimi sorgulama. KVKK + Sağlık Bakanlığı VERİSİS uyumu. Sınır: tıbbi karar destek aracı değil, dokümantasyon aracı.

**E20 — `Avukat için yerel LLM — dosya gizliliği`**
Hook: *"Müvekkil dosyasını OpenAI'ye gönderemezsiniz. Mesleki sır."*
Outline: TBB meslek kuralları + KVKK. Dilekçe taslağı, içtihat özeti, müvekkil görüşmesi notu özetleme. UYAP entegrasyonu (henüz yok) için yol haritası.

**E21 — `KOBİ'ler için — vergi danışmanı + muhasebeci senaryosu`**
Hook: *"Mali müşavir 200 müşterinin defterini OpenAI'ye yükleyemez. Yerel çözüm var."*
Outline: e-Defter XML özeti, KDV beyan kontrol, müşteri sorusuna Türkçe cevap. KGK rehberi uyumlu. Mali müşavir misafir.

**E22 — `Eğitim — öğrenci verisi ve MEB`**
Hook: *"Çocuğunuzun kompozisyonunu ChatGPT'ye atan öğretmen suç işliyor olabilir."*
Outline: KVKK + MEB Bilişim Yönetmeliği. Sınıf içi kullanım senaryoları, ödev değerlendirme, veliye rapor. Bir öğretmenin yerel kurulumu — adım adım.

**E23 — `Devlet kurumu kullanabilir mi? Resmi cevap`**
Hook: *"Cumhurbaşkanlığı Dijital Dönüşüm Ofisi'nin açık kaynak yazılım genelgesini okudum."*
Outline: 2019/12 Genelgesi + e-Devlet bulut politikası. Hangi kademede onay gerekir, hangi yazılı görüşler. Bir belediye bilgi işlem müdürüyle pratik konuşma.

**E24 — `S03 Finali: KVKK uyumluluk belgesi nasıl alınır?`**
Hook: *"3 ay sonra ISO 27001 + KVKK uyumluluk denetiminden geçtik. Süreç."*
Outline: Denetim firması seçimi, evrak listesi, maliyet aralığı (gerçek rakam). OllamaTR'nin belgesini gösterir. KOBİ'ler bu belgeyi RFP'lerde nasıl kullanır.

### Season 04 — Yaşam Deneyi (E25–E32)

**E25 — `Bir hafta sadece OllamaTR ile yaşamak — Gün 1`**
Hook: *"7 gün ChatGPT, Claude, Gemini yok. Sadece kendi makineme güveneceğim."*
Outline: Pazartesi sabahı kurulum kontrolü, ilk e-mail taslağı, Slack özeti. İlk frustrasyon: bir model bağlamı kaybetti. İlk zafer: tüm gün internet kesik çalıştı.

**E26 — `Gün 2 — Kod yazma günü`**
Hook: *"Tüm gün Codeium yok, GitHub Copilot yok. Sadece DeepSeek-Coder yerel."*
Outline: Bir React component sıfırdan, bir Python script, bir SQL sorgu. Süreler kıyaslanır. Bulgu: %30 yavaş ama context'i terk etmiyor.

**E27 — `Gün 3 — Yazı yazma günü (blog, e-mail, sosyal medya)`**
Hook: *"Yazar değilim, ama bugün 5 farklı yazı türü ürettim."*
Outline: Blog taslağı, müşteri yanıtı, X postu, LinkedIn makale, bülten. Türkçe akıcılık değerlendirmesi. ChatGPT-4 vs Llama-3-Turkish kör test.

**E28 — `Gün 4 — Görsel ve doküman günü (LLaVA + OCR)`**
Hook: *"Fatura yığını, ekran görüntüleri, PDF'ler. Hepsi yerel."*
Outline: Faturadan e-Defter satırı çıkarma, ekran görüntüsünden bug tarifi, sözleşme PDF'inden risk maddesi tarama. Sınırlar net belirlenir.

**E29 — `Gün 5 — Müşteri toplantısı + canlı transcript`**
Hook: *"Bugün gerçek bir müşteri görüşmesini Whisper.cpp ile yerel kaydettim."*
Outline: faster-whisper Türkçe model, canlı transkript, sonra LLM özeti, aksiyon maddeleri. Bulut yok. Toplantı sahibi yorumu.

**E30 — `Gün 6 — Aile günü, çocuk ödevleri, ev yönetimi`**
Hook: *"Kızımın matematik ödevine yardım — yerel model nasıl?"*
Outline: Lise matematik, edebiyat analizi, tarih soruları, yemek tarifi. Eksik: gerçek zamanlı internet bilgisi (haber, hava). Yedek strateji.

**E31 — `Gün 7 — Bilanço ve rakamlar`**
Hook: *"7 günde 4.2 milyon token. 0 byte buluta. Elektrik faturası: 28 TL."*
Outline: Token sayımı, elektrik ölçümü (kill-a-watt), zaman kayıpları, kazanımlar. Toplam maliyet karşılaştırması ChatGPT Plus + Copilot + Claude Pro ile. Net karar.

**E32 — `S04 Finali: 100 kullanıcı da denedi — sonuçlar`**
Hook: *"Topluluğumuza 'siz de bir hafta deneyin' dedik. 100 kişi yaptı."*
Outline: Anket sonuçları, en sevilen modeller, en büyük frustrasyon, ne için geri ChatGPT'ye dönüldü. Sürpriz cevaplar. S05 (kurucular) teaser.

### Season 05 — Kurucular (E33–E42)

**E33 — `Eren Gölge ile söyleşi — Coqui'den Türkçe TTS'ye`**
Hook: *"Türkiye'nin en başarılı open-source AI çıkışı. Mozilla, Coqui, sonra?"*
Outline: Coqui'nin kapanışı, XTTS-v2 mirası, Eren'in yeni projesi (eğer açıklarsa). Türkçe AI ekosistemi için ne eksik? OllamaTR'ye Coqui-TTS entegrasyonu canlı.

**E34 — `Cem Say (Boğaziçi) — yapay zeka düşünür mü?`**
Hook: *"Türkiye'nin en bilinen AI hocası ile felsefi sohbet."*
Outline: LLM bilinç tartışması, Türkçe NLP'nin akademik durumu, doktora konusu önerileri. Genç araştırmacı izleyici hedefi.

**E35 — `Cem Münire Mutaf — TRAI ve Türkçe LLM eğitim verisi`**
Hook: *"Türkçe LLM'i eğitmek için veri yok. Bunu çözenle konuştum."*
Outline: TRAI consortium, veri etiketleme protokolleri, ne kadar açık kaynak olacak. Topluluğun nasıl yardım edebileceği.

**E36 — `Cahit Barkın Öztaş — Trendyol AI ekibi nasıl çalışıyor?`**
Hook: *"Türkiye'nin en büyük teknoloji şirketi AI'ı nasıl üretiyor?"*
Outline: Trendyol-LLM'in arkasındaki ekip, hangi GPU'lar, hangi veri seti. Açık kaynak stratejisi. KOBİ'ler için tavsiyeler.

**E37 — `Adem Köymen ile — yapay zeka eğitiminin geleceği`**
Hook: *"AdemKöymen.com'da 200K saat ders izlendi. Pedagoji konuşacağız."*
Outline: Yetişkin AI eğitimi nasıl olmalı, hangi konular yanlış öğretiliyor. OllamaTR eğitim modülü için işbirliği teaser.

**E38 — `İlker Karadağ ile — devlogger gözünden açık kaynak`**
Hook: *"6 yıl önce devlog akımını başlatan adam. Open-source TR sürdürülebilir mi?"*
Outline: Solo geliştirici ekonomisi, sponsorluk vs grant vs bootstrapping, OllamaTR'nin sürdürülebilirlik planı. İzleyiciyi GitHub Sponsors'a davet.

**E39 — `Furkan Gözükara (SECourses) — fine-tuning ustası`**
Hook: *"YouTube'da Türkçe fine-tuning tutorial'ı sayısı: 1. Onu çekenle konuştum."*
Outline: LoRA, QLoRA, full fine-tune ne zaman gerek. Türkçe veri seti hazırlama püf noktaları. İzleyici için ev ödevi: kendi mini fine-tune'u.

**E40 — `Hüseyin Türk (KodlamaTime) — yeni başlayan geliştirici için yol`**
Hook: *"Yapay zekâ devrimine geç kalmadın. Bu video roadmap."*
Outline: Bootcamp mezunu için AI kariyer rotası. Hangi sırayla öğrenilir. OllamaTR'nin öğrenme aracı olarak kullanımı.

**E41 — `Bir kadın AI kurucu — [Doğa Su Çağlayan veya Sertaç Özercan ile teyit]`**
Hook: *"TR AI ekosisteminin görünmez yarısı. Bir kurucunun perspektifi."*
Outline: Sektörel deneyim, finansman engeli, network. OllamaTR'nin women-in-AI bursu duyurusu (varsa).

**E42 — `S05 Finali: 10 kurucudan ortak çıkan 5 sinyal`**
Hook: *"Hepsi farklı sektörden, hepsi aynı 5 şeyi söyledi."*
Outline: Veri eksikliği, fon eksikliği, beyin göçü, akademi-sektör kopukluğu, topluluk fragmentasyonu. OllamaTR'nin her birine yanıtı. S06 teaser.

### Season 06 — Kurumsal (E43–E50)

**E43 — `S06 açılışı: KOBİ'ler için yerel LLM ROI hesabı`**
Hook: *"5 kişilik bir muhasebe şirketinde 14 ayda geri ödüyor."*
Outline: Donanım maliyeti, eğitim, bakım, alternatif (ChatGPT Team) ile karşılaştırma. Excel şablonu indirilebilir.

**E44 — `Çağrı merkezi senaryosu — TR şirket entegrasyonu`**
Hook: *"Bir çağrı merkezi 60 günde 30K dakika transkripti yerelde işledi."*
Outline: Whisper.cpp + LLM özetleme + CRM entegrasyonu. KVKK uyumu nasıl. Sektör (sigorta, telekom, banka) bazlı incelemeler.

**E45 — `Hukuk firması case study — 12 avukatlı ofiste OllamaTR`**
Hook: *"İstanbul'da bir orta ölçek hukuk firması ile 6 ay çalıştık."*
Outline: Dilekçe taslakları, içtihat tarama, müvekkil özetleri. Vekâlet süreleri %22 düştü. Müvekkil mahremiyeti hiç tartışılmadı.

**E46 — `Hastane case study — KVKK + Sağlık Bakanlığı`**
Hook: *"40 yataklı özel hastanede pilot. Çıkardığımız dersler."*
Outline: Epikriz şablonu, hasta sorusu yanıtlama, ilaç etkileşimi sorgu. VERİSİS uyumu. Klinisyen kabul süreci.

**E47 — `Üniversite case study — araştırma asistanı olarak`**
Hook: *"Bir devlet üniversitesi lisansüstü programında pilot."*
Outline: Tez literatür tarama, makale özetleme, intihal kontrolü (etik sınır), Türkçe akademik yazım. YÖK uyumu konuşması.

**E48 — `Üretim/fabrika case study — operasyon kılavuzları`**
Hook: *"Konya'da bir döküm fabrikası — vardiya değişiminde AI özet."*
Outline: SCADA notları, bakım kılavuzları, ISG eğitim dokümantasyonu. Air-gapped sunucu senaryosu. Saha çalışanı yorumu.

**E49 — `Kamu/belediye case study — vatandaş hizmeti`**
Hook: *"Bir ilçe belediyesi vatandaş başvurularını yerelde sınıflandırıyor."*
Outline: KVKK + İçişleri kılavuzları. Başvuru tasnifi, ön yanıt taslağı, performans. Memur eğitim süreci.

**E50 — `S06 ve YIL 1 Finali — OllamaTR yol haritası 2027`**
Hook: *"50 video, 1 yıl, ne öğrendik?"*
Outline: Kullanım metrikleri, topluluk büyüklüğü, dağıtım hedefleri. Yıl 2 hedefleri (mobile, embedded, edu). Topluluğa açık soru: "Sırada ne?"

---

## 3. TR YouTubers — Collaboration Map

| Kişi | Kanal/platform | Reel ask | Format | Mutual benefit | Contact path |
|---|---|---|---|---|---|
| **Eren Gölge** | Coqui kurucusu, ML Twitter aktif (@erogol) | OllamaTR'ye XTTS-v2 entegrasyonu — sesli asistan demo | Ortak canlı: "Türkçe TTS + LLM = yerel ses asistanı" 45dk | Eren: XTTS adoption boost + tekrar TR sahnesinde görünürlük. OllamaTR: ses katmanı + isim itibarı | Twitter DM (önce 2 hafta thoughtful reply trail); fallback: GitHub @erogol issue |
| **İlker Karadağ** | YouTube `İlker Karadağ` (devloglar, ~70K) | "Bir Türk yazılımcının açık kaynak projesi nasıl yaşar?" — OllamaTR sürdürülebilirlik diyalog | Onun kanalında konuk röportaj (45dk) + bizim kanalda 12dk dev-vlog kıyaslama | İlker: open-source topic için içerik (kanal kitlesi seviyor). OllamaTR: 70K developer audience'ına görünürlük | Twitter @ilkermf2 → "kahve içelim" → İstanbul yüz yüze |
| **MAYA** | YouTube `MAYA AI` Türkçe yapay zeka açıklayıcı | "ChatGPT alternatifi yerel çözüm" eğitim videosu — MAYA'nın çekimi | MAYA'nın kanalında 12dk öğretici video (kurulum + ilk model) — sponsorsuz, organik | MAYA: zamanlı konu (KVKK gündemi). OllamaTR: en geniş Türkçe AI seyirci segmenti | YouTube comments + işbirliği e-posta (kanal "İş Birliği" sekmesi) |
| **Erkan Erol** | tech yorumcu, mainstream YouTube ~150K | "AI gizliliği — TR'de durumu" yorumlu video | Onun kanalında 8dk konuşan-kafa kıyaslama (ChatGPT/Claude/OllamaTR). Bizden kısa demo klipler | Erkan: KVKK gündemi click magnet. OllamaTR: mainstream sıçrayış | Menajer/manager kanalı (kanal açıklamasındaki e-posta) — formal teklif PDF |
| **Pat-Pat AI** | yeni yükselen AI eğitim kanalı | "Yeni başlayanlar için OllamaTR" serisi, 3 bölüm | Onun kanalında 3 video serisi (kurulum, model seçimi, prompt). Bizden teknik destek + Discord onboarding | Pat-Pat: stabil partner, "official channel" güveni. OllamaTR: yeni başlayan kitlesine düzenli akış | Discord/Twitter direct, ardından Zoom keşif |
| **Adem Köymen** | YouTube `Adem Köymen` + ademkoymen.com (yapay zeka eğitimleri) | OllamaTR'nin Adem'in eğitim platformuna entegrasyonu — öğrencilere lab tool | 60dk webinar + sonra eğitim modülü (4 video, onun kanalında, bizim sponsorlu) | Adem: müfredatına yenilik. OllamaTR: yetişkin eğitim pazarına dağıtım | LinkedIn → resmi sponsorluk teklifi (eğitim bursu çerçevesi) |
| **Engin Demiroğ** | Kodluyoruz kurucusu, eğitim ekosistemi | Kodluyoruz bootcamp'lerinde OllamaTR atölyesi | Bootcamp içinde 2-saat fiziksel/online atölye, Kodluyoruz kanalında özet video | Engin: müfredata yeni teknoloji. OllamaTR: 5K+ bootcamp mezununa direkt erişim | LinkedIn → Kodluyoruz partnerships e-posta → İstanbul kahve |

**Approach script (kullanılabilir TR taslağı):**
> *"Merhaba [İsim], OllamaTR'yi geliştiriyorum — Ollama'nın Türkçeleştirilmiş, KVKK uyumlu wrapper'ı. Sizin [spesifik video/proje] içeriğinizi gerçekten takip ediyorum çünkü [spesifik detay]. Sizin kitlenize değer katacak [somut format] önerim var — para istemiyorum, sadece denemenizi rica ediyorum. Ücretsiz erken erişim + teknik destek + isterseniz [karşılıklı içerik] sunabilirim. 15 dakikalık bir Zoom'a vaktiniz olur mu?"*

Kural: hiçbir creator'a soğuk DM yok. Önce 2–4 hafta boyunca onların içeriğine **teknik** yorum yap (faydalı, satışsız), sonra yaklaş.

---

## 4. Podcast Circuit — Misafir Çıkma Planı

> Hedef: 6 ayda 6 büyük Türkçe podcast'te misafir, her birinde 60+ dakika konuş.

| Podcast | Host | Pitch hook | Prep | Follow-up |
|---|---|---|---|---|
| **Geek Lounge** | Berk Cebi & ekip | *"ChatGPT'ye 'yapma' diyemiyoruz, çünkü alternatif yoktu. Şimdi var — Türkçe ve yerel."* | OpenAI/Anthropic KVKK risk dökümanı + 3 case study + canlı demo (cihazımda çalıştırırım) | Bölüm sonrası: tartışılan konularda blog yazısı yaz, Geek Lounge'a backlink, dinleyici Discord davet kodu |
| **Software Talks TR** | Sercan Memiş | *"Sıfırdan bir Türkçe AI tooling katmanı kurmak — mimari + sürdürülebilirlik konuşması."* | Mimari diagram (CLI/UI/installer/model registry), GitHub metrikler, hata olarak öğrenilenler | Kod incelemesi davetiyesi, açık kaynak issue listesi, contributor onboarding tour |
| **GitWeber** | Onur Dayıbaşı | *"Yeni başlayanların yapay zekâya girişini kolaylaştırmak — eğitim ve open-source"* | "Bir junior dev nasıl LLM çalıştırır" 5 adımlık çerçeve + canlı demo | Eğitim partnership ekseni, junior dev Discord rolü kuralı |
| **Mucize Doktorlar — yapay zeka episodu** | Dr. Tahir Özakkaş tarzı sağlık podcast'i | *"Klinikte yapay zekâ — hasta verisi cihazda kalır, bu nasıl mümkün?"* | KVKK + VERİSİS uyum dosyası, hekim case study (E19), sade dille teknik açıklama | Hekim odaklı blog yazı dizisi, sağlık sektörü Discord kanalı |
| **Murat Akpınar Podcast** | Murat Akpınar | *"Türkiye'de açık kaynak girişimcilik — para kazanır mı, nasıl yaşar?"* | Açık finansal model (gelir kaynakları, gider, sürdürülebilirlik), bootstrap vs VC tartışması, gerçek rakam | Girişimci ekosistem röportajları için karşılıklı destek, ortak etkinlik |
| **Yiğit Bayramoğlu Podcast** | Yiğit Bayramoğlu | *"Türk yazılımcının kimliği — global ürün mü, yerel ürün mü?"* | Local-first felsefe + globalleşme tezi, Türkçe kullanıcı verisi ve kültürel adaptasyon argümanı | Yıllık recap bölümü, kültür-teknoloji köşesi |

**Genel prep checklist (her podcast öncesi):**
- 3 hikâye prep (1 kişisel, 1 teknik, 1 felsefi) — host hangisini isterse
- 3 quotable cümle (Twitter klip olur)
- 1 canlı demo (5 dakikadan kısa)
- 1 dinleyici hediyesi (özel kupon, ücretsiz danışma, vs.)

**Genel follow-up checklist (her podcast sonrası 72 saat içinde):**
- Episode'u kişisel sosyalde paylaş (host'u tag'le, dinleyici tag'lemeyi unutma)
- Episode'un transkriptini blog yazısı yap → host'a backlink + episode embed
- Dinleyicilere özel landing page (utm parametre ile track)
- Host'a el yazısı teşekkür notu + küçük hediye (kitap, kahve)

---

## 5. Own Podcast — `Yerel` (önerilen ad)

### Karar: Evet, kendi podcast'imiz olmalı. Ama 6. aydan önce başlamamalı.

**Sebep:** İlk 6 ay tüm enerji YouTube'a ve misafir olarak başka podcast'lere gitmeli. Önce dinleyici tabanı, sonra kendi platform. Bunu tersten yapmak yetim podcast üretir.

**Ad:** `Yerel` — tek kelime, ikincil anlamı "place" + "local" (local-first felsefesi).
**Tagline:** *"Cihazda kalan veri. Türkçe konuşan yapay zekâ. Yerel kalanların podcast'i."*

### Format
- **Süre:** 50–70 dakika (Türk dinleyici sweet spot — Spotify Wrapped TR averaj uzunluk)
- **Yapı:** Aç (5dk gündem) → Misafir konuşma (40dk) → Hızlı atış (10dk: en sevdiğin model, en korktuğun risk, yıllık tahmin) → Topluluk sorusu (5dk)
- **Yayın:** Sadece ses (YouTube'a görsel statik versiyon — discoverability için)
- **Frekans:** İlk 6 ay haftada 1 (Çarşamba 07:00 — sabah yolu)
- **Distribution:** Spotify, Apple, Google Podcasts, RSS (kendi domain üzerinden, asla sadece YouTube'a teslim olmamalı)

### İlk 12 bölüm misafir pipeline'ı
1. **E01** — Solo manifesto (kurucu, podcast'in neden var olduğunu açıklar)
2. **E02** — Eren Gölge (Coqui) — Türkçe TTS+LLM geleceği
3. **E03** — Cem Say (Boğaziçi) — AI etiği TR perspektifi
4. **E04** — Cahit Barkın Öztaş (Trendyol) — kurumsal Türkçe LLM
5. **E05** — Av. KVKK uzmanı — yerel AI'ın hukuki çerçevesi
6. **E06** — Furkan Gözükara — fine-tuning ustası
7. **E07** — Dr. Tahir Özakkaş (veya benzer kıdemli hekim) — sağlıkta AI
8. **E08** — Engin Demiroğ (Kodluyoruz) — eğitim ekosistemi
9. **E09** — Bir kamu BT yöneticisi (anonim olabilir) — devlet ve açık kaynak
10. **E10** — Adem Köymen — yetişkin AI eğitimi
11. **E11** — Bir KOBİ patronu (örn. mali müşavir veya muhasebeci) — pratik kullanıcı
12. **E12** — Topluluk maratonu — Discord/GitHub aktif 5 katılımcıyı bir araya getir (panel)

**Misafir kaynağı (öncelik sırası):**
1. YouTube S05 (Kurucular) misafirleri — zaten görüştük, podcast formatına geçer
2. Discord topluluğunun sevdiği kişiler (anket)
3. KVKK / hukuk / sağlık / eğitim alanlarında zaten platform sahibi olanlar
4. Yurt dışındaki TR diasporasındaki AI insanları (Berlin, Londra, SF Türk dev'leri)

---

## 6. Short-form — TikTok / Reels / X / Shorts

**Strateji:** Long-form'un fragmanları değil, **kendi başına ayakta duran 60-saniye Türkçe AI dersleri**. Her short bir tek şey öğretir.

### Content matrix (5 sütun, 4 satır = 20 short tipi şablonu)

| Format → / Tema ↓ | "Korkma" eğitici | "Şok rakam" data | "Test sonucu" canlı | "Hata bulduk" itiraf | "Yorum cevap" topluluk |
|---|---|---|---|---|---|
| **Kurulum** | "Terminal görünce kaçma — 3 komut" | "12 dakikada kuruluyor, ChatGPT'den hızlı" | "Babamın bilgisayarına kurdum (canlı)" | "Antivirüs sandı, çözüm" | "Yorumdan: 'Mac M1'de çalışır mı?'" |
| **Model seçimi** | "8GB RAM'in varsa bu modeli aç" | "0 GB internet, 7B model = saniyede 23 token" | "Llama-3 vs Mistral — aynı 5 soru" | "Yanlış model önerdim, neden" | "Hangi modeli kullanıyorsun? Anket" |
| **KVKK & gizlilik** | "Aydınlatma metni 60 saniyede" | "Bulutsuz işlediğimiz mesaj sayısı: X" | "Hekim arkadaşıma test ettirdik" | "Bir KVKK detayını atlamışım" | "Avukat dinleyiciden cevap" |
| **Pratik kullanım** | "Outlook e-mail'i nasıl Türkçe özetlerim" | "Bir günde tasarruf: 84 dakika" | "Excel formülünü Türkçe sordum, yazdı" | "Bir KOBİ deneyinde takıldığımız yer" | "İzleyici sorusu: 'Sözleşme okutabilir miyim?'" |

**Rules of the road:**
- **İlk 1 saniye Türkçe söz + hareket** (algoritmik sweet spot)
- **Yatay metin overlay zorunlu** (sessiz izleyici %85)
- **Kapanış CTA tek satır:** "Detayı kanalda" + URL bar yok (link yorumda)
- **Hashtag disiplini:** `#OllamaTR #YapayZeka #YerelAI #KVKK #TürkçeYazılım` — daha fazla değil
- **Cross-post:** Aynı içerik TikTok + Reels + Shorts + X Video. X için altyazı zorunlu (X'in CC otomatiği zayıf).

**Cadence:** 3 short / hafta sürdürülebilir. 7 / hafta vaat etme, vermeyi başaramazsın → algoritma cezası.

---

## 7. Production Stack — TR-Affordable

### Recommended stack (tamamı ücretsiz/açık kaynak veya TR-bütçesi içinde)

| Katman | Araç | Lisans/Bedel | Neden |
|---|---|---|---|
| **Video çekim** | Sony ZV-E10 (kit lens) + Lavalier mic + iPhone 13 backup | TL bütçesinde ikinci el ~14K | Yıllarca kullanılır, satılırsa %70 değer korur |
| **Ses çekim** | RØDE Wireless GO II (2x) + USB-C audio interface | ~8K TL | Konuk röportajı kalitesi (podcast misafir olunca da yanında götür) |
| **Aydınlatma** | Aputure AL-MX (1) + softbox modifier + pencere ışığı | ~3K TL | Tek hard key + doğal fill — set kurulumu hızlı |
| **Ekran kaydı** | **OBS Studio** | Açık kaynak — ücretsiz | Endüstri standardı, plugin ekosistemi geniş |
| **Video kurgu** | **DaVinci Resolve (free)** | Ücretsiz | Adobe Premiere alternatifi, renk grading dünya klasında. Studio sürüm gerekirse 360 USD tek seferlik (Adobe abonelik değil) |
| **Ses kurgu** | **Audacity** (basit) veya **Reaper** (60 USD lisans, ömür boyu) | Ücretsiz / 60 USD | Reaper'ın TR podcast topluluğunda standardı yüksek |
| **Transkript & altyazı** | **Whisper.cpp** (yerel, Türkçe) | Açık kaynak | Kendi ürünümüz felsefesi — bulut kullanmıyoruz |
| **Thumbnail tasarımı** | **Figma** (ücretsiz tier) veya Affinity Designer (~1500 TL tek seferlik) | Ücretsiz / 1500 TL | Adobe yerine TL-friendly |
| **Podcast hosting** | **Buzzsprout** (12 USD/ay) veya **Spotify for Podcasters/Anchor** (ücretsiz) | 0–12 USD/ay | Anchor ücretsiz ama dağıtım kontrolü zayıf. Buzzsprout RSS sahipliği + analytics doğru, küçük bir ek bedele değer |
| **Müzik & SFX** | **Epidemic Sound** (15 USD/ay) veya CC-BY ücretsiz | 0–15 USD/ay | Telif sorunu = YouTube monetizasyon ölümü |
| **Stok görsel** | Pexels + Unsplash (ücretsiz) | Ücretsiz | TR'li görsel için bedava yeter |
| **YouTube SEO** | **TubeBuddy** (ücretsiz tier yeter ilk yıl) | Ücretsiz | Tag/competitor research |
| **Episode notları & topluluk** | **Discord** + **GitHub Discussions** | Ücretsiz | Zaten OllamaTR community'sinin merkezi |

### Year-1 budget (toplam)

| Kalem | Tutar (TL) | Tutar (USD eşdeğer ~32 TL/USD) |
|---|---|---|
| Donanım (kamera, mic, ışık, ikinci el ağırlıklı) | 25.000 TL | ~780 USD |
| Yazılım lisansları (Reaper + Buzzsprout 12ay + Epidemic 12ay + ihtiyat) | 12.000 TL | ~375 USD |
| Stüdyo akustik (Auralex paneller, akustik halı, perde) | 8.000 TL | ~250 USD |
| Konuk seyahatleri (İstanbul-Ankara-İzmir trenle, 8 trip varsayım) | 16.000 TL | ~500 USD |
| Thumbnail freelancer (haftalık 1 hzırlık, ayda ~3000 TL × 12) | 36.000 TL | ~1.125 USD |
| Mini reklam testleri (YouTube Ads $200 + Spotify Ads $200) | 13.000 TL | ~400 USD |
| Çeşitli (web hosting, podcast website, asset yedekleme) | 10.000 TL | ~310 USD |
| **TOPLAM (Yıl 1)** | **~120.000 TL** | **~3.750 USD** |

**Ek not:** Bu bütçe **solo + 1 part-time editor** modelini varsayar. Yıl 2 büyüme için aylık editor + thumbnail tasarımcı + topluluk yöneticisi (2.5 kişi takım) ~80.000 TL/ay'a çıkar — o noktada sponsorluk + KOBİ lisansı + danışmanlık geliriyle desteklenir, organik öncesi şişirilmemeli.

---

## Özet (1 paragraf)

OllamaTR'nin içerik motoru, Türk dijital ekosisteminin **AI gizliliği boşluğunu** tek Türkçe referans olarak doldurmak üzere kurulur: haftada 1 long-form YouTube + 3 short + ayda 1 podcast misafirlik + 6 ay sonra başlayacak kendi `Yerel` podcast'i şeklinde, design-read.md'nin sakin/yoğun-anlamlı estetiğine sadık (anti-MrBeast thumbnail, anti-cliché jingle). 50 bölümlük 6 sezonluk plan kurulumdan KVKK'ya, yaşam deneyinden 10 TR AI kurucusuyla röportaja, oradan kurumsal case study'lere ilerler ve her sezon kendi finalini topluluğa açık bir soruyla bağlar. Yedi seçili TR yaratıcı (Eren Gölge, İlker Karadağ, MAYA, Erkan Erol, Pat-Pat AI, Adem Köymen, Engin Demiroğ) ve altı seçili TR podcast (Geek Lounge, Software Talks TR, GitWeber, Mucize Doktorlar AI episodu, Murat Akpınar, Yiğit Bayramoğlu) önce 2–4 haftalık otantik içerik etkileşimi ardından somut, karşılıklı değer içeren tekliflerle yaklaşılır. Tüm üretim stack'i OBS + DaVinci Resolve free + Whisper.cpp + Buzzsprout etrafında ~120K TL Yıl-1 bütçesiyle solo+1 editör modeline kalibre edilir, böylece sürdürülebilirlik organik büyümeden önce gelmez.

**STOP**
