import { createSlice } from "@reduxjs/toolkit";

const campaignSlice = createSlice({
  name: "campaign",
  initialState: {
    campaigns: [],
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
      state.campaigns = action.payload;
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
