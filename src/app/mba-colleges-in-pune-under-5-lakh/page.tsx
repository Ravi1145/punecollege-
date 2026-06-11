import type { Metadata } from "next"
import Script from "next/script"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"
import { mbaColleges } from "@/data/mbaColleges"
import MBAClusterPage from "@/components/mba/MBAClusterPage"

export const metadata: Metadata = genMeta({
  title: "MBA Colleges in Pune Under 5 Lakh Total Fees 2026 | Government & Affordable",
  description: "MBA colleges in Pune with total fees under 5 lakh (2-year). PUMBA (₹2.5L), government-aided and SPPU-affiliated MBA colleges in Pune with low fees and good placements.",
  path: "/mba-colleges-in-pune-under-5-lakh",
  keywords: ["mba colleges in pune under 5 lakh", "low fee mba pune", "affordable mba pune", "mba pune government college fees", "pumba fees", "mba pune under 5 lakh total fees"],
})
export const revalidate = 300

const filtered = mbaColleges.filter(c => c.feesTotal <= 500000)

const faqs = [
  { question: "Which MBA colleges in Pune have total fees under 5 lakh?", answer: "PUMBA (Pune University MBA / SPPU) has the lowest total MBA fees of ₹2.5 lakh (₹1.25L/year × 2 years). Several SPPU-affiliated government-aided MBA colleges also charge ₹2L–4.5L total. These seats are available via MAH-CET MBA CAP rounds. Cutoff is high — PUMBA requires 95+ percentile in MAH-CET MBA." },
  { question: "Is the quality of MBA good at low-fee colleges in Pune?", answer: "PUMBA (₹2.5L total) is ranked among the top 35 MBA colleges in India by NIRF. Quality is excellent — the low fees are subsidized by the state government, not a reflection of academic standards. Placement average at PUMBA is ₹8.5 LPA — comparable to private colleges charging 3× more." },
  { question: "How to get admission in low-fee MBA colleges in Pune?", answer: "Admission to government and low-fee MBA colleges in Pune is through MAH-CET MBA. Register on the DTE Maharashtra portal after results. Fill college preferences including PUMBA and government-aided colleges. Seat allotment is merit-based. PUMBA cutoff: 95+ percentile Open category." },
  { question: "Are there any MBA scholarships to reduce fees further?", answer: "Yes. MahaDBT scholarship covers full tuition for SC/ST/OBC/EBC students at any Maharashtra college. EBC Freeship covers full fees for Open category students with family income under ₹8 lakh/year. Education loans from SBI/Bank of Maharashtra are available at 8-9% interest." },
]

export default function MBAUnder5Lakh() {
  const faqSchema = generateFAQSchema(faqs)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" }, { name: "MBA Colleges in Pune", url: "/mba-colleges-in-pune" },
    { name: "Under 5 Lakh", url: "/mba-colleges-in-pune-under-5-lakh" },
  ])
  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <MBAClusterPage
        h1="MBA Colleges in Pune Under 5 Lakh Total Fees 2026"
        subtitle="Government and SPPU-affiliated MBA colleges in Pune with total 2-year fees under ₹5 lakh. Quality education, low cost."
        quickAnswer="PUMBA (Pune University MBA) has the lowest MBA fees in Pune at ₹2.5 lakh total (₹1.25L/yr). Admission via MAH-CET MBA — cutoff is 95+ percentile Open category. Several SPPU-affiliated colleges also offer MBA under ₹5L total."
        stats={[
          { value: `${filtered.length}+`, label: "Colleges Under ₹5L" },
          { value: "₹1.25L/yr", label: "Lowest (PUMBA)" },
          { value: "₹8.5 LPA", label: "PUMBA Avg Pkg" },
          { value: "MAH-CET", label: "Entrance Exam" },
        ]}
        colleges={mbaColleges}
        filterFn={c => c.feesTotal <= 500000}
        introHeading="MBA Under 5 Lakh in Pune — Is It Worth It?"
        introParagraphs={[
          "MBA colleges in Pune under ₹5 lakh are primarily government institutions and SPPU-affiliated colleges that receive state government grants, allowing them to charge significantly lower fees than private or deemed university programs.",
          "PUMBA (Department of Management Sciences, SPPU) is the gold standard of affordable MBA in Pune. With NIRF rank 35, average placement of ₹8.5 LPA, and total fees of just ₹2.5 lakh, PUMBA offers exceptional return on investment. However, admission requires 95+ percentile in MAH-CET MBA for Open category.",
          "For students who cannot achieve PUMBA's cutoff, several SPPU-affiliated MBA colleges charge ₹3L–4.5L total with reasonable placement outcomes. These are filled in later CAP rounds with lower percentile requirements.",
        ]}
        faqs={faqs}
        internalLinks={[
          { label: "MBA Colleges in Pune", href: "/mba-colleges-in-pune" },
          { label: "MBA Under 10 Lakh", href: "/mba-colleges-in-pune-under-10-lakh" },
          { label: "MBA Accepting MAH-CET", href: "/mba-colleges-in-pune-accepting-mh-cet" },
          { label: "MBA Scholarship Pune", href: "/mba-colleges-in-pune-scholarship" },
          { label: "Government Colleges Pune", href: "/government-colleges-pune" },
          { label: "Low Fees MBA Pune", href: "/low-fees-mba-colleges-pune" },
        ]}
        ctaHeading="Want Help Getting Into PUMBA or Low-Fee MBA?"
        ctaSubtext="Our counsellors know the exact MAH-CET cutoff strategy for PUMBA. Free guidance — book now."
      />
    </>
  )
}
