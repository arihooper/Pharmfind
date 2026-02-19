import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4 py-10 md:py-16">
        <header className="text-center mb-10 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="text-blue-600">Pharm</span>
            <span className="text-green-600">Find</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-2">
            Pharmaceutical Inventory Management System
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
          {/* card 1 */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">For Pharmacies</h2>
            <p className="text-gray-600 mb-6 text-sm md:text-base">
              Manage your inventory, track stock levels, update prices, and handle pharmacy operations efficiently.
            </p>
            <Link 
              href="/login"
              className="inline-flex items-center justify-center w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium py-3 px-6 rounded-lg hover:from-blue-700 hover:to-blue-800 transition"
            >
              Pharmacy Login
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Coming Soon</h2>
            <p className="text-gray-600 mb-6 text-sm md:text-base">
              Mobile app for patients to search medicines, check availability, find pharmacies, and get real-time updates.
            </p>
            <div className="inline-flex items-center justify-center w-full sm:w-auto bg-gray-100 text-gray-500 font-medium py-3 px-6 rounded-lg cursor-not-allowed">
              Mobile App
              <span className="ml-2 px-2 py-1 text-xs bg-gray-200 rounded">Soon</span>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 text-center">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-8">Features</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
            {[
              { title: 'Inventory Management', desc: 'Track and manage medicine stock' },
              { title: 'Real-time Updates', desc: 'Instant stock level updates' },
              { title: 'Search & Filter', desc: 'Find medicines quickly' },
              { title: 'Reports & Analytics', desc: 'Generate insights and reports' },
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}