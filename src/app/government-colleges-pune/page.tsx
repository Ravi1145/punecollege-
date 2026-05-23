import { Metadata } from "next"
import Script from "next/script"
import Link from "next/link"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema, generateItemListSchema } from "@/lib/seo"
import { Award, BookOpen, TrendingUp, Users, ShieldCheck } from "lucide-react"

export const metadata: Metadata = genMeta({
  title: "Best Government Colleges in Pune 2026 | Low Fees & NIRF | CollegePune",
  description: "Top government colleges in Pune 2026 — COEP (NIRF #49), AFMC (NIRF #4), BJ Medical (NIRF #18). Fees ₹8K–₹1.8L/yr. CAP/NEET/MHT-CET cutoffs. Compare free.",
  path: "/government-colleges-pune",
  keywords: [
    "government colleges in pune 2026",
    "best government college pune",
    "government engineering college pune",
    "coep pune government college",
    "fergusson college government aided",
    "government medical college pune",
    "bj medical college pune government",
    "free government college pune",
    "low fee government college pune",
    "sppu government affiliated colleges",
    "autonomous government colleges pune",
    "pune municipal corporation colleges",
    "state government colleges pune maharashtra",
  ],
})

const categories = [
  {
    type: "Government Engineering",
    emoji: "⚙️",
    colleges: [
      { name: "COEP Technological University", fees: "₹80K–₹1.8L/yr", naac: "A+", nirf: 49, program: "BTech, MTech, PhD", slug: "coep-college-of-engineering-pune", note: "Best Govt Engineering | Est. 1854 | NIRF #49" },
      { name: "Army Institute of Technology (AIT)", fees: "₹1.5L–₹2L/yr", naac: "A", nirf: null, program: "BTech (4 branches)", slug: "army-institute-of-technology-pune", note: "Defence-backed | Pune Cantonment | Very selective" },
      { name: "Government Polytechnic, Pune", fees: "₹15K–₹25K/yr", naac: "–", nirf: null, program: "Diploma Engineering", slug: "government-polytechnic-pune", note: "Cheapest Technical | MHT-CET Diploma" },
    ],
  },
  {
    type: "Government Arts & Science",
    emoji: "📚",
    colleges: [
      { name: "Fergusson College", fees: "₹10K–₹30K/yr", naac: "A+", nirf: null, program: "BA, BSc, BCom, BCA", slug: "fergusson-college-pune", note: "Est. 1885 | Most Prestigious Arts College Pune" },
      { name: "SP College (Sir Parashurambhau)", fees: "₹12K–₹28K/yr", naac: "A+", nirf: null, program: "BA, BSc, BCom", slug: "sp-college-pune-sir-parashurambhau-college", note: "Top Science Stream | NAAC A+" },
      { name: "BMCC — Brihan Maharashtra College of Commerce", fees: "₹8K–₹20K/yr", naac: "A", nirf: null, program: "BCom, MCom, BBA", slug: "bmcc-brihan-maharashtra-college-of-commerce-pune", note: "Cheapest BCom in Pune | Govt-aided" },
      { name: "Modern College of Arts, Science & Commerce", fees: "₹10K–₹25K/yr", naac: "A", nirf: null, program: "BA, BSc, BCom", slug: "modern-college-of-arts-science-commerce-pune", note: "Shivajinagar | Large intake" },
      { name: "Nowrosjee Wadia College", fees: "₹10K–₹22K/yr", naac: "A", nirf: null, program: "BA, BSc, BCom", slug: "nowrosjee-wadia-college-pune", note: "Est. 1832 | Heritage campus" },
    ],
  },
  {
    type: "Government Medical",
    emoji: "🏥",
    colleges: [
      { name: "AFMC — Armed Forces Medical College", fees: "₹50,000 (total 4.5 yrs)", naac: "A++", nirf: 4, program: "MBBS (Defence)", slug: "afmc-armed-forces-medical-college-pune", note: "NIRF #4 | Free for Defence | 650+ NEET" },
      { name: "BJ Medical College, Pune (BJMC)", fees: "₹60K–₹1.2L/yr", naac: "A+", nirf: 18, program: "MBBS, MD, MS", slug: "bj-medical-college-pune", note: "NIRF #18 | Best Govt for Open Category | 625+ NEET" },
      { name: "Byramjee Jeejeebhoy Government Medical College (BJGMC)", fees: "₹50K–₹80K/yr", naac: "A", nirf: null, program: "MBBS", slug: "byramjee-jeejeebhoy-government-medical-college", note: "Govt Medical | Pune City Centre" },
      { name: "Pune Dental College & Hospital", fees: "₹1.5L–₹2.5L/yr", naac: "A", nirf: null, program: "BDS, MDS", slug: "pune-dental-college-pune", note: "Best Govt Dental College Pune | 500+ NEET BDS" },
    ],
  },
  {
    type: "Government Law",
    emoji: "⚖️",
    colleges: [
      { name: "ILS Law College", fees: "₹20K–₹40K/yr", naac: "A", nirf: null, program: "BA LLB (5yr), LLM", slug: "ils-law-college-pune", note: "Est. 1924 | Most Prestigious Law College Pune" },
      { name: "New Law College (BMCC Road)", fees: "₹15K–₹25K/yr", naac: "B+", nirf: null, program: "LLB (3yr)", slug: "new-law-college-pune", note: "Cheapest LLB Pune | 360 seats | SPPU" },
    ],
  },
  {
    type: "Government Research & Specialised",
    emoji: "🔬",
    colleges: [
      { name: "IISER Pune (Indian Institute of Science Education & Research)", fees: "₹15K–₹30K/yr", naac: "–", nirf: null, program: "BS-MS (5yr), PhD", slug: "iiser-pune-indian-institute-science-education-research", note: "National Institute | IAT + JEE Advanced | Research excellence" },
      { name: "DIAT (Defence Institute of Advanced Technology)", fees: "₹50K–₹80K/yr", naac: "–", nirf: null, program: "MTech, PhD (Defence)", slug: "diat-defence-institute-advanced-technology-pune", note: "Defence University | GATE required | PG only" },
      { name: "Gokhale Institute of Politics & Economics", fees: "₹25K–₹50K/yr", naac: "A", nirf: null, program: "MA Economics, MBA", slug: "gokhale-institute-politics-economics-pune", note: "Deemed | Economics research | MPSC alumni" },
      { name: "PUMBA — Pune University MBA", fees: "₹60K–₹90K/yr", naac: "A+", nirf: null, program: "MBA (2yr)", slug: "pumba-pune-university-mba", note: "Best Govt MBA Pune | MAH-MBA CET" },
    ],
  },
]

