import type { Metadata } from "next"
import Script from "next/script"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"
import { mbaColleges } from "@/data/mbaColleges"
import MBAClusterPage from "@/components/mba/MBAClusterPage"

export const metadata: Metadata = genMeta({
  title: "MBA Colleges in Pune Highest Package 2026 | Max Salary After MBA Pune",
  description: "MBA colleges in Pune with highest placement packages 2026. SIBM highest ₹85 LPA, SCMHRD ₹62 LPA. College-wise highest salary data, top recruiters and package statistics.",
  path: "/mba-colleges-in-pune-highest-package",
  keywords: ["mba colleges pune highest package", "highest mba package pune", "max salary mba pune", "mba placement package pune 2026", "sibm highest package"],
})
export const revalidate = 300

const sortedByHighest = [...mbaColleges].sort((a, b) => b.highestPlacement - a.highestPlacement)

const faqs = [
  { question: "What is the highest MBA placement package in Pune?", answer: "The highest MBA placement package in Pune is ₹85 LPA from SIBM Pune (2024 batch). SCMHRD highest package is ₹62 LPA. MIT-SOM highest is ₹36 LPA. These outlier packages typically go to Finance/Analytics specialists hired by investment banks or global consulting firms." },
  { question: "Which company gives the highest package to MBA grads from Pune?", answer: "Companies offering the highest packages to MBA graduates from Pune: McKinsey & Company (₹40–80+ LPA), BCG (₹38–75 LPA), Goldman Sachs (₹25–85 LPA), Deutsche Bank (₹20–50 LPA), Amazon (₹20–45 LPA), and Google (₹25–50 LPA). These companies primarily recruit from SIBM and SCMHRD." },
  { question: "Can I get ₹20+ LPA MBA package from Pune?", answer: "₹20+ LPA MBA packages from Pune are realistic from SIBM (median ~₹20 LPA) and SCMHRD (median ~₹16 LPA). From other Pune MBA colleges, ₹20+ LPA requires top performance + Finance/Analytics specialization. Average-performing students from MIT-SOM/PUMBA typically get ₹8–12 LPA." },
]

export default function MBAHighestPackage() {
  const faqSchema = generateFAQSchema(faqs)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" }, { name: "MBA Colleges in Pune", url: "/mba-colleges-in-pune" },
    { name: "Highest Package", url: "/mba-colleges-in-pune-highest-package" },
  ])
  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <MBAClusterPage
        h1="MBA Colleges in Pune — Highest Package 2026"
        subtitle="College-wise highest MBA salary packages in Pune. SIBM ₹85 LPA, SCMHRD ₹62 LPA, MIT-SOM ₹36 LPA. Complete data."
        quickAnswer="SIBM Pune has the highest MBA package in Pune at ₹85 LPA (2024). SCMHRD: ₹62 LPA. MIT-SOM: ₹36 LPA. Top paying companies: McKinsey, Goldman Sachs, BCG, Deutsche Bank. These packages are for top performers in Finance/Analytics from top-tier colleges."
        stats={[
          { value: "₹85 LPA", label: "SIBM Highest (2024)" },
          { value: "₹62 LPA", label: "SCMHRD Highest" },
          { value: "₹36 LPA", label: "MIT-SOM Highest" },
          { value: "₹24 LPA", label: "SIBM Avg Package" },
        ]}
        colleges={sortedByHighest}
        introHeading="MBA Highest Packages in Pune — What the Numbers Mean"
        introParagraphs={[
          "Highest placement packages at Pune MBA colleges are real, but they represent 1–5% of the batch — typically Finance/Analytics specialists hired by global investment banks and consulting firms. The more meaningful metric for most students is median package, which reflects typical outcomes.",
          "SIBM Pune's ₹85 LPA highest package (2024) went to a Finance Analytics student hired by Goldman Sachs. This requires exceptional academic performance, Finance + Analytics dual specialization, and strong quantitative skills beyond the MBA curriculum.",
          "For students targeting ₹20+ LPA packages, SIBM or SCMHRD is essentially mandatory from Pune. For ₹12–18 LPA target, MIT-SOM and top performers at PUMBA are realistic options. Set realistic targets based on your college admission probability, not just headline package numbers.",
        ]}
        faqs={faqs}
        internalLinks={[
          { label: "MBA Average Package Pune", href: "/mba-colleges-in-pune-average-package" },
          { label: "MBA 100% Placement", href: "/mba-colleges-in-pune-with-100-placement" },
          { label: "MBA Placements Pune", href: "/mba-placements-pune" },
          { label: "MBA for Finance", href: "/mba-colleges-in-pune-for-finance" },
          { label: "Best MBA Colleges Pune", href: "/best-mba-colleges-pune" },
        ]}
        ctaHeading="Target ₹20+ LPA After MBA? Here's How"
        ctaSubtext="Free counselling to plan your MBA journey from entrance exam to high-package placement."
      />
    </>
  )
}
