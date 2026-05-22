'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Star } from 'lucide-react'

interface Props {
  collegeId: string
  collegeName: string
  featured: boolean
}

export default function FeatureToggle({ collegeId, collegeName, featured: initialFeatured }: Props) {
  const [featured, setFeatured] = useState(initialFeatured)
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState('')
  const router = useRouter()

  function toggle() {
    setError('')
    startTransition(async () => {
      try {
        const res = await fetch(`/api/admin/colleges/${collegeId}/featured`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ featured: !featured }),
        })
        if (res.ok) {
          setFeatured(!featured)
          router.refresh()  // refresh the admin page counts/banner
        } else {
          const json = await res.json().catch(() => ({}))
          setError(json.error || `Error ${res.status}`)
        }
      } catch {
        setError('Network error')
      }
    })
  }

  return (
    <div className="flex flex-col items-start gap-0.5">
      <button
        type="button"
        onClick={toggle}
        disabled={pending}
        title={featured ? `Unfeature ${collegeName}` : `Feature ${collegeName} on homepage`}
        className={`
          inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold border transition-all
          ${pending ? 'opacity-50 cursor-wait' : 'cursor-pointer'}
          ${featured
            ? 'bg-amber-50 border-amber-300 text-amber-700 hover:bg-amber-100'
            : 'bg-gray-50 border-gray-200 text-gray-400 hover:bg-amber-50 hover:border-amber-300 hover:text-amber-600'
          }
        `}
      >
        <Star className={`w-3 h-3 ${featured ? 'fill-amber-500 text-amber-500' : ''}`} />
        {pending ? '…' : featured ? 'Featured' : 'Feature'}
      </button>
      {error && (
        <span className="text-[10px] text-red-500 leading-tight max-w-[90px] truncate" title={error}>
          ⚠ {error}
        </span>
      )}
    </div>
  )
}
