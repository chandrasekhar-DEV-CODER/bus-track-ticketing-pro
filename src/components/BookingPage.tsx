
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  MapPin, 
  Clock, 
  Users, 
  CreditCard, 
  QrCode, 
  TrendingUp,
  AlertTriangle,
  Star,
  Calendar,
  ArrowRight,
  Filter,
  Heart
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const BookingPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [passengers, setPassengers] = useState(1);
  const [currentStep, setCurrentStep] = useState(1);

  const popularRoutes = [
    {
      id: '42A',
      name: 'Central Station → Airport',
      bookingsLastHour: 47,
      seatsLeft: 12,
      fare: 4.50,
      surgePricing: false,
      demand: 65
    },
    {
      id: '15B',
      name: 'Downtown → University',
      bookingsLastHour: 32,
      seatsLeft: 8,
      fare: 3.25,
      surgePricing: true,
      demand: 85
    },
    {
      id: '33C',
      name: 'Mall Plaza → Tech Park',
      bookingsLastHour: 28,
      seatsLeft: 15,
      fare: 3.75,
      surgePricing: false,
      demand: 55
    },
    {
      id: '88D',
      name: 'Railway → Beach Resort',
      bookingsLastHour: 19,
      seatsLeft: 20,
      fare: 5.25,
      surgePricing: false,
      demand: 40
    }
  ];

  const allRoutes = [
    ...popularRoutes,
    {
      id: '101X',
      name: 'Airport → City Center',
      seatsLeft: 25,
      fare: 4.00,
      surgePricing: false,
      demand: 60
    },
    {
      id: '77E',
      name: 'University → Shopping Mall',
      seatsLeft: 18,
      fare: 2.75,
      surgePricing: false,
      demand: 45
    }
  ];

  const filteredRoutes = allRoutes.filter(route => 
    route.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    route.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupDiscounts = {
    2: 0.05, // 5% for 2 passengers
    3: 0.10, // 10% for 3 passengers
    4: 0.15, // 15% for 4 passengers
    5: 0.20  // 20% for 5 passengers
  };

  const calculateFare = (baseFare, passengers) => {
    const discount = groupDiscounts[passengers] || 0;
    return baseFare * passengers * (1 - discount);
  };

  const recommendedRoutes = [
    { id: '22F', name: 'Tech Park → Downtown', reason: 'Similar destination' },
    { id: '44G', name: 'Central → University', reason: 'Popular combo' }
  ];

  const renderSearchAndPopular = () => (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search routes by ID, origin, or destination..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 glass border border-white/20 dark:border-gray-700/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500/50 text-gray-900 dark:text-white placeholder-gray-500"
        />
      </div>

      {/* Popular Routes */}
      <div>
        <div className="flex items-center mb-4">
          <TrendingUp className="h-5 w-5 text-red-500 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Popular Right Now</h3>
          <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">• Live booking data</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {popularRoutes.map((route) => (
            <motion.div
              key={route.id}
              className="glass rounded-2xl p-4 border border-white/20 dark:border-gray-700/50 hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedRoute(route)}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">{route.id}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{route.name}</p>
                </div>
                {route.surgePricing && (
                  <div className="flex items-center bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-400 px-2 py-1 rounded-full text-xs">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    Surge
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-gray-500">
                  {route.bookingsLastHour} bookings in last hour
                </span>
                <span className="text-xs text-gray-500">
                  {route.seatsLeft} seats left
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  ${route.fare.toFixed(2)}
                </span>
                <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200">
                  Book Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* All Routes Grid */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">All Routes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRoutes.map((route) => (
            <motion.div
              key={route.id}
              className="glass rounded-2xl p-4 border border-white/20 dark:border-gray-700/50 hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedRoute(route)}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-bold text-gray-900 dark:text-white">{route.id}</h4>
                <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-2 py-1 rounded-full">
                  {route.seatsLeft} seats
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{route.name}</p>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-900 dark:text-white">
                  ${route.fare.toFixed(2)}
                </span>
                <button className="text-red-500 hover:text-red-600 text-sm font-medium">
                  Select →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderRouteDetails = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-6 border border-white/20 dark:border-gray-700/50"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Route {selectedRoute.id}</h3>
            <p className="text-gray-600 dark:text-gray-400">{selectedRoute.name}</p>
          </div>
          <button
            onClick={() => setSelectedRoute(null)}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            ← Back
          </button>
        </div>

        {/* Group Booking Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Number of Passengers
          </label>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              <select
                value={passengers}
                onChange={(e) => setPassengers(parseInt(e.target.value))}
                className="p-2 glass border border-white/20 dark:border-gray-700/50 rounded-lg text-gray-900 dark:text-white"
              >
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>{num} passenger{num > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>
            {passengers > 1 && (
              <span className="text-sm text-green-600 dark:text-green-400">
                Group discount: {(groupDiscounts[passengers] * 100)}% off!
              </span>
            )}
          </div>
        </div>

        {/* Fare Calculation */}
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span>Base fare (x{passengers})</span>
            <span>${(selectedRoute.fare * passengers).toFixed(2)}</span>
          </div>
          {passengers > 1 && (
            <div className="flex justify-between items-center mb-2 text-green-600 dark:text-green-400">
              <span>Group discount ({(groupDiscounts[passengers] * 100)}%)</span>
              <span>-${(selectedRoute.fare * passengers * groupDiscounts[passengers]).toFixed(2)}</span>
            </div>
          )}
          <div className="border-t pt-2 flex justify-between items-center font-bold text-lg">
            <span>Total</span>
            <span>${calculateFare(selectedRoute.fare, passengers).toFixed(2)}</span>
          </div>
        </div>

        {/* Smart Recommendations */}
        <div className="mb-6">
          <h4 className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            <Heart className="h-4 w-4 mr-2 text-red-500" />
            People also book
          </h4>
          <div className="space-y-2">
            {recommendedRoutes.map((rec) => (
              <div key={rec.id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800/30 rounded-lg">
                <div>
                  <span className="font-medium text-gray-900 dark:text-white">{rec.id}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">{rec.name}</span>
                </div>
                <span className="text-xs text-gray-500">{rec.reason}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex space-x-4">
          <button className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-200">
            Continue to Booking
          </button>
          <button className="px-6 py-3 glass border border-white/20 dark:border-gray-700/50 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-200">
            Express Checkout
          </button>
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Book Your Ticket</h1>
          <p className="text-gray-600 dark:text-gray-400">Choose from our routes with real-time availability</p>
        </div>

        <AnimatePresence mode="wait">
          {!selectedRoute ? (
            <motion.div
              key="search"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {renderSearchAndPopular()}
            </motion.div>
          ) : (
            <motion.div
              key="details"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {renderRouteDetails()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BookingPage;
