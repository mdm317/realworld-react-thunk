import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import {
  getArticleListThunk,
  getUserFavoriteArticleListThunk,
  getUserArticleListThunk,
} from "../Thunk/article";
import { GetArticleCondition } from "../Api/article";
import { RootState } from "../Redux";
import { Article } from "../db";

import queryString from "query-string";

interface UseArticleListProp {
  pagePerPagenation: number;
  mode: "global" | "byUser" | "byFavorite";
}

interface UseArticleListReturn {
  articleList: Article[] | null;
  articleCounts: number;
}
export const useArticleList = ({
  mode,
  pagePerPagenation,
}: UseArticleListProp): UseArticleListReturn => {
  const location = useLocation();
  const dispatch = useDispatch();
  const query = queryString.parse(location.search);
  const dispatherList = useMemo(
    () => ({
      global: getArticleListThunk,
      byUser: getUserArticleListThunk,
      byFavorite: getUserFavoriteArticleListThunk,
    }),
    []
  );
  const selectorArticleList = useMemo(
    () => ({
      global: (store: RootState) => store.article.articleList,
      byUser: (store: RootState) => store.article.userArticleList,
      byFavorite: (store: RootState) => store.article.userFavoriteArticleList,
    }),
    []
  );
  const selectorArticleCounts = useMemo(
    () => ({
      global: (store: RootState) => store.article.articlesCounts,
      byUser: (store: RootState) => store.article.userArticlesCounts,
      byFavorite: (store: RootState) =>
        store.article.userFavoriteArticlesCounts,
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
