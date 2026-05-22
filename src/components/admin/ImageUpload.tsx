'use client'
import { useRef, useState } from 'react'

interface Props {
  label: string
  name: string          // hidden input name that holds the final URL
  defaultValue?: string
  folder?: string       // storage sub-folder: 'logos' | 'covers'
  hint?: string
  aspectClass?: string  // tailwind class for preview box aspect ratio
}

export default function ImageUpload({
  label,
  name,
  defaultValue = '',
  folder = 'misc',
  hint,
  aspectClass = 'h-24',
}: Props) {
  const [url, setUrl] = useState(defaultValue)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setError('')
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('folder', folder)
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      const json = await res.json()
      if (!res.ok || json.error) {
        setError(json.error || 'Upload failed')
      } else {
        setUrl(json.url)
      }
    } catch {
      setError('Network error — try again')
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  function handleRemove() {
    setUrl('')
    setError('')
  }

  const isSvg = url?.toLowerCase().endsWith('.svg')

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      {/* Preview */}
      {url && (
        <div className={`relative w-fit ${isSvg ? 'p-2 bg-gray-50 border border-gray-200 rounded-lg' : ''}`}>
          <img
            src={url}
            alt="Preview"
            className={`${aspectClass} w-auto object-contain rounded border border-gray-200 bg-white p-1`}
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center hover:bg-red-600 leading-none"
            title="Remove image"
          >
            ×
          </button>
        </div>
      )}

      {/* Hidden input holds the URL — submitted with the form */}
      <input type="hidden" name={name} value={url} />

      {/* URL text input + upload button row */}
      <div className="flex gap-2">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://… or upload below"
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="px-3 py-2 bg-gray-100 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 disabled:opacity-50 transition-colors whitespace-nowrap"
        >
          {uploading ? '⏳ Uploading…' : '📁 Upload'}
        </button>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/svg+xml,image/gif"
        className="hidden"
        onChange={handleFile}
      />

      {hint && <p className="text-xs text-gray-400">{hint}</p>}
      {error && <p className="text-xs text-red-600">⚠ {error}</p>}
    </div>
  )
}