const faqs = [
  {
    question: "Which are the best government colleges in Pune?",
    answer: "The best government colleges in Pune are: (1) COEP Technological University — best government engineering college (NIRF #49), (2) AFMC — best government medical college (NIRF #4, nearly free), (3) BJ Medical College (NIRF #18), (4) ILS Law College — most prestigious government law college (est. 1924), (5) Fergusson College — best government arts college (est. 1885, NAAC A+), (6) PUMBA — best government MBA.",
  },
  {
    question: "What is the fee for government colleges in Pune?",
    answer: "Government college fees in Pune are the most affordable in Maharashtra: Government arts/commerce colleges charge just ₹8,000–₹30,000/year. COEP engineering charges ₹80K–₹1.8L/year. BJ Medical College MBBS costs ₹60K–₹1.2L/year. AFMC MBBS is effectively free at ₹50,000 for the entire 4.5-year course. Government law colleges charge ₹15,000–₹40,000/year.",
  },
  {
    question: "How to get admission in government colleges in Pune?",
    answer: "Government college admissions in Pune go through centralized processes: Engineering — MHT-CET + CAP rounds by Maharashtra State CET Cell; Medical — NEET + State CET counselling; Arts/Commerce/Science — SPPU CAP (Class 12 merit); Law — MH-CET Law + CAP; MBA — MAH-MBA CET + CAP. COEP and IISER have separate entrance tests. All processes are online through respective state portals.",
  },
  {
    question: "Are government college degrees respected for jobs and higher studies?",
    answer: "Yes, government college degrees from Pune are highly respected. COEP graduates get placed in top MNCs like TCS, Infosys, Mahindra, and L&T. AFMC and BJMC doctors are among India's most respected medical professionals. ILS Law College alumni include High Court judges and senior advocates. Fergusson College alumni include IAS/IPS officers and entrepreneurs. Government degrees from SPPU-affiliated autonomous colleges are accepted for UPSC, MPSC, and all government exams.",
  },
  {
    question: "Can I get scholarship in government colleges in Pune?",
    answer: "Yes, government colleges in Pune offer multiple scholarships: (1) GOI Post-Matric Scholarship for SC/ST students (full fee waiver + stipend), (2) EBC (Economically Backward Class) scholarship — family income < ₹8L, (3) OBC scholarship — government-funded, (4) Rajarshri Shahu Maharaj Scholarship for OBC girls, (5) SPPU merit scholarships for top 3 rank holders. Students at AFMC, IISER, and DIAT get full stipend from the Government of India.",
  },
]

