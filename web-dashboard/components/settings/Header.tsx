'use client';

import { useState, useEffect } from 'react';
import { Bell } from "lucide-react";

interface HeaderProps {
  isMobile?: boolean;
}

export function Header({ isMobile }: HeaderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/80 border-b border-slate-200 px-4 md:px-8 py-3 md:py-4">
      <div className="flex items-center justify-between">
        {/* left side with spacer for mobile menu */}
        <div className="flex items-center gap-4 md:gap-0">
          {/* spacer for mobile menu button (only on mobile) */}
          <div className="w-8 md:hidden"></div>
          
          {/* centered on mobile, left-aligned on desktop */}
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 text-center md:text-left flex-1 md:flex-none">
            Settings
          </h2>
        </div>
        
        <div className="flex items-center gap-3 md:gap-4">
          {/* bell notification */}
          <button className="relative p-1.5 md:p-2 hover:bg-slate-100 rounded-xl transition-colors">
            <Bell size={isMobile ? 18 : 20} className="text-slate-600" />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 md:w-2 md:h-2 bg-emerald-500 rounded-full"></span>
          </button>

          {/* admin avatar */}
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-semibold text-sm md:text-base shadow-md">
              A
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}