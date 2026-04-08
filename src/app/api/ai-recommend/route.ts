import { NextRequest, NextResponse } from "next/server"
import { anthropic } from "@/lib/anthropic"
import { colleges } from "@/data/colleges"

export const runtime = "nodejs"

export async function POST(req: NextRequest) {
  try {
    const { stream, budget, careerGoal, examType, examScore, preferences } = await req.json()

    const collegesSummary = colleges
      .map(
        (c) =>
          `${c.name} (${c.shortName}): ${c.stream}, NAAC ${c.naac}, fees ₹${Math.round(c.feesRange.min / 100000)}L-${Math.round(c.feesRange.max / 100000)}L/yr, avg pkg ₹${Math.round(c.avgPlacement / 100000)}L PA, exams: ${c.entranceExams.join("/")}, hostel: ${c.hostel}, slug: ${c.slug}`
      )
      .join("\n")

    const userQuery = `
Student Profile:
- Stream of interest: ${stream}
- Annual budget: ₹${Math.round(Number(budget) / 100000)}L
- Career goal: ${careerGoal || "Not specified"}
- Entrance exam: ${examType}
- Score/percentile: ${examScore || "Not specified"}
- Preferences: ${preferences?.join(", ") || "None"}

Available Pune Colleges:
${collegesSummary}

Based on this student profile, recommend the TOP 3 best matching colleges from the list above. Respond ONLY with valid JSON in this exact format:
{
  "colleges": [
    {
      "college": "Full College Name",
      "slug": "college-slug-from-list",
      "matchScore": 92,
      "reasons": ["reason 1", "reason 2", "reason 3"],
      "fees": "₹X.XL - ₹X.XL/yr",
      "avgPackage": "₹X LPA",
      "admissionTip": "specific tip for this student"
    }
  ],
  "reasoning": "Brief 2-sentence explanation of the overall recommendation strategy"
}`

    const message = await anthropic.messages.create({
      model: "claude-haiku-4-5-20261001",
      max_tokens: 1500,
      system: "You are an expert Pune college admissions counselor. Respond only with valid JSON. No markdown, no extra text.",
      messages: [{ role: "user", content: userQuery }],
    })

    const responseText = message.content[0].type === "text" ? message.content[0].text : ""

    let parsed
    try {
      const jsonMatch = responseText.match(/\{[\s\S]*\}/)
      parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : null
    } catch {
      parsed = null
    }

    if (!parsed) {
      return NextResponse.json(
        {
          colleges: [
            {
              college: "COEP Pune",
              slug: "coep-college-of-engineering-pune",
              matchScore: 85,
              reasons: ["Top government engineering college", "Affordable fees", "NIRF Rank 49"],
              fees: "₹0.8L - ₹1.8L/yr",
              avgPackage: "₹12 LPA",
              admissionTip: "Apply via MHT-CET with 95+ percentile for engineering streams"
            }
          ],
          reasoning: "Based on your profile, we recommend these top-rated Pune colleges. Please use the AI chat for personalized advice."
        },
        { status: 200 }
      )
    }

    return NextResponse.json(parsed)
  } catch (error) {
    console.error("AI Recommend error:", error)
    return NextResponse.json(
      { error: "Failed to generate recommendations" },
      { status: 500 }
    )
  }
}
