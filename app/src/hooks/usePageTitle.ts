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

    if (description) {
      const meta =
        document.querySelector<HTMLMetaElement>('meta[name="description"]') ??
        (() => {
          const m = document.createElement('meta')
          m.setAttribute('name', 'description')
          document.head.appendChild(m)
          return m
        })()
      meta.setAttribute('content', description)
    }

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
