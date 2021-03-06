import React, { useState } from "react";
import {
  BrowserRouter,
  NavLink,
  Route,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import { toast } from "react-toastify";
import { toggleFollow } from "../Api/user";
import ArticleBoxUserFavorite from "../Component/ArticleBox/ArticleBoxUserFavorite";
import ArticleBoxUserFeed from "../Component/ArticleBox/ArticleBoxUserFeed";
import { Profile } from "../db";

interface ProfileProp {
  profile: Profile;
  loginusername: string | undefined;
}
export default function ProfilePage({
  profile,
  loginusername,
}: ProfileProp): JSX.Element {
  const match = useRouteMatch();

  const username = profile.username;
  const isMyProfile = profile.username === loginusername;
  const [_following, set_following] = useState(profile.following);
  const [pagePerPagenation] = useState(5);

  const clickFollowBtn = () => {
    if (!loginusername) {
      return toast.error("you need to login");
    }
    // console.log("click follow");
    toggleFollow(username, _following)
      .then(() => {
        set_following(!_following);
        if (_following) {
          toast.success("Unfollow success!");
        } else {
          toast.success("Follow success!");
        }
      })
      .catch(() => {
        toast.error("try rater");
      });
  };
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
                    _following ? "active" : ""
                  }`}
                >
                  <i className="ion-plus-round"></i>
                  {_following
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
                      to={match.url}
                      className="nav-link"
                      activeClassName="active"
                    >
                      {isMyProfile ? "   My Articles" : "User Articles"}
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to={match.url + "/favorited"}
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
                    <ArticleBoxUserFeed pagePerPagenation={pagePerPagenation} />
                  )}
                />
                <Route
                  path={`${match.path}/favorited`}
                  render={() => (
                    <ArticleBoxUserFavorite
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
