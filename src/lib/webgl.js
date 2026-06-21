/**
 * WebGL availability + device-capability detection (PRD 6A.5).
 * If WebGL is unavailable, callers render a static illustration instead of a 3D scene.
 */
export function isWebGLAvailable() {
  if (typeof window === 'undefined') return false
  try {
    const canvas = document.createElement('canvas')
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
  } catch {
    return false
  }
}

/**
 * Whether the viewport is wide enough for full 3D.
 * PRD Q8 recommendation: disable 3D below tablet (~768px) for v1.
 */
export function isWideEnoughFor3D(minWidth = 768) {
  if (typeof window === 'undefined') return false
  return window.innerWidth >= minWidth
}

/**
 * Single gate: should we attempt to render 3D at all right now?
 * Combines reduced-motion, WebGL support and viewport width.
 */
export function shouldRender3D({ reducedMotion, minWidth = 768 } = {}) {
  if (reducedMotion) return false
  if (!isWebGLAvailable()) return false
  if (typeof window !== 'undefined' && window.innerWidth < minWidth) return false
  return true
}
