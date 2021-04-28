import React from "react";
import ArticleMyCard from "../../Component/ArticleDetail/ArticleMyCard";
import ArticleOthersCard from "../../Component/ArticleDetail/ArticleOthersCard";
import { Article, LoginUser } from "../../db";
import marked from "marked";

interface ArticleDetailPresenterProp {
  article: Article | null;
  isMyPost: boolean;
  username: string | undefined;
  slug: string;
  user: LoginUser | undefined;
  children: React.ReactNode;
}
export default function ArticleDetailPresenter({
  article,
  isMyPost,
  username,
  children,
}: ArticleDetailPresenterProp): JSX.Element {
  if (!article) {
    return <h3>is Loading... </h3>;
  }
  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{article.title}</h1>
          <div data-testid="articleUserCard">
            {isMyPost ? (
              <ArticleMyCard article={article} />
            ) : (
              <ArticleOthersCard article={article} username={username} />
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
          {children}
          {/* <CommentBox slug={slug} user={user} /> */}
        </div>
      </div>
    </div>
  );
}
