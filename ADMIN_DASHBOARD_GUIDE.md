# 📊 Panduan Admin Dashboard - KBM Kreator Jogja

## 🚀 Cara Mengakses Admin Dashboard

1. **Buka halaman login**: `/login`
2. **Login dengan akun Supabase** yang sudah terdaftar
3. Setelah login berhasil, akan otomatis redirect ke `/admin`

## 📋 Fitur Admin Dashboard

Admin Dashboard memiliki **5 tabs** untuk mengelola konten landing page:

### 1. **Portfolio** 📸
- **Fungsi**: Mengelola portfolio items (gambar, video, dll)
- **Fitur**:
  - Tambah portfolio item baru
  - Edit portfolio item
  - Hapus portfolio item
  - Upload gambar ke Supabase Storage
  - Set featured item (untuk section "Tim & Layanan Kami")
  - Pilih kategori: `cover`, `layout`, `aesthetic`, `video`
  - Atur urutan tampil (display_order)
  - Link YouTube & Instagram

### 2. **Hero** 🎯
- **Fungsi**: Mengelola konten Hero Section (bagian atas landing page)
- **Field yang bisa diupdate**:
  - Badge Text (contoh: "Professional sejak 2017")
  - Heading Utama
  - Subheading 1
  - Subheading 2
  - Tombol CTA 1 & 2

### 3. **About** ℹ️
- **Fungsi**: Mengelola konten About Section
- **Field yang bisa diupdate**:
  - Heading
  - Intro Paragraph
  - VISI
  - MISI
  - Tahun Didirikan
  - Lokasi
  - Owner & Pendiri
  - Jabatan/Profesi Owner
  - Keanggotaan

### 4. **Prinsip** 🎨
- **Fungsi**: Mengelola Prinsip Kerja (4 items)
- **Fitur**:
  - Tambah prinsip baru
  - Edit prinsip
  - Hapus prinsip
  - Aktifkan/nonaktifkan prinsip
  - Atur urutan tampil (up/down)
  - Set icon (nama icon dari Lucide React)

### 5. **Statistik** 📊
- **Fungsi**: Mengelola Company Statistics (4 stats)
- **Fitur**:
  - Tambah statistik baru
  - Edit statistik
  - Hapus statistik
  - Atur urutan tampil (up/down)
  - Pilih warna: `primary`, `secondary`, `accent`, `primary-dark`

## ✅ Semua Fitur Sudah Berfungsi

### ✅ Authentication
- Login dengan Supabase Auth
- Auto-redirect jika belum login
- Logout berfungsi

### ✅ CRUD Operations
- **Create**: Semua manager bisa tambah data baru
- **Read**: Semua manager bisa load data dari database
- **Update**: Semua manager bisa update data
- **Delete**: Semua manager bisa hapus data (kecuali Hero & About)

### ✅ Auto-Insert
- HeroManager & AboutManager bisa insert data jika belum ada
- PrinciplesManager & StatsManager auto-set display_order saat insert

### ✅ Error Handling
- Toast notifications untuk success/error
- Error messages yang jelas
- Loading states

### ✅ Data Validation
- PortfolioManager menggunakan Zod validation
- URL validation untuk YouTube & Instagram
- Required fields validation

## 🔧 Troubleshooting

### Jika tidak bisa login:
1. Pastikan sudah setup database dengan `SETUP_DATABASE.sql`
2. Pastikan sudah membuat user di Supabase Auth
3. Cek `.env` file sudah benar

### Jika data tidak muncul:
1. Pastikan sudah run `SETUP_DATABASE.sql` di Supabase SQL Editor
2. Cek RLS policies sudah benar
3. Cek network tab di browser untuk error

### Jika upload gambar gagal:
1. Pastikan storage bucket `portfolio` sudah dibuat
2. Cek storage policies sudah benar
3. Cek file size (max recommended: 5MB)

## 📝 Catatan Penting

- **Semua perubahan langsung tersimpan ke database**
- **Tidak ada draft/undo** - pastikan sebelum save
- **Gambar yang diupload** akan tersimpan di Supabase Storage bucket `portfolio`
- **Display order** menentukan urutan tampil di landing page
- **Featured items** akan muncul di section "Tim & Layanan Kami"

---

**Admin Dashboard siap digunakan!** 🎉

