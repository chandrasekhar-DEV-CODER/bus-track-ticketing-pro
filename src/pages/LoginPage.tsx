
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LoginPageComponent from '../components/LoginPage';

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
      <Navbar />
      <div className="dark:bg-slate-900 min-h-screen">
        <LoginPageComponent />
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
