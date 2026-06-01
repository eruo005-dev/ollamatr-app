# OllamaTR x TR Academia — B2 Partnership Playbook

**Mission:** Become THE Türkçe AI infrastructure layer for Turkish universities.
**Surface:** https://ollamatr-app.vercel.app
**Author:** B2 (academic-partnerships lead)
**Date:** 2026-06-01
**Status:** Working doc — outreach can begin M0 (June 2026)

---

## Strategic frame

TR academia in 2025–2026 has crossed a threshold. Five labs have shipped real Turkish models or benchmarks in the last 12 months (TURNA, Cetvel, Mukayese, Cosmos T1, BUCOLIN historical Turkish). They share three pain points:

1. **Compute scarcity** — even KUIS got Leonardo BOOSTER nodes via competitive EuroHPC; small labs run on shared A100s or none.
2. **Distribution void** — fine-tunes die on Hugging Face with 12 downloads because there's no Turkish-first discovery surface.
3. **KOBİ/regulated-vertical translation gap** — labs write papers; banks, hastaneler, hukuk firmaları don't know the models exist.

OllamaTR sits exactly on points 2 and 3. We host the catalog, surface the fine-tunes in Türkçe with vertical filters (sağlık, finans, hukuk, eğitim, savunma), and route enterprise pilots back to the originating lab as paid research consults. Compute (point 1) we broker through partner clouds (Aselsan/HAVELSAN GPU, Turkcell hyperscale, AWS Istanbul region credits, EuroHPC slots).

The deal in one sentence: **"You ship the model. We make it the default Türkçe choice for every TR developer, KOBİ, and regulated vertical. Royalty share on enterprise pilots, byline on co-authored papers, intern pipeline both ways."**

---

## 1. İTÜ NLP — Istanbul Technical University

### Faculty leads
- **Prof. Dr. Gülşen Eryiğit** — group coordinator, EACL 2026 Industry Track Co-Chair (with Nikos Aletras/Amazon, Yevgen Matusevych/Groningen). The single most strategic Türkçe NLP relationship in the country.
- **Doç. Dr. A. Cüneyd Tantuğ** — senior member, member of NLP-Turkic 2025 PC.
- Active PhD/MS pipeline: Dilara Torunoğlu Selamet, Bora Şenceylan, Barış Bilen, Yunus Karatepe, Mehmet Utku Çolak, Özge Umut, Mert Suluk, Doğukan Arslan, Atakan Site (EACL 2026 Rabat delegation).

