import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Types
export interface College {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  contact_email?: string;
  contact_phone?: string;
  logo_url?: string;
  active: boolean;
}

export interface Profile {
  id: string;
  user_id: string;
  college_id?: string;
  full_name: string;
  student_id?: string;
  phone?: string;
  role: 'student' | 'admin' | 'organization';
  avatar_url?: string;
}

export interface BusRoute {
  id: string;
  college_id: string;
  route_name: string;
  route_number: string;
  departure_location: string;
  arrival_location: string;
  departure_time: string;
  arrival_time: string;
  total_seats: number;
  price: number;
  driver_name?: string;
  driver_phone?: string;
  bus_number: string;
  active: boolean;
  stops?: string[];
  college?: College;
}

export interface Booking {
  id: string;
  user_id: string;
  route_id: string;
  travel_date: string;
  seats_booked: number;
  pickup_stop: string;
  dropoff_stop: string;
  total_amount: number;
  booking_status: 'confirmed' | 'cancelled' | 'completed';
  payment_status: 'pending' | 'paid' | 'refunded';
  payment_id?: string;
  booked_at: string;
  cancelled_at?: string;
  cancellation_reason?: string;
  bus_route?: BusRoute;
}

export interface SupportTicket {
  id: string;
  user_id: string;
  subject: string;
  message: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  response?: string;
  created_at: string;
  updated_at: string;
}

// API Functions
export const supabaseApi = {
  // Auth
  auth: {
    signUp: async (email: string, password: string, userData: { full_name: string; phone?: string; student_id?: string; college_id?: string }) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: userData
        }
      });
      if (error) throw error;
      return data;
    },

    signIn: async (email: string, password: string) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) throw error;
      return data;
    },

    signOut: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },

    getCurrentUser: async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw error;
      return user;
    }
  },

  // Profiles
  profiles: {
    create: async (profileData: Omit<Profile, 'id'>) => {
      const { data, error } = await supabase
        .from('profiles')
        .insert(profileData)
        .select()
        .single();
      if (error) throw error;
      return data;
    },

    getByUserId: async (userId: string) => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*, colleges(*)')
        .eq('user_id', userId)
        .single();
      if (error) throw error;
      return data;
    },

    update: async (userId: string, updates: Partial<Profile>) => {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('user_id', userId)
        .select()
        .single();
      if (error) throw error;
      return data;
    }
  },

  // Colleges
  colleges: {
    getAll: async () => {
      const { data, error } = await supabase
        .from('colleges')
        .select('*')
        .eq('active', true)
        .order('name');
      if (error) throw error;
      return data;
    },

    getById: async (id: string) => {
      const { data, error } = await supabase
        .from('colleges')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw error;
      return data;
    }
  },

  // Bus Routes
  routes: {
    search: async (params: { 
      college_id?: string; 
      from?: string; 
      to?: string; 
      date?: string;
    }) => {
      let query = supabase
        .from('bus_routes')
        .select(`
          *,
          colleges(*)
        `)
        .eq('active', true);

      if (params.college_id) {
        query = query.eq('college_id', params.college_id);
      }
      if (params.from) {
        query = query.ilike('departure_location', `%${params.from}%`);
      }
      if (params.to) {
        query = query.ilike('arrival_location', `%${params.to}%`);
      }

      const { data, error } = await query.order('departure_time');
      if (error) throw error;
      return data;
    },

    getById: async (id: string) => {
      const { data, error } = await supabase
        .from('bus_routes')
        .select(`
          *,
          colleges(*)
        `)
        .eq('id', id)
        .single();
      if (error) throw error;
      return data;
    },

    getAvailability: async (routeId: string, date: string) => {
      // Get total seats from route
      const { data: route, error: routeError } = await supabase
        .from('bus_routes')
        .select('total_seats')
        .eq('id', routeId)
        .single();
      if (routeError) throw routeError;

      // Get booked seats for the date
      const { data: bookings, error: bookingsError } = await supabase
        .from('bookings')
        .select('seats_booked')
        .eq('route_id', routeId)
        .eq('travel_date', date)
        .eq('booking_status', 'confirmed');
      if (bookingsError) throw bookingsError;

      const bookedSeats = bookings?.reduce((sum, booking) => sum + booking.seats_booked, 0) || 0;
      const availableSeats = route.total_seats - bookedSeats;

      return {
        availableSeats,
        totalSeats: route.total_seats,
        bookedSeats
      };
    }
  },

  // Bookings
  bookings: {
    create: async (bookingData: {
      route_id: string;
      travel_date: string;
      seats_booked: number;
      pickup_stop: string;
      dropoff_stop: string;
      total_amount: number;
    }) => {
      const user = await supabaseApi.auth.getCurrentUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('bookings')
        .insert({
          ...bookingData,
          user_id: user.id
        })
        .select(`
          *,
          bus_routes(*,colleges(*))
        `)
        .single();
      if (error) throw error;
      return data;
    },

    getUserBookings: async () => {
      const user = await supabaseApi.auth.getCurrentUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          bus_routes(*,colleges(*))
        `)
        .eq('user_id', user.id)
        .order('booked_at', { ascending: false });
      if (error) throw error;
      return data;
    },

    cancel: async (bookingId: string, reason?: string) => {
      const { data, error } = await supabase
        .from('bookings')
        .update({
          booking_status: 'cancelled',
          cancelled_at: new Date().toISOString(),
          cancellation_reason: reason
        })
        .eq('id', bookingId)
        .select()
        .single();
      if (error) throw error;
      return data;
    },

    getById: async (id: string) => {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          bus_routes(*,colleges(*))
        `)
        .eq('id', id)
        .single();
      if (error) throw error;
      return data;
    }
  },

  // Support Tickets
  support: {
    createTicket: async (ticketData: {
      subject: string;
      message: string;
      priority?: 'low' | 'medium' | 'high' | 'urgent';
    }) => {
      const user = await supabaseApi.auth.getCurrentUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('support_tickets')
        .insert({
          ...ticketData,
          user_id: user.id,
          priority: ticketData.priority || 'medium'
        })
        .select()
        .single();
      if (error) throw error;
      return data;
    },

    getUserTickets: async () => {
      const user = await supabaseApi.auth.getCurrentUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('support_tickets')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },

    updateTicket: async (ticketId: string, updates: {
      status?: 'open' | 'in_progress' | 'resolved' | 'closed';
      response?: string;
    }) => {
      const { data, error } = await supabase
        .from('support_tickets')
        .update(updates)
        .eq('id', ticketId)
        .select()
        .single();
      if (error) throw error;
      return data;
    }
  }
};

// Error handler wrapper
export const withErrorHandling = <T extends any[], R>(
  fn: (...args: T) => Promise<R>
) => {
  return async (...args: T): Promise<R> => {
    try {
      return await fn(...args);
    } catch (error: any) {
      console.error('API Error:', error);
      toast.error(error.message || 'An unexpected error occurred');
      throw error;
    }
  };
};