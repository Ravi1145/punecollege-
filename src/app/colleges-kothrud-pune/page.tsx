import type { Metadata } from "next"
import Script from "next/script"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"
import SEOLandingPage from "@/components/seo/SEOLandingPage"

export const metadata: Metadata = genMeta({
  title: "Colleges in Kothrud Pune 2026 | Best Engineering & MBA in Kothrud",
  description: "Top colleges in Kothrud, Pune 2026. MIT-WPU, MAEER MIT, Cummins College - engineering, MBA, arts programs. Fees, admissions, NAAC grades for Kothrud area colleges.",
  path: "/colleges-kothrud-pune",
  keywords: ["colleges in kothrud pune", "kothrud pune colleges 2026", "engineering colleges kothrud pune", "mba colleges kothrud pune"],
})

export const revalidate = 300

const colleges = [
  { name: "MIT World Peace University (MIT-WPU)", location: "Kothrud, Pune", naac: "A+", fees: "₹2L-3.8L/yr", placement: "₹7.2 LPA avg", slug: "mit-wpu-mit-world-peace-university" },
  { name: "MAEER MIT College of Engineering", location: "Paud Road, Kothrud", naac: "A+", fees: "₹1.8L-2.5L/yr", placement: "₹6.5 LPA avg", slug: "maeer-mit-college-engineering-pune" },
  { name: "MIT School of Business (MIT-SOB)", location: "Kothrud, Pune", naac: "A+", fees: "₹6.5L (2yr MBA)", placement: "₹10.5 LPA avg", slug: "mit-school-of-business-pune" },
  { name: "MIT College of Arts, Commerce & Science", location: "Kothrud, Pune", naac: "A+", fees: "₹45K-1.2L/yr", placement: "Government Aided", slug: "mit-college-arts-commerce-science-pune" },
  { name: "MAEER MIT Polytechnic", location: "Kothrud, Pune", naac: "A", fees: "₹50K-80K/yr", placement: "₹3.5 LPA avg", slug: "maeer-mit-polytechnic-pune" },
  { name: "MIT College of Commerce", location: "Kothrud, Pune", naac: "A+", fees: "₹55K-1L/yr", placement: "₹4.8 LPA avg", slug: "mit-college-commerce-pune" },
  { name: "Cummins College of Engineering for Women", location: "Karvenagar (near Kothrud)", naac: "A+", fees: "₹1.3L-1.75L/yr", placement: "₹6.8 LPA avg", slug: "cummins-college-of-engineering-pune" },
  { name: "MIT School of Law", location: "Kothrud, Pune", naac: "A+", fees: "₹1.5L-2.5L/yr", placement: "Law Careers", slug: "mit-school-of-law-pune" },
]

const faqs = [
  { q: "Which is the best college in Kothrud, Pune?", a: "MIT World Peace University (MIT-WPU) is the best college in Kothrud, Pune, offering engineering, MBA, science, law, and arts programs under one university with NAAC A+ grade and excellent placement records (₹7.2 LPA average for engineering)." },
  { q: "Is Kothrud a good area for students in Pune?", a: "Yes. Kothrud is one of Pune's most student-friendly areas with excellent connectivity (PMPML buses, metro planned), affordable PG accommodation (₹6,000-12,000/month), good restaurants, study cafes, and proximity to Hinjewadi IT Park for internships." },
  { q: "What programs does MIT-WPU Kothrud offer?", a: "MIT-WPU Kothrud offers: B.Tech (CSE, Mechanical, Civil, Electronics, AI/ML), MBA/PGDM, BBA, BCom, BSc, BA, LLB, PhD programs. It is a deemed university with 20,000+ students across all programs. Fees range from ₹45,000/yr (BSc) to ₹3.8L/yr (B.Tech)." },
  { q: "What is the accommodation situation near Kothrud colleges?", a: "Kothrud has abundant student accommodation: PG (₹6,000-12,000/month), hostels (₹60,000-1L/year), and shared apartments (₹8,000-15,000/month per person). MIT-WPU has on-campus hostels. Paud Road and Karve Road are popular student residential areas." },
  { q: "How to reach Kothrud colleges in Pune?", a: "Kothrud is well-connected by PMPML buses (Routes 110, 111, 114) from Pune Railway Station and Swargate. Auto-rickshaws and Ola/Uber are readily available. The upcoming Pune Metro Phase 3 will further improve Kothrud connectivity. Distance from Pune station: approximately 6 km." },
]

