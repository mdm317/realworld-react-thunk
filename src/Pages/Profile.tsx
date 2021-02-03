import { use } from "marked";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter,
  Link,
  NavLink,
  Route,
  Switch,
  useHistory,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import ArticleBoxUserFeed from "../Component/ArticleBox/ArticleBoxUserFeed";
import Loading from "../Component/Loading";
import { RootState } from "../Redux";
import { getProfileThunk } from "../Thunk/user";
import { toggleFollow } from "../Api/user";
import { toast } from "react-toastify";
import { getUserArticleList } from "../Thunk/article";
import queryString from "query-string";
import ArticleBoxUserFavorite from "../Component/ArticleBox/ArticleBoxUserFavorite";

export default function Profile(): JSX.Element {
  const profile = useSelector((state: RootState) => state.user.profile);
  const [_following, set_following] = useState(
    profile ? profile.following : false
  );
  useEffect(() => {
    if (profile?.following) {
      set_following(profile.following);
    }
  }, [profile?.following]);

  const match = useRouteMatch();
  console.log(match);

  const query = queryString.parse(location.search);
  const [isFavorited, setisFavoited] = useState(query.favorited ? true : false);
  useEffect(() => {
    setisFavoited(query.favorited ? true : false);
  }, [query.favorited]);

  const loginusername = useSelector(
    (state: RootState) => state.user.user?.username
  );
  const { username } = useParams<{ username: string }>();
  const isMyProfile = username === loginusername;

  const dispatch = useDispatch();
  useEffect(() => {
    if (username) {
      dispatch(getProfileThunk(username));
    }
  }, [username]);
  const [pagePerPagenation, setpagePerPagenation] = useState(5);

  const clickNav = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const text = (e.target as HTMLElement).innerText;
    console.log(text);
    if (text === "Favorited Articles") {
      setisFavoited(!isFavorited);
    }
  };
  const clickFollowBtn = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
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

  if (profile === undefined) {
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

              {loginusername &&
                !isMyProfile &&
                (_following ? (
                  <button
                    onClick={clickFollowBtn}
                    className="btn btn-sm btn-outline-secondary action-btn"
                  >
                    <i className="ion-plus-round"></i>
                    &nbsp; UnFollow {profile.username}
                  </button>
                ) : (
                  <button
                    onClick={clickFollowBtn}
                    className="btn btn-sm btn-outline-secondary action-btn"
                  >
                    <i className="ion-plus-round"></i>
                    &nbsp; Follow {profile.username}
                  </button>
                ))}
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
