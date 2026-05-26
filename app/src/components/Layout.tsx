import { useEffect, type ReactNode } from 'react'
import type LenisType from 'lenis'
import Navbar from './Navbar'
import Footer from './Footer'

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
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
