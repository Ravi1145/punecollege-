import type { Metadata } from "next"
import Script from "next/script"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"
import { mbaColleges } from "@/data/mbaColleges"
import MBAClusterPage from "@/components/mba/MBAClusterPage"

export const metadata: Metadata = genMeta({
  title: "MBA Colleges in Pune Under 10 Lakh Total Fees 2026 | Best Value MBA",
  description: "Top MBA colleges in Pune under 10 lakh total fees (2-year). Compare fees, placements, MAH-CET cutoffs for affordable MBA in Pune with good placement records.",
  path: "/mba-colleges-in-pune-under-10-lakh",
  keywords: ["mba colleges in pune under 10 lakh", "mba pune 10 lakh fees", "affordable mba pune 10 lakh", "mba under 10 lakh pune 2026"],
})
export const revalidate = 300

const faqs = [
  { question: "Which are the best MBA colleges in Pune under 10 lakh total fees?", answer: "Best MBA colleges in Pune under â‚¹10 lakh total: PUMBA (â‚¹2.5L), Indira Institute of Management (â‚¹9L), BVIMR (â‚¹7L), and DYPIM (â‚¹12L). These colleges offer NAAC accreditation, good placements (â‚¹6.5â€“9 LPA avg), and accept MAH-CET MBA scores." },
  { question: "What is the MAH-CET cutoff for MBA colleges under 10 lakh in Pune?", answer: "MBA colleges in Pune under â‚¹10 lakh have MAH-CET cutoffs ranging from 70â€“90 percentile for Open category. PUMBA (â‚¹2.5L) requires 95+ percentile. IIMP (â‚¹9L) accepts 70-80 percentile. BVIMR (â‚¹7L) accepts 65-75 percentile." },
  { question: "Is MBA from affordable Pune colleges placement-worthy?", answer: "Yes. PUMBA (â‚¹2.5L total) has â‚¹8.5 LPA average placement. Indira MBA (â‚¹9L) achieves â‚¹7.5 LPA. These colleges have consistent placement records with IT, BFSI, and consulting firms. ROI is higher than premium colleges when you factor in the lower investment." },
]

export default function MBAUnder10Lakh() {
  const faqSchema = generateFAQSchema(faqs)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" }, { name: "MBA Colleges in Pune", url: "/mba-colleges-in-pune" },
    { name: "Under 10 Lakh", url: "/mba-colleges-in-pune-under-10-lakh" },
  ])
  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <MBAClusterPage
        h1="MBA Colleges in Pune Under 10 Lakh Total Fees 2026"
        subtitle="Best value MBA colleges in Pune with total 2-year fees under â‚¹10 lakh. Good placements, NAAC accreditation, MAH-CET admission."
        quickAnswer="MBA colleges in Pune under â‚¹10 lakh include PUMBA (â‚¹2.5L), BVIMR (â‚¹7L), and Indira MBA (â‚¹9L). These colleges offer NAAC-accredited programs with â‚¹6.5â€“8.5 LPA average placements. Admission via MAH-CET MBA â€” cutoffs range 65â€“95 percentile."
        stats={[
          { value: "5+", label: "Colleges Under â‚¹10L" },
          { value: "â‚¹2.5Lâ€“9L", label: "Total Fees Range" },
          { value: "â‚¹6.5â€“8.5 LPA", label: "Avg Placement" },
          { value: "MAH-CET", label: "Primary Exam" },
        ]}
                colleges={mbaColleges.filter(c => c.feesTotal <= 1000000)}
        introHeading="Why Choose MBA Under 10 Lakh in Pune?"
        introParagraphs={[
          "Pune offers excellent MBA programs under â‚¹10 lakh total that provide strong returns on investment. These colleges â€” primarily government and SPPU-affiliated â€” have built decades of industry relationships and deliver consistent placements despite their affordable fee structures.",
          "The key advantage of MBA under â‚¹10 lakh in Pune: you graduate with minimal or no education loan burden. With â‚¹6.5â€“8.5 LPA average placements, you can repay any remaining loan within 1â€“2 years, vs. 4â€“6 years for premium MBA programs costing â‚¹25â€“32 lakh.",
        ]}
        faqs={faqs}
        internalLinks={[
          { label: "MBA Under 5 Lakh", href: "/mba-colleges-in-pune-under-5-lakh" },
          { label: "MBA Under 15 Lakh", href: "/mba-colleges-in-pune-under-15-lakh" },
          { label: "MBA Colleges in Pune", href: "/mba-colleges-in-pune" },
          { label: "MBA Scholarship Pune", href: "/mba-colleges-in-pune-scholarship" },
          { label: "MBA Placements Pune", href: "/mba-placements-pune" },
        ]}
        ctaHeading="Find the Best MBA Under 10 Lakh in Pune"
        ctaSubtext="Free counselling to identify the best value MBA college for your MAH-CET score and career goals."
      />
    </>
  )
}
