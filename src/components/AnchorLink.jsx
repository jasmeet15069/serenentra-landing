import { useSmoothScroll } from '../lib/SmoothScroll'
import { track } from '../lib/analytics'

/**
 * Link that smooth-scrolls in-page anchors via Lenis (PRD 6A.3 / 7.2).
 * Non-anchor hrefs (routes like /privacy, tel:, mailto:, http) fall through to a normal <a>.
 */
export default function AnchorLink({ href, children, className, onNavigate, analytics, ...rest }) {
  const { scrollTo } = useSmoothScroll()
  const isAnchor = href && href.startsWith('#') && href.length > 1

  const handleClick = (e) => {
    if (analytics) track(analytics)
    if (!isAnchor) return // let routes / external / tel / mailto behave normally
    e.preventDefault()
    scrollTo(href)
    // Keep the URL hash in sync without triggering a native jump.
    if (history.pushState) history.pushState(null, '', href)
    onNavigate?.()
  }

  return (
    <a href={href} className={className} onClick={handleClick} {...rest}>
      {children}
    </a>
  )
}
