
import { useState, useCallback } from 'react';
import { api } from '../lib/api';

interface ApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export const useApi = <T>() => {
  const [state, setState] = useState<ApiResponse<T>>({
    data: null,
    loading: false,
    error: null
  });

  const callApi = useCallback(async (apiCall: () => Promise<any>) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await apiCall();
      setState({ data: response.data, loading: false, error: null });
      return response.data;
    } catch (error: any) {
      const errorMessage = error.message || 'An error occurred';
      setState({ data: null, loading: false, error: errorMessage });
      throw error;
    }
  }, []);

  return { ...state, callApi };
};

// Specific API hooks for common operations
export const useBusRoutes = () => {
  const { data, loading, error, callApi } = useApi<any[]>();

  const fetchRoutes = useCallback(async (filters?: any) => {
    return callApi(() => api.routes.search(filters || {}));
  }, [callApi]);

  return { routes: data, loading, error, fetchRoutes };
};

export const useBookingApi = () => {
  const { callApi } = useApi();

  const createBooking = useCallback(async (bookingData: any) => {
    return callApi(() => api.bookings.create(bookingData));
  }, [callApi]);

  const cancelBooking = useCallback(async (bookingId: string, reason?: string) => {
    return callApi(() => api.bookings.cancel(bookingId, reason));
  }, [callApi]);

  return { createBooking, cancelBooking };
};

export const useAuthApi = () => {
  const { callApi } = useApi();

  const login = useCallback(async (credentials: { email: string; password: string }) => {
    return callApi(() => api.auth.login(credentials));
  }, [callApi]);

  const register = useCallback(async (userData: any) => {
    return callApi(() => api.auth.register(userData));
  }, [callApi]);

  const getCurrentUser = useCallback(async () => {
    return callApi(() => api.auth.me());
  }, [callApi]);

  return { login, register, getCurrentUser };
};
