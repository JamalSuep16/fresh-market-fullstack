import Link from 'next/link';

export default function ProductCard({ product }: { product: any }) {
  return (
    // Gunakan Link untuk navigasi ke folder products/[slug]
    <Link href={`/products/${product.slug}`} className="group">
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300">
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
          <img 
            src={product.imageUrl || 'https://via.placeholder.com/300'} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="p-6">
          <p className="text-[10px] font-bold tracking-widest text-green-600 uppercase mb-1">
            {product.category?.name || 'Katalog'}
          </p>
          <h2 className="text-xl font-semibold leading-tight">{product.name}</h2>
          <div className="mt-6 flex items-center justify-between">
            <span className="text-lg font-bold">
              Rp {product.price?.toLocaleString('id-ID')}
            </span>
            <span className="text-sm font-medium text-black underline underline-offset-4 group-hover:text-green-600 transition-colors">
              Lihat Detail
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}