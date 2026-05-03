import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Interface untuk struktur produk di dalam keranjang
interface CartItem {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

// Interface untuk State Management Keranjang
interface CartState {
  items: CartItem[];
  isOpen: boolean; 
  addItem: (product: any) => void;
  removeItem: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number; // Tambahan: Menghitung total harga belanja
  toggleCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false, // Default: panel keranjang tertutup

      // Menambah produk atau menambah quantity jika produk sudah ada
      addItem: (product) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === product.id);

        if (existingItem) {
          set({
            items: currentItems.map((item) =>
              item.id === product.id 
                ? { ...item, quantity: item.quantity + 1 } 
                : item
            ),
          });
        } else {
          set({ items: [...currentItems, { ...product, quantity: 1 }] });
        }
      },

      // Mengurangi quantity produk (minimal 1)
      decreaseQuantity: (id) => {
        const currentItems = get().items;
        set({
          items: currentItems.map((item) =>
            item.id === id && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        });
      },

      // Menghapus produk sepenuhnya dari keranjang
      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) });
      },

      clearCart: () => set({ items: [] }),

      // Menghitung total item (Σ Quantity)
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      // Menghitung total harga (Σ Price * Quantity)
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
      },

      // Fungsi toggle untuk buka/tutup panel samping (Drawer)
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
    }),
    { 
      name: 'fresh-market-storage' // Nama key di LocalStorage MacBook kamu
    }
  )
);