import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import CountdownTimer from "@/components/CountdownTimer"; // <--- IMPORT THE NEW TIMER
import { getProducts } from "@/lib/api";
import { Zap, Tag, Percent, ArrowRight } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function DealsPage() {
  const allProducts = await getProducts();
  const flashSaleProducts = allProducts.slice(4, 12); 
  const dealOfTheDay = allProducts[3]; 

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans pb-20 overflow-hidden">
      
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-red-600/10 blur-[120px]" />
        <div className="absolute top-[40%] right-[-10%] h-[400px] w-[400px] rounded-full bg-orange-500/10 blur-[120px]" />
      </div>

      <Navbar />

      <main className="relative z-10 mx-auto max-w-7xl px-4 pt-32 sm:px-6 lg:px-8">
        
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-sm font-bold mb-4 border border-red-500/20 animate-pulse">
              <Zap size={14} className="fill-red-400" /> Live Now
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-4">
              Flash <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">Deals</span>
            </h1>
            <p className="text-slate-400 max-w-xl">
              Unbeatable prices on premium products. Offers end when the timer runs out or stock is depleted.
            </p>
          </div>

          {/* --- THE LIVE TIMER IS NOW HERE --- */}
          <CountdownTimer />
        </div>

        <div className="mb-16 relative w-full rounded-3xl border border-orange-500/30 bg-gradient-to-br from-slate-900 to-slate-950 p-8 md:p-12 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 group cursor-pointer">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500 via-transparent to-transparent" />
          
          <div className="relative z-10 flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold mb-6 border border-orange-500/20 uppercase tracking-wider">
              <Tag size={12} /> Deal of the Day
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 line-clamp-2">
              {dealOfTheDay.title}
            </h2>
            <div className="flex items-end gap-3 mb-6">
              <span className="text-5xl font-extrabold text-white">${(dealOfTheDay.price * 0.5).toFixed(2)}</span>
              <span className="text-xl text-slate-500 line-through mb-1">${dealOfTheDay.price}</span>
              <span className="text-green-400 font-bold mb-2 text-sm px-2 py-1 bg-green-500/20 rounded-md">50% OFF</span>
            </div>
            <Link href={`/products/${dealOfTheDay.id}`}>
              <button className="flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-sm font-bold text-slate-900 transition-all hover:bg-slate-200 shadow-xl shadow-white/10">
                Claim Offer <ArrowRight size={16} />
              </button>
            </Link>
          </div>

          <div className="relative z-10 w-full md:w-1/3 h-64 bg-white rounded-2xl p-6 flex items-center justify-center transform transition-transform duration-500 group-hover:scale-105 shadow-2xl">
            <div className="absolute -top-4 -right-4 h-16 w-16 bg-red-500 rounded-full flex flex-col items-center justify-center text-white font-bold shadow-lg rotate-12 z-20">
              <span className="text-xs">SAVE</span>
              <span className="text-lg leading-none">50%</span>
            </div>
            <img src={dealOfTheDay.image} alt="Deal of the Day" className="h-full w-full object-contain" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
            <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400"><Percent size={24} /></div>
            <div>
              <h4 className="font-bold text-white">10% Instant Discount</h4>
              <p className="text-xs text-slate-400">On Premium Credit Cards</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
            <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-400"><Tag size={24} /></div>
            <div>
              <h4 className="font-bold text-white">Flat $50 Off</h4>
              <p className="text-xs text-slate-400">On orders above $500</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
            <div className="h-12 w-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400"><Zap size={24} /></div>
            <div>
              <h4 className="font-bold text-white">Buy 1 Get 1 Free</h4>
              <p className="text-xs text-slate-400">On select clothing items</p>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              Trending Offers
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {flashSaleProducts.map((product) => (
              <div key={product.id} className="relative group">
                <div className="absolute top-4 left-4 z-20 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                  HOT DEAL
                </div>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}