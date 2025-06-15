
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
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
      <Navbar />
      <div className="dark:bg-slate-900">
        <LandingPage />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
