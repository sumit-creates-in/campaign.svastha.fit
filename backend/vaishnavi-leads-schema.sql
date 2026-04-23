-- Vaishnavi leads table for Supabase
-- Run this in your Supabase SQL editor

CREATE TABLE IF NOT EXISTS vaishnavi_leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  age TEXT,
  city TEXT,
  gender TEXT,
  weight TEXT,
  weight_loss_reason TEXT,
  health_condition TEXT,
  past_attempts TEXT,
  weight_gain_cause TEXT,
  profession TEXT,
  busyness TEXT,
  paid_plans TEXT,
  languages TEXT,
  preferred_date TEXT,
  preferred_time TEXT,
  source TEXT DEFAULT 'Lose-weight-with-vaishnavi',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_vaishnavi_leads_phone ON vaishnavi_leads(phone);
CREATE INDEX IF NOT EXISTS idx_vaishnavi_leads_created_at ON vaishnavi_leads(created_at DESC);

-- Enable Row Level Security
ALTER TABLE vaishnavi_leads ENABLE ROW LEVEL SECURITY;

-- Allow all operations (backend uses service key)
CREATE POLICY "Allow all operations on vaishnavi_leads" ON vaishnavi_leads
FOR ALL USING (true);
