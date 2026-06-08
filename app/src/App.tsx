import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router'
import { Loader2 } from 'lucide-react'
import Layout from './components/Layout'
import ErrorBoundary from '@/components/ErrorBoundary'
import { usePageTitle } from '@/hooks/usePageTitle'

const Home = lazy(() => import('./pages/Home'))
const Modeller = lazy(() => import('./pages/Modeller'))
const HangiModel = lazy(() => import('./pages/HangiModel'))
const Dokumantasyon = lazy(() => import('./pages/Dokumantasyon'))
const Fiyatlandirma = lazy(() => import('./pages/Fiyatlandirma'))
const Topluluk = lazy(() => import('./pages/Topluluk'))
const Nabiz = lazy(() => import('./pages/Nabiz'))
const Hakkimizda = lazy(() => import('./pages/Hakkimizda'))
const KVKK = lazy(() => import('./pages/KVKK'))
const CerezPolitikasi = lazy(() => import('./pages/CerezPolitikasi'))

/* Per-route titles + meta descriptions — closes WCAG 2.4.2 (Page Titled)
 * and lets search engines see distinct intent per page even without SSR. */
const ROUTE_META: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'OllamaTR — Türkçe yapay zeka için topluluk projesi',
    description: 'Yerel-çalışan, KVKK-uyumlu Ollama + Open WebUI. Açık kaynak (MIT), topluluk yönetiminde.',
  },
  '/modeller': {
    title: 'Modeller',
    description: 'Türkçe için optimize edilmiş açık kaynak yapay zeka modelleri — RAM, lisans ve kullanım alanına göre filtrelenmiş.',
  },
  '/hangi-model': {
    title: 'Hangi Model Bana Uygun?',
    description: 'Donanımına ve kullanım amacına en uygun Türkçe modeli birkaç soruda öneren etkileşimli sihirbaz.',
  },
  '/nabiz': {
    title: 'Nabız — Türkçe yapay zeka gündemi',
    description: 'Ollama yayınları, Türkçe LLM güncellemeleri, akademik çıktılar, KVKK kararları ve topluluk haberleri.',
  },
  '/dokumantasyon': {
    title: 'Dokümantasyon',
    description: 'Yerel yapay zeka kurulumu, model yönetimi ve KVKK uyumu için Türkçe rehberler.',
  },
  '/fiyatlandirma': {
    title: 'Destek',
    description: 'Topluluk Edisyonu tamamen ücretsiz. Bağış ve kurumsal destek seçenekleri.',
  },
  '/hakkimizda': {
    title: 'Hakkımızda',
    description: 'OllamaTR\'in misyonu, ekibi ve yol haritası.',
  },
  '/topluluk': {
    title: 'Topluluk',
    description: 'Telegram, GitHub ve etkinlikler üzerinden OllamaTR topluluğuna katıl.',
  },
  '/kvkk': {
    title: 'KVKK ve Aydınlatma Metni',
    description: '6698 sayılı Kanun kapsamında veri sorumlusu bilgileri ve ilgili kişi hakları.',
  },
  '/cerez-politikasi': {
    title: 'Çerez Politikası',
    description: 'OllamaTR\'in çerez kullanımı ve kategori bazında tercih yönetimi.',
  },
}

function RouteMeta() {
  const { pathname } = useLocation()
  const meta = ROUTE_META[pathname] ?? ROUTE_META['/']
  usePageTitle(meta.title, meta.description)
  return null
}

function RouteLoader() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[60vh] w-full items-center justify-center"
    >
      <Loader2 className="h-8 w-8 animate-spin text-accent-red" aria-hidden="true" />
      <span className="sr-only">Yükleniyor</span>
    </div>
  )
}

export default function App() {
  return (
    <Layout>
      <RouteMeta />
      <ErrorBoundary>
        <Suspense fallback={<RouteLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/modeller" element={<Modeller />} />
            <Route path="/hangi-model" element={<HangiModel />} />
            <Route path="/nabiz" element={<Nabiz />} />
            {/* Backward-compat: old /indir route now serves Nabız (no app to download yet). */}
            <Route path="/nabiz" element={<Nabiz />} />
            <Route path="/indir" element={<Nabiz />} />
            <Route path="/dokumantasyon" element={<Dokumantasyon />} />
            <Route path="/fiyatlandirma" element={<Fiyatlandirma />} />
            <Route path="/hakkimizda" element={<Hakkimizda />} />
            <Route path="/kvkk" element={<KVKK />} />
            <Route path="/cerez-politikasi" element={<CerezPolitikasi />} />
            <Route path="/topluluk" element={<Topluluk />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </Layout>
  )
}
