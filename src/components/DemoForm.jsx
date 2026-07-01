import { useState } from 'react'
import { demo, config } from '../content'
import Icon from './Icon'
import { track } from '../lib/analytics'

/**
 * Lead capture / demo request form (PRD 5.13 / 7.1).
 * - Client-side validation with inline errors.
 * - On submit: success state replaces the form.
 *
 * ⚠️ NOT LAUNCH-READY UNTIL WIRED (PRD 7.7 / acceptance criteria):
 *   Submissions currently only log to the console. Before going live, POST to a real
 *   endpoint (Formspree / Web3Forms / serverless fn) that forwards leads to a sales
 *   inbox / Slack / WhatsApp / CRM — a live site must not silently lose leads.
 */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const API_URL = 'https://hmsadmin.serenentra.com/api/demo-request'

const empty = { name: '', email: '', phone: '', property: '', rooms: '', country: '', message: '' }

export default function DemoForm() {
  const [values, setValues] = useState(empty)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [serverError, setServerError] = useState('')

  const update = (k) => (e) => setValues((v) => ({ ...v, [k]: e.target.value }))

  const validate = () => {
    const next = {}
    if (!values.name.trim()) next.name = 'Please enter your name.'
    if (!values.email.trim()) next.email = 'Please enter your work email.'
    else if (!EMAIL_RE.test(values.email)) next.email = 'Please enter a valid email address.'
    if (!values.property.trim()) next.property = 'Please enter your property name.'
    if (!values.rooms) next.rooms = 'Please select a size.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    setServerError('')
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      if (!res.ok) throw new Error('server error')
      track('demo_form_submit', { rooms: values.rooms })
      setSubmitted(true)
    } catch {
      setServerError('Something went wrong — please email us at ' + config.salesEmail)
    } finally {
      setSubmitting(false)
    }
  }

  const field = (id, label, opts = {}) => {
    const { type = 'text', required, ...rest } = opts
    return (
      <div className={opts.full ? 'sm:col-span-2' : ''}>
        <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-espresso">
          {label} {required && <span className="text-clay-500">*</span>}
          {!required && <span className="font-normal text-espresso/40"> (optional)</span>}
        </label>
        <input
          id={id}
          type={type}
          value={values[id]}
          onChange={update(id)}
          aria-invalid={!!errors[id]}
          aria-describedby={errors[id] ? `${id}-err` : undefined}
          className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-espresso outline-none transition-colors placeholder:text-espresso/35 ${
            errors[id] ? 'border-red-400 focus:border-red-500' : 'border-espresso/15 focus:border-clay-500'
          }`}
          {...rest}
        />
        {errors[id] && (
          <p id={`${id}-err`} className="mt-1 text-xs text-red-500">{errors[id]}</p>
        )}
      </div>
    )
  }

  return (
    <section id="demo" className="section bg-gradient-to-b from-clay-500 to-clay-600 text-white">
      <div className="container-mhms grid items-center gap-12 lg:grid-cols-2">
        {/* Pitch */}
        <div className="reveal">
          <p className="eyebrow mb-3 text-clay-100">{demo.eyebrow}</p>
          <h2 className="font-display text-3xl font-semibold leading-[1.1] sm:text-4xl lg:text-[2.75rem]">{demo.title}</h2>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-white/85">{demo.subtitle}</p>

          <div className="mt-8 space-y-3 text-sm">
            <p className="font-semibold text-white/90">{demo.contactNote}</p>
            <a href={`tel:${config.salesPhone.replace(/\s/g, '')}`} className="flex items-center gap-2 text-white/90 hover:text-white">
              <Icon name="mobile" className="h-4 w-4" /> {config.salesPhone}
            </a>
            <a href={`mailto:${config.salesEmail}`} className="flex items-center gap-2 text-white/90 hover:text-white">
              <Icon name="chat" className="h-4 w-4" /> {config.salesEmail}
            </a>
            <a
              href={`https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(config.whatsappPrefill)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/90 hover:text-white"
            >
              <Icon name="whatsapp" className="h-4 w-4" /> WhatsApp us
            </a>
          </div>
        </div>

        {/* Form / success */}
        <div className="reveal rounded-xl2 bg-cream p-6 text-espresso shadow-lift sm:p-8">
          {submitted ? (
            <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-clay-100 text-clay-600">
                <Icon name="check" className="h-8 w-8" strokeWidth={2} />
              </span>
              <h3 className="mt-5 font-display text-2xl font-semibold">{demo.successMessage}</h3>
              <p className="mt-2 text-sm text-espresso/60">
                We've received your details and our team will be in touch within 1 business day.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate>
              <div className="grid gap-4 sm:grid-cols-2">
                {field('name', 'Full name', { required: true, autoComplete: 'name' })}
                {field('email', 'Work email', { required: true, type: 'email', autoComplete: 'email' })}
                {field('phone', 'Phone', { type: 'tel', autoComplete: 'tel' })}
                {field('property', 'Hotel / property name', { required: true })}

                <div>
                  <label htmlFor="rooms" className="mb-1.5 block text-sm font-semibold text-espresso">
                    Rooms / properties <span className="text-clay-500">*</span>
                  </label>
                  <select
                    id="rooms"
                    value={values.rooms}
                    onChange={update('rooms')}
                    aria-invalid={!!errors.rooms}
                    className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-espresso outline-none transition-colors ${
                      errors.rooms ? 'border-red-400' : 'border-espresso/15 focus:border-clay-500'
                    }`}
                  >
                    <option value="">Select…</option>
                    {demo.roomOptions.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                  {errors.rooms && <p className="mt-1 text-xs text-red-500">{errors.rooms}</p>}
                </div>

                {field('country', 'Country', { autoComplete: 'country-name' })}

                <div className="sm:col-span-2">
                  <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-espresso">
                    Message / notes <span className="font-normal text-espresso/40">(optional)</span>
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    value={values.message}
                    onChange={update('message')}
                    className="w-full rounded-xl border border-espresso/15 bg-white px-4 py-3 text-sm text-espresso outline-none transition-colors placeholder:text-espresso/35 focus:border-clay-500"
                    placeholder="Tell us a little about your property…"
                  />
                </div>
              </div>

              {serverError && (
                <p className="mt-3 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">{serverError}</p>
              )}
              <button type="submit" disabled={submitting} className="btn-primary mt-5 w-full text-base disabled:opacity-60" data-analytics="cta_demo_submit">
                {submitting ? 'Sending...' : 'Request a Demo'}
                {!submitting && <Icon name="arrow" className="h-4 w-4" />}
              </button>
              <p className="mt-3 text-center text-xs text-espresso/45">
                We'll reply within 1 business day. No spam, ever.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
