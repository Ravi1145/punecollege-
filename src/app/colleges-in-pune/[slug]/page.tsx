import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { colleges } from "@/data/colleges"
import { seoPages, getSEOPageBySlug } from "@/data/seoPages"
import SEOPageTemplate from "@/components/seo/SEOPageTemplate"
import type { College } from "@/types"

interface Props {
  params: Promise<{ slug: string }>
}

function filterColleges(page: ReturnType<typeof getSEOPageBySlug>): College[] {
  if (!page) return []

  const { filterKey, filterValue, slug } = page

  // Keyword-based overrides for specialty pages
  if (slug === "top-placement-colleges-pune") {
    return [...colleges]
      .filter((c) => c.avgPlacement > 0)
      .sort((a, b) => b.avgPlacement - a.avgPlacement)
      .slice(0, 20)
  }

  if (slug === "naac-a-plus-colleges-pune") {
    return colleges.filter((c) => c.naac === "A++" || c.naac === "A+")
  }

  if (slug === "nirf-ranked-colleges-pune") {
    return [...colleges]
      .filter((c) => c.nirfRank != null)
      .sort((a, b) => (a.nirfRank ?? 999) - (b.nirfRank ?? 999))
  }

  if (slug === "btech-computer-science-colleges-pune") {
    return colleges.filter(
      (c) =>
        c.stream === "Engineering" &&
        (c.courses.some((x) => x.toLowerCase().includes("b.tech")) ||
          c.specializations.some((x) => x.toLowerCase().includes("computer")))
    )
  }

  if (slug === "mba-finance-colleges-pune") {
    return colleges.filter(
      (c) =>
        c.stream === "MBA" &&
        (c.specializations.some((x) => x.toLowerCase().includes("finance")) ||
          c.courses.some((x) => x.toLowerCase().includes("mba")))
    )
  }

  if (slug === "mba-marketing-colleges-pune") {
    return colleges.filter(
      (c) =>
        c.stream === "MBA" &&
        (c.specializations.some((x) => x.toLowerCase().includes("marketing")) ||
          c.courses.some((x) => x.toLowerCase().includes("mba")))
    )
  }

  // Location-based pages — filter by location string
  if (page.category === "location") {
    const areaMap: Record<string, string> = {
      "colleges-in-kothrud-pune": "kothrud",
      "colleges-in-shivajinagar-pune": "shivajinagar",
      "colleges-in-hinjewadi-pune": "hinjewadi",
      "colleges-in-hadapsar-pune": "hadapsar",
    }
    const area = areaMap[slug]
    if (area) {
      return colleges.filter(
        (c) => c.location.toLowerCase().includes(area) || c.address.toLowerCase().includes(area)
      )
    }
    return colleges
  }

  if (!filterKey || filterValue === undefined) return colleges

  if (filterKey === "stream") {
    // Map seoPages stream values to College type stream values
    const streamMap: Record<string, College["stream"][]> = {
      Engineering: ["Engineering"],
      MBA: ["MBA", "Management"],
      Medical: ["Medical"],
      Law: ["Law"],
      Arts: ["Arts & Science"],
      Science: ["Arts & Science"],
      Commerce: ["Arts & Science", "Management"],
      Design: ["Architecture"],
    }
    const mapped = streamMap[filterValue as string] ?? [filterValue as College["stream"]]
    return colleges.filter((c) => mapped.includes(c.stream))
  }

  if (filterKey === "type") {
    if (filterValue === "Deemed University") {
      return colleges.filter(
        (c) => c.type === "Deemed" || c.affiliation.toLowerCase().includes("deemed")
      )
    }
    return colleges.filter((c) => c.type === (filterValue as string))
  }

  if (filterKey === "hostel") {
    return colleges.filter((c) => c.hostel === true)
  }

  if (filterKey === "feesMax") {
    return colleges.filter((c) => c.feesRange.max <= (filterValue as number))
  }

  if (filterKey === "entranceExam") {
    return colleges.filter((c) =>
      c.entranceExams.some((e) =>
        e.toLowerCase().includes((filterValue as string).toLowerCase())
      )
    )
  }

  return colleges
}

export async function generateStaticParams() {
  return seoPages.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = getSEOPageBySlug(slug)
  if (!page) return {}
  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords,
    alternates: { canonical: `https://collegepune.in/colleges-in-pune/${slug}` },
  }
}

export default async function SEOCollegePage({ params }: Props) {
  const { slug } = await params
  const page = getSEOPageBySlug(slug)
  if (!page) notFound()

  const filtered = filterColleges(page)

  return <SEOPageTemplate page={page} colleges={filtered} />
}
