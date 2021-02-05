import axios from "axios";
import { url } from "../db";

export const getTagListAPI = async () => {
  const response = await axios.get(url + "/tags");
  return response.data.tags;
};
