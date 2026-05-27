'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Sparkles } from 'lucide-react'

interface Props {
  collegeId: string
  collegeName: string
  hasDetails: boolean
}

export default function GenerateDetailsButton({ collegeId, collegeName, hasDetails }: Props) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [overwrite, setOverwrite] = useState(false)
  const [, startTransition] = useTransition()
  const router = useRouter()

  async function generate() {
    if (hasDetails && !overwrite) {
      const confirmed = window.confirm(
        `"${collegeName}" already has AI-generated details.\n\nDo you want to REGENERATE and overwrite them?\n\nThis will replace all existing details with fresh AI content.`
      )
      if (!confirmed) return
      setOverwrite(true)
    }

    setStatus('loading')
    setMessage('')

    startTransition(async () => {
      try {
        const res = await fetch(`/api/admin/colleges/${collegeId}/generate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ overwrite: hasDetails || overwrite }),
        })

        const json = await res.json().catch(() => ({})) as Record<string, unknown>

        if (!res.ok) {
          if (res.status === 409) {
            // Details exist — ask to overwrite
            setStatus('idle')
            setOverwrite(true)
            setMessage('Details already exist. Click again to overwrite.')
          } else {
            setStatus('error')
            setMessage((json.error as string) || `Error ${res.status}`)
          }
          return
        }

        setStatus('done')
        const sections = (json.sections_generated as string[]) ?? []
        setMessage(`Generated ${sections.length} sections: ${sections.join(', ')}`)
        setOverwrite(false)
        router.refresh()
      } catch {
        setStatus('error')
        setMessage('Network error — please try again')
      }
    })
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={generate}
          disabled={status === 'loading'}
          className={`
            inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all
            ${status === 'loading'
              ? 'bg-purple-100 text-purple-400 cursor-wait'
              : status === 'done'
              ? 'bg-green-100 text-green-700 border border-green-200 hover:bg-green-200'
              : status === 'error'
              ? 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100'
              : hasDetails
              ? 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100'
              : 'bg-purple-600 text-white hover:bg-purple-700 shadow-sm'
            }
          `}
        >
          <Sparkles className={`w-4 h-4 ${status === 'loading' ? 'animate-spin' : ''}`} />
          {status === 'loading'
            ? 'Generating with AI…'
            : status === 'done'
            ? '✓ Generated!'
            : hasDetails
            ? '♻ Regenerate with AI'
            : '✨ Generate with AI'}
        </button>

        {hasDetails && status === 'idle' && (
          <span className="text-xs text-green-600 font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
            Details filled
          </span>
        )}
      </div>

      {message && (
        <p className={`text-xs leading-relaxed max-w-md ${
          status === 'error' ? 'text-red-600' :
          status === 'done' ? 'text-green-700' :
          'text-amber-700'
        }`}>
          {status === 'done' ? '✓ ' : status === 'error' ? '⚠ ' : 'ℹ '}{message}
        </p>
      )}

      <p className="text-xs text-gray-400 leading-relaxed max-w-md">
        Uses Claude AI to generate courses & fees, admission steps, placements, scholarships,
        facilities, FAQs, cutoffs and rankings for this college. Takes ~10 seconds.
      </p>
    </div>
  )
}
