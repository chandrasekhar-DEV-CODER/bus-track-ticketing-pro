
import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Types
interface User {
  id: string;
  name: string;
  email: string;
  collegeId: string;
  studentId: string;
  avatar?: string;
  memberSince: string;
}

interface College {
  id: string;
  name: string;
  logo?: string;
  supportEmail: string;
  supportPhone: string;
  primaryColor: string;
  secondaryColor: string;
  campusMap?: string;
  specialAlerts: string[];
}

interface BookingData {
  selectedRoute?: any;
  passengers: number;
  promoCode?: string;
  fareCalculation?: any;
}

interface AppState {
  user: User | null;
  college: College | null;
  bookingData: BookingData;
  isLoading: boolean;
  error: string | null;
}

type AppAction = 
  | { type: 'SET_USER'; payload: User }
  | { type: 'SET_COLLEGE'; payload: College }
  | { type: 'UPDATE_BOOKING'; payload: Partial<BookingData> }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'LOGOUT' };

// Initial state
const initialState: AppState = {
  user: null,
  college: null,
  bookingData: {
    passengers: 1
  },
  isLoading: false,
  error: null
};

// Reducer
const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_COLLEGE':
      return { ...state, college: action.payload };
    case 'UPDATE_BOOKING':
      return { 
        ...state, 
        bookingData: { ...state.bookingData, ...action.payload }
      };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'LOGOUT':
      return { 
        ...initialState,
        bookingData: { passengers: 1 }
      };
    default:
      return state;
  }
};

// Context
interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  // Helper functions
  login: (userData: User) => void;
  logout: () => void;
  updateBooking: (data: Partial<BookingData>) => void;
  setCollege: (college: College) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('smartbus-user');
    const savedCollege = localStorage.getItem('smartbus-college');
    
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        dispatch({ type: 'SET_USER', payload: user });
      } catch (error) {
        console.error('Failed to parse saved user data');
      }
    }
    
    if (savedCollege) {
      try {
        const college = JSON.parse(savedCollege);
        dispatch({ type: 'SET_COLLEGE', payload: college });
      } catch (error) {
        console.error('Failed to parse saved college data');
      }
    }
  }, []);

  // Helper functions
  const login = (userData: User) => {
    dispatch({ type: 'SET_USER', payload: userData });
    localStorage.setItem('smartbus-user', JSON.stringify(userData));
    
    // Fetch college data based on user's collegeId
    fetchCollegeData(userData.collegeId);
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('smartbus-user');
    localStorage.removeItem('smartbus-college');
  };

  const updateBooking = (data: Partial<BookingData>) => {
    dispatch({ type: 'UPDATE_BOOKING', payload: data });
  };

  const setCollege = (college: College) => {
    dispatch({ type: 'SET_COLLEGE', payload: college });
    localStorage.setItem('smartbus-college', JSON.stringify(college));
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
        specialAlerts: ['Final exams: Extra shuttles running 7AM-11PM']
      }
    };

    const college = mockColleges[collegeId];
    if (college) {
      setCollege(college);
    }
  };

  const contextValue: AppContextType = {
    state,
    dispatch,
    login,
    logout,
    updateBooking,
    setCollege
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

// Hook
export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
