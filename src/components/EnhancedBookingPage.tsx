import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Clock, Users, CreditCard, QrCode, TrendingUp, AlertTriangle, Star, Calendar, ArrowRight, Filter, Heart, Percent, Info, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
const EnhancedBookingPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [passengers, setPassengers] = useState(1);
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [showPromoTooltip, setShowPromoTooltip] = useState(false);
  const popularRoutes = [{
    id: '42A',
    name: 'Central Station → Airport',
    bookingsLastHour: 47,
    seatsLeft: 12,
    fare: 4.50,
    surgePricing: false,
    demand: 65,
    savings: 0.75
  }, {
    id: '15B',
    name: 'Downtown → University',
    bookingsLastHour: 32,
    seatsLeft: 8,
    fare: 3.25,
    surgePricing: true,
    demand: 85,
    surgeMultiplier: 1.3
  }, {
    id: '33C',
    name: 'Mall Plaza → Tech Park',
    bookingsLastHour: 28,
    seatsLeft: 15,
    fare: 3.75,
    surgePricing: false,
    demand: 55,
    ecoFriendly: true
  }, {
    id: '88D',
    name: 'Railway → Beach Resort',
    bookingsLastHour: 19,
    seatsLeft: 20,
    fare: 5.25,
    surgePricing: false,
    demand: 40,
    premium: true
  }];
  const allRoutes = [...popularRoutes];
  const filteredRoutes = allRoutes.filter(route => route.id.toLowerCase().includes(searchQuery.toLowerCase()) || route.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const groupDiscounts = {
    2: 0.05,
    3: 0.10,
    4: 0.15,
    5: 0.20
  };
  const promoCodes = {
    'STUDENT20': 0.20,
    'FIRST10': 0.10,
    'WEEKEND15': 0.15
  };
  const calculateFare = (baseFare, passengers, route) => {
    let totalFare = baseFare * passengers;

    // Apply surge pricing
    if (route?.surgePricing && route?.surgeMultiplier) {
      totalFare *= route.surgeMultiplier;
    }

    // Apply group discount
    const groupDiscount = groupDiscounts[passengers] || 0;
    totalFare *= 1 - groupDiscount;

    // Apply promo discount
    totalFare *= 1 - promoDiscount;
    return totalFare;
  };
  const handlePromoCode = code => {
    const discount = promoCodes[code.toUpperCase()];
    if (discount) {
      setPromoDiscount(discount);
      setShowPromoTooltip(true);
      setTimeout(() => setShowPromoTooltip(false), 3000);
    } else {
      setPromoDiscount(0);
    }
  };
  const renderSearchAndPopular = () => <div className="space-y-8">
      {/* Enhanced Search Bar */}
      <motion.div className="relative" initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }}>
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input type="text" placeholder="Search routes by ID, origin, or destination..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-4 glass border border-white/30 dark:border-gray-600/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 text-gray-900 dark:text-white placeholder-gray-500 text-lg transition-all duration-300 hover:border-white/50 dark:hover:border-gray-500/70" />
      </motion.div>

      {/* Popular Routes with Enhanced Cards */}
      <div>
        <div className="flex items-center mb-6">
          <TrendingUp className="h-6 w-6 text-red-500 mr-3" />
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Popular Right Now</h3>
          <span className="text-sm text-gray-500 dark:text-gray-400 ml-3 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">Live data</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {popularRoutes.map((route, index) => <motion.div key={route.id} className="group glass rounded-3xl p-6 border border-white/20 dark:border-gray-700/50 hover:bg-white/30 dark:hover:bg-black/40 transition-all duration-500 cursor-pointer relative overflow-hidden" whileHover={{
          scale: 1.02,
          y: -4,
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
        }} initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: index * 0.1
        }} onClick={() => setSelectedRoute(route)}>
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Special Badges */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white">{route.id}</h4>
                  {route.ecoFriendly && <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-2 py-1 rounded-lg text-xs font-medium flex items-center">
                      🌱 Eco
                    </span>}
                  {route.premium && <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400 px-2 py-1 rounded-lg text-xs font-medium flex items-center">
                      <Star className="h-3 w-3 mr-1" />
                      Premium
                    </span>}
                </div>
                {route.surgePricing && <motion.div className="flex items-center bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-400 px-3 py-1 rounded-full text-xs font-medium" animate={{
              scale: [1, 1.05, 1]
            }} transition={{
              duration: 2,
              repeat: Infinity
            }}>
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    Surge {route.surgeMultiplier}x
                  </motion.div>}
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-lg">{route.name}</p>
              
              {/* Live Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div className="flex items-center text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  {route.bookingsLastHour} bookings/hr
                </div>
                <div className="flex items-center text-gray-500">
                  <Users className="h-4 w-4 mr-1" />
                  {route.seatsLeft} seats left
                </div>
              </div>
              
              {/* Enhanced Pricing */}
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    ${route.surgePricing ? (route.fare * route.surgeMultiplier).toFixed(2) : route.fare.toFixed(2)}
                  </span>
                  {route.savings && <span className="text-sm text-green-600 dark:text-green-400">
                      Save ${route.savings.toFixed(2)} vs taxi
                    </span>}
                </div>
                <button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform group-hover:scale-105 shadow-lg hover:shadow-xl">
                  Book Now
                </button>
              </div>
            </motion.div>)}
        </div>
      </div>

      {/* All Routes Grid with Better Typography */}
      <div>
        <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">All Routes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRoutes.map((route, index) => <motion.div key={route.id} className="glass rounded-2xl p-5 border border-white/20 dark:border-gray-700/50 hover:bg-white/25 dark:hover:bg-black/35 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-red-500/10" whileHover={{
          scale: 1.03,
          y: -2
        }} initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.3 + index * 0.05
        }} onClick={() => setSelectedRoute(route)}>
              <div className="flex items-start justify-between mb-3">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">{route.id}</h4>
                <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-2 py-1 rounded-full font-medium">
                  {route.seatsLeft} seats
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">{route.name}</p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  ${route.fare.toFixed(2)}
                </span>
                <ArrowRight className="h-4 w-4 text-red-500 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>)}
        </div>
      </div>
    </div>;
  const renderRouteDetails = () => <div className="space-y-6">
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} className="glass rounded-3xl p-8 border border-white/20 dark:border-gray-700/50">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Route {selectedRoute.id}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-lg">{selectedRoute.name}</p>
          </div>
          <button onClick={() => setSelectedRoute(null)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            ← Back
          </button>
        </div>

        {/* Enhanced Group Booking Section */}
        <div className="mb-8">
          <label className="block text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Number of Passengers
          </label>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <Users className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              <select value={passengers} onChange={e => setPassengers(parseInt(e.target.value))} className="p-3 glass border border-white/20 dark:border-gray-700/50 rounded-xl text-gray-900 dark:text-white text-lg min-w-[120px]">
                {[1, 2, 3, 4, 5].map(num => <option key={num} value={num}>{num} passenger{num > 1 ? 's' : ''}</option>)}
              </select>
            </div>
            {passengers > 1 && <motion.span className="text-lg text-green-600 dark:text-green-400 font-medium flex items-center" initial={{
            opacity: 0,
            scale: 0.8
          }} animate={{
            opacity: 1,
            scale: 1
          }}>
                <Sparkles className="h-4 w-4 mr-1" />
                Group discount: {groupDiscounts[passengers] * 100}% off!
              </motion.span>}
          </div>
        </div>

        {/* Promo Code Section */}
        <div className="mb-8">
          <label className="block text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Promo Code
          </label>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input type="text" placeholder="Enter promo code..." value={promoCode} onChange={e => {
              setPromoCode(e.target.value);
              handlePromoCode(e.target.value);
            }} className="w-full pl-10 pr-4 py-3 glass border border-white/20 dark:border-gray-700/50 rounded-xl text-gray-900 dark:text-white placeholder-gray-500" />
            </div>
            {promoDiscount > 0 && <motion.span className="text-green-600 dark:text-green-400 font-medium flex items-center" initial={{
            opacity: 0,
            x: 20
          }} animate={{
            opacity: 1,
            x: 0
          }}>
                <Sparkles className="h-4 w-4 mr-1" />
                {promoDiscount * 100}% off applied!
              </motion.span>}
          </div>
          <p className="text-sm text-gray-500 mt-2">Try: STUDENT20, FIRST10, WEEKEND15</p>
        </div>

        {/* Enhanced Fare Calculation with Tooltips */}
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 mb-8">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Fare Breakdown</h4>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="flex items-center">
                Base fare (x{passengers})
                {selectedRoute.surgePricing && <div className="relative ml-2">
                    <Info className="h-4 w-4 text-orange-500 cursor-help" />
                    <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                      {selectedRoute.surgeMultiplier}x surge due to high demand
                    </div>
                  </div>}
              </span>
              <span className="font-mono">
                ${selectedRoute.surgePricing ? (selectedRoute.fare * selectedRoute.surgeMultiplier * passengers).toFixed(2) : (selectedRoute.fare * passengers).toFixed(2)}
              </span>
            </div>
            
            {passengers > 1 && <div className="flex justify-between items-center text-green-600 dark:text-green-400">
                <span>Group discount ({groupDiscounts[passengers] * 100}%)</span>
                <span className="font-mono">
                  -${(selectedRoute.fare * passengers * groupDiscounts[passengers] * (selectedRoute.surgePricing ? selectedRoute.surgeMultiplier : 1)).toFixed(2)}
                </span>
              </div>}
            
            {promoDiscount > 0 && <div className="flex justify-between items-center text-green-600 dark:text-green-400">
                <span>Promo discount ({promoDiscount * 100}%)</span>
                <span className="font-mono">
                  -${(calculateFare(selectedRoute.fare, passengers, selectedRoute) * promoDiscount / (1 - promoDiscount)).toFixed(2)}
                </span>
              </div>}
            
            <div className="border-t pt-3 flex justify-between items-center font-bold text-xl">
              <span>Total</span>
              <span className="font-mono text-red-600 dark:text-red-400">
                ${calculateFare(selectedRoute.fare, passengers, selectedRoute).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Enhanced Action Buttons */}
        <div className="flex space-x-4">
          <button className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-4 px-8 rounded-xl font-bold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
            Continue to Booking
          </button>
          <button className="px-8 py-4 glass border border-white/20 dark:border-gray-700/50 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-200 font-semibold">
            Express Checkout
          </button>
        </div>
      </motion.div>
    </div>;
  return <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{
        opacity: 0,
        y: -20
      }} animate={{
        opacity: 1,
        y: 0
      }} className="mb-10 my-0 py-[30px] rounded-sm">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">Book Your Ticket</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">Choose from our routes with real-time availability and dynamic pricing</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!selectedRoute ? <motion.div key="search" initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }}>
              {renderSearchAndPopular()}
            </motion.div> : <motion.div key="details" initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }}>
              {renderRouteDetails()}
            </motion.div>}
        </AnimatePresence>
      </div>
    </div>;
};
export default EnhancedBookingPage;