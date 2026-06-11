import type { Metadata } from "next"
import Script from "next/script"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"
import { mbaColleges } from "@/data/mbaColleges"
import MBAClusterPage from "@/components/mba/MBAClusterPage"

export const metadata: Metadata = genMeta({
  title: "MBA in Finance Colleges in Pune 2026 | Best MBA Finance Placement & Fees",
  description: "Best MBA Finance colleges in Pune 2026. SIBM, SCMHRD, MIT-SOM with top banking, investment banking, BFSI placements. Fees, CAT/MAH-CET cutoffs and admission.",
  path: "/mba-colleges-in-pune-for-finance",
  keywords: ["mba in finance pune", "mba finance colleges pune", "best mba finance pune", "mba finance placement pune", "investment banking mba pune"],
})
export const revalidate = 300

const faqs = [
  { question: "Which is the best MBA Finance college in Pune?", answer: "SIBM Pune is the best MBA Finance college in Pune — Goldman Sachs, Deutsche Bank, HSBC, JPMorgan recruit from SIBM for finance roles at ₹20–85 LPA. SCMHRD (NIRF #22) is #2 for Finance MBA. PUMBA offers the best value for Finance MBA at ₹1.25L/yr with banking and NBFC placements." },
  { question: "What is the scope of MBA Finance from Pune?", answer: "MBA Finance graduates from Pune are hired in investment banking, corporate finance, financial analysis, wealth management, risk management, and fintech. Pune has 50+ NBFCs, major bank headquarters, and growing fintech companies. Top recruiters: Goldman Sachs, Deutsche Bank, HDFC, ICICI, Axis Bank, Bajaj Finserv." },
  { question: "Is MBA Finance better than CA for a career in finance?", answer: "Both are excellent but different. CA is better for accounting, taxation, and audit careers. MBA Finance from a top Pune college (SIBM, SCMHRD) is better for investment banking, corporate finance, and management roles. Average starting salary: CA ₹7–12 LPA, MBA Finance (SIBM) ₹20–30 LPA. The combination of CA + MBA Finance gives the highest salary." },
  { question: "What is the average salary for MBA Finance from Pune?", answer: "MBA Finance placement: SIBM Pune ₹24 LPA avg (Finance stream highest), SCMHRD ₹19 LPA, PUMBA ₹8.5 LPA, MIT-SOM ₹10–12 LPA, DYPIM ₹8–9 LPA. Investment banking and corporate finance roles pay ₹20–85 LPA at top Pune MBA colleges." },
]

export default function MBAFinance() {
  const faqSchema = generateFAQSchema(faqs)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" }, { name: "MBA Colleges in Pune", url: "/mba-colleges-in-pune" },
    { name: "MBA for Finance", url: "/mba-colleges-in-pune-for-finance" },
  ])
  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <MBAClusterPage
        h1="MBA in Finance — Top Colleges in Pune 2026"
        subtitle="Best MBA Finance colleges in Pune — SIBM, SCMHRD, PUMBA with investment banking, BFSI and corporate finance placements."
        quickAnswer="SIBM Pune is the top MBA Finance college — Goldman Sachs, Deutsche Bank, JPMorgan recruit here (₹20–85 LPA). SCMHRD is #2 (avg ₹19 LPA). PUMBA offers government MBA Finance at ₹1.25L/yr with banking sector placements."
        stats={[
          { value: "8+", label: "MBA Finance Colleges" },
          { value: "₹8–24 LPA", label: "Avg Placement" },
          { value: "Banks/BFSI", label: "Top Sectors" },
          { value: "SNAP/CAT/MAH-CET", label: "Exams" },
        ]}
        colleges={mbaColleges}
        filterFn={c => c.specializations.includes("Finance")}
        introHeading="MBA Finance in Pune — Why It's One of India's Best"
        introParagraphs={[
          "Pune is one of India's strongest cities for MBA Finance careers. The city hosts 50+ NBFCs, major bank regional offices (HDFC, ICICI, Axis, Kotak), insurance companies (LIC, Bajaj Allianz), and a fast-growing fintech sector. MBA Finance graduates from Pune have direct access to campus placements from India's top financial institutions.",
          "SIBM Pune stands apart for Finance MBA — it's the only Pune college where global investment banks (Goldman Sachs, Deutsche Bank, Barclays) conduct campus placement. This makes SIBM's Finance MBA comparable to IIM-level opportunities in terms of career outcomes.",
          "For students who cannot target SIBM/SCMHRD, PUMBA's Finance MBA (₹1.25L total fees) and MIT-SOM's Finance MBA (₹7L total) offer excellent placements in retail banking, corporate finance, and BFSI sector at ₹8–12 LPA starting packages.",
        ]}
        faqs={faqs}
        internalLinks={[
          { label: "MBA for Marketing", href: "/mba-colleges-in-pune-for-marketing" },
          { label: "MBA for Business Analytics", href: "/mba-colleges-in-pune-for-business-analytics" },
          { label: "MBA Highest Package Pune", href: "/mba-colleges-in-pune-highest-package" },
          { label: "SIBM vs SCMHRD", href: "/compare/symbiosis-institute-of-business-management-sibm-vs-symbiosis-institute-of-technology-pune" },
          { label: "MBA Placements Pune", href: "/mba-placements-pune" },
        ]}
        ctaHeading="MBA Finance in Pune — Get Personalised Guidance"
        ctaSubtext="Our counsellors will help you target SIBM, SCMHRD or PUMBA based on your CAT/MAH-CET score."
      />
    </>
  )
}
