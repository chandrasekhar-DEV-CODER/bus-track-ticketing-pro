
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ChevronDown, Navigation, Clock } from 'lucide-react';

const NearbyStopsWidget = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const nearbyStops = [
    { id: '001', name: 'Central Station', distance: '0.2 km', nextBus: '3 min', routes: ['42A', '15B'] },
    { id: '002', name: 'Downtown Plaza', distance: '0.5 km', nextBus: '7 min', routes: ['33C'] },
    { id: '003', name: 'City Mall', distance: '0.8 km', nextBus: '12 min', routes: ['88D', '101X'] },
    { id: '004', name: 'Tech Hub', distance: '1.2 km', nextBus: '18 min', routes: ['15B'] },
  ];

  return (
    <div className="bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-gray-700/50 rounded-2xl overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-white/5 dark:hover:bg-black/10 transition-colors"
      >
        <div className="flex items-center">
          <Navigation className="h-5 w-5 text-blue-500 mr-3" />
          <div className="text-left">
            <h3 className="font-semibold text-gray-900 dark:text-white">Nearby Stops</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Based on your location</p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-white/10 dark:border-gray-700/30"
          >
            <div className="p-4 space-y-3">
              {nearbyStops.map((stop, index) => (
                <motion.div
                  key={stop.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-white/5 dark:bg-black/10 rounded-xl hover:bg-white/10 dark:hover:bg-black/20 transition-colors cursor-pointer"
                >
                  <div className="flex items-center">
                    <div className="bg-blue-500/20 p-2 rounded-lg mr-3">
                      <MapPin className="h-4 w-4 text-blue-500" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{stop.name}</h4>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <span>{stop.distance}</span>
                        <span className="mx-2">•</span>
                        <span>Routes: {stop.routes.join(', ')}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-sm font-medium text-green-600 dark:text-green-400">
                      <Clock className="h-4 w-4 mr-1" />
                      {stop.nextBus}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NearbyStopsWidget;
