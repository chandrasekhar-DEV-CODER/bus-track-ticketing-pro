import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Clock, 
  Bus, 
  Navigation, 
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Cloud,
  Sun,
  Thermometer
} from 'lucide-react';
import { useBusSearch } from '../hooks/useBusSearch';
import SearchBar from './SearchBar';
import PopularRoutesWidget from './PopularRoutesWidget';
import FilterButtons from './FilterButtons';
import NearbyStopsWidget from './NearbyStopsWidget';

const TrackingPage = () => {
  const [selectedRoute, setSelectedRoute] = useState('42A');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [weather] = useState({ temp: 22, condition: 'Sunny', icon: Sun });
  
  const {
    searchQuery,
    setSearchQuery,
    filterStatus,
    setFilterStatus,
    filteredResults,
    popularRoutes,
    searchSuggestions,
  } = useBusSearch();

  const busData = {
    '42A': {
      currentLocation: 'Main Street Junction',
      nextStop: 'City Center Mall',
      eta: '5 minutes',
      progress: 75,
      status: 'On Time',
      passengers: 28,
      capacity: 40,
      coordinates: { lat: 37.7749, lng: -122.4194 },
      stops: [
        { name: 'Central Station', time: '08:00', status: 'completed' },
        { name: 'Downtown Plaza', time: '08:12', status: 'completed' },
        { name: 'Main Street Junction', time: '08:25', status: 'current' },
        { name: 'City Center Mall', time: '08:30', status: 'upcoming' },
        { name: 'Business District', time: '08:42', status: 'upcoming' },
        { name: 'Airport Terminal', time: '08:55', status: 'upcoming' }
      ]
    }
  };

  const currentBus = busData[selectedRoute as keyof typeof busData] || busData['42A'];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'current': return 'bg-blue-500 animate-pulse';
      case 'upcoming': return 'bg-gray-300';
      default: return 'bg-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'current': return <Bus className="h-4 w-4 text-blue-600" />;
      case 'upcoming': return <Clock className="h-4 w-4 text-gray-400" />;
      default: return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const handleSuggestionSelect = (suggestion: any) => {
    if (suggestion.type === 'route') {
      setSelectedRoute(suggestion.id);
    }
    setSearchQuery(suggestion.type === 'route' ? suggestion.id : suggestion.name);
  };

  const handleTrackRoute = (routeId: string) => {
    setSelectedRoute(routeId);
    setSearchQuery(routeId);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Live Bus Tracking
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Track your bus in real-time with smart search and live updates
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 space-y-4"
        >
          <div className="flex flex-col lg:flex-row items-center gap-4">
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              suggestions={searchSuggestions}
              onSuggestionSelect={handleSuggestionSelect}
            />
            <FilterButtons
              activeFilter={filterStatus}
              onFilterChange={setFilterStatus}
            />
          </div>
        </motion.div>

        {/* Popular Routes Widget */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <PopularRoutesWidget
            routes={popularRoutes}
            onTrackRoute={handleTrackRoute}
          />
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Map Section */}
          <div className="xl:col-span-3">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-gray-700/50 rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-white/10 dark:border-gray-700/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mr-4">Live Map</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                      <weather.icon className="h-4 w-4" />
                      <span>{weather.temp}°C • {weather.condition}</span>
                    </div>
                  </div>
                  <button
                    onClick={handleRefresh}
                    className={`p-2 rounded-lg bg-red-500/20 text-red-500 hover:bg-red-500/30 transition-colors ${
                      isRefreshing ? 'animate-spin' : ''
                    }`}
                  >
                    <RefreshCw className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              {/* Map Placeholder */}
              <div className="relative h-96 bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900/20 dark:to-green-900/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-16 w-16 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400 font-medium">Interactive Map</p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">Live GPS tracking integration</p>
                  </div>
                </div>
                
                {/* Mock Bus Location */}
                <motion.div 
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="bg-red-500 text-white p-3 rounded-full shadow-lg">
                    <Bus className="h-6 w-6" />
                  </div>
                </motion.div>
                
                {/* Mock Route Line */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <path
                    d="M 50 350 Q 200 200 350 100 Q 500 50 650 150"
                    stroke="#EF4444"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray="10,5"
                    className="animate-pulse"
                  />
                </svg>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Current Status */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-gray-700/50 rounded-2xl p-6 shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Bus {selectedRoute}</h3>
                <span className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                  {currentBus.status}
                </span>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-blue-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Current Location</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{currentBus.currentLocation}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Navigation className="h-5 w-5 text-green-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Next Stop</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{currentBus.nextStop}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-orange-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">ETA</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400" title="2.3 km remaining">{currentBus.eta}</p>
                  </div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-6">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <span>Journey Progress</span>
                  <span>{currentBus.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <motion.div 
                    className="bg-red-500 h-3 rounded-full transition-all duration-300"
                    initial={{ width: 0 }}
                    animate={{ width: `${currentBus.progress}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Nearby Stops Widget */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <NearbyStopsWidget />
            </motion.div>

            {/* Capacity Info */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-gray-700/50 rounded-2xl p-6 shadow-xl"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Bus Capacity</h3>
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-600 dark:text-gray-400">Passengers</span>
                <span className="font-bold text-gray-900 dark:text-white">
                  {currentBus.passengers}/{currentBus.capacity}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all duration-300 ${
                    (currentBus.passengers / currentBus.capacity) > 0.8 
                      ? 'bg-red-500' 
                      : (currentBus.passengers / currentBus.capacity) > 0.6 
                        ? 'bg-yellow-500' 
                        : 'bg-green-500'
                  }`}
                  style={{ width: `${(currentBus.passengers / currentBus.capacity) * 100}%` }}
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                {currentBus.capacity - currentBus.passengers} seats available
              </p>
            </motion.div>

            {/* Quick Actions */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-gray-700/50 rounded-2xl p-6 shadow-xl"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-red-500 text-white py-3 px-4 rounded-xl font-medium hover:bg-red-600 transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-red-500/25">
                  Book This Bus
                </button>
                <button className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  Set Arrival Alert
                </button>
                <button className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  Share Location
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Route Timeline */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8"
        >
          <div className="bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-gray-700/50 rounded-2xl p-6 shadow-xl">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Route Timeline</h3>
            
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-600" />
              
              <div className="space-y-6">
                {currentBus.stops.map((stop, index) => (
                  <motion.div 
                    key={index} 
                    className="relative flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                  >
                    {/* Timeline Dot */}
                    <div className={`relative z-10 w-4 h-4 rounded-full ${getStatusColor(stop.status)} mr-6`}>
                      {stop.status === 'current' && (
                        <div className="absolute -inset-1 w-6 h-6 bg-blue-200 dark:bg-blue-800 rounded-full animate-ping" />
                      )}
                    </div>
                    
                    {/* Stop Info */}
                    <div className="flex-1 bg-white/5 dark:bg-black/10 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {getStatusIcon(stop.status)}
                          <h4 className={`ml-2 font-medium ${
                            stop.status === 'current' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'
                          }`}>
                            {stop.name}
                          </h4>
                        </div>
                        <div className="text-right">
                          <p className={`text-sm font-medium ${
                            stop.status === 'current' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'
                          }`}>
                            {stop.time}
                          </p>
                          {stop.status === 'current' && (
                            <p className="text-xs text-blue-500 dark:text-blue-400">Now</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Service Alerts */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-8"
        >
          <div className="bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-gray-700/50 rounded-2xl p-6 shadow-xl">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Service Updates</h3>
            <div className="space-y-4">
              <div className="flex items-start p-4 bg-green-50/50 dark:bg-green-900/20 rounded-xl border border-green-200/50 dark:border-green-800/50">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="font-medium text-green-900 dark:text-green-300">All services running on time</p>
                  <p className="text-sm text-green-700 dark:text-green-400">No delays reported on Route {selectedRoute}</p>
                </div>
              </div>
              
              <div className="flex items-start p-4 bg-blue-50/50 dark:bg-blue-900/20 rounded-xl border border-blue-200/50 dark:border-blue-800/50">
                <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="font-medium text-blue-900 dark:text-blue-300">Peak hours ahead</p>
                  <p className="text-sm text-blue-700 dark:text-blue-400">Expect higher passenger volume between 5-7 PM</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TrackingPage;
