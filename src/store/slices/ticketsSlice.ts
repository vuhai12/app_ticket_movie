import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Tickets, TicketsState } from "../../types/tickets.types";
import { postTicketsServices } from "@services/tikets.services";

const initialState: TicketsState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchTickets = createAsyncThunk<
  Tickets[],
  Omit<Tickets, "id">,
  { rejectValue: string }
>("tickets/fetchTickets", async (payload, { rejectWithValue }) => {
  try {
    return await postTicketsServices(payload);
  } catch (err: any) {
    return rejectWithValue(
      err?.response?.data?.message || err.message || "Fetch cinemas failed"
    );
  }
});

const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    clearUsers(state) {
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unknown error";
      });
  },
});

export default ticketsSlice.reducer;
