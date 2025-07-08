-- Migration: Remove 'attachment' column from 'broadcast' table
ALTER TABLE broadcast DROP COLUMN IF EXISTS attachment; 