# MediChat Puskesmas Sehat

Aplikasi Express.js + EJS + PostgreSQL dengan pola MVC dan CRUD layanan.

## Instalasi

```bash
npm install
```

Salin `.env.example` menjadi `.env`, kemudian sesuaikan konfigurasi PostgreSQL.

## Database

Buat database `medichat_db` di PostgreSQL, lalu jalankan isi `database/schema.sql` melalui pgAdmin atau psql.

## Menjalankan aplikasi

```bash
npm run dev
```

Buka http://localhost:3000

## Endpoint API

- GET `/api/status`
- GET `/api/produk`
- GET `/api/produk/:id`
- POST `/api/produk`
- PUT `/api/produk/:id`
- DELETE `/api/produk/:id`

Field JSON untuk POST dan PUT: `nama`, `kategori`, `harga`, `jadwal`, `jam`.
