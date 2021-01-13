import axios from "axios";
import { Article, url } from "../db";
import { getToken } from "../Jwt/jwt";
import { ArticleListAndCount } from "../Redux/Article/action";

export interface GetArticleCondition {
  tag?: string;
  offset?: number;
  limit?: number;
  author?: string;
  favorited?: boolean;
  username?: string;
}
export const getArticleListAPI = async (
  payload: GetArticleCondition
): Promise<ArticleListAndCount> => {
  const tagQuery = payload.tag ? `tag=${payload.tag}&` : "";
  const offsetQuery = payload.offset ? `offset=${payload.offset}&` : "";
  const limitQuery = payload.limit ? `limit=${payload.limit}&` : "";
  const author = payload.username ? `author=${payload.username}&` : "";
  const favorited = payload.favorited ? `favorited=${payload.favorited}&` : "";
  const token = getToken();
  const header: { headers?: { Authorization: string } } = {};
  if (token) {
    header.headers = { Authorization: `Token ${token}` };
  }
  const response = await axios.get(
    url +
      "/articles?" +
      tagQuery +
      offsetQuery +
      limitQuery +
      author +
      favorited,
    header
  );
  return {
    articleList: response.data.articles,
    articlesCount: response.data.articlesCount,
  };
};
