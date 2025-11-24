# 📘 Panduan Mengganti Akun Supabase

## 🎯 Tujuan
Panduan ini akan membantu Anda mengganti konfigurasi Supabase dari akun lama ke akun baru.

---

## 📋 Langkah-langkah

### 1️⃣ Buat Project Baru di Supabase

1. Login ke [https://supabase.com](https://supabase.com)
2. Klik **"New Project"**
3. Isi informasi project:
   - **Name**: Nama project Anda
   - **Database Password**: Password untuk database (simpan dengan aman!)
   - **Region**: Pilih region terdekat (misalnya: Southeast Asia)
4. Klik **"Create new project"**
5. Tunggu hingga project selesai dibuat (sekitar 2-3 menit)

### 2️⃣ Dapatkan Credentials Supabase

1. Di Supabase Dashboard, klik **Settings** (ikon gear) di sidebar kiri
2. Pilih **API** di menu Settings
3. Catat informasi berikut:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: Key yang dimulai dengan `eyJ...` (di bagian "Project API keys")

### 3️⃣ Buat File Environment Variables

1. Di root folder project, buat file `.env` (jika belum ada)
2. Tambahkan atau update isi file dengan:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key-here
```

**Contoh:**
```env
VITE_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYzODk2NzI5MCwiZXhwIjoxOTU0NTQzMjkwfQ.example
```

⚠️ **PENTING**: 
- Ganti `your-project-id` dengan Project ID Anda
- Ganti `your-anon-key-here` dengan anon public key Anda
- Jangan commit file `.env` ke Git (sudah ada di `.gitignore`)

### 4️⃣ Update Supabase Config

1. Buka file `supabase/config.toml`
2. Ganti `project_id` dengan Project ID baru Anda:

```toml
project_id = "your-new-project-id"
```

**Cara mendapatkan Project ID:**
- Di Supabase Dashboard, Project ID ada di URL: `https://supabase.com/dashboard/project/xxxxx`
- Atau di Settings > General > Reference ID

### 5️⃣ Setup Database Schema

Anda perlu menjalankan migrations database ke project Supabase baru. Ada 2 cara:

#### **Cara A: Menggunakan Supabase Dashboard (Recommended untuk pemula)**

1. Di Supabase Dashboard, klik **SQL Editor** di sidebar
2. Buka file-file migration di folder `supabase/migrations/` secara berurutan:
   - `20251111061457_54125eeb-408f-4524-90fb-a564f34e670b.sql`
   - `20251123054838_e6e487d8-6350-4616-9615-acaa0155d518.sql`
   - `20251123060405_b61fbf84-1651-491c-8296-2ac67991bd33.sql`
   - `20251124034446_aab616b7-ca43-43eb-97c9-19c91b89212e.sql`
   - `20251124034838_d536845c-b89b-41d0-99af-0ce52c762326.sql`
   - `20251124035152_d9a2fb3a-9a55-4c5d-9346-e7affa6e0b18.sql`
3. Copy isi setiap file dan paste ke SQL Editor
4. Klik **Run** untuk setiap migration
5. Pastikan tidak ada error

#### **Cara B: Menggunakan Supabase CLI (Advanced)**

```bash
# Install Supabase CLI (jika belum)
npm install -g supabase

# Login ke Supabase
supabase login

# Link ke project baru
supabase link --project-ref your-project-id

# Push migrations
supabase db push
```

### 6️⃣ Setup Authentication (Opsional)

Jika Anda menggunakan authentication:

1. Di Supabase Dashboard, klik **Authentication** > **Providers**
2. Enable provider yang Anda butuhkan (Email, Google, dll)
3. Configure settings sesuai kebutuhan

### 7️⃣ Setup Row Level Security (RLS) Policies

Untuk keamanan, pastikan RLS policies sudah dikonfigurasi:

1. Di Supabase Dashboard, klik **Authentication** > **Policies**
2. Atau gunakan SQL Editor untuk setup policies
3. Pastikan policies sesuai dengan kebutuhan aplikasi Anda

### 8️⃣ Update TypeScript Types (Opsional)

Jika schema database berubah, regenerate types:

```bash
# Install Supabase CLI (jika belum)
npm install -g supabase

# Generate types
npx supabase gen types typescript --project-id your-project-id > src/integrations/supabase/types.ts
```

Atau menggunakan Supabase Dashboard:
1. Klik **Settings** > **API**
2. Scroll ke bagian "TypeScript types"
3. Copy generated types
4. Paste ke `src/integrations/supabase/types.ts`

### 9️⃣ Test Aplikasi

1. **Restart development server:**
   ```bash
   # Stop server (Ctrl+C)
   # Start lagi
   npm run dev
   ```

2. **Test fitur-fitur:**
   - ✅ Buka halaman utama (http://localhost:8080)
   - ✅ Test login admin (http://localhost:8080/login)
   - ✅ Test CRUD operations di admin dashboard
   - ✅ Test semua fitur yang menggunakan Supabase

3. **Check console untuk errors:**
   - Buka Developer Tools (F12)
   - Check Console tab untuk error messages
   - Check Network tab untuk failed requests

### 🔟 Migrate Data (Jika Perlu)

Jika Anda ingin memindahkan data dari project lama:

1. **Export data dari project lama:**
   - Di Supabase Dashboard project lama
   - Klik **Table Editor**
   - Export data untuk setiap tabel (CSV atau SQL)

2. **Import data ke project baru:**
   - Di Supabase Dashboard project baru
   - Klik **Table Editor**
   - Import data yang sudah diexport

Atau gunakan Supabase CLI:
```bash
# Export dari project lama
supabase db dump -f backup.sql

# Import ke project baru
supabase db reset
psql -h your-db-host -U postgres -d postgres -f backup.sql
```

---

## ✅ Checklist

Sebelum deploy, pastikan:

- [ ] File `.env` sudah dibuat dengan credentials baru
- [ ] `supabase/config.toml` sudah diupdate dengan project_id baru
- [ ] Semua migrations sudah dijalankan di project baru
- [ ] Authentication sudah dikonfigurasi (jika digunakan)
- [ ] RLS policies sudah setup
- [ ] Aplikasi berjalan tanpa error
- [ ] Login admin berfungsi
- [ ] CRUD operations berfungsi
- [ ] Data sudah dimigrate (jika perlu)

---

## 🆘 Troubleshooting

### Error: "Invalid API key"
- ✅ Pastikan `VITE_SUPABASE_PUBLISHABLE_KEY` menggunakan **anon key**, bukan service_role key
- ✅ Pastikan tidak ada spasi atau karakter tambahan di .env file

### Error: "Failed to fetch"
- ✅ Pastikan `VITE_SUPABASE_URL` benar dan bisa diakses
- ✅ Check apakah project Supabase masih aktif
- ✅ Check CORS settings di Supabase Dashboard

### Error: "relation does not exist"
- ✅ Pastikan semua migrations sudah dijalankan
- ✅ Check apakah nama tabel sesuai dengan yang ada di code

### Error: "new row violates row-level security policy"
- ✅ Setup RLS policies di Supabase Dashboard
- ✅ Atau disable RLS sementara untuk testing (tidak recommended untuk production)

### Data tidak muncul
- ✅ Check apakah data sudah di-import ke project baru
- ✅ Check RLS policies apakah mengizinkan read access
- ✅ Check console untuk error messages

---

## 📞 Bantuan

Jika masih mengalami masalah:
1. Check [Supabase Documentation](https://supabase.com/docs)
2. Check error messages di browser console
3. Check Supabase Dashboard logs
4. Pastikan semua langkah di atas sudah dilakukan

---

## 🔐 Keamanan

⚠️ **PENTING untuk Production:**

1. **Jangan commit file `.env` ke Git**
   - File `.env` sudah ada di `.gitignore`
   - Jangan pernah share credentials di public repository

2. **Gunakan Environment Variables di Hosting:**
   - Jika deploy ke Vercel/Netlify, set environment variables di dashboard hosting
   - Jangan hardcode credentials di code

3. **Setup RLS Policies:**
   - Pastikan Row Level Security sudah dikonfigurasi dengan benar
   - Jangan disable RLS di production

4. **Gunakan Service Role Key dengan Hati-hati:**
   - Service role key hanya untuk backend/server-side
   - Jangan pernah expose service role key di frontend

---

**Selamat! 🎉 Anda sudah berhasil mengganti akun Supabase.**

