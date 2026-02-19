'use client';

import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export function GlassCard({ children, className = "" }: GlassCardProps) {
  return (
    <div
      className={`bg-white/90 backdrop-blur-[10px] border border-slate-100 rounded-[24px] p-6 shadow-sm hover:shadow-md transition-shadow ${className}`}
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.9)",
      }}
    >
      {children}
    </div>
  );
}