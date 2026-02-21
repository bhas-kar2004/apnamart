import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/api";
import { SearchX } from "lucide-react";
import Link from "next/link";

export default async function SearchResultsPage({ searchParams }) {
  // Wait for searchParams (required in Next.js 15)
  const resolvedParams = await searchParams;
  const query = resolvedParams.q?.toLowerCase() || "";

  // Fetch all products and filter them manually based on the query
  const allProducts = await getProducts();
  
  const searchResults = allProducts.filter((product) => 
    product.title.toLowerCase().includes(query) || 
    product.category.toLowerCase().includes(query)
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans pb-20">
      <Navbar />

      <main className="relative z-10 mx-auto max-w-7xl px-4 pt-32 sm:px-6 lg:px-8">
        
        <div className="mb-12 border-b border-white/10 pb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Search Results for <span className="text-orange-400">"{query}"</span>
          </h1>
          <p className="text-slate-400">
            Found {searchResults.length} matching {searchResults.length === 1 ? 'product' : 'products'}
          </p>
        </div>

        {searchResults.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {searchResults.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="h-24 w-24 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10">
              <SearchX size={48} className="text-slate-500" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">No exact matches found</h2>
            <p className="text-slate-400 max-w-md mb-8">
              We couldn't find any products matching "{query}". Try checking your spelling or using more general terms.
            </p>
            <Link href="/products">
              <button className="rounded-xl border border-white/20 bg-white/5 px-8 py-3 text-sm font-bold text-white hover:bg-white/10 transition-colors">
                Browse All Products
              </button>
            </Link>
          </div>
        )}

      </main>
    </div>
  );
}