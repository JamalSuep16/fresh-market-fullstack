import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // 1. Bersihkan data lama (opsional)
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // 2. Buat Kategori
  const tropis = await prisma.category.create({
    data: { name: 'Buah Tropis' },
  });

  const impor = await prisma.category.create({
    data: { name: 'Buah Impor' },
  });

  // 3. Buat Produk Buah
  await prisma.product.createMany({
    data: [
      {
        name: 'Mangga Arum Manis',
        slug: 'mangga-arum-manis',
        description: 'Mangga manis pilihan langsung dari kebun.',
        price: 25000,
        stock: 50,
        categoryId: tropis.id,
        imageUrl: 'https://images.unsplash.com/photo-1553279768-865429fa0078',
      },
      {
        name: 'Apel Fuji',
        slug: 'apel-fuji',
        description: 'Apel merah renyah dan segar.',
        price: 35000,
        stock: 30,
        categoryId: impor.id,
        imageUrl: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce',
      },
      {
        name: 'Pisang Sunpride',
        slug: 'pisang-sunpride',
        description: 'Pisang berkualitas tinggi kaya nutrisi.',
        price: 18000,
        stock: 100,
        categoryId: tropis.id,
        imageUrl: 'https://images.unsplash.com/photo-1587132137056-bfbf0166836e?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    ],
  });

  console.log('✅ Seed data berhasil dimasukkan!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });