"use client"
import * as Accordion from "@radix-ui/react-accordion"
import { ChevronDown, HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const faqs = [
  {
    q: "Which is the best college in Pune for B.Tech / engineering in 2026?",
    a: "COEP (College of Engineering Pune) is the best engineering college in Pune in 2026. It is a government autonomous institute established in 1854, NAAC A+ accredited with NIRF Rank 49. Annual fees: ₹80,000–1.8L. Average placement: ₹12 LPA, highest ₹45 LPA. MHT-CET 2026 cutoff: 97+ percentile for Computer Engineering. Other top options: PICT (best for CS/IT, avg ₹7.5 LPA), VIT Pune (NIRF #101, avg ₹8.5 LPA), and SIT Pune — Symbiosis (best deemed, avg ₹9.8 LPA)."
  },
  {
    q: "What is the best MBA college in Pune for 2026 admissions?",
    a: "SIBM Pune (Symbiosis Institute of Business Management) is the top MBA college in Pune, NIRF Rank 13, average placements ₹28 LPA. Recruiters: McKinsey, BCG, P&G, Deloitte. SNAP 2026 cutoff: 60+ percentile. Fees: ₹16–22L total. Other strong options: MIT-SOM (avg ₹12 LPA, fees ₹7–11L), BIMM (avg ₹8.5 LPA, fees ₹5–7.5L), Indira Institute of Management (best ROI, avg ₹7.2 LPA, fees ₹4.2–6.5L)."
  },
  {
    q: "Which medical college in Pune has the best NEET cutoff and facilities?",
    a: "AFMC (Armed Forces Medical College) is Pune's best medical college — NIRF Rank 4, NAAC A++, nearly free (₹50,000 total). Requires 650+ NEET 2026 score + separate AFMC test + SSB. BJ Medical College (NIRF #18) is the best government option accessible through NEET state quota (625+ for open category). For private options: D.Y. Patil Medical College and Bharati Vidyapeeth Medical College have good facilities at ₹11–15 LPA fees."
  },
  {
    q: "What is MHT-CET 2026 and which Pune colleges accept it?",
    a: "MHT-CET 2026 (Maharashtra Common Entrance Test) is scheduled for April 20–May 15, 2026. It tests PCM (Physics, Chemistry, Maths) for engineering admission. All SPPU-affiliated Pune colleges accept MHT-CET. Cutoffs: COEP CSE 97+ percentile, PICT 92–95 percentile, VIT Pune 88–92 percentile, SIT Pune (via SET instead). Private colleges like JSPM, AISSMS, Sinhgad accept 65–75 percentile. Results: June 2026. CAP process: July–August 2026."
  },
  {
    q: "What are the fees for B.Tech in Pune colleges in 2026?",
    a: "B.Tech fees in Pune 2026 vary by college type: Government (COEP): ₹80,000–1.8L/year. Autonomous private (PICT, VIT Pune, Cummins): ₹1.4L–2.2L/year. Deemed universities (SIT Pune — Symbiosis, MIT-WPU): ₹2L–4.8L/year. Private affordable (JSPM RSCOE, AISSMS, Sinhgad): ₹95K–1.7L/year. SC/ST/OBC students at government colleges get full fee waiver through state scholarships. EBC (Economically Backward Class) scholarship also available."
  },
  {
    q: "Which Pune colleges offer hostel facilities in 2026?",
    a: "Most top Pune colleges offer hostel facilities in 2026. Hostel fees: COEP (govt): ₹55,000–70,000/yr. VIT Pune: ₹80,000–1,00,000/yr including meals. SIT Pune: ₹1,10,000–1,40,000/yr (AC/non-AC). SIBM Pune MBA: ₹1,20,000–1,60,000/yr. AFMC: Free hostel for all students. BJ Medical College: ₹60,000–75,000/yr. Fergusson College (arts): ₹40,000–55,000/yr. Apply for hostels immediately after admission — government college hostels fill within days."
  },
  {
    q: "How does NAAC grading work and which Pune colleges have A++ or A+ grade?",
    a: "NAAC (National Assessment and Accreditation Council) grades colleges as: A++ (best) → A+ → A → B++ → B+ → B. In Pune, AFMC is the only A++ college. Colleges with NAAC A+: COEP, SIBM Pune, MIT-WPU, SIT Pune, VIT Pune, Cummins College, Fergusson College, SP College, Garware College. NAAC grade is a quality indicator — banks and employers check NAAC grade for loan and recruitment decisions. Colleges must reapply for NAAC every 5 years."
  },
  {
    q: "What are the best low-budget colleges in Pune for 2026?",
    a: "Best low-budget options in Pune 2026 — Engineering: COEP (₹80K/yr, govt), JSPM RSCOE (₹1.2L/yr), AISSMS COE (₹1.1L/yr). Arts & Science: Fergusson College (₹15K–45K/yr), SP College (₹12K–35K/yr), Modern College (₹18K–50K/yr). MBA: Indira Institute of Management (₹4.2–6.5L total), BIMM (₹5–7.5L total). Government scholarship (Rajarshi Chhatrapati Shahu Maharaj Scholarship) provides full fee waiver for students whose family income is below ₹8L/year."
  }
]

export default function FAQSection() {
  return (
    <section className="py-16 bg-[#F8FAFC]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 text-sm font-medium px-4 py-2 rounded-full mb-3">
            <HelpCircle className="w-4 h-4" />
            Frequently Asked Questions
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Common Questions About Pune Colleges 2026
          </h2>
          <p className="text-gray-500 mt-2 text-sm">
            Everything you need to know about admissions, fees, placements, and entrance exams in Pune
          </p>
        </div>

        <Accordion.Root type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <Accordion.Item
              key={i}
              value={`item-${i}`}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
            >
              <Accordion.Trigger className="flex items-center justify-between w-full px-4 sm:px-6 py-4 sm:py-5 text-left group">
                <span className="text-sm sm:text-base font-semibold text-gray-900 pr-4 group-data-[state=open]:text-orange-600 transition-colors">
                  {faq.q}
                </span>
                <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0 transition-transform group-data-[state=open]:rotate-180 group-data-[state=open]:text-orange-500" />
              </Accordion.Trigger>
              <Accordion.Content className="px-4 sm:px-6 pb-4 sm:pb-5">
                <p className="text-gray-600 leading-relaxed text-sm">{faq.a}</p>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  )
}
