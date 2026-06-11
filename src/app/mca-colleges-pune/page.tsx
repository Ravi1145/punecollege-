import type { Metadata } from "next"
import Script from "next/script"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"
import SEOLandingPage from "@/components/seo/SEOLandingPage"

export const metadata: Metadata = genMeta({
  title: "MCA Colleges in Pune 2025-26 | Fees, Cutoff & Placements | CollegePune",
  description: "Top MCA colleges in Pune 2025-26. Compare fees (₹40K–2.2L/yr), MAH-MCA-CET cutoffs, placements (avg ₹5–10 LPA), eligibility & direct admission options.",
  path: "/mca-colleges-pune",
  keywords: ["mca colleges in pune", "mca colleges pune 2025", "mca admission pune", "mca fees pune", "mah mca cet pune colleges", "best mca college pune"],
})

export const revalidate = 300

const colleges = [
  { name: "MIT World Peace University (MIT-WPU)", location: "Kothrud", naac: "A+", fees: "₹1.3L–1.8L/yr", placement: "₹8.2 LPA avg", slug: "mit-wpu-mit-world-peace-university" },
  { name: "Savitribai Phule Pune University (SPPU)", location: "Ganeshkhind", naac: "A++", fees: "₹40K–60K/yr", placement: "₹5.5 LPA avg", slug: "coep-college-of-engineering-pune" },
  { name: "Pune Institute of Computer Technology (PICT)", location: "Dhankawadi", naac: "A", fees: "₹1.1L–1.5L/yr", placement: "₹6.8 LPA avg", slug: "pict-pune-institute-of-computer-technology" },
  { name: "Vishwakarma Institute of Technology (VIT Pune)", location: "Bibwewadi", naac: "A+", fees: "₹1.2L–1.6L/yr", placement: "₹7.1 LPA avg", slug: "vit-pune-vishwakarma-institute-of-technology" },
  { name: "D.Y. Patil International University", location: "Akurdi", naac: "A+", fees: "₹1.5L–2.2L/yr", placement: "₹6.5 LPA avg", slug: "dy-patil-university-pune" },
  { name: "Symbiosis Institute of Computer Studies and Research (SICSR)", location: "Senapati Bapat Road", naac: "A++", fees: "₹1.6L–2.0L/yr", placement: "₹8.5 LPA avg", slug: "symbiosis-institute-of-technology-pune" },
]

const faqs = [
  { q: "What is the MCA admission process in Pune?", a: "MCA admission in Pune is through MAH-MCA-CET (Maharashtra MCA Common Entrance Test), conducted by State CET Cell. After the exam, DTE Maharashtra conducts a Centralized Admission Process (CAP). Some private deemed universities conduct their own entrance tests." },
  { q: "What is the eligibility for MCA in Pune?", a: "For MCA admission in Pune, you need a BCA / BSc (CS/IT/Mathematics) / B.Tech degree with minimum 50% aggregate marks (45% for reserved categories). Mathematics at 10+2 or graduation level is mandatory at most colleges." },
  { q: "What is the MCA fees in Pune colleges?", a: "MCA fees in Pune range from ₹40,000–60,000/year at government/SPPU colleges to ₹1.5L–2.2L/year at private institutes. Total 2-year MCA cost ranges from ₹80K (SPPU) to ₹4.4L (private deemed)." },
  { q: "What is the average placement package after MCA from Pune?", a: "MCA graduates from top Pune colleges get average placement packages of ₹5–10 LPA. PICT and MIT-WPU MCA students have received packages of up to ₹18 LPA from companies like Persistent, Infosys, TCS and product startups." },
  { q: "Can I do MCA after BBA or BCom in Pune?", a: "No. MCA requires a science/mathematics background. You need BCA, BSc (CS/IT), B.Sc (Mathematics), or B.Tech degree. BBA/BCom graduates without Mathematics cannot directly apply for MCA in Maharashtra." },
]

