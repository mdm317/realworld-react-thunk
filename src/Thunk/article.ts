import { ThunkAction } from "redux-thunk";
import { RootState } from "../Redux";
import { GetArticleListType } from "../Redux/Article/types";
import * as actions from "../Redux/Article/action";
import { getArticleListAPI } from "../Api/article";
export function getArticleList(): ThunkAction<
  void,
  RootState,
  null,
  GetArticleListType
> {
  return async (dispatch) => {
    dispatch(actions.getArticleListRequestAction());
    try {
      const articleList = await getArticleListAPI();
      dispatch(actions.getArticleListSuccessAction(articleList));
    } catch (e) {
      throw Error("Internal Server Error! Try rater!");
    }
  };
}
