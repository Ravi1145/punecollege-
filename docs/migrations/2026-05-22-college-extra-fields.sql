-- Migration: Add all extra college fields
-- Run in: https://supabase.com/dashboard/project/tfdcpljbozadshhmvhfk/sql/new

ALTER TABLE colleges ADD COLUMN IF NOT EXISTS short_name     text;
ALTER TABLE colleges ADD COLUMN IF NOT EXISTS affiliation    text;
ALTER TABLE colleges ADD COLUMN IF NOT EXISTS stream         text;
ALTER TABLE colleges ADD COLUMN IF NOT EXISTS courses        text[];
ALTER TABLE colleges ADD COLUMN IF NOT EXISTS specializations text[];
ALTER TABLE colleges ADD COLUMN IF NOT EXISTS fees_min       integer DEFAULT 0;
ALTER TABLE colleges ADD COLUMN IF NOT EXISTS fees_max       integer DEFAULT 0;
ALTER TABLE colleges ADD COLUMN IF NOT EXISTS avg_placement  integer DEFAULT 0;
ALTER TABLE colleges ADD COLUMN IF NOT EXISTS highest_pkg    integer DEFAULT 0;
ALTER TABLE colleges ADD COLUMN IF NOT EXISTS top_recruiters text[];
ALTER TABLE colleges ADD COLUMN IF NOT EXISTS entrance_exams text[];
ALTER TABLE colleges ADD COLUMN IF NOT EXISTS hostel         boolean DEFAULT false;
ALTER TABLE colleges ADD COLUMN IF NOT EXISTS highlights     text[];
ALTER TABLE colleges ADD COLUMN IF NOT EXISTS tags           text[];
ALTER TABLE colleges ADD COLUMN IF NOT EXISTS rating         numeric DEFAULT 0;
ALTER TABLE colleges ADD COLUMN IF NOT EXISTS review_count   integer DEFAULT 0;
