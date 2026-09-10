import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  onRetry: () => void;
}

export const ErrorState = ({ onRetry }: ErrorStateProps) => {
  return (
    <motion.div
      className="w-full max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="glass-strong rounded-3xl p-12 sm:p-16 shadow-2xl">
        <div className="flex flex-col items-center justify-center text-center">
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, -5, 5, 0]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: 'easeInOut' 
            }}
            className="mb-6"
          >
            <AlertCircle className="w-20 h-20 text-red-500" />
          </motion.div>
          
          <motion.h2
            className="text-2xl font-bold text-light-text dark:text-dark-text mb-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            City not found
          </motion.h2>
          
          <motion.p
            className="text-light-textSecondary dark:text-dark-textSecondary mb-8 max-w-md"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            We couldn't find weather data for that city. Please check the spelling and try again.
          </motion.p>
          
          <motion.button
            onClick={onRetry}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-light-primary to-blue-500 dark:from-dark-primary dark:to-blue-400 text-white rounded-xl font-medium shadow-lg shadow-light-primary/30 dark:shadow-dark-primary/30 hover:shadow-xl hover:shadow-light-primary/40 dark:hover:shadow-dark-primary/40 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
