import type { Metadata } from "next"
import Script from "next/script"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"
import SEOLandingPage from "@/components/seo/SEOLandingPage"

export const metadata: Metadata = genMeta({
  title: "Best MBA Colleges in Pune 2026 | Top Ranked MBA Programs",
  description: "Best MBA colleges in Pune 2026. SIBM, SCMHRD, IIMS Pune, Flame University -- compare CAT cutoffs, fees (₹4L-18L), placement packages up to ₹28 LPA. Apply now.",
  path: "/best-mba-colleges-pune",
  keywords: ["best mba colleges pune", "top mba colleges in pune 2026", "ranked mba colleges pune", "mba programs pune"],
})

export const revalidate = 300

const colleges = [
  { name: "Symbiosis Institute of Business Management (SIBM)", location: "Lavale", naac: "A+", fees: "₹8.5L (2yr)", placement: "₹28 LPA avg", slug: "sibm-symbiosis-institute-of-business-management" },
  { name: "Symbiosis Centre for Management & HRD (SCMHRD)", location: "Hinjewadi", naac: "A+", fees: "₹8.2L (2yr)", placement: "₹24 LPA avg", slug: "scmhrd-symbiosis-centre-management-hrd" },
  { name: "IIMS Pune (International Institute of Management Studies)", location: "Karve Nagar", naac: "A", fees: "₹5.5L (2yr)", placement: "₹12 LPA avg", slug: "iims-pune" },
  { name: "Flame University School of Business", location: "Lavale", naac: "A+", fees: "₹12L (2yr)", placement: "₹14 LPA avg", slug: "flame-university-pune" },
  { name: "MIT School of Business (MIT-SOB)", location: "Kothrud", naac: "A+", fees: "₹6.5L (2yr)", placement: "₹10.5 LPA avg", slug: "mit-school-of-business-pune" },
  { name: "Indira College of Engineering & Management - MBA", location: "Pune", naac: "B++", fees: "₹4.5L (2yr)", placement: "₹8 LPA avg", slug: "indira-college-pune" },
  { name: "Balaji Institute of Management & Research (BIMR)", location: "Tathawade", naac: "A", fees: "₹5.2L (2yr)", placement: "₹9 LPA avg", slug: "balaji-institute-management-research-pune" },
  { name: "Brihan Maharashtra College of Commerce (BMCC)", location: "Shivajinagar", naac: "A+", fees: "₹1.8L (2yr)", placement: "₹7 LPA avg", slug: "bmcc-pune" },
]

const faqs = [
  { q: "Which is the best MBA college in Pune?", a: "SIBM (Symbiosis Institute of Business Management) is the best MBA college in Pune, consistently ranked in India's top 15 B-schools. It has a CAT cutoff of 85+ percentile, total fees of ₹8.5L, and average placement of ₹28 LPA. SCMHRD is a close second with ₹24 LPA avg." },
  { q: "What is the CAT cutoff for top MBA colleges in Pune?", a: "SIBM requires 85+ CAT percentile. SCMHRD requires 80+ percentile. FLAME University requires 75+ percentile. IIMS Pune and MIT-SOB accept 60-70 percentile. Most Pune MBA colleges also accept MAH-CET, XAT, and GMAT scores." },
  { q: "What is the fee for MBA in Pune?", a: "MBA fees in Pune range from ₹1.8L (BMCC, government college) to ₹12L+ (FLAME University) for 2 years. Mid-tier private colleges charge ₹4-6L. Top Symbiosis institutes charge ₹8-9L for 2 years including all fees." },
  { q: "What is the average placement package from MBA colleges in Pune?", a: "SIBM Pune: ₹28 LPA avg. SCMHRD: ₹24 LPA avg. FLAME University: ₹14 LPA avg. MIT-SOB: ₹10.5 LPA avg. IIMS Pune: ₹12 LPA avg. Mid-tier colleges average ₹7-9 LPA. Finance and consulting roles command the highest packages." },
  { q: "Is Pune a good city for MBA?", a: "Yes. Pune has top MBA colleges like SIBM, SCMHRD, and FLAME, proximity to Mumbai's financial sector, thriving IT companies hiring for MBA roles, and a low cost of living compared to Delhi/Mumbai. It's one of India's top 3 cities for MBA education and careers." },
]

