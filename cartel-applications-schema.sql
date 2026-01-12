-- Cartel Applications Table
-- 카르텔 가입 신청 테이블

CREATE TABLE IF NOT EXISTS cartel_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  blog_url TEXT NOT NULL,
  introduction TEXT NOT NULL,
  reason TEXT,
  referral_source TEXT,
  referrer TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE cartel_applications ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert (submit application)
CREATE POLICY "Anyone can submit application" ON cartel_applications
  FOR INSERT WITH CHECK (true);

-- Policy: Anyone can read all applications (for admin view)
CREATE POLICY "Anyone can read applications" ON cartel_applications
  FOR SELECT USING (true);

-- Policy: Anyone can update (for admin to approve/reject)
CREATE POLICY "Anyone can update applications" ON cartel_applications
  FOR UPDATE USING (true);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_cartel_applications_status ON cartel_applications(status);
CREATE INDEX IF NOT EXISTS idx_cartel_applications_created_at ON cartel_applications(created_at DESC);
