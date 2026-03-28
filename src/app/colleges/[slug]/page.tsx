import { Metadata } from "next"
import { notFound } from "next/navigation"
import Script from "next/script"
import { colleges, getCollegeBySlug } from "@/data/colleges"
import CollegeProfile from "@/components/colleges/CollegeProfile"
import { generateMetadata as genMeta, generateBreadcrumbSchema, generateCollegeSchema } from "@/lib/seo"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return colleges.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const college = getCollegeBySlug(slug)
  if (!college) return {}

  return genMeta({
    title: `${college.name} — Fees, Placements, Cutoff 2025`,
    description: `${college.name} (${college.shortName}) — ${college.type} college in ${college.location}. NAAC ${college.naac}${college.nirfRank ? `, NIRF Rank ${college.nirfRank}` : ""}. Annual fees: ₹${(college.feesRange.min / 100000).toFixed(1)}L-${(college.feesRange.max / 100000).toFixed(1)}L. Avg placement: ₹${(college.avgPlacement / 100000).toFixed(1)}L PA. ${college.description.slice(0, 100)}`,
    path: `/colleges/${slug}`,
    keywords: [
      college.name.toLowerCase(),
      college.shortName.toLowerCase(),
      `${college.shortName.toLowerCase()} fees`,
      `${college.shortName.toLowerCase()} placements`,
      `${college.shortName.toLowerCase()} admission`,
      "colleges in pune",
    ],
  })
}

export default async function CollegePage({ params }: Props) {
  const { slug } = await params
  const college = getCollegeBySlug(slug)
  if (!college) notFound()

  const breadcrumb = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Colleges in Pune", url: "/colleges" },
    { name: college.shortName, url: `/colleges/${slug}` },
  ])

  const collegeSchema = generateCollegeSchema({
    name: college.name,
    description: college.description,
    address: college.address,
    phone: college.phone,
    email: college.email,
    website: college.website,
    established: college.established,
  })

  return (
    <>
      <Script id="breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Script id="college-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collegeSchema) }} />
      <div className="bg-[#F8FAFC] min-h-screen">
        <CollegeProfile college={college} />
      </div>
    </>
  )
}
