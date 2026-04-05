import { toast } from "react-toastify";

// Encryption key (in production, this should be environment variable)
const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY || 'your-encryption-key';

// Simple encryption (for demonstration - use a proper encryption library in production)
const encrypt = (data) => {
  try {
    return btoa(JSON.stringify(data));
  } catch (error) {
    console.error('Encryption error:', error);
    return null;
  }
};

// Simple decryption (for demonstration - use a proper encryption library in production)
const decrypt = (encryptedData) => {
  try {
    return JSON.parse(atob(encryptedData));
  } catch (error) {
    console.error('Decryption error:', error);
    return null;
  }
};

export const authService = {
  // Store user data securely
  setUser: (userData) => {
    if (!userData) return;
    const encrypted = encrypt(userData);
    localStorage.setItem('currentUser', encrypted);
  },

  // Get user data
  getUser: () => {
    const encrypted = localStorage.getItem('currentUser');
    if (!encrypted) return null;
    return decrypt(encrypted);
  },

  // Store token
  setToken: (token) => {
    if (!token) return;
    localStorage.setItem('token', token);
  },

  // Get token
  getToken: () => {
    return localStorage.getItem('token');
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    const user = authService.getUser();
    return !!(token && user);
  },

  // Check if user is a seller
  isSeller: () => {
    const user = authService.getUser();
    return user?.isSeller || false;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    localStorage.removeItem('gigId');
    localStorage.removeItem('gigData');
    // Add any other items that need to be cleared
  },

  // Handle authentication errors
  handleAuthError: (error) => {
    if (error.response?.status === 401) {
      authService.logout();
      toast.error('Session expired. Please login again.');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
};

export default authService; 