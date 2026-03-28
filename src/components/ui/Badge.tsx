"use client"
import { cn } from "@/lib/utils"

interface BadgeProps {
  children: React.ReactNode
  variant?: "default" | "naac" | "nirf" | "type" | "tag" | "success" | "warning"
  className?: string
}

export default function Badge({ children, variant = "default", className }: BadgeProps) {
  const variants = {
    default: "bg-gray-100 text-gray-700",
    naac: "bg-emerald-100 text-emerald-800 font-semibold",
    nirf: "bg-orange-100 text-orange-800 font-semibold",
    type: "bg-indigo-100 text-indigo-800",
    tag: "bg-blue-50 text-blue-700",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
  }

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
