import React from "react";
import { Link } from "react-router-dom";
import { getMonthDate } from "../util";

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
  return (
    <>
      <Link to={`profile/${username}`}>
        <img src={image} />
      </Link>
      <div className="info">
        <Link to={`profile/${username}`}>{username}</Link>
        <span className="date">{getMonthDate(createdAt)}</span>
      </div>
    </>
  );
}
