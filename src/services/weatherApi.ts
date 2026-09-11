import axios from 'axios';
import { WeatherData } from '../types/weather';

const GEOCODING_URL =
  'https://geocoding-api.open-meteo.com/v1/search';

const FORECAST_URL =
  'https://api.open-meteo.com/v1/forecast';
export interface LocationResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  country_code: string;
  admin1?: string;
  admin2?: string;
  timezone?: string;
  population?: number;
  feature_code?: string;
}
export const normalizeText = (value: string): string => {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
};


const getWeatherCondition = (
  code: number,
  isDay: boolean
): string => {
  if (code === 0) {
    return isDay ? 'Clear' : 'Clear Night';
  }

  if ([1, 2, 3].includes(code)) {
    return 'Clouds';
  }

  if ([45, 48].includes(code)) {
    return 'Fog';
  }

  if ([51, 53, 55, 56, 57].includes(code)) {
    return 'Drizzle';
  }

  if (
    [61, 63, 65, 66, 67, 80, 81, 82].includes(code)
  ) {
    return 'Rain';
  }

  if ([71, 73, 75, 77, 85, 86].includes(code)) {
    return 'Snow';
  }

  if ([95, 96, 99].includes(code)) {
    return 'Thunderstorm';
  }

  return 'Clouds';
};
const getWeatherIcon = (
  code: number,
  isDay: boolean
): string => {
  if (code === 0) {
    return isDay ? '01d' : '01n';
  }

  if ([1, 2, 3].includes(code)) {
    return isDay ? '03d' : '03n';
  }

  if ([45, 48].includes(code)) {
    return isDay ? '50d' : '50n';
  }

  if ([51, 53, 55, 56, 57].includes(code)) {
    return isDay ? '09d' : '09n';
  }

  if (
    [61, 63, 65, 66, 67, 80, 81, 82].includes(code)
  ) {
    return isDay ? '10d' : '10n';
  }

  if ([71, 73, 75, 77, 85, 86].includes(code)) {
    return isDay ? '13d' : '13n';
  }

  if ([95, 96, 99].includes(code)) {
    return isDay ? '11d' : '11n';
  }

  return isDay ? '03d' : '03n';
};
export const searchLocations = async (
  query: string
): Promise<LocationResult[]> => {
  const trimmedQuery = query.trim();


const cityAliases: Record<string, string> = {
  bangalore: 'Bengaluru',
  manali: 'Manali',
};

const searchQuery =
  cityAliases[normalizeText(trimmedQuery)] || trimmedQuery;
  

  if (trimmedQuery.length < 2) {
    return [];
  }

  try {
    const response = await axios.get(GEOCODING_URL, {
      params: {
        name: searchQuery,
        count: 100,
        language: 'en',
        format: 'json',
      },
    });

    const results: LocationResult[] =
      response.data.results || [];

    if (!results.length) {
      return [];
    }
    const correctedResults = results.map((location) => {
      // Manali, India should be in Himachal Pradesh, not Tamil Nadu
      if (
        normalizeText(location.name) === 'manali' &&
        location.country_code === 'IN' &&
        location.admin1 === 'Tamil Nadu'
      ) {
        return { ...location, admin1: 'Himachal Pradesh' };
      }
      return location;
    });

    const normalizedQuery = normalizeText(searchQuery);

    const cityResults = correctedResults.filter((location) => {
      const name = normalizeText(location.name);

      const isNameMatch =
        name === normalizedQuery ||
        name.startsWith(normalizedQuery);
      const isCapital = location.feature_code === 'PPLC';
      const isAdministrative = location.feature_code?.startsWith('PPLA');
      const isMajorCity = location.feature_code === 'PPL' && (location.population || 0) >= 10000;

      const isCity = isCapital || isAdministrative || isMajorCity;

      return isNameMatch && isCity;
    });

    if (!cityResults.length) {
      return [];
    }

    const uniqueLocations = new Map<
      string,
      LocationResult
    >();

    cityResults.forEach((location) => {
      const key = [
        normalizeText(location.name),
        normalizeText(location.admin1 || ''),
        normalizeText(location.country_code),
      ].join('|');

      const existing = uniqueLocations.get(key);

      if (!existing) {
        uniqueLocations.set(key, location);
        return;
      }

      if (
        (location.population || 0) >
        (existing.population || 0)
      ) {
        uniqueLocations.set(key, location);
      }
    });

    const sortedResults = Array.from(
      uniqueLocations.values()
    ).sort((a, b) => {
      const aName = normalizeText(a.name);
      const bName = normalizeText(b.name);

      const aExact = aName === normalizedQuery;
      const bExact = bName === normalizedQuery;

      // Exact city name gets priority
      if (aExact !== bExact) {
        return aExact ? -1 : 1;
      }

      // Administrative cities get priority
      const aImportant =
        a.feature_code === 'PPLC' ||
        a.feature_code?.startsWith('PPLA');

      const bImportant =
        b.feature_code === 'PPLC' ||
        b.feature_code?.startsWith('PPLA');

      if (aImportant !== bImportant) {
        return aImportant ? -1 : 1;
      }
      return (
        (b.population || 0) -
        (a.population || 0)
      );
    });

    return sortedResults.slice(0, 10);

  } catch (error) {
    console.error(
      'Location search failed:',
      error
    );

    return [];
  }
};
export const getWeatherByLocation = async (
  location: LocationResult
): Promise<WeatherData> => {
  try {
    const forecastResponse = await axios.get(
      FORECAST_URL,
      {
        params: {
          latitude: location.latitude,
          longitude: location.longitude,

          current: [
            'temperature_2m',
            'relative_humidity_2m',
            'apparent_temperature',
            'pressure_msl',
            'wind_speed_10m',
            'visibility',
            'weather_code',
            'is_day',
          ].join(','),

          hourly: [
            'temperature_2m',
            'weather_code',
          ].join(','),

          daily: [
            'weather_code',
            'temperature_2m_max',
            'temperature_2m_min',
            'uv_index_max',
            'sunrise',
            'sunset',
          ].join(','),

          timezone: 'auto',
          forecast_days: 7,
        },
      }
    );

    const forecastData = forecastResponse.data;
    const current = forecastData.current;

    const isDay = current.is_day === 1;
    const currentHourIndex = forecastData.hourly.time.findIndex(
      (time: string) => {
        const hourDate = new Date(time);
        const now = new Date();
        return hourDate.getHours() === now.getHours() &&
               hourDate.getDate() === now.getDate();
      }
    );

    const startIndex = currentHourIndex >= 0 ? currentHourIndex : 0;

    const hourlyForecast =
      forecastData.hourly.time
        .slice(startIndex, startIndex + 6)
        .map(
          (
            time: string,
            index: number
          ) => {
            const weatherCode =
              forecastData.hourly
                .weather_code[startIndex + index];

            const hourDate = new Date(time);
            const now = new Date();
            const isCurrentHour = hourDate.getHours() === now.getHours() &&
                                 hourDate.getDate() === now.getDate();

            return {
              time: isCurrentHour ? 'Now' : new Date(
                time
              ).toLocaleTimeString(
                'en-US',
                {
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true,
                }
              ),

              temperature: Math.round(
                forecastData.hourly
                  .temperature_2m[startIndex + index]
              ),

              condition:
                getWeatherCondition(
                  weatherCode,
                  true
                ),

              icon: getWeatherIcon(
                weatherCode,
                true
              ),
            };
          }
        );
    const dailyForecast =
      forecastData.daily.time
        .slice(0, 7)
        .map(
          (
            dateString: string,
            index: number
          ) => {
            const weatherCode =
              forecastData.daily
                .weather_code[index];

            const date = new Date(
              `${dateString}T12:00:00`
            );

            return {
              day: date.toLocaleDateString(
                'en-US',
                {
                  weekday: 'short',
                }
              ),

              date: date.toLocaleDateString(
                'en-US',
                {
                  month: 'short',
                  day: 'numeric',
                }
              ),

              temperatureHigh: Math.round(
                forecastData.daily
                  .temperature_2m_max[index]
              ),

              temperatureLow: Math.round(
                forecastData.daily
                  .temperature_2m_min[index]
              ),

              condition:
                getWeatherCondition(
                  weatherCode,
                  true
                ),

              icon: getWeatherIcon(
                weatherCode,
                true
              ),
            };
          }
        );
    return {
      city: location.name,
      country: location.country,

      temperature: Math.round(
        current.temperature_2m
      ),

      feelsLike: Math.round(
        current.apparent_temperature
      ),

      humidity:
        current.relative_humidity_2m,

      windSpeed: Math.round(
        current.wind_speed_10m
      ),

      condition:
        getWeatherCondition(
          current.weather_code,
          isDay
        ),

      icon: getWeatherIcon(
        current.weather_code,
        isDay
      ),

      pressure: Math.round(
        current.pressure_msl
      ),

      visibility:
        Math.round(
          current.visibility / 100
        ) / 10,

      uvIndex: Math.round(
        forecastData.daily
          .uv_index_max[0] * 10
      ) / 10,

      sunrise:
        new Date(
          forecastData.daily.sunrise[0]
        ).getTime() / 1000,

      sunset:
        new Date(
          forecastData.daily.sunset[0]
        ).getTime() / 1000,

      hourlyForecast,
      dailyForecast,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        'Failed to fetch weather data'
      );
    }

    if (error instanceof Error) {
      throw error;
    }

    throw new Error(
      'An unexpected error occurred'
    );
  }
};
export const getWeatherByCity = async (
  city: string
): Promise<WeatherData> => {
  const locations =
    await searchLocations(city);

  if (!locations.length) {
    throw new Error('City not found');
  }
  return getWeatherByLocation(
    locations[0]
  );
};