
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import LandingPage from '../components/LandingPage';
import LoginPage from '../components/LoginPage';
import BookingPage from '../components/BookingPage';
import TrackingPage from '../components/TrackingPage';
import TicketsPage from '../components/TicketsPage';
import DriverPanel from '../components/DriverPanel';
import AdminDashboard from '../components/AdminDashboard';
import Navbar from '../components/Navbar';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/book" element={<BookingPage />} />
        <Route path="/track" element={<TrackingPage />} />
        <Route path="/tickets" element={<TicketsPage />} />
        <Route path="/driver" element={<DriverPanel />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
};

export default Index;
