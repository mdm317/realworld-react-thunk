import * as actions from "./action";
// console.log(actions); //?

export type LoginAction =
  | ReturnType<typeof actions.loginReqAction>
  | ReturnType<typeof actions.loginSucAction>
  | ReturnType<typeof actions.loginFailAction>;
export type SignupAction =
  | ReturnType<typeof actions.signupReqAction>
  | ReturnType<typeof actions.signupSucAction>
  | ReturnType<typeof actions.signupFailAction>;

export type UpdateAction =
  | ReturnType<typeof actions.updateUserReqAction>
  | ReturnType<typeof actions.updateUserSucAction>
  | ReturnType<typeof actions.updateUserFailAction>;

export type UserActionType = LoginAction | SignupAction | UpdateAction;
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";

export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILURE = "UPDATE_USER_FAILURE";
