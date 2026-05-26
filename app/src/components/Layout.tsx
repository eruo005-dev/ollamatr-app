import { useEffect, type ReactNode } from 'react'
import type LenisType from 'lenis'
import Navbar from './Navbar'
import Footer from './Footer'
import CookieBanner from './CookieBanner'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  useEffect(() => {
    let lenis: LenisType | null = null
    let rafId = 0
    let cancelled = false

    const raf = (time: number) => {
      lenis?.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    async function initLenis() {
      try {
        const Lenis = (await import('lenis')).default
        if (cancelled) return
        lenis = new Lenis({
          lerp: 0.1,
          smoothWheel: true,
        })
        rafId = requestAnimationFrame(raf)
      } catch {
        // Lenis not available, fall back to native scrolling
      }
    }

    initLenis()

    return () => {
      cancelled = true
      cancelAnimationFrame(rafId)
      lenis?.destroy()
    }
  }, [])

  return (
    <div className="relative min-h-[100dvh]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-accent-red focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:font-semibold focus:text-white"
      >
        İçeriğe geç
      </a>
      <Navbar />
      <main id="main-content">{children}</main>
      <CookieBanner />
      <Footer />
    </div>
  )
}
