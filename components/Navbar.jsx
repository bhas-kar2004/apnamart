"use client";
import React, { useState } from 'react';
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react'; 
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // List of links to keep the code clean and map through them
  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Products', href: '#' },
    { name: 'Categories', href: '#' },
    { name: 'Deals', href: '#' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/60 backdrop-blur-md border-b border-white/10">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-orange-400 to-red-500 font-bold text-white shadow-lg shadow-orange-500/20">
            A
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            Apna<span className="text-orange-400">Mart</span>
          </span>
        </div>

        {/* Desktop Navigation (Hidden on Mobile) */}
        <div className="hidden md:flex md:items-center md:gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className={`text-sm font-medium transition-colors hover:text-orange-400 ${link.name === 'Products' ? 'text-white' : 'text-slate-300'}`}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Icons & Mobile Menu Toggle */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button className="rounded-full p-2 text-slate-300 transition-colors hover:bg-white/10 hover:text-white hidden sm:block">
            <Search className="h-5 w-5" />
          </button>
          
          <button className="relative rounded-full p-2 text-slate-300 transition-colors hover:bg-white/10 hover:text-white">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white">
              2
            </span>
          </button>
          
          <button className="rounded-full p-2 text-slate-300 transition-colors hover:bg-white/10 hover:text-white hidden sm:block">
            <User className="h-5 w-5" />
          </button>

          {/* Hamburger Menu Icon (Mobile Only) */}
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
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-lg font-medium text-slate-300 transition-colors hover:text-orange-400"
                  onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
                >
                  {link.name}
                </a>
              ))}
              
              {/* Mobile-only Search and Profile buttons to replace the hidden top ones */}
              <div className="flex items-center gap-4 pt-4 mt-2 border-t border-white/10 sm:hidden">
                <button className="flex items-center gap-2 text-slate-300 hover:text-orange-400 transition-colors">
                  <Search className="h-5 w-5" /> <span className="text-sm font-medium">Search</span>
                </button>
                <button className="flex items-center gap-2 text-slate-300 hover:text-orange-400 transition-colors ml-auto">
                  <User className="h-5 w-5" /> <span className="text-sm font-medium">Profile</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}