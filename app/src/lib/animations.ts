/** Shared Framer Motion animation primitives extracted from Fiyatlandirma/Hakkimizda/Topluluk/Dokumantasyon/Indir/KVKK pages. */
import type { Variants } from 'framer-motion'

export const easeExpoOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.7,
      ease: easeExpoOut,
    },
  }),
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeExpoOut,
    },
  },
}
