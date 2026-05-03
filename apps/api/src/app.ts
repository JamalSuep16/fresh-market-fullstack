import express from 'express';
import cors from 'cors';
import productRoutes from './routes/product.route';

const app = express();

// 1. Konfigurasi CORS agar frontend (port 3001) bisa akses backend (port 3000)
app.use(cors());

// 2. Middleware untuk membaca data JSON
app.use(express.json());

// 3. Simple Logger (Sangat membantu untuk memantau request di terminal VS Code kamu)
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

// 4. Daftarkan route produk dengan prefix '/api'
// Sesuai file route kamu, ini akan menghasilkan: /api/products dan /api/products/:slug
app.use('/api', productRoutes);

// 5. Port Setting
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server project jual-buah berjalan di http://localhost:${PORT}`);
  console.log(`📂 Endpoint produk: http://localhost:${PORT}/api/products`);
});