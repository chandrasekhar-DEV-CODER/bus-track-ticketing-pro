
import React from 'react';
import { motion } from 'framer-motion';
import { useEnhancedTheme } from '../../contexts/EnhancedThemeContext';

const AccentColorPicker = () => {
  const { accentColor, setAccentColor } = useEnhancedTheme();

  const colors = [
    { name: 'blue', color: '#3B82F6' },
    { name: 'green', color: '#10B981' },
    { name: 'purple', color: '#8B5CF6' },
    { name: 'orange', color: '#F59E0B' },
    { name: 'pink', color: '#EC4899' },
  ];

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-600 dark:text-gray-400">Accent:</span>
      <div className="flex space-x-1">
        {colors.map((colorOption) => (
          <motion.button
            key={colorOption.name}
            className={`w-6 h-6 rounded-full border-2 transition-all duration-200 ${
              accentColor === colorOption.name
                ? 'border-gray-900 dark:border-white scale-110'
                : 'border-gray-300 dark:border-gray-600'
            }`}
            style={{ backgroundColor: colorOption.color }}
            onClick={() => setAccentColor(colorOption.name as any)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          />
        ))}
      </div>
    </div>
  );
};

export default AccentColorPicker;
