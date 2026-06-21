import { integrations } from '../content'
import SectionHeading from './SectionHeading'
import AnchorLink from './AnchorLink'
import Icon from './Icon'

/** Integrations / ecosystem (PRD 5.8). */
export default function Integrations() {
  return (
    <section id="integrations" className="section">
      <div className="container-mhms">
        <SectionHeading eyebrow={integrations.eyebrow} title={integrations.title} intro={integrations.body} />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {integrations.categories.map((c, i) => (
            <div
              key={c.name}
              className="reveal flex items-start gap-4 rounded-xl2 border border-espresso/[0.07] bg-white p-5"
              style={{ transitionDelay: `${(i % 3) * 60}ms` }}
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-sand text-clay-600">
                <Icon name="sync" className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-semibold text-espresso">{c.name}</h3>
                <p className="mt-1 text-sm text-espresso/55">{c.examples}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="reveal mt-10 text-center">
          <AnchorLink href={integrations.ctaHref} className="btn-ghost">
            {integrations.ctaLabel}
            <Icon name="arrow" className="h-4 w-4" />
          </AnchorLink>
        </div>
      </div>
    </section>
  )
}
