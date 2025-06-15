
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Navigation, MapPin, Clock, ArrowRight, Zap } from 'lucide-react';
import { toast } from 'sonner';

const AIRoutePlanner = () => {
  const [start, setStart] = useState('');
  const [destination, setDestination] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const planRoute = async () => {
    if (!start || !destination) {
      toast.error('Please enter both starting point and destination');
      return;
    }
    
    setIsLoading(true);
    console.log('Planning route from', start, 'to', destination);
    
    // Mock AI planning delay
    setTimeout(() => {
      const mockSuggestions = [
        {
          id: 1,
          routes: ['42A', '15B'],
          duration: '45 min',
          transfers: 1,
          fare: '$6.75',
          description: 'Fastest route with 1 transfer at Central Station'
        },
        {
          id: 2,
          routes: ['88D'],
          duration: '65 min',
          transfers: 0,
          fare: '$5.25',
          description: 'Direct route, no transfers required'
        },
        {
          id: 3,
          routes: ['33C', '77E', '101X'],
          duration: '55 min',
          transfers: 2,
          fare: '$8.50',
          description: 'Scenic route via Tech Park and Mall Plaza'
        }
      ];
      
      setSuggestions(mockSuggestions);
      setIsLoading(false);
      toast.success('Route suggestions generated!');
      console.log('Route suggestions:', mockSuggestions);
    }, 2000);
  };

  const selectRoute = (suggestion) => {
    console.log('Selected route:', suggestion);
    toast.success(`Selected route with ${suggestion.routes.join(' → ')}`);
    // Here you could navigate to booking page with selected route
  };

  return (
    <div className="glass rounded-3xl p-8 border border-white/20 dark:border-gray-700/50">
      <div className="flex items-center mb-6">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-2xl mr-4">
          <Zap className="h-6 w-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">AI Route Planner</h3>
          <p className="text-gray-600 dark:text-gray-400">Get smart multi-route suggestions</p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
          <input
            type="text"
            placeholder="Starting point..."
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="w-full pl-10 pr-4 py-3 glass border border-white/20 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 text-gray-900 dark:text-white placeholder-gray-500"
          />
        </div>
        
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-red-500" />
          <input
            type="text"
            placeholder="Destination..."
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full pl-10 pr-4 py-3 glass border border-white/20 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 text-gray-900 dark:text-white placeholder-gray-500"
          />
        </div>

        <motion.button
          onClick={planRoute}
          disabled={!start || !destination || isLoading}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <>
              <Navigation className="h-4 w-4 mr-2" />
              Plan My Route
            </>
          )}
        </motion.button>
      </div>

      {suggestions.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Suggested Routes</h4>
          {suggestions.map((suggestion, index) => (
            <motion.div
              key={suggestion.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 dark:bg-black/20 rounded-xl p-4 border border-white/20 dark:border-gray-700/50 hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-200 cursor-pointer"
              onClick={() => selectRoute(suggestion)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {suggestion.routes.map((route, idx) => (
                    <React.Fragment key={route}>
                      <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                        {route}
                      </span>
                      {idx < suggestion.routes.length - 1 && (
                        <ArrowRight className="h-3 w-3 text-gray-400" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
                <span className="font-bold text-gray-900 dark:text-white">{suggestion.fare}</span>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
                <span className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {suggestion.duration}
                </span>
                <span>{suggestion.transfers} transfer{suggestion.transfers !== 1 ? 's' : ''}</span>
              </div>
              
              <p className="text-xs text-gray-500 dark:text-gray-400">{suggestion.description}</p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AIRoutePlanner;
