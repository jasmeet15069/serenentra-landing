/** Tiny window-event bus used to open the demo-video modal from anywhere (PRD 7.10). */
export const OPEN_VIDEO = 'mhms:open-video'

export function openVideoModal() {
  window.dispatchEvent(new CustomEvent(OPEN_VIDEO))
}

export function onOpenVideoModal(handler) {
  window.addEventListener(OPEN_VIDEO, handler)
  return () => window.removeEventListener(OPEN_VIDEO, handler)
}
