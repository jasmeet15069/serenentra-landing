/**
 * Analytics shim (PRD 7.5). Key CTAs also carry `data-analytics` attributes in markup
 * so a tag manager can bind without code changes. This helper centralizes the dispatch
 * so GA4 / Segment / etc. can be wired in one place later.
 */
export function track(event, payload = {}) {
  // TODO: wire to GA4 / Segment / your analytics provider.
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({ event, ...payload })
  }
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.debug('[analytics]', event, payload)
  }
}