export default function BestMbaCollegesPunePage() {
  const faqSchema = generateFAQSchema(faqs.map(f => ({ question: f.q, answer: f.a })))
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Best MBA Colleges in Pune", url: "/best-mba-colleges-pune" },
  ])
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best MBA Colleges in Pune 2026",
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
        breadcrumb={[{ label: "Best MBA Colleges in Pune", href: "/best-mba-colleges-pune" }]}
        h1="Best MBA Colleges in Pune 2026"
        subtitle="The definitive ranking of Pune's top MBA programs. Compare CAT cutoffs, total fees, placement packages, specializations, and admission processes for 2026."
        heroStats={[
          { value: "30+", label: "MBA Colleges" },
          { value: "₹28 LPA", label: "Best Avg Package" },
          { value: "₹1.8L-18L", label: "Total Fees Range" },
          { value: "CAT/MAH-CET", label: "Primary Entrance" },
        ]}
        introHeading="Best MBA Colleges in Pune: Complete Rankings 2026"
        introParagraphs={[
          "Pune has established itself as one of India's premier MBA education destinations, home to Symbiosis International University (host of SIBM and SCMHRD -- both in India's top 20 B-schools), FLAME University, and dozens of other reputed management institutes. The city's combination of corporate exposure (IT, manufacturing, BFSI sectors) and excellent MBA education makes it a top choice for management aspirants.",
          "The best MBA colleges in Pune are evaluated on multiple criteria: NIRF ranking, CAT/MAH-CET cutoff scores, total program fees, average and median placement packages, employer quality (Fortune 500 vs. regional companies), NAAC grade, batch size, alumni network strength, and specialization quality. This guide ranks Pune's top MBA colleges on all these parameters.",
          "For 2026 MBA admissions in Pune, the primary entrance exams are CAT (November 2025), MAH-CET (March 2026), XAT, and SNAP (for Symbiosis institutes). Most Pune MBA colleges also accept GMAT scores for working professionals and international applicants. Early application is recommended as the best colleges fill seats quickly.",
        ]}
        colleges={colleges}
        whyHeading="Why Pursue MBA from Pune?"
        whyPoints={[
          { title: "India's Corporate Hub", description: "Pune hosts regional headquarters of Infosys, Wipro, Bajaj, Mahindra, HSBC, and Deutsche Bank -- giving MBA graduates direct access to corporate placements in IT, BFSI, consulting, and operations management." },
          { title: "Symbiosis Prestige", description: "SIBM and SCMHRD are nationally recognized brands. A degree from these Symbiosis institutes opens doors at top consulting firms (McKinsey, BCG), investment banks, and Fortune 500 companies." },
          { title: "Lower Cost of Living", description: "Compared to Mumbai and Delhi NCR, Pune offers 30-40% lower living costs with equivalent MBA quality. Students save ₹3-5L over 2 years on accommodation and daily expenses." },
          { title: "Diverse Industry Exposure", description: "Pune's industry diversity (IT, auto, pharma, BFSI, manufacturing) means MBA students experience multiple sectors during internships, building versatile management competencies." },
          { title: "Strong Alumni Network", description: "SIBM and SCMHRD alumni hold director and VP positions at top MNCs globally. These networks actively participate in placements, mentorship, and guest lectures." },
          { title: "Startup & Entrepreneurship Culture", description: "Pune's growing startup scene (1,000+ funded startups) and presence of accelerators like Venture Center support MBA graduates wanting to launch ventures." },
        ]}
        admissionHeading="MBA Admission Process in Pune's Best Colleges 2026"
        admissionSteps={[
          { step: "1", title: "Appear for CAT 2025 / MAH-CET 2026", description: "CAT is conducted in November 2025. Target 85+ percentile for SIBM/SCMHRD, 75+ for FLAME, 60+ for mid-tier colleges. MAH-CET (March 2026) is required for state-level MBA CAP in Maharashtra." },
          { step: "2", title: "Apply to SNAP for Symbiosis Colleges", description: "SIBM and SCMHRD require SNAP (Symbiosis National Aptitude Test) conducted in December 2025, in addition to CAT. Register on symbiosis.ac.in and pay SNAP registration fees." },
          { step: "3", title: "Submit Applications to Target Colleges", description: "After entrance exams, apply to shortlisted colleges (January-February 2026). Most colleges require a Statement of Purpose (SOP), updated CV, academic records, and work experience details." },
          { step: "4", title: "Appear for GD/PI/WAT Rounds", description: "Group Discussion, Personal Interview, and Written Ability Test rounds are conducted February-April 2026. SIBM and SCMHRD are highly competitive at this stage -- prepare current affairs, business cases, and leadership examples." },
          { step: "5", title: "Accept Offer & Pay Fees", description: "Merit list is released in April-May 2026. Accept admission offer and pay first installment of fees within the deadline. Arrange accommodation before June orientation." },
        ]}
        faqs={faqs}
        ctaHeading="Get Into the Best MBA College in Pune"
        ctaSubtext="Our MBA admission counsellors have helped 2,000+ students crack SIBM, SCMHRD, and FLAME admissions. Free guidance on test prep, SOP writing, and GD/PI preparation."
      relatedGuides={[
        { label: "Best MBA Colleges in Pune 2026", href: "/mba-colleges-pune", icon: "🏛️" },
        { label: "Top 10 MBA Colleges — Ranked", href: "/top-10-mba-colleges-in-pune", icon: "🏆" },
        { label: "MBA Placement Guide — LPA Stats", href: "/mba-colleges-pune-placement", icon: "💼" },
        { label: "Low Fees MBA Colleges in Pune", href: "/low-fees-mba-colleges-pune", icon: "💰" },
        { label: "MBA Scholarships in Pune", href: "/mba-colleges-pune-scholarship", icon: "🎓" },
        { label: "CAT Score Colleges in Pune", href: "/cat-colleges-pune", icon: "📝" },
        { label: "PGDM Colleges in Pune", href: "/pgdm-colleges-pune", icon: "📊" },
        { label: "Admission Without CAT (MAH-CET)", href: "/mba-admission-pune-without-cat", icon: "🚀" },
      ]}
      />
    </>
  )
}
