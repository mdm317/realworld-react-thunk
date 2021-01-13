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
      {articleList ? (
        <ul aria-label="Article list">
          {articleList.map((article) => (
            <li className="article-preview" key={article.slug}>
              <UserMeta article={article}></UserMeta>
              <a href="/article/detail" className="preview-link">
                <h1>{article.title}</h1>
                <p> {article.description}</p>
                <span>Read more...</span>
              </a>
            </li>
          ))}{" "}
        </ul>
      ) : (
        <h3>Is Loading...</h3>
      )}
    </>
  );
}
