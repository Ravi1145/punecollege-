import type { Metadata } from "next"
import Script from "next/script"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"
import SEOLandingPage from "@/components/seo/SEOLandingPage"

export const metadata: Metadata = genMeta({
  title: "BSc Colleges in Pune 2025-26 | Fees, Courses & Admission | CollegePune",
  description: "Best BSc colleges in Pune 2025-26. BSc Physics, Chemistry, CS, IT, Biotech, Data Science. Compare fees (₹12K–2L/yr), NAAC grades, placements and admission process.",
  path: "/bsc-colleges-pune",
  keywords: ["bsc colleges in pune", "bsc colleges pune 2025", "bsc admission pune", "bsc computer science pune", "bsc biotechnology pune", "best bsc college pune"],
})

export const revalidate = 300

const colleges = [
  { name: "Fergusson College (Autonomous)", location: "Shivajinagar", naac: "A+", fees: "₹12K–30K/yr", placement: "₹3.5 LPA avg", slug: "coep-college-of-engineering-pune" },
  { name: "Symbiosis College of Arts & Commerce", location: "Senapati Bapat Rd", naac: "A+", fees: "₹55K–1.2L/yr", placement: "₹4.2 LPA avg", slug: "symbiosis-institute-of-business-management-sibm" },
  { name: "MIT World Peace University", location: "Kothrud", naac: "A+", fees: "₹1.0L–2.0L/yr", placement: "₹5.5 LPA avg", slug: "mit-wpu-mit-world-peace-university" },
  { name: "SP College Pune", location: "Tilak Road", naac: "A+", fees: "₹10K–25K/yr", placement: "₹3.2 LPA avg", slug: "coep-college-of-engineering-pune" },
  { name: "Modern College of Arts, Science & Commerce", location: "Ganeshkhind", naac: "A", fees: "₹15K–40K/yr", placement: "₹3.0 LPA avg", slug: "coep-college-of-engineering-pune" },
  { name: "DY Patil International University", location: "Akurdi", naac: "A+", fees: "₹80K–1.5L/yr", placement: "₹4.8 LPA avg", slug: "dy-patil-university-pune" },
]

const faqs = [
  { q: "Which is the best BSc college in Pune?", a: "Fergusson College (Autonomous) with NAAC A+ is the most prestigious BSc college in Pune, established in 1885. For BSc CS/IT with placement focus, MIT-WPU is preferred. For lowest fees with quality education, SP College and Garware College (both government-aided) are excellent choices." },
  { q: "What BSc courses are available in Pune?", a: "Pune colleges offer BSc in Physics, Chemistry, Mathematics, Computer Science, IT, Biotechnology, Microbiology, Data Science, Environmental Science, Electronics, Statistics, Forensic Science, Animation, and Hospitality Management. New-age BSc programs in AI, Data Science, and Cloud Computing are growing rapidly." },
  { q: "What is the BSc fee in Pune colleges?", a: "BSc fees in Pune range from ₹10,000–₹30,000/year at government-aided colleges (Fergusson, SP College, Garware) to ₹1.5L–2L/year at private universities. 3-year total BSc cost: ₹30,000–₹6 lakh depending on college type." },
  { q: "What is the scope after BSc from Pune?", a: "BSc graduates from Pune can pursue MSc, MCA, MBA, B.Ed, or directly work in labs, pharma, IT, and analytics. BSc Data Science / BSc CS from Pune colleges gets ₹3–6 LPA starting salary. Pharma BSc (Biotech/Microbiology) graduates find roles in Pune's 200+ pharma companies." },
  { q: "Is BSc or B.Tech better in Pune?", a: "B.Tech has higher salary potential (₹5–12 LPA starting) vs BSc (₹2.5–5 LPA). But BSc is better if you want research, teaching, or science careers. BSc Data Science / CS from premium colleges is closing the gap. Choose based on your aptitude and career goal, not just immediate salary." },
]

