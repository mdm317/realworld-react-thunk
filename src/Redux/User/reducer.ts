import { ActionType, createReducer } from "typesafe-actions";
import * as actions from "./action";
import { storeToken } from "../../Jwt/jwt";
import { LoginUser, User } from "../../db";

interface UserState {
  isLogin: boolean;
  user: LoginUser | undefined;
  loginErr: actions.AuthError | null;
  signupErr: actions.AuthError | null;
  isLodding: boolean;
}
const initialState: UserState = {
  isLogin: false,
  user: undefined,
  loginErr: null,
  signupErr: null,
  isLodding: false,
};
export type UserAction = ActionType<typeof actions>;
const userReducer = createReducer<UserState, UserAction>(initialState, {
  LOGIN_REQUEST: (state) => ({
    ...state,
    loginErr: null,
    isLodding: true,
    user: undefined,
  }),
  LOGIN_SUCCESS: (state, action) => {
    storeToken(action.payload.token);
    return {
      ...state,
      user: action.payload,
      isLodding: false,
      isLogin: true,
    };
  },
  LOGIN_FAILURE: (state, action) => ({
    ...state,
    loginErr: action.payload,
    isLodding: false,
  }),
  SIGNUP_REQUEST: (state) => ({
    ...state,
    signupErr: null,
    isLodding: true,
    user: undefined,
  }),
  SIGNUP_SUCCESS: (state, action) => ({
    ...state,
    user: action.payload,
    isLodding: false,
  }),
  SIGNUP_FAILURE: (state, action) => ({
    ...state,
    signupErr: action.payload,
    isLodding: false,
  }),
  LOGOUT_SUCCESS: (state) => ({
    ...state,
    isLogin: false,
    user: undefined,
  }),
});
export default userReducer;
