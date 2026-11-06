const express = require('express');
const path = require('path');
const logger = require('./middlewares/logger');
const routes = require('./routes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use('/', routes);

app.use((req, res) => {
    if (req.originalUrl.startsWith('/api')) {
        return res.status(404).json({ sukses: false, pesan: 'Endpoint tidak ditemukan' });
    }
    res.status(404).send('Halaman tidak ditemukan');
});

app.use((error, req, res, next) => {
    console.error('Error:', error.message);
    if (res.headersSent) return next(error);
    res.status(500).json({
        sukses: false,
        pesan: process.env.NODE_ENV === 'production' ? 'Terjadi kesalahan server' : error.message
    });
});

module.exports = app;
