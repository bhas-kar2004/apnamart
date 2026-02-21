"use client";
import React, { useEffect, useState } from 'react';
import Navbar from "@/components/Navbar";
import { useCart } from '@/hooks/useCart';
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus } from 'lucide-react';
import Link from 'next/link';

export default function CartPage() {
  const { cartItems, addToCart, decreaseQuantity, removeFromCart } = useCart();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration errors by ensuring component is mounted before rendering cart details
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08; 
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans pb-20">
      <Navbar />

      <main className="relative z-10 mx-auto max-w-7xl px-4 pt-32 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-md">
            <div className="h-24 w-24 bg-white/5 rounded-full flex items-center justify-center mb-6">
              <ShoppingBag size={48} className="text-slate-500" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Your cart is empty</h2>
            <p className="text-slate-400 mb-8 text-center max-w-md">Looks like you haven't added anything to your cart yet. Explore our top categories and find something you love!</p>
            <Link href="/products">
              <button className="bg-gradient-to-r from-orange-500 to-red-600 hover:opacity-90 shadow-lg shadow-orange-500/20 text-white font-bold py-3 px-8 rounded-xl transition-all">
                Start Shopping
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* --- CART ITEMS LIST --- */}
            <div className="flex-1 flex flex-col gap-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 bg-white/5 border border-white/10 p-4 md:p-6 rounded-2xl backdrop-blur-md relative group transition-all hover:bg-white/10">
                  
                  {/* Product Image */}
                  <div className="h-24 w-24 md:h-32 md:w-32 bg-white rounded-xl p-2 md:p-4 flex-shrink-0">
                    <img src={item.image} alt={item.title} className="h-full w-full object-contain" />
                  </div>
                  
                  {/* Product Info & Controls */}
                  <div className="flex flex-col flex-1 justify-center">
                    <h3 className="text-base md:text-lg font-bold text-white line-clamp-2 md:line-clamp-1 pr-8">{item.title}</h3>
                    <p className="text-xs md:text-sm text-slate-400 capitalize mb-4">{item.category}</p>
                    
                    <div className="flex items-center justify-between mt-auto flex-wrap gap-4">
                      <span className="text-lg md:text-xl font-bold text-orange-400">₹{item.price}</span>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 bg-slate-900 border border-white/10 rounded-lg p-1">
                        <button 
                          onClick={() => decreaseQuantity(item.id)}
                          className="p-1 text-slate-400 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-6 text-center text-sm font-bold text-white">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => addToCart(item)}
                          className="p-1 text-slate-400 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Delete Button */}
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="absolute top-4 right-4 text-slate-500 hover:text-red-500 transition-colors p-2 bg-slate-900/80 rounded-full md:opacity-0 md:group-hover:opacity-100"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>

            {/* --- ORDER SUMMARY SIDEBAR --- */}
            <div className="w-full lg:w-96">
              <div className="bg-slate-900 border border-white/10 rounded-3xl p-6 md:p-8 sticky top-24">
                <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
                
                <div className="space-y-4 text-sm text-slate-300 border-b border-white/10 pb-6 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-white">₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Tax (8%)</span>
                    <span className="font-semibold text-white">₹{tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-green-400">
                    <span>Shipping</span>
                    <span>Free Standard</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-8">
                  <span className="text-lg font-bold text-white">Total</span>
                  <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                    ₹{total.toFixed(2)}
                  </span>
                </div>

                <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold py-4 rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all hover:scale-[1.02]">
                  Proceed to Checkout <ArrowRight size={18} />
                </button>
              </div>
            </div>

          </div>
        )}
      </main>
    </div>
  );
}