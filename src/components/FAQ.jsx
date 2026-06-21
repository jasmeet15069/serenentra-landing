import { useState } from 'react'
import { faq } from '../content'
import SectionHeading from './SectionHeading'

/** FAQ accordion (PRD 5.12 / 7.4): one open at a time, animated height. */
function Item({ item, open, onToggle, id }) {
  return (
    <div className="reveal border-b border-espresso/10">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          id={`${id}-btn`}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-4 py-5 text-left"
        >
          <span className="text-base font-semibold text-espresso sm:text-lg">{item.q}</span>
          <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full bg-clay-50 text-clay-600 transition-transform duration-300 ${open ? 'rotate-45' : ''}`}>
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
          </span>
        </button>
      </h3>
      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-btn`}
        className="grid transition-all duration-300 ease-out"
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <p className="pb-5 pr-10 text-sm leading-relaxed text-espresso/65">{item.a}</p>
        </div>
      </div>
    </div>
  )
}

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(0)

  return (
    <section id="faq" className="section">
      <div className="container-mhms">
        <SectionHeading eyebrow={faq.eyebrow} title={faq.title} />
        <div className="mx-auto mt-10 max-w-3xl">
          {faq.items.map((item, i) => (
            <Item
              key={item.q}
              id={`faq-${i}`}
              item={item}
              open={openIdx === i}
              onToggle={() => setOpenIdx((cur) => (cur === i ? -1 : i))}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
