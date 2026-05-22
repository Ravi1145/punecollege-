import { Metadata } from "next"
import Script from "next/script"
import Link from "next/link"
import { generateMetadata as genMeta, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo"
import InlineLeadForm from "@/components/leads/InlineLeadForm"
import ScholarshipSubscribe from "@/components/leads/ScholarshipSubscribe"
import ScholarshipFinder from "@/components/scholarships/ScholarshipFinder"

export const metadata: Metadata = genMeta({
  title: "Scholarships for Pune Students 2026 | MahaDBT & NSP Guide | CollegePune",
  description: "Scholarships for Pune college students 2026 — MahaDBT, NSP, EBC, OBC & merit. Eligibility, amounts, deadlines & direct application links. Get WhatsApp alerts free.",
  path: "/scholarships",
  keywords: [
    "scholarships for pune college students 2026",
    "mahadbt scholarship 2026",
    "nsp scholarship pune 2026",
    "engineering scholarship pune 2026",
    "mba scholarship pune 2026",
    "ebc scholarship maharashtra 2026",
    "obc scholarship pune 2026",
    "merit scholarship pune college",
    "government scholarship pune students",
    "scholarship for sc st students pune 2026",
    "minority scholarship pune 2026",
  ],
})

const scholarships = [
  // Government — State
  {
    name: "MahaDBT — Freeship / Tuition Fee Waiver",
    category: "EBC (Economically Backward Class)",
    amount: "Full tuition fee waiver",
    income: "< ₹8 LPA family income",
    deadline: "September 30, 2026",
    eligibility: "Maharashtra domicile; enrolled in degree course (Engg, Medical, Pharmacy, Arts, Science)",
    stream: ["Engineering", "Medical", "MBA", "Arts", "Pharmacy", "BCA", "BBA"],
    link: "https://mahadbt.maharashtra.gov.in",
    badge: "🏛️ Government",
    badgeColor: "bg-blue-50 text-blue-700",
    priority: "High",
  },
  {
    name: "MahaDBT — OBC Scholarship",
    category: "OBC / VJNT / NT / SBC",
    amount: "₹2,000–₹5,000/year + maintenance allowance",
    income: "< ₹8 LPA",
    deadline: "September 30, 2026",
    eligibility: "OBC/VJNT/NT/SBC caste certificate; Maharashtra domicile; 60%+ in previous exam",
    stream: ["Engineering", "Medical", "MBA", "Arts", "All"],
    link: "https://mahadbt.maharashtra.gov.in",
    badge: "🏛️ Government",
    badgeColor: "bg-blue-50 text-blue-700",
    priority: "High",
  },
  {
    name: "MahaDBT — SC/ST Post-Matric Scholarship",
    category: "SC / ST Students",
    amount: "Full fees + maintenance ₹550–₹1,200/month",
    income: "SC: < ₹2.5 LPA · ST: < ₹2.5 LPA",
    deadline: "November 30, 2026",
    eligibility: "SC/ST caste certificate; studying in govt-recognized college in Maharashtra",
    stream: ["All streams"],
    link: "https://mahadbt.maharashtra.gov.in",
    badge: "🏛️ Government",
    badgeColor: "bg-blue-50 text-blue-700",
    priority: "High",
  },
  // Government — Central
  {
    name: "NSP — Central Sector Scheme (CSS)",
    category: "Merit-based (All categories)",
    amount: "₹10,000/year (1st–3rd yr) · ₹20,000/year (professional courses)",
    income: "Family income < ₹4.5 LPA",
    deadline: "October 31, 2026",
    eligibility: "Scored above 80th percentile in Class 12 board; enrolled in regular college",
    stream: ["Engineering", "Medical", "Arts", "Commerce", "Science"],
    link: "https://scholarships.gov.in",
    badge: "🇮🇳 Central Govt",
    badgeColor: "bg-green-50 text-green-700",
    priority: "High",
  },
  {
    name: "NSP — Minority Scholarship (Post-Matric)",
    category: "Muslim, Sikh, Christian, Buddhist, Jain, Parsi",
    amount: "₹3,000–₹20,000/year",
    income: "Family income < ₹2 LPA",
    deadline: "October 31, 2026",
    eligibility: "Minority community certificate; 50%+ in previous exam; regular college enrollment",
    stream: ["All streams"],
    link: "https://scholarships.gov.in",
    badge: "🇮🇳 Central Govt",
    badgeColor: "bg-green-50 text-green-700",
    priority: "High",
  },
  // College / Private
  {
    name: "COEP Merit Scholarship",
    category: "Merit — Open/All",
    amount: "₹25,000–₹50,000/year",
    income: "No income limit",
    deadline: "August 31, 2026",
    eligibility: "Enrolled in COEP; top 10 rankers per branch in Sem 1 onward",
    stream: ["Engineering"],
    link: "https://coep.org.in",
    badge: "🎓 College",
    badgeColor: "bg-purple-50 text-purple-700",
    priority: "Medium",
  },
  {
    name: "Symbiosis Scholarship (SIU)",
    category: "Merit-based",
    amount: "25%–100% tuition fee waiver",
    income: "No income limit",
    deadline: "July 31, 2026",
    eligibility: "SNAP/SET/other Symbiosis entrance; top percentile rank",
    stream: ["MBA", "Engineering", "Law", "Design"],
    link: "https://www.siu.edu.in",
    badge: "🎓 College",
    badgeColor: "bg-purple-50 text-purple-700",
    priority: "Medium",
  },
  {
    name: "Aditya Birla Scholarship",
    category: "Merit — All",
    amount: "₹65,000/year (Engineering) · ₹1 LPA (MBA)",
    income: "No income limit",
    deadline: "September 30, 2026",
    eligibility: "Top 20 rank in JEE Advanced / CAT; enrolled in premier institute including MIT-WPU, VIT Pune",
    stream: ["Engineering", "MBA"],
    link: "https://www.adityabirla.com/scholarship",
    badge: "🏢 Corporate",
    badgeColor: "bg-orange-50 text-orange-700",
    priority: "Medium",
  },
  {
    name: "Inspire Scholarship (DST)",
    category: "Science students",
    amount: "₹80,000/year for 5 years",
    income: "No income limit",
    deadline: "November 30, 2026",
    eligibility: "Top 1% in Class 12 board; enrolled in BSc/BSc Hons Natural & Basic Sciences",
    stream: ["Arts (Science)"],
    link: "https://online-inspire.gov.in",
    badge: "🇮🇳 Central Govt",
    badgeColor: "bg-green-50 text-green-700",
    priority: "Medium",
  },
  {
    name: "HDFC Educational Crisis Scholarship",
    category: "Students facing financial crisis",
    amount: "₹15,000–₹75,000/year",
    income: "Family annual income < ₹2.5 LPA",
    deadline: "Rolling basis",
    eligibility: "Financial crisis due to death/illness of parent; 55%+ marks; any stream",
    stream: ["All streams"],
    link: "https://www.hdfcbank.com/content/bbp/repositories/723fb80a-2dde-42a3-9793-7ae1be57c87f",
    badge: "🏦 Private",
    badgeColor: "bg-yellow-50 text-yellow-700",
    priority: "Medium",
  },
]

const faqs = [
  {
    question: "How do I apply for MahaDBT scholarship 2026?",
    answer: "Apply at mahadbt.maharashtra.gov.in. Steps: (1) Register with Aadhaar + mobile. (2) Choose your scheme (Freeship, OBC, SC/ST Post-Matric). (3) Upload documents: Caste certificate, income certificate, 12th marksheet, college admission letter, bank passbook (student's name). (4) Submit before September 30, 2026. Process at nearest Maha e-Seva centre if online help needed.",
  },
  {
    question: "Can engineering students get scholarship in Pune?",
    answer: "Yes — multiple scholarships available for Pune engineering students 2026: (1) MahaDBT Freeship — full fee waiver for EBC students (income < ₹8 LPA). (2) OBC Scholarship — ₹2,000–5,000/year for OBC/VJNT/NT students. (3) SC/ST Post-Matric — full fees + monthly maintenance. (4) NSP Central Sector Scheme — ₹10,000–20,000/year for merit students. (5) COEP Merit Scholarship — ₹25,000–50,000/year for top performers.",
  },
  {
    question: "What scholarships are available for MBA students in Pune?",
    answer: "Scholarships for MBA students in Pune 2026: (1) Symbiosis Scholarship — 25%–100% fee waiver for top SNAP ranks. (2) Aditya Birla Scholarship — ₹1 LPA for CAT top 20 rankers. (3) MahaDBT OBC/SC/ST — available for MBA courses too. (4) Many Pune MBA colleges like BIMM and MAEER's offer need-based freeships internally. Contact your college's scholarship cell after admission.",
  },
  {
    question: "What documents are needed for MahaDBT scholarship?",
    answer: "Documents required for MahaDBT 2026: (1) Aadhaar card (mandatory). (2) Caste certificate (for OBC/SC/ST) or income certificate (for EBC/Freeship). (3) Domicile certificate (Maharashtra). (4) Last qualifying exam marksheet. (5) Current year college admission letter + fee receipt. (6) Bank account details (student's own account — must be linked to Aadhaar). (7) Passport-size photo. Note: Bank account must be in student's name, not parent's.",
  },
  {
    question: "What is the income limit for MahaDBT Freeship 2026?",
    answer: "MahaDBT Freeship (Tuition Fee Waiver) income limit: Family annual income must be below ₹8 LPA (₹8 lakh per annum) for EBC Freeship. SC/ST Post-Matric scholarship: family income below ₹2.5 LPA. OBC scholarship: family income below ₹8 LPA. NSP Central Sector Scheme: family income below ₹4.5 LPA. Submit income certificate from Tehsildar/SDO office for verification.",
  },
]

export default function ScholarshipsPage() {
  const breadcrumb = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Scholarships", url: "/scholarships" },
  ])
  const faqSchema = generateFAQSchema(faqs)

  const streams = ["All", "Engineering", "Medical", "MBA", "Arts", "Pharmacy", "BCA", "BBA"]

  return (
    <>
      <Script id="breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="bg-surface min-h-screen">
        {/* Hero */}
        <div className="bg-gradient-to-r from-[#0A1628] to-[#0D3B2E] py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="text-xs text-blue-300 mb-4 flex gap-1 items-center">
              <Link href="/" className="hover:text-white">Home</Link>
              <span>›</span>
              <span className="text-white">Scholarships 2026</span>
            </nav>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
              Scholarships for Pune College Students 2026
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mb-5">
              10 verified scholarships — government & private — for engineering, MBA, medical, and arts students in Pune. Updated deadlines and direct application links.
            </p>
            <div className="flex flex-wrap gap-3">
              {["MahaDBT Freeship", "NSP Central", "SC/ST Post-Matric", "OBC Scholarship", "Merit-based"].map((tag) => (
                <span key={tag} className="bg-white/10 text-white text-xs px-3 py-1 rounded-full font-medium">{tag}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">

          {/* AI Scholarship Finder */}
          <div className="bg-white rounded-2xl border border-orange-100 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🤖</span>
                <div>
                  <h2 className="font-extrabold text-white text-lg leading-tight">AI Scholarship Finder</h2>
                  <p className="text-orange-100 text-xs">Tell us about yourself — get your personalized scholarship matches in seconds</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <ScholarshipFinder />
            </div>
          </div>

          {/* WhatsApp alert banner */}
          <div className="bg-green-50 border border-green-100 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1">
              <h2 className="font-extrabold text-gray-900 text-sm mb-1">
                🔔 Get Scholarship Alerts Instantly on WhatsApp
              </h2>
              <p className="text-xs text-gray-500">New scholarship deadlines, NSP updates, MahaDBT notifications — delivered to your phone.</p>
            </div>
            <div className="shrink-0 w-full sm:w-auto">
              <InlineLeadForm context="scholarship_alert" />
            </div>
          </div>

          {/* Scholarship cards */}
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-6">All Scholarships for Pune Students 2026</h2>
            <div className="space-y-4">
              {scholarships.map((s) => (
                <div key={s.name} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
                  <div className="flex flex-wrap items-start gap-3 mb-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="font-extrabold text-gray-900 text-base">{s.name}</h3>
                        <span className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${s.badgeColor}`}>{s.badge}</span>
                        <span className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${s.priority === "High" ? "bg-red-50 text-red-600" : "bg-gray-100 text-gray-600"}`}>
                          {s.priority} Priority
                        </span>
                      </div>
                      <p className="text-xs text-orange-600 font-semibold">{s.category}</p>
                    </div>
                    <a
                      href={s.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 text-xs font-bold bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl transition-colors"
                    >
                      Apply →
                    </a>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-gray-600">
                    <div>
                      <span className="font-semibold text-gray-900 block">Amount</span>
                      <span className="text-green-700 font-semibold">{s.amount}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900 block">Income Limit</span>
                      {s.income}
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900 block">Deadline</span>
                      <span className="text-red-600 font-semibold">{s.deadline}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900 block">Streams</span>
                      {s.stream.slice(0, 3).join(", ")}{s.stream.length > 3 ? "…" : ""}
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 mt-3 leading-relaxed">
                    <span className="font-semibold">Eligibility:</span> {s.eligibility}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick tips */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-extrabold text-gray-900 text-lg mb-4">📋 Scholarship Application Tips for 2026</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">
              {[
                "Apply for MahaDBT on day 1 of college — seats and processing time matter.",
                "Get income certificate from Tehsildar office — college officer cannot issue it.",
                "Bank account must be in YOUR name and linked to Aadhaar.",
                "You can apply for multiple scholarships simultaneously.",
                "NSP and MahaDBT are separate portals — apply to both independently.",
                "Keep all original documents; colleges verify before forwarding applications.",
                "SC/ST students get fee waiver automatically at government colleges — still register.",
                "Renewal is required every year — don't miss annual renewal deadlines.",
              ].map((tip, i) => (
                <div key={i} className="flex gap-2 items-start">
                  <span className="text-orange-500 font-bold shrink-0">{i + 1}.</span>
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Scholarship WhatsApp Alert */}
          <ScholarshipSubscribe />

          {/* FAQ */}
          <div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-5">FAQ — Scholarships for Pune College Students</h2>
            <div className="space-y-3">
              {faqs.map((faq) => (
                <details key={faq.question} className="bg-white rounded-2xl border border-gray-100 px-5 py-4 group">
                  <summary className="font-semibold text-gray-900 text-sm cursor-pointer list-none flex items-center justify-between gap-2">
                    {faq.question}
                    <span className="text-orange-500 text-lg group-open:rotate-45 transition-transform shrink-0">+</span>
                  </summary>
                  <p className="text-sm text-gray-600 mt-3 leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-[#0A1628] to-[#1E3A5F] rounded-2xl p-6 text-center">
            <h2 className="text-xl font-extrabold text-white mb-2">Need Help with Scholarship Application?</h2>
            <p className="text-gray-300 text-sm mb-4">Our counsellors help Pune college students complete MahaDBT, NSP, and college scholarship applications — completely free.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/counselling" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors">
                Book Free Counselling
              </Link>
              <Link href="/colleges" className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors border border-white/20">
                Browse Colleges
              </Link>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
