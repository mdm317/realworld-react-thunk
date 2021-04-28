import React from "react";
import { match, Route, Switch } from "react-router";
import { BrowserRouter, NavLink } from "react-router-dom";
import Loading from "../../Component/Loading";
import { Profile } from "../../db";
import ArticleBoxWithHook from "../../Component/ArticleBoxWithHook";

interface ProfilePresenterProp {
  profile: Profile | undefined;
  loginusername: string | undefined;
  isMyProfile: boolean;
  currentFollowing: boolean;
  clickFollowBtn: () => void;
  match: match;
  pagePerPagenation: number;
}

export default function ProfilePresenter({
  profile,
  loginusername,
  isMyProfile,
  currentFollowing,
  clickFollowBtn,
  match,
  pagePerPagenation,
}: ProfilePresenterProp): JSX.Element {
  if (!profile) {
    return <Loading />;
  }
  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img src={profile.image} className="user-img" />
              <h4>{profile.username}</h4>
              <p>{profile.bio}</p>
              {loginusername && !isMyProfile && (
                <button
                  onClick={clickFollowBtn}
                  className={`btn btn-sm btn-outline-secondary action-btn ${
                    currentFollowing ? "active" : ""
                  }`}
                >
                  <i className="ion-plus-round"></i>
                  {currentFollowing
                    ? `✋ UnFollow ${profile.username}`
                    : `🖐 Follow ${profile.username}`}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <BrowserRouter>
              <div className="articles-toggle">
                <ul className="nav nav-pills outline-active">
                  <li className="nav-item">
                    <NavLink
                      exact
                      to={match.url + `?author=${profile.username}`}
                      className="nav-link"
                      activeClassName="active"
                    >
                      {isMyProfile ? "   My Articles" : "User Articles"}
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to={
                        match.url + `/favorited?favorited=${profile.username}`
                      }
                      className="nav-link"
                      activeClassName="active"
                    >
                      Favorited Articles
                    </NavLink>
                  </li>
                </ul>
              </div>
              <Switch>
                <Route
                  exact
                  path={match.path}
                  render={() => (
                    <ArticleBoxWithHook
                      mode="byUser"
                      pagePerPagenation={pagePerPagenation}
                    />
                  )}
                />
                <Route
                  path={`${match.path}/favorited`}
                  render={() => (
                    <ArticleBoxWithHook
                      mode="byFavorite"
                      pagePerPagenation={pagePerPagenation}
                    />
                  )}
                />
              </Switch>
            </BrowserRouter>
          </div>
        </div>
      </div>
    </div>
  );
}
