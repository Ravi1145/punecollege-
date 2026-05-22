import type { Metadata } from "next"
import Script from "next/script"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"
import SEOLandingPage from "@/components/seo/SEOLandingPage"

export const metadata: Metadata = genMeta({
  title: "Science Colleges in Pune 2026 | BSc, MSc Colleges | Fees & Admissions",
  description: "Top science colleges in Pune for BSc and MSc 2026. Fergusson College, SP College, MIT-WPU, Symbiosis -- compare fees, NAAC grades, courses, and career options.",
  path: "/science-colleges-pune",
  keywords: ["science colleges pune", "bsc colleges pune 2026", "msc colleges pune", "best science college pune", "physics chemistry biology pune"],
})

export const revalidate = 300

const colleges = [
  { name: "Fergusson College (Autonomous)", location: "Shivajinagar", naac: "A+", fees: "₹25K-60K/yr", placement: "Research & Govt", slug: "fergusson-college-pune" },
  { name: "SP College of Science & Commerce", location: "Shivajinagar", naac: "A+", fees: "₹20K-50K/yr", placement: "Government Aided", slug: "sp-college-pune" },
  { name: "Modern College of Arts Science & Commerce", location: "Shivajinagar", naac: "A", fees: "₹22K-55K/yr", placement: "Government Aided", slug: "modern-college-pune" },
  { name: "Wadia College of Science", location: "Pune", naac: "A", fees: "₹18K-40K/yr", placement: "Government", slug: "wadia-college-science-pune" },
  { name: "MIT College of Science - MIT-WPU", location: "Kothrud", naac: "A+", fees: "₹60K-1.2L/yr", placement: "₹4.5 LPA avg", slug: "mit-wpu-mit-world-peace-university" },
  { name: "Symbiosis College of Arts & Commerce", location: "Senapati Bapat Road", naac: "A+", fees: "₹45K-80K/yr", placement: "₹5 LPA avg", slug: "symbiosis-college-arts-commerce-pune" },
  { name: "Marathwada Mitra Mandal College of Science", location: "Deccan", naac: "A", fees: "₹20K-50K/yr", placement: "Govt. Aided", slug: "mmmcs-pune" },
  { name: "Sir Parashurambhau College (SP College)", location: "Shivajinagar", naac: "A+", fees: "₹20K-48K/yr", placement: "Research", slug: "sir-parashurambhau-college-pune" },
]

const faqs = [
  { q: "Which is the best science college in Pune for BSc?", a: "Fergusson College (NAAC A+, est. 1885) is widely considered the best science college in Pune for BSc programs in Physics, Chemistry, Mathematics, and Biology. Its government status keeps fees under ₹60,000/year with excellent faculty." },
  { q: "What BSc programs are available in Pune science colleges?", a: "Pune science colleges offer BSc in Physics, Chemistry, Mathematics, Biology, Computer Science, Statistics, Microbiology, Biotechnology, Environmental Science, Electronics, and Information Technology. Fergusson and SP College have the widest program range." },
  { q: "What is the career scope after BSc from Pune colleges?", a: "BSc graduates from Pune can pursue: MSc/MTech (research pathway), MBA (management pivot), B.Ed. (teaching career), government competitive exams (MPSC, UPSC), pharma industry (quality control, R&D), IT industry (BSc CS/IT), and higher studies abroad." },
  { q: "What is the admission process for BSc in Pune?", a: "BSc admissions in Pune are based on HSC (12th) merit in Science stream. Apply on the SPPU online portal after HSC results. Merit cutoffs for top colleges like Fergusson are 85-95% in PCB or PCM. Some autonomous colleges conduct their own entrance tests." },
  { q: "Are there any residential science colleges in Pune?", a: "Fergusson College has hostel facilities. Most government-aided science colleges in Pune have hostel facilities for outstation students at ₹30,000-60,000/year. MIT-WPU's science programs have full campus residential facilities." },
]

