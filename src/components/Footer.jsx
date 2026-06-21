import { useState } from 'react'
import { Link } from 'react-router-dom'
import { footer, brand, config } from '../content'
import AnchorLink from './AnchorLink'
import Logo from './Logo'
import Icon from './Icon'
import { track } from '../lib/analytics'

/** Footer (PRD 5.14): logo + tagline, link columns, socials, newsletter, click-to-call, copyright. */
export default function Footer() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  const onNewsletter = (e) => {
    e.preventDefault()
    // TODO: wire newsletter signup to a real endpoint (PRD 7.1 — same pattern as demo form).
    // eslint-disable-next-line no-console
    console.log('[newsletter] signup (placeholder, not yet wired):', email)
    track('newsletter_signup')
    setDone(true)
  }

  const renderLink = (l) =>
    l.href.startsWith('/') ? (
      <Link to={l.href} className="text-sm text-cream/70 transition-colors hover:text-cream">
        {l.label}
      </Link>
    ) : (
      <AnchorLink href={l.href} className="text-sm text-cream/70 transition-colors hover:text-cream">
        {l.label}
      </AnchorLink>
    )

  return (
    <footer className="bg-espresso text-cream">
      <div className="container-mhms py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          {/* Brand + newsletter + contact */}
          <div>
            <span className="inline-flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-clay-500 font-display text-base font-bold text-white">
                M
              </span>
              <span className="font-display text-xl font-bold tracking-tight text-cream">{brand.name}</span>
            </span>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/70">{footer.tagline}</p>

            {/* Click-to-call / WhatsApp (PRD 7.9) */}
            <div className="mt-6 space-y-2 text-sm">
              <a href={`tel:${config.salesPhone.replace(/\s/g, '')}`} className="flex items-center gap-2 text-cream/80 hover:text-cream">
                <Icon name="mobile" className="h-4 w-4" /> {config.salesPhone}
              </a>
              <a
                href={`https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(config.whatsappPrefill)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-cream/80 hover:text-cream"
              >
                <Icon name="whatsapp" className="h-4 w-4" /> WhatsApp us
              </a>
              <a href={`mailto:${config.salesEmail}`} className="flex items-center gap-2 text-cream/80 hover:text-cream">
                <Icon name="chat" className="h-4 w-4" /> {config.salesEmail}
              </a>
            </div>

            {/* Newsletter (PRD 5.14, optional) */}
            <form onSubmit={onNewsletter} className="mt-6 max-w-xs">
              <label htmlFor="nl-email" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-cream/60">
                Get product updates
              </label>
              {done ? (
                <p className="text-sm text-clay-200">Thanks — you’re subscribed. (Placeholder — wire to a real list.)</p>
              ) : (
                <div className="flex gap-2">
                  <input
                    id="nl-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@hotel.com"
                    className="min-w-0 flex-1 rounded-full border border-cream/20 bg-cream/5 px-4 py-2 text-sm text-cream placeholder:text-cream/40 focus:border-clay-300 focus:outline-none"
                  />
                  <button type="submit" className="rounded-full bg-clay-500 px-4 py-2 text-sm font-semibold text-white hover:bg-clay-400">
                    Join
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Link columns */}
          {footer.columns.map((col) => (
            <div key={col.heading}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-cream/90">{col.heading}</h3>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>{renderLink(l)}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-cream/15 pt-8 sm:flex-row">
          <p className="text-xs text-cream/50">
            © {new Date().getFullYear()} {brand.fullName}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {footer.socials.map((s) => (
              <a key={s.label} href={s.href} className="text-xs text-cream/60 transition-colors hover:text-cream">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
