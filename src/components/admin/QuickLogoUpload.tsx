'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface Props {
  collegeId: string
  collegeName: string
  currentLogo?: string | null
}

export default function QuickLogoUpload({ collegeId, collegeName, currentLogo }: Props) {
  const [logo, setLogo] = useState(currentLogo ?? '')
  const [uploading, setUploading] = useState(false)
  const [open, setOpen] = useState(false)
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setError('')
    setUploading(true)
    setSaved(false)
    try {
      // 1. Upload to Supabase Storage
      const fd = new FormData()
      fd.append('file', file)
      fd.append('folder', 'logos')
      const upRes = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      const upJson = await upRes.json()
      if (!upRes.ok || upJson.error) { setError(upJson.error || 'Upload failed'); return }

      // 2. Save logo_url to DB
      const saveRes = await fetch(`/api/admin/colleges/${collegeId}/logo`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ logo_url: upJson.url }),
      })
      if (!saveRes.ok) { setError('Logo uploaded but DB save failed'); return }

      setLogo(upJson.url)
      setSaved(true)
      router.refresh()  // refresh admin table to show updated logo thumbnail
    } catch {
      setError('Network error — try again')
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  async function removeLogo() {
    setError('')
    setSaved(false)
    try {
      const res = await fetch(`/api/admin/colleges/${collegeId}/logo`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ logo_url: null }),
      })
      if (res.ok) { setLogo(''); setSaved(true); router.refresh() }
      else setError('Could not remove logo')
    } catch {
      setError('Network error')
    }
  }

  return (
    <div className="relative">
      {/* Trigger button — shows current logo thumbnail or placeholder */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        title={`Upload logo for ${collegeName}`}
        className="w-8 h-8 rounded-lg border border-gray-200 overflow-hidden flex items-center justify-center hover:border-orange-400 hover:shadow transition-all bg-gray-50"
      >
        {logo ? (
          <Image src={logo} alt="logo" width={32} height={32} className="object-contain p-0.5" />
        ) : (
          <span className="text-[9px] font-bold text-gray-400 leading-none text-center px-0.5">
            {collegeName.slice(0, 2).toUpperCase()}
          </span>
        )}
      </button>

      {/* Popover */}
      {open && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />

          <div className="absolute right-0 top-10 z-50 w-64 bg-white border border-gray-200 rounded-2xl shadow-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-gray-700 truncate pr-2">{collegeName}</p>
              <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600 text-lg leading-none">×</button>
            </div>

            {/* Current logo preview */}
            {logo && (
              <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-2 border border-gray-100">
                <Image src={logo} alt="Current logo" width={48} height={48} className="object-contain w-12 h-12 rounded-lg bg-white p-1 border border-gray-200" />
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] text-gray-500 truncate">{logo.split('/').pop()}</p>
                  {saved && <p className="text-[11px] text-green-600 font-semibold">✓ Saved</p>}
                </div>
                <button
                  type="button"
                  onClick={removeLogo}
                  className="text-red-400 hover:text-red-600 text-xs font-semibold shrink-0"
                  title="Remove logo"
                >
                  Remove
                </button>
              </div>
            )}

            {!logo && saved && (
              <p className="text-xs text-green-600 font-semibold text-center">✓ Logo removed</p>
            )}

            {/* Upload area */}
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-gray-300 hover:border-orange-400 hover:bg-orange-50 rounded-xl text-sm font-semibold text-gray-500 hover:text-orange-600 transition-all disabled:opacity-50"
            >
              {uploading ? (
                <>
                  <span className="animate-spin">⏳</span> Uploading…
                </>
              ) : (
                <>📁 {logo ? 'Replace Logo' : 'Upload Logo'}</>
              )}
            </button>

            <p className="text-[11px] text-gray-400 text-center">
              PNG, JPG, SVG · max 5 MB · auto-saved to DB
            </p>

            {error && <p className="text-xs text-red-600 text-center">⚠ {error}</p>}

            {/* Hidden file input */}
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/svg+xml"
              className="hidden"
              onChange={handleFile}
            />
          </div>
        </>
      )}
    </div>
  )
}
