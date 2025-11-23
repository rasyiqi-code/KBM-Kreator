-- Create site_content table for simple text content (hero, about, etc)
CREATE TABLE IF NOT EXISTS public.site_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section TEXT NOT NULL UNIQUE, -- 'hero', 'about', 'footer', etc
  content JSONB NOT NULL, -- flexible JSON structure for different content types
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create services table
CREATE TABLE IF NOT EXISTS public.services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  icon TEXT NOT NULL, -- lucide icon name
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create benefits table (Why Choose Us)
CREATE TABLE IF NOT EXISTS public.benefits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  icon TEXT NOT NULL, -- lucide icon name
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create principles table (Working Principles)
CREATE TABLE IF NOT EXISTS public.principles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  icon TEXT NOT NULL, -- lucide icon name
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create company_stats table
CREATE TABLE IF NOT EXISTS public.company_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  color TEXT DEFAULT 'primary', -- tailwind color name
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all new tables
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.benefits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.principles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_stats ENABLE ROW LEVEL SECURITY;

-- Public can read all content
CREATE POLICY "Public can view site content"
ON public.site_content FOR SELECT
USING (true);

CREATE POLICY "Public can view services"
ON public.services FOR SELECT
USING (active = true);

CREATE POLICY "Public can view benefits"
ON public.benefits FOR SELECT
USING (active = true);

CREATE POLICY "Public can view principles"
ON public.principles FOR SELECT
USING (active = true);

CREATE POLICY "Public can view company stats"
ON public.company_stats FOR SELECT
USING (true);

-- Only admins can manage content
CREATE POLICY "Only admins can manage site content"
ON public.site_content FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can manage services"
ON public.services FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can manage benefits"
ON public.benefits FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can manage principles"
ON public.principles FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can manage company stats"
ON public.company_stats FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Add triggers for updated_at
CREATE TRIGGER update_site_content_updated_at
BEFORE UPDATE ON public.site_content
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_services_updated_at
BEFORE UPDATE ON public.services
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_benefits_updated_at
BEFORE UPDATE ON public.benefits
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

-- Insert initial data for hero section
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
}'::jsonb);

-- Insert initial services
INSERT INTO public.services (icon, title, description, display_order) VALUES
('Layout', 'Jasa Desain Cover & Layout Buku', 'Jasa desain cover buku profesional yang memukau dengan layout buku rapi dan estetik. Desain cover menarik untuk semua genre buku', 1),
('PenTool', 'Jasa Ghost Writing Profesional', 'Ghost writer berpengalaman siap membantu menulis buku Anda. Jasa penulis profesional untuk biografi, novel, non-fiksi, dan berbagai genre', 2),
('Video', 'Jasa Video Promosi Buku', 'Jasa pembuatan video promosi buku yang menarik dan profesional untuk meningkatkan penjualan dan awareness buku Anda', 3),
('FileImage', 'Jasa Mockup Buku 3D', 'Jasa mockup buku 3D realistis untuk visualisasi buku sebelum cetak. Mockup profesional untuk promosi dan presentasi', 4),
('Palette', 'Jasa Desain Grafis Buku', 'Jasa desain grafis lengkap untuk kebutuhan visual buku: ilustrasi, infografis, banner, dan material promosi', 5),
('Sparkles', 'Jasa Penerbitan Buku ISBN', 'Konsultasi penerbitan buku ber-ISBN melalui Penerbit KBM Indonesia. Self publishing dan indie publishing dengan standar profesional', 6);

-- Insert initial benefits
INSERT INTO public.benefits (icon, title, description, display_order) VALUES
('Sparkles', 'Royalti 100% untuk Penulis', 'Kami percaya karya Anda adalah aset berharga. Dapatkan royalti penuh tanpa potongan', 1),
('Shield', 'Garansi Hasil Cetakan', 'Kepuasan Anda prioritas kami. Garansi kualitas hasil cetakan dan pelayanan profesional', 2),
('RefreshCcw', 'Cetak Ulang dari Penerbit Lain', 'Ingin cetak ulang buku dari penerbit lain? Kami siap membantu dengan proses yang mudah', 3),
('CheckCircle', 'Pelayanan Profesional', 'Tim berpengalaman siap mendampingi dari konsultasi hingga buku Anda terbit', 4);

-- Insert initial principles
INSERT INTO public.principles (icon, title, description, display_order) VALUES
('Shield', 'Bekerja dibalik Layar', 'Siapa pun mitra partner kami maka privasinya akan kami jaga. Label, logo, dan identitas KBM Kreator Yogyakarta tidak akan pernah kami munculkan pada lembar naskah atau jobs yang diberikan oleh mitra partner.', 1),
('ShieldCheck', 'Anti Sabotase & Pencurian Pelanggan', 'Kepercayaan mitra partner adalah yang terpenting bagi kami. Kepercayaan melahirkan kerjasama dengan komitmen tinggi, dan komitmen tinggi membuat kerjasama berlangsung sangat lama.', 2),
('Lock', 'Menjaga Privasi Mitra Partner', 'Kami tidak pernah membocorkan data dan nama penerbit yang bekerjasama kecuali atas ijin mereka. Ratusan penerbit, puluhan ribu cetakan buku, dan ribuan layout telah dipercayakan kepada kami.', 3),
('Sparkles', 'Memudahkan Dalam Pelayanan', 'Ketika branding mitra partner kami naik karena pelayanan yang memudahkan, omset kami pun ikut naik. Saling menguntungkan adalah kunci kesuksesan bersama.', 4);

-- Insert initial company stats
INSERT INTO public.company_stats (label, value, color, display_order) VALUES
('Cover Dibuat', '1,000+', 'primary', 1),
('Layout Selesai', '2,000+', 'secondary', 2),
('Mitra Penerbit', '100+', 'accent', 3),
('Tahun Pengalaman', '7+', 'primary-dark', 4);

COMMENT ON TABLE public.site_content IS 'Stores editable site content sections with flexible JSON structure';
COMMENT ON TABLE public.services IS 'Stores service items displayed on landing page';
COMMENT ON TABLE public.benefits IS 'Stores benefits/why choose us items';
COMMENT ON TABLE public.principles IS 'Stores working principles/values';
COMMENT ON TABLE public.company_stats IS 'Stores company statistics displayed on landing page';