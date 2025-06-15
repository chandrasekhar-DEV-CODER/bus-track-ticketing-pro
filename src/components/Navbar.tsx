
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Bus } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';
import ProfileMenu from './ui/ProfileMenu';
import SmartBusLogo from './ui/SmartBusLogo';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Book Ticket', path: '/book-ticket' },
    { name: 'Track Bus', path: '/track-bus' },
    { name: 'My Tickets', path: '/my-tickets' },
    { name: 'Support', path: '/support' },
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-white/10 dark:border-gray-700/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <SmartBusLogo />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.path)}
                className={`text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors font-medium relative ${
                  isActivePath(item.path) ? 'text-red-500 dark:text-red-400' : ''
                }`}
              >
                {item.name}
                {isActivePath(item.path) && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-red-500"
                    layoutId="activeTab"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Right side - Profile or Login */}
          <div className="hidden lg:flex items-center space-x-4">
            {user ? (
              <ProfileMenu />
            ) : (
              <button
                onClick={() => handleNavClick('/login')}
                className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition-colors focus-ring"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus-ring"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass border-t border-white/10 dark:border-gray-700/30"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.path)}
                  className={`block w-full text-left px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-medium ${
                    isActivePath(item.path) ? 'bg-red-500/10 text-red-500 dark:text-red-400' : ''
                  }`}
                >
                  {item.name}
                </button>
              ))}
              
              {/* Mobile Profile or Login */}
              <div className="pt-4 border-t border-white/10 dark:border-gray-700/30">
                {user ? (
                  <ProfileMenu isMobile />
                ) : (
                  <button
                    onClick={() => handleNavClick('/login')}
                    className="w-full bg-red-500 text-white px-4 py-3 rounded-lg font-medium hover:bg-red-600 transition-colors focus-ring"
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
