-- Migration 003: Rich college details JSON column
ALTER TABLE colleges ADD COLUMN IF NOT EXISTS details JSONB DEFAULT '{}'::JSONB;
