import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../components/Logo'
import Icon from '../components/Icon'
import { brand } from '../content'

/**
 * Catch-all 404 (fixes a live bug: any unmatched path previously rendered a
 * completely blank page — <Routes> had no wildcard, so unknown URLs matched
 * nothing while the SPA rewrite still served index.html with HTTP 200).
 * Styled to match LegalPage's shell so it reads as part of the site, not an error dump.
 */
export default function NotFound() {
  useEffect(() => {
    document.title = `Page not found — ${brand.name}`
  }, [])

  return (
    <div className="min-h-screen bg-cream">
      <header className="border-b border-espresso/10">
        <div className="container-mhms flex items-center justify-between py-4">
          <Link to="/" aria-label="Back to home"><Logo /></Link>
          <Link to="/" className="text-sm font-semibold text-clay-600 hover:text-clay-700">← Back to site</Link>
        </div>
      </header>

      <main className="container-mhms flex min-h-[70vh] max-w-3xl flex-col items-center justify-center py-16 text-center">
        <p className="font-display text-7xl font-bold text-clay-500">404</p>
        <h1 className="mt-4 font-display text-3xl font-bold text-espresso">Page not found</h1>
        <p className="mt-3 max-w-md leading-relaxed text-espresso/60">
          The page you're looking for doesn't exist or may have moved. Let's get you back on track.
        </p>
        <Link to="/" className="btn-primary mt-8">
          Back to homepage <Icon name="arrow" className="h-4 w-4" />
        </Link>
      </main>
    </div>
  )
}
