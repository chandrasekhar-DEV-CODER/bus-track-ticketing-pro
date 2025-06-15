
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Ticket, MapPin, Clock, Award } from 'lucide-react';

interface StatsData {
  totalTrips: number;
  totalDistance: number;
  timeSaved: number;
  carbonSaved: number;
}

const ProfileStatsWidget: React.FC = () => {
  // Mock stats data - replace with actual data from context/API
  const stats: StatsData = {
    totalTrips: 42,
    totalDistance: 1250,
    timeSaved: 18,
    carbonSaved: 2.4
  };

  const statItems = [
    {
      icon: Ticket,
      label: 'Total Trips',
      value: stats.totalTrips.toString(),
      unit: 'trips',
      color: 'text-blue-500',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20'
    },
    {
      icon: MapPin,
      label: 'Distance Traveled',
      value: stats.totalDistance.toString(),
      unit: 'km',
      color: 'text-green-500',
      bgColor: 'bg-green-100 dark:bg-green-900/20'
    },
    {
      icon: Clock,
      label: 'Time Saved',
      value: stats.timeSaved.toString(),
      unit: 'hours',
      color: 'text-orange-500',
      bgColor: 'bg-orange-100 dark:bg-orange-900/20'
    },
    {
      icon: Award,
      label: 'Carbon Saved',
      value: stats.carbonSaved.toString(),
      unit: 'kg CO₂',
      color: 'text-purple-500',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card className="glass border-white/20 dark:border-gray-700/50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Your Impact
            </h3>
            <Award className="h-5 w-5 text-red-500" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {statItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`${item.bgColor} w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3`}>
                  <item.icon className={`h-6 w-6 ${item.color}`} />
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {item.value}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {item.unit}
                  </p>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {item.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl">
            <p className="text-sm text-gray-700 dark:text-gray-300 text-center">
              🌱 You've helped reduce carbon emissions by choosing public transport!
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProfileStatsWidget;
