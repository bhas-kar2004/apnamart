"use client";

import { useRouter } from "next/navigation";

export default function ProductCard({ product }) {
  const router = useRouter();

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5">
      
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
        <img 
          src={product.image} 
          alt={product.title} 
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold text-white">
          {product.title}
        </h3>

        <div className="mt-auto flex items-center justify-between pt-4">
          <p className="text-xl font-bold text-white">
            ${product.price}
          </p>

          <button
            onClick={() => router.push(`/products/${product.id}`)}
            className="rounded-xl bg-blue-600 px-4 py-2 text-white cursor-pointer"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
