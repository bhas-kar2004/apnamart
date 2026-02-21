export const dynamic = "force-dynamic";

import { getProducts, getCategories } from "@/lib/api";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { Filter } from "lucide-react";
import Link from "next/link";

export default async function ProductsPage({ searchParams }) {
  // Grab the selected category from the URL (e.g., /products?category=smartphones)
  const { category } = await searchParams;
  
  // Fetch data
  const allProducts = await getProducts();
  const categories = await getCategories();

  // If a category is selected, filter the products. Otherwise, show all 100!
  const displayedProducts = category 
    ? allProducts.filter(p => p.category === category)
    : allProducts;

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans pb-20">
      <Navbar />

      <main className="relative z-10 mx-auto max-w-7xl px-4 pt-32 pb-12 sm:px-6 lg:px-8">
        
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Collection</span>
            </h1>
            <p className="text-slate-400">
              Showing {displayedProducts.length} {category ? `results for "${category.replace('-', ' ')}"` : 'premium products'}.
            </p>
          </div>

          {/* --- DROP DOWN FILTER BUTTON --- */}
          <div className="flex items-center gap-3 relative group">
            <div className="flex items-center gap-2 rounded-xl bg-white/5 px-5 py-3 border border-white/10 text-slate-300 backdrop-blur-md cursor-pointer hover:border-orange-500/50 transition-colors">
              <Filter size={18} className="text-slate-400 group-hover:text-orange-400" />
              <span className="text-sm font-bold capitalize">
                {category ? category.replace('-', ' ') : "Filter by Category"}
              </span>
            </div>
            
            {/* Dropdown Menu List (Appears on Hover) */}
            <div className="absolute top-full right-0 mt-2 w-64 bg-slate-900 border border-white/10 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 max-h-96 overflow-y-auto overflow-x-hidden">
              <Link 
                href="/products" 
                className="block px-5 py-3 text-sm font-bold text-white bg-slate-800/50 hover:bg-orange-500/20 hover:text-orange-400 border-b border-white/10"
              >
                Show All Products
              </Link>
              {categories.map(cat => (
                <Link 
                  key={cat.slug} 
                  href={`/products?category=${cat.slug}`} 
                  className="block px-5 py-2.5 text-sm text-slate-300 hover:bg-white/5 hover:text-orange-400 capitalize transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* --- PRODUCT GRID --- */}
        {displayedProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
           <div className="text-center py-20 border border-white/10 rounded-2xl bg-white/5">
             <h2 className="text-xl font-bold text-white mb-2">No products found</h2>
             <p className="text-slate-500">We couldn't find any products in this category.</p>
           </div>
        )}
      </main>
    </div>
  );
}