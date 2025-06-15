
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TicketsPage from '../components/TicketsPage';

const MyTicketsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <TicketsPage />
      </main>
      <Footer />
    </div>
  );
};

export default MyTicketsPage;
