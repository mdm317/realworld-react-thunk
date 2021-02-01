//no library
import * as types from "./types";
import { Article, Comment } from "../../db";
import { AxiosError } from "axios";

export interface ArticleListAndCount {
  articleList: Article[];
  articlesCount: number;
}
export const getArticleListRequestAction = () =>
  ({
    type: types.GET_ARTICLE_LIST_REQUEST,
  } as const);

export const getArticleListSuccessAction = (
  articleListAndCount: ArticleListAndCount
) =>
  ({
    type: types.GET_ARTICLE_LIST_SUCCESS,
    payload: articleListAndCount,
  } as const);
export const getArticleListFailureAction = () =>
  ({
    type: types.GET_ARTICLE_LIST_FAILURE,
  } as const);

export const getUserArticleListRequestAction = () =>
  ({
    type: types.GET_USER_ARTICLES_REQUEST,
  } as const);

export const getUserArticleListSuccessAction = (
  articleListAndCount: ArticleListAndCount
) =>
  ({
    type: types.GET_USER_ARTICLES_SUCCESS,
    payload: articleListAndCount,
  } as const);
export const getUserArticleListFailureAction = () =>
  ({
    type: types.GET_USER_ARTICLES_FAILURE,
  } as const);

export const getArticleRequestAction = () =>
  ({
    type: types.GET_ARTICLE_REQUEST,
  } as const);

export const getArticleSuccessAction = (article: Article) =>
  ({
    type: types.GET_ARTICLE_SUCCESS,
    payload: article,
  } as const);

export const getArticleFailureAction = () =>
  ({
    type: types.GET_ARTICLE_FAILURE,
  } as const);

export const getCommentsRequestAction = () =>
  ({
    type: types.GET_COMMENTS_REQUEST,
  } as const);

export const getCommentsSuccessAction = (comments: Comment[]) =>
  ({
    type: types.GET_COMMENTS_SUCCESS,
    payload: comments,
  } as const);

export const getCommentsFailureAction = () =>
  ({
    type: types.GET_COMMENTS_FAILURE,
  } as const);

export const addCommentSuccessAction = (comment: Comment) =>
  ({
    type: types.ADD_COMMENT_SUCCESS,
    payload: comment,
  } as const);

export const deleteCommentSuccessAction = (id: string) =>
  ({
    type: types.DELETE_COMMENT_SUCCESS,
    payload: id,
  } as const);

export const toggleArticleFollowAction = () =>
  ({
    type: types.TOGGLE_ARTICLE_FOLLOW,
  } as const);
