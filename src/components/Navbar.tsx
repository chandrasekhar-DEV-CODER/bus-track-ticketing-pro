import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEnhancedTheme } from '../contexts/EnhancedThemeContext';
import AccentColorPicker from './ui/AccentColorPicker';
import MicroButton from './ui/MicroButton';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useEnhancedTheme();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Book Ticket', path: '/book-ticket' },
    { name: 'Track Bus', path: '/track-bus' },
    { name: 'My Tickets', path: '/my-tickets' },
    { name: 'Support', path: '/support' },
  ];

  return (
    <nav className="bg-white dark:bg-slate-900 shadow-lg sticky top-0 z-40 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 hover-target">
              <div className="bg-blue-600 p-2 rounded-lg">
                <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-lg">SB</span>
                </div>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">SmartBus</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 text-sm font-medium transition-all duration-200 hover-target relative group ${
                  location.pathname === link.path
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                {link.name}
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600 dark:bg-blue-400 transform scale-x-0 transition-transform group-hover:scale-x-100"></span>
              </Link>
            ))}
          </div>

          {/* Theme Controls */}
          <div className="hidden md:flex items-center space-x-4">
            <AccentColorPicker />
            <MicroButton
              onClick={toggleTheme}
              variant="outline"
              size="sm"
              className="p-2"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </MicroButton>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <AccentColorPicker />
            <MicroButton
              onClick={toggleTheme}
              variant="outline"
              size="sm"
              className="p-2"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </MicroButton>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none hover-target"
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
            className="md:hidden border-t border-gray-200 dark:border-gray-700"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-3 py-2 text-base font-medium transition-colors duration-200 hover-target ${
                    location.pathname === link.path
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                      : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
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
