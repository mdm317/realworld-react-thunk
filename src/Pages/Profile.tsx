import { use } from "marked";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useParams, useRouteMatch } from "react-router-dom";
import ArticleBoxUserFeed from "../Component/ArticleBox/ArticleBoxUserFeed";
import Loading from "../Component/Loading";
import { RootState } from "../Redux";
import { getProfileThunk } from "../Thunk/user";
import { toggleFollow } from "../Api/user";
import { toast } from "react-toastify";
import { getUserArticleList } from "../Thunk/article";
import queryString from "query-string";

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
  const loginusername = useSelector(
    (state: RootState) => state.user.user?.username
  );
  const { username } = useParams<{ username: string }>();
  const isMyProfile = username === loginusername;
  const match = useRouteMatch();

  const dispatch = useDispatch();
  useEffect(() => {
    if (username) {
      dispatch(getProfileThunk(username));
    }
  }, [username]);
  const [pagePerPagenation, setpagePerPagenation] = useState(5);
  if (profile === undefined) {
    return <Loading />;
  }
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

  const query = queryString.parse(location.search);
  const isFavorited = query.favorited ? true : false;
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
            <div className="articles-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <Link
                    to={`${match.url}`}
                    className={`nav-link ${isFavorited ? "" : "active"}`}
                  >
                    {isMyProfile ? "   My Articles" : "User Articles"}
                  </Link>
                  {/* <a className="nav-link active" href="">
                    {isMyProfile ? "   My Articles" : "User Articles"}
                  </a> */}
                </li>
                {/* <li className="nav-item">
                  <Link
                    to={`${match.url}?favorited=true`}
                    className={`nav-link ${!isFavorited ? "" : "active"}`}
                  >
                    Favorited Articles
                  </Link>
                </li> */}
              </ul>
            </div>
            <ArticleBoxUserFeed pagePerPagenation={pagePerPagenation} />
          </div>
        </div>
      </div>
    </div>
  );
}
