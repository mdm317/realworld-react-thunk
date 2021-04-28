import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { GetArticleCondition } from "../../Api/article";

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
  return <>{/* <ArticleList /> */}</>;
}
