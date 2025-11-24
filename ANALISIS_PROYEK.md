# Analisis Proyek KBM Kreator Jogja

## 📋 Ringkasan Proyek

Proyek ini adalah **website portfolio/landing page** untuk KBM Kreator Jogja yang dibangun dengan teknologi modern.

### Stack Teknologi
- **Frontend Framework**: React 18.3.1 dengan TypeScript
- **Build Tool**: Vite 5.4.19
- **UI Library**: shadcn-ui (Radix UI components)
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM 6.30.1
- **State Management**: TanStack Query (React Query) 5.83.0
- **Backend/Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth UI

### Struktur Proyek

```
kbm-kreator-jogja/
├── src/
│   ├── components/          # Komponen UI
│   │   ├── admin/          # Komponen admin untuk CRUD
│   │   │   ├── AboutManager.tsx
│   │   │   ├── BenefitsManager.tsx
│   │   │   ├── HeroManager.tsx
│   │   │   ├── PortfolioManager.tsx
│   │   │   ├── PrinciplesManager.tsx
│   │   │   ├── ServicesManager.tsx
│   │   │   └── StatsManager.tsx
│   │   ├── ui/             # shadcn-ui components
│   │   ├── About.tsx
│   │   ├── Hero.tsx
│   │   ├── Portfolio.tsx
│   │   ├── Services.tsx
│   │   └── ...
│   ├── pages/              # Halaman aplikasi
│   │   ├── Index.tsx       # Landing page utama
│   │   ├── Login.tsx       # Halaman login admin
│   │   ├── AdminDashboard.tsx  # Dashboard admin
│   │   └── NotFound.tsx
│   ├── integrations/
│   │   └── supabase/
│   │       ├── client.ts   # Konfigurasi Supabase client
│   │       └── types.ts    # TypeScript types untuk database
│   └── lib/                # Utility functions
├── supabase/
│   ├── config.toml         # Konfigurasi Supabase project
│   └── migrations/         # Database migrations
└── public/                 # Static assets
```

## 🗄️ Database Schema (Supabase)

Berdasarkan analisis kode, proyek ini menggunakan tabel-tabel berikut:

1. **benefits** - Manajemen benefit/keuntungan
2. **company_stats** - Statistik perusahaan
3. **services** - Layanan yang ditawarkan
4. **principles** - Prinsip-prinsip perusahaan
5. **hero_content** - Konten hero section
6. **about_content** - Konten about section
7. **portfolio_items** - Item portfolio

## 🔐 Konfigurasi Supabase

### File-file yang Terkait Supabase:

1. **`src/integrations/supabase/client.ts`**
   - File utama untuk inisialisasi Supabase client
   - Menggunakan environment variables:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_PUBLISHABLE_KEY`

2. **`supabase/config.toml`**
   - Berisi `project_id` untuk Supabase CLI
   - Project ID saat ini: `jrgpgamrsnatygijfrzj`

3. **Environment Variables** (`.env` file - tidak ada di repo)
   - Harus dibuat manual di root project
   - Berisi credentials Supabase

## 🔄 Fitur Utama

### Public Pages (Landing Page)
- **Hero Section** - Section utama dengan CTA
- **About Section** - Tentang perusahaan
- **Services** - Daftar layanan
- **Portfolio** - Showcase portfolio
- **Benefits/Why Choose Us** - Keuntungan memilih
- **Stats** - Statistik perusahaan
- **Footer** - Footer dengan informasi kontak
- **WhatsApp Float** - Tombol WhatsApp floating

### Admin Dashboard
- **Authentication** - Login menggunakan Supabase Auth
- **CRUD Operations** untuk:
  - Hero Content Management
  - About Content Management
  - Services Management
  - Benefits Management
  - Principles Management
  - Portfolio Management
  - Stats Management

## 📝 Cara Mengganti Akun Supabase

### Langkah-langkah:

1. **Buat Project Baru di Supabase**
   - Login ke https://supabase.com
   - Buat project baru
   - Catat **Project URL** dan **API Keys**

2. **Update Environment Variables**
   - Buat file `.env` di root project (jika belum ada)
   - Atau update file `.env` yang sudah ada
   - Tambahkan/update:
     ```
     VITE_SUPABASE_URL=https://your-project.supabase.co
     VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key
     ```

3. **Update Supabase Config**
   - Edit `supabase/config.toml`
   - Ganti `project_id` dengan project ID baru

4. **Migrate Database Schema**
   - Jalankan migrations dari folder `supabase/migrations/` ke project Supabase baru
   - Atau gunakan Supabase CLI untuk link project baru

5. **Update Types (Opsional)**
   - Jika schema berbeda, regenerate types:
     ```bash
     npx supabase gen types typescript --project-id your-project-id > src/integrations/supabase/types.ts
     ```

6. **Test Aplikasi**
   - Restart development server
   - Test login dan CRUD operations

## ⚠️ Catatan Penting

- File `.env` **TIDAK** di-commit ke Git (harus ada di `.gitignore`)
- Pastikan semua migrations dijalankan di project Supabase baru
- Data dari project lama tidak akan otomatis ter-copy, perlu export/import manual
- Pastikan Row Level Security (RLS) policies sudah dikonfigurasi dengan benar

## 🚀 Cara Menjalankan Proyek

```bash
# Install dependencies
npm install

# Jalankan development server
npm run dev

# Build untuk production
npm run build
```

## 📦 Dependencies Utama

- `@supabase/supabase-js` - Supabase client library
- `@supabase/auth-ui-react` - UI components untuk authentication
- `react-router-dom` - Routing
- `@tanstack/react-query` - Data fetching & caching
- `lucide-react` - Icon library
- `tailwindcss` - CSS framework

