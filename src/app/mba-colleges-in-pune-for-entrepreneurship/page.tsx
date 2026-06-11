import type { Metadata } from "next"
import Script from "next/script"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"
import { mbaColleges } from "@/data/mbaColleges"
import MBAClusterPage from "@/components/mba/MBAClusterPage"

export const metadata: Metadata = genMeta({
  title: "MBA Entrepreneurship Colleges in Pune 2026 | Best Startup MBA",
  description: "Best MBA Entrepreneurship colleges in Pune 2026. FLAME, MIT-SOM with incubation centres, startup ecosystems and venture capital access. Startup-focused MBA programs.",
  path: "/mba-colleges-in-pune-for-entrepreneurship",
  keywords: ["mba entrepreneurship pune", "startup mba pune", "mba for entrepreneurs pune", "entrepreneurship mba colleges pune 2026"],
})
export const revalidate = 300

const faqs = [
  { question: "Which MBA college in Pune is best for entrepreneurship?", answer: "FLAME University and MIT-WPU are the best MBA colleges for entrepreneurship in Pune. FLAME has a dedicated Entrepreneurship specialization with venture mentoring. MIT-WPU has a well-funded incubation centre (MIT-WPU Innovation Foundation) supporting student startups. Both have connections to Pune's startup ecosystem." },
  { question: "Does Pune have a good startup ecosystem for MBA entrepreneurs?", answer: "Yes. Pune has 500+ registered startups, 10+ incubators, and growing VC presence (DSP Group, Blume Ventures have funded Pune startups). With NASSCOM CoE, IIM-Pune incubator, and Symbiosis Innovation Hub, MBA entrepreneurs from Pune have access to mentorship, funding, and market access." },
]

export default function MBAEntrepreneurship() {
  const faqSchema = generateFAQSchema(faqs)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" }, { name: "MBA Colleges in Pune", url: "/mba-colleges-in-pune" },
    { name: "MBA for Entrepreneurship", url: "/mba-colleges-in-pune-for-entrepreneurship" },
  ])
  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <MBAClusterPage
        h1="MBA Entrepreneurship — Colleges in Pune 2026"
        subtitle="Best MBA Entrepreneurship programs in Pune — startup incubation, VC access, and entrepreneurship specialization at top Pune business schools."
        quickAnswer="FLAME University (dedicated Entrepreneurship MBA) and MIT-WPU (incubation center + startup support) are the best MBA entrepreneurship colleges in Pune. Pune's growing startup ecosystem with 500+ startups makes it an ideal city for entrepreneur MBAs."
        stats={[{ value: "5+", label: "Startup MBA Colleges" }, { value: "500+", label: "Pune Startups" }, { value: "10+ Incubators", label: "Ecosystem" }, { value: "VC Access", label: "Funding Support" }]}
        colleges={mbaColleges}
        filterFn={c => c.specializations.includes("Entrepreneurship")}
        introHeading="Why Pune is Great for MBA Entrepreneurship"
        introParagraphs={[
          "Pune's startup ecosystem is growing rapidly — with 500+ funded startups, 10+ incubators, and strong mentorship networks from successful Pune entrepreneurs. An MBA in Entrepreneurship from Pune gives you classroom learning plus real startup exposure.",
          "FLAME University's MBA has a strong Entrepreneurship track with live business plan competitions, venture mentoring, and angel investor networks. MIT-WPU's Innovation Foundation has incubated 50+ student startups with seed funding support.",
          "Pune's proximity to Mumbai's VC hub (Mumbai-Pune Expressway, 3 hours) means MBA Entrepreneurship students have access to Sequoia India, Blume Ventures, and Kalaari Capital networking events.",
        ]}
        faqs={faqs}
        internalLinks={[
          { label: "MBA for Marketing", href: "/mba-colleges-in-pune-for-marketing" },
          { label: "MBA for Business Analytics", href: "/mba-colleges-in-pune-for-business-analytics" },
          { label: "MBA Colleges in Pune", href: "/mba-colleges-in-pune" },
          { label: "FLAME University Pune", href: "/colleges/flame-university-pune" },
        ]}
        ctaHeading="Want to Launch a Startup After MBA in Pune?"
        ctaSubtext="Free guidance to choose the right MBA entrepreneurship program based on your startup idea and funding goals."
      />
    </>
  )
}
