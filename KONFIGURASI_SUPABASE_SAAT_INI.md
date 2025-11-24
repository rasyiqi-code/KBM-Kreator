# 🔍 Konfigurasi Supabase Saat Ini

## 📌 Informasi Project Lama

**Project ID**: `jrgpgamrsnatygijfrzj`

File konfigurasi:
- `supabase/config.toml` - Berisi project_id lama
- `src/integrations/supabase/client.ts` - Menggunakan environment variables

## 🔑 Environment Variables yang Dibutuhkan

File `.env` harus berisi:

```env
VITE_SUPABASE_URL=https://jrgpgamrsnatygijfrzj.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key-here
```

⚠️ **Catatan**: File `.env` tidak ada di repository (sudah di `.gitignore` untuk keamanan)

## 📊 Database Tables yang Digunakan

Berdasarkan analisis kode, aplikasi menggunakan tabel-tabel berikut:

1. **portfolio_items** - Data portfolio
2. **services** - Layanan yang ditawarkan
3. **benefits** - Keuntungan/benefit
4. **principles** - Prinsip perusahaan
5. **company_stats** - Statistik perusahaan
6. **hero_content** - Konten hero section
7. **about_content** - Konten about section

## 🔄 Langkah Cepat Mengganti Akun

1. **Buat project baru di Supabase**
2. **Update `.env` file** dengan credentials baru
3. **Update `supabase/config.toml`** dengan project_id baru
4. **Jalankan migrations** dari folder `supabase/migrations/`
5. **Restart development server**

📖 **Detail lengkap**: Lihat file `PANDUAN_GANTI_SUPABASE.md`

