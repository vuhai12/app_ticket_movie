import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Seats, SeatsState } from "../../types/seats.type";
import { getSeatsServices, postSeatsServices } from "@services/seats.services";

const initialState: SeatsState = {
  seatsByShowtime: [],
  createdSeats: [],
  loadingSeatsByShowtime: false,
  loadingCreatedSeats: false,
  errorSeatsByShowtime: null,
  errorCreatedSeats: null,
};

// thunk
export const createSeats = createAsyncThunk<
  Seats[], // payload khi success
  Seats[], // argument
  { rejectValue: string }
>("seats/createSeats", async (payload, { rejectWithValue }) => {
  try {
    return await postSeatsServices(payload);
  } catch (err: any) {
    return rejectWithValue(
      err?.response?.data?.message || err.message || "Fetch cinemas failed"
    );
  }
});

export const fetchSeats = createAsyncThunk<
  Seats[], // payload khi success
  string, // argument
  { rejectValue: string }
>("seats/fetchSeats", async (showtime_id, { rejectWithValue }) => {
  try {
    return await getSeatsServices(showtime_id);
  } catch (err: any) {
    return rejectWithValue(
      err?.response?.data?.message || err.message || "Fetch cinemas failed"
    );
  }
});

const seatsSlice = createSlice({
  name: "seats",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchSeats.pending, (state) => {
        state.loadingSeatsByShowtime = true;
        state.errorSeatsByShowtime = null;
      })
      .addCase(fetchSeats.fulfilled, (state, action) => {
        state.seatsByShowtime = action.payload;
        state.loadingSeatsByShowtime = false;
      })
      .addCase(fetchSeats.rejected, (state, action) => {
        state.loadingSeatsByShowtime = false;
        state.errorSeatsByShowtime = action.payload ?? "Unknown error";
      })

      .addCase(createSeats.pending, (state) => {
        state.loadingCreatedSeats = true;
        state.errorCreatedSeats = null;
      })
      .addCase(createSeats.fulfilled, (state, action) => {
        state.createdSeats = action.payload;
        state.loadingCreatedSeats = false;
      })
      .addCase(createSeats.rejected, (state, action) => {
        state.loadingCreatedSeats = false;
        state.errorCreatedSeats = action.payload ?? "Unknown error";
      });
  },
});

export default seatsSlice.reducer;
