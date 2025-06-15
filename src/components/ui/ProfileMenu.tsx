
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Ticket, LogOut, Moon, Sun, ChevronDown } from 'lucide-react';
import { useEnhancedTheme } from '../../contexts/EnhancedThemeContext';
import { useApp } from '../../contexts/AppContext';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';

const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useEnhancedTheme();
  const { state, logout } = useApp();
  const { user } = state;

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const menuItems = [
    {
      icon: User,
      label: 'Profile',
      href: '/profile',
      onClick: () => setIsOpen(false)
    },
    {
      icon: Ticket,
      label: 'My Tickets',
      href: '/my-tickets',
      onClick: () => setIsOpen(false)
    }
  ];

  if (!user) {
    return (
      <Link
        to="/login"
        className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-white hover-target focus-ring transition-all duration-300"
        style={{ backgroundColor: 'transparent' }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--accent-primary)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        <Avatar className="w-8 h-8">
          <AvatarFallback className="bg-gray-200 dark:bg-gray-700">
            <User className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
        <span>Login</span>
      </Link>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg hover-target focus-ring transition-all duration-300"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Avatar className="w-8 h-8">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
            {user.name?.charAt(0) || 'U'}
          </AvatarFallback>
        </Avatar>
        <span className="hidden md:block text-sm font-medium text-gray-700 dark:text-gray-300">
          {user.name}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50"
          >
            {/* User Info */}
            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-gray-200 dark:bg-gray-700">
                    {user.name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-1">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={item.onClick}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <item.icon className="w-4 h-4 mr-3" />
                  {item.label}
                </Link>
              ))}

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 mr-3 text-yellow-500" />
                ) : (
                  <Moon className="w-4 h-4 mr-3 text-blue-600" />
                )}
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </button>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
              >
                <LogOut className="w-4 h-4 mr-3" />
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
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
