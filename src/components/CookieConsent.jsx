import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getConsent, setConsent } from '../lib/useCookieConsent'

/**
 * Cookie-consent banner (PRD 7.12). Stores an "accepted"/"declined" flag in localStorage
 * (real localStorage is fine here — this is deployed site code, not an artifact preview).
 * Analytics/chat scripts should check `localStorage.mhms_cookie_consent === 'accepted'`
 * before setting non-essential cookies.
 *
 * Positioned bottom-left on desktop and full-width on mobile; floating actions listen to
 * the shared consent signal and shift up while this is visible (see FloatingActions).
 */
export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!getConsent()) setVisible(true)
  }, [])

  const decide = (value) => {
    setConsent(value)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      className="fixed inset-x-3 bottom-3 z-[70] sm:left-5 sm:right-auto sm:max-w-sm"
      style={{ marginBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="card flex flex-col gap-3 p-4">
        <p className="text-sm text-espresso/70">
          We use cookies to improve your experience and analyze traffic.{' '}
          <Link to="/privacy" className="font-semibold text-clay-600 underline underline-offset-2">
            Learn more
          </Link>
          .
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => decide('declined')}
            className="flex-1 rounded-full border border-espresso/15 px-4 py-2 text-sm font-semibold text-espresso/70 hover:border-espresso/35"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => decide('accepted')}
            className="flex-1 rounded-full bg-clay-500 px-4 py-2 text-sm font-semibold text-white hover:bg-clay-600"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
