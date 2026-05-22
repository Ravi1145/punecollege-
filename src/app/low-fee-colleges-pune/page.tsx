import type { Metadata } from "next"
import Script from "next/script"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"
import SEOLandingPage from "@/components/seo/SEOLandingPage"

export const metadata: Metadata = genMeta({
  title: "Low Fee Colleges in Pune 2026 | Affordable Colleges Under ₹1L/Year",
  description: "Best affordable colleges in Pune with low fees under ₹1L per year. Government, aided, and scholarship-eligible colleges for engineering, arts, commerce, and science streams.",
  path: "/low-fee-colleges-pune",
  keywords: ["low fee colleges pune", "affordable colleges pune 2026", "cheap colleges pune", "colleges under 1 lakh pune", "government colleges pune fees"],
})

export const revalidate = 300

const colleges = [
  { name: "College of Engineering Pune (COEP)", location: "Shivajinagar", naac: "A+", fees: "₹80K/yr", placement: "₹12 LPA avg", slug: "coep-college-of-engineering-pune" },
  { name: "Fergusson College (Autonomous)", location: "Shivajinagar", naac: "A+", fees: "₹25K-60K/yr", placement: "Govt. College", slug: "fergusson-college-pune" },
  { name: "SP College of Science & Commerce", location: "Shivajinagar", naac: "A+", fees: "₹20K-50K/yr", placement: "Govt. Aided", slug: "sp-college-pune" },
  { name: "Garware College of Commerce", location: "Karve Road", naac: "A", fees: "₹15K-40K/yr", placement: "Govt. Aided", slug: "garware-college-of-commerce-pune" },
  { name: "BMCC (Brihan Maharashtra College of Commerce)", location: "Shivajinagar", naac: "A+", fees: "₹18K-45K/yr", placement: "₹5.5 LPA avg", slug: "bmcc-pune" },
  { name: "Modern College of Arts Science & Commerce", location: "Shivajinagar", naac: "A", fees: "₹22K-55K/yr", placement: "Govt. Aided", slug: "modern-college-pune" },
  { name: "Wadia College of Science", location: "Pune", naac: "A", fees: "₹18K-40K/yr", placement: "Government", slug: "wadia-college-science-pune" },
  { name: "Sinhgad College of Engineering (State Quota Seats)", location: "Vadgaon", naac: "A", fees: "₹1.15L/yr", placement: "₹4.9 LPA avg", slug: "sinhgad-college-of-engineering-pune" },
]

const faqs = [
  { q: "Which is the cheapest college in Pune with good quality?", a: "Fergusson College and SP College are among the cheapest colleges in Pune (₹15,000-50,000/year) with NAAC A+ grade and strong academic reputations. For engineering, COEP offers government-aided seats at ₹80,000/year with India-ranked quality." },
  { q: "Are there free colleges in Pune?", a: "No completely free colleges, but several government-aided colleges have extremely low fees. Additionally, merit scholarships, EBC scholarships, and central government scholarships can effectively cover 100% fees for eligible students at these low-fee institutions." },
  { q: "What scholarships are available for low-fee colleges in Pune?", a: "Key scholarships: EBC (Economically Backward Class) scholarship covers full tuition for family income under ₹1L/year. GoM Scholarship for OBC students. Minority scholarships. NSP (National Scholarship Portal) for SC/ST students. Merit scholarships from state government for top HSC scorers." },
  { q: "Can I get good placements from low-fee government colleges in Pune?", a: "Absolutely. COEP (₹80K/year) has India's best engineering placements at ₹12 LPA average. Fergusson College and SP College alumni hold senior positions in top companies. Government colleges in Pune consistently outperform many expensive private colleges in academic quality." },
  { q: "How do I apply for low-fee government colleges in Pune?", a: "For government-aided arts/science/commerce colleges: Apply via online admission portal during June-July after HSC results. Engineering government colleges: Via MHT-CET CAP process. All admissions are merit-based. No management quota or donation system in government colleges." },
]

