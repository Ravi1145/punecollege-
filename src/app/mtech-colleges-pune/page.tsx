import type { Metadata } from "next"
import Script from "next/script"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"
import SEOLandingPage from "@/components/seo/SEOLandingPage"

export const metadata: Metadata = genMeta({
  title: "M.Tech Colleges in Pune 2025-26 | GATE & Non-GATE Admission | Fees",
  description: "Top M.Tech colleges in Pune 2025-26. Compare fees (₹80K–3.8L/yr), GATE cutoffs, specializations (CSE, VLSI, AI, Mechanical), part-time M.Tech & stipend details.",
  path: "/mtech-colleges-pune",
  keywords: ["mtech colleges in pune", "m.tech admission pune 2025", "mtech fees pune", "mtech without gate pune", "mtech gate colleges pune", "best mtech colleges pune"],
})

export const revalidate = 300

const colleges = [
  { name: "College of Engineering Pune (COEP)", location: "Shivajinagar", naac: "A+", fees: "₹80K–1.2L/yr", placement: "₹14 LPA avg", slug: "coep-college-of-engineering-pune" },
  { name: "Vishwakarma Institute of Technology (VIT Pune)", location: "Bibwewadi", naac: "A+", fees: "₹90K–1.4L/yr", placement: "₹10 LPA avg", slug: "vit-pune-vishwakarma-institute-of-technology" },
  { name: "Symbiosis Institute of Technology (SIT)", location: "Lavale", naac: "A+", fees: "₹1.8L–2.5L/yr", placement: "₹12 LPA avg", slug: "symbiosis-institute-of-technology-pune" },
  { name: "MIT World Peace University (MIT-WPU)", location: "Kothrud", naac: "A+", fees: "₹1.5L–2.2L/yr", placement: "₹11 LPA avg", slug: "mit-wpu-mit-world-peace-university" },
  { name: "PICT — Pune Institute of Computer Technology", location: "Dhankawadi", naac: "A", fees: "₹95K–1.3L/yr", placement: "₹9.5 LPA avg", slug: "pict-pune-institute-of-computer-technology" },
  { name: "PCCOE — Pimpri Chinchwad College of Engineering", location: "Akurdi", naac: "A+", fees: "₹1.0L–1.5L/yr", placement: "₹9 LPA avg", slug: "pccoe-pimpri-chinchwad-college-of-engineering" },
]

const faqs = [
  { q: "What is the M.Tech admission process in Pune?", a: "M.Tech admission in Pune is primarily through GATE score for government-funded seats (₹12,400/month GATE stipend). Without GATE, students can apply through MAH-M.Tech-CET or direct merit-based admission at private colleges. SPPU runs a centralized M.Tech admission process." },
  { q: "Can I do M.Tech in Pune without GATE?", a: "Yes. Many private M.Tech colleges in Pune (MIT-WPU, SIT, PCCOE) offer M.Tech without GATE through their own entrance tests or merit-based admission. Non-GATE M.Tech seats don't receive GATE stipend but otherwise offer the same degree." },
  { q: "What is the M.Tech fee in Pune colleges?", a: "M.Tech fees in Pune range from ₹80,000–₹1.2L/year at government/SPPU colleges (COEP, VIT Pune) to ₹1.5L–3.8L/year at private deemed universities. GATE-qualified students at AICTE-approved colleges receive ₹12,400/month stipend." },
  { q: "What are the best M.Tech specializations in Pune?", a: "Top M.Tech specializations in Pune based on placement demand: Computer Science & Engineering (CSE), VLSI & Embedded Systems, Artificial Intelligence & ML, Structural Engineering, Mechanical Design, and Data Science. CSE and AI/ML have the highest placement packages." },
  { q: "Is M.Tech or MBA better after B.Tech?", a: "M.Tech is better if you want to pursue research, core engineering, or academic careers. MBA is better for management, business, and faster salary growth. For Pune's IT sector, M.Tech in CSE/AI can match MBA salaries (₹10–20 LPA). Choose based on your career direction, not just package." },
]

