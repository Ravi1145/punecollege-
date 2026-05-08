import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Privacy Policy — CollegePune",
  description: "CollegePune Privacy Policy — how we collect, use, and protect your personal information on collegepune.com.",
  alternates: { canonical: "https://collegepune.com/privacy" },
  robots: { index: true, follow: true },
}

export default function PrivacyPage() {
  const sections = [
    {
      title: "1. Information We Collect",
      content: [
        "**Contact information**: When you submit an enquiry or lead form (name, phone number, email address, city, course preference) we store this data in our secure database to connect you with college counsellors.",
        "**Usage data**: We collect anonymised data on pages viewed, search queries, and features used to improve the portal. This data does not identify you personally.",
        "**Device information**: Browser type, operating system, screen size, and IP address for security and performance monitoring.",
        "**Cookies**: We use first-party cookies for session management and analytics. You may decline non-essential cookies at any time.",
      ],
    },
    {
      title: "2. How We Use Your Information",
      content: [
        "To connect you with our admission counsellors and partner colleges you have expressed interest in.",
        "To send you relevant information about colleges, admission deadlines, and scholarships (you may opt out at any time).",
        "To improve our AI-powered college matching and search features.",
        "To comply with applicable Indian laws including the Information Technology Act, 2000.",
      ],
    },
    {
      title: "3. Sharing Your Information",
      content: [
        "We share your contact details with partner colleges and authorised admission counsellors only when you explicitly submit an enquiry or lead form for a specific college.",
        "We do not sell or rent your personal data to third parties.",
        "We may share anonymised, aggregated data (not personally identifiable) for research and analytics.",
        "We may disclose data if required by law, court order, or government authority.",
      ],
    },
    {
      title: "4. Data Storage and Security",
      content: [
        "Your data is stored on Supabase (PostgreSQL) servers hosted in secure cloud environments with industry-standard encryption.",
        "We implement appropriate technical and organisational measures to protect personal data from unauthorised access, alteration, disclosure, or destruction.",
        "We retain lead and enquiry data for a maximum of 3 years unless otherwise required by law.",
      ],
    },
    {
      title: "5. Your Rights",
      content: [
        "**Access**: You may request a copy of the personal data we hold about you.",
        "**Correction**: You may request correction of inaccurate data.",
        "**Deletion**: You may request deletion of your personal data subject to legal retention requirements.",
        "**Opt-out**: You may unsubscribe from marketing communications at any time by contacting us.",
        "To exercise any of these rights, email us at: support@collegepune.com",
      ],
    },
    {
      title: "6. Cookies",
      content: [
        "CollegePune uses cookies to remember your preferences, understand how you use the site, and deliver a personalised experience.",
        "Essential cookies (required for site functionality) cannot be disabled.",
        "Analytics cookies (Google Analytics / similar) can be declined via our cookie banner.",
        "You may also disable cookies in your browser settings, though some features may not work correctly.",
      ],
    },
    {
      title: "7. Third-Party Services",
      content: [
        "CollegePune uses the following third-party services which have their own privacy policies: Google Analytics (usage tracking), Supabase (database hosting), Anthropic Claude AI (college recommendations), Vercel (hosting).",
        "External links to college websites are provided for your convenience. We are not responsible for the privacy practices of those websites.",
      ],
    },
    {
      title: "8. Children's Privacy",
      content: [
        "CollegePune is intended for students aged 17 and above. We do not knowingly collect personal data from children under 13.",
        "If you believe a child has submitted personal data on our site, please contact us immediately at support@collegepune.com.",
      ],
    },
    {
      title: "9. Changes to This Policy",
      content: [
        "We may update this Privacy Policy from time to time. Significant changes will be communicated via a notice on our homepage.",
        "Your continued use of CollegePune after the effective date of any changes constitutes acceptance of the updated policy.",
        "This policy was last updated: May 2026.",
      ],
    },
    {
      title: "10. Contact Us",
      content: [
        "For any privacy-related questions, concerns, or requests: Email: support@collegepune.com | Phone: +91 77538 31118 | Address: Undri, Pune, Maharashtra 411060.",
      ],
    },
  ]

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#0A1628] to-[#1E3A5F] py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <nav className="text-xs text-blue-300 mb-3 flex items-center gap-1">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span className="text-white">Privacy Policy</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">Privacy Policy</h1>
          <p className="text-blue-200 text-sm">
            Effective date: May 2026 · Last updated: May 2026
          </p>
          <p className="text-blue-200 text-sm mt-2">
            CollegePune (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is committed to protecting your privacy.
            This policy explains how we collect, use, and protect your personal information when you use collegepune.com.
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
                    <span dangerouslySetInnerHTML={{
                      __html: item
                        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
                    }} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 p-5 rounded-2xl text-center" style={{ background: "linear-gradient(135deg,#0A1628,#1E3A5F)" }}>
          <p className="text-white font-bold mb-1">Questions about your data?</p>
          <p className="text-blue-200 text-sm mb-3">We&apos;re here to help with any privacy concerns.</p>
          <a
            href="mailto:support@collegepune.com"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors"
          >
            Contact Us
          </a>
        </div>

        <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-500">
          <Link href="/" className="hover:text-orange-600 transition-colors">← Back to Home</Link>
          <Link href="/terms" className="hover:text-orange-600 transition-colors">Terms of Use →</Link>
        </div>
      </div>
    </div>
  )
}
