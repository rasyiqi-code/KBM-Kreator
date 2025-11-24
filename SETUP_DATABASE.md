# 🛠️ Setup Database - Perbaikan Error 404 & 400

## 🔴 Error yang Terjadi

1. **Error 404 pada `/rest/v1/portfolio_items`**
   - Tabel `portfolio_items` belum dibuat
   - Migration belum dijalankan

2. **Error 400 pada storage bucket**
   - File `1763961042853.jpg` tidak ada di bucket
   - Ini normal jika belum ada data portfolio

## ✅ Solusi: Jalankan Semua Migrations

### Cara 1: Jalankan Migrations Secara Berurutan (Recommended)

1. **Buka Supabase Dashboard**
   - Login ke: https://supabase.com/dashboard/project/bfaaidtkjndvuphsxqcj
   - Klik **SQL Editor** di sidebar kiri

2. **Jalankan migrations secara berurutan:**

   **Migration 1:** `20251111061457_54125eeb-408f-4524-90fb-a564f34e670b.sql`
   - Copy seluruh isi file
   - Paste ke SQL Editor
   - Klik **Run**
   - ✅ Harus sukses tanpa error

   **Migration 2:** `20251123054838_e6e487d8-6350-4616-9615-acaa0155d518.sql`
   - Copy seluruh isi file
   - Paste ke SQL Editor
   - Klik **Run**

   **Migration 3:** `20251123060405_b61fbf84-1651-491c-8296-2ac67991bd33.sql`
   - Copy seluruh isi file
   - Paste ke SQL Editor
   - Klik **Run**

   **Migration 4:** `20251124034446_aab616b7-ca43-43eb-97c9-19c91b89212e.sql`
   - Copy seluruh isi file
   - Paste ke SQL Editor
   - Klik **Run**

   **Migration 5:** `20251124034838_d536845c-b89b-41d0-99af-0ce52c762326.sql`
   - Copy seluruh isi file
   - Paste ke SQL Editor
   - Klik **Run**

   **Migration 6:** `20251124035152_d9a2fb3a-9a55-4c5d-9346-e7affa6e0b18.sql`
   - Copy seluruh isi file
   - Paste ke SQL Editor
   - Klik **Run**

### Cara 2: Gunakan File SQL Gabungan

Saya sudah membuat file `SETUP_DATABASE_COMPLETE.sql` yang berisi semua migrations. 
Jalankan file tersebut sekali saja di SQL Editor.

## 🔍 Verifikasi Setup

Setelah menjalankan semua migrations, verifikasi dengan:

1. **Check Tables:**
   ```sql
   SELECT table_name 
   FROM information_schema.tables 
   WHERE table_schema = 'public' 
   ORDER BY table_name;
   ```
   
   Harus ada tabel:
   - `portfolio_items`
   - `services`
   - `benefits`
   - `principles`
   - `company_stats`
   - `site_content`
   - `user_roles`

2. **Check Storage Bucket:**
   - Buka **Storage** di sidebar
   - Pastikan bucket `portfolio` ada
   - Status: **Public**

3. **Test Query:**
   ```sql
   SELECT * FROM portfolio_items LIMIT 1;
   ```
   - Harus return tanpa error (meskipun kosong)

## 🎯 Setelah Setup Selesai

1. **Restart Development Server:**
   ```bash
   # Stop server (Ctrl+C)
   npm run dev
   ```

2. **Test Aplikasi:**
   - Buka http://localhost:8080
   - Error 404 harus hilang
   - Portfolio section akan menampilkan fallback images (karena belum ada data)

3. **Login Admin:**
   - Buka http://localhost:8080/login
   - Buat akun baru atau login
   - User pertama otomatis jadi admin (berdasarkan migration terakhir)

4. **Tambah Data Portfolio:**
   - Login ke admin dashboard
   - Tambah portfolio items melalui Portfolio Manager
   - Upload gambar ke storage bucket

## ⚠️ Catatan Penting

- **Error 400 pada storage** adalah normal jika file belum diupload
- **Error 404 pada portfolio_items** akan hilang setelah migration dijalankan
- **Warning React Router** tidak mempengaruhi fungsi aplikasi (bisa diabaikan)

## 🆘 Troubleshooting

### Jika masih error 404 setelah migration:

1. Check apakah tabel sudah dibuat:
   ```sql
   SELECT * FROM portfolio_items;
   ```

2. Check RLS policies:
   ```sql
   SELECT * FROM pg_policies WHERE tablename = 'portfolio_items';
   ```

3. Pastikan policy "Portfolio items are viewable by everyone" ada

### Jika error saat menjalankan migration:

- Pastikan menjalankan migrations secara berurutan
- Jika ada error "already exists", itu normal (skip saja)
- Jika ada error syntax, copy ulang dari file migration

---

**Setelah semua migrations dijalankan, aplikasi akan berfungsi dengan baik!** 🎉

