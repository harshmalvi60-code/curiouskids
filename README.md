# Curious Kids Universe 🪐

**Turn screen time into discovery time.** An immersive, offline-first science-exploration universe for kids aged 5–12. Six magical worlds — Space, Animals, Ocean, Dinosaurs, Human Body, Nature — with interactive lessons, fun facts, quizzes, challenges, and a full gamification system (Sparks, levels, ranks, badges, streaks).

A **Yuvaan Technologies** product. ₹499 one-time. No ads. No subscription. Works offline.

## Stack
Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · Zustand · PWA · Razorpay

## Run locally
```bash
npm install
npm run dev      # http://localhost:3000
```

## Build
```bash
npm run build && npm start
```

## Content is data
All worlds/missions live in `lib/content.ts`. Add a world by adding an object to the `WORLDS` array — no app code changes needed.

## Project map
```
app/                 routes (landing, universe, world/[id], profile, parent, checkout, api)
components/          GalaxyMap, WorldView, Hud, Onboard, Chrome (mascot+reward), Starfield, Hydrated
lib/                 content (worlds), gamify (level engine), store (zustand+persist), ranks, badges
public/              manifest, service worker, icon
```

## Payments (₹499 one-time)
Razorpay is wired in `app/api/razorpay/*` + `app/checkout`. Without keys, checkout shows a demo unlock.
Set in Vercel env (and `.env` locally — see `.env.example`):
```
RAZORPAY_KEY_ID=...
RAZORPAY_KEY_SECRET=...
NEXT_PUBLIC_RAZORPAY_KEY_ID=...
NEXT_PUBLIC_PRICE_PAISE=49900
```
The build ships **unlocked by default** (`unlocked: true` in `lib/store.ts`) so you can demo/record freely. Flip to `false` to enforce the paywall before launch.

## Deploy (GitHub → Vercel)
```bash
git init && git add . && git commit -m "Curious Kids Universe v1"
git branch -M main
git remote add origin https://github.com/<you>/curious-kids-universe.git
git push -u origin main
```
Then import the repo at vercel.com → add the env vars above → Deploy. (Or run `npx vercel` from this folder.)

## Roadmap
Deeper content for Worlds 2–6 · audio narration · Hindi/regional languages · "Ask Spark" safe Q&A · cloud sync + accounts · printable certificates.
