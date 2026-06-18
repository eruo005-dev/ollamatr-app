/** Framer Motion `useInView` wrapper that fades children up once visible — extracted from Fiyatlandirma/Hakkimizda/Topluluk pages. */
import { useRef } from 'react'
import type { ReactNode } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { easeExpoOut } from '@/lib/animations'

export interface ScrollRevealProps {
  children: ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'section' | 'article'
}

// Shared reveal logic: when prefers-reduced-motion is set, render fully visible
// with no transform/animation (framer JS motion is NOT caught by the CSS media
// query, so this guard is required for WCAG 2.3.3).
function useReveal(ref: React.RefObject<Element | null>) {
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const reduce = useReducedMotion()
  return reduce
    ? { initial: false as const, animate: { opacity: 1, y: 0 }, transition: { duration: 0 } }
    : {
        initial: { opacity: 0, y: 40 },
        animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 },
      }
}

function ScrollRevealDiv({ children, delay = 0, className }: Omit<ScrollRevealProps, 'as'>) {
  const ref = useRef<HTMLDivElement>(null)
  const r = useReveal(ref)
  return (
    <motion.div ref={ref} className={className} initial={r.initial} animate={r.animate}
      transition={r.transition ?? { duration: 0.7, delay, ease: easeExpoOut }}>
      {children}
    </motion.div>
  )
}

function ScrollRevealSection({ children, delay = 0, className }: Omit<ScrollRevealProps, 'as'>) {
  const ref = useRef<HTMLElement>(null)
  const r = useReveal(ref)
  return (
    <motion.section ref={ref} className={className} initial={r.initial} animate={r.animate}
      transition={r.transition ?? { duration: 0.7, delay, ease: easeExpoOut }}>
      {children}
    </motion.section>
  )
}

function ScrollRevealArticle({ children, delay = 0, className }: Omit<ScrollRevealProps, 'as'>) {
  const ref = useRef<HTMLElement>(null)
  const r = useReveal(ref)
  return (
    <motion.article ref={ref} className={className} initial={r.initial} animate={r.animate}
      transition={r.transition ?? { duration: 0.7, delay, ease: easeExpoOut }}>
      {children}
    </motion.article>
  )
}

export function ScrollReveal({ children, delay = 0, className, as = 'div' }: ScrollRevealProps) {
  if (as === 'section') {
    return <ScrollRevealSection delay={delay} className={className}>{children}</ScrollRevealSection>
  }
  if (as === 'article') {
    return <ScrollRevealArticle delay={delay} className={className}>{children}</ScrollRevealArticle>
  }
  return <ScrollRevealDiv delay={delay} className={className}>{children}</ScrollRevealDiv>
}

export default ScrollReveal
