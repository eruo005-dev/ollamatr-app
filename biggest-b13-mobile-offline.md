# B13 — OllamaTR Mobile + Offline Strategy

**Author:** B13
**Scope:** How OllamaTR meets a mobile-first Turkish market when Ollama itself is desktop-only.
**TL;DR:** Desktop-first for 90 days. PWA chat client month 4-6. Native Android in Year 2. iOS deferred. The "100% yerel" promise survives on mobile only via two routes: (a) phone-as-thin-client to a home/office desktop, or (b) on-device inference on the small minority of flagship phones. Everyone else gets a bridge model with explicit consent.

---

## 1. The mobile reality in Türkiye

Türkiye is one of the most mobile-skewed internet markets in Europe. The user base OllamaTR claims to serve — KOBİ owners, freelancers, students, civil servants worried about KVKK — overwhelmingly lives on a phone.

**Headline stats (2024-2026 directional):**
- **~83-87% smartphone penetration** among adults; ~95%+ among under-35s.
- **Mobile share of web traffic in TR: ~72-78%** vs desktop ~20-25% (StatCounter / SimilarWeb consistent range). Higher than the European average.
- **Mobile-only internet users: 30-35%** of the online population. They have no laptop at home, period.
- **KOBİ owners under 50:** estimated 55-65% run their business primarily from a phone (WhatsApp Business, Trendyol seller app, e-Devlet mobile, banking).
- **Average Android phone in TR: 4-6 GB RAM, mid-tier Snapdragon 6-series or MediaTek Helio**. The flagship-tier (8-12 GB RAM, capable of running a 3B Q4 model) is maybe **8-12% of the installed base**.
- **iPhone share in TR: ~15-18%** but skewed to higher income. Apple Silicon iPads barely register.

