import React from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import { deleteArticle } from "../../ApiWrapper/article";
import { Article } from "../../db";
import baseUrl from "../../baseurl";
import UserIcon from "../UserIcon";

interface ArticleMyCardProp {
  article: Article;
}
export default function ArticleMyCard({
  article,
}: ArticleMyCardProp): JSX.Element {
  const history = useHistory();
  const clickDeleteAritcleBtn = () => {
    deleteArticle(article.slug)
      .then(() => {
        toast.success("delete article success!");
        history.push(`${baseUrl}/`);
        // history.goBack(); //
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };
  return (
    <div className="article-meta">
      <UserIcon
        createdAt={article.createdAt}
        username={article.author.username}
        image={article.author.image}
      />
      <Link
        to={`${baseUrl}/article/edit/${article.slug}`}
        className="btn btn-sm btn-outline-secondary"
      >
        <i className="ion-plus-round"></i> &nbsp;🔨 edit Post
      </Link>
      &nbsp;
      <button
        onClick={clickDeleteAritcleBtn}
        className="btn btn-sm btn-outline-secondary"
      >
        <i className="ion-plus-round"></i> &nbsp;🗑 delete Post
      </button>
    </div>
  );
}
