"use client";

export default function DashboardPage() {
  // Activity data
  const activities = [
    { id: 1, text: "Added 50 units of Amoxicillin", timeAgo: "2 hours ago" },
    { id: 2, text: "Updated price of paracetamol upto 35", timeAgo: "4 hours ago" },
    { id: 3, text: "Received new Vitamin C", timeAgo: "Yesterday" },
  ];

  return (
    <div className="flex min-h-screen bg-[#f9f9f9]">
      {/* Sidebar */}
      <div className="bg-[#1a3c2e] w-[240px] p-5">
        {/* Logo */}
        <h1 className="text-[#ffffff] text-lg font-bold mb-8">💊 PharmaFind</h1>
        
        {/* Menu Items */}
        <div className="space-y-2">
          {/* Dashboard Item (Active) */}
          <div className="bg-[#4caf50] h-[48px] rounded-[8px] flex items-center px-4">
            <span className="text-white text-base font-bold">Dashboard</span>
          </div>
          
          {/* Other Menu Items */}
          {['Inventory', 'Profile', 'Reports', 'Settings'].map((item) => (
            <div key={item} className="bg-[rgba(76,175,80,0.5)] h-[48px] rounded-[8px] flex items-center px-4 hover:bg-[rgba(76,175,80,0.7)] cursor-pointer">
              <span className="text-white text-base font-bold">{item}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 h-[72px] flex items-center justify-between px-5">
          {/* Left: Welcome Message */}
          <h2 className="text-[#333] text-2xl font-bold">
            Welcome Waliin Pharmacy
          </h2>
          
          {/* Right: Notification & User */}
          <div className="flex items-center gap-5">
            {/* Bell Icon */}
            <button className="text-2xl hover:text-gray-700 transition-colors">
              🔔
            </button>
            
            {/* User Avatar */}
            <div className="relative">
              {/* Green Circle Background */}
              <div className="w-10 h-10 rounded-full bg-[#E8F5E9] flex items-center justify-center">
                {/* Orange Person Icon */}
                <span className="text-[#ff9800] text-3xl">🧑</span>
              </div>
            </div>
          </div>
        </header>
        
        {/* Main Content Area */}
        <main className="p-5 overflow-auto h-[calc(100vh-72px)]">
          {/* Stats Grid */}
          <div className="flex flex-wrap gap-8 mb-8">
            {/* Card 1: Total Stock */}
            <div className="bg-white rounded-xl h-[120px] w-[280px] flex items-center justify-center shadow-sm">
              <p className="text-xl font-normal text-black">
                📦 156 Total Stock
              </p>
            </div>
            
            {/* Card 2: Low Stock */}
            <div className="bg-white rounded-xl h-[120px] w-[280px] flex items-center justify-center shadow-sm">
              <p className="text-xl font-normal text-[#ff9800]">
                ⚠️ 12 Low Stock
              </p>
            </div>
            
            {/* Card 3: Out of Stock */}
            <div className="bg-white rounded-xl h-[120px] w-[280px] flex items-center justify-center shadow-sm">
              <p className="text-xl font-normal text-[#f44336]">
                ❌ 3 Out of Stock
              </p>
            </div>
            
            {/* Card 4: Today's Order */}
            <div className="bg-white rounded-xl h-[120px] w-[280px] flex items-center justify-center shadow-sm">
              <p className="text-xl font-normal text-black">
                📋 Today's order
              </p>
            </div>
          </div>
          
          {/* Recent Activity Section */}
          <section className="mb-8">
            {/* Title */}
            <h3 className="text-[#333] text-2xl font-bold mb-4">
              Recent Activity
            </h3>
            
            {/* Activity Card */}
            <div className="bg-white rounded-xl p-6 w-full shadow-sm">
              {/* Activity Items */}
              <div className="space-y-6">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex gap-3">
                    {/* Green Dot - ALIGNED WITH TEXT START */}
                    <div className="pt-1">
                      <span className="text-[#4caf50] text-2xl">●</span>
                    </div>
                    
                    {/* Activity Content */}
                    <div className="flex-1">
                      {/* Activity Text */}
                      <p className="text-[#333] font-bold text-base mb-1">
                        {activity.text}
                      </p>
                      
                      {/* Timestamp */}
                      <p className="text-[#999] text-sm font-bold">
                        {activity.timeAgo}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          
          {/* Quick Actions Section - SIMPLE MANUAL SPACING */}
          <section>
            {/* Title */}
            <h3 className="text-black text-2xl font-bold mb-8">
              Quick Actions
            </h3>
            
            {/* Quick Action Buttons - MANUAL SPACING */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '60px' }}>
              {/* Add Medicine Button */}
              <div style={{ width: '200px', height: '52px' }}>
                <button 
                  className="bg-[#4caf50] text-[#ffffff] font-bold rounded-[10px] hover:bg-[#45a049] transition-colors flex items-center justify-center gap-2 w-full h-full"
                >
                  <span className="text-[24px] leading-none">➕</span>
                  <span className="text-[16px] font-bold">Add Medicine</span>
                </button>
              </div>
              
              {/* View Reports Button */}
              <div style={{ width: '200px', height: '52px' }}>
                <button 
                  className="bg-[#2196f3] text-[#ffffff] font-bold rounded-[10px] hover:bg-[#1976d2] transition-colors flex items-center justify-center gap-2 w-full h-full"
                >
                  <span className="text-[24px] leading-none">📊</span>
                  <span className="text-[16px] font-bold">View Reports</span>
                </button>
              </div>
              
              {/* Manage Staff Button */}
              <div style={{ width: '200px', height: '52px' }}>
                <button 
                  className="bg-[#2196f3] text-[#ffffff] font-bold rounded-[10px] hover:bg-[#1976d2] transition-colors flex items-center justify-center gap-2 w-full h-full"
                >
                  <span className="text-[24px] leading-none">👥</span>
                  <span className="text-[16px] font-bold">Manage Staff</span>
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}