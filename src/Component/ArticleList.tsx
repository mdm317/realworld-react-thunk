import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Article } from "../db";
import { RootState } from "../Redux";
import UserMeta from "./UserMeta";
import history from "../history";
import baseUrl from "../baseurl";
interface ArticleListProp {
  articleList: Article[];
}
export default function ArticleList({
  articleList,
}: ArticleListProp): JSX.Element {
  const clickPreview = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const slug = (e.currentTarget as HTMLElement).id;

    history.push(`${baseUrl}/article/${slug}`);
  };
  return (
    <>
      <ul aria-label="Article list">
        {articleList.map((article) => (
          <li className="article-preview" key={article.slug}>
            <UserMeta article={article}></UserMeta>
            <a
              href={"/"} //스타일 적용을 위해 넣어줌
              onClick={clickPreview}
              id={article.slug}
              className="preview-link"
            >
              <h1>{article.title.slice(0, 50)}</h1>
              <p> {article.description.slice(0, 100)}</p>
              <span>Read more...</span>
            </a>

            <div role="list" className="tag-list">
              {article.tagList.map((tag) => (
                <span
                  role="listitem"
                  className="tag-default tag-pill"
                  key={tag}
                >
                  {tag}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
