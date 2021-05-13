import { Article } from "../../db";
export interface ArticleState {
  articleDetail: Article | null;
  isLoading: boolean;
}
