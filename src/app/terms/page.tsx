import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Terms of Use — CollegePune",
  description: "Terms and conditions for using CollegePune — India's AI-powered college discovery portal for Pune.",
  alternates: { canonical: "https://collegepune.com/terms" },
  robots: { index: true, follow: true },
}

export default function TermsPage() {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: [
        "By accessing or using CollegePune (collegepune.com), you agree to be bound by these Terms of Use and our Privacy Policy.",
        "If you do not agree to these terms, please do not use our website.",
        "These terms apply to all visitors, students, parents, and counsellors who access the site.",
      ],
    },
    {
      title: "2. Use of the Platform",
      content: [
        "CollegePune is an information and lead-generation portal for college education in Pune, India. It is intended for personal, non-commercial use by students and parents.",
        "You may not use the platform to collect, scrape, or harvest data about colleges or students in bulk.",
        "You may not attempt to gain unauthorised access to any part of our systems or databases.",
        "You must not submit false, misleading, or fraudulent information in any enquiry or lead form.",
      ],
    },
    {
      title: "3. Accuracy of Information",
      content: [
        "CollegePune strives to provide accurate, up-to-date information about colleges, fees, placements, and admission processes. However, we cannot guarantee absolute accuracy.",
        "College fees, cutoffs, and placements change annually. Always verify current information directly with the respective college or official sources.",
        "NAAC grades and NIRF rankings are sourced from official government publications. We update these periodically.",
        "CollegePune is not liable for any decisions made based on the information published on this site.",
      ],
    },
    {
      title: "4. AI-Powered Features",
      content: [
        "Our AI College Finder and comparison tools are powered by Anthropic's Claude AI and our proprietary matching algorithms.",
        "AI-generated recommendations are based on the information you provide and our database — they are suggestions, not guarantees of admission.",
        "You should verify all AI-generated information with official college sources before making any admission decisions.",
      ],
    },
    {
      title: "5. Lead Forms and Counselling",
      content: [
        "When you submit a lead form or enquiry, you consent to being contacted by our counsellors and partner colleges regarding your enquiry.",
        "You may opt out of further communication at any time by emailing support@collegepune.com.",
        "Our counselling services are provided free of charge to students. We are compensated by partner colleges for referrals, which does not affect the advice we provide.",
      ],
    },
    {
      title: "6. Intellectual Property",
      content: [
        "All content on CollegePune — including text, design, graphics, logos, and code — is the property of CollegePune and is protected by applicable Indian intellectual property laws.",
        "You may not copy, reproduce, or distribute any content from this site without express written permission.",
        "College logos and names are the trademarks of their respective institutions and are used for identification purposes only.",
      ],
    },
    {
      title: "7. Third-Party Links",
      content: [
        "CollegePune contains links to college websites and third-party resources. We are not responsible for the content, privacy practices, or accuracy of those external sites.",
        "Inclusion of a link does not imply endorsement of the linked site.",
      ],
    },
    {
      title: "8. Limitation of Liability",
      content: [
        "CollegePune is provided 'as is' without warranties of any kind, express or implied.",
        "We are not liable for any direct, indirect, incidental, or consequential damages arising from your use of the platform.",
        "Our total liability to any user shall not exceed ₹1,000 in any circumstances.",
        "We are not liable for admission outcomes, whether or not guided by our platform.",
      ],
    },
    {
      title: "9. Governing Law",
      content: [
        "These Terms of Use are governed by the laws of India.",
        "Any disputes arising out of your use of CollegePune shall be subject to the exclusive jurisdiction of the courts of Pune, Maharashtra.",
      ],
    },
    {
      title: "10. Changes to Terms",
      content: [
        "We reserve the right to modify these terms at any time. Significant changes will be communicated on our homepage.",
        "Your continued use of CollegePune after changes take effect constitutes your acceptance of the revised terms.",
        "These terms were last updated: May 2026.",
      ],
    },
    {
      title: "11. Contact",
      content: [
        "For questions about these Terms of Use: Email: support@collegepune.com | Phone: +91 77538 31118 | Address: Undri, Pune, Maharashtra 411060.",
      ],
    },
  ]

  return (
    <div className="bg-surface min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#0A1628] to-[#1E3A5F] py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <nav className="text-xs text-blue-300 mb-3 flex items-center gap-1">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>›</span>
            <span className="text-white">Terms of Use</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">Terms of Use</h1>
          <p className="text-blue-200 text-sm">
            Effective date: May 2026 · Last updated: May 2026
          </p>
          <p className="text-blue-200 text-sm mt-2">
            Please read these terms carefully before using CollegePune.
            By accessing collegepune.com, you agree to these terms.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="space-y-6">
          {sections.map((s) => (
            <div key={s.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">
              <h2 className="text-base font-bold text-gray-900 mb-3">{s.title}</h2>
              <ul className="space-y-2">
                {s.content.map((item, i) => (
                  <li key={i} className="text-sm text-gray-600 leading-relaxed flex items-start gap-2">
                    <span className="text-orange-400 mt-1.5 shrink-0 text-xs">●</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 p-5 rounded-2xl text-center" style={{ background: "linear-gradient(135deg,#0A1628,#1E3A5F)" }}>
          <p className="text-white font-bold mb-1">Questions about these terms?</p>
          <p className="text-blue-200 text-sm mb-3">Our team is happy to clarify anything.</p>
          <a
            href="mailto:support@collegepune.com"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors"
          >
            Contact Us
          </a>
        </div>

        <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-500">
          <Link href="/" className="hover:text-orange-600 transition-colors">← Back to Home</Link>
          <Link href="/privacy" className="hover:text-orange-600 transition-colors">Privacy Policy →</Link>
        </div>
      </div>
    </div>
  )
}
