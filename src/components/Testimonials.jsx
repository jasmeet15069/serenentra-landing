import { useState } from 'react'
import { testimonials } from '../content'
import SectionHeading from './SectionHeading'

/** Testimonials carousel (PRD 5.10) — ALL PLACEHOLDER quotes, not real customers. */
export default function Testimonials() {
  const items = testimonials.items
  const [idx, setIdx] = useState(0)
  const go = (d) => setIdx((i) => (i + d + items.length) % items.length)

  return (
    <section id="customers" className="section">
      <div className="container-mhms">
        <SectionHeading eyebrow={testimonials.eyebrow} title={testimonials.title} />

        <div className="reveal mx-auto mt-12 max-w-3xl">
          <figure className="card relative p-8 text-center sm:p-12">
            <span className="mb-4 inline-block rounded-full bg-clay-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-clay-600">
              Placeholder — replace before launch
            </span>
            <div className="mb-4 flex justify-center gap-1 text-clay-500" aria-label={`${items[idx].rating} out of 5`}>
              {[...Array(items[idx].rating)].map((_, i) => (
                <svg key={i} viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                  <path d="M12 2l2.9 6.3 6.9.7-5.2 4.6 1.5 6.8L12 17.8 5.9 20.4l1.5-6.8L2.2 9l6.9-.7L12 2z" />
                </svg>
              ))}
            </div>
            <blockquote className="font-display text-xl leading-relaxed text-espresso sm:text-2xl">
              “{items[idx].quote}”
            </blockquote>
            <figcaption className="mt-6 text-sm text-espresso/60">
              <span className="font-semibold text-espresso">{items[idx].name}</span> — {items[idx].role}, {items[idx].property}
            </figcaption>
          </figure>

          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => go(-1)}
              className="grid h-10 w-10 place-items-center rounded-full border border-espresso/15 text-espresso/70 hover:border-espresso/40"
              aria-label="Previous testimonial"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <div className="flex gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${i === idx ? 'w-6 bg-clay-500' : 'w-2 bg-espresso/20'}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => go(1)}
              className="grid h-10 w-10 place-items-center rounded-full border border-espresso/15 text-espresso/70 hover:border-espresso/40"
              aria-label="Next testimonial"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
