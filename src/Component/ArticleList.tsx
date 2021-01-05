import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../Redux";
import UserMeta from "./UserMeta";

export default function ArticleList(): JSX.Element {
  const articleList = useSelector(
    (state: RootState) => state.article.articleList
  );
  return (
    <>
      {articleList?.map((article) => (
        <div className="article-preview" key={article.slug}>
          <UserMeta article={article}></UserMeta>
          <a href="/article/detail" className="preview-link">
            <h1>{article.title}</h1>
            <p> {article.description}</p>
            <span>Read more...</span>
          </a>
        </div>
      ))}
    </>
  );
}
