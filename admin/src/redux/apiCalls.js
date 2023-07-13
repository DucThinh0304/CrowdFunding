import {
  loginFailure,
  loginStart,
  loginSuccess,
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
} from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure(err.response.data));
  }
};

export const logoutUser = async (dispatch) => {
  dispatch(logout());
};

export const setting = async (dispatch, user) => {
  dispatch(settingStart());
  try {
    const res = await publicRequest.put(`/users/${user._id}`, user);
    dispatch(settingSuccess());
  } catch (err) {
    dispatch(settingFailure(err.response.data));
  }
};

export const newUser = async (dispatch, user) => {
  dispatch(newUserStart());
  try {
    const res = await publicRequest.post(`/users/new`, user);
    dispatch(newUserSuccess());
  } catch (err) {
    dispatch(newUserFailure(err.response.data));
  }
};

export const savingPending = async (dispatch, id, isMove, pending) => {
  console.log(id, isMove, pending);
  dispatch(savingPendingStart());
  try {
    await userRequest.put(`/pendings/${id}`, pending);
    if (isMove) {
      await publicRequest.put(`/campaign/move/${id}`);
    }
    dispatch(savingPendingSuccess());
  } catch (err) {
    dispatch(savingPendingFailure(err.response.data));
  }
};
