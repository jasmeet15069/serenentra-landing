import { hero, config } from '../content'
import AnchorLink from './AnchorLink'
import Hero3D from './Hero3D'
import Icon from './Icon'
import Counter from './Counter'
import { openVideoModal } from '../lib/events'
import { track } from '../lib/analytics'

/** Hero (PRD 5.2): eyebrow, H1, subtitle, dual CTA, trust strip, 3D centerpiece. */
export default function Hero() {
  const onWatch = (e) => {
    e.preventDefault()
    track('cta_hero_video')
    openVideoModal()
  }

  return (
    <section className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36">
      {/* soft background wash */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-40 top-0 h-[520px] w-[520px] rounded-full bg-clay-100/60 blur-3xl" />
        <div className="absolute -left-40 top-40 h-[420px] w-[420px] rounded-full bg-sand/70 blur-3xl" />
      </div>

      <div className="container-mhms grid items-center gap-10 pb-16 lg:grid-cols-2 lg:gap-8 lg:pb-24">
        {/* Copy */}
        <div className="reveal max-w-xl">
          <p className="eyebrow mb-4">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-clay-500" />
            {hero.eyebrow}
          </p>
          <h1 className="font-display text-4xl font-semibold leading-[1.05] text-espresso sm:text-5xl lg:text-6xl">
            {hero.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-espresso/70">{hero.subtitle}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <AnchorLink href={hero.primaryCta.href} className="btn-primary w-full text-base sm:w-auto" data-analytics="cta_hero" analytics="cta_hero">
              {hero.primaryCta.label}
              <Icon name="arrow" className="h-4 w-4" />
            </AnchorLink>

            {config.hasDemoVideo ? (
              <button type="button" onClick={onWatch} className="btn-ghost w-full text-base sm:w-auto" data-analytics="cta_hero_video">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-clay-500 text-white">
                  <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
                {hero.secondaryCta.label}
              </button>
            ) : (
              <AnchorLink href="#pricing" className="btn-ghost w-full text-base sm:w-auto">
                See pricing
              </AnchorLink>
            )}
          </div>

          {/* Trust strip — PLACEHOLDER stats (PRD 5.2) */}
          <dl className="mt-10 flex flex-wrap gap-x-8 gap-y-4 border-t border-espresso/10 pt-6">
            {hero.trustStats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <Counter value={s.value} className="block font-display text-2xl font-bold text-espresso" />
                  <span className="text-xs text-espresso/55">{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* 3D centerpiece (with static fallback).
            On mobile it sits above the headline (order-first) and is a compact 4:3;
            on desktop it returns to the right-hand column as a square. */}
        <div className="reveal relative order-first mx-auto aspect-[4/3] w-full max-w-[440px] sm:max-w-[520px] lg:order-none lg:aspect-square">
          <Hero3D />
        </div>
      </div>
    </section>
  )
}
