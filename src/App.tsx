
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { AppProvider } from './contexts/AppContext';
import { EnhancedThemeProvider } from './contexts/EnhancedThemeContext';
import ErrorBoundary from './components/ErrorBoundary';
import LazyRoute from './components/LazyRoute';

// Lazy load components
const Index = React.lazy(() => import('./pages/Index'));
const LoginPageComponent = React.lazy(() => import('./components/LoginPage'));
const BookTicketPage = React.lazy(() => import('./pages/BookTicketPage'));
const TrackBusPage = React.lazy(() => import('./pages/TrackBusPage'));
const MyTicketsPage = React.lazy(() => import('./pages/MyTicketsPage'));
const ProfilePage = React.lazy(() => import('./pages/ProfilePage'));
const SupportPage = React.lazy(() => import('./pages/SupportPage'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <EnhancedThemeProvider>
          <AppProvider>
            <Router>
              <div className="App">
                <Routes>
                  <Route path="/" element={
                    <LazyRoute>
                      <Index />
                    </LazyRoute>
                  } />
                  <Route path="/login" element={
                    <LazyRoute>
                      <LoginPageComponent />
                    </LazyRoute>
                  } />
                  <Route path="/book-ticket" element={
                    <LazyRoute>
                      <BookTicketPage />
                    </LazyRoute>
                  } />
                  <Route path="/track-bus" element={
                    <LazyRoute>
                      <TrackBusPage />
                    </LazyRoute>
                  } />
                  <Route path="/my-tickets" element={
                    <LazyRoute>
                      <MyTicketsPage />
                    </LazyRoute>
                  } />
                  <Route path="/profile" element={
                    <LazyRoute>
                      <ProfilePage />
                    </LazyRoute>
                  } />
                  <Route path="/support" element={
                    <LazyRoute>
                      <SupportPage />
                    </LazyRoute>
                  } />
                  <Route path="*" element={
                    <LazyRoute>
                      <NotFound />
                    </LazyRoute>
                  } />
                </Routes>
                <Toaster position="top-right" />
              </div>
            </Router>
          </AppProvider>
        </EnhancedThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
