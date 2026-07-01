/**
 * Serenentra Landing Page — single source of content (PRD Section 8: "Content separation").
 *
 * Edit copy / numbers HERE, not inside components.
 *
 * ⚠️ PLACEHOLDER POLICY (PRD Sections 9 & 12):
 *   Anything wrapped like `[XX]`, `[Add real stat]`, or flagged `PLACEHOLDER` below
 *   is NOT a verified figure. Replace with real, confirmed data before public launch.
 *   Never present invented numbers/testimonials as final.
 */

// ---------------------------------------------------------------------------
// Global config flags — toggle features without touching component logic.
// ---------------------------------------------------------------------------
export const config = {
  currency: 'INR', // chosen: INR-only (₹). PRD 7.8.
  currencySymbol: '₹',
  hasDemoVideo: true, // PRD 7.10 — set false to hide the "Watch overview" CTA + modal.
  // PLACEHOLDER: unlisted YouTube/Vimeo embed URL. Swap for the real product video.
  demoVideoEmbedUrl: 'https://www.youtube.com/embed/ysz5S6PUM-U',
  showLogoBar: true, // PRD 5.3 — grayscale placeholder logos.
  showCompetitorComparison: true, // PRD 7.14
  showVmCalculator: true, // PRD 7.6
  licensingModel: 'both', // 'subscription' | 'both' — chosen: both (SixOrbit-style). PRD 5.11A.
  // Contact details (PRD 7.9, 5.13). WhatsApp uses intl format, digits only, no +.
  whatsappNumber: '918799745618', // 91 (India) + 8799745618
  whatsappPrefill: "Hi, I'd like to know more about Serenentra",
  salesPhone: '+91 87997 45618',
  salesEmail: 'sales@serenentra.com',
  // PLACEHOLDER live-chat embed (PRD 7.11) — leave null to skip; no fake bubble.
  liveChat: null, // e.g. { provider: 'crisp', websiteId: 'xxxx' }
}

export const brand = {
  name: 'Serenentra',
  // Serenentra is the company/platform brand; the hotel management system is the product.
  fullName: 'Serenentra',
  productName: 'MHMS', // the hotel-management product Serenentra provides
  tagline: 'The all-in-one platform to run your hotel.',
}

