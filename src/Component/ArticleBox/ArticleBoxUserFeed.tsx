import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams, useRouteMatch } from "react-router-dom";
import { GetArticleCondition } from "../../Api/article";
import { getArticleList, getUserArticleList } from "../../Thunk/article";
import ArticleList from "../ArticleList";
import queryString from "query-string";
import { RootState } from "../../Redux";
import Pagenation from "../Pagenation";

interface globalArticleListprop {
  pagePerPagenation: number;
}
export default function ArticleBoxUserFeed({
  pagePerPagenation,
}: globalArticleListprop): JSX.Element {
  const dispatch = useDispatch();
  const location = useLocation();
  const { username } = useParams<{ username: string }>();

  // console.log("username", username);
  // console.log("location", location);

  useEffect(() => {
    if (!username) {
      return;
    }
    const query = queryString.parse(location.search);
    // console.log("query", query);

    const currentPage = query.page;

    const getArticleCondition: GetArticleCondition = {
      limit: pagePerPagenation,
      author: username,
    };
    if (currentPage) {
      const pageNum = Number(currentPage);
      const offset = (pageNum - 1) * pagePerPagenation;
      getArticleCondition.offset = offset;
    }
    //limit 와 author 는 반드시 있어야 하고
    //offset 은 선택
    // console.log("article user");

    dispatch(getUserArticleList(getArticleCondition));
  }, [location, username]);

  const articleList = useSelector(
    (state: RootState) => state.article.userArticleList
  );
  const articleCouts = useSelector(
    (state: RootState) => state.article.userArticlesCounts
  );
  if (!articleList) {
    <h3>Is Loading...</h3>;
  }
  return (
    <>
      {articleList &&
        (articleList.length !== 0 ? (
          <>
            <ArticleList articleList={articleList} />
            <Pagenation
              pagePerPagenation={pagePerPagenation}
              articleCouts={articleCouts}
            />
          </>
        ) : (
          <h1>No article here ...</h1>
        ))}
    </>
  );
}
