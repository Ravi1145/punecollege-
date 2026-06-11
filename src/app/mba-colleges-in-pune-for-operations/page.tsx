import type { Metadata } from "next"
import Script from "next/script"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"
import { mbaColleges } from "@/data/mbaColleges"
import MBAClusterPage from "@/components/mba/MBAClusterPage"

export const metadata: Metadata = genMeta({
  title: "MBA in Operations Colleges in Pune 2026 | Best Operations Management MBA",
  description: "Best MBA Operations Management colleges in Pune 2026. MIT-SOM, SIBM with supply chain, manufacturing and logistics placements in Pune's auto sector.",
  path: "/mba-colleges-in-pune-for-operations",
  keywords: ["mba in operations pune", "mba operations management pune", "mba supply chain pune", "operations mba pune 2026"],
})
export const revalidate = 300

const faqs = [
  { question: "Which is the best MBA Operations college in Pune?", answer: "MIT-SOM and SIBM Pune are the best MBA Operations colleges. Pune's auto/manufacturing sector (Tata Motors, Bajaj, Mahindra, KPIT) is the top Operations MBA recruiter. Average package: ₹8–16 LPA." },
  { question: "What are career options after MBA Operations from Pune?", answer: "Supply Chain Manager (₹10-18 LPA), Production Manager (₹9-16 LPA), Operations Analyst (₹8-14 LPA), Logistics Manager (₹9-15 LPA), Plant Manager (₹15-30 LPA). Pune's manufacturing base provides unmatched Operations MBA opportunities." },
]

export default function MBAOperations() {
  const faqSchema = generateFAQSchema(faqs)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" }, { name: "MBA Colleges in Pune", url: "/mba-colleges-in-pune" },
    { name: "MBA for Operations", url: "/mba-colleges-in-pune-for-operations" },
  ])
  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <MBAClusterPage
        h1="MBA in Operations Management — Colleges in Pune 2026"
        subtitle="Top MBA Operations Management colleges in Pune with manufacturing, supply chain and logistics placements."
        quickAnswer="MIT-SOM and SIBM Pune lead for MBA Operations. Pune's auto/manufacturing sector (Tata Motors, Bajaj, Mahindra) is the top recruiter. Avg package: ₹8–16 LPA. Admission via MAH-CET MBA or SNAP."
        stats={[{ value: "8+", label: "MBA Ops Colleges" }, { value: "₹8–16 LPA", label: "Avg Placement" }, { value: "Manufacturing", label: "Top Sector" }, { value: "MAH-CET", label: "Exam" }]}
        colleges={mbaColleges}
        filterFn={c => c.specializations.includes("Operations")}
        introHeading="MBA Operations in Pune — Why Pune's Manufacturing Hub Matters"
        introParagraphs={[
          "Pune is India's manufacturing capital with Tata Motors, Bajaj Auto, Mahindra, KPIT, Bosch, and 500+ auto sector companies. MBA Operations graduates from Pune have unmatched access to supply chain, production management, quality control, and operations analytics roles.",
          "Operations Management MBA curriculum covers supply chain management, lean manufacturing, Six Sigma, ERP, logistics, procurement, and operations analytics — all directly applicable to Pune's industrial base.",
          "Top operations roles post-MBA from Pune: Supply Chain Manager (₹10-18 LPA), Production Manager (₹9-16 LPA), Operations Analyst (₹8-14 LPA), Logistics Manager (₹9-15 LPA).",
        ]}
        faqs={faqs}
        internalLinks={[
          { label: "MBA for Supply Chain", href: "/mba-colleges-in-pune-for-supply-chain" },
          { label: "MBA for Finance", href: "/mba-colleges-in-pune-for-finance" },
          { label: "MBA Placements Pune", href: "/mba-placements-pune" },
        ]}
        ctaHeading="Find the Best MBA Operations College in Pune"
        ctaSubtext="Free counselling to choose between SIBM, MIT-SOM for MBA Operations based on your profile."
      />
    </>
  )
}
