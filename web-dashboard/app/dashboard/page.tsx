"use client";

import { useState } from 'react';
import CollapsibleSidebar from '@/components/dashboard/CollapsibleSidebar';

export default function DashboardPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  // Activity data
  const activities = [
    { id: 1, text: "Added 50 units of Amoxicillin", timeAgo: "2 hours ago" },
    { id: 2, text: "Updated price of paracetamol upto 35", timeAgo: "4 hours ago" },
    { id: 3, text: "Received new Vitamin C", timeAgo: "Yesterday" },
  ];

  return (
    <div className="flex min-h-screen bg-[#f9f9f9]">
      {/* Sidebar */}
      <CollapsibleSidebar />
      
      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ease-in-out ${
        isSidebarCollapsed ? 'ml-[70px]' : 'ml-[240px]'
      }`}>
        
        {/* Header */}
        <header className="bg-white border-b border-gray-200 h-[72px] flex items-center justify-between px-5">
          <h2 className="text-[#333] text-2xl font-bold">
            Welcome Waliin Pharmacy
          </h2>
          
          <div className="flex items-center gap-5">
            <button className="text-2xl hover:text-gray-700 transition-colors">
              🔔
            </button>
            
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-[#E8F5E9] flex items-center justify-center">
                <span className="text-[#ff9800] text-3xl">🧑</span>
              </div>
            </div>
          </div>
        </header>
        
        {/* Main Area */}
        <main className="p-5 overflow-auto h-[calc(100vh-72px)]">
          
          {/* Stats */}
          <div className="flex flex-wrap gap-8 mb-8">
            <div className="bg-white rounded-xl h-[120px] w-[280px] flex items-center justify-center shadow-sm">
              <p className="text-xl font-normal text-black">
                📦 156 Total Stock
              </p>
            </div>

            <div className="bg-white rounded-xl h-[120px] w-[280px] flex items-center justify-center shadow-sm">
              <p className="text-xl font-normal text-[#ff9800]">
                ⚠️ 12 Low Stock
              </p>
            </div>

            <div className="bg-white rounded-xl h-[120px] w-[280px] flex items-center justify-center shadow-sm">
              <p className="text-xl font-normal text-[#f44336]">
                ❌ 3 Out of Stock
              </p>
            </div>

            <div className="bg-white rounded-xl h-[120px] w-[280px] flex items-center justify-center shadow-sm">
              <p className="text-xl font-normal text-black">
                📋 Today's order
              </p>
            </div>
          </div>
          
          {/* Recent Activity */}
          <section className="mb-8">
            <h3 className="text-[#333] text-2xl font-bold mb-4">
              Recent Activity
            </h3>
            
            <div className="bg-white rounded-xl p-6 w-full shadow-sm">
              <div className="space-y-6">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex gap-3">
                    <div className="pt-1">
                      <span className="text-[#4caf50] text-2xl">●</span>
                    </div>
                    
                    <div className="flex-1">
                      <p className="text-[#333] font-bold text-base mb-1">
                        {activity.text}
                      </p>
                      <p className="text-[#999] text-sm font-bold">
                        {activity.timeAgo}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          
          {/* Quick Actions */}
          <section>
            <h3 className="text-black text-2xl font-bold mb-8">
              Quick Actions
            </h3>
            
            {/* Quick Action Buttons */}
            <div className="flex flex-wrap gap-[60px]">
              
              <div className="w-[200px] h-[52px]">
                <button 
                  className="bg-[#4caf50] text-white font-bold rounded-[10px] 
                             hover:bg-[#45a049] transition-colors 
                             flex items-center justify-center gap-2 
                             w-full h-full hover:scale-105 duration-200"
                >
                  <span className="text-[24px] leading-none">➕</span>
                  <span className="text-[16px] text-[#ffffff]">Add Medicine</span>
                </button>
              </div>

              <div className="w-[200px] h-[52px]">
                <button 
                  className="bg-[#2196f3] text-white font-bold rounded-[10px] 
                             hover:bg-[#1976d2] transition-colors 
                             flex items-center justify-center gap-2 
                             w-full h-full hover:scale-105 duration-200"
                >
                  <span className="text-[24px] leading-none">📊</span>
                  <span className="text-[16px] text-[#ffffff]">View Reports</span>
                </button>
              </div>

              <div className="w-[200px] h-[52px]">
                <button 
                  className="bg-[#2196f3] text-white font-bold rounded-[10px] 
                             hover:bg-[#1976d2] transition-colors 
                             flex items-center justify-center gap-2 
                             w-full h-full hover:scale-105 duration-200"
                >
                  <span className="text-[24px] leading-none">👥</span>
                  <span className="text-[16px] text-[#ffffff]">Manage Staff</span>
                </button>
              </div>

            </div>
          </section>

        </main>
      </div>
    </div>
  );
}
