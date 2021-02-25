import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "../Component/Loading";
import Profile from "../Pages/Profile";
import { RootState } from "../Redux";
import { getProfileThunk } from "../Thunk/user";

// url 에서 사용자 아이디()
// fecth 사용자 정보
// nav 에서 favorite 선택 여부
export default function ProfileFetch(): JSX.Element {
  const dispatch = useDispatch();
  const { username } = useParams<{ username: string }>();
  useEffect(() => {
    if (username) {
      dispatch(getProfileThunk(username));
    }
  }, [username]);

  const profile = useSelector((state: RootState) => state.user.profile);

  const loginusername = useSelector(
    (state: RootState) => state.user.user?.username
  );

  if (!profile) {
    return <Loading />;
  }
  return <Profile profile={profile} loginusername={loginusername} />;
}
