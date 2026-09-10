import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getWeatherByLocation, LocationResult } from '../../services/weatherApi';
import { WeatherData } from '../../types/weather';

interface WeatherState {
  viewState: 'initial' | 'loading' | 'success' | 'error';
  weather: WeatherData | null;
  error: string | null;
}

const initialState: WeatherState = {
  viewState: 'initial',
  weather: null,
  error: null,
};

export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (location: LocationResult) => {
    return await getWeatherByLocation(location);
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    resetWeather: (state) => {
      state.viewState = 'initial';
      state.weather = null;
      state.error = null;
    },
    setViewState: (state, action: PayloadAction<'initial' | 'loading' | 'success' | 'error'>) => {
      state.viewState = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.viewState = 'loading';
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.viewState = 'success';
        state.weather = action.payload;
        state.error = null;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.viewState = 'error';
        state.error = action.error.message || 'Failed to fetch weather data';
      });
  },
});

export const { resetWeather, setViewState } = weatherSlice.actions;
export default weatherSlice.reducer;
