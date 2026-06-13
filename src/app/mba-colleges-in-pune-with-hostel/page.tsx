import type { Metadata } from "next"
import Script from "next/script"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"
import { mbaColleges } from "@/data/mbaColleges"
import MBAClusterPage from "@/components/mba/MBAClusterPage"

export const metadata: Metadata = genMeta({
  title: "MBA Colleges in Pune with Hostel 2026 | On-Campus Accommodation",
  description: "MBA colleges in Pune with on-campus hostel facility 2026. Boys and girls hostel, fees, facilities and safety for outstation MBA students in Pune.",
  path: "/mba-colleges-in-pune-with-hostel",
  keywords: ["mba colleges in pune with hostel", "mba hostel pune", "mba colleges pune hostel facility", "mba colleges pune accommodation", "outstation mba students pune hostel"],
})
export const revalidate = 300

const faqs = [
  { question: "Which MBA colleges in Pune have hostel facility?", answer: "MBA colleges in Pune with on-campus hostel: SIBM Pune (Lavale campus, separate boys/girls hostels), SCMHRD (Hinjewadi, residential campus), MIT-SOM (Kothrud, limited hostel), FLAME University (Lavale, fully residential), DYPIM (Akurdi, hostel available), BVIMR (Dhankawadi, hostel). PUMBA does not have dedicated hostel but SPPU campus has limited PG accommodation." },
  { question: "What is the hostel fee for MBA colleges in Pune?", answer: "MBA hostel fees in Pune: SIBM Pune hostel â‚¹1.2â€“1.8L/year (included in total cost), SCMHRD hostel â‚¹80,000â€“1.2L/year, FLAME University fully residential (included in â‚¹16L/yr program fee), MIT-SOM hostel â‚¹60,000â€“80,000/year, Private PG near MBA colleges â‚¹5,000â€“12,000/month." },
  { question: "Is hostel compulsory at SIBM Pune or SCMHRD?", answer: "FLAME University hostel is essentially compulsory (residential campus model). SIBM Pune and SCMHRD hostels are optional but highly recommended for outstation students â€” both colleges are on the outskirts of Pune (Lavale) with limited external accommodation. Most outstation students choose on-campus hostel at these colleges." },
  { question: "Are MBA hostels safe in Pune for outstation students?", answer: "Yes, all major Pune MBA college hostels are safe with 24Ã—7 security, CCTV, warden facilities, and entry-exit management. Girls hostels have additional security protocols. Pune overall is one of India's safest cities for students with a large student population of 200,000+." },
]

export default function MBAWithHostel() {
  const faqSchema = generateFAQSchema(faqs)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" }, { name: "MBA Colleges in Pune", url: "/mba-colleges-in-pune" },
    { name: "With Hostel", url: "/mba-colleges-in-pune-with-hostel" },
  ])
  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <MBAClusterPage
        h1="MBA Colleges in Pune with Hostel 2026"
        subtitle="On-campus hostel facilities at top Pune MBA colleges. Hostel fees, facilities and accommodation options for outstation MBA students."
        quickAnswer="SIBM Pune, SCMHRD, FLAME, MIT-SOM, DYPIM and BVIMR all offer on-campus hostel for MBA students. SIBM and SCMHRD hostels are residential campus â€” most outstation students stay on campus. Hostel fees: â‚¹60Kâ€“1.8L/year extra."
        stats={[
          { value: "6+", label: "Hostels Available" },
          { value: "â‚¹60Kâ€“1.8L", label: "Hostel Fees/yr" },
          { value: "24Ã—7", label: "Security" },
          { value: "Boys/Girls", label: "Separate Hostels" },
        ]}
                colleges={mbaColleges.filter(c => c.hostel)}
        introHeading="MBA Hostel Facilities in Pune â€” What to Expect"
        introParagraphs={[
          "Outstation MBA students in Pune have excellent hostel options â€” most top MBA colleges offer on-campus residential facilities at â‚¹60,000â€“1.8 lakh per year. Living on campus is highly beneficial for networking, group study, and making the most of college events and placement preparation.",
          "SIBM Pune and SCMHRD have particularly well-equipped residential campuses at Lavale â€” with food courts, sports facilities, libraries, and gym. The Lavale area doesn't have much external PG accommodation, making on-campus hostel the practical choice.",
          "For MBA colleges in central Pune (MIT-SOM, BVIMR, PUMBA), students can also choose from hundreds of PG accommodations and apartments near the campus at â‚¹5,000â€“12,000/month, giving more flexibility and privacy.",
        ]}
        faqs={faqs}
        internalLinks={[
          { label: "MBA Colleges in Pune", href: "/mba-colleges-in-pune" },
          { label: "MBA for Girls Pune", href: "/mba-colleges-in-pune-for-girls" },
          { label: "Colleges with Hostel Pune", href: "/colleges-in-pune-with-hostel" },
          { label: "MBA Scholarship Pune", href: "/mba-colleges-in-pune-scholarship" },
        ]}
        ctaHeading="Planning to Stay in Hostel During MBA?"
        ctaSubtext="Get hostel availability and booking guidance from our counsellors â€” free."
      />
    </>
  )
}
