import { WeatherStatCard } from './WeatherStatCard';
import { WeatherData } from '../types/weather';
import {
  getWindDescription,
  getHumidityDescription,
} from '../utils/weatherUtils';

import humidityIcon from '@meteocons/svg/fill/humidity.svg';
import thermometerIcon from '@meteocons/svg/fill/thermometer.svg';
import windIcon from '@meteocons/svg/fill/wind.svg';

import { WeatherIcon } from './WeatherIcon';
import sunriseIcon from '@meteocons/svg/fill/sunrise.svg';
import sunsetIcon from '@meteocons/svg/fill/sunset.svg';
import { motion } from 'framer-motion';

interface WeatherStatsProps {
  weather: WeatherData;
}

export const WeatherStats = ({ weather }: WeatherStatsProps) => {
  const formatSunTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">

      {/* ================= WEATHER STATS ================= */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">

        <WeatherStatCard
          icon={humidityIcon}
          label="Humidity"
          value={`${weather.humidity}%`}
          description={getHumidityDescription(weather.humidity)}
          delay={0.5}
        />

        <WeatherStatCard
          icon={thermometerIcon}
          label="Temperature"
          value={`${weather.temperature}°C`}
          description="Current temperature"
          delay={0.6}
        />

        <WeatherStatCard
          icon={windIcon}
          label="Wind Speed"
          value={`${weather.windSpeed} km/h`}
          description={getWindDescription(weather.windSpeed)}
          delay={0.7}
        />

      </div>

      {/* ================= HOURLY FORECAST ================= */}

<motion.div
  className="glass rounded-2xl p-5 sm:p-6 shadow-lg"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 1.1 }}
>
  {/* Header */}
  <div className="mb-5">
    <h2 className="text-lg sm:text-xl font-semibold text-light-text dark:text-dark-text">
      Hourly Forecast
    </h2>

    <p className="text-xs sm:text-sm text-light-textSecondary dark:text-dark-textSecondary mt-1">
      Weather for the next few hours
    </p>
  </div>

  {/* Forecast Cards */}
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">

    {weather.hourlyForecast.slice(0, 6).map((hour, index) => (

      <motion.div
        key={`${hour.time}-${index}`}
        className={`
          w-full
          min-h-[170px]
          rounded-2xl
          p-4
          flex
          flex-col
          items-center
          justify-center
          text-center
          border
          transition-all
          duration-300
          ${
            index === 0
              ? `
                bg-light-primary/15
                dark:bg-dark-primary/15
                border-light-primary/30
                dark:border-dark-primary/30
                shadow-md
                shadow-light-primary/10
                dark:shadow-dark-primary/10
              `
              : `
                bg-black/[0.03]
                dark:bg-white/[0.04]
                border-black/5
                dark:border-white/5
              `
          }
        `}
        whileHover={{
          y: -5,
          scale: 1.02,
        }}
      >

        {/* Time */}

        <p className="text-sm font-semibold text-light-text dark:text-dark-text">
          {index === 0 ? 'Now' : hour.time}
        </p>


        {/* Weather Icon */}

       <div className="w-12 h-12 sm:w-16 sm:h-16 shrink-0 rounded-xl sm:rounded-2xl flex items-center justify-center bg-slate-300/80 dark:bg-slate-900/70 border border-slate-400/50 dark:border-white/10 shadow-lg">
       <div className="flex items-center justify-center drop-shadow-[0_4px_10px_rgba(0,0,0,0.45)]">
          <WeatherIcon
            condition={hour.condition}
            icon={hour.icon}
            size={55}
          />
        </div>
      </div>


        {/* Temperature */}

        <p className="text-2xl font-bold text-light-text dark:text-dark-text">
          {hour.temperature}°
        </p>


        {/* Condition */}

        <p className="mt-1 text-xs text-light-textSecondary dark:text-dark-textSecondary">
          {hour.condition}
        </p>

      </motion.div>

    ))}

  </div>
</motion.div>
{/* ================= 7 DAY FORECAST ================= */}

<motion.div
  className="w-full max-w-5xl mx-auto glass rounded-2xl p-4 sm:p-6 shadow-lg overflow-hidden"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 1.2 }}
