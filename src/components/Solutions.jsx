import { useState } from 'react'
import { solutions } from '../content'
import SectionHeading from './SectionHeading'
import Icon from './Icon'

/** Solutions by property type — tabbed (PRD 5.7). */
export default function Solutions() {
  const [active, setActive] = useState(solutions[0].key)
  const current = solutions.find((s) => s.key === active) ?? solutions[0]

  return (
    <section id="solutions" className="section bg-sand/40">
      <div className="container-mhms">
        <SectionHeading
          eyebrow="Solutions"
          title="Built for how your kind of property runs."
          intro="From a single B&B to a multi-property group, MHMS adapts to the way you operate."
        />

        {/* Tabs */}
        <div className="reveal mt-12 flex flex-wrap justify-center gap-2" role="tablist" aria-label="Property types">
          {solutions.map((s) => (
            <button
              key={s.key}
              role="tab"
              aria-selected={s.key === active}
              onClick={() => setActive(s.key)}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                s.key === active
                  ? 'bg-clay-500 text-white shadow-soft'
                  : 'border border-espresso/15 bg-white text-espresso/70 hover:border-espresso/35'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Panel */}
        <div className="reveal mx-auto mt-8 max-w-3xl">
          <div className="card p-8 sm:p-10" role="tabpanel">
            <h3 className="font-display text-2xl font-semibold text-espresso">{current.label}</h3>
            <p className="mt-3 text-lg leading-relaxed text-espresso/70">{current.body}</p>
            <ul className="mt-6 flex flex-wrap gap-3">
              {current.highlights.map((h) => (
                <li key={h} className="inline-flex items-center gap-2 rounded-full bg-clay-50 px-4 py-2 text-sm font-medium text-clay-700">
                  <Icon name="check" className="h-4 w-4" /> {h}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
