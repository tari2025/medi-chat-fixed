require('dotenv').config();

const config = require('./config');
const db = require('./config/database');
const app = require('./app');

async function startServer() {
    try {
        await db.query('SELECT NOW()');
        console.log('PostgreSQL berhasil terhubung!');

        app.listen(config.port, () => {
            console.log(`MediChat berjalan di http://localhost:${config.port}`);
            console.log(`API Status: http://localhost:${config.port}/api/status`);
            console.log(`API Layanan: http://localhost:${config.port}/api/produk`);
        });
    } catch (error) {
        console.error('Koneksi database gagal:', error.message);
        process.exit(1);
    }
}

startServer();
