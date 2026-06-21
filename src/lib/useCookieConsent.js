import { useEffect, useState } from 'react'

/**
 * Shared cookie-consent state (PRD 7.12) so the banner AND the floating UI agree on
 * whether the banner is currently occupying the bottom of the screen — letting the
 * WhatsApp / back-to-top buttons shift up to avoid overlapping it on mobile.
 */
const KEY = 'mhms_cookie_consent'
const EVT = 'mhms:cookie-resolved'

export function getConsent() {
  try {
    return localStorage.getItem(KEY)
  } catch {
    return null
  }
}

export function setConsent(value) {
  try {
    localStorage.setItem(KEY, value)
  } catch {
    /* storage blocked — still notify listeners for this session */
  }
  window.dispatchEvent(new CustomEvent(EVT, { detail: value }))
}

/** True once the user has accepted/declined (or had a prior choice). */
export function useConsentResolved() {
  const [resolved, setResolved] = useState(() => !!getConsent())
  useEffect(() => {
    const onResolved = () => setResolved(true)
    window.addEventListener(EVT, onResolved)
    return () => window.removeEventListener(EVT, onResolved)
  }, [])
  return resolved
}
