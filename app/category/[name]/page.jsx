import { getProductsByCategory } from "@/lib/api";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";

export default async function CategoryPage({ params }) {
  // Await params and decode the URL (e.g., changes "men's%20clothing" back to "men's clothing")
  const { name } = await params;
  const decodedCategory = decodeURIComponent(name);
  
  // Fetch the products for this specific category
  const products = await getProductsByCategory(decodedCategory);

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      <main className="relative z-10 mx-auto max-w-7xl px-4 pt-32 pb-12 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white capitalize mb-12">
          {decodedCategory}
        </h1>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}