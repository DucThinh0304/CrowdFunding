import {
  loginFailure,
  loginStart,
  loginSuccess,
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

export const logoutUser = async (dispatch) => {
  dispatch(logout());
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
    await userRequest.put(`/addresses/${id}`, address);
    dispatch(addressSuccess());
  } catch (err) {
    console.log(err);
    dispatch(addressFailure());
  }
};

export const deleteAddress = async (dispatch, id) => {
  dispatch(addressStart());
  try {
    await userRequest.delete(`/addresses/${id}`);
    dispatch(addressSuccess());
  } catch (err) {
    console.log(err);
    dispatch(addressFailure());
  }
};

export const favorite = async (dispatch, id, campaignId) => {
  dispatch(favoriteStart());
  try {
    const res = await userRequest.put(`/users/favorite/${id}`, {
      campaignId: campaignId,
    });
    const userPersist = JSON.parse(localStorage.getItem("persist:root"))?.user;
    const currentUser = userPersist && JSON.parse(userPersist).currentUser;
    const TOKEN = currentUser?.accessToken;
    res.data.accessToken = TOKEN;
    dispatch(favoriteSuccess(res.data));
  } catch (err) {
    console.log(err);
    dispatch(favoriteFailure());
  }
};

export const addPending = async (dispatch, pending) => {
  dispatch(addressStart());
  try {
    const res = await userRequest.post(`/pendings/`, pending);
    dispatch(addressSuccess());
  } catch (err) {
    console.log(err);
    dispatch(addressSuccess());
  }
};
