import { Routes, Route } from 'react-router'
import Layout from './components/Layout'
import Home from './pages/Home'
import Modeller from './pages/Modeller'
import HangiModel from './pages/HangiModel'
import Indir from './pages/Indir'
import Dokumantasyon from './pages/Dokumantasyon'
import Fiyatlandirma from './pages/Fiyatlandirma'
import Hakkimizda from './pages/Hakkimizda'
import KVKK from './pages/KVKK'
import Topluluk from './pages/Topluluk'

export default function App() {
  return (
    <Layout>
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
    </Layout>
  )
}
