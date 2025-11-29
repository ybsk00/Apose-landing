-- 상담 신청 테이블 생성
CREATE TABLE IF NOT EXISTS consultations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  privacy_consent BOOLEAN NOT NULL,
  company_name VARCHAR(255) NOT NULL,
  contact_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 생성일자 기준 인덱스 추가
CREATE INDEX IF NOT EXISTS consultations_created_at_idx ON consultations(created_at DESC);

-- 이메일 인덱스 추가 (중복 확인용)
CREATE INDEX IF NOT EXISTS consultations_email_idx ON consultations(email);
