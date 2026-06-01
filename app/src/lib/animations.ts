/**
 * Shared animation primitives.
 *
 * Previously orchestrated a cascading Framer Motion fade-up reveal across
 * every page — read as an AI-demo-reel by the brand audit (S3 + taste-skill
 * MOTION_INTENSITY: 3 read). Now neutered to instant-visible. Consumers
 * (Fiyatlandirma / Hakkimizda / Topluluk / Dokumantasyon / Indir / KVKK)
 * keep their motion JSX intact — the variants just resolve to no-op.
 *
 * Re-enable later by raising the dial: replace `fadeUp` with the slow
 * variant in this file's git history and the cascade returns site-wide.
 */
import type { Variants } from 'framer-motion'

export const easeExpoOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

const STATIC: Variants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0 } },
}

export const fadeUp: Variants = {
  hidden: { opacity: 1, y: 0 },
  visible: () => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0 },
  }),
}

export const staggerContainer: Variants = STATIC
export const staggerChild: Variants = STATIC
