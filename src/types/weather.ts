export interface WeatherCondition {
  icon: string;
  main: string;
  description: string;
}

export interface WeatherEntry {
  dt_txt: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  clouds: { all: number };
  wind: { speed: number };
  weather: WeatherCondition[];
}

export interface CityData {
  id: number;
  name: string;
  country: string;
  timezone: number;
  sunrise: string;
  sunset: string;
  date: string;
}

export interface WeatherState {
  loading: boolean;
  city: CityData | null;
  dayForecast: WeatherEntry[];
  error: string | null;
}

export interface GeocodeState {
  loading: boolean;
  latitude: number | null;
  longitude: number | null;
  location: string | null;
  error: string | null;
}
