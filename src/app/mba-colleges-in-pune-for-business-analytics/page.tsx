import type { Metadata } from "next"
import Script from "next/script"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"
import { mbaColleges } from "@/data/mbaColleges"
import MBAClusterPage from "@/components/mba/MBAClusterPage"

export const metadata: Metadata = genMeta({
  title: "MBA Business Analytics Colleges in Pune 2026 | Top Data-Driven MBA",
  description: "Best MBA Business Analytics colleges in Pune 2026. MIT-SOM, SIBM, SCMHRD with data science, AI and analytics placements. Fees, cutoffs and admission guide.",
  path: "/mba-colleges-in-pune-for-business-analytics",
  keywords: ["mba business analytics pune", "mba data analytics pune", "mba analytics colleges pune", "business analytics mba pune 2026", "mba analytics fees pune"],
})
export const revalidate = 300

const faqs = [
  { question: "Which college in Pune offers MBA Business Analytics?", answer: "Top MBA Business Analytics colleges in Pune: MIT-SOM (dedicated Business Analytics MBA), SIBM Pune (Analytics electives), SCMHRD (Business Analytics major), and FLAME University (Data Analytics focus). MIT-SOM has a dedicated MBA in Business Analytics program with Python, R, Tableau, and ML curriculum." },
  { question: "What is the salary for MBA Business Analytics from Pune?", answer: "MBA Business Analytics placements in Pune: ₹12–18 LPA average at MIT-SOM Analytics, ₹18–24 LPA at SIBM/SCMHRD Analytics track. Top packages reach ₹40–85 LPA for Analytics + Finance combined roles. Analytics MBA commands 25–35% salary premium over general MBA in Pune." },
  { question: "What skills are needed for MBA Business Analytics in Pune?", answer: "MBA Business Analytics programs in Pune cover: Python, R, SQL, Tableau, Power BI, Machine Learning, Statistical Analysis, Big Data (Hadoop/Spark), Data Visualization, and business problem-solving. Prior technical background (B.Tech, BCA, BSc CS) is advantageous but not mandatory." },
  { question: "What are the career options after MBA Business Analytics from Pune?", answer: "Career paths after MBA Analytics from Pune: Data Analyst (₹6–12 LPA), Business Analyst (₹8–15 LPA), Product Analyst (₹10–20 LPA), Analytics Manager (₹15–30 LPA), Data Science Manager (₹18–40 LPA), and Chief Data Officer track. IT companies in Hinjewadi/Kharadi hire most Analytics MBAs from Pune." },
]

export default function MBABusinessAnalytics() {
  const faqSchema = generateFAQSchema(faqs)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" }, { name: "MBA Colleges in Pune", url: "/mba-colleges-in-pune" },
    { name: "Business Analytics", url: "/mba-colleges-in-pune-for-business-analytics" },
  ])
  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <MBAClusterPage
        h1="MBA Business Analytics Colleges in Pune 2026"
        subtitle="Top MBA Business Analytics and Data Analytics programs in Pune. High-demand specialization with ₹12–24 LPA average placements."
        quickAnswer="MIT-SOM has Pune's best dedicated MBA Business Analytics program. SIBM and SCMHRD offer Analytics tracks. Analytics MBAs earn 25-35% more than general MBA in Pune (avg ₹12–18 LPA). Admission via MAH-CET MBA / CAT."
        stats={[
          { value: "5+", label: "Analytics MBA Colleges" },
          { value: "₹12–24 LPA", label: "Avg Placement" },
          { value: "IT/Consulting", label: "Top Recruiters" },
          { value: "+30%", label: "Salary Premium" },
        ]}
        colleges={mbaColleges.filter(c => c.specializations.includes("Business Analytics") || c.specializations.includes("Data Analytics"))}
        introHeading="MBA Business Analytics in Pune — The Fastest Growing MBA Specialization"
        introParagraphs={[
          "MBA Business Analytics is the fastest growing MBA specialization in Pune, driven by explosive demand from Pune's IT sector (500+ companies in Hinjewadi, Kharadi), manufacturing companies digitizing operations, and BFSI firms implementing data-driven decision making.",
          "Unlike traditional MBA specializations, Business Analytics combines management skills with technical data skills — Python, R, SQL, Machine Learning, and Tableau. This combination makes Analytics MBA graduates 40–60% more employable in Pune's IT corridor compared to single-domain specializations.",
          "Pune's position as India's second-largest IT city (after Bengaluru) ensures that MBA Analytics graduates from good Pune colleges receive 5–8 campus offers on average, with a significant portion from Pune-based companies like Persistent, Zensar, KPIT, and Cyient.",
        ]}
        faqs={faqs}
        internalLinks={[
          { label: "MBA for Finance", href: "/mba-colleges-in-pune-for-finance" },
          { label: "MBA for Marketing", href: "/mba-colleges-in-pune-for-marketing" },
          { label: "MBA for IT Management", href: "/mba-colleges-in-pune-for-it" },
          { label: "MBA Placements Pune", href: "/mba-placements-pune" },
          { label: "Data Science Colleges Pune", href: "/data-science-colleges-pune" },
        ]}
        ctaHeading="MBA Analytics — Is It Right for You?"
        ctaSubtext="Free career counselling to assess if MBA Analytics fits your background and career goals."
      />
    </>
  )
}
