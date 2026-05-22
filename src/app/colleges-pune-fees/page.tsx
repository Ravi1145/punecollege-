import type { Metadata } from "next"
import Script from "next/script"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"
import SEOLandingPage from "@/components/seo/SEOLandingPage"

export const metadata: Metadata = genMeta({
  title: "College Fees in Pune 2026 | Fee Structure for Engineering, MBA & Medical",
  description: "Complete fee structure for colleges in Pune 2026. Engineering fees ₹80K-4.8L/yr, MBA ₹4L-18L total, MBBS ₹1L-22L/yr. Government vs private college fee comparison.",
  path: "/colleges-pune-fees",
  keywords: ["college fees pune", "pune college fee structure 2026", "engineering fees pune", "mba fees pune", "mbbs fees pune", "college fees comparison pune"],
})

export const revalidate = 300

const colleges = [
  { name: "COEP Pune (Engineering - Govt)", location: "Shivajinagar", naac: "A+", fees: "₹80K-1.8L/yr", placement: "₹12 LPA avg", slug: "coep-college-of-engineering-pune" },
  { name: "Fergusson College (Arts/Science - Govt)", location: "Shivajinagar", naac: "A+", fees: "₹25K-60K/yr", placement: "Government", slug: "fergusson-college-pune" },
  { name: "SIBM Pune (MBA - Private)", location: "Lavale", naac: "A+", fees: "₹8.5L (2yr total)", placement: "₹28 LPA avg", slug: "sibm-symbiosis-institute-of-business-management" },
  { name: "VIT Pune (Engineering - Private)", location: "Bibwewadi", naac: "A+", fees: "₹1.6L-2.2L/yr", placement: "₹8.5 LPA avg", slug: "vit-pune-vishwakarma-institute-of-technology" },
  { name: "SIT Pune (Engineering - Deemed)", location: "Lavale", naac: "A+", fees: "₹3.6L-4.8L/yr", placement: "₹9.8 LPA avg", slug: "symbiosis-institute-of-technology-pune" },
  { name: "BJ Government Medical College (MBBS)", location: "Shivajinagar", naac: "A+", fees: "₹1L-2L/yr", placement: "Doctor Residency", slug: "bj-government-medical-college-pune" },
  { name: "DY Patil Medical College (MBBS - Private)", location: "Pimpri", naac: "A+", fees: "₹18L-22L/yr", placement: "Hospital Residency", slug: "dy-patil-medical-college-pimpri-pune" },
  { name: "MIT-WPU (Engineering/MBA - Deemed)", location: "Kothrud", naac: "A+", fees: "₹2L-3.8L/yr", placement: "₹7.2 LPA avg", slug: "mit-wpu-mit-world-peace-university" },
]

const faqs = [
  { q: "What is the average fee for engineering colleges in Pune?", a: "Engineering fees in Pune: Government colleges (COEP, Govt. Poly): ₹80K-1.8L/year. Autonomous private colleges (VIT Pune, PICT): ₹1.4L-2.2L/year. Deemed universities (SIT Pune, MIT-WPU): ₹2L-4.8L/year. The average across all engineering colleges is approximately ₹1.5-2L/year." },
  { q: "What is the fee for MBA in Pune colleges?", a: "MBA fees in Pune for 2 years: Government-aided colleges (BMCC): ₹1.5-2L total. Mid-tier private (IIMS, BIMR): ₹4-6L total. Top private colleges (MIT-SOB, Balaji): ₹5-8L total. Premium institutes (SIBM, SCMHRD): ₹8-9L total. FLAME University: ₹12L+." },
  { q: "Can I get a fee waiver or scholarship for Pune colleges?", a: "Yes. EBC (Economically Backward Class) scholarship covers 100% tuition for family income under ₹1L/year. State merit scholarship covers ₹15,000-25,000/year for top HSC scorers. SC/ST scholarships cover full tuition + maintenance. Apply via mahaeschol.maharashtra.gov.in." },
  { q: "Are there hidden fees in Pune private colleges?", a: "Private colleges in Pune may charge additional fees beyond tuition: development fees (₹5,000-20,000/yr), exam fees, library fees, sports fees, and activity fees. Always ask for the all-inclusive fee breakup and check with current students before admission." },
  { q: "What is the fee refund policy if I cancel admission in Pune?", a: "AICTE/UGC rules mandate refund of fees (minus processing fee of ₹1,000) if you cancel before the last date of admission. After cut-off, refund policy varies by college. For CAP allotted seats, UGC fee refund rules apply -- colleges must refund fees if you withdraw by October 31." },
]

