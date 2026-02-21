"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Github } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth'; // <-- 1. IMPORT AUTH HOOK
import Navbar from '@/components/Navbar';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const router = useRouter();
  const { login } = useAuth(); // <-- 2. GET LOGIN FUNCTION

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      login(email); // <-- 3. SAVE TO LOCAL STORAGE
      router.push('/'); // Redirect to home
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <Navbar />

      <motion.div animate={{ y: [0, -30, 0], scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-orange-600/30 blur-[120px] pointer-events-none" />
      <motion.div animate={{ y: [0, 30, 0], scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-red-600/20 blur-[120px] pointer-events-none" />

      <motion.div variants={containerVariants} initial="hidden" animate="show" className="mt-16 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        
        <motion.div variants={itemVariants} className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Welcome back</h2>
          <p className="mt-2 text-sm text-slate-400">Sign in to access your premium account</p>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-slate-900/60 backdrop-blur-xl py-8 px-4 shadow-2xl shadow-black/50 sm:rounded-3xl border border-white/10 sm:px-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />

          <form className="space-y-6" onSubmit={handleLogin}>
            <motion.div variants={itemVariants}>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Email address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-orange-400">
                  <Mail className="h-5 w-5 text-slate-500 group-focus-within:text-orange-400 transition-colors" />
                </div>
                <input id="email" name="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="block w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:bg-white/10 transition-all" placeholder="you@example.com" />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-500 group-focus-within:text-orange-400 transition-colors" />
                </div>
                <input id="password" name="password" type={showPassword ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} className="block w-full pl-11 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:bg-white/10 transition-all" placeholder="••••••••" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-orange-400 transition-colors">
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember-me" type="checkbox" className="h-4 w-4 rounded border-white/20 bg-white/5 text-orange-500 focus:ring-orange-500 focus:ring-offset-slate-900 cursor-pointer" />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-300 cursor-pointer select-none">Remember me</label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-orange-400 hover:text-orange-300 transition-colors">Forgot password?</a>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-xl shadow-lg shadow-orange-500/25 text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-red-600 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:ring-offset-slate-900">
                Sign in <ArrowRight size={18} />
              </motion.button>
            </motion.div>
          </form>

          <motion.div variants={itemVariants} className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10" /></div>
              <div className="relative flex justify-center text-sm"><span className="px-3 bg-slate-900 text-slate-500 font-medium rounded-full border border-white/10">Or continue with</span></div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <motion.button whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,0.1)" }} whileTap={{ scale: 0.97 }} className="w-full inline-flex justify-center items-center gap-2 py-2.5 px-4 border border-white/10 rounded-xl shadow-sm bg-white/5 text-sm font-medium text-slate-300 transition-all">
                <svg className="h-5 w-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                Google
              </motion.button>
              <motion.button whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,0.1)" }} whileTap={{ scale: 0.97 }} className="w-full inline-flex justify-center items-center gap-2 py-2.5 px-4 border border-white/10 rounded-xl shadow-sm bg-white/5 text-sm font-medium text-slate-300 transition-all">
                <Github className="h-5 w-5" /> GitHub
              </motion.button>
            </div>
          </motion.div>
          
        </motion.div>
        
        <motion.p variants={itemVariants} className="mt-8 text-center text-sm text-slate-400">
          Don't have an account? <Link href="/register" className="font-bold text-orange-400 hover:text-orange-300 transition-colors">Sign up for free</Link>
        </motion.p>
      </motion.div>
    </div>
  );
}