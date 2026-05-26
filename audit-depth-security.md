# OllamaTR — Security + Privacy Operational Audit
**Agent:** T3
**Date:** 2026-05-26
**Target:** https://ollamatr-app.vercel.app + `C:\Users\eruo0\Desktop\OllamaTR\`
**Scope:** read-only operational security + privacy hardening

---

## Verdict
**NEEDS HEADERS** — the asset surface itself is clean (zero npm vulns, no source maps shipped, no third-party scripts, no trackers, no secrets in bundle or git history), but the HTTP response is missing every defensive header except HSTS. A drive-by clickjacking / MIME-sniff / cross-origin attacker has the full default browser leash. One inconsistent contact-email domain (`@ollamatr.com` vs `@ollamatr.dev`) is a minor privacy/legal coherence bug. SPA deep-link routing is also broken (Vercel returns 404 for `/topluluk` — not strictly a security issue, but worth flagging while editing `vercel.json`).

---

## HTTP headers status (production GET /)
| Header | Status | Recommendation |
|---|---|---|
| `Strict-Transport-Security` | **PRESENT** — `max-age=63072000; includeSubDomains; preload` | Keep. Submit to hstspreload.org once `ollamatr.dev`/`.com` domain is finalised. |
| `Content-Security-Policy` | **ABSENT** | Add strict CSP — self-hosted fonts, no inline scripts, no external sources needed. |
| `X-Frame-Options` / CSP `frame-ancestors` | **ABSENT** | Set `frame-ancestors 'none'` via CSP (modern equivalent of `X-Frame-Options: DENY`). Clickjacking exposure today. |
| `X-Content-Type-Options` | **ABSENT** | Add `nosniff`. |
| `Referrer-Policy` | **ABSENT** | Add `strict-origin-when-cross-origin` (or `no-referrer` for max privacy). |
| `Permissions-Policy` | **ABSENT** | Deny `camera`, `microphone`, `geolocation`, `payment`, `usb`, `accelerometer`, `gyroscope` — none used. |
| `Cross-Origin-Opener-Policy` | **ABSENT** | `same-origin`. |
| `Cross-Origin-Embedder-Policy` | **ABSENT** | `require-corp` if you want full COOP/COEP isolation. Optional for a pure SPA — safe to omit and revisit. |
| `Cross-Origin-Resource-Policy` | **ABSENT** | `same-origin`. |
| `Access-Control-Allow-Origin` | **PRESENT** — `*` (Vercel default) | Harmless for a public static site. If a serverless API is ever added, lock down per-route. |

TLS: HTTPS only, Vercel-managed cert, HSTS preload-ready directive set. No HTTP→HTTPS redirect needed to test — Vercel serves only HTTPS for `*.vercel.app`.

---

