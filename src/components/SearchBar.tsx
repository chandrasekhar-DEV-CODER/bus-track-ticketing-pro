
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Bus, X } from 'lucide-react';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  suggestions: any[];
  onSuggestionSelect: (suggestion: any) => void;
}

const SearchBar = ({ searchQuery, onSearchChange, suggestions, onSuggestionSelect }: SearchBarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsOpen(searchQuery.length > 0 && suggestions.length > 0);
  }, [searchQuery, suggestions]);

  return (
    <div className="relative w-full max-w-2xl">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
        <input
          ref={searchRef}
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by Route ID or Stop Name..."
          className="w-full pl-12 pr-12 py-4 bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-gray-700/50 rounded-2xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-300"
          onFocus={() => setIsOpen(true)}
        />
        
        {searchQuery && (
          <button
            onClick={() => {
              onSearchChange('');
              setIsOpen(false);
            }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="h-4 w-4 text-gray-400" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white/90 dark:bg-black/90 backdrop-blur-md border border-white/20 dark:border-gray-700/50 rounded-2xl shadow-2xl z-50 max-h-96 overflow-y-auto"
          >
            {suggestions.map((suggestion, index) => (
              <motion.button
                key={`${suggestion.type}-${suggestion.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => {
                  onSuggestionSelect(suggestion);
                  setIsOpen(false);
                }}
                className="w-full flex items-center p-4 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-left border-b border-gray-100 dark:border-gray-800 last:border-b-0"
              >
                {suggestion.type === 'route' ? (
                  <Bus className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
                ) : (
                  <MapPin className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0" />
                )}
                <div className="flex-1">
                  <div className="font-medium text-gray-900 dark:text-white">
                    {suggestion.type === 'route' ? suggestion.id : suggestion.name}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {suggestion.type === 'route' ? suggestion.name : `Stop • Routes: ${suggestion.routes.join(', ')}`}
                  </div>
                </div>
                {suggestion.type === 'route' && (
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    suggestion.status === 'on-time' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                  }`}>
                    {suggestion.status}
                  </div>
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
