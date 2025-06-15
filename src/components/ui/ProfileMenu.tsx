
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, LogOut, Ticket, Sun, Moon, Monitor, ChevronDown } from 'lucide-react';
import { useAppContext, useTheme } from '../../contexts/AppContext';

const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { state, dispatch } = useAppContext();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: 'SET_USER', payload: null });
    dispatch({ type: 'SET_COLLEGE', payload: null });
    dispatch({ type: 'SET_BOOKINGS', payload: [] });
    localStorage.clear();
    navigate('/login');
    setIsOpen(false);
  };

  const getThemeIcon = () => {
    switch (theme) {
      case 'light': return <Sun className="h-4 w-4" />;
      case 'dark': return <Moon className="h-4 w-4" />;
      default: return <Monitor className="h-4 w-4" />;
    }
  };

  const cycleTheme = () => {
    const themes: ('light' | 'dark' | 'system')[] = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  if (!state.user) {
    return (
      <Link
        to="/login"
        className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition-colors focus-ring"
      >
        Login
      </Link>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus-ring"
      >
        <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
          <User className="h-4 w-4 text-white" />
        </div>
        <span className="hidden md:block text-gray-700 dark:text-gray-300 font-medium">
          {state.user.name}
        </span>
        <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-50"
          >
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{state.user.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{state.user.email}</p>
                </div>
              </div>
            </div>

            <div className="py-2">
              <button
                onClick={cycleTheme}
                className="w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                {getThemeIcon()}
                <span className="ml-3 text-gray-700 dark:text-gray-300">
                  Theme: {theme.charAt(0).toUpperCase() + theme.slice(1)}
                </span>
              </button>

              <Link
                to="/profile"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <User className="h-4 w-4 text-gray-500" />
                <span className="ml-3 text-gray-700 dark:text-gray-300">Profile</span>
              </Link>

              <Link
                to="/my-tickets"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <Ticket className="h-4 w-4 text-gray-500" />
                <span className="ml-3 text-gray-700 dark:text-gray-300">My Tickets</span>
              </Link>

              <button
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-red-600 dark:text-red-400"
              >
                <LogOut className="h-4 w-4" />
                <span className="ml-3">Logout</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click outside to close */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default ProfileMenu;
