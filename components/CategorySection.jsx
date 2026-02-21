"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, MonitorPlay, Shirt, Gem, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CategorySection() {
  return (
    <motion.div 
      id="categories"
      initial={{ opacity: 0, y: 50 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true, margin: "-100px" }} 
      transition={{ duration: 0.8 }}
      className="w-full max-w-6xl mx-auto mt-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
            Shop by Category
          </h2>
          <p className="text-slate-400 text-sm mt-1">Curated collections for your lifestyle</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
        
        {/* Electronics */}
        <Link href="/category/electronics" className="md:col-span-2 md:row-span-2 block">
          <motion.div 
            whileHover={{ scale: 0.98 }} 
            className="relative flex flex-col items-start justify-end p-8 rounded-3xl overflow-hidden group cursor-pointer h-[350px] md:h-auto min-h-[400px]"
          >
            <div className="absolute inset-0 bg-slate-900">
              <img 
                src="https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=800&auto=format&fit=crop" 
                alt="Electronics" 
                className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-40" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent" />
            </div>
            <div className="relative z-10 w-full">
              <div className="mb-4 inline-flex items-center gap-2 rounded-xl bg-white/10 p-3 backdrop-blur-md border border-white/20">
                <Smartphone className="text-orange-400" size={28} />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">Electronics</h3>
              <p className="text-slate-300 mb-6">Latest tech from top brands.</p>
              <div className="flex items-center gap-2 text-sm font-bold text-orange-400 group-hover:text-orange-300 transition-colors">
                Explore <ArrowRight size={16} />
              </div>
            </div>
          </motion.div>
        </Link>

        {/* Men's Clothing */}
        <Link href="/category/men's clothing" className="md:col-span-2 block">
          <motion.div 
            whileHover={{ scale: 0.98 }} 
            className="relative flex flex-col items-start justify-end p-6 rounded-3xl overflow-hidden group cursor-pointer h-[200px] md:h-[250px]"
          >
            <div className="absolute inset-0 bg-slate-900">
              <img 
                src="https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=800&auto=format&fit=crop" 
                alt="Men's Clothing" 
                className="w-full h-full object-cover opacity-50 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-30" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/30 to-transparent" />
            </div>
            <div className="relative z-10 flex items-end justify-between w-full">
              <div>
                <div className="mb-3 inline-flex items-center justify-center rounded-xl bg-white/10 p-2.5 backdrop-blur-md border border-white/20">
                  <Shirt className="text-blue-400" size={24} />
                </div>
                <h3 className="text-xl font-bold text-white">Men's Fashion</h3>
              </div>
            </div>
          </motion.div>
        </Link>

        {/* Women's Clothing */}
        <Link href="/category/women's clothing" className="block">
          <motion.div 
            whileHover={{ scale: 0.95 }} 
            className="relative flex flex-col items-start justify-end p-6 rounded-3xl overflow-hidden group cursor-pointer h-[150px] md:h-[200px] border border-white/10 bg-white/5 backdrop-blur-md"
          >
             <div className="absolute top-4 right-4 text-white/20 group-hover:text-orange-400/50 transition-colors">
               <Shirt size={50} strokeWidth={1} />
             </div>
             <h3 className="text-lg font-bold text-white relative z-10">Women's Fashion</h3>
             <p className="text-xs text-orange-400 font-semibold mt-1">Min 50% Off</p>
          </motion.div>
        </Link>

        {/* Jewelery */}
        <Link href="/category/jewelery" className="block">
          <motion.div 
            whileHover={{ scale: 0.95 }} 
            className="relative flex flex-col items-start justify-end p-6 rounded-3xl overflow-hidden group cursor-pointer h-[150px] md:h-[200px] border border-white/10 bg-white/5 backdrop-blur-md"
          >
             <div className="absolute top-4 right-4 text-white/20 group-hover:text-blue-400/50 transition-colors">
               <Gem size={50} strokeWidth={1} />
             </div>
             <h3 className="text-lg font-bold text-white relative z-10">Jewelery</h3>
             <p className="text-xs text-blue-400 font-semibold mt-1">Exclusive Designs</p>
          </motion.div>
        </Link>

      </div>
    </motion.div>
  );
}