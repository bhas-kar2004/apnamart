import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { getCategories } from '@/lib/api';
import { ArrowRight, LayoutGrid } from 'lucide-react';

export default async function AllCategoriesPage() {
  // This now fetches names AND thumbnails!
  const categories = await getCategories();

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans pb-20">
      <Navbar />

      <main className="relative z-10 mx-auto max-w-7xl px-4 pt-32 sm:px-6 lg:px-8">
        
        {/* PAGE HEADER */}
        <div className="mb-12 border-b border-white/10 pb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Shop by <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Category</span>
          </h1>
          <p className="text-slate-400">
            Explore {categories.length} unique collections spanning tech, fashion, and lifestyle.
          </p>
        </div>

        {/* DYNAMIC CATEGORY GRID WITH IMAGES */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((cat) => (
            <Link key={cat.slug} href={`/products?category=${cat.slug}`} className="group block h-full">
              <div className="relative h-48 sm:h-64 rounded-3xl overflow-hidden border border-white/10 bg-slate-500 shadow-xl">
                
                {/* --- Category Image with Hover Effect --- */}
                {cat.thumbnail ? (
                  <img 
                    src={cat.thumbnail} 
                    alt={cat.name} 
                    className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-60" 
                  />
                ) : (
                  // Fallback if no image found
                  <div className="absolute inset-0 bg-slate-800 flex items-center justify-center">
                    <LayoutGrid size={48} className="text-slate-600" />
                  </div>
                )}
                
                {/* Dark Gradient Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent" />
                
                {/* Text Content Overlay */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors capitalize shadow-sm">
                    {cat.name}
                  </h3>
                  
                  {/* Animated Explore Link */}
                  <div className="flex items-center gap-2">
                    <span className="h-[2px] w-0 bg-orange-400 group-hover:w-4 transition-all duration-300"></span>
                    <p className="text-sm font-bold text-orange-400 flex items-center gap-1 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all uppercase tracking-wider">
                       Explore Collection <ArrowRight size={14} />
                    </p>
                  </div>
                </div>

              </div>
            </Link>
          ))}
        </div>

      </main>
    </div>
  );
}