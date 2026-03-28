import { Metadata } from "next"
import { CheckCircle, Clock, Phone, Users, Star, Award } from "lucide-react"
import CounsellingBooking from "@/components/leads/CounsellingBooking"

export const metadata: Metadata = {
  title: "Free Counselling — Expert Guidance for Pune College Admissions 2025",
  description:
    "Book a FREE 15-minute expert counselling session. Get personalized guidance on Pune college admissions, fees, scholarships, and entrance exams. 100% free, no spam.",
}

const faqs = [
  {
    q: "Is the counselling session really free?",
    a: "Yes, 100% free. There are no charges, no hidden fees. Our goal is to help students make informed college choices.",
  },
  {
    q: "How will you contact me?",
    a: "Our counsellor will reach out via WhatsApp or phone call at your preferred time. You can also join a video call if you prefer.",
  },
  {
    q: "What will be covered in the 15-minute session?",
    a: "We'll discuss your profile (marks, stream, budget), shortlist the best colleges for you, explain the admission process, and answer any specific questions.",
  },
  {
    q: "Do I need to prepare anything?",
    a: "Just know your approximate exam scores, preferred stream, and budget range. That's it — we handle the rest.",
  },
]

const stats = [
  { value: "2,500+", label: "Students Counselled", icon: Users },
  { value: "4.9 / 5", label: "Average Rating", icon: Star },
  { value: "< 2 hrs", label: "Response Time", icon: Clock },
  { value: "25+", label: "Pune Colleges Covered", icon: Award },
]

export default function CounsellingPage() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-r from-[#0A1628] to-[#1E3A5F] py-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
            100% Free — No Hidden Charges
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 leading-tight">
            Get Free Expert Counselling for<br />
            <span className="text-orange-400">Pune College Admissions 2025</span>
          </h1>
          <p className="text-blue-200 text-base max-w-2xl mx-auto mb-6">
            Talk to our Pune education specialists. Get a personalized college shortlist, fee breakdown, and admission roadmap — in just 15 minutes.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-white">
            {[
              "✓ Personalized college shortlist",
              "✓ Scholarship guidance",
              "✓ Entrance exam strategy",
              "✓ Admission process walkthrough",
            ].map((p) => (
              <span key={p} className="bg-white/10 px-3 py-1.5 rounded-full">{p}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map(({ value, label, icon: Icon }) => (
            <div key={label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
              <Icon className="w-5 h-5 text-orange-500 mx-auto mb-2" />
              <p className="text-xl font-extrabold text-gray-900">{value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Booking form */}
      <CounsellingBooking />

      {/* What to expect */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-extrabold text-gray-900 text-center mb-8">What Happens in Your Session?</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              step: "1",
              title: "Profile Review",
              desc: "We review your marks, stream, budget, and location preferences to build your profile.",
            },
            {
              step: "2",
              title: "College Shortlist",
              desc: "Get a personalised list of the best-fit Pune colleges with fees, NAAC grades, and placement data.",
            },
            {
              step: "3",
              title: "Admission Roadmap",
              desc: "Walk away with a step-by-step action plan — from exam registration to final admission.",
            },
          ].map(({ step, title, desc }) => (
            <div key={step} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm mb-3">
                {step}
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
              <p className="text-sm text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQs */}
      <div className="max-w-3xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-extrabold text-gray-900 text-center mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map(({ q, a }) => (
            <div key={q} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900 mb-1">{q}</p>
                  <p className="text-sm text-gray-600">{a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* WhatsApp direct */}
        <div className="mt-8 bg-[#0A1628] rounded-2xl p-6 text-white text-center">
          <p className="font-bold text-lg mb-2">Prefer WhatsApp?</p>
          <p className="text-blue-200 text-sm mb-4">Message us directly and our counsellor will reply within 30 minutes.</p>
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210"}?text=${encodeURIComponent("Hi! I need free counselling for Pune college admissions.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm"
          >
            <Phone className="w-4 h-4" />
            WhatsApp Us Now
          </a>
        </div>
      </div>
    </div>
  )
}
