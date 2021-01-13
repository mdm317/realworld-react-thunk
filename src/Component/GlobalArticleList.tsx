import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useRouteMatch } from "react-router-dom";
import { GetArticleCondition } from "../Api/article";
import { getArticleList } from "../Thunk/article";
import ArticleList from "./ArticleList";
import queryString from "query-string";

interface globalArticleListprop {
  pagePerPagenation: number;
}
export default function GlobalArticleList({
  pagePerPagenation,
}: globalArticleListprop): JSX.Element {
  console.log("render");

  const dispatch = useDispatch();
  const location = useLocation();
  const query = queryString.parse(location.search);
  const currentPage = query.page;
  const getArticleCondition: GetArticleCondition = { limit: pagePerPagenation };
  if (currentPage) {
    const pageNum = Number(currentPage);
    const offset = (pageNum - 1) * pagePerPagenation;
    getArticleCondition.offset = offset;
  }
  dispatch(getArticleList(getArticleCondition));

  return (
    <>
      <ArticleList />
    </>
  );
}
