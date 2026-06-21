import { createContext, useContext, useEffect, useRef } from 'react'
import { useReducedMotion } from './useReducedMotion'

/**
 * Smooth-scroll provider (PRD 6A.3).
 *
 * - Wraps the page in Lenis inertia scrolling.
 * - Syncs Lenis -> GSAP ScrollTrigger so scroll-scrubbed 3D/animation stay in lockstep.
 * - Exposes a `scrollTo(target)` via context so anchor nav + header use Lenis,
 *   NOT native scrollIntoView (PRD 6A.3).
 * - Honors prefers-reduced-motion: when set, Lenis is NOT initialized — native scroll
 *   is used and a context scrollTo() falls back to native smooth/auto behavior.
 *
 * `duration` (~1.1–1.2) is the tunable "feel" parameter called out in PRD 6A.3.
 */
const ScrollContext = createContext({ scrollTo: () => {} })

export function useSmoothScroll() {
  return useContext(ScrollContext)
}

export function SmoothScroll({ children }) {
  const reducedMotion = useReducedMotion()
  const lenisRef = useRef(null)

  useEffect(() => {
    // Reduced motion -> skip Lenis entirely, rely on native scroll (PRD 6A.5).
    if (reducedMotion) return

    let lenis
    let rafId
    let ScrollTrigger
    let cancelled = false

    // Lazy-load motion libs so they don't block initial text render (PRD 6A.4).
    ;(async () => {
      const [{ default: Lenis }, gsapMod] = await Promise.all([
        import('lenis'),
        import('gsap/ScrollTrigger'),
      ])
      const gsap = (await import('gsap')).default
      ScrollTrigger = gsapMod.ScrollTrigger
      gsap.registerPlugin(ScrollTrigger)
      if (cancelled) return

      lenis = new Lenis({
        duration: 1.15, // tunable feel (PRD 6A.3) — lower = snappier, higher = floatier.
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      })
      lenisRef.current = lenis

      // Keep ScrollTrigger in sync with Lenis (documented integration pattern).
      lenis.on('scroll', ScrollTrigger.update)
      gsap.ticker.add((time) => lenis.raf(time * 1000))
      gsap.ticker.lagSmoothing(0)
    })()

    return () => {
      cancelled = true
      if (rafId) cancelAnimationFrame(rafId)
      if (lenis) lenis.destroy()
      lenisRef.current = null
    }
  }, [reducedMotion])

  const scrollTo = (target, opts = {}) => {
    const lenis = lenisRef.current
    if (lenis) {
      lenis.scrollTo(target, { offset: -72, duration: 1.2, ...opts })
      return
    }
    // Fallback: native scroll (reduced-motion or before Lenis mounts).
    const el = typeof target === 'string' ? document.querySelector(target) : target
    if (el && el.scrollIntoView) {
      el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' })
    }
  }

  return <ScrollContext.Provider value={{ scrollTo }}>{children}</ScrollContext.Provider>
}
