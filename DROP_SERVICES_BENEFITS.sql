-- ============================================
-- DROP SERVICES & BENEFITS TABLES
-- ============================================
-- File ini untuk menghapus tables services dan benefits
-- dari database yang sudah ada
-- ============================================

-- Hapus triggers terlebih dahulu
DROP TRIGGER IF EXISTS update_services_updated_at ON public.services;
DROP TRIGGER IF EXISTS update_benefits_updated_at ON public.benefits;

-- Hapus policies
DROP POLICY IF EXISTS "Public can view services" ON public.services;
DROP POLICY IF EXISTS "Public can view benefits" ON public.benefits;
DROP POLICY IF EXISTS "Authenticated users can manage services" ON public.services;
DROP POLICY IF EXISTS "Authenticated users can manage benefits" ON public.benefits;
DROP POLICY IF EXISTS "Only admins can manage services" ON public.services;
DROP POLICY IF EXISTS "Only admins can manage benefits" ON public.benefits;

-- Hapus tables
DROP TABLE IF EXISTS public.services CASCADE;
DROP TABLE IF EXISTS public.benefits CASCADE;

-- ============================================
-- SELESAI!
-- ============================================
-- Tables services dan benefits sudah dihapus
-- ============================================

