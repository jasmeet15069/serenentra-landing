/** Consistent eyebrow + title + optional intro used across sections (PRD 6 type hierarchy). */
export default function SectionHeading({ eyebrow, title, intro, align = 'center', className = '' }) {
  const alignCls = align === 'left' ? 'text-left' : 'text-center mx-auto'
  return (
    <div className={`reveal ${align === 'left' ? '' : 'max-w-3xl'} ${alignCls} ${className}`}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="text-3xl font-semibold leading-[1.1] text-espresso sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {intro && <p className="mt-4 text-lg leading-relaxed text-espresso/70">{intro}</p>}
    </div>
  )
}
