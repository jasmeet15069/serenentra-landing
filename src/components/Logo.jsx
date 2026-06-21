import { brand } from '../content'

/** MHMS typographic wordmark with a small monogram tile (PRD 5.1 / 6). */
export default function Logo({ className = '', compact = false }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span
        className="grid h-8 w-8 place-items-center rounded-lg bg-clay-500 font-display text-base font-bold leading-none text-white shadow-soft"
        aria-hidden="true"
      >
        M
      </span>
      {!compact && (
        <span className="font-display text-xl font-bold tracking-tight text-espresso">{brand.name}</span>
      )}
    </span>
  )
}
