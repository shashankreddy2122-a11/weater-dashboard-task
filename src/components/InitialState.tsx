import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import overcastDay from '@meteocons/svg/fill/overcast-day.svg';

export const InitialState = () => {
  const titleText = 'Welcome to SkyCast';
  const descriptionText =
    'Search for a city to discover the current weather conditions and forecasts.';

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isTitleComplete, setIsTitleComplete] = useState(false);
  const [isDescriptionComplete, setIsDescriptionComplete] =
    useState(false);

  useEffect(() => {
    let titleIndex = 0;
    let descriptionIndex = 0;

    const titleTimer = setInterval(() => {
      if (titleIndex < titleText.length) {
        setTitle(titleText.slice(0, titleIndex + 1));
        titleIndex++;
      } else {
        clearInterval(titleTimer);
        setIsTitleComplete(true);

        const descriptionTimer = setInterval(() => {
          if (descriptionIndex < descriptionText.length) {
            setDescription(
              descriptionText.slice(0, descriptionIndex + 1)
            );
            descriptionIndex++;
          } else {
            clearInterval(descriptionTimer);
            setIsDescriptionComplete(true);
          }
        }, 30);
      }
    }, 70);

    return () => {
      clearInterval(titleTimer);
    };
  }, []);

  return (
    <motion.div
      className="w-full max-w-3xl mx-auto px-1 sm:px-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="glass-strong rounded-3xl p-8 sm:p-12 md:p-16 shadow-2xl">
        <div className="flex flex-col items-center justify-center text-center">
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, 3, -3, 0],
              scale: [1, 1.04, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="mb-6 flex items-center justify-center"
          >
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-white/60 dark:bg-slate-900/40 border border-white/70 dark:border-white/10 shadow-xl flex items-center justify-center">
              <div className="drop-shadow-[0_6px_12px_rgba(15,23,42,0.3)]">
                <img
                  src={overcastDay}
                  alt="Partly cloudy weather"
                  className="w-24 h-24 sm:w-28 sm:h-28 object-contain"
                />
              </div>
            </div>
          </motion.div>
          <motion.h2
            className="text-2xl sm:text-3xl font-bold text-gradient mb-3 min-h-[36px]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {title}

            {!isTitleComplete && (
              <motion.span
                className="inline-block ml-1"
                animate={{ opacity: [1, 0, 1] }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                |
              </motion.span>
            )}
          </motion.h2>
          <motion.p
            className="text-sm sm:text-base text-light-textSecondary dark:text-dark-textSecondary max-w-md leading-relaxed min-h-[48px]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {description}

            {isTitleComplete && !isDescriptionComplete && (
              <motion.span
                className="inline-block ml-1"
                animate={{ opacity: [1, 0, 1] }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                |
              </motion.span>
            )}
          </motion.p>

        </div>
      </div>
    </motion.div>
  );
};