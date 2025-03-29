import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCashBalance = createAsyncThunk(
  "cash/getCashBalance",
  async () => {
    const response = await axios.get(
      "http://localhost:8080/rest/api/getTreasuryBalance"
    );
    return response.data;
  }
);

const initialState = {
  amount: 0,
  loading: false,
  error: null,
};

export const cashSlice = createSlice({
  name: "cash",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCashBalance.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCashBalance.fulfilled, (state, action) => {
        state.amount = action.payload;
        state.loading = false;
      })
      .addCase(getCashBalance.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default cashSlice.reducer;
