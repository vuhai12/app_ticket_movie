import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { News, NewsState } from "../../types/news.types";
import { getNewsDetailServices } from "@services/news.services";

const initialState: NewsState = {
  data: [],
  loading: false,
  error: null,
};

// thunk
export const fetchNewsDetail = createAsyncThunk<
  News[], // payload khi success
  string,
  { rejectValue: string }
>("newsDetail/fetchNewsDetail", async (newsId, { rejectWithValue }) => {
  try {
    return await getNewsDetailServices(newsId);
  } catch (err: any) {
    return rejectWithValue(
      err?.response?.data?.message || err.message || "Fetch movies failed"
    );
  }
});

const newsSlice = createSlice({
  name: "newsDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewsDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNewsDetail.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchNewsDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unknown error";
      });
  },
});

export default newsSlice.reducer;
