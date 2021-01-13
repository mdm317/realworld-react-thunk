import { ThunkAction } from "redux-thunk";
import { RootState } from "../Redux";
import { GetArticleListType } from "../Redux/Article/types";
import * as actions from "../Redux/Article/action";
import { GetArticleCondition, getArticleListAPI } from "../Api/article";

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
