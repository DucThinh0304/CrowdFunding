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
      state.currentUser = action.payload;
    },
    getStripeFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export default stripeSlice.reducer;
