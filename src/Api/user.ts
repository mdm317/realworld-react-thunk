import axios from "axios";
import Axios from "axios";
import { LoginUser, url, User } from "../db";
import { destroyToken, getToken } from "../Jwt/jwt";
interface LoginPayload {
  email: string;
  password: string;
}
interface SignupPayload {
  username: string;
  email: string;
  password: string;
}
// type AsyncFunction <A,O> = (...args:A) => Promise<O>
// type SearchFn = AsyncFunction<[string], string>
export const loginAPI = async (payload: LoginPayload): Promise<LoginUser> => {
  const response = await Axios.post(url + "/users/login", {
    user: payload,
  });
  return response.data.user;
};
export const signupAPI = async (payload: SignupPayload): Promise<LoginUser> => {
  const response = await Axios.post(url + "/users", {
    user: payload,
  });
  return response.data.user;
};
export const getCurrentUserAPI = async (token: string): Promise<LoginUser> => {
  const response = await Axios.get(url + "/user", {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return response.data.user;
};
export const logOutAPI = (): void => {
  destroyToken();
};
export const favoriteAPI = async (slug: string) => {
  const token = getToken();
  const response = await axios.post(
    url + `/articles/${slug}/favorite`,
    {},
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
  return response.data.article;
};
