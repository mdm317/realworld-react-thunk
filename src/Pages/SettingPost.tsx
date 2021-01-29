import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { addPost, addPostAPI } from "../Api/article";
import Loading from "../Component/Loading";
import ArticleForm from "../Component/SettingArticle/ArticleForm";
import { Article } from "../db";
import { RootState } from "../Redux";
import { getArticleThunk } from "../Thunk/article";
interface SettingPostProp {
  article?: Article;
}
export default function SettingPost(): JSX.Element {
  const { slug } = useParams<{ slug: string }>();
  console.log(slug);

  const dispatch = useDispatch();
  const articleDetail = useSelector(
    (state: RootState) => state.article.articleDetail
  );
  useEffect(() => {
    if (slug) {
      dispatch(getArticleThunk(slug));
    }
  }, [slug]);
  return (
    <>
      {slug ? (
        <>
          {articleDetail ? (
            <ArticleForm article={articleDetail} />
          ) : (
            <Loading />
          )}
        </>
      ) : (
        <ArticleForm />
      )}
    </>
  );
}
