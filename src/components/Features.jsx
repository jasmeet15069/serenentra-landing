import { features } from '../content'
import SectionHeading from './SectionHeading'
import Icon from './Icon'

/** Core modules / features grid (PRD 5.5). */
export default function Features() {
  return (
    <section id="features" className="section bg-sand/40">
      <div className="container-mhms">
        <SectionHeading
          eyebrow="Features"
          title="One platform, every part of your property."
          intro="Each module works on its own and together — so the data flows through your whole operation without re-keying."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <article
              key={f.title}
              className="reveal group card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
              style={{ transitionDelay: `${(i % 3) * 60}ms` }}
            >
              <span className="mb-4 inline-grid h-12 w-12 place-items-center rounded-xl bg-clay-50 text-clay-600 transition-colors group-hover:bg-clay-500 group-hover:text-white">
                <Icon name={f.icon} className="h-6 w-6" />
              </span>
              <h3 className="text-lg font-semibold text-espresso">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-espresso/65">{f.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
