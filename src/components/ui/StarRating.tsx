"use client"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface StarRatingProps {
  rating: number
  reviewCount?: number
  size?: "sm" | "md" | "lg"
  showCount?: boolean
  className?: string
}

export default function StarRating({
  rating,
  reviewCount,
  size = "md",
  showCount = true,
  className,
}: StarRatingProps) {
  const sizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  }

  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  }

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              sizes[size],
              star <= Math.floor(rating)
                ? "fill-amber-400 text-amber-400"
                : star - 0.5 <= rating
                ? "fill-amber-200 text-amber-400"
                : "fill-gray-200 text-gray-300"
            )}
          />
        ))}
      </div>
      <span className={cn("font-semibold text-gray-800", textSizes[size])}>
        {rating.toFixed(1)}
      </span>
      {showCount && reviewCount !== undefined && (
        <span className={cn("text-gray-500", textSizes[size])}>
          ({reviewCount.toLocaleString()} reviews)
        </span>
      )}
    </div>
  )
}
