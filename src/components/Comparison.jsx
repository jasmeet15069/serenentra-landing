import { comparison } from '../content'
import SectionHeading from './SectionHeading'
import Icon from './Icon'

/**
 * Competitor comparison (PRD 5.15 / 7.14). Generic "Traditional / Legacy PMS" column —
 * no named competitors, no fabricated competitor pricing/claims.
 * Desktop: table. Mobile: stacked per-feature cards (no horizontal scroll).
 */
export default function Comparison() {
  return (
    <section className="section bg-sand/40">
      <div className="container-mhms">
        <SectionHeading eyebrow={comparison.eyebrow} title={comparison.title} />

        {/* Desktop table */}
        <div className="reveal mx-auto mt-12 hidden max-w-4xl overflow-hidden rounded-xl2 border border-espresso/[0.08] bg-white shadow-soft sm:block">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-espresso/10">
                <th className="px-5 py-4" />
                <th className="px-5 py-4 text-center font-display text-base font-bold text-clay-600">{comparison.columns[0]}</th>
                <th className="px-5 py-4 text-center font-semibold text-espresso/55">{comparison.columns[1]}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-espresso/[0.06]">
              {comparison.rows.map((r) => (
                <tr key={r.feature}>
                  <th scope="row" className="px-5 py-4 font-semibold text-espresso">{r.feature}</th>
                  <td className="px-5 py-4 text-center">
                    <span className="inline-flex items-center gap-1.5 text-espresso/80">
                      <Icon name="check" className="h-4 w-4 shrink-0 text-clay-500" /> {r.mhms}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-center text-espresso/50">{r.legacy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="reveal mt-10 grid gap-3 sm:hidden">
          {comparison.rows.map((r) => (
            <div key={r.feature} className="card p-4">
              <p className="text-sm font-semibold text-espresso">{r.feature}</p>
              <div className="mt-3 grid gap-2">
                <div className="flex items-start gap-2 rounded-lg bg-clay-50 px-3 py-2">
                  <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-clay-500" />
                  <p className="text-sm text-espresso/80">
                    <span className="font-semibold text-clay-700">{comparison.columns[0]}: </span>{r.mhms}
                  </p>
                </div>
                <div className="flex items-start gap-2 px-3 py-2">
                  <span className="mt-0.5 h-4 w-4 shrink-0 text-center text-espresso/30">·</span>
                  <p className="text-sm text-espresso/50">
                    <span className="font-semibold">{comparison.columns[1]}: </span>{r.legacy}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
