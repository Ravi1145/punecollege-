"use client"
import { useState, useEffect } from "react"
import { GitCompare, X, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

interface CompareButtonProps {
  collegeSlug: string
  collegeName: string
}

const COMPARE_KEY = "compare_colleges"

export default function CompareButton({ collegeSlug, collegeName }: CompareButtonProps) {
  const [isSelected, setIsSelected] = useState(false)
  const [compareList, setCompareList] = useState<{ slug: string; name: string }[]>([])
  const router = useRouter()

  useEffect(() => {
    const stored = localStorage.getItem(COMPARE_KEY)
    if (stored) {
      const list = JSON.parse(stored)
      setCompareList(list)
      setIsSelected(list.some((c: { slug: string }) => c.slug === collegeSlug))
    }
  }, [collegeSlug])

  const toggleCompare = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const stored = localStorage.getItem(COMPARE_KEY)
    let list: { slug: string; name: string }[] = stored ? JSON.parse(stored) : []

    if (isSelected) {
      list = list.filter((c) => c.slug !== collegeSlug)
    } else {
      if (list.length >= 2) {
        alert("You can compare only 2 colleges at a time. Remove one first.")
        return
      }
      list.push({ slug: collegeSlug, name: collegeName })
    }

    localStorage.setItem(COMPARE_KEY, JSON.stringify(list))
    setCompareList(list)
    setIsSelected(!isSelected)
  }

  return (
    <button
      onClick={toggleCompare}
      className={cn(
        "flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-all",
        isSelected
          ? "bg-navy-50 border-navy-200 text-navy-700 bg-[#0A1628]/10 border-[#0A1628]/20 text-[#0A1628]"
          : "border-gray-200 text-gray-600 hover:border-orange-300 hover:text-orange-600"
      )}
      title={isSelected ? "Remove from compare" : "Add to compare"}
    >
      {isSelected ? (
        <>
          <X className="w-3 h-3" /> Remove
        </>
      ) : (
        <>
          <GitCompare className="w-3 h-3" /> Compare
        </>
      )}
    </button>
  )
}

export function CompareFloatingBar() {
  const [compareList, setCompareList] = useState<{ slug: string; name: string }[]>([])
  const router = useRouter()

  useEffect(() => {
    const checkStorage = () => {
      const stored = localStorage.getItem(COMPARE_KEY)
      if (stored) setCompareList(JSON.parse(stored))
      else setCompareList([])
    }
    checkStorage()
    window.addEventListener("storage", checkStorage)
    const interval = setInterval(checkStorage, 500)
    return () => {
      window.removeEventListener("storage", checkStorage)
      clearInterval(interval)
    }
  }, [])

  const removeFromCompare = (slug: string) => {
    const newList = compareList.filter((c) => c.slug !== slug)
    localStorage.setItem(COMPARE_KEY, JSON.stringify(newList))
    setCompareList(newList)
  }

  const clearAll = () => {
    localStorage.removeItem(COMPARE_KEY)
    setCompareList([])
  }

  if (compareList.length === 0) return null

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40 bg-[#0A1628] text-white rounded-2xl shadow-2xl px-5 py-3 flex items-center gap-4 border border-white/10">
      <GitCompare className="w-5 h-5 text-orange-400 flex-shrink-0" />
      <div className="flex items-center gap-3">
        {compareList.map((c) => (
          <div key={c.slug} className="flex items-center gap-1.5 bg-white/10 rounded-lg px-3 py-1">
            <span className="text-sm font-medium max-w-32 truncate">{c.name}</span>
            <button onClick={() => removeFromCompare(c.slug)} className="text-white/60 hover:text-white">
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
        {compareList.length === 1 && (
          <span className="text-sm text-white/60">Select 1 more college</span>
        )}
      </div>
      {compareList.length === 2 && (
        <button
          onClick={() => router.push(`/compare?c1=${compareList[0].slug}&c2=${compareList[1].slug}`)}
          className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
        >
          Compare Now <ArrowRight className="w-4 h-4" />
        </button>
      )}
      <button onClick={clearAll} className="text-white/40 hover:text-white/70 ml-1">
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}
