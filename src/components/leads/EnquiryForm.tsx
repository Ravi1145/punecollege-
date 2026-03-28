"use client"
import { useState, useEffect } from "react"
import { X, Send, Loader2, CheckCircle, Shield, Zap, Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface EnquiryFormProps {
  collegeName: string
  collegeSlug: string
  courses: string[]
  isOpen: boolean
  onClose: () => void
}

interface FormData {
  name: string
  phone: string
  email: string
  course: string
  message: string
  preferred_contact: "whatsapp" | "call" | "email"
  preferred_time: "morning" | "afternoon" | "evening" | ""
}

interface FormErrors {
  name?: string
  phone?: string
  email?: string
}

const initialForm: FormData = {
  name: "",
  phone: "",
  email: "",
  course: "",
  message: "",
  preferred_contact: "whatsapp",
  preferred_time: "",
}

export default function EnquiryForm({ collegeName, collegeSlug, courses, isOpen, onClose }: EnquiryFormProps) {
  const [form, setForm] = useState<FormData>(initialForm)
  const [errors, setErrors] = useState<FormErrors>({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<{ bookingRef: string } | null>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        onClose()
        setSuccess(null)
        setForm(initialForm)
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [success, onClose])

  if (!isOpen) return null

  const validate = (): boolean => {
    const newErrors: FormErrors = {}
    if (!form.name || form.name.length < 2) newErrors.name = "Name must be at least 2 characters"
    if (!form.phone || !/^[6-9]\d{9}$/.test(form.phone)) newErrors.phone = "Enter a valid 10-digit Indian mobile number"
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Invalid email address"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleBlur = (field: keyof FormErrors) => {
    const newErrors = { ...errors }
    if (field === "name" && (!form.name || form.name.length < 2)) {
      newErrors.name = "Name must be at least 2 characters"
    } else if (field === "phone" && (!form.phone || !/^[6-9]\d{9}$/.test(form.phone))) {
      newErrors.phone = "Enter a valid 10-digit Indian mobile number"
    } else if (field === "email" && form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Invalid email address"
    } else {
      delete newErrors[field]
    }
    setErrors(newErrors)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email || undefined,
          college_name: collegeName,
          college_slug: collegeSlug,
          course: form.course || undefined,
          message: form.message || undefined,
          preferred_contact: form.preferred_contact,
          preferred_time: form.preferred_time || undefined,
        }),
      })
      const data = await res.json()
      if (data.success) {
        localStorage.setItem("last_enquiry", JSON.stringify({ college: collegeName, ref: data.bookingRef }))
        setSuccess({ bookingRef: data.bookingRef })
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
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Orange top bar */}
        <div className="h-2 bg-gradient-to-r from-orange-400 to-orange-600 rounded-t-2xl" />

        {/* Header */}
        <div className="px-6 pt-5 pb-4 border-b border-gray-100">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
          <h2 className="text-lg font-bold text-gray-900 pr-10">{collegeName}</h2>
          <p className="text-sm text-orange-600 font-medium mt-0.5">Get Free Admission Info</p>
        </div>

        {success ? (
          /* Success State */
          <div className="px-6 py-10 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">✅ Enquiry Sent Successfully!</h3>
            <p className="text-sm font-semibold text-orange-600 mb-3">Reference: {success.bookingRef}</p>
            <p className="text-sm text-gray-600 mb-5">
              Our counsellor will WhatsApp you within 2 hours with detailed information.
            </p>
            <a
              href="/colleges"
              className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium text-sm"
            >
              While you wait, explore similar colleges →
            </a>
            <p className="text-xs text-gray-400 mt-4">Closing automatically…</p>
          </div>
        ) : (
          /* Form */
          <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                onBlur={() => handleBlur("name")}
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
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value.replace(/\D/g, "").slice(0, 10) }))}
                onBlur={() => handleBlur("phone")}
                placeholder="10-digit WhatsApp number"
                maxLength={10}
                className={cn(
                  "w-full border rounded-xl px-3 py-2.5 text-sm outline-none transition-colors",
                  errors.phone ? "border-red-400 focus:border-red-500" : "border-gray-200 focus:border-orange-400"
                )}
              />
              {errors.phone
                ? <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                : <p className="text-gray-400 text-xs mt-1">📱 We&apos;ll send info on WhatsApp</p>
              }
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                onBlur={() => handleBlur("email")}
                placeholder="your@email.com"
                className={cn(
                  "w-full border rounded-xl px-3 py-2.5 text-sm outline-none transition-colors",
                  errors.email ? "border-red-400 focus:border-red-500" : "border-gray-200 focus:border-orange-400"
                )}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Course */}
            {courses.length > 0 && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Course Interested In</label>
                <select
                  value={form.course}
                  onChange={(e) => setForm((p) => ({ ...p, course: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-orange-400 bg-white"
                >
                  <option value="">Select a course</option>
                  {courses.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            )}

            {/* Message */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Your Message <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <textarea
                value={form.message}
                onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                placeholder="Any specific questions about admissions, fees, placements..."
                rows={3}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-orange-400 resize-none"
              />
            </div>

            {/* Preferred Contact */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Contact</label>
              <div className="flex gap-2">
                {(["whatsapp", "call", "email"] as const).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setForm((p) => ({ ...p, preferred_contact: opt }))}
                    className={cn(
                      "flex-1 py-2 rounded-xl text-xs font-semibold border transition-all",
                      form.preferred_contact === opt
                        ? "bg-orange-500 border-orange-500 text-white"
                        : "border-gray-200 text-gray-600 hover:border-orange-300"
                    )}
                  >
                    {opt === "whatsapp" ? "📱 WhatsApp" : opt === "call" ? "📞 Call" : "📧 Email"}
                  </button>
                ))}
              </div>
            </div>

            {/* Preferred Time */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Best Time to Call</label>
              <div className="flex gap-2">
                {(["morning", "afternoon", "evening"] as const).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setForm((p) => ({ ...p, preferred_time: opt }))}
                    className={cn(
                      "flex-1 py-2 rounded-xl text-xs font-semibold border transition-all",
                      form.preferred_time === opt
                        ? "bg-[#0A1628] border-[#0A1628] text-white"
                        : "border-gray-200 text-gray-600 hover:border-gray-300"
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
                <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
              ) : (
                <><Send className="w-4 h-4" /> Send Enquiry &amp; Get Free Counselling →</>
              )}
            </button>

            {/* Trust Row */}
            <div className="flex items-center justify-center gap-5 text-xs text-gray-400">
              <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> Safe &amp; Private</span>
              <span className="flex items-center gap-1"><Star className="w-3 h-3" /> Free Service</span>
              <span className="flex items-center gap-1"><Zap className="w-3 h-3" /> 2-hr Response</span>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
