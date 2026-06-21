import { useEffect } from 'react'

/**
 * Lightweight scroll-reveal for 2D content (PRD 6 — "subtle scroll-reveal/fade-in").
 * Adds `.is-visible` to any `.reveal` element when it enters the viewport.
 * Pure IntersectionObserver — no GSAP needed for these simple fades, keeps bundle lean.
 * Reduced-motion is handled in CSS (reveal is shown immediately).
 */
export function useReveal(deps = []) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.reveal:not(.is-visible)'))
    if (!els.length) return

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )

    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
