import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { News, NewsState } from "../../types/news.types";
import { getNewsServices } from "@services/news.services";

const initialState: NewsState = {
  data: [],
  loading: false,
  error: null,
};

// thunk
export const fetchNews = createAsyncThunk<
  News[], // payload khi success
  void,
  { rejectValue: string }
>("news/fetchNews", async (_, { rejectWithValue }) => {
  try {
    return await getNewsServices();
  } catch (err: any) {
    return rejectWithValue(
      err?.response?.data?.message || err.message || "Fetch movies failed"
    );
  }
});

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unknown error";
      });
  },
});

export default newsSlice.reducer;
