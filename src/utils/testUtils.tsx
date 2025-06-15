
import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { EnhancedThemeProvider } from '../contexts/EnhancedThemeContext';
import { AppProvider } from '../contexts/AppContext';

// Custom render function that includes all providers
const AllTheProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

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

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

// Mock data generators
export const createMockUser = (overrides = {}) => ({
  id: 'user-123',
  name: 'Test User',
  email: 'test@example.com',
  collegeId: 'tech-uni',
  studentId: 'TU2024001',
  memberSince: '2024',
  ...overrides
});

export const createMockCollege = (overrides = {}) => ({
  id: 'tech-uni',
  name: 'Tech University',
  supportEmail: 'transport@techuni.edu',
  supportPhone: '+1 (555) 123-TECH',
  primaryColor: '#EF4444',
  secondaryColor: '#F87171',
  specialAlerts: [],
  ...overrides
});

export const createMockRoute = (overrides = {}) => ({
  id: '42A',
  name: 'Central Station → Airport',
  seatsLeft: 12,
  fare: 4.50,
  demand: 65,
  eta: 15,
  ...overrides
});

// Re-export everything
export * from '@testing-library/react';
export { customRender as render };
