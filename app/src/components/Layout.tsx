import { useEffect, type ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let lenis: any = null
    let rafId: number

    async function initLenis() {
      try {
        const Lenis = (await import('lenis')).default
        lenis = new Lenis({
          lerp: 0.1,
          smoothWheel: true,
        })

        function raf(time: number) {
          lenis.raf(time)
          rafId = requestAnimationFrame(raf)
        }
        rafId = requestAnimationFrame(raf)
      } catch (e) {
        // Lenis not available, fall back to native scrolling
      }
    }

    initLenis()

    return () => {
      cancelAnimationFrame(rafId)
      if (lenis) {
        lenis.destroy()
      }
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
