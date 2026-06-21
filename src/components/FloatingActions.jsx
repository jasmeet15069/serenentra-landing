import { useEffect, useState } from 'react'
import { config } from '../content'
import Icon from './Icon'
import { track } from '../lib/analytics'
import { useConsentResolved } from '../lib/useCookieConsent'
import { useSmoothScroll } from '../lib/SmoothScroll'

/**
 * Bottom-right floating action stack (PRD 7.9 + polish):
 *  - WhatsApp contact button (always present).
 *  - Back-to-top button (appears after scrolling down).
 * Shifts up on mobile while the cookie banner is visible so they never overlap it.
 */
export default function FloatingActions() {
  const resolved = useConsentResolved()
  const { scrollTo } = useSmoothScroll()
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const whatsappHref = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(config.whatsappPrefill)}`

  // While the cookie banner is up (mobile, full-width bottom), lift the stack.
  const bottomCls = resolved ? 'bottom-5' : 'bottom-28 sm:bottom-5'

  return (
    <div
      className={`fixed right-4 z-40 flex flex-col items-end gap-3 transition-all duration-300 sm:right-5 ${bottomCls}`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {/* Back to top */}
      <button
        type="button"
        onClick={() => {
          scrollTo('#main', { offset: 0 })
          track('back_to_top')
        }}
        aria-label="Back to top"
        className={`grid h-11 w-11 place-items-center rounded-full border border-espresso/10 bg-white text-espresso shadow-lift transition-all duration-300 hover:bg-cream ${
          showTop ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
        }`}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19V5M6 11l6-6 6 6" />
        </svg>
      </button>

      {/* WhatsApp */}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track('whatsapp_click')}
        aria-label="Chat with us on WhatsApp"
        className="group flex items-center gap-0 rounded-full bg-[#25D366] p-3.5 text-white shadow-lift transition-all hover:gap-2 hover:pr-5"
      >
        <Icon name="whatsapp" className="h-7 w-7" />
        <span className="hidden max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-300 group-hover:max-w-[160px] sm:inline">
          Chat with us
        </span>
      </a>
    </div>
  )
}
