import { template } from "@babel/core";
import * as action from "./action";

export type GetArticleListType =
  | ReturnType<typeof action.getArticleListRequestAction>
  | ReturnType<typeof action.getArticleListSuccessAction>
  | ReturnType<typeof action.getArticleListFailureAction>;

export type GetUserArticleListType =
  | ReturnType<typeof action.getUserArticleListRequestAction>
  | ReturnType<typeof action.getUserArticleListSuccessAction>
  | ReturnType<typeof action.getUserArticleListFailureAction>;

export type GetArticleType =
  | ReturnType<typeof action.getArticleRequestAction>
  | ReturnType<typeof action.getArticleSuccessAction>
  | ReturnType<typeof action.getArticleFailureAction>;

export type GetCommentsType =
  | ReturnType<typeof action.getCommentsRequestAction>
  | ReturnType<typeof action.getCommentsSuccessAction>
  | ReturnType<typeof action.getCommentsFailureAction>;

export type AddCommentType = ReturnType<typeof action.addCommentSuccessAction>;
export type DeleteCommentType = ReturnType<
  typeof action.deleteCommentSuccessAction
>;
export type ToggleFollowType = ReturnType<
  typeof action.toggleArticleFollowAction
>;

export type ArticleActionType =
  | GetArticleListType
  | GetArticleType
  | GetCommentsType
  | AddCommentType
  | DeleteCommentType
  | ToggleFollowType
  | GetUserArticleListType;

export const GET_ARTICLE_LIST_REQUEST = "GET_ARTICLE_LIST_REQUEST";
export const GET_ARTICLE_LIST_SUCCESS = "GET_ARTICLE_LIST_SUCCESS";
export const GET_ARTICLE_LIST_FAILURE = "GET_ARTICLE_LIST_FAILURE";

export const GET_ARTICLE_REQUEST = "GET_ARTICLE_REQUEST";
export const GET_ARTICLE_SUCCESS = "GET_ARTICLE_SUCCESS";
export const GET_ARTICLE_FAILURE = "GET_ARTICLE_FAILURE";

export const GET_COMMENTS_REQUEST = "GET_COMMENTS_REQUEST";
export const GET_COMMENTS_SUCCESS = "GET_COMMENTS_SUCCESS";
export const GET_COMMENTS_FAILURE = "GET_COMMENTS_FAILURE";

export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const DELETE_COMMENT_SUCCESS = "DELETE_COMMENT_SUCCESS";
export const TOGGLE_ARTICLE_FOLLOW = "TOGGLE_ARTICLE_FOLLOW";

export const GET_USER_ARTICLES_REQUEST = "GET_USER_ARTICLES_REQUEST";
export const GET_USER_ARTICLES_SUCCESS = "GET_USER_ARTICLES_SUCCESS";
export const GET_USER_ARTICLES_FAILURE = "GET_USER_ARTICLES_FAILURE";
