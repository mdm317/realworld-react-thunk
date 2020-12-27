import * as action from "./action";

export type GetArticleListType =
  | ReturnType<typeof action.getArticleListRequestAction>
  | ReturnType<typeof action.getArticleListSuccessAction>
  | ReturnType<typeof action.getArticleListFailureAction>;
export type ArticleActionType = GetArticleListType;

export const GET_ARTICLE_LIST_REQUEST = "GET_ARTICLE_LIST_REQUEST";
export const GET_ARTICLE_LIST_SUCCESS = "GET_ARTICLE_LIST_SUCCESS";
export const GET_ARTICLE_LIST_FAILURE = "GET_ARTICLE_LIST_FAILURE";
