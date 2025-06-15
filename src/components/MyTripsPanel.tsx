
import React from 'react';
import { motion } from 'framer-motion';
import { Ticket, Calendar, Clock, QrCode, Download, X } from 'lucide-react';

const MyTripsPanel: React.FC = () => {
  const upcomingTrips = [
    {
      id: '1',
      route: '42A',
      from: 'Central Station',
      to: 'Airport Terminal',
      date: '2024-06-16',
      time: '09:30',
      fare: '$4.50',
      status: 'confirmed'
    },
    {
      id: '2',
      route: '15B',
      from: 'Downtown Plaza',
      to: 'University Campus',
      date: '2024-06-18',
      time: '14:15',
      fare: '$3.25',
      status: 'confirmed'
    }
  ];

  const pastTrips = [
    {
      id: '3',
      route: '33C',
      from: 'Mall Plaza',
      to: 'Tech Park',
      date: '2024-06-14',
      time: '16:45',
      fare: '$3.75',
      status: 'completed'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Upcoming Trips */}
      <div>
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Upcoming Trips</h3>
        <div className="space-y-4">
          {upcomingTrips.map((trip) => (
            <motion.div
              key={trip.id}
              className="glass rounded-2xl p-4 border border-white/20 dark:border-gray-700/50 hover:bg-white/10 dark:hover:bg-black/20 transition-all duration-300"
              whileHover={{ scale: 1.01, y: -2 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-red-500/20 p-3 rounded-xl">
                    <Ticket className="h-5 w-5 text-red-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Route {trip.route}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{trip.from} → {trip.to}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="flex items-center text-xs text-gray-500">
                        <Calendar className="h-3 w-3 mr-1" />
                        {trip.date}
                      </span>
                      <span className="flex items-center text-xs text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        {trip.time}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-gray-900 dark:text-white">{trip.fare}</span>
                  <div className="flex space-x-1">
                    <button className="p-2 rounded-lg bg-blue-500/20 text-blue-500 hover:bg-blue-500/30 transition-colors">
                      <QrCode className="h-4 w-4" />
                    </button>
                    <button className="p-2 rounded-lg bg-green-500/20 text-green-500 hover:bg-green-500/30 transition-colors">
                      <Download className="h-4 w-4" />
                    </button>
                    <button className="p-2 rounded-lg bg-red-500/20 text-red-500 hover:bg-red-500/30 transition-colors">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Past Trips */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Past Trips</h3>
        <div className="space-y-3">
          {pastTrips.map((trip) => (
            <div
              key={trip.id}
              className="glass rounded-2xl p-4 border border-white/20 dark:border-gray-700/50 opacity-75"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-500/20 p-3 rounded-xl">
                    <Ticket className="h-5 w-5 text-gray-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Route {trip.route}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{trip.from} → {trip.to}</p>
                    <span className="text-xs text-gray-500">{trip.date} at {trip.time}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-gray-900 dark:text-white">{trip.fare}</span>
                  <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                    Completed
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default MyTripsPanel;
