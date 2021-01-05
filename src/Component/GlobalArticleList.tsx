import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getArticleList } from "../Thunk/article";
import ArticleList from "./ArticleList";

export default function GlobalArticleList(): JSX.Element {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getArticleList());
  }, []);
  return <ArticleList></ArticleList>;
}
