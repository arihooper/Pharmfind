"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

interface MenuItem {
  id: string;
  label: string;
  href: string;
  icon: string;
}

interface CollapsibleSidebarProps {
  menuItems?: MenuItem[];
  onStateChange?: (isCollapsed: boolean) => void;
}

export default function CollapsibleSidebar({ 
  menuItems = [
    { id: 'dashboard', label: 'Dashboard', href: '/dashboard', icon: '📊' },
    { id: 'inventory', label: 'Inventory', href: '/dashboard/inventory', icon: '📦' },
    { id: 'profile', label: 'Profile', href: '/dashboard/profile', icon: '👤' },
    { id: 'reports', label: 'Reports', href: '#', icon: '📈' },
    { id: 'settings', label: 'Settings', href: '/dashboard/settings', icon: '⚙️' },
  ],
  onStateChange
}: CollapsibleSidebarProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // used to check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // loading sidebar state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState !== null) {
      setIsSidebarCollapsed(savedState === 'true');
    }
    setMounted(true);
  }, []);

  // save sidebar as it changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('sidebarCollapsed', isSidebarCollapsed.toString());
      if (onStateChange) {
        onStateChange(isSidebarCollapsed);
      }
    }
  }, [isSidebarCollapsed, onStateChange, mounted]);

  // hover for desktop only
  const handleSidebarMouseEnter = () => {
    if (!isMobile) {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
      }
      setIsSidebarCollapsed(false);
    }
  };

  const handleSidebarMouseLeave = () => {
    if (!isMobile) {
      hoverTimeoutRef.current = setTimeout(() => {
        setIsSidebarCollapsed(true);
      }, 300);
    }
  };

  // toggle sidebar when clicking the logo
  const handleLogoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isMobile) {
      setIsSidebarCollapsed(!isSidebarCollapsed);
    }
  };

  // link click
  const handleLinkClick = (href: string) => {
    if (href === '#') return;
    
    if (!isMobile) {
      setIsSidebarCollapsed(true);
    }
    
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  };

  // Mobile menu toggle
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobile && isMobileMenuOpen && sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, isMobileMenuOpen]);

  // don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="bg-[#1a3c2e] w-[70px] h-screen fixed left-0 top-0 z-50" />
    );
  }

  return (
    <>
      {/* mobile menu button for on mobile scree */}
      {isMobile && (
        <button
          onClick={toggleMobileMenu}
          className="fixed top-4 left-4 z-50 p-3 bg-[#1a3c2e] text-white rounded-lg shadow-lg hover:bg-[#2a4c3e] transition-colors active:bg-[#2a4c3e]"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}

      {/* mobile Overlay */}
      {isMobile && isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        ref={sidebarRef}
        className={`
          bg-[#1a3c2e] 
          p-5 
          transition-all 
          duration-300 
          ease-in-out 
          h-screen 
          fixed 
          left-0 
          top-0 
          z-50
          shadow-xl
          overflow-y-auto
          ${isMobile 
            ? isMobileMenuOpen 
              ? 'translate-x-0 w-[280px]' 
              : '-translate-x-full w-[280px]'
            : isSidebarCollapsed 
              ? 'w-[70px]' 
              : 'w-[240px]'
          }
          ${!isMobile && 'cursor-pointer'}
        `}
        onMouseEnter={handleSidebarMouseEnter}
        onMouseLeave={handleSidebarMouseLeave}
      >
        {/* Logo */}
        <div 
          className="flex items-center mb-8 cursor-pointer hover:opacity-80 active:opacity-80"
          onClick={handleLogoClick}
        >
          <span className="text-[#ffffff] text-2xl mr-2">💊</span>
          {(!isSidebarCollapsed && !isMobile) && (
            <h1 className="text-[#ffffff] text-lg font-bold">
              PharmaFind
            </h1>
          )}
          {(isMobile && isMobileMenuOpen) && (
            <h1 className="text-[#ffffff] text-lg font-bold">
              PharmaFind
            </h1>
          )}
        </div>
        
        {/* Items on menu */}
        <div className="space-y-3">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            
            // styles for all items
            const baseClass = "flex items-center justify-center h-[48px] rounded-[8px] transition-all duration-200 cursor-pointer";
            
            // active state links
            const activeClass = isActive ? 'bg-[#4caf50]' : '';
            
            // hover and touch effects - for both desktop and mobile
            const interactionClass = !isActive 
              ? 'hover:bg-[rgba(76,175,80,0.7)] active:bg-[rgba(76,175,80,0.9)]' 
              : '';
            
            return (
              <div key={item.id}>
                {item.href === '#' ? (
                  <div 
                    className={`${baseClass} ${activeClass} ${interactionClass}`}
                    onClick={() => handleLinkClick(item.href)}
                  >
                    <div className="flex items-center justify-center w-full">
                      <span className="text-white text-xl">{item.icon}</span>
                      {(!isSidebarCollapsed && !isMobile) && (
                        <span className="text-white text-base font-bold ml-3">
                          {item.label}
                        </span>
                      )}
                      {(isMobile && isMobileMenuOpen) && (
                        <span className="text-white text-base font-bold ml-3">
                          {item.label}
                        </span>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link 
                    href={item.href} 
                    className="block"
                    onClick={() => handleLinkClick(item.href)}
                  >
                    <div className={`${baseClass} ${activeClass} ${interactionClass}`}>
                      <div className="flex items-center justify-center w-full">
                        <span className="text-white text-xl">{item.icon}</span>
                        {(!isSidebarCollapsed && !isMobile) && (
                          <span className="text-white text-base font-bold ml-3">
                            {item.label}
                          </span>
                        )}
                        {(isMobile && isMobileMenuOpen) && (
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

        {/* only when collapsed on desktop */}
        {!isMobile && isSidebarCollapsed && (
          <div className="absolute bottom-5 left-0 right-0 text-center">
            <div className="text-xs text-white/40">
              click to expand
            </div>
          </div>
        )}
      </div>
    </>
  );
}