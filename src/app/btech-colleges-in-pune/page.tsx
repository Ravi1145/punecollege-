import type { Metadata } from "next"
import Script from "next/script"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema, generateCollegeListSchema } from "@/lib/seo"
import { btechColleges, btechFAQs } from "@/data/btechColleges"
import BTechClusterPage from "@/components/btech/BTechClusterPage"

export const metadata: Metadata = genMeta({
  title: "BTech Colleges in Pune 2026 | Complete List | Fees, Cutoff & Placement",
  description: "Complete list of 50+ BTech colleges in Pune 2026. Compare fees (₹80K–4.8L/yr), MHT-CET cutoffs, average placements (₹5–12 LPA), NAAC grades for B.Tech admission in Pune.",
  path: "/btech-colleges-in-pune",
  keywords: [
    "btech colleges in pune", "b.tech colleges in pune", "btech colleges pune 2026",
    "btech admission pune", "btech colleges pune list", "engineering colleges in pune",
    "btech pune fees", "btech cutoff pune", "btech placement pune",
  ],
})
export const revalidate = 300

export default function BTechCollegesInPune() {
  const faqSchema = generateFAQSchema(btechFAQs.general)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "BTech Colleges in Pune", url: "/btech-colleges-in-pune" },
  ])
  const itemListSchema = generateCollegeListSchema(
    btechColleges.map(c => ({ name: c.name, slug: c.slug, description: c.highlights[0] })),
    "BTech Colleges in Pune 2026"
  )
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Bachelor of Technology (B.Tech)",
    description: "4-year undergraduate engineering degree offered at 50+ AICTE-approved colleges in Pune. Admission via MHT-CET and JEE Main.",
    provider: { "@type": "City", name: "Pune", sameAs: "https://en.wikipedia.org/wiki/Pune" },
    timeRequired: "P4Y",
    educationalCredentialAwarded: "B.Tech",
    offers: { "@type": "AggregateOffer", priceCurrency: "INR", lowPrice: 80000, highPrice: 480000, offerCount: 50 },
  }

  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Script id="itemlist-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <Script id="course-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />

      {/* Server-rendered intro — visible to crawlers without JS, prevents thin-content flag */}
      <div className="sr-only" aria-hidden="false">
        <h1>BTech Colleges in Pune 2026</h1>
        <p>Pune has 50+ AICTE-approved BTech colleges across government, autonomous, private and deemed university categories.
        B.Tech (Bachelor of Technology) is a 4-year undergraduate engineering degree. Admission is primarily through
        MHT-CET (Maharashtra Common Entrance Test) via DTE Maharashtra CAP rounds.</p>
        <p>Best BTech colleges in Pune: COEP (NIRF rank 49, government, fees ₹80,000 per year, average placement ₹12 LPA),
        PICT Pune (best for Computer Science, Goldman Sachs recruiter, fees ₹1.4 lakh per year, average placement ₹7.5 LPA),
        VIT Pune (NAAC A+, NIRF rank 101, fees ₹1.6 lakh per year, average placement ₹8.5 LPA),
        MIT-WPU (NAAC A+, AI and ML branches available, fees ₹2 lakh per year),
        SIT Pune (highest private placement ₹9.8 LPA, Microsoft and Amazon recruiter).</p>
        <p>MHT-CET cutoffs for top BTech colleges in Pune 2026: COEP Computer Engineering requires 99 percentile or above.
        PICT requires 97 to 99 percentile. VIT Pune requires 92 to 97 percentile. MIT-WPU requires 82 to 90 percentile.
        JEE Main is not required for MHT-CET seats. Direct admission through management quota is available at private colleges.</p>
        <p>BTech fees in Pune range from ₹80,000 per year at COEP (government) to ₹4.8 lakh per year at SIT Pune (deemed university).
        Scholarships including MahaDBT, EBC Freeship, and AICTE Pragati can reduce fees significantly for eligible students.
        Average BTech placement packages from Pune colleges range from ₹5 LPA at tier-3 colleges to ₹12 LPA at COEP.</p>
      </div>

      <BTechClusterPage
        h1="BTech Colleges in Pune 2026"
        subtitle="Complete list of 50+ BTech engineering colleges in Pune. Compare fees, MHT-CET cutoffs, placements, NAAC grades and admission process for 2026."
        quickAnswer="Pune has 50+ BTech colleges. COEP (NIRF #49, ₹80K/yr, avg ₹12 LPA) is the best government BTech college. PICT is best for CS/IT (₹7.5 LPA avg, Goldman Sachs recruiter). Admission is primarily via MHT-CET; JEE Main for management quota. Fees range ₹80K–4.8L/year."
        stats={[
          { value: "50+", label: "BTech Colleges" },
          { value: "₹80K–4.8L", label: "Annual Fees" },
          { value: "₹5–12 LPA", label: "Avg Placement" },
          { value: "MHT-CET", label: "Primary Exam" },
        ]}
        colleges={btechColleges}
        introHeading="BTech Colleges in Pune — Complete Guide 2026"
        introParagraphs={[
          "Pune is one of India's top cities for BTech education, offering 50+ AICTE-approved colleges across government, autonomous, private, and deemed university categories. The city's unique industrial base — India's largest auto manufacturing cluster, a major IT corridor, and defence/aerospace R&D — gives BTech graduates from Pune direct access to diverse and high-paying career paths.",
          "B.Tech (Bachelor of Technology) is a 4-year undergraduate engineering degree. In Pune, admission is primarily through MHT-CET (Maharashtra Common Entrance Test), managed by DTE Maharashtra through the CAP (Centralized Admission Process). Most colleges also accept JEE Main scores for management quota seats.",
          "Pune BTech colleges span a wide range: COEP (Government, ₹80K/yr, NIRF #49) at the top to mid-range autonomous colleges (PICT, VIT Pune, PCCOE at ₹1.4L–2.2L/yr) to premium deemed universities (SIT Pune, MIT-WPU at ₹3.6L–4.8L/yr). Branches range from traditional CS/Mechanical/Civil to cutting-edge AI, Data Science, Robotics, and Cybersecurity.",
        ]}
        faqs={btechFAQs.general}
        internalLinks={[
          { label: "Best BTech Colleges Pune", href: "/best-btech-colleges-in-pune" },
          { label: "BTech with Fees", href: "/btech-colleges-in-pune-with-fees" },
          { label: "BTech Placements", href: "/btech-colleges-in-pune-with-placement" },
          { label: "BTech via MHT-CET", href: "/btech-colleges-in-pune-through-mht-cet" },
          { label: "BTech without JEE", href: "/btech-colleges-in-pune-without-jee" },
          { label: "BTech Under 5 Lakh", href: "/btech-colleges-in-pune-under-5-lakh" },
          { label: "BTech Under 10 Lakh", href: "/btech-colleges-in-pune-under-10-lakh" },
          { label: "Direct Admission BTech", href: "/btech-colleges-in-pune-direct-admission" },
          { label: "BTech Admission Guide", href: "/btech-admission-in-pune" },
        ]}
        ctaHeading="Find the Right BTech College in Pune"
        ctaSubtext="Free personalised guidance from our Pune engineering college counsellors — 15 minutes, zero cost."
      />
    </>
  )
}
