"use client";

export default function ProfilePage() {
  return (
    <>
      {/* Header */}
      <header className="bg-white border-b border-gray-100 h-[72px] flex items-center justify-between px-5">
        <h2 className="text-[#333] text-2xl font-bold">Pharmacy Profile</h2>
        <div className="flex items-center gap-5">
          <button className="text-2xl">🔔</button>
          <div className="w-10 h-10 rounded-full bg-[#E8F5E9] flex items-center justify-center">
            <span className="text-[#ff9800] text-3xl">🧑</span>
          </div>
        </div>
      </header>

      {/* main content */}
      <main className="p-5 overflow-auto h-[calc(100vh-72px)]">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Pharmacy Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pharmacy Name
                </label>
                <input
                  type="text"
                  defaultValue="Waliin Pharmacy"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pharmacy ID
                </label>
                <input
                  type="text"
                  defaultValue="PH-001"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  defaultValue="waliin@pharmacy.com"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  defaultValue="+251 9000000"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <textarea
                  defaultValue="04 , dambi dollo oromiya, ethiopia"
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="flex justify-end gap-4">
                <button className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button className="px-6 py-3 bg-[#4caf50] text-white font-medium rounded-lg hover:bg-[#45a049] transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}