
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';

interface FilterButtonsProps {
  activeFilter: 'all' | 'on-time' | 'delayed';
  onFilterChange: (filter: 'all' | 'on-time' | 'delayed') => void;
}

const FilterButtons = ({ activeFilter, onFilterChange }: FilterButtonsProps) => {
  const filters = [
    { key: 'all', label: 'All Routes', count: '12' },
    { key: 'on-time', label: 'On-Time', count: '9' },
    { key: 'delayed', label: 'Delayed', count: '3' },
  ] as const;

  return (
    <div className="flex items-center space-x-2">
      <Filter className="h-5 w-5 text-gray-600 dark:text-gray-400" />
      <div className="flex bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-gray-700/50 rounded-xl p-1">
        {filters.map((filter) => (
          <motion.button
            key={filter.key}
            onClick={() => onFilterChange(filter.key)}
            className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
              activeFilter === filter.key
                ? 'text-white'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {activeFilter === filter.key && (
              <motion.div
                className="absolute inset-0 bg-red-500 rounded-lg"
                layoutId="activeFilter"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10 flex items-center">
              {filter.label}
              <span className={`ml-2 px-1.5 py-0.5 rounded-full text-xs ${
                activeFilter === filter.key
                  ? 'bg-white/20 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}>
                {filter.count}
              </span>
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default FilterButtons;
