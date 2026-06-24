# CLAUDE.md — Curious Kids Universe (session continuity)

## What this is
Offline-first PWA, science-exploration universe for kids 5–12. ₹499 one-time. Yuvaan Technologies.
Brand: deep-cosmic premium (NOT Yuvaan orange). Mascot "Spark" (✦). Signature: the Galaxy Map.

## Stack
Next.js 14 App Router, TS, Tailwind, Framer Motion, Zustand (+persist/localStorage), PWA, Razorpay.

## Architecture rules
- **Content = data** in `lib/content.ts` (`WORLDS[]`). Add worlds/missions there; never hardcode in components.
- **Gamification engine** is pure functions in `lib/gamify.ts` (level curve `100*n`, ranks every 3 levels).
- **State** in `lib/store.ts` (zustand persist, key `cku-progress`). Derived values (level/rank) computed from `sparks`, never stored.
- **Hydration:** persisted client state — gate store-dependent UI behind `<Hydrated>` to avoid SSR mismatch.
- Mission ids: lessons `${world}-l${i}`, quiz `${world}-quiz`, challenge `${world}-ch`.

## XP / rewards
lesson +20 · quiz complete +30 (+10/correct) · challenge +50 · daily open +5.
Badges: world-clear (id == world id), `quiz`, `streak3`, `sparks100`, `first`. All in `lib/badges.ts`.

## Payments
`app/api/razorpay/order` (create) + `verify` (HMAC SHA256 signature). `app/checkout` opens Razorpay.
`unlocked` defaults `true` in store for demo — flip to `false` to enforce paywall.

## Current state (v1)
All 6 worlds have content (Space deepest: 4 lessons; others 2 lessons each) + quiz + challenge + facts.
Full gamification, profile, parent corner, PWA, landing (SEO), Razorpay scaffolding — all working & building.

## Next frontiers
1. Deepen Worlds 2–6 content. 2. Audio narration. 3. Hindi. 4. "Ask Spark" safe Q&A. 5. Cloud sync.
6. Meta-ads launch (Harsh runs ads/sales; record the Space world for creative).
