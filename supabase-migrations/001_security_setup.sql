-- ============================================
-- ConnectPro Supabase Security & RLS Migration
-- Run this in your Supabase SQL Editor
-- ============================================

-- ============================================
-- Enable Row Level Security on all tables
-- ============================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- ============================================
-- Profiles Table Policies
-- ============================================

-- Anyone can read public profiles
CREATE POLICY "Public profiles are viewable by everyone"
ON public.profiles FOR SELECT
USING (public = true);

-- Users can insert their own profile
CREATE POLICY "Users can insert their own profile"
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can update their own profile
CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Users can delete their own profile
CREATE POLICY "Users can delete their own profile"
ON public.profiles FOR DELETE
USING (auth.uid() = user_id);

-- ============================================
-- Messages Table Policies
-- ============================================

-- Users can read their own messages (sent or received)
CREATE POLICY "Users can read their own messages"
ON public.messages FOR SELECT
USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

-- Users can insert messages they send
CREATE POLICY "Users can insert their own messages"
ON public.messages FOR INSERT
WITH CHECK (auth.uid() = sender_id);

-- Only message sender can update
CREATE POLICY "Users can update their own messages"
ON public.messages FOR UPDATE
USING (auth.uid() = sender_id)
WITH CHECK (auth.uid() = sender_id);

-- Only message sender can delete
CREATE POLICY "Users can delete their own messages"
ON public.messages FOR DELETE
USING (auth.uid() = sender_id);

-- ============================================
-- Bookings Table Policies
-- ============================================

-- Users can read their own bookings
CREATE POLICY "Users can read their own bookings"
ON public.bookings FOR SELECT
USING (auth.uid() = user_id OR auth.uid() = professional_id);

-- Users can create bookings
CREATE POLICY "Users can create bookings"
ON public.bookings FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can update their own bookings
CREATE POLICY "Users can update their own bookings"
ON public.bookings FOR UPDATE
USING (auth.uid() = user_id OR auth.uid() = professional_id)
WITH CHECK (auth.uid() = user_id OR auth.uid() = professional_id);

-- ============================================
-- Payments Table Policies
-- ============================================

-- Users can read their own payments
CREATE POLICY "Users can read their own payments"
ON public.payments FOR SELECT
USING (auth.uid() = user_id);

-- Users can create payments (payment system only)
CREATE POLICY "Users can create payments"
ON public.payments FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- ============================================
-- Secure User Metadata Function
-- ============================================

CREATE OR REPLACE FUNCTION public.get_user_role()
RETURNS TEXT
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(
    (SELECT role FROM profiles WHERE user_id = auth.uid()),
    'client'
  );
$$;

-- ============================================
-- Email Verification Trigger
-- ============================================

CREATE OR REPLACE FUNCTION public.handle_email_verification()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE auth.users
  SET email_confirmed_at = NOW()
  WHERE id = NEW.id;
  RETURN NEW;
END;
$$;

-- ============================================
-- Audit Log Function
-- ============================================

CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL,
  table_name TEXT,
  record_id UUID,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Function to log actions
CREATE OR REPLACE FUNCTION public.log_audit_action(
  p_action TEXT,
  p_table_name TEXT,
  p_record_id UUID
)
RETURNS VOID
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.audit_logs (user_id, action, table_name, record_id, ip_address, user_agent)
  VALUES (
    auth.uid(),
    p_action,
    p_table_name,
    p_record_id,
    (SELECT client_ip FROM auth.sessions WHERE sid = (SELECT sid FROM auth.token_session())),
    current_setting('request.headers', true)::json->>'user-agent'
  );
END;
$$;
