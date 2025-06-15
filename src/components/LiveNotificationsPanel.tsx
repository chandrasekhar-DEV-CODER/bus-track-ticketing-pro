
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, AlertTriangle, Info, CheckCircle, Zap } from 'lucide-react';

const LiveNotificationsPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'alert',
      title: 'Route 42A Delayed',
      message: '15 min delay due to traffic on Airport Road',
      time: '2 min ago',
      read: false
    },
    {
      id: 2,
      type: 'promotion',
      title: 'Weekend Pass 20% Off',
      message: 'Save on unlimited weekend rides until Sunday',
      time: '1 hour ago',
      read: false
    },
    {
      id: 3,
      type: 'info',
      title: 'New Route 99X Launch',
      message: 'Direct service to Tech District starting Monday',
      time: '3 hours ago',
      read: true
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type) => {
    switch (type) {
      case 'alert': return AlertTriangle;
      case 'promotion': return Zap;
      case 'info': return Info;
      default: return Bell;
    }
  };

  const getColor = (type) => {
    switch (type) {
      case 'alert': return 'text-orange-500';
      case 'promotion': return 'text-green-500';
      case 'info': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  };

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="relative glass p-3 rounded-full border border-white/20 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-200"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="absolute top-14 right-0 w-80 glass rounded-2xl border border-white/20 dark:border-gray-700/50 shadow-xl"
          >
            <div className="p-4 border-b border-white/20 dark:border-gray-700/50">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 dark:text-white">Live Updates</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              {notifications.map((notification) => {
                const Icon = getIcon(notification.type);
                return (
                  <motion.div
                    key={notification.id}
                    className={`p-4 border-b border-white/10 dark:border-gray-700/30 cursor-pointer hover:bg-white/10 dark:hover:bg-black/20 transition-colors ${
                      !notification.read ? 'bg-white/5 dark:bg-black/10' : ''
                    }`}
                    onClick={() => markAsRead(notification.id)}
                    whileHover={{ x: 2 }}
                  >
                    <div className="flex items-start space-x-3">
                      <Icon className={`h-4 w-4 mt-1 ${getColor(notification.type)}`} />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                          {notification.title}
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                          {notification.message}
                        </p>
                        <span className="text-xs text-gray-500 mt-2 block">
                          {notification.time}
                        </span>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LiveNotificationsPanel;
