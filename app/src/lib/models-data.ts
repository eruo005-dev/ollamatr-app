/**
 * Canonical Turkish LLM catalog shared between the Modeller catalog page and the HangiModel wizard.
 *
 * HONESTY POLICY (anti-vapor):
 * Every entry below is a model that VERIFIABLY EXISTS as a real HuggingFace repo
 * (checked against huggingface.co/api/models, June 2026). The `source` field records
 * the canonical repo id so any claim can be re-verified. We do NOT carry invented
 * "rating" / "popularity" / "release date" metrics — those were fabricated and have
 * been removed. RAM figures are honest approximations for a ~Q4 quant of the stated
 * parameter count and are labelled as estimates in the UI.
 */

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

export type Model = {
  id: number
  name: string
  shortName: string
  /** Canonical HuggingFace repo id — the verifiable source of truth for this entry. */
  source: string
  /** Approximate RAM for a ~Q4 quant of the stated parameter count (estimate, shown as such in the UI). */
  ramGB: number
  ramBucket: RamBucket
  useCases: UseCase[]
  tags: string[]
  description: string
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
    name: 'Trendyol-LLM-7b-chat-v1.0',
    shortName: 'Trendyol-LLM',
    source: 'Trendyol/Trendyol-LLM-7b-chat-v1.0',
    ramGB: 7,
    ramBucket: getRamBucket(7),
    useCases: ['Sohbet', 'Soru-Cevap', 'Özetleme'],
    tags: ['E-ticaret', 'Trendyol', 'Mistral Tabanlı'],
    description:
      "Trendyol tarafından Mistral 7B tabanında eğitilmiş Türkçe sohbet modeli. Ürün açıklamaları, müşteri diyalogları ve genel Türkçe sohbet senaryolarında kullanılır.",
    license: 'Apache 2.0',
    commercialUse: true,
    attribution: 'Trendyol — Apache 2.0 (Mistral 7B tabanlı)',
  },
  {
    id: 2,
    name: 'Turkish-Llama-8b-Instruct-v0.1',
    shortName: 'Turkish-Llama-8b-Instruct',
    source: 'ytu-ce-cosmos/Turkish-Llama-8b-Instruct-v0.1',
    ramGB: 8,
    ramBucket: getRamBucket(8),
    useCases: ['Genel Amaçlı', 'Sohbet', 'Soru-Cevap'],
    tags: ['YTÜ COSMOS', 'Llama 3', 'Talimat-Ayarlı', 'Akademik'],
    description:
      "Yıldız Teknik Üniversitesi COSMOS ekibi tarafından Llama 3 8B üzerine eğitilmiş talimat-ayarlı Türkçe model. Günlük sohbet, soru-cevap ve genel amaçlı kullanım için dengeli bir seçenektir.",
    license: 'Meta Llama 3 Community',
    commercialUse: true,
    attribution: 'ytu-ce-cosmos — Built with Meta Llama 3',
  },
  {
    id: 3,
    name: 'Turkish-Gemma-9b-v0.1',
    shortName: 'Turkish-Gemma-9b',
    source: 'ytu-ce-cosmos/Turkish-Gemma-9b-v0.1',
    ramGB: 9,
    ramBucket: getRamBucket(9),
    useCases: ['Genel Amaçlı', 'Sohbet', 'Çeviri'],
    tags: ['YTÜ COSMOS', 'Gemma', 'Google'],
    description:
      "YTÜ COSMOS ekibinin Google Gemma 9B tabanında eğittiği Türkçe model. Genel sohbet ve diller arası görevlerde kullanılır.",
    license: 'Google Gemma Terms',
    commercialUse: true,
    attribution: 'ytu-ce-cosmos — Gemma Terms of Use kapsamında sağlanır',
  },
  {
    id: 4,
    name: 'Turkcell-LLM-7b-v1',
    shortName: 'Turkcell-LLM',
    source: 'TURKCELL/Turkcell-LLM-7b-v1',
    ramGB: 7,
    ramBucket: getRamBucket(7),
    useCases: ['Genel Amaçlı', 'Sohbet', 'Soru-Cevap'],
    tags: ['Turkcell', 'Mistral Tabanlı', 'Kurumsal'],
    description:
      "Turkcell tarafından Mistral mimarisi üzerine eğitilmiş Türkçe dil modeli. Genel amaçlı Türkçe metin üretimi ve soru-cevap için kullanılır.",
    license: 'Apache 2.0',
    commercialUse: true,
    attribution: 'Turkcell — Apache 2.0 (Mistral tabanlı)',
  },
  {
    id: 5,
    name: 'Kocdigital-LLM-8b-v0.1',
    shortName: 'Kocdigital-LLM',
    source: 'KOCDIGITAL/Kocdigital-LLM-8b-v0.1',
    ramGB: 8,
    ramBucket: getRamBucket(8),
    useCases: ['Genel Amaçlı', 'Soru-Cevap', 'Özetleme'],
    tags: ['KoçDigital', 'Llama 3', 'Kurumsal'],
    description:
      "KoçDigital tarafından Llama 3 8B tabanında eğitilmiş Türkçe model. Genel amaçlı kurumsal kullanım, soru-cevap ve özetleme için uygundur.",
    license: 'Meta Llama 3 Community',
    commercialUse: true,
    attribution: 'KoçDigital — Built with Meta Llama 3',
  },
  {
    id: 6,
    name: 'Commencis-LLM',
    shortName: 'Commencis-LLM',
    source: 'Commencis/Commencis-LLM',
    ramGB: 7,
    ramBucket: getRamBucket(7),
    useCases: ['Soru-Cevap', 'Özetleme', 'Sohbet'],
    tags: ['Commencis', 'Mistral Tabanlı', 'Finans'],
    description:
      "Commencis tarafından Mistral 7B tabanında eğitilmiş, finans alanına yönelik Türkçe dil modeli. Soru-cevap ve özetleme görevlerinde kullanılır.",
    license: 'Apache 2.0',
    commercialUse: true,
    attribution: 'Commencis — Apache 2.0 (Mistral 7B tabanlı)',
  },
  {
    id: 7,
    name: 'kanarya-2b',
    shortName: 'kanarya-2b',
    source: 'asafaya/kanarya-2b',
    ramGB: 3,
    ramBucket: getRamBucket(3),
    useCases: ['Genel Amaçlı', 'Sohbet'],
    tags: ['Açık Kaynak', 'Hafif', 'Düşük RAM', 'Edge'],
    description:
      "asafaya tarafından yayımlanan 2 milyar parametreli açık kaynaklı Türkçe dil modeli. Düşük RAM'li sistemler ve uç cihazlar için hafif bir seçenektir.",
    license: 'Apache 2.0',
    commercialUse: true,
    attribution: 'asafaya — Apache 2.0',
  },
  {
    id: 8,
    name: 'turkish-gpt2-large-750m-instruct-v0.1',
    shortName: 'turkish-gpt2-large-instruct',
    source: 'ytu-ce-cosmos/turkish-gpt2-large-750m-instruct-v0.1',
    ramGB: 2,
    ramBucket: getRamBucket(2),
    useCases: ['Sohbet', 'Soru-Cevap'],
    tags: ['YTÜ COSMOS', 'GPT-2', 'Hafif', 'Düşük RAM'],
    description:
      "YTÜ COSMOS ekibinin 750M parametreli talimat-ayarlı Türkçe GPT-2 modeli. Çok düşük kaynak tüketimiyle basit sohbet ve soru-cevap için uygundur.",
    license: 'MIT',
    commercialUse: true,
    attribution: 'ytu-ce-cosmos — MIT',
  },
]

export const COMMERCIAL_MODELS: Model[] = MODELS.filter((m) => m.commercialUse)
export const NON_COMMERCIAL_MODELS: Model[] = MODELS.filter((m) => !m.commercialUse)
