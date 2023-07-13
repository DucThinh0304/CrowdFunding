import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
    errorDes: "",
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
      state.errorDes = "";
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.errorDes = "";
    },
    loginFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
      state.errorDes = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
    },
    settingStart: (state) => {
      state.isFetching = true;
      state.error = false;
      state.errorDes = "";
    },
    settingSuccess: (state) => {
      state.isFetching = false;
      state.errorDes = "";
    },
    settingFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
      state.errorDes = action.payload;
    },
    newUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
      state.errorDes = "";
    },
    newUserSuccess: (state) => {
      state.isFetching = false;
      state.errorDes = "";
    },
    newUserFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
      state.errorDes = action.payload;
    },
    savingPendingStart: (state) => {
      state.isFetching = true;
      state.error = false;
      state.errorDes = "";
    },
    savingPendingSuccess: (state) => {
      state.isFetching = false;
      state.errorDes = "";
    },
    savingPendingFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
      state.errorDes = action.payload;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  settingStart,
  settingSuccess,
  settingFailure,
  newUserStart,
  newUserSuccess,
  newUserFailure,
  savingPendingStart,
  savingPendingSuccess,
  savingPendingFailure,
} = userSlice.actions;
export default userSlice.reducer;
