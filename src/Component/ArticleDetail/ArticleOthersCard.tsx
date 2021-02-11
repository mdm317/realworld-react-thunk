import { getFileInfo } from "prettier";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { toggleFollow } from "../../Api/user";
import { Article } from "../../db";
import { AppDispatch } from "../../Redux";
import { toggleArticleFollowAction } from "../../Redux/Article/action";
import articleReducer from "../../Redux/Article/reducer";
import { toggleFavoriteThunk } from "../../Thunk/article";
import { getMonthDate } from "../../util";
import UserIcon from "../UserIcon";

interface ArticleOthersCardProp {
  article: Article;
  username?: string;
}
export default function ArticleOthersCard({
  article,
  username,
}: ArticleOthersCardProp): JSX.Element {
  const isFollow = article.author.following;
  const isFavorited = article.favorited;
  const dispatch: AppDispatch = useDispatch();
  const clickFollowBtn = () => {
    console.log("click follow");
    console.log("username", username);

    if (username === undefined) {
      return toast.error("You need to login ");
    }
    toggleFollow(article.author.username, isFollow)
      .then(() => {
        dispatch(toggleArticleFollowAction());
      })
      .catch(() => {
        toast.error("try rater");
      });
  };
  const clickFavorite = () => {
    if (username === undefined) {
      return toast.error("You need to login ");
    }
    dispatch(toggleFavoriteThunk(article.slug, isFavorited)).catch(
      (e: Error) => {
        toast.error(e.message);
      }
    );
  };
  return (
    <div className="article-meta">
      <UserIcon
        createdAt={article.createdAt}
        username={article.author.username}
        image={article.author.image}
      />
      <button
        onClick={clickFollowBtn}
        className={`btn btn-sm btn-outline-secondary ${
          isFollow ? "active" : ""
        }`}
      >
        <i className="ion-plus-round"></i> &nbsp;
        {isFollow ? (
          <> ✋ UnFollow {article.author.username}</>
        ) : (
          <> 🖐 Follow {article.author.username}</>
        )}
      </button>
      &nbsp;
      <div
        role="button"
        onClick={clickFavorite}
        className={`btn btn-sm btn-outline-primary ${
          isFavorited ? "active" : ""
        }`}
      >
        <i className="ion-heart"></i> &nbsp;
        {isFavorited ? (
          <> 💔 UnFavorite Post {article.author.username}</>
        ) : (
          <> 💚 Favorite Post{article.author.username}</>
        )}
        <span className="counter">({article.favoritesCount})</span>
      </div>
    </div>
  );
}
