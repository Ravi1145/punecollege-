import { NextRequest, NextResponse } from "next/server"
import { anthropic } from "@/lib/anthropic"

export const runtime = "nodejs"

const SCHOLARSHIP_DB = [
  { id: "mahadbt-freeship", name: "MahaDBT — Freeship / Tuition Fee Waiver", amount: "Full tuition fee waiver", category: ["EBC"], income_max_lpa: 8, streams: ["all"], deadline: "September 30, 2026", link: "https://mahadbt.maharashtra.gov.in", priority: "High", marks_min: 0, description: "Full tuition fee waiver for Maharashtra domicile students with family income below ₹8 LPA enrolled in any degree course." },
  { id: "mahadbt-obc", name: "MahaDBT — OBC Scholarship", amount: "₹2,000–₹5,000/year + maintenance", category: ["OBC", "VJNT", "NT", "SBC"], income_max_lpa: 8, streams: ["all"], deadline: "September 30, 2026", link: "https://mahadbt.maharashtra.gov.in", priority: "High", marks_min: 60, description: "For OBC/VJNT/NT/SBC caste certificate holders. 60%+ in previous exam required." },
  { id: "mahadbt-scst", name: "MahaDBT — SC/ST Post-Matric Scholarship", amount: "Full fees + maintenance ₹550–₹1,200/month", category: ["SC", "ST"], income_max_lpa: 2.5, streams: ["all"], deadline: "November 30, 2026", link: "https://mahadbt.maharashtra.gov.in", priority: "High", marks_min: 0, description: "Full fees plus monthly maintenance allowance for SC/ST students in Maharashtra-recognized colleges." },
  { id: "nsp-css", name: "NSP — Central Sector Scheme (CSS)", amount: "₹10,000–₹20,000/year", category: ["general", "all"], income_max_lpa: 4.5, streams: ["engineering", "medical", "arts", "science", "commerce"], deadline: "October 31, 2026", link: "https://scholarships.gov.in", priority: "High", marks_min: 80, description: "Merit-based scholarship for students in top 20th percentile of their Class 12 board exam. Covers 1st–3rd year undergraduate." },
  { id: "nsp-minority", name: "NSP — Minority Scholarship (Post-Matric)", amount: "₹3,000–₹20,000/year", category: ["minority", "muslim", "sikh", "christian", "buddhist", "jain", "parsi"], income_max_lpa: 2, streams: ["all"], deadline: "October 31, 2026", link: "https://scholarships.gov.in", priority: "High", marks_min: 50, description: "For students from minority communities with 50%+ marks in last exam and family income below ₹2 LPA." },
  { id: "coep-merit", name: "COEP Merit Scholarship", amount: "₹25,000–₹50,000/year", category: ["all"], income_max_lpa: null, streams: ["engineering"], deadline: "August 31, 2026", link: "https://coep.org.in", priority: "Medium", marks_min: 85, description: "For top 10 rankers per branch in COEP. Available from Semester 2 onwards based on academic performance." },
  { id: "siu-merit", name: "Symbiosis Merit Scholarship (SIU)", amount: "25%–100% tuition fee waiver", category: ["all"], income_max_lpa: null, streams: ["mba", "engineering", "law", "design"], deadline: "July 31, 2026", link: "https://www.siu.edu.in", priority: "Medium", marks_min: 0, description: "For top SNAP/SET/entrance rankers at Symbiosis University institutes. No income limit — purely merit based." },
  { id: "aditya-birla", name: "Aditya Birla Scholarship", amount: "₹65,000/year (Engg) · ₹1 LPA (MBA)", category: ["all"], income_max_lpa: null, streams: ["engineering", "mba"], deadline: "September 30, 2026", link: "https://www.adityabirla.com/scholarship", priority: "Medium", marks_min: 0, description: "For top 20 JEE Advanced / CAT rankers enrolled in premier institutes including MIT-WPU and VIT Pune." },
  { id: "dst-inspire", name: "DST INSPIRE Scholarship", amount: "₹80,000/year for 5 years", category: ["all"], income_max_lpa: null, streams: ["science", "bsc"], deadline: "November 30, 2026", link: "https://online-inspire.gov.in", priority: "Medium", marks_min: 90, description: "For students in top 1% of Class 12 board pursuing BSc / BSc Hons in Natural & Basic Sciences." },
  { id: "hdfc-crisis", name: "HDFC Educational Crisis Scholarship", amount: "₹15,000–₹75,000/year", category: ["all"], income_max_lpa: 2.5, streams: ["all"], deadline: "Rolling basis", description: "For students facing financial crisis due to death/illness of parent. 55%+ marks; any stream.", link: "https://www.hdfcbank.com/scholarship", priority: "Medium", marks_min: 55 },
  { id: "mahadbt-ebc", name: "MahaDBT — EBC (Economically Backward Class)", amount: "Tuition fee reimbursement", category: ["EBC", "general"], income_max_lpa: 8, streams: ["engineering", "medical", "pharmacy", "mba", "arts", "science"], deadline: "September 30, 2026", link: "https://mahadbt.maharashtra.gov.in", priority: "High", marks_min: 0, description: "Economically backward class students from general category with income below ₹8 LPA — tuition fee reimbursement." },
  { id: "tcs-nqt", name: "TCS National Qualifier Test Scholarship", amount: "₹10,000 + TCS internship offer", category: ["all"], income_max_lpa: null, streams: ["engineering", "bca", "bsc"], deadline: "December 31, 2026", link: "https://learning.tcs.com/nqt", priority: "Low", marks_min: 60, description: "For engineering and tech students who crack TCS NQT. Top performers get scholarship + guaranteed interview." },
  { id: "pm-usha", name: "PM USHA Scholarship (Central Universities)", amount: "₹1,000–₹3,000/month", category: ["SC", "ST", "OBC", "EBC"], income_max_lpa: 4.5, streams: ["all"], deadline: "October 15, 2026", link: "https://scholarships.gov.in", priority: "Medium", marks_min: 60, description: "PM Uchchatar Shiksha Abhiyan — for SC/ST/OBC/EBC students in government-funded higher education institutions." },
  { id: "ishan-uday", name: "Ishan Uday Scholarship (NE Students)", amount: "₹5,400–₹7,800/month", category: ["all"], income_max_lpa: 4.5, streams: ["all"], deadline: "October 31, 2026", link: "https://scholarships.gov.in", priority: "Low", marks_min: 60, description: "For students from North-East India pursuing higher education outside their home state." },
  { id: "mit-wpu-merit", name: "MIT-WPU Merit Scholarship", amount: "10%–100% tuition waiver", category: ["all"], income_max_lpa: null, streams: ["engineering", "mba", "design", "law"], deadline: "July 31, 2026", link: "https://www.mitwpu.edu.in/scholarship", priority: "Medium", marks_min: 75, description: "MIT-WPU offers merit scholarships for JEE/MHT-CET toppers. Range from 10% to full tuition waiver." },
]

