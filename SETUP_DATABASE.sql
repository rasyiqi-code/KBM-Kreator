-- ============================================
-- SETUP DATABASE - KBM Kreator Jogja
-- ============================================
-- File SQL utama untuk setup database
-- Jalankan file ini sekali di Supabase SQL Editor
-- ============================================

-- ============================================
-- 1. STORAGE BUCKET
-- ============================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio', 'portfolio', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public)
VALUES ('promo', 'promo', true)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 2. TABLES
-- ============================================

-- Portfolio Items
CREATE TABLE IF NOT EXISTS public.portfolio_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('cover', 'layout', 'aesthetic', 'video')),
  external_url TEXT,
  youtube_url TEXT,
  instagram_url TEXT,
  featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Site Content
CREATE TABLE IF NOT EXISTS public.site_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section TEXT NOT NULL UNIQUE,
  content JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Principles
CREATE TABLE IF NOT EXISTS public.principles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  icon TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Company Stats
CREATE TABLE IF NOT EXISTS public.company_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  color TEXT DEFAULT 'primary',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Promo Items
CREATE TABLE IF NOT EXISTS public.promo_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  link_url TEXT,
  active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- ============================================
-- 3. ROW LEVEL SECURITY
-- ============================================
ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.principles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promo_items ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 4. POLICIES - Public Read
-- ============================================

-- Portfolio Items
DROP POLICY IF EXISTS "Portfolio items are viewable by everyone" ON public.portfolio_items;
CREATE POLICY "Portfolio items are viewable by everyone" 
ON public.portfolio_items FOR SELECT 
USING (true);

-- Site Content
DROP POLICY IF EXISTS "Public can view site content" ON public.site_content;
CREATE POLICY "Public can view site content"
ON public.site_content FOR SELECT
USING (true);

-- Principles
DROP POLICY IF EXISTS "Public can view principles" ON public.principles;
CREATE POLICY "Public can view principles"
ON public.principles FOR SELECT
USING (active = true);

-- Company Stats
DROP POLICY IF EXISTS "Public can view company stats" ON public.company_stats;
CREATE POLICY "Public can view company stats"
ON public.company_stats FOR SELECT
USING (true);

-- Promo Items
DROP POLICY IF EXISTS "Public can view promo items" ON public.promo_items;
CREATE POLICY "Public can view promo items"
ON public.promo_items FOR SELECT
USING (active = true);

-- ============================================
-- 5. POLICIES - Authenticated Users Can Manage
-- ============================================

-- Portfolio Items
DROP POLICY IF EXISTS "Authenticated users can insert portfolio items" ON public.portfolio_items;
DROP POLICY IF EXISTS "Authenticated users can update portfolio items" ON public.portfolio_items;
DROP POLICY IF EXISTS "Authenticated users can delete portfolio items" ON public.portfolio_items;
DROP POLICY IF EXISTS "Only admins can insert portfolio items" ON public.portfolio_items;
DROP POLICY IF EXISTS "Only admins can update portfolio items" ON public.portfolio_items;
DROP POLICY IF EXISTS "Only admins can delete portfolio items" ON public.portfolio_items;

CREATE POLICY "Authenticated users can insert portfolio items"
ON public.portfolio_items FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update portfolio items"
ON public.portfolio_items FOR UPDATE
USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete portfolio items"
ON public.portfolio_items FOR DELETE
USING (auth.role() = 'authenticated');

-- Site Content
DROP POLICY IF EXISTS "Authenticated users can manage site content" ON public.site_content;
DROP POLICY IF EXISTS "Only admins can manage site content" ON public.site_content;
CREATE POLICY "Authenticated users can manage site content"
ON public.site_content FOR ALL
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- Principles
DROP POLICY IF EXISTS "Authenticated users can manage principles" ON public.principles;
DROP POLICY IF EXISTS "Only admins can manage principles" ON public.principles;
CREATE POLICY "Authenticated users can manage principles"
ON public.principles FOR ALL
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- Company Stats
DROP POLICY IF EXISTS "Authenticated users can manage company stats" ON public.company_stats;
DROP POLICY IF EXISTS "Only admins can manage company stats" ON public.company_stats;
CREATE POLICY "Authenticated users can manage company stats"
ON public.company_stats FOR ALL
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- Promo Items
DROP POLICY IF EXISTS "Authenticated users can manage promo items" ON public.promo_items;
DROP POLICY IF EXISTS "Only admins can manage promo items" ON public.promo_items;
CREATE POLICY "Authenticated users can manage promo items"
ON public.promo_items FOR ALL
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- ============================================
-- 6. STORAGE POLICIES
-- ============================================

-- Public can view
DROP POLICY IF EXISTS "Portfolio images are publicly accessible" ON storage.objects;
DROP POLICY IF EXISTS "Public can view portfolio images" ON storage.objects;
CREATE POLICY "Public can view portfolio images"
ON storage.objects FOR SELECT
USING (bucket_id = 'portfolio');

-- Authenticated can upload/update/delete
DROP POLICY IF EXISTS "Authenticated users can upload portfolio images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update portfolio images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete portfolio images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can upload portfolio images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update portfolio images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete portfolio images" ON storage.objects;
DROP POLICY IF EXISTS "Only admins can upload to portfolio" ON storage.objects;
DROP POLICY IF EXISTS "Only admins can update portfolio images" ON storage.objects;
DROP POLICY IF EXISTS "Only admins can delete from portfolio" ON storage.objects;

CREATE POLICY "Authenticated users can upload portfolio images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'portfolio' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update portfolio images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'portfolio' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete portfolio images"
ON storage.objects FOR DELETE
USING (bucket_id = 'portfolio' AND auth.role() = 'authenticated');

