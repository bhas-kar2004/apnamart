import AddToCartButton from "@/components/AddToCartButton";
import { getProductById } from "@/lib/api";
import { Star, Truck, ShieldCheck, ShoppingCart, Zap, ChevronRight, RotateCcw } from 'lucide-react';
import Link from "next/link";

export default async function ProductDetails({ params }) {
  const { id } = await params;   
  const product = await getProductById(id);

  const rating = product.rating?.rate || 4.5;
  const reviewCount = product.rating?.count || 128;

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans pb-20">
      
      {/* Abstract Glowing Background Elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute bottom-[20%] right-[-10%] h-[400px] w-[400px] rounded-full bg-orange-500/10 blur-[120px]" />
      </div>

      <main className="relative z-10 mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8">
          <Link href="/" className="hover:text-orange-400 transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link href="/products" className="hover:text-orange-400 transition-colors">Products</Link>
          <ChevronRight size={14} />
          <span className="text-slate-200 capitalize">{product.category || 'Category'}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* LEFT: Product Image Gallery */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-square w-full rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-8 flex items-center justify-center overflow-hidden group">
              <div className="absolute inset-4 bg-white rounded-2xl flex items-center justify-center p-8 shadow-2xl">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </div>
          </div>

          {/* RIGHT: Product Information */}
          <div className="flex flex-col">
            
            <div className="mb-2">
              <span className="text-sm font-bold tracking-wider text-orange-400 uppercase">
                {product.category}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              {product.title}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1 bg-green-600/20 text-green-400 px-2.5 py-1 rounded-md text-sm font-bold">
                {rating} <Star size={14} className="fill-green-400" />
              </div>
              <span className="text-slate-400 text-sm hover:text-white cursor-pointer transition-colors">
                {reviewCount} Ratings & Reviews
              </span>
            </div>

            <div className="mb-8">
              <div className="flex items-end gap-3 mb-2">
                <span className="text-4xl font-extrabold text-white">₹{product.price}</span>
                <span className="text-xl text-slate-500 line-through mb-1">
                  ₹{(product.price * 1.3).toFixed(2)}
                </span>
                <span className="text-orange-400 font-bold mb-1 text-sm">30% Off</span>
              </div>
              <p className="text-xs text-slate-400">Inclusive of all taxes</p>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-white mb-2">Product Details</h3>
              <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                {product.description}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8 py-6 border-y border-white/10">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="h-10 w-10 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center">
                  <Truck size={20} />
                </div>
                <span className="text-xs font-medium text-slate-300">Free Delivery</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="h-10 w-10 rounded-full bg-green-500/10 text-green-400 flex items-center justify-center">
                  <ShieldCheck size={20} />
                </div>
                <span className="text-xs font-medium text-slate-300">1 Year Warranty</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="h-10 w-10 rounded-full bg-orange-500/10 text-orange-400 flex items-center justify-center">
                  <RotateCcw size={20} />
                </div>
                <span className="text-xs font-medium text-slate-300">7 Days Replacement</span>
              </div>
            </div>

            <AddToCartButton product={product} />

          </div>
        </div>
      </main>
    </div>
  );
}