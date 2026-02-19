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

// custom hook for sidebar state)
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

  // sync sidebar state across tabs
  useEffect(() => {
    const handleStorage = () => {
      
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-slate-50">
      <CollapsibleSidebar />
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarCollapsed ? 'ml-[70px]' : 'ml-[240px]'
        }`}
      >
        <Header />

        <main className="p-8">
          {/* title and with actions */}
          <div className="mb-8">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">System Settings</h1>
                <p className="text-slate-600">Configure PharmaFind to match your pharmacy's workflow.</p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" className="rounded-xl">
                  Discard
                </Button>
                <Button className="rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/30">
                  Save Changes
                </Button>
              </div>
            </div>
          </div>

          {/* 2 grid from the design */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            <div className="xl:col-span-5 space-y-6">
              <PharmacyProfileCard />
              <AppearanceCard />
              <SecurityCard />
            </div>
            <div className="xl:col-span-7 space-y-6">
              <PharmacyOperationsCard />
              <NotificationsCard />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}