export default function MtechCollegesPune() {
  const faqSchema = generateFAQSchema(faqs.map(f => ({ question: f.q, answer: f.a })))
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "M.Tech Colleges in Pune", url: "/mtech-colleges-pune" },
  ])

  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <SEOLandingPage
        breadcrumb={[{ label: "M.Tech Colleges in Pune", href: "/mtech-colleges-pune" }]}
        h1="M.Tech Colleges in Pune 2025-26"
        subtitle="Complete guide to M.Tech colleges in Pune — GATE & non-GATE admission, fees, specializations, placements, and GATE stipend details for 2025-26."
        heroStats={[
          { value: "40+", label: "M.Tech Colleges" },
          { value: "₹80K–3.8L", label: "Annual Fees" },
          { value: "2 Years", label: "Duration" },
          { value: "GATE/MAH-CET", label: "Admission" },
        ]}
        introHeading="M.Tech Colleges in Pune — Complete 2025 Guide"
        introParagraphs={[
          "Pune is one of India's top cities for M.Tech education with 40+ AICTE-approved colleges offering master's programs in engineering. The city's strong research ecosystem — IISER Pune, NCL, CSIR labs — combined with 500+ IT companies and manufacturing giants creates exceptional post-M.Tech career opportunities.",
          "M.Tech admission in Pune is primarily through GATE score for government-sponsored seats. GATE-qualified students at AICTE-approved institutions receive a monthly stipend of ₹12,400. For non-GATE candidates, MAH-M.Tech-CET and direct admission routes are available at private colleges.",
          "Top M.Tech specializations in demand in Pune include CSE, AI & ML, VLSI & Embedded Systems, Structural Engineering, and Mechanical Design. M.Tech graduates from COEP, VIT Pune, and Symbiosis are hired by top tech companies, ISRO, DRDO, and leading engineering firms.",
        ]}
        colleges={colleges}
        whyHeading="Why M.Tech from Pune?"
        whyPoints={[
          { title: "GATE Stipend Benefits", description: "M.Tech students with valid GATE score at AICTE-approved Pune colleges receive ₹12,400/month stipend from MHRD, covering most living expenses during the 2-year program." },
          { title: "Research Ecosystem", description: "Proximity to IISER Pune, NCL (National Chemical Laboratory), IUCAA, and CSIR labs provides M.Tech students unique research collaboration opportunities." },
          { title: "Industry-Ready Specializations", description: "Pune's IT and manufacturing industries drive demand for M.Tech graduates in AI/ML, VLSI, Structural Engineering, and Mechanical Design — fields where Pune colleges have strong industry MOUs." },
          { title: "Higher Salary Premium", description: "M.Tech graduates from top Pune colleges command 30–40% salary premium over B.Tech graduates in core engineering roles. Average M.Tech placement: ₹12–18 LPA." },
        ]}
        admissionHeading="M.Tech Admission Process in Pune 2025"
        admissionSteps={[
          { step: "01", title: "Appear in GATE 2025", description: "GATE is conducted in February each year. Qualifying GATE makes you eligible for GATE-sponsored M.Tech seats with ₹12,400/month stipend. Register at gate.iitb.ac.in." },
          { step: "02", title: "Apply to Pune Colleges", description: "After GATE results (March), apply to COEP, VIT Pune, PICT, MIT-WPU and other Pune colleges for M.Tech. Each college has its own application process." },
          { step: "03", title: "MAH-M.Tech-CET (Optional)", description: "For non-GATE candidates, Maharashtra State CET Cell conducts MAH-M.Tech-CET. Apply after results for SPPU-affiliated college seats." },
          { step: "04", title: "GD-PI / Merit Selection", description: "Most M.Tech colleges conduct written tests and/or interviews. Selection is based on GATE score + academic performance + interview." },
        ]}
        faqs={faqs}
        ctaHeading="Need Help Choosing M.Tech in Pune?"
        ctaSubtext="Our counsellors help you pick the right specialisation and college based on your GATE score and career goals."
        relatedGuides={[
          { label: "GATE 2025 Cutoff for Pune Colleges", href: "/cutoffs", icon: "📋" },
          { label: "M.Tech vs MBA After B.Tech", href: "/blog", icon: "📊" },
          { label: "B.Tech Colleges in Pune", href: "/btech-colleges-pune", icon: "🎓" },
          { label: "Free Counselling", href: "/counselling", icon: "🗣️" },
        ]}
      />
    </>
  )
}
