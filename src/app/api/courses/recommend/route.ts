import { NextRequest, NextResponse } from "next/server"
import { anthropic } from "@/lib/anthropic"
import { colleges } from "@/data/colleges"

export const runtime = "nodejs"

export async function POST(req: NextRequest) {
  try {
    const { interests, skills, budget, careerGoal, afterClass12, examScores } = await req.json()

    // Build a concise summary of available courses from college data
    const courseMap: Record<string, { colleges: string[]; fees: number[] }> = {}
    colleges.forEach(college => {
      if (college.details?.courses_fees) {
        college.details.courses_fees.forEach(cf => {
          const prog = cf.program.split("—")[0].trim()
          if (!courseMap[prog]) courseMap[prog] = { colleges: [], fees: [] }
          courseMap[prog].colleges.push(college.shortName || college.name)
          courseMap[prog].fees.push(cf.fees_per_year)
        })
      }
    })

    const courseList = Object.entries(courseMap)
      .slice(0, 30)
      .map(([prog, data]) => `${prog} (at: ${data.colleges.slice(0,3).join(", ")}, fees: ₹${Math.round(Math.min(...data.fees)/100000)}L–₹${Math.round(Math.max(...data.fees)/100000)}L/yr)`)
      .join("\n")

    const prompt = `Student Profile:
- Interests/Subjects enjoyed: ${interests}
- Current skills/strengths: ${skills || "Not specified"}
- Annual budget for college fees: ${budget}
- Career goal: ${careerGoal}
- After Class 12 or After Graduation: ${afterClass12}
- Entrance exam scores: ${examScores || "Not specified"}

Courses available at Pune colleges:
${courseList}

Recommend the TOP 4 most suitable courses for this student. Consider: their interests, career goal, budget, and available Pune colleges.

Respond ONLY with valid JSON:
{
  "recommendations": [
    {
      "course": "Course Name (e.g. B.Tech CSE)",
      "duration": "4 years",
      "level": "UG or PG",
      "whyFit": "2-sentence reason why this suits this student",
      "careerOptions": ["Job role 1", "Job role 2", "Job role 3"],
      "entryExams": ["JEE Main", "MHT-CET"],
      "avgSalaryEntry": "₹X–₹Y LPA",
      "topPuneColleges": ["College 1", "College 2"],
      "matchScore": 92
    }
  ],
  "counselorNote": "Personalized 2-sentence note about this student's situation and best path forward"
}`

    const message = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1200,
      system: "You are an expert Indian college admissions counselor. Respond ONLY with valid JSON. No markdown, no extra text.",
      messages: [{ role: "user", content: prompt }],
    })

    const responseText = message.content[0].type === "text" ? message.content[0].text : ""
    let parsed = null
    try {
      const jsonMatch = responseText.match(/\{[\s\S]*\}/)
      parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : null
    } catch {
      parsed = null
    }

    if (!parsed?.recommendations) {
      return NextResponse.json({ error: "Could not generate recommendations" }, { status: 500 })
    }

    return NextResponse.json(parsed)
  } catch (error) {
    console.error("Course recommend error:", error)
    return NextResponse.json({ error: "Failed to get recommendations" }, { status: 500 })
  }
}
