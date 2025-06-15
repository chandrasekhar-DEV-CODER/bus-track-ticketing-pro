
import { motion } from 'framer-motion';
import { Bus, TrendingUp, Users } from 'lucide-react';

interface Route {
  id: string;
  name: string;
  status: 'on-time' | 'delayed' | 'cancelled';
  ridership: number;
}

interface PopularRoutesWidgetProps {
  routes: Route[];
  onTrackRoute: (routeId: string) => void;
}

const PopularRoutesWidget = ({ routes, onTrackRoute }: PopularRoutesWidgetProps) => {
  return (
    <div className="w-full">
      <div className="flex items-center mb-4">
        <TrendingUp className="h-5 w-5 text-red-500 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Popular Routes</h3>
        <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">• Live ridership data</span>
      </div>
      
      <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
        {routes.map((route, index) => (
          <motion.div
            key={route.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex-shrink-0 w-72 bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-gray-700/50 rounded-2xl p-4 hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center">
                <div className="bg-red-500/20 p-2 rounded-lg mr-3">
                  <Bus className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">{route.id}</h4>
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    route.status === 'on-time' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                  }`}>
                    {route.status}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{route.ridership}%</span>
                </div>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
              {route.name}
            </p>
            
            <button
              onClick={() => onTrackRoute(route.id)}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-red-500/25"
            >
              Track Now
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PopularRoutesWidget;
