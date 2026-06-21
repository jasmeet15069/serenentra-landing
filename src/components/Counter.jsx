import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../lib/useReducedMotion'

/**
 * Animated count-up for stats (polish). Parses the leading number out of a string like
 * "500+", "99.9%", "40+" and animates 0 -> value when scrolled into view, preserving the
 * prefix/suffix (e.g. "+", "%"). Falls back to the literal value when:
 *   - prefers-reduced-motion is set, or
 *   - the string has no parseable number (e.g. "1 → ∞").
 */
function parse(value) {
  const m = String(value).match(/^([^\d.]*)([\d.,]+)(.*)$/)
  if (!m) return null
  const num = parseFloat(m[2].replace(/,/g, ''))
  if (Number.isNaN(num)) return null
  const decimals = (m[2].split('.')[1] || '').length
  return { prefix: m[1], num, suffix: m[3], decimals }
}

export default function Counter({ value, className, duration = 1400 }) {
  const reduced = useReducedMotion()
  const parsed = parse(value)
  const ref = useRef(null)
  const [display, setDisplay] = useState(parsed && !reduced ? `${parsed.prefix}0${parsed.suffix}` : value)

  useEffect(() => {
    if (!parsed || reduced) {
      setDisplay(value)
      return
    }
    const el = ref.current
    if (!el) return

    let raf
    let started = false
    const run = (start) => {
      const step = (now) => {
        const t = Math.min(1, (now - start) / duration)
        const eased = 1 - Math.pow(1 - t, 3) // easeOutCubic
        const current = (parsed.num * eased).toFixed(parsed.decimals)
        setDisplay(`${parsed.prefix}${current}${parsed.suffix}`)
        if (t < 1) raf = requestAnimationFrame(step)
      }
      raf = requestAnimationFrame(step)
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true
          run(performance.now())
          io.disconnect()
        }
      },
      { threshold: 0.4 }
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, reduced])

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}