const breadcrumb = [
  { name: "Home", url: "https://collegepune.com" },
  { name: "Colleges", url: "https://collegepune.com/colleges" },
  { name: "Government Colleges Pune", url: "https://collegepune.com/government-colleges-pune" },
]

export const revalidate = 86400

// ItemList schema — flat list of all profiled government colleges for AI + rich results
const govCollegesItemList = generateItemListSchema([
  { name: "College of Engineering Pune (COEP)", url: "/colleges/coep-college-of-engineering-pune", description: "Best government engineering college in Pune, NIRF #49, NAAC A+" },
  { name: "Army Institute of Technology (AIT)", url: "/colleges/army-institute-of-technology-pune", description: "Defence-backed government engineering college" },
  { name: "Armed Forces Medical College (AFMC)", url: "/colleges/afmc-armed-forces-medical-college-pune", description: "NIRF #4 medical college, near-zero fees for defence students" },
  { name: "BJ Government Medical College (BJMC)", url: "/colleges/bj-medical-college-pune", description: "NIRF #18, best government MBBS college in Pune" },
  { name: "Fergusson College", url: "/colleges/fergusson-college-pune", description: "NAAC A+, best government arts college in Pune, est. 1885" },
  { name: "SP College (Sir Parashurambhau)", url: "/colleges/sp-college-pune-sir-parashurambhau-college", description: "NAAC A+, top government science college Pune" },
  { name: "BMCC (Brihan Maharashtra College of Commerce)", url: "/colleges/bmcc-brihan-maharashtra-college-of-commerce-pune", description: "Cheapest BCom in Pune, government-aided" },
  { name: "ILS Law College", url: "/colleges/ils-law-college-pune", description: "Most prestigious government law college, est. 1924" },
  { name: "PUMBA (Pune University MBA)", url: "/colleges/pumba-pune-university-mba", description: "Cheapest MBA in Pune, government, CAT 80+ percentile" },
  { name: "IISER Pune", url: "/colleges/iiser-pune-indian-institute-science-education-research", description: "National research institute, BS-MS dual degree" },
])

