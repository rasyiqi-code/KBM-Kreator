# 🔧 Troubleshooting: Promo Section Tidak Muncul di Production

## Masalah
Fitur Promo tidak muncul di website production (https://kbmkreatoryogyakarta.com/) padahal di localhost:8080 ada.

## Kemungkinan Penyebab & Solusi

### 1. ✅ Cek Data di Database Production

**Masalah**: Data `promo_items` tidak ada atau semua item memiliki `active = false`

**Solusi**:
1. Login ke Supabase Dashboard: https://supabase.com/dashboard
2. Pilih project production Anda
3. Buka **Table Editor** → cari tabel `promo_items`
4. Pastikan ada data dengan `active = true`
5. Jika tidak ada data, tambahkan via Admin Dashboard di production:
   - Login ke: `https://kbmkreatoryogyakarta.com/login`
   - Masuk ke tab **Promo**
   - Tambahkan promo baru dan pastikan **Active** di-check

### 2. ✅ Cek Environment Variables di Production

**Masalah**: Environment variables Supabase tidak terkonfigurasi dengan benar

**Solusi**:
1. Cek di platform deployment Anda (Vercel/Netlify/dll):
   - Pastikan ada `VITE_SUPABASE_URL`
   - Pastikan ada `VITE_SUPABASE_PUBLISHABLE_KEY`
2. Pastikan values-nya sama dengan yang digunakan di local
3. **Restart/redeploy** setelah mengubah environment variables

**Cara cek di browser console**:
```javascript
// Buka browser console di production website
console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
console.log('Supabase Key:', import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);
```

### 3. ✅ Cek Error di Browser Console

**Masalah**: Ada error saat fetch data yang tidak terlihat

**Solusi**:
1. Buka website production: https://kbmkreatoryogyakarta.com/
2. Buka **Browser Console** (F12 → Console tab)
3. Cari error yang terkait dengan:
   - `Error fetching promo`
   - `Supabase`
   - `promo_items`
4. Screenshot error dan cek:
   - Apakah Supabase URL/key benar?
   - Apakah ada CORS error?
   - Apakah ada RLS (Row Level Security) policy error?

### 4. ✅ Cek RLS (Row Level Security) Policy

**Masalah**: Policy Supabase tidak mengizinkan public read

**Solusi**:
1. Login ke Supabase Dashboard
2. Buka **Authentication** → **Policies**
3. Cari policy untuk tabel `promo_items`
4. Pastikan ada policy:
   ```sql
   CREATE POLICY "Public can view promo items"
   ON public.promo_items FOR SELECT
   USING (active = true);
   ```
5. Jika tidak ada, jalankan query ini di SQL Editor:
   ```sql
   -- Pastikan RLS enabled
   ALTER TABLE public.promo_items ENABLE ROW LEVEL SECURITY;
   
   -- Policy untuk public read (hanya active items)
   DROP POLICY IF EXISTS "Public can view promo items" ON public.promo_items;
   CREATE POLICY "Public can view promo items"
   ON public.promo_items FOR SELECT
   USING (active = true);
   ```

### 5. ✅ Rebuild & Redeploy

**Masalah**: Build production tidak include perubahan terbaru

**Solusi**:
1. Pastikan code terbaru sudah di-push ke repository
2. Rebuild project:
   ```bash
   pnpm build
   ```
3. Redeploy ke production
4. Clear browser cache atau test di incognito mode

### 6. ✅ Cek Network Request

**Masalah**: Request ke Supabase gagal

**Solusi**:
1. Buka **Browser DevTools** → **Network** tab
2. Refresh halaman production
3. Cari request ke Supabase (filter: `supabase` atau `promo_items`)
4. Cek:
   - Status code (harus 200, bukan 401/403/404)
   - Response body (apakah ada data?)
   - Request URL (apakah benar?)

## 🧪 Testing Checklist

Gunakan checklist ini untuk debugging:

- [ ] Data `promo_items` ada di database production dengan `active = true`
- [ ] Environment variables terkonfigurasi dengan benar di production
- [ ] Tidak ada error di browser console
- [ ] RLS policy sudah benar untuk public read
- [ ] Build terbaru sudah di-deploy
- [ ] Browser cache sudah di-clear
- [ ] Network request ke Supabase berhasil (status 200)

## 🔍 Debug Mode

Untuk melihat log lebih detail, buka browser console di production dan cari:
- `Promo items fetched: X` - menunjukkan jumlah item yang di-fetch
- `Error fetching promo:` - menunjukkan error detail

## 📞 Jika Masih Bermasalah

1. Screenshot error dari browser console
2. Screenshot data dari Supabase Table Editor
3. Cek apakah fitur lain (Portfolio, About) berfungsi dengan baik
4. Bandingkan konfigurasi Supabase antara local dan production

---

**Note**: Component Promo akan return `null` (tidak render) jika:
- Masih loading
- Tidak ada data dengan `active = true`
- Ada error saat fetch data

Ini adalah behavior yang expected untuk mencegah render section kosong.

