import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { GetArticleCondition } from "../../Api/article";
import ArticleList from "../ArticleList";
import queryString from "query-string";
import { RootState } from "../../Redux";
import Pagenation from "../Pagenation";
import Loading from "../Loading";
import { getArticleListThunk } from "../../Thunk/article";

interface globalArticleListprop {
  pagePerPagenation: number;
}
export default function ArticleBoxGlobal({
  pagePerPagenation,
}: globalArticleListprop): JSX.Element {
  const dispatch = useDispatch();
  const location = useLocation();
  // console.log("location", location);

  const articleList = useSelector(
    (state: RootState) => state.article.articleList
  );
  const articleCounts = useSelector(
    (state: RootState) => state.article.articlesCounts
  );
  useEffect(() => {
    const query = queryString.parse(location.search);
    const currentPage = query.page;
    const tag = query.tag as string;
    // console.log("tag", tag);

    const getArticleCondition: GetArticleCondition = {
      limit: pagePerPagenation,
    };
    if (tag) {
      getArticleCondition.tag = tag;
    }
    if (currentPage) {
      const pageNum = Number(currentPage);
      const offset = (pageNum - 1) * pagePerPagenation;
      getArticleCondition.offset = offset;
    }
    // console.log("article global");

    dispatch(getArticleListThunk(getArticleCondition));
  }, [location]);

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
