// a expand and collaps
"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MenuItem {
  id: string;
  label: string;
  href: string;
  icon: string;
}

interface CollapsibleSidebarProps {
  menuItems?: MenuItem[];
}

export default function CollapsibleSidebar({ 
  menuItems = [
    { id: 'dashboard', label: 'Dashboard', href: '/dashboard', icon: '📊' },
    { id: 'inventory', label: 'Inventory', href: '/dashboard/inventory', icon: '📦' },
    { id: 'profile', label: 'Profile', href: '/dashboard/profile', icon: '👤' },
    { id: 'reports', label: 'Reports', href: '#', icon: '📈' },
    { id: 'settings', label: 'Settings', href: '#', icon: '⚙️' },
  ]
}: CollapsibleSidebarProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement>(null);

  // load sidebar state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState !== null) {
      setIsSidebarCollapsed(savedState === 'true');
    }
  }, []);

  // save sidebar state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', isSidebarCollapsed.toString());
  }, [isSidebarCollapsed]);

  // handleing hover on the entire sidebar
  const handleSidebarMouseEnter = () => {
    setIsHovered(true);
    if (isSidebarCollapsed) {
      // if collapsed, expand it when hovered
      setIsSidebarCollapsed(false);
    }
  };

  const handleSidebarMouseLeave = () => {
    setIsHovered(false);
    // don't automatically collapse on mouse leave only collapse when clicking the logo
  };

  // toggle sidebar when clicking the logo
  const handleLogoClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // If sidebar is expanded, clicking anywhere on it will collapse it
  const handleSidebarClick = () => {
    if (!isSidebarCollapsed) {
      setIsSidebarCollapsed(true);
    }
  };

  return (
    <div 
      ref={sidebarRef}
      className={`bg-[#1a3c2e] ${
        isSidebarCollapsed ? 'w-[70px]' : 'w-[240px]'
      } p-5 transition-all duration-300 ease-in-out h-screen fixed left-0 top-0 z-10 cursor-pointer`}
      onMouseEnter={handleSidebarMouseEnter}
      onMouseLeave={handleSidebarMouseLeave}
      onClick={handleSidebarClick}
    >
      {/* click on logo to toggle sidebar */}
      <div 
        className="flex items-center mb-8"
        onClick={handleLogoClick}
      >
        <span className="text-[#ffffff] text-2xl mr-2">💊</span>
        {!isSidebarCollapsed && (
          <h1 className="text-[#ffffff] text-lg font-bold">
            PharmaFind
          </h1>
        )}
      </div>
      
      {/* menu Items with gap */}
      <div className="space-y-3">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          
          return (
            <div key={item.id}>
              {item.href === '#' ? (
                <div className={`
                  flex items-center justify-center h-[48px] rounded-[8px] 
                  transition-all duration-200 ${isActive ? 'bg-[#4caf50]' : 'hover:bg-[rgba(76,175,80,0.7)]'}
                `}>
                  <div className="flex items-center justify-center w-full">
                    <span className="text-white text-xl">{item.icon}</span>
                    {!isSidebarCollapsed && (
                      <span className="text-white text-base font-bold ml-3">
                        {item.label}
                      </span>
                    )}
                  </div>
                </div>
              ) : (
                <Link href={item.href} className="block">
                  <div className={`
                    flex items-center justify-center h-[48px] rounded-[8px] 
                    transition-all duration-200 ${isActive ? 'bg-[#4caf50]' : 'hover:bg-[rgba(76,175,80,0.7)]'}
                  `}>
                    <div className="flex items-center justify-center w-full">
                      <span className="text-white text-xl">{item.icon}</span>
                      {!isSidebarCollapsed && (
                        <span className="text-white text-base font-bold ml-3">
                          {item.label}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}