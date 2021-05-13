import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { GetArticleCondition } from "../Api/article";
import { Article } from "../db";

import queryString from "query-string";
import {
  getArticleListByFavoritedThunkTK,
  getArticleListThunkTK,
  getArticleListByUserThunkTK,
} from "../ReduxToolkit/ArticleList/articleListSlice";
import {
  selectArticleListByFavorited,
  selectArticleListByUser,
  selectArticleListGlobal,
  selectNumberOfArticlesByFavorited,
  selectNumberOfArticlesByUser,
  selectNumberOfArticlesGlobal,
} from "../ReduxToolkit/ArticleList/select";
interface UseArticleListProp {
  pagePerPagenation: number;
  mode: "global" | "byUser" | "byFavorite";
}

interface UseArticleListReturn {
  articleList: Article[] | null;
  articleCounts: number;
}
export const useArticleListToolKit = ({
  mode,
  pagePerPagenation,
}: UseArticleListProp): UseArticleListReturn => {
  const location = useLocation();
  const dispatch = useDispatch();
  const query = queryString.parse(location.search);
  const dispatherList = useMemo(
    () => ({
      global: getArticleListThunkTK,
      byUser: getArticleListByUserThunkTK,
      byFavorite: getArticleListByFavoritedThunkTK,
    }),
    []
  );
  const selectorArticleList = useMemo(
    () => ({
      global: selectArticleListGlobal,
      byUser: selectArticleListByUser,
      byFavorite: selectArticleListByFavorited,
    }),
    []
  );
  const selectorArticleCounts = useMemo(
    () => ({
      global: selectNumberOfArticlesGlobal,
      byUser: selectNumberOfArticlesByUser,
      byFavorite: selectNumberOfArticlesByFavorited,
    }),
    []
  );
  useEffect(() => {
    const getArticleCondition: GetArticleCondition = {
      limit: pagePerPagenation,
    };

    const currentPage = query.page;
    if (currentPage) {
      const pageNum = Number(currentPage);
      const offset = (pageNum - 1) * pagePerPagenation;
      getArticleCondition.offset = offset;
    }
    const queryProp = ["tag", "favorited", "author"] as const;
    queryProp.forEach((qp) => {
      getArticleCondition[qp] = query[qp] as string;
    });
    dispatch(dispatherList[mode](getArticleCondition));
  }, [mode, location]);
  const articleList = useSelector(selectorArticleList[mode]);
  const articleCounts = useSelector(selectorArticleCounts[mode]);
  return { articleList, articleCounts };
};
