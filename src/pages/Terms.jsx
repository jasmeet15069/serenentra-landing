import LegalPage from '../components/LegalPage'

/** Terms of Service route (PRD 7.13) — placeholder structure, needs legal review. */
export default function Terms() {
  return (
    <LegalPage
      title="Terms of Service"
      intro="These Terms of Service govern the use of the MHMS website and services. [Replace this entire document with terms prepared and reviewed by a qualified lawyer before launch.]"
      sections={[
        { heading: 'Acceptance of Terms', body: '[Placeholder] State that by accessing or using the site/service the user agrees to these terms.' },
        { heading: 'Service Description', body: '[Placeholder] Describe what MHMS provides and any eligibility or account requirements.' },
        { heading: 'Acceptable Use', body: '[Placeholder] Describe prohibited conduct and the user’s responsibilities when using the service.' },
        { heading: 'Fees & Billing', body: '[Placeholder] Describe pricing, billing cycles, renewals and refunds where applicable.' },
        { heading: 'Intellectual Property', body: '[Placeholder] Describe ownership of the platform, content and trademarks.' },
        { heading: 'Disclaimers & Limitation of Liability', body: '[Placeholder] Standard disclaimers and limitation-of-liability language — to be drafted by a lawyer.' },
        { heading: 'Termination', body: '[Placeholder] Describe how either party may terminate and the effects of termination.' },
        { heading: 'Governing Law', body: '[Placeholder] Specify the governing jurisdiction (e.g. India) and dispute-resolution approach.' },
        { heading: 'Contact', body: '[Placeholder] Provide contact details for questions about these terms.' },
      ]}
    />
  )
}
