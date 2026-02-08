import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8800/api";

const newRequest = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Ensures cookies are sent with requests
});

// Request interceptor
newRequest.interceptors.request.use(
  (config) => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    const token = localStorage.getItem("token");
    
    // Use token from currentUser if available, otherwise use standalone token
    const authToken = currentUser?.token || token;
    
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
newRequest.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear user data
      localStorage.removeItem("currentUser");
      localStorage.removeItem("token");
      
      // Store current path for redirect after login
      const currentPath = window.location.pathname;
      localStorage.setItem("redirectAfterLogin", currentPath);
      
      // Redirect to login
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default newRequest;
