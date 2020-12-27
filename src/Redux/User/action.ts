import * as types from "./types";
import { LoginUser } from "../../db";
export interface AuthError {
  username?: [string];
  email?: [string];
  password?: [string];
  "email or password"?: [string];
}
export const loginReqAction = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) =>
  ({
    type: types.LOGIN_REQUEST,
    payload: {
      email,
      password,
    },
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
