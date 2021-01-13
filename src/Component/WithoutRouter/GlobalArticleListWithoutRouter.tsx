import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { GetArticleCondition } from "../../Api/article";
import { getArticleList } from "../../Thunk/article";
import ArticleList from "../ArticleList";

interface globalArticleListprop {
  getArticleCondition: GetArticleCondition;
}
export default function GlobalArticleList({
  getArticleCondition,
}: globalArticleListprop): JSX.Element {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getArticleList(getArticleCondition));
  }, []);
  return (
    <>
      <ArticleList />
    </>
  );
}
