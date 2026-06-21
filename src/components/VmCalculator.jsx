import { useMemo, useState } from 'react'
import { infrastructure, pricing } from '../content'
import { formatMoney } from '../lib/format'
import { track } from '../lib/analytics'

/**
 * Interactive VM sizing + 5-year TCO estimator (PRD 7.6).
 * Pure client-side arithmetic over content.js config — no backend.
 * Clearly labelled "estimate only" so it is not read as a binding quote.
 */
export default function VmCalculator() {
  const [rooms, setRooms] = useState(40)

  const result = useMemo(() => {
    const tier = infrastructure.vmTiers.find((t) => rooms >= t.rooms[0] && rooms <= t.rooms[1]) ?? infrastructure.vmTiers.at(-1)

    // Map room count to a subscription tier price (placeholder figures).
    const subTier =
      rooms <= 25 ? pricing.tiers[0] : rooms <= 100 ? pricing.tiers[1] : null
    const subMonthly = subTier?.priceMonthly ?? null // null => Enterprise = Contact Sales
    const subAnnual = subMonthly != null ? subMonthly * pricing.annualMultiplier : null
    const sub5yr = subAnnual != null ? subAnnual * 5 : null

    // Illustrative perpetual: one-time license + ALR each year (PRD 5.11A.4).
    const base = infrastructure.tco.perpetualLicenseBase
    const alr = infrastructure.tco.alrAnnualRate
    const perp5yr = base + base * alr * 5

    return { tier, subMonthly, sub5yr, perp5yr }
  }, [rooms])

  return (
    <div className="card p-6 sm:p-8">
      <h3 className="font-display text-xl font-semibold text-espresso">Estimate your tier &amp; 5-year cost</h3>
      <p className="mt-1 text-sm text-espresso/55">
        Drag to your room count. Estimate only — confirm exact pricing with our sales team.
      </p>

      {/* Rooms input */}
      <div className="mt-6">
        <div className="flex items-baseline justify-between">
          <label htmlFor="rooms" className="text-sm font-semibold text-espresso">Number of rooms</label>
          <span className="font-display text-2xl font-bold text-clay-600">{rooms}+</span>
        </div>
        <input
          id="rooms"
          type="range"
          min="1"
          max="500"
          step="1"
          value={rooms}
          onChange={(e) => setRooms(Number(e.target.value))}
          onMouseUp={() => track('vm_calculator_used', { rooms })}
          className="mt-3 w-full accent-clay-500"
        />
        <div className="mt-1 flex justify-between text-[11px] text-espresso/40">
          <span>1</span><span>500+</span>
        </div>
      </div>

      {/* Recommended tier */}
      <div className="mt-6 rounded-xl bg-clay-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-clay-600">Recommended server tier</p>
        <p className="mt-1 font-display text-lg font-bold text-espresso">{result.tier.tier}</p>
        <p className="text-sm text-espresso/60">
          {result.tier.specs} · {result.tier.concurrent} concurrent ·{' '}
          {result.tier.costPerMonth != null ? `${formatMoney(result.tier.costPerMonth)}/mo hosting (placeholder)` : 'Custom — Contact Sales'}
        </p>
      </div>

      {/* TCO comparison */}
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-espresso/10 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-espresso/45">Subscription · 5-yr</p>
          <p className="mt-1 font-display text-xl font-bold text-espresso">
            {result.sub5yr != null ? formatMoney(result.sub5yr) : 'Contact Sales'}
          </p>
          <p className="text-[11px] text-espresso/45">
            {result.subMonthly != null ? `${formatMoney(result.subMonthly)}/mo · hosting included` : 'Custom for 100+ rooms'}
          </p>
        </div>
        <div className="rounded-xl border border-espresso/10 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-espresso/45">Enterprise / Perpetual · 5-yr</p>
          <p className="mt-1 font-display text-xl font-bold text-espresso">{formatMoney(result.perp5yr)}</p>
          <p className="text-[11px] text-espresso/45">one-time license + ALR (illustrative)</p>
        </div>
      </div>

      <p className="mt-4 text-[11px] leading-relaxed text-espresso/40">
        {infrastructure.tco.note} All figures are placeholders pending real pricing.
      </p>
    </div>
  )
}
