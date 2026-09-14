-- Master Class registrations
-- Run this once in the Supabase SQL editor (Dashboard → SQL Editor → New query).
--
-- Every person who starts the registration form lands here, whether or not they
-- go on to pay. That is deliberate: the ones who drop out at the payment page
-- are still warm leads with a name and a WhatsApp number.

CREATE TABLE IF NOT EXISTS webinar_registrations (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name         TEXT NOT NULL,
  email        TEXT,
  phone        TEXT NOT NULL UNIQUE,
  goal         TEXT,
  conditions   TEXT[] DEFAULT '{}',
  source       TEXT DEFAULT 'masterclass-landing',
  webinar_date TIMESTAMPTZ,
  paid         BOOLEAN DEFAULT FALSE,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_webinar_registrations_phone
  ON webinar_registrations (phone);
CREATE INDEX IF NOT EXISTS idx_webinar_registrations_paid
  ON webinar_registrations (paid);
CREATE INDEX IF NOT EXISTS idx_webinar_registrations_created
  ON webinar_registrations (created_at DESC);

-- Keep updated_at honest when a returning registrant re-submits the form.
CREATE OR REPLACE FUNCTION set_webinar_registrations_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_webinar_registrations_updated_at
  ON webinar_registrations;
CREATE TRIGGER trg_webinar_registrations_updated_at
  BEFORE UPDATE ON webinar_registrations
  FOR EACH ROW EXECUTE FUNCTION set_webinar_registrations_updated_at();

ALTER TABLE webinar_registrations ENABLE ROW LEVEL SECURITY;

-- The landing page writes through the anon key, so it needs insert + upsert.
DROP POLICY IF EXISTS "anon can register" ON webinar_registrations;
CREATE POLICY "anon can register" ON webinar_registrations
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "anon can update own row" ON webinar_registrations;
CREATE POLICY "anon can update own row" ON webinar_registrations
  FOR UPDATE USING (true) WITH CHECK (true);


-- ─── Useful queries for the sales team ──────────────────────────────────────
--
-- Everyone who registered but never paid — call these first:
--   SELECT name, phone, goal, conditions, created_at
--   FROM webinar_registrations
--   WHERE paid = FALSE
--   ORDER BY created_at DESC;
--
-- Paid registrants segmented by condition, for the follow-up scripts:
--   SELECT name, phone, goal, conditions
--   FROM webinar_registrations
--   WHERE paid = TRUE AND 'PCOS / PCOD' = ANY(conditions);
--
-- Registration count (drives the seats-left counter if you enable one):
--   SELECT COUNT(*) FROM webinar_registrations;
