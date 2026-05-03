import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Mengambil semua daftar buah beserta kategori masing-masing
 */
export const findAllProducts = async () => {
  return await prisma.product.findMany({
    include: {
      category: true, // Menyertakan detail kategori (misal: "Buah Tropis")
    },
    orderBy: {
      createdAt: 'desc', // Produk terbaru muncul di atas
    },
  });
};

/**
 * Mengambil detail satu buah berdasarkan slug
 * Berguna untuk halaman detail produk yang SEO-friendly
 */
export const findProductBySlug = async (slug: string) => {
  return await prisma.product.findUnique({
    where: { slug },
    include: {
      category: true,
    },
  });
};

/**
 * Mengambil produk berdasarkan kategori tertentu
 */
export const findProductsByCategory = async (categoryName: string) => {
  return await prisma.product.findMany({
    where: {
      category: {
        name: categoryName,
      },
    },
    include: {
      category: true,
    },
  });
};

/**
 * Menambahkan produk baru (untuk dashboard admin nanti)
 */
export const createProduct = async (data: {
  name: string;
  slug: string;
  description?: string;
  price: number;
  stock: number;
  imageUrl?: string;
  categoryId: number;
}) => {
  return await prisma.product.create({
    data,
  });
};

// Di dalam file product.service.ts
export const deleteProduct = async (id: number) => {
  return await prisma.product.deleteMany({
    where: { id },
  });
};
