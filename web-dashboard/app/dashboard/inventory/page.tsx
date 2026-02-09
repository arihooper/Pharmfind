"use client";

import { useState } from 'react';
import Link from 'next/link';

interface Medicine {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const medicines: Medicine[] = [
    { id: 1, name: 'Amoxicillin 500mg', category: 'Antibiotic', price: 45, stock: 25, status: 'In Stock' },
    { id: 2, name: 'Paracetamol', category: 'Pain Relief', price: 15, stock: 0, status: 'Out of Stock' },
    { id: 3, name: 'Vitamin C 1000mg', category: 'Supplements', price: 25, stock: 100, status: 'In Stock' },
    { id: 4, name: 'Ibuprofen 400mg', category: 'Pain Relief', price: 30, stock: 5, status: 'Low Stock' },
    { id: 5, name: 'Cetirizine 10mg', category: 'Allergy', price: 20, stock: 45, status: 'In Stock' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Stock': return 'text-green-600 bg-green-100';
      case 'Low Stock': return 'text-yellow-600 bg-yellow-100';
      case 'Out of Stock': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredMedicines = medicines.filter(medicine =>
    medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    medicine.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Header */}
      <header className="bg-white border-b border-gray-100 h-[72px] flex items-center justify-between px-5">
        <h2 className="text-[#333] text-2xl font-bold">Inventory Management</h2>
        <div className="flex items-center gap-5">
          <button className="text-2xl">🔔</button>
          <div className="w-10 h-10 rounded-full bg-[#E8F5E9] flex items-center justify-center">
            <span className="text-[#ff9800] text-3xl">🧑</span>
          </div>
        </div>
      </header>

      {/* main Content */}
      <main className="p-5 overflow-auto h-[calc(100vh-72px)]">
        {/*  button search and add */}
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-96">
            <input
              type="text"
              placeholder="Search medicines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-10 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
          </div>
          
          <Link
            href="/dashboard/inventory/add"
            className="bg-[#4caf50] text-white font-bold px-6 py-2.5 rounded-lg hover:bg-[#45a049] transition-colors flex items-center gap-2"
          >
            <span>➕</span>
            Add New Medicine
          </Link>
        </div>

        {/* inventory tables */}
        <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4 text-gray-700 font-bold">Medicine Name</th>
                <th className="text-left p-4 text-gray-700 font-bold">Category</th>
                <th className="text-left p-4 text-gray-700 font-bold">Price (ETB)</th>
                <th className="text-left p-4 text-gray-700 font-bold">Stock</th>
                <th className="text-left p-4 text-gray-700 font-bold">Status</th>
                <th className="text-left p-4 text-gray-700 font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMedicines.map((medicine) => (
                <tr key={medicine.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-900">{medicine.name}</td>
                  <td className="p-4 text-gray-600">{medicine.category}</td>
                  <td className="p-4 font-bold text-gray-900">{medicine.price} ETB</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{medicine.stock} units</span>
                      {medicine.stock < 10 && medicine.stock > 0 && (
                        <span className="text-xs text-yellow-600">⚠️ Low</span>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(medicine.status)}`}>
                      {medicine.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Link
                        href={`/dashboard/inventory/edit/${medicine.id}`}
                        className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded text-sm font-medium hover:bg-blue-200 transition-colors"
                      >
                        Edit
                      </Link>
                      <button className="px-3 py-1.5 bg-red-100 text-red-700 rounded text-sm font-medium hover:bg-red-200 transition-colors">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* summary stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
            <h3 className="text-blue-800 font-bold text-lg mb-2">Total Medicines</h3>
            <p className="text-blue-900 text-3xl font-bold">{medicines.length}</p>
          </div>
          <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-5">
            <h3 className="text-yellow-800 font-bold text-lg mb-2">Low Stock Items</h3>
            <p className="text-yellow-900 text-3xl font-bold">
              {medicines.filter(m => m.status === 'Low Stock').length}
            </p>
          </div>
          <div className="bg-red-50 border border-red-100 rounded-xl p-5">
            <h3 className="text-red-800 font-bold text-lg mb-2">Out of Stock</h3>
            <p className="text-red-900 text-3xl font-bold">
              {medicines.filter(m => m.status === 'Out of Stock').length}
            </p>
          </div>
        </div>
      </main>
    </>
  );
}