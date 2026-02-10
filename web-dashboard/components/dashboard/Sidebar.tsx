"use client";

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  activeItem: string;
  onNavigate: (item: string) => void;
}

export function Sidebar({ activeItem, onNavigate }: SidebarProps) {
  const pathname = usePathname();
  
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', href: '/dashboard', icon: '📊' },
    { id: 'inventory', label: 'Inventory', href: '/dashboard/inventory', icon: '📦' },
    { id: 'profile', label: 'Profile', href: '/dashboard/profile', icon: '👤' },
    { id: 'reports', label: 'Reports', href: '#', icon: '📈' },
    { id: 'settings', label: 'Settings', href: '#', icon: '⚙️' },
  ];

  return (
    <div className="bg-[#1a3c2e] h-screen w-60 fixed left-0 top-0 flex flex-col">
      <div className="p-5">
        <h1 className="text-[#ffffff] text-lg font-bold">💊 PharmaFind</h1>
      </div>
      
      <nav className="flex flex-col gap-2 px-5 pt-5">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => onNavigate(item.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-white font-bold transition-colors ${
                isActive
                  ? 'bg-[#4caf50]'
                  : 'bg-[rgba(76,175,80,0.5)] hover:bg-[rgba(76,175,80,0.7)]'
              }`}
            >
              {item.id === 'dashboard' && (
                <Image
                  src="/images/icons/dashboard-icon.png"
                  alt="Dashboard"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              )}
              {item.id === 'inventory' && (
                <Image
                  src="/images/icons/inventory-icon.png"
                  alt="Inventory"
                  width={24}
                  height={24}
                  className="w-6 h-6 rotate-180 scale-y-[-1]"
                />
              )}
              <span>{item.label}</span>
              {item.id !== 'dashboard' && item.id !== 'inventory' && (
                <span className="ml-auto">{item.icon}</span>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}