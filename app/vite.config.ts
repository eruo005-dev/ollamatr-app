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
