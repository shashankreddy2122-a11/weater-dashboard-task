import { motion } from 'framer-motion';
import { WeatherIcon } from './WeatherIcon';
import { formatDate } from '../utils/formatDate';
import { getWeatherDescription } from '../utils/weatherUtils';
import { WeatherData } from '../types/weather';

interface WeatherHeroProps {
  weather: WeatherData;
}

export const WeatherHero = ({ weather }: WeatherHeroProps) => {
  return (
    <motion.div
      className="w-full max-w-3xl mx-auto mb-8"
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="glass-strong rounded-3xl p-8 sm:p-10 shadow-2xl shadow-light-primary/10 dark:shadow-dark-primary/10">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-4"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-xl sm:rounded-2xl flex items-center justify-center bg-slate-300/80 dark:bg-slate-900/70 border border-slate-400/50 dark:border-white/10 shadow-lg">
              <div className="flex items-center justify-center drop-shadow-[0_4px_10px_rgba(0,0,0,0.45)]">
            <WeatherIcon 
              condition={weather.condition} 
              size={80}
              className="text-light-primary dark:text-dark-primary"
            />
              </div>
            </div>
          </motion.div>
          
          <motion.h2
            className="text-2xl sm:text-3xl font-bold text-light-text dark:text-dark-text mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {weather.city}, {weather.country}
          </motion.h2>
          
          <motion.p
            className="text-sm sm:text-base text-light-textSecondary dark:text-dark-textSecondary mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            {formatDate(new Date())}
          </motion.p>
          
          <motion.div
            className="mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p className="text-[64px] sm:text-[72px] md:text-[88px] font-bold text-gradient leading-none">
              {weather.temperature}°
            </p>
          </motion.div>
          
          <motion.p
            className="text-lg sm:text-xl font-medium text-light-text dark:text-dark-text mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
          >
            {getWeatherDescription(weather.condition)}
          </motion.p>
          
          <motion.p
            className="text-sm text-light-textSecondary dark:text-dark-textSecondary"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Feels like {weather.feelsLike}°
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};