export async function POST(req: NextRequest) {
  try {
    const { stream, category, incomeRange, marks, yearOfStudy, college } = await req.json()

    const profileSummary = `
Student Profile:
- Stream: ${stream}
- Caste/Category: ${category}
- Family Annual Income: ${incomeRange}
- Last Exam Marks/Percentile: ${marks}%
- Year of Study: ${yearOfStudy}
- College (if any): ${college || "Not specified"}
`

    const dbSummary = SCHOLARSHIP_DB.map(s =>
      `[${s.id}] ${s.name}: Amount=${s.amount}, For categories=${s.category.join("/")}, Income limit=${s.income_max_lpa ? "₹" + s.income_max_lpa + "LPA" : "None"}, Streams=${s.streams.join("/")}, Min marks=${s.marks_min}%, Priority=${s.priority}`
    ).join("\n")

    const prompt = `${profileSummary}

Available Scholarships Database:
${dbSummary}

Analyze the student profile and return the TOP 5 most relevant scholarships they qualify for (or are likely to qualify for).
Consider: category eligibility, income range, stream match, marks requirement.
For each scholarship, explain WHY it matches and give the match percentage.

Respond ONLY with valid JSON:
{
  "matches": [
    {
      "id": "scholarship-id",
      "matchScore": 95,
      "matchReasons": ["reason 1", "reason 2"],
      "actionItem": "specific next step for this student",
      "urgent": true
    }
  ],
  "summary": "2-sentence personalized summary of scholarship strategy for this student",
  "totalAmount": "estimated total scholarship amount they can access"
}`

    const message = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1500,
      system: "You are an expert Indian scholarship counselor specializing in Maharashtra higher education. Respond ONLY with valid JSON. No markdown, no extra text.",
      messages: [{ role: "user", content: prompt }],
    })

    const responseText = message.content[0].type === "text" ? message.content[0].text : ""
    let parsed: { matches: Array<{ id: string; matchScore: number; matchReasons: string[]; actionItem: string; urgent: boolean }>, summary: string, totalAmount: string } | null = null
    try {
      const jsonMatch = responseText.match(/\{[\s\S]*\}/)
      parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : null
    } catch {
      parsed = null
    }

    if (!parsed?.matches) {
      return NextResponse.json({ error: "Could not analyze profile" }, { status: 500 })
    }

    // Enrich results with full scholarship data
    const enriched = parsed.matches
      .map((m) => {
        const scholarship = SCHOLARSHIP_DB.find(s => s.id === m.id)
        if (!scholarship) return null
        return { ...scholarship, matchScore: m.matchScore, matchReasons: m.matchReasons, actionItem: m.actionItem, urgent: m.urgent }
      })
      .filter(Boolean)

    return NextResponse.json({ matches: enriched, summary: parsed.summary, totalAmount: parsed.totalAmount })
  } catch (error) {
    console.error("Scholarship finder error:", error)
    return NextResponse.json({ error: "Failed to find scholarships" }, { status: 500 })
  }
}
