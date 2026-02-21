"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Plus, Minus } from "lucide-react";
import { useCart } from "@/hooks/useCart";

export default function ProductCard({ product }) {
  const router = useRouter();
  const { cartItems, addToCart, decreaseQuantity } = useCart();
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted before checking cart state to prevent hydration errors
  useEffect(() => {
    setMounted(true);
  }, []);

  // Find if this specific product is already in the cart
  const cartItem = cartItems.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevents clicking the card background
    addToCart(product);
  };

  const handleDecrease = (e) => {
    e.stopPropagation();
    if (quantity > 0) {
      decreaseQuantity(product.id);
    }
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-sm transition-all hover:bg-white/5 hover:border-white/20">
      {/* Clickable Image Area */}
      <div
        onClick={() => router.push(`/products/${product.id}`)}
        className="relative aspect-[4/3] w-full overflow-hidden bg-white cursor-pointer"
      >
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-contain p-6 transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <div className="flex flex-1 flex-col p-3">
        {/* Clickable Title */}
        <h3
          onClick={() => router.push(`/products/${product.id}`)}
          className="text-lg font-semibold text-white line-clamp-1 cursor-pointer hover:text-orange-400 transition-colors"
          title={product.title}
        >
          {product.title}
        </h3>

        <div className="mt-auto flex items-center justify-between pt-4">
          {/* Price */}
          <p className="text-lg font-bold text-white">₹{product.price}</p>

          <div className="flex items-center gap-3">
            {/* View Details Text Button (Orange) */}
            

            {/* QUANTITY CONTROLS (Starts at 0) */}
            {mounted && (
              <div className="flex items-center gap-1 bg-slate-950 border border-white/20 rounded-xl p-1 backdrop-blur-md">
                <button
                  onClick={handleDecrease}
                  disabled={quantity === 0}
                  className={`p-1 rounded-lg transition-colors ${
                    quantity === 0
                      ? "text-slate-600 cursor-not-allowed"
                      : "text-slate-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Minus size={14} />
                </button>

                <span className="w-5 text-center text-sm font-bold text-white">
                  {quantity}
                </span>

                <button
                  onClick={handleAddToCart}
                  className="p-1 text-orange-400 hover:text-white hover:bg-orange-500/20 rounded-lg transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
            )}

            <button
              onClick={() => router.push(`/products/${product.id}`)}
              className="rounded-xl bg-blue-600  text-[11px] px-2 py-2 shadow-lg shadow-blue-500/20 text-white cursor-pointer"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
