
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, Clock, MapPin, Users, Zap } from 'lucide-react';

const EnhancedSearchFilters = ({ onFiltersChange }) => {
  const [etaRange, setEtaRange] = useState([0, 60]);
  const [routeTypes, setRouteTypes] = useState([]);
  const [capacityFilter, setCapacityFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const routeTypeOptions = [
    { id: 'express', label: 'Express', icon: Zap, color: 'text-purple-500' },
    { id: 'local', label: 'Local', icon: MapPin, color: 'text-blue-500' },
    { id: 'shuttle', label: 'Shuttle', icon: Users, color: 'text-green-500' }
  ];

  const capacityOptions = [
    { value: 'all', label: 'All Buses' },
    { value: 'available', label: 'Seats Available' },
    { value: 'plenty', label: 'Plenty of Seats (>50%)' },
    { value: 'limited', label: 'Limited Seats (<25%)' }
  ];

  const handleRouteTypeToggle = (type) => {
    const newTypes = routeTypes.includes(type)
      ? routeTypes.filter(t => t !== type)
      : [...routeTypes, type];
    setRouteTypes(newTypes);
    onFiltersChange({ etaRange, routeTypes: newTypes, capacityFilter });
  };

  const handleEtaChange = (newRange) => {
    setEtaRange(newRange);
    onFiltersChange({ etaRange: newRange, routeTypes, capacityFilter });
  };

  const handleCapacityChange = (newCapacity) => {
    setCapacityFilter(newCapacity);
    onFiltersChange({ etaRange, routeTypes, capacityFilter: newCapacity });
  };

  return (
    <div className="relative">
      <motion.button
        onClick={() => setShowFilters(!showFilters)}
        className="flex items-center space-x-2 px-4 py-2 glass border border-white/20 dark:border-gray-700/50 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-200"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Filter className="h-4 w-4" />
        <span>Filters</span>
        {(routeTypes.length > 0 || capacityFilter !== 'all' || etaRange[0] > 0 || etaRange[1] < 60) && (
          <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {routeTypes.length + (capacityFilter !== 'all' ? 1 : 0) + (etaRange[0] > 0 || etaRange[1] < 60 ? 1 : 0)}
          </span>
        )}
      </motion.button>

      {showFilters && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          className="absolute top-full left-0 mt-2 w-80 glass rounded-2xl border border-white/20 dark:border-gray-700/50 shadow-xl z-50 p-6"
        >
          {/* ETA Range Slider */}
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <Clock className="h-4 w-4 text-orange-500 mr-2" />
              <h4 className="font-semibold text-gray-900 dark:text-white">ETA Range</h4>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>{etaRange[0]} min</span>
                <span>{etaRange[1]} min</span>
              </div>
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max="60"
                  value={etaRange[0]}
                  onChange={(e) => handleEtaChange([parseInt(e.target.value), etaRange[1]])}
                  className="absolute w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <input
                  type="range"
                  min="0"
                  max="60"
                  value={etaRange[1]}
                  onChange={(e) => handleEtaChange([etaRange[0], parseInt(e.target.value)])}
                  className="absolute w-full h-2 bg-transparent rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Route Types */}
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <MapPin className="h-4 w-4 text-blue-500 mr-2" />
              <h4 className="font-semibold text-gray-900 dark:text-white">Route Types</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {routeTypeOptions.map(option => (
                <motion.button
                  key={option.id}
                  onClick={() => handleRouteTypeToggle(option.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all duration-200 ${
                    routeTypes.includes(option.id)
                      ? 'bg-red-500/20 border-red-500/50 text-red-700 dark:text-red-300'
                      : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <option.icon className={`h-4 w-4 ${option.color}`} />
                  <span className="text-sm font-medium">{option.label}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Capacity Filter */}
          <div className="mb-4">
            <div className="flex items-center mb-3">
              <Users className="h-4 w-4 text-green-500 mr-2" />
              <h4 className="font-semibold text-gray-900 dark:text-white">Seat Availability</h4>
            </div>
            <select
              value={capacityFilter}
              onChange={(e) => handleCapacityChange(e.target.value)}
              className="w-full p-3 glass border border-white/20 dark:border-gray-700/50 rounded-xl text-gray-900 dark:text-white"
            >
              {capacityOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>

          {/* Clear Filters */}
          <button
            onClick={() => {
              setEtaRange([0, 60]);
              setRouteTypes([]);
              setCapacityFilter('all');
              onFiltersChange({ etaRange: [0, 60], routeTypes: [], capacityFilter: 'all' });
            }}
            className="w-full py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Clear All Filters
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default EnhancedSearchFilters;
