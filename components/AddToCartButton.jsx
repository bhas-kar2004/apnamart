"use client";
import React, { useState } from 'react';
import { ShoppingCart, Zap, Check } from 'lucide-react';
import { useCart } from '@/hooks/useCart'; // <-- Updated to point to the new hook

export default function AddToCartButton({ product }) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);
    // Reset the button back to normal after 2 seconds
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-auto">
      <button 
        onClick={handleAddToCart}
        disabled={isAdded}
        className={`flex-1 flex items-center justify-center gap-2 rounded-xl border px-8 py-4 text-lg font-semibold text-white backdrop-blur-md transition-all ${
          isAdded 
            ? 'bg-green-500/20 border-green-500/50 text-green-400' 
            : 'border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30'
        }`}
      >
        {isAdded ? <><Check size={20} /> Added!</> : <><ShoppingCart size={20} /> Add to Cart</>}
      </button>
      
      <button className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-orange-500/25 transition-all hover:scale-[1.02] hover:shadow-orange-500/40">
        <Zap size={20} className="fill-white" /> Buy Now
      </button>
    </div>
  );
}