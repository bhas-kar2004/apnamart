import { getProducts } from "@/lib/api";
import Navbar from "@/components/Navbar"; // Adjust path as needed

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Background Gradients for Premium Feel */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-orange-500/10 blur-[100px]" />
      </div>

      <Navbar />

      <main className="relative z-10 mx-auto max-w-7xl px-4 pt-24 pb-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Exclusive Collection</h1>
            <p className="mt-2 text-slate-400">Premium products curated just for you.</p>
          </div>
          <button className="hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white backdrop-blur-sm hover:bg-white/10 sm:block">
            Filter & Sort
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/30 hover:shadow-orange-500/10"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="h-full w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-110 group-hover:opacity-100" 
                />
                <div className="absolute top-3 right-3 rounded-full bg-black/40 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
                  {product.category}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-5">
                <h3 className="line-clamp-1 text-lg font-semibold text-white group-hover:text-orange-400">
                  {product.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-slate-400">
                  {product.description}
                </p>
                
                <div className="mt-auto flex items-center justify-between pt-4">
                  <div>
                    <p className="text-xs text-slate-400">Price</p>
                    <p className="text-xl font-bold text-white">
                      ${product.price}
                    </p>
                  </div>
                  <button className="rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition-all hover:scale-105 hover:shadow-orange-500/40">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}