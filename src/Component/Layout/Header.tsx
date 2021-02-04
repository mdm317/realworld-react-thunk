import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { logOutAPI } from "../../Api/user";
import { RootState } from "../../Redux";
import { logoutThunk } from "../../Thunk/user";

export default function Header(): JSX.Element {
  const isLogin = useSelector((state: RootState) => state.user.isLogin);
  const dispatch = useDispatch();
  const clickLogOut = () => {
    dispatch(logoutThunk());
    toast.info("log out success");
  };
  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <a href="/" className="navbar-brand">
          conduit
        </a>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <NavLink exact activeClassName="active" to="/" className="nav-link">
              Home
            </NavLink>
          </li>
          {isLogin && (
            <>
              <li className="nav-item">
                <NavLink
                  activeClassName="active"
                  to="/addPost"
                  className="nav-link"
                >
                  New Post
                </NavLink>
              </li>{" "}
              <li className="nav-item">
                <NavLink
                  activeClassName="active"
                  to="/setting"
                  className="nav-link"
                >
                  Settings
                </NavLink>
              </li>
            </>
          )}

          {isLogin ? (
            <li className="nav-item">
              <Link onClick={clickLogOut} to="/" className="nav-link">
                Log out
              </Link>
            </li>
          ) : (
            <>
              <li className="nav-item">
                <NavLink
                  activeClassName="active"
                  to="/signup"
                  className="nav-link"
                >
                  Sign up
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  activeClassName="active"
                  to="/login"
                  className="nav-link"
                >
                  Log in
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
