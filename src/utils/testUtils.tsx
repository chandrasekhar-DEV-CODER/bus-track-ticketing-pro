
import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppProvider } from '../contexts/AppContext';
import { EnhancedThemeProvider } from '../contexts/EnhancedThemeContext';

// Mock user data for testing
export const createMockUser = (overrides = {}) => ({
  id: '1',
  name: 'Test User',
  email: 'test@example.com',
  collegeId: 'college-1',
  studentId: 'STU001',
  memberSince: '2024',
  preferences: {
    notifications: true,
    theme: 'light' as const,
    language: 'en'
  },
  ...overrides
});

// Mock college data for testing
export const createMockCollege = (overrides = {}) => ({
  id: 'college-1',
  name: 'Test University',
  logo: '',
  primaryColor: '#FF0000',
  secondaryColor: '#FFFFFF',
  routes: ['route-1', 'route-2'],
  ...overrides
});

// Mock booking data for testing
export const createMockBooking = (overrides = {}) => ({
  id: '1',
  routeId: 'route-1',
  userId: 'user-1',
  date: '2024-01-01',
  time: '09:00',
  seats: 2,
  status: 'confirmed' as const,
  qrCode: 'QR123',
  fare: 10.50,
  ...overrides
});

// Create a new QueryClient for each test
const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

// All the providers wrapper
const AllTheProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = createTestQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <EnhancedThemeProvider>
        <AppProvider>
          <BrowserRouter>
            {children}
          </BrowserRouter>
        </AppProvider>
      </EnhancedThemeProvider>
    </QueryClientProvider>
  );
};

// Custom render function that includes providers
const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

// Re-export everything
export * from '@testing-library/react';
export { customRender as render };
