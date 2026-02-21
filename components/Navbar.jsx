"use client";

import React, { useState } from 'react';
import { ShoppingCart, User, Search, Menu, X, ArrowRight, TrendingUp, LogOut } from 'lucide-react'; // <-- ADDED LogOut
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth'; // <-- IMPORT AUTH HOOK

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const pathname = usePathname();
  const router = useRouter();
  const { cartCount } = useCart(); 
  const { user, logout, isMounted } = useAuth(); // <-- GET USER AND LOGOUT FUNCTION

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const executeSearch = (query) => {
    if (query.trim()) {
      setIsSearchOpen(false);
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    executeSearch(searchQuery);
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Categories', href: '/category' },
    { name: 'Deals', href: '/deals' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/60 backdrop-blur-md border-b border-white/10 transition-all">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 relative z-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-orange-400 to-red-500 font-bold text-white shadow-lg shadow-orange-500/20">
              A
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Apna<span className="text-orange-400">Mart</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-8">
            {navLinks.map((link) => {
              const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm transition-colors ${
                    isActive ? 'text-orange-400 font-bold' : 'text-slate-300 font-medium hover:text-orange-400'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Icons */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => { setIsSearchOpen(true); setIsMobileMenuOpen(false); }}
              className="rounded-full p-2 text-slate-300 transition-colors hover:bg-white/10 hover:text-white hidden sm:block"
            >
              <Search className="h-5 w-5" />
            </button>
            
            <Link href="/cart">
              <button className="relative rounded-full p-2 text-slate-300 transition-colors hover:bg-white/10 hover:text-white">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white shadow-md shadow-orange-500/50">
                    {cartCount}
                  </span>
                )}
              </button>
            </Link>
            
            {/* --- DESKTOP AUTH LOGIC --- */}
            {isMounted && user ? (
              <div className="hidden sm:flex items-center gap-3 ml-2">
                <span className="text-sm font-medium text-orange-400 capitalize bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
                  Hi, {user.name}
                </span>
                <button 
                  onClick={logout} 
                  title="Logout"
                  className="rounded-full p-2 text-slate-300 transition-colors hover:bg-red-500/20 hover:text-red-400"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <Link href="/login" className="rounded-full p-2 text-slate-300 transition-colors hover:bg-white/10 hover:text-white hidden sm:block">
                <User className="h-5 w-5" />
              </Link>
            )}

            <button
              onClick={toggleMenu}
              className="md:hidden rounded-full p-2 text-slate-300 transition-colors hover:bg-white/10 hover:text-white ml-2"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="absolute top-16 left-0 w-full border-b border-white/10 bg-slate-900/95 backdrop-blur-xl md:hidden z-10"
            >
              <div className="flex flex-col px-4 py-6 gap-4">
                {navLinks.map((link) => {
                  const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`text-lg transition-colors ${
                        isActive ? 'text-orange-400 font-bold' : 'text-slate-300 font-medium hover:text-orange-400'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  );
                })}
                
                <div className="flex items-center gap-4 pt-4 mt-2 border-t border-white/10 sm:hidden">
                  <button
                    onClick={() => { setIsMobileMenuOpen(false); setIsSearchOpen(true); }}
                    className="flex items-center gap-2 text-slate-300 hover:text-orange-400 transition-colors"
                  >
                    <Search className="h-5 w-5" /> <span className="text-sm font-medium">Search</span>
                  </button>

                  {/* --- MOBILE AUTH LOGIC --- */}
                  {isMounted && user ? (
                    <button 
                      onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                      className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors ml-auto"
                    >
                      <LogOut className="h-5 w-5" /> <span className="text-sm font-medium">Logout</span>
                    </button>
                  ) : (
                    <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 text-slate-300 hover:text-orange-400 transition-colors ml-auto">
                      <User className="h-5 w-5" /> <span className="text-sm font-medium">Login</span>
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Animated Search Modal (Remains the same) */}
      <AnimatePresence>
        {isSearchOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsSearchOpen(false)}
              className="fixed inset-0 z-[60] bg-slate-950/80 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -40 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-24 md:top-32 left-1/2 -translate-x-1/2 w-full max-w-2xl z-[70] px-4"
            >
              <div className="relative rounded-3xl p-[1px] bg-gradient-to-r from-orange-500/50 via-red-500/50 to-orange-500/50 shadow-2xl shadow-orange-500/20">
                <div className="bg-slate-900/95 backdrop-blur-xl rounded-[calc(1.5rem-1px)] flex flex-col overflow-hidden">
                  <form onSubmit={handleSearchSubmit} className="relative flex items-center p-2 group">
                    <Search className="absolute left-6 text-orange-400" size={26} strokeWidth={2.5} />
                    <input type="text" autoFocus placeholder="What are you looking for?" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-transparent text-xl md:text-2xl font-medium text-white pl-16 pr-20 py-5 outline-none placeholder:text-slate-500" />
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="submit" className="absolute right-4 p-3 bg-gradient-to-r from-orange-500 to-red-600 shadow-lg shadow-orange-500/25 text-white rounded-xl transition-all hover:shadow-orange-500/40">
                      <ArrowRight size={20} strokeWidth={3} />
                    </motion.button>
                  </form>
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  <div className="p-6 bg-slate-950/50">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <TrendingUp size={16} className="text-orange-400" /> Trending Searches
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {['Electronics', 'Jewelery', "Men's Clothing", "Women's Clothing"].map((term, index) => (
                        <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + (index * 0.05), duration: 0.3 }} key={term} onClick={() => executeSearch(term)} className="px-4 py-2 rounded-full bg-white/5 border border-white/5 text-sm font-medium text-slate-300 hover:text-white hover:bg-orange-500/20 hover:border-orange-500/50 hover:shadow-[0_0_15px_rgba(249,115,22,0.2)] transition-all">
                          {term}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}