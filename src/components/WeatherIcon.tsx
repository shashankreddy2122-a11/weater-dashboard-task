import { motion } from 'framer-motion';

import clearDay from '@meteocons/svg/fill/clear-day.svg';
import clearNight from '@meteocons/svg/fill/clear-night.svg';

import overcastDay from '@meteocons/svg/fill/overcast-day.svg';
import overcastNight from '@meteocons/svg/fill/overcast-night.svg';

import rain from '@meteocons/svg/fill/rain.svg';
import drizzle from '@meteocons/svg/fill/drizzle.svg';
import snow from '@meteocons/svg/fill/snow.svg';

import fogDay from '@meteocons/svg/fill/fog-day.svg';
import fogNight from '@meteocons/svg/fill/fog-night.svg';

import thunderstormsDayRain from '@meteocons/svg/fill/thunderstorms-day-rain.svg';
import thunderstormsNightRain from '@meteocons/svg/fill/thunderstorms-night-rain.svg';

interface WeatherIconProps {
  condition: string;
  icon?: string;
  size?: number;
  className?: string;
}

const getWeatherIcon = (
  condition: string,
  icon?: string
) => {
  const weather = condition.toLowerCase().trim();

  const isNight = icon?.endsWith('n') ?? false;

  if (weather === 'clear') {
    return isNight ? clearNight : clearDay;
  }

  if (
    weather === 'thunderstorm' ||
    weather.includes('thunder')
  ) {
    return isNight
      ? thunderstormsNightRain
      : thunderstormsDayRain;
  }

  if (weather === 'drizzle') {
    return drizzle;
  }

  if (
    weather === 'rain' ||
    weather.includes('rain')
  ) {
    return rain;
  }

  if (
    weather === 'snow' ||
    weather.includes('snow')
  ) {
    return snow;
  }

  if (
    weather === 'mist' ||
    weather === 'fog' ||
    weather === 'haze'
  ) {
    return isNight ? fogNight : fogDay;
  }

  if (
    weather === 'clouds' ||
    weather.includes('cloud') ||
    weather.includes('overcast')
  ) {
    return isNight
      ? overcastNight
      : overcastDay;
  }

  return isNight
    ? overcastNight
    : overcastDay;
};

export const WeatherIcon = ({
  condition,
  icon,
  size = 130,
  className = '',
}: WeatherIconProps) => {
  const weatherIcon = getWeatherIcon(
    condition,
    icon
  );

  return (
  <motion.div
    className={`flex items-center justify-center ${className}`}
    style={{
      width: size,
      height: size,
    }}
    initial={{
      opacity: 0,
      scale: 0.7,
      y: 20,
    }}
    animate={{
      opacity: 1,
      scale: 1,
      y: 0,
    }}
    transition={{
      duration: 0.7,
      ease: 'easeOut',
    }}
  >
    <motion.div
      className="relative flex items-center justify-center w-full h-full"
      animate={{
        y: [0, -6, 0],
      }}
      transition={{
        duration: 3.5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {/* Soft glow for better visibility in light and dark mode */}
      <div
        className="
          absolute
          w-[70%]
          h-[70%]
          rounded-full
          bg-white/60
          dark:bg-white/5
          blur-2xl
        "
      />

      <motion.img
        src={weatherIcon}
        alt={`${condition} weather`}
        width={size}
        height={size}
        className="
          relative
          w-full
          h-full
          object-contain
          drop-shadow-[0_8px_20px_rgba(0,0,0,0.18)]
          dark:drop-shadow-[0_8px_20px_rgba(0,0,0,0.45)]
        "
      />
    </motion.div>
  </motion.div>
);
};