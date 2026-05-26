/** Canonical 12-model Turkish LLM catalog shared between the Modeller catalog page and the HangiModel wizard. */

export type UseCase =
  | 'Genel Amaçlı'
  | 'Kod'
  | 'Sohbet'
  | 'Soru-Cevap'
  | 'Çeviri'
  | 'Özetleme'

export type RamBucket = '< 8GB' | '8-16GB' | '16GB+'

export type ModelLicense =
  | 'Meta Llama 3 Community'
  | 'Apache 2.0'
  | 'MIT'
  | 'Google Gemma Terms'
  | 'Tongyi Qianwen'
  | 'DeepSeek License'
  | 'CC-BY-NC 4.0'
  | 'CC-BY-SA 4.0'
  | 'Custom (Topluluk)'

export type Model = {
  id: number
  name: string
  shortName: string
  ramGB: number
  ramBucket: RamBucket
  useCases: UseCase[]
  tags: string[]
  description: string
  popularity: number
  releasedAt: string
  downloads: string
  rating: number
  license: ModelLicense
  commercialUse: boolean
  attribution: string
}

export const USE_CASES: UseCase[] = [
  'Genel Amaçlı',
  'Kod',
  'Sohbet',
  'Soru-Cevap',
  'Çeviri',
  'Özetleme',
]

export const RAM_BUCKETS: RamBucket[] = ['< 8GB', '8-16GB', '16GB+']

export function getRamBucket(ramGB: number): RamBucket {
  if (ramGB < 8) return '< 8GB'
  if (ramGB <= 16) return '8-16GB'
  return '16GB+'
}

