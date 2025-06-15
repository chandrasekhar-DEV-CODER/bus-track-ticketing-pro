
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, CreditCard, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PreferencesPanel: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <Card className="glass border-white/20 dark:border-gray-700/50">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">Default Routes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <MapPin className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            <div className="flex-1">
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                Default Start
              </label>
              <select className="w-full p-2 rounded-lg glass border border-white/20 dark:border-gray-700/50 bg-white/50 dark:bg-black/50 text-gray-900 dark:text-white">
                <option value="downtown-plaza">Downtown Plaza</option>
                <option value="central-station">Central Station</option>
                <option value="university-campus">University Campus</option>
                <option value="mall-plaza">Mall Plaza</option>
              </select>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <MapPin className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            <div className="flex-1">
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                Default Destination
              </label>
              <select className="w-full p-2 rounded-lg glass border border-white/20 dark:border-gray-700/50 bg-white/50 dark:bg-black/50 text-gray-900 dark:text-white">
                <option value="tech-park">Tech Park</option>
                <option value="airport-terminal">Airport Terminal</option>
                <option value="business-district">Business District</option>
                <option value="shopping-center">Shopping Center</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="glass border-white/20 dark:border-gray-700/50">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">Payment & Language</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CreditCard className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              <span className="text-gray-700 dark:text-gray-300">Saved Payment Methods</span>
            </div>
            <button className="text-red-500 hover:text-red-600 font-medium transition-colors">
              Manage
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              <span className="text-gray-700 dark:text-gray-300">Language</span>
            </div>
            <select className="p-2 rounded-lg glass border border-white/20 dark:border-gray-700/50 bg-white/50 dark:bg-black/50 text-gray-900 dark:text-white">
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PreferencesPanel;
