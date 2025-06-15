
import React from 'react';
import { motion } from 'framer-motion';
import { Palette } from 'lucide-react';
import { useEnhancedTheme } from '../../contexts/EnhancedThemeContext';

const AccentColorPicker = () => {
  const { accentColor, setAccentColor } = useEnhancedTheme();

  const colors = [
    { name: 'blue', color: '#3B82F6', label: 'Ocean Blue' },
    { name: 'green', color: '#10B981', label: 'Forest Green' },
    { name: 'purple', color: '#8B5CF6', label: 'Royal Purple' },
    { name: 'orange', color: '#F59E0B', label: 'Sunset Orange' },
    { name: 'pink', color: '#EC4899', label: 'Cherry Pink' },
    { name: 'red', color: '#EF4444', label: 'Fire Red' },
  ];

  return (
    <div className="flex items-center space-x-2 bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-xl px-3 py-2 border border-white/20 dark:border-gray-700/50">
      <Palette className="h-4 w-4 text-gray-600 dark:text-gray-400" />
      <div className="flex space-x-1">
        {colors.map((colorOption) => (
          <motion.button
            key={colorOption.name}
            className={`w-6 h-6 rounded-full border-2 transition-all duration-300 relative overflow-hidden ${
              accentColor === colorOption.name
                ? 'border-white dark:border-gray-200 scale-110 shadow-lg'
                : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
            }`}
            style={{ backgroundColor: colorOption.color }}
            onClick={() => setAccentColor(colorOption.name as any)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title={colorOption.label}
          >
            {accentColor === colorOption.name && (
              <motion.div
                className="absolute inset-0 bg-white/30 rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default AccentColorPicker;