export default function GovernmentCollegesPune() {
  return (
    <>
      <Script id="schema-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(faqs)) }} />
      <Script id="schema-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema(breadcrumb)) }} />
      <Script id="schema-itemlist" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(govCollegesItemList) }} />

      <div className="min-h-screen bg-surface">
        {/* Hero */}
        <div className="py-14 px-4 text-center" style={{ background: "linear-gradient(135deg,#0A1628 0%,#1E3A5F 100%)" }}>
          <nav className="text-xs text-blue-300 mb-4 flex items-center justify-center gap-1">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>›</span>
            <Link href="/colleges" className="hover:text-white">Colleges</Link>
            <span>›</span>
            <span className="text-white">Government Colleges Pune</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">Best Government Colleges in Pune 2026</h1>
          <p className="text-blue-200 max-w-2xl mx-auto text-base mb-6">
            Complete list of top government &amp; government-aided colleges in Pune — engineering, medical, arts, law &amp; research. Fees from ₹8K/year with full scholarship options.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {[
              { icon: ShieldCheck, text: "20+ Govt Colleges" },
              { icon: BookOpen, text: "All Streams" },
              { icon: Award, text: "NIRF + NAAC Ranked" },
              { icon: TrendingUp, text: "Fees from ₹8K/yr" },
              { icon: Users, text: "Scholarships Available" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-blue-200">
                <Icon className="w-4 h-4 text-orange-400" />
                {text}
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-10">
          {/* Quick Answer */}
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-5 mb-10">
            <p className="text-sm font-bold text-orange-700 mb-1">⚡ Quick Answer — Best Government Colleges Pune 2026</p>
            <p className="text-sm text-gray-700">
              <strong>Engineering:</strong> COEP (NIRF #49) · <strong>Medical:</strong> AFMC (NIRF #4, free!) / BJ Medical (NIRF #18) ·{" "}
              <strong>Arts:</strong> Fergusson College · <strong>Commerce:</strong> BMCC · <strong>MBA:</strong> PUMBA ·{" "}
              <strong>Law:</strong> ILS Law College · <strong>Research:</strong> IISER Pune
            </p>
          </div>

          {/* Category sections */}
          {categories.map(({ type, emoji, colleges }) => (
            <div key={type} className="mb-10">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">{emoji}</span> {type} Colleges in Pune
              </h2>
              <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ background: "#0A1628" }}>
                      {["College", "NAAC", "NIRF", "Fees/yr", "Programs", "Note"].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-white font-semibold whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {colleges.map((c, i) => (
                      <tr key={c.slug} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="px-4 py-3">
                          <Link href={`/colleges/${c.slug}`} className="font-semibold text-blue-700 hover:text-orange-600 transition-colors">
                            {c.name}
                          </Link>
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-700">{c.naac}</span>
                        </td>
                        <td className="px-4 py-3 text-gray-600">{c.nirf ? `#${c.nirf}` : "–"}</td>
                        <td className="px-4 py-3 font-medium text-gray-800 whitespace-nowrap">{c.fees}</td>
                        <td className="px-4 py-3 text-gray-600">{c.program}</td>
                        <td className="px-4 py-3 text-xs text-gray-600">{c.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}

          {/* Scholarships banner */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-10">
            <h3 className="font-bold text-green-900 mb-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" /> Scholarships at Government Colleges Pune
            </h3>
            <div className="grid sm:grid-cols-2 gap-3 text-sm text-green-800">
              {[
                "GOI Post-Matric Scholarship (SC/ST) — Full fee + monthly stipend",
                "EBC Scholarship (income < ₹8L) — Partial fee waiver",
                "OBC Scholarship — Government funded, applicable all streams",
                "Rajarshri Shahu Maharaj Scholarship — OBC girls",
                "SPPU Merit Scholarship — Top 3 rank holders in each faculty",
                "IISER / AFMC / DIAT — Full stipend from Govt of India",
              ].map(s => (
                <div key={s} className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="rounded-2xl p-6 text-center mb-10" style={{ background: "linear-gradient(135deg,#0A1628,#1E3A5F)" }}>
            <p className="text-white font-bold text-lg mb-2">Which government college can you get with your score?</p>
            <p className="text-blue-200 text-sm mb-4">Our MHT-CET / NEET predictor tells you your chances at COEP, BJMC, AFMC and all government colleges in seconds.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/predictor" className="inline-flex items-center justify-center gap-2 font-bold text-white px-6 py-3 rounded-xl text-sm hover:opacity-90 transition-all" style={{ background: "linear-gradient(90deg,var(--color-accent),color-mix(in srgb, var(--color-accent) 70%, #FFD000))" }}>
                College Predictor
              </Link>
              <Link href="/counselling" className="inline-flex items-center justify-center gap-2 font-semibold text-white px-6 py-3 rounded-xl text-sm border border-white/30 hover:bg-white/10 transition-all">
                Free Counselling
              </Link>
            </div>
          </div>

          {/* FAQs */}
          <h2 className="text-xl font-bold text-gray-900 mb-5">Frequently Asked Questions — Government Colleges Pune</h2>
          <div className="space-y-4 mb-10">
            {faqs.map((faq) => (
              <div key={faq.question} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>

          {/* Related */}
          <h2 className="text-lg font-bold text-gray-900 mb-4">Related Guides</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { label: "Engineering Colleges Pune", href: "/engineering-colleges-pune" },
              { label: "Medical Colleges Pune", href: "/medical-colleges-pune" },
              { label: "Arts & Science Colleges", href: "/arts-colleges-pune" },
              { label: "Law Colleges Pune", href: "/law-colleges-pune" },
              { label: "Low Fees Engineering Colleges", href: "/low-fees-engineering-colleges-pune" },
              { label: "NIRF Rankings Pune", href: "/nirf-insights" },
            ].map(({ label, href }) => (
              <Link key={href} href={href} className="text-sm text-blue-600 hover:text-orange-600 bg-white border border-gray-100 rounded-lg px-4 py-3 text-center shadow-sm transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
