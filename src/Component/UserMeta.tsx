import { AxiosError } from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { favoriteAPI } from "../Api/user";
import { Article } from "../db";
import { RootState } from "../Redux";
import { getMonthDate } from "../util";
interface UserMetaProp {
  article: Article;
}
export default function UserMeta({ article }: UserMetaProp): JSX.Element {
  const isLogin = useSelector((state: RootState) => state.user.isLogin);
  const [favoritecount, setfavoritecount] = useState(article.favoritesCount);
  const [isFavorited, setisFavorited] = useState(article.favorited);
  const username = article.author.username;
  const favoriteIsActive = isFavorited ? "active" : "";
  const clickFavorite = () => {
    if (!isLogin) {
      return toast.error("You need to login!");
    }
    favoriteAPI(article.slug)
      .then(() => {
        setisFavorited(!isFavorited);
        //favorite 상태라면 unfavorite 상태로 만들어야 하니까 -1
        const num = isFavorited ? -1 : 1;
        setfavoritecount(favoritecount + num);
      })
      .catch((e) => {
        toast.error("try rater");
      });
  };
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
      <div
        role="button"
        onClick={clickFavorite}
        className={`btn btn-outline-primary btn-sm pull-xs-right ${favoriteIsActive}`}
      >
        <i className="ion-heart"></i>💚<span>{favoritecount}</span>
      </div>
    </div>
  );
}
