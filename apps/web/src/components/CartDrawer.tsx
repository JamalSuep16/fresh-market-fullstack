'use client';
import { useCartStore } from '../lib/store';

export default function CartDrawer() {
  const { items, isOpen, toggleCart, addItem, decreaseQuantity, removeItem } = useCartStore();

  if (!isOpen) return null;

  // Hitung total harga menggunakan LaTeX logic sederhana
  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Background Gelap (Overlay) */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={toggleCart} />
      
      {/* Panel Putih */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">Keranjang Kamu</h2>
          <button onClick={toggleCart} className="text-gray-400 hover:text-black">✕ Close</button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <p className="text-center text-gray-400 italic mt-10">Keranjang masih kosong...</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 items-center">
                <img src={item.imageUrl} className="w-20 h-20 object-cover rounded-xl bg-gray-50" />
                <div className="flex-1">
                  <h4 className="font-bold">{item.name}</h4>
                  <p className="text-sm text-gray-500">Rp {item.price.toLocaleString('id-ID')}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <button onClick={() => decreaseQuantity(item.id)} className="w-6 h-6 border rounded flex items-center justify-center">-</button>
                    <span className="text-sm font-medium">{item.quantity}</span>
                    <button onClick={() => addItem(item)} className="w-6 h-6 border rounded flex items-center justify-center">+</button>
                  </div>
                </div>
                <button onClick={() => removeItem(item.id)} className="text-red-400 text-xs">Hapus</button>
              </div>
            ))
          )}
        </div>

        <div className="p-6 border-t bg-gray-50">
          <div className="flex justify-between mb-4">
            <span className="font-medium text-gray-500">Subtotal</span>
            <span className="font-bold text-xl">Rp {subtotal.toLocaleString('id-ID')}</span>
          </div>
          <button className="w-full bg-black text-white py-4 rounded-full font-bold hover:bg-green-600 transition shadow-lg">
            Checkout Sekarang
          </button>
        </div>
      </div>
    </div>
  );
}