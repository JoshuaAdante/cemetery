-- ============================================================
-- Butuan Memorial Booking Portal — Supabase Schema
-- Run this in the Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- PROFILES (extends auth.users)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  location TEXT DEFAULT 'Butuan City, Caraga',
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ============================================================
-- CEMETERIES
-- ============================================================
CREATE TABLE IF NOT EXISTS public.cemeteries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  province TEXT DEFAULT 'Agusan del Norte',
  region TEXT DEFAULT 'Caraga',
  type TEXT CHECK (type IN ('public', 'private', 'memorial_park')) DEFAULT 'public',
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  total_plots INTEGER DEFAULT 0,
  available_plots INTEGER DEFAULT 0,
  starting_price NUMERIC(12, 2) DEFAULT 0,
  image_url TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- PLOTS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.plots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cemetery_id UUID REFERENCES public.cemeteries(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  plot_type TEXT CHECK (plot_type IN ('ground', 'mausoleum', 'columbarium', 'garden')) DEFAULT 'ground',
  price NUMERIC(12, 2) NOT NULL,
  status TEXT CHECK (status IN ('available', 'reserved', 'occupied')) DEFAULT 'available',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- SERVICES
-- ============================================================
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_key TEXT UNIQUE NOT NULL, -- e.g. 'chapel', 'floral'
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(12, 2) NOT NULL,
  icon TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- BOOKINGS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  cemetery_id TEXT NOT NULL, -- references CARAGA_CEMETERIES id (string)
  plot_type TEXT NOT NULL,
  status TEXT CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')) DEFAULT 'pending',
  total_amount NUMERIC(12, 2) NOT NULL,
  deposit_paid NUMERIC(12, 2) DEFAULT 10000,
  service_ids TEXT[] DEFAULT '{}',
  interment_date DATE,
  preferred_time TEXT,
  -- Deceased info
  deceased_name TEXT,
  date_of_birth DATE,
  date_of_passing DATE,
  place_of_birth TEXT,
  religion TEXT,
  obituary TEXT,
  -- Contact info
  contact_name TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  contact_address TEXT,
  relationship TEXT,
  reference_code TEXT UNIQUE DEFAULT CONCAT('BMP-', TO_CHAR(NOW(), 'YYYY'), '-', LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- MEMORIAL RECORDS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.memorial_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  booking_id UUID REFERENCES public.bookings(id) ON DELETE SET NULL,
  deceased_name TEXT NOT NULL,
  date_of_birth DATE,
  date_of_passing DATE,
  cemetery_name TEXT,
  plot_name TEXT,
  obituary TEXT,
  photo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

-- Profiles: users can only read/update their own profile
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Cemeteries: public read
ALTER TABLE public.cemeteries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Cemeteries are publicly readable"
  ON public.cemeteries FOR SELECT
  TO anon, authenticated
  USING (true);

-- Services: public read
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Services are publicly readable"
  ON public.services FOR SELECT
  TO anon, authenticated
  USING (true);

-- Plots: public read
ALTER TABLE public.plots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Plots are publicly readable"
  ON public.plots FOR SELECT
  TO anon, authenticated
  USING (true);

-- Bookings: users can view and manage their own bookings
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own bookings"
  ON public.bookings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create bookings"
  ON public.bookings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own bookings"
  ON public.bookings FOR UPDATE
  USING (auth.uid() = user_id AND status IN ('pending'));

-- Memorial Records: users can view and manage their own records
ALTER TABLE public.memorial_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own memorial records"
  ON public.memorial_records FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create memorial records"
  ON public.memorial_records FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own memorial records"
  ON public.memorial_records FOR UPDATE
  USING (auth.uid() = user_id);

-- ============================================================
-- UPDATED_AT trigger helper
-- ============================================================
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_bookings_updated_at
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW EXECUTE PROCEDURE public.set_updated_at();

CREATE TRIGGER set_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE PROCEDURE public.set_updated_at();

CREATE TRIGGER set_memorial_records_updated_at
  BEFORE UPDATE ON public.memorial_records
  FOR EACH ROW EXECUTE PROCEDURE public.set_updated_at();
