'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getProductBySlug } from '../../../lib/api';
import Navbar from '../../../components/Navbar';
// 1. Import Store Zustand yang sudah kita buat
import { useCartStore } from '../../../lib/store';
import { toast } from 'sonner';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState<any>(null);

  // 2. Ambil fungsi addItem dari Store
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    if (slug) {
      getProductBySlug(slug as string)
        .then((data) => {
          setProduct(data);
        })
        .catch((err) => {
          console.error("Gagal ambil detail:", err);
        });
    }
  }, [slug]);

  // 3. Fungsi Handler untuk tombol tambah keranjang
  const handleAddToCart = () => {
    if (product) {
      addItem(product);
     
      toast.success(`${product.name} berhasil ditambahkan!`, {
        description: "Cek keranjang belanja kamu untuk checkout.",
      });
    }
  };

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center italic text-gray-400">
      Memuat kesegaran...
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Bagian Gambar */}
          <div className="rounded-3xl overflow-hidden bg-gray-50 shadow-sm border border-gray-100">
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="w-full h-auto object-cover aspect-square hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Bagian Informasi */}
          <div>
            <span className="text-xs font-bold tracking-widest text-green-600 uppercase">
              {product.category?.name || 'Buah Segar'}
            </span>
            <h1 className="text-5xl font-bold mt-4 mb-6 tracking-tight text-gray-900">{product.name}</h1>
            <p className="text-3xl font-light text-gray-900 mb-8">
              Rp {product.price?.toLocaleString('id-ID')}
            </p>
            
            <div className="border-t border-gray-100 pt-8">
              <h3 className="text-sm font-bold uppercase tracking-wide mb-4 text-gray-400">Deskripsi</h3>
              <p className="text-gray-600 leading-relaxed text-lg italic">
                "{product.description}"
              </p>
            </div>

            {/* 4. Pasang onClick ke tombol */}
            <button 
              onClick={handleAddToCart}
              className="w-full md:w-auto mt-12 bg-black text-white px-12 py-4 rounded-full font-bold hover:bg-green-600 transition-all shadow-lg hover:shadow-xl transform active:scale-95"
            >
              Tambahkan ke Keranjang
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}