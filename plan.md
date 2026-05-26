# OllamaTR — Expanded Vision & Build Plan

## Vision Upgrade: "The Everything AI Infrastructure for Turkey"

### Core Product (MVP — 4 week)
1. **Türkçe AI Hub** — Landing page + model catalog + recommendation wizard
2. **OllamaTR Installer** — Tauri-based desktop app wrapping Ollama + Open WebUI in Turkish
3. **Model Catalog** — Curated Turkish-fine-tuned models with RAM badges, benchmarks, KVKK compliance tags
4. **"Hangi Model Bana Uygun?" Wizard** — Interactive model recommender
5. **Turkish Docs** — Full documentation in Turkish (install guides, model cards, API refs)
6. **KVKK Compliance Center** — Landing page + compliance docs + local-only guarantees
7. **Pricing Page** — Pro tier (149₺/mo) + KOBİ bundles
8. **Dashboard** — User portal for downloads, model management, usage stats

### Expanded Vision (Phase 2)
- **OllamaTR Cloud** — Managed Ollama hosting in Turkey (data residency)
- **OllamaTR Enterprise** — On-premise KOBİ bundles with support
- **TR Fine-tune Lab** — Community-driven Turkish model fine-tuning
- **API Gateway** — REST API for all models with Turkish prompt templates

---

## Build Stages

### Stage 1 — Design & Asset Generation
- Generate hero image assets (AI/Turkey themed)
- Create design system (colors, typography, spacing)
- Plan information architecture

### Stage 2 — Web Application Build (vibecoding-webapp-swarm)
- Next.js 15 + TypeScript + Tailwind CSS + shadcn/ui
- Sections: Hero, Model Catalog, Wizard, Docs, KVKK, Pricing, Dashboard
- All copy in Turkish
- Interactive wizard with smooth animations
- Responsive design

### Stage 3 — Deploy
- Deploy to production
- Verify all sections, links, interactivity

---

## Skill Loading
- Stage 2: `vibecoding-webapp-swarm` for React webapp build
- Deploy: `deploy_website` tool

## File Structure
- `/mnt/agents/output/design/design.md` — Design PRD
- `/mnt/agents/output/design/assets/` — Generated images
- `/mnt/agents/output/ollamatr-web/` — Next.js project
