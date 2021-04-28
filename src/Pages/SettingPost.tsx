import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "../Component/Loading";
import ArticleForm from "../Component/SettingArticle/ArticleForm";

import { RootState } from "../Redux";
import { getArticleThunk } from "../Thunk/article";

export default function SettingPost(): JSX.Element {
  const { slug } = useParams<{ slug: string | undefined }>();
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
