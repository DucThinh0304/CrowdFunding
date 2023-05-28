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
} from "./userRedux";
import { publicRequest } from "../requestMethod";
import {
  getCampaignFailure,
  getCampaignStart,
  getCampaignSuccess,
} from "./campaignRedux";

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
    localStorage.clear();
    dispatch(loginSuccess());
  } catch (err) {
    dispatch(loginFailure());
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

export const getCampaign = async (dispatch) => {
  dispatch(getCampaignStart());
  try {
    const res = await publicRequest.get("/campaign");
    dispatch(getCampaignSuccess(res.data));
  } catch (err) {
    dispatch(getCampaignFailure());
  }
};
