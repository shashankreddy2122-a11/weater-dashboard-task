import { motion } from 'framer-motion';
import overcastDay from '@meteocons/svg/fill/overcast-day.svg';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  isDark: boolean;
  onThemeToggle: () => void;
}

export const Header = ({ isDark, onThemeToggle }: HeaderProps) => {
  return (
    <motion.header
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between">

        {/* Logo */}
        <motion.div
          className="flex items-center gap-3"
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >

          {/* Realistic Weather Icon */}
          <motion.div
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white/60 dark:bg-slate-900/40 border border-white/70 dark:border-white/10 shadow-md flex items-center justify-center"
            animate={{
              y: [0, -2, 0],
              scale: [1, 1.04, 1],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <img
              src={overcastDay}
              alt="SkyCast weather"
              className="w-9 h-9 sm:w-10 sm:h-10 object-contain drop-shadow-[0_3px_6px_rgba(15,23,42,0.3)]"
            />
          </motion.div>

          {/* Brand */}
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gradient">
              SkyCast
            </h1>

            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Weather Dashboard
            </p>
          </div>

        </motion.div>

        {/* Theme Toggle */}
        <ThemeToggle
          isDark={isDark}
          onToggle={onThemeToggle}
        />

      </div>
    </motion.header>
  );
};