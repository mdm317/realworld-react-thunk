import * as types from "./types";
import { Article, Comment } from "../../db";
import ArticleList from "../../Component/ArticleList";
import ArticleDetail from "../../Pages/ArticleDetail";
interface ArticleState {
  articleList: Article[] | null;
  articlesCounts: number;
  userArticleList: Article[] | null;
  userArticlesCounts: number;
  userArticlesLoading: boolean;
  articleDetail: Article | null;
  articleListIsLoading: boolean;
  serverErr: null | string;
  comments: Comment[];
}
const initialState: ArticleState = {
  articleList: null,
  articlesCounts: 0,
  userArticleList: null,
  userArticlesCounts: 0,
  userArticlesLoading: false,
  articleDetail: null,
  articleListIsLoading: false,
  serverErr: null,
  comments: [],
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
        articleListIsLoading: true,
      };
    case types.GET_ARTICLE_LIST_SUCCESS:
      return {
        ...state,
        articlesCounts: action.payload.articlesCount,
        articleList: action.payload.articleList,
        articleListIsLoading: false,
      };
    case types.GET_ARTICLE_LIST_FAILURE:
      return {
        ...state,
        articleListIsLoading: false,
      };
    case types.GET_USER_ARTICLES_REQUEST:
      return {
        ...state,
        userArticleList: null,
        userArticlesLoading: true,
      };
    case types.GET_USER_ARTICLES_SUCCESS:
      return {
        ...state,
        userArticlesCounts: action.payload.articlesCount,
        userArticleList: action.payload.articleList,
        userArticlesLoading: false,
      };
    case types.GET_USER_ARTICLES_FAILURE:
      return {
        ...state,
        userArticlesLoading: false,
      };
    case types.GET_ARTICLE_REQUEST:
      return { ...state, articleDetail: null };
    case types.GET_ARTICLE_SUCCESS:
      return { ...state, articleDetail: action.payload };
    case types.GET_COMMENTS_REQUEST:
      return { ...state, comments: [] };
    case types.GET_COMMENTS_SUCCESS:
      return { ...state, comments: action.payload };
    case types.ADD_COMMENT_SUCCESS: {
      const newComment = [action.payload, ...state.comments];
      return { ...state, comments: newComment };
    }
    case types.DELETE_COMMENT_SUCCESS: {
      const newComment = state.comments.filter(
        (comment) => comment.id !== Number(action.payload)
      );
      return { ...state, comments: newComment };
    }
    case types.TOGGLE_ARTICLE_FOLLOW: {
      if (state.articleDetail) {
        const currentFollow = state.articleDetail.author.following;
        //spread 를 안쓴다면????  ==> return 을 안쓰고 변하게 한다면???
        //주소가 같으니까 변경 적용이 안되나????/
        // const newArticleDetail: Article =  ...state.articleDetail ;
        const newArticleDetail: Article = { ...state.articleDetail };
        newArticleDetail.author.following = !currentFollow;
        return {
          ...state,
          articleDetail: newArticleDetail,
        };
      }
      return { ...state };
    }
    default:
      return { ...state };
  }
};
export default articleReducer;
