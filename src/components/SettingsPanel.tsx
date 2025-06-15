
import React from 'react';
import { motion } from 'framer-motion';
import { Bell } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEnhancedTheme } from '@/contexts/EnhancedThemeContext';
import AccentColorPicker from '@/components/ui/AccentColorPicker';

const SettingsPanel: React.FC = () => {
  const { theme, toggleTheme } = useEnhancedTheme();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <Card className="glass border-white/20 dark:border-gray-700/50">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">Theme & Appearance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">Dark Mode</span>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              {theme === 'dark' ? '🌙' : '☀️'}
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">Accent Color</span>
            <AccentColorPicker />
          </div>
        </CardContent>
      </Card>

      <Card className="glass border-white/20 dark:border-gray-700/50">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bell className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              <span className="text-gray-700 dark:text-gray-300">ETA Alerts</span>
            </div>
            <input 
              type="checkbox" 
              className="rounded border-gray-300 text-red-500 focus:ring-red-500" 
              defaultChecked 
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bell className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              <span className="text-gray-700 dark:text-gray-300">Service Updates</span>
            </div>
            <input 
              type="checkbox" 
              className="rounded border-gray-300 text-red-500 focus:ring-red-500" 
              defaultChecked 
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SettingsPanel;
