//no library
import * as types from "./types";
import { Article } from "../../db";

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

export const getArticleListFailureAction = (err: string) =>
  ({
    type: types.GET_ARTICLE_LIST_FAILURE,
    payload: err,
  } as const);
