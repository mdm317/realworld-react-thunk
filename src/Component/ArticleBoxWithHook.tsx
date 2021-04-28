import React from "react";
import ArticleList from "./ArticleList";
import Loading from "./Loading";
import Pagenation from "./Pagenation";
import { useArticleList } from "../Hooks/useArticleList";

interface ArticleBoxWithHookProp {
  pagePerPagenation: number;
  mode: "global" | "byUser" | "byFavorite";
}

export default function ArticleBoxWithHook({
  mode,
  pagePerPagenation,
}: ArticleBoxWithHookProp): JSX.Element {
  const { articleList, articleCounts } = useArticleList({
    mode,
    pagePerPagenation,
  });
  return (
    <>
      {articleList === null && <Loading />}
      {articleList?.length === 0 && <h3>No Article!</h3>}
      {articleList && articleList.length > 0 && (
        <>
          <ArticleList articleList={articleList} />
          <Pagenation
            pagePerPagenation={pagePerPagenation}
            articleCounts={articleCounts}
          />
        </>
      )}
    </>
  );
}
