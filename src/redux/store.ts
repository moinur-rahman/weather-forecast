import { configureStore } from "@reduxjs/toolkit";
import geocodeDataReducer from "./geocodeDataSlice";
import weatherDataReducer from "./weatherDataSlice";

export const store = configureStore({
  reducer: {
    weatherData: weatherDataReducer,
    geocodeData: geocodeDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
