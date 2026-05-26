# OllamaTR Phase 2 — Auditing Swarm + Tauri Product Build

## Part A: Auditing Swarm (4 Reviewers → Fix Agents → Rebuild)

### Stage A1: Parallel Reviews (4 agents)
| Agent | Focus | Input |
|-------|-------|-------|
| Audit_Design | Design fidelity vs design.md | Source code + design docs |
| Audit_UX | Navigation, routing, interaction bugs | Source code + deployed URL |
| Audit_Code | Code quality, TypeScript, performance | Source code |
| Audit_Content | Turkish text, completeness, model data | Source code + design docs |

### Stage A2: Triage — collect all findings into gap list

### Stage A3: Fix Agents — dispatch targeted fixes

### Stage A4: Rebuild + Redeploy

## Part B: Tauri Product Build

### Scope
Since Rust/cargo is unavailable in sandbox:
1. **Tauri Frontend UI** (React + TypeScript + Tailwind) — The complete installer wizard experience
2. **Tauri Rust Project Structure** — All config files ready for local compilation

### Pages/Screens
1. **Installer Welcome** — Brand splash, version check
2. **System Check** — RAM, OS, disk space detection
3. **KVKK Consent** — Explicit consent flow, data handling explanation
4. **Model Selection** — Pick initial models to download during install
5. **Install Progress** — Animated progress bar with real-time logs
6. **First Run Setup** — Open WebUI config, user preferences
7. **Main App Shell** — The OllamaTR desktop app UI (sidebar, chat, model manager)

### Tech
- React 19 + TypeScript + Tailwind CSS v3 (same stack)
- Simulated as a web app (deployed separately as installer.ollamatr.com mockup)
- Tauri config files (tauri.conf.json, Cargo.toml) for local build
