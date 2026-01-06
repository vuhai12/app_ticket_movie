import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Showtime, ShowtimeState } from "../../types/showtime.type";
import { getShowtimesServices } from "@services/showtime.services";

const initialState: ShowtimeState = {
  data: [],
  loading: false,
  error: null,
};

// thunk
export const fetchShowtime = createAsyncThunk<
  Showtime[],
  string,
  { rejectValue: string }
>("showtimes/fetchShowtimesDetail", async (movieId, { rejectWithValue }) => {
  try {
    return await getShowtimesServices(movieId);
  } catch (err: any) {
    return rejectWithValue(
      err?.response?.data?.message || err.message || "Fetch movies failed"
    );
  }
});

const showtimesSlice = createSlice({
  name: "showtimes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShowtime.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShowtime.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchShowtime.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unknown error";
      });
  },
});

export default showtimesSlice.reducer;
