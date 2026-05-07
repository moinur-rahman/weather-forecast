import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchGeocodeData } from "./geocodeDataSlice";
import type { RootState } from "./store";
import type { WeatherState } from "@/types/weather";

const initialState: WeatherState = {
  loading: false,
  city: null,
  dayForecast: [],
  error: null,
};

export const fetchWeatherData = createAsyncThunk(
  "weatherData/fetch",
  async (city: string, thunkAPI) => {
    await thunkAPI.dispatch(fetchGeocodeData(city));
    const { latitude, longitude } = (thunkAPI.getState() as RootState)
      .geocodeData;

    const response = await fetch(
      `/api/weather?latitude=${latitude}&longitude=${longitude}`
    );
    const data = await response.json();

    const sunrise = new Date(data.city.sunrise * 1000).toLocaleTimeString();
    const sunset = new Date(data.city.sunset * 1000).toLocaleTimeString();
    const date = new Date(data.city.sunrise * 1000).toLocaleDateString();

    return {
      city: { ...data.city, sunrise, sunset, date },
      dayForecast: data.list,
    };
  }
);

const weatherDataSlice = createSlice({
  name: "weatherData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.loading = false;
        state.city = action.payload.city;
        state.dayForecast = action.payload.dayForecast;
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.loading = false;
        state.city = null;
        state.error = action.error.message ?? null;
      });
  },
});

export default weatherDataSlice.reducer;
