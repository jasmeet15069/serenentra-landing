/**
 * Lightweight inline SVG icon set (PRD 6 — simple SVG/illustration, no scraped imagery).
 * Stroke-based, inherits `currentColor`. Decorative icons get aria-hidden.
 */
const paths = {
  desk: (
    <>
      <rect x="3" y="9" width="18" height="11" rx="2" />
      <path d="M3 13h18M8 9V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v3M8 20v-3M16 20v-3" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" />
    </>
  ),
  sync: (
    <>
      <path d="M4 12a8 8 0 0 1 13.7-5.6L20 8M20 4v4h-4" />
      <path d="M20 12a8 8 0 0 1-13.7 5.6L4 16M4 20v-4h4" />
    </>
  ),
  broom: (
    <>
      <path d="M19 5l-9 9M11 13l-5 6h6l3-3M14 10l3-3" />
      <path d="M10 14l-3 3" />
    </>
  ),
  card: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 10h18M7 15h4" />
    </>
  ),
  chart: (
    <>
      <path d="M4 20V4M4 20h16" />
      <path d="M8 16v-4M12 16V8M16 16v-6" />
    </>
  ),
  buildings: (
    <>
      <rect x="3" y="8" width="8" height="12" rx="1" />
      <rect x="13" y="4" width="8" height="16" rx="1" />
      <path d="M6 12h2M6 15h2M16 8h2M16 11h2M16 14h2" />
    </>
  ),
  chat: (
    <>
      <path d="M21 12a8 8 0 0 1-11.4 7.2L4 20l1-4.6A8 8 0 1 1 21 12z" />
      <path d="M8.5 12h.01M12 12h.01M15.5 12h.01" />
    </>
  ),
  mobile: (
    <>
      <rect x="7" y="3" width="10" height="18" rx="2" />
      <path d="M11 18h2" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l8 3v5c0 5-3.4 8.5-8 10-4.6-1.5-8-5-8-10V6l8-3z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  bolt: <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  check: <path d="M5 12l5 5L20 7" />,
  plus: <path d="M12 5v14M5 12h14" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  whatsapp: (
    <path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3zm4.5 12.3c-.2.5-1 1-1.4 1-.4.1-.8.1-1.3-.1-.3-.1-.7-.2-1.2-.4-2.1-.9-3.5-3-3.6-3.2-.1-.1-.9-1.2-.9-2.3s.6-1.6.8-1.9c.2-.2.4-.3.6-.3h.4c.1 0 .3 0 .5.4l.6 1.5c.1.1.1.3 0 .4l-.3.4-.2.3c-.1.1-.2.3-.1.5.1.2.5.9 1.1 1.4.8.7 1.4.9 1.6 1 .2.1.3.1.4-.1l.6-.7c.1-.2.3-.1.5-.1l1.4.7c.2.1.3.2.4.2 0 .2 0 .7-.2 1.2z" />
  ),
}

export default function Icon({ name, className = 'h-6 w-6', strokeWidth = 1.6, ...rest }) {
  const filled = name === 'whatsapp'
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill={filled ? 'currentColor' : 'none'}
      stroke={filled ? 'none' : 'currentColor'}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {paths[name] || null}
    </svg>
  )
}