-- Promo images
DROP POLICY IF EXISTS "Public can view promo images" ON storage.objects;
CREATE POLICY "Public can view promo images"
ON storage.objects FOR SELECT
USING (bucket_id = 'promo');

DROP POLICY IF EXISTS "Authenticated users can upload promo images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update promo images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete promo images" ON storage.objects;
CREATE POLICY "Authenticated users can upload promo images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'promo' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update promo images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'promo' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete promo images"
ON storage.objects FOR DELETE
USING (bucket_id = 'promo' AND auth.role() = 'authenticated');

-- ============================================
-- 7. FUNCTIONS & TRIGGERS
-- ============================================

-- Function untuk update timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Triggers untuk semua tables
DROP TRIGGER IF EXISTS update_portfolio_items_updated_at ON public.portfolio_items;
DROP TRIGGER IF EXISTS update_site_content_updated_at ON public.site_content;
DROP TRIGGER IF EXISTS update_principles_updated_at ON public.principles;
DROP TRIGGER IF EXISTS update_company_stats_updated_at ON public.company_stats;

CREATE TRIGGER update_portfolio_items_updated_at
BEFORE UPDATE ON public.portfolio_items
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_site_content_updated_at
BEFORE UPDATE ON public.site_content
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_principles_updated_at
BEFORE UPDATE ON public.principles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_company_stats_updated_at
BEFORE UPDATE ON public.company_stats
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_promo_items_updated_at
BEFORE UPDATE ON public.promo_items
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- 8. INITIAL DATA
-- ============================================

-- Hero & About Content
INSERT INTO public.site_content (section, content) VALUES
('hero', '{
  "badge": "Professional sejak 2017",
  "heading": "Jasa Desain Layout, Pembuatan Sampul, Cetak Buku, Album Foto & Pdf",
  "subheading1": "KBM Kreator Yogyakarta berani memberikan klaim garansi sebesar Rp 5.000.000 per naskah",
  "subheading2": "Mitra & Partner terbaik untuk perusahaan Penerbit Buku di Indonesia",
  "cta1_text": "Mulai Proyek Anda",
  "cta2_text": "Lihat Portfolio"
}'::jsonb),
('about', '{
  "heading": "Partner Kreatif Perusahaan Penerbit di Indonesia",
  "intro": "KBM Kreator Yogyakarta berdiri sejak 2017 dan mulai fokus pengembangan serta ekspansi bisnis sejak 2023. Lokasi kantor yang berdiri di Depok, Sleman - Yogyakarta sangat didukung dengan mudahnya mencari tenaga kerja yang profesional, peralatan dan mesin yang mumpuni, dan berbagai bahan baku yang cukup mudah didapat dengan harga teman dekat.",
  "visi": "Berusaha Membantu Meringankan Pekerjaan Setiap Penerbit Buku di Indonesia Secara Cepat, Berintegritas - Berkomitmen Tinggi Dan Saling Menguntungkan.",
  "misi": "1). Ada kuantitas - ada fasilitas; 2). Ada kuantitas - ada request dan 3). kualitas sultan – harga persahabatan.",
  "founding_year": "2017 | Fokus Ekspansi sejak 2023",
  "location": "Paingan, Maguwoharjo, Depok, Sleman, DI Yogyakarta",
  "owner": "Mohammad Imam Junaidi, S.E., M.H.",
  "owner_title": "Praktisi Advokasi Hukum, Kepenulisan & Motivasi Literasi",
  "membership": "Bergabung di PCJ (Paguyuban Cetak Jogjakarta)"
}'::jsonb)
ON CONFLICT (section) DO NOTHING;

-- Principles
INSERT INTO public.principles (icon, title, description, display_order) VALUES
('Shield', 'Bekerja dibalik Layar', 'Siapa pun mitra partner kami maka privasinya akan kami jaga. Label, logo, dan identitas KBM Kreator Yogyakarta tidak akan pernah kami munculkan pada lembar naskah atau jobs yang diberikan oleh mitra partner.', 1),
('ShieldCheck', 'Anti Sabotase & Pencurian Pelanggan', 'Kepercayaan mitra partner adalah yang terpenting bagi kami. Kepercayaan melahirkan kerjasama dengan komitmen tinggi, dan komitmen tinggi membuat kerjasama berlangsung sangat lama.', 2),
('Lock', 'Menjaga Privasi Mitra Partner', 'Kami tidak pernah membocorkan data dan nama penerbit yang bekerjasama kecuali atas ijin mereka. Ratusan penerbit, puluhan ribu cetakan buku, dan ribuan layout telah dipercayakan kepada kami.', 3),
('Sparkles', 'Memudahkan Dalam Pelayanan', 'Ketika branding mitra partner kami naik karena pelayanan yang memudahkan, omset kami pun ikut naik. Saling menguntungkan adalah kunci kesuksesan bersama.', 4)
ON CONFLICT DO NOTHING;

-- Company Stats
INSERT INTO public.company_stats (label, value, color, display_order) VALUES
('Cover Dibuat', '1,000+', 'primary', 1),
('Layout Selesai', '2,000+', 'secondary', 2),
('Mitra Penerbit', '100+', 'accent', 3),
('Tahun Pengalaman', '7+', 'primary-dark', 4)
ON CONFLICT DO NOTHING;

-- ============================================
-- SELESAI!
-- ============================================
-- Semua authenticated users bisa manage content
-- Tidak perlu setup role atau konfigurasi tambahan
-- ============================================

