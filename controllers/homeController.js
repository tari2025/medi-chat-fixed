const config = require('../config');

// Halaman EJS mengambil data layanan melalui Fetch API ke /api/produk.
exports.index = (req, res) => {
    res.render('index', {
        judul: `${config.appName} - Layanan Chat Medis`,
        namaToko: config.appName
    });
};
