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
} from "./userRedux";
import { publicRequest, userRequest } from "../requestMethod";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    localStorage.clear();
    localStorage.setItem("username", res.data.username);
    localStorage.setItem("name", res.data.name);
    localStorage.setItem("avt", res.data.avt);
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
    dispatch(settingSuccess(res.data));
  } catch (err) {
    dispatch(settingFailure());
  }
};
