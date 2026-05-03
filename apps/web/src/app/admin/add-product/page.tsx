'use client';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import Navbar from '../../../components/Navbar';
import axios from 'axios';

export default function AddProductPage() {
  const [formData, setFormData] = useState({
    name: '', 
    slug: '', 
    price: '', 
    description: '', 
    imageUrl: '', 
    stock: '',
    categoryId: '3' 
  });

  // State tambahan untuk Upload Gambar
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Membersihkan memori preview URL saat komponen tidak digunakan
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // Membuat preview gambar
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true); // Mulai loading

    try {
      let finalImageUrl = formData.imageUrl;

      // 1. PROSES UPLOAD KE CLOUDINARY (Jika ada file yang dipilih)
      if (selectedFile) {
        const uploadData = new FormData();
        uploadData.append('file', selectedFile);

        const uploadRes = await axios.post('http://localhost:3000/api/products/upload', uploadData);
        finalImageUrl = uploadRes.data.url; // Ambil URL hasil upload Cloudinary
      }

      // 2. SIMPAN DATA PRODUK KE DATABASE
      const payload = {
        ...formData,
        imageUrl: finalImageUrl,
        price: Number(formData.price),
        stock: Number(formData.stock),
        categoryId: Number(formData.categoryId)
      };

      const res = await axios.post('http://localhost:3000/api/products', payload);
      
      if (res.data.success) {
        toast.success("Produk & Foto Berhasil Terbit!", {
          description: `${formData.name} sudah tersedia di katalog.`,
          action: {
            label: 'Lihat Web',
            onClick: () => window.open('/', '_blank')
          },
        });
        
        // Reset Form
        setFormData({
          name: '', slug: '', price: '', description: '', imageUrl: '', stock: '', categoryId: '3'
        });
        setSelectedFile(null);
        setPreviewUrl(null);
      }
    } catch (err: any) {
      console.error("Detail Error:", err.response?.data);
      const errorMessage = err.response?.data?.message || "Gagal memproses produk.";
      toast.error(errorMessage);
    } finally {
      setIsUploading(false); // Matikan loading
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="max-w-xl mx-auto py-20 px-6">
        <div className="mb-10">
          <h1 className="text-4xl font-black tracking-tighter uppercase italic">Admin Panel</h1>
          <p className="text-gray-400">Tambah Produk Baru ke Fresh Market</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* AREA UPLOAD GAMBAR - Minimalist Style */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Foto Produk</label>
            <div className={`relative border-2 border-dashed rounded-2xl p-4 transition-all text-center ${previewUrl ? 'border-black' : 'border-gray-200 hover:border-gray-400'}`}>
              {previewUrl ? (
                <div className="relative inline-block">
                  <img src={previewUrl} alt="Preview" className="w-40 h-40 object-cover rounded-xl shadow-sm" />
                  <button 
                    type="button"
                    onClick={() => {setPreviewUrl(null); setSelectedFile(null);}}
                    className="absolute -top-2 -right-2 bg-black text-white rounded-full w-6 h-6 text-xs flex items-center justify-center hover:bg-red-500 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <label className="cursor-pointer block py-10">
                  <span className="text-gray-400 text-sm block mb-1 font-medium">Klik untuk pilih foto buah</span>
                  <span className="text-xs text-gray-300">Format: JPG, PNG, WEBP (Max 2MB)</span>
                  <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                </label>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Nama Buah</label>
            <input 
              required
              value={formData.name}
              className="w-full border-b-2 border-gray-100 py-3 focus:border-black outline-none transition-colors text-lg font-bold"
              placeholder="Mangga Arum Manis"
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Slug URL</label>
              <input 
                required
                value={formData.slug}
                className="w-full border-b-2 border-gray-100 py-3 focus:border-black outline-none transition-colors"
                placeholder="mangga-arum-manis"
                onChange={(e) => setFormData({...formData, slug: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Harga (Rp)</label>
              <input 
                required
                type="number"
                value={formData.price}
                className="w-full border-b-2 border-gray-100 py-3 focus:border-black outline-none transition-colors"
                placeholder="25000"
                onChange={(e) => setFormData({...formData, price: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Jumlah Stok</label>
              <input 
                required
                type="number"
                value={formData.stock}
                className="w-full border-b-2 border-gray-100 py-3 focus:border-black outline-none transition-colors"
                placeholder="50"
                onChange={(e) => setFormData({...formData, stock: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">ID Kategori</label>
              <input 
                required
                type="number"
                value={formData.categoryId}
                className="w-full border-b-2 border-gray-100 py-3 focus:border-black outline-none transition-colors font-mono"
                onChange={(e) => setFormData({...formData, categoryId: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Deskripsi Singkat</label>
            <textarea 
              required
              rows={3}
              value={formData.description}
              className="w-full border-2 border-gray-100 p-4 rounded-2xl focus:border-black outline-none transition-colors resize-none"
              placeholder="Deskripsikan kesegaran produk..."
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <button 
            disabled={isUploading}
            className={`w-full py-5 rounded-full font-bold transition-all active:scale-95 shadow-lg shadow-gray-200 ${isUploading ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-black text-white hover:bg-green-600'}`}
          >
            {isUploading ? 'SEDANG MENGUNGGAH...' : 'PUBLIKASIKAN PRODUK'}
          </button>
        </form>
      </main>
    </div>
  );
}