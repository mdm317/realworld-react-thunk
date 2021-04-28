import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { GetArticleCondition } from "../../Api/article";
import { getArticleListThunk } from "../../Thunk/article";

interface globalArticleListprop {
  getArticleCondition: GetArticleCondition;
}
export default function GlobalArticleList({
  getArticleCondition,
}: globalArticleListprop): JSX.Element {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getArticleListThunk(getArticleCondition));
  }, []);
  return <>{/* <ArticleList /> */}</>;
}
