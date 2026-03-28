"use client"
import { useState, useEffect, useRef } from "react"
import { X, Loader2, CheckCircle, Gift } from "lucide-react"
import { cn } from "@/lib/utils"

export default function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const shownRef = useRef(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (typeof window === "undefined") return
    if (sessionStorage.getItem("exit_popup_shown")) return

    const show = () => {
      if (shownRef.current) return
      shownRef.current = true
      sessionStorage.setItem("exit_popup_shown", "1")
      if (timerRef.current) clearTimeout(timerRef.current)
      setIsOpen(true)
    }

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) show()
    }

    timerRef.current = setTimeout(show, 45000)
    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave)
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden"
    else document.body.style.overflow = ""
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

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
        body: JSON.stringify({ name, phone, source: "exit_popup" }),
      })
      const data = await res.json()
      if (data.success) {
        setSuccess(true)
        setTimeout(() => setIsOpen(false), 3000)
      } else {
        setErrors({ name: "Submission failed. Try again." })
      }
    } catch {
      setErrors({ name: "Network error. Try again." })
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
        {/* Top gradient */}
        <div className="h-1.5 bg-gradient-to-r from-orange-400 to-orange-600" />

        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 w-7 h-7 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors z-10"
        >
          <X className="w-3.5 h-3.5 text-gray-600" />
        </button>

        {success ? (
          <div className="px-6 py-10 text-center">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-7 h-7 text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">You&apos;re on the list!</h3>
            <p className="text-sm text-gray-600">We&apos;ll send you the Pune colleges guide on WhatsApp shortly.</p>
          </div>
        ) : (
          <div className="px-6 py-5">
            <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mx-auto mb-3">
              <Gift className="w-6 h-6 text-orange-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center mb-1">Wait! Before you go…</h3>
            <p className="text-sm text-gray-500 text-center mb-4">
              Get our <strong className="text-orange-600">FREE Pune Colleges Guide 2025</strong> on WhatsApp — fees, cutoffs & placement data.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className={cn(
                    "w-full border rounded-xl px-3 py-2.5 text-sm outline-none transition-colors",
                    errors.name ? "border-red-400" : "border-gray-200 focus:border-orange-400"
                  )}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  placeholder="WhatsApp number"
                  maxLength={10}
                  className={cn(
                    "w-full border rounded-xl px-3 py-2.5 text-sm outline-none transition-colors",
                    errors.phone ? "border-red-400" : "border-gray-200 focus:border-orange-400"
                  )}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:opacity-60 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all text-sm"
              >
                {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</> : "📱 Send Me the Free Guide"}
              </button>
              <p className="text-center text-xs text-gray-400">No spam. Unsubscribe anytime.</p>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
