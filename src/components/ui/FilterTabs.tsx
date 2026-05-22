"use client"
import { cn } from "@/lib/utils"

interface FilterTabsProps {
  tabs: string[]
  active: string
  onChange: (tab: string) => void
  className?: string
}

export default function FilterTabs({ tabs, active, onChange, className }: FilterTabsProps) {
  return (
    <div className={cn("flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden", className)}>
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={cn(
            "flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-all whitespace-nowrap",
            active === tab
              ? "bg-[#0A1628] border-[#0A1628] text-white"
              : "bg-white border-gray-200 text-gray-600 hover:border-[#0A1628] hover:text-[#0A1628]"
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}
