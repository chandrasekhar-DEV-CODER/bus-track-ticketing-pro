
import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { toast } from 'sonner';

// API Response Types
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  status: number;
  code?: string;
}

// Create axios instance
const createApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: process.env.VITE_API_BASE_URL || '/api',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor
  client.interceptors.request.use(
    (config) => {
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
          config.headers['X-College-ID'] = userData.collegeId;
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
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
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
          window.location.href = '/login';
          break;
        case 403:
          toast.error('Access denied. Please contact your administrator.');
          break;
        case 404:
          toast.error('The requested resource was not found.');
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
    login: (credentials: { email: string; password: string; collegeId: string }) =>
      api.post<{ user: any; token: string; college: any }>('/auth/login', credentials),
    
    register: (userData: { name: string; email: string; password: string; collegeId: string; studentId: string }) =>
      api.post<{ user: any; token: string }>('/auth/register', userData),
    
    logout: () => api.post('/auth/logout'),
    
    refresh: () => api.post<{ token: string }>('/auth/refresh'),
  },

  // Bus routes
  routes: {
    search: (params: { from?: string; to?: string; date?: string; collegeId?: string }) =>
      api.get<any[]>('/routes/search', params),
    
    getById: (id: string) => api.get<any>(`/routes/${id}`),
    
    getLive: (routeId: string) => api.get<any>(`/routes/${routeId}/live`),
  },

  // Bookings
  bookings: {
    create: (bookingData: any) => api.post<any>('/bookings', bookingData),
    
    getUser: (userId: string) => api.get<any[]>(`/bookings/user/${userId}`),
    
    cancel: (bookingId: string) => api.delete(`/bookings/${bookingId}`),
    
    getById: (bookingId: string) => api.get<any>(`/bookings/${bookingId}`),
  },

  // College data
  colleges: {
    getById: (collegeId: string) => api.get<any>(`/colleges/${collegeId}`),
    
    getRoutes: (collegeId: string) => api.get<any[]>(`/colleges/${collegeId}/routes`),
  },

  // User profile
  profile: {
    get: () => api.get<any>('/profile'),
    
    update: (profileData: any) => api.put<any>('/profile', profileData),
    
    getStats: () => api.get<any>('/profile/stats'),
  },
};
