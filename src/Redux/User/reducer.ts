import { ActionType, createReducer } from "typesafe-actions";
import * as actions from "./action";
import { storeToken } from "../../Jwt/jwt";
import { LoginUser, Profile, User } from "../../db";

interface UserState {
  isLogin: boolean;
  user: LoginUser | undefined;
  profile: Profile | undefined;
  loginErr: actions.AuthError | null;
  signupErr: actions.AuthError | null;
  isLodding: boolean;
  updateUserErr: actions.AuthError | null;
}
const initialState: UserState = {
  isLogin: false,
  user: undefined,
  loginErr: null,
  signupErr: null,
  isLodding: false,
  updateUserErr: null,
  profile: undefined,
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
  UPDATE_USER_REQUEST: (state) => ({
    ...state,
    updateUserErr: null,
  }),
  UPDATE_USER_SUCCESS: (state, action) => ({
    ...state,
    user: action.payload,
  }),
  UPDATE_USER_FAILURE: (state, action) => ({
    ...state,
    updateUserErr: action.payload,
  }),
  GET_PROFILE_REQUEST: (state) => ({
    ...state,
    profile: undefined,
  }),
  GET_PROFILE_SUCCESS: (state, action) => ({
    ...state,
    profile: action.payload,
  }),
});
export default userReducer;
