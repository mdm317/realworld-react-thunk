import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux";
import marked from "marked";
import { useParams } from "react-router-dom";
import { getArticleThunk, getCommentsThunk } from "../Thunk/article";

import CommentBox from "../Component/CommentBox";
import ArticleMyCard from "../Component/ArticleDetail/ArticleMyCard";
import ArticleOthersCard from "../Component/ArticleDetail/ArticleOthersCard";
export default function ArticleDetail(): JSX.Element {
  const dispatch = useDispatch();
  const { slug } = useParams<{ slug: string }>();
  // console.log("slug", slug);

  const user = useSelector((state: RootState) => state.user.user);
  const username = user?.username;

  useEffect(() => {
    if (slug) {
      dispatch(getArticleThunk(slug));
      dispatch(getCommentsThunk(slug));
    }
  }, []);
  const article = useSelector(
    (state: RootState) => state.article.articleDetail
  );

  if (!article) {
    return <h3>is Loading... </h3>;
  }
  const isMyPost = username === article.author.username ? true : false;
  console.log("istMyPost", isMyPost);

  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{article.title}</h1>
          <div data-testid="articleUserCard">
            {isMyPost ? (
              <ArticleMyCard article={article} />
            ) : (
              <ArticleOthersCard article={article} />
            )}
          </div>
        </div>
      </div>

      <div className="container page">
        <div className="row article-content">
          <div
            className="col-md-12"
            dangerouslySetInnerHTML={{ __html: marked(article.body) }}
          />
        </div>
        {article.tagList.map((tag) => (
          <span role="listitem" className="tag-default tag-pill" key={tag}>
            {tag}
          </span>
        ))}
        <hr />

        <div className="article-actions">
          <div data-testid="articleUserCard">
            {isMyPost ? (
              <ArticleMyCard article={article} />
            ) : (
              <ArticleOthersCard article={article} username={username} />
            )}
          </div>
        </div>

        <div className="row">
          <CommentBox slug={slug} user={user} />
        </div>
      </div>
    </div>
  );
}
