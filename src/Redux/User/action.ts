import * as types from "./types";
import { LoginUser } from "../../db";
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