export const MODELS: Model[] = [
  {
    id: 1,
    name: 'Llama-3-Turkish-8B',
    shortName: 'Llama-3-TR',
    ramGB: 8,
    ramBucket: getRamBucket(8),
    useCases: ['Genel Amaçlı', 'Sohbet', 'Soru-Cevap'],
    tags: ['Açık Kaynak', 'Meta', 'Genel Amaçlı', 'Topluluk'],
    description:
      "Meta'nın Llama 3 mimarisinin Türkçe ince ayarı. Günlük sohbet, soru-cevap ve içerik üretimi için dengeli bir genel amaçlı seçenektir.",
    popularity: 94,
    releasedAt: '2024-08-12',
    downloads: '24.5K',
    rating: 4.7,
    license: 'Meta Llama 3 Community',
    commercialUse: true,
    attribution: 'Built with Meta Llama 3',
  },
  {
    id: 2,
    name: 'Mistral-Turk-7B',
    shortName: 'Mistral-TR',
    ramGB: 7,
    ramBucket: getRamBucket(7),
    useCases: ['Genel Amaçlı', 'Kod', 'Özetleme'],
    tags: ['Mistral', 'Hafif', 'Üretken', 'Hızlı'],
    description:
      'Mistral mimarisinin Türkçe sürümü. Düşük RAM tüketimiyle hızlı metin üretimi ve kısa kod parçacıkları için uygundur.',
    popularity: 88,
    releasedAt: '2024-06-03',
    downloads: '19.2K',
    rating: 4.5,
    license: 'Apache 2.0',
    commercialUse: true,
    attribution: 'Mistral 7B (Apache 2.0)',
  },
  {
    id: 3,
    name: 'Bora-7B',
    shortName: 'Bora',
    ramGB: 7,
    ramBucket: getRamBucket(7),
    useCases: ['Sohbet', 'Soru-Cevap', 'Özetleme'],
    tags: ['Yerli', 'Açık Kaynak', 'Türkçe-Öncelikli'],
    description:
      "Türkiye'de geliştirilen açık kaynaklı dil modeli. Yerel kültürel bağlama duyarlı, doğal Türkçe yanıtlar üretir.",
    popularity: 82,
    releasedAt: '2024-09-21',
    downloads: '12.8K',
    rating: 4.4,
    license: 'Custom (Topluluk)',
    commercialUse: true,
    attribution: 'Topluluk lisansı',
  },
  {
    id: 4,
    name: 'Trendyol-LLM-7B-v2',
    shortName: 'Trendyol-LLM',
    ramGB: 7,
    ramBucket: getRamBucket(7),
    useCases: ['Sohbet', 'Soru-Cevap', 'Özetleme'],
    tags: ['E-ticaret', 'Trendyol', 'Müşteri Hizmetleri'],
    description:
      "Trendyol'un e-ticaret verisiyle eğitilmiş Türkçe dil modeli. Ürün açıklamaları, müşteri diyalogları ve öneri senaryolarında öne çıkar.",
    popularity: 90,
    releasedAt: '2024-07-15',
    downloads: '21.7K',
    rating: 4.6,
    license: 'Apache 2.0',
    commercialUse: true,
    attribution: 'Trendyol Group — Apache 2.0',
  },
  {
    id: 5,
    name: 'Kardesler-LLM-13B',
    shortName: 'Kardeşler-13B',
    ramGB: 13,
    ramBucket: getRamBucket(13),
    useCases: ['Genel Amaçlı', 'Soru-Cevap', 'Özetleme'],
    tags: ['Yüksek Performans', 'Akademik', 'Uzun Bağlam'],
    description:
      'Karmaşık akıl yürütme görevlerinde başarılı, 13 milyar parametreli Türkçe model. Akademik özetleme ve detaylı analizler için tercih edilir.',
    popularity: 78,
    releasedAt: '2024-05-08',
    downloads: '9.6K',
    rating: 4.5,
    license: 'Custom (Topluluk)',
    commercialUse: true,
    attribution: 'Topluluk lisansı',
  },
  {
    id: 6,
    name: 'Gemma-2-Turkish-9B',
    shortName: 'Gemma-2-TR',
    ramGB: 9,
    ramBucket: getRamBucket(9),
    useCases: ['Genel Amaçlı', 'Sohbet', 'Çeviri'],
    tags: ['Google', 'Gemma', 'Çok Dilli'],
    description:
      "Google Gemma 2 tabanlı, Türkçe için optimize edilmiş model. İngilizce-Türkçe çeviri ve günlük sohbet performansı yüksektir.",
    popularity: 85,
    releasedAt: '2024-08-30',
    downloads: '17.3K',
    rating: 4.4,
    license: 'Google Gemma Terms',
    commercialUse: true,
    attribution: 'Gemma is provided under and subject to the Gemma Terms of Use',
  },
  {
    id: 7,
    name: 'Turkish-Mistral-Instruct-7B',
    shortName: 'TR-Mistral-Inst',
    ramGB: 8,
    ramBucket: getRamBucket(8),
    useCases: ['Soru-Cevap', 'Özetleme', 'Sohbet'],
    tags: ['Talimat-Ayarlı', 'Mistral', 'Asistan'],
    description:
      'Talimat ayarlamasıyla güçlendirilmiş Türkçe Mistral varyantı. Yapay zeka asistanı kurulumları için kullanıcı yönergelerine sadık kalır.',
    popularity: 80,
    releasedAt: '2024-04-19',
    downloads: '11.4K',
    rating: 4.3,
    license: 'Apache 2.0',
    commercialUse: true,
    attribution: 'Mistral 7B (Apache 2.0)',
  },
  {
    id: 8,
    name: 'Phi-3-Turkish-Mini-4B',
    shortName: 'Phi-3-TR-Mini',
    ramGB: 4,
    ramBucket: getRamBucket(4),
    useCases: ['Sohbet', 'Soru-Cevap', 'Özetleme'],
    tags: ['Microsoft', 'Mini', 'Düşük RAM', 'Edge'],
    description:
      "Microsoft Phi-3 Mini'nin Türkçe sürümü. 4 GB RAM'de çalışacak kadar hafiftir; eski dizüstüler ve uç cihazlar için idealdir.",
    popularity: 72,
    releasedAt: '2024-10-05',
    downloads: '14.9K',
    rating: 4.2,
    license: 'MIT',
    commercialUse: true,
    attribution: 'Microsoft Phi-3 (MIT)',
  },
  {
    id: 9,
    name: 'Qwen2-Turkish-7B',
    shortName: 'Qwen2-TR',
    ramGB: 7,
    ramBucket: getRamBucket(7),
    useCases: ['Genel Amaçlı', 'Çeviri', 'Sohbet'],
    tags: ['Alibaba', 'Qwen', 'Çok Dilli', 'Çeviri'],
    description:
      "Alibaba Qwen2 ailesinin Türkçe ince ayarı. Çok dilli yapıyla güçlü çeviri ve diller arası karşılaştırma görevlerinde başarılıdır.",
    popularity: 76,
    releasedAt: '2024-09-12',
    downloads: '10.1K',
    rating: 4.3,
    license: 'Tongyi Qianwen',
    commercialUse: true,
    attribution: 'Qwen2 — Tongyi Qianwen License',
  },
  {
    id: 10,
    name: 'Command-R-Turkish-35B',
    shortName: 'Command-R-TR',
    ramGB: 48,
    ramBucket: getRamBucket(48),
    useCases: ['Genel Amaçlı', 'Soru-Cevap', 'Özetleme'],
    tags: ['Cohere', 'RAG', 'Kurumsal', 'Uzun Bağlam'],
    description:
      "Cohere Command R mimarisinin Türkçe sürümü. RAG iş akışları, belge sorgulama ve kurumsal bilgi tabanı senaryoları için tasarlanmıştır.",
    popularity: 68,
    releasedAt: '2024-03-27',
    downloads: '5.4K',
    rating: 4.6,
    license: 'CC-BY-NC 4.0',
    commercialUse: false,
    attribution: 'Cohere Command-R — CC-BY-NC 4.0 (yalnızca araştırma)',
  },
  {
    id: 11,
    name: 'DeepSeek-Turkish-7B',
    shortName: 'DeepSeek-TR',
    ramGB: 8,
    ramBucket: getRamBucket(8),
    useCases: ['Kod', 'Soru-Cevap', 'Genel Amaçlı'],
    tags: ['DeepSeek', 'Akıl Yürütme', 'Geliştirici', 'Matematik'],
    description:
      "DeepSeek'in akıl yürütme odaklı Türkçe modeli. Algoritmik düşünme, matematiksel adım adım çözümler ve teknik soru-cevap için güçlüdür.",
    popularity: 74,
    releasedAt: '2024-11-02',
    downloads: '8.2K',
    rating: 4.4,
    license: 'DeepSeek License',
    commercialUse: true,
    attribution: 'DeepSeek License',
  },
  {
    id: 12,
    name: 'SQLCoder-TR-7B',
    shortName: 'SQLCoder-TR',
    ramGB: 8,
    ramBucket: getRamBucket(8),
    useCases: ['Kod', 'Soru-Cevap'],
    tags: ['SQL', 'Veritabanı', 'Geliştirici', 'Niş'],
    description:
      'Doğal dildeki Türkçe sorulardan SQL üretmeye odaklanmış kod modeli. Veritabanı analistleri ve BI ekipleri için özelleşmiştir.',
    popularity: 64,
    releasedAt: '2024-10-22',
    downloads: '4.7K',
    rating: 4.5,
    license: 'CC-BY-SA 4.0',
    commercialUse: true,
    attribution: 'Defog SQLCoder — CC-BY-SA 4.0',
  },
]

export const COMMERCIAL_MODELS: Model[] = MODELS.filter((m) => m.commercialUse)
export const NON_COMMERCIAL_MODELS: Model[] = MODELS.filter((m) => !m.commercialUse)
