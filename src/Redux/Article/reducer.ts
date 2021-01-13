import * as types from "./types";
import { Article } from "../../db";
interface ArticleState {
  articleList: Article[] | null;
  articlesCounts: number;
  articleDetail: Article | null;
  articleIsLoading: boolean;
  serverErr: null | string;
}
const initialState: ArticleState = {
  articleList: null,
  articlesCounts: 0,
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
        articleList: null,
        articleIsLoading: true,
      };
    case types.GET_ARTICLE_LIST_SUCCESS:
      return {
        ...state,
        articlesCounts: action.payload.articlesCount,
        articleList: action.payload.articleList,
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
