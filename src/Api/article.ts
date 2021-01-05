import axios from "axios";
import { Article, url } from "../db";

export const getArticleListAPI = async (): Promise<Article[]> => {
  const response = await axios.get(url + "/articles");
  return response.data.articles;
};
