import * as types from "./types";
import { Article } from "../../db";
interface ArticleState {
  articleList: [Article] | null;
  articleDetail: Article | null;
  articleIsLoading: boolean;
  serverErr: null | string;
}
const initialState: ArticleState = {
  articleList: null,
  articleDetail: null,
  articleIsLoading: false,
  serverErr: null,
};
const articleReducer = (
  state = initialState,
  action: types.ArticleActionType
): ArticleState => {
  switch (action.type) {
    case types.GET_ARTICLE_LIST_REQUEST:
      return {
        ...state,
        articleIsLoading: true,
      };
    case types.GET_ARTICLE_LIST_SUCCESS:
      return {
        ...state,
        articleList: action.payload,
        articleIsLoading: false,
      };
    case types.GET_ARTICLE_LIST_FAILURE:
      return {
        ...state,
        articleIsLoading: false,
        serverErr: action.payload,
      };
    default:
      return { ...state };
  }
};
export default articleReducer;
