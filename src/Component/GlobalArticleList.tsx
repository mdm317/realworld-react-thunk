import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useRouteMatch } from "react-router-dom";
import { GetArticleCondition } from "../Api/article";
import { getArticleList } from "../Thunk/article";
import ArticleList from "./ArticleList";
import queryString from "query-string";
import { RootState } from "../Redux";

interface globalArticleListprop {
  pagePerPagenation: number;
}
export default function GlobalArticleList({
  pagePerPagenation,
}: globalArticleListprop): JSX.Element {
  const dispatch = useDispatch();
  const location = useLocation();
  const articleList = useSelector(
    (state: RootState) => state.article.articleList
  );
  useEffect(() => {
    const query = queryString.parse(location.search);
    const currentPage = query.page;
    const getArticleCondition: GetArticleCondition = {
      limit: pagePerPagenation,
    };
    if (currentPage) {
      const pageNum = Number(currentPage);
      const offset = (pageNum - 1) * pagePerPagenation;
      getArticleCondition.offset = offset;
    }
    console.log(getArticleCondition);

    dispatch(getArticleList(getArticleCondition));
  }, [location]);

  return (
    <>
      {articleList ? (
        <ArticleList articleList={articleList} />
      ) : (
        <h3>Is Loading...</h3>
      )}
    </>
  );
}
