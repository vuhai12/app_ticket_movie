import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { MovieState, Movie, SortableMovieField } from "../../types/movie.types";
import {
  createMovieServices,
  deleteMovieServices,
  getMoviesServices,
  updateMovieServices,
} from "@services/movies.services";

const initialState: MovieState = {
  data: { dataMovies: [], total: 0 },
  loading: false,
  error: null,
};

// thunk
export const fetchMovies = createAsyncThunk<
  { dataMovies: Movie[]; total: number }, // payload khi success
  {
    status?: string;
    title?: string;
    from: number;
    to: number;
    order?: "asc" | "desc";
    sortBy?: SortableMovieField;
  },
  { rejectValue: string }
>("movies/fetchMovies", async (payload, { rejectWithValue }) => {
  try {
    return await getMoviesServices(payload);
  } catch (err: any) {
    return rejectWithValue(
      err?.response?.data?.message || err.message || "Fetch movies failed"
    );
  }
});

export const createMovie = createAsyncThunk<
  Movie[],
  Omit<Movie, "id">,
  { rejectValue: string }
>("movies/createMovie", async (payload, { rejectWithValue }) => {
  try {
    return await createMovieServices(payload);
  } catch (err: any) {
    return rejectWithValue(
      err?.response?.data?.message || err.message || "Fetch movies failed"
    );
  }
});

export const updateMovie = createAsyncThunk<
  Movie,
  { movieId: string; data: Partial<Omit<Movie, "id">> },
  { rejectValue: string }
>("movies/updateMovie", async (payload, { rejectWithValue }) => {
  try {
    return await updateMovieServices(payload.movieId, payload.data);
  } catch (err: any) {
    return rejectWithValue(
      err?.response?.data?.message || err.message || "Fetch movies failed"
    );
  }
});

export const deleteMovie = createAsyncThunk<
  Movie,
  string,
  { rejectValue: string }
>("movies/deleteMovie", async (payload, { rejectWithValue }) => {
  try {
    return await deleteMovieServices(payload);
  } catch (err: any) {
    return rejectWithValue(
      err?.response?.data?.message || err.message || "Fetch movies failed"
    );
  }
});

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unknown error";
      })

      .addCase(createMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMovie.fulfilled, (state, _) => {
        state.loading = false;
      })
      .addCase(createMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unknown error";
      })

      .addCase(updateMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMovie.fulfilled, (state, _) => {
        state.loading = false;
      })
      .addCase(updateMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unknown error";
      })

      .addCase(deleteMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMovie.fulfilled, (state, _) => {
        state.loading = false;
      })
      .addCase(deleteMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unknown error";
      });
  },
});

export default moviesSlice.reducer;
