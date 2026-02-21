'use client';

import { useState, useRef, useEffect } from 'react';
import CollapsibleSidebar from '@/components/dashboard/CollapsibleSidebar';
import {
  Camera, MapPin, Mail, Phone, ShieldCheck, Save, Bell, Building, Star, Users, X, CheckCircle, Menu
} from 'lucide-react';
import styles from './profile.module.css';

// custom hook for localStorage (sidebar state sync)
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

export default function ProfilePage() {
  const [isSidebarCollapsed] = useLocalStorage('sidebarCollapsed', false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // check if mobile on mount and resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // form data
  const [profile, setProfile] = useState({
    pharmacyName: 'Waliin Pharmacy',
    email: 'contact@waliin.com',
    phone: '+251 91234 5678',
    license: 'PH-992-024',
    address: '04, Dambi Dollo, Oromiya, Ethiopia'
  });

  const [originalProfile, setOriginalProfile] = useState(profile);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showMessage = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1200));
    setOriginalProfile(profile);
    setIsEditing(false);
    setIsSaving(false);
    showMessage('Profile updated successfully!');
  };

  // toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex min-h-screen bg-[#f1f5f9]">
      {/* passing mobile menu state to sidebar */}
      <CollapsibleSidebar 
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuToggle={toggleMobileMenu}
      />

      {/* mobile menu Button Only visible on mobile */}
      {isMobile && (
        <button
          onClick={toggleMobileMenu}
          className="fixed top-3 left-3 z-[100] p-2.5 bg-[#1a3c2e] text-white rounded-lg shadow-lg hover:bg-[#2a4c3e] transition-colors"
          aria-label="Toggle menu"
        >
          <Menu size={20} />
        </button>
      )}

      {/* Responsive margin - only apply on non-mobile */}
      <div className={`flex-1 transition-all duration-300 ${
        !isMobile && (isSidebarCollapsed ? 'ml-[70px]' : 'ml-[240px]')
      }`}>
        
        {/* header */}
        <header className="h-[60px] md:h-[80px] px-4 md:px-10 flex items-center justify-between bg-white/50 backdrop-blur-md sticky top-0 z-50">
          {/* Left spacer to balance centered title */}
          <div className="w-8 md:w-0"></div>
          
          {/* centered title */}
          <h2 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight mx-auto md:mx-0 md:ml-0">
            Profile
          </h2>
          
          <div className="flex items-center gap-3 md:gap-6">
            <button className="p-1.5 md:p-2 rounded-full hover:bg-white transition-colors relative">
              <Bell size={isMobile ? 18 : 22} className="text-slate-600" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 md:w-2 md:h-2 bg-emerald-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-6 md:h-10 w-px bg-slate-200"></div>
            <div className="flex items-center gap-2 md:gap-3">
              <span className="hidden md:inline text-sm font-bold text-slate-700">Admin</span>
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white font-bold shadow-lg shadow-emerald-200 text-sm md:text-base">W</div>
            </div>
          </div>
        </header>

        {/* toast responsive positioning */}
        {showToast && (
          <div className="fixed top-16 md:top-24 right-2 md:right-8 z-[100] animate-bounce">
            <div className="bg-slate-900 text-white px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl shadow-2xl flex items-center gap-2 md:gap-3 border border-slate-700 text-sm md:text-base">
              <CheckCircle size={isMobile ? 16 : 20} className="text-emerald-400" />
              <span className="font-medium">{toastMessage}</span>
            </div>
          </div>
        )}

        <main className="p-4 md:p-10 max-w-5xl mx-auto">
          {/* hero Banner*/}
          <div className={`${styles.heroGradient} h-[120px] md:h-[200px] rounded-[20px] md:rounded-[32px] mb-[-40px] md:mb-[-70px] shadow-2xl shadow-emerald-100`}></div>

          {/* profile header area */}
          <div className="px-2 md:px-10 flex flex-col md:flex-row items-start md:items-end gap-4 md:gap-6 mb-6 md:mb-10">
            
            {/* Avatar - responsive size */}
            <div className="relative group">
              <div className={styles.avatarGlowContainer}>
                <div className={styles.avatarImageWrapper}>
                  <div className={`${styles.fixedAvatar} w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24`}>
                    {avatarPreview ? (
                      <img src={avatarPreview} alt="Profile" className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <Building size={isMobile ? 30 : 45} className="text-slate-300" />
                    )}
                  </div>
                </div>
              </div>
              
              {/* overlay buttons */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 bg-emerald-600 text-white p-1.5 md:p-2.5 rounded-full shadow-lg hover:scale-110 transition-transform border-2 md:border-4 border-white z-10"
              >
                <Camera size={isMobile ? 12 : 16} />
              </button>
              {avatarPreview && (
                <button
                  onClick={() => setAvatarPreview(null)}
                  className="absolute top-0 right-0 bg-rose-500 text-white p-1 md:p-1.5 rounded-full shadow-lg hover:scale-110 transition-transform border-2 border-white z-10"
                >
                  <X size={isMobile ? 8 : 12} />
                </button>
              )}
            </div>

            {/* title and edit button */}
            <div className="pb-0 md:pb-4 flex-1 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-4 w-full">
              <div>
                <h1 className="text-xl md:text-2xl lg:text-3xl font-black text-slate-900">{profile.pharmacyName}</h1>
                <p className="text-xs md:text-sm text-slate-500 font-medium flex items-center gap-1 md:gap-2">
                  <ShieldCheck size={isMobile ? 12 : 16} className="text-emerald-500" /> Verified Pharmacy
                </p>
              </div>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 md:px-6 py-2 md:py-3 bg-white text-slate-800 border border-slate-200 rounded-xl md:rounded-2xl font-bold text-sm md:text-base hover:bg-slate-50 transition-all shadow-sm flex items-center gap-1 md:gap-2"
                >
                  Edit Profile
                </button>
              ) : (
                <div className="flex gap-2 md:gap-3">
                  <button
                    onClick={() => { setProfile(originalProfile); setIsEditing(false); }}
                    className="px-3 md:px-6 py-2 md:py-3 text-xs md:text-base text-slate-500 font-bold hover:text-slate-800"
                  >
                    Discard
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className={`${styles.saveButton} px-4 md:px-8 py-2 md:py-3 text-sm md:text-base`}
                  >
                    {isSaving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* stats and Form Grid*/}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8 mt-6 md:mt-12">
            {/* Sidebar Stats - horizontal scroll on mobile */}
            <div className="overflow-x-auto pb-2 md:pb-0">
              <div className="flex lg:flex-col gap-3 md:gap-4 min-w-max lg:min-w-0">
                <StatCard 
                  icon={<Star className="text-amber-500" size={isMobile ? 16 : 20} />} 
                  label="Avg Rating" 
                  value="4.9" 
                  color="bg-amber-50" 
                  isMobile={isMobile}
                />
                <StatCard 
                  icon={<Users className="text-blue-500" size={isMobile ? 16 : 20} />} 
                  label="Staff" 
                  value="12" 
                  color="bg-blue-50" 
                  isMobile={isMobile}
                />
                <StatCard 
                  icon={<MapPin className="text-rose-500" size={isMobile ? 16 : 20} />} 
                  label="Location" 
                  value="Dambi Dollo" 
                  color="bg-rose-50" 
                  isMobile={isMobile}
                />
              </div>
            </div>

            {/* Form - responsive */}
            <div className="lg:col-span-2">
              <div className={`${styles.glassCard} rounded-[20px] md:rounded-[32px] p-4 md:p-8`}>
                <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-4 md:mb-8">Pharmacy Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                  <InputBox 
                    name="pharmacyName" 
                    label="Full Name" 
                    value={profile.pharmacyName} 
                    onChange={handleInputChange} 
                    icon={<Building size={isMobile ? 12 : 16} />} 
                    disabled={!isEditing}
                    isMobile={isMobile}
                  />
                  <InputBox 
                    name="email" 
                    label="Email" 
                    value={profile.email} 
                    onChange={handleInputChange} 
                    icon={<Mail size={isMobile ? 12 : 16} />} 
                    disabled={!isEditing}
                    isMobile={isMobile}
                  />
                  <InputBox 
                    name="phone" 
                    label="Contact Number" 
                    value={profile.phone} 
                    onChange={handleInputChange} 
                    icon={<Phone size={isMobile ? 12 : 16} />} 
                    disabled={!isEditing}
                    isMobile={isMobile}
                  />
                  <InputBox 
                    name="license" 
                    label="License ID" 
                    value={profile.license} 
                    icon={<ShieldCheck size={isMobile ? 12 : 16} />} 
                    disabled={true}
                    isMobile={isMobile}
                  />
                  
                  <div className="md:col-span-2">
                    <label className="text-[10px] md:text-xs font-bold text-slate-400 uppercase mb-2 md:mb-3 block flex items-center gap-1 md:gap-2">
                      <MapPin size={isMobile ? 12 : 16} /> Address
                    </label>
                    <textarea
                      name="address"
                      value={profile.address}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      rows={isMobile ? 2 : 3}
                      className={`${styles.customInput} text-sm md:text-base ${!isEditing ? "opacity-50" : ""}`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom padding for scrolling */}
          <div className="h-4 md:h-6" />
        </main>
      </div>

      <input type="file" ref={fileInputRef} onChange={handleAvatarChange} accept="image/*" className="hidden" />
    </div>
  );
}

// Updated StatCard component with responsive props
function StatCard({ icon, label, value, color, isMobile }: any) {
  return (
    <div className="bg-white p-4 md:p-6 rounded-[16px] md:rounded-[24px] shadow-sm border border-slate-100 flex items-center gap-3 md:gap-4 hover:shadow-md transition-shadow min-w-[140px] md:min-w-0">
      <div className={`w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl ${color} flex items-center justify-center`}>{icon}</div>
      <div>
        <p className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-0.5 md:mb-1">{label}</p>
        <p className="text-base md:text-xl font-black text-slate-800">{value}</p>
      </div>
    </div>
  );
}

// Updated InputBox component with responsive props
function InputBox({ name, label, value, onChange, icon, disabled, isMobile }: any) {
  return (
    <div className={styles.inputGroup}>
      <label className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 md:mb-3 block flex items-center gap-1 md:gap-2">
        {icon} {label}
      </label>
      <input 
        type="text" 
        name={name} 
        value={value} 
        onChange={onChange} 
        disabled={disabled} 
        className={`${styles.customInput} text-sm md:text-base ${disabled ? "opacity-50" : ""}`} 
      />
    </div>
  );
}