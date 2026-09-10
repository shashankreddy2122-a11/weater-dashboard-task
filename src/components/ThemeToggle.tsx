import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}
export const ThemeToggle = ({ isDark, onToggle }: ThemeToggleProps) => {
  return (
    <motion.button
      onClick={onToggle}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`relative w-[88px] h-[42px] rounded-full overflow-hidden border backdrop-blur-xl transition-all duration-500 shadow-lg ${isDark ? 'bg-slate-950/80 border-slate-700/70 shadow-indigo-950/30' : 'bg-white/75 border-white/80 shadow-slate-300/40'}`}
    >
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          background: isDark
            ? 'radial-gradient(circle at 75% 50%, rgba(99,102,241,0.22), transparent 45%)'
            : 'radial-gradient(circle at 25% 50%, rgba(251,191,36,0.22), transparent 45%)',
        }}
        transition={{ duration: 0.5 }}
      />
      <motion.div
        animate={{
          opacity: isDark ? 0.45 : 0.65,
          scale: isDark ? 0.9 : 1,
          rotate: isDark ? -20 : 0,
        }}
        transition={{ duration: 0.35 }}
        className="absolute left-[12px] inset-y-0 flex items-center justify-center"
      >
        <Sun
          size={18}
          strokeWidth={2}
          className={isDark ? 'text-slate-400' : 'text-amber-500'}
        />
      </motion.div>
      <motion.div
        animate={{
          opacity: isDark ? 0.65 : 0.45,
          scale: isDark ? 1 : 0.9,
          rotate: isDark ? 0 : 20,
        }}
        transition={{ duration: 0.35 }}
        className="absolute right-[12px] inset-y-0 flex items-center justify-center"
      >
        <Moon
          size={18}
          strokeWidth={2}
          className={isDark ? 'text-indigo-300' : 'text-slate-500'}
        />
      </motion.div>
      <motion.div
        className={`absolute top-[3px] left-[3px] w-[36px] h-[36px] rounded-full flex items-center justify-center z-10 ${isDark ? 'bg-gradient-to-br from-indigo-500 via-indigo-600 to-violet-700 shadow-[0_0_16px_rgba(99,102,241,0.6)]' : 'bg-gradient-to-br from-amber-300 via-amber-400 to-orange-500 shadow-[0_0_16px_rgba(251,191,36,0.6)]'}`}
        animate={{
          x: isDark ? 46 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
      >
        <motion.div
          key={isDark ? 'moon' : 'sun'}
          initial={{
            opacity: 0,
            scale: 0.5,
            rotate: -45,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: 0,
          }}
          transition={{
            duration: 0.3,
            ease: 'easeOut',
          }}
        >
          {isDark ? (
            <Moon
              size={19}
              strokeWidth={2.2}
              className="text-white"
            />
          ) : (
            <Sun
              size={19}
              strokeWidth={2.2}
              className="text-white"
            />
          )}
        </motion.div>
      </motion.div>
    </motion.button>
  );
};