export default function LowFeeCollegesPunePage() {
  const faqSchema = generateFAQSchema(faqs.map(f => ({ question: f.q, answer: f.a })))
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Low Fee Colleges in Pune", url: "/low-fee-colleges-pune" },
  ])
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Low Fee Colleges in Pune 2026",
    numberOfItems: colleges.length,
    itemListElement: colleges.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      url: `https://collegepune.com/colleges/${c.slug}`,
    })),
  }

  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Script id="itemlist-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <SEOLandingPage
        breadcrumb={[{ label: "Low Fee Colleges in Pune", href: "/low-fee-colleges-pune" }]}
        h1="Low Fee Colleges in Pune 2026"
        subtitle="Find the best affordable colleges in Pune with fees under ₹1 lakh per year. Government-aided institutions with NAAC A+ grades, strong placements, and scholarship eligibility."
        heroStats={[
          { value: "40+", label: "Low-Fee Colleges" },
          { value: "₹15K/yr", label: "Minimum Fees" },
          { value: "NAAC A+", label: "Best Rated" },
          { value: "100%", label: "Scholarship Eligible" },
        ]}
        introHeading="Low Fee Colleges in Pune: Quality Education at Minimal Cost"
        introParagraphs={[
          "Pune has a remarkable advantage for budget-conscious students: the city's strong network of government-aided colleges delivers world-class education at a fraction of private college costs. Fergusson College, SP College, Garware College, and BMCC -- all with NAAC A or A+ grades -- charge ₹15,000-60,000 per year for undergraduate programs in arts, science, and commerce.",
          "For engineering, COEP (College of Engineering Pune) is the crown jewel of low-fee technical education -- with fees around ₹80,000/year, it delivers NIRF #49 ranked education with ₹12 LPA average placements. For budget-conscious engineering students, state-quota seats at private colleges via MHT-CET also offer subsidized fees under government regulation.",
          "Financial constraints should never stop you from accessing quality education. In addition to inherently low fees at government colleges, Maharashtra's scholarship ecosystem -- including EBC scholarships, OBC scholarships, and NSP (National Scholarship Portal) schemes -- can reduce effective fees to near-zero for eligible students at any NAAC-accredited institution.",
        ]}
        colleges={colleges}
        whyHeading="Why Government & Aided Colleges in Pune Are Worth It"
        whyPoints={[
          { title: "NAAC A+ at ₹25K/Year", description: "Fergusson College (NAAC A+) charges just ₹25,000-60,000/year for BSc and BA programs. This is among the best value-for-money education in India -- equivalent academic quality to colleges charging 10x more." },
          { title: "No Donation / Capitation Fees", description: "Government and government-aided colleges strictly prohibit donation or capitation fees. Admissions are purely merit-based, ensuring transparency and equal opportunity for all students." },
          { title: "Full Scholarship Access", description: "Government college students have priority access to state scholarships (EBC, OBC, SC/ST), central government National Scholarship Portal schemes, and merit-cum-means grants from the state government." },
          { title: "Experienced Faculty", description: "Government colleges attract faculty who prioritize teaching careers over industry consulting. Many professors have 20+ years of experience and strong research publication records." },
          { title: "Strong Alumni Networks", description: "Fergusson College (est. 1885) and SP College (est. 1916) have 100+ year alumni networks with thousands of successful graduates in government, academics, business, and arts." },
          { title: "Pune University Degree Value", description: "Degrees from SPPU-affiliated government colleges in Pune carry the same university credential as expensive private colleges -- employers see the Savitribai Phule Pune University degree, not just the college." },
        ]}
        admissionHeading="Admission Process for Low-Fee Colleges in Pune 2026"
        admissionSteps={[
          { step: "1", title: "Check HSC Results (for Arts/Science/Commerce)", description: "Arts, Science, and Commerce colleges in Pune admit based on HSC (12th) merit. Track results at mahahsscboard.in. Most government colleges publish merit cutoffs in June-July 2026." },
          { step: "2", title: "Apply Online on College/University Portal", description: "SPPU online admission portal opens after HSC results. Apply to 5-10 government and aided colleges simultaneously. Application fees are minimal (₹50-200 per application)." },
          { step: "3", title: "Engineering: Register for MHT-CET CAP", description: "For low-fee engineering seats (COEP government quota, state quota at private colleges), register on cetcell.mahacet.org after MHT-CET results. Fill college preferences prioritizing government colleges." },
          { step: "4", title: "Apply for Scholarship Simultaneously", description: "Apply for EBC, OBC, and other scholarships on scholarships.gov.in (NSP) and Maharashtra scholarships portal (mahaeschol.maharashtra.gov.in) immediately after admission. Deadlines are strict." },
          { step: "5", title: "Report to College with Documents", description: "After merit list selection, report to the college within the deadline. Bring original documents: HSC marksheet, caste/income certificate, Aadhar, migration certificate, and passport photos." },
        ]}
        faqs={faqs}
        ctaHeading="Find the Best Affordable College in Pune for Your Budget"
        ctaSubtext="Budget should not limit your education choices. Our counsellors help you find the best low-fee colleges in Pune matching your stream, scores, and scholarship eligibility."
      relatedGuides={[
        { label: "NAAC A+ Colleges in Pune", href: "/naac-a-plus-colleges-pune", icon: "⭐" },
        { label: "Pune Colleges Fees Guide 2026", href: "/colleges-pune-fees", icon: "📊" },
        { label: "Top Placement Colleges in Pune", href: "/top-placement-colleges-pune", icon: "💼" },
        { label: "College Fees Calculator", href: "/pune-college-fees-calculator", icon: "🧮" },
        { label: "Placement Comparator Tool", href: "/pune-college-placement-comparator", icon: "📈" },
        { label: "Engineering vs MBA Comparison", href: "/pune-colleges-comparison-engineering-mba", icon: "⚖️" },
        { label: "Admission Deadline Tracker 2026", href: "/pune-admission-deadline-tracker-2026", icon: "📅" },
      ]}
      />
    </>
  )
}
