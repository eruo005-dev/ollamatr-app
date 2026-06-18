import { useEffect } from 'react'
import { Link } from 'react-router'
import { Home, Compass } from 'lucide-react'

/* Real 404 view for unknown routes (previously every unknown path silently
 * rendered the home shell). Note: on Vercel's static SPA rewrite the HTTP
 * status is still 200; this gives users an honest, navigable not-found state. */
export default function NotFound() {
  // Inject a noindex robots meta while this view is mounted. Vercel's SPA
  // rewrite serves a 200 for unknown routes, so without this crawlers would
  // index soft-404s. Removed on unmount so real pages stay indexable.
  useEffect(() => {
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex'
    document.head.appendChild(meta)
    return () => {
      document.head.removeChild(meta)
    }
  }, [])

  return (
    <section
      className="flex min-h-[70vh] w-full flex-col items-center justify-center px-6 text-center"
      aria-labelledby="notfound-title"
    >
      <p className="font-mono text-sm tracking-[0.3em] text-accent-red-light">404</p>
      <h1
        id="notfound-title"
        className="mt-4 font-display text-3xl font-bold text-text-primary sm:text-4xl"
      >
        Sayfa bulunamadı
      </h1>
      <p className="mt-4 max-w-md font-body text-base leading-relaxed text-text-secondary">
        Aradığın sayfa taşınmış ya da hiç var olmamış olabilir. Aşağıdan ana sayfaya
        dönebilir veya modelleri keşfedebilirsin.
      </p>
      <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 rounded bg-accent-red-deep px-7 py-3.5 font-body text-sm font-semibold tracking-wide text-white transition-colors duration-200 hover:bg-[#A01528]"
        >
          <Home className="h-4 w-4" aria-hidden="true" />
          Ana sayfa
        </Link>
        <Link
          to="/modeller"
          className="inline-flex items-center justify-center gap-2 rounded border border-border-subtle px-7 py-3.5 font-body text-sm font-semibold tracking-wide text-text-primary transition-all duration-200 hover:border-accent-red hover:text-accent-red-light"
        >
          <Compass className="h-4 w-4" aria-hidden="true" />
          Modeller
        </Link>
      </div>
    </section>
  )
}
