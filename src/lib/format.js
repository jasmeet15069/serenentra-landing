import { config } from '../content'

/**
 * Currency formatting — single, consistent currency across the page (PRD 7.8: INR-only).
 * Uses the Indian numbering system (lakh/crore grouping) via Intl.
 */
const formatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: config.currency, // 'INR'
  maximumFractionDigits: 0,
})

export function formatMoney(amount) {
  if (amount == null) return 'Contact Sales'
  return formatter.format(amount)
}

/** Plain grouped number (no currency symbol). */
export function formatNumber(n) {
  return new Intl.NumberFormat('en-IN').format(n)
}
