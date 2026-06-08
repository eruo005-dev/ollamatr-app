/**
 * Build-time generator for /nabiz.rss.
 *
 * Reads the canonical pulse items from `src/lib/nabiz-items.json` and emits
 * an RSS 2.0 feed at `public/nabiz.rss`. Vercel serves files in `public/`
 * directly (filesystem check runs before the SPA fallback rewrite), so the
 * feed is reachable at https://ollamatr.com/nabiz.rss.
 *
 * Invoked via the `prebuild` npm script.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')

const ITEMS_PATH = join(ROOT, 'src', 'lib', 'nabiz-items.json')
const OUTPUT_PATH = join(ROOT, 'public', 'nabiz.rss')

const SITE_URL = 'https://ollamatr.com'
const FEED_URL = `${SITE_URL}/nabiz.rss`
const PAGE_URL = `${SITE_URL}/nabiz`

// XML 1.0 disallows control chars and requires escapes for &, <, >, ", '.
function escapeXml(input) {
  return String(input)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
    .replace(/[\x00-\x08\x0b\x0c\x0e-\x1f]/g, '')
}

// Convert an ISO-8601 date string to RFC-822 (RSS pubDate format).
function toRfc822(iso) {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) {
    throw new Error(`Invalid isoDate: ${iso}`)
  }
  return d.toUTCString()
}

function main() {
  const raw = readFileSync(ITEMS_PATH, 'utf8')
  const items = JSON.parse(raw)

  if (!Array.isArray(items)) {
    throw new Error('nabiz-items.json must be a JSON array')
  }

  // Newest first
  items.sort((a, b) => new Date(b.isoDate).getTime() - new Date(a.isoDate).getTime())

  // Channel-level lastBuildDate = newest item's isoDate (deterministic build)
  const lastBuild = items.length > 0 ? toRfc822(items[0].isoDate) : toRfc822('2026-05-26')

  const itemsXml = items
    .map((it) => {
      // Required: title, link, description. Optional: guid, pubDate, category.
      return [
        '    <item>',
        `      <title>${escapeXml(it.title)}</title>`,
        `      <link>${escapeXml(it.href)}</link>`,
        `      <guid isPermaLink="false">ollamatr-nabiz-${escapeXml(it.id)}</guid>`,
        `      <pubDate>${toRfc822(it.isoDate)}</pubDate>`,
        `      <category>${escapeXml(it.category)}</category>`,
        `      <description>${escapeXml(it.summary)} (Kaynak: ${escapeXml(it.source)})</description>`,
        '    </item>',
      ].join('\n')
    })
    .join('\n')

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>OllamaTR Nabız</title>
    <link>${escapeXml(PAGE_URL)}</link>
    <atom:link href="${escapeXml(FEED_URL)}" rel="self" type="application/rss+xml" />
    <description>Türkçe yapay zekada olup biten — Ollama yayınları, Türkçe LLM güncellemeleri, akademik çıktılar, KVKK kararları ve topluluk etkinlikleri.</description>
    <language>tr-TR</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <ttl>360</ttl>
${itemsXml}
  </channel>
</rss>
`

  mkdirSync(dirname(OUTPUT_PATH), { recursive: true })
  writeFileSync(OUTPUT_PATH, feed, 'utf8')
  process.stdout.write(`[nabiz-rss] wrote ${items.length} items -> ${OUTPUT_PATH}\n`)
}

main()
