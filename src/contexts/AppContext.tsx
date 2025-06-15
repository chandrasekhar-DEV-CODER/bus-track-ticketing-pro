
import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Enhanced TypeScript interfaces
export interface User {
  id: string;
  name: string;
  email: string;
  collegeId: string;
  studentId: string;
  avatar?: string;
  memberSince: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  preferences: {
    notifications: boolean;
    emailUpdates: boolean;
    smsAlerts: boolean;
  };
  stats: {
    totalRides: number;
    totalDistance: number;
    co2Saved: number;
    favoriteRoute?: string;
  };
}

export interface College {
  id: string;
  name: string;
  logo?: string;
  supportEmail: string;
  supportPhone: string;
  primaryColor: string;
  secondaryColor: string;
  campusMap?: string;
  specialAlerts: string[];
  features: {
    liveTracking: boolean;
    bookingEnabled: boolean;
    loyaltyProgram: boolean;
    campusIntegration: boolean;
  };
  operatingHours: {
    weekdays: { start: string; end: string };
    weekends: { start: string; end: string };
  };
}

export interface RouteInfo {
  id: string;
  name: string;
  from: string;
  to: string;
  distance: number;
  estimatedTime: number;
  fare: number;
  seatsAvailable: number;
  nextDeparture: string;
  busType: 'standard' | 'express' | 'shuttle';
  accessibility: boolean;
  wifiAvailable: boolean;
}

export interface BookingData {
  selectedRoute?: RouteInfo;
  passengers: number;
  departureDate?: string;
  returnDate?: string;
  promoCode?: string;
  fareCalculation?: {
    baseFare: number;
    taxes: number;
    discount: number;
    total: number;
  };
  passengerDetails: Array<{
    name: string;
    studentId: string;
    seatPreference?: 'window' | 'aisle' | 'any';
  }>;
  preferences: {
    accessibility: boolean;
    wifi: boolean;
    notifications: boolean;
  };
}

export interface AppNotification {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

interface AppState {
  user: User | null;
  college: College | null;
  bookingData: BookingData;
  notifications: AppNotification[];
  isLoading: boolean;
  error: string | null;
  connectionStatus: 'online' | 'offline';
  lastSync: string | null;
}

type AppAction = 
  | { type: 'SET_USER'; payload: User }
  | { type: 'UPDATE_USER'; payload: Partial<User> }
  | { type: 'SET_COLLEGE'; payload: College }
  | { type: 'UPDATE_BOOKING'; payload: Partial<BookingData> }
  | { type: 'RESET_BOOKING' }
  | { type: 'ADD_NOTIFICATION'; payload: AppNotification }
  | { type: 'MARK_NOTIFICATION_READ'; payload: string }
  | { type: 'CLEAR_NOTIFICATIONS' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_CONNECTION_STATUS'; payload: 'online' | 'offline' }
  | { type: 'UPDATE_LAST_SYNC'; payload: string }
  | { type: 'LOGOUT' };

// Initial state with better defaults
const initialState: AppState = {
  user: null,
  college: null,
  bookingData: {
    passengers: 1,
    passengerDetails: [],
    preferences: {
      accessibility: false,
      wifi: false,
      notifications: true,
    },
  },
  notifications: [],
  isLoading: false,
  error: null,
  connectionStatus: 'online',
  lastSync: null,
};

// Enhanced reducer with comprehensive state management
const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload, error: null };
      
    case 'UPDATE_USER':
      return { 
        ...state, 
        user: state.user ? { ...state.user, ...action.payload } : null 
      };
      
    case 'SET_COLLEGE':
      return { ...state, college: action.payload };
      
    case 'UPDATE_BOOKING':
      return { 
        ...state, 
        bookingData: { ...state.bookingData, ...action.payload }
      };
      
    case 'RESET_BOOKING':
      return { 
        ...state, 
        bookingData: {
          passengers: 1,
          passengerDetails: [],
          preferences: {
            accessibility: false,
            wifi: false,
            notifications: true,
          },
        }
      };
      
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [action.payload, ...state.notifications].slice(0, 50) // Keep last 50
      };
      
    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map(n => 
          n.id === action.payload ? { ...n, read: true } : n
        )
      };
      
    case 'CLEAR_NOTIFICATIONS':
      return { ...state, notifications: [] };
      
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
      
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
      
    case 'SET_CONNECTION_STATUS':
      return { ...state, connectionStatus: action.payload };
      
    case 'UPDATE_LAST_SYNC':
      return { ...state, lastSync: action.payload };
      
    case 'LOGOUT':
      return { 
        ...initialState,
        connectionStatus: state.connectionStatus,
      };
      
    default:
      return state;
  }
};

