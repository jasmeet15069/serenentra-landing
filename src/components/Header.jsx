import { useEffect, useState } from 'react'
import { nav, config } from '../content'
import AnchorLink from './AnchorLink'
import Logo from './Logo'
import Icon from './Icon'

/**
 * Sticky header (PRD 5.1 / 7.2):
 * - Condenses (smaller, solid, shadow) after scrolling past the hero.
 * - Desktop nav + Login + primary CTA.
 * - Mobile hamburger -> slide-in drawer with all links + CTA.
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scroll-spy: highlight the nav link for the section currently in view.
  useEffect(() => {
    const els = nav.links
      .map((l) => document.getElementById(l.href.slice(1)))
      .filter(Boolean)
    if (!els.length) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  // Lock body scroll + Esc-to-close while the mobile drawer is open.
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-espresso/10 bg-cream/85 py-2.5 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent py-4'
      }`}
    >
      <div className="container-mhms flex items-center justify-between gap-4">
        <AnchorLink href="#main" aria-label="Serenentra home" className="shrink-0">
          <Logo />
        </AnchorLink>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {nav.links.map((l) => {
            const active = activeId === l.href.slice(1)
            return (
              <AnchorLink
                key={l.href}
                href={l.href}
                aria-current={active ? 'true' : undefined}
                className={`relative text-sm font-medium transition-colors hover:text-espresso ${
                  active ? 'text-espresso' : 'text-espresso/70'
                }`}
              >
                {l.label}
                <span
                  className={`absolute -bottom-1.5 left-0 h-0.5 rounded-full bg-clay-500 transition-all duration-300 ${
                    active ? 'w-full' : 'w-0'
                  }`}
                />
              </AnchorLink>
            )
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={nav.loginHref}
            className="text-sm font-semibold text-espresso/70 transition-colors hover:text-espresso"
          >
            Login
          </a>
          <AnchorLink href={nav.ctaHref} className="btn-primary" analytics="cta_header" data-analytics="cta_header">
            {nav.ctaLabel}
          </AnchorLink>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-lg text-espresso lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 lg:hidden ${open ? '' : 'pointer-events-none'}`}
        aria-hidden={!open}
      >
        <div
          className={`absolute inset-0 bg-espresso/40 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col gap-2 bg-cream p-6 shadow-lift transition-transform duration-300 ${
            open ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="mb-4 flex items-center justify-between">
            <Logo />
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-lg text-espresso"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-col" aria-label="Mobile">
            {nav.links.map((l) => (
              <AnchorLink
                key={l.href}
                href={l.href}
                onNavigate={() => setOpen(false)}
                className="border-b border-espresso/10 py-3.5 text-lg font-medium text-espresso"
              >
                {l.label}
              </AnchorLink>
            ))}
          </nav>

          <div className="mt-auto flex flex-col gap-3 pt-6">
            <a href={`tel:${config.salesPhone.replace(/\s/g, '')}`} className="btn-ghost w-full">
              <Icon name="mobile" className="h-4 w-4" /> Call sales
            </a>
            <AnchorLink
              href={nav.ctaHref}
              onNavigate={() => setOpen(false)}
              className="btn-primary w-full"
              data-analytics="cta_header_mobile"
            >
              {nav.ctaLabel}
            </AnchorLink>
          </div>
        </div>
      </div>
    </header>
  )
}
