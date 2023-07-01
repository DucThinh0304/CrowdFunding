import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
    },
    registerStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    registerSuccess: (state) => {
      state.isFetching = false;
      state.currentUser = null;
      state.error = false;
    },
    registerFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    settingStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    settingSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    settingFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    addressStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addressSuccess: (state) => {
      state.isFetching = false;
      state.error = false;
    },
    addressFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    favoriteStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    favoriteSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    favoriteFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    addCommentStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addCommentSuccess: (state) => {
      state.isFetching = false;
    },
    addCommentFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    changePasswordStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    changePasswordSuccess: (state) => {
      state.isFetching = false;
    },
    changePasswordFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  registerStart,
  registerSuccess,
  registerFailure,
  settingStart,
  settingSuccess,
  settingFailure,
  addressStart,
  addressSuccess,
  addressFailure,
  favoriteStart,
  favoriteSuccess,
  favoriteFailure,
  addCommentStart,
  addCommentSuccess,
  addCommentFailure,
  changePasswordStart,
  changePasswordSuccess,
  changePasswordFailure,
} = userSlice.actions;
export default userSlice.reducer;
