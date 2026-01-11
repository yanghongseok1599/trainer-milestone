-- =============================================
-- 트레이너 마일스톤 Supabase 스키마
-- =============================================

-- 1. 프로필 테이블 (회원 정보)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  phone TEXT,
  business_name TEXT,              -- 센터/사업장명
  business_type TEXT,              -- 사업 유형 (PT, 필라테스, 크로스핏 등)
  role TEXT DEFAULT 'user',        -- user, admin
  avatar_url TEXT,
  subscription_plan TEXT DEFAULT 'free',  -- free, basic, pro, enterprise
  subscription_status TEXT DEFAULT 'active',
  subscription_start_date TIMESTAMPTZ,
  subscription_end_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. 구독 플랜 테이블
CREATE TABLE subscription_plans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,              -- free, basic, pro, enterprise
  display_name TEXT NOT NULL,      -- 무료, 베이직, 프로, 엔터프라이즈
  price INTEGER DEFAULT 0,         -- 월 가격 (원)
  features JSONB,                  -- 포함 기능 목록
  max_members INTEGER,             -- 최대 회원 수
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. 결제 내역 테이블
CREATE TABLE payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  plan_id UUID REFERENCES subscription_plans(id),
  amount INTEGER NOT NULL,
  payment_method TEXT,             -- card, transfer
  payment_status TEXT DEFAULT 'pending',  -- pending, completed, failed, refunded
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. 회원 관리 테이블 (트레이너의 고객)
CREATE TABLE members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_id UUID REFERENCES profiles(id) ON DELETE CASCADE,  -- 트레이너 ID
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  birth_date DATE,
  gender TEXT,
  memo TEXT,
  status TEXT DEFAULT 'active',    -- active, inactive, expired
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. 도구 사용 기록 테이블
CREATE TABLE tool_usage (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  tool_name TEXT NOT NULL,         -- 사용한 도구명
  tool_category TEXT,              -- 카테고리
  usage_count INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. 생성된 콘텐츠 저장 테이블
CREATE TABLE generated_contents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  tool_name TEXT NOT NULL,
  content_type TEXT,               -- image, text, video, etc.
  content_url TEXT,
  content_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 인덱스 생성
-- =============================================
CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_members_owner ON members(owner_id);
CREATE INDEX idx_tool_usage_user ON tool_usage(user_id);
CREATE INDEX idx_payments_user ON payments(user_id);

-- =============================================
-- RLS (Row Level Security) 정책
-- =============================================

-- 모든 테이블 RLS 활성화
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE tool_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE generated_contents ENABLE ROW LEVEL SECURITY;

-- Profiles 정책
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Members 정책 (본인 회원만 조회/수정)
CREATE POLICY "Users can view own members" ON members
  FOR SELECT USING (auth.uid() = owner_id);

CREATE POLICY "Users can insert own members" ON members
  FOR INSERT WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can update own members" ON members
  FOR UPDATE USING (auth.uid() = owner_id);

CREATE POLICY "Users can delete own members" ON members
  FOR DELETE USING (auth.uid() = owner_id);

-- Payments 정책
CREATE POLICY "Users can view own payments" ON payments
  FOR SELECT USING (auth.uid() = user_id);

-- Tool Usage 정책
CREATE POLICY "Users can view own tool usage" ON tool_usage
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own tool usage" ON tool_usage
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Generated Contents 정책
CREATE POLICY "Users can view own contents" ON generated_contents
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own contents" ON generated_contents
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own contents" ON generated_contents
  FOR DELETE USING (auth.uid() = user_id);

-- =============================================
-- 트리거: 회원가입 시 자동 프로필 생성
-- =============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =============================================
-- 기본 구독 플랜 데이터 삽입
-- =============================================
INSERT INTO subscription_plans (name, display_name, price, max_members, features) VALUES
  ('free', '무료', 0, 10, '{"tools": ["기본 도구"], "support": "커뮤니티"}'),
  ('basic', '베이직', 29000, 50, '{"tools": ["기본 도구", "AI 글쓰기"], "support": "이메일"}'),
  ('pro', '프로', 59000, 200, '{"tools": ["전체 도구"], "support": "우선 지원"}'),
  ('enterprise', '엔터프라이즈', 99000, null, '{"tools": ["전체 도구", "맞춤 개발"], "support": "전담 매니저"}');

-- =============================================
-- 7. 관리자 대시보드 설정 테이블
-- =============================================
CREATE TABLE admin_dashboard_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  setting_key TEXT UNIQUE NOT NULL,  -- 'dashboard_categories' 등
  setting_value JSONB NOT NULL,      -- 카테고리/도구 설정 JSON
  updated_by TEXT,                   -- 수정한 관리자 ID
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 관리자 설정은 인증 없이 읽기 가능 (공개 설정)
ALTER TABLE admin_dashboard_settings ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 읽기 가능
CREATE POLICY "Anyone can read admin settings" ON admin_dashboard_settings
  FOR SELECT USING (true);

-- 관리자만 수정 가능 (서버 사이드에서 service_role 키로 처리)
CREATE POLICY "Service role can manage admin settings" ON admin_dashboard_settings
  FOR ALL USING (true);
