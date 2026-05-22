import type { Metadata } from "next"
import Script from "next/script"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"
import SEOLandingPage from "@/components/seo/SEOLandingPage"

export const metadata: Metadata = genMeta({
  title: "Colleges in Hadapsar Pune 2026 | Engineering & Management Colleges",
  description: "Top colleges in Hadapsar, Pune 2026. Indira College, Sinhgad groups, IT park proximity â€” engineering, MBA, BCA programs. Fees, admissions, and area guide for Hadapsar colleges.",
  path: "/colleges-hadapsar-pune",
  keywords: ["colleges in hadapsar pune", "hadapsar pune colleges 2026", "engineering colleges hadapsar", "mba colleges hadapsar pune"],
})

export const revalidate = 300

const colleges = [
  { name: "Indira College of Engineering & Management", location: "Hadapsar / Nhosari, Pune", naac: "B++", fees: "â‚¹95Kâ€“1.35L/yr", placement: "â‚¹4.2 LPA avg", slug: "indira-college-of-engineering-management-pune" },
  { name: "Sinhgad College of Engineering (Hadapsar Campus)", location: "Hadapsar, Pune", naac: "A", fees: "â‚¹1.15Lâ€“1.6L/yr", placement: "â‚¹4.9 LPA avg", slug: "sinhgad-college-of-engineering-pune" },
  { name: "Dr. D.Y. Patil School of Management", location: "Hadapsar, Pune", naac: "A", fees: "â‚¹4Lâ€“6L (2yr MBA)", placement: "â‚¹8.5 LPA avg", slug: "dy-patil-school-of-management-hadapsar-pune" },
  { name: "Zeal College of Engineering and Research", location: "Dhankawadi/Hadapsar", naac: "B+", fees: "â‚¹90Kâ€“1.3L/yr", placement: "â‚¹4 LPA avg", slug: "zeal-college-engineering-research-pune" },
  { name: "International Institute of Information Technology (IIITP)", location: "Hadapsar, Pune", naac: "A", fees: "â‚¹1.5Lâ€“2.5L/yr", placement: "â‚¹5.5 LPA avg", slug: "iiitp-international-institute-information-technology-pune" },
  { name: "Genba Sopanrao Moze College of Engineering", location: "Hadapsar, Pune", naac: "B+", fees: "â‚¹85Kâ€“1.2L/yr", placement: "â‚¹3.8 LPA avg", slug: "gsmoze-college-engineering-pune" },
  { name: "MKSSS Cummins College (nearby Hadapsar area)", location: "Karvenagar/Hadapsar belt", naac: "A+", fees: "â‚¹1.3Lâ€“1.75L/yr", placement: "â‚¹6.8 LPA avg", slug: "cummins-college-of-engineering-pune" },
  { name: "Smt. Kashibai Navale College of Engineering", location: "Vadgaon / Hadapsar belt", naac: "A", fees: "â‚¹1.1Lâ€“1.5L/yr", placement: "â‚¹4.5 LPA avg", slug: "skncoe-smt-kashibai-navale-college-engineering" },
]

const faqs = [
  { q: "Which area of Hadapsar has good colleges?", a: "Colleges in Hadapsar are concentrated in Magarpatta City area, Nagar Road (for management colleges), and the Dhankawadi-Hadapsar belt. Magarpatta's IT park location makes Hadapsar colleges highly preferred for IT and management students seeking proximity to campus placements." },
  { q: "What is the advantage of studying in Hadapsar, Pune?", a: "Hadapsar's main advantages: proximity to Magarpatta IT City (3,000+ companies), Kharadi Techno Park (growing IT hub), affordable student accommodation (â‚¹6,000â€“10,000/month), direct PMPML bus connectivity to Pune station, and lower cost of living than central Pune." },
  { q: "Are there any top-tier engineering colleges in Hadapsar?", a: "Hadapsar has mid-tier engineering colleges rather than top-tier institutions. Indira College and Sinhgad College are the most recognized engineering colleges in the area. For top-tier colleges (COEP, VIT, SIT), students commute from Hadapsar to other Pune areas." },
  { q: "What IT companies recruit from Hadapsar area colleges?", a: "Magarpatta IT City and Kharadi Techno Park host Accenture, Synerzip, Zensar Technologies, WNS Holdings, and 100+ IT/ITES companies that recruit from Hadapsar area colleges. These tech parks offer on-foot internship access for Hadapsar college students." },
  { q: "What is the accommodation situation in Hadapsar for students?", a: "Hadapsar is one of Pune's most affordable student areas. PG accommodation: â‚¹5,000â€“10,000/month. Shared flats: â‚¹6,000â€“12,000/month per person. Magarpatta and Fatimanagar areas are popular for students. Connectivity to college and IT parks is easy via auto/Ola." },
]

