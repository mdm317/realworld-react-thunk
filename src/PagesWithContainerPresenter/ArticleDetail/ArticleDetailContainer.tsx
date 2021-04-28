import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import CommentBox from "../../Component/CommentBox";
import { RootState } from "../../Redux";
import { getArticleThunk, getCommentsThunk } from "../../Thunk/article";
import ArticleDetailPresenter from "./ArticleDetailPresenter";

export default function ArticleDetailContainer(): JSX.Element {
  const dispatch = useDispatch();
  const { slug } = useParams<{ slug: string }>();

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
  return (
    <ArticleDetailPresenter
      article={article}
      isMyPost={article?.author.username === username}
      slug={slug}
      username={username}
      user={user}
    >
      <CommentBox user={user} slug={slug} />
    </ArticleDetailPresenter>
  );
}
