import axios from "axios";
import Axios from "axios";
import { LoginUser, url } from "../db";
import { destroyToken, getToken } from "../Jwt/jwt";
import { UpdateUserProp } from "../types";
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
export const getProfileAPI = async (username: string) => {
  const token = getToken();
  const header: { headers?: { Authorization: string } } = {};
  if (token) {
    header.headers = { Authorization: `Token ${token}` };
  }
  const response = await Axios.get(url + `/profiles/${username}`, header);
  return response.data.profile;
};
export const logOutAPI = (): void => {
  destroyToken();
};

export const followAPI = async (username: string) => {
  //POST /api/profiles/:username/follow
  const token = getToken();
  const response = await axios.post(
    url + `/profiles/${username}/follow`,
    {},
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );

  return response.data.profile;
};
//ELETE /api/profiles/:username/follow
export const unfollowAPI = async (username: string) => {
  //POST /api/profiles/:username/follow
  const token = getToken();
  const response = await axios.delete(url + `/profiles/${username}/follow`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return response.data.article;
};

export const toggleFollow = async (username: string, isFollow: boolean) => {
  if (isFollow) {
    return unfollowAPI(username);
  }
  return followAPI(username);
};

export const updateUserAPI = async (
  user: UpdateUserProp
): Promise<LoginUser> => {
  const token = getToken();
  const response = await axios.put(
    url + "/user",
    { user },
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
  return response.data.user;
};
