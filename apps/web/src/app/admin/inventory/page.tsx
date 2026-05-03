'use client';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import Navbar from '../../../components/Navbar';
import Image from 'next/image'; // 1. Gunakan Image Next.js

// 2. Interface yang lebih ketat agar tidak ada 'any'
interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  imageUrl: string;
  category?: {
    name: string;
  };
}

export default function InventoryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // 3. fetchProducts dibungkus useCallback agar aman di dependency useEffect
  const fetchProducts = useCallback(async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/products');
      // Pastikan struktur data sesuai (res.data.data atau res.data)
      const data = res.data.data || res.data;
      setProducts(data);
    } catch { 
        // Hapus (_err) jika tidak digunakan untuk logging
        toast.error("Gagal memuat daftar inventaris.");
      } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProducts();
  }, [fetchProducts]);

  const handleDelete = async (id: number, name: string) => {
    if (confirm(`Apakah kamu yakin ingin menghapus ${name}?`)) {
      try {
        await axios.delete(`http://localhost:3000/api/products/${id}`);
        
        toast.success(`${name} berhasil dihapus!`);
  
        // 4. Gunakan functional update agar state lebih aman
        setProducts((prev) => prev.filter(p => p.id !== id));
        
      } catch (err: unknown) { // Menggunakan 'unknown' lebih baik daripada 'any'
        if (axios.isAxiosError(err)) {
          const errorMessage = err.response?.data?.message || "Gagal menghapus produk.";
          toast.error(errorMessage);
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="max-w-5xl mx-auto py-20 px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-5xl font-black tracking-tighter uppercase italic">Inventory</h1>
            <p className="text-gray-400">Total {products.length} produk terdaftar di Fresh Market.</p>
          </div>
          <a href="/admin/add-product" className="bg-black text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-green-600 transition-all">
            + TAMBAH PRODUK
          </a>
        </div>

        {loading ? (
          <p className="text-center py-20 animate-pulse text-gray-400 italic">Memuat data inventaris...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-100">
                  <th className="py-4 text-xs font-bold uppercase tracking-widest text-gray-400">Produk</th>
                  <th className="py-4 text-xs font-bold uppercase tracking-widest text-gray-400 text-center">Stok</th>
                  <th className="py-4 text-xs font-bold uppercase tracking-widest text-gray-400">Harga</th>
                  <th className="py-4 text-xs font-bold uppercase tracking-widest text-gray-400 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors group">
                    <td className="py-6 flex items-center gap-4">
                      {/* 5. Penggantian ke Next Image untuk performa & passing lint */}
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                        <Image 
                          src={product.imageUrl || '/placeholder.png'} 
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="font-bold text-lg tracking-tight">{product.name}</span>
                    </td>
                    <td className="py-6 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${product.stock < 10 ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'}`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="py-6 font-medium text-gray-600">
                      Rp {product.price.toLocaleString('id-ID')}
                    </td>
                    <td className="py-6 text-right">
                      <button 
                        onClick={() => handleDelete(product.id, product.name)}
                        className="text-red-400 hover:text-red-600 font-bold text-xs uppercase tracking-widest transition-colors opacity-0 group-hover:opacity-100"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}