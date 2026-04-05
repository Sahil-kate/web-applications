import newRequest from './newRequest';
import { toast } from 'react-toastify';
import authService from './authService';

class ApiService {
  // Gigs API
  gigs = {
    getAll: async (params) => {
      try {
        const queryString = new URLSearchParams(params).toString();
        const response = await newRequest.get(`/gigs${queryString ? `?${queryString}` : ''}`);
        return response.data;
      } catch (error) {
        this.handleError(error);
        throw error;
      }
    },

    getById: async (id) => {
      try {
        const response = await newRequest.get(`/gigs/single/${id}`);
        return response.data;
      } catch (error) {
        this.handleError(error);
        throw error;
      }
    },

    create: async (gigData) => {
      try {
        const response = await newRequest.post('/gigs', gigData);
        return response.data;
      } catch (error) {
        this.handleError(error);
        throw error;
      }
    },

    update: async (id, gigData) => {
      try {
        const response = await newRequest.put(`/gigs/${id}`, gigData);
        return response.data;
      } catch (error) {
        this.handleError(error);
        throw error;
      }
    },

    delete: async (id) => {
      try {
        const response = await newRequest.delete(`/gigs/${id}`);
        return response.data;
      } catch (error) {
        this.handleError(error);
        throw error;
      }
    }
  };

  // Orders API
  orders = {
    getAll: async () => {
      try {
        const response = await newRequest.get('/orders');
        return response.data;
      } catch (error) {
        this.handleError(error);
        throw error;
      }
    },

    create: async (orderData) => {
      try {
        const response = await newRequest.post('/orders', orderData);
        return response.data;
      } catch (error) {
        this.handleError(error);
        throw error;
      }
    },

    confirm: async (orderId, paymentData) => {
      try {
        const response = await newRequest.put(`/orders/confirm/${orderId}`, paymentData);
        return response.data;
      } catch (error) {
        this.handleError(error);
        throw error;
      }
    }
  };

  // Auth API
  auth = {
    login: async (credentials) => {
      try {
        const response = await newRequest.post('/auth/login', credentials);
        if (response.data.token) {
          authService.setToken(response.data.token);
          authService.setUser(response.data.user);
        }
        return response.data;
      } catch (error) {
        this.handleError(error);
        throw error;
      }
    },

    register: async (userData) => {
      try {
        const response = await newRequest.post('/auth/register', userData);
        return response.data;
      } catch (error) {
        this.handleError(error);
        throw error;
      }
    },

    logout: () => {
      authService.logout();
    }
  };

  // Error handling
  handleError = (error) => {
    const errorMessage = error.response?.data?.message || error.message || 'Something went wrong';
    
    // Handle authentication errors
    if (error.response?.status === 401) {
      authService.handleAuthError(error);
      return;
    }

    // Show error toast
    toast.error(errorMessage);

    // Log error for debugging
    if (process.env.NODE_ENV === 'development') {
      console.error('API Error:', error);
    }
  };
}

export default new ApiService(); 