// Enhanced context interface
interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  // Helper functions
  login: (userData: User, token: string) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  updateBooking: (data: Partial<BookingData>) => void;
  resetBooking: () => void;
  setCollege: (college: College) => void;
  addNotification: (notification: Omit<AppNotification, 'id' | 'timestamp'>) => void;
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;
  // Computed values
  unreadNotificationsCount: number;
  isAuthenticated: boolean;
  hasActiveBooking: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Enhanced provider with persistence and network status
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load persisted data on mount
  useEffect(() => {
    const loadPersistedData = () => {
      try {
        const savedUser = localStorage.getItem('smartbus-user');
        const savedCollege = localStorage.getItem('smartbus-college');
        const savedBooking = localStorage.getItem('smartbus-booking');
        const savedNotifications = localStorage.getItem('smartbus-notifications');
        
        if (savedUser) {
          const user = JSON.parse(savedUser);
          dispatch({ type: 'SET_USER', payload: user });
        }
        
        if (savedCollege) {
          const college = JSON.parse(savedCollege);
          dispatch({ type: 'SET_COLLEGE', payload: college });
        }
        
        if (savedBooking) {
          const booking = JSON.parse(savedBooking);
          dispatch({ type: 'UPDATE_BOOKING', payload: booking });
        }
        
        if (savedNotifications) {
          const notifications = JSON.parse(savedNotifications);
          notifications.forEach((notification: AppNotification) => {
            dispatch({ type: 'ADD_NOTIFICATION', payload: notification });
          });
        }
      } catch (error) {
        console.error('Failed to load persisted data:', error);
      }
    };

    loadPersistedData();
  }, []);

  // Monitor network status
  useEffect(() => {
    const handleOnline = () => dispatch({ type: 'SET_CONNECTION_STATUS', payload: 'online' });
    const handleOffline = () => dispatch({ type: 'SET_CONNECTION_STATUS', payload: 'offline' });

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Persist data changes
  useEffect(() => {
    if (state.user) {
      localStorage.setItem('smartbus-user', JSON.stringify(state.user));
    }
  }, [state.user]);

  useEffect(() => {
    if (state.college) {
      localStorage.setItem('smartbus-college', JSON.stringify(state.college));
    }
  }, [state.college]);

  useEffect(() => {
    localStorage.setItem('smartbus-booking', JSON.stringify(state.bookingData));
  }, [state.bookingData]);

  useEffect(() => {
    localStorage.setItem('smartbus-notifications', JSON.stringify(state.notifications));
  }, [state.notifications]);

  // Helper functions
  const login = (userData: User, token: string) => {
    dispatch({ type: 'SET_USER', payload: userData });
    localStorage.setItem('smartbus-token', token);
    
    // Fetch college data
    fetchCollegeData(userData.collegeId);
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('smartbus-user');
    localStorage.removeItem('smartbus-college');
    localStorage.removeItem('smartbus-token');
    localStorage.removeItem('smartbus-booking');
  };

  const updateUser = (userData: Partial<User>) => {
    dispatch({ type: 'UPDATE_USER', payload: userData });
  };

  const updateBooking = (data: Partial<BookingData>) => {
    dispatch({ type: 'UPDATE_BOOKING', payload: data });
  };

  const resetBooking = () => {
    dispatch({ type: 'RESET_BOOKING' });
  };

  const setCollege = (college: College) => {
    dispatch({ type: 'SET_COLLEGE', payload: college });
  };

  const addNotification = (notification: Omit<AppNotification, 'id' | 'timestamp'>) => {
    const fullNotification: AppNotification = {
      ...notification,
      id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      read: false,
    };
    dispatch({ type: 'ADD_NOTIFICATION', payload: fullNotification });
  };

  const markNotificationRead = (id: string) => {
    dispatch({ type: 'MARK_NOTIFICATION_READ', payload: id });
  };

  const clearNotifications = () => {
    dispatch({ type: 'CLEAR_NOTIFICATIONS' });
  };

  const fetchCollegeData = async (collegeId: string) => {
    // Mock college data - in real app, this would be an API call
    const mockColleges: Record<string, College> = {
      'tech-uni': {
        id: 'tech-uni',
        name: 'Tech University',
        supportEmail: 'transport@techuni.edu',
        supportPhone: '+1 (555) 123-TECH',
        primaryColor: '#EF4444',
        secondaryColor: '#F87171',
        specialAlerts: ['Final exams: Extra shuttles running 7AM-11PM'],
        features: {
          liveTracking: true,
          bookingEnabled: true,
          loyaltyProgram: true,
          campusIntegration: true,
        },
        operatingHours: {
          weekdays: { start: '06:00', end: '23:00' },
          weekends: { start: '08:00', end: '22:00' },
        },
      }
    };

    const college = mockColleges[collegeId];
    if (college) {
      setCollege(college);
    }
  };

  // Computed values
  const unreadNotificationsCount = state.notifications.filter(n => !n.read).length;
  const isAuthenticated = !!state.user;
  const hasActiveBooking = !!state.bookingData.selectedRoute;

  const contextValue: AppContextType = {
    state,
    dispatch,
    login,
    logout,
    updateUser,
    updateBooking,
    resetBooking,
    setCollege,
    addNotification,
    markNotificationRead,
    clearNotifications,
    unreadNotificationsCount,
    isAuthenticated,
    hasActiveBooking,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

// Enhanced hook with better error handling
export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
