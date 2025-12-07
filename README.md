# KBM Kreator Jogja - Portfolio & Landing Page

Portfolio website dengan admin dashboard untuk mengelola konten landing page secara dinamis.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ & pnpm (or npm) - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- Supabase account (untuk database & authentication)

### Installation

```sh
# Clone repository
git clone <YOUR_GIT_URL>
cd kbm-kreator-jogja

# Install dependencies
pnpm install
# atau
npm install

# Setup environment variables
# Copy .env.example to .env and fill in your Supabase credentials
# See: PANDUAN_GANTI_SUPABASE.md

# Setup database
# See: README_SETUP.md atau SETUP_DATABASE.sql

# Start development server
pnpm dev
# atau
npm run dev
```

Aplikasi akan berjalan di `http://localhost:8080`

## 🏗️ Tech Stack

- **Frontend Framework**: React 18 + TypeScript
- **Build Tool**: Vite 5
- **UI Components**: shadcn-ui + Radix UI
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Backend**: Supabase (Database + Authentication + Storage)
- **State Management**: TanStack Query
- **Form Handling**: React Hook Form + Zod
- **Icons**: Lucide React

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── admin/          # Admin dashboard components
│   ├── ui/             # shadcn-ui components
│   └── ...             # Public-facing components
├── pages/              # Page components
│   ├── Index.tsx       # Landing page
│   ├── Login.tsx       # Authentication page
│   └── AdminDashboard.tsx  # Admin panel
├── integrations/
│   └── supabase/       # Supabase client & types
├── hooks/              # Custom React hooks
└── lib/                # Utility functions
```

## 🔧 Features

### Public Features
- ✅ Landing page dengan Hero section
- ✅ About section dengan prinsip kerja & statistik
- ✅ Portfolio showcase
- ✅ Promo section
- ✅ WhatsApp floating button
- ✅ Responsive design

### Admin Dashboard
- ✅ Authentication dengan Supabase Auth
- ✅ Portfolio management (CRUD)
- ✅ Hero content management
- ✅ About content management
- ✅ Principles management
- ✅ Stats management
- ✅ Promo management
- ✅ Image upload ke Supabase Storage

## 📚 Documentation

- **[README_SETUP.md](./README_SETUP.md)** - Setup database & konfigurasi awal
- **[SETUP_DATABASE.sql](./SETUP_DATABASE.sql)** - SQL script untuk setup database
- **[PANDUAN_GANTI_SUPABASE.md](./PANDUAN_GANTI_SUPABASE.md)** - Panduan konfigurasi Supabase
- **[STRUKTUR_LANDING_PAGE.md](./STRUKTUR_LANDING_PAGE.md)** - Dokumentasi struktur landing page
- **[ADMIN_DASHBOARD_GUIDE.md](./ADMIN_DASHBOARD_GUIDE.md)** - Panduan penggunaan admin dashboard

## 🛠️ Development

### Available Scripts

```sh
# Development server dengan hot reload
pnpm dev

# Build untuk production
pnpm build

# Preview production build
pnpm preview

# Lint code
pnpm lint
```

### Build Optimization

Project ini sudah dioptimasi dengan:
- ✅ Code splitting (lazy loading components)
- ✅ Tree shaking untuk icons (lucide-react)
- ✅ Manual chunk splitting untuk dependencies
- ✅ Optimized bundle sizes

Build output: Semua chunks < 600KB, dengan gzipped sizes yang optimal.

## 🔐 Authentication

Admin dashboard menggunakan Supabase Authentication:
- Akses: `/login`
- Setelah login, redirect ke `/admin`
- Semua authenticated users dapat mengelola konten

## 📦 Deployment

### Via Lovable
1. Buka [Lovable Project](https://lovable.dev/projects/eeedfb28-bbd4-431f-98fc-8cc188b3f714)
2. Klik **Share → Publish**

### Manual Deployment
1. Build project: `pnpm build`
2. Deploy folder `dist/` ke hosting provider (Vercel, Netlify, dll)
3. Pastikan environment variables sudah dikonfigurasi

### Custom Domain
- Via Lovable: Project > Settings > Domains > Connect Domain
- Manual: Konfigurasi DNS sesuai provider hosting

## 🤝 Contributing

Ada beberapa cara untuk mengedit code:

**Via IDE Lokal**
- Clone repo dan push changes
- Changes akan ter-reflect di Lovable

**Via GitHub**
- Edit file langsung di GitHub
- Commit changes

**Via GitHub Codespaces**
- Buka Codespace dari repository
- Edit files dan commit changes

## 📝 Notes

- Pastikan Supabase project sudah dikonfigurasi sebelum development
- Database migrations ada di folder `supabase/migrations/`
- Environment variables harus dikonfigurasi di `.env` file
- Semua authenticated users dapat mengelola konten (tidak perlu role khusus)

## 🆘 Troubleshooting

### Error saat build?
- Pastikan semua dependencies terinstall: `pnpm install`
- Check Node.js version (minimal 18+)

### Error database connection?
- Pastikan Supabase credentials sudah benar di `.env`
- Check: `PANDUAN_GANTI_SUPABASE.md`

### Error upload image?
- Pastikan Supabase Storage bucket sudah dikonfigurasi
- Check authentication status

### Error 404 pada routes?
- Pastikan sudah menjalankan `SETUP_DATABASE.sql`
- Restart development server

---

**Selamat coding! 🎉**
