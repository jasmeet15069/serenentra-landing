// Pure SVG/SMIL animated entity-graph — replaces the WebGL hotel-tower scene.
// No three.js / WebGL dependency; smooth on every device, zero GPU lag.

const ACCENT      = '#C2613F'
const ACCENT_SOFT = '#E29C7E'
const ACCENT_PALE = '#F8E0D5'
const BG_NODE     = '#FEF9F4'
const TEXT_DARK   = '#5C2D1E'

const CX = 250, CY = 250
const R  = 154   // orbit radius

function toRad(deg) { return (deg * Math.PI) / 180 }

const MODULES = [
  { id: 'pms',       lines: ['Front Desk', '/ PMS'],      angle: -90  },
  { id: 'booking',   lines: ['Booking', 'Engine'],         angle: -30  },
  { id: 'channel',   lines: ['Channel', 'Manager'],        angle:  30  },
  { id: 'payments',  lines: ['Payments'],                  angle:  90  },
  { id: 'reporting', lines: ['Reporting'],                 angle: 150  },
  { id: 'house',     lines: ['Housekeeping'],              angle: 210  },
].map((m, i) => ({
  ...m,
  i,
  x: +(CX + R * Math.cos(toRad(m.angle))).toFixed(1),
  y: +(CY + R * Math.sin(toRad(m.angle))).toFixed(1),
}))

