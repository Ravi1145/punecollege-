"use client"
import Link from "next/link"
import { PhoneCall, CheckCircle2, GraduationCap, Users, TrendingUp, Building2 } from "lucide-react"

const COURSES = [
  { icon: "⚙️", label: "ENGINEERING", desc: "B.Tech | M.Tech" },
  { icon: "💼", label: "MANAGEMENT", desc: "MBA | BBA | PGDM" },
  { icon: "💻", label: "COMPUTER APPLICATIONS", desc: "BCA | MCA | B.Sc (CS)" },
  { icon: "🔬", label: "SCIENCES", desc: "B.Sc | M.Sc" },
  { icon: "📊", label: "COMMERCE", desc: "B.Com | M.Com" },
  { icon: "⚖️", label: "LAW", desc: "BA LLB | LLB | LLM" },
  { icon: "🏛️", label: "ARCHITECTURE & DESIGN", desc: "B.Arch | B.Des | M.Des" },
  { icon: "🏨", label: "HOTEL MANAGEMENT", desc: "BHM | MHM" },
]

const TOP_COLLEGES = [
  { name: "MIT-WPU", tag: "MIT WORLD PEACE UNIVERSITY" },
  { name: "VIT PUNE", tag: "VISHWAKARMA INSTITUTE OF TECHNOLOGY" },
  { name: "SYMBIOSIS", tag: "SYMBIOSIS INTERNATIONAL (DEEMED UNIVERSITY)" },
  { name: "DPU", tag: "DR. D. Y. PATIL VIDYAPEETH, PUNE" },
  { name: "PICT", tag: "PUNE INSTITUTE OF COMPUTER TECHNOLOGY" },
]

const ADMISSION_STEPS = [
  { num: "1", title: "FILL THE ENQUIRY FORM", icon: "📋" },
  { num: "2", title: "GET EXPERT COUNSELLING", icon: "👨‍💼" },
  { num: "3", title: "CHOOSE YOUR DREAM COLLEGE", icon: "🏫" },
  { num: "4", title: "EASY ADMISSION CONFIRMATION", icon: "✅" },
]

const TRUST_POINTS = [
  "NO HIDDEN CHARGES",
  "TRANSPARENT PROCESS",
  "PERSONALIZED GUIDANCE",
  "TRUSTED BY 10,000+ STUDENTS",
]

export default function AdmissionPosterHero() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#0A1628] to-[#1E3A5F] text-white py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-black mb-2">
                <span className="text-white">College</span>
                <span className="text-orange-500">Pune</span>
              </h1>
              <p className="text-gray-300 text-lg">Your Future. Our Priority.</p>
            </div>
            <div className="bg-orange-500 rounded-full px-6 py-3 text-center">
              <p className="text-xs font-bold text-white">PUNE'S MOST TRUSTED</p>
              <p className="text-sm font-black text-white">EDUCATION PARTNER</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Heading */}
        <div className="text-center mb-12">
          <div className="inline-block bg-[#0A1628] text-white px-8 py-2 rounded-full mb-4 font-bold text-sm">
            ⭐ TOP COLLEGES. BRIGHT FUTURES.
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-4">
            <span className="text-[#0A1628]">ADMISSION</span>
            <br />
            <span className="text-orange-500">OPEN 2026</span>
          </h2>
          <p className="text-gray-600 text-xl font-bold">ALL IN PUNE</p>
        </div>

        {/* Courses Grid */}
        <div className="bg-gray-50 rounded-3xl p-8 mb-12">
          <h3 className="text-2xl font-bold text-[#0A1628] mb-8 text-center">COURSES WE OFFER</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {COURSES.map((course) => (
              <div key={course.label} className="bg-white rounded-2xl p-4 text-center hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-2">{course.icon}</div>
                <p className="font-bold text-sm text-[#0A1628] mb-1">{course.label}</p>
                <p className="text-xs text-gray-600">{course.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Top Colleges */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-[#0A1628] mb-6 text-center">TOP COLLEGES IN PUNE</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {TOP_COLLEGES.map((college) => (
              <div key={college.name} className="bg-white border-2 border-gray-200 rounded-2xl p-4 text-center hover:border-orange-500 transition-colors">
                <div className="text-3xl font-black text-orange-500 mb-2">{college.name}</div>
                <p className="text-xs text-gray-600">{college.tag}</p>
              </div>
            ))}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-4 text-center flex items-center justify-center min-h-24">
              <p className="text-center font-bold text-gray-600">& MANY<br />MORE...</p>
            </div>
          </div>
        </div>

        {/* Scholarship Section */}
        <div className="bg-gradient-to-r from-[#0A1628] to-[#1E3A5F] text-white rounded-3xl p-8 mb-12 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-4">SCHOLARSHIP UPTO</h3>
            <p className="text-6xl font-black text-orange-500 mb-2">₹50,000</p>
            <p className="text-lg font-bold">ON MERIT BASIS</p>
          </div>
          <div className="relative">
            <div className="bg-orange-500 rounded-full w-32 h-32 flex items-center justify-center mx-auto">
              <div className="text-center">
                <p className="text-5xl font-black text-white">80%</p>
                <p className="text-xs font-bold text-white">OFF ON APPLICATION<br />FORM FOR YOU!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { icon: "🏆", label: "TOP COLLEGES IN PUNE" },
            { icon: "👨‍🎓", label: "EXPERT COUNSELLING" },
            { icon: "✅", label: "EASY ADMISSION" },
            { icon: "👥", label: "100% PLACEMENT ASSISTANCE" },
          ].map((item) => (
            <div key={item.label} className="bg-[#0A1628] text-white rounded-2xl p-4 text-center">
              <div className="text-3xl mb-2">{item.icon}</div>
              <p className="text-xs font-bold">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Admission Process */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-[#0A1628] mb-8 text-center">OUR SIMPLE ADMISSION PROCESS</h3>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {ADMISSION_STEPS.map((step, idx) => (
              <div key={step.num} className="flex flex-col items-center">
                <div className="bg-orange-500 text-white rounded-full w-16 h-16 flex items-center justify-center font-black text-2xl mb-3">
                  {step.icon}
                </div>
                <div className="bg-gray-100 rounded-xl p-3 text-center max-w-32">
                  <p className="text-xs font-black text-[#0A1628]">{step.title}</p>
                </div>
                {idx < ADMISSION_STEPS.length - 1 && (
                  <div className="hidden md:block text-3xl text-orange-500 font-bold mx-4">→</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Link href="/colleges" className="bg-orange-500 hover:bg-orange-600 text-white rounded-2xl p-6 text-center font-black text-xl transition-colors">
            📋 APPLY NOW<br />
            <span className="text-sm font-bold">SECURE YOUR FUTURE TODAY!</span>
          </Link>
          <Link href="/counselling" className="bg-[#0A1628] hover:bg-[#0f2340] text-white rounded-2xl p-6 text-center font-black text-xl transition-colors">
            📞 TALK TO OUR ADMISSION EXPERTS<br />
            <span className="text-orange-500 text-2xl font-black">7318538887</span>
            <div className="text-sm font-bold mt-2">www.collegepune.com</div>
          </Link>
        </div>

        {/* Trust Badges */}
        <div className="bg-[#0A1628] text-white rounded-2xl p-6 flex flex-wrap justify-center gap-6 text-center">
          {TRUST_POINTS.map((point) => (
            <div key={point} className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-orange-500" />
              <span className="font-bold text-sm">{point}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