>
  {/* Header */}
  <div className="mb-5">
    <h2 className="text-xl sm:text-2xl font-bold text-light-text dark:text-dark-text">
      7-Day Forecast
    </h2>

    <p className="text-xs sm:text-sm text-light-textSecondary dark:text-dark-textSecondary mt-1">
      Daily weather outlook
    </p>
  </div>

  {/* Forecast List */}
  <div className="space-y-2">
    {weather.dailyForecast.map((day, index) => (
      <motion.div
        key={`${day.date}-${index}`}
        className="w-full min-w-0 flex items-center gap-2 sm:gap-4 px-3 py-3 sm:px-4 sm:py-3.5 rounded-xl bg-black/[0.025] dark:bg-white/[0.035] border border-black/5 dark:border-white/5 hover:bg-black/[0.05] dark:hover:bg-white/[0.06] transition-all duration-300"
        whileHover={{ x: 3, scale: 1.005 }}
      >
        {/* DAY */}
        <div className="w-[52px] sm:w-[85px] shrink-0">
          <p className="text-sm sm:text-base font-semibold text-light-text dark:text-dark-text">
            {day.day}
          </p>

          <p className="text-[10px] sm:text-xs text-light-textSecondary dark:text-dark-textSecondary mt-0.5">
            {day.date}
          </p>
        </div>

        {/* WEATHER */}
        <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
         {/* Icon */}
<div className="w-12 h-12 sm:w-16 sm:h-16 shrink-0 rounded-xl sm:rounded-2xl flex items-center justify-center bg-slate-300/80 dark:bg-slate-900/70 border border-slate-400/50 dark:border-white/10 shadow-lg">
  <div className="flex items-center justify-center drop-shadow-[0_4px_10px_rgba(0,0,0,0.45)]">
    <WeatherIcon
      condition={day.condition}
      icon={day.icon}
      size={46}
    />
  </div>
</div>

          {/* Condition */}
          <span className="hidden sm:block text-sm text-light-textSecondary dark:text-dark-textSecondary truncate">
            {day.condition}
          </span>
        </div>

        {/* HIGH */}
        <div className="w-[42px] sm:w-[70px] text-right shrink-0">
          <p className="text-sm sm:text-base font-bold text-light-text dark:text-dark-text">
            {day.temperatureHigh}°
          </p>

          <p className="text-[9px] sm:text-xs text-light-textSecondary dark:text-dark-textSecondary">
            High
          </p>
        </div>

        {/* LOW */}
        <div className="w-[42px] sm:w-[70px] text-right shrink-0">
          <p className="text-sm sm:text-base font-medium text-light-textSecondary dark:text-dark-textSecondary">
            {day.temperatureLow}°
          </p>

          <p className="text-[9px] sm:text-xs text-light-textSecondary dark:text-dark-textSecondary">
            Low
          </p>
        </div>
      </motion.div>
    ))}
  </div>
</motion.div>


      {/* ================= SUNRISE / SUNSET ================= */}

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.3 }}
      >

        {/* Sunrise */}
        <motion.div
  className="glass rounded-2xl p-5 shadow-lg flex items-center gap-4"
  whileHover={{ y: -3 }}
>
  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400/15 via-amber-300/10 to-yellow-200/10 border border-amber-400/20 flex items-center justify-center overflow-hidden">
    <motion.img
      src={sunriseIcon}
      alt="Sunrise"
      className="w-10 h-10 object-contain"
      animate={{
        y: [0, -2, 0],
        scale: [1, 1.04, 1],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  </div>

  <div>
    <p className="text-xs sm:text-sm text-light-textSecondary dark:text-dark-textSecondary">
      Sunrise
    </p>

    <p className="text-xl sm:text-2xl font-bold text-light-text dark:text-dark-text">
      {formatSunTime(weather.sunrise)}
    </p>
  </div>
</motion.div>

        {/* Sunset */}

<motion.div
  className="glass rounded-2xl p-5 shadow-lg flex items-center gap-4"
  whileHover={{ y: -3 }}
>
  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/15 via-red-400/10 to-indigo-500/15 border border-indigo-400/20 flex items-center justify-center overflow-hidden">
    <motion.img
      src={sunsetIcon}
      alt="Sunset"
      className="w-10 h-10 object-contain"
      animate={{
        y: [0, -2, 0],
        scale: [1, 1.04, 1],
      }}
      transition={{
        duration: 3.5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  </div>

  <div>
    <p className="text-xs sm:text-sm text-light-textSecondary dark:text-dark-textSecondary">
      Sunset
    </p>

    <p className="text-xl sm:text-2xl font-bold text-light-text dark:text-dark-text">
      {formatSunTime(weather.sunset)}
    </p>
  </div>
</motion.div>

      </motion.div>

    </div>
  );
};