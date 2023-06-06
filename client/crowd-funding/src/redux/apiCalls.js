import {
  loginFailure,
  loginStart,
  loginSuccess,
  logoutStart,
  logoutSuccess,
  logoutFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  settingStart,
  settingSuccess,
  settingFailure,
  addressStart,
  addressSuccess,
  addressFailure,
} from "./userRedux";
import { publicRequest, userRequest } from "../requestMethod";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const logout = async (dispatch) => {
  dispatch(logoutStart());
  try {
    dispatch(logoutSuccess());
  } catch (err) {
    dispatch(logoutFailure());
  }
};

export const register = async (dispatch, user) => {
  dispatch(registerStart());
  try {
    const res = await publicRequest.post("/auth/register", user);
    dispatch(registerSuccess(res.data));
  } catch (err) {
    dispatch(registerFailure());
  }
};

export const setting = async (dispatch, user) => {
  dispatch(settingStart());
  try {
    const res = await userRequest.put(`/users/${user._id}`, user);
    const userPersist = JSON.parse(localStorage.getItem("persist:root"))?.user;
    const currentUser = userPersist && JSON.parse(userPersist).currentUser;
    const TOKEN = currentUser?.accessToken;
    res.data.accessToken = TOKEN;
    dispatch(settingSuccess(res.data));
  } catch (err) {
    dispatch(settingFailure());
  }
};

export const addAddress = async (dispatch, address) => {
  dispatch(addressStart());
  try {
    await userRequest.post(`/addresses/${address.username}`, address);
    dispatch(addressSuccess());
  } catch (err) {
    console.log(err);
    dispatch(addressFailure());
  }
};

export const editAddress = async (dispatch, address, id) => {
  dispatch(addressStart());
  try {
    const res = await userRequest.put(`/addresses/${id}`, address);
    dispatch(addressSuccess());
  } catch (err) {
    console.log(err);
    dispatch(addressFailure());
  }
};

export const deleteAddress = async (dispatch, id) => {
  dispatch(addressStart());
  try {
    const res = await userRequest.delete(`/addresses/${id}`);
    dispatch(addressSuccess());
  } catch (err) {
    console.log(err);
    dispatch(addressFailure());
  }
};

export const favorite = async (dispatch, id, campaignId) => {
  dispatch(settingStart());
  try {
    const res = await userRequest.put(`/users/favorite/${id}`, campaignId);
    dispatch(settingSuccess());
  } catch (err) {
    console.log(err);
    dispatch(settingFailure());
  }
};
