import { z } from 'zod'

const phoneRegex = /^[6-9]\d{9}$/

export const leadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50),
  phone: z.string().regex(phoneRegex, 'Enter a valid 10-digit Indian mobile number'),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  stream: z.enum(['BTech', 'MBA', 'MBBS', 'BBA', 'BArch', 'BSc', 'BCom', 'Law', 'Other']).optional(),
  budget: z.string().optional(),
  exam_type: z.string().optional(),
  exam_score: z.string().optional(),
  career_goal: z.string().max(200).optional(),
  college_interest: z.string().optional(),
  course_interest: z.string().optional(),
  source: z.enum([
    'enquiry_form', 'college_page', 'exit_popup', 'ai_gate',
    'predictor', 'shortlist', 'counselling', 'lead_magnet', 'inline_form',
  ]),
  page_url: z.string().optional(),
})

export const enquirySchema = z.object({
  name: z.string().min(2).max(50),
  phone: z.string().regex(phoneRegex, 'Enter a valid 10-digit Indian mobile number'),
  email: z.string().email().optional().or(z.literal('')),
  college_name: z.string().min(2),
  college_slug: z.string().optional(),
  course: z.string().optional(),
  message: z.string().max(500).optional(),
  preferred_contact: z.enum(['whatsapp', 'call', 'email']).default('whatsapp'),
  preferred_time: z.enum(['morning', 'afternoon', 'evening']).optional(),
})

export const counsellingSchema = z.object({
  name: z.string().min(2).max(50),
  phone: z.string().regex(phoneRegex, 'Enter a valid 10-digit Indian mobile number'),
  email: z.string().email().optional().or(z.literal('')),
  stream: z.string().optional(),
  preferred_date: z.string().optional(),
  preferred_time: z.enum(['morning', 'afternoon', 'evening']).optional(),
  exam_score: z.string().optional(),
})

export type LeadInput = z.infer<typeof leadSchema>
export type EnquiryInput = z.infer<typeof enquirySchema>
export type CounsellingInput = z.infer<typeof counsellingSchema>
