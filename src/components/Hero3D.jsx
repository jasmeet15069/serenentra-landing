import { useReducedMotion } from '../lib/useReducedMotion'
import StaticHeroVisual from './3d/StaticHeroVisual'
import Hero3DScene from './3d/Hero3DScene'

/**
 * Renders the animated SVG entity graph, or a static illustration for
 * users who prefer reduced motion (prefers-reduced-motion: reduce).
 * No WebGL / three.js — smooth on every device.
 */
export default function Hero3D() {
  const reducedMotion = useReducedMotion()

  return (
    <div className="relative h-full w-full" aria-hidden="true">
      {reducedMotion ? <StaticHeroVisual /> : <Hero3DScene />}
    </div>
  )
}
