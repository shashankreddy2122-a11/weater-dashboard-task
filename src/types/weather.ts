export interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  icon: string;
  pressure: number;
  visibility: number;
  uvIndex: number | null;
  sunrise: number;
  sunset: number;
  hourlyForecast: HourlyForecast[];
  dailyForecast: DailyForecast[];
}

export interface HourlyForecast {
  time: string;
  temperature: number;
  condition: string;
  icon: string;
}

export interface DailyForecast {
  day: string;
  date: string;
  temperatureHigh: number;
  temperatureLow: number;
  condition: string;
  icon: string;
}

export interface OpenWeatherResponse {
  coord: {
    lat: number;
    lon: number;
  };
  
  name: string;

  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };

  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };

  visibility: number;

  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;

  wind: {
    speed: number;
    deg?: number;
  };
}

export type WeatherCondition =
  | 'Clear'
  | 'Clouds'
  | 'Rain'
  | 'Drizzle'
  | 'Thunderstorm'
  | 'Snow'
  | 'Mist'
  | 'Fog'
  | 'Haze'
  | 'Atmosphere';