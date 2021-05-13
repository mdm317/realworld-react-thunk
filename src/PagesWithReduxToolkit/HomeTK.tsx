import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { matchPath, useRouteMatch } from "react-router";
import { BrowserRouter, NavLink } from "react-router-dom";
import { useArticleListToolKit } from "../Hooks/useArticleListWithToolkit";
// import WrapRouter from "../../Component/WrapRouter";
// import { RootState } from "../../Redux";

// import { getTagListThunk } from "../../Thunk/tag";
import ArticleList from "../Component/ArticleList";
import Loading from "../Component/Loading";
import Pagenation from "../Component/Pagenation";
// import HomePresenter from "./HomePresenter";

const pagePerPagenationDefault = 5;

function HomeContainer(): JSX.Element {
  const dispatch = useDispatch();
  const [pagePerPagenation] = useState(pagePerPagenationDefault);
  //   const tagList = useSelector((state: RootState) => state.tag.tagList);
  //   const username = useSelector((state: RootState) => state.user.user?.username);
  const match = useRouteMatch();
  const matchInfo = matchPath<{ username: string }>(location.pathname, {
    path: `${match.path}userFeed`,
  });
  const { articleList, articleCounts } = useArticleListToolKit({
    mode: matchInfo ? "byUser" : "global",
    pagePerPagenation,
  });
  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  {/* {username ? (
                    <NavLink
                      role="button"
                      activeClassName="active"
                      className="nav-link"
                      to={`${match.path}` + "userFeed?" + `author=${username}`}
                    >
                      My Feed
                    </NavLink>
                  ) : (
                    <div className="nav-link disabled"> My Feed</div>
                  )} */}
                </li>
                <li className="nav-item">
                  <NavLink
                    role="button"
                    exact
                    activeClassName="active"
                    className="nav-link "
                    to={`${match.path}`}
                  >
                    Global Feed
                  </NavLink>
                </li>
              </ul>
            </div>
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
          </div>

          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>
              {/* <HomeTagList tagList={tagList} /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
const WrapRouterHome = (): JSX.Element => (
  <BrowserRouter>
    <HomeContainer />
  </BrowserRouter>
);
export default WrapRouterHome;
