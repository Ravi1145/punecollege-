-- Migration: Add extra lead fields
-- Run in: https://supabase.com/dashboard/project/tfdcpljbozadshhmvhfk/sql/new

ALTER TABLE leads ADD COLUMN IF NOT EXISTS budget         text;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS exam_type      text;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS exam_score     text;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS career_goal    text;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS course_interest text;