**Why the gap matters for OllamaTR:**
1. The "100% yerel, KVKK-uyumlu" pitch is its strongest differentiator. On desktop it lands. On phone, the same user discovers they can't run Ollama on the device they actually use → trust collapses.
2. Every Turkish competitor (BTK Asistan, T3 AI's mobile launches, future Turkcell AI) will lead with a phone app. If OllamaTR has no mobile story by mid-2027, it is a desktop curiosity, not a movement.
3. The KOBİ pitch — "run AI on your office computer, not on a foreign cloud" — is real, but only if the owner can reach that office computer from their phone while traveling/at home/with a client.

The mobile question is not optional. The question is sequencing and which compromise on "yerel."

---

## 2. Option A — PWA chat client (chat.ollamatr.com.tr)

**Concept:** A web-based chat UI hosted at `chat.ollamatr.com.tr`, installable as a PWA (add to home screen). It does **no inference itself**. It connects to the user's own Ollama instance running on their desktop/NAS/home server.

**Connection paths (in order of practicality):**
1. **LAN mDNS / direct IP** when phone and desktop are on the same WiFi. Simplest. Works zero-config in 60% of cases.
2. **Tailscale / WireGuard tunnel** when phone is on cellular or guest WiFi. User installs Tailscale once on both devices; OllamaTR's PWA discovers the Ollama node via Tailscale's MagicDNS. This is the killer config.
3. **Reverse tunnel via a small relay** (Cloudflare Tunnel, ngrok, or a self-hosted bore) for users who can't install Tailscale. We document but don't operate the relay.

**TR market fit:** **Mid-high.** Lands perfectly with the ~25-30% of users who already have a desktop they leave on. Useless for the mobile-only 30-35%.

**Engineering effort:** **S-M.** The chat UI is already being built for desktop. A PWA wrapper, mDNS scan, and Tailscale-aware host picker are 3-4 weeks. The hard part is the onboarding flow ("install Tailscale on your home PC, then come back here") — that's a documentation and video problem, not an engineering one.

**Tradeoffs:**
- **Battery:** Excellent. The phone is just a thin client; the desktop burns the watts.
- **Privacy:** Excellent. Traffic flows phone → Tailscale → user's own machine. Nothing transits OllamaTR servers if Tailscale is used. With mDNS LAN, even better.
- **Latency:** LAN: 50-150ms TTFT. Tailscale over cellular: 300-800ms TTFT depending on carrier. Acceptable for chat, painful for voice.
- **KVKK story:** **Holds cleanly.** No personal data ever touches OllamaTR infrastructure. The PWA is a static asset. Tailscale is end-to-end encrypted. Document the data flow in the KVKK aydınlatma metni and you're done.

**Sequence vs Tauri:** Comes **after** Tauri desktop installer ships. The PWA depends on more people having Ollama running stably; Tauri makes that happen. Build PWA in parallel from month 3, ship month 5-6.

**Verdict:** Ship this. It's the highest leverage move because it converts every existing desktop user into a 2-device user without changing the inference story.

---

## 3. Option B — Native Android app

Three distinct sub-options here, each with different tradeoffs:

### B1. Termux-based ("Linux on Android")
Termux can run llama.cpp directly. With an Ollama-compatible wrapper, a Snapdragon 8 Gen 2 / 8 Gen 3 phone with 12+ GB RAM can run a **3B Q4_K_M model at 6-12 tok/s**. 7B Q4 is borderline (3-5 tok/s, thermal throttling after 60 seconds).

- **UX:** Terrible by default. We'd need to ship a one-tap installer that drops scripts into Termux, plus an OllamaTR APK that talks to the Termux Ollama via localhost. Brittle. Termux updates break things.
- **Distribution:** F-Droid (Termux's home) + sideload. Google Play forbids Termux's exec model.

### B2. Native llama.cpp embedded in the APK
Skip Termux. Bundle a JNI-wrapped llama.cpp build inside an OllamaTR Android app. Ship 2-3 curated models (Gemma 2B Q4, Phi-3 Mini Q4, a TR-fine-tuned 3B). Models downloaded on first run from a CDN in TR (BulutBilişim or similar).

- **UX:** Clean. One install. Pick a model, chat.
- **Distribution:** Google Play allows this (Meta's, Google's, and Mozilla's on-device LLM apps prove it). Also F-Droid for the privacy crowd.
- **This is the realistic path.**

### B3. WebLLM / MediaPipe wrapper
Use Google's MediaPipe LLM Inference API (supports Gemma 2B on Android). Lighter eng lift but locks us to Google's model choices.

**TR market fit:** **Mid.** Hits the 8-12% of TR Android users on flagship hardware. Useless for the median 4 GB phone. But that 8-12% is the high-intent early adopter cohort.

**Engineering effort:** **L.** Native Android dev, JNI bindings, model packaging, OTA model updates, battery profiling, thermal management, GPU delegate work (Adreno/Mali). 4-6 months for a v1 with one engineer.

**Tradeoffs:**
- **Battery:** Brutal. A 3B Q4 inference at 8 tok/s drains 8-15% of battery per 1000-token response on flagship hardware. Will throttle hard after 2-3 minutes. Users will notice.
- **Privacy:** Perfect on-device. Better than the desktop story because the model never leaves the phone.
- **Latency:** Excellent for short prompts (no network). Bad for long contexts because prompt processing is slow on phone NPUs.
- **KVKK story:** **The strongest possible.** "Verileriniz telefonunuzdan çıkmıyor" is literally true. Even better than desktop Ollama (which technically could be exfiltrated by malware).

**Sequence vs Tauri:** **Year 2.** Don't start until desktop + PWA are stable and we have ≥30k DAU on desktop to justify the eng spend.

**Verdict:** Build it in Year 2 (B2 path). It's the long-term moat. But it's not the first mobile move.

---

## 4. Option C — Native iOS app

Apple Silicon makes iOS the **technically best** mobile platform for on-device LLMs. MLX is mature. A6 iPhone 15 Pro / 16 Pro runs Phi-3 Mini and Llama 3.2 3B at usable speeds. iPads with M-series chips can run 7B comfortably.

- **App Store reality:** $99/year, mandatory review (~3 days), 30% take on any IAP. App Store Türkiye is not a fast-moving channel.
- **MLX integration:** ~2-3 months of competent Swift dev for a clean v1. WhisperKit and PrivateLLM prove the pattern.
- **Distribution outside App Store in TR:** Not really possible. TestFlight caps at 10k users.

**TR market fit:** **Low-mid.** ~15-18% iPhone share, concentrated in Istanbul/Ankara/Izmir upper-middle class. The iPhone user is also more likely to be ChatGPT-comfortable already and less moved by the KVKK pitch (they trust Apple).

**Engineering effort:** **L.** Different eng skillset than Android. Hiring a Swift dev in Türkiye is expensive vs hiring an Android dev.

**Tradeoffs:**
- **Battery:** Better than Android because of unified memory and Neural Engine. Still significant.
- **Privacy:** Excellent on-device.
- **Latency:** Best-in-class on mobile. M2/M3 iPads can hit 30+ tok/s on 3B models.
- **KVKK story:** Strong, but iPhone users care less.

**Sequence:** **Defer.** No iOS until business case is clear (Android v1 has shipped and we see paying users asking). Likely 2027+.

**Verdict:** Park it. Not because it's bad — it's actually the best tech — but because the audience is the least convinced by our differentiator.

---

## 5. Option D — Bridge model (cloud fallback in TR DC)

**Concept:** OllamaTR Mobile ships as a chat client. When user has reachable home Ollama → use it. When offline / no home node → fall back to **OllamaTR Cloud**: a rented Ollama cluster in a TR data center (TurkNet, Vodafone Business, DCG, Türk Telekom Pursaklar DC). Optionally cache last N responses locally for true-offline.

**The KVKK twist:** This is the only option where the "100% yerel" claim **softens**. We'd have to rebrand as **"Türkiye'de kalır"** for the cloud-fallback path. The data leaves the user's device but never leaves TR jurisdiction or KVKK coverage.

**TR market fit:** **High.** This is the option that actually serves the mobile-only 30-35%. KOBİ owner on the road, freelance translator on a train, student in a dorm — they all get something that works.

**Engineering effort:** **M-L.** The client is shared with Option A. The cloud cluster needs: GPU instances (rare and expensive in TR DCs), autoscaling, queue management, billing, abuse prevention, model versioning. 3-4 months + ongoing opex.

**Tradeoffs:**
- **Battery:** Excellent (thin client).
- **Privacy:** **The hard tradeoff.** Cloud-fallback breaks the strongest version of the pitch. Mitigations: end-to-end TLS, zero log retention, KVKK-VERBİS registration, contracts with DC operator, optional "never fallback" toggle.
- **Latency:** Excellent if DC is in TR (10-50ms ping nationwide).
- **KVKK story:** **Holds with caveats.** The data leaves the device but stays in Türkiye, processed by a Türkiye-incorporated entity (OllamaTR Ltd. Şti.), no transfer abroad. This is **KVKK-defensible** but it is **not** "yerel" in the strictest sense. The marketing has to be honest or we lose trust.

**Sequence:** Cloud-fallback rides on top of the PWA in month 6-9 as an **opt-in** feature. Default off. User must explicitly enable "Bulut yedek (Türkiye)" with a clear consent screen.

**Verdict:** Build it, but as an explicit opt-in second-class citizen, not the default. The brand depends on this being honest.

---

## 6. Option E — Browser-only WebLLM (transformers.js, WebGPU)

**Concept:** Phi-3 Mini or Gemma 2B running entirely in the mobile browser via WebGPU + transformers.js. Demos exist; Chrome on flagship Android already runs Phi-3 mini at 4-7 tok/s.

- **Reality check:** WebGPU support on TR Android browsers in 2026 is still patchy. iOS Safari WebGPU shipped in 17.4 but is gated. Model download: 1.5-2.5 GB. Cold start: 30-60 seconds. Memory pressure on 6 GB phones triggers OS kills.

**TR market fit:** **Low** in 2026. **Mid** by 2027-2028 as WebGPU matures.

**Engineering effort:** **S-M.** Mostly integration work. The hard part is model curation and offline caching strategy.

**Tradeoffs:**
- **Battery:** Bad. WebGPU isn't as efficient as native NNAPI/MLX.
- **Privacy:** Perfect (purely client-side after download).
- **Latency:** Mediocre.
- **KVKK story:** Strong.

**Sequence:** **Experimental track.** Ship a `lab.ollamatr.com.tr` demo in month 7-9 as a "look what's possible" recruiting/PR play. Not a product.

**Verdict:** A demo, not a strategy. Good for showing the team is ahead.

---

## 7. Recommended sequencing

| Phase | Window | Move | Why |
|---|---|---|---|
| 1 | **Day 1-90** | **Skip mobile entirely.** Ship Tauri desktop installer, model picker, TR onboarding. | Mobile depends on a healthy desktop install base. Build the base first. |
| 2 | **Month 3-4** | Start PWA chat client in parallel with desktop polish. | Reuses chat UI. Low risk. |
| 3 | **Month 4-6** | **Ship PWA chat client (Option A).** mDNS LAN + Tailscale guide. | Converts every desktop user into a 2-device user. Biggest reach per eng hour. |
| 4 | **Month 6-9** | Add opt-in cloud fallback (Option D) for PWA users. TR DC. Explicit consent UX. | Reaches the mobile-only segment without breaking the brand. |
| 5 | **Month 7-9** | Ship WebLLM lab demo (Option E). PR + recruiting. | Cheap, signals technical depth. |
| 6 | **Month 10-12** | Begin native Android scoping. Hire 1 Android engineer. | Validate market with PWA data first. |
| 7 | **Month 13-18** | **Ship native Android (Option B2).** llama.cpp + Gemma 2B + TR-tuned 3B. F-Droid + Play. | The real long-term moat. |
| 8 | **Year 2+** | Reassess iOS (Option C) based on Android paying users. | Don't build until business case is undeniable. |

**Hard "don'ts":**
- Don't ship a native Android app before the PWA. We will get the priorities wrong.
- Don't promise cloud fallback as "yerel". Always brand it "Türkiye'de kalır" and make it opt-in.
- Don't touch Termux (B1). Ship a clean APK or nothing.

---

## 8. Captive portal scenarios — where "yerel" wins decisively

These are the use cases where every other option (ChatGPT, Claude, Gemini) **physically cannot work** and OllamaTR is the only answer:

1. **KOBİ on locked-down office WiFi.** IT blocks `*.openai.com`, `*.anthropic.com`, `*.google.com/ai`. The desktop Ollama on the same LAN is reachable. The PWA on the owner's phone connects via mDNS. Nobody else can serve this user.
2. **Hospital / health clinic networks.** SGK-connected networks heavily filtered. Doctors and admin staff want AI for paperwork. OllamaTR on a local workstation with PWA access is the only KVKK-compliant option.
3. **Defense / public sector contractors.** ASELSAN, TÜBİTAK subcontractors with no external internet. OllamaTR on an air-gapped LAN with PWA chat from internal phones is the killer demo.
4. **Schools.** MEB networks block AI domains. Teacher prep, lesson planning, exam grading on a local OllamaTR box = no captive portal problem.
5. **Banking / fintech back office.** BDDK regs make external AI a non-starter. Internal OllamaTR is allowed.
6. **Hotels in tourist regions (Antalya, Bodrum) using OllamaTR for guest concierge.** Hotel WiFi is unreliable for external API but the in-house OllamaTR server stays up.

**Sales motion:** Lead with these scenarios in the B2B/KOBİ pitch deck. The captive portal angle is the single most defensible commercial wedge OllamaTR has.

---

## 9. Carrier partnerships — Türk Telekom, Vodafone TR, Turkcell

**Reality check:** All three carriers are in some stage of "AI assistant" launches (Turkcell's GAİA, TT's various ChatGPT integrations, Vodafone's TOBi). They will not partner to bundle a competing AI on their SIMs.

**But there are realistic wedges:**

1. **Vodafone Business / TT Business KOBİ bundles.** Carriers sell KOBİ packages (fiber + 5 mobile lines + Office 365). Adding "OllamaTR Pro license on your office PC + PWA on every employee phone" is a clean, low-conflict bundle add. Pitch as **complementary** to TOBi/GAİA (those are personal assistants, OllamaTR is the company's data-private AI). Realistic to land one of three within 18 months if positioned right.

2. **Fiber-router preload.** TT and Vodafone ship Huawei/ZTE home routers with custom firmware. Negotiate a one-tap "Install OllamaTR on your home PC" promo in the router's admin UI. Tiny but cheap.

3. **5G edge compute pilot.** All three carriers are exploring MEC (multi-access edge compute). A pilot where OllamaTR runs at a Turkcell edge node and serves nearby mobile users with sub-20ms latency is technically interesting and KVKK-clean. Pie-in-sky but worth a meeting.

4. **Carrier-billed subscription.** OllamaTR Pro charged on the monthly phone bill (no credit card needed). TR consumers are credit-card-light; carrier billing has 3-5x conversion vs Stripe in similar markets. Worth pursuing for any future paid tier.

**Verdict:** Park carrier partnerships until OllamaTR has ≥100k DAU. Carriers don't talk to anyone smaller. Document the angle and revisit Q4 2027.

---

## 10. Hardware reality — the 4 GB RAM problem

**The honest truth:** Most TR Android phones in active use have **4-6 GB RAM**, a non-flagship SoC, and no usable NPU. They cannot run any LLM. Not a 1B model. Not even with aggressive quantization. The OS itself eats 2.5 GB; Chrome eats another 1.5; there is no room.

**Strategy for the 4 GB cohort (estimated 50-60% of TR Android users):**

1. **PWA + cloud fallback (Option D)** is their **only** path. They thin-client into either a home desktop (if they have one) or OllamaTR Cloud (TR DC). The phone is just a screen.
2. **Be honest in onboarding.** When the PWA detects low-RAM device, the on-device LLM option is hidden. Show: "Telefonunuz cihaz üzerinde AI çalıştıramaz — masaüstünüze veya bulut moduna bağlanın." No false hope.
3. **Don't upsell phones.** Tempting to partner with a phone OEM ("OllamaTR works on Samsung A55+") but it makes us look like a phone affiliate, not an AI company. Skip.
4. **Wait it out.** RAM in the Turkish mid-tier is creeping up: A35 ships with 6 GB, A55 with 8 GB, Redmi Note 14 with 8 GB. By 2028, the median TR phone is probably 8 GB. The on-device option becomes viable for ~30-40% of installed base by then. Build the native app on that timeline.
5. **Cache hard.** For the 4 GB cohort, the PWA should aggressively cache recent responses, common KOBİ prompts, and a small offline TR knowledge pack. They get a usable degraded experience even when they're on the metro with no signal.

**The brutal honest summary:** OllamaTR cannot serve every TR phone user with on-device AI in 2026-2027. The honest pitch to the 4 GB cohort is **"masaüstünüze bağlanın"** or **"Türkiye'de kalan bulutumuzu kullanın."** The pure "100% on your phone" pitch is reserved for flagship users and only via the Year-2 native app.

---

## One-paragraph summary (the sequencing pick)

**Skip mobile for the first 90 days and finish Tauri desktop.** Then ship a PWA chat client at `chat.ollamatr.com.tr` in months 4-6 — it converts every existing desktop user into a 2-device user via mDNS LAN or Tailscale, costs almost nothing in engineering relative to its reach, and keeps the "100% yerel" promise fully intact. In months 6-9 add an explicit opt-in cloud fallback hosted in a Türkiye data center (branded "Türkiye'de kalır," not "yerel") so the mobile-only 30-35% of the market gets a working product without us lying about the brand. Year 2 starts the real moat: a native Android app with llama.cpp + Gemma 2B + a TR-tuned 3B, distributed on Play and F-Droid, targeting the 8-12% of flagship Android users for whom truly on-device, truly KVKK-perfect mobile AI is the entire pitch. iOS waits until Android paying users prove the case. The captive-portal KOBİ scenario is the commercial wedge that funds all of this.