export default function MCACollegesPune() {
  const faqSchema = generateFAQSchema(faqs.map(f => ({ question: f.q, answer: f.a })))
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "MCA Colleges in Pune", url: "/mca-colleges-pune" },
  ])
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "MCA Colleges in Pune 2025",
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
        breadcrumb={[{ label: "MCA Colleges in Pune", href: "/mca-colleges-pune" }]}
        h1="MCA Colleges in Pune 2025-26"
        subtitle="Find top MCA (Master of Computer Applications) colleges in Pune. Compare fees, MAH-MCA-CET cutoffs, placements and admission process for 2025-26."
        heroStats={[
          { value: "30+", label: "MCA Colleges" },
          { value: "₹40K–2.2L", label: "Annual Fees" },
          { value: "2 Years", label: "Duration" },
          { value: "MAH-MCA-CET", label: "Entrance Exam" },
        ]}
        introHeading="MCA Colleges in Pune — Complete Guide 2025"
        introParagraphs={[
          "Pune is one of the best cities in India to pursue MCA (Master of Computer Applications). The city's thriving IT ecosystem — with 500+ software companies in Hinjewadi, Kharadi, and Baner IT Parks — makes MCA graduates from Pune highly employable. Over 30 AICTE-approved colleges in Pune offer MCA programs with strong industry connections.",
          "Admission to MCA in Pune is primarily through MAH-MCA-CET, a state-level entrance exam conducted by the Maharashtra State CET Cell. After the results, DTE Maharashtra runs the CAP (Centralized Admission Process) for seat allotment. Some deemed universities like Symbiosis also accept NIMCET and their own entrance scores.",
          "MCA in Pune is a 2-year (4-semester) program following the revised AICTE curriculum. Eligibility requires a BCA, BSc (CS/IT/Maths), or B.Tech degree with minimum 50% marks. Graduates are well-suited for roles in software development, cloud computing, data analytics, and IT management with starting salaries of ₹5–12 LPA.",
        ]}
        colleges={colleges}
        whyHeading="Why Choose MCA from Pune?"
        whyPoints={[
          { title: "IT Hub Advantage", description: "Pune's Hinjewadi, Kharadi, and Baner IT parks house 500+ companies including TCS, Infosys, Wipro, Persistent, Cognizant, and 200+ startups. MCA graduates get direct access to campus placements." },
          { title: "Industry-Aligned Curriculum", description: "Pune MCA colleges have updated their curriculum to include cloud computing, machine learning, DevOps, and cybersecurity — skills in highest demand by Pune IT recruiters." },
          { title: "Affordable Education", description: "Government and SPPU-affiliated MCA colleges charge ₹40,000–₹80,000/year, making Pune one of the most cost-effective cities for MCA education compared to Delhi, Bangalore, or Hyderabad." },
          { title: "Strong Alumni Network", description: "Top MCA colleges in Pune have alumni at senior positions in companies like Google, Amazon, Microsoft, and Infosys who actively support campus placements and mentorship programs." },
        ]}
        admissionHeading="MCA Admission Process in Pune 2025"
        admissionSteps={[
          { step: "01", title: "Appear in MAH-MCA-CET 2025", description: "Register and appear for MAH-MCA-CET conducted by Maharashtra State CET Cell in March–April 2025. The exam tests aptitude, mathematics, and computer awareness." },
          { step: "02", title: "Register on DTE Portal", description: "After results, register on the DTE Maharashtra CAP portal. Upload documents: graduation marksheets, caste certificate (if applicable), domicile certificate." },
          { step: "03", title: "Fill College Preferences", description: "Add your preferred MCA colleges in Pune in order of choice. You can add up to 50+ college preferences in the online option form." },
          { step: "04", title: "Seat Allotment & Admission", description: "DTE runs 3 CAP rounds. Accept your allotted seat by paying the acceptance fee. Report to the college with original documents for verification." },
        ]}
        faqs={faqs}
        ctaHeading="Find the Right MCA College in Pune"
        ctaSubtext="Get free personalised guidance from our Pune college counsellors. 15-minute call, zero cost."
        relatedGuides={[
          { label: "MCA vs M.Tech — Which is Better?", href: "/blog", icon: "📊" },
          { label: "MAH-MCA-CET Cutoff 2025", href: "/cutoffs", icon: "📋" },
          { label: "BCA Colleges in Pune", href: "/bca-colleges-pune", icon: "🎓" },
          { label: "Free Counselling", href: "/counselling", icon: "🗣️" },
        ]}
      />
    </>
  )
}
