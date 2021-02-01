import * as types from "./types";
import { LoginUser, Profile, User } from "../../db";
export interface AuthError {
  username?: [string];
  email?: [string];
  password?: [string];
  "email or password"?: [string];
}
export const loginReqAction = () =>
  ({
    type: types.LOGIN_REQUEST,
  } as const);
export const loginSucAction = (user: LoginUser) =>
  ({
    type: types.LOGIN_SUCCESS,
    payload: user,
  } as const);
export const loginFailAction = (errorMessage: AuthError) =>
  ({
    type: types.LOGIN_FAILURE,
    payload: errorMessage,
  } as const);
export const signupReqAction = () =>
  ({
    type: types.SIGNUP_REQUEST,
  } as const);
export const signupSucAction = (user: LoginUser) =>
  ({
    type: types.SIGNUP_SUCCESS,
    payload: user,
  } as const);
export const signupFailAction = (errorMessage: AuthError) =>
  ({
    type: types.SIGNUP_FAILURE,
    payload: errorMessage,
  } as const);
export const logOutSucAction = () =>
  ({
    type: types.LOGOUT_SUCCESS,
  } as const);
export const updateUserReqAction = () =>
  ({
    type: types.UPDATE_USER_REQUEST,
  } as const);

export const updateUserSucAction = (user: LoginUser) =>
  ({
    type: types.UPDATE_USER_SUCCESS,
    payload: user,
  } as const);

export const updateUserFailAction = (errorMessage: AuthError) =>
  ({
    type: types.UPDATE_USER_FAILURE,
    payload: errorMessage,
  } as const);
export const getProfileReqAction = () =>
  ({
    type: types.GET_PROFILE_REQUEST,
  } as const);

export const getProfileSucAction = (Profile: Profile) =>
  ({
    type: types.GET_PROFILE_SUCCESS,
    payload: Profile,
  } as const);

export const getProfileFailAction = () =>
  ({
    type: types.GET_PROFILE_FAILURE,
  } as const);
