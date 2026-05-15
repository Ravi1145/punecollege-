"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

interface SiteSettings {
  whatsapp_number: string
  lead_notification_email: string
  announcement_text: string
  announcement_color: string
  exit_popup_enabled: boolean
  scholarship_deadline: string
}

const DEFAULTS: SiteSettings = {
  whatsapp_number: "",
  lead_notification_email: "",
  announcement_text: "",
  announcement_color: "#FF6A00",
  exit_popup_enabled: false,
  scholarship_deadline: "",
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULTS)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const key = localStorage.getItem("admin_key")
    if (!key) { router.replace("/admin/login"); return }

    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/admin/settings", {
          headers: { "x-admin-key": key },
        })
        if (res.status === 401) { router.replace("/admin/login"); return }
        if (res.ok) {
          const data = await res.json()
          if (data && typeof data === "object") {
            setSettings({ ...DEFAULTS, ...data })
          }
        }
      } catch {
        // fall through — keep DEFAULTS
      } finally {
        setLoading(false)
      }
    }

    fetchSettings()
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const key = localStorage.getItem("admin_key")
    if (!key) { router.replace("/admin/login"); return }

    setSaving(true)
    try {
      await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": key,
        },
        body: JSON.stringify(settings),
      })
      setToast(true)
      setTimeout(() => setToast(false), 3000)
    } catch {
      // silent fail — no crash
    } finally {
      setSaving(false)
    }
  }

  const set = <K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48 text-gray-400 text-sm">
        Loading settings…
      </div>
    )
  }

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-xl font-bold text-[#0A1628]">Site Settings</h1>

      {toast && (
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-sm font-medium px-4 py-3 rounded-xl">
          <span>✓</span> Settings saved ✓
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-6">

        {/* Contact */}
        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-100 pb-2">
            Contact
          </h2>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700" htmlFor="whatsapp_number">
              WhatsApp Number
            </label>
            <input
              id="whatsapp_number"
              type="text"
              placeholder="+91 98765 43210"
              value={settings.whatsapp_number}
              onChange={(e) => set("whatsapp_number", e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-orange-400 transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700" htmlFor="lead_notification_email">
              Lead Notification Email
            </label>
            <input
              id="lead_notification_email"
              type="email"
              placeholder="admin@collegepune.com"
              value={settings.lead_notification_email}
              onChange={(e) => set("lead_notification_email", e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-orange-400 transition-colors"
            />
          </div>
        </section>

        {/* Announcement Bar */}
        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-100 pb-2">
            Announcement Bar
          </h2>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700" htmlFor="announcement_text">
              Announcement Text
            </label>
            <input
              id="announcement_text"
              type="text"
              placeholder="e.g. Admissions Open 2026!"
              value={settings.announcement_text}
              onChange={(e) => set("announcement_text", e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-orange-400 transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700" htmlFor="announcement_color">
              Announcement Bar Color
            </label>
            <div className="flex items-center gap-3">
              <input
                id="announcement_color"
                type="color"
                value={settings.announcement_color}
                onChange={(e) => set("announcement_color", e.target.value)}
                className="h-9 w-16 rounded-lg border border-gray-200 cursor-pointer p-0.5"
              />
              <span className="text-sm text-gray-500 font-mono">{settings.announcement_color}</span>
            </div>
          </div>
        </section>

        {/* Popups & Deadlines */}
        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-100 pb-2">
            Popups &amp; Deadlines
          </h2>
          <div className="flex items-center gap-3">
            <input
              id="exit_popup_enabled"
              type="checkbox"
              checked={settings.exit_popup_enabled}
              onChange={(e) => set("exit_popup_enabled", e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 accent-orange-500 cursor-pointer"
            />
            <label className="text-sm font-medium text-gray-700 cursor-pointer" htmlFor="exit_popup_enabled">
              Enable Exit-Intent Popup
            </label>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700" htmlFor="scholarship_deadline">
              Scholarship Deadline
            </label>
            <input
              id="scholarship_deadline"
              type="date"
              value={settings.scholarship_deadline}
              onChange={(e) => set("scholarship_deadline", e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-orange-400 transition-colors w-fit"
            />
          </div>
        </section>

        <div className="pt-2">
          <button
            type="submit"
            disabled={saving}
            className={cn(
              "bg-[var(--color-accent)] text-white font-bold px-6 py-2.5 rounded-xl transition-opacity",
              saving && "opacity-60 cursor-not-allowed"
            )}
          >
            {saving ? "Saving…" : "Save Settings"}
          </button>
        </div>
      </form>
    </div>
  )
}
