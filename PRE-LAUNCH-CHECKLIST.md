# Pre-launch checklist — replace placeholders before going public

Everything below is intentionally a placeholder in this build (PRD §9, §12). All live in
`src/content.js` unless noted. Do **not** publish with these unresolved.

## 🚨 Hard blockers (a live site must not ship without these)
- [ ] **Lead routing** — the demo form (`src/components/DemoForm.jsx`) and footer newsletter only `console.log`.
      Wire to a real endpoint (Formspree / Web3Forms / serverless fn) that forwards to a sales inbox / Slack / WhatsApp / CRM. (PRD 7.7)
- [ ] **WhatsApp & phone** — `config.whatsappNumber`, `config.salesPhone`, `config.salesEmail` are placeholders. (PRD 7.9)
- [ ] **Pricing** — every `priceMonthly` in `pricing.tiers` is a placeholder ₹ figure. (PRD 5.11, Q2)
- [ ] **VM / hosting costs** — every `costPerMonth` in `infrastructure.vmTiers`, the ALR `%` rates, and
      `infrastructure.tco.*` are placeholders. Confirm real hosting economics. (PRD 5.11A/5.11B, Q9)
- [ ] **Legal** — `/privacy` and `/terms` are placeholder structure only; have a lawyer write the real text. (PRD 7.13)
- [ ] **Stats** — hero trust strip and all Benefits stats (`[XX]%`, etc.) are placeholders. (PRD 5.6)
- [ ] **Testimonials** — all quotes are placeholders; do not publish fake quotes/customers. (PRD 5.10)

## Confirm with the business
- [ ] Feature list in `features` matches the real product. (PRD Q1)
- [ ] Security claims in `security` (uptime SLA, PCI-DSS, hosting provider, support hours). (PRD 5.9, Q4)
- [ ] Integration names in `integrations` are accurate. (PRD 5.8)
- [ ] Login URL (`nav.loginHref`) points to the real app. 
- [ ] Customer logos in `logoBar` (or set `config.showLogoBar = false` until you have real ones). (PRD 5.3)
- [ ] Demo video: set `config.demoVideoEmbedUrl` to the real unlisted video, or set `config.hasDemoVideo = false`. (PRD 7.10)
- [ ] Live chat: set `config.liveChat` if you want Crisp/Tawk.to/Intercom, else leave null. (PRD 7.11)

## Assets & meta
- [ ] Replace `public/og-image.svg` / `public/favicon.svg` if you have richer brand assets. (PRD 7.15)
- [ ] Update canonical/OG URLs in `index.html` from `https://www.mhms.example/` to the real domain.

## Quality gates (PRD §12)
- [ ] Run Lighthouse: Accessibility / Best Practices / SEO ≥ 90; Performance ≥ 90 (no-3D) / ≥ 85 (with 3D).
- [ ] Verify `prefers-reduced-motion` (toggle OS setting) — smooth scroll + 3D motion disable, static visuals show.
- [ ] Verify no-WebGL fallback (disable WebGL in browser flags) — static SVG visuals render.
- [ ] Responsive pass at 375 / 768 / 1024 / 1440px.
