import { ThunkAction } from "redux-thunk";
import { loginAPI } from "../Api/user";
import { RootState } from "../Redux";
import {
  loginFailAction,
  loginReqAction,
  loginSucAction,
} from "../Redux/User/action";
import {
  ServerAction,
  serverFailAction,
} from "../Redux/Server/reducer";
import { UserActionType, LoginAction } from "../Redux/User/types";
import { User } from "../db";

export function loginThunk({
  email,
  password,
}: {
  email: string;
  password: string;
}): ThunkAction<
  Promise<User>,
  RootState,
  null,
  LoginAction | ServerAction
> {
  return async (dispatch) => {
    dispatch(loginReqAction({ email, password }));
    try {
      const user = await loginAPI({ email, password });
      dispatch(loginSucAction(user));
      return user;
    } catch (e) {
      if (e.response && e.response.data && e.response.data.errors) {
        dispatch(loginFailAction(e.response.data.errors));
        throw Error("Check error message");
      }
      dispatch(serverFailAction("Internal Server Error"));
      throw Error("Internal Server Error");
    }
  };
}
