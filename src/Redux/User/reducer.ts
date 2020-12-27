import { LoginUser } from "../../db";
import { ActionType, createReducer } from "typesafe-actions";
import * as actions from "./action";
import { storeToken } from "../../Jwt/jwt";

interface UserState {
  isLogin: boolean;
  user: LoginUser | null;
  loginErr: actions.AuthError | null;
  isLodding: boolean;
}
const initialState: UserState = {
  isLogin: false,
  user: null,
  loginErr: null,
  isLodding: false,
};
export type UserAction = ActionType<typeof actions>;
const userReducer = createReducer<UserState, UserAction>(
  initialState,
  {
    LOGIN_REQUEST: (state) => ({
      ...state,
      loginErr: null,
      isLodding: true,
      user: null,
    }),
    LOGIN_SUCCESS: (state, action) => {
      const userWithToken = action.payload;
      storeToken(userWithToken.token);
      return {
        ...state,
        user: userWithToken,
        isLodding: false,
      };
    },
    LOGIN_FAILURE: (state, action) => ({
      ...state,
      loginErr: action.payload,
      isLodding: false,
    }),
  }
);
export default userReducer;
