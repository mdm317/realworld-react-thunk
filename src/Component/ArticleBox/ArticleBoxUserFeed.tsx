import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams, useRouteMatch } from "react-router-dom";
import { GetArticleCondition } from "../../Api/article";
import { getArticleList } from "../../Thunk/article";
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
  const { author } = useParams<{ author: string }>();
  // console.log(author);
  // console.log("location", location);

  useEffect(() => {
    if (!author) {
      return;
    }
    const query = queryString.parse(location.search);
    const currentPage = query.page;
    const getArticleCondition: GetArticleCondition = {
      limit: pagePerPagenation,
      author,
    };
    if (currentPage) {
      const pageNum = Number(currentPage);
      const offset = (pageNum - 1) * pagePerPagenation;
      getArticleCondition.offset = offset;
    }
    //limit 와 author 는 반드시 있어야 하고
    //offset 은 선택
    dispatch(getArticleList(getArticleCondition));
  }, [location, author]);

  const articleList = useSelector(
    (state: RootState) => state.article.articleList
  );

  return (
    <>
      {articleList ? (
        <>
          <ArticleList articleList={articleList} />
          <Pagenation pagePerPagenation={pagePerPagenation} />
        </>
      ) : (
        <h3>Is Loading...</h3>
      )}
    </>
  );
}
