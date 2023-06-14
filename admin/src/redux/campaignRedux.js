import { createSlice } from "@reduxjs/toolkit";

export const campaignSlice = createSlice({
  name: "campaign",
  initialState: {
    campaign: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    getCampaignStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getCampaignSuccess: (state, action) => {
      state.isFetching = false;
      state.products = action.payload;
    },
    getCampaignFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});
export const { getCampaignStart, getCampaignSuccess, getCampaignFailure } =
  campaignSlice.actions;

export default campaignSlice.reducer;
