import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { matchPath, useRouteMatch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { useArticleList } from "../../Hooks/useArticleList";
// import WrapRouter from "../../Component/WrapRouter";
import { RootState } from "../../Redux";

import { getTagListThunk } from "../../Thunk/tag";
import HomePresenter from "./HomePresenter";

const pagePerPagenationDefault = 5;

function HomeContainer(): JSX.Element {
  const dispatch = useDispatch();
  const [pagePerPagenation] = useState(pagePerPagenationDefault);
  const tagList = useSelector((state: RootState) => state.tag.tagList);
  const username = useSelector((state: RootState) => state.user.user?.username);
  const match = useRouteMatch();
  const matchInfo = matchPath<{ username: string }>(location.pathname, {
    path: `${match.path}userFeed`,
  });
  useEffect(() => {
    dispatch(getTagListThunk());
  }, []);
  const { articleList, articleCounts } = useArticleList({
    mode: matchInfo ? "byUser" : "global",
    pagePerPagenation,
  });
  return (
    <HomePresenter
      match={match}
      articleCounts={articleCounts}
      articleList={articleList}
      pagePerPagenation={pagePerPagenation}
      tagList={tagList}
      username={username}
    ></HomePresenter>
  );
}
const WrapRouterHome = (): JSX.Element => (
  <BrowserRouter>
    <HomeContainer />
  </BrowserRouter>
);
export default WrapRouterHome;
