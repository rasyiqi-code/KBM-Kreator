# 📋 Struktur Landing Page - KBM Kreator Jogja

## 🎯 Struktur Sesuai Gambar

Landing page terdiri dari section-section berikut (dari atas ke bawah):

### 1. **Hero Section** ✅
- Badge: "Professional sejak 2017"
- Heading utama
- Subheading 1 & 2
- 2 CTA buttons
- **Admin Manager**: `HeroManager.tsx`
- **Database**: `site_content` table, section = 'hero'

### 2. **About Section** ✅
- Heading: "Partner Kreatif Perusahaan Penerbit di Indonesia"
- Intro paragraph
- VISI & MISI
- **Prinsip Kerja Kami** (4 items dengan icon)
- Info perusahaan (Didirikan, Lokasi, Owner, Keanggotaan)
- **Statistik** (4 stats di kanan: Cover Dibuat, Layout Selesai, Mitra Penerbit, Tahun Pengalaman)
- **Admin Managers**: 
  - `AboutManager.tsx` - untuk konten about
  - `PrinciplesManager.tsx` - untuk prinsip kerja
  - `StatsManager.tsx` - untuk statistik
- **Database**: 
  - `site_content` table, section = 'about'
  - `principles` table
  - `company_stats` table

### 3. **Portfolio Section** ✅
Portfolio dibagi menjadi beberapa sub-section berdasarkan kategori:

#### 3.1. **Tim & Layanan Kami** (Featured Items)
- Menampilkan items dengan `featured = true`
- Biasanya flyer/banner dengan foto tim
- **Admin Manager**: `PortfolioManager.tsx` (set featured = true)

#### 3.2. **Desain Cover Buku Premium** (Category: cover)
- Menampilkan items dengan `category = 'cover'`
- Grid layout dengan book covers
- **Admin Manager**: `PortfolioManager.tsx` (pilih category = cover)

#### 3.3. **Layout Naskah Profesional** (Category: layout)
- Menampilkan items dengan `category = 'layout'`
- Grid layout dengan layout samples
- **Admin Manager**: `PortfolioManager.tsx` (pilih category = layout)

#### 3.4. **Fotografi Produk Estetik** (Category: aesthetic/photo)
- Menampilkan items dengan `category = 'aesthetic'` atau `'photo'`
- Grid layout dengan aesthetic photos
- **Admin Manager**: `PortfolioManager.tsx` (pilih category = aesthetic)

- **Admin Manager**: `PortfolioManager.tsx`
- **Database**: `portfolio_items` table
- **Kategori yang didukung**:
  - `cover` - Desain Cover
  - `layout` - Layout Naskah
  - `aesthetic` - Fotografi Estetik
  - `video` - Video (opsional)

### 4. **Footer** ✅
- Logo & nama perusahaan
- Copyright
- Lokasi
- Social media links
- **Note**: Footer saat ini hardcoded, bisa ditambahkan ke database jika perlu

### 5. **WhatsApp Float Button** ✅
- Floating button untuk WhatsApp
- **Note**: Hardcoded, bisa ditambahkan ke database jika perlu

---

## ✅ Semua Konten Bisa Diupdate via Admin Dashboard

### Admin Dashboard Tabs:
1. **Portfolio** - Manage portfolio items (cover, layout, aesthetic, featured)
2. **Hero** - Manage hero section content
3. **About** - Manage about section content
4. **Prinsip** - Manage prinsip kerja (4 items)
5. **Statistik** - Manage company stats (4 items)

---

## 📝 Catatan Penting

- Portfolio sudah support semua kategori yang ada di gambar
- Semua konten utama (Hero, About, Portfolio, Prinsip, Stats) sudah bisa diupdate via admin dashboard

---

## 🔄 Urutan Section di Landing Page

```
1. Hero Section
2. About Section (dengan Prinsip Kerja & Stats)
3. Portfolio Section
   - Tim & Layanan Kami (featured)
   - Desain Cover Buku Premium (cover)
   - Layout Naskah Profesional (layout)
   - Fotografi Produk Estetik (aesthetic)
4. Footer
5. WhatsApp Float Button
```

---

**Struktur sudah sesuai dengan gambar dan semua konten bisa diupdate via admin dashboard!** ✅

