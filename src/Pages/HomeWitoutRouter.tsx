import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter,
  Link,
  NavLink,
  Route,
  Switch,
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import { GetArticleCondition } from "../Api/article";
import GlobalArticleList from "../Component/WithoutRouter/GlobalArticleListWithoutRouter";
import Pagenation from "../Component/Pagenation";
import PagenationWithRouter from "../Component/WithoutRouter/PagenationWithoutRouter";
import { RootState } from "../Redux";

import NotFound from "./NotFound";

const pagePerPagenation = 10;

export default function Home(): JSX.Element {
  const match = useRouteMatch();

  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    console.log("currentPage", currentPage);
  }, [currentPage]);
  const [
    getArticleCondition,
    setarticleCondition,
  ] = useState<GetArticleCondition>({ limit: pagePerPagenation });
  useEffect(() => {
    const offset = (currentPage - 1) * pagePerPagenation;
    setarticleCondition({ ...getArticleCondition, offset });
  }, [currentPage]);
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
                    <NavLink
                      activeClassName="active"
                      className="nav-link "
                      to={`${match.url}` + "yourfeed"}
                    >
                      Your Feed
                    </NavLink>
                    {/* <a className="nav-link disabled" href="">
                      Your Feed
                    </a> */}
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
                path={`${match.url}`}
                render={(prop) => (
                  <GlobalArticleList
                    {...prop}
                    getArticleCondition={getArticleCondition}
                  />
                )}
              />
              <Pagenation
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                pagePerPagenation={pagePerPagenation}
              />
            </div>
          </BrowserRouter>
          <div className="col-md-3">
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
        </div>
      </div>
    </div>
  );
}
