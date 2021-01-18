import React from "react";
import { useSelector } from "react-redux";
import { Article } from "../db";
import { RootState } from "../Redux";
import UserMeta from "./UserMeta";
interface ArticleListProp {
  articleList: Article[];
}
export default function ArticleList({
  articleList,
}: ArticleListProp): JSX.Element {
  return (
    <>
      <ul aria-label="Article list">
        {articleList.map((article) => (
          <li className="article-preview" key={article.slug}>
            <UserMeta article={article}></UserMeta>
            <a href="/article/detail" className="preview-link">
              <h1>{article.title.slice(0, 50)}</h1>
              <p> {article.description.slice(0, 100)}</p>
              <span>Read more...</span>
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
