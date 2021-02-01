import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter,
  Link,
  NavLink,
  Route,
  useHistory,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import ArticleBoxGlobal from "../Component/ArticleBox/ArticleBoxGlobal";
import ArticleBoxUserFeed from "../Component/ArticleBox/ArticleBoxUserFeed";
import { RootState } from "../Redux";

// const pagePerPagenation = 5;
function CusLink(username: string) {
  const history = useHistory();
  return <Link to="/userFeed/sdf">cuslInk</Link>;
}
export default function Home(): JSX.Element {
  const [pagePerPagenation, setpagePerPagenation] = useState<number>(5);
  const match = useRouteMatch();
  const username = useSelector((state: RootState) => state.user.user?.username);

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
          <BrowserRouter>
            <div className="col-md-9">
              <div className="feed-toggle">
                <ul className="nav nav-pills outline-active">
                  <li className="nav-item">
                    {username ? (
                      <NavLink
                        role="button"
                        activeClassName="active"
                        className="nav-link"
                        to={`${match.url}` + "userFeed/" + username}
                      >
                        My Feed
                      </NavLink>
                    ) : (
                      <div className="nav-link disabled"> My Feed</div>
                    )}
                  </li>
                  <li className="nav-item">
                    <NavLink
                      exact
                      activeClassName="active"
                      className="nav-link "
                      to={`${match.url}`}
                    >
                      Global Feed
                    </NavLink>
                  </li>
                </ul>
              </div>
              <Route
                exact
                path={`${match.url}`}
                render={() => (
                  <>
                    <ArticleBoxGlobal pagePerPagenation={pagePerPagenation} />
                  </>
                )}
              />
              <Route
                path={`${match.url}userFeed/:username`}
                render={() => (
                  <>
                    <ArticleBoxUserFeed pagePerPagenation={pagePerPagenation} />
                  </>
                )}
              />
              {/* {articleIsLoading ? (
                <h1>Is Loading...</h1>
              ) : (
                <Route
                  path={`${match.url}`}
                  render={(prop) => (
                    <>
                      <GlobalArticleList
                        pagePerPagenation={pagePerPagenation}
                      />
                      <Pagenation
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                        pagePerPagenation={pagePerPagenation}
                      />
                    </>
                  )}
                />
              )} */}
            </div>
          </BrowserRouter>
          {/* <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>

              <div className="tag-list">
                <a href="" className="tag-pill tag-default">
                  programming
                </a>
                <a href="" className="tag-pill tag-default">
                  javascript
                </a>
                <a href="" className="tag-pill tag-default">
                  emberjs
                </a>
                <a href="" className="tag-pill tag-default">
                  angularjs
                </a>
                <a href="" className="tag-pill tag-default">
                  react
                </a>
                <a href="" className="tag-pill tag-default">
                  mean
                </a>
                <a href="" className="tag-pill tag-default">
                  node
                </a>
                <a href="" className="tag-pill tag-default">
                  rails
                </a>
              </div>
            </div>
          </div>
      */}
        </div>
      </div>
    </div>
  );
}
