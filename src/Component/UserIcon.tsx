import React from "react";
import { Link } from "react-router-dom";
import { getMonthDate } from "../util";
import history from "../history";
import baseUrl from "../baseurl";
interface UserCardProp {
  username: string;
  createdAt: string;
  image: string;
}
export default function UserIcon({
  username,
  createdAt,
  image,
}: UserCardProp): JSX.Element {
  const clickProfile = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    history.push(`${baseUrl}/profile/${username}`);
  };
  return (
    <>
      <Link onClick={clickProfile} to="">
        <img src={image} />
      </Link>
      <div className="info">
        <Link onClick={clickProfile} to="">
          {username}
        </Link>
        <span className="date">{getMonthDate(createdAt)}</span>
      </div>
    </>
  );
}
