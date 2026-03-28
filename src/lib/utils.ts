import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)} LPA`
  }
  return `₹${amount.toLocaleString("en-IN")}`
}

export function formatFees(amount: number): string {
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)}L`
  }
  return `₹${amount.toLocaleString("en-IN")}`
}

export function formatFeesRange(min: number, max: number): string {
  return `${formatFees(min)} – ${formatFees(max)}/yr`
}

export function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + "..."
}

export function getNaacColor(grade: string): string {
  switch (grade) {
    case "A++": return "bg-emerald-100 text-emerald-800"
    case "A+": return "bg-green-100 text-green-800"
    case "A": return "bg-blue-100 text-blue-800"
    case "B++": return "bg-yellow-100 text-yellow-800"
    case "B+": return "bg-orange-100 text-orange-800"
    default: return "bg-gray-100 text-gray-800"
  }
}

export function getTypeColor(type: string): string {
  switch (type) {
    case "Government": return "bg-indigo-100 text-indigo-800"
    case "Deemed": return "bg-purple-100 text-purple-800"
    case "Autonomous": return "bg-teal-100 text-teal-800"
    case "Private": return "bg-rose-100 text-rose-800"
    default: return "bg-gray-100 text-gray-800"
  }
}
