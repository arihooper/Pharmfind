'use client';

import { useState } from "react";
import { Store, Upload, MapPin } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function PharmacyProfileCard() {
  const [pharmacyName, setPharmacyName] = useState("waliin Pharmacy");
  const [bio, setBio] = useState("Your trusted neighborhood pharmacy providing quality healthcare services.");
  const [address, setAddress] = useState("04 main street, Dambi Dollo");
  const [city, setCity] = useState("dambi-dollo");
  const [phoneNumber, setPhoneNumber] = useState("+251 9*****");
  const [facebookLink, setFacebookLink] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [location, setLocation] = useState("8.528098° N, 34.7958325° E");
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <GlassCard>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
          <Store size={20} className="text-emerald-500" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900">Pharmacy Profile</h3>
      </div>

      {/* profile picture */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-3">Profile Picture</label>
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white text-2xl font-bold overflow-hidden border-2 border-emerald-100">
            {profileImage ? (
              <img src={profileImage} alt="Pharmacy" className="w-full h-full object-cover" />
            ) : (
              "PF"
            )}
          </div>
          <label className="flex-1 cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <div className="px-4 py-2.5 rounded-xl border-2 border-dashed border-slate-300 hover:border-emerald-400 transition-colors text-center">
              <Upload size={16} className="inline-block mr-2 text-slate-600" />
              <span className="text-sm text-slate-600">Upload new picture</span>
            </div>
          </label>
        </div>
      </div>

      {/* pharmacy Name */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700 mb-2">Pharmacy Name</label>
        <Input
          type="text"
          value={pharmacyName}
          onChange={(e) => setPharmacyName(e.target.value)}
          className="rounded-xl border-slate-200 shadow-sm"
          placeholder="Enter pharmacy name"
        />
      </div>

      {/* Bio */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700 mb-2">Bio</label>
        <Textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="rounded-xl border-slate-200 shadow-sm resize-none"
          placeholder="Describe your pharmacy..."
          rows={3}
        />
      </div>

      {/* address */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700 mb-2">Address</label>
        <Input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="rounded-xl border-slate-200 shadow-sm"
          placeholder="Street address"
        />
      </div>

      {/* city/region */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700 mb-2">City</label>
        <Select value={city} onValueChange={setCity}>
          <SelectTrigger className="w-full rounded-xl border-slate-200 shadow-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="addis-ababa">Addis Ababa</SelectItem>
            <SelectItem value="dambi-dollo">Dambi Dollo</SelectItem>
            <SelectItem value="ambo">Ambo</SelectItem>
            <SelectItem value="mekele">Mekele</SelectItem>
            <SelectItem value="bahir-dar">Bahir Dar</SelectItem>
            <SelectItem value="jimma">Jimma</SelectItem>
            <SelectItem value="hawasa">Hawasa</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* location on Map */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          <MapPin size={14} className="inline-block mr-1" />
          Location Coordinates
        </label>
        <Input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="rounded-xl border-slate-200 shadow-sm"
          placeholder="Latitude, Longitude"
        />
        <p className="text-xs text-slate-500 mt-1">Enter GPS coordinates or click on map to set location</p>
      </div>

      {/* phone Number */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
        <Input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="rounded-xl border-slate-200 shadow-sm"
          placeholder="+1 234 567 8900"
        />
      </div>

      {/* social Media Links */}
      <div className="space-y-4 pt-4 border-t border-slate-200">
        <h4 className="text-sm font-semibold text-slate-900">Social Media</h4>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            <svg className="inline-block w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Facebook
          </label>
          <Input
            type="url"
            value={facebookLink}
            onChange={(e) => setFacebookLink(e.target.value)}
            className="rounded-xl border-slate-200 shadow-sm"
            placeholder="https://facebook.com/fb-pharmacy"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            <svg className="inline-block w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            Instagram
          </label>
          <Input
            type="url"
            value={instagramLink}
            onChange={(e) => setInstagramLink(e.target.value)}
            className="rounded-xl border-slate-200 shadow-sm"
            placeholder="https://instagram.com/ig-pharmacy"
          />
        </div>
      </div>
    </GlassCard>
  );
}