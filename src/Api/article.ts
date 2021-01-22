import axios, { AxiosError } from "axios";
import { Article, url } from "../db";
import { getToken } from "../Jwt/jwt";
import { ArticleListAndCount } from "../Redux/Article/action";
import { AddPostApiProp } from "../types";

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
  const author = payload.author ? `author=${payload.author}&` : "";
  const favorited = payload.favorited ? `favorited=${payload.favorited}&` : "";
  const token = getToken();
  const header: { headers?: { Authorization: string } } = {};
  if (token) {
    header.headers = { Authorization: `Token ${token}` };
  }

  // console.log(
  //   "called url ",
  //   url +
  //     "/articles?" +
  //     tagQuery +
  //     offsetQuery +
  //     limitQuery +
  //     author +
  //     favorited
  // );

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
export const addPostAPI = async (article: AddPostApiProp): Promise<Article> => {
  const token = getToken();
  const response = await axios.post(
    url + "/articles",
    { article },
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
  return response.data.article;
};

export async function addPost(payload: AddPostApiProp): Promise<Article> {
  try {
    const article = await addPostAPI(payload);
    return article;
  } catch (e) {
    if (e.response.status === 401) {
      throw Error("You need to login!");
    } else {
      throw Error("Try it rater");
    }
  }
}