export default function CollegesHadapsarPunePage() {
  const faqSchema = generateFAQSchema(faqs.map(f => ({ question: f.q, answer: f.a })))
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Colleges in Hadapsar, Pune", url: "/colleges-hadapsar-pune" },
  ])
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Colleges in Hadapsar, Pune 2026",
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
        breadcrumb={[{ label: "Colleges in Hadapsar, Pune", href: "/colleges-hadapsar-pune" }]}
        h1="Colleges in Hadapsar, Pune 2026"
        subtitle="Find colleges in Hadapsar, Pune â€” engineering, MBA, and BCA programs near Magarpatta IT City. Compare fees, NAAC grades, and placement opportunities for 2026 admission."
        heroStats={[
          { value: "8+", label: "Colleges in Hadapsar" },
          { value: "Magarpatta", label: "IT Hub Proximity" },
          { value: "â‚¹85K/yr", label: "Min Engineering Fees" },
          { value: "Affordable", label: "Student Accommodation" },
        ]}
        introHeading="Colleges in Hadapsar: Pune's IT Hub for Students"
        introParagraphs={[
          "Hadapsar is a rapidly developing residential and commercial area in eastern Pune, home to the iconic Magarpatta City â€” a self-contained township with IT parks housing over 3,000 technology companies including Accenture, Zensar, and WNS Holdings. This unique combination of educational institutions and immediate employment opportunities makes Hadapsar increasingly popular among students.",
          "Engineering and management colleges in Hadapsar cater primarily to students who want good quality education at lower costs than central Pune colleges. Indira College of Engineering, Sinhgad College of Engineering, and Zeal College serve engineering students, while DY Patil School of Management and IIITP cater to MBA and IT management aspirants.",
          "The infrastructure around Hadapsar colleges is well-developed: affordable PG accommodation at â‚¹5,000â€“10,000/month, multiple canteens and student restaurants, coaching institutes for competitive exams, and direct PMPML bus connectivity to the rest of Pune. The upcoming Pune Metro expansion plans include stations in the Hadapsar-Fatimanagar corridor.",
        ]}
        colleges={colleges}
        whyHeading="Why Study in Hadapsar, Pune?"
        whyPoints={[
          { title: "Magarpatta IT Park Access", description: "Students at Hadapsar colleges can walk or take 5-minute auto rides to Magarpatta IT City for internships, campus drives, and networking events with 3,000+ IT companies." },
          { title: "Affordable Living Costs", description: "Hadapsar's student accommodation is among Pune's most affordable â€” PG hostels from â‚¹5,000/month, with meals included options from â‚¹7,000/month. Significantly cheaper than Shivajinagar or Baner." },
          { title: "Growing Kharadi Tech Hub", description: "Adjacent Kharadi is emerging as Pune's second major IT corridor with global MNCs. Hadapsar students benefit from this growing employment hub for placements and internships." },
          { title: "Moderate Competition for Admission", description: "Hadapsar area engineering colleges have moderate MHT-CET cutoffs (55â€“75 percentile), making them accessible to a wider range of students who want Pune's IT ecosystem proximity without top-tier competition." },
          { title: "Food & Social Infrastructure", description: "Hadapsar has diverse and affordable food options (â‚¹60â€“100/meal), shopping malls, movie theaters, and recreational areas â€” ensuring a complete student lifestyle without commuting to central Pune." },
          { title: "Pune-Solapur Highway Connectivity", description: "NH-65 (Pune-Solapur) passes through Hadapsar, providing excellent connectivity for outstation students. Pune Railway Station is 12 km away, and Pune Airport is just 8 km from Hadapsar." },
        ]}
        admissionHeading="Admission to Hadapsar Colleges in Pune 2026"
        admissionSteps={[
          { step: "1", title: "Determine Target Program & Entry Criteria", description: "Engineering colleges in Hadapsar use MHT-CET (55â€“75 percentile range). MBA colleges use MAH-CET/CAT. BCA/BSc IT colleges use HSC merit. Research each college's specific requirements." },
          { step: "2", title: "Apply via MHT-CET CAP (Engineering)", description: "For engineering colleges like Indira College, Sinhgad, and Zeal â€” apply through MHT-CET CAP on cetcell.mahacet.org. List Hadapsar area colleges based on your percentile range." },
          { step: "3", title: "Direct Application for MBA Programs", description: "DY Patil School of Management Hadapsar accepts direct applications post-MAH-CET. Apply at their website, submit academic documents, and attend GD/PI. Process happens Aprilâ€“June 2026." },
          { step: "4", title: "Visit Campus Before Confirming", description: "Visit Hadapsar colleges in person before admission. Check lab infrastructure, hostel facilities, college transport, and placement cell activity. Talk to final-year students about industry connections." },
          { step: "5", title: "Arrange Student Accommodation Early", description: "Hadapsar accommodation books up by Mayâ€“June. Start searching PG hostels from April 2026. Check coliving options near Magarpatta and Fatimanagar for best value." },
        ]}
        faqs={faqs}
        ctaHeading="Find the Right College in Hadapsar, Pune"
        ctaSubtext="Get personalized college recommendations for the Hadapsar area based on your stream, scores, and career goals. Free expert guidance for all programs."
      relatedGuides={[
        { label: "Colleges in Kothrud Pune", href: "/colleges-kothrud-pune", icon: "📍" },
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

