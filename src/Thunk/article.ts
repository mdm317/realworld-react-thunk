import { ThunkAction } from "redux-thunk";
import { RootState } from "../Redux";
import {
  AddCommentType,
  DeleteCommentType,
  GetArticleListType,
  GetArticleType,
  GetCommentsType,
  GetUserArticleListType,
  GetUserFavoriteArticleListType,
} from "../Redux/Article/types";
import * as actions from "../Redux/Article/action";
import {
  addCommentAPI,
  addPostAPI,
  deleteCommentAPI,
  getArticleAPI,
  GetArticleCondition,
  getArticleListAPI,
  getCommentsAPI,
} from "../Api/article";
import { AddPostApiProp } from "../types";
import { Article } from "../db";
import { favoriteAPI, unFavoriteAPI } from "../Api/article";

export function getArticleList(
  payload: GetArticleCondition
): ThunkAction<void, RootState, null, GetArticleListType> {
  return async (dispatch) => {
    console.log("author", payload.author);

    dispatch(actions.getArticleListRequestAction());
    try {
      const articleListAndCount = await getArticleListAPI(payload);

      dispatch(actions.getArticleListSuccessAction(articleListAndCount));
    } catch (e) {
      dispatch(actions.getArticleListFailureAction());

      throw Error("Internal Server Error! Try rater!");
    }
  };
}
export function getUserArticleList(
  payload: GetArticleCondition
): ThunkAction<void, RootState, null, GetUserArticleListType> {
  return async (dispatch) => {
    dispatch(actions.getUserArticleListRequestAction());
    try {
      const articleListAndCount = await getArticleListAPI(payload);

      dispatch(actions.getUserArticleListSuccessAction(articleListAndCount));
    } catch (e) {
      dispatch(actions.getUserArticleListFailureAction());

      throw Error("Internal Server Error! Try rater!");
    }
  };
}
export function getUserFavoriteArticleListThunk(
  payload: GetArticleCondition
): ThunkAction<void, RootState, null, GetUserFavoriteArticleListType> {
  return async (dispatch) => {
    dispatch(actions.getUserFavoriteArticleListRequestAction());
    try {
      const articleListAndCount = await getArticleListAPI(payload);

      dispatch(
        actions.getUserFavoriteArticleListSuccessAction(articleListAndCount)
      );
    } catch (e) {
      dispatch(actions.getUserFavoriteArticleListFailureAction());

      throw Error("Internal Server Error! Try rater!");
    }
  };
}

export function getArticleThunk(
  slug: string
): ThunkAction<void, RootState, null, GetArticleType> {
  return async (dispatch) => {
    dispatch(actions.getArticleRequestAction());
    try {
      const article = await getArticleAPI(slug);
      dispatch(actions.getArticleSuccessAction(article));
    } catch (e) {
      throw Error("Internal Server Error! Try rater!");
    }
  };
}

export function getCommentsThunk(
  slug: string
): ThunkAction<void, RootState, null, GetCommentsType> {
  return async (dispatch) => {
    dispatch(actions.getCommentsFailureAction());
    try {
      const comments = await getCommentsAPI(slug);
      dispatch(actions.getCommentsSuccessAction(comments));
    } catch (e) {
      throw Error("Internal Server Error! Try rater!");
    }
  };
}

export function addCommentThunk(
  slug: string,
  body: string
): ThunkAction<Promise<void>, RootState, null, AddCommentType> {
  return async (dispatch) => {
    try {
      const comment = await addCommentAPI(slug, body);
      dispatch(actions.addCommentSuccessAction(comment));
      return;
    } catch (e) {
      throw Error("Internal Server Error! Try rater!");
    }
  };
}

export function deleteCommentThunk(
  slug: string,
  id: string
): ThunkAction<Promise<void>, RootState, null, DeleteCommentType> {
  return async (dispatch) => {
    try {
      await deleteCommentAPI(slug, id);
      dispatch(actions.deleteCommentSuccessAction(id));
      return;
    } catch (e) {
      throw Error("Internal Server Error! Try rater!");
    }
  };
}

export function toggleFavoriteThunk(
  slug: string,
  isFavorite: boolean
): ThunkAction<Promise<void>, RootState, null, GetArticleType> {
  return async (dispatch) => {
    try {
      let article: Article;
      if (isFavorite) {
        article = await unFavoriteAPI(slug);
      } else {
        article = await favoriteAPI(slug);
      }
      dispatch(actions.getArticleSuccessAction(article));
      return;
    } catch (e) {
      throw Error("Internal Server Error! Try rater!");
    }
  };
}
