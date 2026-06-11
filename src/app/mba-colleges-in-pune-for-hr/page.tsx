import type { Metadata } from "next"
import Script from "next/script"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"
import { mbaColleges } from "@/data/mbaColleges"
import MBAClusterPage from "@/components/mba/MBAClusterPage"

export const metadata: Metadata = genMeta({
  title: "MBA in HR Colleges in Pune 2026 | Best MBA Human Resources Pune",
  description: "Best MBA Human Resources (HR) colleges in Pune 2026. SCMHRD, SIBM, PUMBA with top IT and manufacturing HR placements. Fees, cutoffs and career scope.",
  path: "/mba-colleges-in-pune-for-hr",
  keywords: ["mba in hr pune", "mba hr colleges pune", "best mba hr pune", "mba human resources pune", "mba hr placement pune 2026"],
})
export const revalidate = 300

const faqs = [
  { question: "Which is the best MBA HR college in Pune?", answer: "SCMHRD (NIRF #22) is the best MBA HR college in Pune — it has a dedicated HRD (Human Resource Development) specialization with Accenture, L&T, Mahindra, and Wipro as top HR recruiters at ₹14–19 LPA. SIBM Pune is #2 for MBA HR. PUMBA offers excellent HR MBA at ₹1.25L/yr." },
  { question: "What is the salary after MBA HR from Pune?", answer: "MBA HR placements in Pune: SCMHRD ₹14–19 LPA, SIBM ₹12–18 LPA, MIT-SOM ₹8–11 LPA, PUMBA ₹6–8.5 LPA. IT companies (TCS, Infosys, Wipro) in Pune are the biggest HR MBA recruiters. Senior HR/HRBP roles in Pune IT companies pay ₹15–30 LPA after 5 years." },
  { question: "Is MBA HR a good specialization for Pune's job market?", answer: "Yes. Pune's large IT sector (500+ companies) employs thousands of HR professionals for talent acquisition, HRBP, L&D, and total rewards roles. Manufacturing companies (Tata Motors, Bajaj Auto, KPIT) also hire MBA HR graduates. Pune is better for MBA HR than most cities because of the diversity of industries." },
]

export default function MBAHR() {
  const faqSchema = generateFAQSchema(faqs)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" }, { name: "MBA Colleges in Pune", url: "/mba-colleges-in-pune" },
    { name: "MBA for HR", url: "/mba-colleges-in-pune-for-hr" },
  ])
  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <MBAClusterPage
        h1="MBA in HR — Colleges in Pune 2026"
        subtitle="Best MBA Human Resources colleges in Pune. SCMHRD leads with dedicated HRD specialization and top IT/manufacturing HR placements."
        quickAnswer="SCMHRD Pune (dedicated HRD specialisation, avg ₹14–19 LPA) is the best MBA HR college in Pune. SIBM and PUMBA follow. IT companies (TCS, Infosys, Wipro) in Pune are the biggest MBA HR recruiters. Admission via SNAP (Symbiosis) or MAH-CET MBA."
        stats={[
          { value: "8+", label: "MBA HR Colleges" },
          { value: "₹6–19 LPA", label: "Placement Range" },
          { value: "IT/Manufacturing", label: "Top Sectors" },
          { value: "SNAP/MAH-CET", label: "Exams" },
        ]}
        colleges={mbaColleges}
        filterFn={c => c.specializations.includes("HR")}
        introHeading="MBA HR in Pune — Scope & Career Opportunities"
        introParagraphs={[
          "MBA Human Resources (HR) from Pune is highly valuable given the city's large IT and manufacturing workforce. Pune's IT sector employs 500,000+ professionals, requiring thousands of HR managers, HRBPs, L&D specialists, and talent acquisition leaders every year.",
          "SCMHRD stands out for MBA HR because it pioneered the HRD (Human Resource Development) specialization in India and has a dedicated HR curriculum covering organizational behaviour, labour law, talent management, compensation, and HR analytics. Its Hinjewadi campus is literally inside Pune's IT hub.",
          "Key HR roles post-MBA from Pune: HR Business Partner (₹8–15 LPA), Talent Acquisition Manager (₹8–14 LPA), L&D Manager (₹9–14 LPA), Total Rewards Specialist (₹10–18 LPA), HR Analytics Specialist (₹10–20 LPA).",
        ]}
        faqs={faqs}
        internalLinks={[
          { label: "MBA for Marketing", href: "/mba-colleges-in-pune-for-marketing" },
          { label: "MBA for Operations", href: "/mba-colleges-in-pune-for-operations" },
          { label: "SIBM vs SCMHRD", href: "/compare/symbiosis-institute-of-business-management-sibm-vs-symbiosis-institute-of-technology-pune" },
          { label: "MBA Placements Pune", href: "/mba-placements-pune" },
        ]}
        ctaHeading="MBA HR in Pune — Get Your College Shortlist"
        ctaSubtext="Free counselling to choose between SCMHRD, SIBM, PUMBA for MBA HR based on your profile."
      />
    </>
  )
}
