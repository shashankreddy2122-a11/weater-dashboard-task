import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '../components/Header';
import { SearchBar } from '../components/SearchBar';
import { WeatherHero } from '../components/WeatherHero';
import { WeatherStats } from '../components/WeatherStats';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';
import { InitialState } from '../components/InitialState';
import { LocationResult } from '../services/weatherApi';
import { fetchWeather, resetWeather } from '../store/slices/weatherSlice';
import { toggleTheme } from '../store/slices/themeSlice';

export const WeatherDashboard = () => {
  const dispatch = useDispatch();
  const isDark = useSelector((state: any) => state.theme.isDark);
  const viewState = useSelector((state: any) => state.weather.viewState);
  const weather = useSelector((state: any) => state.weather.weather);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  // ==========================================
  // GET BACKGROUND IMAGE BASED ON WEATHER & THEME
  // ==========================================

  const getBackgroundImage = () => {
    // Initial state: use theme-based background
    if (!weather) {
      return isDark ? '/assets/night.jpg' : '/assets/light.jpg';
    }

    const condition = weather.condition.toLowerCase();
    const timeOfDay = isDark ? 'night' : 'day';

    // Map weather conditions to available images
    const weatherImageMap: Record<string, Record<string, string>> = {
      clear: {
        day: 'sunny-day.jpg',
        night: 'clear-night.jpg',
      },
      clouds: {
        day: 'cloudy-day.jpg',
        night: 'cloudy-night.jpg',
      },
      rain: {
        day: 'rainy-day.jpg',
        night: 'rainy-night.jpg',
      },
      drizzle: {
        day: 'rainy-day.jpg',
        night: 'rainy-night.jpg',
      },
      snow: {
        day: 'snow-day.jpg',
        night: 'snow-night.jpg',
      },
      fog: {
        day: 'fog-day.jpg',
        night: 'fog-day.jpg',
      },
      thunderstorm: {
        day: 'rainy-day.jpg',
        night: 'thunderstorm-night.jpg',
      },
    };

    // Default to cloudy if condition not found
    const imageMap = weatherImageMap[condition] || weatherImageMap.clouds;
    const imageName = imageMap[timeOfDay] || imageMap.day;

    return `/assets/${imageName}`;
  };

  const backgroundImage = getBackgroundImage();

  const handleSearch = (location: LocationResult) => {
    dispatch(fetchWeather(location) as any);
  };

  const handleRetry = () => {
    dispatch(resetWeather());
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Weather-based background or animated blobs */}
      {backgroundImage ? (
        <>
          <motion.div
            className="fixed inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
          {/* Dark overlay for better text readability */}
          <div className="fixed inset-0 pointer-events-none bg-black/5 dark:bg-black/50" />
        </>
      ) : (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/20 dark:bg-blue-600/20 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute top-1/3 right-1/4 w-80 h-80 bg-purple-400/20 dark:bg-purple-600/20 rounded-full blur-3xl"
            animate={{
              x: [0, -80, 0],
              y: [0, 60, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2,
            }}
          />
          <motion.div
            className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-cyan-400/20 dark:bg-cyan-600/20 rounded-full blur-3xl"
            animate={{
              x: [0, 60, 0],
              y: [0, -40, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 4,
            }}
          />
        </div>
      )}

      {/* Main content */}
      <div className="relative z-10">
        <Header isDark={isDark} onThemeToggle={handleThemeToggle} />
        
        <main className="px-4 sm:px-6 lg:px-8 pb-12">
          <SearchBar onSearch={handleSearch} isLoading={viewState === 'loading'} />
          
          <AnimatePresence mode="wait">
            {viewState === 'initial' && (
              <motion.div
                key="initial"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <InitialState />
              </motion.div>
            )}
            
            {viewState === 'loading' && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <LoadingState />
              </motion.div>
            )}
            
            {viewState === 'success' && weather && (
              <motion.div
                key="success"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <WeatherHero weather={weather} />
                <WeatherStats weather={weather} />
              </motion.div>
            )}
            
            {viewState === 'error' && (
              <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ErrorState onRetry={handleRetry} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};