export default function ScienceCollegesPunePage() {
  const faqSchema = generateFAQSchema(faqs.map(f => ({ question: f.q, answer: f.a })))
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Science Colleges in Pune", url: "/science-colleges-pune" },
  ])
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Science Colleges in Pune 2026",
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
        breadcrumb={[{ label: "Science Colleges in Pune", href: "/science-colleges-pune" }]}
        h1="Science Colleges in Pune 2026"
        subtitle="Find the best BSc and MSc science colleges in Pune. Compare fees, NAAC grades, research facilities, and career pathways for Physics, Chemistry, Biology, and more."
        heroStats={[
          { value: "30+", label: "Science Colleges" },
          { value: "₹18K/yr", label: "Min Fees (Govt)" },
          { value: "NAAC A+", label: "Top Rating" },
          { value: "HSC Merit", label: "Admission Basis" },
        ]}
        introHeading="Science Colleges in Pune: Academic Excellence Since 1885"
        introParagraphs={[
          "Pune has one of India's most distinguished science education traditions, anchored by Fergusson College (established 1885) and SP College (established 1916) -- both NAAC A+ institutions that have produced distinguished scientists, Nobel laureate researchers, and senior government officials. These institutions continue to offer world-class science education at government-aided fees.",
          "BSc programs in Pune cover the full spectrum of natural and applied sciences: Physics, Chemistry, Mathematics, Biology, Computer Science, Statistics, Microbiology, Biotechnology, and Environmental Science. Pune's proximity to pharmaceutical companies (Sun Pharma, Serum Institute, Emcure), research institutes (NCL, IISER Pune, NCCS), and IT companies creates excellent pathways for science graduates.",
          "The science education landscape in Pune has been enhanced by modern institutions like MIT-WPU's science programs and Symbiosis's interdisciplinary science courses. Students who want infrastructure and placement support beyond traditional government college offerings can choose these institutions at slightly higher fees.",
        ]}
        colleges={colleges}
        whyHeading="Why Study Science in Pune?"
        whyPoints={[
          { title: "World-Class Research Institutes Nearby", description: "Pune hosts IISER (Institute of Science Education and Research), NCL (National Chemical Laboratory), NCCS, CSIR-NCL, and TIFR -- offering BSc students internship and project work opportunities at national research centers." },
          { title: "Pharmaceutical Industry Access", description: "Pune's pharma belt (Pimpri-Chinchwad, Hadapsar) hosts Sun Pharma, Serum Institute, Emcure, and 500+ pharma companies -- creating direct career pathways for Chemistry, Microbiology, and Biotechnology graduates." },
          { title: "IISER Pune Pathway", description: "High-performing BSc students from Pune colleges can qualify for IISER Pune integrated PhD programs, one of India's most prestigious science research pathways, through IISER aptitude test (IAT)." },
          { title: "Affordable Quality Education", description: "Government science colleges in Pune charge ₹18,000-60,000/year for undergraduate programs with NAAC A+ quality -- making quality science education accessible to all income groups." },
          { title: "GRE & Abroad Opportunities", description: "Science graduates from Pune colleges routinely pursue MS/PhD programs in USA, Europe, and Australia. The strong research culture at Fergusson and SP College prepares students for competitive GRE scores." },
          { title: "IT & Data Science Crossover", description: "BSc Computer Science and Statistics graduates from Pune colleges are increasingly hired by IT companies (Infosys, TCS, Wipro) and data analytics firms at ₹4-8 LPA -- comparable to engineering graduates." },
        ]}
        admissionHeading="BSc Admission Process in Pune Science Colleges 2026"
        admissionSteps={[
          { step: "1", title: "Clear HSC (12th) Science with Good Marks", description: "BSc admissions are based on HSC Science stream marks. Aim for 85%+ for top colleges like Fergusson. PCM/PCB stream with Mathematics for BSc CS/Statistics. Biology for BSc Microbiology/Biotechnology." },
          { step: "2", title: "Track HSC Results (May-June 2026)", description: "HSC results are published by Maharashtra Board in May-June 2026. Calculate your percentage in best-of-five subjects. This percentage determines your merit rank for BSc admissions." },
          { step: "3", title: "Apply on SPPU Online Admission Portal", description: "SPPU opens online admission portal after HSC results. Register, fill form, upload mark sheet, and select preferred colleges and courses in order. Application is free for most government colleges." },
          { step: "4", title: "Check Merit List & Confirm Admission", description: "Colleges publish merit lists (1st, 2nd, 3rd) on their websites. If selected, confirm admission by paying fees within the deadline (usually 3-5 days). Bring original documents for verification." },
          { step: "5", title: "Explore MSc Options Early", description: "Plan your MSc pathway from BSc year 1. Research IIT-JAM, IISER IAT, GATE (for MTech), and state CET for MSc admissions. Maintaining 70%+ in BSc opens multiple prestigious PG pathways." },
        ]}
        faqs={faqs}
        ctaHeading="Find the Best Science College in Pune for Your Interests"
        ctaSubtext="Whether you want research, pharma careers, or IT crossover -- our counsellors will help you find the right science college in Pune matching your HSC scores and career goals."
      relatedGuides={[
        { label: "Arts & Science Colleges in Pune", href: "/arts-colleges-pune", icon: "📚" },
        { label: "Commerce Colleges in Pune", href: "/commerce-colleges-pune", icon: "📊" },
        { label: "BCA Colleges in Pune", href: "/bca-colleges-pune", icon: "💻" },
        { label: "BBA Colleges in Pune", href: "/bba-colleges-pune", icon: "📈" },
        { label: "BSc IT Colleges in Pune", href: "/bsc-it-colleges-pune", icon: "🖥️" },
        { label: "Law Colleges in Pune", href: "/law-colleges-pune", icon: "⚖️" },
        { label: "Design Colleges in Pune", href: "/design-colleges-pune", icon: "🎨" },
      ]}
      />
    </>
  )
}
