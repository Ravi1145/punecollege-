import type { Metadata } from "next"
import Script from "next/script"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"
import { mbaColleges } from "@/data/mbaColleges"
import MBAClusterPage from "@/components/mba/MBAClusterPage"

export const metadata: Metadata = genMeta({
  title: "MBA Colleges in Pune with 100% Placement 2026 | Best Placement MBA",
  description: "MBA colleges in Pune with 100% placement record 2026. SIBM, SCMHRD, MIT-SOM with top recruiters. Average packages, highest packages and recruiter list.",
  path: "/mba-colleges-in-pune-with-100-placement",
  keywords: ["mba colleges in pune with 100 placement", "mba pune 100 percent placement", "best placement mba pune", "mba placement record pune", "mba colleges pune guaranteed placement"],
})
export const revalidate = 300

const faqs = [
  { question: "Which MBA colleges in Pune have 100% placement?", answer: "MBA colleges in Pune claiming 100% placement include SIBM Pune, SCMHRD, MIT-SOM, and DYPIM. SIBM and SCMHRD consistently achieve 100% placement with 200+ companies visiting campus. Mid-tier colleges achieve 85-95% placement. Always verify official NIRF/AICTE placement disclosures before relying on college marketing." },
  { question: "What is the average MBA placement package in Pune 2026?", answer: "MBA placement averages in Pune 2026: SIBM ₹24 LPA, SCMHRD ₹19 LPA, MIT-SOM ₹11 LPA, PUMBA ₹8.5 LPA, DYPIM ₹9 LPA, BVIMR ₹7 LPA. These are overall averages — Finance and Analytics specializations are 20-30% higher." },
  { question: "Which sector hires the most MBA graduates from Pune?", answer: "Pune MBA placement by sector: IT/Software (30%), BFSI/Banking (25%), Consulting (15%), FMCG/Retail (10%), Manufacturing/Auto (10%), Pharma/Healthcare (5%), Others (5%). Pune's IT corridor makes IT sector the biggest MBA recruiter, unlike Mumbai where BFSI dominates." },
]

export default function MBAWith100Placement() {
  const faqSchema = generateFAQSchema(faqs)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" }, { name: "MBA Colleges in Pune", url: "/mba-colleges-in-pune" },
    { name: "100% Placement", url: "/mba-colleges-in-pune-with-100-placement" },
  ])
  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <MBAClusterPage
        h1="MBA Colleges in Pune with Best Placements 2026"
        subtitle="Top MBA colleges in Pune with highest placement rates, average packages, and most recruiter companies on campus."
        quickAnswer="SIBM Pune (100% placement, avg ₹24 LPA, 200+ companies) leads Pune MBA placements. SCMHRD (100%, avg ₹19 LPA) is #2. MIT-SOM (95%+, avg ₹11 LPA, 600+ companies) is the best value placement college. All three have multi-year 100% placement track records."
        stats={[
          { value: "100%", label: "SIBM/SCMHRD Pkg" },
          { value: "₹24 LPA", label: "SIBM Avg Package" },
          { value: "600+", label: "MIT-SOM Recruiters" },
          { value: "₹85 LPA", label: "Highest Package" },
        ]}
        colleges={mbaColleges}
        introHeading="How to Evaluate MBA Placements in Pune — Beyond the Headlines"
        introParagraphs={[
          "100% placement claims by MBA colleges need careful scrutiny. The honest metric is: what percentage of eligible students (those who participated in placements) received offers, and what was the median (not average) package? SIBM Pune and SCMHRD consistently deliver 100% placement with verifiable NIRF data.",
          "Average package data at Pune MBA colleges: published averages can be inflated by a few outlier packages. Look at median package, which more accurately reflects what a typical student earns. SIBM's median is ~₹20 LPA, SCMHRD's ~₹16 LPA, MIT-SOM's ~₹9 LPA.",
          "Key placement indicators to check: (1) % students placed, (2) median package, (3) list of top 25 recruiters, (4) salary distribution chart, (5) domain-wise breakdown. NIRF and AICTE mandatory disclosure (AISHE) are reliable sources for verifying placement claims.",
        ]}
        faqs={faqs}
        internalLinks={[
          { label: "MBA Highest Package Pune", href: "/mba-colleges-in-pune-highest-package" },
          { label: "MBA Average Package Pune", href: "/mba-colleges-in-pune-average-package" },
          { label: "MBA Placements Pune", href: "/mba-placements-pune" },
          { label: "Top MBA Colleges Pune", href: "/best-mba-colleges-pune" },
          { label: "Engineering Placements Pune", href: "/engineering-colleges-pune-placement" },
        ]}
        ctaHeading="Find the Best Placement MBA College for Your Profile"
        ctaSubtext="Free counselling to target the right MBA college based on your CAT/MAH-CET score and placement goals."
      />
    </>
  )
}
