import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCinemasServices } from "@services/cinemas.services";
import { Cinema, CinemasState } from "../../types/cinema.types";

const initialState: CinemasState = {
  data: [],
  loading: false,
  error: null,
};

// thunk
export const fetchCinemas = createAsyncThunk<
  Cinema[], // payload khi success
  void, // argument
  { rejectValue: string }
>("cinemas/fetchCinemas", async (_, { rejectWithValue }) => {
  try {
    return await getCinemasServices();
  } catch (err: any) {
    return rejectWithValue(
      err?.response?.data?.message || err.message || "Fetch cinemas failed"
    );
  }
});

const cinemasSlice = createSlice({
  name: "cinemas",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCinemas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCinemas.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchCinemas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unknown error";
      });
  },
});

export default cinemasSlice.reducer;
