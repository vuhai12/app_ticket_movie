import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getMoviesWithShowtimesServices } from "@services/movies.services";
import {
  moviesWithShowtimes,
  MoviesWithShowtimesState,
} from "../../types/movie.types";

const initialState: MoviesWithShowtimesState = {
  data: [],
  loading: false,
  error: null,
};

// thunk
export const fetchMoviesWithShowtimes = createAsyncThunk<
  moviesWithShowtimes[],
  string,
  { rejectValue: string }
>(
  "moviesWithShowtimes/fetchmoviesWithShowtimes",
  async (cinemaId, { rejectWithValue }) => {
    try {
      return await getMoviesWithShowtimesServices(cinemaId);
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message || err.message || "Fetch movies failed"
      );
    }
  }
);

const moviesWithShowtimesSlice = createSlice({
  name: "moviesWithShowtimes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMoviesWithShowtimes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMoviesWithShowtimes.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchMoviesWithShowtimes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unknown error";
      });
  },
});

export default moviesWithShowtimesSlice.reducer;
