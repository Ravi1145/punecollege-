import type { Metadata } from "next"
import Script from "next/script"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"
import { mbaColleges } from "@/data/mbaColleges"
import MBAClusterPage from "@/components/mba/MBAClusterPage"

export const metadata: Metadata = genMeta({
  title: "MBA IT Management Colleges in Pune 2026 | Best Tech MBA Pune",
  description: "Best MBA Information Technology Management colleges in Pune 2026. Tech MBA, IT strategy and digital transformation programs with top IT company placements.",
  path: "/mba-colleges-in-pune-for-it",
  keywords: ["mba it management pune", "mba information technology pune", "tech mba pune", "mba it colleges pune 2026", "digital transformation mba pune"],
})
export const revalidate = 300

const faqs = [
  { question: "Which Pune MBA college is best for IT Management?", answer: "MIT-SOM and SIBM Pune are the best for MBA IT Management in Pune. Pune's 500+ IT companies in Hinjewadi and Kharadi IT parks recruit MBA IT graduates for technology management, IT strategy, and digital transformation roles. Avg package: ₹10–18 LPA." },
  { question: "What is the scope of MBA IT Management from Pune?", answer: "MBA IT Management graduates from Pune are hired for IT Project Management (₹10-18 LPA), Technology Consulting (₹12-22 LPA), Product Management (₹12-25 LPA), Digital Transformation roles (₹14-24 LPA), and IT Business Analyst (₹9-16 LPA) positions at Pune's IT companies." },
]

export default function MBAForIT() {
  const faqSchema = generateFAQSchema(faqs)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" }, { name: "MBA Colleges in Pune", url: "/mba-colleges-in-pune" },
    { name: "MBA for IT", url: "/mba-colleges-in-pune-for-it" },
  ])
  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <MBAClusterPage
        h1="MBA IT Management — Colleges in Pune 2026"
        subtitle="Best MBA IT Management and Tech MBA programs in Pune with top IT company placements in Hinjewadi, Kharadi and Baner IT parks."
        quickAnswer="MIT-SOM and SIBM Pune are the best MBA IT Management colleges. Pune IT sector (TCS, Infosys, Wipro, Persistent) is the top recruiter. Avg package: ₹10–18 LPA. Admission via MAH-CET MBA."
        stats={[{ value: "6+", label: "MBA IT Colleges" }, { value: "₹10–18 LPA", label: "Avg Placement" }, { value: "IT/Consulting", label: "Top Sectors" }, { value: "MAH-CET/SNAP", label: "Exams" }]}
        colleges={mbaColleges}
        introHeading="MBA IT Management in Pune — Leveraging the IT Hub"
        introParagraphs={[
          "Pune is India's second-largest IT city with 500+ IT companies employing 800,000+ professionals. MBA IT Management graduates are in high demand for bridging the gap between technology and business strategy.",
          "MBA IT specialization covers IT strategy, enterprise architecture, cloud computing management, digital transformation, IT governance, and technology consulting — skills that command a premium in Pune's IT corridor.",
          "Key recruiters for MBA IT from Pune: TCS (IT Management), Infosys (Digital Consulting), Capgemini (Consulting), Deloitte (Tech Advisory), KPMG (Digital), and 50+ tech companies in Hinjewadi.",
        ]}
        faqs={faqs}
        internalLinks={[
          { label: "MBA for Business Analytics", href: "/mba-colleges-in-pune-for-business-analytics" },
          { label: "MBA for Finance", href: "/mba-colleges-in-pune-for-finance" },
          { label: "B.Tech Colleges Pune", href: "/btech-colleges-pune" },
          { label: "MCA Colleges Pune", href: "/mca-colleges-pune" },
        ]}
        ctaHeading="MBA IT Management in Pune — Get Guidance"
        ctaSubtext="Free counselling to find the right MBA IT college based on your B.Tech background and career goals."
      />
    </>
  )
}
