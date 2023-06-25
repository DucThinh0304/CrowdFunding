import { createSlice } from "@reduxjs/toolkit";

const stripeSlice = createSlice({
  name: "stripe",
  initialState: {
    currentStripe: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    getStripeStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getStripeSuccess: (state, action) => {
      state.isFetching = false;
      state.currentStripe = action.payload;
    },
    getStripeFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { getStripeStart, getStripeSuccess, getStripeFailure } =
  stripeSlice.actions;

export default stripeSlice.reducer;
