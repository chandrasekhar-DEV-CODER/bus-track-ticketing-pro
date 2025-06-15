
import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface LazyRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const LoadingSpinner = () => (
  <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex items-center justify-center">
    <motion.div
      className="flex flex-col items-center space-y-4"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        <Loader2 className="w-12 h-12 text-red-500 animate-spin" />
        <motion.div
          className="absolute inset-0 w-12 h-12 border-4 border-red-200 dark:border-red-800 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
          Loading SmartBus
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Please wait while we prepare your experience...
        </p>
      </div>
    </motion.div>
  </div>
);

const LazyRoute: React.FC<LazyRouteProps> = ({ children, fallback }) => {
  return (
    <Suspense fallback={fallback || <LoadingSpinner />}>
      {children}
    </Suspense>
  );
};

export default LazyRoute;
