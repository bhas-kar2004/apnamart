"use client"
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ShoppingBag, Zap, ShieldCheck, ArrowRight, ChevronLeft, ChevronRight, Star, Heart } from 'lucide-react';
import { Smartphone, MonitorPlay, Sofa, Watch, Mail, Facebook, Twitter, Instagram, Percent } from 'lucide-react';
// --- Carousel Data ---
const carouselBanners = [
  {
    id: 1,
    title: "The Big Festive Sale",
    subtitle: "Up to 80% Off on Electronics",
    image: "https://gntme.com/wp-content/uploads/2024/11/Banner-1.jpg",
  },
  {
    id: 2,
    title: "Premium Fashion",
    subtitle: "New Styles Added Daily",
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Exclusive Footwear",
    subtitle: "Step into the Festive Season",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop",
  }
];

// --- FakeStore API Dummy Data ---
const trendingProducts = [
  {
    id: 4,
    title: "Mens Casual Slim Fit",
    price: 15.99,
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_t.png",
    rating: { rate: 2.1, count: 430 },
    discount: "Min. 50% Off"
  },
  {
    id: 5,
    title: "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
    price: 695,
    category: "jewelery",
    image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_t.png",
    rating: { rate: 4.6, count: 400 },
    discount: "Premium Choice"
  },
  {
    id: 7,
    title: "White Gold Plated Princess",
    price: 9.99,
    category: "jewelery",
    image: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_t.png",
    rating: { rate: 3.0, count: 400 },
    discount: "Trending"
  },
  {
    id: 9,
    title: "WD 2TB Elements Portable External Hard Drive - USB 3.0",
    price: 64,
    category: "electronics",
    image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_t.png",
    rating: { rate: 3.3, count: 203 },
    discount: "Best Seller"
  },
  {
    id: 11,
    title: "Silicon Power 256GB SSD 3D NAND A55 SATA III 2.5",
    price: 109,
    category: "electronics",
    image: "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_t.png",
    rating: { rate: 4.8, count: 319 },
    discount: "Hot Deal"
  },
  {
    id: 6,
    title: "Solid Gold Petite Micropave",
    price: 168,
    category: "jewelery",
    image: "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_t.png",
    rating: { rate: 3.9, count: 70 },
    discount: "Min. 25% Off"
  }
];


