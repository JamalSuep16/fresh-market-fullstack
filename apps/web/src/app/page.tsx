'use client';
import { useEffect, useState } from 'react';
import { getProducts } from '../lib/api';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const filteredProducts = products.filter((p: any) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-6 py-12">
        <section className="mb-16">
          <h2 className="text-sm font-bold tracking-[0.2em] text-green-600 uppercase mb-4">
            Katalog Produk
          </h2>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h3 className="text-4xl font-bold max-w-lg leading-tight">
              Temukan kesegaran alam langsung di genggamanmu.
            </h3>
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
        </section>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center border-2 border-dashed border-gray-200 rounded-3xl">
              <p className="text-gray-400 italic font-medium">Buah tidak tersedia...</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}