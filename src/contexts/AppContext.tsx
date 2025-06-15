
import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

// Types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  collegeId?: string;
  preferences: {
    notifications: boolean;
    theme: 'light' | 'dark' | 'system';
    language: string;
  };
}

export interface College {
  id: string;
  name: string;
  logo?: string;
  primaryColor: string;
  secondaryColor: string;
  routes: string[];
}

export interface Booking {
  id: string;
  routeId: string;
  userId: string;
  date: string;
  time: string;
  seats: number;
  status: 'confirmed' | 'cancelled' | 'completed';
  qrCode: string;
  fare: number;
}

export interface AppState {
  user: User | null;
  college: College | null;
  bookings: Booking[];
  theme: 'light' | 'dark' | 'system';
  isLoading: boolean;
  error: string | null;
  isOnline: boolean;
}

// Actions
type AppAction =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_COLLEGE'; payload: College | null }
  | { type: 'SET_BOOKINGS'; payload: Booking[] }
  | { type: 'ADD_BOOKING'; payload: Booking }
  | { type: 'UPDATE_BOOKING'; payload: { id: string; updates: Partial<Booking> } }
  | { type: 'REMOVE_BOOKING'; payload: string }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' | 'system' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_ONLINE'; payload: boolean };

// Initial state
const initialState: AppState = {
  user: null,
  college: null,
  bookings: [],
  theme: 'system',
  isLoading: false,
  error: null,
  isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
};

// Reducer
const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_COLLEGE':
      return { ...state, college: action.payload };
    case 'SET_BOOKINGS':
      return { ...state, bookings: action.payload };
    case 'ADD_BOOKING':
      return { ...state, bookings: [...state.bookings, action.payload] };
    case 'UPDATE_BOOKING':
      return {
        ...state,
        bookings: state.bookings.map(booking =>
          booking.id === action.payload.id
            ? { ...booking, ...action.payload.updates }
            : booking
        ),
      };
    case 'REMOVE_BOOKING':
      return {
        ...state,
        bookings: state.bookings.filter(booking => booking.id !== action.payload),
      };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_ONLINE':
      return { ...state, isOnline: action.payload };
    default:
      return state;
  }
};

// Context
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

// Provider component
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load persisted data on mount
  useEffect(() => {
    const loadPersistedData = () => {
      try {
        // Load user
        const userData = localStorage.getItem('smartbus-user');
        if (userData) {
          dispatch({ type: 'SET_USER', payload: JSON.parse(userData) });
        }

        // Load college
        const collegeData = localStorage.getItem('smartbus-college');
        if (collegeData) {
          dispatch({ type: 'SET_COLLEGE', payload: JSON.parse(collegeData) });
        }

        // Load bookings
        const bookingsData = localStorage.getItem('smartbus-bookings');
        if (bookingsData) {
          dispatch({ type: 'SET_BOOKINGS', payload: JSON.parse(bookingsData) });
        }

        // Load theme
        const themeData = localStorage.getItem('smartbus-theme');
        if (themeData) {
          dispatch({ type: 'SET_THEME', payload: themeData as 'light' | 'dark' | 'system' });
        }
      } catch (error) {
        console.error('Error loading persisted data:', error);
      }
    };

    loadPersistedData();
  }, []);

  // Persist data changes
  useEffect(() => {
    if (state.user) {
      localStorage.setItem('smartbus-user', JSON.stringify(state.user));
    } else {
      localStorage.removeItem('smartbus-user');
    }
  }, [state.user]);

  useEffect(() => {
    if (state.college) {
      localStorage.setItem('smartbus-college', JSON.stringify(state.college));
    } else {
      localStorage.removeItem('smartbus-college');
    }
  }, [state.college]);

  useEffect(() => {
    localStorage.setItem('smartbus-bookings', JSON.stringify(state.bookings));
  }, [state.bookings]);

  useEffect(() => {
    localStorage.setItem('smartbus-theme', state.theme);
  }, [state.theme]);

  // Network status monitoring
  useEffect(() => {
    const handleOnline = () => dispatch({ type: 'SET_ONLINE', payload: true });
    const handleOffline = () => dispatch({ type: 'SET_ONLINE', payload: false });

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

// Convenience hooks
export const useUser = () => {
  const { state } = useAppContext();
  return state.user;
};

export const useCollege = () => {
  const { state } = useAppContext();
  return state.college;
};

export const useBookings = () => {
  const { state } = useAppContext();
  return state.bookings;
};

export const useTheme = () => {
  const { state, dispatch } = useAppContext();
  
  const setTheme = (theme: 'light' | 'dark' | 'system') => {
    dispatch({ type: 'SET_THEME', payload: theme });
  };
  
  return { theme: state.theme, setTheme };
};
