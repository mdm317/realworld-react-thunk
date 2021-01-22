import { ThunkAction } from "redux-thunk";
import { RootState } from "../Redux";
import { GetArticleListType } from "../Redux/Article/types";
import * as actions from "../Redux/Article/action";
import {
  addPostAPI,
  GetArticleCondition,
  getArticleListAPI,
} from "../Api/article";
import { AddPostApiProp } from "../types";
import { Article } from "../db";

export function getArticleList(
  payload: GetArticleCondition
): ThunkAction<void, RootState, null, GetArticleListType> {
  return async (dispatch) => {
    dispatch(actions.getArticleListRequestAction());
    try {
      const articleListAndCount = await getArticleListAPI(payload);
      dispatch(actions.getArticleListSuccessAction(articleListAndCount));
    } catch (e) {
      throw Error("Internal Server Error! Try rater!");
    }
  };
}
