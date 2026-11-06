const ProdukModel = require('../models/produkModel');
const config = require('../config');

exports.status = (req, res) => {
    res.json({
        status: 'ok',
        aplikasi: config.appName,
        uptimeDetik: Math.round(process.uptime()),
        waktuServer: new Date().toISOString()
    });
};

function validasiProduk(body = {}) {
    const errors = [];
    const nama = typeof body.nama === 'string' ? body.nama.trim() : '';
    const kategori = typeof body.kategori === 'string' ? body.kategori.trim() : '';
    const jadwal = typeof body.jadwal === 'string' ? body.jadwal.trim() : '';
    const jam = typeof body.jam === 'string' ? body.jam.trim() : '';
    const harga = body.harga;

    if (!nama) errors.push('Nama wajib diisi');
    if (!kategori) errors.push('Kategori wajib diisi');
    if (harga === '' || harga === undefined || !Number.isFinite(Number(harga)) || Number(harga) < 0) {
        errors.push('Harga harus berupa angka positif atau nol');
    }
    if (!jadwal) errors.push('Jadwal wajib diisi');
    if (!jam) errors.push('Jam wajib diisi');

    return errors;
}

function payload(body) {
    return {
        nama: body.nama.trim(),
        kategori: body.kategori.trim(),
        harga: Number(body.harga),
        jadwal: body.jadwal.trim(),
        jam: body.jam.trim()
    };
}

function idValid(id) {
    return /^\d+$/.test(String(id)) && Number(id) > 0;
}

// GET /api/produk
exports.getAllProduk = async (req, res, next) => {
    try {
        const data = await ProdukModel.getAll();
        res.json({ sukses: true, jumlah: data.length, data });
    } catch (error) {
        next(error);
    }
};

// GET /api/produk/:id
exports.getProdukById = async (req, res, next) => {
    try {
        if (!idValid(req.params.id)) {
            return res.status(400).json({ sukses: false, pesan: 'ID tidak valid' });
        }
        const data = await ProdukModel.getById(req.params.id);
        if (!data) {
            return res.status(404).json({ sukses: false, pesan: 'Layanan tidak ditemukan' });
        }
        res.json({ sukses: true, data });
    } catch (error) {
        next(error);
    }
};

// POST /api/produk
exports.createProduk = async (req, res, next) => {
    try {
        const errors = validasiProduk(req.body);
        if (errors.length) {
            return res.status(400).json({ sukses: false, errors });
        }
        const data = await ProdukModel.create(payload(req.body));
        res.status(201).json({ sukses: true, pesan: 'Layanan berhasil ditambahkan', data });
    } catch (error) {
        next(error);
    }
};

// PUT /api/produk/:id
exports.updateProduk = async (req, res, next) => {
    try {
        if (!idValid(req.params.id)) {
            return res.status(400).json({ sukses: false, pesan: 'ID tidak valid' });
        }
        const errors = validasiProduk(req.body);
        if (errors.length) {
            return res.status(400).json({ sukses: false, errors });
        }
        const data = await ProdukModel.update(req.params.id, payload(req.body));
        if (!data) {
            return res.status(404).json({ sukses: false, pesan: 'Layanan tidak ditemukan' });
        }
        res.json({ sukses: true, pesan: 'Layanan berhasil diperbarui', data });
    } catch (error) {
        next(error);
    }
};

// DELETE /api/produk/:id
exports.deleteProduk = async (req, res, next) => {
    try {
        if (!idValid(req.params.id)) {
            return res.status(400).json({ sukses: false, pesan: 'ID tidak valid' });
        }
        const data = await ProdukModel.delete(req.params.id);
        if (!data) {
            return res.status(404).json({ sukses: false, pesan: 'Layanan tidak ditemukan' });
        }
        res.json({ sukses: true, pesan: 'Layanan berhasil dihapus', data });
    } catch (error) {
        next(error);
    }
};
