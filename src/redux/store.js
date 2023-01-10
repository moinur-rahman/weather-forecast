import { configureStore } from "@reduxjs/toolkit";
import geocodeDataSlice from "./geocodeDataSlice";
import weatherDataSlice from "./weatherDataSlice";

const store = configureStore({
  reducer: {
    weatherData: weatherDataSlice,
    geocodeData: geocodeDataSlice,
  },
});

export default store;