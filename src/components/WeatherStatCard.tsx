import { motion } from 'framer-motion';

interface WeatherStatCardProps {
  icon: string;
  label: string;
  value: string | number;
  description: string;
  delay?: number;
}

export const WeatherStatCard = ({
  icon,
  label,
  value,
  description,
  delay = 0,
}: WeatherStatCardProps) => {
  return (
    <motion.div
      className="glass rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.5,
        delay,
        ease: 'easeOut',
      }}
      whileHover={{
        y: -4,
        scale: 1.01,
        transition: { duration: 0.2 },
      }}
    >
      <div className="flex items-start gap-4">
        <motion.div
        className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 bg-slate-300/80 dark:bg-slate-900/70 border border-slate-400/50 dark:border-white/10 shadow-lg"
        whileHover={{
          scale: 1.1,
          rotate: 5,
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-center justify-center drop-shadow-[0_4px_10px_rgba(0,0,0,0.45)]">
          <img
            src={icon}
            alt={`${label} icon`}
            className="w-9 h-9 sm:w-11 sm:h-11 object-contain"
          />
        </div>
      </motion.div>

        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm font-medium text-light-textSecondary dark:text-dark-textSecondary mb-1">
            {label}
          </p>

          <p className="text-2xl sm:text-3xl font-bold text-light-text dark:text-dark-text mb-1">
            {value}
          </p>

          <p className="text-xs text-light-textSecondary/70 dark:text-dark-textSecondary/70">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};