export default function CollegesKothrudPunePage() {
  const faqSchema = generateFAQSchema(faqs.map(f => ({ question: f.q, answer: f.a })))
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Colleges in Kothrud, Pune", url: "/colleges-kothrud-pune" },
  ])
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Colleges in Kothrud, Pune 2026",
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
        breadcrumb={[{ label: "Colleges in Kothrud, Pune", href: "/colleges-kothrud-pune" }]}
        h1="Colleges in Kothrud, Pune 2026"
        subtitle="Discover the best colleges in Kothrud, Pune - including MIT-WPU, MAEER MIT, and Cummins College. Compare programs, fees, NAAC grades, and accommodation options."
        heroStats={[
          { value: "10+", label: "Colleges in Kothrud" },
          { value: "MIT-WPU", label: "Top Institution" },
          { value: "₹45K-3.8L", label: "Fees Range" },
          { value: "NAAC A+", label: "MIT-WPU Grade" },
        ]}
        introHeading="Colleges in Kothrud, Pune: The MIT-WPU Ecosystem"
        introParagraphs={[
          "Kothrud is one of Pune's most prominent education hubs, dominated by the MIT (Maharashtra Institute of Technology) group of colleges and MIT World Peace University (MIT-WPU) - a deemed university with over 20,000 students across engineering, management, science, law, and arts programs. The area has evolved from a residential suburb into a vibrant student district.",
          "MIT-WPU's main campus on Paud Road, Kothrud, is a self-sufficient university campus with hostels, sports facilities, research centers, and startup incubators. Its diverse program offerings make Kothrud a one-stop destination for students seeking quality education in various disciplines under one NAAC A+ institution.",
          "Beyond MIT-WPU, Kothrud and adjacent Karvenagar host Cummins College of Engineering for Women (NAAC A+, one of India's best women-only engineering colleges) and several other MIT group institutions. The Kothrud education cluster benefits from proximity to Hinjewadi IT Park (15 km), Pune-Mumbai Expressway connectivity, and a dense infrastructure of student services.",
        ]}
        colleges={colleges}
        whyHeading="Why Choose Colleges in Kothrud, Pune?"
        whyPoints={[
          { title: "MIT-WPU University Campus", description: "MIT-WPU offers a complete university experience with 50+ programs, sports complex, hostels, startup incubator, and international study centers on its 45-acre Kothrud campus." },
          { title: "Student-Friendly Infrastructure", description: "Kothrud has Pune's densest concentration of affordable PG accommodations, student restaurants (₹60-120/meal), coaching institutes, stationery shops, and student-oriented services." },
          { title: "Hinjewadi Access for Internships", description: "Kothrud is 15 km from Hinjewadi IT Park via Baner-Balewadi flyover. Students at MIT-WPU regularly commute for internships at TCS, Infosys, and 300+ IT companies." },
          { title: "Multi-Stream Education Hub", description: "Kothrud uniquely offers engineering (MIT-WPU, MAEER MIT), MBA (MIT-SOB), law (MIT School of Law), arts/commerce/science (MIT College), and polytechnic (MAEER MIT Poly) - all within 2 km radius." },
          { title: "Women-Specific Options", description: "Cummins College of Engineering for Women in nearby Karvenagar is a top choice for women engineers. MIT-WPU also has women-specific hostel facilities and women safety programs." },
          { title: "Good Public Transport", description: "Multiple PMPML bus routes connect Kothrud to Pune Railway Station, Shivajinagar, Deccan, and Swargate. Auto-rickshaw density is high, and Ola/Uber coverage is excellent in the area." },
        ]}
        admissionHeading="Admission to Kothrud Colleges in Pune 2026"
        admissionSteps={[
          { step: "1", title: "Identify Target Program & College", description: "Kothrud offers engineering (MIT-WPU B.Tech), MBA (MIT-SOB), law (MIT School of Law), and arts/science (MIT College). Each has different entrance requirements. Engineering via MHT-CET/JEE, MBA via CAT/MAH-CET, law via CLAT/MH-LAT." },
          { step: "2", title: "Apply on MIT-WPU/MIT Group Portal", description: "MIT-WPU is a deemed university - apply directly at mitwpu.edu.in after entrance exam results. MIT group autonomous colleges (MAEER MIT) participate in MHT-CET CAP for engineering seats." },
          { step: "3", title: "Visit Campus for MIT-WPU", description: "MIT-WPU conducts regular open campus days. Visit the Kothrud campus to understand the infrastructure, meet faculty, and talk to current students before confirming admission." },
          { step: "4", title: "Explore Scholarship Options at MIT-WPU", description: "MIT-WPU offers merit scholarships (100% fee waiver for rank holders), sports scholarships, and financial assistance for economically weaker students. Apply for scholarships at the time of admission." },
          { step: "5", title: "Arrange Accommodation in Kothrud", description: "MIT-WPU hostel applications open March-April. For PG accommodation, visit Paud Road and Karve Road areas. Budget ₹7,000-12,000/month for furnished PG near Kothrud colleges." },
        ]}
        faqs={faqs}
        ctaHeading="Explore the Best Colleges in Kothrud, Pune"
        ctaSubtext="Get personalized guidance for MIT-WPU, MAEER MIT, and Cummins College admissions in Kothrud. Free counselling for all programs - engineering, MBA, law, and more."
      relatedGuides={[
        { label: "Colleges in Hadapsar Pune", href: "/colleges-hadapsar-pune", icon: "📍" },
        { label: "Colleges in Wakad Pune", href: "/colleges-wakad-pune", icon: "📍" },
        { label: "Colleges with Hostel in Pune", href: "/colleges-in-pune-with-hostel", icon: "🏠" },
        { label: "All Colleges in Pune — Browse", href: "/colleges", icon: "🏛️" },
        { label: "Government Colleges in Pune", href: "/government-colleges-pune", icon: "🏛️" },
        { label: "Best Engineering Colleges Pune", href: "/engineering-colleges-pune", icon: "⚙️" },
        { label: "Best MBA Colleges in Pune", href: "/mba-colleges-pune", icon: "📈" },
      ]}
      />
    </>
  )
}
