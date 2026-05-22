import type { Metadata } from "next"
import Script from "next/script"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"
import SEOLandingPage from "@/components/seo/SEOLandingPage"

export const metadata: Metadata = genMeta({
  title: "Top Engineering Colleges in Pune 2026 | Rankings, Fees & Placements",
  description: "Discover the top engineering colleges in Pune for 2026 admission. Ranked by NIRF, NAAC, fees (₹80K-4.8L/yr), and placement packages. COEP, PICT, VIT Pune, SIT Pune & more.",
  path: "/top-engineering-colleges-pune",
  keywords: ["top engineering colleges pune", "best engineering colleges in pune 2026", "top btech colleges pune", "ranked engineering colleges pune"],
})

export const revalidate = 300

const colleges = [
  { name: "College of Engineering Pune (COEP)", location: "Shivajinagar", naac: "A+", fees: "₹80K-1.8L/yr", placement: "₹12 LPA avg", slug: "coep-college-of-engineering-pune" },
  { name: "Pune Institute of Computer Technology (PICT)", location: "Dhankawadi", naac: "A", fees: "₹1.4L-1.9L/yr", placement: "₹7.5 LPA avg", slug: "pict-pune-institute-of-computer-technology" },
  { name: "Vishwakarma Institute of Technology (VIT Pune)", location: "Bibwewadi", naac: "A+", fees: "₹1.6L-2.2L/yr", placement: "₹8.5 LPA avg", slug: "vit-pune-vishwakarma-institute-of-technology" },
  { name: "Symbiosis Institute of Technology (SIT)", location: "Lavale", naac: "A+", fees: "₹3.6L-4.8L/yr", placement: "₹9.8 LPA avg", slug: "symbiosis-institute-of-technology-pune" },
  { name: "MIT World Peace University (MIT-WPU)", location: "Kothrud", naac: "A+", fees: "₹2.0L-3.8L/yr", placement: "₹7.2 LPA avg", slug: "mit-wpu-mit-world-peace-university" },
  { name: "Cummins College of Engineering for Women", location: "Karvenagar", naac: "A+", fees: "₹1.3L-1.75L/yr", placement: "₹6.8 LPA avg", slug: "cummins-college-of-engineering-pune" },
  { name: "JSPM Rajarshi Shahu College of Engineering", location: "Tathawade", naac: "A", fees: "₹1.2L-1.7L/yr", placement: "₹5.2 LPA avg", slug: "jspm-rscoe-rajarshi-shahu-college-of-engineering" },
  { name: "Sinhgad College of Engineering", location: "Vadgaon", naac: "A", fees: "₹1.15L-1.6L/yr", placement: "₹4.9 LPA avg", slug: "sinhgad-college-of-engineering-pune" },
]

const faqs = [
  { q: "Which is the top engineering college in Pune?", a: "COEP (College of Engineering Pune) is the top engineering college in Pune with NIRF Rank 49, NAAC A+, fees from ₹80K/year, and ₹12 LPA average placement. It is a 170-year-old government autonomous institution." },
  { q: "What is the ranking of engineering colleges in Pune?", a: "Top ranked: 1. COEP (NIRF 49), 2. VIT Pune (NIRF 101), 3. PICT (not NIRF ranked but top for CS), 4. SIT Pune (Symbiosis), 5. MIT-WPU. These rankings are based on NIRF, NAAC grades, and placement data." },
  { q: "How to get into top engineering colleges in Pune?", a: "Clear MHT-CET (aim 95+ percentile for COEP/PICT) or JEE Main. Register on MHT-CET CAP portal and participate in centralized admission rounds. For deemed universities like SIT Pune, apply directly with JEE/SET scores." },
  { q: "What is the fee structure of top engineering colleges in Pune?", a: "COEP: ₹80K/yr (government), VIT Pune: ₹1.6L-2.2L/yr (autonomous), SIT Pune: ₹3.6L-4.8L/yr (deemed). Government colleges are cheapest, deemed universities are most expensive but offer premium placement." },
  { q: "Do top Pune engineering colleges offer hostel facilities?", a: "Yes. COEP, VIT Pune, SIT Pune, MIT-WPU, and Cummins all offer hostel facilities. COEP hostels cost approximately ₹60,000-80,000/year. Private colleges offer both on-campus and off-campus accommodation options." },
]

