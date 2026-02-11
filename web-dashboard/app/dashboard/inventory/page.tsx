"use client";

import { useState, useEffect } from 'react';
import CollapsibleSidebar from '@/components/dashboard/CollapsibleSidebar';
import { Search, Plus, ChevronLeft, ChevronRight } from 'lucide-react';

export default function InventoryPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // 1. Sync with the Sidebar's state (using your localStorage logic)
  useEffect(() => {
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState !== null) {
      setIsSidebarCollapsed(savedState === 'true');
    }

    // Listen for storage changes if you toggle it in another tab (optional but good)
    const handleStorageChange = () => {
      const updatedState = localStorage.getItem('sidebarCollapsed');
      setIsSidebarCollapsed(updatedState === 'true');
    };
    
    window.addEventListener('storage', handleStorageChange);
    // Also use an interval to check frequently if the user clicks the toggle
    const interval = setInterval(handleStorageChange, 100);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const medicines = [
    { id: 1, name: 'Amoxicillin 500mg', category: 'Antibiotics', price: 250, stock: 25, country: 'Germany', brand: 'Amoxil', status: 'In Stock' },
    { id: 2, name: 'Paracetamol 500mg', category: 'Pain Relief', price: 300, stock: 0, country: 'USA', brand: 'Tylenol', status: 'Out of Stock' },
    { id: 3, name: 'Clopidogrel', category: 'Antiplatelet Agent', price: 437, stock: 5, country: 'France', brand: 'Plavix', status: 'Low Stock' },
    { id: 4, name: 'Apixaban', category: 'Blood thinner', price: 200, stock: 160, country: 'USA', brand: 'Eliquis', status: 'In Stock' },
    { id: 5, name: 'Omeprazole', category: 'Gastrointestinal', price: 500, stock: 200, country: 'Usa', brand: 'OmepraCare', status: 'In Stock' },
    { id: 6, name: 'Insulin', category: 'Hormonal Agent', price: 120, stock: 500, country: 'India', brand: 'Basalog', status: 'In Stock' },
    { id: 7, name: 'Metformin', category: 'Antidiabetic', price: 300, stock: 125, country: 'Germany', brand: 'Glucophage', status: 'In Stock' },
    { id: 8, name: 'Lamivudine', category: '2-Drug Single-Tablet', price: 4, stock: 1500, country: 'Uk', brand: 'Dovato', status: 'Low Stock' },
  ];

  return (
    <div className="flex min-h-screen bg-[#f9f9f9]">
      {/* Sidebar - Your existing collapsible component */}
      <CollapsibleSidebar />

      {/* Main Content - Correctly handling the dynamic margin */}
      <div className={`flex-1 transition-all duration-300 ease-in-out ${
        isSidebarCollapsed ? 'ml-[70px]' : 'ml-[240px]'
      }`}>
        
        {/* Header - Matching Dashboard style */}
        <header className="bg-white border-b border-gray-200 h-[72px] flex items-center justify-between px-5">
          <h2 className="text-[#333] text-2xl font-bold">
            Inventory Management
          </h2>
          
          <div className="flex items-center gap-5">
            <button className="text-2xl hover:text-gray-700 transition-colors">
              🔔
            </button>
            <div className="w-10 h-10 rounded-full bg-[#E8F5E9] flex items-center justify-center">
              <span className="text-[#ff9800] text-3xl">🧑</span>
            </div>
          </div>
        </header>

        {/* Main Area */}
        <main className="p-5">
          
          {/* Search and Action Bar */}
          <div className="flex items-center gap-5 mb-6">
            <div className="bg-white border border-gray-200 rounded-[8px] h-[48px] w-[600px] flex items-center px-4 shadow-sm">
              <span className="text-gray-400 mr-2"><Search size={20} /></span>
              <input
                type="text"
                placeholder="Search medicines..."
                className="bg-transparent flex-1 font-medium text-[16px] text-[#333] outline-none placeholder:text-[#999]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <button className="bg-white h-[48px] px-6 rounded-[8px] font-bold text-[#666] border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm">
              Filter
            </button>

            <button className="bg-[#4caf50] h-[52px] px-8 rounded-[10px] text-white font-bold hover:bg-[#45a049] transition-all flex items-center gap-2 ml-auto shadow-md hover:scale-105">
              <Plus size={24} />
              <span>Add Medicine</span>
            </button>
          </div>

          {/* Table Container - Custom Styling for PharmaFind */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-[#f9f9f9] border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 font-bold text-sm text-gray-700">Medicine Name</th>
                  <th className="px-6 py-4 font-bold text-sm text-gray-700">Category</th>
                  <th className="px-6 py-4 font-bold text-sm text-gray-700">Price (ETB)</th>
                  <th className="px-6 py-4 font-bold text-sm text-gray-700">Stock</th>
                  <th className="px-6 py-4 font-bold text-sm text-gray-700">Country</th>
                  <th className="px-6 py-4 font-bold text-sm text-gray-700">Status</th>
                  <th className="px-6 py-4 font-bold text-sm text-gray-700 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {medicines.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-[#333]">{item.name}</td>
                    <td className="px-6 py-4 text-gray-600 font-medium">{item.category}</td>
                    <td className="px-6 py-4 font-bold">{item.price}</td>
                    <td className="px-6 py-4 font-medium">{item.stock}</td>
                    <td className="px-6 py-4 font-bold text-[#4caf50]">{item.country}</td>
                    <td className="px-6 py-4">
                      <span className={`font-bold px-3 py-1 rounded-full text-xs ${
                        item.status === 'In Stock' ? 'text-[#4caf50] bg-green-50' : 
                        item.status === 'Low Stock' ? 'text-[#ff9800] bg-orange-50' : 'text-[#f44336] bg-red-50'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className="bg-[#2196f3] text-white px-4 py-1.5 rounded-lg font-bold text-sm hover:bg-[#1976d2] transition-colors">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer Pagination - Styled to match Dashboard */}
          <div className="mt-6 flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <p className="text-[#999] font-bold text-sm">Showing 1-10 of 156 medicines</p>
            
            <div className="flex items-center gap-4">
              <button className="text-gray-400 hover:text-black transition-colors"><ChevronLeft /></button>
              <div className="flex gap-2">
                <span className="w-8 h-8 rounded-full bg-[#4caf50] flex items-center justify-center font-bold text-white">1</span>
                <span className="w-8 h-8 flex items-center justify-center font-bold text-gray-400">2</span>
                <span className="w-8 h-8 flex items-center justify-center font-bold text-gray-400">3</span>
              </div>
              <button className="text-gray-400 hover:text-black transition-colors"><ChevronRight /></button>
            </div>

            <button className="bg-[#fff3e0] text-[#ff9800] px-6 py-2 rounded-full font-bold text-sm border border-[#ffe0b2] hover:bg-orange-100 transition-colors">
              Export to Excel
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}