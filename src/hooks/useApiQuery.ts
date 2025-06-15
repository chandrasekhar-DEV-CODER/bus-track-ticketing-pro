
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api, ApiError } from '../lib/api';
import { toast } from 'sonner';

// Query keys
export const queryKeys = {
  routes: (params?: any) => ['routes', params],
  route: (id: string) => ['route', id],
  bookings: (userId?: string) => ['bookings', userId],
  booking: (id: string) => ['booking', id],
  college: (id: string) => ['college', id],
  profile: () => ['profile'],
  profileStats: () => ['profile', 'stats'],
} as const;

// Route queries
export const useRoutesQuery = (params?: any) => {
  return useQuery({
    queryKey: queryKeys.routes(params),
    queryFn: () => api.routes.search(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useRouteQuery = (id: string) => {
  return useQuery({
    queryKey: queryKeys.route(id),
    queryFn: () => api.routes.getById(id),
    enabled: !!id,
  });
};

export const useLiveRouteQuery = (routeId: string, enabled = true) => {
  return useQuery({
    queryKey: ['route', routeId, 'live'],
    queryFn: () => api.routes.getLive(routeId),
    enabled: enabled && !!routeId,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
};

// Booking queries
export const useBookingsQuery = (userId?: string) => {
  return useQuery({
    queryKey: queryKeys.bookings(userId),
    queryFn: () => api.bookings.getUser(userId!),
    enabled: !!userId,
  });
};

export const useBookingQuery = (id: string) => {
  return useQuery({
    queryKey: queryKeys.booking(id),
    queryFn: () => api.bookings.getById(id),
    enabled: !!id,
  });
};

// College query
export const useCollegeQuery = (collegeId: string) => {
  return useQuery({
    queryKey: queryKeys.college(collegeId),
    queryFn: () => api.colleges.getById(collegeId),
    enabled: !!collegeId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Profile queries
export const useProfileQuery = () => {
  return useQuery({
    queryKey: queryKeys.profile(),
    queryFn: () => api.profile.get(),
  });
};

export const useProfileStatsQuery = () => {
  return useQuery({
    queryKey: queryKeys.profileStats(),
    queryFn: () => api.profile.getStats(),
  });
};

// Mutations
export const useLoginMutation = () => {
  return useMutation({
    mutationFn: api.auth.login,
    onSuccess: (data) => {
      localStorage.setItem('smartbus-token', data.data.token);
      localStorage.setItem('smartbus-user', JSON.stringify(data.data.user));
      if (data.data.college) {
        localStorage.setItem('smartbus-college', JSON.stringify(data.data.college));
      }
      toast.success('Welcome back!');
    },
    onError: (error: ApiError) => {
      toast.error(error.message || 'Login failed');
    },
  });
};

export const useCreateBookingMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: api.bookings.create,
    onSuccess: (data, variables) => {
      // Invalidate bookings queries
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      toast.success('Booking created successfully!');
    },
    onError: (error: ApiError) => {
      toast.error(error.message || 'Failed to create booking');
    },
  });
};

export const useCancelBookingMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: api.bookings.cancel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      toast.success('Booking cancelled successfully');
    },
    onError: (error: ApiError) => {
      toast.error(error.message || 'Failed to cancel booking');
    },
  });
};

export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: api.profile.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.profile() });
      toast.success('Profile updated successfully');
    },
    onError: (error: ApiError) => {
      toast.error(error.message || 'Failed to update profile');
    },
  });
};
