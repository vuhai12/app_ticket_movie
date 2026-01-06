import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { MovieVotes, MovieVotesState } from "../../types/votes";
import {
  votesMovieBulkServices,
  votesMovieServices,
} from "@services/votesMovie.services";

const initialState: MovieVotesState = {
  data: [],
  loading: false,
  error: null,
};

// thunk
export const createVotesMovie = createAsyncThunk<
  MovieVotes[], // payload khi success
  Omit<MovieVotes, "id">, // argument
  { rejectValue: string }
>("votesMovie/createVotesMovie", async (payload, { rejectWithValue }) => {
  try {
    return await votesMovieServices(payload);
  } catch (err: any) {
    return rejectWithValue(
      err?.response?.data?.message || err.message || "Fetch cinemas failed"
    );
  }
});

export const createVotesMovieBulk = createAsyncThunk<
  MovieVotes[], // payload khi success
  Omit<MovieVotes, "id">[], // argument
  { rejectValue: string }
>(
  "votesMovieBulk/createVotesMovieBulk",
  async (payload, { rejectWithValue }) => {
    try {
      return await votesMovieBulkServices(payload);
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message || err.message || "Fetch cinemas failed"
      );
    }
  }
);

const votesMovieSlice = createSlice({
  name: "votesMovie",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createVotesMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createVotesMovie.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(createVotesMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unknown error";
      })

      .addCase(createVotesMovieBulk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createVotesMovieBulk.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(createVotesMovieBulk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unknown error";
      });
  },
});

export default votesMovieSlice.reducer;
