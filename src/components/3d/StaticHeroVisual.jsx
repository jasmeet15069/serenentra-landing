/**
 * Static SVG substitute for the Hero 3D scene (PRD 6A.5 fallback).
 * Shown when WebGL is unavailable, prefers-reduced-motion is set, or on small screens.
 * Purely decorative — the parent marks the region aria-hidden.
 */
export default function StaticHeroVisual() {
  return (
    <svg viewBox="0 0 480 480" className="h-full w-full" role="img" aria-hidden="true">
      <defs>
        <linearGradient id="hg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F8E0D5" />
          <stop offset="1" stopColor="#EFC0AC" />
        </linearGradient>
        <linearGradient id="hg2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#F2E9DE" />
        </linearGradient>
      </defs>

      {/* halo */}
      <circle cx="240" cy="230" r="180" fill="url(#hg)" opacity="0.5" />

      {/* stacked glass tower */}
      <g transform="translate(150 80)">
        {[0, 1, 2, 3, 4].map((i) => {
          const w = 180 - i * 14
          const x = (180 - w) / 2
          const y = 250 - i * 56
          return (
            <g key={i}>
              <rect x={x} y={y} width={w} height={46} rx="10" fill="url(#hg2)" stroke="#E29C7E" strokeWidth="1.5" />
              {[...Array(4)].map((_, j) => (
                <rect key={j} x={x + 14 + j * (w - 28) / 4} y={y + 12} width={(w - 28) / 4 - 8} height="22" rx="3" fill="#F2E9DE" />
              ))}
            </g>
          )
        })}
        {/* crown */}
        <rect x="62" y="-6" width="56" height="40" rx="10" fill="#C2613F" />
      </g>

      {/* floating accent nodes */}
      {[
        [90, 150], [380, 120], [60, 320], [410, 300], [200, 60],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={i % 2 ? 9 : 13} fill={i % 2 ? '#E29C7E' : '#C2613F'} />
      ))}
    </svg>
  )
}