export default function Hero3DScene() {
  return (
    <svg
      viewBox="0 0 500 500"
      className="h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        {/* Hub glow filter */}
        <filter id="hglow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        {/* Dot glow filter */}
        <filter id="dglow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        {/* Hub gradient */}
        <radialGradient id="hubGrad" cx="42%" cy="38%" r="62%">
          <stop offset="0%"   stopColor="#D97B54" />
          <stop offset="100%" stopColor="#A84E30" />
        </radialGradient>
        {/* Ambient halo */}
        <radialGradient id="haloGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor={ACCENT} stopOpacity="0.18" />
          <stop offset="100%" stopColor={ACCENT} stopOpacity="0"    />
        </radialGradient>
        {/* Node circle highlight */}
        <radialGradient id="nodeGrad" cx="40%" cy="35%" r="60%">
          <stop offset="0%"   stopColor="#ffffff"    stopOpacity="0.9" />
          <stop offset="100%" stopColor={ACCENT_PALE} stopOpacity="0.6" />
        </radialGradient>
      </defs>

      {/* ── Ambient halo behind hub ─────────────────────────────────────── */}
      <circle cx={CX} cy={CY} r="200" fill="url(#haloGrad)" />

      {/* ── Slow-rotating outer hexagon ring ───────────────────────────── */}
      <polygon
        points={MODULES.map((m) => `${m.x},${m.y}`).join(' ')}
        fill="none"
        stroke={ACCENT}
        strokeWidth="0.9"
        strokeOpacity="0.18"
        strokeDasharray="7 5"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from={`0 ${CX} ${CY}`}
          to={`360 ${CX} ${CY}`}
          dur="90s"
          repeatCount="indefinite"
        />
      </polygon>

      {/* ── Animated dashed spokes hub → modules ───────────────────────── */}
      {MODULES.map((m) => (
        <line
          key={m.id + '-spoke'}
          x1={CX} y1={CY} x2={m.x} y2={m.y}
          stroke={ACCENT_SOFT}
          strokeWidth="1.4"
          strokeOpacity="0.5"
          strokeDasharray="5 4"
          strokeLinecap="round"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="9"
            to="0"
            dur={`${1.7 + m.i * 0.18}s`}
            repeatCount="indefinite"
          />
        </line>
      ))}

      {/* ── Travelling pulse dots hub → modules ────────────────────────── */}
      {MODULES.map((m) => (
        <circle key={m.id + '-dot'} r="5.5" fill={ACCENT} filter="url(#dglow)" opacity="0.88">
          <animateMotion
            dur={`${2.4 + m.i * 0.28}s`}
            repeatCount="indefinite"
            begin={`-${m.i * 0.4}s`}
            path={`M ${CX},${CY} L ${m.x},${m.y}`}
            keyPoints="0;1"
            keyTimes="0;1"
            calcMode="linear"
          />
        </circle>
      ))}

      {/* ── Module nodes ───────────────────────────────────────────────── */}
      {MODULES.map((m) => (
        <g key={m.id} transform={`translate(${m.x},${m.y})`}>
          {/* float ±6 px on Y */}
          <g>
            <animateTransform
              attributeName="transform"
              type="translate"
              values={`0,0; 0,-6; 0,0`}
              dur={`${2.9 + m.i * 0.42}s`}
              repeatCount="indefinite"
              begin={`-${m.i * 0.55}s`}
            />

            {/* Drop shadow */}
            <circle cx="0" cy="5" r="35" fill="#2B211B" fillOpacity="0.07" />

            {/* Node fill */}
            <circle cx="0" cy="0" r="35" fill="url(#nodeGrad)" />

            {/* Node border */}
            <circle cx="0" cy="0" r="35" fill="none" stroke={ACCENT_SOFT} strokeWidth="2" />

            {/* Subtle inner ring */}
            <circle cx="0" cy="0" r="35" fill="none" stroke={ACCENT} strokeWidth="0.7" strokeOpacity="0.3" />

            {/* Pulse ring */}
            <circle cx="0" cy="0" r="35" fill="none" stroke={ACCENT} strokeWidth="4" strokeOpacity="0">
              <animate
                attributeName="r"
                values="35;46;35"
                dur={`${3.5 + m.i * 0.4}s`}
                repeatCount="indefinite"
                begin={`-${m.i * 0.6}s`}
              />
              <animate
                attributeName="stroke-opacity"
                values="0;0.18;0"
                dur={`${3.5 + m.i * 0.4}s`}
                repeatCount="indefinite"
                begin={`-${m.i * 0.6}s`}
              />
            </circle>

            {/* Labels */}
            {m.lines.map((line, li) => (
              <text
                key={li}
                x="0"
                y={(li - (m.lines.length - 1) / 2) * 13.5}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="11.5"
                fontFamily='"Plus Jakarta Sans", ui-sans-serif, sans-serif'
                fontWeight="700"
                fill={TEXT_DARK}
              >
                {line}
              </text>
            ))}

            {/* Accent dot below label */}
            <circle
              cx="0"
              cy={m.lines.length > 1 ? 23 : 17}
              r="2.8"
              fill={ACCENT_SOFT}
              opacity="0.75"
            />
          </g>
        </g>
      ))}

      {/* ── Hub node ────────────────────────────────────────────────────── */}
      {/* Breathing glow */}
      <circle cx={CX} cy={CY} r="62" fill={ACCENT} filter="url(#hglow)">
        <animate
          attributeName="opacity"
          values="0.09;0.2;0.09"
          dur="3.2s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Shadow */}
      <ellipse cx={CX} cy={CY + 7} rx="48" ry="14" fill="#2B211B" fillOpacity="0.12" />

      {/* Hub circle */}
      <circle cx={CX} cy={CY} r="47" fill="url(#hubGrad)" />

      {/* Hub highlight ring */}
      <circle cx={CX} cy={CY} r="47" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1.8" />

      {/* Hub text */}
      <text
        x={CX} y={CY - 8}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="13.5"
        fontFamily='"Plus Jakarta Sans", ui-sans-serif, sans-serif'
        fontWeight="800"
        fill="white"
      >
        Serenentra
      </text>
      <text
        x={CX} y={CY + 10}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="9"
        fontFamily='"Plus Jakarta Sans", ui-sans-serif, sans-serif'
        fontWeight="500"
        fill="rgba(255,255,255,0.75)"
        letterSpacing="1.2"
      >
        PLATFORM
      </text>
    </svg>
  )
}
