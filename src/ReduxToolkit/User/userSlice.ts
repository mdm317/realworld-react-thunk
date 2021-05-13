import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { LoginUser, Profile } from "../../db";
export interface AuthError {
  username?: [string];
  email?: [string];
  password?: [string];
  "email or password"?: [string];
}
export interface UserState {
  isLogin: boolean;
  user: LoginUser | undefined;
  profile: Profile | undefined;
  loginErr: AuthError | null;
  signupErr: AuthError | null;
  isLodding: boolean;
  updateUserErr: AuthError | null;
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
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loginErr = null;
      state.isLodding = true;
      state.user = undefined;
    },
    loginSuccess: (state, action: PayloadAction<LoginUser>) => {
      state.user = action.payload;
      state.isLodding = false;
      state.isLogin = true;
    },
    loginFailure: (state, action: PayloadAction<AuthError>) => {
      state.loginErr = action.payload;
      state.isLodding = false;
    },
    signupRequest: (state) => {
      state.signupErr = null;
      state.isLodding = true;
      state.user = undefined;
    },
    signupSuccess: (state, action: PayloadAction<LoginUser>) => {
      state.user = action.payload;
      state.isLodding = false;
    },
    signupFailure: (state, action: PayloadAction<AuthError>) => {
      state.signupErr = action.payload;
      state.isLodding = false;
    },
    logoutSuccess: (state) => {
      state.isLogin = false;
      state.user = undefined;
    },
    updateUserRequest: (state) => {
      state.updateUserErr = null;
    },
    updateUserSuccess: (state, action: PayloadAction<LoginUser>) => {
      state.user = action.payload;
    },
    updateUserFailure: (state, action: PayloadAction<AuthError>) => {
      state.updateUserErr = action.payload;
    },
    getProfileRequest: (state) => {
      state.profile = undefined;
    },
    getProfileSuccess: (state, action: PayloadAction<Profile>) => {
      state.profile = action.payload;
    },
  },
});

export const {
  getProfileRequest,
  getProfileSuccess,
  loginFailure,
  loginRequest,
  loginSuccess,
  logoutSuccess,
  signupFailure,
  signupRequest,
  signupSuccess,
  updateUserFailure,
  updateUserRequest,
  updateUserSuccess,
} = userSlice.actions;

export default userSlice.reducer;
