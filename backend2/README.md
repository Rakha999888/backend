# Sistem Pemesanan Laundry - Backend

Ini adalah aplikasi backend Node.js + Express untuk mengelola pesanan laundry dengan menggunakan MongoDB Atlas sebagai basis data.

## Persyaratan

- Node.js (versi 14 atau lebih tinggi)
- npm (sudah termasuk dalam Node.js)
- Akun MongoDB Atlas dengan kluster yang sudah disiapkan

## Instalasi

1. Clone repositori ini
2. Masuk ke direktori proyek:
   ```bash
   cd junior-fullstack-technical-test/case-3-umkm/backend
   ```
3. Install dependensi:
   ```bash
   npm install
   ```

## Konfigurasi

1. Aplikasi menggunakan variabel lingkungan berikut (disimpan di file `.env`):
   ```
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   PRICE_PER_KG=8000
   ```

2. String koneksi MongoDB sudah dikonfigurasi dengan kredensial yang disediakan.

## Menjalankan Aplikasi

### Mode Produksi
```bash
node server.js
```

Server akan berjalan di `http://localhost:3000`

## Endpoint API

- `POST /api/orders` - Membuat pesanan baru
- `GET /api/orders` - Mendapatkan semua pesanan
- `GET /api/orders/:id` - Mendapatkan detail pesanan tertentu
- `PUT /api/orders/:id` - Memperbarui pesanan
- `DELETE /api/orders/:id` - Menghapus pesanan

## Pengujian API

Anda dapat menggunakan tools seperti Postman atau cURL untuk menguji API. Berikut beberapa contoh permintaan:

### Membuat Pesanan
```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "John Doe",
    "serviceType": "Cuci Setrika",
    "weight": 2.5
  }'
```

### Mendapatkan Semua Pesanan
```bash
curl http://localhost:3000/api/orders
```

## Catatan Keamanan

- Jangan pernah menaruh informasi sensitif seperti kredensial database ke dalam version control
- File `.env` sudah dimasukkan ke dalam `.gitignore` untuk mencegah kesalahan commit
- Untuk lingkungan produksi, pertimbangkan untuk menggunakan environment variables atau sistem manajemen rahasia yang aman
