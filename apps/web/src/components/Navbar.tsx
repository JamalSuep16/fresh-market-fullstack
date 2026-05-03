'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCartStore } from '../lib/store';

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const totalItems = useCartStore((state) => state.getTotalItems());
  const toggleCart = useCartStore((state) => state.toggleCart);

  // Mencegah Hydration Error dengan memastikan komponen sudah terpasang di browser
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="text-2xl font-extrabold tracking-tighter italic">
          Arya Suhara <span className="font-light text-gray-400">| Fresh Market</span>
        </Link>

        <div className="flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link href="/" className="hover:text-black transition">Beranda</Link>
          
          <div onClick={toggleCart} className="relative cursor-pointer group">
            <span className="hover:text-black transition">Keranjang</span>
            {/* Hanya render badge jika sudah mounted di browser dan items > 0 */}
            {mounted && totalItems > 0 && (
              <span className="absolute -top-2 -right-4 bg-green-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                {totalItems}
              </span>
            )}
          </div>

          <button className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition">
            Kontak
          </button>
        </div>
      </div>
    </nav>
  );
}