
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy } from "react";
import { EnhancedThemeProvider } from "./contexts/EnhancedThemeContext";
import { AppProvider } from "./contexts/AppContext";
import AnimatedCursor from "./components/ui/AnimatedCursor";
import LazyRoute from "./components/LazyRoute";
import ErrorBoundary from "./components/ErrorBoundary";

// Lazy load route components for better performance
const Index = lazy(() => import("./pages/Index"));
const BookTicketPage = lazy(() => import("./pages/BookTicketPage"));
const TrackBusPage = lazy(() => import("./pages/TrackBusPage"));
const MyTicketsPage = lazy(() => import("./pages/MyTicketsPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SupportPage = lazy(() => import("./pages/SupportPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <EnhancedThemeProvider>
        <AppProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <AnimatedCursor />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={
                  <LazyRoute>
                    <Index />
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
                <Route path="/login" element={
                  <LazyRoute>
                    <LoginPage />
                  </LazyRoute>
                } />
                <Route path="/support" element={
                  <LazyRoute>
                    <SupportPage />
                  </LazyRoute>
                } />
                <Route path="/profile" element={
                  <LazyRoute>
                    <ProfilePage />
                  </LazyRoute>
                } />
                <Route path="*" element={
                  <LazyRoute>
                    <NotFound />
                  </LazyRoute>
                } />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AppProvider>
      </EnhancedThemeProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