export default function CollegesPuneFeesPage() {
  const faqSchema = generateFAQSchema(faqs.map(f => ({ question: f.q, answer: f.a })))
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "College Fees in Pune", url: "/colleges-pune-fees" },
  ])
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "College Fees in Pune 2026 -- Stream-wise Comparison",
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
        breadcrumb={[{ label: "College Fees in Pune", href: "/colleges-pune-fees" }]}
        h1="College Fees in Pune 2026"
        subtitle="Complete fee structure comparison for engineering, MBA, medical, arts, and commerce colleges in Pune. Government vs private vs deemed university fees, scholarships, and payment options."
        heroStats={[
          { value: "₹15K-22L/yr", label: "Total Fees Range" },
          { value: "₹80K", label: "Cheapest Engg (COEP)" },
          { value: "100%", label: "Scholarship Available" },
          { value: "EMI", label: "Payment Options" },
        ]}
        introHeading="College Fees in Pune 2026: The Complete Breakdown"
        introParagraphs={[
          "Understanding the fee structure of Pune colleges is essential for financial planning before admission. Fees vary dramatically by stream, institution type, and quota: from ₹15,000/year at government arts colleges to ₹22L/year at private medical colleges. This comprehensive guide breaks down fees for all major streams and institution types in Pune.",
          "The Maharashtra government regulates fees for all government and government-aided colleges. AICTE regulates engineering college fees for state-quota seats. For management quota and deemed university seats, fees are set by the Fee Regulation Authority (FRA) in Maharashtra, which prevents arbitrary fee hikes. This regulatory framework protects students from exploitative pricing.",
          "Beyond base tuition, students should budget for additional expenses: examination fees (₹1,000-5,000/semester), library and laboratory fees (₹2,000-10,000/year), development fees (allowed up to ₹5,000/year in aided colleges), hostel fees (₹60,000-1.5L/year), and living expenses (₹8,000-15,000/month in Pune depending on area and lifestyle).",
        ]}
        colleges={colleges}
        whyHeading="Key Fee Facts for Pune College Admission 2026"
        whyPoints={[
          { title: "Government College Fees Are Fixed", description: "Maharashtra government fixes fees for government and government-aided colleges. COEP engineering: ₹80K/year. Arts/Science government colleges: ₹15K-60K/year. These fees are non-negotiable and include all statutory fees." },
          { title: "Private College Fees Are FRA-Regulated", description: "Private engineering colleges in Maharashtra cannot charge more than FRA (Fee Regulation Authority) approved fees for MHT-CET seats. Management quota seats have higher fees but are also regulated." },
          { title: "EMI & Education Loans Available", description: "All major banks (SBI, Canara, Union Bank) offer education loans up to ₹75L for Pune colleges with no collateral for loans up to ₹7.5L. Interest rates are 8.5-10.5% with moratorium during study period." },
          { title: "Scholarship Can Cover Full Fees", description: "EBC scholarship, state merit scholarship, and National Scholarship Portal (NSP) schemes can effectively cover 100% tuition fees for eligible students across government-aided colleges in Pune." },
          { title: "Deemed University Fee Premiums", description: "Deemed universities (Symbiosis, MIT-WPU, DY Patil) set their own fees above government regulation. However, they offer premium placements, infrastructure, and international exposure justifying the cost." },
          { title: "Hidden Fees to Watch For", description: "Always request a complete fee breakup including development fees, refundable deposits, activity fees, and study tour costs. AICTE prohibits certain fees -- report violations to Maharashtra Fee Regulation Cell." },
        ]}
        admissionHeading="Fees Planning for Pune College Admission 2026"
        admissionSteps={[
          { step: "1", title: "Calculate Total 4-Year Cost", description: "Estimate total cost: tuition fees x 4 years + hostel/PG + food + books/materials + exam fees + one-time deposits. Add 10% buffer for miscellaneous expenses. Government college total: ₹5-10L. Private: ₹10-20L. Deemed: ₹15-25L." },
          { step: "2", title: "Check Scholarship Eligibility Early", description: "Before admission, check your EBC/OBC/SC/ST scholarship eligibility. Apply simultaneously on NSP (scholarships.gov.in) and Maharashtra Scholarships Portal. Income certificates should be prepared in advance." },
          { step: "3", title: "Apply for Education Loan Pre-Admission", description: "Apply for education loan pre-admission at SBI/Canara Bank with provisionally allotted seat letter. Vidya Lakshmi Portal (vidyalakshmi.co.in) connects you to all bank education loan schemes." },
          { step: "4", title: "Verify Fee Details with College Directly", description: "Before confirming admission, get written fee breakup from the college's fee office. Verify that fees match FRA-approved amounts for regulated programs. Cross-check on the Maharashtra Fee Regulation Cell website." },
          { step: "5", title: "Keep Receipts & Track Scholarships", description: "After admission, keep all fee receipts for scholarship claims and income tax education deduction under Section 80C. Track scholarship disbursement dates to ensure timely credits to your bank account." },
        ]}
        faqs={faqs}
        ctaHeading="Plan Your College Budget with Our Free Fee Calculator"
        ctaSubtext="Use CollegePune's fee calculator to estimate your 4-year education cost including scholarships, loans, and living expenses for any Pune college."
      relatedGuides={[
        { label: "NAAC A+ Colleges in Pune", href: "/naac-a-plus-colleges-pune", icon: "⭐" },
        { label: "Low Fee Colleges in Pune", href: "/low-fee-colleges-pune", icon: "💰" },
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
