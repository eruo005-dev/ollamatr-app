# OllamaTR — Design Read

> Recorded per the [taste-skill](https://github.com/Leonxlnx/taste-skill)
> `design-taste-frontend` v2 protocol. This file is the single source of truth
> for the visual posture of the site. If you're about to add a "delightful
> micro-animation", a gradient glow, a 3D card tilt, an infinite-loop shimmer,
> or anything that reads like an "AI demo reel" — re-read this first.

## The Read

> **Reading this as: trust-first community OSS landing for a Turkish
> technical audience (developers, KOBİ teknoloji liderleri, students), with a
> calm-confident dark-tech language, leaning toward Tailwind utilities +
> restrained motion + Turkish cultural accent.**

## The Dials

| Dial | Value (1-10) | Rationale |
|------|--------------|-----------|
| `DESIGN_VARIANCE` | **4** | The site sells trust + KVKK + named-operator accountability. Symmetry > Awwwards-experimental. |
| `MOTION_INTENSITY` | **3** | Previously read as an AI demo; staggers + glows + tilts now stripped to instant / static. Motion only where it carries meaning (page transitions, accordion expand). |
| `VISUAL_DENSITY` | **4** | Standard breathing room; not airy art-gallery, not packed cockpit. |

## Anti-Default Discipline (banned by default)

The following are **banned without explicit user override**:

- ❌ AI-purple gradient meshes / blue-mesh hero backgrounds
- ❌ Neon glow box-shadows (`shadow-[0_0_Xpx_rgba(...)]`)
- ❌ Animated text-shadow ("glow-pulse" keyframes)
- ❌ Radial-gradient halos behind hero CTAs
- ❌ Linear-gradient `from-X via-Y to-Z` decorative overlays (functional progress fills OK)
- ❌ 3D mouse-tilt cards
- ❌ Particle-stream canvases (red vertical streams, drifting orbs, etc.)
- ❌ Animate-pulse on small status dots (functional, but reads as "AI alive")
- ❌ Infinite-loop micro-animations of any kind
- ❌ Glassmorphism layered on top of glassmorphism
- ❌ Centered hero over dark mesh ("AI startup template" default)
- ❌ Cascading Framer-Motion stagger fade-ups across every section
- ❌ Uppercase ALL-CAPS hero H1s ("TÜRKİYE'NİN AI DEVRİMİNE...")

## Kept (functional motion only)

- ✅ Page-route transitions via React Router's `Suspense` fallback
- ✅ Accordion expand/collapse (`tailwindcss-animate`)
- ✅ Hover border-color shifts on cards & buttons (200ms ease)
- ✅ `transition-colors` on form / filter state changes
- ✅ Hash-anchor smooth scroll via Lenis (single passive integration)
- ✅ Solid-fill progress bars (HangiModel wizard)
- ✅ Static status dots (color alone signals state)

## Typography

- **Display:** Space Grotesk 400 / 700 (self-hosted via `@fontsource`)
- **Body:** Inter 400-700 (self-hosted)
- **Mono:** JetBrains Mono 400-600 (self-hosted)
- **Hero H1:** sentence-case, NOT all-caps. Tracking-tight, leading-[1.05].
- **Italics for emphasis:** same family. Never inject a serif word into a sans headline.

## Color

| Token | Hex | Use |
|-------|-----|-----|
| `bg-obsidian` | `#0A090C` | Page background |
| `bg-charcoal` | `#131217` | Sections, cards |
| `bg-surface` | `#1A191D` | Inputs, raised surfaces |
| `accent-red` | `#D91E36` | Single accent (Color Consistency Lock per taste-skill 4.2) |
| `accent-red-light` | `#FF3B5C` | Hover state for accent |
| `text-primary` | `#F4F4F5` | Body + headings |
| `text-secondary` | `#8A8A93` | Subtext |
| `text-muted` | `#80808A` | Tertiary / meta (AA contrast bumped from `#5A5A63`) |
| `safe-green` | `#00E5A0` | Status: OK, low-RAM |
| `warn-yellow` | `#FFB800` | Status: warning, mid-RAM, non-commercial |

**One accent locked.** No "blue CTA in section 7". No "teal status badge in
the footer". If you need to call attention beyond `accent-red`, use
`text-text-primary` weight + size, not a new hue.

## Iconography

- **Currently:** `lucide-react` (taste-skill discourages as default, but
  the project already depends on it and a swap is out of scope).
- **Stroke width:** standardized at default `2.0`.
- **One family:** no mixing with Phosphor / Tabler / Radix icons.

## What changed in this pass

The taste-skill audit converged on the same conclusion as the brand audit (S3):
**the site looked like an AI-startup demo, not a Turkish community project.**
Stripped in commit `37dcaa5`: glow box-shadows, neon textShadows, radial halos,
red particle canvas, status-dot pulses, hero gradient overlays, uppercase H1.
Stripped in this commit:
- 3D mouse tilt on `TiltCard`
- Framer Motion staggered fade-up reveals (neutered at the source primitive
  in `src/lib/animations.ts` — JSX untouched site-wide)

## When to break these rules

- The user explicitly asks for a richer motion pass
- A new section needs a one-off attention pull (e.g., a launch announcement)
- A Turkish cultural motif (kilim warp, ebru dispersion, hat sanatı stroke)
  is being introduced — those are intentional brand moves and are encouraged

For anything else, the answer is: **don't.**
