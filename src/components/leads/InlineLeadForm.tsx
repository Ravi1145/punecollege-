"use client"
import { useState } from "react"
import { Loader2, CheckCircle, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface InlineLeadFormProps {
  context?: string
}

export default function InlineLeadForm({ context }: InlineLeadFormProps) {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const validate = () => {
    const newErrors: { name?: string; phone?: string } = {}
    if (!name || name.length < 2) newErrors.name = "Enter your name"
    if (!phone || !/^[6-9]\d{9}$/.test(phone)) newErrors.phone = "Enter valid 10-digit number"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, source: "inline_form", message: context }),
      })
      const data = await res.json()
      if (data.success) {
        setSuccess(true)
      } else {
        setErrors({ name: "Submission failed. Try again." })
      }
    } catch {
      setErrors({ name: "Network error. Try again." })
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="border-l-4 border-green-500 bg-green-50 rounded-xl p-4 flex items-center gap-3">
        <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
        <div>
          <p className="text-sm font-semibold text-green-800">We&apos;ll call you within 2 hours!</p>
          <p className="text-xs text-green-600">Our counsellor will WhatsApp you with college details.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="border-l-4 border-orange-500 bg-orange-50 rounded-xl p-4">
      <p className="text-sm font-bold text-gray-900 mb-3">
        🎓 Get free guidance on Pune colleges — our expert calls you back within 2 hrs
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <div className="flex-1 min-w-0">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className={cn(
              "w-full border rounded-lg px-3 py-2 text-sm outline-none transition-colors bg-white",
              errors.name ? "border-red-400" : "border-gray-200 focus:border-orange-400"
            )}
          />
          {errors.name && <p className="text-red-500 text-xs mt-0.5">{errors.name}</p>}
        </div>
        <div className="flex-1 min-w-0">
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
            placeholder="WhatsApp number"
            maxLength={10}
            className={cn(
              "w-full border rounded-lg px-3 py-2 text-sm outline-none transition-colors bg-white",
              errors.phone ? "border-red-400" : "border-gray-200 focus:border-orange-400"
            )}
          />
          {errors.phone && <p className="text-red-500 text-xs mt-0.5">{errors.phone}</p>}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-bold px-4 py-2 rounded-lg flex items-center justify-center gap-1.5 transition-colors text-sm whitespace-nowrap"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <><ArrowRight className="w-4 h-4" /> Get Info</>
          )}
        </button>
      </form>
    </div>
  )
}
