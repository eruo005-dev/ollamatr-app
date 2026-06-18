#!/usr/bin/env node
// Post-build: emit per-route dist/<route>/index.html with route-specific
// <title>, description, canonical, and OG/Twitter tags baked into the static
// HTML. Crawlers + link unfurlers (which don't run JS) then get the correct
// per-route metadata instead of the home page's. The SPA still hydrates the
// body normally. Vercel serves these static files before the SPA fallback
// rewrite, so /modeller returns /modeller/index.html.
//
// Route meta MUST mirror src/App.tsx ROUTE_META.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DIST = resolve(__dirname, '..', 'dist')
const ORIGIN = 'https://ollamatr.com'
const SUFFIX = ' — OllamaTR'

/** path → { title (without suffix), description } */
const ROUTES = {
  '/modeller': { title: 'Modeller', description: 'Türkçe için optimize edilmiş açık kaynak yapay zeka modelleri — RAM, lisans ve kullanım alanına göre filtrelenmiş.' },
  '/hangi-model': { title: 'Hangi Model Bana Uygun?', description: 'Donanımına ve kullanım amacına en uygun Türkçe modeli birkaç soruda öneren etkileşimli sihirbaz.' },
  '/nabiz': { title: 'Nabız — Türkçe yapay zeka gündemi', description: 'Ollama yayınları, Türkçe LLM güncellemeleri, akademik çıktılar, KVKK kararları ve topluluk haberleri.' },
  '/dokumantasyon': { title: 'Dokümantasyon', description: 'Yerel yapay zeka kurulumu, model yönetimi ve KVKK uyumu için Türkçe kaynaklar.' },
  '/fiyatlandirma': { title: 'Destek', description: 'Topluluk Edisyonu tamamen ücretsiz. Bağış ve kurumsal destek seçenekleri.' },
  '/hakkimizda': { title: 'Hakkımızda', description: "OllamaTR'in misyonu, ekibi ve yol haritası." },
  '/topluluk': { title: 'Topluluk', description: 'Telegram, GitHub ve etkinlikler üzerinden OllamaTR topluluğuna katıl.' },
  '/kvkk': { title: 'KVKK ve Aydınlatma Metni', description: '6698 sayılı Kanun kapsamında veri sorumlusu bilgileri ve ilgili kişi hakları.' },
  '/cerez-politikasi': { title: 'Çerez Politikası', description: "OllamaTR'in çerez kullanımı ve kategori bazında tercih yönetimi." },
  '/indir': { title: 'Nabız — Türkçe yapay zeka gündemi', description: 'Ollama yayınları, Türkçe LLM güncellemeleri, akademik çıktılar, KVKK kararları ve topluluk haberleri.' },
}

const shell = readFileSync(resolve(DIST, 'index.html'), 'utf8')

function applyMeta(html, { fullTitle, description, url }) {
  let out = html
  out = out.replace(/<title>[\s\S]*?<\/title>/, `<title>${fullTitle}</title>`)
  const setAttr = (re, build) => { out = re.test(out) ? out.replace(re, build) : out }
  // description
  setAttr(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i, `<meta name="description" content="${description}" />`)
  setAttr(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:description" content="${description}" />`)
  setAttr(/<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:description" content="${description}" />`)
  // title-derived
  setAttr(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:title" content="${fullTitle}" />`)
  setAttr(/<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:title" content="${fullTitle}" />`)
  // url-derived
  setAttr(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i, `<link rel="canonical" href="${url}" />`)
  setAttr(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:url" content="${url}" />`)
  return out
}

let n = 0
for (const [path, meta] of Object.entries(ROUTES)) {
  const fullTitle = meta.title.endsWith('OllamaTR') ? meta.title : `${meta.title}${SUFFIX}`
  const url = `${ORIGIN}${path}`
  const html = applyMeta(shell, { fullTitle, description: meta.description, url })
  const dir = resolve(DIST, path.replace(/^\//, ''))
  mkdirSync(dir, { recursive: true })
  writeFileSync(resolve(dir, 'index.html'), html)
  n++
}
// 404 shell: SPA boots and renders <NotFound>, but the noindex is BAKED into
// the static HTML so even non-JS crawlers won't index unknown routes. The SPA
// fallback rewrite (vercel.json) points unmatched paths here.
let notFound = shell
  .replace(/<title>[\s\S]*?<\/title>/, '<title>Sayfa bulunamadı (404) — OllamaTR</title>')
  .replace(/<head>/i, '<head>\n    <meta name="robots" content="noindex" />')
writeFileSync(resolve(DIST, '404.html'), notFound)
console.log(`prerender-meta: wrote ${n} per-route shells + 404.html (baked noindex)`)
