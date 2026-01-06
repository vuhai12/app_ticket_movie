import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Movie, MovieItemState } from "../../types/movie.types";
import { getMovieDetailServices } from "@services/movies.services";

const initialState: MovieItemState = {
  data: [],
  loading: false,
  error: null,
};

// thunk
export const fetchMovieDetail = createAsyncThunk<
  Movie[], // payload khi success
  string,
  { rejectValue: string }
>("movieDetail/fetchMovieDetail", async (movieId, { rejectWithValue }) => {
  try {
    return await getMovieDetailServices(movieId);
  } catch (err: any) {
    return rejectWithValue(
      err?.response?.data?.message || err.message || "Fetch movies failed"
    );
  }
});

const moviesSlice = createSlice({
  name: "movieDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieDetail.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchMovieDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unknown error";
      });
  },
});

export default moviesSlice.reducer;
