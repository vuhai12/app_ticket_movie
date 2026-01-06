import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postUserServices } from "@services/users.services";
import { User, UserState } from "../../types/auth.types";

const initialState: UserState = {
  data: [],
  loading: false,
  error: null,
};

// thunk
export const fetchUsers = createAsyncThunk<
  User[], // payload khi success
  { type: "guest" | "auth" | "admin"; auth_id: string | null }, // argument
  { rejectValue: string }
>("users/fetchUsers", async (payload, { rejectWithValue }) => {
  try {
    return await postUserServices(payload);
  } catch (err: any) {
    return rejectWithValue(
      err?.response?.data?.message || err.message || "Fetch cinemas failed"
    );
  }
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearUsers(state) {
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unknown error";
      });
  },
});

export default usersSlice.reducer;
export const { clearUsers } = usersSlice.actions;
