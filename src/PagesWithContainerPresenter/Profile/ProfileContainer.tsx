import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouteMatch } from "react-router";
import { toast } from "react-toastify";
import { toggleFollow } from "../../Api/user";
import { RootState } from "../../Redux";
import { getProfileThunk } from "../../Thunk/user";
import ProfilePresenter from "./ProfilePresenter";

interface useProfileActionProp {
  loginUsername: string | undefined;
  initialfollow: boolean;
  username: string;
}

function useProfileAction({
  loginUsername,
  initialfollow,
  username,
}: useProfileActionProp) {
  const [following, set_following] = useState(initialfollow);
  useEffect(() => {
    set_following(initialfollow);
  }, [initialfollow]);
  const clickFollowBtn = useCallback(() => {
    if (!loginUsername) {
      return toast.error("you need to login");
    }
    // console.log("click follow");
    toggleFollow(username, following)
      .then(() => {
        set_following(!following);
        if (following) {
          toast.success("Unfollow success!");
        } else {
          toast.success("Follow success!");
        }
      })
      .catch(() => {
        toast.error("try rater");
      });
  }, [loginUsername, username]);
  return { currentFollowing: following, clickFollowBtn };
}
const pagePerPagenationDefault = 5;

export default function ProfileContainer(): JSX.Element {
  const [pagePerPagenation] = useState(pagePerPagenationDefault);
  const match = useRouteMatch();
  const dispatch = useDispatch();
  const { username } = useParams<{ username: string }>();
  useEffect(() => {
    if (username) {
      dispatch(getProfileThunk(username));
    }
  }, [username]);

  const profile = useSelector((state: RootState) => state.user.profile);

  const loginUsername = useSelector(
    (state: RootState) => state.user.user?.username
  );

  const isMyProfile = username === loginUsername;

  const { currentFollowing, clickFollowBtn } = useProfileAction({
    loginUsername,
    initialfollow: profile ? profile.following : false,
    username,
  });
  return (
    <ProfilePresenter
      profile={profile}
      currentFollowing={currentFollowing}
      isMyProfile={isMyProfile}
      loginusername={loginUsername}
      clickFollowBtn={clickFollowBtn}
      match={match}
      pagePerPagenation={pagePerPagenation}
    ></ProfilePresenter>
  );
}
