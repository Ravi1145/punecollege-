import type { CollegeDetails } from "@/lib/db"
export type { CollegeDetails }

export interface Review {
  id: number
  studentName: string
  course: string
  year: number
  rating: number
  title: string
  body: string
  pros: string[]
  cons: string[]
}

export interface College {
  id: number
  slug: string
  name: string
  shortName: string
  type: "Government" | "Private" | "Deemed" | "Autonomous"
  established: number
  affiliation: string
  naac: "A++" | "A+" | "A" | "B++" | "B+"
  nirfRank: number | null
  location: string
  address: string
  courses: string[]
  specializations: string[]
  feesRange: { min: number; max: number }
  avgPlacement: number
  highestPlacement: number
  topRecruiters: string[]
  entranceExams: string[]
  hostel: boolean
  rating: number
  reviewCount: number
  reviews: Review[]
  tags: string[]
  description: string
  highlights: string[]
  website: string
  phone: string
  email: string
  image?: string
  stream: "Engineering" | "MBA" | "Medical" | "Arts & Science" | "Management" | "Law" | "Architecture"
  details?: CollegeDetails
  faqs?: { q: string; a: string }[]
}

export interface Course {
  id: number
  slug: string
  name: string
  fullName: string
  duration: string
  level: "UG" | "PG" | "Diploma" | "PhD"
  stream: string
  description: string
  eligibility: string
  entranceExams: string[]
  avgFees: { min: number; max: number }
  avgSalary: number
  topColleges: string[]
  careerOptions: string[]
  skills: string[]
  subjects: string[]
}

export interface Exam {
  id: number
  name: string
  fullName: string
  conductedBy: string
  level: "National" | "State" | "University"
  streams: string[]
  applicationDate: string
  examDate: string
  resultDate: string
  website: string
  description: string
  eligibility: string
}

export interface BlogPost {
  id: number
  slug: string
  title: string
  excerpt: string
  body: string
  author: string
  date: string
  readTime: string
  category: string
  tags: string[]
  image?: string
}

export interface CollegeFilters {
  stream?: string[]
  type?: string[]
  naac?: string[]
  location?: string[]
  entranceExam?: string[]
  feesMin?: number
  feesMax?: number
  hostel?: boolean
  nirfRanked?: boolean
  search?: string
}

export interface RecommendedCollege {
  college: string
  slug: string
  matchScore: number
  reasons: string[]
  fees: string
  avgPackage: string
  admissionTip: string
}

export interface ComparisonCategory {
  name: string
  college1Value: string
  college2Value: string
  winner: "college1" | "college2" | "tie"
  insight: string
}

export interface AIComparisonResult {
  winner: string
  summary: string
  categories: ComparisonCategory[]
}

export interface Lead {
  id?: number
  name: string
  phone: string
  email?: string
  whatsapp?: string
  city?: string
  stream?: string
  budget?: string
  exam_type?: string
  exam_score?: string
  career_goal?: string
  college_interest?: string
  course_interest?: string
  source:
    | 'enquiry_form'
    | 'college_page'
    | 'exit_popup'
    | 'ai_gate'
    | 'predictor'
    | 'shortlist'
    | 'counselling'
    | 'lead_magnet'
    | 'inline_form'
  utm_source?: string
  utm_medium?: string
  page_url?: string
  status?: 'new' | 'contacted' | 'converted' | 'lost'
  notes?: string
  created_at?: string
  updated_at?: string
}

export interface Enquiry {
  id?: number
  lead_id?: number
  name: string
  phone: string
  email?: string
  college_name: string
  college_slug?: string
  course?: string
  message?: string
  preferred_contact?: 'whatsapp' | 'call' | 'email'
  preferred_time?: 'morning' | 'afternoon' | 'evening'
  status?: 'pending' | 'replied' | 'closed'
  created_at?: string
}

export interface CounsellingBooking {
  id?: number
  lead_id?: number
  name: string
  phone: string
  email?: string
  preferred_date?: string
  preferred_time?: string
  stream?: string
  exam_score?: string
  colleges_shortlisted?: string
  status?: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  created_at?: string
}

export interface AdminStats {
  totalLeads: number
  leadsToday: number
  leadsThisWeek: number
  newLeads: number
  contactedLeads: number
  convertedLeads: number
  leadsBySource: { source: string; count: number }[]
  leadsByStream: { stream: string; count: number }[]
  dailyTrend: { date: string; count: number }[]
}
