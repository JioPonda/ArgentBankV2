// Actions creators for modification of the state

import {
  GET_USER_PROFILE,
  GET_USER_PROFILE_FAIL,
  LOGIN_FAIL,
  LOGIN_PASS,
  LOGIN_PASS_LOCAL_STORAGE,
  LOG_OUT,
  UPDATE_USER_PROFILE,
  UPDATE_USER_PROFILE_FAIL,
} from "./reducers";

export const actionLogInPass = (payload) => ({
  type: LOGIN_PASS,
  payload: payload,
});

export const actionLogInFail = (payload) => ({
  type: LOGIN_FAIL,
  payload: payload,
});

export const actionGetUserProfile = (payload) => ({
  type: GET_USER_PROFILE,
  payload: payload,
});

export const actionGetUserProfileFail = (payload) => ({
  type: GET_USER_PROFILE_FAIL,
  payload: payload,
});

export const actionUpdateUserProfile = (payload) => ({
  type: UPDATE_USER_PROFILE,
  payload: payload,
});

export const actionUpdateUserProfileFail = (payload) => ({
  type: UPDATE_USER_PROFILE_FAIL,
  payload: payload,
});

export const actionLogInPassLocalStorage = (payload) => ({
  type: LOGIN_PASS_LOCAL_STORAGE,
  payload: payload,
});

export const actionLogOut = (payload) => ({
  type: LOG_OUT,
  payload: payload,
});
