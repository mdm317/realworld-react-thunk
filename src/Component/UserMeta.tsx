import React from "react";
import { Link } from "react-router-dom";
import { Article } from "../db";
import { getMonthDate } from "../util";
interface UserMetaProp {
  article: Article;
}
export default function UserMeta({ article }: UserMetaProp): JSX.Element {
  const username = article.author.username;
  return (
    <div className="article-meta">
      <Link to={`profile/${username}`}>
        <img src={article.author.image} />
      </Link>
      <div className="info">
        <Link to={`profile/${username}`} className="author">
          {username}
        </Link>
        <span className="date">{getMonthDate(article.createdAt)}</span>
      </div>
      <button className="btn btn-outline-primary btn-sm pull-xs-right">
        <i className="ion-heart"></i> {article.favoritesCount}
      </button>
    </div>
  );
}
