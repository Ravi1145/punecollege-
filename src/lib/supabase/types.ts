export type ContentStatus = 'draft' | 'pending' | 'published' | 'rejected'
export type UserRole = 'super_admin' | 'agent'

export interface Profile {
  id: string
  email: string
  full_name: string | null
  role: UserRole
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface College {
  id: string
  slug: string
  name: string
  short_name: string | null
  location: string | null
  type: string | null
  established: number | null
  description: string | null
  affiliation: string | null
  stream: string | null
  logo_url: string | null
  cover_url: string | null
  website: string | null
  phone: string | null
  email: string | null
  address: string | null
  city: string | null
  state: string | null
  naac_grade: string | null
  nirf_rank: number | null
  courses: string[] | null
  specializations: string[] | null
  fees_min: number | null
  fees_max: number | null
  avg_placement: number | null
  highest_pkg: number | null
  top_recruiters: string[] | null
  entrance_exams: string[] | null
  hostel: boolean
  highlights: string[] | null
  tags: string[] | null
  rating: number | null
  review_count: number | null
  featured: boolean
  featured_order: number | null
  status: ContentStatus
  details: Record<string, unknown>
  created_at: string
  updated_at: string
}

export interface Blog {
  id: string
  slug: string
  title: string
  excerpt: string | null
  content: string | null
  category: string | null
  tags: string[] | null
  cover_url: string | null
  author_id: string | null
  status: ContentStatus
  published_at: string | null
  read_time: number | null
  views: number
  created_at: string
  updated_at: string
}

export interface Lead {
  id: string
  name: string | null
  email: string | null
  phone: string | null
  stream: string | null
  college_interest: string | null
  course_interest: string | null
  message: string | null
  source: string | null
  page_url: string | null
  budget: string | null
  exam_type: string | null
  exam_score: string | null
  career_goal: string | null
  status: string
  assigned_to: string | null
  notes: string | null
  created_at: string
  updated_at: string
}

export interface Review {
  id: string
  college_id: string | null
  author_name: string
  author_email: string | null
  rating: number
  body: string
  pros: string | null
  cons: string | null
  batch_year: number | null
  course: string | null
  status: ContentStatus
  created_at: string
  updated_at: string
}

export interface QaQuestion {
  id: string
  college_id: string | null
  author_name: string
  author_email: string | null
  question: string
  status: ContentStatus
  views: number
  created_at: string
  updated_at: string
}

export interface QaAnswer {
  id: string
  question_id: string
  author_id: string | null
  author_name: string | null
  body: string
  is_official: boolean
  status: ContentStatus
  created_at: string
  updated_at: string
}

export interface Alumni {
  id: string
  slug: string
  name: string
  college_id: string | null
  college_name: string | null
  graduation_year: number | null
  course: string | null
  job_role: string | null
  company: string | null
  photo_url: string | null
  story: string | null
  linkedin_url: string | null
  package_lpa: number | null
  status: ContentStatus
  created_at: string
  updated_at: string
}

export interface FeaturedItem {
  id: string
  item_type: 'college' | 'blog' | 'exam'
  item_id: string
  section: string
  sort_order: number
  is_active: boolean
  created_at: string
}

export interface HeroBanner {
  id: string
  type: 'hero' | 'poster' | 'banner'
  title: string
  subtitle: string | null
  cta_text: string | null
  cta_link: string | null
  image_url: string | null
  is_active: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export interface Exam {
  id: string
  slug: string
  name: string
  full_name: string | null
  category: string | null
  conducting_body: string | null
  exam_date: string | null
  registration_start: string | null
  registration_end: string | null
  official_website: string | null
  description: string | null
  eligibility: string | null
  exam_pattern: Record<string, unknown>
  status: ContentStatus
  created_at: string
  updated_at: string
}

export interface CollegeCourse {
  id: string
  college_id: string
  course_name: string
  specialization: string | null
  course_type: string | null   // 'UG' | 'PG' | 'Diploma' | 'PhD' | 'Certificate'
  duration: string | null
  fees_per_year: number | null
  total_fees: number | null
  seats: number | null
  eligibility: string | null
  entrance_exam: string | null
  created_at: string
  updated_at: string | null
}

// Supabase Database type map
export interface Database {
  public: {
    Tables: {
      profiles: { Row: Profile; Insert: Partial<Profile>; Update: Partial<Profile> }
      colleges: { Row: College; Insert: Partial<College>; Update: Partial<College> }
      blogs: { Row: Blog; Insert: Partial<Blog>; Update: Partial<Blog> }
      leads: { Row: Lead; Insert: Partial<Lead>; Update: Partial<Lead> }
      reviews: { Row: Review; Insert: Partial<Review>; Update: Partial<Review> }
      qa_questions: { Row: QaQuestion; Insert: Partial<QaQuestion>; Update: Partial<QaQuestion> }
      qa_answers: { Row: QaAnswer; Insert: Partial<QaAnswer>; Update: Partial<QaAnswer> }
      alumni: { Row: Alumni; Insert: Partial<Alumni>; Update: Partial<Alumni> }
      featured_items: { Row: FeaturedItem; Insert: Partial<FeaturedItem>; Update: Partial<FeaturedItem> }
      hero_banners: { Row: HeroBanner; Insert: Partial<HeroBanner>; Update: Partial<HeroBanner> }
      exams: { Row: Exam; Insert: Partial<Exam>; Update: Partial<Exam> }
      college_courses: { Row: CollegeCourse; Insert: Partial<CollegeCourse>; Update: Partial<CollegeCourse> }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: {
      content_status: ContentStatus
      user_role: UserRole
    }
  }
}