// ---------------------------------------------------------------------------
// Navigation (PRD 5.1)
// ---------------------------------------------------------------------------
export const nav = {
  links: [
    { label: 'Platform', href: '#platform' },
    { label: 'Features', href: '#features' },
    { label: 'Solutions', href: '#solutions' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Customers', href: '#customers' },
    { label: 'FAQ', href: '#faq' },
  ],
  loginHref: '#', // PLACEHOLDER — point to the real app login URL (PRD Section 4).
  ctaLabel: 'Request a Demo',
  ctaHref: '#demo',
}

// ---------------------------------------------------------------------------
// Hero (PRD 5.2)
// ---------------------------------------------------------------------------
export const hero = {
  eyebrow: 'All-in-one Hotel Management System',
  title: 'Run your entire hotel from one platform.',
  subtitle:
    'Serenentra brings your front desk, reservations, housekeeping, channel manager, payments and reporting together in one cloud system — so your team spends less time switching tools and more time looking after guests.',
  primaryCta: { label: 'Request a Demo', href: '#demo' },
  secondaryCta: { label: 'Watch a 2-min overview', href: '#video' },
  // Trust strip — PLACEHOLDER sample numbers (PRD 5.2). Swap for verified figures.
  trustStats: [
    { value: '50+', label: 'properties onboarded' },
    { value: 'Pan-India', label: 'coverage' },
    { value: '99.9%', label: 'uptime SLA' },
  ],
}

// ---------------------------------------------------------------------------
// Logo / trust bar (PRD 5.3) — grayscale placeholders.
// ---------------------------------------------------------------------------
export const logoBar = {
  label: 'Trusted by hotels and hospitality groups',
  // PLACEHOLDER names — replace with real customer logos once available.
  logos: ['The Marigold Inn', 'Coastline Retreat', 'Urban Stay', 'Hilltop Resorts', 'Lotus Inns', 'Blue Pines Resort'],
}

// ---------------------------------------------------------------------------
// Platform overview (PRD 5.4)
// ---------------------------------------------------------------------------
export const platform = {
  eyebrow: 'One unified platform',
  title: 'Everything your property runs on, finally in one place.',
  body: 'Serenentra unifies your Property Management System (PMS), Booking Engine, Channel Manager, Payments and Reporting into a single cloud platform. No more disconnected tools, duplicate data entry, or rates that drift out of sync. One login, one source of truth, for one property or a hundred.',
  // Nodes that orbit the central Serenentra hub in the 3D constellation.
  modules: ['PMS', 'Booking Engine', 'Channel Manager', 'Payments', 'Reporting'],
}

// ---------------------------------------------------------------------------
// Core modules / features (PRD 5.5)
// NOTE: Confirm this list matches the REAL product feature set (PRD Q1, Section 11).
// ---------------------------------------------------------------------------
export const features = [
  {
    icon: 'desk',
    title: 'Front Desk / PMS',
    desc: 'Reservations, check-in/out, room status, folios and billing — your whole front office on one screen.',
  },
  {
    icon: 'globe',
    title: 'Booking Engine',
    desc: 'Commission-free direct bookings embedded right on your own website. Keep more of every reservation.',
  },
  {
    icon: 'sync',
    title: 'Channel Manager',
    desc: 'Sync rates and availability across OTAs (online travel agencies like Booking.com & Expedia) in real time to prevent overbooking.',
  },
  {
    icon: 'broom',
    title: 'Housekeeping & Maintenance',
    desc: 'A live room-status board, task assignment for staff, and maintenance tickets that never get lost.',
  },
  {
    icon: 'card',
    title: 'Payments',
    desc: 'Secure card processing, automated invoicing and multi-currency support, built in.',
  },
  {
    icon: 'chart',
    title: 'Reporting & Analytics',
    desc: 'Occupancy, ADR (average daily rate) and RevPAR (revenue per available room) dashboards, with exportable reports.',
  },
  {
    icon: 'buildings',
    title: 'Multi-Property Management',
    desc: 'One centralized dashboard across every property in your group or chain.',
  },
  {
    icon: 'chat',
    title: 'Guest CRM & Messaging',
    desc: 'Guest profiles, automated pre- and post-stay messaging, and upsells that run themselves.',
  },
  {
    icon: 'mobile',
    title: 'Mobile / Access Anywhere',
    desc: 'Manage your property from any device, wherever you are.',
  },
]

// ---------------------------------------------------------------------------
// Benefits / Why Serenentra (PRD 5.6) — outcome framed. STATS ARE PLACEHOLDERS.
// ---------------------------------------------------------------------------
export const benefits = {
  eyebrow: 'Why Serenentra',
  title: 'Less busywork. More direct revenue.',
  items: [
    {
      stat: '40%',
      statLabel: 'more direct bookings',
      title: 'Grow commission-free revenue',
      desc: 'Drive guests to book on your own site with a built-in booking engine instead of paying OTA commissions on every stay.',
    },
    {
      stat: '3+ hrs',
      statLabel: 'saved per day',
      title: 'Give your front desk its time back',
      desc: 'Automate check-in, billing and messaging so staff stop re-keying the same data into five systems.',
    },
    {
      stat: '0',
      statLabel: 'double-bookings',
      title: 'End overbooking errors',
      desc: 'Real-time two-way sync keeps rates and availability identical everywhere you sell.',
    },
    {
      stat: '1 → ∞',
      statLabel: 'properties',
      title: 'Scale without switching systems',
      desc: 'Start with one property and grow into a multi-property group on the same platform.',
    },
  ],
}

// ---------------------------------------------------------------------------
// Solutions by property type (PRD 5.7)
// ---------------------------------------------------------------------------
export const solutions = [
  {
    key: 'independent',
    label: 'Independent Hotels',
    body: 'Simple to set up, simple to run. Everything a 1–25 room property needs without the enterprise price tag or the steep learning curve.',
    highlights: ['Front Desk / PMS', 'Booking Engine', 'Payments'],
  },
  {
    key: 'boutique',
    label: 'Boutique & Resorts',
    body: 'Deliver a premium guest experience with rich guest profiles, automated messaging and upsells that feel personal.',
    highlights: ['Guest CRM & Messaging', 'Reporting & Analytics', 'Booking Engine'],
  },
  {
    key: 'motels',
    label: 'Motels',
    body: 'Fast check-in/out, clear room status, and pricing that keeps pace with demand — built for high turnover.',
    highlights: ['Front Desk / PMS', 'Housekeeping & Maintenance', 'Channel Manager'],
  },
  {
    key: 'groups',
    label: 'Hotel Groups / Chains',
    body: 'Run every property from one centralized dashboard with group-wide reporting and standardized operations.',
    highlights: ['Multi-Property Management', 'Reporting & Analytics', 'Payments'],
  },
  {
    key: 'serviced',
    label: 'Serviced Apartments / Long-stay',
    body: 'Handle longer stays, recurring billing and flexible rate plans without fighting your software.',
    highlights: ['Front Desk / PMS', 'Payments', 'Channel Manager'],
  },
]

// ---------------------------------------------------------------------------
// Integrations (PRD 5.8)
// ---------------------------------------------------------------------------
export const integrations = {
  eyebrow: 'Ecosystem',
  title: 'Connects with the tools you already use.',
  body: 'Serenentra plays well with the rest of your stack — from the OTAs you sell on to the accounting tools you reconcile in.',
  categories: [
    { name: 'OTAs', examples: 'Booking.com, Expedia, Agoda, MakeMyTrip' },
    { name: 'Payment gateways', examples: 'Razorpay, Stripe, PayU' },
    { name: 'Accounting', examples: 'Tally, Zoho Books, QuickBooks' },
    { name: 'Door locks / IoT', examples: 'Smart locks & access systems' },
    { name: 'Channel partners', examples: 'GDS & metasearch' },
    { name: 'Messaging', examples: 'WhatsApp, SMS, email' },
  ],
  ctaLabel: 'View all integrations',
  ctaHref: '#', // PLACEHOLDER
}

// ---------------------------------------------------------------------------
// Security & reliability (PRD 5.9) — CONFIRM ALL CLAIMS BEFORE LAUNCH (PRD Q4).
// ---------------------------------------------------------------------------
export const security = {
  eyebrow: 'Security & reliability',
  title: 'Built to be trusted with your business.',
  items: [
    {
      title: '99.9% uptime SLA',
      desc: 'Highly available cloud infrastructure on enterprise-grade servers keeps your front desk and booking engine online around the clock.',
    },
    {
      title: 'PCI-DSS aligned payments',
      desc: 'Card data is handled to payment-industry security standards via Razorpay and Stripe — we never store raw card numbers.',
    },
    {
      title: 'Encrypted cloud hosting',
      desc: 'All data is encrypted in transit (TLS) and at rest. Automated daily backups so your records are always safe.',
    },
    {
      title: 'Dedicated support',
      desc: 'Reach us by WhatsApp, email or phone. Our team replies within a few hours — no ticket queues, no long waits.',
    },
  ],
}

// ---------------------------------------------------------------------------
// Testimonials (PRD 5.10) — ALL PLACEHOLDER. Do not publish as real quotes.
// ---------------------------------------------------------------------------
export const testimonials = {
  eyebrow: 'Customers',
  title: 'Loved by operators who’d rather run their hotel than their software.',
  items: [
    {
      quote: 'Serenentra transformed how we manage our 22-room hotel. We used to juggle spreadsheets and phone calls — now everything from reservations to housekeeping is in one place. Our front desk team is faster and guests notice the difference.',
      name: 'Rajesh Mehta',
      role: 'Owner & General Manager',
      property: 'The Marigold Inn, Jaipur',
      rating: 5,
    },
    {
      quote: 'The direct booking engine paid for itself within the first month. We\'ve significantly cut our OTA commission costs and our guests love the seamless check-in experience. Setup took less than two days.',
      name: 'Priya Sharma',
      role: 'Operations Manager',
      property: 'Coastline Retreat, Goa',
      rating: 5,
    },
    {
      quote: 'Finally a system built for Indian hotels — it handles GST invoicing, multiple payment options and WhatsApp messaging out of the box. The support team is incredibly responsive whenever we need help.',
      name: 'Suresh Patel',
      role: 'Hotel Manager',
      property: 'Urban Stay, Ahmedabad',
      rating: 5,
    },
  ],
}

// ---------------------------------------------------------------------------
// Pricing tiers (PRD 5.11) — PRICES ARE PLACEHOLDERS (PRD Q2). Currency: ₹/mo.
// `priceMonthly` is the monthly figure; annual shows ~2 months free.
// ---------------------------------------------------------------------------
export const pricing = {
  eyebrow: 'Pricing',
  title: 'Straightforward pricing that scales with you.',
  subtitle: 'Hosting, updates and support are included in every subscription plan — no separate infrastructure bill.',
  annualDiscountLabel: '2 months free',
  annualMultiplier: 10, // pay for 10 months on annual billing
  tiers: [
    {
      key: 'starter',
      name: 'Starter',
      target: 'Independent hotels & B&Bs (1–25 rooms)',
      priceMonthly: 4999, // PLACEHOLDER ₹
      featured: false,
      includes: ['Front Desk / PMS', 'Booking Engine', 'Payments', 'Email support', 'Starter VM hosting included'],
      cta: { label: 'Get Started', href: '#demo' },
    },
    {
      key: 'growth',
      name: 'Growth',
      target: 'Growing hotels & small groups (26–100 rooms)',
      priceMonthly: 12999, // PLACEHOLDER ₹
      featured: true,
      includes: [
        'Everything in Starter',
        'Channel Manager',
        'Housekeeping & Maintenance',
        'Guest CRM & Messaging',
        'Reporting & Analytics',
        'Priority support',
        'Growth VM hosting included',
      ],
      cta: { label: 'Get Started', href: '#demo' },
    },
    {
      key: 'enterprise',
      name: 'Enterprise',
      target: 'Multi-property groups & chains (100+ rooms)',
      priceMonthly: null, // Contact Sales
      featured: false,
      includes: [
        'Everything in Growth',
        'Multi-Property Management',
        'Dedicated / Business VM',
        'Custom integrations & API',
        'Dedicated success manager',
        'Subscription or one-time perpetual license',
      ],
      cta: { label: 'Talk to Sales', href: '#demo' }, // always routes to lead form (PRD 5.11)
    },
  ],
}

// ---------------------------------------------------------------------------
// Infrastructure / VM costing transparency (PRD 5.11A, SixOrbit-style).
// ALL ₹ FIGURES AND % ARE PLACEHOLDERS (PRD 5.11B, Q9). Confirm before launch.
// ---------------------------------------------------------------------------
export const infrastructure = {
  eyebrow: 'Infrastructure & hosting, transparently priced',
  title: 'Know exactly what you’re paying for.',
  body: 'With Serenentra you don’t get a surprise server bill. On a subscription plan, hosting is bundled into your price. For larger groups that prefer to own their license, we also offer a one-time Enterprise (perpetual) option.',

  // Licensing model selector (PRD 5.11A.1)
  licensing: {
    subscription: {
      name: 'Subscription',
      tagline: 'Billed monthly or annually',
      points: [
        'Per room-count band — see Pricing above',
        'Hosting, updates and support included',
        'No separate infrastructure cost',
        'Move up or down a tier as you grow',
      ],
    },
    perpetual: {
      name: 'Enterprise / Perpetual',
      tagline: 'One-time license for larger groups (10+ properties)',
      points: [
        'One-time license, priced on incremental room/property slabs',
        'Plus an Annual License Renewal (ALR) fee',
        'Best for groups that prefer to own their license',
        'Hosting can be bundled or run on your own infrastructure',
      ],
    },
  },

  // VM / server sizing tier table (PRD 5.11A.2). costPerMonth in ₹ — PLACEHOLDER.
  vmTiers: [
    {
      tier: 'Starter VM',
      recommendedFor: '1–25 rooms / up to ~10 staff users',
      specs: '2 vCPU / 4 GB',
      concurrent: 'Up to 25',
      rooms: [1, 25],
      costPerMonth: 1499, // PLACEHOLDER ₹
    },
    {
      tier: 'Growth VM',
      recommendedFor: '26–100 rooms / multi-department',
      specs: '4 vCPU / 8 GB',
      concurrent: 'Up to 75',
      rooms: [26, 100],
      costPerMonth: 3999, // PLACEHOLDER ₹
    },
    {
      tier: 'Business VM',
      recommendedFor: '101–300 rooms / multi-property',
      specs: '8 vCPU / 16 GB',
      concurrent: 'Up to 200',
      rooms: [101, 300],
      costPerMonth: 8999, // PLACEHOLDER ₹
    },
    {
      tier: 'Enterprise / Dedicated',
      recommendedFor: '300+ rooms or hotel groups / chains',
      specs: 'Custom, dedicated resources',
      concurrent: 'Custom',
      rooms: [301, Infinity],
      costPerMonth: null, // Contact Sales
    },
  ],
  vmTableNote:
    '*Server tier is recommended automatically based on your room count and concurrent staff usage; our team confirms the right fit during onboarding.',
  vmHelperLine:
    'Server choice depends on your number of rooms and concurrent staff logins — our team helps you pick the right tier during setup.',

  // Annual License Renewal tiers (PRD 5.11A.3) — % ARE PLACEHOLDERS.
  alrTiers: [
    {
      name: 'Basic',
      rate: '15–18%', // PLACEHOLDER of license cost / year
      points: ['Standard support', 'Security patches & updates'],
    },
    {
      name: 'Standard',
      rate: '22–26%', // PLACEHOLDER
      points: ['Everything in Basic', 'Scheduled operational reviews (2×/year)'],
    },
    {
      name: 'Premium',
      rate: '30–34%', // PLACEHOLDER
      points: ['Everything in Standard', 'Quarterly reviews', 'Priority support SLA'],
    },
  ],
  alrNote: 'Annual License Renewal (ALR) applies only to the one-time Enterprise/Perpetual license. Percentages shown are placeholders pending final pricing.',

  // 5-year TCO illustrative model (PRD 5.11A.4) — ILLUSTRATIVE ONLY.
  tco: {
    note: 'Illustrative example only — not a quote. Confirm exact figures with our team.',
    // Used by the calculator (PRD 7.6) and the static chart.
    perpetualLicenseBase: 600000, // PLACEHOLDER ₹ one-time, for ~mid-size group
    alrAnnualRate: 0.2, // PLACEHOLDER 20%/yr of license used for illustrative TCO
  },
}

// ---------------------------------------------------------------------------
// Competitor comparison (PRD 5.15 / 7.14) — generic "legacy PMS", no named rivals.
// ---------------------------------------------------------------------------
export const comparison = {
  eyebrow: 'Why switch',
  title: 'Serenentra vs. traditional hotel software',
  columns: ['Serenentra', 'Traditional / Legacy PMS'],
  rows: [
    { feature: 'Setup time', mhms: 'Days, guided onboarding', legacy: 'Weeks of installs & training' },
    { feature: 'Pricing transparency', mhms: 'Clear plans, hosting included', legacy: 'Hidden server & add-on fees' },
    { feature: 'Access', mhms: 'Cloud — any device, anywhere', legacy: 'Often desk-bound / on-premise' },
    { feature: 'Channel sync', mhms: 'Real-time, two-way', legacy: 'Manual or delayed updates' },
    { feature: 'Multi-property', mhms: 'One dashboard for all', legacy: 'Separate logins per property' },
    { feature: 'Support', mhms: 'Included, responsive', legacy: 'Paid tickets & long waits' },
  ],
}

// ---------------------------------------------------------------------------
// FAQ (PRD 5.12 + 5.11A.5 transparency questions)
// ---------------------------------------------------------------------------
export const faq = {
  eyebrow: 'FAQ',
  title: 'Questions, answered.',
  items: [
    {
      q: 'What is Serenentra and who is it for?',
      a: 'Serenentra is an all-in-one cloud hotel management platform — front desk, bookings, housekeeping, payments and reporting in one place. It powers our hotel management system (MHMS) and is built for independent hotels, B&Bs, motels, resorts, serviced apartments and multi-property groups.',
    },
    {
      q: 'How long does onboarding/setup take?',
      a: 'Most properties are up and running within days. Our team guides you through setup, data import and staff training.',
    },
    {
      q: 'Does Serenentra work for multi-property hotel groups?',
      a: 'Yes. The Enterprise plan includes Multi-Property Management — run every property from one centralized dashboard with group-wide reporting.',
    },
    {
      q: 'Can I migrate my data from my current PMS?',
      a: 'Yes. We help you import your existing reservations, guest profiles and rate plans during onboarding.',
    },
    {
      q: 'Is there a free trial?',
      a: 'Request a demo and our team will set you up so you can try Serenentra with your own property data. [Confirm trial terms before launch.]',
    },
    {
      q: 'Is server/hosting cost included in my price, or billed separately?',
      a: 'On a subscription plan, hosting is fully bundled into your price — there’s no separate infrastructure bill. The Enterprise/Perpetual option can be bundled or run on your own infrastructure.',
    },
    {
      q: 'What’s the difference between the Subscription and Enterprise/Perpetual plans?',
      a: 'Subscription is a recurring monthly/annual fee with everything included. Enterprise/Perpetual is a one-time license (priced on incremental room/property slabs) plus an Annual License Renewal fee — designed for larger groups that prefer to own their license.',
    },
    {
      q: 'Can I change my server tier or upgrade my plan later?',
      a: 'Yes. You can move between tiers as your room count and staff usage grow — we’ll recommend the right fit and handle the change.',
    },
    {
      q: 'What does the Annual License Renewal (ALR) fee cover?',
      a: 'For Enterprise/Perpetual licenses, the ALR covers ongoing support, security patches and updates — with higher tiers adding scheduled operational reviews and priority SLAs.',
    },
    {
      q: 'How do I know which VM/server tier is right for my property?',
      a: 'We recommend a tier automatically based on your room count and concurrent staff logins, then confirm the right fit during onboarding. You can also use the estimator on this page.',
    },
    {
      q: 'Does Serenentra integrate with OTAs like Booking.com / Expedia?',
      a: 'Yes. The Channel Manager syncs rates and availability across major OTAs in real time to prevent overbooking.',
    },
    {
      q: 'Is my data secure?',
      a: 'Your data is encrypted in transit and at rest, with regular backups and payments handled to industry security standards. [Confirm exact certifications before launch.]',
    },
  ],
}

// ---------------------------------------------------------------------------
// Final CTA / demo form (PRD 5.13)
// ---------------------------------------------------------------------------
export const demo = {
  eyebrow: 'Get started',
  title: 'Ready to simplify your hotel operations?',
  subtitle: 'Request a demo and we’ll show you Serenentra with your own property in mind. Our team replies within 1 business day.',
  roomOptions: ['1–10', '11–50', '51–200', '200+'],
  successMessage: 'Thanks — our team will be in touch within 1 business day.',
  contactNote: 'Prefer to talk now?',
}

// ---------------------------------------------------------------------------
// Footer (PRD 5.14)
// ---------------------------------------------------------------------------
export const footer = {
  tagline: 'The all-in-one platform to run your hotel.',
  columns: [
    {
      heading: 'Product',
      links: [
        { label: 'Features', href: '#features' },
        { label: 'Pricing', href: '#pricing' },
        { label: 'Integrations', href: '#integrations' },
        { label: 'Security', href: '#security' },
      ],
    },
    {
      heading: 'Company',
      links: [
        { label: 'About', href: '#' }, // PLACEHOLDER
        { label: 'Contact', href: '#demo' },
        { label: 'Careers', href: '#' }, // PLACEHOLDER
      ],
    },
    {
      heading: 'Resources',
      links: [
        { label: 'FAQ', href: '#faq' },
        { label: 'Support', href: '#' }, // PLACEHOLDER
      ],
    },
    {
      heading: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
      ],
    },
  ],
  socials: [
    { label: 'LinkedIn', href: '#' },
    { label: 'Twitter', href: '#' },
    { label: 'Instagram', href: '#' },
  ],
}
