'use client';

import { useState, useEffect } from 'react';
import CollapsibleSidebar from '@/components/dashboard/CollapsibleSidebar';
import { Header } from '@/components/settings/Header';
import { PharmacyProfileCard } from '@/components/settings/PharmacyProfileCard';
import { AppearanceCard } from '@/components/settings/AppearanceCard';
import { SecurityCard } from '@/components/settings/SecurityCard';
import { PharmacyOperationsCard } from '@/components/settings/PharmacyOperationsCard';
import { NotificationsCard } from '@/components/settings/NotificationsCard';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

// custom hook for sidebar state
function useLocalStorage<T>(key: string, initialValue: T) {
  const [stored, setStored] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(stored));
  }, [key, stored]);

  return [stored, setStored] as const;
}

export default function SettingsPage() {
  const [isSidebarCollapsed] = useLocalStorage('sidebarCollapsed', false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // sync sidebar state across tabs
  useEffect(() => {
    const handleStorage = () => {
      // this will be handled by the hook
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-slate-50">
      {/* pass mobile menu state to sidebar */}
      <CollapsibleSidebar 
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuToggle={toggleMobileMenu}
      />

      {/* mobile menu button - only visible on mobile, above header */}
      {isMobile && (
        <button
          onClick={toggleMobileMenu}
          className="fixed top-3 left-3 z-[100] p-2.5 bg-[#1a3c2e] text-white rounded-lg shadow-lg hover:bg-[#2a4c3e] transition-colors"
          aria-label="Toggle menu"
        >
          <Menu size={20} />
        </button>
      )}

      {/* main content with responsive margin */}
      <div
        className={`flex-1 transition-all duration-300 ${
          !isMobile && (isSidebarCollapsed ? 'ml-[70px]' : 'ml-[240px]')
        }`}
      >
        <Header />

        <main className="p-4 md:p-6 lg:p-8 overflow-y-auto max-h-[calc(100vh-80px)]">
          {/* title and actions - responsive */}
          <div className="mb-6 md:mb-8">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-2">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">System Settings</h1>
                <p className="text-sm md:text-base text-slate-600">
                  Configure PharmaFind to match your pharmacy's workflow.
                </p>
              </div>
              
              {/* action buttons - stack on mobile */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
                <Button 
                  variant="outline" 
                  className="rounded-xl w-full sm:w-auto text-sm md:text-base"
                >
                  Discard
                </Button>
                <Button 
                  className="rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/30 w-full sm:w-auto text-sm md:text-base"
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </div>

          {/* responsive grid - stacks on mobile, 2 columns on desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
            {/* left column - full width on mobile */}
            <div className="lg:col-span-5 space-y-4 md:space-y-6">
              <div className="overflow-x-auto pb-2 md:pb-0">
                <PharmacyProfileCard />
              </div>
              <AppearanceCard />
              <SecurityCard />
            </div>

            {/* right column - full width on mobile */}
            <div className="lg:col-span-7 space-y-4 md:space-y-6">
              <PharmacyOperationsCard />
              <NotificationsCard />
            </div>
          </div>

          {/* bottom padding for scrolling */}
          <div className="h-4 md:h-6" />
        </main>
      </div>
    </div>
  );
}