import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router'
import { Loader2 } from 'lucide-react'
import Layout from './components/Layout'
import ErrorBoundary from '@/components/ErrorBoundary'

const Home = lazy(() => import('./pages/Home'))
const Modeller = lazy(() => import('./pages/Modeller'))
const HangiModel = lazy(() => import('./pages/HangiModel'))
const Dokumantasyon = lazy(() => import('./pages/Dokumantasyon'))
const Fiyatlandirma = lazy(() => import('./pages/Fiyatlandirma'))
const Topluluk = lazy(() => import('./pages/Topluluk'))
const Indir = lazy(() => import('./pages/Indir'))
const Hakkimizda = lazy(() => import('./pages/Hakkimizda'))
const KVKK = lazy(() => import('./pages/KVKK'))

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
      <ErrorBoundary>
        <Suspense fallback={<RouteLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/modeller" element={<Modeller />} />
            <Route path="/hangi-model" element={<HangiModel />} />
            <Route path="/indir" element={<Indir />} />
            <Route path="/dokumantasyon" element={<Dokumantasyon />} />
            <Route path="/fiyatlandirma" element={<Fiyatlandirma />} />
            <Route path="/hakkimizda" element={<Hakkimizda />} />
            <Route path="/kvkk" element={<KVKK />} />
            <Route path="/topluluk" element={<Topluluk />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </Layout>
  )
}
