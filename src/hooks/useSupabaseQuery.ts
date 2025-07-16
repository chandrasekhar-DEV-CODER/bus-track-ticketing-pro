import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabaseApi, withErrorHandling } from '@/lib/supabase-api';
import { toast } from 'sonner';

// Query keys
export const queryKeys = {
  routes: (params?: any) => ['routes', params],
  route: (id: string) => ['route', id],
  routeAvailability: (id: string, date: string) => ['route', id, 'availability', date],
  bookings: () => ['bookings'],
  booking: (id: string) => ['booking', id],
  college: (id: string) => ['college', id],
  colleges: () => ['colleges'],
  profile: (userId: string) => ['profile', userId],
  supportTickets: () => ['support', 'tickets'],
} as const;

// Route queries
export const useRoutesQuery = (params?: { 
  college_id?: string; 
  from?: string; 
  to?: string; 
  date?: string;
}) => {
  return useQuery({
    queryKey: queryKeys.routes(params),
    queryFn: withErrorHandling(() => supabaseApi.routes.search(params || {})),
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: 2,
  });
};

export const useRouteQuery = (id: string) => {
  return useQuery({
    queryKey: queryKeys.route(id),
    queryFn: withErrorHandling(() => supabaseApi.routes.getById(id)),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useRouteAvailabilityQuery = (routeId: string, date: string) => {
  return useQuery({
    queryKey: queryKeys.routeAvailability(routeId, date),
    queryFn: withErrorHandling(() => supabaseApi.routes.getAvailability(routeId, date)),
    enabled: !!(routeId && date),
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};

// Booking queries
export const useBookingsQuery = () => {
  return useQuery({
    queryKey: queryKeys.bookings(),
    queryFn: withErrorHandling(() => supabaseApi.bookings.getUserBookings()),
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};

export const useBookingQuery = (id: string) => {
  return useQuery({
    queryKey: queryKeys.booking(id),
    queryFn: withErrorHandling(() => supabaseApi.bookings.getById(id)),
    enabled: !!id,
  });
};

// College queries
export const useCollegeQuery = (collegeId: string) => {
  return useQuery({
    queryKey: queryKeys.college(collegeId),
    queryFn: withErrorHandling(() => supabaseApi.colleges.getById(collegeId)),
    enabled: !!collegeId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useCollegesQuery = () => {
  return useQuery({
    queryKey: queryKeys.colleges(),
    queryFn: withErrorHandling(() => supabaseApi.colleges.getAll()),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Profile queries
export const useProfileQuery = (userId: string) => {
  return useQuery({
    queryKey: queryKeys.profile(userId),
    queryFn: withErrorHandling(() => supabaseApi.profiles.getByUserId(userId)),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Support queries
export const useSupportTicketsQuery = () => {
  return useQuery({
    queryKey: queryKeys.supportTickets(),
    queryFn: withErrorHandling(() => supabaseApi.support.getUserTickets()),
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};

// Mutations
export const useCreateBookingMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (bookingData: {
      route_id: string;
      travel_date: string;
      seats_booked: number;
      pickup_stop: string;
      dropoff_stop: string;
      total_amount: number;
    }) => withErrorHandling(() => supabaseApi.bookings.create(bookingData))(),
    onSuccess: (data, variables) => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: queryKeys.bookings() });
      queryClient.invalidateQueries({ queryKey: queryKeys.routeAvailability(variables.route_id, variables.travel_date) });
      toast.success('Booking created successfully!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create booking');
    },
  });
};

export const useCancelBookingMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ bookingId, reason }: { bookingId: string; reason?: string }) =>
      withErrorHandling(() => supabaseApi.bookings.cancel(bookingId, reason))(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.bookings() });
      toast.success('Booking cancelled successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to cancel booking');
    },
  });
};

export const useCreateSupportTicketMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (ticketData: {
      subject: string;
      message: string;
      priority?: 'low' | 'medium' | 'high' | 'urgent';
    }) => withErrorHandling(() => supabaseApi.support.createTicket(ticketData))(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.supportTickets() });
      toast.success('Support ticket created successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create support ticket');
    },
  });
};