export default function BscCollegesPune() {
  const faqSchema = generateFAQSchema(faqs.map(f => ({ question: f.q, answer: f.a })))
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "BSc Colleges in Pune", url: "/bsc-colleges-pune" },
  ])

  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <SEOLandingPage
        breadcrumb={[{ label: "BSc Colleges in Pune", href: "/bsc-colleges-pune" }]}
        h1="BSc Colleges in Pune 2025-26"
        subtitle="Explore top Bachelor of Science (BSc) colleges in Pune. Compare fees, BSc specializations (CS, IT, Biotech, Data Science), admission process & placements for 2025-26."
        heroStats={[
          { value: "80+", label: "BSc Colleges" },
          { value: "₹10K–2L", label: "Annual Fees" },
          { value: "3 Years", label: "Duration" },
          { value: "Merit-Based", label: "Admission" },
        ]}
        introHeading="BSc Colleges in Pune — Complete 2025 Guide"
        introParagraphs={[
          "Pune has over 80 BSc colleges spanning government-aided, autonomous, and private institutions. Bachelor of Science (BSc) programs in Pune cover traditional science streams (Physics, Chemistry, Mathematics, Biology) and new-age specializations like Data Science, Computer Science, Biotechnology, Forensic Science, and Animation.",
          "Government-aided BSc colleges like Fergusson College, SP College, and Garware College offer exceptional education at ₹10,000–₹30,000/year — making Pune the most affordable city for science education in Maharashtra. These colleges have 100+ year legacies and alumni networks spanning IIT, IISc, TIFR, and Fortune 500 companies.",
          "Pune's pharma industry (20,000+ pharma companies in Maharashtra), biotech sector, and IT companies create diverse career paths for BSc graduates. BSc Computer Science and BSc Data Science graduates from Pune's autonomous colleges are increasingly competing with BCA/B.Tech graduates for IT jobs at ₹4–8 LPA.",
        ]}
        colleges={colleges}
        whyHeading="Why BSc from Pune?"
        whyPoints={[
          { title: "Pharma Capital of India", description: "Pune-Mumbai corridor has 200+ pharma and biotech companies. BSc Biotechnology, Microbiology, and Chemistry graduates are in high demand for research and quality control roles." },
          { title: "Affordable Excellence", description: "Fergusson College BSc costs ₹12,000/year — one of India's best science colleges. This makes Pune ideal for BSc students who want quality education without debt." },
          { title: "Research Opportunities", description: "IISER Pune, CSIR-NCL, IUCAA, BARC, and SPPU research centres provide unique research exposure for BSc students through summer projects and collaborations." },
          { title: "Gateway to MSc / MCA / MBA", description: "BSc from Pune opens pathways to MSc (science research), MCA (IT career), MBA (management), B.Ed (teaching), and government competitive exams like MPSC, UPSC, GATE." },
        ]}
        admissionHeading="BSc Admission in Pune 2025"
        admissionSteps={[
          { step: "01", title: "Check 12th Marks", description: "BSc admission is primarily merit-based. Science stream with 50–70%+ in 12th (PCM/PCB/PCMB) is required. Government colleges are competitive (80%+ cutoff)." },
          { step: "02", title: "Apply Online", description: "SPPU-affiliated colleges accept online applications in June–July 2025. Some autonomous colleges like Fergusson have their own application portals." },
          { step: "03", title: "Check Merit List", description: "Colleges release multiple merit lists (1st, 2nd, 3rd cut-off lists). Apply as early as possible as government-aided college seats fill up fast." },
          { step: "04", title: "Confirm Admission", description: "Pay fees within the deadline to confirm your seat. Submit original documents for verification: 12th marksheet, caste/domicile certificates." },
        ]}
        faqs={faqs}
        ctaHeading="Find the Right BSc College in Pune"
        ctaSubtext="Free personalised guidance — compare BSc colleges by fees, stream, and placement in 15 minutes."
        relatedGuides={[
          { label: "BSc CS vs BCA vs B.Tech Pune", href: "/bca-colleges-pune", icon: "📊" },
          { label: "Science Colleges in Pune", href: "/science-colleges-pune", icon: "🔬" },
          { label: "Government Colleges Pune", href: "/government-colleges-pune", icon: "🏛️" },
          { label: "Free Counselling", href: "/counselling", icon: "🗣️" },
        ]}
      />
    </>
  )
}
