"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authAPI } from '@/lib/api';
import Image from 'next/image';
import Link from 'next/link';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    pharmacyName: '',
    pharmacyId: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    if (!formData.pharmacyName.trim()) {
      setError('Pharmacy name is required');
      return false;
    }
    if (!formData.pharmacyId.trim()) {
      setError('Pharmacy ID is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (!formData.agreeTerms) {
      setError('You must agree to the terms and conditions');
      return false;
    }
    return true;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      console.log('Signup data:', formData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const demoUser = {
        id: 2,
        name: formData.pharmacyName,
        email: formData.email,
        role: 'pharmacy',
        pharmacyId: formData.pharmacyId
      };
      
      localStorage.setItem('token', 'demo-token-signup');
      localStorage.setItem('user', JSON.stringify(demoUser));
      router.push('/dashboard');
      
    } catch (err: any) {
      setError(err.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center p-4">
      {/* adding w-full and responsive padding */}
      <div className="bg-white border border-[rgba(224,224,224,0.01)] rounded-[12px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.1)] w-full max-w-[400px] p-6 md:p-12">
        <div className="flex justify-center mb-6">
          <div className="w-[80px] h-[80px] md:w-[104px] md:h-[104px] relative">
            <Image
              src="/images/logo/asset/imgLog62390021.png"
              alt="PharmaFind Logo"
              width={104}
              height={104}
              className="object-contain"
              priority
            />
          </div>
        </div>

        <h1 className="text-[24px] md:text-[28px] font-bold text-[#333] text-center mb-2">
          PharmaFind
        </h1>
        <p className="text-[14px] md:text-[16px] font-bold text-[#666] text-center mb-8">
          Pharmacy Registration
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-[14px] font-medium text-[#333] mb-2">
              Pharmacy Name:
            </label>
            <div className="bg-[#f5f5f5] rounded-[8px] h-[48px] w-full overflow-hidden">
              <input
                type="text"
                name="pharmacyName"
                value={formData.pharmacyName}
                onChange={handleChange}
                placeholder="Enter your pharmacy name"
                className="w-full h-full bg-transparent outline-none text-[14px] font-medium text-black placeholder:text-[#999] px-4"
                required
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <label className="block text-[14px] font-medium text-[#333] mb-2">
              Pharmacy ID:
            </label>
            <div className="bg-[#f5f5f5] rounded-[8px] h-[48px] w-full overflow-hidden">
              <input
                type="text"
                name="pharmacyId"
                value={formData.pharmacyId}
                onChange={handleChange}
                placeholder="Create a unique pharmacy ID"
                className="w-full h-full bg-transparent outline-none text-[14px] font-medium text-black placeholder:text-[#999] px-4"
                required
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <label className="block text-[14px] font-medium text-[#333] mb-2">
              Email Address:
            </label>
            <div className="bg-[#f5f5f5] rounded-[8px] h-[48px] w-full overflow-hidden">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                className="w-full h-full bg-transparent outline-none text-[14px] font-medium text-black placeholder:text-[#999] px-4"
                required
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <label className="block text-[14px] font-medium text-[#333] mb-2">
              Phone Number <span className="text-[#999]">(Optional)</span>:
            </label>
            <div className="bg-[#f5f5f5] rounded-[8px] h-[48px] w-full overflow-hidden">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="w-full h-full bg-transparent outline-none text-[14px] font-medium text-black placeholder:text-[#999] px-4"
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <label className="text-[14px] font-medium text-[#333] block mb-2">
              Password:
            </label>
            <div className="bg-[#f5f5f5] rounded-[8px] h-[48px] w-full overflow-hidden">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a strong password"
                className="w-full h-full bg-transparent outline-none text-[14px] font-medium text-black placeholder:text-[#999] px-4"
                required
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <label className="text-[14px] font-medium text-[#333] block mb-2">
              Confirm Password:
            </label>
            <div className="bg-[#f5f5f5] rounded-[8px] h-[48px] w-full overflow-hidden">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="w-full h-full bg-transparent outline-none text-[14px] font-medium text-black placeholder:text-[#999] px-4"
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="flex items-start mt-6">
            <input
              type="checkbox"
              id="agreeTerms"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              className="w-[16px] h-[16px] border border-[#999] cursor-pointer mt-1"
              disabled={loading}
            />
            <label 
              htmlFor="agreeTerms"
              className="ml-3 text-[14px] font-medium text-black cursor-pointer leading-tight"
            >
              I agree to the{' '}
              <a href="#terms" className="text-[#2196f3] hover:underline">Terms</a> and{' '}
              <a href="#privacy" className="text-[#2196f3] hover:underline">Privacy Policy</a>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#4caf50] hover:bg-[#45a049] transition-colors rounded-[50px] h-[52px] flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed mt-6 px-4"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span className="text-[16px] font-bold text-white">Creating...</span>
              </div>
            ) : (
              <span className="text-[20px] md:text-[24px] font-bold text-[#ffffff]">
                Create Account
              </span>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-[14px] font-normal text-[#333]">
            Already have an account?{' '}
            <Link href="/login" className="font-bold text-[#2196f3] hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}