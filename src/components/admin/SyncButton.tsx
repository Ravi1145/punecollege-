'use client'
import { useState, useTransition } from 'react'

interface Props {
  action: () => Promise<{ success: number; failed: number; errors: string[] }>
  label: string
  confirmMsg?: string
}

export default function SyncButton({ action, label, confirmMsg }: Props) {
  const [isPending, startTransition] = useTransition()
  const [result, setResult] = useState<{ success: number; failed: number; errors: string[] } | null>(null)

  function handleClick() {
    if (confirmMsg && !window.confirm(confirmMsg)) return
    setResult(null)
    startTransition(async () => {
      const res = await action()
      setResult(res)
      // Reload to show updated list
      window.location.reload()
    })
  }

  return (
    <div className="inline-flex flex-col items-end gap-1">
      <button
        onClick={handleClick}
        disabled={isPending}
        className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-semibold hover:bg-orange-600 disabled:opacity-50 transition-colors"
      >
        {isPending ? '⏳ Syncing...' : label}
      </button>
      {result && (
        <div className={`text-xs px-2 py-1 rounded ${result.failed > 0 ? 'text-red-700 bg-red-50' : 'text-green-700 bg-green-50'}`}>
          ✅ {result.success} synced{result.failed > 0 ? ` · ❌ ${result.failed} failed` : ''}
        </div>
      )}
    </div>
  )
}
