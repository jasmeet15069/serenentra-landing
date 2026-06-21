import { useMemo, useState } from 'react'
import { infrastructure, config, pricing } from '../content'
import { formatMoney } from '../lib/format'
import SectionHeading from './SectionHeading'
import Icon from './Icon'
import VmCalculator from './VmCalculator'

/**
 * Infrastructure / hosting transparency (PRD 5.11A, SixOrbit-style).
 * Renders: licensing selector, VM sizing table, ALR tiers, illustrative 5-yr TCO chart,
 * and the interactive calculator. ALR/perpetual blocks only show when both models exist.
 * ALL ₹ / % figures are placeholders.
 */

const showPerpetual = config.licensingModel === 'both'

/** Simple illustrative TCO bar chart: cumulative cost over 5 years. */
function TcoChart() {
  // Use a representative mid-size subscription (Growth) for the illustration.
  const subAnnual = pricing.tiers[1].priceMonthly * pricing.annualMultiplier
  const base = infrastructure.tco.perpetualLicenseBase
  const alr = infrastructure.tco.alrAnnualRate

  const years = [1, 2, 3, 4, 5]
  const data = years.map((y) => ({
    year: y,
    sub: subAnnual * y,
    perp: base + base * alr * y,
  }))
  const max = Math.max(...data.flatMap((d) => [d.sub, d.perp]))

  return (
    <div className="card p-6 sm:p-8">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-xl font-semibold text-espresso">5-year cost of ownership</h3>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-clay-500" /> Subscription</span>
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-espresso/70" /> Perpetual</span>
        </div>
      </div>

      <div className="mt-8 flex items-end justify-between gap-3" style={{ height: 220 }}>
        {data.map((d) => (
          <div key={d.year} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex h-full w-full items-end justify-center gap-1.5">
              <div
                className="w-1/2 rounded-t bg-clay-500 transition-all"
                style={{ height: `${(d.sub / max) * 100}%` }}
                title={`Subscription Y${d.year}: ${formatMoney(d.sub)}`}
              />
              <div
                className="w-1/2 rounded-t bg-espresso/70 transition-all"
                style={{ height: `${(d.perp / max) * 100}%` }}
                title={`Perpetual Y${d.year}: ${formatMoney(d.perp)}`}
              />
            </div>
            <span className="text-xs text-espresso/50">Y{d.year}</span>
          </div>
        ))}
      </div>
      <p className="mt-4 text-[11px] leading-relaxed text-espresso/40">{infrastructure.tco.note}</p>
    </div>
  )
}

export default function Infrastructure() {
  const [model, setModel] = useState('subscription')
  const lic = infrastructure.licensing
  const active = model === 'subscription' ? lic.subscription : lic.perpetual

  const models = useMemo(
    () => (showPerpetual ? ['subscription', 'perpetual'] : ['subscription']),
    []
  )

  return (
    <section id="infrastructure" className="section">
      <div className="container-mhms">
        <SectionHeading eyebrow={infrastructure.eyebrow} title={infrastructure.title} intro={infrastructure.body} />

        {/* Licensing model selector */}
        {showPerpetual && (
          <div className="reveal mx-auto mt-10 max-w-2xl">
            <div className="flex rounded-full border border-espresso/10 bg-white p-1" role="tablist" aria-label="Licensing model">
              {models.map((m) => {
                const label = m === 'subscription' ? lic.subscription.name : lic.perpetual.name
                return (
                  <button
                    key={m}
                    role="tab"
                    aria-selected={model === m}
                    onClick={() => setModel(m)}
                    className={`flex-1 rounded-full px-4 py-2.5 text-sm font-semibold transition-all ${
                      model === m ? 'bg-clay-500 text-white shadow-soft' : 'text-espresso/65 hover:text-espresso'
                    }`}
                  >
                    {label}
                  </button>
                )
              })}
            </div>
            <div className="mt-6 card p-6 text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-clay-600">{active.tagline}</p>
              <ul className="mt-4 grid gap-2 text-left sm:grid-cols-2">
                {active.points.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-sm text-espresso/75">
                    <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-clay-500" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* VM sizing tier table */}
        <div className="reveal mt-14">
          <h3 className="font-display text-2xl font-semibold text-espresso">Server sizing, matched to your scale</h3>
          <p className="mt-2 max-w-2xl text-sm text-espresso/60">{infrastructure.vmHelperLine}</p>

          {/* Desktop table */}
          <div className="mt-6 hidden overflow-hidden rounded-xl2 border border-espresso/[0.08] md:block">
            <table className="w-full text-left text-sm">
              <thead className="bg-sand/60 text-espresso">
                <tr>
                  <th className="px-5 py-4 font-semibold">Tier</th>
                  <th className="px-5 py-4 font-semibold">Recommended for</th>
                  <th className="px-5 py-4 font-semibold">vCPU / RAM</th>
                  <th className="px-5 py-4 font-semibold">Concurrent users</th>
                  <th className="px-5 py-4 font-semibold">Indicative monthly server cost*</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-espresso/[0.06]">
                {infrastructure.vmTiers.map((t) => (
                  <tr key={t.tier} className="bg-white">
                    <td className="px-5 py-4 font-semibold text-espresso">{t.tier}</td>
                    <td className="px-5 py-4 text-espresso/65">{t.recommendedFor}</td>
                    <td className="px-5 py-4 text-espresso/65">{t.specs}</td>
                    <td className="px-5 py-4 text-espresso/65">{t.concurrent}</td>
                    <td className="px-5 py-4 font-semibold text-clay-600">
                      {t.costPerMonth != null ? `${formatMoney(t.costPerMonth)}/mo` : 'Contact Sales'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="mt-6 grid gap-3 md:hidden">
            {infrastructure.vmTiers.map((t) => (
              <div key={t.tier} className="card p-5">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-espresso">{t.tier}</p>
                  <p className="font-semibold text-clay-600">
                    {t.costPerMonth != null ? `${formatMoney(t.costPerMonth)}/mo` : 'Contact Sales'}
                  </p>
                </div>
                <p className="mt-1 text-sm text-espresso/60">{t.recommendedFor}</p>
                <p className="mt-2 text-xs text-espresso/50">{t.specs} · {t.concurrent} concurrent</p>
              </div>
            ))}
          </div>

          <p className="mt-3 text-xs text-espresso/45">{infrastructure.vmTableNote}</p>
        </div>

        {/* TCO chart + calculator */}
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="reveal"><TcoChart /></div>
          {config.showVmCalculator && <div className="reveal"><VmCalculator /></div>}
        </div>

        {/* ALR tiers (only when perpetual licensing exists) */}
        {showPerpetual && (
          <div className="reveal mt-14">
            <h3 className="font-display text-2xl font-semibold text-espresso">Annual License Renewal (ALR)</h3>
            <p className="mt-2 max-w-2xl text-sm text-espresso/60">{infrastructure.alrNote}</p>
            <div className="mt-6 grid gap-5 sm:grid-cols-3">
              {infrastructure.alrTiers.map((a) => (
                <div key={a.name} className="card p-6">
                  <h4 className="font-display text-lg font-bold text-espresso">{a.name}</h4>
                  <p className="mt-1 text-sm font-semibold text-clay-600">{a.rate} <span className="font-normal text-espresso/45">of license / year</span></p>
                  <ul className="mt-4 space-y-2">
                    {a.points.map((p) => (
                      <li key={p} className="flex items-start gap-2.5 text-sm text-espresso/70">
                        <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-clay-500" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
