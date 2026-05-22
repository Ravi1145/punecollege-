'use client'
import { useTransition } from 'react'

interface Props {
  action: () => Promise<void>
  label?: string
}

export default function DeleteButton({ action, label = 'Delete' }: Props) {
  const [pending, startTransition] = useTransition()

  function handleClick() {
    if (!confirm('Are you sure? This cannot be undone.')) return
    startTransition(() => { action() })
  }

  return (
    <button
      onClick={handleClick}
      disabled={pending}
      className="px-2.5 py-1 text-xs bg-red-100 text-red-600 rounded-lg hover:bg-red-200 disabled:opacity-50 transition-colors"
    >
      {pending ? '...' : label}
    </button>
  )
}
