
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TicketsPage from '../components/TicketsPage';

const MyTicketsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
      <Navbar />
      <div className="dark:bg-slate-900 min-h-screen">
        <TicketsPage />
      </div>
      <Footer />
    </div>
  );
};

export default MyTicketsPage;
