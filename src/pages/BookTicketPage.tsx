
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EnhancedBookingPage from '../components/EnhancedBookingPage';

const BookTicketPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
      <Navbar />
      <EnhancedBookingPage />
      <Footer />
    </div>
  );
};

export default BookTicketPage;
