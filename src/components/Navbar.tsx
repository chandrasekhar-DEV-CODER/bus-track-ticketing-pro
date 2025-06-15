
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import AccentColorPicker from './ui/AccentColorPicker';
import SmartBusLogo from './ui/SmartBusLogo';
import ProfileMenu from './ui/ProfileMenu';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Book Ticket', path: '/book-ticket' },
    { name: 'Track Bus', path: '/track-bus' },
    { name: 'My Tickets', path: '/my-tickets' },
    { name: 'Support', path: '/support' },
  ];

  return (
    <nav className="glass-nav sticky top-0 z-40 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="hover-target focus-ring rounded-xl">
              <SmartBusLogo size="sm" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 text-sm font-medium transition-all duration-300 hover-target relative group rounded-lg focus-ring ${
                  location.pathname === link.path
                    ? 'text-white shadow-lg'
                    : 'text-gray-700 dark:text-gray-300 hover:text-white dark:hover:text-white'
                }`}
                style={{
                  backgroundColor: location.pathname === link.path ? 'var(--accent-primary)' : 'transparent',
                }}
              >
                {link.name}
                {location.pathname !== link.path && (
                  <span 
                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                    style={{ backgroundColor: 'var(--accent-primary)' }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Right Side Controls */}
          <div className="hidden md:flex items-center space-x-4">
            <AccentColorPicker />
            <ProfileMenu />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <AccentColorPicker />
            <ProfileMenu />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus-ring rounded-lg p-2 hover-target glass"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/20 dark:border-gray-800/50 mt-2 pt-2"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-4 py-3 text-base font-medium transition-all duration-300 hover-target rounded-xl focus-ring ${
                    location.pathname === link.path
                      ? 'text-white shadow-lg'
                      : 'text-gray-700 dark:text-gray-300 hover:text-white'
                  }`}
                  style={{
                    backgroundColor: location.pathname === link.path ? 'var(--accent-primary)' : 'transparent',
                  }}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
