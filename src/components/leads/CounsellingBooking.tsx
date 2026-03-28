"use client"
import { useState } from "react"
import { Loader2, CheckCircle, Calendar, Clock, User, Phone, BookOpen } from "lucide-react"
import { cn } from "@/lib/utils"

interface FormData {
  name: string
  phone: string
  stream: string
  preferred_date: string
  preferred_time: "morning" | "afternoon" | "evening" | ""
}

interface FormErrors {
  name?: string
  phone?: string
}

const initialForm: FormData = {
  name: "",
  phone: "",
  stream: "",
  preferred_date: "",
  preferred_time: "",
}

const streams = ["Engineering", "Medical", "MBA", "Law", "Arts & Science", "Commerce", "Design", "Pharmacy", "Other"]

export default function CounsellingBooking() {
  const [form, setForm] = useState<FormData>(initialForm)
  const [errors, setErrors] = useState<FormErrors>({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<{ bookingRef: string } | null>(null)

  const validate = (): boolean => {
    const newErrors: FormErrors = {}
    if (!form.name || form.name.length < 2) newErrors.name = "Name must be at least 2 characters"
    if (!form.phone || !/^[6-9]\d{9}$/.test(form.phone)) newErrors.phone = "Enter a valid 10-digit Indian mobile number"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      const res = await fetch("/api/counselling", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          stream: form.stream || undefined,
          preferred_date: form.preferred_date || undefined,
          preferred_time: form.preferred_time || undefined,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setSuccess({ bookingRef: data.bookingRef })
        setForm(initialForm)
      } else {
        setErrors({ name: "Submission failed. Please try again." })
      }
    } catch {
      setErrors({ name: "Network error. Please try again." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="bg-gradient-to-br from-[#0A1628] via-[#1a2d50] to-[#c2410c] py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left: Text */}
          <div className="text-white">
            <span className="inline-block bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
              100% FREE
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold leading-tight mb-4">
              Book a Free 15-Min Expert Counselling Session
            </h2>
            <p className="text-blue-100 text-base mb-6">
              Talk to our Pune education experts. Get personalized guidance on colleges, courses, fees, and admission strategy — completely free.
            </p>
            <ul className="space-y-3 text-sm text-blue-100">
              {[
                "Personalized college shortlist based on your profile",
                "Fees, scholarships & hostel info for every college",
                "Direct admission process guidance",
                "100% confidential — no spam calls",
              ].map((point) => (
                <li key={point} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-orange-400 mt-0.5 shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex items-center gap-4 text-sm text-blue-200">
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> 15-min session</span>
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Mon – Sat</span>
              <span className="flex items-center gap-1.5"><Phone className="w-4 h-4" /> WhatsApp / Call</span>
            </div>
          </div>

          {/* Right: Form Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-6">
            {success ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Session Booked!</h3>
                <p className="text-sm font-semibold text-orange-600 mb-3">Reference: {success.bookingRef}</p>
                <p className="text-sm text-gray-600">
                  Our counsellor will call/WhatsApp you to confirm the time. Get ready for your free session!
                </p>
                <button
                  onClick={() => setSuccess(null)}
                  className="mt-5 text-sm text-orange-600 hover:text-orange-700 font-medium underline"
                >
                  Book another session
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="text-center mb-2">
                  <h3 className="text-lg font-bold text-gray-900">Book Your Free Session</h3>
                  <p className="text-xs text-gray-500">Usually confirmed within 1 hour</p>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> Full Name <span className="text-red-500">*</span></span>
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    placeholder="Your full name"
                    className={cn(
                      "w-full border rounded-xl px-3 py-2.5 text-sm outline-none transition-colors",
                      errors.name ? "border-red-400 focus:border-red-500" : "border-gray-200 focus:border-orange-400"
                    )}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> WhatsApp Number <span className="text-red-500">*</span></span>
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value.replace(/\D/g, "").slice(0, 10) }))}
                    placeholder="10-digit WhatsApp number"
                    maxLength={10}
                    className={cn(
                      "w-full border rounded-xl px-3 py-2.5 text-sm outline-none transition-colors",
                      errors.phone ? "border-red-400 focus:border-red-500" : "border-gray-200 focus:border-orange-400"
                    )}
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>

                {/* Stream */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    <span className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5" /> Stream / Field</span>
                  </label>
                  <select
                    value={form.stream}
                    onChange={(e) => setForm((p) => ({ ...p, stream: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-orange-400 bg-white"
                  >
                    <option value="">Select your stream</option>
                    {streams.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                {/* Preferred Date */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Preferred Date</span>
                  </label>
                  <input
                    type="date"
                    value={form.preferred_date}
                    onChange={(e) => setForm((p) => ({ ...p, preferred_date: e.target.value }))}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-orange-400"
                  />
                </div>

                {/* Preferred Time */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Preferred Time</span>
                  </label>
                  <div className="flex gap-2">
                    {(["morning", "afternoon", "evening"] as const).map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setForm((p) => ({ ...p, preferred_time: opt }))}
                        className={cn(
                          "flex-1 py-2 rounded-xl text-xs font-semibold border transition-all",
                          form.preferred_time === opt
                            ? "bg-orange-500 border-orange-500 text-white"
                            : "border-gray-200 text-gray-600 hover:border-orange-300"
                        )}
                      >
                        {opt === "morning" ? "☀️ Morning" : opt === "afternoon" ? "🌤 Afternoon" : "🌆 Evening"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:opacity-60 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all text-sm"
                >
                  {loading ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Booking...</>
                  ) : (
                    <>Book Free Session 📅</>
                  )}
                </button>
                <p className="text-center text-xs text-gray-400">No spam. 100% free. Cancel anytime.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