### Recent publications
- **CorefInst: Leveraging LLMs for Multilingual Coreference Resolution** (Pamay Arslan & Erol, TACL 2025) — Türkçe-içeren, multilingual; perfect catalog candidate.
- **Admire 2 Shared Task** at EACL 2026 (ITUNLP + Exeter + Minas Gerais) — Türkçe figurative-language benchmark.
- Industrial NLP applications in telekom, bankacılık, hukuk (group's own positioning).

### What we OFFER İTÜ
- **Permanent catalog slot** at `ollamatr.app/itu-nlp` — every CorefInst checkpoint, every BLG 505 student-shared-task submission becomes a publicly indexable, Türkçe-described, downloadable Modelfile in one click.
- **Compute brokerage:** 5,000 GPU-hours/yr via our Turkcell/Aselsan partner pool, allocated by Eryiğit to her PhDs.
- **EACL 2026 sponsorship slot** — modest cash (₺75K), branded "Türkiye's open-source Türkçe AI hub," reciprocal logo on her industry-track page.
- **Telecom/banking/hukuk pilot deal flow** — when a KOBİ asks us "Türkçe coreference için ne kullanmalıyım," we route a paid POC back to İTÜ NLP via a 70/30 split (lab/us).

### What we ASK
- Eryiğit endorsement quote on `ollamatr.app/about` ("Türkçe NLP topluluğunun beklediği dağıtım altyapısı").
- Two MS interns/semester onto OllamaTR (paid via TÜBİTAK 2209-A or our own stipend).
- CorefInst + Admire 2 winning models hosted exclusively on OllamaTR first 30 days.
- Co-author byline on our forthcoming whitepaper: *"Türkçe LLM dağıtımının ekonomisi: 2026 sahası."*

### Outreach email (formal Türkçe)
```
Konu: OllamaTR x İTÜ NLP — Türkçe yapay zekâ altyapısı için stratejik iş birliği önerisi

Sayın Prof. Dr. Eryiğit,

Öncelikle EACL 2026 Industry Track Eşbaşkanlığınız için tebriklerimi
sunarım — Türkçe doğal dil işleme topluluğunun uluslararası görünürlüğü
açısından son derece kıymetli bir görev üstlendiniz.

Ben OllamaTR ekibinden [İsim]. Kurduğumuz platform (ollamatr-app.vercel.app),
Türkçe açık kaynak büyük dil modellerini geliştiriciler, KOBİ'ler ve
düzenlemeye tabi sektörler (sağlık, finans, hukuk) için tek noktadan
erişilebilir kılmayı hedefliyor.

Sizinle üç somut başlıkta görüşmek istiyoruz:

1. CorefInst ve İTÜ NLP'nin diğer modellerinin OllamaTR kataloğunda
   kalıcı bir vitrin ile yer alması.
2. Grubunuzun doktora öğrencileri için yıllık 5.000 GPU-saat hesaplama
   kotası (partner bulut sağlayıcılarımız üzerinden).
3. EACL 2026 Industry Track için kurumsal sponsorluk değerlendirmesi.

Önümüzdeki üç hafta içinde Sarıyer kampüsünde 45 dakikalık bir
görüşmeye uygunluğunuzu rica ederim. Takviminize göre teklif notunu
önceden iletebilirim.

Saygılarımla,
[İsim]
OllamaTR — Akademik İş Birlikleri
```

### Semester rhythm
- **Güz 2026:** Hands-on workshop "OllamaTR üzerinde model yayınlama" — BLG 505 misafir ders, 2 saat.
- **Bahar 2027:** OllamaTR Türkçe LLM Hackathon, İTÜ Maslak ev sahipliğinde, ₺250K toplam ödül, jüri Eryiğit + Tantuğ + 2 sanayi.
- **Yaz 2027:** 6 lisans intern, 3 ay, KOBİ vertikal co-pilot prototip.
- **Tez teklifleri:** "Open-source Türkçe LLM dağıtım ekosisteminin ekonometrisi" (MS), "Production-grade Türkçe coreference servisi" (PhD).

### Mutual deliverables timeline
- **M1 (Tem 2026):** Eryiğit endorsement, CorefInst catalog go-live, MOU imzalı.
- **M3 (Eyl 2026):** İlk 2 MS intern başlar; EACL sponsor anonsu; BLG 505 workshop.
- **M6 (Ara 2026):** İlk KOBİ POC (bankacılık coreference) İTÜ NLP'ye yönlendirilmiş, ₺120K+ gelir paylaşımı; ortak whitepaper yayımlanır.

---

## 2. Boğaziçi — TABILAB + BUCOLIN

### Faculty leads
- **Prof. Dr. Tunga Güngör** — TABILAB veteran, TURNA paper senior author, NLP-Turkic 2025 PC.
- **Prof. Dr. Arzucan Özgür** — TABILAB, bioinformatics-NLP intersection (medical Turkish opportunity).
- **Prof. Dr. Suzan Üsküdarlı** — TURNA co-author.
- **Doç. Dr. Şaziye Betül Özateş** — BUCOLIN lead, founded 2023, historical Turkish NLP.
- **Onur Güngör, Onur Uludoğan, Çağrı Balal, Aysel Akkurt, Burak Türker** — TURNA authors (some now in industry — pipeline).
- BUCOLIN PhDs: Dilara Zeynep Gürer (NAACL SRW 2025 Best Thesis), Ece Elif Adak (SMM4H 2025 winner), Tarık Emre Tıraş, Berat Doğan, Fatih Burak Karagöz, Efe Eren Genç, Esma F. Bilgin Taşdemir.

### Recent publications
- **TURNA: A Turkish Encoder-Decoder Language Model** (Findings ACL 2024) — UL2 mimari, halen en büyük Türkçe encoder-decoder.
- **Building Foundations for Historical Turkish NLP** (arXiv 2501.04828, Ocak 2025) — fine-tuned BERTurk for Ottoman/historical Turkish.
- **HuggingFace BUCOLIN releases** (Ocak 2025) — datasets + models.
- **UD Turkish BOUN treebank** — 9.7K sentences, canon kaynak.

### What we OFFER
- **TURNA-as-a-service** — OllamaTR'de tek-tıkla deploy edilen Modelfile + KOBİ-için-Türkçe doküman.
- **Historical Turkish vertical** — Vakıflar Genel Müdürlüğü, devlet arşivleri, akademik tarih bölümleri için BUCOLIN modellerini paketleyip satma (gelir paylaşımı 70/30 BUCOLIN'e).
- **Medical Turkish bridge** — Özgür grubunun bio-NLP işini Acıbadem ADALAB ile köprüleme (üçlü iş birliği avantajı).

### What we ASK
- TURNA v2 fine-tunes önce OllamaTR'de yayımlansın.
- BUCOLIN'in HuggingFace mirror'ı OllamaTR kataloğuna sync.
- Bir Boğaziçi MS intern güz dönemi (model-card otomasyonu projesi).
- Veri Bilimi ve YZ Yüksek Lisans programının (DSAI) misafir dersi: "Türkçe model dağıtımı production'da."

### Outreach email (formal Türkçe)
```
Konu: OllamaTR x Boğaziçi TABILAB & BUCOLIN — Türkçe model dağıtımı iş birliği

Sayın Prof. Dr. Güngör,

TURNA modelinin Türkçe NLP topluluğu için yarattığı dönüşümü ve
TABILAB ile BUCOLIN'in 2025'te ortaya koyduğu üretkenliği büyük bir
takdirle izliyoruz. Bilhassa Doç. Dr. Özateş'in tarihi Türkçe modelleri
ve Doç. Dr. Özgür'ün biyomedikal-Türkçe çalışmaları, Türkiye'nin
"low-resource" anlatısını tersine çevirme potansiyeli taşıyor.

OllamaTR olarak (ollamatr-app.vercel.app), tam da bu modellerin
geliştirici ekosistemine, KOBİ'lere ve düzenlemeye tabi sektörlere
ulaşmasında yaşanan "dağıtım boşluğunu" kapatmayı hedefliyoruz.

Bir görüşme için aşağıdaki üç başlığı önereceğim:

1. TURNA ve gelecek versiyonlarının OllamaTR'de birinci-sınıf
   konumlandırılması (özelleşmiş landing page, tek-tıkla Türkçe
   dokümantasyon).
2. BUCOLIN'in tarihi Türkçe modellerinin devlet arşivleri ve akademik
   tarih kullanıcılarına paketlenmiş ürün olarak sunulması (gelir
   paylaşımı 70/30, BUCOLIN lehine).
3. DSAI Yüksek Lisans programı kapsamında bir misafir ders ve
   yıllık 1 araştırma görevlisi stipendi (₺ aylık eşdeğeri TÜBİTAK
   2211-A) sponsorluğu.

Görüşme talebimizi değerlendirmenizi rica ederim.

Saygılarımla,
[İsim]
```

### Semester rhythm
- **Güz 2026:** TURNA-on-OllamaTR launch event Boğaziçi Güney Kampüs, davetli sanayi (Akbank, Garanti BBVA, Trendyol).
- **Bahar 2027:** BUCOLIN x Vakıflar GM ortak demosu (tarihi Türkçe OCR + LLM pipeline).
- **Yaz 2027:** Boğaziçi MS interns, model-card otomasyon ve historical-Turkish vertical lansmanı.

### Mutual deliverables timeline
- **M1:** MOU + TURNA catalog premium-slot live.
- **M3:** BUCOLIN historical-Turkish vertical landing page; ilk arşiv kurumu pilotu konuşmaları.
- **M6:** TURNA v2 (varsa) OllamaTR-exclusive 30-gün; tarihi-Türkçe verticalde ilk ₺ getirisi; ortak ACL 2027 başvurusu hazırlanır.

---

## 3. KUIS AI — Koç Üniversitesi

### Faculty leads
- **Prof. Dr. Deniz Yuret** — Founding PI, derin öğrenme + dil; Türkiye AI'ının kurucu isimlerinden.
- **Doç. Dr. Aykut Erdem** — Vision-language, Cetvel co-author; TOBB ETÜ misafir seminer veriyor (cross-school köprü).
- **Doç. Dr. Gözde Gül Şahin** — GGLab kurucu, şimdi FAU Erlangen-Nürnberg'de affiliated; Cetvel co-author (uluslararası köprü değerli).
- **PhDs:** Yakup Abrek Er, İlker Kesen, Ali Gebeşçe (COLING 2025).

### Recent publications
- **Cetvel benchmark** (arXiv 2508.16431, Ağu 2025) — Türkçe için 7 kategori, 23 görev birleşik benchmark.
- **Mukayese** — Türkçe NLP benchmark suite.
- **Quantifying Divergence for Human-AI Collaboration** (CHI 2025, GGLab).
- **Zero-Shot Open-Vocabulary Pipeline for Dialogue** (NAACL 2025).
- $50K Google Cloud Credit + 3,500 EuroHPC node hours grant.

### What we OFFER
- **Cetvel resmi runner** — OllamaTR her yeni modeli otomatik Cetvel'de değerlendirir, sıralama leaderboard'unu host eder. Bu, KUIS için "de facto Türkçe LLM eval otoritesi" konumunu pekiştirir.
- **Compute eşleştirme** — Google Cloud + EuroHPC'lerine ek olarak Aselsan/HAVELSAN GPU saatleri.
- **GGLab uluslararası köprü** — Şahin'in FAU Erlangen pozisyonu üzerinden Almanya DE-Türk endüstri köprüsü.

### What we ASK
- Cetvel'in resmi "official deployment partner" rozetini OllamaTR'ye verme.
- KUIS'in Türkçe modellerinin OllamaTR'de premium konumlandırılması.
- Yuret + Erdem'den endorsement (3 cümle yeter).
- Yılda 1 KUIS PhD intern (Cetvel leaderboard'unu OllamaTR altyapısına entegre).

### Outreach email (formal Türkçe)
```
Konu: OllamaTR x KUIS AI — Cetvel'in resmi dağıtım partneri olma teklifi

Sayın Prof. Dr. Yuret,

KUIS AI Lab'in Türkiye yapay zekâ ekosisteminde üstlendiği kurucu rolü
ve Doç. Dr. Şahin'in liderliğinde geliştirilen Cetvel benchmark'ının
Türkçe LLM değerlendirmesinde standart hâline gelişini büyük bir
ilgiyle izliyoruz.

OllamaTR ekibi olarak (ollamatr-app.vercel.app), Türkçe açık kaynak
LLM kataloğunu geliştirici ve KOBİ kullanıcılarına tek bir noktadan
sunuyoruz. Cetvel ile yapısal bir iş birliği öneriyoruz:

1. OllamaTR kataloğundaki her modelin otomatik Cetvel değerlendirmesine
   tabi tutulması ve resmi leaderboard'un OllamaTR üzerinde host
   edilmesi.
2. KUIS AI'ın model yayınlarının kataloğumuzda öne çıkarılması.
3. Compute kaynak takviyesi (partner bulut sağlayıcılarımız üzerinden
   yıllık 8.000 GPU-saat ek tahsisat).
4. Yıllık 1 doktora araştırma stajı (Cetvel-OllamaTR entegrasyon
   altyapısı üzerinde).

Sarıyer kampüsünde veya çevrim içi 30 dakikalık bir görüşme için
takviminizdeki uygun zamanları paylaşabilirseniz teşekkür ederim.

Saygılarımla,
[İsim]
```

### Semester rhythm
- **Güz 2026:** Cetvel-on-OllamaTR launch + leaderboard go-live.
- **Bahar 2027:** "Türkçe LLM Olimpiyatı" — OllamaTR + KUIS ortak, 3 ay açık değerlendirme yarışı.
- **Yaz 2027:** PhD intern Cetvel automasyon işini bitirir.

### Mutual deliverables timeline
- **M1:** Cetvel "official deployment partner" MOU; leaderboard alt-domain (`cetvel.ollamatr.app`) canlı.
- **M3:** Otomatik nightly eval pipeline çalışıyor; ilk 50 model değerlendirilmiş.
- **M6:** Türkçe LLM Olimpiyatı duyurusu; KUIS yeni model release'i OllamaTR-exclusive.

---

## 4. ODTÜ NLP / METU

### Faculty leads
- **Doç. Dr. Çağrı Toraman** — Applied NLP Group lider; en üretken 2025-2026 Türkçe LLM araştırmacısı (TurkBench, BIRDTurk, RAGTurk, FIBER, OpenEthics, low-resource benchmark quality).
- **Prof. Dr. Pınar Karagöz** — data mining + big data; LLM-graph köprüsü.
- **PhD/MS pipeline:** Ahmet Kaan Sever, Ayşe Aysu Cengiz, Burak Aktas, Mehmet Can Baytekin, Süha Kağan Köse, Burak Erinç Çetin, Yıldırım Özen, Elif Naz Demiryılmaz, Kaan Engür, Evren Ayberk Munis, Deniz Yılmaz.
- $80K Google Cloud Credits granted.

### Recent publications
- **TurkBench** (arXiv 2601.07020, Oca 2026) — Toraman et al.
- **BIRDTurk** (arXiv 2602.03633, Şub 2026) — Türkçe text-to-SQL.
- **RAGTurk** — Türkçe RAG best practices.
- **OpenEthics** (arXiv 2505.16036, May 2025) — open-source LLM etik değerlendirmesi.
- **FIBER** (arXiv 2512.11110, Ara 2025) — multilingual factual inference bias.
- **Evaluating Benchmark Dataset Quality for Low-Resource: A Case Study on Turkish** (ACL 2025 Workshop).

### What we OFFER
- **TurkBench leaderboard host** (Cetvel ile birlikte ikinci resmi eval kanalı).
- **BIRDTurk → KOBİ ürünü** — Türkçe NL→SQL'i e-ticaret/restoran/CRM KOBİ'lerine paketle, 70/30 gelir paylaşımı ODTÜ'ye.
- **RAGTurk → kurumsal RAG paketleme** — finans/hukuk/sağlık dikeylerinde.

### What we ASK
- Toraman'ın grubu OllamaTR'yi "preferred deployment platform" olarak ilan etsin.
- Yılda 2 MS intern (RAG, eval automation).
- Co-author byline tüm OllamaTR-research yayınlarında.
- Ankara'da ODTÜ bünyesinde yıllık OllamaTR Dev Day.

### Outreach email (formal Türkçe)
```
Konu: OllamaTR x METU Applied NLP — TurkBench, BIRDTurk ve RAGTurk için dağıtım iş birliği

Sayın Doç. Dr. Toraman,

2025-2026 döneminde grubunuzun yayımladığı TurkBench, BIRDTurk,
RAGTurk, OpenEthics ve FIBER çalışmaları, Türkçe büyük dil modeli
ekosistemine değerlendirme metodolojisi açısından gerçek anlamda
"infrastructure" katkısı sundu. Bu üretkenlik, Türkiye'deki tek bir
araştırma grubundan beklenenin oldukça üzerinde.

OllamaTR ekibi olarak (ollamatr-app.vercel.app), bu altyapı katkısının
geliştirici ve KOBİ uygulamalarına dönüşmesinde köprü olmak istiyoruz:

1. TurkBench leaderboard'unun OllamaTR üzerinde resmi host edilmesi.
2. BIRDTurk'ün KOBİ-ölçek bir ürün olarak paketlenmesi (CRM/e-ticaret
   doğal dil sorgulama), %70 gelir paylaşımı grubunuza.
3. RAGTurk best practices'in kurumsal RAG dikeylerinde (finans, hukuk,
   sağlık) ortak go-to-market yapısı.
4. Yılda 2 yüksek lisans araştırma stajı ve ortak yayın imza hakkı.
5. ODTÜ ev sahipliğinde yıllık "OllamaTR Ankara Dev Day."

Çankaya'da veya çevrim içi 30 dakikalık bir görüşme için
müsait olacağınız bir tarihi rica ediyorum.

Saygılarımla,
[İsim]
```

### Semester rhythm
- **Güz 2026:** TurkBench leaderboard go-live; OllamaTR Ankara Dev Day v1 (200 katılımcı).
- **Bahar 2027:** BIRDTurk KOBİ ürünü beta; 5 pilot müşteri.
- **Yaz 2027:** MS interns RAGTurk-kurumsal-paketleme bitirir.

### Mutual deliverables timeline
- **M1:** Toraman endorsement + TurkBench MOU.
- **M3:** TurkBench leaderboard alt-domain canlı; BIRDTurk demo.
- **M6:** İlk BIRDTurk KOBİ paid pilot ($5K MRR); RAGTurk kurumsal pilot finans dikeyinde.

---

## 5. Bilkent CS

### Faculty leads
- **Prof. Dr. Selim Aksoy** — CENG Department Chair, computer vision; karar verici makam (kurumsal MOU yetkisi).
- **Prof. Dr. Hakan Ferhatosmanoğlu** — büyük veri sistemleri, ölçeklenebilir analitik; OllamaTR altyapı tarafı için doğal eş.
- **Asst. Prof. Dr. Shervin R. Arashloo** — CV, ML.
- **Prof. Dr. Cevdet Aykanat** — HPC for ML, tensor decomposition, GNN training; compute-tarafı için altın ortak.
- **Prof. Dr. Fazlı Can** — IR, data mining.
- **Doç. Dr. Pınar Duygulu Şahin, Doç. Dr. Ayşegül Dündar, Asst. Prof. Sinem Sav, Asst. Prof. Anıl Koyuncu, Asst. Prof. Eray Tüzün** — TÜBİTAK Career Award sahipleri.
- **Tarihsel/efsane:** Prof. Kemal Oflazer (şimdi CMU Qatar) — Türkçe NLP'nin kurucu ismi, danışman olarak yaklaşılabilir.

### Recent publications
- Aksoy: computer vision, remote sensing, medical image (>4.6K atıf).
- Aykanat: HPC for ML — tensor decomposition, matrix completion, SGD parallelization, GNN training, hypergraph partitioning.
- Bilkent'in geleneksel gücü altyapı + algoritma, salt LLM değil.

### What we OFFER
- **HPC research line** — Aykanat grubuyla "Türkçe LLM training infrastructure" üzerine ortak yayın hattı (NeurIPS/MLSys hedefli).
- **Ankara coğrafi avantaj** — ODTÜ + Bilkent + TOBB ETÜ üçgeninde aylık "Ankara AI altyapı round table."
- **CV-NLP köprü** — Aksoy/Dündar/Şahin grubu ile multi-modal Türkçe (sağlık görüntü + Türkçe rapor üretimi).

### What we ASK
- Bilkent'in OllamaTR'ye "preferred student internship destination" statüsü vermesi (CS390/CS490 projeleri).
- Aykanat grubuyla 1 PhD ortak danışmanlık (OllamaTR sanayi katkısı).
- Aksoy'dan dekan-onaylı MOU.

### Outreach email (formal Türkçe)
```
Konu: OllamaTR x Bilkent CS — Türkçe LLM altyapısı için ortak araştırma ve staj programı

Sayın Prof. Dr. Aksoy,

Bilkent Bilgisayar Mühendisliği Bölümü'nün son dönemde TÜBİTAK
Kariyer Ödülleri'nde aldığı yedi ödül ve bölümün altyapı-algoritma
geleneği, OllamaTR'nin Türkçe yapay zekâ dağıtım altyapısı vizyonu
için doğal bir akademik ortak konumu işaret ediyor.

Bölüm Başkanı sıfatınızla, üç başlıkta bir görüşme talep ediyoruz:

1. Prof. Dr. Cevdet Aykanat grubu ile "Türkçe LLM training için
   ölçeklenebilir HPC" ekseninde ortak araştırma hattı (NeurIPS/MLSys
   hedefli ortak yayınlar).
2. CS390/CS490 lisans araştırma projeleri için OllamaTR'nin
   "tercih edilen staj ortağı" statüsü (yıllık 6-8 lisans öğrencisi).
3. Bilkent CENG ile dekan onaylı bir kurumsal Mutabakat Zaptı.

Önümüzdeki üç hafta içinde Bilkent kampüsünde 45 dakikalık bir
görüşmeye uygunluğunuzu rica ederim.

Saygılarımla,
[İsim]
```

### Semester rhythm
- **Güz 2026:** Aykanat ortak araştırma kick-off; CS390 proje listesinde 3 OllamaTR konusu.
- **Bahar 2027:** Ankara AI Altyapı Round Table (ODTÜ + Bilkent + TOBB ETÜ ortak, OllamaTR sponsor).
- **Yaz 2027:** 6 Bilkent lisans intern, KOBİ vertical projeleri.

### Mutual deliverables timeline
- **M1:** Aksoy MOU + ilk Aykanat görüşmesi.
- **M3:** İlk Aykanat ortak makale draft (HPC + Türkçe LLM); CS390 dönem-içi 3 proje başladı.
- **M6:** MLSys 2027 başvurusu submitted; CS490 senior projesi OllamaTR demo'su yapar.

---

## 6. Sabancı — VERIM + BAVLAB + ilgili NLP

### Faculty leads
- **Prof. Dr. Berrin Yanıkoğlu** — VERIM (Center of Excellence in Data Analytics) Founding Director; Türkçe sentiment, hate speech, handwriting recognition; senior anchor.
- **Asst. Prof. Dr. Reyyan Yeniterzi** — NLP, IR, deep learning; şimdi paralel olarak GenAIus Technologies'te; NLP-Turkic 2025 PC; "academia-industry köprüsü" zaten kurulu.
- **Prof. Dr. Selim Balcısoy** — BAVLAB direktörü; transformer-NER + graph-NLP Ottoman/Byzantine arşiv (Vakıflar GM, tarihi arşiv köprüsü).
- **İnanç Arın** — NLP-Turkic 2025 PC.
- **Süveyda Yeniterzi (GenAIus)** — kardeş şirket bağlantısı.

**Not:** "VPA Lab" aslında **Computer Vision and Pattern Analysis Laboratory** (Prof. Aytül Erçil kurdu, 2001) — NLP değil CV. Brief'te "VPA Lab" olarak geçen kısım, en yakın NLP eşi olan **VERIM + BAVLAB**'a yönlendirildi. Gerçek ihtiyaç CV ise VPA da ek modül olarak eklenir.

### Recent publications
- TURNA paper Boğaziçi-Sabancı geniş ortaklığı içeriyor (Üsküdarlı dahil).
- Yanıkoğlu: Türkçe sentiment (Cambridge NLE), hate speech tweet datasetleri, SARE demosu.
- Balcısoy: graph-based NLP for Ottoman/Byzantine archival entity extraction, transformer NER + GNN.

### What we OFFER
- **GenAIus-OllamaTR-Sabancı üçgeni** — Yeniterzi'nin paralel pozisyonu sayesinde "akademi → girişim → dağıtım" ekosistemini formel çerçeveye otur.
- **Ottoman/Byzantine arşiv ürünü** — Balcısoy'un pipeline'ını OllamaTR Tarihi Türkçe vertical'ında BUCOLIN ile yan yana satma (üçlü gelir paylaşımı).
- **VERIM-OllamaTR ortak laboratuvar** — Yanıkoğlu çatısı altında "Türkçe LLM Üretim Lab'ı" kurma teklifi.

### What we ASK
- Yanıkoğlu endorsement + VERIM ortak laboratuvar protokolü.
- Yıllık 2 PhD intern (Yeniterzi + Balcısoy gruplarından).
- BAVLAB Ottoman NER modelinin OllamaTR-exclusive katalog girişi.

### Outreach email (formal Türkçe)
```
Konu: OllamaTR x Sabancı VERIM — Türkçe LLM Üretim Lab'ı ortak protokolü teklifi

Sayın Prof. Dr. Yanıkoğlu,

Veri Analitiği Mükemmeliyet Merkezi (VERIM) kurucu direktörlüğünüz
ve Türkçe sentiment, hate speech ve handwriting tanıma alanlarındaki
öncü çalışmalarınız, Türkçe NLP ekosisteminin omurgasını oluşturan
çalışmalardan.

OllamaTR ekibi olarak (ollamatr-app.vercel.app) somut üç teklifle
geliyoruz:

1. VERIM çatısı altında ortak yapılandırılmış "Türkçe LLM Üretim
   Lab'ı" — model fine-tuning, eval, ve dağıtım sürecini akademi-sanayi
   köprüsünde kurumsallaştıracak.
2. Doç. Dr. Yeniterzi'nin (akademi + GenAIus paralel pozisyonu)
   ve Prof. Dr. Balcısoy'un (BAVLAB Ottoman/Byzantine arşiv pipeline'ı)
   gruplarıyla yıllık 2 doktora araştırma stajı.
3. BAVLAB'ın Osmanlı NER + graph entity extraction modelinin OllamaTR
   Tarihi Türkçe dikeyinde Boğaziçi BUCOLIN ile birlikte üçlü ortaklık
   altında paketlenmesi.

Tuzla kampüsünde veya çevrim içi 45 dakikalık bir görüşme için
takviminizdeki uygun zamanları paylaşırsanız teşekkür ederim.

Saygılarımla,
[İsim]
```

### Semester rhythm
- **Güz 2026:** VERIM Türkçe LLM Üretim Lab'ı kuruluş anlaşması.
- **Bahar 2027:** Yeniterzi + Balcısoy PhDs OllamaTR'de saha.
- **Yaz 2027:** Ottoman NER ürünü Vakıflar GM'e pilot.

### Mutual deliverables timeline
- **M1:** VERIM protokolü imzalı; Yanıkoğlu endorsement.
- **M3:** İlk 2 PhD intern başlar; Ottoman vertical landing page.
- **M6:** Vakıflar GM ile pilot anlaşması; ortak SIGIR/EMNLP 2027 başvurusu.

---

## 7. TOBB ETÜ — Ankara

### Faculty leads
- **Asst. Prof./Doç. (TOBB ETÜ AI Engineering Bölümü kadrosu)** — bölüm henüz yeni; akademik kadro listesi etu.edu.tr/tr/bolum/yapay-zeka-muhendisligi/akademik-kadro'da güncellenmekte.
- **Doç. Dr. Aykut Erdem (Koç misafir konuşmacı, TOBB ETÜ "Joint Seminar Series" 2025) — formel köprü zaten kurulu**.
- TOBB ETÜ'nün AI Mühendisliği bölümü ilk öğrencilerini yeni aldı; "klassik AI + ML + DL + LLM + finansal AI" müfredatı.
- Murat Karakaya (LinkedIn'de yapay zekâ eğitmeni, Ankara) — TOBB ETÜ ile gevşek bağ; community-builder olarak değerli.

### Recent publications
- TOBB ETÜ'nün kurumsal Türkçe-LLM yayın çıktısı henüz sınırlı (bölüm yeni).
- AI Mühendisliği Bölümü 2025-2026 lansman + cooperative-education modeli (3 farklı işte staj zorunlu) — OllamaTR için intern havuzu olarak ideal.

### What we OFFER
- **Co-op intern flagship destination** — TOBB ETÜ'nün 3-iş-staj modelinde OllamaTR'yi 3 dönem üst üste alabilen "AI engineering partner."
- **Joint Seminar Series spinoff** — Aykut Erdem'in Temmuz 2025 talk'unu örnek alarak OllamaTR-host ekonometri + AI seminer dizisi.
- **Cosmos T1 (YTÜ) + TOBB ETÜ finans-AI işbirliği köprüsü** — Ankara'da Cosmos'u finans dikeyine taşımak.

### What we ASK
- TOBB ETÜ AI Mühendisliği bölümünden yıllık 6 co-op intern (3 dönem üst üste).
- Misafir ders: "Production-grade Türkçe LLM stack" yıllık 2 kez.
- TOBB üyesi şirketlere (TOBB = Türkiye Odalar ve Borsalar Birliği) OllamaTR tanıtımı için bölüm-aracılı kanal.

### Outreach email (formal Türkçe)
```
Konu: OllamaTR x TOBB ETÜ — Yapay Zeka Mühendisliği Bölümü için co-op staj ve seminer iş birliği

Sayın Bölüm Başkanı,

TOBB ETÜ Yapay Zeka Mühendisliği Bölümü'nün yeni dönemde ortaya
koyduğu müfredat (klasik YZ, derin öğrenme, LLM, finans-AI ikinci uzmanlığı)
ve üniversitenin imza özelliği olan co-operative-education modeli,
OllamaTR'nin akademik staj programı için Türkiye'deki en uygun
yapıyı sunuyor.

Somut üç teklifimiz var:

1. Yıllık 6 lisans öğrencisi için OllamaTR'de üç dönem üst üste
   co-op stajı (Türkçe model paketleme, KOBİ pilot uygulamaları,
   eval altyapısı).
2. "Production-grade Türkçe LLM stack" başlığında yarıyıl başına
   1 misafir ders + her dönem 1 davetli akademik konuşmacı.
3. TOBB üye şirketleri için bölüm-aracılı OllamaTR tanıtım/eğitim
   kanalı (ortak değer üretimi: TOBB ETÜ'nün finans-AI ikinci uzmanlık
   alanı + OllamaTR'nin KOBİ dağıtım gücü).

Çankaya kampüsünde 45 dakikalık bir görüşmeye uygunluğunuzu rica
ederim.

Saygılarımla,
[İsim]
```

### Semester rhythm
- **Güz 2026:** İlk 2 co-op intern başlar; misafir ders güz programında.
- **Bahar 2027:** Joint Seminar Series spinoff — OllamaTR ev sahipliğinde 4 konuşmacı.
- **Yaz 2027:** TOBB üye şirketleri için ilk OllamaTR-onboarding workshop.

### Mutual deliverables timeline
- **M1:** Co-op MOU imzalı; ilk 2 intern Eylül başlangıçlı.
- **M3:** Misafir ders yapıldı; TOBB üye şirket workshop tarihi belirlendi.
- **M6:** 6 intern faal; TOBB workshop'tan ilk 2 KOBİ pilotu açıldı.

---

## 8. YTÜ — Yıldız Teknik Üniversitesi (Cosmos)

### Faculty leads
- **Prof. Dr. Mehmet Fatih Amasyalı** — Yapay Zeka ve Veri Mühendisliği Bölüm Başkanı, Cosmos T1 proje lideri. Türkiye'nin şu an EN GÖRÜNÜR Türkçe LLM araştırmacısı (ulusal basında "yerli yapay zekâ"nın yüzü).
- **Prof. Dr. Banu Diri** — NLP veteran, course materials Information Extraction → QA → morfolojik analiz hattı.
- **YTÜ-CE-Cosmos HuggingFace ekibi** — `ytu-ce-cosmos` org.
- Kurumsal arka plan: **TÜBİTAK desteği** Cosmos için zaten var.

### Recent publications
- **Cosmos T1 (Turkish-Gemma-9b-T1)** — 12-katmanlı decoder-only, 9B parametre, 200B+ Türkçe token, Türkçe GSM8K %77.41 (Llama-3.1-70B %66'yı geçti).
- **Cosmos-T1-Scout** — internet-arama destekli ajan modeli.
- HuggingFace açık ağırlık.

### What we OFFER
- **Cosmos'un resmi dağıtım platformu pozisyonu** — OllamaTR `cosmos.ollamatr.app` alt-domain; tek-tıkla yerel kurulum; on-premise için sağlık/savunma sanayi kurumsal dokümantasyon.
- **Cosmos vertical lansmanları** — Sağlık (Acıbadem köprüsü), savunma (Aselsan/HAVELSAN köprüsü), bankacılık.
- **PR amplifikasyon** — Cosmos'un ulusal basın görünürlüğünü OllamaTR-platform mesajıyla birleştirerek karşılıklı kazanım.

### What we ASK
- Amasyalı'dan endorsement (Türkiye AI ekosistemindeki sembolik ağırlığı en yüksek).
- Cosmos'un her yeni release'i OllamaTR-exclusive 14 gün.
- YTÜ Cosmos ekibinden yıllık 1 intern (deployment automation).
- Ortak basın açıklaması: "Cosmos x OllamaTR — Türkçe AI'ın sanayi yolu."

### Outreach email (formal Türkçe)
```
Konu: OllamaTR x Cosmos — Türkiye'nin yerli yapay zekâsı için resmi dağıtım iş birliği

Sayın Prof. Dr. Amasyalı,

Cosmos T1 modelinin Türkçe GSM8K'de %77,41 doğruluk oranıyla
Llama-3.1-70B'yi geride bırakması ve "önce düşünme, sonra konuşma"
mimarisi, Türkiye yapay zekâ ekosisteminde bir kırılma noktası.

OllamaTR ekibi olarak (ollamatr-app.vercel.app) Cosmos'un sanayiye,
KOBİ'ye ve özellikle on-premise gereksinimleri olan sağlık ve savunma
sektörlerine ulaşımında resmi dağıtım partneri olmayı teklif ediyoruz.

Somut öneri başlıkları:

1. cosmos.ollamatr.app alt-domain üzerinde Cosmos'a özel resmi
   landing + tek-tıkla yerel kurulum + on-premise kurumsal dokümantasyon.
2. Cosmos'un her yeni model yayınında 14 gün OllamaTR-exclusive
   distribution penceresi.
3. Sağlık (Acıbadem ADALAB), savunma (Aselsan/HAVELSAN köprü kurma
   sözümüz), bankacılık dikeylerinde Cosmos-vertical paketleri,
   gelir paylaşımı %70 ekibinize.
4. YTÜ-CE-Cosmos ekibinden yıllık 1 araştırma stajı (deployment
   otomasyonu projesi).
5. Ortak basın açıklaması ve birleşik PR kampanyası.

Davutpaşa kampüsünde 45 dakikalık bir görüşme için takvim
uygunluğunuzu rica ederim.

Saygılarımla,
[İsim]
```

### Semester rhythm
- **Güz 2026:** cosmos.ollamatr.app go-live; ortak basın açıklaması.
- **Bahar 2027:** Cosmos sağlık vertical pilot (Acıbadem ADALAB ortaklığı); Cosmos savunma vertical (Aselsan).
- **Yaz 2027:** YTÜ Cosmos intern — kurumsal deployment SDK.

### Mutual deliverables timeline
- **M1:** Amasyalı endorsement + cosmos.ollamatr.app canlı + ortak basın.
- **M3:** Sağlık ve savunma vertical pilotları (en az birer) açık; intern başlamış.
- **M6:** Cosmos T2 (varsa) OllamaTR-exclusive launch; ilk ₺500K vertical gelir paylaşımı.

---

## 9. TÜBİTAK BİLGEM — YTE + YZE

### Faculty / kurumsal liderler
- **TÜBİTAK BİLGEM Yazılım Teknolojileri Araştırma Enstitüsü (YTE)** — kuruluş 2012, kamu yazılım, dijital dönüşüm, kritik sistemler.
- **TÜBİTAK BİLGEM Yapay Zekâ Enstitüsü (YZE)** — kurumsal AI çatısı, "katalist ve tamamlayıcı."
- **YTE NLP ekibi (Temmuz 2025 blog post yazarları):** Ali Kayadibi, Ayça Öztürk, Bedriye Ece Atak, Neriman Dilara Özcan, Enis Yılmaz — aktif Türkçe NLP geliştirme ekibi.
- Şeyma Karakaya (LinkedIn aracılığıyla isimle eşleşmiş YTE'li).

### Aktif projeler / yayın izleri
- yteblog.bilgem.tubitak.gov.tr/category/nlp — 2025 NLP yayın hattı.
- GitHub `tubitak-bilgem-yte` organizasyonu — yakut-ui, pg-yonetici, pg-gelistirici + intern training repos.
- Strateji: stratejik, hassas, kritik projeler — kamu odaklı.

### What we OFFER
- **Kamu Türkçe-AI dağıtım kanalı** — Cumhurbaşkanlığı Dijital Dönüşüm Ofisi'ne, bakanlıklara, KKK'ya OllamaTR üzerinden BİLGEM modellerine erişim — air-gapped on-premise paketleme.
- **Açık kaynak vitrin** — BİLGEM'in HuggingFace/GitHub'da yayımladığı modellerin Türkçe açıklamalı, hizmet-seviyesi-anlaşmalı paketler.
- **Akademi-kamu köprüsü** — BİLGEM'in üniversitelerle proje yapımını OllamaTR koordinasyon yüzeyi olarak kullanma.

### What we ASK
- Kurumsal "tanınmış dağıtım partneri" statüsü.
- YTE NLP ekibinin yayımladığı modellerin (varsa) OllamaTR-mirror'lı dağıtımı.
- TÜBİTAK 1001/1505 programlarına ortak başvuru hakkı.

### Outreach email (formal Türkçe)
```
Konu: OllamaTR x TÜBİTAK BİLGEM YTE/YZE — Kamu için Türkçe AI dağıtım altyapısı iş birliği

Sayın YTE/YZE Yönetimi,

Türkçe yapay zekâ ekosisteminde devlet kurumlarının on-premise,
hassas-veri-uyumlu ve denetlenebilir model erişimine olan ihtiyacı
hızla büyüyor. OllamaTR ekibi olarak (ollamatr-app.vercel.app),
Türkçe açık kaynak büyük dil modellerini geliştiriciler ve kurumlar
için tek noktadan dağıtan açık bir altyapı kurduk.

YTE ve YZE ile aşağıdaki başlıklarda yapısal iş birliği öneriyoruz:

1. BİLGEM bünyesinde geliştirilen ve açık kaynak olarak yayımlanan
   modellerin OllamaTR kataloğunda kurumsal SLA'lı paketlerle
   sunulması.
2. Kamu kurumlarına yönelik air-gapped on-premise OllamaTR dağıtımı —
   Cumhurbaşkanlığı Dijital Dönüşüm Ofisi ve bakanlıklar için.
3. YTE NLP araştırma ekibi (Ali Kayadibi, Ayça Öztürk, Bedriye Ece
   Atak, Neriman Dilara Özcan, Enis Yılmaz) ile yıllık ortak
   geliştirme çalıştayı.
4. TÜBİTAK 1001/1505/2244 programlarına ortak başvuru.

Gebze TÜBİTAK Yerleşkesi'nde resmi bir görüşme için uygun
takvim aralıklarını paylaşmanızı rica ederim.

Saygılarımla,
[İsim]
OllamaTR — Akademik ve Kurumsal İş Birlikleri
```

### Semester rhythm
- **Güz 2026:** Kurumsal MOU müzakeresi (bürokratik süre uzun, paralel yürüt).
- **Bahar 2027:** Air-gapped on-premise OllamaTR prototip; bir bakanlık demo.
- **Yaz 2027:** TÜBİTAK 1001 ortak başvurusu hazırlığı.

### Mutual deliverables timeline
- **M1:** İlk resmi görüşme + paralel olarak BİLGEM HuggingFace mirror'ı OllamaTR'de.
- **M3:** MOU draft müzakerede; air-gap teknik mimari tasarım hazır.
- **M6:** MOU imzalı veya son aşamada; ilk bakanlık pilot konuşması.

---

## 10. Acıbadem ADALAB — tıbbi Türkçe AI

### Faculty leads
- **Dr. Buğrahan Bayram** — ADALAB kurucu (2019).
- **Dr. Sinem Burcu Erdoğan** — ADALAB kurucu; melanoma DL classification ekibi; yeni başvurular sinem.erdogan@acibadem.edu.tr.
- **Prof. Dr. Ata Akın** — ADALAB kurucu; Brain and Mind Group; fNIRS, fMRI, EEG biomarker'ları.
- **Bernis Sütçübaşı** — Acıbadem Üniversitesi, Demiralp ile İstanbul Üniversitesi-Acıbadem cross-institution ortak işbirlikçi.
- Yan kurum: Acıbadem Labgen (Acıbadem Genetik) — biyobilişim verisi.

### Recent publications
- BMC Medical Education, Neurophotonics, Scientific Reports, CMBBE yayın hattı (2024-2025).
- Brain and Mind Group: non-invasive nörogörüntüleme biyobelirteçleri (fNIRS/fMRI/EEG).
- Tarihi: melanoma classification DL pipeline.

### What we OFFER
- **Türkçe medical LLM vertical** — Cosmos T1 + TURNA + BUCOLIN birleşimini ADALAB klinik dataset'leriyle fine-tune ederek "Türkçe klinik karar destek" ürünü yaratma.
- **HIPAA/KVKK on-premise paketleme** — hastane içi air-gap kurulum (Cosmos'un YTÜ/Amasyalı'nın özellikle ön plana çıkardığı kullanım senaryosu).
- **Acıbadem Sağlık Grubu deal flow** — Acıbadem Healthcare Group Türkiye'nin lider hastane zinciri, OllamaTR ürünleri için doğal pilot müşteri.

### What we ASK
- ADALAB klinik (de-identified) Türkçe veri seti üzerinde ortak fine-tune yetkisi.
- Brain and Mind Group ile multi-modal Türkçe (rapor + sinyal) köprü projesi.
- Acıbadem hastanelerinde 1 pilot bölüm (radyoloji önerilir).

### Outreach email (formal Türkçe)
```
Konu: OllamaTR x Acıbadem ADALAB — Türkçe klinik karar destek için ortak ürün geliştirme

Sayın Dr. Erdoğan, Sayın Dr. Bayram, Sayın Prof. Dr. Akın,

ADALAB'ın 2019'dan bu yana sağlıkta veri bilimi ve yapay zekâya
yaptığı katkı, Türkiye'deki tıbbi AI ekosisteminin sayılı
laboratuvarlarından birini ortaya çıkardı.

OllamaTR ekibi olarak (ollamatr-app.vercel.app), Türkçe açık kaynak
büyük dil modellerinin (Cosmos T1, TURNA, BUCOLIN tarihi modelleri)
sağlık alanına geçişinde ADALAB ile ortak yapı kurmak istiyoruz:

1. ADALAB'ın klinik (de-identified) Türkçe veri kümeleri üzerinde
   Cosmos T1'in fine-tune edilmesi ve Türkçe klinik karar destek
   modülünün ortak fikri-mülkiyetli bir ürün olarak geliştirilmesi.
2. KVKK ve sağlıkta veri güvenliği yönetmeliklerine uyumlu on-premise
   OllamaTR dağıtımı — Acıbadem hastane bilgi sistemleri için.
3. Brain and Mind Group ile multi-modal Türkçe pipeline'ı (radyoloji
   raporu + görüntü + sinyal) ortak araştırma projesi.
4. Bir Acıbadem hastanesinin (tercihen radyoloji bölümü) pilot
   müşteri konumu — başlangıç ölçeği 3 ay.

Ataşehir kampüsünde 60 dakikalık bir görüşme için takvim
uygunluğunuzu paylaşırsanız teşekkür ederim.

Saygılarımla,
[İsim]
```

### Semester rhythm
- **Güz 2026:** ADALAB ortak proje kick-off; pilot bölüm anlaşması.
- **Bahar 2027:** Cosmos-medikal fine-tune v1.
- **Yaz 2027:** Pilot bölüm 3-aylık değerlendirme; ürünleştirme.

### Mutual deliverables timeline
- **M1:** ADALAB MOU + endorsement quote; pilot bölüm seçimi.
- **M3:** Veri paylaşım protokolü (KVKK uyumlu) onaylı; ilk fine-tune denemeleri.
- **M6:** Cosmos-medikal v1 OllamaTR'de Acıbadem-co-branded ürün; ilk hastane pilotu yayında.

---

# Cross-cutting: PhD pipeline → OllamaTR core

## Hangi TR doktora programları AI infra tezi kabul ediyor?

| Program | Tez konusu olarak AI-infra (LLM dağıtım, eval, serving, fine-tune sistemleri) | Komite tutumu |
|---|---|---|
| **Boğaziçi DSAI PhD** | Evet — Cetvel/TURNA çıkış noktaları zaten infra-eğilimli; başvuru penceresi 15 Nis – 11 Haz 2026 (Güz 2026/2027) | Açık |
| **İTÜ AI & Data Engineering PhD** | Evet — Türkiye'nin ilk YZ + veri mühendisliği bölümü, dağıtım/uygulama vurgulu | Çok açık |
| **METU CENG PhD (Applied NLP)** | Evet — Toraman grubu Türkçe LLM eval/RAG/text-to-SQL tezleri kabul ediyor | Çok açık |
| **KUIS / Koç CS PhD** | Evet — Yuret danışmanlığında klasik ML + LLM ekseni; eval ve generation tezleri | Açık |
| **Sabancı CS PhD** | Evet — VERIM çatısı altında uygulamalı tezler | Açık |
| **Bilkent CS PhD** | Evet, özellikle Aykanat (HPC for ML) altında "training/serving infrastructure" tezleri | Çok açık |
| **TOBB ETÜ Bilg./AI PhD** | Yeni bölüm; ilk PhD'ler 2027+ defansta | Kuruluş aşamasında |
| **YTÜ Bilgisayar PhD** | Evet — Cosmos ekibi sayesinde Türkçe LLM tezi resmen pratiklendi | Çok açık |
| **Hacettepe CENG PhD** | Evet — Erkut Erdem (kardeş) NLP, vision-language | Açık |
| **Gebze Teknik PhD** | YZ YL programı 2026 itibariyle, PhD doğal genişleme | Gelişmekte |
| **Ankara Üniversitesi YZ & Veri Müh. PhD** | YL 2024-25'te açıldı, PhD planlanan | Yeni |

**Operasyonel kural:** OllamaTR ile birlikte tez yazılabilmesi için **endüstri-bağlantılı tez modeli** (sanayi co-supervisor) gerekiyor — Boğaziçi, METU, KUIS, Bilkent, YTÜ bu modeli hâlihazırda kabul ediyor.

## 2026-2027 dönemi defans takvimi — OllamaTR core potansiyeli

**Yüksek olasılıkla 2026-2027 arası defans yapacak ve OllamaTR core ekibe geçmesi mantıklı olabilecek isimler:**

### A-tier (acil temas)
- **Ahmet Kaan Sever (METU, Toraman grubu)** — TurkBench, RAGTurk, low-resource quality co-author. PhD defansı 2026-2027 muhtemel. **Türkçe eval altyapısı için ideal core engineer.**
- **Süha Kağan Köse (METU)** — RAGTurk + BIRDTurk; RAG ve text-to-SQL operasyonel altyapısı. **Production RAG için ideal.**
- **Ayşe Aysu Cengiz (METU)** — TurkBench + low-resource benchmark quality. **Eval/QA mühendisi.**
- **Burak Aktas (METU)** — BIRDTurk. **Text-to-SQL ürün lideri.**

### B-tier (gözlem altında)
- **Mehmet Can Baytekin (METU)** — RAGTurk + BIRDTurk.
- **Burak Erinç Çetin (METU)** — OpenEthics + benchmark quality.
- **Onur Uludoğan (ex-Boğaziçi, TURNA lead author)** — eğer hâlâ akademideyse veya endüstride başka bir noktadaysa. **Türkçe encoder-decoder uzmanı.**
- **Dilara Zeynep Gürer (BUCOLIN)** — NAACL SRW 2025 Best Thesis; Arabic-script computer vision; 2027 PhD defansı muhtemel.
- **Ece Elif Adak (BUCOLIN)** — SMM4H 2025 winner; sosyal medya Türkçe NLP. Klinik / sağlık vertical için değerli.
- **Tarık Emre Tıraş, Fatih Burak Karagöz (BUCOLIN)** — Historical Turkish.
- **İlker Kesen, Yakup Abrek Er (KUIS, Cetvel co-authors)** — Vision-language + Türkçe eval. Multi-modal genişlemede core.
- **Ali Gebeşçe (KUIS)** — COLING 2025.

### C-tier (uzun-vadeli)
- İTÜ EACL 2026 delegasyonu (Torunoğlu Selamet, Şenceylan, Bilen, Karatepe, Çolak, Umut, Suluk, Arslan, Site) — şu an MS ağırlıklı, 2028-2029 PhD savunması beklenir.
- YTÜ Cosmos ekibinin PhDs (Amasyalı grubu) — isim listesi henüz tam görünür değil; HuggingFace `ytu-ce-cosmos` ekip sayfasından tarama yapılmalı.

**Aksiyon:** A-tier 4 isim için Eylül 2026'ya kadar bire-bir tanışma + Aralık 2026 itibariyle "OllamaTR Founding Research Engineer" teklif paketi (equity + maaş + tez-eş-danışmanlık).

---

# Kapanış: 1-paragraf özet

OllamaTR'nin akademik B2 stratejisi tek bir cümleyle özetlenebilir: **Türkiye'nin 10 büyük yapay zekâ laboratuvarının her birine, kendi araştırma çıktısının (model, benchmark, vertical pipeline) sanayi gelirine dönüşmesinde gelir paylaşımlı ve byline-paylaşımlı resmi dağıtım partneri olmayı teklif ediyoruz** — KUIS (Cetvel) ve METU (TurkBench/BIRDTurk/RAGTurk) ile leaderboard-as-platform üzerinden, İTÜ NLP ve Boğaziçi TABILAB/BUCOLIN ile model katalog vitrini üzerinden, YTÜ Cosmos ile sembolik bayrak ve sağlık/savunma vertical lansmanları üzerinden, Bilkent ve Sabancı VERIM ile HPC + co-op intern boru hattı üzerinden, TOBB ETÜ ile 3-dönem-üst-üste staj modeli ve TOBB üye-şirket dağıtım kanalı üzerinden, TÜBİTAK BİLGEM YTE/YZE ile kamu air-gap dağıtımı üzerinden, Acıbadem ADALAB ile Türkçe klinik LLM vertical ürünü üzerinden ortak yapılar kurarak — ve eş zamanlı olarak METU Toraman grubundan (Sever/Köse/Cengiz/Aktas) ve seçili BUCOLIN/KUIS PhDs'lerden 2026-2027 defans takvimine paralel olarak OllamaTR founding research engineer havuzunu oluşturarak. Aralık 2026 itibariyle 6 imzalı MOU, 12 aktif intern, 1 yayında ortak whitepaper ve 3 ücretli vertical pilotu hedefi gerçekçidir; bu rakam Haziran 2027 itibariyle 10 MOU, 25 intern, 5 ortak yayın ve ₺3M+ yıllık gelir paylaşımı seviyesine çıkarılabilir.

**STOP.**
