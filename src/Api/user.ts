import Axios from "axios";
import { url } from "../db";
interface LoginPayload {
  email: string;
  password: string;
}
// type AsyncFunction <A,O> = (...args:A) => Promise<O>
// type SearchFn = AsyncFunction<[string], string>
export const loginAPI = async (payload: LoginPayload) => {
  await new Promise((res, rej) => {
    setTimeout(() => {
      res(0);
    }, 1000);
  });
  const response = await Axios.post(url + "/users/login", {
    user: payload,
  });
  return response.data.user;
};
