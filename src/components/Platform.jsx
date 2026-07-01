import { Suspense, lazy, useEffect, useState } from 'react'
import { platform } from '../content'
import { useReducedMotion } from '../lib/useReducedMotion'
import { shouldRender3D } from '../lib/webgl'
import { useInView } from '../lib/useInView'
import SectionHeading from './SectionHeading'

// Lazy-load the tower so three/r3f/drei stay out of the initial bundle.
const TowerScene3D = lazy(() => import('./3d/TowerScene3D'))

/** Static fallback diagram shown when WebGL is unavailable or motion is reduced. */
function StaticConstellation({ modules }) {
  const cx = 240
  const cy = 200
  return (
    <svg
      viewBox="0 0 480 400"
      className="h-full w-full"
      role="img"
      aria-label="Serenentra connects PMS, Booking Engine, Channel Manager, Payments and Reporting"
    >
      {modules.map((m, i) => {
        const a = (i / modules.length) * Math.PI * 2 - Math.PI / 2
        const x = cx + Math.cos(a) * 165
        const y = cy + Math.sin(a) * 130
        return (
          <g key={m}>
            <line x1={cx} y1={cy} x2={x} y2={y} stroke="#E29C7E" strokeWidth="1.5" />
            <circle cx={x} cy={y} r="34" fill="#fff" stroke="#EFC0AC" strokeWidth="1.5" />
            <text
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-espresso"
              style={{ fontSize: 11, fontWeight: 600 }}
            >
              {m.length > 9 ? m.split(' ')[0] : m}
            </text>
          </g>
        )
      })}
      <circle cx={cx} cy={cy} r="46" fill="#C2613F" />
      <text
        x={cx}
        y={cy}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#fff"
        style={{ fontSize: 34, fontWeight: 700, fontFamily: 'Fraunces, Georgia, serif' }}
      >
        S
      </text>
    </svg>
  )
}

export default function Platform() {
  const reducedMotion               = useReducedMotion()
  const [allow3D, setAllow3D]       = useState(false)
  const [lowPower, setLowPower]     = useState(false)
  const [vizRef, inView]            = useInView({ rootMargin: '100px' })

  useEffect(() => {
    const evaluate = () => {
      setAllow3D(shouldRender3D({ reducedMotion, minWidth: 360 }))
      setLowPower(window.innerWidth < 768)
    }
    evaluate()
    window.addEventListener('resize', evaluate)
    return () => window.removeEventListener('resize', evaluate)
  }, [reducedMotion])

  const Viz = (
    <div ref={vizRef} className="relative h-full w-full" aria-hidden="true">
      {allow3D ? (
        <Suspense fallback={<StaticConstellation modules={platform.modules} />}>
          <TowerScene3D
            active={inView}
            dpr={lowPower ? [1, 1.5] : [1, 2]}
            lowPower={lowPower}
          />
        </Suspense>
      ) : (
        <StaticConstellation modules={platform.modules} />
      )}
    </div>
  )

  return (
    <section id="platform" className="section bg-cream">
      <div className="container-mhms grid items-center gap-10 lg:grid-cols-2">
        <div className="max-w-xl">
          <SectionHeading
            align="left"
            eyebrow={platform.eyebrow}
            title={platform.title}
            intro={platform.body}
          />
        </div>
        <div className="relative aspect-[4/3] w-full">{Viz}</div>
      </div>
    </section>
  )
}
