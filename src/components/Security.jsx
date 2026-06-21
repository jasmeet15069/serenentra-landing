import { security } from '../content'
import SectionHeading from './SectionHeading'
import Icon from './Icon'

const ICONS = ['clock', 'card', 'shield', 'chat']

/** Security & reliability (PRD 5.9) — claims are placeholders, confirm before launch. */
export default function Security() {
  return (
    <section id="security" className="section bg-espresso text-cream">
      <div className="container-mhms">
        <div className="reveal max-w-3xl">
          <p className="eyebrow mb-3 text-clay-300">{security.eyebrow}</p>
          <h2 className="text-3xl font-semibold leading-[1.1] sm:text-4xl lg:text-[2.75rem]">{security.title}</h2>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {security.items.map((it, i) => (
            <div
              key={it.title}
              className="reveal rounded-xl2 border border-cream/10 bg-cream/[0.04] p-6"
              style={{ transitionDelay: `${(i % 4) * 60}ms` }}
            >
              <span className="mb-4 inline-grid h-11 w-11 place-items-center rounded-xl bg-clay-500/20 text-clay-300">
                <Icon name={ICONS[i % ICONS.length]} className="h-5 w-5" />
              </span>
              <h3 className="font-semibold text-cream">{it.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-cream/60">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
