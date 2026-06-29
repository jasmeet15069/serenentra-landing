import { useEffect, useRef, useState } from 'react'
import { config } from '../content'
import { onOpenVideoModal } from '../lib/events'

/**
 * Demo-video lightbox (PRD 7.10). Opens on the `mhms:open-video` event.
 * - Keyboard dismissible (Esc), focus trapped while open, backdrop click closes.
 * - Embeds an unlisted YouTube/Vimeo URL from config (placeholder until real video).
 * Only mounted when config.hasDemoVideo is true (see App.jsx).
 */
export default function VideoModalMount() {
  const [open, setOpen] = useState(false)
  const dialogRef = useRef(null)
  const closeRef = useRef(null)
  const lastFocused = useRef(null)

  useEffect(() => onOpenVideoModal(() => setOpen(true)), [])

  useEffect(() => {
    if (!open) return
    lastFocused.current = document.activeElement
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        return
      }
      if (e.key === 'Tab') {
        // Simple focus trap across focusable elements in the dialog.
        const focusables = dialogRef.current?.querySelectorAll('button, a[href], iframe, [tabindex]:not([tabindex="-1"])')
        if (!focusables || !focusables.length) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      lastFocused.current?.focus?.()
    }
  }, [open])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-espresso/70 p-4 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && setOpen(false)}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Product overview video"
        className="relative w-full max-w-3xl overflow-hidden rounded-xl2 bg-black shadow-lift"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close video"
          className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-espresso transition-colors hover:bg-white"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
        <div className="aspect-video w-full">
          <iframe
            className="h-full w-full"
            src={`${config.demoVideoEmbedUrl}?autoplay=1`}
            title="Serenentra product overview (placeholder video)"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  )
}
