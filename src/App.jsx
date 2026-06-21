import { Suspense, lazy } from 'react'
import { SmoothScroll } from './lib/SmoothScroll'
import { useReveal } from './lib/useReveal'
import Header from './components/Header'
import Hero from './components/Hero'
import LogoBar from './components/LogoBar'
import Platform from './components/Platform'
import Features from './components/Features'
import Benefits from './components/Benefits'
import Solutions from './components/Solutions'
import Integrations from './components/Integrations'
import Security from './components/Security'
import Testimonials from './components/Testimonials'
import Pricing from './components/Pricing'
import Infrastructure from './components/Infrastructure'
import Comparison from './components/Comparison'
import FAQ from './components/FAQ'
import DemoForm from './components/DemoForm'
import Footer from './components/Footer'
import FloatingActions from './components/FloatingActions'
import CookieConsent from './components/CookieConsent'
import ScrollProgress from './components/ScrollProgress'
import { config } from './content'

// Video modal is below the fold + only opened on demand — lazy load it.
const VideoModalMount = lazy(() => import('./components/VideoModalMount'))

export default function App() {
  // Run scroll-reveal once everything is mounted.
  useReveal([])

  return (
    <SmoothScroll>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-clay-500 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      <ScrollProgress />
      <Header />

      <main id="main">
        <Hero />
        {config.showLogoBar && <LogoBar />}
        <Platform />
        <Features />
        <Benefits />
        <Solutions />
        <Integrations />
        <Security />
        <Testimonials />
        <Pricing />
        <Infrastructure />
        {config.showCompetitorComparison && <Comparison />}
        <FAQ />
        <DemoForm />
      </main>

      <Footer />

      {/* Persistent / overlay UI (PRD 5.14) */}
      <FloatingActions />
      <CookieConsent />
      {config.hasDemoVideo && (
        <Suspense fallback={null}>
          <VideoModalMount />
        </Suspense>
      )}
    </SmoothScroll>
  )
}
