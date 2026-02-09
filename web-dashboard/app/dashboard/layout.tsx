"use client";

import { useState } from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeNavItem, setActiveNavItem] = useState('dashboard');
  
  return (
    <div className="flex h-screen bg-[#f9f9f9]">
      <Sidebar activeItem={activeNavItem} onNavigate={setActiveNavItem} />
      <div className="flex-1 ml-60">
        {children}
      </div>
    </div>
  );
}