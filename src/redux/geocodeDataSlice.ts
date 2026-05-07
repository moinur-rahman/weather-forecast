import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { GeocodeState } from "@/types/weather";

const initialState: GeocodeState = {
  loading: false,
  latitude: null,
  longitude: null,
  location: null,
  error: null,
};

export const fetchGeocodeData = createAsyncThunk(
  "geocodeData/fetch",
  async (place: string) => {
    const response = await fetch(
      `/api/geocode?place=${encodeURIComponent(place)}`
    );
    const data = await response.json();
    return {
      latitude: data.features[0].center[1] as number,
      longitude: data.features[0].center[0] as number,
      location: data.features[0].place_name as string,
    };
  }
);

const geocodeDataSlice = createSlice({
  name: "geocodeData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGeocodeData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGeocodeData.fulfilled, (state, action) => {
        state.loading = false;
        state.latitude = action.payload.latitude;
        state.longitude = action.payload.longitude;
        state.location = action.payload.location;
      })
      .addCase(fetchGeocodeData.rejected, (state, action) => {
        state.loading = false;
        state.latitude = null;
        state.longitude = null;
        state.error = action.error.message ?? null;
      });
  },
});

export default geocodeDataSlice.reducer;
