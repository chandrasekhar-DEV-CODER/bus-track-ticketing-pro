
import React from 'react';
import { motion } from 'framer-motion';
import { Ticket, Settings, Heart } from 'lucide-react';

interface ProfileTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'trips', label: 'My Trips', icon: Ticket },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'preferences', label: 'Preferences', icon: Heart }
  ];

  return (
    <div className="glass rounded-2xl p-1 mb-6 border border-white/20 dark:border-gray-700/50">
      <div className="flex space-x-1">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-200 flex-1 justify-center ${
              activeTab === tab.id
                ? 'bg-red-500 text-white shadow-lg'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/10 dark:hover:bg-black/20'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <tab.icon className="h-4 w-4" />
            <span className="font-medium">{tab.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default ProfileTabs;