export default function LandingPage() {
  // --- Carousel State & Logic ---
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex === carouselBanners.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? carouselBanners.length - 1 : prevIndex - 1));
  };

  // Horizontal Scroll Function for Products
  const scrollProducts = (dir) => {
    if (scrollRef.current) {
      const scrollAmount = dir === 'left' ? -400 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // --- Animations ---
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const slideVariants = {
    enter: (direction) => ({ x: direction > 0 ? 1000 : -1000, opacity: 0 }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: (direction) => ({ zIndex: 0, x: direction < 0 ? 1000 : -1000, opacity: 0 })
  };

  const features = [
    { icon: <Zap size={32} />, title: "Lightning Delivery", desc: "Get your products delivered across India in record time." },
    { icon: <ShieldCheck size={32} />, title: "100% Secure", desc: "Premium quality guaranteed with secure, encrypted payments." },
    { icon: <ShoppingBag size={32} />, title: "Exclusive Deals", desc: "Daily festive offers and unbeatable prices on top brands." }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white font-sans">
      
      {/* --- Abstract Glowing Background Elements --- */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -left-[10%] h-[600px] w-[600px] rounded-full bg-blue-600/20 blur-[120px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[40%] -right-[10%] h-[500px] w-[500px] rounded-full bg-orange-500/20 blur-[120px]" 
        />
      </div>

      <main className="relative z-10 flex flex-col items-center justify-center pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        
        {/* --- Hero Intro --- */}
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="text-center max-w-4xl mx-auto mb-12">
          <motion.div variants={itemVariants} className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-sm font-medium text-orange-400 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            Festive Season Sale is Live
          </motion.div>
          <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Experience the <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Premium</span> Standard
          </motion.h1>
        </motion.div>

        {/* --- MAIN HERO CAROUSEL --- */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, duration: 0.8 }}
          className="relative w-full max-w-6xl h-[300px] md:h-[450px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-orange-500/10 group bg-slate-900"
        >
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex} custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit"
              transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
              className="absolute inset-0 w-full h-full"
            >
              <img src={carouselBanners[currentIndex].image} alt="Banner" className="w-full h-full object-cover opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/50 to-transparent flex items-center">
                <div className="pl-10 md:pl-20 max-w-2xl">
                  <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 shadow-black drop-shadow-lg">{carouselBanners[currentIndex].title}</h2>
                  <p className="text-lg md:text-xl text-orange-400 font-semibold mb-8 shadow-black drop-shadow-md">{carouselBanners[currentIndex].subtitle}</p>
                  <button className="flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-red-600 px-6 py-3 text-sm md:text-base font-semibold text-white shadow-lg transition-transform hover:scale-105">
                    Shop Now <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white/20 z-10"><ChevronLeft size={28} /></button>
          <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white/20 z-10"><ChevronRight size={28} /></button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {carouselBanners.map((_, index) => (
              <button key={index} onClick={() => { setDirection(index > currentIndex ? 1 : -1); setCurrentIndex(index); }} className={`h-2.5 rounded-full transition-all duration-300 ${index === currentIndex ? "w-8 bg-orange-500" : "w-2.5 bg-white/50 hover:bg-white"}`} />
            ))}
          </div>
        </motion.div>

        {/* --- TRENDING NOW / BEST SELLERS SECTION (FLIPKART STYLE) --- */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.8 }}
          className="w-full max-w-6xl mx-auto mt-16"
        >
          {/* Section Header */}
          <div className="flex items-center justify-between mb-6 px-2">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
                Trending Now <Zap className="text-orange-400 fill-orange-400" size={24} />
              </h2>
              <p className="text-slate-400 text-sm mt-1">Based on what customers are buying</p>
            </div>
            <button className="flex items-center gap-1 rounded-full bg-blue-600/20 text-blue-400 px-4 py-2 text-sm font-semibold hover:bg-blue-600/30 transition-colors">
              View All <ChevronRight size={16} />
            </button>
          </div>

          {/* Horizontal Scroll Container */}
          <div className="relative group/slider">
            {/* Scroll Buttons (Visible on hover) */}
            <button onClick={() => scrollProducts('left')} className="absolute -left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-800/80 backdrop-blur-md border border-white/10 text-white opacity-0 group-hover/slider:opacity-100 transition-opacity z-20 shadow-xl hidden md:block hover:bg-slate-700">
              <ChevronLeft size={24} />
            </button>
            <button onClick={() => scrollProducts('right')} className="absolute -right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-800/80 backdrop-blur-md border border-white/10 text-white opacity-0 group-hover/slider:opacity-100 transition-opacity z-20 shadow-xl hidden md:block hover:bg-slate-700">
              <ChevronRight size={24} />
            </button>

            {/* Product Track */}
            <div 
              ref={scrollRef}
              className="flex overflow-x-auto gap-4 md:gap-6 pb-6 pt-2 px-2 scrollbar-hide snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {trendingProducts.map((product) => (
                <motion.div 
                  key={product.id}
                  whileHover={{ y: -8 }}
                  className="min-w-[240px] md:min-w-[280px] snap-start flex flex-col rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden relative group cursor-pointer"
                >
                  {/* Heart / Wishlist icon */}
                  <button className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-slate-900/40 backdrop-blur-sm text-slate-300 hover:text-red-500 hover:bg-white/90 transition-all">
                    <Heart size={18} />
                  </button>

                  {/* Product Image Area (White background to match FakeStore API images) */}
                  <div className="h-[200px] w-full bg-white flex items-center justify-center p-6 relative overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.title} 
                      className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Flipkart style discount tag */}
                    <div className="absolute bottom-0 left-0 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-tr-lg">
                      {product.discount}
                    </div>
                  </div>

                  {/* Product Details Area */}
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="text-white font-medium text-sm line-clamp-2 mb-1 group-hover:text-orange-400 transition-colors">
                      {product.title}
                    </h3>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-2">
                      <div className="flex items-center gap-1 bg-green-600/20 text-green-400 px-1.5 py-0.5 rounded text-xs font-bold">
                        {product.rating.rate} <Star size={10} className="fill-green-400" />
                      </div>
                      <span className="text-slate-500 text-xs">({product.rating.count})</span>
                    </div>

                    <div className="mt-auto flex items-end justify-between">
                      <div>
                        <span className="text-xl font-bold text-white">${product.price}</span>
                        <span className="text-xs text-slate-500 line-through ml-2">${(product.price * 1.4).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* --- SHOP BY CATEGORY (BENTO GRID) --- */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }}
          className="w-full max-w-6xl mx-auto mt-24"
        >
          <div className="mb-8 flex items-end justify-between px-2">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
                Shop by Category
              </h2>
              <p className="text-slate-400 text-sm mt-1">Curated collections for your lifestyle</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 px-2">
            {/* Large Featured Category */}
            <motion.div whileHover={{ scale: 0.98 }} className="md:col-span-2 md:row-span-2 relative flex flex-col items-start justify-end p-8 rounded-3xl overflow-hidden group cursor-pointer h-[300px] md:h-auto min-h-[400px]">
              <div className="absolute inset-0 bg-slate-900">
                <img src="https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=800&auto=format&fit=crop" alt="Mobiles" className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-40" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />
              </div>
              <div className="relative z-10 w-full">
                <div className="mb-4 inline-flex items-center gap-2 rounded-xl bg-white/10 p-3 backdrop-blur-md border border-white/20">
                  <Smartphone className="text-orange-400" size={28} />
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">Smartphones</h3>
                <p className="text-slate-300 mb-6">Latest models from top brands.</p>
                <button className="flex items-center gap-2 text-sm font-bold text-orange-400 hover:text-orange-300 transition-colors">
                  Explore <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>

            {/* Top Right Box */}
            <motion.div whileHover={{ scale: 0.98 }} className="md:col-span-2 relative flex flex-col items-start justify-end p-6 rounded-3xl overflow-hidden group cursor-pointer h-[250px]">
              <div className="absolute inset-0 bg-slate-900">
                <img src="https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=800&auto=format&fit=crop" alt="Electronics" className="w-full h-full object-cover opacity-50 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-30" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/20 to-transparent" />
              </div>
              <div className="relative z-10 flex items-end justify-between w-full">
                <div>
                  <div className="mb-3 inline-flex items-center justify-center rounded-xl bg-white/10 p-2.5 backdrop-blur-md border border-white/20">
                    <MonitorPlay className="text-blue-400" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white">Laptops & PCs</h3>
                </div>
              </div>
            </motion.div>

            {/* Bottom Right Split 1 */}
            <motion.div whileHover={{ scale: 0.95 }} className="relative flex flex-col items-start justify-end p-6 rounded-3xl overflow-hidden group cursor-pointer h-[200px] border border-white/10 bg-white/5 backdrop-blur-md">
               <div className="absolute top-4 right-4 text-white/20 group-hover:text-orange-400/50 transition-colors">
                 <Sofa size={60} strokeWidth={1} />
               </div>
               <h3 className="text-lg font-bold text-white relative z-10">Home Decor</h3>
               <p className="text-xs text-orange-400 font-semibold mt-1">Min 50% Off</p>
            </motion.div>

            {/* Bottom Right Split 2 */}
            <motion.div whileHover={{ scale: 0.95 }} className="relative flex flex-col items-start justify-end p-6 rounded-3xl overflow-hidden group cursor-pointer h-[200px] border border-white/10 bg-white/5 backdrop-blur-md">
               <div className="absolute top-4 right-4 text-white/20 group-hover:text-blue-400/50 transition-colors">
                 <Watch size={60} strokeWidth={1} />
               </div>
               <h3 className="text-lg font-bold text-white relative z-10">Accessories</h3>
               <p className="text-xs text-blue-400 font-semibold mt-1">Starting $19</p>
            </motion.div>
          </div>
        </motion.div>
        {/* --- PROMOTIONAL BANNER --- */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}
          className="w-full max-w-6xl mx-auto mt-24 px-2"
        >
          <div className="relative w-full rounded-3xl border border-orange-500/30 bg-gradient-to-r from-orange-500/10 to-red-600/10 p-8 md:p-12 overflow-hidden backdrop-blur-lg flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Glowing orb behind the banner text */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[300px] h-[300px] bg-orange-500/30 rounded-full blur-[80px] pointer-events-none" />
            
            <div className="relative z-10 flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-sm font-bold mb-4 border border-orange-500/20">
                <Percent size={14} /> Bank Offer
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
                Extra 15% Off
              </h2>
              <p className="text-slate-300 text-lg max-w-md">
                Use your Premium Credit Card at checkout to unlock exclusive instant discounts on all categories.
              </p>
            </div>
            
            <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4">
              <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-slate-900 font-bold text-lg hover:bg-slate-200 transition-colors shadow-xl shadow-white/10">
                Claim Offer
              </button>
              <p className="text-xs text-slate-400 md:absolute md:-bottom-6 md:right-0">*T&C Apply. Valid till midnight.</p>
            </div>
          </div>
        </motion.div>
        
      </main>
      {/* --- PREMIUM FOOTER --- */}
      <footer className="relative z-10 mt-32 border-t border-white/10 bg-slate-900/50 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand Info */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-orange-400 to-red-500 font-bold text-white">
                  A
                </div>
                <span className="text-2xl font-bold tracking-tight text-white">
                  Apna<span className="text-orange-400">Mart</span>
                </span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Your one-stop destination for premium products, lightning-fast delivery, and unbeatable prices.
              </p>
              <div className="flex items-center gap-4">
                <button className="h-10 w-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-colors"><Facebook size={18} /></button>
                <button className="h-10 w-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-colors"><Twitter size={18} /></button>
                <button className="h-10 w-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-colors"><Instagram size={18} /></button>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-bold mb-6">Quick Links</h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li><a href="#" className="hover:text-orange-400 transition-colors">Track Order</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Return Policy</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Customer Support</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">FAQs</a></li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-white font-bold mb-6">Top Categories</h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li><a href="#" className="hover:text-orange-400 transition-colors">Electronics & Gadgets</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Men's Fashion</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Home & Furniture</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Beauty & Grooming</a></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-white font-bold mb-6">Stay in the loop</h4>
              <p className="text-sm text-slate-400 mb-4">Get special offers, free giveaways, and once-in-a-lifetime deals.</p>
              <div className="flex items-center rounded-full bg-white/5 border border-white/10 p-1">
                <div className="pl-3 text-slate-400"><Mail size={18} /></div>
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full bg-transparent px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none"
                />
                <button className="rounded-full bg-orange-500 px-4 py-2 text-sm font-bold text-white hover:bg-orange-600 transition-colors">
                  Join
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 text-sm text-slate-500">
            <p>© 2026 Apna Mart. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-slate-300">Privacy Policy</a>
              <a href="#" className="hover:text-slate-300">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}