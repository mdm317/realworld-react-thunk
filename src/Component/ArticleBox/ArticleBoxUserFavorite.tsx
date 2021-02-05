import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams, useRouteMatch } from "react-router-dom";
import { GetArticleCondition } from "../../Api/article";
import {
  getArticleList,
  getUserFavoriteArticleListThunk,
} from "../../Thunk/article";
import ArticleList from "../ArticleList";
import queryString from "query-string";
import { RootState } from "../../Redux";
import Pagenation from "../Pagenation";

interface ArticleBoxProp {
  pagePerPagenation: number;
}
export default function ArticleBoxUserFavorite({
  pagePerPagenation,
}: ArticleBoxProp): JSX.Element {
  const dispatch = useDispatch();
  const location = useLocation();
  const articleList = useSelector(
    (state: RootState) => state.article.userFavoriteArticleList
  );
  const articleCouts = useSelector(
    (state: RootState) => state.article.userFavoriteArticlesCounts
  );
  const { username } = useParams<{ username: string }>();
  // console.log("username", username);

  useEffect(() => {
    const query = queryString.parse(location.search);
    const tag = query.tag as string;
    const currentPage = query.page;
    const getArticleCondition: GetArticleCondition = {
      limit: pagePerPagenation,
    };
    if (tag) {
      getArticleCondition.tag = tag;
    }
    getArticleCondition.favorited = username;
    if (currentPage) {
      const pageNum = Number(currentPage);
      const offset = (pageNum - 1) * pagePerPagenation;
      getArticleCondition.offset = offset;
    }
    // console.log("article global");

    dispatch(getUserFavoriteArticleListThunk(getArticleCondition));
  }, [location]);

  return (
    <>
      {articleList === null && <h3>Is Loading...</h3>}
      {articleList?.length === 0 && <h3>No Article!</h3>}
      {articleList && articleList.length > 0 && (
        <>
          <ArticleList articleList={articleList} />
          <Pagenation
            pagePerPagenation={pagePerPagenation}
            articleCouts={articleCouts}
          />
        </>
      )}
    </>
  );
}
