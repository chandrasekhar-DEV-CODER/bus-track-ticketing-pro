
import React from 'react';
import { motion } from 'framer-motion';
import { Bus, Zap } from 'lucide-react';

interface SmartBusLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

const SmartBusLogo: React.FC<SmartBusLogoProps> = ({ 
  size = 'md', 
  showText = true, 
  className = '' 
}) => {
  const sizeClasses = {
    sm: { container: 'h-8 w-8', text: 'text-lg', icon: 'h-4 w-4', zap: 'h-2 w-2' },
    md: { container: 'h-12 w-12', text: 'text-2xl', icon: 'h-6 w-6', zap: 'h-3 w-3' },
    lg: { container: 'h-16 w-16', text: 'text-3xl', icon: 'h-8 w-8', zap: 'h-4 w-4' }
  };

  const currentSize = sizeClasses[size];

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <motion.div
        className={`${currentSize.container} relative rounded-2xl glass-card flex items-center justify-center group cursor-pointer overflow-hidden`}
        style={{
          background: `linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)`,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        }}
        whileHover={{ 
          scale: 1.05,
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.2)'
        }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            background: 'linear-gradient(45deg, rgba(255,255,255,0.3) 0%, transparent 100%)'
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: 'reverse'
          }}
        />
        
        {/* Main bus icon */}
        <Bus className={`${currentSize.icon} text-white relative z-10`} />
        
        {/* Smart indicator - lightning bolt */}
        <motion.div
          className="absolute -top-1 -right-1 bg-yellow-400 rounded-full p-1"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Zap className={`${currentSize.zap} text-yellow-800`} />
        </motion.div>
        
        {/* Pulse ring */}
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-white/30"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
      
      {showText && (
        <motion.div
          className="flex flex-col"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <span className={`${currentSize.text} font-bold text-gray-900 dark:text-white leading-none`}>
            Smart<span style={{ color: 'var(--accent-primary)' }}>Bus</span>
          </span>
          <span className="text-xs text-gray-600 dark:text-gray-400 font-medium leading-none mt-1">
            Next-Gen Transit
          </span>
        </motion.div>
      )}
    </div>
  );
};

export default SmartBusLogo;
