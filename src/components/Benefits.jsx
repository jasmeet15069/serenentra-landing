import { benefits } from '../content'
import SectionHeading from './SectionHeading'

/** Benefits / "Why MHMS" — outcome-framed stat blocks (PRD 5.6). Stats are placeholders. */
export default function Benefits() {
  return (
    <section className="section">
      <div className="container-mhms">
        <SectionHeading eyebrow={benefits.eyebrow} title={benefits.title} />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.items.map((b, i) => (
            <div
              key={b.title}
              className="reveal rounded-xl2 border border-espresso/[0.07] bg-gradient-to-b from-white to-clay-50/40 p-6"
              style={{ transitionDelay: `${(i % 4) * 60}ms` }}
            >
              <p className="font-display text-4xl font-bold text-clay-500">{b.stat}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-espresso/45">
                {b.statLabel} <span className="normal-case text-espresso/30">(placeholder)</span>
              </p>
              <h3 className="mt-4 text-base font-semibold text-espresso">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-espresso/65">{b.desc}</p>
            </div>
          ))}
        </div>

        <p className="reveal mt-6 text-center text-xs text-espresso/40">
          {/* PRD 5.6 / 9 — do not ship invented stats. */}
          Figures shown are placeholders — replace with real, verifiable numbers before launch.
        </p>
      </div>
    </section>
  )
}
