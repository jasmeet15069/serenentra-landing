import { useEffect, useRef, useState } from 'react'

/**
 * Reports whether a referenced element is on screen.
 * Used to pause the 3D render loop when a scene scrolls off-screen (PRD 6A.4 —
 * IntersectionObserver + frameloop="demand" so off-screen scenes don't burn GPU/battery).
 */
export function useInView({ rootMargin = '200px', threshold = 0 } = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin, threshold }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [rootMargin, threshold])

  return [ref, inView]
}
