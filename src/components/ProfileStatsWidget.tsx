
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, TrendingUp, Leaf, DollarSign, Award, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ProfileStatsWidget = () => {
  const [isExporting, setIsExporting] = useState(false);

  const stats = {
    totalRides: 47,
    totalSpent: 142.75,
    carbonSaved: 23.4, // kg CO2
    loyaltyPoints: 315,
    favoriteRoute: '42A',
    avgRidesPerWeek: 8.2
  };

  const badges = [
    { id: 'eco-warrior', name: 'Eco Warrior', icon: Leaf, description: '20+ eco-friendly rides', earned: true },
    { id: 'frequent-rider', name: 'Frequent Rider', icon: TrendingUp, description: '50+ total rides', earned: false },
    { id: 'peak-avoider', name: 'Peak Avoider', icon: Calendar, description: 'Rides during off-peak hours', earned: true },
    { id: 'group-leader', name: 'Group Leader', icon: Award, description: '10+ group bookings', earned: true }
  ];

  const exportRideHistory = async () => {
    setIsExporting(true);
    
    // Simulate export process
    setTimeout(() => {
      const data = {
        user: 'Sarah Johnson',
        exportDate: new Date().toISOString(),
        rides: [
          { date: '2024-06-14', route: '33C', from: 'Mall Plaza', to: 'Tech Park', fare: 3.75 },
          { date: '2024-06-12', route: '42A', from: 'Central Station', to: 'Airport', fare: 4.50 },
          // Add more mock data...
        ],
        summary: stats
      };
      
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'ride-history.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      setIsExporting(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Stats Dashboard */}
      <Card className="glass border-white/20 dark:border-gray-700/50">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Your Journey Stats
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <motion.div 
              className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl"
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.totalRides}</div>
              <div className="text-sm text-blue-800 dark:text-blue-300">Total Rides</div>
            </motion.div>
            
            <motion.div 
              className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl"
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">${stats.totalSpent}</div>
              <div className="text-sm text-green-800 dark:text-green-300">Total Spent</div>
            </motion.div>
            
            <motion.div 
              className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl"
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats.carbonSaved}kg</div>
              <div className="text-sm text-purple-800 dark:text-purple-300">CO₂ Saved</div>
            </motion.div>
            
            <motion.div 
              className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-xl"
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{stats.loyaltyPoints}</div>
              <div className="text-sm text-orange-800 dark:text-orange-300">Loyalty Points</div>
            </motion.div>
            
            <motion.div 
              className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl"
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.favoriteRoute}</div>
              <div className="text-sm text-red-800 dark:text-red-300">Favorite Route</div>
            </motion.div>
            
            <motion.div 
              className="bg-teal-50 dark:bg-teal-900/20 p-4 rounded-xl"
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">{stats.avgRidesPerWeek}</div>
              <div className="text-sm text-teal-800 dark:text-teal-300">Rides/Week</div>
            </motion.div>
          </div>
        </CardContent>
      </Card>

      {/* Loyalty Badges */}
      <Card className="glass border-white/20 dark:border-gray-700/50">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white flex items-center">
            <Award className="h-5 w-5 mr-2" />
            Achievement Badges
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {badges.map((badge, index) => (
              <motion.div
                key={badge.id}
                className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                  badge.earned 
                    ? 'bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-300 dark:border-yellow-600' 
                    : 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 opacity-60'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: badge.earned ? 1.02 : 1 }}
              >
                <div className="flex items-center space-x-3">
                  <badge.icon className={`h-6 w-6 ${badge.earned ? 'text-yellow-600 dark:text-yellow-400' : 'text-gray-400'}`} />
                  <div>
                    <h4 className={`font-semibold ${badge.earned ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}>
                      {badge.name}
                    </h4>
                    <p className={`text-sm ${badge.earned ? 'text-gray-600 dark:text-gray-300' : 'text-gray-400'}`}>
                      {badge.description}
                    </p>
                  </div>
                  {badge.earned && (
                    <div className="ml-auto">
                      <span className="text-yellow-500 text-xl">🏆</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card className="glass border-white/20 dark:border-gray-700/50">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white flex items-center">
            <Download className="h-5 w-5 mr-2" />
            Export Data
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400">
            Download your complete ride history and statistics for personal records or tax purposes.
          </p>
          
          <div className="flex space-x-4">
            <motion.button
              onClick={exportRideHistory}
              disabled={isExporting}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isExporting ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <Download className="h-4 w-4" />
              )}
              <span>{isExporting ? 'Exporting...' : 'Export JSON'}</span>
            </motion.button>
            
            <button className="flex items-center space-x-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <Download className="h-4 w-4" />
              <span>Export CSV</span>
            </button>
          </div>
          
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Exported data includes ride history, payments, and environmental impact metrics.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileStatsWidget;
