"use client"
import * as Accordion from "@radix-ui/react-accordion"
import { ChevronDown, HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const faqs = [
  {
    q: "Which is the best college in Pune for B.Tech / engineering?",
    a: "COEP (College of Engineering Pune) is widely considered the best engineering college in Pune. It is a government autonomous institution established in 1854, NAAC A+ accredited with NIRF Rank 49. Average package is ₹12 LPA with highest at ₹45 LPA. Annual fees are just ₹80,000-1.8L. Other top options include PICT (great for CS), VIT Pune, MIT-WPU, and SIT Pune (Symbiosis)."
  },
  {
    q: "What is the best MBA college in Pune?",
    a: "SIBM Pune (Symbiosis Institute of Business Management) is the top MBA college in Pune, ranked 13 by NIRF among management institutes. With average placements of ₹28 LPA and recruiters like McKinsey, BCG, and P&G, it offers excellent ROI. Other good options include MIT School of Management (MIT-SOM), BIMM, and Indira Institute of Management depending on your CAT/SNAP score and budget."
  },
  {
    q: "Which medical college in Pune has the best NEET cutoff and facilities?",
    a: "AFMC (Armed Forces Medical College) is Pune's best medical college with NIRF Rank 4, NAAC A++, and near-zero fees. However, it requires a separate AFMC entrance test besides NEET 680+. BJ Medical College (NIRF Rank 18) is the best government option accessible through NEET state quota (620+ for open category). For private, D.Y. Patil Medical College and Bharati Vidyapeeth Medical College have good facilities but charge ₹11-15 LPA."
  },
  {
    q: "What is MHT-CET and which Pune colleges accept it?",
    a: "MHT-CET (Maharashtra Common Entrance Test) is Maharashtra's state engineering entrance exam conducted by State CET Cell. Scores range from 0-300. Nearly all SPPU-affiliated private engineering colleges in Pune accept MHT-CET scores. For COEP (top government college), you need 95+ percentile. PICT requires 92+. VIT Pune and other autonomous colleges need 75-85 percentile. Government engineering colleges through CAP admission process solely use MHT-CET."
  },
  {
    q: "What are the fees for B.Tech in Pune colleges?",
    a: "B.Tech fees in Pune vary widely by college type. Government colleges like COEP charge only ₹80,000-1.8L per year. Autonomous institutes like PICT and VIT Pune charge ₹1.4L-2.2L per year. Deemed universities like SIT Pune (Symbiosis) and MIT-WPU charge ₹2L-4.8L per year. For SC/ST/OBC categories, fee concessions and scholarships are available. Government engineering college fees are regulated by the state government fee regulator."
  },
  {
    q: "Which Pune colleges offer hostel facilities?",
    a: "Most top Pune colleges offer hostel facilities. COEP, VIT Pune, SIT Pune, MIT-WPU, SIBM Pune, AFMC, and BJMC all have on-campus hostels. Government college hostels (COEP, BJMC) cost ₹50,000-70,000 per year. Private/deemed university hostels charge ₹80,000-1,50,000 per year including food. It's advisable to apply for hostel well in advance as seats are limited, especially at government colleges."
  },
  {
    q: "How does NAAC grading work and which Pune colleges have A++ grade?",
    a: "NAAC (National Assessment and Accreditation Council) grades colleges on a scale: A++ (best), A+, A, B++, B+, B. AFMC Pune is the only college in Pune with NAAC A++ (highest grade). Colleges with NAAC A+ include COEP, SIBM, MIT-WPU, SIT Pune, Fergusson College, SP College, Garware College, and Cummins College. NAAC grade reflects institutional quality, infrastructure, research output, and student outcomes."
  },
  {
    q: "What are the best colleges in Pune for low budget students?",
    a: "For low-budget engineering: COEP (₹80K/yr, best government college), AISSMS COE (₹1.1L/yr), JSPM RSCOE (₹1.2L/yr). For arts & science: Fergusson College (₹15K/yr), SP College (₹12K/yr), Modern College (₹18K/yr) are affordable government-aided options. For MBA on low budget: Indira Institute of Management (₹4.2L total), BIMM and IIMM offer good MBA at ₹5-6.5L total. Government schemes like EBC scholarship and OBC fee waiver further reduce costs."
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
          <h2 className="text-3xl font-bold text-gray-900">
            Common Questions About Pune Colleges
          </h2>
          <p className="text-gray-500 mt-2">
            Everything you need to know about admissions, fees, and placements in Pune
          </p>
        </div>

        <Accordion.Root type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <Accordion.Item
              key={i}
              value={`item-${i}`}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
            >
              <Accordion.Trigger className="flex items-center justify-between w-full px-6 py-5 text-left group">
                <span className="text-base font-semibold text-gray-900 pr-4 group-data-[state=open]:text-orange-600 transition-colors">
                  {faq.q}
                </span>
                <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0 transition-transform group-data-[state=open]:rotate-180 group-data-[state=open]:text-orange-500" />
              </Accordion.Trigger>
              <Accordion.Content className="px-6 pb-5">
                <p className="text-gray-600 leading-relaxed text-sm">{faq.a}</p>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  )
}
