"use client";

import { StatCard } from '@/components/dashboard/StatCard';
import { ActivityItem } from '@/components/dashboard/ActivityItem';

export default function DashboardPage() {
  const activities = [
    { text: 'Added 50 units of Amoxicillin', timeAgo: '2 hours ago' },
    { text: 'Updated price of paracetamol upto 35', timeAgo: '4 hours ago' },
    { text: 'Received new Vitamin C', timeAgo: 'Yesterday' },
  ];

  return (
    <>
      {/* Header */}
      <header className="bg-white border-b border-gray-100 h-[72px] flex items-center justify-between px-5">
        <h2 className="text-[#333] text-2xl font-bold">Welcome Waliin Pharmacy</h2>
        <div className="flex items-center gap-5">
          <button className="text-2xl">🔔</button>
          <div className="w-10 h-10 rounded-full bg-[#E8F5E9] flex items-center justify-center">
            <span className="text-[#ff9800] text-3xl">🧑</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-5 overflow-auto h-[calc(100vh-72px)]">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <StatCard emoji="📦" value={156} label="Total Stock" />
          <StatCard emoji="⚠️" value={12} label="Low Stock" variant="warning" />
          <StatCard emoji="❌" value={3} label="Out of Stock" variant="danger" />
          <StatCard emoji="📋" value={0} label="Today's order" />
        </div>

        {/* recent activity */}
        <section className="mb-8">
          <h3 className="text-[#333] text-2xl font-bold mb-4">Recent Activity</h3>
          <div className="bg-white border border-gray-100 rounded-xl p-6 space-y-6">
            {activities.map((activity, index) => (
              <ActivityItem
                key={index}
                text={activity.text}
                timeAgo={activity.timeAgo}
              />
            ))}
          </div>
        </section>

        {/* quick actions */}
        <section>
          <h3 className="text-black text-2xl font-bold mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-5">
            <button className="bg-[#4caf50] text-white font-bold px-6 py-3 rounded-lg hover:bg-[#45a049] transition-colors">
              ➕ Add Medicine
            </button>
            <button className="bg-[#2196f3] text-white font-bold px-6 py-3 rounded-lg hover:bg-[#1976d2] transition-colors">
              View Reports
            </button>
            <button className="bg-[#2196f3] text-white font-bold px-6 py-3 rounded-lg hover:bg-[#1976d2] transition-colors">
              Manage Staff
            </button>
          </div>
        </section>
      </main>
    </>
  );
}