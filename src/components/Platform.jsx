import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { platform } from '../content'
import { useReducedMotion } from '../lib/useReducedMotion'
import { shouldRender3D } from '../lib/webgl'
import { useInView } from '../lib/useInView'
import SectionHeading from './SectionHeading'

const PlatformConstellation3D = lazy(() => import('./3d/PlatformConstellation3D'))

/** Static fallback diagram: hub + connected module ring (PRD 6A.5). */
function StaticConstellation({ modules }) {
  const cx = 240
  const cy = 200
  return (
    <svg viewBox="0 0 480 400" className="h-full w-full" role="img" aria-label="Serenentra connects PMS, Booking Engine, Channel Manager, Payments and Reporting">
      {modules.map((m, i) => {
        const a = (i / modules.length) * Math.PI * 2 - Math.PI / 2
        const x = cx + Math.cos(a) * 165
        const y = cy + Math.sin(a) * 130
        return (
          <g key={m}>
            <line x1={cx} y1={cy} x2={x} y2={y} stroke="#E29C7E" strokeWidth="1.5" />
            <circle cx={x} cy={y} r="34" fill="#fff" stroke="#EFC0AC" strokeWidth="1.5" />
            <text x={x} y={y} textAnchor="middle" dominantBaseline="middle" className="fill-espresso" style={{ fontSize: 11, fontWeight: 600 }}>
              {m.length > 9 ? m.split(' ')[0] : m}
            </text>
          </g>
        )
      })}
      <circle cx={cx} cy={cy} r="46" fill="#C2613F" />
      <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle" fill="#fff" style={{ fontSize: 34, fontWeight: 700, fontFamily: 'Fraunces, Georgia, serif' }}>
        S
      </text>
    </svg>
  )
}

export default function Platform() {
  const reducedMotion = useReducedMotion()
  const [allow3D, setAllow3D] = useState(false)
  const sectionRef = useRef(null)
  const progressRef = useRef(0)
  const [vizRef, inView] = useInView({ rootMargin: '100px' })

  useEffect(() => {
    // The pinned/scrubbed constellation needs the two-column (lg) layout + more GPU
    // headroom, so gate it at desktop width; tablets/phones get the static diagram.
    const evaluate = () => setAllow3D(shouldRender3D({ reducedMotion, minWidth: 1024 }))
    evaluate()
    window.addEventListener('resize', evaluate)
    return () => window.removeEventListener('resize', evaluate)
  }, [reducedMotion])

  // Scroll-scrub: map section scroll range -> progressRef (PRD 6A.2 #2).
  useEffect(() => {
    if (!allow3D || !sectionRef.current) return
    let st
    let cancelled = false
    ;(async () => {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      if (cancelled) return
      st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          progressRef.current = self.progress
        },
      })
    })()
    return () => {
      cancelled = true
      st?.kill()
    }
  }, [allow3D])

  const Viz = (
    <div ref={vizRef} className="relative h-full w-full" aria-hidden="true">
      {allow3D ? (
        <Suspense fallback={<StaticConstellation modules={platform.modules} />}>
          <PlatformConstellation3D modules={platform.modules} progressRef={progressRef} active={inView} />
        </Suspense>
      ) : (
        <StaticConstellation modules={platform.modules} />
      )}
    </div>
  )

  // 3D variant: tall section + sticky stage gives the scrub its scroll range.
  if (allow3D) {
    return (
      <section id="platform" ref={sectionRef} className="relative bg-cream">
        <div className="sticky top-0 flex min-h-screen items-center">
          <div className="container-mhms grid items-center gap-10 py-20 lg:grid-cols-2">
            <div className="max-w-xl">
              <SectionHeading align="left" eyebrow={platform.eyebrow} title={platform.title} intro={platform.body} />
            </div>
            <div className="relative aspect-[4/3] w-full">{Viz}</div>
          </div>
        </div>
        {/* spacer creates the scroll range the scrub animates across */}
        <div className="h-[70vh]" aria-hidden="true" />
      </section>
    )
  }

  // Reduced-motion / no-WebGL variant: normal-height section with static diagram.
  return (
    <section id="platform" className="section bg-cream">
      <div className="container-mhms grid items-center gap-10 lg:grid-cols-2">
        <div className="max-w-xl">
          <SectionHeading align="left" eyebrow={platform.eyebrow} title={platform.title} intro={platform.body} />
        </div>
        <div className="relative aspect-[4/3] w-full">{Viz}</div>
      </div>
    </section>
  )
}
