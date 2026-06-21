import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'
import { brand } from '../content'

/**
 * Shared shell for legal routes (PRD 7.13).
 * Renders the mandatory "placeholder — needs legal review" banner + structured sections.
 * Section bodies intentionally contain NO invented binding legal language.
 */
export default function LegalPage({ title, intro, sections }) {
  useEffect(() => {
    document.title = `${title} — ${brand.name}`
    window.scrollTo(0, 0)
  }, [title])

  return (
    <div className="min-h-screen bg-cream">
      <header className="border-b border-espresso/10">
        <div className="container-mhms flex items-center justify-between py-4">
          <Link to="/" aria-label="Back to home"><Logo /></Link>
          <Link to="/" className="text-sm font-semibold text-clay-600 hover:text-clay-700">← Back to site</Link>
        </div>
      </header>

      <main className="container-mhms max-w-3xl py-12">
        {/* Mandatory placeholder banner (PRD 7.13) */}
        <div className="mb-8 rounded-xl2 border border-clay-300 bg-clay-50 p-4 text-sm text-clay-800">
          <strong>This is placeholder legal content.</strong> Replace with text reviewed by a qualified
          lawyer before launch. The structure below is a starting point only and does not constitute legal advice.
        </div>

        <h1 className="font-display text-4xl font-bold text-espresso">{title}</h1>
        <p className="mt-2 text-sm text-espresso/50">Last updated: [date placeholder]</p>
        <p className="mt-6 leading-relaxed text-espresso/70">{intro}</p>

        <div className="mt-10 space-y-8">
          {sections.map((s) => (
            <section key={s.heading}>
              <h2 className="font-display text-xl font-semibold text-espresso">{s.heading}</h2>
              <p className="mt-2 leading-relaxed text-espresso/65">{s.body}</p>
            </section>
          ))}
        </div>

        <p className="mt-12 text-sm text-espresso/50">
          Questions about this document? Contact us at <span className="font-medium text-espresso/70">[legal/contact email placeholder]</span>.
        </p>
      </main>
    </div>
  )
}
