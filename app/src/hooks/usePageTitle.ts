/**
 * Sets `document.title` and announces a focus reset to the H1 on every
 * route change, so per-route titles surface in the browser tab, the
 * history stack, and screen-reader page announcements. Closes
 * WCAG 2.4.2 (Page Titled) and 2.4.3 (Focus Order) gaps for the SPA.
 */
import { useEffect } from 'react'

const SUFFIX = ' — OllamaTR'

export function usePageTitle(title: string, description?: string): void {
  useEffect(() => {
    const full = title.endsWith('OllamaTR') ? title : `${title}${SUFFIX}`
    document.title = full

    // Upsert a <meta> (by name/property) or <link> (by rel) in <head>.
    const upsert = (kind: 'meta-name' | 'meta-prop' | 'link', key: string, value: string) => {
      const sel =
        kind === 'meta-name' ? `meta[name="${key}"]`
        : kind === 'meta-prop' ? `meta[property="${key}"]`
        : `link[rel="${key}"]`
      let el = document.head.querySelector<HTMLElement>(sel)
      if (!el) {
        el = document.createElement(kind === 'link' ? 'link' : 'meta')
        el.setAttribute(kind === 'meta-name' ? 'name' : kind === 'meta-prop' ? 'property' : 'rel', key)
        document.head.appendChild(el)
      }
      el.setAttribute(kind === 'link' ? 'href' : 'content', value)
    }

    if (description) {
      upsert('meta-name', 'description', description)
      upsert('meta-prop', 'og:description', description)
      upsert('meta-name', 'twitter:description', description)
    }

    // Per-route canonical + OG/Twitter so each SPA route advertises its OWN
    // url/title to crawlers and link unfurlers (not the home page's).
    const path = window.location.pathname
    const url = `https://ollamatr.com${path === '/' ? '/' : path.replace(/\/+$/, '')}`
    upsert('link', 'canonical', url)
    upsert('meta-prop', 'og:url', url)
    upsert('meta-prop', 'og:title', full)
    upsert('meta-name', 'twitter:title', full)

    // After navigation, move keyboard focus to the first H1 so screen
    // readers announce the new page and Tab order restarts from the top.
    const h1 = document.querySelector<HTMLElement>('main h1')
    if (h1 && document.activeElement !== h1) {
      const previous = h1.getAttribute('tabindex')
      h1.setAttribute('tabindex', '-1')
      h1.focus({ preventScroll: true })
      if (previous === null) {
        h1.addEventListener(
          'blur',
          () => h1.removeAttribute('tabindex'),
          { once: true },
        )
      }
    }
  }, [title, description])
}
