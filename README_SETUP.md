# 🚀 Setup Database - KBM Kreator Jogja

## 📋 Langkah Setup

### 1. Buka Supabase Dashboard
- Login ke: https://supabase.com/dashboard/project/bfaaidtkjndvuphsxqcj
- Klik **SQL Editor** di sidebar kiri

### 2. Jalankan File SQL
- Buka file **`SETUP_DATABASE.sql`** di project Anda
- Copy seluruh isi file
- Paste ke SQL Editor
- Klik **Run**

### 3. Selesai! ✅
- Database sudah siap digunakan
- Semua authenticated users bisa manage content
- Tidak perlu setup role atau konfigurasi tambahan

## 🔐 Cara Login Admin

1. Buka aplikasi: http://localhost:8080/login
2. Klik **Sign Up** untuk membuat akun baru
3. Atau **Sign In** jika sudah punya akun
4. Setelah login, otomatis bisa akses admin dashboard

## 📝 Catatan

- **File SQL utama**: `SETUP_DATABASE.sql` (hanya ini yang perlu dijalankan)
- Semua authenticated users bisa manage content (tidak perlu role admin)
- Jika ada error, pastikan sudah login terlebih dahulu

## 🆘 Troubleshooting

### Error saat upload portfolio?
- Pastikan sudah login
- Check browser console untuk error detail

### Error 404 pada portfolio_items?
- Pastikan sudah menjalankan `SETUP_DATABASE.sql`
- Restart development server: `npm run dev`

---

**Selamat! Database sudah siap digunakan.** 🎉

