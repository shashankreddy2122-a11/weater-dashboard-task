export const getWeatherDescription = (condition: string): string => {
  const descriptions: Record<string, string> = {
    Clear: 'Clear sky',
    Clouds: 'Cloudy',
    Rain: 'Rainy',
    Drizzle: 'Light rain',
    Thunderstorm: 'Thunderstorm',
    Snow: 'Snowy',
    Mist: 'Misty',
    Fog: 'Foggy',
    Haze: 'Hazy',
  };
  return descriptions[condition] || condition;
};

export const getWindDescription = (windSpeed: number): string => {
  if (windSpeed < 10) return 'Calm';
  if (windSpeed < 20) return 'Light breeze';
  if (windSpeed < 30) return 'Moderate';
  if (windSpeed < 40) return 'Strong';
  return 'Very strong';
};

export const getHumidityDescription = (humidity: number): string => {
  if (humidity < 30) return 'Dry';
  if (humidity < 50) return 'Comfortable';
  if (humidity < 70) return 'Humid';
  return 'Very humid';
};
