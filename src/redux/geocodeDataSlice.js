import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  latitude: null,
  longitude: null,
  location: null,
  error: null,
};

export const fetchGeocodeData = createAsyncThunk(
  "geocodeData/fetch",
  async (place) => {
    return await axios
      .get(
        `/api/geocode?place=${place}`
        )
      .then(({ data }) => {
        return {
          latitude: data.features[0].center[1],
          longitude: data.features[0].center[0],
          location: data.features[0].place_name,
        };
      });
  }
);

const geocodeDataSlice = createSlice({
  name: "weatherData",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchGeocodeData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchGeocodeData.fulfilled, (state, action) => {
      (state.loading = true),
        (state.latitude = action.payload.latitude),
        (state.longitude = action.payload.longitude),
        (state.location = action.payload.location);
    });
    builder.addCase(fetchGeocodeData.rejected, (state, action) => {
      (state.loading = false),
        (state.latitude = null),
        (state.longitude = null),
        (state.error = action.error.message);
    });
  },
});

export default geocodeDataSlice.reducer;
