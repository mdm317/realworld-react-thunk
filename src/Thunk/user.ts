import { ThunkAction } from "redux-thunk";
import { loginAPI, signupAPI } from "../Api/user";
import { RootState } from "../Redux";
import {
  loginFailAction,
  loginReqAction,
  loginSucAction,
  signupFailAction,
  signupReqAction,
  signupSucAction,
} from "../Redux/User/action";
import { ServerAction } from "../Redux/Server/reducer";
import { LoginAction, SignupAction } from "../Redux/User/types";
import { LoginUser } from "../db";
import { storeToken } from "../Jwt/jwt";

export function loginThunk({
  email,
  password,
}: {
  email: string;
  password: string;
}): ThunkAction<
  Promise<LoginUser>,
  RootState,
  null,
  LoginAction | ServerAction
> {
  return async (dispatch) => {
    dispatch(loginReqAction());
    try {
      const user = await loginAPI({ email, password });
      storeToken(user.token);
      dispatch(loginSucAction(user));
      return user;
    } catch (e) {
      if (e.response && e.response.data && e.response.data.errors) {
        dispatch(loginFailAction(e.response.data.errors));
        throw Error("Check error message");
      }
      throw Error("Internal Server Error! Try rater!");
    }
  };
}
export function signupThunk({
  username,
  email,
  password,
}: {
  username: string;
  email: string;
  password: string;
}): ThunkAction<Promise<LoginUser>, RootState, null, SignupAction> {
  return async (dispatch) => {
    dispatch(signupReqAction());
    try {
      const user = await signupAPI({ username, email, password });
      dispatch(signupSucAction(user));
      return user;
    } catch (e) {
      if (e.response && e.response.data && e.response.data.errors) {
        dispatch(signupFailAction(e.response.data.errors));
        throw Error("Check error message");
      }
      throw Error("Internal Server Error! Try rater!");
    }
  };
}
