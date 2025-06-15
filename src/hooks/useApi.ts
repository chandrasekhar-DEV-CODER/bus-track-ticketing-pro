
import { useState, useCallback } from 'react';

interface ApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
}

export const useApi = <T>() => {
  const [state, setState] = useState<ApiResponse<T>>({
    data: null,
    loading: false,
    error: null
  });

  const callApi = useCallback(async (url: string, options: ApiOptions = {}) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await fetch(url, {
        method: options.method || 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        body: options.body ? JSON.stringify(options.body) : undefined
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setState({ data, loading: false, error: null });
      return data;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
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
    // Mock API call - replace with real endpoint
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockRoutes = [
      {
        id: '42A',
        name: 'Central Station → Airport',
        seatsLeft: 12,
        fare: 4.50,
        demand: 65,
        eta: 15
      },
      {
        id: '15B', 
        name: 'Downtown → University',
        seatsLeft: 8,
        fare: 3.25,
        demand: 85,
        eta: 8
      }
    ];

    return mockRoutes;
  }, []);

  return { routes: data, loading, error, fetchRoutes };
};

export const useBookingApi = () => {
  const { callApi } = useApi();

  const createBooking = useCallback(async (bookingData: any) => {
    // Mock booking creation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return {
      id: `booking-${Date.now()}`,
      ...bookingData,
      status: 'confirmed',
      qrCode: `QR-${Math.random().toString(36).substr(2, 9)}`
    };
  }, [callApi]);

  const cancelBooking = useCallback(async (bookingId: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true };
  }, [callApi]);

  return { createBooking, cancelBooking };
};
