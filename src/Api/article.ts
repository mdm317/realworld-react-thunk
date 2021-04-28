import axios from "axios";
import { Article, Comment, url } from "../db";
import { getToken } from "../Jwt/jwt";
import { ArticleListAndCount } from "../Redux/Article/action";
import { AddPostApiProp } from "../types";

export interface GetArticleCondition {
  tag?: string;
  offset?: number;
  limit?: number;
  author?: string;
  favorited?: string;
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
export const getArticleAPI = async (slug: string) => {
  const token = getToken();
  const header: { headers?: { Authorization: string } } = {};
  if (token) {
    header.headers = { Authorization: `Token ${token}` };
  }

  const response = await axios.get(url + `/articles/${slug}`, header);
  return response.data.article;
};

export const editArticleAPI = async (
  article: AddPostApiProp,
  slug: string
): Promise<Article> => {
  const token = getToken();
  const response = await axios.put(
    url + `/articles/${slug}`,
    { article },
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
  return response.data.article;
};

export async function editArticle(
  payload: AddPostApiProp,
  slug: string
): Promise<Article> {
  try {
    const article = await editArticleAPI(payload, slug);
    return article;
  } catch (e) {
    if (e.response.status === 401) {
      throw Error("You need to login!");
    } else {
      throw Error("Try it rater");
    }
  }
}

export const getCommentsAPI = async (slug: string): Promise<Comment[]> => {
  const response = await axios.get(url + `/articles/${slug}/comments`);
  return response.data.comments;
};

export const addCommentAPI = async (
  slug: string,
  body: string
): Promise<Comment> => {
  const token = getToken();

  const response = await axios.post(
    url + `/articles/${slug}/comments`,
    { body },
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
  return response.data.comment;
};
// DELETE /api/articles/:slug/comments/:id

export const deleteCommentAPI = async (
  slug: string,
  id: string
): Promise<string> => {
  const token = getToken();
  const response = await axios.delete(
    url + `/articles/${slug}/comments/${id}`,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );

  return id;
};

//DELETE /api/articles/:slug
export const deleteArticleAPI = async (slug: string): Promise<void> => {
  const token = getToken();
  const response = await axios.delete(url + `/articles/${slug}`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  return;
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
export const unFavoriteAPI = async (slug: string) => {
  const token = getToken();
  const response = await axios.delete(url + `/articles/${slug}/favorite`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return response.data.article;
};
