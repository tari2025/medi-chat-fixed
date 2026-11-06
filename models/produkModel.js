const db = require('../config/database');

const ProdukModel = {
    // READ: mengambil seluruh layanan dari PostgreSQL
    async getAll() {
        const result = await db.query(
            'SELECT * FROM produk ORDER BY id ASC'
        );
        return result.rows;
    },

    // READ: mengambil satu layanan berdasarkan ID
    async getById(id) {
        const result = await db.query(
            'SELECT * FROM produk WHERE id = $1',
            [id]
        );
        return result.rows[0] || null;
    },

    // CREATE: menyimpan layanan baru
    async create(data) {
        const result = await db.query(
            `INSERT INTO produk (nama, kategori, harga, jadwal, jam)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING *`,
            [data.nama, data.kategori, data.harga, data.jadwal, data.jam]
        );
        return result.rows[0];
    },

    // UPDATE: memperbarui layanan
    async update(id, data) {
        const result = await db.query(
            `UPDATE produk
             SET nama = $1, kategori = $2, harga = $3,
                 jadwal = $4, jam = $5, updated_at = CURRENT_TIMESTAMP
             WHERE id = $6
             RETURNING *`,
            [data.nama, data.kategori, data.harga, data.jadwal, data.jam, id]
        );
        return result.rows[0] || null;
    },

    // DELETE: menghapus layanan
    async delete(id) {
        const result = await db.query(
            'DELETE FROM produk WHERE id = $1 RETURNING *',
            [id]
        );
        return result.rows[0] || null;
    }
};

module.exports = ProdukModel;
