import { ThunkAction } from "redux-thunk";
import {
  getCurrentUserAPI,
  getProfileAPI,
  loginAPI,
  logOutAPI,
  signupAPI,
  updateUserAPI,
} from "../Api/user";
import { RootState } from "../Redux";
import {
  loginFailAction,
  loginReqAction,
  loginSucAction,
  logOutSucAction,
  signupFailAction,
  signupReqAction,
  signupSucAction,
  updateUserFailAction,
  updateUserSucAction,
} from "../Redux/User/action";
import { ServerAction } from "../Redux/Server/reducer";
import { LoginAction, SignupAction, UpdateAction } from "../Redux/User/types";
import { LoginUser } from "../db";
import { storeToken } from "../Jwt/jwt";
import { UpdateUserProp } from "../types";

export function getCurrentUserThunk(
  token: string
): ThunkAction<void, RootState, null, LoginAction | ServerAction> {
  return async (dispatch) => {
    try {
      const user = await getCurrentUserAPI(token);
      dispatch(loginSucAction(user));
    } catch (e) {
      console.log("current user doesn't exit");
      // throw Error("current user doesn't exit");
    }
  };
}
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

export function logoutThunk(): ThunkAction<
  void,
  RootState,
  null,
  ReturnType<typeof logOutSucAction>
> {
  return (dispatch) => {
    logOutAPI();
    dispatch(logOutSucAction());
  };
}

export function updateUserThunk(
  user: UpdateUserProp
): ThunkAction<Promise<LoginUser>, RootState, null, UpdateAction> {
  return async (dispatch) => {
    try {
      const newUser = await updateUserAPI(user);
      dispatch(updateUserSucAction(newUser));
      return newUser;
    } catch (e) {
      if (e.response && e.response.data && e.response.data.errors) {
        dispatch(updateUserFailAction(e.response.data.errors));
        throw Error("Check error message");
      }
      throw Error("try rater!");
    }
  };
}
