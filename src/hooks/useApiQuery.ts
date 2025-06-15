
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api, ApiError } from '../lib/api';
import { toast } from 'sonner';

// Query keys
export const queryKeys = {
  routes: (params?: any) => ['routes', params],
  route: (id: string) => ['route', id],
  routeAvailability: (id: string, date: string) => ['route', id, 'availability', date],
  routeLive: (id: string) => ['route', id, 'live'],
  bookings: (userId?: string) => ['bookings', userId],
  booking: (id: string) => ['booking', id],
  college: (id: string) => ['college', id],
  colleges: () => ['colleges'],
  profile: () => ['profile'],
  profileStats: () => ['profile', 'stats'],
  adminStats: () => ['admin', 'stats'],
  adminUsers: (params?: any) => ['admin', 'users', params],
  supportTickets: () => ['support', 'tickets'],
} as const;

// Route queries
export const useRoutesQuery = (params?: any) => {
  return useQuery({
    queryKey: queryKeys.routes(params),
    queryFn: () => api.routes.search(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: 2,
  });
};

export const useRouteQuery = (id: string) => {
  return useQuery({
    queryKey: queryKeys.route(id),
    queryFn: () => api.routes.getById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useRouteAvailabilityQuery = (routeId: string, date: string) => {
  return useQuery({
    queryKey: queryKeys.routeAvailability(routeId, date),
    queryFn: () => api.routes.getAvailability(routeId, date),
    enabled: !!(routeId && date),
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};

export const useLiveRouteQuery = (routeId: string, enabled = true) => {
  return useQuery({
    queryKey: queryKeys.routeLive(routeId),
    queryFn: () => api.routes.getLive(routeId),
    enabled: enabled && !!routeId,
    refetchInterval: 15000, // Refetch every 15 seconds
    staleTime: 10000, // Consider stale after 10 seconds
  });
};

// Booking queries
export const useBookingsQuery = (userId?: string) => {
  return useQuery({
    queryKey: queryKeys.bookings(userId),
    queryFn: () => api.bookings.getUser(userId),
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};

export const useBookingQuery = (id: string) => {
  return useQuery({
    queryKey: queryKeys.booking(id),
    queryFn: () => api.bookings.getById(id),
    enabled: !!id,
  });
};

// College queries
export const useCollegeQuery = (collegeId: string) => {
  return useQuery({
    queryKey: queryKeys.college(collegeId),
    queryFn: () => api.colleges.getById(collegeId),
    enabled: !!collegeId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useCollegesQuery = () => {
  return useQuery({
    queryKey: queryKeys.colleges(),
    queryFn: () => api.colleges.getAll(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Profile queries
export const useProfileQuery = () => {
  return useQuery({
    queryKey: queryKeys.profile(),
    queryFn: () => api.profile.get(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useProfileStatsQuery = () => {
  return useQuery({
    queryKey: queryKeys.profileStats(),
    queryFn: () => api.profile.getStats(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Admin queries
export const useAdminStatsQuery = () => {
  return useQuery({
    queryKey: queryKeys.adminStats(),
    queryFn: () => api.admin.getStats(),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useAdminUsersQuery = (params?: any) => {
  return useQuery({
    queryKey: queryKeys.adminUsers(params),
    queryFn: () => api.admin.getUsers(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Support queries
export const useSupportTicketsQuery = () => {
  return useQuery({
    queryKey: queryKeys.supportTickets(),
    queryFn: () => api.support.getTickets(),
    staleTime: 1 * 60 * 1000, // 1 minute
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
      // Redirect to dashboard or home
      window.location.href = '/';
    },
    onError: (error: ApiError) => {
      toast.error(error.message || 'Login failed');
    },
  });
};

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: api.auth.register,
    onSuccess: (data) => {
      localStorage.setItem('smartbus-token', data.data.token);
      localStorage.setItem('smartbus-user', JSON.stringify(data.data.user));
      if (data.data.college) {
        localStorage.setItem('smartbus-college', JSON.stringify(data.data.college));
      }
      toast.success('Registration successful! Welcome to SmartBus!');
      // Redirect to dashboard or home
      window.location.href = '/';
    },
    onError: (error: ApiError) => {
      toast.error(error.message || 'Registration failed');
    },
  });
};

export const useCreateBookingMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: api.bookings.create,
    onSuccess: (data, variables) => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      queryClient.invalidateQueries({ queryKey: ['route', variables.routeId, 'availability'] });
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
    mutationFn: ({ bookingId, reason }: { bookingId: string; reason?: string }) =>
      api.bookings.cancel(bookingId, reason),
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

export const useCreateSupportTicketMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: api.support.createTicket,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.supportTickets() });
      toast.success('Support ticket created successfully');
    },
    onError: (error: ApiError) => {
      toast.error(error.message || 'Failed to create support ticket');
    },
  });
};
