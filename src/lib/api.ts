
import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { toast } from 'sonner';

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiError {
  message: string;
  status: number;
  code?: string;
}

// Create axios instance
const createApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: process.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor
  client.interceptors.request.use(
    (config) => {
      console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
      
      // Add auth token if available
      const token = localStorage.getItem('smartbus-token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      
      // Add college context if available
      const user = localStorage.getItem('smartbus-user');
      if (user) {
        try {
          const userData = JSON.parse(user);
          if (userData.collegeId) {
            config.headers['X-College-ID'] = userData.collegeId;
          }
        } catch (error) {
          console.warn('Failed to parse user data for college context');
        }
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor
  client.interceptors.response.use(
    (response: AxiosResponse) => {
      console.log(`API Response: ${response.status} ${response.config.url}`);
      return response;
    },
    (error: AxiosError) => {
      console.error('API Error:', error);
      
      const apiError: ApiError = {
        message: 'An unexpected error occurred',
        status: error.response?.status || 500,
        code: error.code,
      };

      if (error.response?.data) {
        const errorData = error.response.data as any;
        apiError.message = errorData.message || errorData.error || apiError.message;
      } else if (error.message) {
        apiError.message = error.message;
      }

      // Handle specific status codes
      switch (error.response?.status) {
        case 401:
          // Unauthorized - redirect to login
          localStorage.removeItem('smartbus-token');
          localStorage.removeItem('smartbus-user');
          localStorage.removeItem('smartbus-college');
          if (window.location.pathname !== '/login') {
            window.location.href = '/login';
          }
          break;
        case 403:
          toast.error('Access denied. Please contact your administrator.');
          break;
        case 404:
          toast.error('The requested resource was not found.');
          break;
        case 429:
          toast.error('Too many requests. Please try again later.');
          break;
        case 500:
          toast.error('Server error. Please try again later.');
          break;
        default:
          if (error.response?.status && error.response.status >= 400) {
            toast.error(apiError.message);
          }
      }

      return Promise.reject(apiError);
    }
  );

  return client;
};

export const apiClient = createApiClient();

// API Methods
export const api = {
  // Generic methods
  get: <T>(url: string, params?: any): Promise<ApiResponse<T>> =>
    apiClient.get(url, { params }).then(res => res.data),
  
  post: <T>(url: string, data?: any): Promise<ApiResponse<T>> =>
    apiClient.post(url, data).then(res => res.data),
  
  put: <T>(url: string, data?: any): Promise<ApiResponse<T>> =>
    apiClient.put(url, data).then(res => res.data),
  
  delete: <T>(url: string): Promise<ApiResponse<T>> =>
    apiClient.delete(url).then(res => res.data),

  // Auth endpoints
  auth: {
    login: (credentials: { email: string; password: string }) =>
      api.post<{ user: any; token: string; college: any }>('/auth/login', credentials),
    
    register: (userData: { 
      name: string; 
      email: string; 
      password: string; 
      collegeId: string; 
      studentId?: string;
      role?: 'student' | 'organization';
      phone?: string;
    }) =>
      api.post<{ user: any; token: string; college: any }>('/auth/register', userData),
    
    logout: () => api.post('/auth/logout'),
    
    refresh: () => api.post<{ token: string }>('/auth/refresh'),

    me: () => api.get<{ user: any; college: any }>('/auth/me'),
  },

  // Bus routes endpoints
  routes: {
    search: (params: { 
      collegeId?: string; 
      from?: string; 
      to?: string; 
      date?: string;
      status?: string;
    }) =>
      api.get<any[]>('/routes/search', params),
    
    getById: (id: string) => api.get<any>(`/routes/${id}`),
    
    getLive: (routeId: string) => api.get<any>(`/routes/${routeId}/live`),

    getAvailability: (routeId: string, date: string) =>
      api.get<{ availableSeats: number; totalSeats: number }>(`/routes/${routeId}/availability`, { date }),

    create: (routeData: any) => api.post<any>('/routes', routeData),

    update: (id: string, routeData: any) => api.put<any>(`/routes/${id}`, routeData),

    updateLive: (id: string, liveData: any) => api.post<any>(`/routes/${id}/live`, liveData),
  },

  // Bookings/Tickets endpoints
  bookings: {
    create: (bookingData: {
      routeId: string;
      travelDate: string;
      departureTime: string;
      pickupStop: string;
      dropoffStop: string;
      seats: number;
    }) => api.post<any>('/bookings', bookingData),
    
    getUser: (userId?: string) => 
      api.get<any[]>(userId ? `/bookings/user/${userId}` : '/bookings/user'),
    
    cancel: (bookingId: string, reason?: string) => 
      api.delete(`/bookings/${bookingId}`, { data: { reason } }),
    
    getById: (bookingId: string) => api.get<any>(`/bookings/${bookingId}`),

    getAll: (params?: { status?: string; date?: string; collegeId?: string }) =>
      api.get<any[]>('/bookings', params),
  },

  // College data endpoints
  colleges: {
    getById: (collegeId: string) => api.get<any>(`/colleges/${collegeId}`),
    
    getRoutes: (collegeId: string) => api.get<any[]>(`/colleges/${collegeId}/routes`),

    getAll: () => api.get<any[]>('/colleges'),

    create: (collegeData: any) => api.post<any>('/colleges', collegeData),

    update: (id: string, collegeData: any) => api.put<any>(`/colleges/${id}`, collegeData),
  },

  // User profile endpoints
  profile: {
    get: () => api.get<any>('/users/profile'),
    
    update: (profileData: any) => api.put<any>('/users/profile', profileData),
    
    getStats: () => api.get<any>('/users/profile/stats'),
  },

  // Admin endpoints
  admin: {
    getStats: () => api.get<any>('/admin/stats'),
    
    getUsers: (params?: { role?: string; collegeId?: string }) =>
      api.get<any[]>('/admin/users', params),

    updateUser: (userId: string, userData: any) =>
      api.put<any>(`/admin/users/${userId}`, userData),

    deleteUser: (userId: string) => api.delete(`/admin/users/${userId}`),
  },

  // Support endpoints
  support: {
    createTicket: (ticketData: { subject: string; message: string; priority?: string }) =>
      api.post<any>('/support/tickets', ticketData),

    getTickets: () => api.get<any[]>('/support/tickets'),

    updateTicket: (ticketId: string, update: { status?: string; response?: string }) =>
      api.put<any>(`/support/tickets/${ticketId}`, update),
  },
};