## Recommended `vercel.json` headers block
Add to **root** `vercel.json` (the active one used by Git deploys). Also fixes SPA deep-link 404 with a rewrite to `index.html`.

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "buildCommand": "cd app && npm install && npm run build",
  "outputDirectory": "app/dist",
  "installCommand": "echo \"root install skipped — handled inside app/ via buildCommand\"",
  "framework": null,
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; font-src 'self' data:; img-src 'self' data: blob:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'; upgrade-insecure-requests" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy",
          "value": "camera=(), microphone=(), geolocation=(), payment=(), usb=(), accelerometer=(), gyroscope=(), magnetometer=(), interest-cohort=()" },
        { "key": "Cross-Origin-Opener-Policy", "value": "same-origin" },
        { "key": "Cross-Origin-Resource-Policy", "value": "same-origin" },
        { "key": "X-Frame-Options", "value": "DENY" }
      ]
    },
    {
      "source": "/assets/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

Notes:
- `style-src 'unsafe-inline'` is required because Tailwind + framer-motion inject runtime inline styles. Vite-generated CSS itself is in `/assets/*.css` and is `'self'`-safe.
- `connect-src 'self'` — confirmed no telemetry/fetch endpoints in the bundle.
- `frame-ancestors 'none'` + `X-Frame-Options: DENY` belt-and-braces for older browsers.
- After deploy, verify on https://securityheaders.com — target grade A or A+.

---

## Findings by category

### Third-party requests
**Zero external runtime origins.** HTML loads exactly one CSS + one JS, both same-origin. All fonts (Inter, JetBrains Mono, Space Grotesk) are self-hosted via `@fontsource/*` — woff2 files in `/assets/`. No Google Fonts, no CDN-hosted JS/CSS, no iframes, no cross-origin images. Inline JS in HTML is only the Vite module preload tag. Privacy posture for outbound requests is excellent.

External *links* (anchor `href`, not loaded resources): GitHub, Patreon, GitHub Sponsors — all carry `target="_blank" rel="noopener noreferrer"` verified across `Footer.tsx`, `Fiyatlandirma.tsx`, `Dokumantasyon.tsx`, `KVKK.tsx`. **Pass.**

### Bundle leakage
- Hardcoded API keys: **0**.
- Strings matching `(secret|password|token)` case-insensitive: only one hit (`index-Cvh5dSvf.js`) and it is React-internal vocabulary (`secret`-named props inside React DevTools / hydration code), not a credential.
- Emails in bundle: `iletisim@ollamatr.dev`, `iletisim@ollamatr.com`, `privacy@ollamatr.com` — **inconsistency**. Three different domains across `Fiyatlandirma`, `Hakkimizda`, `KVKK`, `CerezPolitikasi`. Pick one (recommend `@ollamatr.dev` since it matches the live deployment subdomain pattern and Topluluk Edition branding) and grep-replace. Personal emails: **none found**.
- Stack-trace artifacts: only generic React error URLs (`https://react.dev/errors/`, `https://reactrouter.com/...`) — these are framework defaults, not internal paths. No `C:\Users\...` or repo-path leakage.
- `vercel.com/api/`: **0 hits**.

### Source maps
**Not shipped.** No `.map` files in `app/dist/assets/`. Vite default for `vite build` does not emit source maps unless `build.sourcemap: true`. Confirmed clean.

### npm audit (production tree)
```
prod: 38 deps
critical: 0  high: 0  moderate: 0  low: 0  info: 0
```
Clean. Production runtime is React 19, react-router 7, framer-motion 12, gsap 3, lenis, lucide-react, clsx, tailwind-merge, plus `@fontsource/*`. No legacy or abandoned packages. (Dev tree has 382 deps but those never ship.)

### Cookies / localStorage
- **Zero cookies set by the site.** Confirmed via response headers — no `Set-Cookie` from Vercel either.
- **localStorage key:** `ollamatr-cookie-consent` only. Stores `{ necessary, analytics, marketing, preferences, timestamp }` — all booleans + ISO string. No IP, no fingerprint, no user ID. Cannot leak PII because none is collected. Written only after user explicitly clicks Accept / Save Preferences. **Pass.**
- One real-world note: the consent UI offers `analytics` / `marketing` / `preferences` toggles, but **no analytics or marketing scripts actually exist** to honour those flags. That is the safe direction (over-asking, under-collecting), but the categories should be relabelled or hidden until you genuinely run something they'd gate. A privacy regulator could otherwise read this as misleading-by-design.
- `Indir.tsx` uses `navigator.userAgent` (OS-sniff for download CTA) and `navigator.clipboard.writeText` (copy SHA hash) — both client-side only, no exfiltration.

### Vercel deployment protection
Cannot inspect dashboard state read-only, but observable signals:
- Production responds `200 OK` without auth → **Deployment Protection is OFF** for production (correct for a public marketing site).
- No `_vercel_jwt` cookie set → **Preview Protection** likely also off. Recommend enabling **Password Protection for preview deployments only** so unfinished PR previews aren't indexed/leaked.
- `X-Vercel-Id: fra1::...` → served from Frankfurt edge (EU data residency — good for KVKK posture).
- No `@vercel/analytics` or `@vercel/speed-insights` package in `package.json` → both telemetry features disabled at code level even if toggled in dashboard. **Pass.**

### Logging / telemetry
Production bundle contains `console.error` and `console.warn` only (typically inside framework error paths and the React error boundary). No raw `console.log` shipped. Acceptable — these only fire on runtime errors and stay client-side.

### Git history
Quick sweep of `git log --all -p | grep -iE "api[-_]key|secret|password|token|sk-[a-zA-Z0-9]"` returned only:
- Audit-report prose mentioning those words.
- Font-package URLs from `package-lock.json`.
- No actual credentials, no `sk-...` OpenAI-style strings, no JWTs.

**.gitignore** (root): ignores `node_modules/`, `dist/`, `.env`, `.env.local`, `.vercel/`, `.claude/worktrees/`, logs, `.DS_Store`. Solid.
**.gitignore** (app/): ignores `node_modules`, `dist`, `.vercel`. Solid (though `.env*` could be duplicated here defensively).

---

## Top 10 hardening actions (priority)
1. **Add the `headers` block to root `vercel.json`** (CSP + nosniff + Referrer-Policy + Permissions-Policy + COOP/CORP + frame-ancestors). One commit, ~A grade on securityheaders.com.
2. **Add SPA rewrite to `vercel.json`** so `/topluluk`, `/kvkk`, etc. don't 404 on direct navigation or refresh.
3. **Unify contact email** to a single domain across `Fiyatlandirma`, `Hakkimizda`, `KVKK`, `CerezPolitikasi`. Three variants currently shipped is a legal-coherence bug as much as a security one (KVKK Art. 10 requires *one* contact channel).
4. **Hide unused consent categories** in `CookieBanner.tsx` — until you actually load analytics/marketing/preference-driven code, the toggles are window-dressing and could be argued as deceptive UI. Show `necessary` only, or label the others "Bu sürümde kullanılmıyor".
5. **Enable Vercel preview password protection** so PR/preview URLs aren't crawlable.
6. **Submit HSTS preload** to https://hstspreload.org once the final apex domain is set (the directive is already preload-ready).
7. **Add `app/.gitignore` `.env*` line defensively** even though the root already covers it.
8. **Lock `Access-Control-Allow-Origin`** per-route if/when any serverless function is added (currently `*` is harmless on a static site).
9. **Run `npm audit` in CI** (GitHub Action) on every PR — there are 0 vulns today, won't always be.
10. **Subresource Integrity** is N/A today (zero external scripts) — but if any CDN is *ever* re-introduced, generate `integrity="sha384-..."` for it.

---

## What to do on day-1 of "real" launch
- **Pick one analytics provider** with strong KVKK posture. Ranking (best → worst): **Plausible (EU-hosted, cookieless)** > **Umami (self-hosted on Vercel)** > **Vercel Web Analytics (EU edge but US company, IP-hashed)** > Google Analytics 4 (avoid — Schrems II / IP transfer issues). Whatever you pick, wire it behind the existing `analytics` consent toggle in `CookieBanner.tsx` — *do not* load the script before consent.
- **Disable preview indexing** via `X-Robots-Tag: noindex` on preview URLs (Vercel supports per-environment headers).
- **If contact forms launch:** add Cloudflare Turnstile or hCaptcha (cookieless option), CSRF tokens, server-side rate limit, sender domain DKIM/SPF/DMARC.
- **If payment ever lands:** Stripe Checkout (redirect mode) keeps you out of PCI-DSS SAQ-D. Avoid embedding any card-input iframe directly until you understand SAQ-A vs SAQ-A-EP scope.
- **Apex domain decision** (`ollamatr.com` vs `ollamatr.dev`): pick *before* HSTS preload, before email unification, and before any KVKK notice goes out — changing it later is a paper-trail mess under KVKK Art. 10.
- **Set up a `security.txt`** at `/.well-known/security.txt` with the unified contact email so researchers have a reporting channel.
- **Rotate the local dev environment** (no current `.env` shipped, but once you have one, document a rotation cadence for any future API keys).
- **Re-run this audit** post-headers + post-analytics-decision. Two key shifts will move the verdict to HARDENED.