export default function TopEngineeringCollegesPunePage() {
  const faqSchema = generateFAQSchema(faqs.map(f => ({ question: f.q, answer: f.a })))
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Top Engineering Colleges Pune", url: "/top-engineering-colleges-pune" },
  ])
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Top Engineering Colleges in Pune 2026",
    numberOfItems: colleges.length,
    itemListElement: colleges.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      url: `https://collegepune.com/colleges/${c.slug}`,
    })),
  }

  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Script id="itemlist-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <SEOLandingPage
        breadcrumb={[{ label: "Top Engineering Colleges in Pune", href: "/top-engineering-colleges-pune" }]}
        h1="Top Engineering Colleges in Pune 2026"
        subtitle="Ranked by NIRF, NAAC grades, fees, and placement packages - the definitive guide to the best engineering institutions in Pune for 2026 admission."
        heroStats={[
          { value: "50+", label: "Engineering Colleges" },
          { value: "NIRF #49", label: "Best Rank (COEP)" },
          { value: "₹12 LPA", label: "Best Avg Placement" },
          { value: "MHT-CET/JEE", label: "Primary Entrance" },
        ]}
        introHeading="Top Engineering Colleges in Pune: 2026 Ranking Guide"
        introParagraphs={[
          "Pune is home to some of India's most respected engineering colleges, with a legacy dating back to 1854 when the College of Engineering Pune (COEP) was established. Today, the city hosts 50+ AICTE-approved engineering institutions ranging from government autonomous colleges with fees as low as ₹80,000/year to premium deemed universities with world-class facilities.",
          "Ranking Pune engineering colleges requires evaluating multiple factors: NIRF national ranking, NAAC accreditation grade, annual fees and scholarship availability, placement statistics (average and highest packages), faculty-student ratio, infrastructure, and research output. This guide synthesizes all these parameters for 2026 admissions.",
          "The top engineering colleges in Pune maintain strong industry connections with Pune's thriving auto, IT, and manufacturing sectors. Companies like Bajaj Auto, Tata Motors, Infosys, TCS, L&T, and global MNCs conduct campus placements every year, ensuring excellent career outcomes for graduates.",
        ]}
        colleges={colleges}
        whyHeading="Why Pune Engineering Colleges Rank Among India's Best"
        whyPoints={[
          { title: "NIRF Top 101 Institutions", description: "COEP (NIRF #49) and VIT Pune (NIRF #101) are among India's top 101 engineering institutions, validated by the Ministry of Education's independent ranking framework." },
          { title: "Industry-Integrated Curriculum", description: "Top Pune engineering colleges offer internship programs with Bajaj Auto, Thermax, Cummins India, and 500+ IT companies, bridging the gap between academia and industry requirements." },
          { title: "Research & Innovation Culture", description: "COEP's startup incubation center, MIT-WPU's innovation lab, and SIT Pune's research clusters produce 100+ patents annually, making them nationally recognized research institutions." },
          { title: "Diverse Branch Options", description: "From Computer Science to Mechanical, Civil, Electronics, Chemical, and emerging AI/ML engineering specializations - Pune colleges offer 30+ branch options to match every interest." },
          { title: "Government Scholarship Access", description: "Students admitted via MHT-CET CAP rounds to government-aided colleges qualify for EBC scholarship, merit scholarship, and central government schemes covering up to 100% fees." },
          { title: "Alumni Network Strength", description: "COEP and PICT alumni communities span Google, Microsoft, Infosys, and Bajaj Auto leadership, providing mentorship, job referrals, and startup funding access to current students." },
        ]}
        admissionHeading="How to Get Admission in Top Engineering Colleges in Pune 2026"
        admissionSteps={[
          { step: "1", title: "Register for MHT-CET 2026", description: "Fill the MHT-CET application form at mahacet.org between January-February 2026. Pay application fee of ₹800 (general) or ₹600 (reserved categories). Aim for 95+ percentile for COEP/PICT." },
          { step: "2", title: "Appear for Entrance Exam", description: "MHT-CET is conducted in April-May 2026. JEE Main (January and April sessions) is also accepted at COEP, VIT Pune, SIT Pune, and MIT-WPU for management quota and some general seats." },
          { step: "3", title: "Fill CAP Registration Form", description: "After results (June), register on the MHT-CET CAP portal (cetcell.mahacet.org). Upload documents, verify eligibility, and fill college preferences in your preferred order." },
          { step: "4", title: "CAP Rounds & Seat Allotment", description: "Three CAP rounds are conducted in July-August. Accept the allotment within the deadline and pay seat acceptance fee (₹5,000-15,000) to confirm. If not satisfied, wait for next round." },
          { step: "5", title: "Report to College", description: "Report to the allotted college with original documents (10th/12th marksheets, CET scorecard, caste/domicile certificates, Aadhar, photos) within the specified deadline and pay full fees." },
        ]}
        faqs={faqs}
        ctaHeading="Find Your Perfect Engineering College in Pune"
        ctaSubtext="Use our AI-powered college finder to match your MHT-CET percentile with the best engineering colleges in Pune. Free, personalized guidance from expert counsellors."
      relatedGuides={[
        { label: "Best Engineering Colleges in Pune 2026", href: "/engineering-colleges-pune", icon: "🏛️" },
        { label: "Top 10 Engineering Colleges — Ranked", href: "/top-10-engineering-colleges-in-pune", icon: "🏆" },
        { label: "Placement Stats — Avg & Highest LPA", href: "/engineering-colleges-pune-placement", icon: "💼" },
        { label: "Low Fees Engineering Colleges", href: "/low-fees-engineering-colleges-pune", icon: "💰" },
        { label: "Engineering Scholarships in Pune", href: "/engineering-colleges-pune-scholarship", icon: "🎓" },
        { label: "MHT-CET Colleges & Cutoffs 2026", href: "/mht-cet-colleges-pune", icon: "📝" },
        { label: "JEE Main Colleges in Pune", href: "/jee-colleges-pune", icon: "📚" },
        { label: "Computer Engineering Colleges Pune", href: "/computer-engineering-colleges-pune", icon: "💻" },
        { label: "Government Colleges in Pune", href: "/government-colleges-pune", icon: "🏛️" },
      ]}
      />
    </>
  )
}
