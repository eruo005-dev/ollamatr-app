import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'plugin-inspect-react-code'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  // Absolute base: required for BrowserRouter — relative ('./') asset URLs
  // break on nested routes like /modeller (assets would resolve under the route path).
  base: '/',
  plugins: [
    // The inspect plugin injects data-attrs for the in-browser inspector;
    // gate to dev so it never leaks into production HTML (per T1 audit).
    ...(mode === 'development' ? [inspectAttr()] : []),
    react(),
  ],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Keep framer-motion off the home critical path: it's only needed by the
    // lazily-loaded CookieBanner, so drop it from the entry's modulepreload set.
    modulePreload: {
      resolveDependencies: (_filename, deps) =>
        deps.filter((d) => !d.includes('framer-motion')),
    },
    rollupOptions: {
      output: {
        manualChunks: {
          // Split heavy animation deps so routes that don't use them
          // (KVKK, Modeller, Nabız, etc.) don't pay the parse cost.
          'framer-motion': ['framer-motion'],
          'gsap': ['gsap', 'gsap/ScrollTrigger', '@gsap/react'],
          'lenis': ['lenis'],
        },
      },
    },
  },
}));
