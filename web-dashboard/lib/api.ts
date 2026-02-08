import axios from 'axios';

//point to backend on port 3000
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// auth api calls
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post('/api/auth/login', { email, password });
    return response.data;
  },
  
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },
  
  getCurrentUser: () => {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    }
    return null;
  },
  
  isAuthenticated: () => {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('token');
    }
    return false;
  }
};

// medicines API calls
export const medicinesAPI = {
  getAll: async () => {
    const response = await api.get('/api/medicines');
    return response.data;
  },
  
  search: async (query: string) => {
    const response = await api.get(`/api/medicines/search?q=${query}`);
    return response.data;
  },
  
  add: async (medicine: any) => {
    const response = await api.post('/api/medicines', medicine);
    return response.data;
  },
  
  update: async (id: number, medicine: any) => {
    const response = await api.put(`/api/medicines/${id}`, medicine);
    return response.data;
  },
  
  delete: async (id: number) => {
    const response = await api.delete(`/api/medicines/${id}`);
    return response.data;
  }
};