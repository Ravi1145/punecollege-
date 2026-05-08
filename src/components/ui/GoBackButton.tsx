"use client"
import { ArrowLeft } from "lucide-react"

export default function GoBackButton() {
  return (
    <button
      onClick={() => window.history.back()}
      className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-orange-600 transition-colors"
    >
      <ArrowLeft className="w-4 h-4" />
      Go back to previous page
    </button>
  )
}
