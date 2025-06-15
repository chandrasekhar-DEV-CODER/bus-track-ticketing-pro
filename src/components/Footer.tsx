
import { Link } from 'react-router-dom';
import { Bus, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:bg-slate-950 text-white py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Bus className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold text-white">SmartBus</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Revolutionizing public transportation with smart technology, 
              real-time tracking, and seamless user experience for modern commuters.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-gray-400">
                <Phone className="h-4 w-4 mr-2" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Mail className="h-4 w-4 mr-2" />
                <span>support@smartbus.com</span>
              </div>
              <div className="flex items-center text-gray-400">
                <MapPin className="h-4 w-4 mr-2" />
                <span>123 Transit Ave, City Center</span>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/book-ticket" className="block text-gray-400 hover:text-blue-400 transition-colors">
                Book Ticket
              </Link>
              <Link to="/track-bus" className="block text-gray-400 hover:text-blue-400 transition-colors">
                Track Bus
              </Link>
              <Link to="/my-tickets" className="block text-gray-400 hover:text-blue-400 transition-colors">
                My Tickets
              </Link>
              <Link to="/support" className="block text-gray-400 hover:text-blue-400 transition-colors">
                Support
              </Link>
            </div>
          </div>
          
          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Support</h3>
            <div className="space-y-2">
              <Link to="/support" className="block text-gray-400 hover:text-blue-400 transition-colors">
                Help Center
              </Link>
              <a href="#" className="block text-gray-400 hover:text-blue-400 transition-colors">
                Contact Us
              </a>
              <a href="#" className="block text-gray-400 hover:text-blue-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="block text-gray-400 hover:text-blue-400 transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            &copy; 2024 SmartBus. All rights reserved. Built with ❤️ for modern commuters.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
