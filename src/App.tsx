
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { EnhancedThemeProvider } from "./contexts/EnhancedThemeContext";
import AnimatedCursor from "./components/ui/AnimatedCursor";
import Index from "./pages/Index";
import BookTicketPage from "./pages/BookTicketPage";
import TrackBusPage from "./pages/TrackBusPage";
import MyTicketsPage from "./pages/MyTicketsPage";
import LoginPage from "./pages/LoginPage";
import SupportPage from "./pages/SupportPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <EnhancedThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AnimatedCursor />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/book-ticket" element={<BookTicketPage />} />
            <Route path="/track-bus" element={<TrackBusPage />} />
            <Route path="/my-tickets" element={<MyTicketsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </EnhancedThemeProvider>
  </QueryClientProvider>
);

export default App;
