import { Article } from "../../db";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
export type BuilderF = (builder: ActionReducerMapBuilder<ArticleState>) => void;

export type ArticleListFilter = "global" | "byUser" | "byFavorited";
export interface ArticleState {
  articleList: {
    [key in ArticleListFilter]: Article[];
  };
  numberOfArticle: {
    [key in ArticleListFilter]: number;
  };
  isLoading: {
    [key in ArticleListFilter]: boolean;
  };
}

export interface GetArticleListSuccess {
  numberOfArticle: number;
  articleList: Article[];
}
