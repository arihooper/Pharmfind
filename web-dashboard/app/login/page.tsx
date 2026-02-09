"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authAPI } from '@/lib/api';
import Image from 'next/image';
import Link from 'next/link';

export default function LoginPage() {
  const [pharmacyId, setPharmacyId] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const email = pharmacyId.includes('@') ? pharmacyId : `${pharmacyId}@pharmfind.com`;
      const data = await authAPI.login(email, password);

      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        router.push('/dashboard');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Network error. Is the API running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center p-4">
      <div className="bg-white border border-[rgba(224,224,224,0.01)] rounded-[12px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.1)] w-[400px] p-12">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-[104px] h-[104px] relative">
            <Image
              src="/images/logo/asset/imgLog62390021.png"
              alt="PharmaFind Logo"
              width={104}
              height={104}
              className="object-cover"
              priority
            />
          </div>
        </div>

        <h1 className="text-[28px] font-bold text-[#333] text-center mb-2">
          PharmaFind
        </h1>
        <p className="text-[16px] font-bold text-[#666] text-center mb-8">
          For Pharmacies
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          {/* padding to prevent overflow */}
          <div className="mb-6">
            <label className="block text-[14px] font-medium text-[#333] mb-2">
              Pharmacy ID:
            </label>
            <div className="bg-[#f5f5f5] rounded-[8px] h-[48px] w-full overflow-hidden">
              <input
                type="text"
                value={pharmacyId}
                onChange={(e) => setPharmacyId(e.target.value)}
                placeholder="Enter your pharmacy ID"
                className="w-full h-full bg-transparent outline-none text-[14px] font-medium text-black placeholder:text-[#999] px-4"
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* added gap between email and password label */}
          <div className="mb-2"></div>

          
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="text-[14px] font-medium text-[#333]">
                Password:
              </label>
              
            </div>
            <div className="bg-[#f5f5f5] rounded-[8px] h-[48px] w-full overflow-hidden">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full h-full bg-transparent outline-none text-[14px] font-medium text-black placeholder:text-[#999] px-4"
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* remember me */}
          <div className="flex items-center mb-10 mt-4">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-[16px] h-[16px] border border-[#999] cursor-pointer"
              disabled={loading}
            />
            <label 
              htmlFor="remember"
              className="ml-3 text-[14px] font-medium text-black cursor-pointer"
            >
              Remember me
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#4caf50] hover:bg-[#45a049] transition-colors rounded-[50px] h-[52px] flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span className="text-[16px] font-bold text-white">
                  Logging in...
                </span>
              </div>
            ) : (
              <span className="text-[24px] font-bold text-[#ffffff]">
                Login
              </span>
            )}
          </button>
        </form>

       

<div className="mt-6 text-center">
  <a 
    href="#forgot" 
    className="block text-[14px] font-normal text-[#2196f3] hover:underline mb-1"
  >
    Forgot your Pharmacy ID or Password?
  </a>
  <p className="text-[14px] font-normal">
    <span className="text-black">Don't have an account? </span>
    <Link 
      href="/signup" 
      className="font-bold text-[#2196f3] hover:underline"
    >
      Signup here
    </Link>
  </p>
</div>

        <div className="mt-8 pt-6 border-t border-[#e0e0e0] text-center">
          <p className="text-sm text-[#666] mb-2">Demo Credentials:</p>
          <div className="text-xs text-[#888]">
            <p>Pharmacy ID: <span className="font-medium">greenpharmacy</span></p>
            <p>Password: <span className="font-medium">pharmacy123</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}