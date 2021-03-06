import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, NavLink, Route, useRouteMatch } from "react-router-dom";
import ArticleBoxGlobal from "../Component/ArticleBox/ArticleBoxGlobal";
import ArticleBoxUserFeed from "../Component/ArticleBox/ArticleBoxUserFeed";
import HomeTagList from "../Component/HomeTagList";
import { RootState } from "../Redux";
import { getTagListThunk } from "../Thunk/tag";
const pagePerPagenationDefault = 5;
export default function Home(): JSX.Element {
  console.log("빌드시 제거되는 로그");

  const [pagePerPagenation] = useState<number>(pagePerPagenationDefault);
  const match = useRouteMatch();

  const username = useSelector((state: RootState) => state.user.user?.username);
  const tagList = useSelector((state: RootState) => state.tag.tagList);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTagListThunk());
  }, []);

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>
      <BrowserRouter>
        <div className="container page">
          <div className="row">
            <div className="col-md-9">
              <div className="feed-toggle">
                <ul className="nav nav-pills outline-active">
                  <li className="nav-item">
                    {username ? (
                      <NavLink
                        role="button"
                        activeClassName="active"
                        className="nav-link"
                        to={`${match.path}` + "userFeed/" + username}
                      >
                        My Feed
                      </NavLink>
                    ) : (
                      <div className="nav-link disabled"> My Feed</div>
                    )}
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
              <Route
                exact
                path={`${match.path}`}
                render={() => (
                  <>
                    <ArticleBoxGlobal pagePerPagenation={pagePerPagenation} />
                  </>
                )}
              />
              <Route
                path={`${match.path}userFeed/:username`}
                render={() => (
                  <>
                    <ArticleBoxUserFeed pagePerPagenation={pagePerPagenation} />
                  </>
                )}
              />
            </div>

            <div className="col-md-3">
              <div className="sidebar">
                <p>Popular Tags</p>
                <HomeTagList tagList={tagList} />
              </div>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}
