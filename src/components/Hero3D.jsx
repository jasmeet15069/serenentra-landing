import { Suspense, lazy, useEffect, useState } from 'react'
import { useReducedMotion } from '../lib/useReducedMotion'
import { shouldRender3D } from '../lib/webgl'
import { useInView } from '../lib/useInView'
import StaticHeroVisual from './3d/StaticHeroVisual'

// Lazy-load the whole 3D scene so three/r3f/drei stay out of the initial bundle (PRD 6A.4).
const Hero3DScene = lazy(() => import('./3d/Hero3DScene'))

/**
 * Decides between the live 3D scene and a static illustration (PRD 6A.5).
 *
 * The hero 3D now runs on MOBILE too (per request) — only gated by reduced-motion and
 * WebGL support, with a very small width floor. On phones we lower the pixel ratio so it
 * stays smooth, and the render loop still pauses off-screen.
 */
export default function Hero3D() {
  const reducedMotion = useReducedMotion()
  const [allow3D, setAllow3D] = useState(false)
  const [lowPower, setLowPower] = useState(false)
  const [containerRef, inView] = useInView({ rootMargin: '100px' })

  useEffect(() => {
    const evaluate = () => {
      // minWidth 360 -> enable on essentially all phones; still respects WebGL + reduced-motion.
      setAllow3D(shouldRender3D({ reducedMotion, minWidth: 360 }))
      setLowPower(window.innerWidth < 768)
    }
    evaluate()
    window.addEventListener('resize', evaluate)
    return () => window.removeEventListener('resize', evaluate)
  }, [reducedMotion])

  return (
    <div ref={containerRef} className="relative h-full w-full" aria-hidden="true">
      {allow3D ? (
        <Suspense fallback={<StaticHeroVisual />}>
          {/* Pause render loop off-screen; cap pixel ratio harder on phones. */}
          <Hero3DScene active={inView} dpr={lowPower ? [1, 1.5] : [1, 2]} />
        </Suspense>
      ) : (
        <StaticHeroVisual />
      )}
    </div>
  )
}
