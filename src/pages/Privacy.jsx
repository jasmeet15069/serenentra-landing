import LegalPage from '../components/LegalPage'

/** Privacy Policy route (PRD 7.13) — placeholder structure, needs legal review. */
export default function Privacy() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="This Privacy Policy describes, at a high level, the kinds of information Serenentra may collect and how it may be used. [Replace this entire document with policy text prepared and reviewed by a qualified lawyer before launch.]"
      sections={[
        { heading: 'Information We Collect', body: '[Placeholder] Describe the categories of personal and business information collected — e.g. contact details submitted through forms, account data, and usage/analytics data.' },
        { heading: 'How We Use Your Information', body: '[Placeholder] Describe the purposes for processing — e.g. responding to demo requests, providing the service, support, and product communications.' },
        { heading: 'Cookies & Tracking', body: '[Placeholder] Describe cookies and similar technologies used for analytics and functionality, and how visitors can manage consent (see the cookie banner).' },
        { heading: 'Third-Party Services', body: '[Placeholder] List third-party processors (e.g. analytics, payment, hosting, CRM) and link to their respective policies.' },
        { heading: 'Data Retention & Security', body: '[Placeholder] Describe how long data is kept and the safeguards used to protect it.' },
        { heading: 'Your Rights', body: '[Placeholder] Describe the rights available to users under applicable law (e.g. access, correction, deletion) and how to exercise them.' },
        { heading: 'Contact', body: '[Placeholder] Provide the contact details of the data controller / privacy contact.' },
      ]}
    />
  )
}
