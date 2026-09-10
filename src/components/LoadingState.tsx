import { motion } from 'framer-motion';
import overcastDay from '@meteocons/svg/fill/overcast-day.svg';

export const LoadingState = () => {
  return (
    <motion.div
      className="w-full max-w-3xl mx-auto px-1 sm:px-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="glass-strong rounded-3xl p-8 sm:p-12 md:p-16 shadow-2xl">
        <div className="flex flex-col items-center justify-center text-center">

          <motion.div
            animate={{
              y: [0, -8, 0],
              rotate: [0, 3, -3, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="mb-6 flex items-center justify-center"
          >
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-white/60 dark:bg-slate-900/40 border border-white/70 dark:border-white/10 shadow-xl flex items-center justify-center">
              <div className="drop-shadow-[0_6px_12px_rgba(15,23,42,0.3)]">
                <img
                  src={overcastDay}
                  alt="Loading weather"
                  className="w-20 h-20 sm:w-24 sm:h-24 object-contain"
                />
              </div>
            </div>
          </motion.div>

          <motion.h2
            className="text-xl sm:text-2xl font-bold text-light-text dark:text-dark-text mb-3"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Getting weather...
          </motion.h2>

          <motion.p
            className="text-sm text-light-textSecondary dark:text-dark-textSecondary"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Fetching the latest weather conditions
          </motion.p>

          <div className="flex gap-2 mt-5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-light-primary dark:bg-dark-primary"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>

        </div>
      </div>
    </motion.div>
  );
};