import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchGeocodeData } from "./geocodeDataSlice";
import store from "./store";

const initialState = {
  loading: false,
  city: {},
  dayForecast: [],
  error: null,
};

export const fetchWeatherData = createAsyncThunk(
  "weatherData/fetch",
  async (city, thunkAPI) => {
    await thunkAPI.dispatch(fetchGeocodeData(city));
    const { latitude, longitude } = store.getState().geocodeData;

    return await axios
      .get(
        `api/weather?latitude=${latitude}&longitude=${longitude}`
      )
      .then(({ data }) => {
        const sunrise = new Date(data.city.sunrise * 1000).toLocaleTimeString();
        const sunset = new Date(data.city.sunset * 1000).toLocaleTimeString();
        const date = new Date(data.city.sunrise * 1000).toLocaleDateString();
        data.city = {
          ...data.city,
          sunrise,
          sunset,
          date,
        };
        return {
          city: data.city,
          dayForecast: data.list,
        };
      });
  }
);

const weatherDataSlice = createSlice({
  name: "weatherData",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchWeatherData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchWeatherData.fulfilled, (state, action) => {
      (state.loading = true),
        (state.city = action.payload.city),
        (state.dayForecast = action.payload.dayForecast);
    });
    builder.addCase(fetchWeatherData.rejected, (state, action) => {
      (state.loading = false),
        (state.city = []),
        (state.error = action.error.message);
    });
  },
});

export default weatherDataSlice.reducer;
