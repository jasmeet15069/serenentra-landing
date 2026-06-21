# MHMS — Marketing Landing Page

A single-page marketing/sales site for **MHMS (Master Hotel Management System)**, built per the
v3 PRD. Immersive 3D hero + scroll-driven motion, with strict performance, accessibility and
graceful-fallback guarantees.

## Stack
- **React 18 + Vite 5 + Tailwind CSS 3**
- **3D / motion:** `three`, `@react-three/fiber`, `@react-three/drei`, `gsap` (ScrollTrigger), `lenis`
- **Routing:** `react-router-dom` (landing `/`, plus `/privacy` and `/terms`)

## Run it
```bash
npm install
npm run dev        # local dev (http://localhost:5173)
npm run build      # production build -> dist/
npm run preview    # preview the production build
```

## Project shape
- `src/content.js` — **ALL copy, pricing, FAQ, tiers, config flags live here.** Edit content here, not in components.
- `src/components/` — one component per section (Hero, Features, Pricing, Infrastructure, DemoForm, …).
- `src/components/3d/` — isolated, lazy-loaded R3F scenes (`Hero3DScene`, `PlatformConstellation3D`) + static SVG fallbacks.
- `src/lib/` — smooth-scroll provider, reduced-motion / WebGL / in-view hooks, analytics shim, currency formatter.
- `src/pages/` — Privacy & Terms legal routes.

## Design direction
Warm **terracotta** accent on cream/sand neutrals with an espresso ink; Fraunces (display) + Plus Jakarta Sans (body).
Currency is **INR (₹)** throughout. Licensing shows both **Subscription and Enterprise/Perpetual** (SixOrbit-style transparency).

## 3D & motion behavior (PRD §6A)
- 3D appears in exactly two places: the **Hero** centerpiece and the **Platform** constellation (scroll-scrubbed).
- 3D only renders when: not `prefers-reduced-motion` **and** WebGL is available **and** viewport ≥ 768px. Otherwise a static SVG illustration is shown.
- Off-screen scenes pause their render loop (`frameloop="demand"` + IntersectionObserver); pixel ratio capped at 2.
- All 3D libs are code-split and lazy-loaded so they never block initial text render.

## ⚠️ Before going live
This ships intentionally with clearly-marked placeholders. **See [`PRE-LAUNCH-CHECKLIST.md`](./PRE-LAUNCH-CHECKLIST.md).**
The most important: the demo form currently only logs to the console — wire it to a real lead endpoint first.

## Deployment
Static build — deploy `dist/` to **Vercel** or **Netlify** (recommended).
- `vercel.json` and `public/_redirects` already configure SPA fallback so `/privacy` and `/terms` resolve on refresh.
- Or serve `dist/` from your own VM/Nginx with an SPA fallback to `index.html`.
