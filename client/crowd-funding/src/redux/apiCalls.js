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
  addCommentStart,
  addCommentSuccess,
  addCommentFailure,
  changePasswordStart,
  changePasswordSuccess,
  changePasswordFailure,
  textStart,
  textSuccess,
  textFailure,
  addUpdateStart,
  addUpdateSuccess,
  addUpdateFailure,
} from "./userRedux";
import { publicRequest, userRequest } from "../requestMethod";
import {
  getStripeFailure,
  getStripeStart,
  getStripeSuccess,
} from "./stripeRedux";

const getAccessToken = () => {
  const userPersist = JSON.parse(localStorage.getItem("persist:root"))?.user;
  const currentUser = userPersist && JSON.parse(userPersist).currentUser;
  const TOKEN = currentUser?.accessToken;
  return TOKEN;
};

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const resUser = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(resUser.data));
  } catch (err) {
    dispatch(loginFailure(err.response.data));
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
    dispatch(registerFailure(err.response.data));
  }
};

export const setting = async (dispatch, user) => {
  dispatch(settingStart());
  try {
    const res = await userRequest.put(`/users/${user._id}`, user);
    res.data.accessToken = getAccessToken();
    dispatch(settingSuccess(res.data));
  } catch (err) {
    dispatch(settingFailure(err.response.data));
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
    res.data.accessToken = getAccessToken();
    dispatch(favoriteSuccess(res.data));
  } catch (err) {
    console.log(err);
    dispatch(favoriteFailure());
  }
};

export const removefavorite = async (dispatch, id, campaignId) => {
  dispatch(favoriteStart());
  try {
    const res = await userRequest.put(`/users/removefavorite/${id}`, {
      campaignId: campaignId,
    });
    res.data.accessToken = getAccessToken();
    dispatch(favoriteSuccess(res.data));
  } catch (err) {
    console.log(err);
    dispatch(favoriteFailure());
  }
};

export const addPending = async (dispatch, pending) => {
  dispatch(addressStart());
  try {
    await userRequest.post(`/pendings/`, pending);
    dispatch(addressSuccess());
  } catch (err) {
    console.log(err);
    dispatch(addressSuccess());
  }
};

export const getStripe = async (dispatch, id) => {
  dispatch(getStripeStart());
  try {
    const res = await publicRequest.get(`/contributes/find/${id}`);
    res.data.accessToken = getAccessToken();
    dispatch(getStripeSuccess(res.data));
  } catch (err) {
    console.log(err);
    dispatch(getStripeFailure());
  }
};

export const addComment = async (dispatch, id, comment) => {
  dispatch(addCommentStart());
  try {
    const res = await userRequest.post(`/campaign/comment/${id}`, comment);
    res.data.accessToken = getAccessToken();
    dispatch(addCommentSuccess(res.data));
  } catch (err) {
    dispatch(addCommentFailure());
  }
};

export const changePassword = async (dispatch, id, password) => {
  dispatch(changePasswordStart());
  try {
    await publicRequest.put(`/users/password/${id}`, password);
    dispatch(changePasswordSuccess());
    logoutUser(dispatch);
  } catch (err) {
    dispatch(changePasswordFailure());
  }
};

export const text = async (dispatch, id, userId) => {
  dispatch(textStart());
  try {
    const res = await publicRequest.post(`/users/following/${id}`, userId);
    res.data.accessToken = getAccessToken();
    dispatch(textSuccess(res.data));
  } catch (err) {
    dispatch(textFailure());
  }
};

export const addUpdate = async (dispatch, id, update) => {
  dispatch(addUpdateStart());
  try {
    const res = await publicRequest.put(`/campaign/update/${id}`, update);
    dispatch(addUpdateSuccess());
  } catch (err) {
    dispatch(addUpdateFailure());
  }
};
