import { useState } from 'react'
import { pricing } from '../content'
import { formatMoney } from '../lib/format'
import SectionHeading from './SectionHeading'
import AnchorLink from './AnchorLink'
import Icon from './Icon'

/**
 * Pricing tiers with Monthly/Annual toggle (PRD 5.11 / 7.3).
 * Annual bills for `annualMultiplier` months (e.g. 10 = "2 months free").
 * Prices are PLACEHOLDERS in ₹ (PRD 5.11 code-comment note).
 */
export default function Pricing() {
  const [annual, setAnnual] = useState(true)

  // Monthly-equivalent shown on cards; annual divides the 10-month total by 12.
  const monthlyEquiv = (priceMonthly) => {
    if (priceMonthly == null) return null
    return annual ? Math.round((priceMonthly * pricing.annualMultiplier) / 12) : priceMonthly
  }

  return (
    <section id="pricing" className="section bg-sand/40">
      <div className="container-mhms">
        <SectionHeading eyebrow={pricing.eyebrow} title={pricing.title} intro={pricing.subtitle} />

        {/* Billing toggle */}
        <div className="reveal mt-10 flex items-center justify-center gap-4">
          <span className={`text-sm font-semibold ${!annual ? 'text-espresso' : 'text-espresso/45'}`}>Monthly</span>
          <button
            type="button"
            role="switch"
            aria-checked={annual}
            aria-label="Toggle annual billing"
            onClick={() => setAnnual((v) => !v)}
            className={`relative h-7 w-12 rounded-full transition-colors ${annual ? 'bg-clay-500' : 'bg-espresso/20'}`}
          >
            <span className={`absolute left-0 top-1 h-5 w-5 rounded-full bg-white shadow transition-transform ${annual ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
          <span className={`text-sm font-semibold ${annual ? 'text-espresso' : 'text-espresso/45'}`}>
            Annual
            <span className="ml-2 rounded-full bg-clay-100 px-2 py-0.5 text-[11px] font-bold text-clay-700">{pricing.annualDiscountLabel}</span>
          </span>
        </div>

        {/* Tiers */}
        <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-3">
          {pricing.tiers.map((t) => {
            const price = monthlyEquiv(t.priceMonthly)
            return (
              <div
                key={t.key}
                className={`reveal relative flex flex-col rounded-xl2 border p-7 ${
                  t.featured ? 'border-clay-500 bg-white shadow-lift lg:-mt-4 lg:mb-4' : 'border-espresso/[0.08] bg-white shadow-soft'
                }`}
              >
                {t.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-clay-500 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                    Most popular
                  </span>
                )}
                <h3 className="font-display text-xl font-bold text-espresso">{t.name}</h3>
                <p className="mt-1 text-sm text-espresso/55">{t.target}</p>

                <div className="mt-5">
                  {price == null ? (
                    <p className="font-display text-3xl font-bold text-espresso">Contact Sales</p>
                  ) : (
                    <p className="font-display">
                      <span className="text-4xl font-bold text-espresso">{formatMoney(price)}</span>
                      <span className="text-sm font-medium text-espresso/50"> /mo</span>
                    </p>
                  )}
                  <p className="mt-1 h-4 text-xs text-espresso/45">
                    {price == null ? 'Custom pricing' : annual ? 'billed annually' : 'billed monthly'} · placeholder ₹
                  </p>
                </div>

                <ul className="mt-6 flex-1 space-y-3">
                  {t.includes.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-espresso/75">
                      <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-clay-500" />
                      {f}
                    </li>
                  ))}
                </ul>

                <AnchorLink
                  href={t.cta.href}
                  className={`mt-7 w-full ${t.featured ? 'btn-primary' : 'btn-ghost'}`}
                  data-analytics={`cta_pricing_${t.key}`}
                  analytics={`cta_pricing_${t.key}`}
                >
                  {t.cta.label}
                </AnchorLink>
              </div>
            )
          })}
        </div>

        <p className="reveal mt-6 text-center text-xs text-espresso/40">
          All prices are placeholders shown in ₹ (INR) and must be confirmed before launch.
        </p>
      </div>
    </section>
  )
}
