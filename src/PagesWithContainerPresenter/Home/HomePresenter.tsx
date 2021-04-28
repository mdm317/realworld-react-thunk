import React from "react";
import { match, NavLink } from "react-router-dom";
import ArticleList from "../../Component/ArticleList";
import HomeTagList from "../../Component/HomeTagList";
import Loading from "../../Component/Loading";
import Pagenation from "../../Component/Pagenation";
import { Article } from "../../db";

interface HomePresenterProp {
  articleList: Article[] | null;
  articleCounts: number;
  pagePerPagenation: number;
  username: undefined | string;
  tagList: string[] | undefined;
  match: match;
}

export default function HomePresenter({
  articleList,
  articleCounts,
  pagePerPagenation,
  username,
  tagList,
  match,
}: HomePresenterProp): JSX.Element {
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
                  {username ? (
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
              <HomeTagList tagList={tagList} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
