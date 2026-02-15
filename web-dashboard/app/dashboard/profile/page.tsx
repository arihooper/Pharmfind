'use client';

import { useState, useRef, useEffect } from 'react';
import CollapsibleSidebar from '@/components/dashboard/CollapsibleSidebar';
import {
  Camera, MapPin, Mail, Phone, ShieldCheck, Save, Bell, Building, Star, Users, X, CheckCircle
} from 'lucide-react';
import styles from './profile.module.css';

// Custom hook for localStorage (sidebar state sync)
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
  const [mounted, setMounted] = useState(false); // Add this

  useEffect(() => {
    setMounted(true);
  }, []);

  // Form data
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

  return (
    <div className="flex min-h-screen bg-[#f1f5f9]">
      <CollapsibleSidebar />

      <div className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? 'ml-[70px]' : 'ml-[240px]'}`}>
        
        {/* Header */}
        <header className="h-[80px] px-10 flex items-center justify-between bg-white/50 backdrop-blur-md sticky top-0 z-50">
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Settings</h2>
          <div className="flex items-center gap-6">
            <button className="p-2 rounded-full hover:bg-white transition-colors relative">
              <Bell size={22} className="text-slate-600" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-10 w-px bg-slate-200"></div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-slate-700">Administrator</span>
              <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white font-bold shadow-lg shadow-emerald-200">W</div>
            </div>
          </div>
        </header>

        {/* Toast */}
        {showToast && (
          <div className="fixed top-24 right-8 z-[100] animate-bounce">
            <div className="bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700">
              <CheckCircle size={20} className="text-emerald-400" />
              <span className="font-medium">{toastMessage}</span>
            </div>
          </div>
        )}

        <main className="p-10 max-w-5xl mx-auto">
          {/* Hero Banner */}
          <div className={`${styles.heroGradient} h-[200px] rounded-[32px] mb-[-70px] shadow-2xl shadow-emerald-100`}></div>

          {/* Profile Header Area */}
          <div className="px-10 flex flex-col md:flex-row items-end gap-6 mb-10">
            
            {/* SPINNING AVATAR FRAME */}
            <div className="relative group">
              <div className={styles.avatarGlowContainer}>
                <div className={styles.avatarImageWrapper}>
                  <div className={styles.fixedAvatar}>
                    {avatarPreview ? (
                      <img src={avatarPreview} alt="Profile" className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <Building size={45} className="text-slate-300" />
                    )}
                  </div>
                </div>
              </div>
              
              {/* Overlay Buttons */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-1 right-1 bg-emerald-600 text-white p-2.5 rounded-full shadow-lg hover:scale-110 transition-transform border-4 border-white z-10"
              >
                <Camera size={16} />
              </button>
              {avatarPreview && (
                <button
                  onClick={() => setAvatarPreview(null)}
                  className="absolute top-1 right-1 bg-rose-500 text-white p-1.5 rounded-full shadow-lg hover:scale-110 transition-transform border-2 border-white z-10"
                >
                  <X size={12} />
                </button>
              )}
            </div>

            {/* Title and Edit Button */}
            <div className="pb-4 flex-1 flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-black text-slate-900">{profile.pharmacyName}</h1>
                <p className="text-slate-500 font-medium flex items-center gap-2">
                  <ShieldCheck size={16} className="text-emerald-500" /> Verified Pharmacy
                </p>
              </div>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-3 bg-white text-slate-800 border border-slate-200 rounded-2xl font-bold hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2"
                >
                  Edit Profile
                </button>
              ) : (
                <div className="flex gap-3">
                  <button
                    onClick={() => { setProfile(originalProfile); setIsEditing(false); }}
                    className="px-6 py-3 text-slate-500 font-bold hover:text-slate-800"
                  >
                    Discard
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className={`${styles.saveButton} px-8 py-3`}
                  >
                    {isSaving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
            {/* Sidebar Stats */}
            <div className="space-y-4">
              <StatCard icon={<Star className="text-amber-500" />} label="Avg Rating" value="4.9" color="bg-amber-50" />
              <StatCard icon={<Users className="text-blue-500" />} label="Staff" value="12" color="bg-blue-50" />
              <StatCard icon={<MapPin className="text-rose-500" />} label="Location" value="Dambi Dollo" color="bg-rose-50" />
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <div className={`${styles.glassCard} rounded-[32px] p-8`}>
                <h3 className="text-xl font-bold text-slate-800 mb-8">Pharmacy Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <InputBox name="pharmacyName" label="Full Name" value={profile.pharmacyName} onChange={handleInputChange} icon={<Building size={16} />} disabled={!isEditing} />
                  <InputBox name="email" label="Email" value={profile.email} onChange={handleInputChange} icon={<Mail size={16} />} disabled={!isEditing} />
                  <InputBox name="phone" label="Contact Number" value={profile.phone} onChange={handleInputChange} icon={<Phone size={16} />} disabled={!isEditing} />
                  <InputBox name="license" label="License ID" value={profile.license} icon={<ShieldCheck size={16} />} disabled={true} />
                  
                  <div className="md:col-span-2">
                    <label className="text-xs font-bold text-slate-400 uppercase mb-3 block flex items-center gap-2">
                      <MapPin size={16} /> Address
                    </label>
                    <textarea
                      name="address"
                      value={profile.address}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      rows={3}
                      className={`${styles.customInput} ${!isEditing ? "opacity-50" : ""}`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <input type="file" ref={fileInputRef} onChange={handleAvatarChange} accept="image/*" className="hidden" />
    </div>
  );
}

function StatCard({ icon, label, value, color }: any) {
  return (
    <div className="bg-white p-6 rounded-[24px] shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
      <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center`}>{icon}</div>
      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{label}</p>
        <p className="text-xl font-black text-slate-800">{value}</p>
      </div>
    </div>
  );
}

function InputBox({ name, label, value, onChange, icon, disabled }: any) {
  return (
    <div className={styles.inputGroup}>
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block flex items-center gap-2">
        {icon} {label}
      </label>
      <input type="text" name={name} value={value} onChange={onChange} disabled={disabled} className={`${styles.customInput} ${disabled ? "opacity-50" : ""}`} />
    </div>
  );
}