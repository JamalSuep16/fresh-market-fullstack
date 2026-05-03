import { Request, Response } from 'express';
import * as productService from '../services/product.service';
import { v2 as cloudinary } from 'cloudinary';

// Konfigurasi Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Mengambil semua produk buah
 * GET /api/products
 */
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await productService.findAllProducts();
    
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Gagal mengambil daftar buah',
      error: error instanceof Error ? error.message : error,
    });
  }
};

/**
 * Mengambil satu produk berdasarkan slug
 * GET /api/products/:slug
 */
export const getProductBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params as {slug: string};
    const product = await productService.findProductBySlug(slug);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Buah tidak ditemukan',
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mencari detail buah',
    });
  }
};

/**
 * Membuat produk baru (Untuk Admin)
 * POST /api/products
 */
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, slug, price, description, imageUrl, categoryId, stock } = req.body;

    // Pastikan semua variabel di bawah ini masuk ke dalam kurung kurawal createProduct
    const newProduct = await productService.createProduct({
      name,
      slug,
      price: Number(price),
      description,
      imageUrl,
      categoryId: Number(categoryId),
      stock: Number(stock) // <--- Garis merah hilang kalau ini ada
    });

    res.status(201).json({
      success: true,
      message: 'Buah berhasil ditambahkan',
      data: newProduct
    });
  } catch (error) {
    console.error("ERROR DB:", error); // CEK TERMINAL VS CODE UNTUK LIHAT PESAN INI
    res.status(500).json({ 
      success: false, 
      message: 'Gagal menambah buah, periksa kembali data input' 
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Mengambil ID dari URL: /api/products/123

    await productService.deleteProduct(Number(id)); // Kirim ke service

    res.status(200).json({
      success: true,
      message: 'Produk berhasil dihapus dari database',
    });
  } catch (error) {
    console.error("DELETE ERROR:", error);
    res.status(500).json({
      success: false,
      message: 'Gagal menghapus produk, mungkin data tidak ditemukan',
    });
  }
};

export const uploadImage = async (req: Request, res: Response) => {
  try {
    if (!req.file) return res.status(400).send('Tidak ada file yang diunggah.');

    // Mengubah buffer menjadi base64 agar bisa dikirim ke Cloudinary
    const fileBase64 = Buffer.from(req.file.buffer).toString('base64');
    const fileDataUri = `data:${req.file.mimetype};base64,${fileBase64}`;

    const uploadResponse = await cloudinary.uploader.upload(fileDataUri, {
      folder: 'fresh_market_products', // Folder otomatis di Cloudinary
    });

    res.status(200).json({
      success: true,
      url: uploadResponse.secure_url, // Ini URL yang akan disimpan ke database
    });
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    res.status(500).json({ success: false, message: 'Gagal upload ke Cloudinary' });
  }
};