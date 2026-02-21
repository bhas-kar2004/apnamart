"use client";
import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export default function CountdownTimer() {
  // Set initial time (5 hours, 42 mins, 18 secs = 20538 seconds)
  const [timeLeft, setTimeLeft] = useState(20538);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    
    // Cleanup the timer when component unmounts
    return () => clearInterval(timer);
  }, []);

  // Calculate hours, minutes, and seconds
  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  // Format with leading zeros (e.g., "05" instead of "5")
  const h = String(hours).padStart(2, '0');
  const m = String(minutes).padStart(2, '0');
  const s = String(seconds).padStart(2, '0');

  // Prevent hydration mismatch errors on first load
  if (!mounted) {
    return (
      <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-md w-max opacity-50">
        <Clock className="text-orange-400" size={24} />
        <div className="h-8 w-32 bg-white/10 animate-pulse rounded"></div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-md w-max">
      <Clock className="text-orange-400" size={24} />
      <div className="flex gap-2 text-2xl font-bold tracking-wider">
        <div className="flex flex-col items-center">
          <span className="text-white">{h}</span>
          <span className="text-[10px] text-slate-500 uppercase tracking-widest">Hours</span>
        </div>
        <span className="text-slate-500 animate-pulse">:</span>
        <div className="flex flex-col items-center">
          <span className="text-white">{m}</span>
          <span className="text-[10px] text-slate-500 uppercase tracking-widest">Mins</span>
        </div>
        <span className="text-slate-500 animate-pulse">:</span>
        <div className="flex flex-col items-center">
          <span className="text-red-400">{s}</span>
          <span className="text-[10px] text-slate-500 uppercase tracking-widest">Secs</span>
        </div>
      </div>
    </div>
  );
}