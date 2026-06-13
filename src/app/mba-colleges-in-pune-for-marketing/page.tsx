import type { Metadata } from "next"
import Script from "next/script"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"
import { mbaColleges } from "@/data/mbaColleges"
import MBAClusterPage from "@/components/mba/MBAClusterPage"

export const metadata: Metadata = genMeta({
  title: "MBA in Marketing Colleges in Pune 2026 | Best MBA Marketing Pune",
  description: "Best MBA Marketing colleges in Pune 2026. Compare fees, placements in FMCG, e-commerce and digital marketing, NAAC grades and admission for MBA Marketing specialization.",
  path: "/mba-colleges-in-pune-for-marketing",
  keywords: ["mba in marketing pune", "mba marketing colleges pune", "best mba marketing pune", "mba marketing fees pune", "mba marketing placement pune"],
})
export const revalidate = 300

const marketingColleges = mbaColleges.filter(c => c.specializations.includes("Marketing"))

const faqs = [
  { question: "Which is the best MBA Marketing college in Pune?", answer: "SIBM Pune (NIRF #14) is the best MBA Marketing college in Pune with â‚¹24 LPA average placement and top FMCG/e-commerce recruiters like Amazon, Flipkart, P&G, HUL, and ITC. SCMHRD (NIRF #22, â‚¹19 LPA avg) is #2. For affordable MBA Marketing, MIT-SOM (â‚¹11 LPA avg, â‚¹7L/yr fees) is excellent." },
  { question: "What is the scope of MBA Marketing from Pune?", answer: "MBA Marketing graduates from Pune are hired by FMCG companies (HUL, ITC, Nestle), e-commerce (Amazon, Flipkart, Meesho), automotive (Tata Motors, Bajaj, Mahindra in Pune), fintech, and digital marketing agencies. Pune's proximity to Mumbai's advertising hub gives Marketing MBA students unique internship access." },
  { question: "What are the career options after MBA Marketing from Pune?", answer: "Career options after MBA Marketing from Pune: Brand Manager (â‚¹8â€“18 LPA), Product Manager (â‚¹12â€“25 LPA), Digital Marketing Manager (â‚¹7â€“15 LPA), Sales Manager (â‚¹8â€“16 LPA), Marketing Analytics (â‚¹10â€“20 LPA), Business Development Manager (â‚¹8â€“14 LPA). FMCG and e-commerce pay the highest for Marketing MBAs." },
  { question: "What is the average salary for MBA Marketing from Pune colleges?", answer: "Average MBA Marketing placement: SIBM Pune â‚¹24 LPA, SCMHRD â‚¹19 LPA, MIT-SOM â‚¹11 LPA (marketing stream), DYPIM â‚¹9 LPA, BVIMR â‚¹7 LPA. Highest packages (â‚¹40â€“85 LPA) go to Marketing-Analytics combined roles at consulting and tech companies." },
]

export default function MBAMarketing() {
  const faqSchema = generateFAQSchema(faqs)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" }, { name: "MBA Colleges in Pune", url: "/mba-colleges-in-pune" },
    { name: "MBA for Marketing", url: "/mba-colleges-in-pune-for-marketing" },
  ])
  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <MBAClusterPage
        h1="MBA in Marketing â€” Colleges in Pune 2026"
        subtitle="Best MBA Marketing colleges in Pune with top placements in FMCG, e-commerce, automotive and digital marketing."
        quickAnswer="SIBM Pune (avg â‚¹24 LPA) is the best MBA Marketing college in Pune. Top recruiters: Amazon, Flipkart, P&G, HUL, ITC. MIT-SOM offers â‚¹11 LPA avg at â‚¹7L/yr â€” best value MBA Marketing in Pune. Key exams: SNAP (Symbiosis), MAH-CET MBA (others)."
        stats={[
          { value: `${marketingColleges.length}+`, label: "MBA Mktg Colleges" },
          { value: "â‚¹7â€“24 LPA", label: "Placement Range" },
          { value: "FMCG/E-com", label: "Top Sectors" },
          { value: "â‚¹1.25Lâ€“16L/yr", label: "Fees" },
        ]}
                colleges={mbaColleges.filter(c => c.specializations.includes("Marketing"))}
        introHeading="MBA Marketing in Pune â€” Industry, Scope & Colleges"
        introParagraphs={[
          "Pune is an ideal city for MBA Marketing because of its diverse industrial base: Bajaj Auto, Tata Motors, Mahindra for automotive marketing; 500+ IT companies for B2B/tech marketing; and proximity to Mumbai's media and FMCG headquarters. MBA Marketing from Pune gives graduates access to multiple high-paying marketing career tracks.",
          "MBA Marketing specialization covers consumer behaviour, brand management, digital marketing, market research, advertising, product management, and sales strategy. Pune MBA colleges have updated their Marketing curriculum to include data analytics, performance marketing, and e-commerce â€” skills in highest demand.",
          "Pune's growing startup ecosystem (200+ funded startups in 2024-25) is also creating Marketing roles in product growth, content strategy, and performance marketing, offering MBA Marketing graduates from Pune an exciting alternative to traditional FMCG roles.",
        ]}
        faqs={faqs}
        internalLinks={[
          { label: "MBA for Finance", href: "/mba-colleges-in-pune-for-finance" },
          { label: "MBA for HR", href: "/mba-colleges-in-pune-for-hr" },
          { label: "MBA for Business Analytics", href: "/mba-colleges-in-pune-for-business-analytics" },
          { label: "MBA Placements Pune", href: "/mba-placements-pune" },
          { label: "Best MBA Colleges Pune", href: "/best-mba-colleges-pune" },
        ]}
        ctaHeading="MBA Marketing â€” Choose the Right Pune College"
        ctaSubtext="Free counselling to pick the right MBA Marketing college based on your target industry and budget."
      />
    </>
  )
}
