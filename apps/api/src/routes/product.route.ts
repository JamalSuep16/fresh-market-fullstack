import { Router } from 'express';
import * as productController from '../controllers/product.controller';
import { uploader } from '../middlewares/uploader';

const router = Router();

/**
 * URUTAN SANGAT PENTING:
 * Letakkan rute tanpa parameter (statis) di atas rute dengan parameter (dinamis).
 */

// 1. Menampilkan semua produk (localhost:3000/api/products)
router.get('/products', productController.getProducts);

// 2. Menampilkan detail produk berdasarkan slug (localhost:3000/api/products/:slug)
router.get('/products/:slug', productController.getProductBySlug);

// 3. Menambah produk baru
router.post('/products', productController.createProduct);

// 4. Menghapus produk berdasarkan id
router.delete('/products/:id', productController.deleteProduct);

router.post('/products/upload', uploader.single('file'), productController.uploadImage);

export default router;