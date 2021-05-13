import { Article } from "../../db";
import { RootState } from "../store";

export const selectArticleListGlobal = (state: RootState): Article[] =>
  state.articleList.articleList.global;
export const selectArticleListByFavorited = (state: RootState): Article[] =>
  state.articleList.articleList.byFavorited;
export const selectArticleListByUser = (state: RootState): Article[] =>
  state.articleList.articleList.byUser;

export const selectNumberOfArticlesGlobal = (state: RootState): number =>
  state.articleList.numberOfArticle.global;
export const selectNumberOfArticlesByFavorited = (state: RootState): number =>
  state.articleList.numberOfArticle.byFavorited;
export const selectNumberOfArticlesByUser = (state: RootState): number =>
  state.articleList.numberOfArticle.byUser;
