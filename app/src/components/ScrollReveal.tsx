/** Framer Motion `useInView` wrapper that fades children up once visible — extracted from Fiyatlandirma/Hakkimizda/Topluluk pages. */
import { useRef } from 'react'
import type { ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'
import { easeExpoOut } from '@/lib/animations'

export interface ScrollRevealProps {
  children: ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'section' | 'article'
}

function ScrollRevealDiv({ children, delay = 0, className }: Omit<ScrollRevealProps, 'as'>) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay, ease: easeExpoOut }}
    >
      {children}
    </motion.div>
  )
}

function ScrollRevealSection({ children, delay = 0, className }: Omit<ScrollRevealProps, 'as'>) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  return (
    <motion.section
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay, ease: easeExpoOut }}
    >
      {children}
    </motion.section>
  )
}

function ScrollRevealArticle({ children, delay = 0, className }: Omit<ScrollRevealProps, 'as'>) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  return (
    <motion.article
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay, ease: easeExpoOut }}
    >
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
